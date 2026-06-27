# Dental 404 Investigation — Missing City Hub Pages
## 01 — Inventory & Git History (read-only forensic pass)

**Date:** 2026-06-26
**Repo:** covercapycodex ultimate 21JUN26 (git: jsongau/covercapycodex)
**HEAD at investigation:** 27dea867a "edit: NCD page ..."
**Scope:** city-level hub pages at `dental/{state}/{metro}/{city}/index.html` returning 404 on live site.

---

## VERDICT (read this first)

The 360 missing city-hub `index.html` files were **NEVER GENERATED / NEVER COMMITTED**.
They are **NOT recoverable from any git commit** — there is nothing to restore. They must be **re-generated** by the build script (`seo-build/generate-plans.js`).

Evidence:
- All 360 missing hubs are **absent from the HEAD tree** (`git ls-tree -r HEAD` does not list them; `git cat-file -t HEAD:<path>` returns "Not a valid object name").
- All 360 have **0 commits in the entire repo history** across **all** branches/refs (`git rev-list --all --count -- <path>` = 0; `git log --all -- <path>` = empty).
- They are **not referenced in the dental sitemap** (`dental/sitemap-dental.xml`, 700 URLs) — 0 of 360 present — whereas working hubs (e.g. hempstead) ARE in the sitemap. This corroborates "never produced," not "deleted."

The suspect commits (`1aeb3a2b8`, `cc85a11a2`, `b29fddc2b`) are a **RED HERRING** for these hubs. They added/removed only T5 dentist PROFILE pages (depth-4) and never touched these 360 city-hub paths. See "Git Archaeology" below.

**No data is lost:** the dentist-profile pages INSIDE every missing city folder DO exist and ARE committed in HEAD (verified blobs). Only the city-hub landing page is missing.

---

## 1. INVENTORY

- Total depth-3 city directories (`dental/STATE/METRO/CITY`): **923**
- City directories **missing** their own `index.html`: **360**
- City directories WITH `index.html` (working): 563

Command used:
```
for d in $(find dental -mindepth 3 -maxdepth 3 -type d); do [ -f "$d/index.html" ] || echo "$d"; done
```

---

## 2. CLASSIFICATION

| Class | Definition | Count |
|-------|-----------|-------|
| (a) Doubled-slug principal city | CITY == METRO (e.g. `san-diego/san-diego`) | **71** |
| (b) Ordinary city | CITY != METRO | **289** |
| **Total** | | **360** |

