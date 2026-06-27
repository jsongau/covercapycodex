# A8 — Entity SEO, Knowledge Graph and Brand

SEO Architect 8 of 10. Scope: establish CoverCapy and the compare-ppo-dental-plans hub as
strong, machine-legible entities, model the carriers and glossary terms as entities, express
topical authority through internal links and breadcrumbs, and earn Google sitelinks for the
brand query "covercapy insurance". Analysis and spec only. Grounded in the live file
`compare-ppo-dental-plans.html`.

---

## 1. What already exists (ground truth)

The page is in better shape than most. `injectSchema()` (lines 1997 to 2009) builds a single
`@graph` and appends one `application/ld+json` block. The graph already contains:

- **Organization** (line 1999): `@id` of `https://www.covercapy.com/#org`, `name` CoverCapy,
  `alternateName`, `url`, `logo` at `/logo.png`, `slogan`, `description`, `areaServed` US, and
  a `sameAs` array of LinkedIn, Twitter, Facebook.
- **WebSite** (line 2000): `@id` `/#website`, `publisher` referencing `{@id: ORG}`, and a
  `SearchAction` `potentialAction` pointing at `/find-my-dentist?loc={search_term_string}`.
- **Service** (line 2001): the concierge service, `provider` referencing the org, with an
  `OfferCatalog` of live plans.
- **Dentist** nodes (line 2002), **Product** nodes per plan (line 2006), **FAQPage**
  (line 2003), **DefinedTermSet** glossary (line 2004), **BreadcrumbList** (line 2005).

Two crawlable, server-rendered link blocks already act as sitelink fuel:

- **Branch grid** (lines 1216 to 1238): a featured Delta Dental card plus 6 carrier plan
  links, all root-relative under `/dental-insurance/ppo-plans/`.
- **Glossary shelf** (lines 1240 to 1258): 9 `<dl>` term cards linking into
  `/dental-insurance-glossary/{term}/`.

Three header dropdowns (lines 909 to 960) expose Plans by carrier (7 carriers plus a Delta
flyout), Insurance Terms (10 terms plus A-to-Z), and Explore (tools and situations). A sticky
in-page TOC (lines 963 to 970) carries the 6 section anchors.

The eight carriers in scope: **UnitedHealthcare, Aetna, Ameritas, Guardian, Mutual of Omaha,
Humana, MetLife, Delta Dental** (header lines 913 to 928; branch grid lines 1229 to 1234).

---

## 2. Problems to fix (entity and host consistency)

### 2a. One canonical host, settled once
`CLAUDE.md` describes the site as `covercapy.com` (apex). This page canonicals and OG-tags to
`https://www.covercapy.com` (lines 8, 15) and the schema BASE is also `www` (line 1998). The
two must not disagree anywhere. Pick **one** host (the canonical here votes for `www`) and:

- 301 the non-canonical host to the canonical at the edge (Vercel domain redirect), so every
  signal, link, and crawl resolves to one origin. Sitelinks will not form while Google sees
  the brand split across two hosts.
- Confirm the `dental/` generator (which CLAUDE.md shows using bare `covercapy.com`) emits the
  same host. A split between the hub on `www` and the 6,400 SEO pages on apex fractures the
  entity and starves the hub of consolidated authority.

### 2b. Trailing-slash consistency
The canonical is `/compare-ppo-dental-plans` (no slash, line 8) but two in-page links point at
`/compare-ppo-dental-plans/` with a slash (lines 1236, 2006 product url uses PAGE without slash
which is fine). Normalize all internal references to the canonical form, and 301 the variant.
Mixed forms dilute the single strongest internal target.

### 2c. The Organization @id must be identical site-wide
The `/#org` node here is correct, but it only fires on this page. For Google to treat CoverCapy
as one entity, the **exact same** Organization node (same `@id`, `name`, `logo`, `sameAs`) must
appear on the homepage, find-my-dentist, and every `dental/` T-page. The cleanest pattern: emit
the canonical Organization node once on the homepage at `https://{host}/#org`, and on every
other page reference it by `{@id}` only (publisher, provider, etc.) rather than redefining it.
Today each page risks defining its own org with drifting fields.

### 2d. logo.png must be real and stable
`logo` points at `/logo.png` (line 1999). For the org logo to qualify for the knowledge panel
it should be a square or near-square PNG at a stable URL, also referenced as `ImageObject` if
you want to be explicit. Verify the file ships.

---

