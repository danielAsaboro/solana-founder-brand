---
name: solana-founder-brand
description: Build a personalized X/Twitter personal brand playbook for Solana founders. Matches the founder to researched Solana-founder archetypes (Protocol Philosopher, Ecosystem Operator, Engineer Minimalist, Contrarian Trader, Research Maximalist, Consumer Storyteller, Degen Builder Poet, Memetic Provocateur) and produces a unique POV, 3–4 content pillars, voice style guide, weekly posting rhythm, named engagement playbook, and 10 example posts written in their voice. Use this whenever a Solana founder asks for help building their personal X presence — founder twitter, personal brand, POV, posting cadence, voice, engagement playbook, or multi-week content plan for their own account (not product-launch tweets or project-account copy) — or when they want to differentiate their personal account from their project account. Grounds outputs in real Solana-founder patterns studied from anchor accounts, not generic advice, and can optionally pull live posts from an anchor handle for tighter voice matching. Always use this skill when the user mentions "founder brand", "founder twitter", "founder voice", "personal brand on X", or "content strategy as a founder" in a Solana/crypto context, even if they don't explicitly ask for a "playbook". Do NOT use for: single-tweet or thread drafting for a product launch, SEO / landing-page copy, LinkedIn bios, podcast or PR outreach, user acquisition / growth marketing, or Twitter account support (suspensions, appeals).
---

# Solana Founder Brand Playbook

## What this skill does

Given a founder's profile, produce a complete, personalized X/Twitter personal-brand playbook grounded in how successful Solana founders actually post. The output is not generic content-marketing advice — it's archetype-matched, ecosystem-specific, and optionally voice-grounded in real recent posts.

## Inputs this skill expects

Ask the user for any of these that are missing. Don't block on optional fields; make reasonable inferences and flag them:

