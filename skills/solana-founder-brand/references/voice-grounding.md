# Voice Grounding — How the Skill Gets Real Post Data

**Freshness note:** compiled 2026-04-22. Re-verify every 3 months — the X-access landscape shifts monthly as Twitter/X closes off endpoints.

## The honest state of X scraping in April 2026

There is **no reliable zero-auth way** to list a user's recent tweets in April 2026. Nitter public instances are effectively collapsed (constantly rate-limited, 2–3 hosts max, unstable). X's `syndication.twitter.com/srv/timeline-profile/...` endpoint now requires a session cookie. `snscrape` breaks with every X guest-token rotation and is unreliable. The only unauth endpoint that has survived multiple crackdowns is `cdn.syndication.twimg.com/tweet-result?id=<id>` — and that requires you to already know tweet IDs, so it can't bootstrap a profile fetch.

Accept this reality: **"zero setup" in April 2026 means the paste flow is the primary UX, not a last-ditch fallback.** A founder pasting their own 10–20 recent posts is a fantastic voice signal, it's always available, and it never breaks.

## Three-tier architecture

### Tier 1 — Paste (primary, always works)

When the skill needs voice-grounding posts and no key is configured (or when Tier 2 fails), it prompts the user:

> I can match your voice more tightly if you paste 10–20 of your recent X posts. One per line, or separated by `---`. Or paste a URL to a Typefully / Notion / Google Doc that has them. Skip this and I'll use the archetype library alone.

This is the primary Tier 1 path. Not a fallback. Document it in the skill's intake as equally valid as anything else.

### Tier 2 — twitterapi.io (recommended cheap API)

If `TWITTERAPI_IO_KEY` is set, `scripts/fetch_x_posts.mjs` calls twitterapi.io:

```http
GET https://api.twitterapi.io/twitter/user/last_tweets?userName={handle}&count=50
Headers: x-api-key: <TWITTERAPI_IO_KEY>
```

Response shape (simplified):

```json
{
  "tweets": [
    {
      "id": "1234...",
      "text": "the actual post text",
      "createdAt": "2026-04-21T12:34:56.000Z",
      "likeCount": 123,
      "retweetCount": 12,
      "viewCount": 45678,
      "url": "https://x.com/handle/status/1234...",
      "isReply": false,
      "inReplyToStatusId": null
    }
  ]
}
```

Cost: ~$0.15 per 1000 tweets (≈ $0.0075 for 50). Signup free, small signing credit, pay-as-you-go, credits never expire. **This is the recommended Tier 2.**

### Tier 2b — RapidAPI fallback (if user has a RapidAPI account)

If `RAPIDAPI_KEY` is set and `TWITTERAPI_IO_KEY` is not, try `twitter-api45.p.rapidapi.com` or `twitter154.p.rapidapi.com`. More fragile than twitterapi.io (these providers come and go), but free-tier friendly for users who already have RapidAPI keys.

### Tier 3 — Jina reader proxy (best-effort, zero key)

If no key at all is set, `scripts/fetch_x_posts.mjs` attempts one best-effort zero-key fetch via Jina's public reader:

```http
GET https://r.jina.ai/https://x.com/{handle}
```

Jina occasionally returns the profile page text including recent posts. It's inconsistent, partial, and not something to rely on — but it's zero-friction. If it returns parseable post-like text, use it as partial grounding. If it fails or returns garbage, fall straight through to the paste prompt.

**Do not claim to the user that we "fetched your posts" based on Jina output.** Say something like "I was able to pull a few partial post excerpts. Paste your real recent posts for a tighter voice match."

## What never to do

- **Do not scrape with the user's logged-in session cookie.** Fragile, legally murky, and users won't and shouldn't share their login state.
- **Do not target the official X API v2 Free tier.** Effectively posting-only in 2026 (~1 read per 15 min). Shipping a skill that asks users for a $200/mo Basic key is a non-starter for install count.
- **Do not target any X-internal endpoint** (x.com, twitter.com, twimg.com, syndication.twitter.com) as a load-bearing path. Every one of these is one deploy away from breaking. Jina's proxy is the one exception we accept *because* we treat it as best-effort, not load-bearing.

## Web search for founder background — Tavily

For `scripts/web_search.mjs` — when the skill wants to enrich the founder's background (prior projects, talks, interviews) beyond what they typed:

```http
POST https://api.tavily.com/search
Content-Type: application/json

{
  "api_key": "<TAVILY_API_KEY>",
  "query": "\"<founder-name>\" <project> founder background",
  "max_results": 5,
  "search_depth": "basic"
}
```

Response: `{ results: [{ title, url, content, score }], answer }`

**Free tier: 1,000 searches/month, no credit card required.** Best free tier of any web-search API in April 2026. Set `TAVILY_API_KEY`.

Alternatives if the user prefers: `SERPAPI_KEY` (only 100/mo free, $75/mo paid — skip), `EXA_API_KEY` ($10 one-time credits then $49/mo). Tavily is the recommendation.

If no web-search key is set, the skill skips background enrichment and relies only on what the founder typed into the input. Document this honestly.

## Environment variable summary

Surface these in `scripts/README.md` and in any onboarding output:

| Variable | Purpose | Fallback if missing |
|---|---|---|
| `TWITTERAPI_IO_KEY` | X post fetching (recommended) | Try `RAPIDAPI_KEY`, then Jina, then paste |
| `RAPIDAPI_KEY` | X post fetching via RapidAPI providers | Try Jina, then paste |
| `TAVILY_API_KEY` | Founder background web search | Skip enrichment |
| `SERPAPI_KEY` | Alt web search | — |
| `EXA_API_KEY` | Alt web search | — |

All are optional. The skill works — produces a playbook — with none of them set.
