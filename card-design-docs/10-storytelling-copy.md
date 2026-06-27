# Mega-Nav Promo Hero Cards — Storytelling / Copy-Led Redesign

**Lens:** the words carry the card; layout serves one idea each. Voice is a seasoned dental front-office operator telling you plainly what happens and what it costs.

**Compliance note:** no arrows in visible text, CTAs are sentence case and name the action, no all caps, no banned words, no contrast formulas, no filler intros, no synthetic triplets, no invented stats.

**Shared shell**

```css
.mn-card{
  width:300px; padding:24px 22px 20px; border-radius:14px;
  background:var(--ivory,#FFFDF9);
  border:1px solid rgba(20,36,42,.08);
  display:flex; flex-direction:column; gap:14px;
  font-family:system-ui,-apple-system,sans-serif; color:var(--ink,#14242A);
}
.mn-eyebrow{font-size:11px; letter-spacing:.08em; color:#8A6A23; font-weight:600;}
.mn-title{font-family:"Fraunces",Georgia,serif; font-weight:500;
  font-size:22px; line-height:1.18; color:#0E3F44; margin:0;}
.mn-support{font-size:13.5px; line-height:1.5; color:#14242A;}
.mn-cta{align-self:flex-start; font-size:13px; font-weight:600;
  padding:9px 15px; border-radius:9px; text-decoration:none;}
```

---

## Card A — Find a dentist (concierge)

**Concept:** We do the calling. The single idea is that a person on our side phones the offices and checks your plan, so you skip the front-desk runaround. Lead with the work being done for you, not the search box.

**Copy options**

1. *(best)*
   - Eyebrow: For patients
   - Title: We call the offices for you
   - Support: Tell us your plan and your area. We check who takes it, who has openings, and we hand you a short list.
   - CTA: Find a dentist

2.
   - Eyebrow: Concierge
   - Title: Skip the front-desk runaround
   - Support: We confirm your network and ask about openings before you ever pick up the phone.
   - CTA: Start my search

3.
   - Eyebrow: For patients
   - Title: A short list, already vetted
   - Support: Give us your insurance and city. We match offices that take your plan and have room for you.
   - CTA: Find a dentist

**Layout (option 1):** Eyebrow, then the Fraunces title gets two lines and the most height. Support sits tight under it. CTA is a solid teal pill, left-aligned, so the eye lands on the action after the promise. No image; the title is the hero. A thin gold rule under the eyebrow signals the lead card of the panel.

```css
.mn-card--a .mn-title{font-size:24px;}
.mn-card--a .mn-eyebrow{padding-bottom:8px; border-bottom:1px solid rgba(201,162,74,.4);}
.mn-card--a .mn-cta{background:#1B5E5A; color:#FFFDF9;}
.mn-card--a .mn-cta:hover{background:#0E3F44;}
```

**Rationale:** "We call the offices for you" is the one thing a tired patient wants and the one thing competitors do not say plainly. The support line lists the actual steps (network, openings, short list) so the promise feels operational, not slogan-y. CTA names the task the user came to do.

---

## Card B — Insurance featured plan (UnitedHealthcare Primary Dental)

**Concept:** Coverage that works the first day. The single idea is the day-one preventive benefit, which is rare and worth leading with. Name the plan, state the benefit flatly, let the date do the selling.

**Copy options**

1. *(best)*
   - Eyebrow: Featured plan
   - Title: Cleanings covered on day one
   - Support: UnitedHealthcare Primary Dental pays 100% of preventive care from the date you start. No waiting period to use it.
   - CTA: Compare dental plans

2.
   - Eyebrow: UnitedHealthcare Primary Dental
   - Title: No waiting to get cleaned
   - Support: Preventive visits are covered at 100% the day your plan begins, so you can book right away.
   - CTA: See this plan

3.
   - Eyebrow: Featured plan
   - Title: Start the plan, book the cleaning
   - Support: UnitedHealthcare Primary Dental covers preventive care in full from day one, with no waiting period.
   - CTA: Compare dental plans

**Layout (option 1):** Eyebrow names it as the featured plan. The benefit headline is the hero. Plan name moves into the support line so the title stays a plain-English promise. A small cream chip reading "100% preventive, day one" sits between title and support as a factual anchor (it restates the named benefit, not an invented stat). CTA is a gold-outlined pill to read as the money/decision card and distinguish it from card A.

```css
.mn-card--b .mn-chip{
  align-self:flex-start; font-size:11px; font-weight:600;
  background:#F4EDDF; color:#8A6A23;
  padding:5px 10px; border-radius:7px;
}
.mn-card--b .mn-cta{
  background:#FFFDF9; color:#0E3F44;
  border:1.5px solid #C9A24A;
}
.mn-card--b .mn-cta:hover{background:#F4EDDF;}
```

**Rationale:** The day-one benefit is concrete and verifiable from the plan itself, so it carries the card without dressing up. Putting the carrier name in the support line keeps the headline human while still crediting the real product. The chip gives a scannable fact for users who only read headlines; the gold CTA visually marks this as the plans card.

---

## Card C — For dentists (claim profile)

**Concept:** Claim what's already there. The single idea is that the listing exists, claiming is free, and a real person reviews it within three days. Speak to an owner who is busy and skeptical of "free."

**Copy options**

1. *(best)*
   - Eyebrow: For dentists
   - Title: Your office is already listed
   - Support: Claim it to fix your hours, plans, and contact details. It costs nothing, and we review claims within three business days.
   - CTA: Claim your profile

2.
   - Eyebrow: For dentists
   - Title: Make your listing yours
   - Support: Claim the page to keep your plans and hours correct. No fee, and a person reviews each claim within three business days.
   - CTA: Claim your profile

3.
   - Eyebrow: For dentists
   - Title: Keep your plans and hours right
   - Support: Claim your listing for free. We check each one by hand and turn it around in three business days.
   - CTA: Claim your listing

**Layout (option 1):** Eyebrow flags the audience switch (patients above, owners here). Title states the surprising fact that the listing already exists, which pulls owners in. Support carries the three operational facts an owner weighs: what they can fix, that it's free, and the three-day turnaround. Card sits on cream so it reads as a separate audience block. CTA is a solid teal pill matching card A's action weight.

```css
.mn-card--c{background:#F4EDDF; border-color:rgba(138,106,35,.18);}
.mn-card--c .mn-title{color:#0E3F44;}
.mn-card--c .mn-cta{background:#1B5E5A; color:#FFFDF9;}
.mn-card--c .mn-cta:hover{background:#0E3F44;}
```

**Rationale:** "Your office is already listed" answers the owner's first reflex (is this a cold pitch?) with a fact, which earns the read. The support line front-loads the free claim and the three-day review because those two points decide whether a busy owner clicks. The cream background and shared CTA styling keep the panel coherent while marking the audience shift.
