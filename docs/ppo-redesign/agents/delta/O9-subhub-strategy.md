# O9 — Delta Sub-Hub Strategy (Over-65 / UC-Students / Compare)

> Agent O9. Source of truth: the 5 live files under
> `/dental-insurance/ppo-plans/delta-dental/` (hub `index.html`, `premium/`,
> `compare/`, `over-65/`, `uc-students/`). Companion docs: `delta/U1-hub-nav-map.md`
> (IA / nav), `19-knowledge-graph.md` (entity + no-drift model).
> Premium is the GATEWAY. Color = T5 jade (`--jade #0FB5A6` / `--jade-deep #0C8C81`).
> No "PPO Basic" exists; none introduced. Body ≠ CTA.
> Reviewed 2026-06-21.

---

## 0. Frame — what a sub-hub is and is not

Premium is the **gateway**: it owns the shared conversion machinery (`#dentists`
finder, `#nominate` engine, verify, cost estimator). The three sub-hubs are
**audience / intent on-ramps** that capture a search query Premium cannot rank
for, answer it honestly, then route the user *into the gateway* (find a dentist,
verify, nominate, or enroll) and *up to the hub*. A sub-hub earns its URL only if
it (a) targets a query the gateway/hub cannot, (b) adds non-duplicated content,
and (c) funnels cleanly to Premium + Hub. All three pass (a) and (c); §4/§5 flag
where they thin out or break.

---

## 1. OVER-65 — `/over-65/` · "SCAN Delta benefit"

| Field | Value |
|---|---|
| **Purpose** | Capture the Medicare-Advantage senior who *already has Delta* through SCAN and tell them so **before** they buy a redundant individual plan. A pre-emptive "you may already be covered" page. |
| **Audience** | SCAN Health Plan Medicare Advantage members, age 65+, **in CA & WA only** (the two states where SCAN dental runs through Delta; AZ/NV/NM/TX route to DentaQuest). |
| **Search intent** | "does SCAN include Delta Dental", "SCAN dental benefit", "Delta Dental for seniors / Medicare", "SCAN find a dentist". Informational, anxious, navigational. |
| **Unique value** | The *only* node that distinguishes **DeltaCare USA (HMO) standard benefit vs the optional PPO buy-up** — a distinction that exists nowhere else on the hub, and is the page's defensible content moat. Plus the carrier-specific SCAN lookup (`deltadentalins.com/scan`, 1-855-830-6583) and the "check the back of your 2026 card" heuristic. |
| **Content depth** | Healthy. Answer block + 3-step "how it works" + two-network comparison (HMO std vs PPO buy-up) + carrier-contact block + related grid + 4 FAQs. Not thin. |
| **Gateway / hub linkage** | → Premium `#nominate` ("Have us find & book one"), → Premium (Related "Individual plan" + FAQ "should I also buy"), → Compare ("All PPO plans side by side"). Up to Hub via sub-nav "Delta Hub". Schema is full 5-level breadcrumb (UI crumb is 3-level shorthand). |

**SCAN / senior angle.** The play is *de-risking the existing benefit*, not selling.
It correctly tells most seniors NOT to buy an individual Delta PPO (FAQ: "usually not
… you'd be paying twice"). This protects trust and aligns with the "paid by offices,
not by which plan you choose" disclosure. The sub-hub's revenue path is the **find-and-
book concierge handoff into Premium `#nominate`**, not a plan sale.

**Medicare-adjacent caution (must preserve).** The page is well-disclaimed and must
stay that way: explicit "not affiliated with / endorsed by SCAN, Delta Dental, or
Medicare," "this is informational, not the plan document," "DeltaCare USA and Delta
Dental Medicare Advantage PPO are Delta products," and "benefits vary by SCAN plan and
state — see your EOC." **Do not** present this as an individual PPO, do not let the
gateway's `$73/mo Premium` framing bleed onto a Medicare audience (a separate product
with separate CMS rules), and keep the SCAN-vs-DentaQuest state split prominent — it is
the single most likely factual mistake a senior could make here.

---

## 2. UC-STUDENTS — `/uc-students/` · "UC SHIP" (parent of campus leaves + data study)

