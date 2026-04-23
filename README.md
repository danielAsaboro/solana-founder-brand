# solana-founder-brand

A personalized X/Twitter personal brand playbook skill for Solana founders — grounded in real Solana-founder archetypes, not generic content-marketing advice.

## Install

```bash
npx skills add danielAsaboro/solana-founder-brand
```

Works with Claude Code, Cursor, Codex, Gemini CLI, and 15+ other agents. Installs to `.agents/skills/solana-founder-brand/` and symlinks to each agent's skills directory automatically.

## What it does

Give the skill your name, what you're building, your background, and what you care about. It:

1. Matches you to one of 8 researched Solana-founder archetypes (or a blend).
2. Derives your unique POV — the one perspective you can own on X.
3. Builds a community identity layer: a name for your early users, roles, and how to make them feel like co-owners.
4. Produces 3–4 content pillars, each with a core CTA (the specific action each post drives readers to take).
5. Writes a voice style guide and weekly posting rhythm.
6. Names your engagement playbook: real Solana X handles, regional Telegram/Discord seeding targets, trending-conversation insertion tactics.
7. Generates 10 example posts in your voice — including at least one community post structure (Early Adopter Spotlight, Community Naming Moment, or Proof-of-Use).

Outputs: a filled `playbook.md`, an importable `content-calendar.csv` (Typefully / Buffer / Hypefury), and a machine-readable `engagement-playbook.json`.

## Usage

After installing, just ask in plain English inside any supported agent:

```
Build me a founder brand playbook for my Solana project.
I'm building [what]. Background: [your background].
I care about [what matters to you]. My X handle: @yourhandle
```

Or run non-interactively from a project directory:

```bash
cd your-project
claude -p "Build me a founder brand playbook. I'm building [X]. Background: [Y]. Care about: [Z]." \
  --model sonnet \
  --dangerously-skip-permissions
```

The skill picks up your context from the conversation — name, project, background, communication style, and optionally your X handle for live voice grounding.

## MCP server (optional — upgrades to native tool calls)

The `mcp/` directory contains an MCP server that exposes `fetch_x_posts`, `web_search`, and `analyze_voice` as native Claude Code tools instead of Bash subprocess calls. Without it the skill falls back to the `scripts/` equivalents automatically.

**Setup:**

```bash
# 1. Clone the repo (the installed skill doesn't include the MCP server)
git clone https://github.com/danielAsaboro/solana-founder-brand.git
cd solana-founder-brand

# 2. Install MCP server dependencies
cd mcp && npm install && cd ..

# 3. Copy env template and fill in your keys
cp .env.example .env
# Edit .env — TWITTERAPI_IO_KEY and TAVILY_API_KEY are the two that matter most

# 4. Register in your Claude Code project settings (.claude/settings.local.json or .mcp.json)
# The repo ships a .mcp.json with relative paths — Claude Code picks it up automatically.
```

The `.mcp.json` in the repo root works out of the box once you have the `.env` filled:

```json
{
  "mcpServers": {
    "solana-founder-brand": {
      "command": "node",
      "args": ["--env-file=.env", "./mcp/server.mjs"]
    }
  }
}
```

## Environment variables

All optional — the skill works without any keys using the archetype library and paste fallback. Each key upgrades one capability.

| Variable | What it does | Get one |
|---|---|---|
| `TWITTERAPI_IO_KEY` | Fetch founder's real X posts for voice grounding | [twitterapi.io](https://twitterapi.io) — ~$0.15/1000 tweets, free signup credit |
| `RAPIDAPI_KEY` | Fallback X post fetcher | [rapidapi.com](https://rapidapi.com) |
| `TAVILY_API_KEY` | Web search for founder background enrichment | [tavily.com](https://tavily.com) — 1000/mo free |
| `EXA_API_KEY` | Web search fallback | [exa.ai](https://exa.ai) |
| `SERPAPI_KEY` | Web search fallback | [serpapi.com](https://serpapi.com) |

Without keys the skill still produces a complete playbook — it just uses the archetype library for voice matching instead of the founder's real posts.

## How to report a bug

Open an issue at [github.com/danielAsaboro/solana-founder-brand/issues](https://github.com/danielAsaboro/solana-founder-brand/issues).

## License

MIT
