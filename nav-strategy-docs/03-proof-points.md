# Mega Nav Proof Points — Real, Queryable Numbers Only

**Constraint:** Every number must be live-queryable from Supabase or the repo. No invented stats, no savings claims, no ratings as headline numbers. Numbers below are real as of 26 Jun 2026 and must be regenerated at each build, not hardcoded loosely.

**Style:** No arrows, no "guaranteed," no "save," no "best." Plain factual nouns. Round down to a clean floor (e.g. 7,042 reads as "over 7,000") so the panel stays true between builds.

---

### Panel 1 — Find a Dentist
**Proof point:** "Over 7,000 PPO dental offices listed across 850 cities."
**Source:** `SELECT COUNT(*) FROM dentists;` = 7,042. `SELECT COUNT(DISTINCT lower(trim(city))) FROM dentists WHERE city <> '';` = 853.
**Fallback (count unavailable):** "PPO dental offices listed in cities nationwide."

### Panel 2 — Compare PPO Plans
**Proof point:** "Plans from 8 national PPO carriers, side by side."
**Source:** `SELECT COUNT(DISTINCT carrier) FROM ppo_plans;` = 8 (Aetna, Ameritas, Delta Dental, Guardian, Humana, MetLife, Mutual of Omaha, UnitedHealthcare).
**Do NOT show:** "Average savings $1,240" or any savings figure. Not queryable, not verifiable. Omit entirely.
**Fallback:** "Compare PPO plans from major national carriers."

### Panel 3 — Coverage / Networks
**Proof point:** "102 PPO networks accepted across listed offices."
**Source:** `SELECT COUNT(DISTINCT net) FROM dentists d, unnest(d.insurance_networks) net WHERE net <> '';` = 102.
**Fallback:** "Major PPO networks accepted at listed offices."

### Panel 4 — Locations / Search
**Proof point:** "Over 8,800 searchable locations across 14 states."
**Source:** `SELECT COUNT(*) FROM search_locations;` = 8,822. `SELECT COUNT(DISTINCT state) FROM dentists WHERE state <> '';` = 14.
**Fallback:** "Searchable locations across multiple states."

### Panel 5 — Learn / Guides & Glossary
**Proof point:** "23 plain-language insurance terms explained, plus 9 cost guides."
**Source:** repo file count — `guides/glossary/*/` = 23 terms; `guides/*.html` = 9 articles. Queryable from the filesystem at build time.
**Fallback:** "Plain-language guides to PPO terms and dental costs."

---

### Rules for the developer
1. Compute each number in `generate-plans.js` at build time and inject into the nav template. Never let two panels drift out of sync with the data.
2. Round to a stable floor ("over 7,000," "850," "8,800"). Re-verify the floor each build so reality never falls below the claim.
3. If any query returns zero or errors, render the non-numeric fallback string, not a stale number.
4. Banned in this nav: average savings, percentage saved, star ratings as headline figures, "guaranteed," "best," "cheapest," any arrow glyph.
5. The only ratings-derived data (6,974 rated offices) stays out of the nav; ratings belong on profile pages, not as a marketing count.
