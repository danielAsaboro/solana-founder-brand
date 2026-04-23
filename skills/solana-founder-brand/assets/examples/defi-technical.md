# Yara Shin — Founder Brand Playbook

> **For:** Yara Shin, building Velocity (a Solana orderbook DEX with novel MEV-resistant settlement)
> **Archetype match:** Engineer Minimalist × Protocol Philosopher (70/30)
> **Generated:** 2026-04-22

## Archetype rationale

Yara has a Rust + systems background, ships more than she posts, and genuinely thinks in tradeoffs — her stated style is "analytical, terse, occasionally sarcastic." That profile sits almost exactly on the Engineer Minimalist anchor, with enough protocol-design depth to blend in Protocol Philosopher for the longer threads when Velocity's MEV-resistance work is worth unpacking.

---

## 1. Unique POV — the one perspective you should own on X

**Orderbooks are coming back to crypto, and the people who understand why will be the ones who already burned themselves on AMMs.**

Why this is your lane: you've built matching engines in traditional finance. You're among ~50 people on Solana who have actually written both an AMM and an orderbook for production use. That vantage point is rare and recent; you can talk about the real tradeoffs — not the marketing version. Nobody else is positioned to make this argument with authority.

Near-term markers that prove the thesis (check back in 6 months):

- Orderbook DEX volume on Solana relative to AMM volume trending upward
- At least two new Solana perps/spot projects shipping with orderbook primitives
- AMM v4 conversations increasingly acknowledge MEV-tax as a structural problem, not a tuning issue

---

## 2. Content pillars

### Pillar 1 — Why orderbooks return (40%)
The technical and market-structure case for orderbook DEXs on Solana now. Informed by what went wrong with AMMs, what's different about Solana's execution, and where the real liquidity is moving.

Example angles:
- What AMM LPs actually earn after MEV extraction vs. what the dashboards claim
- Why Solana's 400ms block time changes the orderbook vs. AMM calculus in a way Ethereum's 12s can't
- The specific mechanisms Velocity uses to resist MEV and why "just use a private mempool" misses the point

### Pillar 2 — Shipping and technical craft (30%)
What you're building on Velocity this week. Terse updates that signal momentum without marketing-speak.

Example angles:
- Shipping notes on specific subsystems
- Rust-in-anger observations — crate choices, compile times, debugging war stories
- Brief opinions on tooling (Anchor vs. raw, Helius vs. own RPC, etc.)

### Pillar 3 — Tradeoffs most people miss (20%)
First-principles unpacking of a design choice or ecosystem debate, 3–5 tweets at a time. This is where the Protocol Philosopher side shows up.

Example angles:
- Why a specific "obvious" Solana design choice is counterintuitively correct
- Hardware/physics bounds on something the discourse treats as a software problem
- A retraction or updated view when new data shifts your read

### Pillar 4 — Dry personality (10%)
Rare, deliberate: a team win, a hard week, a memorable bug story. Lands because of contrast with the terse default.

---

## 3. Writing style guide

**Tone:** terse, analytically confident, dry. Occasionally sarcastic at bad ideas. Never earnest-inspirational.

**Sentence structure:** short. Most sentences 5–15 words. Occasional medium sentence when a technical tradeoff needs unpacking. Almost never runs long.

**Jargon:** high and precise. "MEV," "CLOB," "JIT liquidity," "latency-bounded matching" used without defining them. Assume reader competence.

**How personal to get:** low-medium. Work and team milestones fine, personal life rarely. Let the technical opinions do the personality work.

**Capitalization:** normal sentence case. Occasional lowercase for softer takes. Not meme-lowercase.

**Specific things to do:**
- State claims directly; don't hedge unless you're genuinely uncertain
- When you're wrong, say so plainly in a new post — don't delete
- Use specific numbers and specific systems in takes; "fast" means nothing, "sub-millisecond" means something

**Specific things to avoid:**
- Exclamation points (use maybe once a month)
- Emojis as applause (🔥, 🚀, 💪) — off-voice
- "Excited to announce" — replace with "shipping X"
- Three-part lists of abstractions ("it's faster, cheaper, and more scalable")
- Em-dashes in more than 1 post out of 5

---

## 4. Weekly posting rhythm

**Total posts/week target:** 8–12 (bursty, event-driven)

**Mix:**
- Short takes: 65%
- Medium threads (3–6 tweets): 10%
- Long threads (7+ tweets): 2%
- Quote-tweets: 15%
- Replies: 8%

**Best windows (US Eastern):**
- 9:00–11:00 AM ET — for substantive takes
- 2:00–4:00 PM ET — for ship updates and QTs

**Day-of-week rhythm:**
- **Monday:** quiet day — read timeline, don't post unless something specific
- **Tue–Thu:** main posting days. Threads land best Tuesday or Wednesday morning
- **Friday:** ship-day energy — terse "shipped X" posts perform well PM
- **Sat–Sun:** Sunday morning is good for a thesis short-take that can sit at top of timeline longer

