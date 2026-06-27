# Agent 04 — Brand Identity & Concierge Voice

**To:** CoverCapy Product, Brand & Design Council
**From:** Agent 04 — Brand Identity & Concierge Voice
**Date:** 2026-06-21
**Re:** What makes the PPO hub unmistakably CoverCapy — positioning, voice, Mr. Bara rules, carrier-brand restraint, and the brand/identity surface
**Mandate:** Premium concierge clarity. Patient-first. Independent by design. Editorial only where it earns its place.

---

## 0. Sources reviewed

- `compare-ppo-dental-plans.html` — live hero, eyebrows, lede, "Independent by design" credibility band, reviewer bar (Sarah Chen), "Buyer's playbook," "The reading room" FAQ, concierge note. Live tokens confirmed (see below).
- `docs/ppo-redesign/_redesign-package/analysis/mascot-trust-analysis.md` — verdict: use Mr. Bara in a limited, supporting role; Headspace model, not GEICO.
- `docs/ppo-redesign/00-MASTER-PROMPT.md` — Core visual direction, Preserve-from-live, Avoid list, Carrier color rule, Mr. Bara rule.

**Confirmed live tokens (source of truth, supersedes any drift in CLAUDE.md):**
`--paper:#F5F0E5` · `--paper-2:#EFE8D9` · `--ink:#21302A` · `--ink-soft:#3A4A42` · `--green:#2E5E45` · `--green-d:#234A37` · `--green-l:#5C7A66` · `--gold:#C0902E` · serif `Fraunces` (weight 500, italic for emphasis) · sans `Inter / Inter Tight`. Eyebrow glyph: gold eight-point asterisk `&#10038;` (✦) preceded by a hairline rule.

> Note: The codebase carries two teal/green palettes. The live `compare-ppo` page uses **forest green `#2E5E45` on warm paper `#F5F0E5`**; the T5 dentist generator (CLAUDE.md) uses **deep teal `#082A30`**. The hub redesign should standardize on the **live forest-green + warm-paper** identity as the brand-defining surface. Flag for Agent 01 (design-system director) to reconcile, but do not invent a third palette.

---

## 1. BRAND POSITIONING

### One-liner
**CoverCapy is the independent concierge for individual PPO dental — it reads the plans for you, in plain English, and walks you to a dentist who actually takes the one you pick.**

Tagline (preserve): *"Get cover today, see a dentist tomorrow."*

### The five adjectives that gate every design and copy choice
Every component, color, sentence, and illustration must pass all five. If it fails one, it is not CoverCapy.

1. **Concierge** — we do the reading and the legwork; the user is served, never processed. Tone is "across the counter," not "submit your application."
2. **Independent** — no carrier pays for placement; we are paid by network dental offices, not by which plan you choose. This is a structural fact, stated plainly, never as a boast.
3. **Calm / unhurried** — warm paper, hairline dividers, editorial spacing, generous line-height. No urgency, no countdowns, no flashing. The page should lower the pulse of an anxious buyer.
4. **Plain-spoken / honest** — we name the trade-off, the waiting period, the thing a plan is weak for. Clarity is the luxury. No hype, no unsupported "best."
5. **Quietly premium** — "Maison Concierge" hotel-lobby-at-dusk; "Atelier Vellum" printed-membership-folio. Restraint reads as expensive. Refined serif headlines, a single gold accent, nothing decorative without a job.

### Reference feel (mood, not literal)
A boutique-hotel concierge desk and a finely printed membership folio — warm cream paper stock, one deep-green ink, a single gold foil mark, hairline rules, wide margins. The opposite of a fluorescent insurance-comparison portal.

### What CoverCapy is NOT (positioning guardrails)
- NOT a healthcare portal · NOT an insurance carrier · NOT a price-comparison aggregator with rainbow logos · NOT generic SaaS pricing cards · NOT a deal/coupon site · NOT a mascot-led brand.

---

## 2. VOICE & TONE

### The voice in one line
**The wisest, warmest friend who happens to read dental-plan documents for a living** — calm, specific, never selling, never talking down.

