#!/usr/bin/env node
// Extract a voice-style fingerprint from a corpus of posts.
// Pure local analysis — zero network, zero deps.
//
// Usage:
//   echo '{"posts": [...]}' | node analyze_voice.mjs
//   node analyze_voice.mjs --file path/to/posts.json
//   node analyze_voice.mjs --pasted path/to/pasted.txt
//
// Input formats accepted:
//   - JSON (stdin or --file): { posts: [{text: "..."}] } OR [{text: "..."}] OR ["raw strings"]
//   - Pasted text (--pasted): one post per line, or separated by "---" lines
//
// Output (stdout, JSON):
//   {
//     postCount,
//     avgWordsPerPost, medianWordsPerPost, p10WordsPerPost, p90WordsPerPost,
//     avgSentencesPerPost, avgWordsPerSentence,
//     punctuation: { periods, commas, emDashes, ellipses, exclamations, questions, colons, semicolons },
//     capitalization: { sentenceCasePct, lowercaseStartPct, allCapsTokensPct },
//     emojiDensityPer100Words,
//     linkDensityPer100Words,
//     mentionDensityPer100Words,
//     hashtagDensityPer100Words,
//     replyRatio, quoteRatio, threadHintRatio,
//     topTokens: [{token, count}] (top-20 non-stopword tokens)
//   }
//
// Used by the skill to cross-check archetype fingerprints against the founder's
// actual posts (when available) and flag mismatches.

import { readFileSync } from "node:fs";

const STOP = new Set(
  "the and for you your our their that this with have has had are was were will would can could should just its it's is a an i me my we us they them not no yes if then than so but or on in at of to do does did be been being have had have also from about into out up down more most very much many few some any one two three there here how what why when where who whom which whose".split(
    /\s+/,
  ),
);

main();

function main() {
  const args = process.argv.slice(2);
  const fileIdx = args.indexOf("--file");
  const pastedIdx = args.indexOf("--pasted");

  let posts = [];

  if (fileIdx !== -1) {
    posts = parseJsonCorpus(readFileSync(args[fileIdx + 1], "utf8"));
  } else if (pastedIdx !== -1) {
    posts = parsePastedText(readFileSync(args[pastedIdx + 1], "utf8"));
  } else {
    const stdin = readFileSync(0, "utf8");
    try {
      posts = parseJsonCorpus(stdin);
    } catch {
      posts = parsePastedText(stdin);
    }
  }

  if (posts.length === 0) {
    process.stdout.write(JSON.stringify({ error: "no posts parsed from input" }, null, 2) + "\n");
    process.exit(0);
  }

  process.stdout.write(JSON.stringify(analyze(posts), null, 2) + "\n");
}

// --- helpers ---

function parseJsonCorpus(raw) {
  const data = JSON.parse(raw);
  if (Array.isArray(data)) {
    return data.map((x) => (typeof x === "string" ? { text: x } : x)).filter((p) => p.text);
  }
  if (data.posts && Array.isArray(data.posts)) return data.posts.filter((p) => p.text);
  throw new Error("unrecognized JSON shape");
}

function parsePastedText(raw) {
  const cleaned = raw.trim();
  // Split on "---" lines if present, else one-per-line with blank-line separation.
  let chunks;
  if (/^---+$/m.test(cleaned)) {
    chunks = cleaned.split(/^---+$/m);
  } else if (/\n\n/.test(cleaned)) {
    chunks = cleaned.split(/\n\n+/);
  } else {
    chunks = cleaned.split(/\n/);
  }
  return chunks
    .map((c) => c.trim())
    .filter((c) => c.length > 0)
    .map((text) => ({ text }));
}

