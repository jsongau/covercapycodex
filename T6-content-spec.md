# T6 Content Specification — Copy, Bio, FAQ, UX Language
## CoverCapy | June 2026

---

## Why Content Quality Decides Whether T6 Wins

T6 pages compete against Healthgrades, Zocdoc, WebMD, and the doctor's own website. Every single one of those has the doctor's name, credential, and office address. CoverCapy's T6 pages win on:

1. PPO insurance angle that no other directory owns
2. GEO-optimized long-form bios that AI engines can quote
3. FAQ depth that hits the exact questions patients type into ChatGPT
4. Bidirectional linking (T5 ↔ T6) that builds page authority

Thin content = no indexing. Thin content at scale = domain authority penalty.

**Minimum content to publish a T6 page:**
- Bio: 150 words (generated from template)
- FAQs: 3 minimum, 8-10 for high-priority profiles
- At least 1 linked T5 office with verifiable NPI or license

---

## Content Tiers

### Tier 1 — Minimal (NPI match only, no bio scraped)

Use when: Doctor identified via NPPES but no practice website bio found.

What you have: Name, credential, dental school (sometimes), specialty taxonomy, license number, city, office name.

**Generated bio template (130-160 words):**
```
Dr. {First Last}, {Credential}, is a {specialty} dentist practicing at {Office Name} 
in {City}, {State}. {He/She/They} holds a {degree} and is licensed in 
{State}, where {he/she/they} has served {the Beverly Hills community / the 
greater Houston area} for {years_experience ? years_experience + ' years' : 'over a decade'}.

{Office Name} accepts {top 2 carriers} and several other PPO dental insurance 
plans. Patients can verify their coverage directly through CoverCapy before 
scheduling their first appointment.

{If dental_school: Dr. {Last Name} earned {his/her/their} {degree} from {dental_school}.}

{If accepting_new_patients != false: Dr. {Last Name} is currently accepting new patients 
at {Office Name}. CoverCapy makes it easy to confirm your PPO benefits apply before 
your visit — at no cost.}
```

**Generated FAQ set — Tier 1 (3 questions):**
See FAQ templates below.

**T6 page robots directive:** `index, follow` (but only if NPI verified)

---

### Tier 2 — Standard (NPI + scraped bio)

Use when: NPI match AND website bio successfully scraped.

What you have: All Tier 1 data plus scraper-extracted bio, possibly education, possibly languages.

**Custom bio target:** 250-400 words. Blend scraped content with PPO insurance angle:

```
Dr. {Name}, {Credential}, brings {X} years of {specialty} dentistry to 
{City}'s {area descriptor: "Pacific Palisades community" / "downtown Phoenix"}. 
At {Office Name}, {he/she/they} focuses on {top 3 procedures} — offering 
{concierge-style care / advanced cosmetic techniques / family-centered dentistry} 
to patients throughout {market area}.

[SCRAPED BIO PARAGRAPH — cleaned, reformatted. Remove: "Our team is dedicated to..." 
Remove: generic mission statements. Keep: specific technique mentions, education, 
philosophy, community involvement.]

Dr. {Last Name} accepts {top 2-3 carriers from office data} at {Office Name}. 
{If multi-office: Additional locations in {City 2} also accept {carrier}.} 
Patients who haven't yet enrolled in a PPO plan can compare options on CoverCapy 
— coverage can activate as quickly as the next business day with select carriers.

{If dental_school: {He/She/They} earned {his/her/their} {Credential} from 
{dental_school}{grad_year ? ' in ' + grad_year : ''}.}

{If languages and languages.length > 1: Dr. {Last Name} serves patients 
in {languages.join(', ')}.}
```

---

### Tier 3 — Full (Claimed profile)

Use when: Doctor has claimed and filled in their own profile.

What you have: Custom bio, professional photo, review quote, awards, publications, board certifications.

**Bio length target:** 400-800 words. Free-form within luxury editorial voice.

