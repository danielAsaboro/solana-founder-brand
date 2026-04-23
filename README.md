# solana-founder-brand

A personalized X/Twitter personal-brand playbook skill for Solana founders — grounded in real Solana-founder archetypes, not generic content-marketing advice.

## Install

```bash
npx skills add <your-github>/solana-founder-brand
```

Works with Claude Code, Cursor, GitHub Copilot, Cline, and 15+ other agents.

## What it does

Given a founder's profile, the skill:

1. Matches the founder to one of 8 researched Solana-founder archetypes (or a blend).
2. Optionally pulls recent posts from their X handle for tighter voice grounding.
3. Produces a complete playbook: unique POV, content pillars, writing-style guide, weekly posting rhythm, named engagement playbook (real handles, real Spaces), and 10 example posts in their voice.
4. Emits an importable 4-week content calendar CSV (works with Typefully / Buffer / Hypefury).

## Input

- Founder name (required)
- What they're building (required)
- Background (technical / non-technical / operator / researcher / trader)
- What they care about (DeFi / AI / consumer / infra / etc.)
- Natural communication style (optional — skill infers if missing)
- Their X handle (optional — enables live voice grounding)
- Pasted recent posts (optional — strongest voice signal)

## Output

- A filled `playbook.md` with all 6 sections
- A populated `content-calendar.csv` for the first 4 weeks
- A named engagement playbook pointing at real Solana accounts

## Optional: stronger voice grounding

Set any of these env vars to enable richer fetching:
- `TWITTER_API_BEARER` — X API v2 bearer token
- `RAPIDAPI_KEY` — RapidAPI key for one of the supported Twitter endpoints
- `TAVILY_API_KEY` / `SERPAPI_KEY` / `EXA_API_KEY` — stronger web search for founder background

See `scripts/README.md` for details. Every script degrades gracefully — the skill always works without any keys.

## License

MIT
