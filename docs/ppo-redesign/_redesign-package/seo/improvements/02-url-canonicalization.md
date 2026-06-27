# 02 — URL Structure & Canonicalization (PPO Plan Pages)

## Current state & the three-way mismatch

A single plan is currently addressed by three different URL strings, and nothing reconciles them:

| Layer | Pattern | Example (UHC) |
|---|---|---|
| **Canonical tag** (in HTML `<head>`) | **Nested**, trailing slash | `https://www.covercapy.com/dental-insurance/ppo-plans/uhc/primary-dental/` |
| **Supabase `ppo_plans.plan_page`** | **Flat**, no trailing slash | `/dental-insurance/ppo-plans/uhc-primary-dental` |
| **Local preview filename** | **Flat `.html`** | `uhc-primary-dental.html` |

The DB also carries other flat slugs that don't match their canonicals: `/dental-insurance/ppo-plans/ameritas-primestar`, `/guardian-premier-ppo`, `/mutual-of-omaha-dental`. Internal links in the page bodies point at the local flat filenames (e.g. `href="aetna-dental-direct.html"`, `href="index.html"`), so **the links a crawler follows never match the canonical they land on.**

**The duplicate Delta problem:** two files exist — `delta-ppo-premium.html` (old editorial) and `delta-ppo-premium-healthcare.html` (new) — and **both declare the identical canonical** `…/delta/ppo-premium/`. That is two indexable documents competing for one canonical: textbook duplicate content.

Trailing-slash behavior, `http→https`, and apex→`www` normalization are not yet defined anywhere.

**Score: 6.0/10 → Target: 9.0/10**

## Why it matters

- **Duplicate content:** two Delta files (and any flat/nested alias that resolves) split signals across URLs Google must dedupe for you — unpredictably.
- **Canonical dilution:** when internal links, the DB slug, and the canonical disagree, Google may pick a *different* canonical than you declared, stranding your authority on the wrong URL.
- **Crawl waste:** every alias and slash variant is a separate URL the crawler fetches, spending budget on duplicates instead of the 9 real pages.
- **Lost link equity:** internal links to non-canonical aliases pass equity through a 301 hop (or to a URL that gets canonicalized away), leaking value.

## Specific fixes

**1. Commit to ONE pattern — nested, trailing slash.**
`https://www.covercapy.com/dental-insurance/ppo-plans/{carrier}/{plan}/`
This is the pattern the canonicals already use, so it's the lowest-churn choice. It also builds a clean **topical cluster** — `…/ppo-plans/{carrier}/` becomes a natural carrier hub ("other plans by this carrier", doc 07), and the path hierarchy mirrors the breadcrumb. Flat slugs can't express that nesting. **Trailing slash = canonical**; the slashless variant 301s to it.

**2. Reconcile every plan — update `ppo_plans.plan_page` to the canonical path.**

| Carrier / Plan | DB `plan_page` (current) | Final canonical route |
|---|---|---|
| UHC Primary Dental | `/dental-insurance/ppo-plans/uhc-primary-dental` | `/dental-insurance/ppo-plans/uhc/primary-dental/` |
| Aetna Dental Direct | *(verify)* | `/dental-insurance/ppo-plans/aetna/dental-direct/` |
| Ameritas PrimeStar Care Complete | `/dental-insurance/ppo-plans/ameritas-primestar` | `/dental-insurance/ppo-plans/ameritas/primestar-care-complete/` |
| Guardian Premier 2.0 | `/dental-insurance/ppo-plans/guardian-premier-ppo` | `/dental-insurance/ppo-plans/guardian/premier-2-0/` |
| Humana Extend 5000 | *(verify)* | `/dental-insurance/ppo-plans/humana/extend-5000/` |
| MetLife NCD Complete *(noindex)* | *(verify)* | `/dental-insurance/ppo-plans/metlife/ncd-complete/` |
| Mutual of Omaha Dental Preferred | `/dental-insurance/ppo-plans/mutual-of-omaha-dental` | `/dental-insurance/ppo-plans/mutual-of-omaha/dental-preferred/` |
| Delta Dental PPO Premium | *(verify)* | `/dental-insurance/ppo-plans/delta/ppo-premium/` |
| **Hub** | `/dental-insurance/ppo-plans` | `/dental-insurance/ppo-plans/` |

