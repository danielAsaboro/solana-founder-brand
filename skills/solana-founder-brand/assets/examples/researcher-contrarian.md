# Danyal Rashid — Founder Brand Playbook

> **For:** Danyal Rashid, building Converge (a Solana perpetuals protocol with a novel funding-rate mechanism that separates directional and volatility risk for LPs)
> **Archetype match:** Research Maximalist × Contrarian Trader (60/40)
> **Generated:** 2026-04-22

## Archetype rationale

Danyal has a quant-research background (5 years at a crypto-native prop shop), transitioned to founder with a trading-informed protocol design, and writes in a thesis-first, framework-driven register. His stated style is "analytical and willing to make uncomfortable calls." That's Research Maximalist as primary voice, with Contrarian Trader's market-narrative sharpness borrowed for one-liners and counter-consensus takes.

---

## 1. Unique POV — the one perspective you should own on X

**Perp DEXs are pricing risk wrong, and it's not a fee problem — it's that directional and volatility risk share one pool, and LPs pay for both.**

Why this is your lane: you spent five years running a book that decomposed these risks separately. You've seen the P&L split in a way that most DeFi designers haven't because they've never traded size in production markets. The argument is yours to make because the data you've already looked at privately supports it, and you're now putting it in an open protocol.

Near-term markers that prove the thesis:

- LP churn data on major perp DEXs correlated with volatility regimes, not volume
- A second team adopting a two-pool (directional / volatility) design in 2026
- Structured-product builders noticing the LP side specifically, not just the trader side

---

## 2. Content pillars

### Pillar 1 — The LP risk-decomposition thesis (40%)
The core argument and its implications, developed over many weeks. Multiple threads refining the same framework.

Example angles:
- Formal decomposition of perp LP returns in normal vs. volatile regimes
- Empirical evidence from other ecosystems of LP burnout after vol spikes
- Specific design choices in Converge that cleanly separate the two risks

### Pillar 2 — Cross-protocol comparative analysis (30%)
Compare perp DEX designs (Solana and otherwise) against the framework. Show where each one bundles vs. separates the risks. This is where Research Maximalist is at its strongest.

Example angles:
- Design-comparison threads of 3–4 named protocols against the framework
- "Updated my view on protocol X" threads when evidence shifts

### Pillar 3 — Counter-consensus market takes (20%)
Contrarian-Trader-flavored shorter posts. Narrative-setting one-liners about what the market is pricing wrong.

Example angles:
- "Everyone thinks X; they're missing Y" posts about derivatives market structure
- Post-mortems when a cycle moment proves or disproves a thesis
- Quote-tweet reframes of market news

### Pillar 4 — Post-mortems and retractions (10%)
When the thesis updates or was wrong, say so plainly. This is how research voices earn trust.

---

## 3. Writing style guide

**Tone:** analytical, precise, willing to be wrong publicly. Drier than Ecosystem Operator, sharper than Consumer Storyteller.

**Sentence structure:** long. Paragraph-like tweets in threads. Each beat often 2–3 sentences. Use semicolons and colons to structure arguments. Numbered lists common.

**Jargon:** high, framework-oriented. Named frameworks, references to specific papers/posts, assumed academic-adjacent reader level.

**How personal to get:** low. Voice is through-the-thesis, not through-the-person. Personal posts rare and high-impact when they happen.

**Capitalization:** formal sentence case. Proper nouns correct. Not lowercase-casual.

**Specific things to do:**
- Cite. Link papers, dashboards, specific threads. Build credibility through receipts.
- Use numbered argument structure in threads — it works for this voice.
- When you're wrong, write a specific retraction post. "Updated my view on X. Previous: [summary]. Now: [summary]. What changed: [inputs]."

**Specific things to avoid:**
- Meme-style posts unless you're quote-tweeting something that warrants it. This voice breaks when it goes casual without purpose.
- Vague hedging ("some might say," "it could be argued"). If you have a view, state it. If you don't, say you're uncertain about X specifically.
- Excessive framework-naming when a plain claim would work. Keep the substance to framework ratio high.
- Engagement farming. Don't ask "thoughts?" at the end of threads — let the argument land.

---

## 4. Weekly posting rhythm

