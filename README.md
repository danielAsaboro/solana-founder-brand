# solana-founder-brand

A personalized X/Twitter personal-brand playbook skill for Solana founders — grounded in real Solana-founder archetypes, not generic content-marketing advice.

## Install

```bash
npx skills add danielAsaboro/solana-founder-brand
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

## MCP server (optional — upgrades scripts to first-class tools)

The `mcp/` directory contains an MCP server that exposes `fetch_x_posts`, `web_search`, and `analyze_voice` as native Claude Code tools instead of Bash subprocess calls.

```bash
cd mcp && npm install
```

Then register in your Claude Code project settings (`.claude/settings.json`):

```json
{
  "mcpServers": {
    "solana-founder-brand": {
      "command": "node",
      "args": ["./mcp/server.mjs"],
      "env": {
        "TWITTERAPI_IO_KEY": "your-key-here",
        "TAVILY_API_KEY": "your-key-here"
      }
    }
  }
}
```

Without the MCP server the skill falls back to the `scripts/` equivalents automatically — no keys required, no setup needed.

## Optional: stronger voice grounding

Set any of these env vars (in `.env` or in the MCP server config above) to enable richer fetching:
- `TWITTERAPI_IO_KEY` — twitterapi.io (recommended X source, ~$0.15/1000 tweets)
- `RAPIDAPI_KEY` — RapidAPI twitter-api45 (fallback X source)
- `TAVILY_API_KEY` — Tavily search (recommended, 1000/mo free)
- `EXA_API_KEY` / `SERPAPI_KEY` — web search fallbacks

See `skills/solana-founder-brand/scripts/README.md` for details. Every tool degrades gracefully — the skill always works without any keys.

## License

MIT