## 3. The Organization entity — recommended final shape

Keep the current node and harden it. Recommended fields, all grounded in real positioning:

- `@type`: keep `Organization`. Do not over-claim `InsuranceAgency` or `MedicalOrganization`
  for the org root, CoverCapy is an independent marketplace, not a carrier or a clinic.
- `@id`: `https://www.covercapy.com/#org` (or chosen host), identical everywhere.
- `name`: "CoverCapy". `alternateName`: keep "CoverCapy Concierge Dental Network".
- `url`, `logo`, `slogan` ("Get cover today, see a dentist tomorrow."), `description`,
  `areaServed`: "US" — all already present and on-brand.
- `sameAs`: today this is LinkedIn, Twitter, Facebook. **These must be real, claimed, active
  profiles** with consistent NAP and the same logo, or they hurt rather than help. Audit each;
  remove any that 404 or are unclaimed. Add high-trust corroborating profiles where they exist
  (Crunchbase, an Instagram if active, a YouTube channel). `sameAs` must stay an array
  (CLAUDE.md rule 8) — it already is.
- Add `knowsAbout`: an array of the page's topical pillars
  (["PPO dental insurance","individual dental plans","annual maximum","waiting periods",
  "in-network dentists"]) to reinforce the entity's subject area.
- Add `contactPoint` if a real support channel exists.

Add an explicit relation from the org to the hub page so the entity owns its flagship asset:
on the WebPage node for this URL, set `isPartOf: {@id: SITE}` and `about: {@id: ORG}`.

---

## 4. Carriers as entities (8 brand nodes)

Today carriers appear only as `Brand` strings nested inside Product/Offer nodes (lines 2001,
2006). That is correct but thin. To model the 8 carriers as real entities and feed the carrier
spoke cluster:

- On each **carrier plan page** (`/dental-insurance/ppo-plans/{carrier}/`), define the carrier
  as an `Organization` (the insurer) with its own stable `@id`, `name`, `url` (the carrier's
  official site, already collected at lines 1437 to 1443), and `sameAs` to the carrier's real
  domain. Then the plan `Product` references `brand: {@id: <carrier @id>}` instead of an inline
  string. This turns 8 string mentions into 8 reusable, deduplicated brand entities.
- On the hub, keep the inline `Brand` strings (cheap, correct) but ensure the carrier **names
  match exactly** between the header dropdown, the branch grid, the Product schema, and the
  carrier page H1. "Mutual of Omaha" vs "Mutual of Omaha, Dental Preferred" should resolve to
  one carrier entity and one plan product, not blur them.
- Delta Dental is the designated hero (branch feature, line 1222; flyout, lines 920 to 928).
  Give the Delta hub page the richest carrier-entity markup and the deepest internal linking,
  it is the carrier most likely to win its own sitelink row.

---

## 5. Glossary terms as DefinedTerm entities

The `DefinedTermSet` (line 2004) is already generated from `GLOSS` (line 1570, 22 terms) and
`TIPS` (line 1545). Strengthen it:

- Give the set a stable `@id` (e.g. `{host}/dental-insurance-glossary/#termset`) and give each
  `DefinedTerm` an `@id` equal to its own term-page URL with a `#term` fragment, plus a `url`
  to that page. The on-page glossary shelf already links to those URLs (lines 1246 to 1254), so
  the term entity and the crawlable link agree.
- Set `inDefinedTermSet: {@id: ...}` on each term so the term pages and the hub share one
  vocabulary entity.
- On each individual glossary page, emit the single `DefinedTerm` as the page's primary entity
  with `mainEntityOfPage`. The hub lists the set; each leaf page is the canonical definition.
  This is the standard hub-and-spoke shape that builds glossary topical authority.

---

## 6. Topical-authority cluster and how links express it

The cluster is: **hub (this page)** at the center, with four spoke families radiating out, all
already linked in server-rendered HTML (so crawlable without JS):

```
                    compare-ppo-dental-plans  (hub / pillar)
        ┌───────────────┬───────────────┬───────────────┐
   carrier spokes   glossary spokes   situation spokes   treatment/tools
   (8 plans +       (22 terms,        (no-waiting,       (cost estimator,
    Delta hub)       A-to-Z)           between-jobs,      by-procedure)
                                       self-employed)
```

- **Down-links** exist: branch grid (carriers), glossary shelf (terms), Explore dropdown
  (situations + tools). Good.
