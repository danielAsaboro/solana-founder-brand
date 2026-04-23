#!/usr/bin/env node
// Tiered X/Twitter post fetcher. Degrades gracefully.
//
// Usage:
//   node fetch_x_posts.mjs <handle> [--count 50]
//
// Writes JSON to stdout:
//   { source, handle, count, posts: [{text, createdAt?, url?, ...}], note? }
//
// Sources tried in order:
//   1. twitterapi.io        (if TWITTERAPI_IO_KEY set)
//   2. RapidAPI twitter-api45 (if RAPIDAPI_KEY set)
//   3. Jina reader proxy    (best-effort, zero key; often partial)
//   4. paste-mode signal    (always — prompts caller to ask user to paste)
//
// Never exits non-zero on missing data — always emits a JSON envelope
// describing what happened so the caller can decide.

const args = process.argv.slice(2);
if (args.length === 0 || args[0].startsWith("-")) {
  printUsage();
  process.exit(2);
}

const handle = args[0].replace(/^@/, "");
const countArg = args.indexOf("--count");
const count = countArg !== -1 ? parseInt(args[countArg + 1], 10) || 50 : 50;

const TWITTERAPI_IO_KEY = process.env.TWITTERAPI_IO_KEY;
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

async function main() {
  if (TWITTERAPI_IO_KEY) {
    const res = await tryTwitterApiIo(handle, count);
    if (res.ok) return emit(res);
  }

  if (RAPIDAPI_KEY) {
    const res = await tryRapidApi(handle, count);
    if (res.ok) return emit(res);
  }

  const jina = await tryJinaReader(handle, count);
  if (jina.ok) return emit(jina);

  return emit({
    ok: false,
    source: "paste-mode",
    handle,
    count: 0,
    posts: [],
    note: "No fetch method succeeded. Ask the user to paste 10-20 recent posts for voice grounding.",
  });
}

function emit(res) {
  process.stdout.write(JSON.stringify(res, null, 2) + "\n");
}

async function tryTwitterApiIo(handle, count) {
  const url = `https://api.twitterapi.io/twitter/user/last_tweets?userName=${encodeURIComponent(handle)}&count=${count}`;
  try {
    const r = await fetch(url, {
      headers: { "x-api-key": TWITTERAPI_IO_KEY },
    });
    if (!r.ok) return { ok: false, source: "twitterapi.io", note: `HTTP ${r.status}` };
    const data = await r.json();
    const tweets = data.tweets || data.data?.tweets || [];
    if (!Array.isArray(tweets) || tweets.length === 0) {
      return { ok: false, source: "twitterapi.io", note: "empty response" };
    }
    return {
      ok: true,
      source: "twitterapi.io",
      handle,
      count: tweets.length,
      posts: tweets.map((t) => ({
        text: t.text || "",
        createdAt: t.createdAt || t.created_at || null,
        url: t.url || (t.id ? `https://x.com/${handle}/status/${t.id}` : null),
        likeCount: t.likeCount ?? t.favorite_count ?? null,
        retweetCount: t.retweetCount ?? t.retweet_count ?? null,
        viewCount: t.viewCount ?? null,
        isReply: t.isReply ?? !!t.inReplyToStatusId ?? null,
      })),
    };
  } catch (err) {
    return { ok: false, source: "twitterapi.io", note: `error: ${err.message}` };
  }
}

async function tryRapidApi(handle, count) {
  // twitter-api45 — common RapidAPI provider; endpoint shape subject to drift.
  const url = `https://twitter-api45.p.rapidapi.com/timeline.php?screenname=${encodeURIComponent(handle)}`;
  try {
    const r = await fetch(url, {
      headers: {
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": "twitter-api45.p.rapidapi.com",
      },
    });
    if (!r.ok) return { ok: false, source: "rapidapi:twitter-api45", note: `HTTP ${r.status}` };
    const data = await r.json();
    const timeline = data.timeline || data.tweets || [];
    if (!Array.isArray(timeline) || timeline.length === 0) {
      return { ok: false, source: "rapidapi:twitter-api45", note: "empty response" };
    }
    const take = timeline.slice(0, count);
    return {
      ok: true,
      source: "rapidapi:twitter-api45",
      handle,
      count: take.length,
      posts: take.map((t) => ({
        text: t.text || t.tweet_text || "",
        createdAt: t.created_at || null,
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
    // Jina's proxy returns messy markdown-ish text; heuristically extract short paragraphs
    // that look like posts (lines of 10-280 chars, not URLs, not @mentions-only).
    const lines = text
      .split(/\n+/)
      .map((l) => l.trim())
      .filter(
        (l) =>
          l.length >= 10 &&
          l.length <= 280 &&
          !/^https?:\/\//.test(l) &&
          !/^@\w+$/.test(l) &&
          !/^\d+$/.test(l) &&
          !/^(Follow|Following|Followers|Posts|Replies)/i.test(l),
      );
    // Deduplicate
    const seen = new Set();
    const candidates = [];
    for (const l of lines) {
      if (!seen.has(l)) {
        seen.add(l);
        candidates.push(l);
      }
      if (candidates.length >= count) break;
    }
    if (candidates.length < 3) {
      return { ok: false, source: "jina-reader", note: "too few candidate lines parsed" };
    }
    return {
      ok: true,
      source: "jina-reader",
      handle,
      count: candidates.length,
      posts: candidates.map((text) => ({ text, createdAt: null, url: null })),
      note: "Best-effort extraction from Jina reader proxy. May include non-post content; treat as partial voice signal and prefer paste mode for accuracy.",
    };
  } catch (err) {
    return { ok: false, source: "jina-reader", note: `error: ${err.message}` };
  }
}

function printUsage() {
  process.stderr.write(
    "Usage: node fetch_x_posts.mjs <handle> [--count N]\n" +
      "Env: TWITTERAPI_IO_KEY (preferred), RAPIDAPI_KEY (fallback)\n" +
      "If no key is set, falls back to Jina reader proxy, then paste-mode signal.\n",
  );
}

main().catch((err) => {
  emit({ ok: false, source: "error", handle, count: 0, posts: [], note: err.message });
  process.exit(0);
});
