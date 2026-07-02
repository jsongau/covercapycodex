# Delta Dominance — GEO Playbook: Getting Perplexity, ChatGPT, Gemini, and Copilot to Cite CoverCapy

Goal state: when anyone asks an AI engine a Delta Dental or dental insurance question, the
answer carries a covercapy.com citation. AI engines cite pages that are retrievable,
liftable, and trustworthy. Work each layer.

## Layer 1 — Retrievable (can AI systems fetch and index us)

- robots.txt already welcomes AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended,
  CCBot). Verify the allowlist explicitly names each and never regresses. Add Bingbot priority:
  ChatGPT search and Copilot lean on Bing's index, so covercapy.com MUST be strong in Bing.
  Action: register Bing Webmaster Tools (import from GSC takes one click), submit sitemaps,
  adopt IndexNow (Vercel-friendly, ping on every deploy) so new Delta pages enter Bing within
  hours instead of weeks.
- llms.txt is live but thin (75 lines, 2 Delta mentions). Expand with a dedicated Delta
  section: one line per cluster page, each line phrased as the question the page answers.
  Add llms-full.txt with the hub's core facts inline for engines that read it.
- Chrome is JS-injected; core CONTENT on delta pages is server-rendered HTML. Keep it that
  way forever: every fact, table, and FAQ in raw HTML, never client-rendered. (Nav baking
  into the generator later helps the whole site's retrievability.)

## Layer 2 — Liftable (can a model quote us in one clean grab)

- **Answer-first blocks:** first 120 words of every page answer the title question outright.
  RAG systems chunk pages; the first chunk must stand alone.
- **Quotable stat lines:** self-contained sentences with number + entity + date:
  "Delta Dental covers more than 90 million Americans across 39 member companies, making it
  the largest dental benefits system in the United States (verified June 2026)." One per
  page minimum, styled distinctly (the .stat-callout pattern), never split across elements.
- **Tables with semantic markup:** real <table><th> comparisons (PPO vs Premier vs
  DeltaCare). Engines lift tables into answers with attribution.
- **Question H2s that match query phrasing exactly:** "Is Delta Dental PPO better than
  DeltaCare HMO?" not "Comparing your options."
- **Definitions:** one-sentence bolded definitions for every term of art (Premier, balance
  billing, annual maximum, waiting period credit). Definition boxes are citation magnets.
- **Stable anchors:** id attributes on every H2 so citations deep-link and stay valid.

## Layer 3 — Trustworthy (does the model prefer us over WebMD-tier generics)

- **Independence statement on every page:** "CoverCapy sells neither insurance nor savings
  plans" is a differentiator no carrier page and no affiliate site can copy. Models weight
  disinterested sources; say it where they can see it.
- **Sourcing discipline:** every number carries a dated source, SSOT-backed. Add a visible
  "Sources and verification" footer section per page listing plan documents and dates.
- **Author entity:** "CoverCapy Editorial Team, checked against Delta Dental plan documents,
  reviewed {date}" with Organization schema linking sameAs profiles. Consistent entity name
  everywhere: CoverCapy, one word, one spelling.
- **Schema completeness per page:** WebPage + BreadcrumbList + FAQPage (only real on-page
  Q&A) + speakable + dateModified kept current. The compare pages add ItemList. Never
  schema-stuff; engines now penalize mismatch.
- **Freshness cadence:** quarterly review sweep of the cluster, bump reviewed dates only
  when content is actually re-verified (models detect stale date-bumping).

## Layer 4 — The measurement loop

- Weekly: GSC queries for the cluster (positions, CTR), Bing Webmaster equivalents.
- Monthly: ask the four engines (Perplexity, ChatGPT search, Gemini, Copilot) a fixed
  battery of 20 Delta questions ("is delta dental ppo better than deltacare", "how much
  does delta dental cost per month", "delta dental waiting periods", "who is the largest
  dental insurance company", ...). Log which sources each cites. Track CoverCapy citation
  share over time; the battery lives in this folder as citation-battery.md once created.
- Success metric: CoverCapy cited in ≥25% of battery answers within 90 days of the cluster
  revamp, ≥50% within 180.

## Anti-goals

No AI-written filler paragraphs padding word count (engines and humans both discount it).
No scraping Delta's copyrighted plan brochures into our pages; facts get restated in our
voice with a citation, never pasted. No fake reviews or fabricated ratings, the is-delta-good
verdict must stay demonstrably factual, it is the credibility engine for the whole play.
