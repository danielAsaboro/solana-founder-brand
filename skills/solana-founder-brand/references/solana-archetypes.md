# Solana Founder Archetypes — Voice Fingerprints + Post Structures

> **Last reviewed:** 2026-04-22. Anchor accounts and cadence heuristics should be re-verified every 3 months — Solana Twitter's cultural voice drifts quickly.

> **How the skill uses this file:** When matching a founder to an archetype (Step 1 in `SKILL.md`), read the **one-line distinctions** below first, pick the closest primary match (and optionally a secondary blend), then read only that archetype's section deeply. Don't read every archetype — it wastes context and muddles the voice.

## One-line distinctions (scan this first to pick a match)

| # | Archetype | Best fit when the founder is… |
|---|---|---|
| 1 | Protocol Philosopher | Technical, building infra/protocols, thinks in first principles, comfortable being wrong in public |
| 2 | Ecosystem Operator | Building tooling/infra/education/data, their product benefits from ecosystem health, enjoys explaining the ecosystem to outsiders |
| 3 | Engineer Minimalist | Heads-down builder, ships more than posts, sarcasm-as-technical-stance, low but high-signal output |
| 4 | Degen Builder Poet | Native crypto-culture builder, lowercase/meme-literate voice, product underneath the play |
| 5 | Contrarian Trader | Trader background or strong market instincts, narrative/cycle aware, comfortable with unpopular takes |
| 6 | Research Maximalist | Research/investor background, thesis-first, framework-driven, builds credibility through depth |
| 7 | Consumer Storyteller | Building consumer-facing crypto (wallets, social, games, payments), narrative + earnest + user-first |
| 8 | Memetic Provocateur | Cultural-setting voice, often anon-flavored, meme-as-substance, deliberately attention-dense |

**Blending:** Many real founders straddle two. Common blends:
- Engineer Minimalist × Degen Builder Poet (shipping + culture)
- Protocol Philosopher × Contrarian Trader (first-principles + market narrative)
- Ecosystem Operator × Research Maximalist (stats-forward + thesis-forward)
- Consumer Storyteller × Engineer Minimalist (earnest builder voice)

When blending, use the primary archetype's voice fingerprint as base and borrow 1–2 pillar/cadence elements from the secondary.

---

## 1. The Protocol Philosopher

**Anchor accounts:** `@aeyakovenko` (Anatoly Yakovenko — canonical); `@armaniferrante` (Armani, on his technical-philosophy days); one more to be added during research refresh.

### Voice fingerprint

- **Sentence length:** Mostly short. 5–15 words. Occasional medium sentences when unpacking a tradeoff. Almost never runs long.
- **Punctuation rhythm:** Flat. Periods. Rarely uses em-dashes, exclamation points, or question-to-set-up-answer rhythm. The absence of LLM-style rhythm is itself a signal.
- **Capitalization:** Normal sentence case. Not lowercase-casual.
- **Jargon density:** High but precise. Uses terms like "validator," "PoH," "nakamoto coefficient," "bandwidth-delay product," "L1 social consensus" without defining them — assumes reader competence.
- **Self-disclosure:** Low-medium. Technical opinions reveal worldview; personal life rarely on timeline.
- **Hedging:** Minimal. States views as claims, invites disagreement by being wrong-able.
- **Humor:** Dry. Understatement. Occasional self-effacing one-liner about something breaking.

### Content mix (%)

| Format | % | Notes |
|---|---|---|
| Short takes (1 tweet) | 55 | The default. Technical claim or observation. |
| Medium threads (3–6 tweets) | 20 | Unpacking a tradeoff or defending a design choice |
| Long threads (7+ tweets) | 5 | Rare. When a topic deserves full first-principles treatment. |
| Quote-tweets | 15 | Engaging with research, news, or opposing takes |
| Replies | 5 | Selective. High-value technical discussions. |

### 5 representative post structures

1. **First-principles one-liner**
   > [Observation about physical/economic constraint]. [Therefore, design implication].
   Example scaffolding: "Light takes ~67ms to go around the Earth. Any global consensus protocol has a floor set by physics, not code."

2. **Tradeoff unpacking (3–5 tweet thread)**
   - T1: Hook as counterintuitive claim ("X is a feature, not a bug")
   - T2: The intuitive view most people hold
   - T3: What that view misses
   - T4: The real constraint
   - T5 (optional): What this means for design choices now

3. **Hardware/physics analogy**
   > [Software problem] is really [hardware/physics analogy]. [Implication for how to think about it].