Both classes share the SAME root cause (never generated). Doubled-slug is just the most visible symptom (every metro's principal/anchor city is affected).

---

## 3. GROUPED COUNTS

### By state (all 360)
```
     59 california
     49 new-york
     43 ohio
     37 pennsylvania
     35 new-jersey
     25 connecticut
     21 arizona
     19 nevada
     18 washington
     16 rhode-island
     16 florida
     14 texas
      6 nv
      1 north-carolina
      1 illinois

```

### Doubled-slug (71) by state
```
     13 pennsylvania
     12 texas
      8 washington
      6 florida
      5 new-york
      5 connecticut
      5 california
      4 rhode-island
      4 new-jersey
      3 ohio
      2 nevada
      2 arizona
      1 nv
      1 illinois
```

### Ordinary (289) by state
```
     54 california
     44 new-york
     40 ohio
     31 new-jersey
     24 pennsylvania
     20 connecticut
     19 arizona
     17 nevada
     12 rhode-island
     10 washington
     10 florida
      5 nv
      2 texas
      1 north-carolina
```

### Top affected metros
```
     29 california/los-angeles
     21 ohio/cleveland
     18 new-york/long-island
     13 ohio/columbus
     11 pennsylvania/philadelphia
      9 ohio/cincinnati
      8 new-jersey/middlesex-county
      7 new-jersey/jersey-shore
      7 connecticut/hartford
      7 arizona/northern-arizona
      6 nv/las-vegas
      6 new-york/buffalo
      6 nevada/reno
      6 nevada/northeastern-nevada
      6 nevada/las-vegas
      5 rhode-island/woonsocket
      5 rhode-island/newport
      5 new-jersey/union-county
      5 connecticut/new-haven
      5 california/orange-county
      5 california/central-valley
      5 california/bay-area
      5 arizona/southern-arizona
      4 pennsylvania/williamsport
      4 pennsylvania/pittsburgh
      4 new-york/rochester
      4 new-york/new-york-city
      4 new-jersey/south-jersey
      4 new-jersey/newark
      4 connecticut/waterbury
```

**Generator clue — `nv` vs `nevada` state-slug split:** the build emitted some Nevada cities under `dental/nv/...` and others under `dental/nevada/...`. The 6 `dental/nv/las-vegas/*` missing hubs (overton, laughlin, las-vegas, blue-diamond, bunkerville, logandale) sit under the abbreviated slug. This inconsistent state-slug normalization in the generator is a strong indicator the hub-emit step has slug/key-matching gaps that cause it to skip hub creation for certain metro/city keys.

---

## 4. GIT ARCHAEOLOGY

### Suspect commits (all confirmed present in history)
| Short | Full | Subject | Effect |
|-------|------|---------|--------|
| 1aeb3a2b8 | 1aeb3a2b8fa2ab79314389d71abc9d157eb81676 | "clean rebuild dedupe" | **Deleted 13,066 files** (13,066 `D`, 20 `M`) — all T5 PROFILE pages |
| cc85a11a2 | cc85a11a214319d99431ba52ce534b800ee85fd7 | "restore all 13,017 T5 dentist profile pages deleted by 1aeb3a2b8" | **Added 13,066 files** (13,066 `A`): 13,017 depth-4 profiles + 40 depth-3 hubs + misc |
| b29fddc2b | b29fddc2bfa9bd0bb754892bec0a72366563e58f | "dedupe remove 2,370 hashed-twin dentist pages" | removed hashed-twin PROFILE pages |

### Did the restore (cc85a11a2) omit city-hub pages?
Not relevant to these 360. `cc85a11a2` was a faithful re-add of exactly what `1aeb3a2b8` deleted (same 13,066 paths). It restored 40 city hubs (only those that 1aeb3a2b8 had deleted) plus 13,017 profiles. **None of the 360 missing hubs were among the files 1aeb3a2b8 deleted**, so there was nothing for cc85a11a2 to restore. The delete/restore cycle never involved these paths.

### Representative sample (12 REAL missing hubs — 6 doubled, 6 ordinary, multiple states)
```
[DOUBLED] all-commits=0  NOT-in-HEAD  profiles_inside=347  dental/illinois/chicago/chicago
[DOUBLED] all-commits=0  NOT-in-HEAD  profiles_inside=42   dental/washington/seattle/seattle
[DOUBLED] all-commits=0  NOT-in-HEAD  profiles_inside=32   dental/washington/olympia/olympia
[DOUBLED] all-commits=0  NOT-in-HEAD  profiles_inside=38   dental/washington/tacoma/tacoma
[DOUBLED] all-commits=0  NOT-in-HEAD  profiles_inside=36   dental/washington/vancouver/vancouver
[DOUBLED] all-commits=0  NOT-in-HEAD  profiles_inside=36   dental/washington/yakima/yakima
[ordinary] all-commits=0 NOT-in-HEAD  profiles_inside=2    dental/north-carolina/western-north-carolina/arden
[ordinary] all-commits=0 NOT-in-HEAD  profiles_inside=2    dental/washington/kitsap/port-orchard
[ordinary] all-commits=0 NOT-in-HEAD  profiles_inside=2    dental/washington/kitsap/silverdale
[ordinary] all-commits=0 NOT-in-HEAD  profiles_inside=2    dental/washington/olympia/tumwater
[ordinary] all-commits=0 NOT-in-HEAD  profiles_inside=2    dental/washington/south-king-county/covington
[ordinary] all-commits=0 NOT-in-HEAD  profiles_inside=2    dental/washington/south-king-county/maple-valley
```
Every sampled missing hub: `git rev-list --all --count -- <path>/index.html` = **0** and `git cat-file -t HEAD:<path>/index.html` = "Not a valid object name". They never existed in git.

**Methodological note:** an initial sample mistakenly tested hubs that are NOT missing (hempstead, edison, flagstaff) — those DO exist on disk and in HEAD with full history (added in `f04242eef` "Add all metro hubs and city pages"). They were excluded once cross-checked against the missing list. This confirms the generator successfully emitted MOST city hubs historically; the 360 are the ones it has consistently skipped.

---

## 5. PROFILE PAGES INSIDE MISSING HUBS — INTACT

For all 360 missing hubs: dentist-profile subfolders exist and contain `index.html`.
- 360 / 360 missing hubs contain at least one profile page.
- 0 / 360 are empty.
- Sampled profiles are committed blobs in HEAD (e.g. `dental/illinois/chicago/chicago/dental-town-lawrence/index.html`, `dental/washington/seattle/seattle/omni-dental-belltown-...-hms048/index.html`).
- Example: `dental/california/san-diego/san-diego/` contains 278 profile pages — none lost.

**No profile/dentist data is at risk.** This is purely a missing landing/hub page problem.

---

## 6. DELETED vs NEVER GENERATED — FINAL ANSWER

**NEVER GENERATED.** All 360 city-hub `index.html` files:
- have 0 commits in `--all` history,
- are absent from the HEAD tree,
- are absent from the dental sitemap,
- have NO deletion record in any commit (including the suspect commits).

### Is a git restore possible?
**No.** There is no commit, branch, tag, stash, or reflog entry containing any of these files. `git checkout <ref> -- <path>` cannot work because no `<ref>` holds the blob. The standard recovery wording does NOT apply here.

### Correct remediation (do NOT execute — for the fix phase)
Re-run the generator so it emits the missing T4c city hubs:
```
cd "<repo root>"
node seo-build/generate-plans.js --hubs        # or full build
```
Then `git add -A && git commit && git push` (Vercel auto-deploys). The generator's hub-emit logic should also be inspected for:
1. the `nv` vs `nevada` state-slug normalization split, and
2. why principal/anchor cities where `citySlug == metroSlug` (71 doubled cases) are skipped — likely a de-dupe guard that treats the city as identical to the metro hub and suppresses one of them.

---

## APPENDIX A — FULL MISSING LIST (360), DOUBLED-SLUG (71)
```
dental/arizona/phoenix/phoenix
dental/arizona/scottsdale/scottsdale
dental/california/los-angeles/los-angeles
dental/california/riverside/riverside
dental/california/sacramento/sacramento
dental/california/san-bernardino/san-bernardino
dental/california/san-diego/san-diego
dental/connecticut/hartford/hartford
dental/connecticut/new-haven/new-haven
dental/connecticut/new-london/new-london
dental/connecticut/norwich/norwich
dental/connecticut/waterbury/waterbury
dental/florida/daytona-beach/daytona-beach
dental/florida/fort-lauderdale/fort-lauderdale
dental/florida/jacksonville/jacksonville
dental/florida/miami/miami
dental/florida/orlando/orlando
dental/florida/sarasota/sarasota
dental/illinois/chicago/chicago
dental/nevada/las-vegas/las-vegas
dental/nevada/reno/reno
dental/new-jersey/jersey-city/jersey-city
dental/new-jersey/newark/newark
dental/new-jersey/trenton/trenton
dental/new-jersey/vineland/vineland
dental/new-york/elmira/elmira
dental/new-york/ithaca/ithaca
dental/new-york/rochester/rochester
dental/new-york/syracuse/syracuse
dental/new-york/utica/utica
dental/nv/las-vegas/las-vegas
dental/ohio/cincinnati/cincinnati
dental/ohio/cleveland/cleveland
dental/ohio/columbus/columbus
dental/pennsylvania/chambersburg/chambersburg
dental/pennsylvania/erie/erie
dental/pennsylvania/harrisburg/harrisburg
dental/pennsylvania/johnstown/johnstown
dental/pennsylvania/lancaster/lancaster
dental/pennsylvania/lebanon/lebanon
dental/pennsylvania/philadelphia/philadelphia
dental/pennsylvania/pittsburgh/pittsburgh
dental/pennsylvania/pottsville/pottsville
dental/pennsylvania/reading/reading
dental/pennsylvania/state-college/state-college
dental/pennsylvania/williamsport/williamsport
dental/pennsylvania/york/york
dental/rhode-island/newport/newport
dental/rhode-island/providence/providence
dental/rhode-island/warwick/warwick
dental/rhode-island/woonsocket/woonsocket
dental/texas/abilene/abilene
dental/texas/corpus-christi/corpus-christi
dental/texas/dallas/dallas
dental/texas/el-paso/el-paso
dental/texas/fort-worth/fort-worth
dental/texas/houston/houston
dental/texas/laredo/laredo
dental/texas/lubbock/lubbock
dental/texas/san-angelo/san-angelo
dental/texas/san-antonio/san-antonio
dental/texas/waco/waco
dental/texas/wichita-falls/wichita-falls
dental/washington/bellingham/bellingham
dental/washington/olympia/olympia
dental/washington/seattle/seattle
dental/washington/spokane/spokane
dental/washington/tacoma/tacoma
dental/washington/vancouver/vancouver
dental/washington/wenatchee/wenatchee
dental/washington/yakima/yakima
```

## APPENDIX B — FULL MISSING LIST, ORDINARY (289)
```
dental/arizona/central-arizona/eloy
dental/arizona/central-arizona/florence
dental/arizona/central-arizona/kearny
dental/arizona/central-arizona/superior
dental/arizona/east-valley/guadalupe
dental/arizona/northern-arizona/chinle
dental/arizona/northern-arizona/eagar
dental/arizona/northern-arizona/holbrook
dental/arizona/northern-arizona/springerville
dental/arizona/northern-arizona/st-johns
dental/arizona/northern-arizona/taylor
dental/arizona/northern-arizona/williams
dental/arizona/southern-arizona/bisbee
dental/arizona/southern-arizona/clifton
dental/arizona/southern-arizona/douglas
dental/arizona/southern-arizona/pima
dental/arizona/southern-arizona/willcox
dental/arizona/yuma-region/san-luis
dental/arizona/yuma-region/somerton
dental/california/bay-area/fairfax
dental/california/bay-area/milpitas
dental/california/bay-area/san-bruno
dental/california/bay-area/san-lorenzo
dental/california/bay-area/vallejo
dental/california/central-coast/salinas
dental/california/central-coast/san-luis-obispo
dental/california/central-coast/santa-barbara
dental/california/central-coast/santa-cruz
dental/california/central-valley/bakersfield
dental/california/central-valley/fresno
dental/california/central-valley/modesto
dental/california/central-valley/stockton
dental/california/central-valley/visalia
dental/california/los-angeles/beverly-hills
dental/california/los-angeles/bradbury
dental/california/los-angeles/carson
dental/california/los-angeles/cerritos
dental/california/los-angeles/culver-city
dental/california/los-angeles/downey
dental/california/los-angeles/el-segundo
dental/california/los-angeles/encino
dental/california/los-angeles/gardena
dental/california/los-angeles/glendale
dental/california/los-angeles/hawthorne
dental/california/los-angeles/hermosa-beach
dental/california/los-angeles/irwindale
dental/california/los-angeles/la-mirada
dental/california/los-angeles/lakewood
dental/california/los-angeles/lawndale
dental/california/los-angeles/manhattan-beach
dental/california/los-angeles/north-hollywood
dental/california/los-angeles/palos-verdes-estates
dental/california/los-angeles/rancho-palos-verdes
dental/california/los-angeles/redondo-beach
dental/california/los-angeles/rolling-hills-estates
dental/california/los-angeles/san-pedro
dental/california/los-angeles/santa-monica
dental/california/los-angeles/toluca-lake
dental/california/los-angeles/valley-glen
dental/california/los-angeles/whittier
dental/california/los-angeles/woodland-hills
dental/california/orange-county/coto-de-caza
dental/california/orange-county/foothill-ranch
dental/california/orange-county/la-habra
dental/california/orange-county/laguna-woods
dental/california/orange-county/villa-park
dental/california/riverside/canyon-lake
dental/california/san-bernardino/adelanto
dental/california/san-bernardino/canyon-lake
dental/california/san-bernardino/grand-terrace
dental/california/san-diego/imperial-beach
dental/california/san-diego/lakeside
dental/california/san-diego/san-ysidro
dental/connecticut/fairfield-county/bethel
dental/connecticut/hartford/berlin
dental/connecticut/hartford/east-windsor
dental/connecticut/hartford/southington
dental/connecticut/hartford/suffield
dental/connecticut/hartford/vernon
dental/connecticut/hartford/windsor
dental/connecticut/litchfield-county/litchfield
dental/connecticut/litchfield-county/new-milford
dental/connecticut/litchfield-county/winchester
dental/connecticut/new-haven/east-haven
dental/connecticut/new-haven/north-haven
dental/connecticut/new-haven/west-haven
dental/connecticut/new-haven/woodbridge
dental/connecticut/new-london/groton
dental/connecticut/new-london/waterford
dental/connecticut/norwich/montville
dental/connecticut/waterbury/middlebury
dental/connecticut/waterbury/naugatuck
dental/connecticut/waterbury/prospect
dental/florida/florida-keys/islamorada
dental/florida/florida-keys/marathon
dental/florida/florida-keys/tavernier
dental/florida/jacksonville/atlantic-beach
dental/florida/miami/coconut-grove
dental/florida/miami/florida-city
dental/florida/naples-fort-myers/north-fort-myers
dental/florida/tampa-bay/madeira-beach
dental/florida/tampa-bay/st-pete-beach
dental/florida/tampa-bay/treasure-island
dental/nevada/lake-tahoe/incline-village
dental/nevada/las-vegas/blue-diamond
dental/nevada/las-vegas/bunkerville
dental/nevada/las-vegas/laughlin
dental/nevada/las-vegas/logandale
dental/nevada/las-vegas/overton
dental/nevada/northeastern-nevada/battle-mountain
dental/nevada/northeastern-nevada/carlin
dental/nevada/northeastern-nevada/ely
dental/nevada/northeastern-nevada/ruth
dental/nevada/northeastern-nevada/spring-creek
dental/nevada/northeastern-nevada/wells
dental/nevada/reno/lovelock
dental/nevada/reno/silver-springs
dental/nevada/reno/smith-valley
dental/nevada/reno/virginia-city
dental/nevada/reno/yerington
dental/new-jersey/jersey-city/harrison
dental/new-jersey/jersey-shore/absecon
dental/new-jersey/jersey-shore/egg-harbor
dental/new-jersey/jersey-shore/galloway
dental/new-jersey/jersey-shore/hamilton
dental/new-jersey/jersey-shore/margate
dental/new-jersey/jersey-shore/pleasantville
dental/new-jersey/jersey-shore/ventnor
dental/new-jersey/middlesex-county/cromwell
dental/new-jersey/middlesex-county/east-brunswick
dental/new-jersey/middlesex-county/franklin
dental/new-jersey/middlesex-county/metuchen
dental/new-jersey/middlesex-county/new-brunswick
dental/new-jersey/middlesex-county/north-brunswick
dental/new-jersey/middlesex-county/south-amboy
dental/new-jersey/middlesex-county/south-brunswick
dental/new-jersey/morris-county/east-hanover
dental/new-jersey/newark/city-of-orange
dental/new-jersey/newark/west-caldwell
dental/new-jersey/newark/west-orange
dental/new-jersey/south-jersey/camden
dental/new-jersey/south-jersey/collingswood
dental/new-jersey/south-jersey/pennsauken
dental/new-jersey/south-jersey/voorhees
dental/new-jersey/trenton/ewing
dental/new-jersey/union-county/fanwood
dental/new-jersey/union-county/north-plainfield
dental/new-jersey/union-county/plainfield
dental/new-jersey/union-county/roselle-park
dental/new-jersey/union-county/union
dental/new-jersey/vineland/millville
dental/new-york/albany/ballston-spa
dental/new-york/albany/cohoes
dental/new-york/albany/watervliet
dental/new-york/binghamton/endicott
dental/new-york/binghamton/johnson-city
dental/new-york/binghamton/vestal
dental/new-york/buffalo/depew
dental/new-york/buffalo/jamestown
dental/new-york/buffalo/kenmore
dental/new-york/buffalo/lakewood
dental/new-york/buffalo/north-tonawanda
dental/new-york/buffalo/williamsville
dental/new-york/elmira/horseheads
dental/new-york/hudson-valley/nanuet
dental/new-york/hudson-valley/new-city
dental/new-york/hudson-valley/new-windsor
dental/new-york/long-island/baldwin
dental/new-york/long-island/bay-shore
dental/new-york/long-island/bethpage
dental/new-york/long-island/brentwood
dental/new-york/long-island/commack
dental/new-york/long-island/franklin-square
dental/new-york/long-island/hauppauge
dental/new-york/long-island/huntington-station
dental/new-york/long-island/island-park
dental/new-york/long-island/jericho
dental/new-york/long-island/long-beach
dental/new-york/long-island/merrick
dental/new-york/long-island/north-babylon
dental/new-york/long-island/patchogue
dental/new-york/long-island/plainview
dental/new-york/long-island/west-babylon
dental/new-york/long-island/west-islip
dental/new-york/long-island/westbury
dental/new-york/new-york-city/astoria
dental/new-york/new-york-city/forest-hills
dental/new-york/new-york-city/jackson-heights
dental/new-york/new-york-city/queens-village
dental/new-york/rochester/brighton
dental/new-york/rochester/greece
dental/new-york/rochester/irondequoit
dental/new-york/syracuse/north-syracuse
dental/new-york/westchester/bronxville
dental/new-york/westchester/harrison
dental/north-carolina/western-north-carolina/arden
dental/nv/las-vegas/blue-diamond
dental/nv/las-vegas/bunkerville
dental/nv/las-vegas/laughlin
dental/nv/las-vegas/logandale
dental/nv/las-vegas/overton
dental/ohio/cincinnati/blue-ash
dental/ohio/cincinnati/fairfield
dental/ohio/cincinnati/loveland
dental/ohio/cincinnati/madeira
dental/ohio/cincinnati/montgomery
dental/ohio/cincinnati/norwood
dental/ohio/cincinnati/springdale
dental/ohio/cincinnati/west-chester
dental/ohio/cleveland/beachwood
dental/ohio/cleveland/berea
dental/ohio/cleveland/cleveland-heights
dental/ohio/cleveland/euclid
dental/ohio/cleveland/fairview-park
dental/ohio/cleveland/garfield-heights
dental/ohio/cleveland/lyndhurst
dental/ohio/cleveland/maple-heights
dental/ohio/cleveland/mayfield-heights
dental/ohio/cleveland/mentor
dental/ohio/cleveland/north-olmsted
dental/ohio/cleveland/north-royalton
dental/ohio/cleveland/olmsted-falls
dental/ohio/cleveland/rocky-river
dental/ohio/cleveland/solon
dental/ohio/cleveland/strongsville
dental/ohio/cleveland/twinsburg
dental/ohio/cleveland/university-heights
dental/ohio/cleveland/westlake
dental/ohio/cleveland/willoughby
dental/ohio/columbus/bexley
dental/ohio/columbus/blacklick
dental/ohio/columbus/canal-winchester
dental/ohio/columbus/gahanna
dental/ohio/columbus/grove-city
dental/ohio/columbus/hilliard
dental/ohio/columbus/new-albany
dental/ohio/columbus/powell
dental/ohio/columbus/reynoldsburg
dental/ohio/columbus/upper-arlington
dental/ohio/columbus/westerville
dental/ohio/columbus/worthington
dental/pennsylvania/altoona/duncansville
dental/pennsylvania/altoona/hollidaysburg
dental/pennsylvania/harrisburg/boiling-springs
dental/pennsylvania/harrisburg/mechanicsburg
dental/pennsylvania/lebanon/fredericksburg
dental/pennsylvania/philadelphia/andalusia
dental/pennsylvania/philadelphia/bristol
dental/pennsylvania/philadelphia/conshohocken
dental/pennsylvania/philadelphia/fairless-hills
dental/pennsylvania/philadelphia/feasterville-trevose
dental/pennsylvania/philadelphia/langhorne
dental/pennsylvania/philadelphia/plymouth-meeting
dental/pennsylvania/philadelphia/radnor
dental/pennsylvania/philadelphia/thorndale
dental/pennsylvania/philadelphia/wayne
dental/pennsylvania/pittsburgh/bethel-park
dental/pennsylvania/pittsburgh/mars
dental/pennsylvania/pittsburgh/warrendale
dental/pennsylvania/pottsville/saint-clair
dental/pennsylvania/scranton-wilkes-barre/forty-fort
dental/pennsylvania/scranton-wilkes-barre/wilkes-barre
dental/pennsylvania/williamsport/duboistown
dental/pennsylvania/williamsport/montoursville
dental/pennsylvania/williamsport/muncy
dental/rhode-island/newport/barrington
dental/rhode-island/newport/bristol
dental/rhode-island/newport/jamestown
dental/rhode-island/newport/tiverton
dental/rhode-island/providence/central-falls
dental/rhode-island/south-county/charlestown
dental/rhode-island/south-county/narragansett
dental/rhode-island/south-county/north-kingstown
dental/rhode-island/woonsocket/burrillville
dental/rhode-island/woonsocket/glocester
dental/rhode-island/woonsocket/lincoln
dental/rhode-island/woonsocket/scituate
dental/texas/austin/bee-cave
dental/texas/austin/west-lake-hills
dental/washington/kitsap/port-orchard
dental/washington/kitsap/silverdale
dental/washington/north-sound/arlington
dental/washington/north-sound/mill-creek
dental/washington/olympia/tumwater
dental/washington/south-king-county/covington
dental/washington/south-king-county/maple-valley
dental/washington/spokane/greenacres
dental/washington/tri-cities/west-richland
dental/washington/yakima/union-gap
```
