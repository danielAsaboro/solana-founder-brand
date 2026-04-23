# Scripts — Runtime helpers for the solana-founder-brand skill

All scripts are Node ESM (`.mjs`), zero external dependencies, run with any recent Node. They degrade gracefully — if nothing works, they emit a JSON envelope saying so and the skill continues with the bundled archetype library alone.

## `fetch_x_posts.mjs`

Tiered X post fetcher.

```bash
node fetch_x_posts.mjs <handle> [--count 50]
```

**Sources tried (first that works wins):**

1. **`twitterapi.io`** — set `TWITTERAPI_IO_KEY`. Recommended. ~$0.15 per 1000 tweets, free signup credit, no X auth required.
2. **RapidAPI `twitter-api45`** — set `RAPIDAPI_KEY`. Free tier on RapidAPI is usually enough for hackathon-scale use.
3. **Jina reader proxy** — zero-key best-effort. Sometimes returns partial post text from X profile pages; treat as weak signal.
4. **Paste-mode signal** — when nothing worked, emits `{ source: "paste-mode", ok: false, note: "..." }` so the caller asks the user to paste posts.

**Output shape:**

```json
{
  "ok": true,
  "source": "twitterapi.io",
  "handle": "aeyakovenko",
  "count": 50,
  "posts": [
    { "text": "...", "createdAt": "...", "url": "...", "likeCount": 123 }
  ]
}
```

The skill uses this output as voice-grounding input to `analyze_voice.mjs` and as example material for Step 8 (10 posts in their voice).

## `web_search.mjs`

Tiered web search for founder background enrichment.

```bash
node web_search.mjs "<query>" [--max 5]
```

**Providers tried (first found wins):**

1. **Tavily** — set `TAVILY_API_KEY`. **Recommended.** 1000/mo free, no credit card required at signup.
2. **Exa** — set `EXA_API_KEY`. $10 one-time credits, then $49/mo.
3. **SerpAPI** — set `SERPAPI_KEY`. 100/mo free, then $75/mo. Not recommended unless you already have a key.

**If no key is set**, emits `{ ok: false, source: "unavailable" }` and the skill skips enrichment — it still produces a playbook using the user's typed inputs + archetype library.

## `analyze_voice.mjs`

Extracts a voice-style fingerprint from a corpus of posts. Pure local analysis, no network.

```bash
# From a fetch_x_posts.mjs output
node fetch_x_posts.mjs someone | node analyze_voice.mjs

# From pasted posts (one per line, or separated by --- lines)
node analyze_voice.mjs --pasted /tmp/my-posts.txt

# From a JSON file
node analyze_voice.mjs --file /tmp/posts.json
```

**Output:** JSON with sentence-length stats, punctuation frequencies, capitalization tendency, emoji/link/mention/hashtag density, reply/quote/thread ratios, and top content tokens. The skill cross-checks this against the matched archetype's fingerprint in `references/solana-archetypes.md` and flags/adjusts for mismatch.

## Environment variable summary

All optional. Skill works with zero keys set; each key just adds a better tier.

| Variable | Used by | Effect if missing |
|---|---|---|
| `TWITTERAPI_IO_KEY` | `fetch_x_posts.mjs` | Tries RapidAPI, then Jina, then paste mode |
| `RAPIDAPI_KEY` | `fetch_x_posts.mjs` | Tries Jina, then paste mode |
| `TAVILY_API_KEY` | `web_search.mjs` | Tries Exa, then SerpAPI, then skip |
| `EXA_API_KEY` | `web_search.mjs` | Tries SerpAPI, then skip |
| `SERPAPI_KEY` | `web_search.mjs` | Skips web enrichment |

## Why Node and not Python?

The `npx skills` ecosystem is Node-native. Every machine that runs the skill already has Node installed via `npx`. These scripts use only built-in `fetch` and `node:fs` — zero `npm install` step, nothing to break.

## Freshness

The `fetch_x_posts.mjs` endpoint URLs and response shapes will drift as providers change. If this skill is still installed 6+ months after the hackathon, re-verify `twitterapi.io` and RapidAPI endpoints and adjust. See `references/voice-grounding.md` for the endpoint research and reasoning.
