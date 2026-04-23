#!/usr/bin/env node
/**
 * MCP server for the solana-founder-brand skill.
 *
 * Exposes three tools that replace the node-script subprocess calls in SKILL.md
 * with first-class MCP tool invocations Claude Code can call directly.
 *
 * Tools:
 *   fetch_x_posts  — tiered X/Twitter post fetcher (twitterapi.io → RapidAPI → Jina → paste signal)
 *   web_search     — tiered web search (Tavily → Exa → SerpAPI → unavailable)
 *   analyze_voice  — local voice-style fingerprint from a post corpus (zero network)
 *
 * Env vars (all optional — same as the scripts/ fallbacks):
 *   TWITTERAPI_IO_KEY   twitterapi.io preferred X source
 *   RAPIDAPI_KEY        RapidAPI twitter-api45 fallback X source
 *   TAVILY_API_KEY      Tavily search preferred
 *   EXA_API_KEY         Exa neural search fallback
 *   SERPAPI_KEY         SerpAPI final fallback
 *
 * Setup:
 *   cd mcp && npm install
 *   Then register in Claude Code (see repo README).
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "solana-founder-brand",
  version: "1.0.0",
});

// ─── Tool: fetch_x_posts ──────────────────────────────────────────────────────

server.tool(
  "fetch_x_posts",
  "Fetch recent posts from an X/Twitter handle for founder voice grounding. Tries twitterapi.io, RapidAPI, and Jina reader proxy in order; always returns a JSON envelope even when all sources fail.",
  {
    handle: z.string().describe("X/Twitter handle — with or without leading @"),
    count: z
      .number()
      .int()
      .min(1)
      .max(200)
      .optional()
      .default(50)
      .describe("Number of posts to fetch"),
  },
  async ({ handle, count = 50 }) => {
    const result = await fetchXPosts(handle.replace(/^@/, ""), count);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  },
);

async function fetchXPosts(handle, count) {
  const { TWITTERAPI_IO_KEY, RAPIDAPI_KEY } = process.env;

  if (TWITTERAPI_IO_KEY) {
    const res = await tryTwitterApiIo(handle, count, TWITTERAPI_IO_KEY);
    if (res.ok) return res;
  }
  if (RAPIDAPI_KEY) {
    const res = await tryRapidApi(handle, count, RAPIDAPI_KEY);
    if (res.ok) return res;
  }
  const jina = await tryJinaReader(handle, count);
  if (jina.ok) return jina;

  return {
    ok: false,
    source: "paste-mode",
    handle,
    count: 0,
    posts: [],
    note: "No fetch method succeeded. Ask the user to paste 10–20 recent posts for voice grounding.",
  };
}

async function tryTwitterApiIo(handle, count, key) {
  const url = `https://api.twitterapi.io/twitter/user/last_tweets?userName=${encodeURIComponent(handle)}&count=${count}`;
  try {
    const r = await fetch(url, { headers: { "x-api-key": key } });
    if (!r.ok) return { ok: false, source: "twitterapi.io", note: `HTTP ${r.status}` };
    const data = await r.json();
    const tweets = data.tweets ?? data.data?.tweets ?? [];
    if (!Array.isArray(tweets) || tweets.length === 0)
      return { ok: false, source: "twitterapi.io", note: "empty response" };
    return {
      ok: true,
      source: "twitterapi.io",
      handle,
      count: tweets.length,
      posts: tweets.map((t) => ({
        text: t.text ?? "",
        createdAt: t.createdAt ?? t.created_at ?? null,
        url: t.url ?? (t.id ? `https://x.com/${handle}/status/${t.id}` : null),
        likeCount: t.likeCount ?? t.favorite_count ?? null,
        retweetCount: t.retweetCount ?? t.retweet_count ?? null,
        viewCount: t.viewCount ?? null,
        isReply: t.isReply ?? (t.inReplyToStatusId != null ? true : null),
      })),
    };
  } catch (err) {
    return { ok: false, source: "twitterapi.io", note: `error: ${err.message}` };
  }
}

async function tryRapidApi(handle, count, key) {
  const url = `https://twitter-api45.p.rapidapi.com/timeline.php?screenname=${encodeURIComponent(handle)}`;
  try {
    const r = await fetch(url, {
      headers: {
        "x-rapidapi-key": key,
        "x-rapidapi-host": "twitter-api45.p.rapidapi.com",
      },
    });
    if (!r.ok) return { ok: false, source: "rapidapi:twitter-api45", note: `HTTP ${r.status}` };
    const data = await r.json();
    const timeline = data.timeline ?? data.tweets ?? [];
    if (!Array.isArray(timeline) || timeline.length === 0)
      return { ok: false, source: "rapidapi:twitter-api45", note: "empty response" };
    return {
      ok: true,
      source: "rapidapi:twitter-api45",
      handle,
      count: Math.min(timeline.length, count),
      posts: timeline.slice(0, count).map((t) => ({
        text: t.text ?? t.tweet_text ?? "",
        createdAt: t.created_at ?? null,
        url: t.tweet_id ? `https://x.com/${handle}/status/${t.tweet_id}` : null,
        likeCount: t.favorites ?? null,
        retweetCount: t.retweets ?? null,
        viewCount: t.views ?? null,
        isReply: t.is_reply ?? null,
      })),
    };
  } catch (err) {
    return { ok: false, source: "rapidapi:twitter-api45", note: `error: ${err.message}` };
  }
}

async function tryJinaReader(handle, count) {
  const url = `https://r.jina.ai/https://x.com/${encodeURIComponent(handle)}`;
  try {
    const r = await fetch(url, { headers: { accept: "text/plain" } });
    if (!r.ok) return { ok: false, source: "jina-reader", note: `HTTP ${r.status}` };
    const text = await r.text();
    const seen = new Set();
    const candidates = [];
    for (const raw of text.split(/\n+/)) {
      const l = raw.trim();
      if (
        l.length >= 25 &&
        l.length <= 280 &&
        l.split(/\s+/).length >= 5 &&
        !seen.has(l) &&
        !/^https?:\/\//.test(l) &&
        !/^\[.*\]\(https?:/.test(l) &&          // markdown links e.g. [Log in](https://...)
        !/^@\w+$/.test(l) &&
        !/^\d+$/.test(l) &&
        !/^(Follow|Following|Followers|Posts|Replies|Likes|Media|Bookmarks)/i.test(l) &&
        !/^(Title:|URL Source:|Markdown Content:|Published|Author:|Description:|Keywords:)/i.test(l) &&
        !/^(Don't miss|People on X|Log in|Sign up|Sign in|Already have)/i.test(l) &&
        !/^(Something went wrong|Try again|Learn more|Show more|Trending|What's happening)/i.test(l)
      ) {
        seen.add(l);
        candidates.push(l);
      }
      if (candidates.length >= count) break;
    }
    if (candidates.length < 5)
      return { ok: false, source: "jina-reader", note: "too few real-post candidates — X login wall likely returned" };
    return {
      ok: true,
      source: "jina-reader",
      handle,
      count: candidates.length,
      posts: candidates.map((t) => ({ text: t, createdAt: null, url: null })),
      note: "Best-effort extraction from Jina reader proxy. Treat as partial voice signal; prefer paste mode for accuracy.",
    };
  } catch (err) {
    return { ok: false, source: "jina-reader", note: `error: ${err.message}` };
  }
}

// ─── Tool: web_search ─────────────────────────────────────────────────────────

server.tool(
  "web_search",
  "Search the web for founder background enrichment — prior projects, talks, interviews. Tries Tavily, Exa, and SerpAPI in order; always returns a JSON envelope.",
  {
    query: z.string().describe("Search query, e.g. '\"Mira Adeleke\" Dripfm Solana'"),
    max: z
      .number()
      .int()
      .min(1)
      .max(20)
      .optional()
      .default(5)
      .describe("Max results to return"),
  },
  async ({ query, max = 5 }) => {
    const result = await webSearch(query, max);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  },
);

async function webSearch(query, max) {
  const { TAVILY_API_KEY, EXA_API_KEY, SERPAPI_KEY } = process.env;

  if (TAVILY_API_KEY) {
    const res = await tryTavily(query, max, TAVILY_API_KEY);
    if (res.ok) return res;
  }
  if (EXA_API_KEY) {
    const res = await tryExa(query, max, EXA_API_KEY);
    if (res.ok) return res;
  }
  if (SERPAPI_KEY) {
    const res = await trySerpApi(query, max, SERPAPI_KEY);
    if (res.ok) return res;
  }
  return {
    ok: false,
    source: "unavailable",
    query,
    results: [],
    note: "No web-search API key configured. Skipping background enrichment; continue with user-provided inputs and archetype library.",
  };
}

async function tryTavily(query, max, key) {
  try {
    const r = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        api_key: key,
        query,
        max_results: max,
        search_depth: "basic",
        include_answer: true,
      }),
    });
    if (!r.ok) return { ok: false, source: "tavily", note: `HTTP ${r.status}` };
    const data = await r.json();
    return {
      ok: true,
      source: "tavily",
      query,
      answer: data.answer ?? null,
      results: (data.results ?? []).map((x) => ({
        title: x.title ?? "",
        url: x.url ?? "",
        content: x.content ?? x.snippet ?? "",
        score: x.score ?? null,
      })),
    };
  } catch (err) {
    return { ok: false, source: "tavily", note: `error: ${err.message}` };
  }
}

async function tryExa(query, max, key) {
  try {
    const r = await fetch("https://api.exa.ai/search", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": key },
      body: JSON.stringify({ query, numResults: max, type: "neural", contents: { text: true } }),
    });
    if (!r.ok) return { ok: false, source: "exa", note: `HTTP ${r.status}` };
    const data = await r.json();
    return {
      ok: true,
      source: "exa",
      query,
      results: (data.results ?? []).map((x) => ({
        title: x.title ?? "",
        url: x.url ?? "",
        content: x.text ?? "",
        score: x.score ?? null,
      })),
    };
  } catch (err) {
    return { ok: false, source: "exa", note: `error: ${err.message}` };
  }
}

async function trySerpApi(query, max, key) {
  try {
    const url = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(query)}&num=${max}&api_key=${key}`;
    const r = await fetch(url);
    if (!r.ok) return { ok: false, source: "serpapi", note: `HTTP ${r.status}` };
    const data = await r.json();
    return {
      ok: true,
      source: "serpapi",
      query,
      results: (data.organic_results ?? []).slice(0, max).map((x) => ({
        title: x.title ?? "",
        url: x.link ?? "",
        content: x.snippet ?? "",
        score: null,
      })),
    };
  } catch (err) {
    return { ok: false, source: "serpapi", note: `error: ${err.message}` };
  }
}

// ─── Tool: analyze_voice ──────────────────────────────────────────────────────

server.tool(
  "analyze_voice",
  "Extract a voice-style fingerprint from a corpus of posts. Pure local analysis — zero network calls. Returns sentence length distributions, punctuation rhythm, capitalization tendency, emoji/link/mention density, and top content tokens.",
  {
    posts: z
      .array(z.string())
      .min(1)
      .describe("Array of post texts to analyze — paste or fetched"),
  },
  async ({ posts }) => {
    const result = analyzeVoice(posts.map((text) => ({ text })));
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  },
);

// ─── Voice analysis (ported from scripts/analyze_voice.mjs) ──────────────────

const STOP_WORDS = new Set(
  "the and for you your our their that this with have has had are was were will would can could should just its it's is a an i me my we us they them not no yes if then than so but or on in at of to do does did be been being also from about into out up down more most very much many few some any one two three there here how what why when where who whom which whose".split(
    /\s+/,
  ),
);

function analyzeVoice(posts) {
  const texts = posts.map((p) => p.text);
  const allWords = texts.flatMap(tokenizeWords);
  const totalWords = allWords.length;

  const wordsPer = texts.map((t) => tokenizeWords(t).length);
  const sortedWords = [...wordsPer].sort((a, b) => a - b);
  const sentencesPer = texts.map((t) => splitSentences(t).length);
  const totalSentences = sentencesPer.reduce((a, b) => a + b, 0);

  const concatenated = texts.join("\n");

  const per100 = (n) => (totalWords === 0 ? 0 : round((n / totalWords) * 100, 2));

  const replyCount = posts.filter(
    (p) => p.isReply === true || /^@\w+/.test(p.text.trim()),
  ).length;
  const quoteCount = posts.filter((p) =>
    /https?:\/\/(x|twitter)\.com\/\w+\/status\//.test(p.text),
  ).length;
  const threadHintCount = posts.filter(
    (p) =>
      /(\b\d+\/(\d+|\w)?\b|🧵|^\d+\.\s|^\d+\)\s)/.test(p.text) || p.text.length > 240,
  ).length;

  return {
    postCount: texts.length,
    totalWords,
    avgWordsPerPost: round(mean(wordsPer), 1),
    medianWordsPerPost: sortedWords[Math.floor(sortedWords.length / 2)] ?? 0,
    p10WordsPerPost: percentile(sortedWords, 10),
    p90WordsPerPost: percentile(sortedWords, 90),
    avgSentencesPerPost: round(mean(sentencesPer), 2),
    avgWordsPerSentence: round(totalWords / Math.max(1, totalSentences), 1),
    punctuation: {
      periods: countMatches(concatenated, /\./g),
      commas: countMatches(concatenated, /,/g),
      emDashes: countMatches(concatenated, /—/g),
      ellipses: countMatches(concatenated, /\.{3,}|…/g),
      exclamations: countMatches(concatenated, /!/g),
      questions: countMatches(concatenated, /\?/g),
      colons: countMatches(concatenated, /:/g),
      semicolons: countMatches(concatenated, /;/g),
    },
    capitalization: {
      sentenceCasePct: pct(texts.filter((t) => /^[A-Z]/.test(t.trim())).length, texts.length),
      lowercaseStartPct: pct(texts.filter((t) => /^[a-z]/.test(t.trim())).length, texts.length),
      allCapsTokensPct: pct(
        allWords.filter((w) => w.length >= 2 && /^[A-Z]{2,}$/.test(w)).length,
        totalWords,
      ),
    },
    emojiDensityPer100Words: per100(
      countMatches(concatenated, /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu),
    ),
    linkDensityPer100Words: per100(countMatches(concatenated, /https?:\/\/\S+/g)),
    mentionDensityPer100Words: per100(countMatches(concatenated, /(^|\s)@\w+/g)),
    hashtagDensityPer100Words: per100(countMatches(concatenated, /(^|\s)#\w+/g)),
    replyRatio: pct(replyCount, texts.length),
    quoteRatio: pct(quoteCount, texts.length),
    threadHintRatio: pct(threadHintCount, texts.length),
    topTokens: topContentTokens(allWords, 20),
  };
}

function tokenizeWords(text) {
  return (text ?? "").match(/[A-Za-z][A-Za-z0-9'_-]*/g) ?? [];
}

function splitSentences(text) {
  return (text ?? "")
    .split(/(?<=[.!?…])\s+|\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function mean(arr) {
  return arr.length === 0 ? 0 : arr.reduce((a, b) => a + b, 0) / arr.length;
}

function percentile(sorted, p) {
  if (sorted.length === 0) return 0;
  return sorted[Math.floor((p / 100) * (sorted.length - 1))];
}

function pct(part, total) {
  return total === 0 ? 0 : round((part / total) * 100, 1);
}

function round(n, digits) {
  const f = 10 ** digits;
  return Math.round(n * f) / f;
}

function countMatches(str, re) {
  return (str.match(re) ?? []).length;
}

function topContentTokens(words, k) {
  const counts = new Map();
  for (const w of words) {
    const lw = w.toLowerCase();
    if (STOP_WORDS.has(lw) || lw.length <= 2) continue;
    counts.set(lw, (counts.get(lw) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([token, count]) => ({ token, count }));
}

// ─── Start ────────────────────────────────────────────────────────────────────

const transport = new StdioServerTransport();
await server.connect(transport);
