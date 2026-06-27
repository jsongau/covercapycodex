# Modal Redesign — Project Manager
## CoverCapy | June 2026

Two deliverables. Run in sequence. Each has its own spec file.

---

## DELIVERABLE 1 — Exit Handoff Modal
**Spec:** `modal-exit-spec.md`
**Target file:** `find-my-dentist.html` (and any page with dentist outbound links)
**Complexity:** Low — HTML + CSS + JS, no backend

### Tasks (in order)

**TASK 1.1 — Replace modal HTML**
- Find `id="m-exit"` in `find-my-dentist.html`
- If it doesn't exist, find the existing exit/outbound modal (search for `openExitModal` or `walking`)
- Replace with the HTML template in `modal-exit-spec.md` → section "HTML Template"
- Verify: modal ID is `m-exit`, heading ID is `exit-modal-title`, ARIA attributes present

**TASK 1.2 — Add CSS**
- Find the `<style>` block in `find-my-dentist.html`
- Append all `.exit-modal-*` and `.exit-quick-*` CSS from spec → section "CSS Tokens"
- Verify: all `var(--*)` references exist in the `:root` block of the same file

**TASK 1.3 — Add JavaScript**
- Find the `<script>` block at bottom of `find-my-dentist.html`
- Add `openExitModal(dentist)` function from spec → section "JavaScript — openExitModal(dentist)"
- Update any existing call to the old exit modal to call `openExitModal(dentist)` instead
- Verify: `openModal()` and `closeModal()` helpers already exist in the file

**TASK 1.4 — Wire to dentist website links**
- Search for `d.website` or `target="_blank"` in `find-my-dentist.html` (dentist cards)
- Replace `href="${d.website}"` with `onclick="openExitModal(dentist); return false;" href="#"`
- OR: wrap in a click handler that calls `openExitModal` with the dentist object
- Verify: clicking a dentist's "Visit website" link opens the exit modal, not a direct nav

**TASK 1.5 — QA**
- Open a dentist profile with a known website (e.g., KYT Dental Services)
- Click "Visit website" → exit modal should open
- Verify: practice name renders in italic serif
- Verify: "Show office details instead" reveals the quick info panel
- Verify: "Open [name]'s website →" opens correct URL in new tab
- Verify: modal closes, focus returns to triggering element
- Verify: no dashes in any copy
- Run in mobile viewport (375px) — footer buttons must not be clipped

**Acceptance criteria:**
- No roman numerals in copy
- No em-dashes in copy
- Practice name in italic serif (`<em>` inside Fraunces heading)
- Stay button shows quick info panel (phone, address, CTA)
- Leave button fires `window.open()` to dentist website
- `gtag` events fire on both paths

---

## DELIVERABLE 2 — PPO Verification Modal
**Spec:** `modal-verification-spec.md`
**Target files:** `find-my-dentist.html` (primary), potentially `dentists/*.html` pages
**Complexity:** High — HTML + CSS + JS (frontend) + Supabase Edge Function + Resend (backend)

### Phase A — Frontend (HTML/CSS/JS only, no backend yet)

**TASK 2A.1 — Replace modal HTML**
- Find `id="m-verify"` in `find-my-dentist.html` (line ~2081)
- Replace the existing 15-line modal with the full 3-step modal from spec → sections "Step 1", "Step 2", "Step 3", "Success State"
- Wrap all steps inside the existing `<div class="scrim" id="m-verify">` container
- Add progress bar segments above step content: `<div class="v-progress-bar"><div id="v-prog-1" class="v-progress-seg active"></div><div id="v-prog-2" class="v-progress-seg"></div><div id="v-prog-3" class="v-progress-seg"></div></div>`

**TASK 2A.2 — Add CSS**
- Append all `.v-*` CSS from spec → section "CSS ADDITIONS"
- Verify: no conflicts with existing `.modal`, `.inp`, `.btn-dark`, `.btn-ghost` classes
- The new CSS extends, not replaces, existing modal styles

**TASK 2A.3 — Add JavaScript controller**
- Add the full `vState` object and all functions from spec → section "JAVASCRIPT — Full Controller"
- Replace the existing `openPpoCheck()` / `submitPpoCheck()` functions
- Keep existing `openModal()` / `closeModal()` helpers
- Verify: `openPpoVerify(dentist)` is the new entry point

**TASK 2A.4 — Update all call sites**
- Search for `openPpoCheck(` in `find-my-dentist.html`
- Replace all calls with `openPpoVerify(dentist)` passing the full dentist object
- Verify: the verify button on dentist cards passes `{id, name, email, phone}` at minimum

**TASK 2A.5 — Frontend QA (no backend required)**
- Step 1: Select a carrier → member ID field appears → type member ID → Next activates
- "Delta Dental PPO" or "Delta Dental Premier" → gold note appears
- "Other" → text input appears
- Step 2: Fill name + email → Next activates → notification toggle works
- Step 3: Preview text renders with patient name and carrier → destination email masked
- All three progress bar segments update correctly
- Back buttons work (Step 3 → 2 → 1)
- Mobile (375px): carrier tiles are 2-column, inputs full-width, submit button is thumb-tappable

**TASK 2A.6 — Stub the submit endpoint**
- Temporarily wire submit button to: `console.log('payload:', payload); vStep('success');`
- This lets you QA the success state without backend
- Remove stub before Phase B

---

### Phase B — Backend (Supabase Edge Function + Resend)

**Prerequisites before starting Phase B:**
- [ ] Resend account created at resend.com
- [ ] `covercapy.com` domain verified in Resend
- [ ] DNS records added: SPF, DKIM (Resend provides these)
- [ ] DMARC record added to DNS
- [ ] Resend API key obtained

