# 01 — Current State Audit
## PPO Plans Hub Rebuild | Wave 1, Spec 1

**Audited:** 2026-06-26
**Auditor role:** Front-end + content auditor
**Files audited:**
- `/dental-insurance/ppo-plans/index.html` — the hub being rebuilt (referred to below as "PPO Hub")
- `/dental-insurance/index.html` — parent dental insurance hub (referred to as "DI Hub")
- `/compare-ppo-dental-plans.html` — the compare page to be folded under /ppo-plans/ (referred to as "Compare Page")

**Index reference:** `research/ppo-hub-rebuild/00-INDEX.md`

---

## TABLE OF CONTENTS

1. [PPO Hub — /dental-insurance/ppo-plans/index.html](#1-ppo-hub)
2. [DI Hub — /dental-insurance/index.html](#2-di-hub)
3. [Compare Page — /compare-ppo-dental-plans.html](#3-compare-page)
4. [Plan Stories — verbatim inventory](#4-plan-stories)
5. [Cross-file internal link map](#5-cross-file-internal-link-map)
6. [What works well (all three files)](#6-what-works-well)
7. [Gaps and weaknesses for scenario-first rebuild](#7-gaps-and-weaknesses)
8. [Reusable components](#8-reusable-components)

---

## 1. PPO Hub

**File:** `/dental-insurance/ppo-plans/index.html`
**Canonical:** `https://www.covercapy.com/dental-insurance/ppo-plans` (no trailing slash in canonical tag, line 8)
**Title:** `Best PPO Dental Plans Compared 2026: 7 Carriers Ranked` (line 6)
**Meta description:** `Compare 7 individual PPO dental plans on price, annual max, waiting periods and implants. Then confirm your dentist takes it before you buy. Free to use.` (line 7)

### 1.1 Page structure (sections with key line numbers)

| Section | ID | Lines | Notes |
|---|---|---|---|
| Breadcrumb nav | — | 167-169 | Inline `<nav class="crumbs">` |
| Hero | `.hero` | 170-184 | H1, meta pills, 2 CTAs |
| AI summary / PPO explainer | `#ai-summary` | 186-193 | `<div class="ai-summary">` |
| Situation picker (interactive) | `#picker` | 195-234 | 6 buttons, 6 answer panels |
| Delta Dental feature stop | `#delta-hub-feature` | 236-245 | Article card pointing to delta hub |
| Tour — plan by plan | `#tour` | 247-320 | 7 `.tour-stop` articles |
| Full comparison table | `#compare-table` | 322-336 | One wide `<table>` |
| Best for scenarios | `#best-for` | 338-383 | 8 `.scenario` cards |
| Methodology note | `#how-we-compared` | 385-390 | `.note` block |
| Waiting periods explainer | `#waiting` | 392-396 | Editorial prose |
| Verify CTA band | `#verify` | 398-407 | Dark band with two CTAs |
| FAQ accordion | `#faq` | 409-421 | 10 `<details>` items |
| Editorial disclosure | `#editorial` | 423-425 | `.editorial` paragraph |
| Carrier cards grid | `#carrier-cards` | 427-440 | 8 `.vs-card` anchor cards |
| Related links | `#related` | 442-451 | `.related` pill links |

**Total visible sections:** 15

### 1.2 Nav / Breadcrumb / Footer components

**Breadcrumb** (line 167-169):
```html
<nav class="crumbs" aria-label="Breadcrumb">
  <a href="/">Home</a> › <a href="/dental-insurance">Dental Insurance</a> › <span>PPO Plans</span>
</nav>
```
Inline HTML. No external component. Uses `›` separator. Three levels: Home / Dental Insurance / PPO Plans.

**Mega nav** (lines 165, 469-483):
- Mount: `<div id="cc-nav-mount" aria-label="CoverCapy mega navigation mount"></div>`
- Loader: custom `loadCoverCapyComponents()` IIFE that tries `/components/mega-nav.html` then `components/mega-nav.html` (relative fallback), then loads `/assets/js/mega-nav.js`
- Also loads footer the same way from `/components/footer.html`

**Footer** (lines 467, 469-483):
- Mount: `<div id="cc-footer-mount" aria-label="CoverCapy footer mount"></div>`
- Same loader. CSS: `<link rel="stylesheet" href="/assets/css/footer.css" />`

**External CSS loaded (lines 26-28):**
```
/assets/css/mega-nav.css
/assets/css/mega-nav-mobile.css
/assets/css/footer.css
```

No external CSS for the page content itself — all page styles are inline `<style>` in `<head>`.

### 1.3 CSS design tokens (PPO Hub)

All tokens are defined in the `<style>` block, lines 30-39. The PPO Hub uses a slightly different token set from the CoverCapy system defined in `CLAUDE.md`. Mapping:

| PPO Hub token | Value | CLAUDE.md equivalent |
|---|---|---|
| `--deep` | `#0E3A33` | closest: `--teal-night: #082A30` |
| `--deep-2` | `#15524A` | closest: `--teal-700: #14525B` |
| `--teal` | `#1B5E5A` | no exact match |
| `--teal-mist` | `#DCEAE7` | — |
| `--teal-faint` | `#F0F7F5` | — |
| `--paper` | `#FFFCF6` | `--cream-card: #FFFDF8` (close) |
| `--paper-2` | `#FBF6EB` | — |
| `--ivory` | `#F8F3E8` | — |
| `--vellum` | `#F2EDE2` | — |
| `--gold` | `#B8924F` | — |
| `--gold-deep` | `#8A6A30` | — |
| `--gold-soft` | `#F1E4C8` | `--gold-soft: #F3E8CF` (close) |
| `--gold-faint` | `#FAF3E0` | — |
| `--ink` | `#0F1F26` | `--ink: #082A30` (differs) |
| `--ink-soft` | `#3C5560` | `--ink-soft: #56655F` (differs) |
| `--ink-mid` | `#556A67` | — |
| `--ink-mute` | `#6E8590` | `--ink-faint: #8A958F` (close) |
| `--line` | `rgba(15,31,38,.08)` | `--line: #E8E2D8` (different approach) |
| `--sh-1`, `--sh-2` | shadow values | — |

**Note:** The PPO Hub token set is not identical to the system tokens in CLAUDE.md. The hub has its own scoped `--deep`, `--gold`, and `--ink` values. This is a divergence to flag for the rebuild.

### 1.4 Font families (PPO Hub)

Loaded via Google Fonts (lines 23-25):
- `Fraunces` — optical size 9-144, weight 300-700, italic and regular
- `Inter Tight` — weight 300, 400, 500, 600, 700, 800

Font stacks:
- `--ff-serif: 'Fraunces', Georgia, 'Iowan Old Style', serif` (line 31)
- Body: `'Inter Tight', Inter, ui-sans-serif, system-ui, -apple-system, sans-serif` (line 42)

### 1.5 JSON-LD schema blocks (PPO Hub)

Four schema blocks in `<head>` (lines 159-162):

**Block 1: CollectionPage** (line 159)
```json
{
  "@type": "CollectionPage",
  "@id": "https://www.covercapy.com/dental-insurance/ppo-plans#webpage",
  "url": "...",
  "name": "Best PPO Dental Plans Compared 2026: 7 Carriers Ranked",
  "dateModified": "2026-06-25",
  "description": "...",
  "about": { "@type": "Thing", "name": "PPO dental insurance plans" },
  "mainEntity": { "@id": "...#plans" },
  "isPartOf": { "@type": "WebSite", "name": "CoverCapy", "url": "..." }
}
```
Gaps: No `datePublished`. No `author` or `publisher` node. No `@graph` wrapper (schema is four separate objects, not a graph). `isPartOf` points to WebSite but without an `@id` reference. No `Organization` node anywhere in the file.

**Block 2: BreadcrumbList** (line 160)
3 items: Home / Dental Insurance / PPO Plans. Correct. No gaps.

**Block 3: ItemList** (line 161)
8 items. `numberOfItems: 8`. Lists all 8 plans including Delta. Uses `ListItem` with `name` and `url` only — no `@type: Product`, no `description`, no pricing.
Gap: Delta Dental entry points to `/dental-insurance/delta-dental/` not a plan-specific slug, inconsistent with the other 7 which go to `/dental-insurance/ppo-plans/{slug}/`.

**Block 4: FAQPage** (line 162)
10 Q+A pairs. Matches the visible `<details>` FAQ on the page exactly. Well formed. No gaps.

Missing schema types that a rebuild should add:
- `Organization` node
- `WebSite` with `potentialAction` SearchAction
- `HowTo` (already on DI Hub — would be a natural fit here too)
- `@graph` wrapper

### 1.6 Internal links — PPO Hub (outbound)

| Destination href | Anchor text / context | Location in page |
|---|---|---|
| `/compare-ppo-dental-plans` | "Open the side-by-side comparison" | Hero CTA (line 181) |
| `/find-my-dentist` | "Find a PPO dentist first" | Hero CTA (line 182) |
| `/dental-insurance/delta-dental/` | Delta hub stop CTA | Delta feature section (line 243) |
| `/dental-insurance/ppo-plans/uhc-primary-dental/` | UHC plan review | Picker answer, tour stop, table, best-for, carrier cards |
| `/dental-insurance/ppo-plans/aetna-dental-direct/` | Aetna plan review | Picker answer, tour stop, table, best-for, carrier cards |
| `/dental-insurance/ppo-plans/ameritas-primestar/` | Ameritas plan review | Picker answer, tour stop, table, best-for, carrier cards |
| `/dental-insurance/ppo-plans/guardian-premier-ppo/` | Guardian plan review | Picker answer, tour stop, table, best-for, carrier cards |
| `/dental-insurance/ppo-plans/metlife-ncd-complete/` | MetLife plan review | Tour stop, table, best-for, carrier cards |
| `/dental-insurance/ppo-plans/mutual-of-omaha-dental/` | MOO plan review | Picker answer, tour stop, table, best-for, carrier cards |
| `/dental-insurance/ppo-plans/humana-extend-5000/` | Humana plan review | Picker answer, tour stop, table, best-for, carrier cards |
| `/dental-treatment-cost-estimator` | Cost estimator | Waiting periods section (line 395) |
| `/compare-ppo-dental-plans` | "Interactive comparison" | Below table (line 335) |
| `/find-my-dentist` | "Verify" (8x in table) | Table, verify band |
| `/compare-ppo-dental-plans` | "Compare PPO Dental Plans" | Related section |
| `/find-my-dentist` | "Find PPO Dentists" | Related section |
| `/dental-treatment-cost-estimator` | "Treatment Cost Estimator" | Related section |
| `/dental-financing-monthly-payments` | "Monthly Financing Options" | Related section |
| `/dental-insurance` | "Dental Insurance Hub" | Related section |

**Inbound links to PPO Hub from other audited files:**
- DI Hub links to `/dental-insurance/ppo-plans/` as "All carriers and plans" card (line 474-477)
- DI Hub table links to `/dental-insurance/ppo-plans/{slug}/` for each carrier (lines 462-469)
- Compare Page links to `/dental-insurance/ppo-plans/` via sticky TOC and plan cards (various)

### 1.7 Interactive JavaScript (PPO Hub)

Single inline script (lines 453-465). Implements the situation picker:
```javascript
var btns = document.querySelectorAll('.picker button');
btns.forEach(function(b){
  b.addEventListener('click', function(){
    btns.forEach(function(x){ x.classList.remove('active') });
    document.querySelectorAll('.picker-answer').forEach(function(p){ p.classList.remove('show') });
    b.classList.add('active');
    var p = document.getElementById(b.getAttribute('data-pick'));
    if(p) p.classList.add('show');
  });
});
```
No state persistence. No URL hash update. No keyboard navigation beyond default.

---

## 2. DI Hub

**File:** `/dental-insurance/index.html`
**Canonical:** `https://www.covercapy.com/dental-insurance/` (line 8, with trailing slash)
**Title:** `Dental Insurance: Plans, Costs & Coverage (2026) | CoverCapy` (line 6)
**Meta description:** `Dental insurance for 2026. Compare 8 PPO plans by annual maximum, waiting period and price, see what coverage costs, and find a dentist who takes it.` (line 7)

### 2.1 Page structure (sections with key line numbers)

The DI Hub uses a two-column guide layout (`guide-layout` / `guide-main` + `guide-rail`) injected from `hub-theme.css`.

| Section | ID | Lines | Notes |
|---|---|---|---|
| Hero | `.di-hero` | 249-269 | Full-width, outside guide layout |
| Key takeaways | `.di-takeaways` | 276-285 | Card with checkmark list |
| Jump nav (on-page pills) | `#overview` | 288-306 | 12 pill links |
| Section 1: Start here / decision tools | `#start-here` | 309-338 | 3 tool cards + 5-step HowTo list |
| Section 2: How it works | `#how-it-works` | 341-377 | 6 term cards (glossary) |
| Section 3: Plan types compared | `#plan-types` | 380-406 | PPO vs DHMO vs discount table |
| Section 4: Best for X | `#best-for` | 409-443 | 4 best-pick cards |
| Section 5: By carrier (table) | `#by-carrier` | 446-490 | 8-row table + 3 link cards |
| Section 6: Delta deep dive | `#delta` | 493-511 | Cluster pill links (12 items) |
| Section 7: By situation | `#by-situation` | 514-550 | 6 link cards |
| Section 8: By treatment | `#by-treatment` | 553-589 | 6 link cards |
| Section 9: Cost + benefit-maxing | `#cost` | 592-638 | Procedure cost table + 5 link cards |
| Section 10: Glossary | `#learn` | 641-671 | 23 term pills + link to full glossary |
| Section 11: Find a dentist | `#find-dentist` | 674-700 | 4 directory link cards |
| FAQ | `#faq` | 703-732 | 6 items, button-toggle (JS inline) |
| Closing CTA band | `.guide-cta-band` | 735-739 | Green band |
| Sources | `#sources` | 742-758 | 4 sources + editorial trust block |
| Related / keep exploring | `.guide-related` | 761-770 | 5 pill links |
| Right rail | `aside.guide-rail` | 774-817 | Sticky: plan CTA card, TOC, popular guides, page info, ghost CTA |

**Total main sections:** 18 + right rail

### 2.2 Nav / Breadcrumb / Footer components (DI Hub)

**Breadcrumb** (line 246):
```html
<div class="crumb"><div class="wrap"><a href="https://www.covercapy.com/">Home</a> / <span>Dental insurance</span></div></div>
```
Class `.crumb` (no `crumbs`). Uses `/` separator. Two levels. Note the absolute URL on Home link (contrast with PPO Hub which uses `/`).

**Additional nav mount** (line 244-245):
```html
<div id="cc-nav-mount"></div>
<div id="cc-hub-subnav-mount"></div>
```
Two mounts — the DI Hub also loads a hub sub-nav component (`/components/hub-subnav.html`). The PPO Hub does not have this sub-nav.

**Footer** (line 832): `<div id="cc-footer-mount"></div>`

**Loader** (lines 834-873): More modern `async/await` approach vs PPO Hub's `Promise.reject()` chain. Both achieve the same result.

**External CSS (lines 158-161):**
```
/assets/css/mega-nav.css
/assets/css/mega-nav-mobile.css
/assets/css/footer.css
/assets/css/hub-theme.css    ← PPO Hub does NOT load this
```

### 2.3 CSS design tokens (DI Hub)

The DI Hub does **not** define its own `:root` tokens in the inline `<style>`. It inherits all tokens from `/assets/css/hub-theme.css` (external). The inline style references token names such as `--paper`, `--line`, `--green`, `--green-d`, `--sage`, `--muted`, `--card`, `--ink`, `--ink-soft`, `--serif`, `--shadow` — these are defined in `hub-theme.css`, not visible in this file.

Key CSS classes introduced inline (lines 162-240):
- `.di-hero` — hero wrapper
- `.di-answer` — 18px lede paragraph
- `.di-byline` — author/date strip
- `.di-takeaways`, `.di-take-list` — key takeaways card
- `.di-jump` — on-page pill nav
- `.di-grid`, `.di-grid.cols3` — 2 or 3-column link card grids
- `.di-link-card` — individual link card with eyebrow/title/sub
- `.di-best`, `.di-best-card` — best-for-X card layout
- `.di-cluster` — pill list (for Delta links)
- `.di-terms` — glossary pill list
- `.di-best-cell`, `.di-note-cell` — highlighted table cells
- `.di-sources`, `.di-trust`, `.di-independence` — editorial trust elements

### 2.4 Font families (DI Hub)

Loaded via Google Fonts (lines 14-16):
- `Fraunces` — ital, wght 0,500 and 1,500 (more limited than PPO Hub's full range)
- `Inter Tight` — wght 400, 500, 600, 700
- `Inter` — wght 400, 500, 600, 700 (PPO Hub only loads Inter Tight)

### 2.5 JSON-LD schema blocks (DI Hub)

Single `@graph` array (lines 18-155) containing 6 nodes:

1. **Organization** — `@id: "#org"`, name, url, logo, sameAs (LinkedIn + Twitter)
2. **WebSite** — `@id: "#website"`, publisher ref, `potentialAction` SearchAction pointing to `/find-my-dentist?where=`
3. **CollectionPage** — `@id: "#webpage"`, breadcrumb ref, mainEntity ref
4. **Article** — `@id: "#article"`, headline, datePublished `2026-01-14`, dateModified `2026-06-26`, publisher and author refs, `about` array (3 Things)
5. **BreadcrumbList** — `@id: "#crumb"`, 2 items (Home / Dental insurance)
6. **ItemList** — `@id: "#plans"`, 8 items (includes Delta Dental PPO Premium at position 1)
7. **HowTo** — `@id: "#howto"`, 5 steps for choosing a dental plan
8. **FAQPage** — `@id: "#faq"`, 6 Q+A pairs

**Total schema types:** 8 nodes in one `@graph`. This is the most complete schema in all three audited files.

### 2.6 Internal links — DI Hub (outbound, key ones)

| Destination | Section | Purpose |
|---|---|---|
| `/compare-ppo-dental-plans` | Hero, rail, cta-band, related | Primary CTA |
| `/find-my-dentist` | Hero, rail, find-dentist | Secondary CTA |
| `/dental-insurance/ppo-plans/` | Carrier table link card | All plans index |
| `/dental-insurance/ppo-plans/{slug}/` | Carrier table (8 rows) | Individual plan pages |
| `/dental-insurance/delta-dental/` | Delta cluster + table | Delta hub |
| `/dental-insurance/delta-dental/find-a-dentist/` | Find dentist | Delta dentist search |
| `/dental-insurance/delta-dental/networks/` | Delta cluster | Network comparison |
| `/dental-insurance/delta-dental/eligibility/` | Delta cluster | Eligibility |
| `/dental-insurance/delta-dental/individual-plans/` | Delta cluster | Plan list |
| `/dental-insurance/delta-dental/premium/` | Delta cluster | Premium plan |
| `/dental-insurance/delta-dental/is-delta-good/` | Delta cluster | Editorial review |
| `/dental-insurance/delta-dental/compare/` | Delta cluster | Compare |
| `/dental-insurance/delta-dental/over-65/` | Delta cluster + by-situation | Seniors |
| `/dental-insurance/delta-dental/uc-students/` | Delta cluster + by-situation | Students |
| `/dental-insurance/delta-dental/for-employers/` | Delta cluster | Employers |
| `/dental-insurance/delta-dental/for-dentists/` | Delta cluster | Dentists |
| `/dental-insurance/guardian-orthodontics-coverage/` | By-carrier link cards | Guardian ortho guide |
| `/dental-insurance/metlife/find-a-dentist/` | By-carrier link cards, find-dentist | MetLife dentist finder |
| `/guides/glossary/{term}/` | Glossary pills (23 terms) | Individual glossary pages |
| `/guides/between-jobs/` | By-situation | Job change guide |
| `/guides/self-employed/` | By-situation | Self-employed guide |
| `/guides/no-waiting-period/` | By-situation, rail | No-wait guide |
| `/guides/immediate-coverage/` | By-situation | Immediate coverage |
| `/guides/implants/` | By-treatment | Implants guide |
| `/guides/root-canals/` | By-treatment | Root canals |
| `/guides/braces-invisalign/` | By-treatment | Orthodontics guide |
| `/guides/dentures/` | By-treatment | Dentures |
| `/guides/crowns/cost` | By-treatment | Crowns |
| `/guides/whitening/` | By-treatment | Whitening |
| `/benefit-maxing/` | Cost section | Benefit-maxing hub |
| `/benefit-maxing/smart-timing-protocol/` | Cost section | Timing guide |
| `/benefit-maxing/guides/dental-emergencies/` | Cost section | Emergencies |
| `/dental-treatment-cost-estimator` | Start here + cost | Cost estimator |
| `/dental-financing-monthly-payments` | Start here + cost | Financing |
| `/dentist` | Find dentist | National directory |
| `/guides/glossary/` | Glossary section | Full glossary |
| `/editorial-standards.html` | Byline, trust block | Editorial standards |
| `/advertising-disclosure.html` | Trust block | Disclosure |
| ADA, NADP, CMS external links | Sources | External references |

---

## 3. Compare Page

**File:** `/compare-ppo-dental-plans.html`
**Canonical:** `https://www.covercapy.com/compare-ppo-dental-plans` (line 14, no trailing slash)
**Title:** `Best Dental Insurance: Compare Top PPO Plans | CoverCapy` (line 11)
**Meta description:** `Find the best dental insurance for your needs. Compare top PPO plans on annual maximum, waiting period, implant coverage, and premium. Independent, no paid placement.` (line 12)
**`data-theme="gold"`** on `<html>` element (line 3)

### 3.1 Page structure (sections with key line numbers)

The Compare Page is the most complex file. It has its own inline masthead header, a sticky TOC sub-nav, then content sections:

| Section | ID | Lines | Notes |
|---|---|---|---|
| Universal mega nav mount | `#cc-nav-mount` | 1334 | External component |
| DI Hub nav bar | `.di-hub` | 1126-1135 (CSS), ~1420-1435 (HTML) | Dark teal pill nav strip |
| Breadcrumb | `.crumb` | 580-585 (CSS), ~1436 (HTML) | 3 levels |
| Smart Match (hero) | `#match` | 1438 | H1, situation goal grid, timeline chips, budget slider, verdict panel |
| Compare matrix | `#compare` | 1490-1507 | Dynamic JS grid `#compareMatrix` + plan cards `#planGrid` |
| Shelf feature table | `#shelf` | 1543-1556 | Desktop table `#featTable`, mobile cards `#featMobile` |
| Find a dentist | `#dentists` | 1558-1584 | Omni search, dentist results grid |
| By treatment minicards | `#treatment` | 1585-1593 | 8 mini cards |
| By situation cards | `#situation` | 1595-1603 | PC-grid cards |
| Vision perk band | `#vision` | 1605-1621 | Humana vision feature |
| Insurance terms / glossary | `#terms` | 1622-1631 | Dictionary grid |
| Buyer's playbook | `#playbook` | 1633-1644 | Two-column list (mistakes + questions) |
| Learn / articles | `#learn` | 1646-1650 | Article grid |
| Carrier links (branch section) | `#explore-carriers` | 1692-1714 | All 8 plans listed with links |
| Glossary shelf | `#glossary-shelf` | 1716-1736 | Key terms with tooltips |
| FAQ | `#faq` | 1738-1759 | Category-filtered accordion |
| Plans data | `#plans-data` | 1760-1771 | `<script type="application/json">` |

**Total sections:** 17+ (many rendered by JavaScript)

### 3.2 Nav / Breadcrumb / Footer components (Compare Page)

**Mega nav:** `<div id="cc-nav-mount"></div>` (line 1334). Component loader is at the bottom of the file.

**Own sticky TOC/sub-nav** (lines 1338-1433): The Compare Page has its own full-page sticky sub-nav bar (`<nav class="toc">`) with:
- Progress bar (`#tocProg`)
- Dropdowns: Compare, Plans (with Delta flyout), Explore, By Treatment, By Situation, Insurance Terms
- Teal `toc-cta` button: "Find a dentist"

This is a bespoke nav not shared with other pages. When folded under `/ppo-plans/`, this needs reconciling.

**DI Hub nav bar** (lines 1125-1135 CSS): A dark panel strip linking to other DI cluster pages (PPO plans, Delta, guides, compare, find dentist). Present on the Compare Page.

**Breadcrumb** (approximately line 1436, based on CSS class `.crumb`):
Schema BreadcrumbList (lines 72-93) shows: Home / Dental Insurance / Compare PPO Dental Plans — 3 levels.

**Footer:** `<div id="cc-footer-mount"></div>` at end of file.

**External CSS (lines 428-430):**
```
assets/css/mega-nav.css         ← relative path (no leading slash)
assets/css/mega-nav-mobile.css  ← relative path
assets/css/footer.css           ← relative path
```
Note: Compare Page uses **relative paths** for CSS, while PPO Hub and DI Hub use **absolute paths** (`/assets/css/...`). This could cause issues if the page is ever moved.

**Third-party scripts loaded (lines 6-10):**
- Google Tag Manager / Analytics: `G-XNBPGSZ1LZ`
- Google AdSense: `ca-pub-8699915070570206` (Compare Page is the only audited file with AdSense)

### 3.3 CSS design tokens (Compare Page)

Defined inline in `<style>` (lines 437-465). A distinct token set from both the PPO Hub and CLAUDE.md system tokens:

| Compare Page token | Value | Notes |
|---|---|---|
| `--paper` | `#F6F8FA` | Different from PPO Hub's `--paper: #FFFCF6` |
| `--paper-2` | `#EAEFF3` | — |
| `--card` | `#FFFFFF` | — |
| `--ink` | `#0F1B25` | — |
| `--ink-soft` | `#33444F` | — |
| `--green` | `#0A7E7D` | CoverCapy primary (not in CLAUDE.md tokens) |
| `--green-d` | `#0A6E6D` | — |
| `--green-l` | `#5E707B` | — |
| `--sage` | `#E2F4F3` | — |
| `--sage-2` | `#D3EBEA` | — |
| `--muted` | `#5E707B` | — |
| `--line` | `#DCE4EA` | — |
| `--line-2` | `#C9D6DE` | — |
| `--gold` | `#B26A00` | — |
| `--rust` | `#C2410C` | — |
| `--panel` | `#0B3B40` | Dark teal — closest to `--teal-night` |
| `--panel-ink` | `#EAF6F5` | — |
| `--panel-soft` | `#9FC4C2` | — |
| `--panel-eye` | `#6FD0CC` | — |
| `--covered` | `#0F9D6E` | Coverage signal color |
| `--covered-tint` | `#E4F6EE` | — |
| `--covered-ink` | `#0A5D43` | — |
| `--partial` | `#B26A00` | — |
| `--partial-tint` | `#FBEFD9` | — |
| `--notcov` | `#64748B` | — |
| `--notcov-tint` | `#EEF1F4` | — |
| `--serif` | `'Inter Tight', system-ui, sans-serif` | NOT Fraunces — different from system |
| `--shadow` | `0 1px 2px ...` | — |
| `--radius` | `16px` | — |
| `--toch` | `52px` | TOC height var |

**Critical finding:** The Compare Page defines `--serif` as `'Inter Tight'` (a sans-serif font), while PPO Hub defines `--ff-serif` as `'Fraunces'`. This means headline treatment is completely different between the two pages. The Compare Page does **not** load or use Fraunces.

### 3.4 Font families (Compare Page)

Loaded via Google Fonts (lines 424-426):
- `Inter Tight` — weight 400, 500, 600, 700
- `Inter` — weight 400, 500, 600, 700

**Fraunces is NOT loaded on the Compare Page.** Headlines use Inter Tight (weights 700, 600 etc.).

### 3.5 Plans-data JSON (inline, lines 1760-1771)

The compare page embeds plan data as `<script id="plans-data" type="application/json">`. The shape:

```json
{
  "plans": [ { plan_object }, ... ]
}
```

**Per-plan object keys** (full list):

| Key | Type | Notes |
|---|---|---|
| `key` | string | Short identifier: `"delta"`, `"uhc"`, `"aetna"`, etc. |
| `carrier` | string | Carrier name: `"Delta Dental"`, `"UnitedHealthcare"`, etc. |
| `name` | string | Plan name: `"PPO Premium"`, `"Primary Dental"`, etc. |
| `slug` | string | URL path segment: `"delta/ppo-premium"`, `"uhc/primary-dental"`, etc. |
| `status` | string | `"live"` for all 8 plans |
| `monthly` | number | Estimated monthly premium (integer) |
| `annualMax` | number | Annual maximum |
| `annualMaxY2` | number | (Ameritas only) Year 2 annual maximum |
| `deductible` | number | Deductible amount |
| `deductibleNote` | string | (MetLife only) "first year, vanishes after" |
| `implantCap` | string | (MetLife only) "$3,000 per calendar year" |
| `ageCap` | number or null | Age cap (UHC: 64, others null) |
| `vision` | boolean | Vision bundle (Humana: true, rest: false) |
| `bundle` | array | e.g. `["vision"]` for Humana, `[]` for others |
| `bestSelling` | boolean | UHC and Guardian marked true |
| `network` | string | Network name |
| `best` | string | Short narrative "best for" description |
| `activation` | string | Activation timing text |
| `tier` | string | `"essentials"`, `"full"`, or `"maximum"` |
| `basicPctY2` | number | (Ameritas) Basic coverage % in Year 2 |
| `majorPctY2` | number | (Ameritas, MOO, Humana) Major coverage % in Year 2 |
| `implantPctY2` | number | (Ameritas, MOO, Humana) Implant coverage % in Year 2 |
| `majorPctY3` | number | (MetLife) Major coverage % in Year 3 |
| `basicPctY3` | number | (MetLife) Basic coverage % in Year 3 |
| `implantPctY3` | number | (MetLife) Implant coverage % in Year 3 |
| `graduated` | boolean | (MetLife only) true |
| `dependentDiscount` | boolean | (Humana only) true |
| `treatments` | object | Nested object — see below |

**`treatments` sub-object keys per plan:**

| Key | Value shape | Notes |
|---|---|---|
| `preventive` | `{ pct: number, wait: number }` | Always present |
| `basic` | `{ pct: number, wait: number }` or `null` | Null = not covered |
| `major` | `{ pct: number, wait: number }` or `null` | Null = not covered |
| `implant` | `{ pct: number, wait: number }` or `null` | Null = not covered |
| `orthoAdult` | `{ pct: number, wait: number }` or `null` | Only Delta has coverage |
| `orthoChild` | `{ pct: number, wait: number }` or `null` | Delta and Guardian |
| `whitening` | `{ pct: number, wait: number }` or `{ allowance: number, wait: number }` or `null` | Guardian: pct; Humana: allowance |

**8 plans in the JSON (with key discrepancies vs PPO Hub tour noted):**

1. `delta` — monthly: 75, annualMax: 2000, deductible: 50, basic wait: 6 mo, major wait: 12 mo, orthoAdult: 50%/12 mo, orthoChild: 50%/12 mo
2. `uhc` — monthly: 30, annualMax: 1000, ageCap: 64, no major/implant/ortho/whitening (PPO Hub says `$1,000 cap`)
3. `aetna` — monthly: 50, annualMax: **1250** (PPO Hub says `$1,500 cap` — discrepancy), basic wait: 6 mo, major wait: 12 mo, no implant in treatments object (PPO Hub says "excluded on this tier")
4. `ameritas` — monthly: 60, annualMax: 2000, annualMaxY2: 3500, all treatments day-one, basicPctY2: 90, majorPctY2: 50, implantPctY2: 50
5. `guardian` — monthly: 70, annualMax: 3000, basic 85%/day 1, major **60%**/12 mo (PPO Hub says "50% after 12 mo" — discrepancy), implant: **60%**/12 mo (PPO Hub says "not covered" — discrepancy), orthoChild: **60%**/12 mo (PPO Hub says "50%")
6. `moo` — monthly: 90, annualMax: 5000, basic 80%/day 1, major **20%**/day 1 / Y2: 50% (PPO Hub says "50% after 12 mo" — significant discrepancy in both wait and year-1 pct)
7. `humana` — monthly: 100, annualMax: 5000, **deductible: 75** (PPO Hub says "$50 deductible"), basic 80%/3 mo, major 50%/6 mo, majorPctY2: 60, whitening: allowance $200/3 mo wait
8. `metlife-ncd` — monthly: 100, annualMax: 10000, deductible: **100** (PPO Hub says "$100 one-time deductible"), basic 65%/day 1, major 10%/day 1, implant 10%/day 1, implantCap: "$3,000 per calendar year", basicPctY3: 90, majorPctY3: 60

**Key data discrepancies between JSON and PPO Hub (require SSOT reconciliation):**
- Aetna annual max: JSON says $1,250; PPO Hub says $1,500
- Guardian major %: JSON says 60%; PPO Hub says 50%
- Guardian implant: JSON says 60%/12 mo covered; PPO Hub says "not covered"
- Guardian ortho child %: JSON says 60%; PPO Hub says 50%
- MOO wait: JSON says day 1 at 20% rising; PPO Hub says 12 mo wait at 50%
- MOO year-1 treatment: JSON says `major wait: 0, pct: 20`; PPO Hub prose says "50% after 12 months"
- Humana deductible: JSON says $75; PPO Hub says $50

These discrepancies must be resolved against the `/data/plans/*.md` SSOTs before any rebuild content is written.

### 3.6 JSON-LD schema blocks (Compare Page)

One large `@graph` block (lines 15-406) containing:
1. **Organization** — with sameAs including Facebook (differs from DI Hub which only has LinkedIn + Twitter)
2. **WebSite** — with SearchAction pointing to `/find-my-dentist?loc=` (note: DI Hub uses `?where=`)
3. **WebPage** — datePublished `2026-01-15`, dateModified `2026-06-21`, with `reviewedBy` (not `author`)
4. **BreadcrumbList** — 3 levels including "Dental Insurance" intermediate (note: no `@id` on this node)
5. **ItemList** — 8 plan items, each a `ListItem` with nested `Thing` (not full Plan/Product schema)
6. **FAQPage** — 10 Q+A pairs
7. **DefinedTermSet** — 22 defined terms, each with `@type: DefinedTerm`, name, description, url

Missing: `HowTo`, `Article`, `Product` schema for individual plans.

### 3.7 Rating function (JavaScript, lines 1787-1795)

The Compare Page computes a 0-100 rating for each plan:

```javascript
function rating(p){
  const t=p.treatments, keys=Object.keys(t), cov=keys.filter(k=>t[k]);
  const breadth=(cov.length/7)*32;      // up to 32 pts: # of covered categories
  const maxS=Math.min(p.annualMax/5000,1)*26;   // up to 26 pts: annual max
  const avgWait=cov.length?cov.reduce(...)/cov.length:12;
  const waitS=(1-Math.min(avgWait/12,1))*22;    // up to 22 pts: waiting period
  const val=p.monthly?Math.min((p.annualMax/100)/p.monthly,1)*20:10; // up to 20 pts: value
  return Math.round(breadth+maxS+waitS+val);
}
```

No family-specific weighting. Does not factor in ortho, whitening, or scenario-specific needs.

---

## 4. Plan Stories

The "plan stories" are the ONE editorial element that must be preserved in the rebuild. They are the vignette paragraphs inside each `.tour-stop` on the PPO Hub. Below is the exact text of each, with line numbers.

### 4.1 UHC Primary Dental story (lines 255-258)

> **Sam booked a cleaning for Friday — on Monday he had no insurance at all.** He enrolled at lunch, his member ID arrived by email, and by the appointment his preventive care was covered at 100%. Total wait: three business days. Total drama: none.

Skip line: "Skip it if: a dentist has ever said the words 'crown,' 'implant,' or 'we should keep an eye on that tooth.'"

### 4.2 Aetna Dental Direct story (lines 265-268)

> **Priya left her job in March; her employer dental ended with it.** She enrolled in April — inside the 90-day window — submitted proof of prior coverage, and Aetna waived the 3-month and 12-month waiting periods entirely. The crown she needed in June paid out at 50%, months before it otherwise would have.

Skip line: "Skip it if: you need implants (excluded on this tier) or you have no recent coverage and can't wait a year for major work."

### 4.3 Ameritas PrimeStar Complete story (lines 275-278)

> **Marcus's molar was past saving.** He enrolled and had the extraction covered that same month — no waiting period on anything here, implants included. He placed the implant in benefit year two, when everything had grown: major work at 50% instead of 20%, a $3,500 maximum instead of $2,000, and a $1,500 implant benefit. The plan rewarded him for staying.

Skip line: "Skip it if: your case is one big implant this year and you can wait — the $5,000-cap plans below out-pay the $1,000 year-one implant benefit."

### 4.4 Guardian Premier 2.0 story (lines 285-288)

> **The Nguyens' orthodontist said braces in about a year.** They enrolled the family now, so the 12-month orthodontic wait expired right as treatment began: 50% of a $6,000 case for their 13-year-old. Meanwhile dad's two fillings paid 85% in week one — the highest day-one basic rate on the shelf.

Skip line: "Skip it if: implants are anywhere in the conversation, or the braces are for an adult — dependent coverage only."

### 4.5 MetLife NCD Complete story (lines 295-298)

> **Renee was facing a year of heavy work and did not want to watch a $2,000 ceiling.** She enrolled with no waiting period, used preventive at 100% from day one, and knew that even a long treatment plan had room to run under a $10,000 maximum. The catch she planned around: major work reimburses low in the first year and climbs over the next two.

Skip line: "Skip it if: you need full major reimbursement in year one, since first-year major pays only about 10% while the schedule matures."

### 4.6 Mutual of Omaha Dental Preferred story (lines 305-308)

> **Elena needed exactly one implant and was in no hurry.** She enrolled in January, used 80% day-one basic coverage all year, and placed the $4,500 implant in month 13: about $2,225 back under the $5,000 cap — the largest single-year implant payout on the shelf, with no separate implant cap to trim it.

Skip line: "Skip it if: you can't wait 12 months, or you need ortho or whitening — neither is covered."

### 4.7 Humana Extend 5000 story (lines 315-318)

> **David lost the tooth two years ago — and that's the whole story.** Before enrolling he asked Humana in writing whether the missing tooth clause applied to his gap. It did, and he chose differently. His neighbor, whose failing tooth was still in place, enrolled, did the workup during the 6-month wait, and had the fastest covered implant path on the shelf: $2,000/year, $4,000 lifetime.

Skip line: "Skip it if: the gap predates the policy and Humana confirms the clause applies — then Mutual of Omaha or Ameritas sequencing serves you better."

### 4.8 Delta Dental feature vignette (lines 241-242)

> **Delta is the one carrier people ask for by name, because their dentist already takes it.** It runs the largest dental network in the country, covers braces and aligners for adults as well as children, and activates on the 1st or 15th of the month. Because it is so much bigger than the rest of the shelf, it gets its own hub rather than a single stop here.

### 4.9 Picker answers (situation-to-plan matches, lines 204-233)

| Situation | Recommended plan | Key claim |
|---|---|---|
| Just need cleanings | UHC Primary Dental | ~$30/month, day-one 100% preventive, 1-3 day activation |
| Crown is looming | Ameritas or Aetna with waiver | Ameritas: day-one 20%; Aetna: waiver if within ~90 days |
| Implant ahead | Humana or Mutual of Omaha | Humana: 6-mo wait $2,000/yr; MOO: ~$2,225 on $4,500 case after 12 mo |
| Kid needs braces | Guardian Premier 2.0 | 50% for dependents under 19, 12-mo wait |
| Just left a job | Aetna Dental Direct | Enroll within ~90 days, waiver can unlock all waits |
| Big year ahead | Mutual of Omaha Dental Preferred | $5,000 max, 80% basics from day 1, simple rules |

---

## 5. Cross-file Internal Link Map

### 5.1 Links between audited files

| From | To | Anchor / context |
|---|---|---|
| PPO Hub | Compare Page `/compare-ppo-dental-plans` | Hero CTA, below-table link, related pills |
| PPO Hub | DI Hub `/dental-insurance` | Related section pill |
| PPO Hub | Delta Hub `/dental-insurance/delta-dental/` | Delta feature stop CTA |
| DI Hub | Compare Page | Hero CTA, rail CTA, closing CTA, related pills |
| DI Hub | PPO Hub `/dental-insurance/ppo-plans/` | Carrier section link card |
| DI Hub | All 8 plan pages via `/dental-insurance/ppo-plans/{slug}/` | Carrier table rows |
| Compare Page | PPO Hub `/dental-insurance/ppo-plans/` | TOC dropdown, carrier section links |
| Compare Page | All 8 plan pages | Carrier cards grid `#explore-carriers` |
| Compare Page | DI Hub `/dental-insurance/` | TOC nav, di-hub strip |
| Compare Page | `/find-my-dentist` | Multiple CTAs |

### 5.2 Gaps in cross-linking

- PPO Hub does not link to DI Hub's by-treatment or by-situation guides
- PPO Hub does not link to `/guides/` at all (Compare Page and DI Hub do)
- PPO Hub does not link to the glossary
- PPO Hub does not link to `/benefit-maxing/`
- Compare Page canonical is at `/compare-ppo-dental-plans` (root level) but breadcrumb shows it as child of `/dental-insurance` — it is not yet a child of `/dental-insurance/ppo-plans/`
- Neither PPO Hub nor DI Hub link to the Compare Page's URL with `/` trailing slash (canonical has none)

---

## 6. What Works Well

### PPO Hub strengths

1. **Plan stories are outstanding.** The seven vignettes (Sam, Priya, Marcus, the Nguyens, Renee, Elena, David) give each plan a memorable human angle. Each story is precise, truthful, and sets up the "skip it if" line that builds trust.
2. **Situation picker is effective.** Six scenarios with immediate show/hide answers provides a lightweight interactive experience. Logic is simple and fast.
3. **The comparison table is complete.** All seven plans, nine columns, well-structured. The inline `<table>` with `aria-label` is accessible.
4. **Schema coverage is solid.** Four blocks including CollectionPage, BreadcrumbList, ItemList (8 plans), and a 10-item FAQPage.
5. **Verify CTA band is persuasive.** Dark contrast band with clear rationale for verifying before buying.
6. **Waiting period editorial.** The "clock is the product" section (lines 392-396) is a clear GEO-worthy answer block.
7. **External CSS loading pattern.** Mega nav and footer loaded from components — consistent with rest of site.

### DI Hub strengths

1. **Most comprehensive schema.** 8-node `@graph` including Organization, WebSite with SearchAction, Article with full authorship, HowTo with 5 steps, and FAQPage.
2. **Hub structure is well-organized.** 8 clearly labeled sections with jump nav pills. Easy to update by section.
3. **Right rail.** Sticky CTA card + TOC + popular guides + editorial trust metadata. Ready for ad/feature placement.
4. **Trust infrastructure.** Byline, editorial standards link, advertising disclosure link, "independent" disclaimer all present.
5. **Delta cluster.** 12 Dell links kept together as a cluster — good signal architecture.
6. **Procedure cost table.** Anchors real numbers (cleaning $100-200, filling $150-300, crown ~$1,300, implant $3,000-5,000).

### Compare Page strengths

1. **Plans-data JSON.** Well-structured, all keys typed. Powers smart match, compare matrix, and feature table from one source.
2. **Smart match widget.** Goal grid + timeline chips + budget slider + dynamic verdict = closest thing to a scenario-first experience on the site.
3. **Glossary tooltips (`.cc-tip`).** Dark-themed tooltip system with title, body, why-it-matters, and glossary link. Reusable pattern.
4. **Rating algorithm.** Transparent 0-100 scoring across breadth, max, wait, and value dimensions. Improvable but functional.
5. **Feature table.** Desktop table with sortable columns + mobile card equivalent is well-engineered.
6. **Sticky TOC with dropdown fly-panels.** Multiple layers of navigation baked into the sub-nav, covering plans, exploration, treatment, situation, and glossary.
7. **AdSense integration.** Revenue stream infrastructure already in place.
8. **Share + cite buttons.** `#hubShareBtn` and `#hubCiteBtn` — GEO and virality features present.

---

## 7. Gaps and Weaknesses for Scenario-First Rebuild

### 7.1 PPO Hub gaps

**Content and SEO:**
- Title says "7 Carriers Ranked" but the page covers 8 plans (7 in the tour + Delta). Inconsistent count throughout (hero says "Seven", pills say "7 plans", but schema ItemList has 8 entries).
- No `datePublished` in schema (only `dateModified: 2026-06-25`). No `Article` or `author` node.
- No schema `Organization` node — no structured entity definition for CoverCapy on this page.
- Meta canonical has no trailing slash; all internal links go to the path without slash. The DI Hub canonical has a trailing slash. Inconsistency.
- No `HowTo` schema even though the page has implicit step logic.
- No `og:image` or Twitter card meta tags.
- GTM/GA present but no AdSense.

**Scenario-first gaps (the core rebuild goal):**
- Situation picker covers only 6 scenarios. Missing: family deductible math, parent + kid combination, couple, 65+ / Medicare-adjacent buyer, self-employed, adult braces (Delta only covers this).
- No family economics content. Humana family/loyalty discounts, Aetna + CVS ExtraCare Plus, MOO selectable max — none of this is surfaced.
- No CVS / Aetna ExtraCare Plus perk section anywhere in the file.
- Guardian story features kids braces correctly but does not address the adult braces gap (Delta is the answer there — the Delta section mentions it but only at the hub level).
- MOO 65+ / Medicare-adjacent angle is not surfaced in the picker or scenarios. The "single implant math" framing is narrow.
- No "family builder" or multi-member scenario widget.
- No left rail or right rail. Single-column content throughout.

**Interactive / engagement:**
- Picker does not update the URL hash. Sharable state is not possible.
- No progress indicator or scroll depth engagement.
- No comparison toggle (user cannot select two plans and diff them).
- No treatment cost estimator integration.
- No "Capy Crowns" or rewards callout.

**Internal linking:**
- No links to glossary pages.
- No links to benefit-maxing hub.
- No links to by-situation or by-treatment guides.
- No link to the editorial standards page.
- Compare Page CTA sends users to root-level `/compare-ppo-dental-plans` — when this page moves under `/dental-insurance/ppo-plans/compare/` or similar, this CTA will need updating.

**Design:**
- Design tokens are a local fork, not the CLAUDE.md canonical set. The `--teal-night`, `--mint`, `--cream-card` tokens from CLAUDE.md are absent. `--deep` and `--ink` values differ.
- No Fraunces italic on plan names in the tour (they are plain `<h3>` with default Fraunces weight, not `<em>` italic as in modal copy rules).
- No `.grow` benefit-bar visualization component (seen on compare page).

### 7.2 DI Hub gaps

- "Best for X" section (lines 409-443) shows only 4 plans: Delta (best overall), Ameritas (no wait), MOO (high max), UHC (value). Does not surface Guardian for braces, Humana for implants fastest, Aetna for job-changers, or MetLife for the $10K ceiling.
- Carrier table (lines 450-469) has data inconsistencies vs Compare Page JSON (e.g., UHC annual max shows `~$1,500` in the table but JSON has `1000`; MetLife shows `Up to $1,500` but JSON has `10000` — the DI Hub appears to have a stale or placeholder data row for MetLife).
- Hub sub-nav component (`#cc-hub-subnav-mount`) is referenced but the component content is not visible in this audit; it may not yet exist.
- Right rail "popular guides" links (lines 804-809) go to `/guides/no-waiting-period/`, `/guides/implants/`, `/guides/between-jobs/`, and `/dental-insurance/delta-dental/` — none of these link to the PPO Hub or the Compare Page.
- No family economics content in any by-situation or by-treatment section.
- No CVS / Aetna perks mention.

### 7.3 Compare Page gaps

**Data integrity:**
- Multiple discrepancies between `plans-data` JSON and PPO Hub prose (detailed in section 3.5 above). All must be reconciled against SSOT files in `/data/plans/*.md` before any rebuild.
- Delta plan in JSON has `basic wait: 6` months and `major wait: 12` months. PPO Hub prose says "activates on the 1st or 15th" but does not give basic/major wait details for Delta — Delta hub is separate. Cross-consistency check needed.

**Scenario-first gaps:**
- Smart match widget has no family mode. All scoring is per-individual. A couple or family scenario is not modeled.
- Budget slider default is $70/mo. Family budgets would be $150-300+/mo range — slider is not scaled for family use cases.
- Goal grid shows 8 icons but two (`Dentures` and `Emergency`) use `alt` strings rather than unique keys. If both map to `major`, the treatments object query may not differentiate them well.
- No Aetna + CVS ExtraCare Plus perk content anywhere on the Compare Page.
- No Mutual of Omaha 65+ / Medicare-adjacent angle in the situation cards.
- Humana vision section (`#vision`, line 1605) exists but is rendered by JS from data, not visible in source.

**Architecture:**
- The Compare Page is at `/compare-ppo-dental-plans` (root level). The rebuild plan calls for folding it under `/dental-insurance/ppo-plans/`. A 301 redirect will be needed. Breadcrumb schema will need updating (currently: Home / Dental Insurance / Compare PPO Dental Plans — missing `/ppo-plans/` level).
- CSS paths are relative (`assets/css/...` not `/assets/css/...`) — will break if page is served from a subfolder.
- The page loads its own bespoke sticky sub-nav and masthead. When moved under `/ppo-plans/`, these will need to inherit from the hub sub-nav or be replaced.

**Schema:**
- `BreadcrumbList` on Compare Page is missing the `/dental-insurance/ppo-plans/` breadcrumb level that will exist after the URL migration.
- No `Article` schema (no authorship declared in structured data).
- `WebPage` uses `reviewedBy` but not `author` — inconsistency with DI Hub which uses `author`.
- `SearchAction` urlTemplate uses `?loc=` vs DI Hub's `?where=` — pick one parameter name.

**Missing plan in JSON:**
- `delta-dental-ppo-premium` appears as `key: "delta"` with `slug: "delta/ppo-premium"` — but 00-INDEX.md lists the SSOT filename as `delta-dental-ppo-premium.md`. The key and slug in the JSON do not match SSOT naming convention.

---

## 8. Reusable Components

These patterns from the three files are strong enough to extract into shared components for the rebuilt hub:

### 8.1 Tour stop card (`.tour-stop`) — FROM PPO Hub

```html
<article class="tour-stop" id="{plan-id}">
  <span class="stop-eyebrow">Stop {N} of 07 · {headline}</span>
  <h3><a href="{plan-url}" style="text-decoration:none;color:inherit">{Plan Name}</a></h3>
  <p class="stop-price">{price summary}</p>
  <div class="vignette"><strong>{story hook}</strong> {story body}</div>
  <p>{plan prose}</p>
  <p class="skip"><strong>Skip it if: {skip condition}</strong></p>
  <a class="stop-cta" href="{plan-url}">Full {Plan Name} review →</a>
</article>
```
This is the plan story container. It must be preserved exactly in the rebuild; only the surrounding scaffold may change.

### 8.2 Situation picker widget — FROM PPO Hub

The 6-button / 6-panel picker pattern is simple and effective. For the rebuild it should be extended to support family scenarios and connect to the URL hash.

### 8.3 Plans-data JSON schema — FROM Compare Page

The `treatments` object structure with per-category `{pct, wait}` pairs is the right data model. It should be the single source for all rendered plan data in the rebuilt hub, replacing the hand-coded table cells and tour-stop price lines.

### 8.4 Glossary tooltip system (`.cc-tip` / `.cc-tooltip`) — FROM Compare Page

The dark-themed tooltip (title / body / why-it-matters / glossary link) is polished and reusable. Bring it into the PPO Hub rebuild for all insurance terms on first mention.

### 8.5 Right rail layout — FROM DI Hub

The `guide-rail` sidebar with:
- Sticky plan CTA card
- On-page TOC
- Popular guides
- Editorial trust block / page info

This is ready for ad/feature placement and should be adopted as the right rail template for the rebuilt PPO Hub.

### 8.6 Rating algorithm — FROM Compare Page `rating()` function

Improvable but functional. Add family-weight and scenario-weight parameters for the rebuild. Family max bonus when `annualMax * member_count` logic is added.

### 8.7 Feature table (`.feat-tbl-scroll` + mobile cards `#featMobile`) — FROM Compare Page

Desktop sortable table with mobile card fallback is well-engineered. Extract to a shared include for any plan-comparison hub.

### 8.8 DI Hub card grid patterns (`di-link-card`, `di-best-card`, `di-cluster`) — FROM DI Hub

The `di-link-card` pattern (eyebrow / title / sub) and the `di-best-card` pattern (badge / h3 / stats / description / CTA) are clean, accessible, and easy to populate from data. Carry them into the PPO Hub rebuild's scenario and best-for sections.

### 8.9 Editorial trust block — FROM DI Hub

The `.di-trust` block (written by / verified by / date / disclaimer / independence statement) should be a shared component injected into every plan hub and guide page.

---

## SUMMARY OF CRITICAL REBUILD PRIORITIES

Based on this audit, the top issues for the scenario-first rebuild of `/dental-insurance/ppo-plans/` are:

1. **Resolve all data discrepancies** — Aetna max ($1,250 vs $1,500), Guardian implant (covered vs not), MOO wait (0 vs 12 mo), Humana deductible ($75 vs $50), Guardian percentages — against `/data/plans/*.md` SSOTs before writing a single fact.

2. **Add family + scenario economics** — The page has no family deductible math, no Humana loyalty/family discounts, no Aetna CVS perks, no MOO 65+ angle. These are central to 00-INDEX.md's north-star goal.

3. **Unify design tokens** — PPO Hub uses a local token fork. The rebuild should use the system tokens from `hub-theme.css` + CLAUDE.md canonical values.

4. **Introduce left rail and right rail** — Current page is single-column. The rebuild needs rail slots for CVS shopping, Capy rewards, and ad placements.

5. **Extend schema** — Add Organization, Article with authorship, WebSite with SearchAction, and HowTo to match the DI Hub's schema graph quality.

6. **Plan the URL migration** — `/compare-ppo-dental-plans` moving under `/dental-insurance/ppo-plans/` requires 301 redirect, breadcrumb schema update, and CSS path fixes (relative to absolute).

7. **Add Delta adult-braces scenario** — The PPO Hub mentions Delta covers adult orthodontics but does not build a scenario around it. The rebuild should surface this as a distinct scenario (spec 06 deliverable).

8. **Picker → scenario matrix integration** — The 6-button picker should grow into the full scenario matrix spec (spec 06), including family scenarios that the Compare Page smart-match widget does not currently support.

---

*End of audit. Next: `02-competitor-serp-geo-audit.md`.*
