# 07 — Trust, Transparency & Compliance for the About Page

Workstream 7 of 10. Research only. No HTML.
Repo: `/Users/kytlegacy/covercapycodex ultimate 21JUN26`
Author date: 2026-06-26

Goal: give the About page builder the exact trust + transparency copy to use, worded so it never contradicts the live legal pages, plus a truthful "is this legit" reassurance block, the right legal-page links, and a hard list of what we must not claim.

Constraints honored throughout: no em-dashes, no roman numerals.

---

## 1. What the legal pages already commit us to (the source of truth)

Every statement below was lifted from the live pages so the About copy stays consistent. If About and these pages ever disagree, the legal pages win.

**`insurance-disclaimer.html`** (last updated May 30, 2026)
- "CoverCapy is not a dental insurance carrier and does not make final benefit determinations."
- "CoverCapy does not underwrite insurance, issue insurance policies, pay claims, approve benefits, or guarantee plan enrollment."
- Benefits vary by carrier, plan, state, eligibility, network status, waiting period, annual maximum, deductible, frequency limitation, procedure code, provider contract, and treatment history.
- Estimates "are not final quotes, pre-authorizations, explanations of benefits, or guarantees."
- "Verify before enrollment or treatment ... directly with the insurance carrier and dental office."
- "CoverCapy does not diagnose, treat, or recommend a specific clinical course of care."

**`advertising-disclosure.html`** (May 30, 2026)
- "CoverCapy may receive compensation from advertising partners, sponsored dentist listings, affiliate relationships, referral relationships, or other commercial relationships."
- Compensation "may affect whether a dentist, carrier, plan, product, or service appears ... how prominently it appears, or how it is presented."
- "Paid placement does not guarantee clinical quality, provider availability, insurance acceptance, treatment outcome, or final cost."
- "We do not guarantee that every available plan, dentist, carrier, or financing option is included."

**`provider-listing.html`** (May 30, 2026)
- Four listing types: directory/unclaimed, claimed profiles, Capy Accredited or Platinum Elite, sponsored.
- "Ranking may consider factors such as sponsorship, membership tier, location, claimed status, patient demand ... Paid or sponsored relationships may influence placement or presentation."
- "A listing on CoverCapy does not mean CoverCapy guarantees clinical quality, treatment outcomes, pricing, insurance acceptance, credentials, availability, or patient satisfaction."

**`privacy.html`** (May 30, 2026)
- "CoverCapy is not an insurance carrier or dental practice."
- Collects only info the user chooses to provide (name, email, ZIP, plan/treatment interest, message), plus device/analytics and ad data.
- Uses Google AdSense (publisher ID ca-pub-8699915070570206).
- Users can request access, correction, or deletion of information they provided.
- Privacy contact: contact@covercapy.com.

**`editorial-standards.html`**
- "CoverCapy is an independent guide to PPO dental insurance."
- "CoverCapy does not sell insurance and is not owned by an insurance carrier. We do not accept payment to rank, recommend, or feature any dental plan."
- "CoverCapy earns revenue through dentist memberships and referral relationships disclosed on our advertising disclosure page. Those relationships never change how we describe a carrier's coverage, waiting periods, annual maximums, or premiums."
- Every coverage figure traces to a primary source; plan facts come from carrier benefit documents and ADA HPI fee data.
- Important nuance: this page distinguishes **plan/editorial content** (never paid, never ranked for money) from **dentist listings** (where membership and sponsorship do affect placement). The About page must preserve that distinction so the two never read as contradictory.

**`footer-preview.html`** sitewide fineprint (this is the exact sitewide line; About copy should echo, not fight it):
> "CoverCapy is a dental guidance and discovery platform, not an insurance carrier or dental practice. Some listings or links may be sponsored. Always verify benefits, pricing, provider participation, credentials, availability, and treatment costs directly with the carrier and dental office."

**Current `about.html`** already carries a six-tile "Trust And Transparency" grid (we are not an insurer, patient tools are free, sponsored is labeled, member ID stays yours, always verify directly, built by insiders) plus a page-legal disclaimer. The copy below refines and consolidates that, it does not start from scratch.

---

## 2. The exact trust + transparency statements for the About page

Use these as drop-in copy. They are written to match the legal pages word-for-spirit. Headings are suggestions; the builder can restyle.

### 2a. What CoverCapy is, and what it is not

> CoverCapy is an independent guidance and discovery platform for PPO dental care. We help people compare PPO dental plans, estimate what treatment will really cost, verify that a dentist takes their exact network, and find a modern in-network office across the United States.
>
> CoverCapy is not a dental insurance carrier, not a broker of record, and not a dental practice. We do not underwrite insurance, issue policies, pay claims, approve benefits, or guarantee enrollment, and we do not diagnose or treat. We help you get ready. The carrier and the dental office make the final calls.

