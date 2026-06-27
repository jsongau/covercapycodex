# 09 — Open Graph / Social & Share Previews (PPO Plan Pages)

**Scope:** 8 PPO plan pages + the PPO hub. **Owner:** Engineering + SEO. **Priority:** P1. **Effort:** M (OG-image pipeline + tag template).

---

## Current state & audit evidence

Every plan page ships **4 Open Graph tags**: `og:type`, `og:title`, `og:url`, `og:site_name`. That is the bare minimum and it produces a **textual, image-less** share card.

**Missing on all pages:**

- **`og:image`** — absent everywhere. This is the single biggest defect: no thumbnail means platforms render a small/no-image card or scrape a poorly-cropped on-page asset.
- **`og:description`** — missing on some pages, present on others (inconsistent).
- **`og:locale`** — absent on all.
- **The entire Twitter Card set** — no `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`. X/Twitter and several chat apps fall back to a tiny summary or nothing.

**Current score: 5.0 / 10 → Target: 9.0 / 10.**

---

## Why it matters

- **Share CTR:** posts with a large image card earn materially more clicks than text-only links. Image-less cards are the norm here today.
- **Brand trust:** a branded, carrier-logo card signals legitimacy for a YMYL (insurance) link; a blank/default crop reads as spam.
- **AI / LLM preview cards:** assistants and chat apps (iMessage, Slack, WhatsApp, Discord, LinkedIn) read OG/Twitter tags to build unfurls. Missing `og:image` = no preview or a junk crop in exactly the surfaces that drive referral traffic.
- **No image = poor default crop:** without `og:image`, scrapers grab whatever oversized hero/logo they find and crop it badly. We lose control of first impression.

---

## Specific fixes

### 1. Add `og:image` — auto-generated per-plan card (1200×630)
Generate one **1200×630** card per plan from `ppo_plans`, composed of:
**carrier logo** (`logo`) + **plan name** (`name`) + the **3 headline specs** (e.g. annual max, waiting period, "from $X/mo") + a **brand-color band** (`brand_color`). This makes each card unique and on-brand from the database, not a static template.

**How to generate:**
- **Build-time render (preferred):** at SSR/build, render an HTML/SVG template per row and rasterize to PNG (e.g. `@vercel/og` / Satori, or a headless-browser snapshot). Output to `/og/ppo/{slug}.png`, regenerated whenever the row's `verified_at`/`updated_at` changes.
- **On-demand OG-image service:** a serverless route `/og/ppo/{slug}` that renders the same template at request time and caches at the CDN edge.
- **Fallback brand image:** a static branded `1200×630` CoverCapy card (`/og/ppo-default.png`) used if a logo/spec is missing, so no page ever ships without `og:image`.

### 2. Fill the remaining OG gaps
- **`og:description`** — reuse the **fixed ~150-char meta description** (see Doc 04) so OG and meta stay in sync; emit on **every** page.
- **`og:locale`** — `en_US` on all pages.
- **`og:type`** — set to **`article`** for plan review pages (currently generic); keep `website` for the hub.

### 3. Full Twitter Card set
Use **`summary_large_image`** so X renders the same 1200×630 card. Emit `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` (mirror the OG values), plus `twitter:image:alt`.

### 4. Image hygiene
- **Absolute `https://` URL** for `og:image` (not relative — scrapers require absolute).
- **Correct dimensions:** declare `og:image:width` `1200` / `og:image:height` `630`; keep file **< 8 MB** (target < 300 KB PNG/WebP).
- **`og:image:alt`** describing the card ("CoverCapy [Carrier] PPO plan card").

### 5. Per-plan uniqueness from the DB
Every card and every tag string is templated from `ppo_plans` (`name`, `logo`, `brand_color`, premium, coverage specs), so no two plans share an image or description. Add a build check that fails on duplicate `og:image` URLs.

### 6. Validation
Run each URL through **Facebook Sharing Debugger**, **Twitter Card Validator**, and **LinkedIn Post Inspector**; confirm the large-image card renders, dimensions parse, and no scrape warnings.

### Exact meta block to add (templated from `ppo_plans`, one plan example)

```html
<!-- Open Graph -->
<meta property="og:type"        content="article" />
<meta property="og:site_name"   content="CoverCapy" />
<meta property="og:locale"      content="en_US" />
<meta property="og:title"       content="Delta Dental PPO Review (2026) | CoverCapy" />
<meta property="og:description" content="Delta Dental PPO review 2026: preventive at 100%, 6-mo wait, $1,500 max, from $32/mo. Independent comparison — we verify your exact plan free." />
<meta property="og:url"         content="https://covercapy.com/ppo-plans/delta-dental-ppo/" />
<meta property="og:image"       content="https://covercapy.com/og/ppo/delta-dental-ppo.png" />
<meta property="og:image:width"  content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt"   content="CoverCapy Delta Dental PPO plan card: $1,500 annual max, 6-month wait, from $32/mo." />

<!-- Twitter -->
<meta name="twitter:card"        content="summary_large_image" />
<meta name="twitter:title"       content="Delta Dental PPO Review (2026) | CoverCapy" />
<meta name="twitter:description" content="Delta Dental PPO review 2026: preventive 100%, 6-mo wait, $1,500 max, from $32/mo. We verify your exact plan free." />
<meta name="twitter:image"       content="https://covercapy.com/og/ppo/delta-dental-ppo.png" />
<meta name="twitter:image:alt"   content="CoverCapy Delta Dental PPO plan card." />
```

> Replace every literal value with live `ppo_plans` fields at SSR/build. Keep `og:description` / `twitter:description` aligned with the Doc 04 meta description (≤160 chars, compliant — no "guaranteed coverage", prices as "from $X").

---

## Implementation notes

- **Generate both the OG image and the tag block from `ppo_plans` at build** (same step that emits meta/JSON-LD), so cards regenerate when a row changes — no hand-edited HTML.
- Cache OG images at the CDN; bust on `verified_at`/`updated_at`.
- **MetLife page is `noindex`** — still emit OG/Twitter tags (links get shared even when noindexed), but **lower priority**: ship indexed plan pages and the hub first.
- Hub keeps `og:type=website` and its own collection-style card.

---

## Priority & effort

- **Priority: P1** — high CTR/brand leverage, compliance-safe (reuses approved description copy).
- **Effort: M** — one OG-image template + rasterizer/route, plus the templated tag block; ~1–1.5 dev-days including validation.

---

## Acceptance criteria

- [ ] `og:image` present on every plan page + hub, **absolute https URL**, **1200×630**, `< 8 MB`, with `og:image:width/height/alt`.
- [ ] OG image is **auto-generated per plan** from `ppo_plans` (logo + name + 3 specs + brand-color band); static fallback exists.
- [ ] `og:description` present on every page, synced to the ≤160-char meta description.
- [ ] `og:locale` = `en_US`; `og:type` = `article` (plan pages) / `website` (hub).
- [ ] Full Twitter Card set present (`summary_large_image`, title, description, image, image:alt).
- [ ] Cards are **unique per plan** (build-time duplicate-URL check passes).
- [ ] Each URL **validates cleanly in all 3 debuggers** (Facebook Sharing Debugger, Twitter Card Validator, LinkedIn Post Inspector) with a large-image preview and no scrape warnings.
- [ ] noindex (MetLife) page carries tags but is deprioritized.
- [ ] Score moved 5.0 → 9.0.