**Luxury voice rules:**
- No em-dashes (use commas, colons, or new sentences)
- No "we" or "our team" (this is a person profile, not a practice)
- No "passionate about dentistry" (overused, meaningless)
- No "gentle and caring" (same)
- Specific over generic: "Fraunhofer-trained in ceramic layering" beats "advanced techniques"
- Use patient outcomes: "patients who once avoided the dentist now come in twice a year"
- Use place-names: "grew up in Alhambra", "trained in New York", "returned to Southern California"

---

## Bio Template — Full Sample (Dr. David Abri)

This is a Tier 3 example for the primary T6 test case. Use as editorial benchmark.

```
Dr. David Abri, DDS, has built one of Beverly Hills' most recognized cosmetic 
dental practices over two decades of precision-focused care. At Abri Dental Beverly 
Hills, he treats patients ranging from entertainment professionals to medical practitioners 
who understand that appearance and oral function are inseparable.

Dr. Abri completed his Doctor of Dental Surgery at UCLA School of Dentistry, where 
he developed an early focus on ceramic restorations and smile design. After graduation, 
he pursued advanced training in TMJ treatment and implant dentistry, two areas that 
now form the core of his clinical practice.

His Beverly Hills office accepts Aetna and Anthem Blue Cross PPO plans, along with 
several other major carriers. For patients who have recently changed jobs or aged out 
of a parent's plan, CoverCapy can match them with a PPO that Dr. Abri accepts, 
sometimes with coverage starting as soon as the following business day.

Dr. Abri also maintains a Burbank location for patients in the San Fernando Valley, 
making his specialized care accessible without requiring a drive into central Los Angeles.

He speaks English and Russian, and his practice is known for accommodating patients 
with dental anxiety through a measured, explanation-first approach.

Dr. Abri is currently accepting new patients at both locations.
```

Word count: ~200 words. Tone: luxury, editorial, specific. No filler phrases. No team language.

---

## FAQ Templates

### Core 10 FAQ Questions (All T6 Pages)

Use all 10 for Tier 2/3. Use first 3 for Tier 1.

**Q1. Does Dr. {Name} accept {Carrier} dental insurance?**
```
Dr. {Name} accepts {carrier_list_from_offices} PPO plans at {primary_office}. 
{If multi-carrier: Additional carriers accepted include {remaining_carriers}.}
You can verify whether your specific plan is in-network by using CoverCapy's 
free PPO verification tool on this page.
```

**Q2. Where does Dr. {Name} practice?**
```
Dr. {Name} practices at {Office Name}, located at {full_address}. 
{If multi-office: {He/She/They} also sees patients at {Office 2 name} in {City 2}.}
{phone_formatted} | {website_stripped_of_utm}
```

**Q3. What is Dr. {Name}'s NPI number?**
```
Dr. {Name}'s National Provider Identifier (NPI) is {npi}. 
This number is registered with NPPES, the federal provider registry, 
under {First Name} {Last Name}, {credential}, licensed in {State}.
```
*Only include if NPI is populated. This is the highest GEO-signal FAQ.*

**Q4. Is Dr. {Name} accepting new patients?**
```
{If accepting_new_patients_override = true:}
Yes, Dr. {Name} is currently accepting new patients at {Office Name}.

{If accepting_new_patients_override = false:}
Dr. {Name}'s schedule is currently full. Contact {Office Name} at {phone} 
to ask about the waitlist.

{If null (default):}
Contact {Office Name} at {phone_formatted} to confirm current availability. 
New patient appointments at PPO-accepting practices often open 2-3 weeks out.
```

**Q5. What procedures does Dr. {Name} offer?**
```
At {Office Name}, Dr. {Name} provides: {procedures list, natural language}.
{If procedures.length > 8: This list reflects services available at the primary location. 
Additional treatments may be offered at {city} offices.}
```