(Keep "broker of record" only if Terms supports it; the current page-legal already uses that phrase, so it is safe.)

### 2b. How CoverCapy makes money

> CoverCapy is free for patients. Comparing plans, estimating costs, verifying coverage, and finding dentists never cost you anything.
>
> Our revenue comes from dental practices, not from patients. Practices can claim a free profile, apply for Capy Accreditation through a real review, or join higher-visibility membership tiers. CoverCapy may also receive compensation from sponsored listings, advertising, affiliate, and referral relationships. Those relationships can affect whether a dentist or product appears on CoverCapy, how prominently it appears, and how it is presented, and we disclose that openly.
>
> One line we hold firm: how we describe a plan's coverage, waiting periods, annual maximums, and premiums never depends on who pays us. Plan facts come from the carrier's own benefit documents, not from a commercial arrangement. Sponsorship can move where a dentist appears. It cannot change what we say a plan covers.

Notes for the builder:
- The membership tiers exist (free, capy_accredited, platinum_elite per CLAUDE.md). You may name them lightly ("a free tier, Capy Accreditation, and Platinum Elite visibility") but do not quote prices on the About page; pricing lives on the membership pages and changes.
- The "plan facts never bought" vs "listing placement can be paid" split is the single most important consistency point. Keep both sentences together so they cannot be quoted out of context.

### 2c. How CoverCapy protects your data

> We collect only what you choose to give us, such as a name, email, ZIP code, or the details of a coverage question, plus standard website and advertising analytics. You can ask us to access, correct, or delete the information you provided.
>
> When we help verify coverage at an office, we record only that a member ID was provided. The member ID itself is never stored on our platform. Coverage verification is about getting you a clean answer, not about collecting sensitive numbers we do not need.

Notes:
- "member_id_provided: boolean, never the actual member ID" is a hard rule from CLAUDE.md and the verification schema. State it plainly; it is a real differentiator and it is true.
- Do not overclaim security ("bank-grade encryption," "HIPAA compliant," "SOC 2") unless a named control actually exists. None is documented in the repo, so do not assert any. "Never stored" is the claim we can stand behind.

### 2d. Always verify directly (the load-bearing line)

> CoverCapy helps you prepare, but it does not replace your own confirmation. Before you enroll in a plan or begin treatment, confirm benefits, eligibility, waiting periods, network participation, credentials, availability, and final costs directly with your insurance carrier and dental office. Estimates and listings are a starting point, not a final bill or a guarantee.

This mirrors the insurance disclaimer and the footer fineprint almost exactly, which is the point.

---

## 3. Reassurance block: "Is CoverCapy legitimate and safe to use?"

Best practice from 2026 trust-page research: answer the legitimacy question head-on, be transparent about how you make money, give a real way to reach a human, and never overclaim. (Sources in section 6.) Suggested copy, all truthful and consistent with the legal pages:

> **Is CoverCapy legitimate and safe to use?**
>
> Yes, and here is exactly why you can judge that for yourself.
>
> - **We are clear about what we are.** CoverCapy is a guidance and discovery platform, not an insurer and not a dental office. We say so on every page and in our insurance disclaimer.
> - **We are clear about how we make money.** Patients pay nothing. We earn from dental practice memberships, accreditation, and disclosed sponsored placements. Our advertising disclosure spells this out.
> - **We do not sell your member ID.** Coverage verification records only that an ID was provided. The number itself is never stored.
> - **We point you back to the source.** We never ask you to take our word for a benefit or a price. We tell you to confirm it with your carrier and office, because they are the final authority.
> - **You can reach a real person.** Questions go to contact@covercapy.com and we answer them.
> - **We correct mistakes.** If a figure is wrong, tell us and we check it against the source and fix it, with the correction noted on the page.

Optional one-line version for a hero or FAQ snippet:
> CoverCapy is a free-for-patients PPO dental guidance platform. We are not an insurer, we disclose how we earn, we never store your member ID, and we always send you to confirm benefits with your carrier and office.

Tone guidance: confident, specific, and falsifiable. "Legit" pages that work in 2026 list checkable facts (named contact, disclosed revenue, clear is/is-not) rather than vague badges. Avoid empty trust theater (stock "100% Secure" seals, invented award logos).

---

## 4. Which legal pages to link, and how to reference them

Link these by name from the About page trust section. All exist and resolve today. Use root-relative `.html` paths to match the footer and the live legal pages.

| Reference in About copy | Link target | When to use it |
|---|---|---|
| "our insurance disclaimer" | `/insurance-disclaimer.html` | next to "not an insurer / always verify" copy |
| "our advertising disclosure" | `/advertising-disclosure.html` | next to "how we make money / sponsored is disclosed" copy |
| "how listings work" / "Provider Listing Policy" | `/provider-listing.html` | next to sponsored/ranking copy |
| "Privacy Policy" | `/privacy.html` | next to the data / member ID copy |
| "Editorial Standards" | `/editorial-standards.html` | next to "plan facts are never bought" copy |
| "Terms of Service" | `/terms.html` | in the page-legal footer block |
| "Accessibility" / "Contact" | `/accessibility.html`, `/contact.html` | page-legal footer block (already in footer) |