SQL (run after confirming each current value):

```sql
update ppo_plans set plan_page = '/dental-insurance/ppo-plans/uhc/primary-dental/'              where slug = 'uhc-primary-dental';
update ppo_plans set plan_page = '/dental-insurance/ppo-plans/aetna/dental-direct/'             where slug = 'aetna-dental-direct';
update ppo_plans set plan_page = '/dental-insurance/ppo-plans/ameritas/primestar-care-complete/' where slug = 'ameritas-primestar-care-complete';
update ppo_plans set plan_page = '/dental-insurance/ppo-plans/guardian/premier-2-0/'            where slug = 'guardian-premier-2-0';
update ppo_plans set plan_page = '/dental-insurance/ppo-plans/humana/extend-5000/'              where slug = 'humana-extend-5000';
update ppo_plans set plan_page = '/dental-insurance/ppo-plans/metlife/ncd-complete/'            where slug = 'metlife-ncd-complete';
update ppo_plans set plan_page = '/dental-insurance/ppo-plans/mutual-of-omaha/dental-preferred/' where slug = 'mutual-of-omaha-dental-preferred';
update ppo_plans set plan_page = '/dental-insurance/ppo-plans/delta/ppo-premium/'               where slug = 'delta-ppo-premium';
```
> Confirm the real `slug`/primary-key column and the current `plan_page` values with a `select` before updating. After this, `ppo_plans.plan_page` is the single source of truth for routing AND canonicals.

**3. Resolve the two Delta files.** Pick `delta-ppo-premium-healthcare.html` (the current design system) as the one page served at `/delta/ppo-premium/`. Retire `delta-ppo-premium.html` and **301 it** to that canonical. Never ship two files that emit the same canonical.

**4. Normalization rules — one host, 301 everything else.**
- Force `https` (301 all `http`).
- Force `www` (301 apex `covercapy.com` → `www.covercapy.com`).
- Force trailing slash on these directory-style routes (301 the slashless form).
- One redirect hop max — chain `http`/apex/slash into a single final 301, no `http → https → www → slash` ladders.

**5. Regenerate all internal links from the DB.** Nav, breadcrumb, "alternatives"/comparison rail, and hub cards must emit `ppo_plans.plan_page` verbatim — not the flat `.html` filenames they use today. This makes drift structurally impossible: links can only point where the DB says.

**6. Self-referencing canonicals.** Every plan page's canonical = its own final route (already true). Keep it that way after the route change so each page vouches for itself.

**7. Breadcrumb URLs match canonical.** The `BreadcrumbList` schema and visible breadcrumb must use the same nested, trailing-slash URLs (`…/ppo-plans/` → `…/ppo-plans/{carrier}/` → leaf), not flat aliases.

## Implementation notes

- Update DB slugs first (fix #2), then regenerate internal links from `plan_page` (fix #5) — order matters so links can't be built from stale values.
- Ship a **301 map** covering: the old Delta file, any flat slug currently live, apex, `http`, and slashless variants.
- Have the build/SSR layer read `plan_page` for routing, the canonical tag, internal links, and breadcrumb schema — one field, four consumers, zero drift.

## Priority & effort

**Priority: P0** (foundational — title/meta/schema fixes all reference these URLs). **Effort: Medium** — DB updates are trivial; the work is the 301 map and rewiring link generation to read from the DB.

## Acceptance criteria

- [ ] **One URL pattern everywhere** — nested `…/ppo-plans/{carrier}/{plan}/` with trailing slash.
- [ ] `ppo_plans.plan_page` == canonical tag == every internal link, for all 8 plans + hub.
- [ ] **No duplicate Delta** — one file served; the other 301s to the canonical.
- [ ] **301s in place** for `http→https`, apex→`www`, slashless→slash, and all retired aliases (one hop each).
- [ ] **Self-referencing canonical** on every page; breadcrumb URLs match it.
- [ ] Internal links (nav, breadcrumb, alternatives rail, hub) emit `plan_page` from the DB — no hardcoded `.html` filenames.