### Tone rules
- **Plain English first.** Define jargon in-line or via tooltip; never assume the reader knows "annual maximum" or "waiting period."
- **Name the trade-off.** Every recommendation states what a plan is weak for, not only strong for. Honesty is the trust engine.
- **No hype, no superlatives we can't defend.** Never "best plan," "#1," "guaranteed savings," "unbeatable." Use "best-fit for X," "strong for implants," "lowest premium of the eight."
- **No fake urgency.** No countdowns, "only today," "act now," invented scarcity or popularity.
- **Concierge register, not comedian.** Warmth comes from care and clarity, not jokes — especially never near price, coverage, or legal copy.
- **Editorial restraint.** Editorial only where it adds decision value (a "concierge note," a one-line "why this matters"). **Never** a long essay before the plan inventory. The plans appear high on the page.
- **Independence stated as fact, not slogan.** "No carrier pays for placement. CoverCapy is paid by the dental offices in our network, not by which plan you choose." Plain, once, load-bearing.
- **Mechanics:** No em-dashes (commas, colons, or rewrite). No roman numerals in lists. Practice/plan names set in italic `Fraunces` for emphasis. Sentence case in body; the gold ✦ eyebrow is the one recurring flourish.

### Before / After copy examples

**1. Hype → Honest specificity**
- Before: "Find the #1 best dental plan and save big today!"
- After: "Eight individual PPO plans, checked on the things that actually decide your bill, then matched to the treatment ahead and a top in-network dentist near you." *(live lede — keep)*

**2. Fake urgency → Calm reassurance**
- Before: "Hurry — lock in your coverage before rates rise tonight!"
- After: "Take the time you need. Pricing and availability depend on your location, so the final number comes from a quick quote, not the clock."

**3. Insurance jargon → Plain English**
- Before: "Subject to a 12-month waiting period on Class III basic and major restorative services per the EOC."
- After: "Major work like crowns and implants is covered after a 12-month wait on this plan. Day one covers cleanings and exams. We will flag this before you enroll."

**4. SaaS feature-brag → Concierge service**
- Before: "Our AI-powered platform optimizes your dental insurance journey end-to-end."
- After: "Tell us the procedure, the timing, and a monthly budget. We narrow eight plans to two, show you the trade-offs, and email the dentist's office to confirm they take it."

**5. Defensive disclaimer → Honest independence (calm)**
- Before: "Results may vary. CoverCapy is a marketing service. Carriers may compensate us."
- After: "Independent by design. No carrier pays for placement. CoverCapy is paid by the dental offices in our network, not by which plan you choose." *(live — keep)*

**6. Overpromise → Named trade-off**
- Before: "Guardian Premier covers everything you'll ever need."
- After: "Guardian Premier 2.0 is strong for major work and has no missing-tooth penalty. It is weak for orthodontics, where the lifetime cap is low. If braces are the goal, compare it with Humana Extend."

**7. Cutesy mascot copy on data → quiet, professional**
- Before: "Uh-oh! Mr. Bara couldn't crunch those numbers! 🦫 Try again!"
- After (empty state, with small Mr. Bara): "We could not load this comparison just now. Refresh, or tell us the plans you want and a concierge will pull them for you." *(character may sit beside this; the words stay calm and competent)*

### Anchored vocabulary
- **Use:** concierge, matched, in-network, plain-language, the things that decide your bill, best-fit, weak for, trade-off, across the counter, the reading room, independent by design, verify, walk you through.
- **Avoid:** #1, best, cheapest, guaranteed, unbeatable, hurry, limited-time, optimize, leverage, solutions, journey (as SaaS filler), revolutionary, seamless.

---

## 3. MR. BARA USAGE MATRIX

**Brand role:** Mr. Bara is a *calm concierge guide*, not a comedian and not a hero. Headspace register, not GEICO. He adds **warmth in the gaps**; he never subtracts **competence** from the core. (Trust = warmth × competence; the mascot analysis verdict is "use in a limited way," A/B-gated.)

**Treatment / size:** Icon-to-small only, roughly **24–64px** in context. Static or subtle motion only; honor `prefers-reduced-motion`. Decorative instances get `alt=""`; any informative guidance also exists as real text (never image-only). At most **one Mr. Bara touch per screen region** — he guides, then gets out of the way. Single line-art or flat treatment in the brand palette (forest green / gold accent on paper). Never gradient-filled, never 3D-glossy, never animated loops on serious pages.

### ALLOWED placements — and the emotional job at each

| Placement | Size / form | Emotional job |
|---|---|---|
| **Smart Match intro** | ~48px avatar beside "Tell us about your visit" | "A real guide is doing the narrowing for you." Reduces quiz-fatigue; signals service. |
| **Glossary tooltips / "explain this"** | ~24px inline icon that opens a plain-language definition | "Someone is here to translate the jargon." Lowers intimidation at the exact word that confuses. |
| **Loading states** | ~48–64px, subtle | "Your matches are being pulled by a person, not a black box." Turns dead time into reassurance. |
| **Empty / error states** | ~48–64px | "Nothing went wrong with *you*; we'll fix it or do it for you." Removes blame, offers a path. |
| **Verification / eligibility step** | ~48px at top of the form | "Here is why we need this, and it's secure." Calms the single highest-anxiety, highest-drop-off moment. |
| **Quiet cue beside a high-friction CTA** | ~32–48px avatar + one line ("A CoverCapy concierge will walk you through this.") | "A human will catch me if I'm unsure." Confidence to click. |

