# Agent 15 — Google SERP Title, Meta & Snippet Specialist

> Memo file name is `16-…` for repo ordering; this is the Agent 15 workstream from the
> Master Prompt (title tags, H1, meta descriptions, snippet ledes, byline/dates, OG,
> Twitter, image previews, sitelinks, anti-duplication, no unsupported "best" claims).

**Audited:** the 10 ZIP pages in `docs/ppo-redesign/_redesign-package/`
(index + compare + 8 spokes, incl. both Delta files) and the live
`compare-ppo-dental-plans.html`. Lengths below are measured from the actual `<title>`
and `<meta name="description">` strings, not the scorecard's claim.

**Score: 7.5 / 10** — the ZIP's post-fix metadata is genuinely strong and must be
preserved; it loses points for snippet-lede absence, a Delta canonical/noindex bug, a
visible-byline parity gap on spokes, and an em-dash style violation against CLAUDE.md.

---

## 1. Verifying the scorecard's claim (titles 43–56, descriptions 141–157)

**Mostly true for the canonical spokes, but with material exceptions.** Measured:

| Page | Title chars | Desc chars | robots | Notes |
|---|---:|---:|---|---|
| index (hub) | 56 | 142 | index | ✓ compliant |
| compare (ZIP) | 49 | 154 | index | ✓ compliant |
| aetna-dental-direct | 41 | 142 | index | ✓ |
| ameritas-primestar-care-complete | 55 | 150 | index | ✓ |
| guardian-premier-2-0 | 53 | 134 | index | ✓ |
| humana-extend-5000 | 49 | 142 | index | ✓ |
| uhc-primary-dental | 53 | 142 | index | ✓ |
| mutual-of-omaha-dental-preferred | 56 | 142 | index | ✓ |
| metlife-ncd-complete | 50 | 147 | **noindex** | ✓ lengths; correctly noindexed |
| **delta-ppo-premium-healthcare** (indexed Delta) | 49 | 150 | index | ✓ |
| **delta-ppo-premium** (editorial Delta) | **~95** | **~245** | noindex | ✗ OLD un-fixed file; over-length |

**Conclusion:** the scorecard's "43–56 / 141–157" range holds for every *indexed*
page. The outlier is the duplicate `delta-ppo-premium.html` (the old editorial version):
it was set `noindex` but its title/description were **never rewritten** and still run
~95 / ~245 chars. Because it is noindexed this does not hurt SERPs directly, but it is a
landmine if anyone ever flips it back to index, and it signals the "two Delta files"
problem (scorecard doc 02) is only half-resolved.

The live `compare-ppo-dental-plans.html` title is **86 chars**
("Compare PPO Dental Plans 2026: Delta Dental, Aetna, Guardian, UHC & More | CoverCapy")
— it *will* truncate. The ZIP's compare title (49 chars) is the better pattern.

---

## 2. What the ZIP already does well — DO NOT LOSE THIS

This is the founder's core fear ("too basic / worse than current"). On metadata the ZIP
is **not** basic — it is ahead of the live page. Preserve all of the following:

1. **Compliant, keyword-first, unique titles** — every indexed page has a distinct,
   non-templated title that leads with the exact product entity
   ("Aetna Dental Direct", "Humana Extend 5000") + "Review 2026" + "| CoverCapy".
   No two indexed titles collide.
2. **Compliant, unique meta descriptions** — each spoke description names that plan's
   *specific* differentiator (Ameritas "no waiting periods, day-one implants, max grows
   to $3,500"; UHC "basic care from day one, $1,000 max, ages 64 and under"; Humana
   "dental plus vision, $5,000 max"). These are not boilerplate — they are individually
   written and fact-bearing. This is a real asset.
3. **Full Open Graph + Twitter card on every page** — `og:image` (per-carrier
   1200×630 PNG in `/assets/`), width/height, `og:locale`, `twitter:card=
   summary_large_image`, twitter title/desc/image. The live page only has a single
   generic OG image. The ZIP's per-carrier OG art is a genuine upgrade.
