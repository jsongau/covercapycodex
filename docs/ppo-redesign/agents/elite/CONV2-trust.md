# CONV2 — Trust & Decision Psychology Audit
## compare-ppo-dental-plans.html | Conversion Specialist 2 | June 2026

Scope: analysis and spec only. No code changes. Premiums are FROZEN. No em-dashes in any
recommended copy. Every finding is grounded in a real line of the live file.

---

## 1. WHAT THE PAGE DOES WELL (keep these)

The page already carries a credible YMYL trust spine. Preserve every element below; the redesign
must inherit them or it will feel thinner than the page it replaces.

- **Independence claim, stated plainly.** Line 973 eyebrow "Independent PPO dental insurance
  comparison" and line 976 hub-trust line: "Independent, no paid placement, reviewed by dental
  billing specialists, updated June 2026." This is the single most important trust signal on a
  comparison page where the obvious fear is "are these just paid placements."
- **Independence repeated at the decision moment.** Line 2213, inside the planner verdict:
  "Scored on coverage for your need, waiting period against your timing, annual maximum, value per
  dollar, and your budget. Independent. No carrier pays for a higher score." This is the right
  place for it: the reassurance lands exactly when the user is being told which plan wins.
- **"Facts are a summary, not the policy."** Line 1459, inside the plan brief modal. Correct,
  honest, legally protective framing for YMYL. It signals the page is not pretending to be the
  contract.
- **Honest "Reviewing" / "Under review" status on MetLife.** Status `gathering-reviews`
  (line 1284), the static-table row showing "Under review / Under review" for basic and major
  (line 1053), the "Reviewing" badge (line 1592), and the modal honesty block: "This plan is
  gathering reviews. Leave your email on the card and we will reach out when coverage and pricing
  are confirmed" (line 1462). Refusing to print coinsurance you have not verified, on the
  highest-annual-maximum plan on the shelf, is a strong trust signal and a real differentiator. Do
  NOT let conversion pressure quietly "complete" this plan before the numbers are verified.
- **The cash-vs-premium value frame.** `valueFrame()` (lines 1365 to 1374): "Plan covers $X toward
  a typical {treatment}. After a $Y/yr premium, you keep $Z compared to paying cash." This reframes
  the buy from "another monthly bill" to "net dollars kept," which is the correct decision frame
  for dental insurance. It is also honest in the inverse case (line 1372): when net saving is zero
  or negative it does NOT claim savings, it just states what the plan pays. That restraint is a
  trust asset, not a weakness.
- **The "one best match plus honest backup" model.** Planner renders `Closest fit` plus
  `Backup pick` (line 2212), and openly lists what it hid and why: "Hidden because they can't meet
  your needs: {carrier} ({reason})" (line 2211). Showing the rejected options and the reason
  reduces the suspicion that the "winner" was rigged. This is good decision psychology: it lowers
  anxiety by proving the recommendation survived a comparison the user can see.
- **Glossary tooltips with "Why it matters."** The cc-tip / TIPS system (lines 2226 onward,
  definitions around 1534 to 1536) teaches the term at first mention. Reducing jargon anxiety is
  direct decision support on a page full of "annual maximum," "waiting period," "coinsurance."

---

## 2. THE ONE LIABILITY THAT MUST BE FIXED — fabricated credentialed reviewer

**Finding.** Lines 1017 to 1024 render a reviewer bar: avatar "SC," and
"Plan data reviewed by **Sarah Chen**, licensed dental insurance consultant — Verified June 2026,
Updated quarterly, How we rate plans."

There is no evidence "Sarah Chen" is a real, credentialed, licensable person. The project's own
governance doc (docs/ppo-redesign/agents/21-data-governance-trust.md, lines 59 to 62 and 133 to
135) already flags this as "the single highest-liability item on the whole project" and "the worst
possible YMYL failure." Asserting a license you cannot evidence on a page about people's money and
health is the kind of claim that destroys trust the instant it is questioned, and it exposes the
brand legally.

**Recommendation (pick one, do not leave as-is):**
- (a) Make the reviewer a real, named, credentialed person with a linkable bio and a verifiable
  license number, OR
- (b) Rewrite the byline to something true and still trust-building, for example: "Plan data
  reviewed against carrier source documents by the CoverCapy editorial team. Verified June 2026,
  updated quarterly." This keeps the human-review signal and the freshness stamp without asserting
  an individual license that cannot be defended.

A real, named, credentialed person (option a) converts better than a generic team line, so it is
worth sourcing one. But a fabricated name is worse than no name. This is the top priority.

---

## 3. THE BROKEN PROMISE — methodology and source drawer

