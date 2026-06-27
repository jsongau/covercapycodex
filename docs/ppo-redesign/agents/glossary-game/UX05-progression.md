# UX05 — Progression / XP / Badges / Completion

Meta gamification layer spanning all 23 CoverCapy PPO glossary terms. Design and analysis only. No build.

---

## 1. Core concept: the Capy Crowns trail

CoverCapy already owns a points currency: Capy Crowns. We reuse it as the learning XP so the glossary feeds the same brand language as the dentist ranking layer. Each term mastered earns 1 Crown. The headline metric a learner sees everywhere is plain and adult:

> "You know 7 of 23 terms" + a quiet progress ring.

No confetti, no levels named "Apprentice." The tone is boutique concierge: you are being walked through a coverage briefing, not playing a kids app. The reward for finishing is the thing they actually came for: confidence to compare plans.

### States per term
- **Unseen** — not yet visited.
- **Viewed** — page opened (auto-credited on scroll past 60 percent, the "you read it" threshold).
- **Mastered** — learner tapped a one-tap "Got it" affirm at the bottom of the term, or answered a single inline check. Mastered is the only state that earns a Crown.

Two states (viewed vs mastered) keep the ring honest: viewing fills it light, mastering fills it solid. This prevents the hollow "I clicked through 23 pages and learned nothing" problem.

---

## 2. The persistence model (no localStorage)

Constraint: no localStorage. We persist progress in the **URL query string**, rehydrated on every page, plus an optional account nudge once they near completion.

### Mechanism: a compact bitmask in `?p=`
- 23 terms map to 23 fixed slots (a frozen, ordered term index baked into the generator).
- Two bits per term (00 unseen, 01 viewed, 10 mastered) packed into a base36 string. 23 terms x 2 bits = 46 bits, which is ~9 base36 chars. Short enough to live in a URL and survive copy/paste.
- Every internal glossary link (next-term button, related-term chips, breadcrumb) is rewritten on the fly by inline JS to carry the current `?p=` value forward. Navigation = state handoff.
- On page load: parse `?p=`, mark the current term as at least Viewed, repaint the ring, rewrite outbound links. On master: flip this term's bits to 10, update `?p=` via `history.replaceState` (no reload, no scroll jump), repaint.

### Why this works for a static SEO site
- Zero backend, zero storage API, survives Vercel static serving.
- Canonical URLs stay clean: `?p=` is stripped from `<link rel=canonical>` so SEO is unaffected.
- Honest failure mode: if they arrive cold from Google with no `?p=`, they simply start fresh. Acceptable, because organic visitors are mid-funnel anyway.

### The account nudge (lightweight, not a wall)
At 18 of 23 (roughly 78 percent), a one-line inline bar appears, never a modal:

> "Almost there. Want to keep your 5 Crowns? Save your progress." with a single email field.

This is the ONLY persistence escalation. It posts to the same Phase B style endpoint pattern, sets `create_account: false` by default, and is fully skippable. No dark patterns, no blocking.

---

## 3. The UI

### a) Persistent progress chip (every glossary page, top-right of the term header)
- A 28px **progress ring** drawn in SVG: track in `--line`, filled arc in `--teal-700`, the mastered portion overdrawn in `--mint`. Center holds the count "7/23" in Inter Tight.
- Tapping the chip opens a slim **Trail drawer** (right-side sheet, `--cream-card` background).

### b) Trail drawer
- 23 small term rows grouped into 4 named clusters (see badges below). Each row: term name, a state dot (empty / `--teal-300` viewed / `--mint` mastered), and a "Go" link carrying `?p=`.
- Top of drawer: the large ring, "You know 7 of 23 terms," and earned badges as small medallions.
- This is the single source of truth and the navigation spine. It replaces a generic glossary index with a progress-aware one.

### c) End-of-term footer module (on each term page)
- "Got it" affirm button (`--mint` on `--teal-night`).
- A **suggested next term** card: not just sequential. We pick the next-best term by a simple dependency map (e.g. after "Deductible," suggest "Coinsurance" then "Out-of-pocket maximum"). Card shows the term, a one-line teaser, and "+1 Crown."
- Micro-line: "2 more terms to unlock the Coverage 101 badge."

### d) Badges (4 cluster badges + 1 capstone)
Tasteful medallion style, Fraunces label, no cartoon mascots:
- **Coverage 101** — the 6 foundational terms (premium, deductible, coinsurance, copay, out-of-pocket max, network).
- **No More Surprises** — the cost-and-billing cluster (balance billing, allowed amount, UCR, EOB, claim).
- **In Network, On Purpose** — the PPO mechanics cluster (PPO vs HMO, in vs out of network, annual maximum, waiting period).
- **The Fine Print** — the edge terms (pre-existing, missing tooth clause, frequency limits, downgrade, predetermination, etc.).
- **Capy Crowns Scholar** (capstone) — all 23 mastered. Unlocks the completion reward.

Badges fire with a quiet toast (slide-in, `--cream-card`, 2.5s), never a full-screen takeover.

---

## 4. The loop

1. Land on a term (from SEO or the trail).
2. Read. At 60 percent scroll the ring ticks up light (Viewed). Tiny, satisfying.
3. Footer: "Got it" -> Crown earned, ring fills solid `--mint`, `?p=` updated silently.
4. Suggested next term card pulls them to the dependency-ordered next page, state carried in the URL.
5. Cluster completion fires a badge toast: tangible milestone every ~5 terms, so the 23-term journey never feels flat.
6. At 18/23, the gentle save-progress nudge.
7. At 23/23, the completion reward.

The loop is deliberately short (read -> affirm -> next) so momentum compounds.

---

## 5. Completion reward (the payoff into the funnel)

At 23/23 the Trail drawer and a dedicated end-card transform into a **personalized handoff**, not a trophy screen:

> "You now know all 23 PPO terms. You are ready to compare plans like an insider."

- Capstone **Capy Crowns Scholar** medallion, with the running Crown total.
- Primary CTA: "Compare PPO plans -> " into `/compare-ppo-dental-plans`.
- Secondary CTA: "Find a verified dentist -> " into `/find-my-dentist`.
- Copy reframes the badges as proof: "You understand balance billing, annual maximums, and EOBs. Most patients do not." This converts knowledge into purchase confidence, which is the whole point of the glossary.

The reward is the bridge from education to the hub. Gamification serves funnel, not the reverse.

---

## 6. Tone guardrails

- No em-dashes anywhere in copy.
- Crowns and ring, never "XP" or "level up" in user-facing text.
- No countdown timers, no streaks (streaks need daily return; a glossary does not).
- No Capy Crowns visuals inside the T5 modals (per house rules); this layer lives only on glossary pages.
- Reuse design tokens exactly: `--teal-700`, `--mint`, `--cream-card`, `--line`, Fraunces for badge labels, Inter Tight for counts.
- Adult, calm, boutique. The learner should feel briefed, not entertained.