4. **MetLife `noindex,follow`** — correct: the plan is "under review," its description
   says so, and it is excluded from the sitemap. Keep this exactly.
5. **`max-image-preview:large, max-snippet:-1`** robots directives on indexed pages —
   maximizes rich-result and snippet surface. Keep.
6. **Clean canonical per page** + nested URL family
   (`/dental-insurance/ppo-plans/{carrier}/{plan}/`). Keep.
7. **`datePublished` / `dateModified` / `author` in schema** + visible
   "Last verified Jun 20, 2026" line. Keep and extend (see gaps).
8. **No unsupported "best" claims** in any title or description. They use neutral,
   defensible language ("Independent review of…"). This is correct and on-brand; do not
   let a future copy pass introduce "best PPO plan" superlatives.

---

## 3. What must be ADDED or FIXED

### A. Snippet-ready, answer-first lede (highest impact)
Every spoke jumps **H1 → tagline → spec sheet**. There is no 1–2 sentence prose
paragraph directly under the H1 that answers "what is this plan and who is it for" in
plain text. Google and AI Overviews pull the snippet from early, self-contained prose;
a chip/tagline ("$5,000 max · 60% major in year two") is not a sentence and is weak
snippet bait. **Add a 200–320 char answer-first `<p class="lede">`** under each H1, e.g.:

> "Humana Extend 5000 is an individual PPO dental plan with a $5,000 annual maximum and a
> bundled vision benefit. Preventive care is covered from day one; major work reaches 60%
> in year two. Below is an independent breakdown of coverage, waiting periods and the fine
> print to confirm before you enroll."

This is the single biggest SERP/AI win and the scorecard's own "pending content pass"
(docs 05/11) flags it.

### B. Delta canonical/noindex collision (correctness bug)
Both `delta-ppo-premium.html` (noindex) and `delta-ppo-premium-healthcare.html` (index)
declare the **same** canonical `…/delta/ppo-premium/`. That is acceptable *only* because
the editorial one is noindexed — but the editorial file's stale ~95-char title/desc must
be rewritten to match (or the file deleted) so the duplicate cannot leak. Pick ONE Delta
file as canonical, delete or 301 the other. Do not ship two Delta sources.

