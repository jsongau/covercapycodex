# 02 — E-E-A-T and Trust Signals for the CoverCapy About Page

Workstream 2 of 10. Research only. No HTML.
Scope: current (2025 to 2026) Google E-E-A-T best practices for an authoritative About page on a YMYL (Your Money or Your Life) site, mapped to what CoverCapy can truthfully show.

CoverCapy context (from CLAUDE.md and current about.html): CoverCapy is a guidance and discovery platform for PPO dental care. It is NOT an insurance carrier, broker of record, or dental practice, and does NOT provide insurance or dental care. It is YMYL-adjacent on two axes at once: finance (insurance, cost) and health (dental care). That puts the About page under Google's strictest scrutiny, so every trust claim must be literally true and independently checkable.

---

## 1. The one rule that governs everything: Trust is the center of E-E-A-T

Google's own documentation is explicit: of Experience, Expertise, Authoritativeness, and Trust, "trust is most important. The others contribute to trust, but content doesn't necessarily have to demonstrate all of them." A page can show experience and expertise, but if it is untrustworthy (inaccurate, deceptive, or missing transparency) its whole E-E-A-T evaluation collapses. Source: Google Search Central, "Creating helpful, reliable, people-first content," last updated 2025-12-10 (accessed 2026-06-26).

For YMYL topics Google gives "even more weight to content that aligns with strong E-E-A-T," because these topics could significantly impact health, financial stability, safety, or the well-being of society. Same Google source. Industry analyses estimate E-E-A-T-correlated signals carry roughly 8% of ranking weight on general queries and about 24% on YMYL queries (Single Grain, accessed 2026-06-26) — directional, not an official Google figure, but it underscores that the About page is a higher-stakes asset here than on a non-YMYL site.

What raters check on an About page specifically: Google requires quality raters to evaluate "what you say about yourself and your site on your About page," what third-party sites say about you, whether the main content signals trustworthiness, and what reviews and comments say. Sources: SEOZoom and RankMath summaries of the Search Quality Rater Guidelines (Sept 11, 2025 edition), accessed 2026-06-26.

Design implication for CoverCapy: the About page is not a brand essay. It is the page Google (and a cautious user) lands on to answer "who is behind this, what exactly are they, can I trust them with a money-and-health decision." Lead with identity and honesty, not poetry.

---

## 2. E-E-A-T signal checklist mapped to what CoverCapy can TRUTHFULLY show

Legend: SHOW = truthful and available. EARN = truthful only once the underlying asset exists (build it, then cite it). AVOID = would be fabricated or misleading for this brand.

### TRUST (highest priority)