- **Founder name** (required — if the user doesn't provide one, ask once; if they still decline, use "`{{Project}} Founder`" or "the `{{archetype}}` founder" as a placeholder throughout the playbook and flag the gap in the output)
- **What they're building** — one or two sentences (required)
- **Background** — technical / non-technical / operator / researcher / trader / designer, prior projects or roles (required if you can get it)
- **What they care about most** — DeFi / AI / consumer crypto / infra / privacy / MEV / governance / etc. (helpful for content pillars)
- **Natural communication style** — casual / analytical / contrarian / storyteller / meme-fluent / minimalist (helpful for archetype match)
- **Optional: their X handle** — if provided, the skill can fetch recent posts via the `fetch_x_posts` MCP tool (or `scripts/fetch_x_posts.mjs` as fallback) for tighter voice matching
- **Optional: 5–10 pasted recent posts** — if the founder already has an account, pasting real posts is the strongest voice signal
- **Optional: project/company X handle** — so the output can explicitly differentiate the personal voice from the project voice

## How the skill reasons (end-to-end flow)

Follow this flow every time. Don't skip steps even if a section feels easy — the point is that each step is grounded, not improvised.

### Step 1. Match the founder to an archetype (or a blend of two)

Read `references/solana-archetypes.md` and pick the archetype(s) that best fit the founder's background, interests, and stated communication style. If two feel roughly equal, blend them — e.g. "Engineer Minimalist × Contrarian Trader" — and note the blend ratio (e.g. 70/30).

Write a 2–3 sentence "archetype rationale" explaining why this archetype fits this founder. This becomes the POV section's scaffolding.

### Step 2. Gather voice-grounding material

The more real post data you have, the better the voice match. The primary path is **paste** — X scraping in 2026 is unreliable, and asking the founder to paste their own recent posts is both the lowest-friction and highest-quality path. Prefer it.

In order of preference:

1. **If the user pasted recent posts**, use them directly as primary voice-grounding examples. This is the best signal — real posts from the real founder.
2. **If the user provided their X handle (and hasn't pasted)**, call the `fetch_x_posts` MCP tool with `{handle}`. Falls back automatically through twitterapi.io → RapidAPI → Jina reader → paste-mode signal. If `ok: true`, use the posts as grounding. If `ok: false` with `source: "paste-mode"`, ask the founder to paste posts instead. (No MCP server? Run `scripts/fetch_x_posts.mjs <handle>` via Bash — same logic, same envelope.)
3. **Optional analysis pass:** call the `analyze_voice` MCP tool with `{posts: [array of post strings]}` to get a style fingerprint (sentence lengths, punctuation, capitalization, emoji density, reply ratio). Cross-check against the matched archetype's fingerprint in `solana-archetypes.md`. If the founder's actual voice diverges strongly from the archetype, note the divergence and adjust the style guide. (No MCP? Pipe posts through `scripts/analyze_voice.mjs`.)
4. **If no post data is available at all**, rely on the archetype's anchor-account post structures from `references/solana-archetypes.md` as your voice reference. Be explicit in the output that the voice match is archetype-only, not founder-grounded.

For founder background enrichment, call the `web_search` MCP tool with `{query: "<founder name> <project>"}` to pull prior projects, talks, interviews — useful for discovering content pillars the founder may not have mentioned. (No MCP? Run `scripts/web_search.mjs "<query>"` via Bash.)

If any tool or script call fails, do not block. Degrade one tier down the preference list and continue.

### Step 3. Derive the unique POV

Using the archetype's lens combined with what the founder is building and cares about, write the **one perspective this founder should own on X**. A good POV is:

- Specific — not "DeFi is the future" but "DeFi's next leg is consumer-facing spending, not yield farming"
- Testable over time — the founder can build conviction publicly as the thesis plays out
- Anchored to what they're uniquely positioned to see — their build, their background, their ecosystem vantage point
- One sentence, maybe two. Not a paragraph.

### Step 3.5. Community layer

Community identity is the delta between products that disappear after a hackathon and products that process $7M and raise their pre-seed. Define it early so every post can reinforce it.

Produce:
- **Follower identity name (1–2 options):** What will this founder's early users call themselves? Ground the name in the POV and product. Examples: "Falcons" (LBs), "Pajas" (Pass Cash), "Cadience" (Soflair). The name should feel like something the user would claim, not a brand label stamped on them.
- **2–3 early community roles:** Titles the founder can assign to engaged users — e.g. "Beta Listener", "Discovery Ambassador", "Founding Curator". Roles create ownership; they should feel meaningful, not gamified.
- **Economic ownership framing:** One or two sentences on how being early is materially valuable — not just emotional. What does an early user get that later users won't? (Access, allocation, feature input, credit, revenue share, co-design influence.)

This output feeds the `## Community Layer` section in the playbook template.

### Step 4. Content pillars (3–4)

Pick recurring topics the founder can post about consistently without running dry. Each pillar should have:
- A one-line description
- 2–3 example angles under it
- A rough weekly post volume suggestion
- **`core_cta`** — one line stating the action the post drives: "The post drives the reader to [action]." Example: `core_cta: "Try Dripfm as a curator"`. This is the single action that provides value to the startup. If you can't name the action, the pillar is too vague — sharpen it.

Pull pillar patterns from the matched archetype's content mix in `references/solana-archetypes.md`.

### Step 5. Writing style guide

Write the voice style guide. Use the matched archetype's voice fingerprint from `references/solana-archetypes.md` (sentence length, punctuation rhythm, jargon density, self-disclosure level, use of capitalization, etc.) as the base, then tailor to the founder's stated style and the grounding posts from Step 2.

Include:
- Tone
- Sentence structure and rhythm
- Use of jargon (how much, which terms are OK vs. overused)
- How personal to get
- What never to do (pull from `references/anti-slop-rules.md`)

### Step 6. Weekly posting rhythm

Pull the archetype's cadence from `references/solana-archetypes.md` and adapt to the founder's likely time budget. Specify:
- Total posts per week
- Mix: threads / short takes / replies / quote-tweets / memes (as rough percentages)
- Best-time heuristics for Solana Twitter (US timezones matter — most Solana audience is US)
- Which days are for what

### Step 7. Engagement playbook

**Before targeting Tier 1 X handles**, identify the 1–2 regional communities where this founder's target user base is already active. The first community post goes there, not on the main timeline. Local seeding converts faster than cold outreach to large handles. See the `## Regional seeding channels` section in `references/ecosystem-graph.md` for the channel list.

Read `references/ecosystem-graph.md` for the named Solana X ecosystem. Produce:
- **Regional seeding targets** — 1–2 specific Telegram groups, Discord servers, or Farcaster channels where the founder's first users are already gathered
- **Tier 1 handles** — 5–10 high-signal accounts to reply to regularly (daily/every-other-day)
- **Tier 2 handles** — 15–25 accounts to engage weekly
- **Spaces / AMAs / communities** — recurring events this archetype should show up in
- **Trending-conversation insertion tactics** — how to jump into existing threads without looking thirsty

Pick handles that match the archetype's natural adjacencies, not just popular accounts.

### Step 8. Ten example posts in the founder's voice

This is the hardest and most judged output. Generate exactly 10 posts that:
- Cover the 3–4 content pillars (rough distribution proportional to pillar weight)
- Use the archetype's post structures from `references/post-structures.md` (pick from the structure templates, don't invent)
- Apply the writing style guide from Step 5 strictly
- **Run through the anti-slop filter** in `references/anti-slop-rules.md` before returning any post. If a post contains a banned pattern, rewrite it.
- Use **at least 6 different structures** from the selected archetype's set (variety within voice is what makes posts feel alive; monotony of structure reads as algorithmic)
- Include at least 1 thread opener, 1 short take, 1 reply/engagement template, 1 values/POV post, 1 archetype-specific format natural to the matched archetype
- Include **at least 1 community post structure** from the `## Community Post Structures` section in `references/post-structures.md` (Early Adopter Spotlight, Community Naming Moment, or Proof-of-Use) — these apply to all archetypes and are often the highest-repost posts in a founder's first 10

**Read the right example before writing.** Before generating, read the worked example that matches the primary archetype:

- Engineer Minimalist / Protocol Philosopher → `assets/examples/defi-technical.md`
- Consumer Storyteller → `assets/examples/consumer-storyteller.md`
- Research Maximalist / Contrarian Trader → `assets/examples/researcher-contrarian.md`
- For archetypes without a specific example (Ecosystem Operator, Degen Builder Poet, Memetic Provocateur), read the closest-match example and adapt the voice. The example teaches structure, length, and tone — do not copy its claims, names, or specifics.

**Anti-copy discipline (critical).** The example founder/project in each file is fictional, and the real user's input may coincidentally look similar (same archetype, adjacent project). When the user's situation overlaps closely with the example:
- Use the example only for *structure, length, tone, cadence* — never for content.
- Explicitly vary the POV angle, the pillar weights, the specific claims, and the post phrasing.
- If you catch yourself about to emit a line that mirrors the example verbatim, rewrite it. The example is a voice reference, not a template to clone.

### Step 9. Assemble the deliverables

Three artifacts go back to the founder. **Produce all three. This is a checklist, not optional.**

1. **Populated playbook** — read `assets/templates/playbook.md`, fill in the `{{PLACEHOLDERS}}` with outputs of Steps 3–8, and return it as the **primary** output. This is the human-readable deliverable the founder uses.

2. **Populated content calendar** — read `assets/templates/content-calendar.csv`, fill in the `{{W#_DAY_HOOK}}` / `{{W#_DAY_DRAFT}}` placeholders with a 4-week plan from Step 6 and the example posts from Step 8 (spread across weeks as drafts or as hooks the founder can expand). Save the filled version to the working directory (e.g. `./<founder-slug>-content-calendar.csv`) and point them at the path. Works with Typefully / Buffer / Hypefury importers.

3. **Populated engagement-playbook.json** — read `assets/engagement-playbook.json`, fill in the `{{PLACEHOLDER}}` values with the structured outputs, and emit it as a secondary artifact. This enables downstream tools (schedulers, analytics, agent chains) to consume the playbook programmatically.

**Before ending your turn, verify:**
- [ ] The playbook markdown has been produced with every section filled in (no leftover `{{PLACEHOLDERS}}`).
- [ ] The `## Community Layer` section has a follower identity name, 2–3 roles, and an economic ownership framing.
- [ ] Each content pillar has a `core_cta` line.
- [ ] The engagement playbook names at least 2 regional communities (not just X handles).
- [ ] At least 1 of the 10 example posts uses a community post structure (C1/C2/C3 from `references/post-structures.md`).
- [ ] The content-calendar CSV has been saved to a real path, with all 28 slot rows populated.
- [ ] The engagement-playbook JSON has been produced and the `content_calendar_csv_path` field points at the saved CSV's path (not the template path).
- [ ] No 🚀 / 🔥 / "excited to announce" appear in any example post (anti-slop pass per `references/anti-slop-rules.md`).
- [ ] If the archetype's worked example has a close name/project collision with the user's input, you've explicitly varied the content, not just the names.

If a deliverable fails to produce: the populated `playbook.md` takes priority. Flag any missing deliverable explicitly in your closing message to the user.

## Anti-slop pass (critical)

Before returning the final playbook, read `references/anti-slop-rules.md` and scan every generated sentence — especially the 10 example posts — for LLM tells. Rewrite anything that pattern-matches. This single step is what separates this skill from every other founder-content wrapper.

## When to degrade gracefully

- Script fetches fail → continue with archetype library only.
- Web search fails → continue with what the user provided.
- User declined to share background → ask once, then infer from name/project if they still don't share.

Never block. Never error out. Always produce a playbook, even if some sections are thinner than ideal — and flag what was thin so the user can fill it in.

## What to tell the user at the end

After returning the playbook, briefly mention:
1. Which archetype (or blend) you matched them to and why — 1 sentence.
2. That the content-calendar CSV is available at `assets/templates/content-calendar.csv` (populated with their 4-week plan).
3. One specific next action — typically: "Start with post #1 from the examples tomorrow morning US-time."

## Files you will use

**References (read as needed):**
- `references/solana-archetypes.md` — the 8 archetypes with fingerprints, anchor accounts, content mix, example post structures (read only the matched archetype's section, not the whole file)
- `references/ecosystem-graph.md` — real handles, Spaces, communities, cadences
- `references/anti-slop-rules.md` — banned LLM tells and mandatory rewrites
- `references/post-structures.md` — archetype-specific post templates
- `references/voice-grounding.md` — how scripts + paste fallback work, env vars for stronger fetching

**MCP tools (preferred — call directly if the `solana-founder-brand` MCP server is running):**
- `fetch_x_posts {handle, count?}` — tiered X post fetcher; returns JSON envelope
- `web_search {query, max?}` — tiered web search for founder background
- `analyze_voice {posts: string[]}` — local voice-style fingerprint; zero network

**Scripts (fallback — use via Bash if MCP server is not configured):**
- `scripts/fetch_x_posts.mjs <handle>` — same logic as `fetch_x_posts` tool
- `scripts/web_search.mjs "<query>"` — same logic as `web_search` tool
- `scripts/analyze_voice.mjs` — same logic as `analyze_voice` tool (pipe posts JSON in)

**Assets (templates to populate + examples for few-shot grounding):**
- `assets/templates/playbook.md` — the primary deliverable template
- `assets/templates/content-calendar.csv` — 4-week importable calendar
- `assets/templates/thread-scaffold.md` — thread structures per archetype
- `assets/templates/reply-ladder.md` — tiered engagement scaffold
- `assets/examples/defi-technical.md` — worked example, Engineer Minimalist × Protocol Philosopher
- `assets/examples/consumer-storyteller.md` — worked example, Consumer Storyteller
- `assets/examples/researcher-contrarian.md` — worked example, Research Maximalist × Contrarian Trader
- `assets/follow-list.opml` — importable anchor account list by archetype
- `assets/engagement-playbook.json` — machine-readable playbook schema
