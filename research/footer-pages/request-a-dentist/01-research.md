# 01 — Research: Request a Dentist

This page is an interactive concierge form, not a cost/fact page, so its "research" is about
intent, the data we collect, privacy rules, and the existing CoverCapy form patterns. No
external statistics are asserted on the page itself, so there are no external numbers to cite.

## What the page is
A concierge request form. Two jobs in one:
1. "Add / verify a specific dentist I already have" — patient names a practice and CoverCapy
   confirms whether it is in network / can join CoverCapy and verifies coverage.
2. "Find me a dentist in my area" — patient gives city/zip and (optional) PPO carrier, and
   CoverCapy's concierge returns matching in-network options.

## Form fields (final)
| Field | Required | Stored | Notes |
|-------|----------|--------|-------|
| Full name | yes | yes | patient_name |
| Email | yes | yes | patient_email (contact + optional account) |
| Phone | no | yes | patient_phone |
| City or ZIP | yes | yes | location, drives the search radius |
| Dentist / practice name | no | yes | the specific office to add/verify |
| PPO carrier | no | yes | dropdown of common PPO carriers |
| Message | no | yes | free-text request detail |
| Consent checkbox | yes | yes (boolean) | must be checked to submit |

NEVER collected: member ID, group number, SSN, date of birth, insurance card images.
This mirrors the CLAUDE.md rule and the T5 verification wizard pattern: we record
`member_id_provided: boolean` at most, never the actual ID. This form does not even need that
boolean since no plan lookup happens here.

## POST target
`https://covercapy.com/api/request-a-dentist` (Phase B endpoint, not yet live). The form must
degrade gracefully: if the endpoint 404s or the fetch fails, show a friendly fallback that
gives the concierge email/next step and keeps the entered data on screen. Same graceful-degrade
posture the verification wizard uses against `/api/verify-ppo`.

## Carrier dropdown (match the T5 verification wizard's 12 carriers)
Delta Dental PPO, Delta Dental Premier, Cigna, Aetna, MetLife, Guardian, United Concordia,
Anthem Blue Cross, Blue Cross Blue Shield, Humana, United Healthcare, Principal, plus
"Other / not sure" and "I do not have insurance yet". (Delta Dental PPO and Premier listed
separately per CLAUDE.md.)

## Privacy / legal posture
- Consent checkbox text references the Privacy Policy (`/privacy`) and explains CoverCapy may
  contact them about their request.
- No PII beyond what is listed; no member IDs ever.
- The page states plainly that CoverCapy is a concierge service, not the dental office, and not
  a government program (consistent with disclaimer tone on other pages).

## Existing patterns reused (sources in-repo)
- `capy-accredited-dentists.html` — head/GA/AdSense/font/nav-mount/footer-mount/boot-script
  scaffolding, scoped-CSS approach, design tokens.
- `CLAUDE.md` — `verification_requests` table shape (model for `request_a_dentist`), the
  "never store member IDs" rule, carrier list, palette tokens.
- `find-my-dentist.html` and `/compare-ppo-dental-plans` — internal link targets.
- `dentist-portal.html` — link for dentists who want to claim/add their own listing.

## No external facts asserted
Because this is a form, the page makes no national cost/coverage claims. Nothing here needs an
external citation. If future copy adds a statistic, source it with URL + 2026 access date.
