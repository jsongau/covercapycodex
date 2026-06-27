# CoverCapy Exit Handoff Modal — Design Spec
## 10-Agent Synthesis | Version 1.0 | June 2026

---

## CURRENT STATE DIAGNOSIS

The existing exit modal at `covercapy.com/dentists/.../kyt-dental-services` shows:
- Overline with centered dot separator (acceptable)
- Italic serif for practice name (good, keep)
- Numbered trust list with dashes used as em-dash replacements (AI-looking, remove)
- Two CTAs: "Stay with CoverCapy" ghost link + "Continue to [site]" dark button
- Destination URL shown at bottom in small text

**Problems identified:**
- "i. ii. iii." roman numeral list feels like a legal disclaimer, not a concierge handoff
- Dashes in copy ("—") feel generated
- Trust points are defensive and anxiety-inducing, not reassuring
- No brand warmth — could be any SaaS exit gate
- Button copy "Continue to Kytdentalservices" is mechanical, awkward with camelCase
- Missing: context about WHY they're leaving and what to do when they get there

---

## 10-AGENT BRIEF

### Agent 1 — Brand & Luxury UX
**Verdict:** The modal needs to feel like a hotel concierge handing you to a driver. The warmth should be in the *gesture*, not the legal disclaimers. Replace the numbered list entirely with a single editorial sentence that conveys the same three trust points in one breath. The serif italic for the practice name is correct — it feels personal, like a handwritten note. Keep it.

**Direction:** Less "terms of service disclosure," more "we'll walk you over personally."

### Agent 2 — Conversion Specialist
**Verdict:** The "Stay with CoverCapy" option should NOT be a ghost link — it should be a full secondary button with genuine value prop. Patients clicking "Visit website" are often doing one of three things: checking hours, confirming the address, or looking for a phone number. Intercept that intent. Add a "What are you looking for?" micro-nudge that surfaces those answers directly: office hours card, address + map link, phone number. This keeps them on CoverCapy and improves engagement.

**Direction:** The "stay" option should offer more value than the "leave" option. Make the exit feel like a downgrade.

### Agent 3 — Copywriter (Anti-AI)
**Verdict:** The current copy reads like a modal that shipped to pass QA. Every line is structurally correct but emotionally flat. Rewrite principles:
- Lead with the destination name, not CoverCapy
- Use second-person present tense ("You're stepping into...")
- The trust statement should be one sentence, not three bullets
- The button label should be action-forward: "Open [Office Name]'s website" not "Continue to [site]"
- Kill all "—" em-dashes in copy. Use commas, colons, or rewrite around them.

**Copy direction:**
```
Overline: COVERCAPY CONCIERGE
Heading: Opening [Office Name]
Subhead: Their official site opens in a new tab. This page stays right here.
Body: CoverCapy never sees what you do there — your insurance, payment, or login details belong to them, not us.
Stay CTA: Actually, show me office hours here
Leave CTA: Open [Office Name]'s website
```

### Agent 4 — Behavioral Economist
**Verdict:** Loss aversion is the play. Patients leaving CoverCapy to visit a dentist website are at their highest-intent moment. The risk of losing them is real. Frame "Stay with CoverCapy" as *gaining* something, not avoiding a loss. Add a single concrete value anchor: "You're $0 from having your insurance verified here." This makes the CoverCapy path feel like the smarter move without being manipulative.

**Direction:** The exit is a conversion event. Treat it like one. Show them what they lose by leaving.

### Agent 5 — Mobile UX Specialist
**Verdict:** On iOS Safari, the current modal is cut off at the bottom — the button group is partially behind the browser chrome on small screens. The max-height + overflow:auto approach works but the two-button footer needs `padding-bottom: env(safe-area-inset-bottom)` for notched devices. The "Destination: kytdentalservices.com" URL at the bottom is too small to read and not tappable — either make it a real link with appropriate size or remove it.

**Direction:** Footer padding fix, remove or resize the destination URL line.

### Agent 6 — Trust & Credibility Expert
**Verdict:** The three trust disclaimers ("CoverCapy never sees your payment..." / "independent concierge" / "Buying a plan? Verify first") are all written from CoverCapy's perspective — defensive, self-serving. Rewrite them from the *patient's* perspective. "Your insurance details are yours" lands better than "CoverCapy never stores your payment info." The former is a benefit; the latter is a disclaimer.

**New trust points:**
1. "Your info stays private — what you do on their site is between you and them."
2. "We're not an affiliate. We don't earn anything from your visit there."
3. "Still uninsured? Compare PPO plans in under 2 minutes before you book."

