---
doc: "Employer Dental Cost & ROI Model (single source of truth for the calculator)"
slug: "cost-and-roi-model"
type: "model / calculator data source"
status: verified
last_verified: "2026-06-26"
critical_rule: "Carriers do NOT publish group premiums. Every dollar figure produced by this model is an ILLUSTRATIVE MARKET-AVERAGE ESTIMATE built from public benchmarks (NADP, KFF, BLS, eHealth, MoneyGeek), NOT a carrier quote. Every page using this model must label outputs as estimates and route the user to a real quote. Tax outputs must carry 'consult a tax advisor.'"
---

## 1. Premium benchmark defaults (illustrative market averages)
Total monthly premium PER ENROLLEE by tier (US market-average estimate for a small-group PPO; range in parentheses):
- Employee only: **$32/mo** (range $25-$40) — ratio 1.00x
- Employee + spouse: **$64/mo** (range $50-$80) — ratio 2.00x
- Employee + child(ren): **$60/mo** (range $48-$76) — ratio 1.90x
- Family: **$93/mo** (range $72-$120) — ratio 2.90x

Richness bands (EE-only base; tier ratios applied on top):
- **Value (lean)** EE-only ~$20 — low max (~$1,000), preventive+basic, no ortho.
- **Mid (standard PPO)** EE-only ~$32 — ~$1,500 max, 100/80/50, limited ortho.
- **Premium (rich PPO)** EE-only ~$50 — $2,000+ max, ortho, implants, low/no waits.

Other model defaults: employer contribution **50%** of premium (regulatory floor + common norm; medical contrast is ~83% single per KFF 2025); take-up **68%** of eligible enroll (LIMRA via NADP, dated 2019); default group size **10**; small-group loading ~+15% vs large-group (already baked into the $32 midpoint).

