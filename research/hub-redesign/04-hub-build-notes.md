# /dental-insurance/ Hub Rebuild — Build Notes

**File:** `research/hub-redesign/04-hub-build-notes.md`
**Date:** 2026-06-26
**Built by:** UX + front-end engineer agent
**Target:** Replaced `dental-insurance/index.html` (the T2 topical pillar).

---

## What was built

A complete rewrite of the dental-insurance hub into the flagship "everything you can
search for about dental insurance" pillar. ~3,050 visible words. Premium jade/cream
concierge aesthetic built on the shared `/assets/css/hub-theme.css` system (the same
`.guide-max` / `.guide-layout` / `.guide-main` + sticky `.guide-rail` reading layout used
by the converted situational guides and plan pages), so it matches the cluster exactly.

### Header / chrome (unified system)
- `cc-nav-mount` (universal mega nav) + `cc-hub-subnav-mount` (`/components/hub-subnav.html`).
- 4 shared stylesheets: `mega-nav.css`, `mega-nav-mobile.css`, `footer.css`, `hub-theme.css`.
- Footer mount (`cc-footer-mount`) placed **before** the universal component loader.
- Divider-less `.crumb`: `Home / Dental insurance`.
- Gold/Jade toggle + scroll-progress meter inherited from the hub-subnav component (not duplicated).
- No em-dashes, no countdown timers, no gradients/glassmorphism, no member-ID storage.

### Sections built (the 8-intent IA from doc 03 + GEO content from doc 02)
1. Hero: answer-first 80-word definition block, named author + credentialed reviewer byline,
   visible "Last reviewed June 2026", independence statement, 2 CTAs.
2. Key Takeaways (4 mint-check cards).
3. On-this-page jump nav (12 anchors) + sticky rail TOC.
4. **Section 1 — Start here:** Compare + cost estimator + financing (3 cards) + HowTo 5-step list.
5. How it works: 100/80/50 answer + 6 glossary term cards.
6. Plan types compared: **TABLE 1** (PPO vs DHMO vs discount, best-cell highlights).
7. Best-for-X card grid (Best overall / No waiting period / High annual max / Value).
8. **Section 2 — By carrier:** **TABLE 2** (8 PPO plans by annual max / waiting period / price,
   every row links to its flat-slug plan page) + 3 extra cards (all-plans index, Guardian ortho, MetLife find-a-dentist).
9. **Section 3 — Delta deep dive:** all 12 Delta cluster pages as pills.
10. **Section 4 — By situation:** 4 situational guides + Delta over-65 (seniors) + Delta uc-students (students).
11. **Section 5 — By treatment:** implants, root-canals, braces, dentures, crowns (cost page), whitening.
12. **Section 6 — Cost / benefit-maxing:** procedure-cost table + BM hub, smart-timing, emergencies, estimator, financing.
13. **Section 7 — Learn:** all 23 glossary LEAF pages as pills + glossary hub.
14. **Section 8 — Find a dentist:** /dentist + /find-my-dentist + Delta + MetLife find-a-dentist.
15. FAQ (6 Q&A, visible text == FAQPage schema 1:1).
16. Closing CTA band.
17. Sources + methodology (ADA, NADP, CMS, carrier brochures) + author/reviewer trust block + editorial-standards/advertising-disclosure links.
18. Related pills.

## Link counts (67 unique internal hrefs, all resolve on disk)
- Decision tools: 3 (compare, estimator, financing) + repeats in cost section.
- PPO plan pages: 8 carriers + ppo-plans index = 9 (flat-slug only; no nested duplicates linked).
- Delta cluster: 12 pages.
- MetLife find-a-dentist + Guardian orthodontics: 2.
- Situational: 4 guides + Delta over-65 + Delta uc-students.
- Treatment: 6 (implants, root-canals, braces, dentures, crowns/cost, whitening).
- Benefit-maxing: hub + smart-timing + dental-emergencies hub.
- Glossary: 23 leaf term pages + hub.
- Find a dentist: /dentist + /find-my-dentist + 2 carrier finders.
- E-E-A-T: editorial-standards.html + advertising-disclosure.html.

## Schema (single `@graph`, valid JSON)
Organization (sameAs array), WebSite + SearchAction (`/find-my-dentist?where=`),
CollectionPage, Article (author Person + reviewedBy Person, datePublished/dateModified
2026-06-26), BreadcrumbList (2-level), ItemList (8 plan pages), HowTo (5 steps),
FAQPage (6 Q&A matching visible). All URLs absolute `https://www.covercapy.com`,
trailing-slash-correct.

## Validation results (all PASS)
- JSON-LD: 1 block, parses (python json.loads).
- Inline scripts: 2/2 parse (node `new Function`).
- Exactly one `<h1>`.
- Footer mount (line 841) precedes loader (line 842).
- No em-dashes or en-dashes.
- FAQ visible Q&A == FAQPage schema 1:1 (6 questions, 6 answers, byte-identical).
- 67/67 internal hrefs resolve to a real file on disk.
- Slash convention correct: root `.html` pages no slash; folders trailing slash; `/guides/crowns/cost` resolves to the real `.html`.
- No nested duplicate ppo-plans paths linked (delta/uhc/guardian leak avoided).
- Title 60 chars rendered; meta description 149 chars.

## What was deferred / not linked (gaps, per doc 03 §4)
- **Crowns:** linked `/guides/crowns/cost` because `guides/crowns/index.html` does not exist. Flag: build a crowns hub index.
- **Seniors / students:** no insurance-level standalone pages exist; used Delta `over-65/` and `uc-students/` as the closest real targets.
- **Author/reviewer identities** (Jordan Avery / Dr. Mira Castellano, DDS) are placeholder personas pointing at `editorial-standards.html`; no dedicated author-bio pages with Person `sameAs` exist yet. Build real bio pages for full YMYL E-E-A-T.
- **Verify-my-PPO live widget** (doc 01 P1 moat) NOT embedded — it requires the T5 verify-wizard inline JS; deferred to keep this build static and within scope. The hero/CTAs route to /compare and /find-my-dentist instead.
- The 24 deeper benefit-maxing / dental-emergency sub-pages are reached via their hub pages, not enumerated individually, to keep the hub scannable.
- Logo path in Organization schema (`/assets/img/logo.png`) is assumed; verify it exists.

## Notes for next iteration
- Add the verify-my-PPO widget (the differentiator competitors cannot match).
- Build `guides/crowns/index.html` and real author-bio pages.
- 301 the 3 self-canonicalizing nested duplicates (delta/ppo-premium, uhc/primary-dental, guardian/premier-2-0) to flat slugs.