### Agent 7 — Retention Specialist
**Verdict:** The biggest retention lever is the "quick answers" panel inside the modal when the patient clicks "Stay." This should surface: office phone number, address with one-tap directions, hours (if available), and the "Verify my insurance here" CTA. If any of those three data points are already in our DB for this dentist, we can answer the question faster than their own website. That's the retention hook.

**Direction:** Build a collapsible "Quick info" panel for the Stay path. Pull from Supabase dentist record.

### Agent 8 — Accessibility Expert
**Verdict:** Current modal has no focus trap, no aria-modal attribute, and the close button (×) has no accessible label. On screen readers, the roman numeral list (i, ii, iii) reads as individual letters, not list items. The scrim background click-to-close behavior has no keyboard equivalent. Minimum fixes needed before ship:
- `role="dialog" aria-modal="true" aria-labelledby="exit-modal-title"`
- Focus trap on open, restore focus on close
- Close button: `aria-label="Close and stay on this page"`
- Replace roman numerals with standard `<ul>`

### Agent 9 — Design System Expert
**Verdict:** The modal must use CoverCapy's existing CSS token set exactly:
- Background: `var(--cream-card)` (#FFFDF8)
- Overline: `var(--teal-300)` / 11px / letter-spacing 0.1em / Inter Tight 700
- Heading: `var(--ink)` / Fraunces 500 / 26px
- Italic practice name: Fraunces 500 italic / same size / `var(--teal-700)`
- Body: `var(--ink-soft)` / Inter Tight 14px
- Trust points: `var(--ink-soft)` / 13px — NOT styled as a list, styled as inline sentences separated by `·`
- Stay button: border `var(--line)` / `var(--ink)` — same class as existing `.btn-ghost`
- Leave button: `var(--teal-night)` background / `var(--mint)` text — `.btn-dark` variant
- Border radius: 20px (matches `.modal`)
- Box shadow: `var(--sh-lg)`

### Agent 10 — A/B Testing Strategist
**Variants to test after ship:**
- A: Current (baseline)
- B: "Quick info" panel in Stay path (Agent 7)
- C: Tighter modal — heading + one trust sentence + two CTAs only, no list
- D: Add social proof: "3,200 patients used CoverCapy to verify at this office"

**Primary metric:** Stay rate (% who click "Stay with CoverCapy")
**Secondary:** Exit-to-return rate (patient leaves but returns within same session)
**Instrument:** `gtag('event', 'exit_modal_stay')` vs `gtag('event', 'exit_modal_continue')`

---

## FINAL DESIGN SPEC

### Structure
```
[scrim overlay]
  [modal: role="dialog" aria-modal="true" aria-labelledby="exit-modal-title"]
    [header]
      [overline]  COVERCAPY CONCIERGE
      [close ×]
    [body]
      [heading id="exit-modal-title"]  Opening [Office Name]
      [subhead]  Their site opens in a new tab. This page stays open.
      [trust line]  Your details stay private · We earn nothing from your visit · No PPO yet? Plans from $30/mo.
    [footer]
      [secondary btn]  Actually, what are their hours?
      [primary btn]   Open [Office Name]'s website →
      [dest label]    [domain.com] (12px, var(--ink-faint))
    [quick-info panel — hidden by default, shown when secondary is clicked]
      [phone row]  [phone number] · tap to call
      [address row]  [address] · get directions
      [hours row]  (if available)
      [verify CTA]  Verify my insurance here — free
```

### CSS Tokens (use existing)
```css
.exit-modal-overline {
  font: 700 11px/1 'Inter Tight', sans-serif;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--teal-300);
}
.exit-modal-heading {
  font: 500 26px/1.2 'Fraunces', serif;
  color: var(--ink);
  margin: 8px 0 4px;
}
.exit-modal-heading em {
  font-style: italic;
  color: var(--teal-700);
}
.exit-modal-sub {
  font-size: 14px;
  color: var(--ink-soft);
  margin: 0 0 14px;
}
.exit-trust-line {
  font-size: 13px;
  color: var(--ink-faint);
  line-height: 1.6;
}
.exit-quick-panel {
  display: none;
  background: var(--cream);
  border-radius: 12px;
  padding: 14px 16px;
  margin: 12px 0 0;
}
.exit-quick-panel.open { display: block; }
.exit-quick-row {
  display: flex;
  gap: 10px;
  padding: 8px 0;
  border-top: 1px solid var(--line-2);
  font-size: 14px;
  color: var(--ink);
  align-items: center;
}
.exit-quick-row:first-child { border-top: none; }
.exit-quick-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-faint);
  min-width: 64px;
}
```

### JavaScript — openExitModal(dentist)
```javascript
function openExitModal(dentist) {
  const name = dentist.name || 'this office';
  const website = dentist.website;
  const displayDomain = website ? new URL(website).hostname.replace('www.','') : '';

  document.getElementById('em-heading').innerHTML =
    `Opening <em>${name}</em>`;
  document.getElementById('em-dest-label').textContent = displayDomain;
  document.getElementById('em-continue-btn').onclick = () => {
    window.open(website, '_blank', 'noopener,noreferrer');
    gtagSafe('exit_modal_continue', { dentist_id: dentist.id });
    closeModal('m-exit');
  };

  // Quick info panel
  document.getElementById('em-phone').textContent = dentist.phone || '';
  document.getElementById('em-address').textContent = dentist.address || '';
  document.getElementById('em-phone-row').style.display = dentist.phone ? '' : 'none';
  document.getElementById('em-address-row').style.display = dentist.address ? '' : 'none';

  document.getElementById('em-stay-btn').onclick = () => {
    document.getElementById('em-quick-panel').classList.toggle('open');
    document.getElementById('em-stay-btn').textContent =
      document.getElementById('em-quick-panel').classList.contains('open')
        ? 'Hide quick info'
        : 'Show office details instead';
    gtagSafe('exit_modal_stay', { dentist_id: dentist.id });
  };

  openModal('m-exit');
}
```

### HTML Template
```html
<div class="scrim" id="m-exit" role="dialog" aria-modal="true" aria-labelledby="exit-modal-title">
  <div class="modal" style="max-width:480px">
    <div class="mh" style="align-items:center">
      <span class="exit-modal-overline">CoverCapy Concierge</span>
      <button class="x" onclick="closeModal('m-exit')" aria-label="Close and stay on this page">×</button>
    </div>
    <div class="mb" style="padding-top:4px">
      <h3 class="exit-modal-heading" id="exit-modal-title" id="em-heading">Opening <em>this office</em></h3>
      <p class="exit-modal-sub">Their site opens in a new tab. This page stays exactly where you left it.</p>
      <p class="exit-trust-line">
        Your details stay private &nbsp;·&nbsp; We earn nothing from your visit there &nbsp;·&nbsp;
        No PPO yet? <a href="/compare-ppo-dental-plans" style="color:var(--teal-700);font-weight:600">Plans from $30/mo</a>
      </p>
      <div class="exit-quick-panel" id="em-quick-panel">
        <div class="exit-quick-row" id="em-phone-row">
          <span class="exit-quick-label">Call</span>
          <a id="em-phone" class="phone-link" href="#"></a>
        </div>
        <div class="exit-quick-row" id="em-address-row">
          <span class="exit-quick-label">Find us</span>
          <span id="em-address"></span>
        </div>
        <div class="exit-quick-row">
          <a href="/find-my-dentist" class="dd-full" style="margin:6px 0 0;padding:10px">
            Verify my insurance here instead — free
          </a>
        </div>
      </div>
      <div class="mfoot" style="margin-top:16px;flex-direction:column;gap:8px">
        <button id="em-continue-btn" class="btn-dark" style="width:100%;justify-content:center">
          Open this office's website →
        </button>
        <button id="em-stay-btn" class="btn-ghost" style="width:100%;justify-content:center">
          Show office details instead
        </button>
        <div style="text-align:center;padding-top:2px">
          <span id="em-dest-label" style="font-size:11px;color:var(--ink-faint)"></span>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## ACCESSIBILITY CHECKLIST
- [ ] `role="dialog"` + `aria-modal="true"` + `aria-labelledby` pointing to heading
- [ ] Focus trap: first focusable element on open (continue button), Escape closes
- [ ] Restore focus to triggering element on close
- [ ] Close button: `aria-label="Close and stay on this page"`
- [ ] Trust line uses `·` character (U+00B7) — not dash, not bullet
- [ ] `window.open` does not fire without explicit user click (no async gap)
- [ ] Scrim click closes modal (existing pattern)

## COPY RULES
- No em-dashes anywhere in this modal
- No roman numerals
- No parenthetical disclaimers
- Overline is ALL CAPS, plain, no punctuation besides spacing
- Practice name always in `<em>` (italic serif)
- Button labels are verb-first action phrases

## WHAT NOT TO BUILD
- Do not add Capy Crowns / rewards to this modal (user directive)
- Do not add newsletter or email capture here
- Do not add a 3-second delay countdown — it's patronizing
- Do not pre-check any checkbox for the patient