**Total posts/week target:** 6–10

**Mix:**
- Short takes: 20%
- Medium threads (3–6 tweets): 25%
- Long threads (7+ tweets): 35%
- Quote-tweets: 15%
- Replies: 5%

**Best windows (US Eastern):**
- 9:00–11:00 AM ET — best for long threads; they ride the timeline longer from morning starts
- 2:00–4:00 PM ET — decent for shorter takes

**Day-of-week rhythm:**
- **Monday:** short-take ecosystem observation or a pillar-3 counter-consensus post
- **Tue–Wed:** main thread days — 1 long thread per week, usually here
- **Thursday:** follow-up takes and replies to the thread's discussion
- **Friday:** quieter; occasional post-mortem or retraction post
- **Sat–Sun:** Sunday morning long thread works well (thesis can sit at the top of the timeline)

---

## 5. Engagement playbook

### Tier 1 — engage daily or every other day

- **@KyleSamani, @TusharJain_** (Multicoin) — the research-voice peers on Solana. Reply mode: substantive add on threads, occasional friendly counter when your data differs.
- **[Drift, Zeta, Marginfi research / founder voices]** — adjacent protocol founders in your space. Reply mode: technical disagreement framed as "alternative framing."
- **@0xMert_** — for ecosystem-wide framing posts; reply when your thesis adds a layer.
- **[2–3 researcher accounts from Ethereum L2s]** — cross-ecosystem perspective. Reply mode: comparative framing.
- **@aeyakovenko** — for protocol/consensus-level framing posts where your derivatives-side view adds something.

### Tier 2 — engage weekly

- Academic-adjacent crypto research accounts (DBA-adjacent, paper authors)
- Onchain-analytics teams (Nansen, Artemis) publishing research
- Multicoin Capital / Framework / Dragonfly junior researchers
- Industry researchers at CoinFund, Paradigm (publicly visible voices)
- Traders whose views overlap with yours on market microstructure

### Spaces, AMAs, and communities

- Guest on research-focused Spaces (Lightspeed, Multicoin-hosted, CoinDesk Consensus side shows) when Converge is in market
- Publish in Mirror or similar long-form adjacent to X threads — your voice supports long-form
- Join private founder research Slacks if invited (via Superteam, Solana Foundation, etc.)
- Comment on research posts in Farcaster Solana channels occasionally

### Insertion tactics for this archetype

- Quote-tweet another researcher's thread with a one-line "sharpening" or "friendly counter" — reframe, don't dunk.
- When a cycle moment happens (vol spike, LP drawdown, protocol exploit), write the specific framework-applied analysis within 24 hours. Time-to-analysis matters for this voice.
- Don't reply to traders whose content is purely vibes — it dilutes the register. Engage only when the post is substantive.

---

## 6. Ten example posts in your voice

### Post 1 — Framework thread opener (long) (Pillar 1)

Perp DEX LPs aren't losing money because of fees. They're losing money because directional risk and volatility risk share one pool, and the pool is paid for exactly one of them.

Let me work this out explicitly. This thread has 8 tweets.

1. The LP on a standard perp DEX holds a synthetic position that profits when traders lose net and loses when traders win net. Classic.

2. Now: that P&L isn't one thing. It decomposes into (a) directional P&L from trader positioning and (b) volatility-absorbed P&L from funding-rate lag during regime shifts. Different dynamics, different holding periods, different risk profiles.

3. In calm regimes, (a) dominates. LPs look at their returns and think "this is an insurance business." Fine.

4. In volatile regimes, (b) swamps (a). The funding rate lags the realized vol, the pool absorbs the delta, and cumulative LP returns get crushed faster than any trader P&L view would suggest.

5. This isn't a bug — it's that the pool was always paid for (a), and (b) is a free option the protocol hands to traders every time vol spikes.

6. Two reasonable responses: (i) price (b) explicitly via a vol surface, charge traders for it, pay LPs for bearing it. Most protocols can't do this without redesigning their AMM/oracle. (ii) split the two pools. Directional LP pool. Vol-bearing LP pool. Different capital, different returns.

