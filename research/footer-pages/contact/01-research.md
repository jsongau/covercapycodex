# 01 — Research: contact page

This page reuses REAL contact details already published on the existing `contacts.html`
(the legacy contact page). No new contact info is invented.

## Real contact details (source of truth: /contacts.html in repo)
- Primary email: **contact@covercapy.com** (the only published address; used for all routes).
- Audiences served, per contacts.html:
  - Patients: PPO plan options, treatment cost estimates, dentist discovery.
  - Dentists/practices: claim or update a profile, Capy Accreditation, sponsored listings, listing corrections.
  - Privacy / accessibility / legal notices: include page URL + clear description.
- Emergency notice (verbatim intent from contacts.html): CoverCapy does NOT provide emergency
  dental or medical care; for urgent symptoms contact a licensed professional, urgent care, or
  emergency services.

## Why a new contact.html
The new universal footer links to `/contact.html`. The legacy `contacts.html` exists but the footer
link points at `/contact.html`. This page makes that link resolve in CoverCapy's concierge voice and
the new scaffolding pattern, while keeping the same real email and the same audience routing.

## Do-not list
- Do NOT invent a phone number, mailing address, support hours, or second email.
- Keep contact@covercapy.com as the single published channel.
- No em-dashes, no roman numerals.