| Field | Value |
|---|---|
| **Purpose** | Capture the UC student who has UC SHIP, tell them their dental is (usually) Delta Dental PPO, and map an in-network dentist near *their* campus — converting via verify/nominate. Doubles as the **parent node** for per-campus leaves and the data study. |
| **Audience** | Enrolled UC SHIP students across the 10 UC campuses; secondarily, graduating students about to lose SHIP (the post-graduation Premium handoff). |
| **Search intent** | "UC SHIP dental", "is UC SHIP Delta Dental", "dentist near UCLA / UC Berkeley that takes UC SHIP", "do I need a referral UC SHIP dental". Local + navigational. |
| **Unique value** | A **live Leaflet campus map + finder** (campus `<select>` → Supabase `dentists` within radius, ranked by accreditation/rating/distance) with `?uc={slug}` deep-linking, plus verify/nominate modals. This interactive, location-aware tool is the page's moat — the hub/gateway has a generic finder, this one is pre-scoped to campus. |
| **Content depth** | Good *on the parent*: answer block, fact strip, live finder, 3-step, FAQ, by-campus grid, "more on Delta" grid. The **risk is entirely on the children** (see below). |
| **Gateway / hub linkage** | → Premium (post-graduation "PPO Individual Premium Plan"), → Compare ("Is Delta good?"), → Hub ("Delta Dental hub", Related + footer). Up via reduced sub-nav (Set B). Schema full 5-level breadcrumb. |

### 2a. The campus-leaf model (per-UC pages) — **CRITICAL: not on disk**

The parent links to **10 campus leaves** at `/delta-dental/students/{campus}/`
(ucla, uc-berkeley, uc-san-diego, uc-irvine, uc-davis, uc-santa-barbara,
uc-riverside, uc-santa-cruz, uc-san-francisco, uc-merced) from **both** the hub
index ("By UC campus" grid) and the uc-students "By campus" grid. **None of these
files exist on disk** (confirmed: only the 5 top-level files are present). All 10
links are **live 404s** on both the hub and the sub-hub.

**Intended model:** one indexable page per campus = the programmatic local-SEO play
("Delta dentists near UCLA for UC SHIP students"). This is exactly the pattern the
knowledge-graph memo (§6, §8) warns can become **thin programmatic pages**.

**How to avoid thin pages (mandatory for the leaves):**
1. **Render from real data, not a template string.** Each leaf must show the *actual*
   ranked in-network dentist list for that campus's lat/lng (reuse the uc-students
   `fetchNear` + `rankScore` logic), not a stock paragraph with the campus name swapped.
   A leaf with zero live results within radius should **noindex** until it has data,
   not publish an empty shell.
2. **Inject campus-unique facts** — campus coordinates, the named nearby cities/
   neighborhoods, count of Delta-friendly offices within 2 / 5 mi (this is precisely
   what the **data study** computes — make the leaf *consume* the study's numbers so
   each page carries a unique, sourced statistic).
3. **Unique answer + FAQ per campus** (commute/parking/area context), not a duplicated
   block. Differentiate UCSF (health-sciences, no undergrads) and UC Merced (sparse
   network) honestly rather than pretending parity.
4. **Wire the leaf back:** breadcrumb `Home / … / Delta Dental / UC Students / {Campus}`
   + the canonical sub-nav + a link up to the uc-students finder and to Premium
   `#nominate`. (U1 §6 risk 3 flags the same orphan exposure.)
5. **Provenance per stat** (knowledge-graph R7): "X Delta offices within 2 mi, verified
   {date}" with a source, so the leaves are auditable and not drift-prone.

### 2b. The data study — `/uc-dental-access/` — **also not on disk**