**Q6. What dental school did Dr. {Name} attend?**
```
{If dental_school populated:}
Dr. {Name} earned {his/her/their} {degree || 'DDS'} from {dental_school}
{grad_year ? 'in ' + grad_year : ''}.

{If dental_school null:}
Dr. {Name}'s dental school information is not currently listed on this profile. 
Contact {Office Name} directly for full credentials.
```

**Q7. Does Dr. {Name} speak languages other than English?**
```
{If languages.length > 1:}
Dr. {Name} serves patients in {languages.slice(1).join(' and ')} in addition to English.

{If languages = ['English'] or empty:}
Dr. {Name}'s profile does not currently indicate additional language services.
Contact {Office Name} to ask about interpreter availability.
```

**Q8. How do I verify my PPO insurance before seeing Dr. {Name}?**
```
Use CoverCapy's free PPO verification tool above. You'll need your insurance 
carrier name and member ID. CoverCapy will check whether {Office Name} is 
in-network for your specific plan before you schedule. The process takes 
about 2 minutes and there is no cost.
```

**Q9. How long has Dr. {Name} been practicing dentistry?**
```
{If years_experience populated:}
Dr. {Name} has {years_experience} years of experience in {primary specialty}.

{If grad_year populated:}
Dr. {Name} has been practicing since {grad_year}, giving {him/her/them} 
{current_year - grad_year} years of clinical experience.

{If both null:}
Dr. {Name}'s years of experience are not listed on this profile. 
{Office Name} can provide full credential information by phone.
```

**Q10. What makes Dr. {Name} different from other dentists in {City}?**
```
{This is the one free-text FAQ — generated from scraped/custom bio highlights.}

Dr. {Name} stands out in {City} for {top_1_distinguisher}. 
{If implants or cosmetics in procedures: {He/She/They} has advanced 
training in {top specialty}.} 
{If platinum_elite: {Name} holds CoverCapy's Platinum Elite accreditation, 
which recognizes digital-workflow practices with advanced imaging and 
same-day crown capability.}
{If capy_accredited: {Name}'s practice is Capy Accredited by CoverCapy, 
meeting modern standards for digital workflows and patient experience.}
```

---

## Spanish FAQ Block

Generate this block when `provider.languages` includes 'Spanish'. Insert after English FAQs as its own section. Add `hreflang="es"` section tag.

```html
<section class="module" id="preguntas-frecuentes-es" lang="es">
  <span class="eyebrow">En español</span>
  <h2>Preguntas frecuentes sobre el Dr. {Name}</h2>
  
  <details class="faq-item">
    <summary>¿El Dr. {Name} habla español?</summary>
    <p>Sí, el Dr. {Name} atiende a pacientes en español en {Office Name} 
    en {City}.</p>
  </details>
  
  <details class="faq-item">
    <summary>¿Acepta el Dr. {Name} mi seguro dental PPO?</summary>
    <p>El Dr. {Name} acepta {carrier_1} y {carrier_2} en {Office Name}. 
    Puede verificar su cobertura gratis a través de CoverCapy antes de 
    hacer su cita.</p>
  </details>
  
  <details class="faq-item">
    <summary>¿Cómo puedo hacer una cita con el Dr. {Name}?</summary>
    <p>Llame a {Office Name} al {phone_formatted} o haga clic en 
    "Verificar mi cobertura" arriba para confirmar que su seguro aplica 
    antes de agendar.</p>
  </details>
  
  <details class="faq-item">
    <summary>¿Está aceptando nuevos pacientes el Dr. {Name}?</summary>
    <p>{accepting_new_patients_override === true 
      ? 'Sí, el Dr. ' + name + ' está aceptando nuevos pacientes actualmente.'
      : 'Contacte a ' + office_name + ' al ' + phone + ' para confirmar disponibilidad.'
    }</p>
  </details>
  
  <details class="faq-item">
    <summary>¿Qué tratamientos ofrece el Dr. {Name}?</summary>
    <p>El Dr. {Name} ofrece {procedures_spanish_list} en {Office Name}.</p>
  </details>
</section>
```