**TASK 2B.1 — Create Supabase table**
- Go to Supabase dashboard → hfvbeqlefwwjlrbyxpbj → SQL Editor
- Run the `CREATE TABLE verification_requests` SQL from spec → section "SUPABASE SCHEMA"
- Verify: table visible in Table Editor with all columns

**TASK 2B.2 — Add dentist email to DB**
- Check if `email` column exists on `dentists` table:
  ```sql
  SELECT column_name FROM information_schema.columns
  WHERE table_name = 'dentists' AND column_name = 'email';
  ```
- If missing: `ALTER TABLE dentists ADD COLUMN email TEXT;`
- If it exists under a different name (e.g., `contact_email`, `office_email`): update all references in the JS to use the correct column name
- Add email to all fetch queries that support the verification modal

**TASK 2B.3 — Create Edge Function**
- Create `supabase/functions/verify-ppo/index.ts` with content from spec → section "SUPABASE EDGE FUNCTION"
- Deploy: `supabase functions deploy verify-ppo --no-verify-jwt`
- Set secrets:
  ```bash
  supabase secrets set RESEND_API_KEY=re_xxxx
  ```
- Test: `supabase functions invoke verify-ppo --body '{"test":true}'`

**TASK 2B.4 — Create verify-count endpoint**
- Create `supabase/functions/verify-count/index.ts`:
  ```typescript
  import { serve } from "https://deno.land/std/http/server.ts";
  import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
  serve(async (req) => {
    const url = new URL(req.url);
    const dentistId = url.searchParams.get('dentist_id');
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );
    const { count } = await supabase
      .from('verification_requests')
      .select('*', { count: 'exact', head: true })
      .eq('dentist_id', dentistId);
    return new Response(JSON.stringify({ count }), {
      headers: { "Content-Type": "application/json" }
    });
  });
  ```
- Deploy: `supabase functions deploy verify-count --no-verify-jwt`

**TASK 2B.5 — Wire submit to real endpoint**
- Remove the stub from TASK 2A.6
- Update `fetch('/api/verify-ppo', ...)` to point to actual Supabase Edge Function URL:
  `https://hfvbeqlefwwjlrbyxpbj.supabase.co/functions/v1/verify-ppo`
- Add `Authorization: Bearer [anon key]` header to the fetch call
- Use the Supabase anon key (publishable, safe for client)

**TASK 2B.6 — Backend QA**
- Submit a test verification using your own email + a test dentist
- Verify: row appears in `verification_requests` table in Supabase
- Verify: `member_id_provided` = true, `id` column NOT in DB (never stored)
- Verify: office email received (check Resend Activity log)
- Verify: patient confirmation email received
- Verify: email reply-to is set to patient email

---

### Phase C — Account Integration (Future)

**TASK 2C.1 — Magic link flow**
- When `create_account: true` in payload, Edge Function calls `supabase.auth.admin.inviteUserByEmail()`
- Patient receives magic link email + verification confirmation in same inbox
- On magic link click: patient lands on `/dashboard` with this verification pre-loaded
- Dashboard shows: carrier, office name, status (pending/replied), created_at

**TASK 2C.2 — Follow-up sequences**
- Supabase scheduled Edge Function runs nightly
- Query: `verification_requests WHERE status = 'pending' AND created_at < now() - interval '24 hours' AND follow_up_1_sent IS NULL`
- Send follow-up email to patient: "Still waiting on [Office Name]. Here are 2 other dentists in [city] who accept [carrier]."
- Mark `follow_up_1_sent = now()`
- 48h: second follow-up with direct office phone

**TASK 2C.3 — Reply detection**
- When office replies to `verify@covercapy.com`, Resend webhook fires
- Parse reply body, find original `verification_request` by `reply_to` match
- Update `status = 'replied'`, `replied_at = now()`
- Send patient: "Great news — [Office Name] replied to your coverage question."

---

## SHIPPING ORDER

```
Week 1:
  ✓ TASK 1.1 → 1.5  (Exit modal — fully frontend, ship fast)
  ✓ TASK 2A.1 → 2A.6 (Verification modal frontend + stub)

Week 2:
  ✓ TASK 2B.1  (Supabase table)
  ✓ TASK 2B.2  (dentist email column)
  ✓ TASK 2B.3  (Edge Function — verify-ppo)
  ✓ TASK 2B.4  (Edge Function — verify-count)
  ✓ TASK 2B.5  (Wire real endpoint)
  ✓ TASK 2B.6  (Backend QA)

Week 3+:
  ○ TASK 2C.1  (Account magic link)
  ○ TASK 2C.2  (Follow-up sequences)
  ○ TASK 2C.3  (Reply detection webhook)
```

---

## OPEN QUESTIONS (resolve before Phase B)

1. **Does the `dentists` table have an `email` column?** If not, add it and seed from Google Business Profile data where available.
2. **Resend domain verification** — needs DNS access to covercapy.com. Who manages DNS?
3. **Supabase anon key for client-side fetch** — get from Supabase dashboard → Settings → API.
4. **Vercel environment variables** — Resend key must NOT be in client JS. It lives only in Supabase Edge Function secrets.
5. **Patient account system** — does CoverCapy have auth (Supabase Auth)? If yes, task 2C.1 is simpler. If no, magic link creates the account.

---

## FILES IN THIS PROJECT

| File | Purpose |
|------|---------|
| `modal-exit-spec.md` | Exit modal: 10-agent synthesis, full HTML/CSS/JS |
| `modal-verification-spec.md` | Verification modal: 20-agent synthesis, full frontend + backend spec |
| `modal-project-manager.md` | This file — task sequencing, QA, shipping order |