How to reference (style):
- Inline, in plain language: "We disclose every paid relationship in our [advertising disclosure]." Not a bare URL, not "click here."
- Keep a single consolidated page-legal paragraph at the foot of the About page (the current one is good) that names the disclaimer, sponsorship labeling, Capy Accreditation status, and the verify-directly line.
- Do not bury these links only in the global footer. The trust claims on About should sit next to the page that backs each one, which is the FTC "clear and conspicuous, close to the claim" principle.

---

## 5. What we must NOT claim (hard list)

These are non-negotiable. Each would create a contradiction with a legal page or an unsupportable claim.

1. **No insurer/carrier language.** Never say or imply CoverCapy sells, underwrites, administers, issues, or guarantees insurance, approves benefits, or pays claims. We are a platform.
2. **No benefit, price, or outcome guarantees.** No "guaranteed coverage," "guaranteed acceptance," "guaranteed savings," "lowest price," or "guaranteed appointment." The disclaimers explicitly disclaim all of these.
3. **No clinical claims.** Do not diagnose, recommend a treatment, or promise a clinical result. Do not call any dentist "the best" or vouch for clinical quality. A listing is not an endorsement of quality.
4. **No fabricated certifications or accreditations.** Capy Accreditation is a private CoverCapy credential, not a government certification, not a dental license, and not an industry-body accreditation. Never imply it is official or state-issued. Do not invent badges (BBB, HIPAA, SOC 2, ADA endorsement, "licensed," "certified by ...") unless one genuinely exists and is documented.
5. **No "all plans / all dentists" completeness claims.** We do not guarantee every plan, dentist, carrier, or financing option is included. Avoid "every dentist in America" or "all PPO plans."
6. **No hidden-money claims.** Do not say or imply listings are purely merit-ranked or that money never affects placement of dentists. Money can affect dentist placement; only plan/editorial content is paid-free. Keep that distinction exact.
7. **No member ID storage claim that contradicts the rule.** Do not say "we keep your coverage on file" or anything implying we retain member IDs. We do not.
8. **No overclaimed security posture.** No "fully encrypted," "bank-grade security," "we protect your data with [named standard]" unless real. Stick to "member ID never stored" and "you can request deletion."
9. **No "free with no catch" without the disclosure.** Free for patients is true, but always pair it with how we actually earn (practice memberships + disclosed sponsorship), or it reads as the catch we are hiding.
10. **No fake social proof.** No invented review counts, star ratings of CoverCapy itself, testimonials, "trusted by millions," or unverifiable "as seen in" logos.
11. **No medical or financial advice framing.** We provide guidance and estimates, not advice. Keep "estimate / starting point / confirm with your carrier" framing.
12. **Style rules (from CLAUDE.md):** no em-dashes in copy, no roman numerals, do not invent CSS color tokens, sponsored placements labeled where practical.

---

## 6. Sources

External best-practice claims (accessed 2026-06-26):
- Federal Trade Commission, "The FTC's Endorsement Guides: What People Are Asking" — material connection must be disclosed clearly and conspicuously, close to the claim. https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking
- AdsX, "Affiliate FTC Disclosure: Wording, Placement and 2026 Rules" — disclosure must be easy to notice, not buried in fine print; closer to the recommendation is better. https://www.adsx.com/blog/affiliate-ftc-disclosure-compliance-guide
- Termly, "FTC Affiliate Disclosure" — what counts as a material connection (commissions, paid placement, sponsorship). https://termly.io/resources/articles/ftc-affiliate-disclosure/
- Levitate, "What Makes a Website Trustworthy" — About pages with real people, matching business email, physical location, and clear mission as core trust signals. https://www.levitate.ai/blog-posts/what-makes-a-website-trustworthy
- HostPapa, "Website Trust Signals Every Business Needs" — reachable contact (real email/phone, not only a form), secure connection, clear policies. https://www.hostpapa.com/blog/web-design-development/trust-signals-every-website-needs/
- Rebel, "What makes a website feel trustworthy in 2026?" — transparency and human, checkable signals over badges. https://blog.rebel.com/what-makes-a-website-feel-trustworthy-in-2026/

Internal sources of truth (this repo, read 2026-06-26):
- `/insurance-disclaimer.html`
- `/advertising-disclosure.html`
- `/provider-listing.html`
- `/privacy.html`
- `/editorial-standards.html`
- `/about.html` (current trust grid + page-legal)
- `/footer-preview.html` (sitewide fineprint)
- `CLAUDE.md` (member ID never stored, sponsored-listing transparency, verify-directly, membership tiers, no em-dashes / roman numerals)