Note: Procedure name translations must come from a lookup table, not AI translation, to avoid inaccuracies. Maintain a `procedures-es.json` mapping in `seo-build/data/`.

---

## "Why Consider Dr. {Name}" Section Copy

This is the first section on the T6 page. It's the hook. The current T6 template uses generic benefit bullets. Replace with a conversion-first narrative block.

### Current (weak)
```
✓ PPO Insurance Accepted
✓ Verified Credentials  
✓ Accepting New Patients
```

### Rewrite (luxury, conversion-optimized)

**Framework:** Benefit → Evidence → Action

```html
<section class="module" id="why-consider">
  <span class="eyebrow">Why patients choose Dr. {Last Name}</span>
  
  <div class="why-grid">
    
    <div class="why-item">
      <div class="why-icon">◈</div>
      <div class="why-body">
        <strong>PPO coverage confirmed before you sit down</strong>
        <p>CoverCapy verifies whether your {top_carrier} plan applies at 
        {Office Name} before you schedule. No surprises at checkout.</p>
      </div>
    </div>
    
    {If npi or license_verified:}
    <div class="why-item">
      <div class="why-icon">◈</div>
      <div class="why-body">
        <strong>Licensed and federally registered</strong>
        <p>Dr. {Name}'s {State} dental license and NPI registration 
        are verified{license_verified ? ' by CoverCapy' : ''}. 
        {If license_number: License {license_number}.}</p>
      </div>
    </div>
    
    {If specialties.length > 0:}
    <div class="why-item">
      <div class="why-icon">◈</div>
      <div class="why-body">
        <strong>{top_specialty} focus</strong>
        <p>{Specialty-specific benefit sentence. E.g.: "Patients seeking 
        cosmetic work or implants won't be referred out — Dr. {Last Name} 
        handles both in-house."}</p>
      </div>
    </div>
    
    {If rating >= 4.5 and review_count >= 20:}
    <div class="why-item">
      <div class="why-icon">◈</div>
      <div class="why-body">
        <strong>{rating} stars across {review_count} verified reviews</strong>
        <p>{review_quote || 'Patients consistently cite efficiency and clear 
        communication as standout qualities.'}</p>
      </div>
    </div>
    
    {If languages.length > 1:}
    <div class="why-item">
      <div class="why-icon">◈</div>
      <div class="why-body">
        <strong>Serves patients in {languages.join(', ')}</strong>
        <p>No interpreter needed for {non-English language} speakers 
        seeking {City}-area PPO dental care.</p>
      </div>
    </div>
    
  </div>
</section>
```

