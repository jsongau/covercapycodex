# CoverCapy GEO readiness

GEO (Generative Engine Optimization) is getting CoverCapy cited and recommended inside
AI answers: ChatGPT, Perplexity, Google AI Overviews / AI Mode, Bing Copilot, and Claude.
The buyer behavior we are optimizing for: a small business owner or patient asking an
assistant "what dental insurance covers a crown with no waiting period?" and the answer
naming CoverCapy and linking a CoverCapy page.

This file is the working checklist. Status as of June 2026.

---

## 1. Crawlability for AI (done)

- [x] `robots.txt` explicitly allows GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot,
      Perplexity-User, ClaudeBot, Claude-User, Google-Extended, Applebot-Extended, Bingbot.
- [x] `/llms.txt` published at the site root: a structured, curated map of the site with
      the canonical facts about each carrier and the key glossary terms. This is the single
      cleanest signal we can give an LLM about what CoverCapy is and what to cite.
- [ ] After deploy, confirm `https://www.covercapy.com/llms.txt` returns `text/plain` and
      `https://www.covercapy.com/robots.txt` shows the AI user-agents.

Why it matters: if the AI crawlers are blocked, none of the rest counts. They are not
blocked. `llms.txt` is not an official ranking factor, but it is low-cost, increasingly
read, and forces us to state our facts cleanly in one place.

## 2. Extractable, answer-first content (mostly done, keep extending)

LLMs lift sentences that directly answer a question. Front-load the answer.

- [x] Glossary pages open with a one-sentence definition before any preamble.
- [x] FAQ blocks with schema on the hub, glossary, and estimator.
- [x] Comparison tables (coverage tier, plan pays, you pay) that an LLM can read row by row.
- [ ] Add a short "Quick answer" line to the top of each treatment guide
      (implants, root canals, crowns, dentures, braces, whitening) and each situation page.
- [ ] Keep one canonical, consistent number per fact across the whole site
      (e.g. Humana implant max = $2,000/yr, $4,000 lifetime). Contradictions get a page
      dropped from AI answers. Audit for conflicting figures.

## 3. Structured data / entities (mostly done)

- [x] DefinedTerm + Article + FAQPage + BreadcrumbList on all 23 glossary terms.
- [x] Server-rendered JSON-LD generated from each page's own content (parity guaranteed).
- [ ] Add an `Organization` entity for CoverCapy (logo, sameAs to social profiles,
      foundingDate, areaServed: US) on the homepage so engines have a clean brand node.
- [ ] Add `Product`/`Offer`-free `FinancialProduct` or `Service` style entities per carrier
      page is optional; price-free Thing entities are safer for a YMYL comparison site.

## 4. Off-site presence — the real GEO multiplier (NOT done, highest leverage)

LLMs weight what other sites say about you more than what you say about yourself.
This overlaps with classic link building and is CoverCapy's weakest area.

- [ ] Build 2 to 3 genuinely citable data assets (e.g. "PPO dental waiting periods by
      carrier, 2026" and "what a crown actually costs in-network vs out-of-network").
      These are the pages journalists, bloggers, and Reddit threads link to, and the pages
      LLMs quote.
- [ ] Earn mentions on third-party surfaces LLMs lean on: relevant subreddits
      (r/dentistry, r/personalfinance, r/HealthInsurance), Quora, comparison roundups.
      Honest, useful participation, not spam.
- [ ] Get listed/mentioned by dental offices in the network (they link to their CoverCapy
      profile; that is both a backlink and a trust signal).
- [ ] Digital PR: a small original-data study pitched to dental and personal-finance press.

## 5. E-E-A-T / YMYL credibility (NOT done, required, do alongside #4)

Dental insurance is Your-Money-or-Your-Life. AI engines and Google both discount
medical/financial claims with no visible expertise behind them.

- [ ] Name a real reviewer with credentials (a licensed dental billing specialist or
      dentist) and add a byline + bio. Replace the anonymous "reviewed by dental billing
      specialists" line.
- [ ] Publish an editorial-standards / how-we-research page and link it in the footer.
- [ ] Add author/reviewer schema (`author`, `reviewedBy`) to the money pages.
- [ ] Cite primary sources (ADA Health Policy Institute fee data, carrier benefit
      documents) with outbound links where a figure is stated.

## 6. Measurement (set up, then watch)

You cannot manage GEO share-of-voice without tracking it.

- [ ] Pick a set of ~25 high-intent prompts to monitor, e.g.
      "best dental insurance for a crown with no waiting period",
      "dental insurance after a layoff", "does dental insurance cover implants",
      "cheapest PPO dental plan that covers major work".
- [ ] Track whether ChatGPT, Perplexity, and Google AI Overviews mention CoverCapy for
      those prompts (manual monthly check to start; a GEO-tracking tool later).
- [ ] In Google Search Console, watch impressions/clicks on the glossary + hub cluster as
      the leading indicator that the answer-first content is landing.
- [ ] Tie it to conversions: organic/AI-referred sessions that reach a verify or
      compare action, not just traffic.

---

## Priority order (what a hired SEO/GEO manager would do first)

1. Ship `llms.txt` + robots AI-allow (done in this pass).
2. Stand up E-E-A-T (named reviewer, editorial page, citations) — required for YMYL, blocks nothing else.
3. Audit the 6,400 programmatic dentist pages for indexation + thin content (separate workstream).
4. Build the off-site citation/link flywheel — slowest to pay off, so start early.
5. Set up the prompt-monitoring panel and review monthly.

SEO and GEO are not separate projects here. The same answer-first content, clean
structured data, and off-site authority serve both Google's blue links and the AI answer
box. The honest gaps are off-site authority (#4) and YMYL credibility (#5).