| Signal Google / raters look for | CoverCapy status | What to put on the page |
|---|---|---|
| Clear statement of what the site IS and IS NOT | SHOW | Already strong in current about.html: "guidance and discovery platform, not an insurance carrier or a dental practice." Keep it above the fold and in plain words. This is the single most important trust line on the page. |
| Honest disclosure of business model / how money is made | SHOW | Already present ("revenue comes from practice programs, not from you"). Keep the dedicated "How does CoverCapy make money?" answer. Transparency about monetization is a named YMYL trust signal (Mailchimp; Outpace SEO, accessed 2026-06-26). |
| Sponsored / featured placements labeled | SHOW | Already stated ("sponsored or featured placements are labeled"). Reinforce that the label is applied consistently, and link to the provider-listing / placement policy once it exists. |
| Clear, reachable contact information | SHOW (verify) | YMYL sites with thin contact info are rated less trustworthy. Add a real, monitored contact: support email and/or contact page link, and a business mailing address if one can be truthfully published. Minimal customer-service info lowers trust (Wildnet / Search Engine Land, accessed 2026-06-26). |
| Disclaimers appropriate to finance + health | SHOW | The page-legal disclaimer is good. Keep "always verify benefits, pricing, network participation, and credentials directly with your carrier and office." Clear disclaimers are an explicit YMYL trust requirement (imarkinfotech; go-globe, accessed 2026-06-26). |
| Data handling / privacy honesty | SHOW | The "member ID is never stored, only member_id_provided boolean" fact (CLAUDE.md) is a genuine, specific, checkable privacy claim. Keep the "Your member ID stays yours" trust item and link to the privacy policy. Specific beats generic. |
| HTTPS / secure site | SHOW | Site is on covercapy.com over HTTPS via Vercel. Not on-page copy, but a baseline trust prerequisite raters and tools check (lseo.com; onwardSEO, accessed 2026-06-26). Ensure no mixed content. |
| Consistent organization identity (name, URL, schema) | SHOW | Already has Organization + AboutPage JSON-LD. Keep schema identity consistent with on-page text. Machine-verifiable, consistent identity is a 2026 trust expectation (jasonpittock; Publisher Collective, accessed 2026-06-26). |
| Editorial / standards policy | EARN | Link to an editorial-standards page once it exists (it does not yet — see Gaps). A documented, attributed review process is one of the four signals that specifically separate strong YMYL sites (Single Grain, accessed 2026-06-26). |
| Provider-listing / accreditation methodology | EARN | The "Capy Accreditation" credential needs a published, honest methodology page (already linked as /capy-accreditation.html). Keep framing it as a PRIVATE CoverCapy credential, "not a government certification or a dental license." Never imply official/regulatory status. |
| Third-party reputation / reviews | EARN | Off-page, but raters check it. If/when real press mentions, Trustpilot-style reviews, or partner logos exist and are genuine, surface them. Do not fabricate testimonials. |

### EXPERIENCE (first-hand)

| Signal | CoverCapy status | What to put on the page |
|---|---|---|
| Demonstrated first-hand knowledge of the domain | SHOW (carefully) | The current "Built by insiders ... working knowledge of how dental offices and PPO networks actually operate" line is legitimate experience signaling IF true. Keep it concrete and truthful; do not inflate into clinical authority. Experience must be real, not claimed (Google source). |
| Evidence the platform is actually used (real verifications, real listings) | SHOW | The site genuinely runs verification flows and lists 6,400+ pages of real offices. Reference the real scale truthfully (e.g., "in-network dentists across the United States") rather than vanity stats you cannot back up. |

### EXPERTISE

| Signal | CoverCapy status | What to put on the page |
|---|---|---|
| Named author / team with relevant background | EARN | Google "strongly encourages" clear authorship and bios. CoverCapy can add a real founder/team section ONLY with true names and true backgrounds. If no individual can be named yet, attribute expertise to the organization honestly rather than inventing a person. |
| Plain-language accuracy on PPO/dental facts | SHOW | The "we translate PPO plans into plain language" approach is fine. Tie any specific plan facts back to the /data/plans/ single source of truth per CLAUDE.md. Never invent a plan number on the About page. |

### AUTHORITATIVENESS

| Signal | CoverCapy status | What to put on the page |
|---|---|---|
| Recognized as a go-to source on its topic | EARN | Built over time via real coverage and inbound links. On-page, support it with a coherent internal-link structure (network-effect page, accreditation standard, compare page) — already partly present. |
| Consistent NAP / entity across the web | SHOW | Keep name, URL, slogan consistent everywhere (schema, footer, social profiles in sameAs). Current sameAs only lists internal pages; add real external profiles only if they genuinely exist. |

---

## 3. Specific on-page trust ELEMENTS to include

These are concrete blocks the build agent can implement, all truthful for CoverCapy:

1. Above-the-fold identity line: "CoverCapy is a guidance and discovery platform, not an insurance carrier or a dental practice." (Already the "In one line" block — keep it prominent.)
2. "What we are / what we are not" two-column clarifier (already present). This directly answers the rater's "what you say about yourself" check.
3. How we make money — a plainly worded monetization disclosure, with the sponsored-placement labeling statement.
4. Real contact path: a visible support email and/or "Contact us" link; physical/mailing address if one can be truthfully stated. Avoid a generic dead-end form with no human.
5. Data and privacy honesty block: the genuine "member ID is never stored" fact, linked to the privacy policy.
6. Disclaimers in finance + health framing: the existing page-legal disclaimer plus a "always verify directly with your carrier and office" line repeated near any cost/coverage claims.
7. Links to governance pages: editorial standards (once built), Capy Accreditation methodology, provider-listing/placement policy. These are the "documented process" YMYL signals.
8. Founder/team or "who is behind CoverCapy" — only with real names/backgrounds. If none can be named, an honest organizational "who we are / our background in dental + PPO operations" statement.
9. Last-updated / maintained signal: an honest "last updated" date on the page (do not fake-refresh dates — Google explicitly flags date manipulation in its people-first guidance).
10. Consistent Organization + AboutPage schema that matches the visible text exactly (no schema claims that aren't on the page).

---

## 4. On-page elements to AVOID (would be fabricated or misleading)

- AVOID fake or unnamed "medically reviewed by" badges. Generic "Medically Reviewed" with no named, credentialed reviewer is weaker than nothing and is misleading for a platform that does not provide care (Single Grain, accessed 2026-06-26). Only use a named reviewer if a real, qualified, consenting person reviews the content.
- AVOID invented credentials, licenses, certifications, accreditations, or "trusted by X dentists" / "rated #1" claims that cannot be substantiated.
- AVOID fabricated testimonials, star ratings, or press logos. Use only genuine, attributable social proof.
- AVOID implying CoverCapy is an insurer, broker, or licensed provider, or that Capy Accreditation is a government/clinical certification. The page must keep repeating the opposite.
- AVOID inflated vanity metrics ("millions of patients helped") unless literally true and sourced.
- AVOID a fake "team" of stock-photo people or made-up author personas. Empty authorship is better than fake authorship.
- AVOID date-stamp manipulation to appear fresh (named in Google's people-first guidance as a warning sign).
- AVOID stating any specific plan premium, deductible, or coverage percentage on the About page that is not drawn from /data/plans/ (per CLAUDE.md SSOT rule). Better to omit specifics than to guess.
- AVOID em-dashes and roman numerals (project copy rule).

---

## 5. Handling YMYL caution for a dental-insurance-adjacent brand

CoverCapy sits in the strictest YMYL bucket because it touches both money (insurance, cost estimates) and health (dental care access). Two practical consequences:

1. Maximum-intensity accuracy expectation. For YMYL, Google says accuracy and consistency with well-established expert consensus matters most. So: never overstate what coverage or savings a user will get; always frame estimates as ranges, not promises (the current "ranges rather than false precision" language is exactly right); and always direct the user to confirm with their carrier and office. This both protects users and reads as honest to raters.

2. Stay inside your true lane. The most defensible YMYL posture for CoverCapy is to be loud about what it is NOT. Because it does not give insurance advice, sell policies, or provide clinical care, it should not present itself with the trappings of those regulated roles (no "advice," no clinical claims, no guaranteed outcomes). The honesty about being "just" a guidance/discovery layer is itself the strongest YMYL trust play: it is accurate, it sets correct expectations, and it removes the regulatory/clinical claims that would otherwise demand credentials CoverCapy cannot truthfully show.

3. 2025 YMYL scope note. The Sept 11, 2025 Quality Rater Guidelines expanded YMYL to also cover civic/"trust in institutions" topics, and added AI Overviews evaluation. Not directly about dental, but it confirms the direction of travel: Google is raising, not lowering, the trust bar. Sources: seo-kreativ.de; iPullRank "E-E-A-T, YMYL and AI Search," accessed 2026-06-26.

4. AI-content "How" disclosure. Google now expects disclosure when automation/AI substantially generates content. CoverCapy's /dental/ pages are generator-produced. The About page does not need to over-explain this, but the brand should be ready to honestly describe its data/generation process if asked, and must not present machine-generated descriptions as hand-written human reviews. Source: Google Search Central people-first guidance (accessed 2026-06-26).

---

## 6. Gaps found in the current repo (for the synthesis PM)

- editorial-standards.html does NOT yet exist (glob returned nothing). It is a named YMYL trust asset; the About page should link to it, so it likely needs to be created in a sibling workstream.
- provider-listing.html does NOT yet exist either. The "sponsored is labeled" and accreditation-methodology claims would be much stronger if they link to a real published policy page.
- The current about.html sameAs array points only to internal CoverCapy pages, not genuine external profiles. Add external profiles only if real.
- No named author/founder or "last updated" signal on the current About page. Both are low-effort, high-value E-E-A-T additions IF they can be made truthfully.

---

## 7. Sources (all accessed 2026-06-26)

1. Google Search Central — "Creating helpful, reliable, people-first content" (E-E-A-T, "trust is most important," YMYL weighting, Who/How/Why, AI disclosure; page last updated 2025-12-10). https://developers.google.com/search/docs/fundamentals/creating-helpful-content
2. Google — Search Quality Rater Guidelines (Sept 11, 2025 edition, referenced via summaries). https://guidelines.raterhub.com/searchqualityevaluatorguidelines.pdf
3. SEOZoom — "Google Search Quality Rater Guidelines" (About page evaluation, what raters check). https://www.seozoom.com/google-search-quality-rater-guidelines/
4. RankMath — "Google Search Quality Rater Guidelines" glossary (About page + reputation signals). https://rankmath.com/seo-glossary/google-search-quality-rater-guidelines/
5. Single Grain — "E-E-A-T Strategies That Guarantee Google's Trust in 2025" (YMYL-specific signals: visible credentials, disclaimers, documented review process, named reviewers; ranking-weight estimates). https://www.singlegrain.com/seo/e-e-a-t-strategies-that-guarantee-googles-trust-in-2025/
6. seo-kreativ.de — "E-E-A-T Guide 2026: Trust Signals, AI Overviews & Rankings" (2025 YMYL scope expansion). https://www.seo-kreativ.de/en/blog/e-e-a-t-guide-for-more-trust-and-top-rankings/
7. iPullRank — "Google's Search Quality Rater Guidelines and YMYL in the Age of AI Search." https://ipullrank.com/eeat-ymyl-ai-search
8. Mailchimp — "What Is Google E-E-A-T and Why It Matters" (transparency, conflict-of-interest disclosure). https://mailchimp.com/resources/google-eeat/
9. Outpace SEO — "E-E-A-T & YMYL SEO: The Complete 2026 Trust & Quality Guide." https://outpaceseo.com/article/eeat-seo/
10. imarkinfotech — "E-E-A-T Explained: Google's Quality Standards Guide" (disclaimers, editorial standards, HTTPS, business info). https://www.imarkinfotech.com/e-e-a-t-explained-ultimate-guide-googles-quality-standards/
11. Wildnet Technologies — "What is YMYL in SEO" (contact info, About page importance). https://www.wildnettechnologies.com/blogs/what-is-ymyl-in-seo-how-does-it-affect-seo
12. go-globe — "E-E-A-T & YMYL: Build Trust & Rank Higher in 2025." https://www.go-globe.com/e-e-a-t-ymyl-seo-strategies-2025/
13. lseo.com — "YMYL AEO Requirements: Transparency and Security" (HTTPS, transparency baseline). https://lseo.com/answer-engine-optimization-services/transparency-and-security-the-technical-requirements-of-ymyl-aeo/
14. onwardSEO — "YMYL Trust Signals Missing? 9 Technical Steps That Build Authority." https://onwardseo.com/ymyl-trust-signals-missing-9-technical-steps-that-build-authority/
15. jasonpittock.com — "YMYL SEO in 2026: Why Most Sites Misunderstand Google's Guidelines" (machine-verifiable, consistent identity). https://jasonpittock.com/blog/ymyl-seo/
16. Publisher Collective — "The Role of E-E-A-T and YMYL for SEO Success." https://www.publisher-collective.com/blog/what-is-google-eeat-and-ymyl
17. Search Engine Land — "What is YMYL? Google's high-stakes content category." https://searchengineland.com/guide/ymyl