**Copy rules for this section:**
- Maximum 4 items — never more, focus wins over completeness
- Each item = one specific claim with evidence (not "dedicated to your care")
- No bullet lists — use structured cards with icon
- The first item must always be about PPO verification (CoverCapy's core value)

---

## Photo Fallback — Monogram System

When `photo_url` is null, display a monogram avatar. Style matches luxury brand initials feel.

```html
<div class="provider-photo-wrap">
  {prov.photo_url 
    ? `<img src="${prov.photo_url}" alt="Dr. ${esc(prov.name)}" 
         class="provider-photo" width="160" height="160" loading="eager">`
    : `<div class="provider-monogram" aria-label="Dr. ${esc(prov.name)}">
         ${initials(prov.name)}
       </div>`
  }
  {prov.license_verified 
    ? `<span class="verify-badge">License Verified</span>`
    : ''
  }
</div>
```

```css
.provider-monogram {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: var(--teal-night);
  color: var(--mint);
  font-family: 'Fraunces', serif;
  font-size: 3rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.02em;
}
```

```javascript
function initials(name) {
  // "David Abri" → "DA", "Maria De La Cruz" → "MD"
  const parts = name.replace(/^Dr\.?\s+/i, '').split(/\s+/);
  return (parts[0]?.[0] || '') + (parts[parts.length - 1]?.[0] || '');
}
```

**Design note:** Monogram uses `--teal-night` + `--mint` color pair — same as T5 office cards. Maintains brand consistency when photos are missing. NEVER use a generic avatar icon or silhouette.

---

## Luxury Copy Audit — Words to Replace

| Remove | Replace with |
|--------|-------------|
| "passionate about" | specific expertise mention |
| "dedicated to" | specific outcome claim |
| "gentle and caring" | specific technique ("sedation available", "explanation-first") |
| "state-of-the-art" | name the actual technology (iTero, CBCT, CEREC) |
| "comprehensive care" | list actual procedures |
| "our team" | "Dr. {Name}" (person profile, not practice) |
| "we strive to" | delete |
| "smile makeover" | "ceramic restorations" / "composite bonding" / specific |
| "oral health" (as filler) | delete if no specifics follow |
| "conveniently located" | use the actual neighborhood name |
| "accepting most insurances" | name the actual carriers |
| "quality dental care" | delete entirely |

---

## Credential Storytelling Framework

When `dental_school` and `grad_year` are populated, use this narrative pattern:

**Avoid:** "Dr. X received his DDS from UCLA in 2001."
**Write:** "Dr. X earned his doctorate from UCLA's School of Dentistry in 2001, where he completed clinical rotations in oral surgery alongside general dentistry training."

The second version:
- Is 3x the length but contains real information
- Gives AI engines something specific to quote for "where did Dr. X go to school"
- Positions the doctor's education as a narrative, not a checklist

**Dental school name completions** (never abbreviate in prose):
- UCLA → University of California, Los Angeles School of Dentistry
- USC → Herman Ostrow School of Dentistry of USC
- NYU → NYU College of Dentistry
- UT Houston → UT Health Houston School of Dentistry
- Loma Linda → Loma Linda University School of Dentistry

---

## Membership Tier Copy

T6 pages should surface membership tier context when it adds value to the patient narrative. Never mention the tier name directly ("Platinum Elite") to patients.

| Tier | Patient-facing language |
|------|------------------------|
| platinum_elite | "CoverCapy Platinum accredited. {Office Name} meets advanced clinical standards including digital imaging, intraoral scanning, and same-day restoration capability." |
| capy_accredited | "CoverCapy Accredited. {Office Name} uses digital clinical workflows and meets current-standard care criteria." |
| free | No tier mention — focus on PPO verification and review rating |

Only mention accreditation in the "Why Consider" section or about section, not in FAQ answers.

---

## Character and Word Counts by Section

| Section | Tier 1 | Tier 2 | Tier 3 |
|---------|--------|--------|--------|
| Bio | 130-160 words | 250-350 words | 400-800 words |
| FAQ questions | 3 | 6-8 | 10 |
| Why Consider items | 2 (PPO + license) | 3 | 4 |
| Spanish FAQ | No | Yes if Spanish spoken | Yes if Spanish spoken |
| Review quote | No | No | Yes if populated |
| Awards/publications | No | No | Yes if populated |

---

## Content QA Checklist (Before Setting `is_published = true`)

- [ ] No em-dashes in any copy
- [ ] No roman numerals (use 1, 2, 3)
- [ ] No "our team" language (person profile)
- [ ] Bio is at least 130 words
- [ ] NPI displayed if populated
- [ ] At least 3 FAQs with real answers (not "contact us")
- [ ] Primary office phone number present
- [ ] Canonical URL matches `/doctors/{stSlug}/{docSlug}/`
- [ ] Title tag baked in static HTML
- [ ] JSON-LD baked in static HTML (not injected client-side)
- [ ] Breadcrumb visible in HTML AND in JSON-LD
- [ ] `sameAs` is an array, not a string
- [ ] No UTM params on website URL
- [ ] Photo OR monogram renders (never broken img)
- [ ] All T5 office links built from parts, not `seo_path`