### FORBIDDEN placements (hard rule — never)

- Over or beside **plan prices / premiums**.
- Over or inside **coverage matrices / spec tables** (annual max, deductible, 100/80/50 grids, implant/ortho rows).
- In or beside **exclusion / fine-print / waiting-period legal text**.
- In or beside **legal disclosures, disclaimers, regulatory copy**.
- Over **source lists / source drawers / methodology citations**.
- As a **page-dominating hero**, an **auto-playing/looping animation**, or a **blocking pop-up / interstitial**.

**Why:** these are the competence zones that carry CoverCapy's trust. A character there reads as unserious, adds visual noise where processing fluency matters most, and (per the research) high-knowledge premium buyers grow *more* skeptical when anthropomorphism touches real-money decisions.

**Rollout gate:** Ship Mr. Bara behind the A/B test from the mascot memo. Primary metric: `verification_start`. Guardrails: overall conversion, drop-off at price/coverage sections, and a short trust/seriousness survey. A trust drop kills the variant even if verification starts rise.

---

## 4. CARRIER-BRAND RESTRAINT

**Principle:** **CoverCapy's identity is the page. Carriers are content on it.** A reader should always feel they are inside one calm, independent CoverCapy environment — never inside Delta's site, then Aetna's, then Guardian's. This is also a trust signal: a page that repaints itself per carrier looks paid-for; a page with one steady identity looks independent.

### How a carrier may appear (allowed)
- **Logo** — small, monochrome or single-color where possible, sitting in a neutral chip on paper. Used for recognition and scanning, never as a banner.
- **Small accent line / hairline** — one thin rule or a single small swatch in the carrier's color may mark a carrier card or comparison column for at-a-glance identification. One element, not a theme.
- **Small badge** — e.g. "Delta Dental PPO network" or a tier label, as a restrained pill in CoverCapy's badge style.
- **Restrained comparison marker / icon** — a tiny color dot keyed to a carrier in the compare matrix legend, so columns are distinguishable.

### What is forbidden (never)
- **Repainting the page per carrier** — no per-carrier background, header, or section-color takeover.
- **A different color system for each carrier hub** — every carrier hub uses the one CoverCapy system; the carrier appears only via logo + small accent.
- **Rainbow carrier-card layouts** — eight cards each in their own brand color is a marketplace look, not a concierge look.
- **Large carrier hero logos** that imply endorsement or sponsorship.
- **Carrier brand color as the dominant UI color** on any surface.

### The rule in one sentence
A carrier gets **one logo and one small accent** for recognition; CoverCapy keeps the paper, the green, the gold, the type, and the voice on every page.

---

## 5. THE "BRANDING PAGE" — CoverCapy identity / about surface

**Purpose:** Answer "who is CoverCapy and why should I trust their recommendation?" before the user trusts a plan ranking. This is the page that converts skepticism ("is this another lead-gen site?") into confidence ("this is an independent concierge that's on my side").

### What it must convey
1. **The independence model, in plain terms.** "We are paid by dental offices in our network, not by which plan you pick. No carrier pays for placement." Show the incentive structure honestly — this is the single most trust-defining fact.
2. **The concierge promise.** What "concierge" actually means here: we read the plans, translate the jargon, name the trade-offs, and email the dentist's office to verify your plan. Service, not software.
3. **The methodology, made human.** Who reviews the plan data (e.g., the Sarah Chen reviewer line — licensed consultant, billing specialists, former treatment coordinators), how often it's updated, and the "how we choose plans" logic. Real, verifiable people only.
4. **Patient-first scope.** We index dentists and verify networks for the patient. The provider/membership side exists but never hijacks the patient's page.
5. **Mr. Bara, introduced once.** The about surface is the one place a slightly larger, warmer Mr. Bara is welcome — as the concierge mascot of the brand, with a sentence on his role ("your guide through the parts that usually confuse people"). Still not slapstick.