4. **Steelman-then-refute quote-tweet**
   Quote the opposing take. Short reply: first steelman it in one line, then give the specific reason it doesn't hold.

5. **Wrong-in-public retraction**
   > I said [previous claim]. [New data/thinking] changed my view. [Updated claim].
   These land hard because they're rare and signal intellectual honesty.

### Content pillars (typical)

- System tradeoffs and why counterintuitive designs win
- Hardware/physics bounds on software decisions
- Lessons from previous infrastructure generations (databases, networking, ops)
- Long-arc predictions with explicit time horizons
- Defense of specific architectural decisions (e.g. why parallel execution, why leader-based consensus)

### Engagement style

- Reply volume: low. Quality over quantity. Replies are almost always substantive technical adds.
- Quote-tweets: moderate. Often the vehicle for "here's a sharper way to think about this."
- Never ratio-baits. Never rage-quotes.
- Cadence: ~10–20 posts/week. Bursts during conferences or when defending ecosystem news.

### Cadence + rhythm (weekly)

- 3–5 short takes/day on active days, 2–3 active days/week.
- 1 medium thread per 1–2 weeks.
- 1 long thread per 1–2 months — treated as an event.

---

## 2. The Ecosystem Operator

**Anchor accounts:** `@0xMert_` (Mert Mumtaz, Helius); `@akshay_bd` (Akshay BD, Superteam India); one more to be added.

### Voice fingerprint

- **Sentence length:** Mixed. Short punchy takes + medium-length thread beats.
- **Punctuation rhythm:** More varied. Uses exclamation points sparingly for emphasis (not as default). Uses colons and parentheticals to structure arguments.
- **Capitalization:** Normal sentence case. Occasionally ALL-CAPS a single word for emphasis (the classic pattern when countering a specific piece of FUD).
- **Jargon density:** Medium. Translates ecosystem-insider language for outsiders. Defines acronyms on first use in a thread.
- **Self-disclosure:** Medium-high. Talks about work, team, wins and losses openly. Personal life enters selectively.
- **Hedging:** Low. Defensive of ecosystem by posture; willing to call bullshit on outside FUD directly.
- **Humor:** Present but not dominant. Often at the expense of obvious FUD or sloppy reasoning.

### Content mix (%)

| Format | % | Notes |
|---|---|---|
| Short takes | 35 | Stats, observations, reactions to news |
| Medium threads (3–6) | 25 | Explaining ecosystem developments with data |
| Long threads (7+) | 15 | FUD rebuttal with receipts, quarterly-style reflections |
| Quote-tweets | 20 | Very high — primary engagement mechanism |
| Replies | 5 | Moderate; defends ecosystem in reply threads |

### 5 representative post structures

1. **Stats-forward ecosystem update**
   > [Metric] just hit [number]. Context: [comparison or historical point]. [Implication for ecosystem narrative].

2. **FUD rebuttal thread (long)**
   - T1: Quote or screenshot the FUD
   - T2–N: Point-by-point, with citations/screenshots. Receipts.
   - Final tweet: What the real picture is, and a call to judge by data not vibes.

3. **Translator thread**
   - T1: "A lot of people are confused about [X]. Here's what's actually happening."
   - T2–N: Concepts broken down step by step for mixed-technical-level audience
   - Final: Call to action (try it, fund it, build on it)

4. **Quote-tweet hot-take**
   Quote-tweet of ecosystem news with a single-line sharp interpretation. Often more viral than the original post.