function analyze(posts) {
  const texts = posts.map((p) => p.text);
  const allWords = texts.flatMap(tokenizeWords);
  const totalWords = allWords.length;

  const wordsPer = texts.map((t) => tokenizeWords(t).length);
  const sortedWords = [...wordsPer].sort((a, b) => a - b);

  const sentencesPer = texts.map((t) => splitSentences(t).length);
  const avgSentencesPerPost = mean(sentencesPer);
  const avgWordsPerPost = mean(wordsPer);
  const avgWordsPerSentence =
    totalWords /
    Math.max(
      1,
      sentencesPer.reduce((a, b) => a + b, 0),
    );

  const concatenated = texts.join("\n");

  const punctuation = {
    periods: countMatches(concatenated, /\./g),
    commas: countMatches(concatenated, /,/g),
    emDashes: countMatches(concatenated, /—/g),
    ellipses: countMatches(concatenated, /\.{3,}|…/g),
    exclamations: countMatches(concatenated, /!/g),
    questions: countMatches(concatenated, /\?/g),
    colons: countMatches(concatenated, /:/g),
    semicolons: countMatches(concatenated, /;/g),
  };

  const postsStartingLowercase = texts.filter((t) => /^[a-z]/.test(t.trim())).length;
  const postsStartingSentenceCase = texts.filter((t) => /^[A-Z]/.test(t.trim())).length;
  const allCapsTokenCount = allWords.filter((w) => w.length >= 2 && /^[A-Z]{2,}$/.test(w)).length;

  const capitalization = {
    sentenceCasePct: pct(postsStartingSentenceCase, texts.length),
    lowercaseStartPct: pct(postsStartingLowercase, texts.length),
    allCapsTokensPct: pct(allCapsTokenCount, totalWords),
  };

  const emojiCount = countMatches(
    concatenated,
    /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu,
  );
  const linkCount = countMatches(concatenated, /https?:\/\/\S+/g);
  const mentionCount = countMatches(concatenated, /(^|\s)@\w+/g);
  const hashtagCount = countMatches(concatenated, /(^|\s)#\w+/g);

  const per100 = (n) => (totalWords === 0 ? 0 : round((n / totalWords) * 100, 2));

  // Reply / quote / thread hints — use post metadata if available, else infer from text.
  const replyCount = posts.filter(
    (p) => p.isReply === true || /^@\w+/.test(p.text.trim()),
  ).length;
  const quoteCount = posts.filter((p) => /https?:\/\/(x|twitter)\.com\/\w+\/status\//.test(p.text))
    .length;
  const threadHintCount = posts.filter(
    (p) => /(\b\d+\/(\d+|\w)?\b|🧵|^\d+\.\s|^\d+\)\s)/.test(p.text) || p.text.length > 240,
  ).length;

  const topTokens = topContentTokens(allWords, 20);

  return {
    postCount: texts.length,
    totalWords,
    avgWordsPerPost: round(avgWordsPerPost, 1),
    medianWordsPerPost: sortedWords[Math.floor(sortedWords.length / 2)] || 0,
    p10WordsPerPost: percentile(sortedWords, 10),
    p90WordsPerPost: percentile(sortedWords, 90),
    avgSentencesPerPost: round(avgSentencesPerPost, 2),
    avgWordsPerSentence: round(avgWordsPerSentence, 1),
    punctuation,
    capitalization,
    emojiDensityPer100Words: per100(emojiCount),
    linkDensityPer100Words: per100(linkCount),
    mentionDensityPer100Words: per100(mentionCount),
    hashtagDensityPer100Words: per100(hashtagCount),
    replyRatio: pct(replyCount, texts.length),
    quoteRatio: pct(quoteCount, texts.length),
    threadHintRatio: pct(threadHintCount, texts.length),
    topTokens,
  };
}

function tokenizeWords(text) {
  return (text || "").match(/[A-Za-z][A-Za-z0-9'_-]*/g) || [];
}

function splitSentences(text) {
  // Simple sentence splitter — good enough for style stats, not for grammar.
  return (text || "")
    .split(/(?<=[.!?…])\s+|\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function mean(arr) {
  if (arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function percentile(sortedArr, p) {
  if (sortedArr.length === 0) return 0;
  const idx = Math.floor((p / 100) * (sortedArr.length - 1));
  return sortedArr[idx];
}

function pct(part, total) {
  if (total === 0) return 0;
  return round((part / total) * 100, 1);
}

function round(n, digits) {
  const f = Math.pow(10, digits);
  return Math.round(n * f) / f;
}

function countMatches(str, re) {
  return (str.match(re) || []).length;
}

function topContentTokens(words, k) {
  const counts = new Map();
  for (const w of words) {
    const lw = w.toLowerCase();
    if (STOP.has(lw) || lw.length <= 2) continue;
    counts.set(lw, (counts.get(lw) || 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([token, count]) => ({ token, count }));
}
