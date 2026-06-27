# 06: Routing and CTA Map
### Every CTA, its destination, the query params, the glossary links
*Both pathways converge on the estimator, the financing page, and the dentist finder. No dead ends.*

---

## Plan CTAs (which plan each pathway points to)

| Pathway | Plan CTA label | Destination | Params |
|---|---|---|---|
| A, maintenance | Compare plans that activate fast | `/compare-ppo-dental-plans` | `?from=benefit-maxing&intent=fast-activation&plan=uhc-primary` |
| A, urgent major | See the day-one major plan | `/compare-ppo-dental-plans` | `?from=benefit-maxing&intent=fast-activation&plan=ameritas-primestar` |
| B, strategize | See the higher-maximum plan | `/compare-ppo-dental-plans` | `?from=benefit-maxing&intent=bigger-maximum&plan=humana-extend-5000` |

The compare page can read `plan` and scroll to or highlight that plan. If it does not yet, the param still carries for instrumentation.

---

## Tool CTAs (the shared three)

| CTA label | Destination | Params |
|---|---|---|
| Estimate my treatment cost | `/dental-treatment-cost-estimator` | `?from=benefit-maxing&path={a|b}` and optionally `&treatment=crown` |
| See monthly payment options | `/dental-financing-monthly-payments` | `?from=benefit-maxing&path={a|b}` |
| Find a PPO dentist | `/find-my-dentist` | `?intent=benefit-maxing&path={a|b}` |
| Verify my benefits | `/find-my-dentist` (verify flow) | `?intent=benefit-maxing` |

Carry `path=a` or `path=b` so you can see in GA4 which pathway drives which exits. Carry `from=benefit-maxing` on every exit for attribution.

---

## Door CTAs (hero)

| CTA | Action |
|---|---|
| See the care-now path | scroll to `#bm-care-now` |
| See the planning path | scroll to `#bm-strategize` |
| Estimate my treatment cost (escape line) | `/dental-treatment-cost-estimator?from=benefit-maxing` |

---

## Glossary hover links (the terms that become tooltips)

These wrap automatically through `glossary-tips.js`. Confirm each links to a live glossary page.

| Term in copy | Tooltip links to |
|---|---|
| annual maximum | `/guides/glossary/annual-maximum/` |
| waiting period | `/guides/glossary/waiting-period/` |
| deductible | `/guides/glossary/deductible/` |
| coinsurance | `/guides/glossary/coinsurance/` |
| copay | `/guides/glossary/coinsurance/` (or build `/guides/glossary/copay/`) |
| in-network | `/guides/glossary/in-network/` |
| day one | `/guides/glossary/day-one/` |

---

## GA4 events

| Event | Fires when |
|---|---|
| `pathway_select` | a hero door is clicked (carry `path=a|b`) |
| `exit_estimate` | any estimator link clicked |
| `exit_financing` | any financing link clicked |
| `exit_find_dentist` | any finder link clicked |
| `exit_compare` | any compare-plans link clicked (carry `plan` and `path`) |
| `glossary_hover` | optional, a hover tooltip opens (carry the term) |

---

## The closed graph

```
                 BENEFIT MAXING HUB  /benefit-maxing/
                            |
            +---------------+----------------+
            |                                |
     DOOR A: care now                 DOOR B: plan ahead
     UHC Primary / Ameritas           Humana Extend 5000
            |                                |
            +-----> Estimate cost <----------+
            +-----> 0% financing  <----------+
            +-----> Find a dentist <---------+
            |                                |
         Compare plans (the insurance hub) <-+
            |
   treatment guides under /benefit-maxing/guides/  (crowns, root-canals, implants, ...)
```

Every node reaches the estimator and the financing page. The treatment guides link up to the hub and across to both tools.