Sources: MoneyGeek 2026 (https://www.moneygeek.com/insurance/health/dental-insurance-costs/); eHealth group dental (https://www.ehealthinsurance.com/group-dental-insurance); HealthPartners employer cost (https://www.healthpartners.com/plan/blog/dental-insurance-employer-cost/); KFF 2025 EHBS (https://www.kff.org/health-costs/2025-employer-health-benefits-survey/); NADP (https://www.nadp.org/about-dental-plans-care/dental-for-your-employees/).

## 2. Worked default scenario (10 employees, Mid band, 50% employer, all EE-only)
- Premium/enrollee: $32/mo. Employer pays 50% = $16; employee pays $16.
- 10 enrolled EE-only: total $320/mo; **employer ~$160/mo (~$1,920/yr)**; each employee ~$16/mo (~$8/mo net after pre-tax savings).
- With take-up 68%, ~7 of 10 enroll: employer ~$112/mo (~$1,344/yr). The calculator headline assumes the employer offers to all 10 and shows both.

## 3. Turnover cost model
Formula: **Annual turnover cost = headcount x voluntary turnover rate x avg salary x replacement cost %.**
Defensible conservative defaults: voluntary turnover **13%** (Mercer/SHRM avg; BLS JOLTS quits ~2.0%/mo); replacement cost **25% of salary** (just above CAP's 21% median, below Work Institute's 33%); avg salary **$55,000** (editable).
Worked: 10 x 13% x $55,000 x 25% = ~**$17,875/yr** turnover cost for a 10-person firm (range ~$12k-$28k under conservative inputs).
Sources: Center for American Progress (https://www.americanprogress.org/article/there-are-significant-business-costs-to-replacing-employees/); Work Institute (https://workinstitute.com/blog/breaking-down-the-direct-costs-of-employee-turnover/); Gallup ($1T; 0.5-2x salary) (https://www.gallup.com/workplace/247391/fixable-problem-costs-businesses-trillion.aspx); SHRM (50-200%); BLS JOLTS (https://www.bls.gov/jlt/).
do_not: Do NOT claim dental "causes" lower turnover. Frame as: turnover is expensive; a dental benefit is cheap relative to it, and benefits are associated with better retention.

## 4. Tax & cash mechanics
- Section 125 POP: employee pays dental premium pre-tax; employer avoids matching **7.65% FICA** (6.2% SS up to 2026 wage base $184,500 + 1.45% Medicare) on those dollars. Employee saves ~30% (22% bracket + FICA).
- Employer dental contributions are a **deductible business expense** (IRS Pub. 334).
- IRS Small Business Health Care Tax Credit (SHOP): up to 50% of employer premium contributions (35% tax-exempt), <25 FTEs, avg wage under threshold, employer pays >=50%, bought via SHOP, 2 consecutive years; dental qualifies only if offered through SHOP. Treat as upside, not default.
Sources: IRS Topic 751 (https://www.irs.gov/taxtopics/tc751); SSA CBB 2026 (https://www.ssa.gov/oact/cola/cbb.html); IRS cafeteria FAQ; IRS/HealthCare.gov SHOP credit (https://www.healthcare.gov/small-businesses/provide-shop-coverage/small-business-tax-credits/).
do_not: All tax outputs are estimates; surface "consult a tax advisor / CPA." SHOP availability is limited and fact-specific.

## 5. Retention / value evidence (association, not causation)
- Employees with dental coverage are 17% more likely to plan to stay 12 months, 18% more likely to be satisfied (MetLife EBTS 2025/2026; correlational).
- 70% of NA employees say benefits were an essential reason they joined, up from 57% in 2017 (WTW 2024).
- Dental offered by ~99% of large/established employers but only ~30% of workers at sub-100-employee firms get it vs 70% at 500+ (SHRM 2025; BLS EBS March 2025) — a differentiator for small firms.
- 88% of workers weigh health/dental/vision when choosing a job (Fractl/HBR 2017).
- Preventive use cut major/restorative claims 86% and total dental cost 16% over 6 yrs (Guardian study 2018; insurer-sponsored, disclose).
- US loses ~320.8M work/school hours/yr for dental care (CDC PCD 2018); oral pain raises odds of productivity loss ~14x (PLOS ONE/NHANES 2021).
Sources as above; MetLife (https://www.metlife.com/workforce-insights/employee-benefit-trends/); WTW; SHRM 2025; BLS EBS (https://www.bls.gov/news.release/ebs2.nr0.htm); CDC (https://www.cdc.gov/pcd/issues/2018/17_0225.htm); PLOS ONE (https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0258268).
do_not: Disclose insurer-sponsored studies; never convert the dental correlation into a guaranteed causal ROI multiple.

## 6. Workforce KPI benchmarks (for the KPI panel)
- Voluntary turnover (quits): BLS JOLTS ~1.9-2.0%/mo (annualizes ~20%+); SHRM/Mercer voluntary avg ~12-13%.
- Total turnover ~19% (SHRM). Retention 80-90% healthy, >90% excellent.
- Median tenure 3.9 yrs (private 3.5) (BLS Sept 2024).
- Cost-per-hire $4,129; time-to-fill 42 days (SHRM).
- US engagement 31% (Gallup 2024, 10-yr low); eNPS +10 to +30 good.
- Absence rate 3.2% full-time (BLS 2024).
- ~83-87% of US population has dental benefits; DPPO = 89% of commercial; voluntary now 51% of group dental (NADP 2024).
Sources: BLS JOLTS/EBS/tenure/CPS; SHRM Human Capital Benchmarking; Gallup; NADP 2024.

## 7. Economics-professor framing (named principles + citations)
Total compensation (benefits ~30% of comp, BLS ECEC 2026); tax wedge (TPC/Cato; pre-tax benefit beats taxable wage); compensating wage differentials (Adam Smith 1776; Rosen); efficiency wages & turnover (Shapiro-Stiglitz 1984; Akerlof 1982); group risk pooling vs adverse selection (Akerlof 1970; Academy of Actuaries ~40% individual-market load); behavioral underinvestment in prevention + first-dollar preventive design (RAND HIE).
Sources: BLS ECEC (https://www.bls.gov/news.release/ecec.nr0.htm); Tax Policy Center; Cato; Shapiro-Stiglitz AER 1984; Akerlof QJE 1982 & 1970; Academy of Actuaries risk pooling (https://www.actuary.org/sites/default/files/pdf/health/pool_july09.pdf); RAND HIE (https://www.rand.org/pubs/research_briefs/RB9174.html).

## 8. Per-carrier richness bands (drives the calculator preset)
PREMIUM: Humana, MetLife, Aetna (richer designs). MID->PREMIUM: Beam (Ultra), Ameritas. MID: Delta, Guardian, Principal, Cigna, UnitedHealthcare. VALUE: Anthem. Quote-only/brand: Mutual of Omaha.
do_not: Bands are RELATIVE design-richness rankings, not price quotes. $5,000-with-ortho group banner only: Humana, Beam (Ultra), MetLife (Ameritas tier exists, grid unconfirmed). Never a group premium.
---

## Notes
This file is the only authoritative source for the calculator's default numbers and the ROI/economics copy. If a benchmark is updated, change it here first, then the calculator and pages. Every output on a page must read as an estimate, with a "get a real quote" path and, for tax, "consult a tax advisor."
