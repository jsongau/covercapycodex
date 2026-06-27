# ZIP Module Inventory — keep every cool module

> Catalog of the interactive modules in the uploaded redesign package (`_redesign-package/`),
> so none are lost in the rebuild. Status: **KEEP** (port as-is intent) · **PORTED** (now in
> `assets/ppo/`) · **TO-PORT** (queued). The whole point: the rebuilt system must be a *superset*
> of the ZIP + live page, never a subset.

| # | Module | What it does | Source markers | In ppo-system? |
|---|---|---|---|---|
| 1 | **Spec-first plan card** | carrier logo + name + price strip + coverage + best-for + links | `pc-name pc-price pc-strip pc-best pc-links pc-go` | ✅ PORTED (`cc-card`) |
| 2 | **Comparison matrix** | row=spec, col=plan, sticky header, best-in-row | `cov-cell plan-cell` | ✅ PORTED (`cc-cmp`) + Year-1/Later toggle |
| 3 | **Pin-to-compare tray** | checkbox on each card pins it to a sticky compare tray (max 4), with remove | `cmp-pick`, `cmp-cb`, "Pinned plan comparison", `tray-cell`, aria "Remove" | ✅ PORTED (`cc-tray` + JS) |
| 4 | **Sort & filter toolbar** | filter the table by `implants / nowait / ortho / cheap`; sort | `toolbar`, `data-filter`, "Sort and filter the comparison table" | ✅ PORTED (`cc-toolbar` + JS) |
| 5 | **Coverage spec-dots** | compact Prev/Basic/Major/etc. dots: covered / partial / none | `ps-c ps-k ps-dot is-covered is-partial is-none` | ✅ PORTED (`cc-ps` + dots) |
| 6 | **ZIP-code quote input** | 5-digit ZIP entry → location-specific quote/availability | `#hzip`, aria "ZIP code" | 🔶 TO-PORT (`cc-zip`; ties to quote handoff) |
| 7 | **Analytics event taxonomy** | 70 baked `data-ev` hooks (e.g. `plan_compare_add`, `verification_start`) | `data-ev="..."` | ✅ PORTED (delegated `data-ev` → dataLayer in JS) |
| 8 | **Carrier logo plate** | real SVG logo with mono + no-logo fallback | `logo-plate logo-img logo-mono no-logo` | 🔶 TO-PORT (`cc-logo-plate`; SVGs already in package `assets/`) |
| 9 | **Theme switch** | gold/jade theme toggle | `theme-switch`, `data-theme`, `data-active` | ✅ PORTED (Warm/Jade `data-palette` toggle) |
| 10 | **Carrier index cards** | nav cards to each carrier hub | `carrier-card nav-card card-hover nv-n nv-d nv-go` | 🔶 TO-PORT (`cc-navcard`) |
| 11 | **Methodology cards** | independence / how-we-rate / sources trio | `method-card` | 🔶 TO-PORT (`cc-method`) |
| 12 | **Source drawer** | per-fact provenance behind a quiet "view sources" | (presentation-spec 04 §6) | 🔶 TO-PORT (`cc-drawer`) |
| 13 | **Cash-vs-premium value frame** | shows the payoff vs paying cash (live page `valueFrame()`) | `data-cash data-prem` | 🔶 TO-PORT (fuse with Smart Match — Agent 11) |
| 14 | **Sticky sub-nav** | section anchors, active state, mobile scroll | `nav` + anchors | ✅ PORTED (`cc-subnav`) |
| 15 | **Glossary tooltip** | term → definition + why + guide link | `data-tip` | ✅ PORTED (`cc-gloss`, 3-layer) |

## Porting principles
- A module is only "PORTED" when it lives in `assets/ppo/ppo-system.css` (+ `ppo-hub.js` for behaviour) and reads the **one canonical data source** — never re-typed per page.
- Analytics: every interactive control carries a `data-ev` name; one delegated listener pushes to `dataLayer`. No per-control inline handlers.
- TO-PORT items are queued for the build phase; none are dropped.
