# SEO1 — Keyword & Intent Strategy

**Hub file:** `/compare-ppo-dental-plans.html`
**Role:** SEO Architect 1, keyword and intent. Lane: target keywords, search intent per section, SERP feature targets, long-tail cluster split between hub and spokes. On-page tags, schema, internal links, and technical render are owned by the other architects; this memo only specifies intent and keyword targets they build against.

---

## 1. Current state, grounded in the file

| Element | Line | Current value |
|---|---|---|
| `<title>` | 6 | "Compare PPO Dental Plans 2026: Delta Dental, Aetna, Guardian, UHC & More \| CoverCapy" |
| `<meta description>` | 7 | "Compare 8 PPO dental plans for 2026: Delta Dental, Guardian, UHC, Humana & Ameritas. See waiting periods, annual maximums, and monthly cost side by side." |
| `<link canonical>` | 8 | `https://www.covercapy.com/compare-ppo-dental-plans/` |
| `<h1>` | 974 | "Match a PPO dental plan to the work ahead." |

The H1 is an interactive matcher promise, not a keyword headline. The title and meta already lean correctly into "compare PPO dental plans 2026" plus a carrier list. There is no clean keyword target for "dental insurance" itself anywhere in the visible primary tags, which is correct given competition.

### Section map (real ids and H2s)
| Section id | Line | Heading | Intent served |
|---|---|---|---|
| `#match` | 970 | H1 matcher | Transactional, "which plan for me" |
| `#compare` | 1010 | "Put any plans side by side" | Commercial-investigation, core "compare" |
| `#shelf` | 1063 | "Find a PPO plan by the coverage feature you need" | Commercial, feature filter |
| `#dentists` | 1078 | "A dentist who takes your plan, near you" | Local + verification |
| `#treatment` | 1105 | "Shopping for a specific procedure?" | Long-tail treatment, spoke launcher |
| `#situation` | 1115 | "Start where life put you" | Scenario long-tail, spoke launcher |
| `#vision` | 1125 | "Humana Extend includes vision" | Bundle long-tail |
| `#terms` | 1142 | glossary grid | Informational, definitions |
| `#playbook` | 1152 | "How to buy a PPO dental plan and avoid common mistakes" | Informational, snippet bait |
| `#learn` | 1165 | "Guides that answer the real question" | Informational, spoke launcher |
| `#explore-carriers` | 1206 | "PPO dental plans, by carrier" | Brand + carrier, spoke launcher |
| `#glossary-shelf` | 1230 | "The terms that decide your bill" | Informational, glossary spokes |
| `#faq` | 1253 | "PPO dental insurance, answered" | PAA / FAQ snippet |

On-disk spoke routes already referenced (real, in arrays at lines 1932-1938, 1206-1225, 1234):
- Carrier hubs: `/dental-insurance/ppo-plans/{delta-dental, mutual-of-omaha-dental, humana-extend-5000, guardian-premier-ppo, ameritas-primestar, aetna-dental-direct, uhc-primary-dental}/`
- Treatment spokes: `/best-dental-insurance-for-{implants,crowns,root-canals,braces,dentures,wisdom-teeth,emergency}/`, `/dental-and-vision-insurance/`
- Scenario spokes: `/dental-insurance-{no-waiting-period,between-jobs,for-self-employed}/`, `/learn/{ppo-vs-hmo,in-network}/`
- Glossary: `/dental-insurance-glossary/` plus per-term `/dental-insurance-glossary/{annual-maximum}/`

---

## 2. Realistic ranking assessment

**"dental insurance" (head term):** Do not target as the rankable focus of this hub. It is dominated by national carriers (Delta, Cigna, Guardian), aggregators (eHealth, NerdWallet, Forbes Advisor), and government (Healthcare.gov). A single static commercial page on a young domain will not crack page one for the bare head term. Treat it as a brand-association term you earn over time through cluster authority, not a per-page target.

**The winnable cluster** is the modifier and intent variations where buyer intent is explicit and the SERP rewards a real comparison tool plus structured data:
- "compare PPO dental plans" / "PPO dental insurance plans" — moderate competition, exact match to this hub's tool. This is the hub's primary.
- "best dental insurance 2026" / "best PPO dental insurance" — competitive but winnable with a dated, structured comparison and ItemList schema.
- Treatment long-tail: "best dental insurance for implants / crowns / braces / dentures / root canals" — lower competition, high intent, already have spoke routes.
- Scenario long-tail: "dental insurance with no waiting period", "dental insurance between jobs", "dental insurance for self-employed" — low-to-moderate competition, very high intent, already have spoke routes.
- Definitional long-tail: "what is a dental annual maximum / waiting period / missing tooth clause" — low competition, PAA and snippet wins, glossary spokes exist.

---

## 3. Keyword assignment, hub vs spokes