7. We chose (ii) at Converge. Directional LPs get the insurance-business profile. Vol-bearing LPs get the convex-premium profile. Neither is optimal for everyone; different capital finds different roles.

8. The bigger claim: every perp DEX that hasn't split these risks is quietly underpaying one side of its LP base. The churn data already suggests it. Longer piece coming.

### Post 2 — Counter-consensus one-liner (Pillar 3)

Everyone thinks perp DEX LP returns are "insurance premium." They're mostly insurance premium plus a short-vol position the LP didn't price. That's why churn tracks vol regimes, not volume.

### Post 3 — Cross-protocol comparison thread (medium) (Pillar 2)

Comparing four perp DEXs on how their LP pools price vol:

[Protocol A]: doesn't. Funding rate linear in open interest. Vol is free.

[Protocol B]: partial — funding rate curvature kicks in at extreme OI. Helps at the tails, leaves mid-regime vol unpriced.

[Protocol C]: attempts via an implied-vol feed. Design is correct but oracle dependence is a single point of failure.

[Protocol D — Converge]: separates the two pools. Vol-bearing LPs quote their own premium. No shared oracle.

Not saying Converge is the best design — each of these has real tradeoffs. But the first step is acknowledging the vol is there.

### Post 4 — Thesis update (Pillar 4)

Updated my view on Protocol B. Previous: partial vol pricing is structurally insufficient. Now: in deep-liquidity pairs, the curvature gets ~70% of the theoretically correct pricing, which is better than I credited. Revised thinking: Protocol B's design is fit for deep pairs, breaks at the long tail. That nuance matters.

### Post 5 — Short Contrarian Trader-style take (Pillar 3)

The next six months of perp DEX competition won't be won on fees. It'll be won on which protocol's LPs can survive the next vol regime. Everything else is secondary.

### Post 6 — Quote-tweet reframe (Pillar 3)

[Quote-tweeting a news post about Protocol X hitting $X in cumulative volume]

Volume is the wrong number to celebrate. LP retention over the last vol shock is the real metric. That's the one they don't publish.

### Post 7 — Numbered argument short thread (medium) (Pillar 1)

Three reasons the risk-decomposition view matters now specifically:

1. 2025–2026 realized vol is in a regime where funding-lag costs dwarf directional P&L. The empirical case is strongest now.

2. LP capital has 6 months of cross-protocol churn data to compare; the pool differentiation is finally legible.

3. Structured-product builders are circling perp DEXs. Two-pool designs unlock clean vol-tranching, which they need.

Separately interesting; together, the moment.

### Post 8 — Research citation post (Pillar 1)

This paper on AMM LVR by [authors] is worth reading. The short version: LPs lose more to sophisticated arbitrageurs than most dashboards credit. The methodology ports cleanly to perp DEX analysis — specifically, the way they decompose "toxic flow" vs "informed flow" is the same decomposition I'm pushing for vol vs directional risk.

### Post 9 — Post-mortem (Pillar 4)

The vol spike two weeks ago gave us real data. Converge's vol-bearing pool returned +4.2% over the window. Standard single-pool protocols in the same pairs returned -6 to -11%. Not a victory lap — the design was built for this; the real test is the next calm regime, when the vol-bearing LPs need to stay patient through lower yields.

### Post 10 — Specific market-structure take (Pillar 3)

Perp DEX LP behavior is going to look more like a structured-credit book than an AMM over the next 18 months. Duration matters. Regime risk matters. The protocols that treat LPs as passive yield-seekers are going to keep bleeding the patient ones.

---

## Next steps

1. Post #1 — the framework thread — Tuesday morning in the 9 AM ET window.
2. Follow the 4-week content calendar (`content-calendar.csv`).
3. 10 minutes/day on Tier 1 engagement; go deeper on Thursdays to respond to the thread discussion.
4. Revisit this playbook after 4 weeks — which pillar drove the most substantive responses, rebalance.

## Appendix — differentiating your personal account from Converge

- **@converge_xyz** (project): protocol updates, LP stats, new market listings.
- **@danyal_rashid** (you): the thesis, cross-protocol analysis, counter-consensus takes, your research journey.

Product → project account. Perspective and framework → personal account. The framework IS your differentiation — keep it on you, not the project handle.
