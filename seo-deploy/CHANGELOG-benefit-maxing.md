# Change Log: Benefit Maxing rebuild + Smart Timing Protocol launch

Date: 2026-06-24
Reviewer: J Song, Dental Billing Specialist (billing and coverage review; not a clinical review)

Two indexable CoverCapy concepts are now established:
1. Benefit Maxing (umbrella framework) at `/benefit-maxing/`
2. The Smart Timing Protocol (named method inside it) at `/benefit-maxing/smart-timing-protocol/`

---

## Structural

- Rebuilt the hub as a navigational hub first, long article second. The first viewport now states what Benefit Maxing means, asks whether the visitor has coverage or needs a plan, and offers the next action.
- New two-stage decision router placed immediately after the hero (coverage status, then care timing). All router content and links are in the HTML source, not JS-revealed.
- Compressed the large reviewer block into a single low-interruption byline row. Social sharing moved to the article foot (in the Sources section), not between the router and the primary content.
- Reordered into the specified 13-section flow: hero, router, byline, what Benefit Maxing means, what do you need help with (hub directory + treatment guides), five practical moves, Smart Timing Protocol preview, compare plans (compact), benefit period timeline, remaining patient balance, FAQ, sources + share, final action.
- Reduced visible length to roughly 2,100 words (down from the prior long version), removing duplicate annual-maximum explanations.
- New child page built at `/benefit-maxing/smart-timing-protocol/` (~2,390 words) with definition, who it helps, when not to use it, seven variables, timeline, fully worked example, dentist questions, carrier questions, common mistakes, FAQ, sources, and bidirectional hub links.

## Factual and billing accuracy

- Annual maximum redefined accurately everywhere: "the most a dental plan may pay toward eligible covered services during a benefit period." Removed all "set aside money for your teeth", "pool you own", "reserved money", and "the insurer keeps your money" language.
- Rollover wording corrected: "Unused annual maximum generally does not carry into the next benefit period unless the plan includes a rollover or carryover feature."
- Preventive wording corrected: "Many dental PPO plans cover preventive visits at a higher percentage, but frequency limits and plan terms vary." Removed "cleanings are already paid for" and "preventive never counts toward the maximum."
- Deductible wording corrected: "After the deductible is met, the estimated patient share for later covered services may be lower, subject to coinsurance and remaining annual maximum." Removed "this is the cheapest part of the year" and "you have probably met your deductible."
- Removed the hard "crown $1,600 out of network vs $900 in network" claim. Cost comparisons now appear only inside the clearly labeled illustrative worked example.
- Two-maximum math corrected. The worked examples explicitly separate in network allowed amount, covered percentage, deductible, maximum remaining, estimated plan payment, and estimated patient share. They no longer imply two $1,500 maximums automatically produce $3,000 in plan payments.
- "copay" replaced with "coinsurance" and "estimated patient share" for percentage responsibilities.
- Hero dossier relabeled to accurate fields: Example annual maximum, Plan payments recorded this benefit period, Possible remaining maximum, Benefit period reset date. All marked illustrative.
- Plan year timeline labeled "Example for a dental plan that resets January 1" with an explicit note that employer plans may use a different benefit period.
- No invented statistics, patient stories, quotes, survey data, savings outcomes, or fabricated credentials.

## Entity and language

- Benefit Maxing defined verbatim and consistently; the exact phrase "Benefit Maxing" appears in the H1 area, the definition's first sentence, an image alt, an internal link anchor, the JSON-LD DefinedTerm, and the concluding summary.
- Smart Timing Protocol defined verbatim and consistently. Never renamed as a loophole, hack, stacking method, or trick. The relationship statement "Smart Timing Protocol is part of CoverCapy Benefit Maxing" is visible on both pages.
- No registered trademark symbol; no ownership or legal-protection claim.

## SEO (technical)

