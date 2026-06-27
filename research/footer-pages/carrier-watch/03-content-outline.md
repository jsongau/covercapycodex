# 03 — Content Outline: Carrier Watch

Voice: boutique-hotel concierge / editorial. Calm, confident, plain. No hype, no em-dashes, no roman numerals. Scope CSS `.carrier-watch-page`.

## Section order

1. **Hero**
   - Eyebrow: "CoverCapy / Carrier Watch"
   - H1: "The Dental Carrier Watch"
   - Subhead: a calm, plain read on the major PPO dental carriers, scored on the things that actually gate care: how fast coverage turns on, how long until work is covered, the annual ceiling, and who each plan suits.
   - Primary CTA: "Compare plans side by side" -> /compare-ppo-dental-plans. Secondary: "Find an in-network dentist" -> /find-my-dentist.html.
   - Trust chips: "No paid placement", "Facts from each carrier's own brochure", "Verified 2026".

2. **TL;DR quick-answer block** (GEO-extractable, the 02 quick answer, lightly formatted).

3. **Section sub-nav** (sticky): At a glance / Activation speed / Waiting periods / Major + implants / Annual maximum / Who each suits / FAQ.

4. **The Watch table (flagship)** — one row per carrier, columns:
   Plan | Est. premium | Annual max | Activation | Basic wait | Major wait | Implants | Best for
   Rows (use plan-file facts verbatim, label premium estimate):
   - UHC Primary Dental | ~$30/mo* | $1,000 | Day after application received | None | Not covered (no major) | Not covered | Cheapest entry; cleanings + fillings day one (ages 64 and under)
   - Aetna Dental Direct | ~$50/mo* | $1,250 | 1st of next month | 6 mo (waivable) | 12 mo (waivable) | Not covered | Balanced everyday PPO + CVS ExtraCare Plus perk
   - Ameritas PrimeStar Complete | ~$60/mo* | $2,000 -> $3,500 yr2 | As soon as next day | None | None | Day one (major rate) | No waiting period; day-one implant access
   - Guardian Premier 2.0 | ~$70/mo* | $3,000 | 1st of next month | None (basic 85% day one) | 12 mo | 12 mo, $1,250 lifetime | Day-one fillings + child braces
   - Delta Dental PPO Premium | ~$75/mo* | $2,000 | ~5 days (varies) | 6 mo | 12 mo | 12 mo (shared max) | Largest network + adult orthodontics
   - Mutual of Omaha Preferred | ~$90/mo* | $1,500/$3,000/$5,000 | Varies | None | None (ramps) | $3,000 lifetime | High ceiling, no waits, community-rated
   - Humana Extend 5000 | ~$100/mo* | $5,000 | ~1 week | 90 days | 6 mo | 6 mo, $2k/yr + $4k lifetime | High max + dental, vision, hearing bundle
   - MetLife NCD Complete | ~$100/mo* | $10,000 | 1st of next month | None | None (graduated) | Graduated, $3,000/yr cap | Highest ceiling; reward for timing major work
   - Footnote: *premium is a CoverCapy estimate that varies by state, ZIP and age; not a fixed price. Plan facts from each carrier's brochure via CoverCapy's plan source of truth, verified 2026-06-26.
   - Table should be horizontally scrollable on mobile, with a card-stack fallback.

5. **Activation speed** (H2)
   Short prose + a small "fastest to slowest" strip. Ameritas next-day and UHC day-after-application are the quickest; Delta ~5 days; Humana ~1 week; Aetna, Guardian and MetLife on the 1st of the month after enrollment; Mutual of Omaha not stated. Market note (cite MoneyGeek/Money): immediate-coverage options are increasingly common in 2026. Plain-language caveat that all timing is the start of coverage, not how fast a claim pays.

6. **Waiting periods** (H2)
   Explain the three buckets (preventive almost always day one; basic 0-6 months; major 6-12 months). Call out the no-waiting plans (Ameritas, Mutual of Omaha) and the day-one-basic plans (UHC, Guardian, Ameritas, Mutual of Omaha). Explain waiver: Aetna's 90-day prior-coverage rule, Delta/Humana's prior-comparable-coverage rule, Humana's never-waivable implant wait. State note: NY removed waiting periods on most adult dental on its marketplace stand-alone plans from Jan 1, 2025 (cite NY State of Health) — label state-specific.

7. **Major work and implants** (H2)
   The key nuance: a low waiting period does not mean a high first-year payout. Ameritas and Mutual of Omaha pay major at ~20% in year one rising to 50% in year two; MetLife pays ~10% year one rising to 50-60%; Humana pays 50% year one rising to 60%. Implant snapshot: who covers them and the caps (Guardian $1,250 lifetime; Mutual of Omaha $3,000 lifetime; Humana $2,000/yr + $4,000 lifetime; MetLife $3,000/calendar-year within the $10,000 max; Delta under the shared $2,000 max; Ameritas day-one but the implant sub-cap deducts from the annual max). UHC and Aetna do not cover implants. Honor every do_not.

8. **Annual maximum** (H2)
   Market frame: 73% of PPO consumers now carry a $1,500+ maximum, up from 67% (NADP via Money); typical individual maximums run $1,000-$2,000 (MoneyGeek). Shelf frame: MetLife $10,000 is the outlier ceiling; Humana and Mutual of Omaha $5,000; Guardian $3,000; Ameritas $2,000 -> $3,500; Delta $2,000; Aetna $1,250; UHC $1,000. Note preventive-not-counting-toward-max as a real design feature on several plans (cite ADA on preventive credit / rollover trend).

9. **Who each plan suits** (H2)
   A short, scannable "if you are..." list mapping life situations to plans (cleanings-only budget -> UHC; coming off employer coverage and want waits waived -> Aetna or Delta; need work now with no wait -> Ameritas or Mutual of Omaha; want adult braces -> Delta; want a child's braces -> Guardian or Delta; want the biggest ceiling -> MetLife; want dental+vision+hearing -> Humana). Each maps to the plan page link.

10. **How we keep this honest** (H2, short)
    No paid placement. Every fact traces to the carrier's own brochure through CoverCapy's plan source of truth and is dated. Estimates are labeled. Link to /insurance-carrier-intelligence.html for how to read a plan and to /compare-ppo-dental-plans for the full grid.

11. **FAQ accordion** (mirrors the 8 FAQPage entries from 02).

12. **Internal links block** + closing CTA ("Verify your coverage at a real office, free" -> /find-my-dentist.html).

## Copy guardrails
- Premiums always "~$X/mo (estimate)."
- Activation phrasing per plan file, exactly.
- "No waiting period" plans still note the ramped first-year major rate.
- Never imply a single best plan; the value is the matched fit.
</content>