### C. Visible byline / reviewer parity on spokes (E-E-A-T)
The live hub shows a **visible human reviewer** ("Plan data reviewed by **Sarah Chen**,
licensed dental insurance consultant · Verified June 2026"). The ZIP spokes have
`author` only in *schema* and only a "Last verified" date in the body — no visible named
reviewer. Schema/visible parity matters for E-E-A-T and for rich-result eligibility. **Add
the same visible byline block to every spoke**, with a real, linkable reviewer bio. (Note:
the named-reviewer item needs business sign-off per scorecard doc 08.)

### D. Em-dash style violation (brand-rule compliance)
CLAUDE.md and the Master Prompt both forbid em-dashes in copy. The ZIP descriptions use
em-dashes liberally ("Compare individual PPO dental plans by carrier — coverage…").
SERP-visible copy is the most public surface for this rule. **Replace `—` with a colon,
comma, or middot in every title/description/OG string.** Cheap, zero-risk, on-brand.

### E. Title duplication risk on future carrier hubs
The plan-spoke pattern is safely unique today, but the IA adds **carrier hubs**
(`/…/delta-dental/`) and **treatment pages**. Without a rule these will templated-collide
("Delta Dental Dental Insurance 2026 | CoverCapy" vs the plan page). Lock a distinct
title pattern per page *type* (below) so the carrier hub never mirrors its own plan page.

### F. Sitelink-oriented nav
The sticky subnav anchors (Overview / Coverage / Waiting periods / Costs / Sources) are
good sitelink fodder, but they need stable, descriptive `id`s and matching in-page
headings so Google can surface them as sub-results. Ensure anchor text is descriptive,
not "click here," and that the H2 text matches the subnav label.

---

## 4. Deliverable — Title / Meta pattern per page type

Rules for all: ≤60 char titles, 140–158 char descriptions, lead with the exact entity,
brand suffix "| CoverCapy", **no em-dashes**, **no "best/cheapest/#1"** unless evidenced,
one unique answer-first lede per page mirrored in `og:description`.

**Master PPO hub** (`/dental-insurance/ppo-plans/`)
- Title: `Individual PPO Dental Plans by Carrier (2026) | CoverCapy` (56) — keep as-is.
- Desc: `Compare {N} individual PPO dental plans by carrier: coverage, waiting periods,
  annual maximums and networks. We verify your exact plan free.` (~150)
- H1: "Explore individual PPO dental plans". Lede: one sentence defining the hub + the
  verify offer.

**Comparison hub** (`/compare-ppo-dental-plans/`)
- Title: `Compare PPO Dental Plans Side by Side (2026) | CoverCapy` (49) — adopt the ZIP
  title; **retire the live 86-char title.**
- Desc: ZIP's 154-char version (de-em-dashed). H1 matches "Compare PPO dental plans side
  by side".

**Plan spoke** (`/…/{carrier}/{plan}/`)
- Title: `{Exact Plan Name} Review 2026 | CoverCapy` (keep ≤60; drop the long Delta
  "Benefits, Waiting Periods & Limits" variant).
- Desc: `Independent review of {Plan}: {plan-specific differentiator + one number}. We
  verify your exact plan free.` — keep the ZIP's individualized style.
- H1: exact plan name (no superlatives). Lede: answer-first paragraph (§3A).

**Carrier hub** (`/…/{carrier}/`) — NEW, anti-collision pattern
- Title: `{Carrier} Dental Plans, Networks & Reviews (2026) | CoverCapy`
  — note "Plans, Networks & Reviews" (plural/hub framing) so it never mirrors the spoke's
  "{Plan} Review 2026".
- Desc: `All {Carrier} individual PPO dental plans compared: networks, waiting periods,
  annual maximums and which plan fits which treatment. Verify free.`
- H1: "{Carrier} PPO dental plans". Lede: carrier-entity sentence + plan count.

**Treatment page** (`/…/dental-insurance-for-{treatment}/`)
- Title: `Dental Insurance for {Treatment}: Coverage & Plans (2026) | CoverCapy`
- Desc: `Which PPO dental plans cover {treatment}, the waiting periods and exclusions,
  and a real cost example. Compare verified plans and verify yours free.`
- H1: "Dental insurance for {treatment}". Lede: answer-first ("Most PPO plans cover
  {treatment} at the {tier} tier after a {wait}…").

**Glossary term page** (`/…/glossary/{term}/`)
- Title: `{Term} in Dental Insurance, Explained | CoverCapy`
- Desc: `What "{term}" means on a dental plan, why it changes your bill, a quick example,
  and the plans where it matters most.`
- H1: "{Term}". Lede: the direct definition sentence first (snippet/AI target).

---

## 5. Acceptance criteria
- [ ] Every indexed page: title ≤60, description 140–158, both unique, entity-first.
- [ ] No em-dashes in any title, description, OG or Twitter string.
- [ ] One answer-first `<p>` lede (200–320 chars) under every H1, mirrored in
      `og:description`.
- [ ] Exactly one Delta plan file indexed; the other deleted or 301'd; stale title/desc
      removed.
- [ ] Visible named reviewer byline + verified date on every spoke, matching schema
      `author`/`dateModified`.
- [ ] Carrier-hub and treatment titles follow the distinct per-type patterns (no
      spoke/hub title collision).
- [ ] OG image + Twitter card present on every page (already true — keep on new pages).
- [ ] No "best/cheapest/#1" claims without cited evidence.
- [ ] Subnav anchor `id`s stable + descriptive for sitelink eligibility.

---

## Risks
- Rewriting the live compare title changes a currently-ranking SERP entry — monitor CTR
  after deploy; the new title is shorter/cleaner so risk is low.
- Adding a named reviewer requires a real person + bio (legal/E-E-A-T) — do not invent.
- Per-carrier OG images must stay factually neutral (no plan numbers that can go stale).
