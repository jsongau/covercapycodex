# Mega-Nav Promo Hero Cards — Fintech Product Lens

**Designer lens:** Clean banking/investing app cards. Data density done cleanly, tabular numerals, crisp 1px dividers, calm trust, structured key/value detail rows. No marketing froth — the card reads like an account summary line, not a billboard.

**Format:** Three cards, ~300px wide, stacked in the left lead column of a mega-nav dropdown panel. Each card is a tight vertical block: eyebrow label, serif headline, a 2–3 row key/value detail ledger separated by hairline dividers, and one sentence-case text CTA.

---

## Shared Foundation

### Tokens
```css
:root{
  --teal:#1B5E5A; --teal-deep:#0E3F44;
  --ivory:#FFFDF9; --cream:#F4EDDF;
  --gold:#C9A24A; --gold-deep:#8A6A23;
  --ink:#14242A; --ink-60:rgba(20,36,42,.60);
  --line:rgba(20,36,42,.10);
}
```

### Base card
```css
.nav-card{
  width:300px; box-sizing:border-box;
  background:var(--ivory);
  border:1px solid var(--line);
  border-radius:10px;
  padding:18px 18px 16px;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
  color:var(--ink);
}
.nav-card .eyebrow{
  font-size:11px; letter-spacing:.06em; font-weight:600;
  color:var(--gold-deep); margin:0 0 8px;
}
.nav-card h3{
  font-family:"Fraunces",Georgia,serif;
  font-weight:500; font-size:19px; line-height:1.18;
  margin:0 0 12px;
}
.nav-card .ledger{ border-top:1px solid var(--line); }
.nav-card .row{
  display:flex; justify-content:space-between; align-items:baseline;
  padding:9px 0; border-bottom:1px solid var(--line);
}
.nav-card .row .k{ font-size:12px; color:var(--ink-60); }
.nav-card .row .v{
  font-size:13px; font-weight:600;
  font-variant-numeric:tabular-nums; font-feature-settings:"tnum" 1;
}
.nav-card .cta{
  display:inline-block; margin-top:14px;
  font-size:13px; font-weight:600; color:var(--teal-deep);
  text-decoration:none; border-bottom:1px solid var(--gold);
  padding-bottom:1px;
}
```
Tabular numerals everywhere a number appears so values in the right-hand `.v` column align vertically across rows and across all three stacked cards.

### Shared states
- **Hover (card):** `border-color:var(--teal)` + `box-shadow:0 1px 0 var(--teal)` inset bottom feel; 120ms ease.
- **Hover (CTA):** border-bottom thickens to `2px solid var(--gold-deep)`, color `var(--teal-deep)`.
- **Focus-visible:** `outline:2px solid var(--teal); outline-offset:2px;` on card and CTA.
- **Active/pressed:** card background shifts to `var(--cream)`.
- **Disabled (n/a here, but defined):** opacity .5, no pointer.

---

## Card A — Find a Dentist (concierge)

**Concept:** A "start a search" account line. Reads like the top of a banking dashboard: what it does, the inputs it takes, the cost. Calm and operational, not promotional.

**Layout:** Eyebrow `Find a dentist`. Serif headline. Two ledger rows: coverage check + how matching works. CTA last.

**CSS sketch:**
```html
<a class="nav-card" href="/find-my-dentist.html">
  <p class="eyebrow">Find a dentist</p>
  <h3>Match with an in-network PPO dentist near you</h3>
  <div class="ledger">
    <div class="row"><span class="k">Search by</span><span class="v">City or ZIP</span></div>
    <div class="row"><span class="k">Coverage check</span><span class="v">Included</span></div>
  </div>
  <span class="cta">Find a dentist</span>
</a>
```

**Exact compliant copy:**
- Eyebrow: `Find a dentist`
- Headline: `Match with an in-network PPO dentist near you`
- Row 1: `Search by` / `City or ZIP`
- Row 2: `Coverage check` / `Included`
- CTA: `Find a dentist`

