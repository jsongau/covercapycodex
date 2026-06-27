# CoverCapy PPO Verification Modal — Design Spec
## 20-Agent Synthesis | Version 1.0 | June 2026

---

## PROBLEM STATEMENT

Patients need to know if a dentist accepts their PPO before booking. Currently:
1. They call the office (often get put on hold, office doesn't answer)
2. They search the carrier website (outdated data, confusing UI)
3. They just show up and hope

CoverCapy's verification modal intercepts this moment. Done well, it's the most powerful conversion tool on the platform — the moment a patient hands over their email and trusts CoverCapy to do the work for them.

The current modal (lines 2081–2095 in find-my-dentist.html) is a flat form with 6 fields and a "Send Coverage Request" button. It has no visual hierarchy, no trust signals, no notification preference, no account creation hook, and no carrier specificity beyond a text input. It under-delivers on a critical moment.

---

## 20-AGENT BRIEF

### Agent 1 — UX Architect
**Core flow redesign:** Replace the flat form with a 3-step wizard. Each step has one job. Patients are in decision mode — not form-filling mode. Multi-step feels faster even though it asks the same questions.

```
Step 1: Your Plan     → Which carrier + Member ID + optional Group #
Step 2: Your Contact  → Name + Email + optional Phone + notification pref
Step 3: Confirm       → Preview the message we'll send + Submit CTA
```

Keep state across steps. Allow back navigation. Auto-advance to next step when carrier is selected and Member ID is filled (with explicit Next button as fallback).

### Agent 2 — Conversion Rate Optimizer
**Three conversion killers in the current modal:**
1. First field is "Your name" — too much friction for opener, leads to abandonment
2. No social proof — patients don't know if anyone ever responds
3. No clear success state — what happens after they click Send?

**Fixes:**
- Open with carrier selection (low friction, feels like progress)
- Add social proof line: "Offices typically reply within 1–2 business days. We'll notify you the moment they do."
- Success state after submit: confirmation screen with timeline + secondary CTA to create account

**Target submit rate: 65%+ of modal opens** (industry baseline for healthcare verification forms: ~40%)

### Agent 3 — Email Marketing Expert (Resend Integration)
**Resend setup required:**

Two emails fire on verification submission:

**Email A — Patient confirmation (instant)**
```
Subject: We sent your verification to [Office Name]
From: notify@covercapy.com
Body:
  Hi [First Name],
  We've sent a verification request to [Office Name] on your behalf.
  [Office Name] will confirm whether they accept [Carrier] and are taking new patients.
  We'll email you at [email] as soon as they reply.
  – CoverCapy
```

**Email B — Office notification (instant, to dentist email from DB)**
```
Subject: PPO verification request from a new patient
From: verify@covercapy.com
Reply-To: [patient email]
Body:
  Hi [Office Name],
  A patient found your practice on CoverCapy (covercapy.com) and would like to book a visit.
  They're asking whether you accept [Carrier] [Plan if specified] and are currently taking new patients.
  Patient contact:
    Name: [patient name]
    Email: [patient email]
    Phone: [patient phone if provided]
  Reply directly to this email to connect with them.
  — CoverCapy Concierge Network
  P.S. Want new patients to find you? Claim your free CoverCapy profile: [claim link]
```

**Resend API call:**
```javascript
POST https://api.resend.com/emails
Authorization: Bearer [RESEND_API_KEY]
{
  "from": "CoverCapy Verify <verify@covercapy.com>",
  "to": [dentist_email],
  "reply_to": patient_email,
  "subject": "PPO verification request from a new patient",
  "html": "..."
}
```

Note: Store `RESEND_API_KEY` in Supabase Edge Function environment variable, NOT in client-side JS.

### Agent 4 — Behavioral Psychologist
**Key patient anxiety at this moment:**
- "Will anyone actually respond?"
- "Am I giving my info to another useless form?"
- "What if I just call them instead?"

**Counter each anxiety:**
1. Response expectation: "We'll notify you here and by email — usually 1 business day."
2. Privacy signal: "Your info is only shared with this office, never sold or marketed."
3. Vs. calling: "Offices respond to our written requests faster than phone calls — you'll have a written record too."

Inject #1 into the success state, #2 into the contact step, #3 into the carrier step subtext.

### Agent 5 — Healthcare UX Specialist
**Insurance field specifics:**

Delta Dental has two distinct networks with meaningful coverage differences:
- Delta Dental PPO — higher coverage, broader network, negotiated fees
- Delta Dental Premier — older network, more dentists, but different fee schedule
- DeltaCare USA — HMO, not PPO, requires specific dentists

The modal must distinguish these. Presenting "Delta Dental" as a single option is misleading and creates false expectation.

**Full carrier list with sub-network support:**
```
UnitedHealthcare (UHC Dental)
  → Choice Plus PPO / Navigate / Core
Aetna
  → Aetna PPO / Aetna DMO
Ameritas
  → PrimeStar Complete / PrimeStar Home
Guardian
  → DentalGuard / Guardian PPO
Mutual of Omaha
  → Dental Select / Dental Ultimate
Humana
  → Extend 5000 / Dental Savings Plus
Delta Dental
  → Delta Dental PPO
  → Delta Dental Premier
  → DeltaCare USA (note: HMO, not PPO)
Cigna
  → DPPO / DHMO
MetLife
  → PDP Plus
BlueCross BlueShield
  → state-specific
Other PPO
  → free text field
```

For MVP: Show top 8 carriers as tiles. Show "Other" + free text.

### Agent 6 — Mobile-First Designer
**Modal height on mobile (375px iPhone):**

Current modal often exceeds viewport. 3-step wizard with progress bar keeps each step to ~320px content max. Critical rules:
- Steps are card-height constrained, not scroll-within-modal
- Carrier tiles: 2-column grid on mobile, 3-column on desktop
- Member ID field: `inputmode="numeric"` on mobile for number keyboard
- Submit button: full-width, min-height 52px (thumb-tap target)
- Progress indicator: 3 dots or thin progress bar at top of modal body, not header

```css
.v-carrier-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}
@media (min-width: 500px) {
  .v-carrier-grid { grid-template-columns: repeat(3, 1fr); }
}
```

### Agent 7 — Copywriter (Anti-AI, Healthcare Tone)
**Rule set:**
- No "leverage" / "utilize" / "ensure" / "seamlessly" / "hassle-free"
- No passive voice ("Your request will be sent" → "We're sending your request now")
- No exclamation marks
- Write like a knowledgeable friend who happens to know dental insurance
- Carrier selection label: "Which PPO do you have?" not "Select your insurance carrier"
- Member ID label: "Member ID" not "Member identification number"
- Notification pref: "How should we reach you?" not "Select notification preference"

**Step-by-step copy:**
```
Step 1 heading: Which PPO do you have?
Step 1 subtext: Select your carrier. We'll confirm [Office Name] accepts it.
Member ID label: Member ID
Member ID placeholder: 12-digit ID on your card
Group # label: Group # (optional)
Group # placeholder: Sometimes listed as "Group" or "Group No."

Step 2 heading: Where should we send the reply?
Step 2 subtext: We'll email you the moment [Office Name] confirms.
Name placeholder: First name
Email placeholder: you@email.com
Phone placeholder: Mobile (optional — for text notification)
Notification toggle: "Notify me when they reply" (default) vs "Let the office reach out directly"

Step 3 heading: Here's what we're sending
Step 3 subtext: You can edit this before we send it.
[editable preview textarea]
Send button: Send to [Office Name]
Below button: [Destination email from DB shown in small text]

Success state heading: Sent.
Success state body: We've notified [Office Name] on your behalf. We'll email you at [email] when they reply — usually within 1 business day.
Success CTA: Create a free account to track all your verifications in one place
```

### Agent 8 — Trust & Credibility Expert
**Trust signals to add, by step:**

Step 1:
- Lock icon next to Member ID: "Encrypted — only shared with this office"
- Subtext: "We never store your insurance credentials or use your ID for anything else"

Step 2:
- Privacy line below email: "Only shared with [Office Name]. Never sold or marketed."
- If notification pref = "Let office reach out": show their contact info so patient knows who to expect

Step 3 (preview):
- Show dentist email address (partially masked): "Sending to: i***@officename.com"
- Show timestamp: "Delivering now"
- Show "Reply-to is set to your email" — so patient knows dentist replies directly to them

### Agent 9 — Data Collection Strategist
**Progressive disclosure — only collect what's needed at each step:**

Step 1 collects: carrier (required), member ID (required), group # (optional), sub-plan (optional)
Step 2 collects: first name (required), email (required), phone (optional), notification preference (required, has default)
Step 3 collects: nothing — just preview + edit of the outgoing message

**Why member ID is required (not optional):**
Offices need it to actually look up the patient in their eligibility system. Without it, they can only confirm "we accept [carrier]" which is almost useless. Member ID enables a real verification.

**Phone number use:**
If provided and notification pref is "CoverCapy notifies you": we send SMS when office replies (future feature — note in spec, don't build now)
If provided and notification pref is "Office contacts directly": include phone in the email to the office

### Agent 10 — Notification UX Designer
**Two notification modes (radio toggle, not checkbox):**

```
◉ Notify me when they reply
   We'll email you at [email] as soon as the office responds.
   You stay in control — we handle the follow-up.

○ Let the office reach me directly
   [Office Name] will have your email and phone to contact you.
   CoverCapy will also send you a copy when they reply.
```

Default: "Notify me when they reply" — more comfortable for patients, less invasive.

Second option: patient wants direct dentist contact. This means their info goes in the email body directly. Show a preview of what the office will see.

Both options still send the patient a confirmation email.

### Agent 11 — Account Creation Funnel Expert
**Account CTA placement — three touch points:**

1. Step 2 — below email field (soft):
   "Already have a CoverCapy account? We'll link this to your history. Sign in →"

2. Step 3 — above Send button (medium):
   Checkbox (unchecked by default):
   "Save this to my CoverCapy account so I can track replies and manage my coverage in one place"
   → If checked: creates account post-submit using submitted email, sends magic link

3. Success state — primary CTA (strong):
   "Create your free account → Track this verification, see your coverage history, get Capy Crowns"
   Button: "Create account — it's free"
   Below: "Already have one? Sign in"

**Magic link flow on success:**
If checkbox was checked: POST to auth endpoint → send magic link to patient email alongside confirmation email. Patient clicks link in email → lands on dashboard with this verification pre-loaded.

### Agent 12 — Insurance Industry Expert
**Member ID format validation:**

| Carrier | Format | Notes |
|---------|--------|-------|
| UHC | 9 digits or "U" + digits | validate client-side |
| Aetna | 10–12 alphanumeric | |
| Delta Dental | 9 digits (usually SSN-based) | add note: "Often your SSN — it's encrypted and only shared with this office" |
| Guardian | 8 digits | |
| Cigna | 8–10 digits | |
| Humana | 9 digits | |
| Ameritas | 9 digits | |
| Other | any | |

Delta Dental note sensitivity: many patients don't know their Delta Dental Member ID is often their SSN. Display: "For Delta Dental, this is sometimes your Social Security Number. It's encrypted and only shared with [Office Name] — we never store it."

### Agent 13 — Email Deliverability Expert (Resend)
**Domain setup required before ship:**
- Verify `covercapy.com` in Resend dashboard
- SPF: add `include:amazonses.com` (Resend backend) to DNS
- DKIM: add Resend DKIM records to DNS
- DMARC: `v=DMARC1; p=quarantine; rua=mailto:dmarc@covercapy.com`
- From address: `verify@covercapy.com` (verification) + `notify@covercapy.com` (patient updates)

**Subject line testing:**
- "PPO verification request — [Office Name]" (highest open rate for dental offices, no spam triggers)
- Avoid: "Your request", "Confirmation", "We sent" — too generic, gets deleted
- Office email preview text: "A patient found your practice on CoverCapy and would like to book."

**Rate limits:** Resend free tier: 100/day. At scale, upgrade to $20/month plan (50k/month). Log every send to Supabase `verification_requests` table with `sent_at` timestamp.

### Agent 14 — Form Design Specialist
**Carrier selection: tiles > dropdown**

Dropdown is wrong here. Patients don't know their carrier's exact name. Tiles with logos (or clean name labels) let them pattern-match visually. Tile selected state:

```css
.v-carrier-tile {
  border: 1.5px solid var(--line);
  border-radius: 12px;
  padding: 12px 10px;
  text-align: center;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-soft);
  background: var(--cream-card);
  transition: .15s;
}
.v-carrier-tile:hover {
  border-color: var(--teal-300);
  color: var(--ink);
}
.v-carrier-tile.selected {
  border-color: var(--teal-700);
  background: var(--mint-soft);
  color: var(--teal-night);
}
```

**Sub-plan field:** appears after carrier is selected, only for carriers with multiple plans (Delta Dental, UHC). Hidden initially, slides in with CSS transition.

**Member ID field pattern:**
```html
<div class="inp-group">
  <input id="v-member-id" class="inp" placeholder="Member ID"
    inputmode="numeric" autocomplete="off"
    aria-describedby="v-member-hint">
  <span id="v-member-hint" class="inp-hint">Found on your insurance card</span>
  <span id="v-member-lock" class="inp-lock">🔒 Encrypted</span>
</div>
```

### Agent 15 — Social Proof Expert
**Add to Step 3 (preview step), above message:**

```
"[Office Name] has received 14 verification requests through CoverCapy."
```
(Pull from `verification_requests` table count WHERE dentist_id = X)

If count = 0:
```
"Be the first to verify your insurance at this office through CoverCapy."
```

This works both ways — established offices have social proof, new offices have novelty framing.

**On success state:**
```
"You're one of [N] patients who verified their coverage this week."
```

### Agent 16 — Urgency Expert (Non-Manipulative)
**Context-based urgency only — no fake countdown timers:**

If dentist has `open_weekends: true`:
"This office is open on weekends — early requests get earlier appointment slots."

If it's Friday after 3pm:
"Sent today, they'll see it Monday morning when the office opens."

If dentist has high review count (>50):
"This is a high-demand office. Confirming your insurance now holds your place in the inquiry queue."

Never use: "Only 3 spots left!" / "Limited availability!" / fake timers.

### Agent 17 — Privacy & HIPAA Expert
**What we're collecting and why:**

| Data | Why | Stored? | Shared with |
|------|-----|---------|-------------|
| Carrier name | To send correct verification | Yes, in verification_requests | Office + patient email |
| Member ID | Eligibility lookup by office | NO — never stored | Office email only |
| Group # | Same | NO — never stored | Office email only |
| Name | Personalize notification | Yes | Office email |
| Email | Send notification | Yes | Office email (if direct pref) |
| Phone | Optional notification | Yes, if provided | Office only (if direct pref) |

**Add to Step 2 below the form:**
"We keep your name and email to notify you. Your insurance ID and group number are sent directly to the office and never stored on our servers."

**This is not HIPAA-covered activity** (CoverCapy is not a Covered Entity or Business Associate in this flow — it's a communications intermediary). But behave as if it were. Document this clearly in privacy policy.

### Agent 18 — A/B Testing Strategist
**Priority tests post-launch:**

**Test A — Step count:**
- Control: 3 steps (current spec)
- Variant: 2 steps (combine carrier + contact on one screen, skip preview)
- Measure: submit rate, time-to-submit

**Test B — Default notification pref:**
- Control: "Notify me when they reply" (CoverCapy handles)
- Variant: "Let the office reach me directly"
- Measure: submit rate, actual response rate from offices

**Test C — Account CTA placement:**
- Control: Success state only
- Variant: Checkbox on Step 2 ("Save to my account")
- Measure: account creation conversion

**Test D — Member ID requirement:**
- Control: Required
- Variant: Optional (with copy "Providing your Member ID gets you a faster, more accurate response")
- Measure: submit rate vs response rate quality

**Instrument all with:** `gtag('event', 'verify_step_[N]_complete', {dentist_id, carrier})`

### Agent 19 — Retention & Lifecycle Expert
**Post-verification engagement sequence:**

T+0: Confirmation email sent to patient
T+0: Request email sent to office
T+24h: If no office reply, send patient: "Still waiting to hear back from [Office Name]. Here are 2 other offices in [city] who accept [carrier]." (include 2 dentist cards)
T+48h: If no office reply, send patient: "No response yet. You can also call them directly at [phone]."
T+office-reply: Send patient: "Great news — [Office Name] responded. [Summary of reply]." + CTA to book

These sequences are future features — spec them now, implement with a Supabase Edge Function + cron job.

**Add to the `verification_requests` table:**
```sql
id, dentist_id, patient_email, patient_name, patient_phone,
carrier, sub_plan, member_id_provided (boolean), group_provided (boolean),
notification_pref ('covercapy_notifies' | 'direct'),
message_sent, office_email_used,
status ('pending' | 'replied' | 'expired'),
created_at, replied_at, follow_up_1_sent, follow_up_2_sent
```

### Agent 20 — Customer Service Expert (What Offices Need)
**The office email needs to make it trivially easy to reply.**

Offices hate: unclear subject lines, walls of text, no reply-to, unclear what they're being asked.

Offices love: one clear question, patient contact info upfront, easy reply path.

**Office email template (final):**
```
Subject: New patient inquiry — PPO coverage question

Hi [Dr. Name / Office Name],

A patient found your practice on CoverCapy and is hoping to book an appointment.

They'd like to know:
→ Do you accept [Carrier] [Sub-plan if specified]?
→ Are you currently taking new patients?

Patient info:
  Name: [First Name Last Name]
  Email: [patient@email.com]
  [Phone: XXX-XXX-XXXX — if provided]

Reply directly to this email to connect with them.

—
CoverCapy Concierge Network
covercapy.com · [Unsubscribe from patient inquiries]

P.S. [Office Name]'s free profile on CoverCapy is getting traffic.
Claim it to manage your listing: covercapy.com/claim/[dentist-slug]
```

**Keep it under 150 words.** Office staff skim. One question, one action.

---

## FINAL COMPONENT SPEC

### Step 1 — Your Plan

```html
<div class="v-step" id="v-step-1">
  <div class="v-step-header">
    <div class="v-step-num">1 of 3</div>
    <h3 class="v-step-heading">Which PPO do you have?</h3>
    <p class="v-step-sub">Select your carrier. We'll confirm <strong id="v-office-name-1"></strong> accepts it.</p>
  </div>

  <!-- Carrier tiles -->
  <div class="v-carrier-grid" id="v-carrier-grid">
    <button class="v-carrier-tile" data-carrier="UnitedHealthcare">UnitedHealthcare</button>
    <button class="v-carrier-tile" data-carrier="Aetna">Aetna</button>
    <button class="v-carrier-tile" data-carrier="Ameritas">Ameritas</button>
    <button class="v-carrier-tile" data-carrier="Guardian">Guardian</button>
    <button class="v-carrier-tile" data-carrier="Mutual of Omaha">Mutual of Omaha</button>
    <button class="v-carrier-tile" data-carrier="Humana">Humana</button>
    <button class="v-carrier-tile" data-carrier="Delta Dental PPO">Delta Dental PPO</button>
    <button class="v-carrier-tile" data-carrier="Delta Dental Premier">Delta Dental Premier</button>
    <button class="v-carrier-tile" data-carrier="Cigna">Cigna DPPO</button>
    <button class="v-carrier-tile" data-carrier="MetLife">MetLife PDP</button>
    <button class="v-carrier-tile" data-carrier="BlueCross BlueShield">BCBS Dental</button>
    <button class="v-carrier-tile" data-carrier="Other">Other PPO</button>
  </div>

  <!-- Other: free text (shown when "Other" selected) -->
  <div id="v-carrier-other-wrap" style="display:none;margin-top:10px">
    <input class="inp" id="v-carrier-other" placeholder="Enter your PPO carrier name">
  </div>

  <!-- Delta Dental note (shown when Delta selected) -->
  <div id="v-delta-note" class="v-info-note" style="display:none">
    For Delta Dental, your Member ID below is sometimes your Social Security Number.
    It's encrypted and sent only to this office — we never store it.
  </div>

  <!-- Member ID + Group -->
  <div id="v-member-wrap" style="display:none;margin-top:12px">
    <div class="v-field-label">Member ID <span class="v-lock-badge">🔒 Encrypted</span></div>
    <input class="inp" id="v-member-id" placeholder="On your insurance card"
      inputmode="numeric" autocomplete="off">
    <div class="v-field-hint">Required for the office to look up your benefits</div>

    <div class="v-field-label" style="margin-top:8px">Group # <span class="v-optional">optional</span></div>
    <input class="inp" id="v-group-num" placeholder="Listed as 'Group' or 'Group No.' on your card"
      inputmode="numeric" autocomplete="off">
  </div>

  <button class="btn-dark v-next-btn" id="v-next-1" disabled style="width:100%;margin-top:16px">
    Continue →
  </button>
</div>
```

### Step 2 — Your Contact

```html
<div class="v-step" id="v-step-2" style="display:none">
  <div class="v-step-header">
    <button class="v-back-btn" onclick="vStep(1)">← Back</button>
    <div class="v-step-num">2 of 3</div>
    <h3 class="v-step-heading">Where should we send the reply?</h3>
    <p class="v-step-sub">We'll email you the moment <strong id="v-office-name-2"></strong> responds.</p>
  </div>

  <div class="fgrid">
    <div>
      <div class="v-field-label">First name</div>
      <input class="inp" id="v-name" placeholder="Your first name" autocomplete="given-name">
    </div>
    <div>
      <div class="v-field-label">Last name <span class="v-optional">optional</span></div>
      <input class="inp" id="v-last" placeholder="Last name" autocomplete="family-name">
    </div>
  </div>

  <div class="v-field-label">Email</div>
  <input class="inp" id="v-email" type="email" placeholder="you@email.com"
    autocomplete="email">

  <div class="v-field-label" style="margin-top:8px">
    Mobile number <span class="v-optional">optional</span>
  </div>
  <input class="inp" id="v-phone" type="tel" placeholder="For a text when they reply"
    inputmode="numeric" autocomplete="tel">

  <!-- Notification preference -->
  <div class="v-notif-toggle">
    <label class="v-notif-option" id="v-notif-covercapy">
      <input type="radio" name="v-notif" value="covercapy_notifies" checked>
      <div class="v-notif-content">
        <div class="v-notif-title">Notify me when they reply</div>
        <div class="v-notif-desc">We handle the follow-up. You get an email (and text, if you added your number) when they respond.</div>
      </div>
    </label>
    <label class="v-notif-option" id="v-notif-direct">
      <input type="radio" name="v-notif" value="direct">
      <div class="v-notif-content">
        <div class="v-notif-title">Let the office reach me directly</div>
        <div class="v-notif-desc">We'll include your email and phone in the message so they can contact you themselves.</div>
      </div>
    </label>
  </div>

  <div class="v-privacy-line">
    Your info is only shared with <strong id="v-office-name-3"></strong>. Never sold or marketed.
  </div>

  <!-- Account CTA (soft) -->
  <div class="v-account-nudge">
    Already have a CoverCapy account?
    <a href="/sign-in" class="v-account-link">Sign in to link this verification</a>
  </div>

  <button class="btn-dark v-next-btn" id="v-next-2" disabled style="width:100%;margin-top:16px">
    Preview message →
  </button>
</div>
```

### Step 3 — Preview & Send

```html
<div class="v-step" id="v-step-3" style="display:none">
  <div class="v-step-header">
    <button class="v-back-btn" onclick="vStep(2)">← Back</button>
    <div class="v-step-num">3 of 3</div>
    <h3 class="v-step-heading">Here's what we're sending</h3>
    <p class="v-step-sub">Edit it if you'd like. We'll deliver it directly to the office.</p>
  </div>

  <!-- Social proof (dynamic) -->
  <div class="v-social-proof" id="v-social-proof"></div>

  <!-- Editable preview -->
  <textarea class="inp v-preview-textarea" id="v-preview-msg" rows="6"></textarea>

  <!-- Destination info -->
  <div class="v-dest-row">
    <span class="v-dest-label">Sending to</span>
    <span id="v-dest-email" class="v-dest-value"></span>
  </div>

  <!-- Account creation checkbox -->
  <label class="v-account-checkbox">
    <input type="checkbox" id="v-create-account">
    <span>Save this to my CoverCapy account — track replies and manage coverage in one place</span>
  </label>

  <button class="btn-dark v-send-btn" id="v-send-btn" style="width:100%;margin-top:14px">
    Send to <span id="v-send-office-name"></span>
  </button>

  <div class="v-send-note">
    Delivered now · Reply-to set to your email · You'll hear back within 1 business day
  </div>
</div>
```

### Success State

```html
<div class="v-step" id="v-step-success" style="display:none">
  <div class="v-success-icon">✓</div>
  <h3 class="v-success-heading">Sent.</h3>
  <p class="v-success-body">
    We've notified <strong id="v-suc-office"></strong> on your behalf.
    We'll email <strong id="v-suc-email"></strong> when they reply — usually within 1 business day.
  </p>
  <div class="v-success-timeline">
    <div class="v-tl-row v-tl-done">Request delivered to <span id="v-suc-office-2"></span></div>
    <div class="v-tl-row v-tl-wait">Waiting for office to confirm your coverage</div>
    <div class="v-tl-row v-tl-wait">We notify you the moment they reply</div>
  </div>
  <a href="/create-account" class="dd-full" id="v-suc-account-cta" style="margin-top:16px">
    Create free account — track all your verifications
  </a>
  <button class="btn-ghost" style="width:100%;margin-top:8px" onclick="closeModal('m-verify')">
    Close
  </button>
</div>
```

---

## CSS ADDITIONS

```css
/* Verification modal — step system */
.v-step-num {
  font: 700 11px/1 'Inter Tight', sans-serif;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--teal-300);
  margin-bottom: 6px;
}
.v-step-heading {
  font: 500 22px/1.2 'Fraunces', serif;
  color: var(--ink);
  margin: 0 0 6px;
}
.v-step-sub {
  font-size: 14px;
  color: var(--ink-soft);
  margin: 0 0 14px;
}
.v-back-btn {
  background: none;
  border: none;
  font-size: 13px;
  color: var(--teal-300);
  cursor: pointer;
  padding: 0;
  margin-bottom: 8px;
  font-family: inherit;
  font-weight: 600;
}
.v-back-btn:hover { color: var(--teal-700); }

/* Carrier grid */
.v-carrier-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 4px;
}
@media (min-width: 500px) {
  .v-carrier-grid { grid-template-columns: repeat(3, 1fr); }
}
.v-carrier-tile {
  border: 1.5px solid var(--line);
  border-radius: 12px;
  padding: 11px 8px;
  text-align: center;
  cursor: pointer;
  font: 600 13px/1.3 'Inter Tight', sans-serif;
  color: var(--ink-soft);
  background: var(--cream-card);
  transition: border-color .15s, background .15s, color .15s;
}
.v-carrier-tile:hover {
  border-color: var(--teal-300);
  color: var(--ink);
}
.v-carrier-tile.selected {
  border-color: var(--teal-700);
  background: var(--mint-soft);
  color: var(--teal-night);
}

/* Field labels */
.v-field-label {
  font: 700 11px/1 'Inter Tight', sans-serif;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-faint);
  margin-bottom: 5px;
  margin-top: 10px;
}
.v-optional {
  font-weight: 400;
  text-transform: none;
  letter-spacing: 0;
  color: var(--ink-faint);
  font-size: 11px;
}
.v-lock-badge {
  font-size: 11px;
  background: var(--mint-soft);
  color: var(--mint-700);
  border-radius: 6px;
  padding: 2px 6px;
  font-weight: 600;
  letter-spacing: 0;
  text-transform: none;
  margin-left: 4px;
}
.v-field-hint {
  font-size: 12px;
  color: var(--ink-faint);
  margin: 3px 0 0;
}
.v-info-note {
  background: var(--gold-soft);
  border-radius: 10px;
  padding: 10px 13px;
  font-size: 13px;
  color: var(--ink-soft);
  line-height: 1.5;
  margin-top: 8px;
}

/* Notification toggle */
.v-notif-toggle {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 12px 0;
}
.v-notif-option {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 12px 14px;
  border: 1.5px solid var(--line);
  border-radius: 12px;
  cursor: pointer;
  transition: border-color .15s;
}
.v-notif-option:has(input:checked) {
  border-color: var(--teal-700);
  background: var(--mint-soft);
}
.v-notif-option input { margin-top: 2px; flex-shrink: 0; accent-color: var(--teal-700); }
.v-notif-title { font-size: 14px; font-weight: 600; color: var(--ink); }
.v-notif-desc { font-size: 13px; color: var(--ink-soft); margin-top: 2px; }

/* Privacy line */
.v-privacy-line {
  font-size: 12px;
  color: var(--ink-faint);
  margin: 8px 0;
  line-height: 1.5;
}

/* Account nudge */
.v-account-nudge {
  font-size: 13px;
  color: var(--ink-soft);
  margin: 4px 0 0;
}
.v-account-link {
  color: var(--teal-700);
  font-weight: 600;
  text-decoration: none;
}
.v-account-link:hover { text-decoration: underline; }

/* Preview textarea */
.v-preview-textarea {
  resize: vertical;
  min-height: 120px;
  font-size: 13px;
  color: var(--ink);
  line-height: 1.6;
}

/* Destination row */
.v-dest-row {
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 10px 0;
  font-size: 12px;
  color: var(--ink-faint);
}
.v-dest-label { font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
.v-dest-value { font-family: monospace; }

/* Account checkbox */
.v-account-checkbox {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  font-size: 13px;
  color: var(--ink-soft);
  cursor: pointer;
  padding: 10px 0 0;
}
.v-account-checkbox input { margin-top: 1px; flex-shrink: 0; accent-color: var(--teal-700); }

/* Social proof */
.v-social-proof {
  font-size: 13px;
  color: var(--teal-700);
  font-weight: 600;
  margin-bottom: 8px;
}

/* Send note */
.v-send-note {
  text-align: center;
  font-size: 12px;
  color: var(--ink-faint);
  margin-top: 8px;
}

/* Success state */
.v-success-icon {
  width: 48px; height: 48px;
  border-radius: 50%;
  background: var(--mint-soft);
  color: var(--mint-700);
  font-size: 22px;
  display: grid;
  place-items: center;
  margin: 0 auto 12px;
  font-weight: 700;
}
.v-success-heading {
  font: 500 28px/1 'Fraunces', serif;
  color: var(--ink);
  text-align: center;
  margin: 0 0 8px;
}
.v-success-body {
  text-align: center;
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.6;
  margin: 0 0 16px;
}
.v-success-timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.v-tl-row {
  padding: 10px 14px;
  font-size: 13px;
  border-left: 2px solid var(--line);
  color: var(--ink-soft);
  position: relative;
  margin-left: 8px;
}
.v-tl-row::before {
  content: '';
  width: 10px; height: 10px;
  border-radius: 50%;
  background: var(--line);
  position: absolute;
  left: -6px; top: 13px;
}
.v-tl-done {
  border-color: var(--mint-700);
  color: var(--mint-700);
  font-weight: 600;
}
.v-tl-done::before { background: var(--mint-700); }

/* Progress bar (top of modal body) */
.v-progress-bar {
  display: flex;
  gap: 4px;
  margin-bottom: 16px;
}
.v-progress-seg {
  height: 3px;
  border-radius: 3px;
  flex: 1;
  background: var(--line);
  transition: background .25s;
}
.v-progress-seg.active { background: var(--teal-700); }
.v-progress-seg.done { background: var(--mint-700); }
```

---

## JAVASCRIPT — Full Controller

```javascript
// State
const vState = {
  dentistId: null,
  dentistName: null,
  dentistEmail: null,
  dentistPhone: null,
  carrier: null,
  memberId: null,
  groupNum: null,
  name: null,
  email: null,
  phone: null,
  notifPref: 'covercapy_notifies',
  currentStep: 1,
};

function openPpoVerify(dentist) {
  vState.dentistId = dentist.id;
  vState.dentistName = dentist.name;
  vState.dentistEmail = dentist.email || '';
  vState.dentistPhone = dentist.phone || '';

  // Reset steps
  vStep(1);
  vState.carrier = null;

  // Set office name references
  ['v-office-name-1','v-office-name-2','v-office-name-3','v-send-office-name']
    .forEach(id => { const el = document.getElementById(id); if(el) el.textContent = dentist.name; });

  // Social proof
  fetchVerifyCount(dentist.id).then(count => {
    const el = document.getElementById('v-social-proof');
    if (!el) return;
    el.textContent = count > 0
      ? `${count} patients have verified their coverage at this office through CoverCapy.`
      : 'Be the first to verify your insurance at this office through CoverCapy.';
  });

  openModal('m-verify');
  gtagSafe('verify_modal_open', { dentist_id: dentist.id });
}

function vStep(n) {
  [1,2,3,'success'].forEach(s => {
    const el = document.getElementById(`v-step-${s}`);
    if (el) el.style.display = s === n ? '' : 'none';
  });
  // Update progress bar
  [1,2,3].forEach(i => {
    const seg = document.getElementById(`v-prog-${i}`);
    if (!seg) return;
    seg.className = 'v-progress-seg' + (i < n ? ' done' : i === n ? ' active' : '');
  });
  vState.currentStep = n;
  if (typeof n === 'number') gtagSafe(`verify_step_${n}_view`, { dentist_id: vState.dentistId });
}

// Carrier selection
document.querySelectorAll('.v-carrier-tile').forEach(tile => {
  tile.addEventListener('click', () => {
    document.querySelectorAll('.v-carrier-tile').forEach(t => t.classList.remove('selected'));
    tile.classList.add('selected');
    vState.carrier = tile.dataset.carrier;

    // Show/hide sub-fields
    document.getElementById('v-carrier-other-wrap').style.display =
      vState.carrier === 'Other' ? '' : 'none';
    const isDelta = vState.carrier.toLowerCase().includes('delta dental');
    document.getElementById('v-delta-note').style.display = isDelta ? '' : 'none';
    document.getElementById('v-member-wrap').style.display = '';

    vCheckStep1();
  });
});

function vCheckStep1() {
  const memberId = document.getElementById('v-member-id').value.trim();
  document.getElementById('v-next-1').disabled = !(vState.carrier && memberId);
}
document.getElementById('v-member-id').addEventListener('input', () => {
  vState.memberId = document.getElementById('v-member-id').value.trim();
  vCheckStep1();
});

document.getElementById('v-next-1').addEventListener('click', () => {
  vState.memberId = document.getElementById('v-member-id').value.trim();
  vState.groupNum = document.getElementById('v-group-num').value.trim();
  vStep(2);
  gtagSafe('verify_step_1_complete', { carrier: vState.carrier, dentist_id: vState.dentistId });
});

// Step 2 validation
function vCheckStep2() {
  const name = document.getElementById('v-name').value.trim();
  const email = document.getElementById('v-email').value.trim();
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  document.getElementById('v-next-2').disabled = !(name && emailValid);
}
['v-name','v-email','v-phone'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', vCheckStep2);
});

document.getElementById('v-next-2').addEventListener('click', () => {
  vState.name = document.getElementById('v-name').value.trim();
  vState.email = document.getElementById('v-email').value.trim();
  vState.phone = document.getElementById('v-phone').value.trim();
  vState.notifPref = document.querySelector('input[name="v-notif"]:checked')?.value || 'covercapy_notifies';

  // Build preview message
  const isDirect = vState.notifPref === 'direct';
  let preview = `Hi ${vState.dentistName},\n\n`;
  preview += `I found your practice on CoverCapy (covercapy.com) and I'd like to book a visit.\n\n`;
  preview += `Could you confirm whether your office accepts ${vState.carrier} and is taking new patients?\n`;
  if (isDirect) {
    preview += `\nYou can reach me at:\n  Email: ${vState.email}`;
    if (vState.phone) preview += `\n  Phone: ${vState.phone}`;
  }
  preview += `\n\nThank you`;

  document.getElementById('v-preview-msg').value = preview;
  document.getElementById('v-dest-email').textContent =
    vState.dentistEmail ? maskEmail(vState.dentistEmail) : '(office contact on file)';
  document.getElementById('v-suc-email').textContent = vState.email;

  vStep(3);
  gtagSafe('verify_step_2_complete', { dentist_id: vState.dentistId, notif_pref: vState.notifPref });
});

function maskEmail(email) {
  const [user, domain] = email.split('@');
  return user[0] + '***@' + domain;
}

// Submit
document.getElementById('v-send-btn').addEventListener('click', async () => {
  const btn = document.getElementById('v-send-btn');
  btn.disabled = true;
  btn.textContent = 'Sending...';

  const payload = {
    dentist_id: vState.dentistId,
    dentist_name: vState.dentistName,
    dentist_email: vState.dentistEmail,
    carrier: vState.carrier,
    member_id_provided: !!vState.memberId,
    group_provided: !!vState.groupNum,
    patient_name: vState.name,
    patient_email: vState.email,
    patient_phone: vState.phone || null,
    notif_pref: vState.notifPref,
    message: document.getElementById('v-preview-msg').value,
    create_account: document.getElementById('v-create-account').checked,
  };

  try {
    const res = await fetch('/api/verify-ppo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Send failed');

    document.getElementById('v-suc-office').textContent = vState.dentistName;
    document.getElementById('v-suc-office-2').textContent = vState.dentistName;
    vStep('success');
    gtagSafe('verify_submitted', { dentist_id: vState.dentistId, carrier: vState.carrier });
  } catch (e) {
    btn.disabled = false;
    btn.textContent = 'Send failed — try again';
    console.error('Verify send error:', e);
  }
});

async function fetchVerifyCount(dentistId) {
  try {
    const r = await fetch(`/api/verify-count?dentist_id=${dentistId}`);
    const { count } = await r.json();
    return count || 0;
  } catch { return 0; }
}
```

---

## SUPABASE SCHEMA — verification_requests

```sql
CREATE TABLE verification_requests (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dentist_id       TEXT NOT NULL,
  patient_email    TEXT NOT NULL,
  patient_name     TEXT,
  patient_phone    TEXT,
  carrier          TEXT NOT NULL,
  member_id_provided BOOLEAN DEFAULT false,
  group_provided   BOOLEAN DEFAULT false,
  notification_pref TEXT DEFAULT 'covercapy_notifies',
  message_sent     TEXT,
  office_email_used TEXT,
  status           TEXT DEFAULT 'pending',  -- pending | replied | expired
  created_at       TIMESTAMPTZ DEFAULT now(),
  replied_at       TIMESTAMPTZ,
  follow_up_1_sent TIMESTAMPTZ,
  follow_up_2_sent TIMESTAMPTZ
);

CREATE INDEX ON verification_requests (dentist_id);
CREATE INDEX ON verification_requests (patient_email);
CREATE INDEX ON verification_requests (status, created_at);
```

## SUPABASE EDGE FUNCTION — verify-ppo

```typescript
// supabase/functions/verify-ppo/index.ts
import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_KEY = Deno.env.get("RESEND_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

serve(async (req) => {
  const body = await req.json();
  const {
    dentist_id, dentist_name, dentist_email,
    carrier, member_id_provided, group_provided,
    patient_name, patient_email, patient_phone,
    notif_pref, message, create_account,
  } = body;

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  // 1. Log to DB (never log member IDs)
  await supabase.from('verification_requests').insert({
    dentist_id, patient_email, patient_name, patient_phone,
    carrier, member_id_provided, group_provided,
    notification_pref: notif_pref,
    message_sent: message,
    office_email_used: dentist_email,
  });

  // 2. Email to office
  if (dentist_email) {
    const officeSubject = `New patient inquiry — PPO coverage question`;
    const officeBody = buildOfficeEmail(
      dentist_name, carrier, patient_name,
      patient_email, patient_phone, notif_pref, dentist_id
    );
    await resendSend({
      from: "CoverCapy Verify <verify@covercapy.com>",
      to: dentist_email,
      reply_to: patient_email,
      subject: officeSubject,
      html: officeBody,
    });
  }

  // 3. Confirmation to patient
  await resendSend({
    from: "CoverCapy <notify@covercapy.com>",
    to: patient_email,
    subject: `We sent your verification to ${dentist_name}`,
    html: buildPatientConfirmEmail(patient_name, dentist_name, carrier, patient_email),
  });

  // 4. Create account if requested
  if (create_account) {
    await supabase.auth.admin.inviteUserByEmail(patient_email);
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
});

async function resendSend(payload: object) {
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}
```

---

## QA CHECKLIST
- [ ] Carrier selection required before Step 2 activates
- [ ] Member ID required, Group # optional
- [ ] Delta Dental note appears correctly for both PPO and Premier
- [ ] "Other" text field appears on Other selection
- [ ] Step 2 Next button disabled until name + valid email present
- [ ] Notification preference defaults to "Notify me"
- [ ] Preview message updates correctly for both notification prefs
- [ ] Direct pref: patient email + phone appear in preview
- [ ] CoverCapy notifies pref: patient email + phone NOT in preview
- [ ] Destination email masked in Step 3
- [ ] Account checkbox unchecked by default
- [ ] Success state shows patient email
- [ ] Success timeline renders
- [ ] Office email sends correctly (check Resend logs)
- [ ] Patient confirmation email sends correctly
- [ ] DB row created (verify in Supabase dashboard)
- [ ] member_id never logged in DB
- [ ] Modal closes cleanly, focus restored
- [ ] All steps accessible by keyboard
- [ ] Mobile: tiles 2-column, inputs full-width
- [ ] Step progress bar tracks correctly
