# Anti-Slop Rules

> **Why this file exists:** every generic "founder content" tool produces LLM-flavored copy that founders paste once and never again. This skill's entire credibility depends on the 10 example posts reading like a human, not a language model. Run every generated post through this pass before returning it. If a post violates a rule, rewrite it.

> **When to apply:** during Step 8 in `SKILL.md` (generating the 10 example posts) and before any other generated copy appears in the playbook. Also apply to the writing style guide itself — don't write the style guide in LLM prose.

## The core rule

**If a post could be said by someone on LinkedIn, it's wrong.** Solana founder Twitter does not sound like LinkedIn. It sounds like smart people who read fast, ship fast, and write like they're on Discord with their teammates.

## Banned patterns (rewrite if any appear)

### 1. LLM-cadence constructions

These are the tells that say "a model wrote this":

- **"In a world where..."** — never. Rewrite to the direct claim.
- **"Here's the thing..."** — the thing is, it's LLM rhythm. Rewrite.
- **"Let's dive in / let's unpack / let's explore..."** — inauthentic invitation. Cut and start with the content itself.
- **"It's important to note that..."** — if it's important, just say it.
- **"The reality is..."** — dead phrase. Say what the reality is directly.
- **"Not only... but also..."** — rhetorical symmetry that reads as corporate. Rewrite.
- **"When it comes to X, Y is Z."** — passive setup. Rewrite as direct claim about X.
- **Triadic rhythm** ("It's faster, cheaper, and easier") — three-part lists of abstractions are the #1 LLM tell. Pick the strongest one, cut the others, or use a specific example.

### 2. The em-dash rhythm

Em-dashes (—) are fine in moderation. Heavy em-dash use — especially for parenthetical asides in every sentence — is the single biggest LLM tell in 2026 writing.

**The limit applies to post body text only — not to headers, structural labels, archetype rationales, or any other non-post prose.** Count em-dashes only within the generated example posts themselves.

- **Default ceiling:** at most 1 of the 10 example posts contains an em-dash.
- **Consumer Storyteller override:** the warmer conversational register tolerates dashes more naturally — up to 3 of 10 posts may contain one, but not more.
- **Research Maximalist / Protocol Philosopher override:** the longer analytical sentences tolerate occasional em-dashes inside a beat — up to 2 of 10 posts.

If a draft has em-dashes above the ceiling for its archetype, rewrite most of them as separate sentences or commas.

### 3. "But here's the kicker / the twist / the surprising part"

Anything that performs a narrative reveal the way a LinkedIn-influencer thread does. Real founders don't foreshadow their own insights.

### 4. Consultancy-speak

- "Leveraging" — say "using."
- "Solution" as a standalone noun for a product — say what the product *is*.
- "Value proposition" — say what the product does.
- "Synergies / alignment / ecosystem" used as abstractions. Say the specific relationship.
- "Unlock" as a verb for anything non-literal — "unlock value," "unlock growth." Rewrite.

### 5. Aspirational openers

- "Excited to announce..." — never. Skip the excitement; say what shipped.
- "Thrilled to share..." — same.
- "Proud to be partnering with..." — same.
- "We believe..." as an opener — usually skippable; start with the claim.

### 6. The rhetorical question setup

"What if I told you [thing]?" / "Ever wondered why [X]?" / "Have you ever considered [Y]?"

These are LLM thread-opener patterns. Real founder threads open with the claim or observation directly. If a rhetorical question is genuinely compelling (and occasional in the founder's voice), it can stay — but only 1 in 10 posts at most.

### 7. The "three things I learned" structure

Numbered-learning threads ("three lessons from shipping X") are generic enough that they read as AI. Avoid unless the founder's real voice supports this format (some Research Maximalists use it authentically — check the archetype fingerprint).

### 8. Emoji as emotion-substitute

- 🚀 for any non-rocket context — never.
- 🔥 as applause — overused, reads as reaction-bait. Use only if the founder's real voice supports it.
- 💡 for ideas, 📈 for growth, ⚡ for speed — these standard-tech emoji usages read as LLM.
- Archetype-appropriate emoji are fine (see archetype file). Degen Builder Poet and Memetic Provocateur archetypes use emoji as punctuation; that's different from emoji as applause.

### 9. Unnecessary preambles and signposts

- Starting a post with "So..." — usually cuttable.
- "Thread 🧵" as the sole opener of tweet 1 — skip; the thread is obvious from the numbering or the fact that T2 appears.
- "Quick take:" / "Hot take:" — rarely needed; just give the take.
- "To be clear..." — unless something genuinely needed clarifying, skip.

### 10. Generic closers

- "What are your thoughts?" / "Let me know below!" / "Drop a comment!" — these read as engagement-farming. Real founders rarely do this.
- "Like and RT if you agree!" — never.
- "Follow for more!" — never.

## Style-guide writing (not just posts)

When you write the Style Guide section of the playbook (Step 5 in `SKILL.md`), write it in plain, specific, directive prose. Not in meta-observational essay style. Examples:

❌ "This founder should leverage a conversational tone that balances analytical rigor with approachability, ensuring that complex concepts are made accessible to a wide audience."

✅ "Short sentences. 5–15 words most of the time. State claims directly; don't hedge unless you're genuinely uncertain. Define technical terms only when the audience is mixed. Avoid exclamation points."

## Archetype-specific overrides

Some archetypes deliberately do things this file would otherwise flag:

- **Degen Builder Poet** uses lowercase and emoji-as-punctuation. That's on-brand, not slop.
- **Memetic Provocateur** uses deliberate repetition, one-word posts, and meme cadence. On-brand.
- **Consumer Storyteller** uses rhetorical questions and warm openers more than other archetypes. The rule "1 in 10 max" for rhetorical questions loosens to "1 in 5" for this archetype.
- **Protocol Philosopher** and **Research Maximalist** are allowed longer sentences with semicolons and colons; terse rules don't apply to them rigidly.

Always cross-check against the matched archetype's fingerprint in `solana-archetypes.md`. If the archetype's voice actually uses a pattern this file bans, apply the archetype's rule.

## The 30-second sanity check

Before returning the 10 example posts, read each one out loud (or silently imagine the voice) and ask:

1. Does this sound like something a real person would actually post?
2. If I removed the founder's name and project, would this read as generic "founder content"?
3. Are there any three-part lists of abstractions?
4. Are there any em-dashes in this post? If yes, does the founder's voice warrant it here?
5. Is there a specific claim, observation, or moment in this post — or is it general?

If any post fails: rewrite. Preferably by deleting 40% of the words and keeping only the specific parts.

## Final test: "Would the anchor account actually post this?"

For the matched archetype's anchor accounts, imagine the post appearing on their timeline. Would it look like it belonged? If it feels like a stranger wrote it for them, it's not there yet. Rewrite.