- **Up-links** are the gap: every spoke page (carrier, term, situation) must link **back** to
  the hub with consistent anchor text ("Compare PPO dental plans") and sit under a breadcrumb
  whose parent is the hub or the `/dental-insurance/` root. Reciprocal pillar-to-spoke linking
  is what tells Google the hub is the authority node for the cluster.
- **Sibling links**: carrier pages should cross-link to the 2 to 3 most comparable carriers,
  and term pages should link the 2 to 3 most related terms (deductible to coinsurance to
  out-of-pocket). This densifies the cluster graph.
- **Breadcrumbs**: the hub `BreadcrumbList` (line 2005) is
  Dental insurance > Compare PPO plans. Spoke pages must extend this consistently, e.g.
  Dental insurance > Compare PPO plans > Delta Dental, and
  Dental insurance > Glossary > Annual maximum. Consistent, crawlable breadcrumbs are both a
  hierarchy signal and a direct sitelink/rich-result input.

---

## 7. Winning Google sitelinks for "covercapy insurance"

Sitelinks are awarded algorithmically, not requested. They form when Google is confident about
(a) one canonical brand entity on (b) one host with (c) a clean, stable, crawlable hierarchy.
The conditions and how this page maps to them:

**Conditions, and current status:**
1. **One canonical host** — NOT YET MET. `www` vs apex split (section 2a). This is the single
   biggest blocker. Fix first.
2. **Brand query already returns the site as the clear #1** — the Organization entity and
   distinctive brand name help; consistent `sameAs` and a knowledge panel accelerate it.
3. **A small set of stable, globally consistent, crawlable nav labels** — the page has the
   right raw material (header dropdowns + branch grid + glossary shelf) but the global nav
   lives in an external `components/mega-nav.html` that is not in the repo (referenced at
   line 2394, file absent). The **global** nav, not the in-page TOC, is what Google mines for
   sitelink candidates, so that component must ship with a fixed label set and identical markup
   on every page.
4. **Clean hierarchy** — breadcrumbs and the `/dental-insurance/...` URL tree are consistent;
   keep them that way and avoid orphan or near-duplicate URLs.
5. **Stability over time** — do not churn the nav labels or URLs; sitelinks reward consistency
   across crawls.

**Recommended sitelink-candidate label set (6 to 8 stable global-nav items):**

| # | Label | Destination | Source today |
|---|-------|-------------|--------------|
| 1 | Compare PPO Plans | `/compare-ppo-dental-plans` | hub (this page) |
| 2 | Find a Dentist | `/find-my-dentist` | SearchAction target, line 2000 |
| 3 | Plans by Carrier | `/dental-insurance/ppo-plans/` | header "All carriers", line 955 |
| 4 | Delta Dental | `/dental-insurance/ppo-plans/delta-dental/` | featured carrier, line 1222 |
| 5 | Insurance Terms | `/dental-insurance-glossary/` | glossary A-to-Z, line 947 |
| 6 | Cost Estimator | `/dental-treatment-cost-estimator.html` | Explore, line 954 |
| 7 | No Waiting Period | `/dental-insurance-no-waiting-period/` | Explore, line 957 |
| 8 | For Dentists | (dentist CTA destination) | dcard-cta block |

These are short (1 to 3 words), stable, non-overlapping, and each points at a single canonical
URL. They map directly onto destinations the page already exposes, so adopting them is a
consolidation exercise, not new IA.

**How the current console nav maps:** the three header dropdowns over-deliver for sitelinks
(too many links, JS-revealed flyouts). For the **global** nav, surface the 6 to 8 labels above
as plain, always-in-DOM `<a>` links (the in-page TOC and dropdowns can stay as a secondary
layer). Google needs a flat, crawlable, consistent set, not a 30-link mega menu. The sticky
in-page TOC (lines 963 to 970, six anchor links) is fine as on-page navigation but is **not** a
sitelink source because its targets are `#fragments`, not distinct URLs, treat it separately.

---

## Priority order

1. Settle one host and 301 the other (section 2a) — unblocks everything.
2. Ship `components/mega-nav.html` with the fixed 6-to-8 label set, identical on every page
   (section 7).
3. Define the canonical Organization node once and reference by `@id` site-wide (section 2c).
4. Add up-links and consistent breadcrumbs from every spoke back to the hub (section 6).
5. Promote carriers and terms to first-class entities with stable `@id`s on their own pages
   (sections 4, 5).
6. Audit `sameAs` profiles and verify `logo.png` ships (sections 2d, 3).