**States:** Standard shared. On hover the `Coverage check` value gets `color:var(--teal-deep)` to signal the live action.

**Rationale:** The headline states the function plainly; the two rows answer the only two questions a user has before clicking (what do I type, does it cost me). Sentence-case CTA names the action. No banned terms, no arrows, no invented stats.

---

## Card B — Insurance featured plan

**Concept:** A featured product tile, exactly like a "highlighted plan" card in an investing app. The detail ledger does the selling with facts: carrier, plan, preventive coverage, when it starts. Numbers carry tabular weight.

**Layout:** Eyebrow `Featured plan`. Carrier+plan headline. Three-row ledger (preventive %, effective timing, network). Gold left-edge accent to mark it as the featured one. CTA last.

**CSS sketch:**
```html
<a class="nav-card nav-card--featured" href="/compare-ppo-dental-plans.html">
  <p class="eyebrow">Featured plan</p>
  <h3>UnitedHealthcare Primary Dental</h3>
  <div class="ledger">
    <div class="row"><span class="k">Preventive care</span><span class="v">100%</span></div>
    <div class="row"><span class="k">Effective</span><span class="v">Day one</span></div>
    <div class="row"><span class="k">Network</span><span class="v">PPO</span></div>
  </div>
  <span class="cta">Compare PPO plans</span>
</a>
```
```css
.nav-card--featured{ border-left:3px solid var(--gold); padding-left:15px; }
.nav-card--featured .row .v{ color:var(--teal-deep); } /* values lead the eye */
```

**Exact compliant copy:**
- Eyebrow: `Featured plan`
- Headline: `UnitedHealthcare Primary Dental`
- Row 1: `Preventive care` / `100%`
- Row 2: `Effective` / `Day one`
- Row 3: `Network` / `PPO`
- CTA: `Compare PPO plans`

**States:** Standard shared. Featured gold edge deepens to `var(--gold-deep)` on hover. The `100%` value is the visual anchor (tabular nums keep the `%` aligned with `Day one` and `PPO` baselines).

**Rationale:** "100% preventive day one" is the real, given product fact — surfaced as two clean ledger rows rather than a slogan. Carrier name as headline keeps it factual. CTA names the destination action in sentence case. No banned words used (the brief's facts are stated literally).

---

## Card C — For Dentists (claim profile)

**Concept:** An onboarding/account-setup line, the "open an account" equivalent. Tells a practice the cost and the timeline as a clean two-row ledger — the two facts that drive the decision.

**Layout:** Eyebrow `For dentists`. Action headline. Two-row ledger (cost, review time). CTA last.

**CSS sketch:**
```html
<a class="nav-card" href="/claim-dentist-listing-profile.html">
  <p class="eyebrow">For dentists</p>
  <h3>Claim your practice profile</h3>
  <div class="ledger">
    <div class="row"><span class="k">Cost</span><span class="v">Free</span></div>
    <div class="row"><span class="k">Review time</span><span class="v">3 days</span></div>
  </div>
  <span class="cta">Claim your profile</span>
</a>
```

**Exact compliant copy:**
- Eyebrow: `For dentists`
- Headline: `Claim your practice profile`
- Row 1: `Cost` / `Free`
- Row 2: `Review time` / `3 days`
- CTA: `Claim your profile`

**States:** Standard shared. `Free` value rendered in `var(--gold-deep)` weight 700 to draw the eye without color noise; `3 days` uses tabular nums so the `3` sits flush with other cards' numerals in the stack.

**Rationale:** Two facts, two rows — cost and turnaround are exactly what a practice weighs. "3-day review" rendered as `Review time / 3 days` reads like a status field, not a promise. CTA names the action plainly. No banned terms, no arrows, no fabricated ratings.

---

## Stack Behavior

All three cards share the same `.v` right-column position and tabular numerals, so `Included`, `100%`, `Day one`, `Free`, `3 days` form a single vertical rhythm down the panel — the data-density payoff. Dividers are hairline `--line` only; no card uses gradients, shadows beyond the 1px hover, or decorative icons. Calm, structured, legible at a glance.