---

## 5. Engagement playbook

### Tier 1 — engage daily or every other day

- **@aeyakovenko** — Solana co-founder. Reply mode: substantive add on consensus/execution tradeoffs when genuinely additive.
- **@armaniferrante** — Anchor/Backpack engineering. Reply mode: reply-as-substance on technical threads.
- **@0xMert_** — Helius CEO, ecosystem stats. Reply mode: specific data counter when his FUD-rebuttal misses a nuance.
- **@0xSiong** — Jupiter engineering. Reply mode: cross-protocol technical exchange.
- **[2–3 derivatives-protocol founders]** — pick anchor accounts from Drift/Zeta/Bonk ecosystem adjacent to Velocity's market.

### Tier 2 — engage weekly

- Validator and infra founders whose posts touch MEV/block-building
- Academic-adjacent researchers on order matching / market microstructure
- Multicoin / Framework research posts (Kyle Samani, Tushar Jain) — engage when their thread touches market-structure

### Spaces, AMAs, and communities

- Listen to Lightspeed Pod weekly; guest-pitch once Velocity is live
- Join Solana Foundation dev Spaces adjacent to execution/infra topics
- Participate in Colosseum track channels during hackathon windows
- Superteam technical Telegram groups

### Insertion tactics for this archetype

- Reply with specific numbers, not opinions. If someone says "AMMs are inefficient," don't say "agree" — say "empirically: AMM LPs on Solana lost ~X bps to MEV over Y period based on Z source."
- When a Solana technical decision is getting flak, steelman the flak in one line, then give the specific reason it doesn't hold. The steelman-first move earns more trust than just defending.
- Never dunk on other Solana founders. In-ecosystem disagreements go to DM or are framed as "alternative framing" not "you're wrong."

---

## 6. Ten example posts in your voice

### Post 1 — Single-sentence shipping update (Pillar 2)

shipped the matching-engine throughput improvement today. 2.1x on the p99 path. rust was the right call here.

### Post 2 — First-principles one-liner (Pillar 1)

400ms block time changes everything about orderbook economics. on 12s blocks you need an AMM. on 400ms you have a choice again.

### Post 3 — Tradeoff unpacking thread (Pillar 3)

"Orderbooks don't work on-chain" is the single most repeated wrong thing in DeFi.

The people saying this are reasoning from 2020 Ethereum, where blockspace was $2/tx and confirmation took 12 seconds. In that world, yes.

Solana is a different world. 400ms finality, 0.00025 lamport priority floors, and execution that can actually match against a book in real time.

The real question isn't "can orderbooks work on-chain." It's "what subset of trading needs an AMM when blockspace is cheap enough for a CLOB."

Short answer: long-tail assets still want AMMs. Major pairs, large size, latency-sensitive flow — those want books. That's how Velocity splits it.

### Post 4 — Terse tech take (Pillar 2)

if you're still writing Anchor for high-throughput paths, stop. raw Solana programs. ship 6 months sooner. debug slightly harder. worth it.

### Post 5 — Dry meme-literacy quote-tweet (Pillar 1)

[Quote-tweeting a thread claiming "AMMs won permanently"]

the people who say AMMs won have never had an LP position measured against their cost basis after MEV.

### Post 6 — Reply-as-substance (Pillar 3)

[Reply to a thread about Solana's concurrent execution]

the bit everyone skips: concurrent execution only matters if your program's state is actually partitionable. most protocols accidentally serialize themselves through shared pools. that's not a protocol bug, that's the hard design work.

### Post 7 — Wrong-in-public retraction (Pillar 1)

thought hybrid AMM-book designs were a transitional kludge. been watching the data on a few for ~3 months. wrong. in specific conditions (thin books, bursty flow) the hybrid actually outperforms either pure design. updated.

### Post 8 — Short stat-forward take (Pillar 1)

CLOB share of Solana DEX volume: 19% → 31% over the last 6 months. this trend matters more than any single launch.

### Post 9 — Dry personality (Pillar 4)

week 8 of writing orderbook matching in production rust. lifetimes are the friend who tells you the truth.

### Post 10 — Quote-tweet market interpretation (Pillar 1)

[Quote-tweeting news of a major Ethereum L2 adding orderbook support]

note the direction. even L2s with 2s blocks are convinced. the default is shifting.

---

## Next steps

1. Post #1 tomorrow in the 2:00 PM ET window.
2. Follow the 4-week content calendar (see `content-calendar.csv`).
3. Start each day with 15 minutes of Tier 1 reply work.
4. Revisit this playbook after 4 weeks — which pillars got traction, rebalance.

## Appendix — differentiating your personal account from Velocity

- **@velocity_xyz** (project): orderbook updates, performance stats, onboarding flows, support.
- **@yara_shin** (you): why orderbooks, what you're learning building one, ecosystem commentary, dry one-liners.

Product → project account. Perspective → personal. When in doubt, ask: is this about Velocity, or about how I see the market? If the former: Velocity. If the latter: you.