Linked once (from uc-students "Keep exploring" grid, "Dentist access by UC campus:
in-network Delta offices within 2 and 5 miles of every UC"). **File does not exist —
broken link.**

**Its role:** the *non-thin* anchor for the whole campus cluster. A single, genuinely
unique editorial/data asset (10-row comparison of Delta access by campus) that:
- earns links/citations on its own (link-bait, AI-answerable: "which UC has the best
  dentist access");
- **feeds the campus leaves their unique statistic** (the 2mi/5mi counts), which is the
  cleanest defense against thin leaves — the study makes the programmatic pages legitimate;
- sits as a T5 child of uc-students with a proper breadcrumb + schema (Dataset/Article).

Without the study, the 10 leaves have no differentiated data source and *will* read as
thin. **Build order: data study first, then leaves consume it.**

---

## 3. COMPARE — `/compare/` · "Is Delta good?" (Decision Desk)

| Field | Value |
|---|---|
| **Purpose** | Win the high-intent comparison query and resolve it *in Delta's favor on Delta's terms* by locking Delta as the fixed baseline and letting the user pit it against 5 rivals. The "consideration-stage" sibling to the gateway. |
| **Audience** | Active shoppers evaluating Delta vs another carrier; the most commercially valuable visitor of the three sub-hubs. |
| **Search intent** | "is Delta Dental good insurance", "Delta Dental vs UnitedHealthcare / Guardian / Ameritas / Humana / Mutual of Omaha", "is Delta PPO worth it". Commercial-investigation. (Keywords meta is explicit.) |
| **What it compares** | **Delta PPO Premium (locked baseline) vs 5 individual carrier plans** — UHC Primary Dental, Ameritas PrimeStar Complete, Guardian Premier 2.0, Mutual of Omaha Dental Preferred, Humana Extend 5000. Axes: monthly, annual max, deductible, activation, per-category coverage % + **waiting-period timeline**, and a "watch for" caution. It does **not** compare Delta's own tiers (there is only Premium — no Basic), so it is *cross-carrier*, not intra-Delta. |
| **Unique value** | The interactive head-to-head selector (`pick()` swaps the right panel; Delta fixed left) + the **waiting-period timeline** visual, which is the honest differentiator the knowledge-graph memo prizes (R2/R3: "no wait" ≠ day-one; effective date ≠ wait). It also embeds an **Over-65/SCAN callout** routing seniors out — good cross-linking. |
| **Content depth** | Rich (977-line page): answer block, card grid, dual deep-dive panels with coverage rows + timeline + caution, SCAN callout, pre-filled nomination engine. |
| **Gateway / hub linkage** | → Premium (sub-nav "Premium Plan", and "Find PPO Dentists" → `premium/#dentists`), → Over-65 ("See the SCAN Delta benefit"), → Hub (sub-nav "Delta Hub"). Has its own inline `#nominate` engine that funnels to the gateway's conversion pattern. |

### Compare's breadcrumb / schema gap (confirmed, must fix)

- **No visible breadcrumb.** Compare has only the eyebrow "The PPO Decision Desk ·
  Delta Dental vs." — every sibling (hub, premium, over-65, uc-students) renders a
  crumb; Compare does not. It is reachable but **not self-locating**.
- **No `BreadcrumbList` JSON-LD.** Its only structured data is `FAQPage`. Every other
  node ships a full 5-level BreadcrumbList; Compare is the lone gap. This is an SEO
  defect on the *highest-commercial-intent page* in the cluster.
- **Mega-nav still a placeholder** ("YOUR MEGA NAV") — same as Over-65; the brand mark
  may not link home. (U1 §6 risks 4 & 6 corroborate.)
- **Fix:** add `Home / Dental Insurance / PPO Plans / Delta Dental / Compare` as both a
  visible crumb and a `BreadcrumbList` graph node, and ship the real graphite mega-nav.

---

## 4. Cross-cutting linkage back to gateway + hub

| Sub-hub | → Premium (gateway) | → Hub | Conversion endpoint |
|---|---|---|---|
| Over-65 | `#nominate` (find & book), Related card, FAQ | sub-nav "Delta Hub" | Premium `#nominate` |
| UC-Students | post-grad Premium link | Related card + footer | own verify/nominate modal → gateway pattern |
| Compare | sub-nav + `premium/#dentists` | sub-nav "Delta Hub" | own inline `#nominate` |

Consistent with U1's movement contract: every sub-hub reaches the gateway laterally
(sub-nav "Premium Plan") and up to the hub (sub-nav "Delta Hub"), and Premium owns the
true conversion surface. Two structural nav defects (from U1, still relevant here):
UC-Students uses a *different, reduced* sub-nav (Set B) that omits Over-65/Find-a-Dentist,
and the main sub-nav (Set A) omits UC-Students — so the two audience hubs are not
co-navigable.

---

## 5. Thin / duplicate / missing — disk-verified flags

| Severity | Issue |
|---|---|
| 🔴 **Missing** | **10 campus leaves** `/students/{campus}/` do not exist. Linked from BOTH hub index and uc-students = **20 broken-link instances, all 404.** |
| 🔴 **Missing** | **Data study** `/uc-dental-access/` does not exist. Linked from uc-students. The asset that would *prevent* the leaves from being thin is itself absent — build it FIRST. |
| 🔴 **Schema gap** | **Compare has no breadcrumb (UI) and no `BreadcrumbList` schema** — the only node missing both; it's the highest-intent page. |
| 🟠 **Duplicate** | The **"By UC campus" grid is duplicated verbatim** on the hub index and on uc-students (same 10 cards, same copy). Acceptable as a hub dispatcher, but ensure the leaves themselves aren't equally duplicated when built (§2a). |
| 🟠 **Nav inconsistency** | UC-Students sub-nav (Set B, 4 labels, no right rail) ≠ all other pages' sub-nav (Set A, 6 labels). UC-Students absent from Set A; Over-65 absent from Set B. |
| 🟠 **Placeholder live** | Mega-nav placeholder still shipped on **Compare** and **Over-65** (hub/premium use the real graphite bar). |
| 🟡 **Crumb shorthand** | Over-65 & UC-Students render a 3-level *visible* crumb (collapsing "Dental Insurance / PPO Plans") while schema is full 5-level. Cosmetic but inconsistent. |
| 🟡 **Anchor drift** | "Find PPO Dentists" resolves to 3 different targets (`#dentists`, `premium/#dentists`, local `#find`) across pages. |

No "PPO Basic" anywhere — correct. Jade scheme and `body ≠ CTA` upheld on all five
files (CTAs are jade/dark buttons; body prose is `--ink`/`--muted`).

---

## Summary (~150 words)

The three Delta sub-hubs are sound *audience on-ramps* that each capture a query the
Premium gateway can't and funnel back into it. **Over-65** is the strongest as built:
it uniquely models DeltaCare-USA-HMO vs the optional PPO buy-up for SCAN seniors in CA/WA,
is well-disclaimed against Medicare-affiliation risk, and honestly tells most seniors not
to double-buy — routing instead to Premium `#nominate`. **Compare** is content-rich and
commercially the most valuable, but ships with **no breadcrumb and no `BreadcrumbList`
schema** — a real SEO defect on the highest-intent page. **UC-Students** has a strong live
campus-map finder, but its entire child cluster — **10 campus leaves and the `uc-dental-access`
data study — does not exist on disk**, making ~20 hub/sub-hub links into 404s. The data
study is the asset that would keep the leaves from being thin programmatic pages, so it
must be built first and feed each leaf a unique, sourced 2mi/5mi access statistic.

## Top 3 recommendations

1. **Build `uc-dental-access` (data study) FIRST, then the 10 campus leaves that consume
   it.** The study's per-campus 2mi/5mi Delta-office counts give each leaf a unique, sourced
   statistic; render leaves from the live `fetchNear`/`rankScore` data (noindex zero-result
   campuses) so the programmatic pages are legitimate, not thin. This clears ~20 current 404s.
2. **Fix Compare's self-location:** add a visible `Home / … / Delta Dental / Compare` crumb +
   a `BreadcrumbList` JSON-LD node, and ship the real mega-nav (drop the placeholder, also on
   Over-65). It's the highest-commercial-intent page and currently the only one that can't
   locate itself.
3. **Unify the sub-nav across all five+ pages** (canonical ≤8-label set incl. UC Students),
   so the two audience hubs are co-navigable and every sub-hub reaches the Premium gateway and
   the Hub laterally — and preserve Over-65's Medicare disclaimers and SCAN-vs-DentaQuest state
   split untouched.
