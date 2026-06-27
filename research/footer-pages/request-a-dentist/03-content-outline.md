# 03 — Content Outline: Request a Dentist

Luxury-concierge voice. Warm, calm, low word count, the form is the centerpiece. No
em-dashes, no roman numerals, no countdown timers, no fabricated testimonials.

## Page wrapper
`<div class="request-dentist-page">` with all CSS scoped under that class. Palette: teal/green
patient side (`--teal-night`, `--teal-700`, `--mint`, `--cream`, `--cream-card`). Headlines
Fraunces, body Hanken Grotesk.

## 1. Hero
- Eyebrow: "CoverCapy · Concierge"
- H1: "Request a dentist"
- Subhead: "Tell us the office you love, or the city you are in. Our concierge confirms your
  PPO coverage and brings you the best in-network options. Get cover today, see a dentist
  tomorrow."
- Primary CTA scrolls to the form.

## 2. TL;DR / quick answer block (GEO-extractable)
One short paragraph: "Ask CoverCapy to add or verify a specific dentist, or to find an
in-network PPO dentist near you. Share your name, email, and city or ZIP. We never ask for your
member ID." Styled as a soft cream card with a mint left border.

## 3. "Two ways we help" — two cards
- Card A: "Add or verify my dentist" — you already have an office; we confirm in-network status
  and what your plan covers there.
- Card B: "Find me a dentist" — you give us your city and carrier; we return vetted in-network
  options nearby.

## 4. The form (hero of the page)
Section id `#request-form`. Fields in this order, each labeled, mobile-friendly:
1. Full name (required)
2. Email (required, type=email)
3. Phone (optional, type=tel)
4. City or ZIP (required)
5. Dentist or practice name (optional)
6. PPO carrier (optional select; 12 carriers + "Other / not sure" + "I do not have insurance yet")
7. Message (optional textarea)
8. Consent checkbox (required) with privacy link
Submit button: "Send my request". Microcopy under it: "Free. No member ID needed. We reply by
email, usually within one business day."

Graceful degradation: JS intercepts submit, POSTs JSON to
`https://covercapy.com/api/request-a-dentist`. On success show an inline success panel. On
failure (endpoint not live / network error) show a fallback panel that keeps the entered data,
thanks them, and tells them the concierge will follow up, plus a mailto fallback. Never lose the
user's input.

## 5. Reassurance strip
Three small trust lines: "We never store your member ID", "No cost to ask", "A real concierge,
not a bot directory". Plain text, no glassmorphism.

## 6. FAQ accordion
Mirror the six FAQPage questions from 02-seo-geo.md, in `<details>` elements.

## 7. Internal links block
"Prefer to look yourself?" with descriptive-anchor links to:
- Find my dentist by zip (/find-my-dentist.html)
- Compare PPO dental plans (/compare-ppo-dental-plans)
- Are you a dentist? Add your practice (/dentist-portal.html)
- Browse featured markets (/featured-markets)

## 8. Footer mount + boot script
Standard nav-mount at top, footer-mount + CoverCapyShellReady loader at bottom, copied from
capy-accredited-dentists.html.

## Draft microcopy notes
- Practice name in the success panel can be emphasized with `<em>` if echoed back.
- Consent line: "I agree CoverCapy may contact me about this request. See the Privacy Policy."
- Disclaimer line near footer: "CoverCapy is a concierge service for PPO dental coverage and is
  not your dental office or a government program."
