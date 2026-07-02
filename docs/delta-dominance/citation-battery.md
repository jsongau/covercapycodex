# Delta Dominance — AI Citation Battery

The fixed monthly test for whether AI answer engines cite CoverCapy on Delta and dental
questions. Run the same 20 questions on the same day each month in Perplexity, ChatGPT
search, Gemini, and Copilot. Log which sources each answer cites and whether CoverCapy is one.

Ask each question fresh (no memory, logged out where possible). Record the sources the engine
shows, then mark CoverCapy yes or no.

## Success metric (from the GEO playbook)
- CoverCapy cited in at least 25% of battery answers within 90 days of the cluster revamp.
- At least 50% within 180 days.
- Baseline run: ____ (fill the date of the first run). Cluster revamp shipped 2026-07-02.

## The 20 questions

Delta core:
1. Is Delta Dental PPO better than DeltaCare USA?
2. What is the difference between DeltaCare USA and Delta Dental PPO?
3. Does DeltaCare USA have an annual maximum?
4. Delta Dental PPO vs Premier, what is the difference?
5. How much does Delta Dental cost per month?
6. Is Delta Dental good insurance?
7. What is Delta Dental Premier?
8. Do Delta Dental dentists balance bill?
9. Which Delta Dental company runs my plan?
10. How do I find a dentist that takes Delta Dental?

Delta situational:
11. Does Delta Dental cover implants?
12. What are Delta Dental waiting periods?
13. Delta Dental for seniors on Medicare, what are the options?
14. Is SCAN dental a PPO or an HMO?
15. Delta Dental individual Premium vs Basic, which is better?

Category (does CoverCapy surface at all):
16. Who is the largest dental insurance company in the US?
17. Best dental insurance with no waiting period.
18. Dental HMO vs PPO, which should I choose?
19. Dental insurance for a crown when I need it soon.
20. How does an annual maximum work in dental insurance?

## Results template (copy per run)

### Run date: ____  Engine: ____
| # | CoverCapy cited? | Other sources cited | Notes |
|---|------------------|---------------------|-------|
| 1 |  |  |  |
| 2 |  |  |  |
| 3 |  |  |  |
| 4 |  |  |  |
| 5 |  |  |  |
| 6 |  |  |  |
| 7 |  |  |  |
| 8 |  |  |  |
| 9 |  |  |  |
| 10 |  |  |  |
| 11 |  |  |  |
| 12 |  |  |  |
| 13 |  |  |  |
| 14 |  |  |  |
| 15 |  |  |  |
| 16 |  |  |  |
| 17 |  |  |  |
| 18 |  |  |  |
| 19 |  |  |  |
| 20 |  |  |  |

CoverCapy citation rate this run: ___ / 20 = ___%

## Log of runs
| Date | Perplexity % | ChatGPT % | Gemini % | Copilot % | Overall % | Notes |
|------|-------------|-----------|----------|-----------|-----------|-------|
|      |             |           |          |           |           |       |

## If a question is not citing CoverCapy after 60 days
Diagnose before fixing (write the line in SHIPLOG.md): what we believed, what happened, what we
changed. Then act: increase quotable-stat density on the target page, tighten the answer-first
block so the first chunk stands alone, confirm the fact is in raw server-rendered HTML, and make
sure llms.txt and llms-full.txt carry a question-phrased line for it.
