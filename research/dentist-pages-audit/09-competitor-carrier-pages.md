# Competitor Carrier-Scoped Dentist Pages — SEO Audit
_Research date: 2026-06-26. For CoverCapy carrier-silo template._

## 1. URL Patterns for Insurance-Scoped Pages

| Site | National carrier page | City + carrier page |
|------|----------------------|---------------------|
| **Zocdoc** | `/dentists/delta-dental-223d` | `/dentists/{city}-{cityID}pm/delta-dental-223d` e.g. `/dentists/los-angeles-13122pm/delta-dental-223d` |
| **Opencare** | (city-first) | `/dentists/{city}-{state}/{carrier-slug}/` e.g. `/dentists/los-angeles-ca/delta-dental/`, `/dentists/seattle-wa/cigna/` |
| **Healthgrades** | uses on-page insurance *filter*, not dedicated carrier URLs | filter applied to `/dentists/{city}` results |
| **Delta Dental / Cigna / MetLife** | carrier-owned "Find a Dentist" tools (gated, app shells) | not SEO landing pages |

Key takeaways:
- Zocdoc bolts a carrier code (`delta-dental-223d`, Cigna `222`, Aetna `212`, MetLife `239`, Guardian `235`) onto a city slug containing an internal numeric ID — ugly but stable.
- **Opencare's pattern is the cleanest and most copyable: `/dentists/{city}-{state}/{carrier-slug}/`.** Human-readable, matches CoverCapy's existing `{state}/{market}/{city}` philosophy.
- Recommended CoverCapy slug: `/dental/{state}/{market}/{city}/insurance/{carrier-slug}/` (carrier as a child of city) OR a flatter `/dental/insurance/{carrier-slug}/{state}/{city}/`. The city-nested form reuses existing silo authority.

## 2. Title / H1 / Meta Formulas (observed)

**Zocdoc (LA + Delta Dental):**
- Title: `Best Delta Dental Dentists Near Me in Los Angeles, CA | Zocdoc`
- H1: `Book 100+ of the best Delta Dental Dentists near me in Los Angeles, CA`
- Meta: `Find Delta Dental Dentists in Los Angeles, California & make an appointment online instantly! Zocdoc helps you find Dentists ... that accept Delta Dental and other insurances. All appointment times are guaranteed ... It's free!`

**Opencare:**
- Title pattern: `Find dentists who accept {Carrier} in {City}, {ST} | Opencare.com` and `Best {Carrier} Dentists Near Me In {City}, {ST}`

Formula across both: **`{Carrier}` + `Dentists` + `Near Me` + `in {City}, {ST}`** in title; H1 leads with a count ("Book 100+...", "315 verified Delta Dental dentists").

## 3. Schema
- Zocdoc's carrier pages are JS app shells — static HTML carried meta + H1 but the JSON-LD `ItemList`/`Dentist`/`FAQPage` blocks were not in the fetched static markup (bot/JS-gated; noted). Industry norm for these pages is `ItemList` of `Dentist`/`LocalBusiness` items + `BreadcrumbList`; FAQ pages add `FAQPage`.
- **Recommendation for CoverCapy (we control static output):** emit `BreadcrumbList` (state→market→city→carrier), `ItemList` wrapping each in-network `Dentist`/`LocalBusiness`, and a `FAQPage` with carrier-specific Q&A. This is a structured-data advantage over the JS-only incumbents.