- **"How we rate plans" links to nothing real.** The reviewer line (line 1022) and the methodology
  anchor (`id="methodology"` on line 1012) point at each other; the link `#methodology` (line 1022)
  just scrolls back to the same "Compare plans" section head. There is no actual methodology page or
  drawer that explains how plans are scored, where the data comes from, document dates, state, or
  retrieval date. The governance doc (lines 56 to 58) calls this out: the page promises
  per-fact sourcing it never renders, so "the promise is hollow."
- **Recommendation: build a real methodology block and a per-fact source drawer.** On a YMYL money
  page this is the highest-leverage trust addition after fixing the reviewer. Spec:
  - A short methodology section (reachable from the "How we rate plans" link) stating in plain
    language: the five scoring factors (already listed at line 2213), that no carrier pays for
    placement, how often data is refreshed, and that premiums are illustrative and vary by state.
  - A collapsible "Source" drawer per plan brief that fills the fields the governance doc already
    promised: carrier source document, document date, state, retrieval date, reviewer status.
    Populate it. An empty or fake drawer is worse than none.

---

## 4. THE MISSING HONEST CAVEAT — premiums are illustrative

**Finding.** The only place the page admits premiums are illustrative is the static-table
`<caption>` (line 1043): "Premiums are illustrative and vary by state." That caption lives inside
the server-rendered fallback table which, per the comment at line 1041, is "Replaced by the
interactive grid when JS loads." So for every user with JS enabled, the honest premium caveat
disappears. Compounding this: the `.disclosure` CSS class is fully styled (line 722) but never
appears in the markup, so a disclosure block was clearly intended and dropped.

**Recommendation.** Add a persistent, always-visible (JS-independent) disclosure near the compare
matrix and the planner verdict, using the existing `.disclosure` style, stating: premiums are
illustrative and vary by state, age, and ZIP; final pricing is confirmed at enrollment; this page
is a comparison tool, not the insurance policy. On a money page, a user who later sees a different
price than the one on the page loses trust permanently unless the page told them up front.

---

## 5. DECISION-SUPPORT COPY TO ADD (reduce anxiety, no dark patterns)

- **Name the fear before asking for the buy.** Near the verdict, add one honest reassurance line,
  for example: "You can switch or cancel at the next enrollment window; nothing here locks you in
  today." Reduces the "what if I pick wrong" freeze. Only include if literally true for these plans.
- **Make the backup pick's job explicit.** The dashed backup card (`.fitcard.backup`, line 203) is
  visually present but its purpose is implicit. Add a one-line label such as "If the closest fit
  feels like too much plan, this is the safer, lower-cost fallback." This supports the
  one-best-plus-honest-backup model and converts the anxious user who is not ready for the top pick.
- **Show the value frame in the inverse case as guidance, not just a fact.** When `valueFrame()`
  returns the "no net saving" branch (line 1372), add a quiet honest nudge: "For routine cleanings
  alone, paying cash may cost less than this premium." Telling someone NOT to buy when it does not
  pay is the strongest trust signal a comparison page can send, and it builds the credibility that
  converts the bigger-ticket buyers (implants, ortho) where insurance clearly wins.

---

## 6. SOCIAL PROOF — only if real

The page currently makes no fabricated review-count or "X people enrolled" claims on the trust
spine, which is correct. Do NOT add invented social proof (no fake enrollment counters, no made-up
star ratings on plans, no countdown timers). If real, attributable proof exists (verified patient
counts, real carrier directory match data, real dentist network size), surface it with a source.
Otherwise leave it out. The curated dentist cards (lines 2263 to 2264) carry rating and review
counts pulled from Supabase (`loadCurated`, line 2267) and are sourced from real data; keep those
honest and sourced, never hand-edit the numbers.

---

## 7. PRIORITIZED ACTION LIST

1. **Fix or remove the "Sarah Chen, licensed dental insurance consultant" byline.** Highest
   liability. Real credentialed person or true editorial-team wording. Nothing else matters if this
   stays fabricated.
2. **Build a real methodology block** behind the "How we rate plans" link, and a **per-fact source
   drawer** that is actually populated.
3. **Add a persistent, JS-independent premium-illustrative disclosure** using the orphaned
   `.disclosure` style.
4. **Keep MetLife honestly "Reviewing"** until verified; do not print basic/major coinsurance.
5. **Add the three decision-support lines** (switch/cancel reassurance, backup-pick label,
   inverse-value honesty nudge).
6. **No fabricated social proof, ever.** Real and sourced, or absent.

All recommendations are copy and structure changes that respect frozen premiums and contain no
em-dashes.