- One canonical URL per page, index/follow, snippets and large image previews allowed.
- Accurate titles and meta descriptions; removed the obsolete meta keywords tag from the hub.
- Open Graph + Twitter cards on both pages with dedicated 1200x630 social image references (see Assets to produce).
- Stable section IDs added on the hub (#what-is-benefit-maxing, #check-your-benefits, #annual-maximum, #benefit-period, #treatment-guides, #smart-timing-protocol, #compare-plans, #remaining-balance, #frequently-asked-questions, #sources) and on the child page (#what-is-the-smart-timing-protocol, #who-it-may-help, #when-not-to-use-it, #variables, #timeline, #worked-example, #ask-your-dentist, #ask-your-carrier, #common-mistakes, #frequently-asked-questions, #sources).
- Crawlable standard anchors, descriptive anchor text, no empty links, no arrows in CTAs.
- All primary content (definitions, FAQs, links, copy) is server-rendered in the HTML source. Only nav and footer are mounted client-side (see implementation note).
- Both URLs added to the XML sitemap snippet with accurate 2026-06-24 lastmod.

## Schema and entity graph

- Hub graph: WebSite, Organization, Person (J Song), DefinedTerm (Benefit Maxing), DefinedTerm (Smart Timing Protocol), CollectionPage, BreadcrumbList, ItemList (hub resources), FAQPage. Connected with stable @id values.
- Child graph: WebSite ref, Organization, Person, Article, BreadcrumbList, DefinedTerm (Smart Timing Protocol), FAQPage.
- Removed the prior HowTo block (the content is not a single step-by-step task that exactly matches HowTo). FAQ JSON-LD matches visible FAQ text verbatim on both pages.
- DefinedTerm schema carries no trademark or ownership claim.

## GEO (human-first answer-engine readiness)

- Each major section answers its heading in the first one or two sentences.
- Stand-alone definitions for both entities directly under their headings, quotable without surrounding context.
- Visible limitations and exceptions stated next to the claims they qualify.
- Named reviewer, last-reviewed date, first-party worked examples, and a visible Sources and methodology section on both pages.
- No fabricated "AI optimized / AI verified / guaranteed citation" claims anywhere.
- Optional llms.txt provided as a supplementary machine-readable directory, clearly labeled optional (not a Google ranking requirement).

## Conversion

- Clear CTA hierarchy. Primary on both pages: "Check my benefits and estimated cost" to the cost estimator. Secondary: "Browse treatment guides" (hub) and "Learn the Smart Timing Protocol".
- Financing introduced only after the insurance estimate, in the Remaining patient balance section.
- No button labeled "Verify my benefits" points at the dentist search. Verification-style intent routes to the cost estimator and to dentists who can verify.
- Final action area uses two weighted pathways plus small text links, not three equal buttons.

## Accessibility

- One H1 per page, logical heading order, single <main> landmark, nav landmarks.
- Buttons for actions, links for navigation; accordions report accurate aria-expanded state.
- Visible keyboard focus rings on buttons, cards, and share controls; 44px minimum tap targets.
- Glossary definitions are reachable by keyboard and touch via the cc-tip engine, not hover-only.
- Comparison data presented as cards and a real <table> with scope, not as text inside images.
- Reduced-motion support preserved; no horizontal overflow on mobile.
- Replaced ink-faint body text usage with ink-soft for contrast on small copy.

## Performance

- Single delegated click listener fires exactly one analytics event per click (the prior code could fire several events for one click; that duplicate tracking is removed).
- Inline styles consolidated into component classes; one shared style block per page.
- Nav and footer mounts use reserved min-height to limit layout shift while components load.
- Fonts preconnected and loaded with display swap; share and accordion code are small and deferred after content.

## Analytics (GA4 G-XNBPGSZ1LZ)

- Events emitted: benefit_maxing_primary_cta, benefit_status_selected, care_timing_selected, treatment_guide_selected, smart_timing_opened, cost_estimator_opened, plan_comparison_opened, dentist_search_opened, financing_opened, share_used.
- Parameters: page_type, destination, coverage_status, treatment_timing, guide_name.
- No member IDs, health details, or identity-linked treatment data sent to analytics.

---

## Redirect and canonical recommendations

- `/benefit-maxing/` keeps its existing canonical. No redirect needed; this is an in-place rebuild at the same URL.
- `/benefit-maxing/smart-timing-protocol/` is a new URL. Ensure it returns HTTP 200 and is not caught by any catch-all redirect. Vercel `cleanUrls: true` and `trailingSlash` settings should resolve the directory index without a redirect chain.
- Confirm no legacy URL previously served this content. If a prior "two maximums" anchor or page existed, 301 it to `/benefit-maxing/#smart-timing-protocol` or to the new child page, not to a soft 404.

## Known follow-ups and planned items

- PLAN PAGE URLS: the compact comparison links to the existing flat pattern that the repo uses today: `/dental-insurance/ppo-plans/uhc-primary-dental/`, `/dental-insurance/ppo-plans/ameritas-primestar/`, `/dental-insurance/ppo-plans/humana-extend-5000/`. The brief requested a nested pattern (`/unitedhealthcare/primary-dental/` etc.). Those nested pages do not currently exist, so the delivered links use the existing permanent URLs to avoid 404s. If the nested pattern is adopted later, create the pages first, then 301 the flat URLs to them and update these anchors.
- SOCIAL IMAGES: produce two dedicated 1200x630 images and place them at
  `/assets/images/og-benefit-maxing.jpg` and `/assets/images/og-smart-timing-protocol.jpg`. The HTML already references them.
- The hub links several treatment guides under `/benefit-maxing/guides/` (fillings, crowns, root-canals, deep-cleaning, implants, bridges, dentures, extractions, braces-invisalign, whitening). Confirm each returns 200; create any that are still planned before launch or remove the link.
- The glossary anchors (`/guides/glossary/annual-maximum/`, `/deductible/`, `/waiting-period/`, `/benefit-period`) referenced by tooltips: confirm they exist or point the tooltip links to the on-page section IDs.

## Implementation note: build-time nav and footer injection

The universal mega navigation and footer are currently mounted client-side by fetching
`/components/mega-nav.html` and `/components/footer.html` into `#cc-nav-mount` and
`#cc-footer-mount`. This was preserved as requested. For best crawlability and to remove
the small mount-time layout shift, the nav and footer should ultimately be injected at
build time so their links exist in the delivered HTML source. A static include step (for
example, a Vercel build step or a templating partial) that inlines those two components
into each page before deploy would make the navigation links part of the initial HTML
without changing their design or markup.
