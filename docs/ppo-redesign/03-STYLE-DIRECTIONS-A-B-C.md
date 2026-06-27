# Style Directions A / B / C

> Three realistic directions for the PPO hub + brand surface, scored by the 6-agent council
> against the master-prompt weighted criteria. **Recommendation: Direction C.**

## Direction A — Research Terminal (ZIP-dominant)

**Thesis:** the page is an instrument. Max density, spec-first, near-zero editorial.
**Mood:** cool, neutral, clinical-precise (the redesign package as-is).
**Tokens:** cool gray surfaces, bright teal action, Inter only.
**Strengths:** unbeatable scan/compare speed; excellent crawlable spec tables; fast.
**Risks:** reads as a SaaS pricing page / carrier clone; loses CoverCapy warmth and trust differentiation; contrast issues with bright teal; "no soul."

## Direction B — Maison Concierge (editorial-dominant)

**Thesis:** the page is a concierge letter. Warm, story-led, the live page's voice expanded.
**Mood:** hotel-lobby-at-dusk, printed membership folio, Fraunces-forward.
**Tokens:** warm paper, forest green, gold, generous editorial space.
**Strengths:** strongest brand, trust, and differentiation; calm and premium.
**Risks:** buries the plan inventory under prose; slower to compare; weaker scan-first; risks the "long editorial essay before the plans" anti-pattern.

## Direction C — Warm Research Terminal (recommended 70/30 compromise)

**Thesis:** a calm concierge *room* containing a precise comparison *instrument*. Warm paper, Fraunces voice, gold hairlines — wrapped around a dense, tabular, teal-night spec matrix. Smart Match is a lens on that matrix, not a quiz.
**Mood:** *premium concierge clarity meets a modern insurance research terminal.*
**Tokens:** the unified set in `05-APPROVED-DESIGN-SYSTEM.md` (paper `#F5F0E6`, teal-night ink `#082A30`, green action `#2E5E45`, gold accent `#B8924F`, Fraunces + Inter Tight tabular).
**Strengths:** keeps CoverCapy identity *and* makes plan shopping dominant; spec-first but warm; one token set fixes the 3-language fork; contrast-safe.
**Risks:** requires disciplined density-switching (`.cc-comfort` vs `.cc-terminal`) so the two moods don't muddy; more build effort than shipping A as-is.

---

## Decision matrix (council synthesis)

| Criterion | Weight | A | B | **C** |
|---|--:|:--:|:--:|:--:|
| Patient decision clarity | 20 | 7 | 6 | **9** |
| Action / conversion | 18 | 7 | 6 | **9** |
| Cross-page consistency | 15 | 8 | 6 | **9** |
| Plan-data trust & accuracy | 15 | 6 | 8 | **9** |
| Crawl/index | 10 | 8 | 6 | **8** |
| AI answerability | 8 | 8 | 6 | **8** |
| Mobile usability | 6 | 7 | 6 | **8** |
| Accessibility | 4 | 5 | 6 | **8** |
| Performance/maintainability | 4 | 8 | 6 | **8** |
| **Weighted total /10** | | **7.1** | **6.3** | **8.7** |

**Unanimous:** one token set; Fraunces for voice + Inter Tight tabular for data; quiet single verification line (not per-cell badges); restrained Mr. Bara; server-rendered plan facts.
**Recommended:** **Direction C.** It is the literal expression of the master-prompt mandate (70% ZIP / 30% CoverCapy; "concierge clarity meets research terminal").
**Needs user approval:** the trust-color resolution (teal-night ink + green action), and whether the matrix gets a teal-night header band (recommended) vs staying on paper.
