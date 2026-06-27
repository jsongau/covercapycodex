# 17 — Canonical & URL Strategy: Hub + PPO Carrier Cluster

Analysis/spec only. Premiums frozen. No routes renamed here, recommendations + redirects only.
Grounded against on-disk files under `dental-insurance/ppo-plans/`, the live hub
`compare-ppo-dental-plans.html`, and `vercel.json`.

---

## 1. The decisive fact: the ZIP memo is describing a stale state

The ZIP improvement doc (`_zip-21jun/.../02-url-canonicalization.md`) assumes carrier
**canonicals are NESTED** (`/ppo-plans/humana/extend-5000/`) and the DB slug is flat.
That is NOT what is on disk today. The ACTUAL live state is the inverse:

| Layer | What the ZIP memo claims | What is ACTUALLY on disk (verified) |
|---|---|---|
| On-disk route | flat `.html` preview | flat folder: `ppo-plans/humana-extend-5000/index.html` |
| Carrier canonical tag | nested `/humana/extend-5000/` | **flat, NO trailing slash**: `/dental-insurance/ppo-plans/humana-extend-5000` |
| og:url | (undefined) | flat, NO trailing slash (matches canonical) |

So the conflict to resolve is NOT "flat files vs nested canonicals." The carrier pages are
already internally self-consistent (canonical == og:url == folder name). The real conflicts
are (a) **trailing-slash drift** between canonicals and the links pointing at them, (b) one
genuinely **nested outlier** (`delta-dental/`), (c) the **live hub** using a different slug
than its filename, and (d) **stale `.html` internal links**.

**Do NOT adopt the ZIP's nested scheme.** It would force renaming 6 live folders and
rewriting every canonical. The lowest-churn, already-90%-true target is FLAT.

---

## 2. RECOMMENDED canonical scheme (ONE scheme, everything conforms to it)

- **Flat slugs** — `/dental-insurance/ppo-plans/{carrier-plan}/` (do not nest carrier/plan).
- **Trailing slash ON** for all directory-style routes (hub, carrier pages, compare hub).
- **`www.` host**, **`https`** forced.
- One redirect hop max.

### Critical config note (USER MUST CONFIRM IN VERCEL)
`vercel.json` currently sets:
```json
"cleanUrls": true,
"trailingSlash": false
```
`trailingSlash: false` **directly contradicts** a trailing-slash canonical target. With this
setting Vercel will 301 `/ppo-plans/humana-extend-5000/` → the slashless form, fighting any
canonical that ends in `/`. Two coherent ways forward — the user controls which:

- **Option A (recommended, least churn): adopt NO-trailing-slash as canonical.**
  Keep `trailingSlash: false`. The 6 carrier canonicals ALREADY have no slash, so they need
  zero change. Only the *links* (which use trailing slashes) and the two trailing-slash hubs
  must change. This is the smaller diff.
- **Option B: flip to `"trailingSlash": true`.** Then every carrier canonical AND og:url must
  gain a slash, plus the live compare hub stays as-is. Larger diff, touches all 8 pages.

This memo specs **Option A (flat, no trailing slash, www, https)** as the target because it
matches the existing canonicals and `vercel.json` as shipped. Flag for user: confirm whether
they prefer slash-on; if so switch to Option B and invert the slash fixes below.

---

## 3. Every place the live hub + 6 carrier pages currently DISAGREE

### A. Hub identity conflict (live hub vs ppo-plans/index.html)
There are **two competing hubs**:
- `compare-ppo-dental-plans.html` — canonical `…/compare-ppo-dental-plans/` (WITH slash)
- `dental-insurance/ppo-plans/index.html` — canonical `…/dental-insurance/ppo-plans` (NO slash)

These are two different URLs both acting as the PPO plans hub. **Decision needed:** pick ONE
canonical hub. `vercel.json` already 301s `/ppo-plans` and `/ppo-dental-plans` →
`compare-ppo-dental-plans.html`, signaling `compare-ppo-dental-plans` is the intended public
hub. Recommend: **`/compare-ppo-dental-plans` is the canonical hub**; make
`/dental-insurance/ppo-plans/` either 301 to it OR keep it as a distinct directory landing
that canonicalizes to itself (not both). Today it canonicalizes to itself AND the live hub
canonicalizes to a slash variant — inconsistent slash policy across the two hubs.