## 4. How They Avoid Thin Content (carrier × city scale)
- **Live counts as the headline unique token:** "315 verified Delta Dental dentists in Los Angeles, CA" / "Book 100+...". The count differs per city×carrier and is the cheapest uniqueness lever.
- **In-network badge per card:** "In-network · Delta Dental" repeated on each result, with carrier logo — signals topical relevance.
- **Carrier explainer / cross-link rail:** logo grid linking to Cigna/Aetna/MetLife/Guardian carrier pages (internal silo).
- **Verified review counts + appointment availability** (Zocdoc's moat) per dentist.
- Opencare adds **specialty cross-sells** ("braces, teeth whitening, wisdom teeth") and review snippets.
- Gap CoverCapy can exploit: incumbents are **thin on cost/network education and FAQ**. A short network explainer (PPO vs Premier, DPPO, etc.) + cost-range FAQ per carrier adds genuine unique text none of them render server-side.

## 5. Winnability per "[carrier] dentist near me" SERP
Who occupies these SERPs today: the carrier's own "Find a Dentist" tool (often #1 for branded intent), Zocdoc + Opencare (aggregators) for the "near me"/city long-tail, then practice sites and Healthgrades/Yelp.

| Carrier (consumer phrasing) | Who ranks | Difficulty | CoverCapy winnability |
|---|---|---|---|
| **Delta Dental** (PPO / Premier) | Carrier tool + Zocdoc + Opencare | Hard (highest volume) | Win on **city×carrier long-tail** where Zocdoc shells are thin; hard at head term |
| **Cigna** (DPPO / DHMO) | hcpdirectory.cigna.com + Opencare | Medium | Good — Opencare proves aggregators rank; CoverCapy schema beats JS shells |
| **MetLife** (PDP / TakeAlong) | MetLife tool + Zocdoc | Medium | Good on city long-tail |
| **Aetna** (Dental PPO/DMO) | Aetna + Zocdoc | Medium | Good |
| **Guardian** | Guardian + Zocdoc | Medium-low (less aggregator saturation) | **Best opening** — under-served |
| **Humana, Ameritas, Anthem/BCBS** | mostly carrier + scattered | Low-medium | Strong openings, less competition |

**Strategy:** do not chase head terms ("delta dental dentist near me"). Win the **{carrier} × {city}** matrix (e.g. "delta dental dentist west hollywood") where incumbents render thin JS and CoverCapy can ship full static HTML + schema + real counts.

## 6. Exact Consumer Phrasing per Carrier (network names + "near me" variants)
- **Delta Dental:** "Delta Dental PPO" and "Delta Dental Premier" are distinct networks (PPO = lowest cost, Premier = broader safety-net, higher cost). Searches: "delta dental dentist near me", "dentist that takes delta dental", "delta dental ppo dentist near me", "delta dental premier dentist". CoverCapy already tiles PPO + Premier separately — correct.
- **Cigna:** "Cigna DPPO" (PPO) and "Cigna Dental Care DHMO". Searches: "dentist that takes cigna near me", "cigna ppo dentist near me", "cigna dental provider".
- **MetLife:** network branded "PDP" (Preferred Dentist Program) / "MetLife TakeAlong Dental". Searches: "metlife ppo dentist near me", "metlife dentist near me".
- **Aetna:** "Aetna Dental PPO" / "Aetna DMO". "aetna dentist near me".
- **Guardian:** "Guardian dentist near me", "dentist that takes guardian".

---

## RECOMMENDED CoverCapy CARRIER-SILO TEMPLATE

**URL:** `/dental/{state}/{market}/{city}/insurance/{carrier-slug}/` (nest under existing city authority).

**Title:** `{Carrier} Dentists in {City}, {Abbr} — {N} Verified In-Network Offices | CoverCapy`

**H1:** `{Carrier} dentists in {City}, {Abbr}` (sub-line: `{N} insurance-verified PPO offices — get cover today, see a dentist tomorrow`)

**Meta:** `Find dentists who take {Carrier} in {City}, {Abbr}. {N} CoverCapy-verified in-network offices with ratings and online verification — free. Compare {networkA}/{networkB} acceptance and book today.`

**On-page uniqueness (anti-thin):**
1. Live in-network count `{N}` in H1 + intro.
2. Per-card "In-network · {Carrier}" badge.
3. 2-sentence network explainer (e.g. Delta PPO vs Premier cost difference).
4. Carrier cross-link rail (Cigna, Aetna, MetLife, Guardian).
5. Cost-range note + "verify free" CTA reusing `t5-verify` modal.

**Schema:** `BreadcrumbList` + `ItemList(Dentist/LocalBusiness)` + `FAQPage`.

**FAQ template (3 Q&A, carrier-tokenized):**
1. *Do these {City} dentists take {Carrier}?* — "Yes. The {N} offices listed accept {Carrier} ({networkA}/{networkB}). Verify your exact plan free through CoverCapy before booking."
2. *How much does a visit cost with {Carrier} in {City}?* — neutral cost-range + "in-network saves vs out-of-network" note (no em-dashes).
3. *How do I confirm a dentist is in my {Carrier} network?* — points to CoverCapy free verification.

---

## Sources
- https://www.zocdoc.com/dentists/delta-dental-223d
- https://www.zocdoc.com/dentists/los-angeles-13122pm/delta-dental-223d
- https://www.zocdoc.com/dentists/dallas-211240pm/delta-dental-223d
- https://www.opencare.com/dentists/los-angeles-ca/delta-dental/
- https://www.opencare.com/dentists/seattle-wa/cigna/
- https://www.opencare.com/dentists/san-jose-ca/delta-dental/
- https://www.deltadentalwa.com/dental-benefits-guide/Delta-Dental-PPO-vs-Premier-Whats-the-Difference
- https://www1.deltadentalins.com/brokers/insider-update/2022/how-our-networks-work.html
- https://hcpdirectory.cigna.com/
- https://www.metlife.com/insurance/dental-insurance/
- https://www.healthgrades.com/ (insurance filter on city results, no dedicated carrier URLs)

_Note: Zocdoc carrier pages are JS/React app shells; static HTML carried title/H1/meta/counts but JSON-LD blocks were not in fetched markup — schema recommendations are inferred from industry norm + CoverCapy's server-rendered advantage._