### THIS HUB owns
- **Primary:** `compare PPO dental plans` (keep in title, mirror in #compare H2)
- **Secondary:** `PPO dental insurance plans`, `best PPO dental insurance 2026`, `compare dental insurance plans`, `dental insurance comparison`
- **Tertiary / supporting (sections, not page focus):** `PPO dental plans by carrier` (#explore-carriers), `dental plan waiting periods` (#compare), `find a dentist that takes my plan` (#dentists)

Rationale: the hub's unique asset is the live side-by-side matrix (#compare) and matcher (#match). That maps to comparison and "best" intent, not to a definition or a single carrier. Keep the hub focused on comparison/commercial intent; let it pass authority down, not compete with its own spokes.

### PUSH TO SPOKES (do not let the hub try to rank for these)
| Cluster | Primary keyword | Spoke route |
|---|---|---|
| Carrier | "Delta Dental PPO plans" | `/dental-insurance/ppo-plans/delta-dental/` |
| Carrier | "Humana Extend dental and vision" | `/dental-insurance/ppo-plans/humana-extend-5000/` |
| Treatment | "best dental insurance for implants" | `/best-dental-insurance-for-implants/` |
| Treatment | "best dental insurance for braces / Invisalign" | `/best-dental-insurance-for-braces/` |
| Treatment | "dental and vision insurance" | `/dental-and-vision-insurance/` |
| Scenario | "dental insurance with no waiting period" | `/dental-insurance-no-waiting-period/` |
| Scenario | "dental insurance between jobs" | `/dental-insurance-between-jobs/` |
| Scenario | "dental insurance for self-employed" | `/dental-insurance-for-self-employed/` |
| Glossary | "what is a dental annual maximum" + 23 terms | `/dental-insurance-glossary/{term}/` |

The hub references all of these but should link out (commercial authority funnel), never duplicate their body intent. Each spoke owns one intent; the hub is the comparison root they all link back to.

---

## 4. Intent each hub section should serve (for on-page architect)

- `#match` / `#compare` / `#shelf`: commercial-investigation. Carry the primary keyword and "best 2026" variants. This is where the page earns the comparison and "best" SERPs.
- `#dentists`: local + verification intent ("dentist that takes my PPO near me"). Supports E-E-A-T and dwell, not a head-term target.
- `#treatment` / `#situation` / `#learn` / `#explore-carriers` / `#glossary-shelf`: spoke launchers. Their job is internal-link equity and capturing the long-tail click that then routes to the right spoke. Keep anchors keyword-rich (the treatment array at line 1932 already uses good anchor labels).
- `#playbook`: informational, "how to buy PPO dental insurance" + the five-mistakes / six-questions lists are featured-snippet bait (list and how-to format).
- `#faq`: the 10 FAQs at lines 1939-1950 already map directly to PAA queries ("How do I compare PPO dental plans", "What is a dental insurance waiting period", "Which PPO dental plan is best for implants"). This is the strongest snippet/PAA asset on the page.

---

## 5. SERP feature targets

| Feature | Target query | Hub asset to win it |
|---|---|---|
| **AI Overview / AI Mode** | "best PPO dental plan for [treatment/situation]" | Structured comparison matrix + FAQ + clear plan attributes (monthly, annual max, wait) in the plans-data JSON at line 1276 |
| **Featured snippet (paragraph)** | "what is a dental annual maximum", "what is a waiting period" | FAQ answers at lines 1942-1943, glossary `#terms` |
| **Featured snippet (list)** | "how to buy PPO dental insurance", "mistakes buying dental insurance" | `#playbook` MISTAKES / QUESTIONS lists (line 1936-1937) |
| **People Also Ask** | the 10 FAQ questions verbatim | `#faq` block; keep questions phrased as natural queries |
| **Sitelinks** | brand + "compare ppo dental plans" | Strong section ids (#compare, #shelf, #dentists, #faq) as crawlable jump targets; TOC nav at line 957 |
| **Comparison / table snippet** | "compare dental plans waiting periods / annual maximum" | `#compare` matrix at `#compareMatrix` (line 1027) |

(Schema markup to support these — FAQPage, ItemList, BreadcrumbList — is SEO Architect 3's lane. This memo only names which features each section is going for.)

---

## 6. Priority long-tail the cluster should own (ranked by winnability x intent)

1. dental insurance with no waiting period (spoke) — high intent, achievable
2. best dental insurance for implants (spoke) — high value, moderate comp
3. dental insurance between jobs / after layoff (spoke + #situation) — clear, low comp
4. compare PPO dental plans / PPO dental plans comparison (HUB primary)
5. best dental insurance for braces / Invisalign (spoke)
6. dental insurance for self-employed / freelancers (spoke)
7. dental and vision insurance bundle (spoke + #vision)
8. what is a missing tooth clause / annual maximum / waiting period (glossary spokes, PAA)
9. best PPO dental insurance 2026 (HUB secondary, dated freshness play)
10. Delta Dental PPO plans comparison (carrier spoke; Delta is the named flagship hub at line 1211)

---

## 7. Recommendations summary for the other architects

- Keep the title's primary as "compare PPO dental plans 2026"; do not rewrite it toward bare "dental insurance".
- Consider one secondary keyword surfaced in an early server-rendered subhead so "best PPO dental insurance 2026" has a textual home (on-page architect's call on placement).
- The H1 at line 974 is brand voice, not keyword. Acceptable if an early H2 (#compare, line 1014 "Put any plans side by side") is tuned to carry the primary phrase. Recommend the on-page architect align the #compare H2 toward "Compare PPO dental plans side by side".
- Treat #faq and #playbook as the page's snippet engine; protect that copy.
- Every long-tail term in section 6 already has a real on-disk route; the internal-linking architect should ensure the hub passes equity down to each and each links back up.