### B. Trailing-slash drift: canonicals vs the links that point to them
- All 6 carrier **canonicals** end with NO slash (`…/humana-extend-5000`).
- BUT the hub cards, the carrier-to-carrier rail, and the compare hub all link **WITH a
  trailing slash** (`href="/dental-insurance/ppo-plans/humana-extend-5000/"`).
- Result: every internal link lands on a URL that does not string-match the canonical, and
  with `trailingSlash:false` Vercel 301-redirects the link target back to the slashless
  canonical — a wasted hop on every internal click and crawl.
- **Fix (Option A):** strip the trailing slash from all carrier links so link == canonical.

### C. The live compare hub's own slash inconsistency
`compare-ppo-dental-plans.html` declares canonical/og:url **WITH** slash
(`…/compare-ppo-dental-plans/`) but `vercel.json` `trailingSlash:false` will 301 that slash
away. Its own internal anchors mix forms: `/compare-ppo-dental-plans#faq` (no slash) and
`/compare-ppo-dental-plans/#shelf` (slash). **Fix:** pick one; under Option A drop the slash
in canonical, og:url, and the `#shelf` anchor.

### D. The nested Delta outlier
`ppo-plans/delta-dental/index.html` canonical = `…/ppo-plans/delta-dental/` (WITH slash,
and it is a nested directory with children: `delta-dental/premium/`, `/over-65/`,
`/uc-students/`, `/compare/`). This is the ONE genuinely nested carrier and the ONE carrier
whose canonical carries a slash. It disagrees in slash policy with the other 5 flat carriers.
Also present: a stray `dd.html` (144KB) and `ppo-plans/dd.html` duplicate-content risk.
**Fix:** decide if Delta is a flat leaf like the others or a sub-cluster hub. If sub-cluster,
it is the exception that legitimately keeps a trailing slash (it IS a directory); document
that explicitly so it is not "fixed" by mistake. 301 the orphan `dd.html` files.

### E. Stale `.html` internal links inside carrier pages
Carrier bodies link to `/compare-ppo-dental-plans.html`, `/ppodentists.html`,
`/dental-financing-monthly-payments.html` (raw `.html`). With `cleanUrls:true` these resolve
but are non-canonical alias forms; `/ppodentists.html` is already 301'd in `vercel.json`,
so those links eat a redirect hop. **Fix:** rewrite carrier internal links to extensionless
clean paths (`/compare-ppo-dental-plans`, `/find-my-dentist`).

### F. og:url
All 6 carrier og:url tags match their canonical (good — both flat, no slash). The live hub
og:url has the slash (matches its own canonical but not the target scheme under Option A).
No carrier-level og:url conflict; only the hub's slash needs aligning.

---

## 4. Redirects to add (do NOT rename routes — redirect instead)

User controls `vercel.json`. Confirm + add:
- Hub dedupe: 301 `/dental-insurance/ppo-plans` ↔ chosen canonical hub (one direction only).
- Slash normalization is already handled globally by `trailingSlash:false` (Option A) — no
  per-route slash redirects needed once links are stripped of slashes.
- Delta orphans: 301 `/dental-insurance/ppo-plans/dd.html` and `/dental-insurance/dd.html`
  (if reachable) → the chosen Delta canonical.
- Confirm host normalization (apex `covercapy.com` → `www`) and `http→https` are enforced at
  the Vercel/domain level — these are NOT in `vercel.json` and must be verified in the Vercel
  dashboard (Domains → redirect to primary). FLAG: cannot be confirmed from the repo.

---

## 5. Must-confirm checklist (user-controlled, outside the HTML)
- [ ] `trailingSlash` policy: keep `false` (Option A) or flip to `true` (Option B)?
- [ ] Which hub is canonical: `/compare-ppo-dental-plans` vs `/dental-insurance/ppo-plans/`?
- [ ] Is Delta a flat leaf or a legitimate nested sub-cluster (keeps its slash)?
- [ ] Apex→www and http→https enforced in Vercel Domains settings (not in repo)?
- [ ] DB `ppo_plans.plan_page` values — verify they match chosen flat scheme (ZIP memo's SQL
      assumed nested; do NOT run it as written, it would point the DB at non-existent routes).
