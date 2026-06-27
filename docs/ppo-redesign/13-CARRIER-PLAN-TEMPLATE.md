# Carrier Plan Pages — shared layout, bespoke analysis (Humana worked example)

> **These are NOT boilerplate templates.** Each carrier plan page is a unique, literal analysis of that
> plan's special perks, anchored by **per-procedure comparison models** that rank it against the other
> plans for implants, crowns, root canals, dentures, braces, and whitening. What is **shared** is only the
> layout, the SEO shell, the schema, and the interactive modules — so the whole site reads as one product
> and earns sitelinks. What is **bespoke** is the content of every section. Branches off the **Compare PPO
> Plans main hub**. A *superset* of the live page + the ZIP spoke — never worse than either.
> Scheme = **T5 jade** (CTA `--teal-night`, links `--teal-700`, accent `--mint`, body `--ink`; body ≠ CTA).

## Carrier tiering rule

| Tier | Carriers | Gets |
|---|---|---|
| **Special (own hub + sub-menu)** | **Delta Dental only** (biggest carrier → extra SEO surface) | `/dental-insurance/ppo-plans/delta-dental/` hub → Premium (featured primary) + Compare + Over-65 + UC-Students sub-hubs (see `06-DELTA-HUB-PLAN.md`) |
| **Standard (single plan page)** | Humana, UHC, Aetna, Ameritas, Guardian, Mutual of Omaha, MetLife | one plan page each at `/dental-insurance/ppo-plans/{carrier}/{plan}/`, this template |

Do **not** give standard carriers Delta's sub-hub. Start the standard rollout with **Humana**, then replicate.

## Where it sits in the site (supports sitelinks)

`Compare PPO Plans (MAIN HUB)` → links down to each plan page with descriptive anchor ("Humana Extend 5000 review") · each plan page breadcrumbs **up** to the hub and links **across** to 2–3 alternatives and **out** to glossary term pages. This reciprocal mesh + clean hierarchy is what earns the brand sitelinks for "covercapy insurance."

## The standard anatomy (fuses live hub + ZIP spoke)

Order, the module it uses (`MODULE-INVENTORY.md`), and the SEO job:

1. **Breadcrumb + reviewed/updated line** — `BreadcrumbList` schema; up-link to hub. (was missing on ZIP Compare)
2. **Answer block (server-rendered)** — one-sentence direct answer + qualified key-fact strip (from $/mo · max · deductible · best-for) + best/weak verdict. *Wins AI Overviews + featured snippet.* (from live + Agent 18)
3. **Spec sheet** — the standardized headline specs, `cc-hl`. Server-rendered. (ZIP `specs`)
4. **ZIP-quote input** — `cc-zip`, "see your real price" → quote handoff. (ZIP `card zip`)
5. **Coverage grid** — 100/80/50 + implants + ortho, `cc-cov` + spec-dots. (ZIP + live)
6. **Waiting/effective timeline** — when each tier unlocks; distinguishes "coverage starts" from "tier becomes eligible." (ZIP `timeline`)
7. **Realistic first-year cost example** — one crown / one filling worked through. (ZIP `example`)
8. **Fine print** — missing-tooth, frequency limits, LEAT, lifetime ortho max — with `cc-gloss` glossary tooltips inline (3-layer). (ZIP `limits` + live tooltips)
9. **Per-procedure comparison models — the core analytical module (bespoke per plan).** For each major procedure (implants · crowns · root canals · dentures · braces · whitening), a mini comparison ranking THIS plan against the field with the real numbers and the *why*. Example: *Implants — Ameritas & Mutual of Omaha win (day-one, 20%→50%); Humana mid-pack (50% after 6-mo); Delta & UHC slow (12-mo wait).* Each row links to the procedure's treatment guide and to the rival plan pages. This is original analysis, never templated copy — it's the reason a procedure-shopper lands here.
10. **Smart-Match lens + value-frame** — emergency-aware match annotation + cash-vs-premium payoff (the live page's strongest asset — do NOT drop). (live `match`, Agent 11)
11. **Enrol step (NEW vs both)** — plan-confirm → total-cost Y1/Y2 → predetermination note → carrier handoff as the *final* step, not the only one. (Agent U5/11)
12. **Compare-with alternatives** — 2–3 honest alternatives + "compare side by side" into the hub matrix with this plan pinned. (`cc-tray`)
13. **Glossary mini** — the short defs for the terms used on this page (links to full term pages).
14. **FAQ** — natural-question `FAQPage` schema, parity with visible text.
15. **Sources & transparency / update log** — last-verified, confidence tags, named reviewer, "how we reviewed." (ZIP `sources` + `transparency`)

## Schema (server-rendered `@graph`)
`WebPage` · `BreadcrumbList` · `FAQPage` · `Service` (price-free — **no `Offer.price`/`InStock`** for illustrative premiums) · one reusable carrier `Organization @id` with `sameAs`. Visible-content parity required.

## Humana Extend 5000 — worked example (frozen values)
- **Answer block:** "Humana Extend 5000 is the only plan on the shelf bundling dental + vision + hearing, with the best Year-1 major rate (50%) — for a higher premium and a 90-day basic wait." Key facts: from $100/mo · $5,000 max · $75 deductible · best for *one-card dental+vision+hearing*.
- **Coverage:** Prev 100%·day1 · Basic 80%·90-day · Major 50%→60%·6-mo · Implant 50%→60%·6-mo · Ortho not covered.
- **Timeline:** coverage starts 6 days after enrolment; basic at 90 days; major/implant at 6 months (vs 12-mo industry standard — its edge).
- **Cost example:** a $1,400 crown in month 7 → 50% → you pay ~$700 (after deductible), vs $0 before month 6.
- **Fine print (tooltipped):** 90-day basic wait, missing-tooth clause, hearing not in NY, contact-lens fit excluded in AZ/GA/MD/NC/TX.
- **Per-procedure ranking (bespoke):** *crowns / major* — best Year-1 rate on the shelf (50%); *implants* — mid-pack (50% after 6-mo: beats UHC's 12-mo wait, behind Ameritas/MoO day-one); *root canals* — strong (50% Y1 → 60% Y2); *braces* — not covered (route to Delta or Guardian); *dental + vision + hearing* — **unique**, the only plan that bundles all three. Each ranking links to that treatment guide + the named rival plans.
- **Special perks (the page's headline):** the only dental+vision+hearing bundle; the fastest path to major coverage (6 mo vs the 12-mo norm); a $200/yr in-office whitening allowance; major climbs to 60% in Year 2.
- **Alternatives:** Mutual of Omaha ($5,000 max, lower premium, day-one basic) · MetLife (highest ceiling, under review).
- **Sources:** `humana-extend-5000.md`, last verified June 2026; premium illustrative, varies by state.

## Build order
Humana (pilot) → UHC → Aetna → Ameritas → Guardian → Mutual of Omaha → MetLife (`noindex` until verified). Delta runs its own track (`06`). All on `assets/ppo/ppo-system.css` + `ppo-hub.js`; facts server-rendered; numbers from the `.md` source of truth.