### What it must look like
- Editorial long-form is *permitted here* (this is the rare page where storytelling earns its place) but stays disciplined: warm paper, generous margins, hairline dividers, refined serif headlines, one gold ✦ eyebrow per section, body in Inter at 1.55 line-height.
- A printed-folio feel: section eyebrows, a reviewer/credibility band, a methodology block, an independence statement set apart on a cream panel (`--paper-2`).
- One quiet gold accent moment (a foil-like mark or rule). No gradients, no glass, no stat-counter theatrics beyond the restrained credibility stats already on the live page (8 carriers · 56 coverage checks · 0 paid placements · 6,400+ dentists).
- A single calm CTA to the concierge flow ("Find my best-fit PPO plan") — no banner farm.

**Tone target:** reads like the welcome letter inside a membership folio, signed by a concierge — warm, exact, and unmistakably independent.

---

## 6. DO / DON'T — avoiding the carrier-clone and SaaS traps

### DO
- Keep warm paper `#F5F0E5` + forest green `#2E5E45` + gold `#C0902E` as the one identity on every page type.
- Use refined `Fraunces` serif headlines (weight 500, italic for emphasis) over clean Inter data type.
- Lead with the gold ✦ eyebrow + hairline rule as the recurring brand signature.
- State independence as a plain fact, once, where it's load-bearing.
- Name trade-offs; give every plan a "best-for" and a "weak-for."
- Let the plan inventory appear high; keep editorial to short, purposeful notes.
- Keep Mr. Bara small, calm, and only at friction/empty/loading/verify/CTA-reassurance points.
- Give carriers a logo + one small accent — nothing more.
- Use hairline dividers, wide margins, single gold accents — restraint reads premium.

### DON'T
- Don't paint the page in a carrier's brand color or give each carrier its own theme.
- Don't build rainbow carrier-card grids or per-carrier hero logos.
- Don't use generic AI gradients, glassmorphism, floating glass panels, or random pastel cards.
- Don't ship overly rounded SaaS pricing cards everywhere or endless icon grids.
- Don't put a giant mascot in the hero, over prices, coverage, exclusions, legal text, or sources.
- Don't run countdowns, fake scarcity, invented popularity, or prechecked consent.
- Don't make unsupported "best/#1/cheapest/guaranteed" claims.
- Don't write long editorial essays before the plan inventory.
- Don't use em-dashes or roman numerals in copy.
- Don't let provider/membership CTAs compete with the patient's main task.
- Don't introduce a third color palette — reconcile the existing green/paper vs. teal split with Agent 01, standardizing on green/paper for the hub.

---

## 7. SCORE — current brand coherence

### **6.5 / 10**

**Why not lower:** The live `compare-ppo-dental-plans.html` already nails the core identity — warm paper, forest-green ink, gold ✦ eyebrows, `Fraunces` serif headlines, a genuinely strong concierge voice ("the same answers we give across the counter," "the reading room," "start with the treatment, not the plan"), an honest independence statement, and a real reviewer/credibility layer. The voice is on-brand and rare for the category.

**Why not higher:** (a) **Palette fork** — the hub uses forest green `#2E5E45` while the T5 dentist generator uses deep teal `#082A30`; the brand reads as two related-but-different identities across page types, which undercuts the "one product" feel. (b) **Mr. Bara is absent / undefined on the hub** — there's no codified, restrained presence, so the warmth-at-friction opportunity is unrealized and there's no guardrail preventing a future over-use. (c) **No dedicated brand/identity surface** — the independence story is compressed into one band; there's no page that fully converts skepticism into trust, and carrier-brand restraint rules aren't written down anywhere enforceable.

### Top 3 fixes (in priority order)
1. **Standardize one palette across all page types.** Adopt the live forest-green + warm-paper + gold system as the brand-defining identity for the hub and reconcile the teal T5 generator toward it (coordinate with Agent 01). One identity, every surface.
2. **Codify and ship the restrained Mr. Bara system.** Lock the Section 3 matrix (allowed: Smart Match, tooltips, loading/empty, verify, CTA-reassurance; forbidden: prices, coverage, legal, sources, hero), keep him 24–64px and calm, and gate rollout on the `verification_start` A/B test with a trust guardrail.
3. **Build the carrier-restraint rules into the design system + add a brand/identity surface.** Write the "logo + one small accent, never repaint" rule into `05-APPROVED-DESIGN-SYSTEM.md`, and create an about/identity page that fully tells the independence + concierge + methodology story.

---

*Hand-off: feed Section 1 (positioning), Section 3 (Mr. Bara matrix), Section 4 (carrier restraint), and Section 7 fixes into `05-APPROVED-DESIGN-SYSTEM.md`. Palette reconciliation is a dependency on Agent 01 (design-system director).*
