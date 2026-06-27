# PPO Plans Hub Rebuild — Research & Build Program

**Target page:** https://www.covercapy.com/dental-insurance/ppo-plans/ (the PPO plans hub)
**Parent:** https://www.covercapy.com/dental-insurance/ (dental insurance hub)
**Folded under hub (breadcrumb):** https://www.covercapy.com/compare-ppo-dental-plans/ becomes a child of /ppo-plans/
**Status:** PLANNING ONLY. No production changes until the 20 specs + master console are complete and the user approves.

---

## THE GOAL (north star)

Rebuild /dental-insurance/ppo-plans/ into the single page someone shares with their family the moment dental work comes up: "ooo CoverCapy, let's see which featured plan best fits my situation." It must:

- Be **scenario-first**, not plan-first: help a visitor find the best PPO plan for **themselves, their kids, their spouse, or their whole family**, around real life events.
- Account for **family deductibles, family maximums, and family/membership discounts**: Humana family/loyalty economics, Aetna + CVS ExtraCare Plus perks, Mutual of Omaha for the 65+ / Medicare-adjacent buyer, **braces for kids via Guardian**, **braces for an adult via Delta Dental**.
- **Keep the plan "stories"** (the narrative voice of each featured plan). Everything else is open to redesign. No mandated editorial style; the UX/SEO agents decide the visual and structural direction.
- Win **SEO and GEO** (AI citation) decisively and be **highly shareable** with strong **retention** and **conversion**.
- Include tasteful **interactive widgets** (scenario finder, family builder, plan matcher) — fun clicks, but **limit heavy calculators**.
- Introduce a **left rail and a right rail** for feature/ad placements, shopping (CVS), and rewards (Capy).

## NON-NEGOTIABLE CONSTRAINTS (all specs must honor)

- **Plan facts come ONLY from `/data/plans/*.md` SSOTs** (CLAUDE.md rule 13). Never invent a plan number. 8 verified plans: metlife-ncd-complete, delta-dental-ppo-premium, guardian-premier-ppo, ameritas-primestar, uhc-primary-dental, aetna-dental-direct, humana-extend-5000, mutual-of-omaha-dental.
- No em-dashes. Preserve design tokens. No fabricated stats or reviews. Build URLs from parts. Member IDs never stored.
- CoverCapy is an independent educational marketplace, not an insurer. No guarantees of coverage/acceptance.

## FEATURED-PLAN FIT CHEAT SHEET (verify each against its SSOT before using)

- **Aetna Dental Direct** — CVS ExtraCare Plus perks ($10/mo CVS reward, 20% off CVS Health brand), CVS Health family. Everyday balanced PPO.
- **Guardian Premier PPO** — dependent (child) orthodontics; strong for **braces for kids**.
- **Delta Dental PPO Premium** — large network; the **adult braces** angle.
- **Mutual of Omaha** — strong for **65+ / Medicare-adjacent**, selectable max, no-wait major, lifetime implant.
- **Humana Extend 5000** — high $5,000 max; family value / loyalty.
- **Ameritas PrimeStar** — no waiting periods, day-one major.
- **UnitedHealthcare Primary Dental** — cheapest, fast preventive, entry tier.
- **MetLife NCD Complete** — day-one structure; verify SSOT.

---

## THE 20 SPECS (each a strict-detail .md in this folder)

**Wave 1 — Foundation, audience, plan-fit**
1. `01-current-state-audit.md` — audit the current hub, parent, and compare page (structure, content, links, gaps).
2. `02-competitor-serp-geo-audit.md` — competitor + SERP + AI-citation landscape for dental-plan comparison hubs.
3. `03-keyword-geo-map.md` — keyword/entity map + GEO question clusters.
4. `04-ia-url-migration.md` — information architecture, URL/breadcrumb plan, /compare under /ppo-plans, 301s, canonical, sitemap.
5. `05-personas.md` — buyer personas (single adult, parent, couple, whole family, 65+).
6. `06-scenario-matrix.md` — life-event scenarios mapped to plan recommendations.
7. `07-family-economics.md` — family deductibles, family maximums, family/loyalty discounts (Humana, Aetna/CVS, MOO 65+), multi-member math.
8. `08-plan-fit-by-scenario.md` — which featured plan wins per scenario (kids braces=Guardian, adult braces=Delta, 65+=MOO, CVS=Aetna, etc.), sourced from SSOTs.
9. `09-patient-testing.md` — simulated patient/user testing across personas (comprehension, trust, friction, share intent).
10. `10-ux-flow-wireframe.md` — page flow, scroll narrative, wireframe with left rail / content / right rail.

**Wave 2 — UX build, SEO/GEO, monetization, program**
11. `11-interaction-widgets-spec.md` — interactive widgets spec (scenario finder, family builder, plan matcher), light-calc only.
12. `12-conversion-psychology.md` — behavioral-econ conversion levers, trust, social proof, share triggers.
13. `13-retention-engagement.md` — retention loops, return/share triggers, rewards tie-in.
14. `14-rails-monetization.md` — left + right rail spec: feature/ad placements, CVS shopping, Capy rewards, placement logic.
15. `15-onpage-seo-spec.md` — title/meta/heading/schema (ItemList, FAQPage, Product, BreadcrumbList) for the hub.
16. `16-geo-ai-citation-spec.md` — GEO answer blocks + schema engineered for ChatGPT/Perplexity/Claude citation.
17. `17-internal-linking-silo.md` — internal linking silo: hub ↔ plans ↔ scenarios ↔ guides ↔ dentist hub.
18. `18-content-outline-stories.md` — full content outline that preserves each plan's story and adds scenario sections.
19. `19-six-month-roadmap.md` — phased 6-month roadmap, milestones, dependencies, resourcing.
20. `20-seo-projection-kpis.md` — SEO/GEO traffic projection, KPIs, measurement, risks.

**Synthesis**
- `00-MASTER-CONSOLE.md` — final build console reconciling all 20 into one sequenced plan for sitebuilders/webmasters.
