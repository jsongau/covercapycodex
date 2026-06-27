# Benefit Maxing, Two Pathways: Master Brief
### The north star file. Read this first.
*Companion files 01 through 07 in this folder. Hub lives at `/benefit-maxing/`. Treatment guides at `/benefit-maxing/guides/{treatment}/`.*

---

## 0. The one idea

There is no single right way to use dental coverage. There are two, and which one fits depends on a single question: can the treatment wait, or not.

The Benefit Maxing hub should not preach one path. It should read the visitor's situation and send them down the pathway that actually fits, then hand off to the cost estimator and the financing page to do the math.

> If the work cannot wait, act now and finance the gap. If the work can wait, pick a bigger maximum, wait out the waiting period, and let the plan pay far more.

---

## 1. The two pathways

### Pathway A: Care now
For the person whose treatment cannot wait. Pain, a broken tooth, a filling that is overdue, or simply no patience for a waiting period.

The move: a low-cost plan with a small annual maximum that pays something immediately, used on what it covers now (a cleaning, fillings), then 0% financing for the remaining balance. The plan handles the maintenance. Financing handles the gap. Nobody waits.

Headline plan: **UHC Primary Dental**, about a 1,000 dollar annual maximum, cleaning covered in full, fillings covered from day one, no waiting on basic care. Major work is not covered by this plan, so the crown or the root canal is financed, not waited for.

Urgent major-work variant: **Ameritas PrimeStar**, which covers major work from day one with no waiting period, for the person who needs a crown now and wants the plan to pay part of it immediately.

### Pathway B: Strategize
For the person with real work ahead who can wait a few months. Several crowns, a larger treatment plan, the kind of care where timing changes the bill by thousands.

The move: a high-maximum plan, activate it now, wait out the major-service waiting period, then do the work with a large annual maximum behind it, and finance only the remaining copay at 0%.

Headline plan: **Humana Extend 5000**, a 5,000 dollar annual maximum, crowns and root canals covered at about half after a six-month wait. Six months of patience turns a small reimbursement into a large one.

---

## 2. The decision pivot (what the hero asks)

The header is two doors, not one message. The visitor self-selects, and every door leads somewhere useful.

```
                    BENEFIT MAXING HUB
                           |
                  Can the treatment wait?
                           |
        +------------------+-------------------+
        |                                      |
   NO, I need care now              YES, I can plan ahead
        |                                      |
   PATHWAY A: CARE NOW              PATHWAY B: STRATEGIZE
   Low maximum plan                 High maximum plan
   (UHC Primary Dental)             (Humana Extend 5000)
   Use it on cleaning + fillings    Wait out the 6-month major wait
   0% finance the rest              Crowns at about half, big maximum
        |                           0% finance the remaining copay
        |                                      |
        +----> Estimate cost  <----------------+
        +----> 0% financing   <----------------+
        +----> Find a dentist <----------------+
```

Both pathways end at the same three tools: the cost estimator, the financing page, and the dentist finder. The hub never calculates. It routes.

---

## 3. Why this is honest, not a sales funnel

Both pathways are real and the page says so plainly. A low maximum is not a bad plan, it is the right plan for someone who needs care now and does not need major work covered. A high maximum is not a better plan, it is the right plan for someone with a treatment plan and the patience to time it. The page matches the person to the fit. It never disparages a plan.

Every dollar figure on the page is labeled illustrative. Plan terms are described as modeled and must be confirmed with the carrier. CoverCapy is a concierge and a dentist network, not a carrier and not a lender.

---

## 4. The glossary hover carry-over

The compare-ppo hub and the estimator already wrap insurance terms in a hover tooltip through `assets/js/glossary-tips.js` (the `cc-tip` engine). Benefit Maxing reuses that engine so terms like annual maximum, waiting period, deductible, coinsurance, copay, and in-network are explained on hover and link to the glossary. Benefit Maxing gets its own wording for a few terms so the definitions speak to using a plan, not just buying one. Details in file 04.

---

## 5. Non-negotiables (carried from the existing spec and the writing rules)

- Follow `CoverCapy_Writing_Style_Anti_AI_Rules.md` for every visible string. No arrows in copy, no em or en dashes, no banned words, no the word that rhymes with care for a seat, no invented numbers.
- Design tokens from the existing Benefit Maxing build. Fraunces and Inter Tight. Gold is an accent, never a button fill.
- GA4 G-XNBPGSZ1LZ and a canonical tag on every page.
- The hub does not contain a calculator. The cost estimator does the math.
- Every dollar figure is labeled illustrative. Plan terms are modeled and must be confirmed with the carrier.
- Member ID is never stored in any verification step, only a boolean that one was provided.

---

## 6. File map

| File | What it gives you |
|---|---|
| `00-MASTER.md` | This file. The two-pathway idea, the decision pivot, the rules. |
| `01-TWO-PATHWAYS.md` | The full logic of each pathway, the decision tree, when each wins. |
| `02-HERO-TWO-DOORS.md` | The header redesign as two doors. Wireframe and behavior. |
| `03-PLAN-MAPPING.md` | Exact plan data, coverage tables, which plan each pathway uses, honesty notes. |
| `04-GLOSSARY-HOVER.md` | Carrying over the cc-tip engine, the term list, the benefit-maxing wording. |
| `05-COPY-DECK.md` | Paste-ready copy for both pathways, anti-AI compliant. |
| `06-ROUTING-CTA.md` | Every CTA, its destination, query params, the glossary links. |
| `07-BUILD-STEPS.md` | The phased build order so we ship this step by step. |
