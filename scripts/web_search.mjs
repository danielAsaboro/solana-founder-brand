#!/usr/bin/env node
// Tiered web search for founder background enrichment. Degrades gracefully.
//
// Usage:
//   node web_search.mjs "<query>" [--max 5]
//
// Writes JSON to stdout:
//   { source, query, results: [{title, url, content, score?}], answer?, note? }
//
// Providers tried in order (first key found wins):
//   1. Tavily   (TAVILY_API_KEY — recommended; 1000/mo free)
//   2. Exa      (EXA_API_KEY)
//   3. SerpAPI  (SERPAPI_KEY)
//   4. Unavailable signal (always — caller handles gracefully)
//
// Never exits non-zero — always emits a JSON envelope.

const args = process.argv.slice(2);
if (args.length === 0 || args[0].startsWith("-")) {
  printUsage();
  process.exit(2);
}

const query = args[0];
const maxArg = args.indexOf("--max");
const max = maxArg !== -1 ? parseInt(args[maxArg + 1], 10) || 5 : 5;

const TAVILY_API_KEY = process.env.TAVILY_API_KEY;
const EXA_API_KEY = process.env.EXA_API_KEY;
const SERPAPI_KEY = process.env.SERPAPI_KEY;

async function main() {
  if (TAVILY_API_KEY) {
    const res = await tryTavily(query, max);
    if (res.ok) return emit(res);
  }
  if (EXA_API_KEY) {
    const res = await tryExa(query, max);
    if (res.ok) return emit(res);
  }
  if (SERPAPI_KEY) {
    const res = await trySerpApi(query, max);
    if (res.ok) return emit(res);
  }
  return emit({
    ok: false,
    source: "unavailable",
    query,
    results: [],
    note: "No web-search API key set. Skipping background enrichment; continue with user-provided inputs and archetype library.",
  });
}

function emit(res) {
  process.stdout.write(JSON.stringify(res, null, 2) + "\n");
}

async function tryTavily(query, max) {
  try {
    const r = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        api_key: TAVILY_API_KEY,
        query,
        max_results: max,
        search_depth: "basic",
        include_answer: true,
      }),
    });
    if (!r.ok) return { ok: false, source: "tavily", note: `HTTP ${r.status}` };
    const data = await r.json();
    const results = (data.results || []).map((x) => ({
      title: x.title || "",
      url: x.url || "",
      content: x.content || x.snippet || "",
      score: x.score ?? null,
    }));
    return { ok: true, source: "tavily", query, answer: data.answer || null, results };
  } catch (err) {
    return { ok: false, source: "tavily", note: `error: ${err.message}` };
  }
}

async function tryExa(query, max) {
  try {
    const r = await fetch("https://api.exa.ai/search", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": EXA_API_KEY,
      },
      body: JSON.stringify({ query, numResults: max, type: "neural", contents: { text: true } }),
    });
    if (!r.ok) return { ok: false, source: "exa", note: `HTTP ${r.status}` };
    const data = await r.json();
    const results = (data.results || []).map((x) => ({
      title: x.title || "",
      url: x.url || "",
      content: x.text || "",
      score: x.score ?? null,
    }));
    return { ok: true, source: "exa", query, results };
  } catch (err) {
    return { ok: false, source: "exa", note: `error: ${err.message}` };
  }
}

async function trySerpApi(query, max) {
  try {
    const url = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(query)}&num=${max}&api_key=${SERPAPI_KEY}`;
    const r = await fetch(url);
    if (!r.ok) return { ok: false, source: "serpapi", note: `HTTP ${r.status}` };
    const data = await r.json();
    const organic = data.organic_results || [];
    const results = organic.slice(0, max).map((x) => ({
      title: x.title || "",
      url: x.link || "",
      content: x.snippet || "",
      score: null,
    }));
    return { ok: true, source: "serpapi", query, results };
  } catch (err) {
    return { ok: false, source: "serpapi", note: `error: ${err.message}` };
  }
}

function printUsage() {
  process.stderr.write(
    "Usage: node web_search.mjs \"<query>\" [--max N]\n" +
      "Env (first found wins): TAVILY_API_KEY, EXA_API_KEY, SERPAPI_KEY\n",
  );
}

main().catch((err) => {
  emit({ ok: false, source: "error", query, results: [], note: err.message });
  process.exit(0);
});
