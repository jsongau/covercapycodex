# Above-the-Fold Technical Specification for CoverCapy Hub Pages

**Scope:** T3 (state), T3.5 (regional), T4a (metro), T4b (local area), and T4c (city) hub pages  
**Audience:** Content engineers, generator authors, CRO reviewers  
**Last updated:** June 2026

---

## Why Above the Fold Matters More on Hub Pages Than on T5

A T5 dentist profile has a single focal point: one practice, one city, one action. Hub pages carry a harder job. They serve three audiences simultaneously: a user scanning for a dentist in their city, a user still deciding which area to explore, and Googlebot deciding how to classify and rank the page within the dental insurance content cluster. The first 600 pixels of rendered viewport must resolve all three signals before any scroll event fires.

Google's Helpful Content guidance and Core Web Vitals both reward pages where primary content is visible without interaction. On a hub page, "primary content" means the topical claim, the geographic scope, the content cluster signal, and a single next action. If any of those four are below the fold, the page underperforms both in rankings and in conversion.

---

## The Four Signals That Must Appear in the First 600px

### 1. Topical Claim

The H1 must name the page's exact topic in the same phrasing a searcher would use. For a metro hub, that means something like "PPO Dentists in Los Angeles Who Accept Your Insurance" rather than a brand tagline. The H1 is the strongest on-page signal to Googlebot for keyword relevance. It should appear at or near the top of the content area, not buried after a decorative banner.

For CoverCapy, the topical claim should always include:
- The insurance mechanic (PPO, insurance verification, or plan coverage)
- The geographic modifier (city, metro, state)
- A user-benefit phrase that matches search intent ("who accept your insurance," "covered near you," "verified PPO offices")

### 2. Geographic Scope

Users navigating from a broader hub (state to metro) need immediate confirmation they landed in the right place. A geographic lede line below the H1, such as "Showing 312 in-network offices across Los Angeles County," anchors both the user and the crawl bot. It also signals entity breadth: this page covers a defined geographic territory, not a single business.

Googlebot uses entity co-occurrence to assign page relevance. Stating the city or metro name in close proximity to the insurance terms in the first text block reinforces topical authority within the dental insurance content cluster.

### 3. Content Cluster Signal

CoverCapy's dental hub pages belong to a defined content cluster rooted at `/dental/`. The above-fold zone must include a breadcrumb component that exposes the cluster hierarchy. For a Los Angeles metro hub, that breadcrumb reads:

`CoverCapy > California > Los Angeles`

This does three things at once. It tells the user where they are in the site. It tells Googlebot the page's position in the hierarchy. And it creates crawl paths that help Google discover and reindex parent and sibling hub pages during any given crawl session.

The breadcrumb should render as semantic HTML using an ordered list with `aria-label="breadcrumb"`, and the page must include a matching `BreadcrumbList` JSON-LD block. The visual breadcrumb and the schema must agree exactly on URL and label.

### 4. Primary CTA

Every hub page has one conversion goal: move the user toward an insurance verification or a dentist profile. The above-fold zone must contain one primary CTA button that either opens the verification wizard or links to a representative T5 profile. Secondary CTAs (compare plans, filter by carrier) can appear below the fold.

The CTA label should be action-specific and insurance-framed. "Find a PPO Dentist Near Me" outperforms "Get Started" because it matches the query intent that brought the user to the page. Generic CTAs create a mismatch between the ad or organic snippet and the landing experience, which increases bounce rate and hurts dwell time signals.

---

## The Hub Nav Component and Its Relationship to the Hero

### What the Hub Nav Is

The hub nav is a horizontal strip of links to the immediate children of the current hub page. On a state hub for California, it shows links to metro areas: Los Angeles, San Francisco, San Diego, and so on. On a metro hub for Los Angeles, it shows links to T4b local areas and T4c cities within the metro.

### Placement: Below the Hero, Above the Cards Grid

The hub nav belongs immediately below the hero block (H1, lede line, primary CTA) and immediately above the first row of dentist cards or child hub links. This placement serves several purposes:

First, it keeps the hero's topical claim at the absolute top of the viewport, where Googlebot and users both see it first. Moving the hub nav above the H1 to act as a "navigation bar" would push the topical claim down and dilute the first-screen signal.

Second, placing the hub nav between the hero and the content creates a natural reading flow: "This is the topic (hero), these are your sub-options (hub nav), here is the content (cards)." Users on mobile especially benefit from this sequence because it lets them self-select a narrower geography before scrolling through potentially hundreds of dentist cards.

Third, hub nav links carry internal PageRank distribution value. Placing them above the fold, in the main content column (not in a sidebar or footer), tells Googlebot these are high-priority links within the page's link graph.

### Hub Nav Rendering Rules

- Render as `<nav aria-label="{Tier} areas in {Region}">` with an unordered list inside
- Each link is a full absolute URL using the canonical `/dental/{state}/{market}/` slug format, never a `seo_path` value
- On mobile viewports, the hub nav should be a horizontally scrollable pill row, not a stacked list, to avoid pushing the primary CTA off-screen on small devices
- The currently active hub (if any) should be visually highlighted but not removed from the list. Removing it breaks the crawl path from Google's perspective.
- Do not use JavaScript to render the hub nav. It must be present in the initial HTML response so Googlebot can follow its links without executing scripts.

### Why the Hub Nav Cannot Replace the Breadcrumb

The hub nav links downward in the content hierarchy (parent to children). The breadcrumb links upward (current page to parent to root). Both must be present. Removing the breadcrumb in favor of a hub nav loses the upward crawl signal that helps Google understand the page's depth within the site structure.

---

## First 600px Layout Specification

The elements below should appear in this order in the rendered DOM, all visible before scroll:

| Order | Element | Notes |
|-------|---------|-------|
| 1 | Breadcrumb (`<nav aria-label="breadcrumb">`) | Compact, one line, teal-300 text |
| 2 | H1 with topical claim + geo modifier | Fraunces 500, 28px minimum on mobile |
| 3 | Lede line: office count + geography | Inter Tight, ink-soft color |
| 4 | Primary CTA button | Mint accent, action-specific label |
| 5 | Hub nav pill row | Child area links, horizontally scrollable on mobile |

Items 6 and below (dentist card grid, secondary CTAs, filter controls) may appear below the fold.

---

## Common Mistakes to Avoid

**Decorative hero images that push content down.** A large hero image above the H1 on a hub page delays the topical signal and fails Core Web Vitals LCP if the image is not preloaded. On hub pages, content-first layouts outperform image-first layouts in both SEO and conversion rate.

**Taglines instead of topical H1s.** "Your smile, our mission" is not a topical signal. It tells Googlebot nothing about the page's subject. Reserve brand taglines for the homepage.

**Hub nav in the footer or sidebar only.** If the hub nav is only in the footer, its links carry minimal weight in Google's link graph and users on mobile never see it without scrolling to the very bottom of a long page.

**Mismatched breadcrumb between visual and JSON-LD schema.** Both must agree. If the visual breadcrumb shows "California > Los Angeles" but the JSON-LD schema omits the state level, Google may treat the schema as invalid and ignore it.

**CTA that links to a generic search page.** A hub page CTA that sends users to `/find-my-dentist` without a pre-populated geography query loses the contextual advantage the hub page already established. The CTA should carry the city or metro slug as a query parameter: `/find-my-dentist?q=los-angeles`.