5. **Behind-the-scenes transparency**
   > [Something that happened this week], [what we learned], [what we'll do differently].
   Humanizes the operator. Earns trust over time.

### Content pillars (typical)

- Ecosystem metrics + interpretation (TPS, fees, active users, dev activity)
- Rebutting outside FUD with receipts
- Behind-the-scenes ecosystem coordination stories
- Founder-advice and meta-commentary on the Solana ecosystem
- Selective evangelism — specific projects/teams worth attention

### Engagement style

- Quote-tweet-heavy. This is their primary content loop.
- Replies to other operators and to constructive critics.
- Willing to dunk on outside critics but not other founders in-ecosystem.
- Cadence: 20–40 posts/week, consistent.

### Cadence + rhythm (weekly)

- 3–5 posts/day, steady — not bursty.
- 1 medium thread per week.
- 1 long thread per 2–3 weeks.
- 5–10 quote-tweets/day.

---

## 3. The Engineer Minimalist

**Anchor accounts:** `@armaniferrante` (primary — the canonical example); `@0xSiong` (Siong, Jupiter — verify handle); suggested third to be added.

### Voice fingerprint

- **Sentence length:** Short. Often 3–8 words. Occasional medium when shipping an update that genuinely needs context.
- **Punctuation rhythm:** Minimal. Often no punctuation at all for the shortest takes. Periods rarely. Occasional strategic em-dash — though the em-dash is a LLM slop tell, so use sparingly.
- **Capitalization:** Mostly sentence case. Sometimes lowercase for softer takes.
- **Jargon density:** Very high but condensed. Uses technical terms as shorthand among peers. Does not define them.
- **Self-disclosure:** Low. Personal updates land hard because of their rarity.
- **Hedging:** None. The voice's defining feature is concision to the point of terseness.
- **Humor:** Dry, often sarcastic, deadpan. Sometimes lightly mean to bad ideas.

### Content mix (%)

| Format | % | Notes |
|---|---|---|
| Short takes | 70 | The default — often a single sentence |
| Medium threads (3–6) | 5 | Rare. Used for real launches. |
| Long threads (7+) | 1 | Extremely rare. Essentially an event when it happens. |
| Quote-tweets | 14 | Often with one-line commentary |
| Replies | 10 | The voice lives in replies — this is where their engagement is. |

### 5 representative post structures

1. **Single-sentence shipping update**
   > shipped [thing]. [1-sentence why it matters].
   (Note: lowercase is common in this archetype but not required.)

2. **Terse tech take**
   > [Opinion about a technical pattern, framework, or ecosystem decision]. No explanation. The audience that gets it gets it.

3. **Reply-as-substance**
   Instead of posting an OP, they jump into a reply thread with a one-liner that refocuses the discussion. Often the most cited content they produce.

4. **Dry meme-literacy**
   Quote-tweet of hype/news with a dry one-liner — not full meme mode, but a wink acknowledging the absurdity while engaging substantively.

5. **The rare personal post**
   An occasional, out-of-character earnest post about a team win, a personal milestone, or a loss. Lands because of contrast.

### Content pillars (typical)

- Shipping updates (what the team just released)
- Developer tools / language / framework opinions (Rust, Anchor, TypeScript, etc.)
- Brief engineering-philosophy takes (often reactions to others' posts)
- Subtle culture commentary via quote-tweets
- Occasional team/personal milestones

### Engagement style

- **Reply-heavy.** More value in replies than in OPs.
- Quote-tweets for sharp one-liners.
- Doesn't chase engagement. Engagement chases the voice.
- Cadence: 5–15 posts/week, uneven — posts in bursts when they have something to say, silent otherwise.

### Cadence + rhythm (weekly)

- Bursty. 0 posts some days, 5+ on others.
- No obligation to hit a weekly count.
- Event-driven, not content-calendar-driven.

---

## 4. The Degen Builder Poet

**Anchor accounts:** `@weremeow` (Meow, Jupiter — verify handle); additional anchors to be added during research refresh. This archetype is strongly represented in the Jupiter, Pump, Tensor, and Mad Lads founder circles — user will likely know specific handles.

### Voice fingerprint

- **Sentence length:** Short, often fragmented. Many single-word posts. Occasional thread when the product ships.
- **Punctuation rhythm:** Idiosyncratic. No periods at all is common. Ellipses… used emotively. Emoji punctuation (🐃, 🫡, ser, gm, etc.) functions as grammatical marker.
- **Capitalization:** Mostly lowercase. Capital letters signal emphasis or a specifically non-playful take.
- **Jargon density:** High but native — uses crypto-twitter argot (ser, gm, anon, wagmi, ngmi, ape, cook, bags, chart, etc.) fluently, not performatively.
- **Self-disclosure:** Medium-high. Posting about "vibes" and team moods and the build is part of the voice.
- **Hedging:** None. Big claims, big emotions, deliberate overclaim as style.
- **Humor:** Central. Meme-literacy is the carrier wave; product content rides on top of it.

### Content mix (%)

| Format | % | Notes |
|---|---|---|
| Short takes | 60 | Often 1–5 word posts |
| Medium threads | 5 | Launches only |
| Long threads | 1 | Very rare; usually a big ship or a vibe-setting statement |
| Quote-tweets | 20 | High — the archetype's primary conversation mode |
| Replies | 14 | Active in replies, often memes back at other degens |

### 5 representative post structures

1. **One-word vibe post**
   > cooking
   > ser
   > we ship tomorrow
   The post is the signal. No elaboration.

2. **Chart post with one-line caption**
   Screenshot of metric, one-line caption that plays on it. Caption is often a meme format ("if you know you know," "this is the way," etc.).

3. **Quote-tweet riffing**
   Quote-tweet of a meme/news/take with a one-line degen-native response. Often the meme IS the response.

4. **Launch announcement (medium thread)**
   - T1: Degen-native hook ("the thing you've all been asking for")
   - T2–4: Product beats with personality, not marketing-speak
   - Final: CTA in degen register ("wen" jokes, specific callouts)

5. **Vibe-check personal post**
   An earnest or half-earnest post about the team, the build, the state of play. Lands because it mixes play and sincerity.

### Content pillars (typical)

- Culture-flavored product updates
- Crypto-native memes with a substantive layer
- Quote-tweet provocations and returns
- Replies as conversation more than broadcast
- Occasional personal/team vibe posts

### Engagement style

- Quote-tweet heavy. The conversation IS the content.
- Active in replies, especially to other builders.
- Memes are engagement tokens.
- Cadence: 15–30 posts/week, bursty.

### Cadence + rhythm (weekly)

- Daily presence but not structured.
- No thread calendar — threads when the ship happens.
- Engagement is 24/7 "on-timeline" energy.

---

## 5. The Contrarian Trader

**Anchor accounts:** *Needs Solana-founder-specific anchors. Purest example of the voice is `@blknoiz06` (Ansem) who is a trader, not a founder. Founder-traders to identify — likely some derivatives-protocol founders (Drift, Zeta, Bonk ecosystem) whose personal accounts carry this voice.*

### Voice fingerprint

- **Sentence length:** Short and pointed. Medium when narrating a thesis. Not long.
- **Punctuation rhythm:** Direct. No filler. Occasional rhetorical question to set up a take.
- **Capitalization:** Normal sentence case. Sometimes lowercase for sharper delivery.
- **Jargon density:** High but market-flavored, not protocol-flavored — "rotation," "narrative," "bid," "liquidity," "cycle," "tops," "retail."
- **Self-disclosure:** Medium. Discusses trades, positions, and thinking as substance.
- **Hedging:** Low. Comfortable being wrong publicly; that's part of the voice's credibility loop.
- **Humor:** Dry, often cynical about market behavior; aware of the clown-world aspect.

### Content mix (%)

| Format | % | Notes |
|---|---|---|
| Short takes | 55 | Market observations, narrative calls |
| Medium threads | 15 | Thesis development |
| Long threads | 5 | Big thesis pieces or post-mortems |
| Quote-tweets | 20 | Primary engagement — commenting on market news |
| Replies | 5 | Selective; often responds to other traders |

### 5 representative post structures

1. **Narrative call**
   > [X] is where the market is going. [Why in one sentence]. [Specific play or observation].

2. **Counter-consensus one-liner**
   > Everyone thinks [popular view]. They're missing [specific thing that changes the picture].

3. **Thesis thread (medium)**
   - T1: The hook — a specific narrative or positioning call
   - T2–4: Evidence / reasoning / market-structure observation
   - T5: Specific expectation or prediction

4. **Post-mortem of a trade or thesis**
   > I was wrong about [X]. Here's what I missed. Here's the update.

5. **Quote-tweet market interpretation**
   Quote-tweet a news event with a one-line market-structure interpretation that reframes what it means.

### Content pillars (typical)

- Narrative-setting takes (which meta is emerging)
- Market-structure observations (who's bidding, where liquidity is)
- Cycle commentary (where we are in the arc)
- Counter-consensus positioning
- Post-mortems (being wrong in public)

### Engagement style

- Quote-tweet heavy on market news.
- Replies to other traders they respect.
- Comfortable with the unpopular take as a reputation-builder.
- Cadence: 20–40 posts/week, event-driven around market news.

### Cadence + rhythm (weekly)

- Daily presence during active markets.
- Quieter during chop/low-news.
- Thesis threads roughly weekly or biweekly.

---

## 6. The Research Maximalist

**Anchor accounts:** `@KyleSamani` (Multicoin — the template for this voice on Solana Twitter); `@TusharJain_` (Multicoin). Need a Solana-founder-specific anchor — could be someone from Jito, MarginFi, Drift, or a Solana research-heavy protocol.

### Voice fingerprint

- **Sentence length:** Long. Paragraph-like tweets in threads. Each beat often 2–3 sentences.
- **Punctuation rhythm:** Structured. Semicolons. Colons to introduce evidence. Numbered lists common.
- **Capitalization:** Formal sentence case. Proper nouns correct.
- **Jargon density:** High and framework-oriented. Uses named frameworks, references academic-adjacent concepts, cites specific papers/posts.
- **Self-disclosure:** Low. Voice is through-the-thesis, not through-the-person.
- **Hedging:** Moderate — careful, precise, qualifies claims appropriately.
- **Humor:** Rare in main content. Occasionally appears in quote-tweets or replies.

### Content mix (%)

| Format | % | Notes |
|---|---|---|
| Short takes | 15 | Rare — usually a citation or quick take |
| Medium threads | 20 | Explaining a single framework |
| Long threads | 50 | **Primary output** — multi-tweet theses |
| Quote-tweets | 10 | Engaging with other research |
| Replies | 5 | Low-volume, high-quality |

### 5 representative post structures

1. **Framework thread (long)**
   - T1: Hook — counterintuitive or reframing claim
   - T2: Definitions / setup of the framework
   - T3–N: Application of the framework to several examples/cases
   - Late-thread: Implications and open questions
   - Final: The bigger claim this supports

2. **Thesis update**
   > Updated my view on [X]. Previous: [summary]. Now: [new summary]. What changed: [specific inputs].

3. **Numbered-argument thread**
   - T1: Claim
   - T2: "1. [first supporting point]"
   - T3: "2. [second]"
   - ... up to 5–7 numbered points
   - Final: Restate the claim with the case now made.

4. **Cross-chain comparison**
   > Comparing [chain A] and [chain B] on [specific dimension]. Here's what each optimizes for and why that creates different end states.

5. **Research citation post**
   > This paper / thread by [X] is worth reading. Here's the summary and why I think it matters for [domain].

### Content pillars (typical)

- Multi-week thesis development (returns to refining one idea)
- Framework introduction and application
- Cross-chain / cross-protocol comparative analysis
- Macro and crypto-structure takes
- Research citations and summaries

### Engagement style

- Low-volume, high-depth.
- Post-and-bounce — not reply-heavy.
- Quote-tweets for endorsement or critique of other research.
- Cadence: 5–12 posts/week, often weighted toward thread-days.

### Cadence + rhythm (weekly)

- 1 long thread per week is the anchor.
- 3–6 short takes spread around it.
- 1 quote-tweet per 1–2 days.

---

## 7. The Consumer Storyteller

**Anchor accounts:** *Needs user-validated anchors. Strong candidates: founders of consumer wallets (Phantom), social/creator apps (DRiP, Dialect), mobile (Solana Mobile), games, or payments.*

### Voice fingerprint

- **Sentence length:** Mixed. Often conversational rhythm — short sentences then a longer one for emphasis.
- **Punctuation rhythm:** Varied — question marks (rhetorical to pull reader in), ellipses… for suspense, exclamation points sparingly for genuine moments.
- **Capitalization:** Sentence case. Occasionally all-lowercase for softer warmth.
- **Jargon density:** Low-medium. Consciously translates crypto for newer audiences.
- **Self-disclosure:** High. Talks about users met, conversations had, real moments from the build.
- **Hedging:** Medium — earnest but not over-confident; "I think," "we're learning" tolerated.
- **Humor:** Warm. Occasional memes. Not cynical.

### Content mix (%)

| Format | % | Notes |
|---|---|---|
| Short takes | 40 | Observations, wins, user moments |
| Medium threads | 25 | User-story threads, release narratives |
| Long threads | 10 | Big launches, milestone reflections |
| Quote-tweets | 15 | Amplifying users, ecosystem wins |
| Replies | 10 | Engages warmly, especially with users |

### 5 representative post structures

1. **User-story short take**
   > Talked to [type of user] today who told me [specific observation]. [What that made me realize].

2. **Release narrative thread**
   - T1: What we just shipped, in human terms
   - T2: Who it's for and why we built it this way
   - T3: A user moment that shaped the design
   - T4: What's next
   - Final: Gratitude / call to try it

3. **Milestone reflection**
   > [Number] [metric or moment]. Sitting with what that means. [Honest observation about the journey].

4. **Small-win screenshot post**
   Screenshot of a user message, Discord moment, or product moment. Short warm caption.

5. **Rhetorical-question opener**
   > What if [everyday experience] just... worked? That's what we're building toward. [1 sentence on the product's take on it].

### Content pillars (typical)

- User-story threads (real users, real moments)
- Product release narratives
- Consumer-crypto-is-inevitable framing
- Small wins worth celebrating (with screenshots)
- Earnest reflections on the build journey

### Engagement style

- Warm replies to users.
- Quote-tweets to amplify community.
- Not dunking. Not contrarian. Generative tone.
- Cadence: 15–25 posts/week.

### Cadence + rhythm (weekly)

- Near-daily presence.
- 1 medium-to-long thread per week on a release or user story.
- Frequent small posts celebrating community/user moments.

---

## 8. The Memetic Provocateur

**Anchor accounts:** *Needs user-validated anchors. This archetype overlaps with the Degen Builder Poet but is distinct in being more **narrative-setting** than **product-updating**. Candidates: founders from cultural-Solana (memecoin launch platforms, cultural NFT projects, timeline-influential accounts).*

### Voice fingerprint

- **Sentence length:** Very short, often one line. Maximum attention-density.
- **Punctuation rhythm:** Idiosyncratic — none, or emoji-as-punctuation, or deliberate single-period drops for effect.
- **Capitalization:** Lowercase default. Capital letters signal TURN. Sentence-case for rare serious posts.
- **Jargon density:** High, native, and often self-invented — coins or adopts memes; uses internal-crypto-culture references fluently.
- **Self-disclosure:** Variable — often the person-vs-persona line is deliberately blurred.
- **Hedging:** None. Big takes, big energy, deliberate certainty.
- **Humor:** Central — but pointier than Degen Builder Poet. Aimed at setting narrative, not just riffing.

### Content mix (%)

| Format | % | Notes |
|---|---|---|
| Short takes | 65 | One-line provocations, narrative-setting |
| Medium threads | 5 | Rare |
| Long threads | 1 | Essentially never |
| Quote-tweets | 25 | Very high — narrative-shaping via QT |
| Replies | 4 | Selective, cutting |

### 5 representative post structures

1. **Narrative-setting one-liner**
   > [name a trend before others see it, or name something embarrassing in the culture]
   These create the meme or frame that others later use.

2. **Quote-tweet provocation**
   Quote-tweet of someone's take with a sharp one-line reframe that gets more attention than the original.

3. **Counter-narrative call**
   > everyone is doing [X]. [dry one-liner implying why they shouldn't].

4. **Meme-as-substance**
   Visual meme (or ASCII / text meme) that encodes a real product or market claim. The format is the content.

5. **Deliberate contrast post**
   Out of character: a single earnest post that lands precisely because it contrasts with the usual register.

### Content pillars (typical)

- Cultural commentary (what the ecosystem is becoming)
- Narrative-setting jokes that others will reuse
- Quote-tweet provocations
- Meme-literacy that encodes real claims
- Rare serious posts as high-impact contrast

### Engagement style

- Quote-tweet as primary mechanism.
- Short replies, often cutting.
- Attention is the currency — every post is optimized for it, but not shallowly.
- Cadence: 20–40 posts/week, bursty.

### Cadence + rhythm (weekly)

- Near-constant presence during waking hours.
- Lives in the timeline, not in content calendars.
- Event-driven bursts around news or memes.

---

## How to match a founder to an archetype (heuristic for Step 1)

Ask yourself, based on the founder's inputs:

1. **What's their substance?**
   - Technical protocol/infra → 1 (Protocol Philosopher) or 3 (Engineer Minimalist)
   - Ecosystem tooling/data/education → 2 (Ecosystem Operator)
   - Market/trading background → 5 (Contrarian Trader)
   - Research/investor background → 6 (Research Maximalist)
   - Consumer product → 7 (Consumer Storyteller)
   - Cultural / memecoin / NFT → 4 (Degen Builder Poet) or 8 (Memetic Provocateur)

2. **What's their posting temperament?**
   - Verbose / thesis-first → 1 (if technical), 6 (if research)
   - Terse / shipping-first → 3 (Engineer Minimalist)
   - Warm / narrative → 7 (Consumer Storyteller)
   - Cultural / meme-first → 4 or 8
   - Defensive-of-ecosystem → 2
   - Counter-consensus → 5

3. **What's their natural communication style (from input)?**
   - Analytical → 1, 3, or 6
   - Casual → 3, 4, or 8
   - Contrarian → 1, 5, or 8
   - Storyteller → 7
   - Operator → 2

**When in doubt, blend two.** Most real founders are blends. Name the blend ratio (e.g. 70/30) and use the primary's voice fingerprint as base.
