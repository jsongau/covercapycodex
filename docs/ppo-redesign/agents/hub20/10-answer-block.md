# Hub20 — Lead Answer Block Spec

Agent: hub20 / answer-block
Scope: ANALYZE / SPEC only. Premiums frozen. No em-dashes. Server-rendered, scannable.

---

## 1. Purpose

Win Google AI Overviews and featured snippets for the head queries that land on
the compare hub:

- "what is the best PPO dental plan"
- "how do I compare PPO dental plans"
- "cheapest PPO dental plan" / "PPO dental plan with highest annual maximum"

Google's extractive answer engines reward a server-rendered, single-sentence
direct answer placed high in the DOM, followed by a small scannable fact grid and
a dated trust line. This block delivers all three, in the same health-tech style
already shipped on the carrier review pages.

## 2. Grounding (real files / lines)

- Answer-first pattern: `docs/ppo-redesign/_zip-21jun/ppo/humana-extend-5000.html`
  - `#overview` section, lines 503-516: eyebrow "In short" + question H2 +
    one-sentence `.lead` answer, then 3 follow-on H3 question/answer pairs.
  - `.lead` token: line 115 of that file (`font-size:14.5px;color:var(--ink-3);max-width:70ch`).
- Reviewed/updated trust line: `compare-ppo-dental-plans.html`
  - `.hub-trust` style line 127, copy line 882:
    "Independent · no paid placement · reviewed by dental billing specialists
    and former treatment coordinators · updated June 2026".
  - `.reviewer-date` pattern line 948: "Verified June 2026 · Updated quarterly".
- Health-tech tokens (jade theme, Inter only): humana page `:root` lines 33-50.
  Reuse `--teal`, `--teal-ink`, `--teal-tint`, `--covered`, `--ink`, `--line`,
  radius `--r-md`, shadow `--sh-1`. Do NOT introduce Fraunces or gold tokens here;
  the answer block ships in the clinical card system.

## 3. Placement

Server-rendered. First content card inside `.main-col`, directly below the
breadcrumb and above the interactive smart-match grid. It must exist in the raw
HTML (no JS hydration) so crawlers and AI Overviews read it on first byte.

## 4. Copy (factual, no hype, no em-dashes)

### 4a. Direct-answer sentence (the snippet target)

Eyebrow: `In short`
H1/H2: `What is the best PPO dental plan, and how do you compare them?`

Answer (one sentence, server-rendered, plain text):

> The best PPO dental plan is the one whose annual maximum, waiting periods, and
> monthly cost fit the treatment you actually need, so compare individual plans
> on four facts: the cheapest premium, the highest annual maximum, the shortest
> wait before major work pays, and whether orthodontics is included at all.

### 4b. Key-fact strip (four cells)

Each cell: small uppercase label, the plan name, the value. Numbers are tabular.

| Label | Plan | Value |
|-------|------|-------|
| Cheapest premium | [plan name] | $[xx]/mo |
| Highest annual maximum | [plan name] | $[x,xxx] |
| Fastest major coverage | [plan name] | [n]-month wait |
| Only plan with orthodontics | [plan name] | [coinsurance]% |

Note for build: values bind to the same dataset that powers the comparison
table. Do not hardcode. If no plan covers ortho, the fourth cell reads plan
"None of the eight" and value "Orthodontics not included" rather than dropping
the cell, so the grid stays four-wide and the answer to "which plan has braces"
is explicit.

### 4c. Reviewed / updated line

> Independent comparison, no paid placement. Reviewed by dental billing
> specialists and former treatment coordinators. Last reviewed June 2026,
> updated quarterly. <a href="#methodology">How we choose plans</a>

## 5. HTML

```html
<section class="card block answer-block" id="answer" style="padding:20px 22px">
  <div class="eyebrow">In short</div>
  <h1 class="block-h">What is the best PPO dental plan, and how do you compare them?</h1>

  <p class="lead answer-lead">
    The best PPO dental plan is the one whose annual maximum, waiting periods,
    and monthly cost fit the treatment you actually need, so compare individual
    plans on four facts: the cheapest premium, the highest annual maximum, the
    shortest wait before major work pays, and whether orthodontics is included
    at all.
  </p>

  <ul class="fact-strip" aria-label="Key facts across the eight plans">
    <li class="fact">
      <span class="fact-lab">Cheapest premium</span>
      <span class="fact-plan">{{cheapest.name}}</span>
      <span class="fact-val tnum">${{cheapest.premium}}/mo</span>
    </li>
    <li class="fact">
      <span class="fact-lab">Highest annual maximum</span>
      <span class="fact-plan">{{highestMax.name}}</span>
      <span class="fact-val tnum">${{highestMax.annualMax}}</span>
    </li>
    <li class="fact">
      <span class="fact-lab">Fastest major coverage</span>
      <span class="fact-plan">{{fastestMajor.name}}</span>
      <span class="fact-val tnum">{{fastestMajor.majorWaitMonths}}-month wait</span>
    </li>
    <li class="fact">
      <span class="fact-lab">Only plan with orthodontics</span>
      <span class="fact-plan">{{ortho.name}}</span>
      <span class="fact-val tnum">{{ortho.value}}</span>
    </li>
  </ul>

  <p class="answer-trust">
    Independent comparison, no paid placement. Reviewed by dental billing
    specialists and former treatment coordinators.
    Last reviewed <time datetime="2026-06">June 2026</time>, updated quarterly.
    <a href="#methodology">How we choose plans</a>
  </p>
</section>
```

## 6. CSS (reuses existing health-tech tokens, no new colors)

```css
/* Lead answer block — jade health-tech system, Inter only */
.answer-block{scroll-margin-top:118px}
.answer-lead{
  max-width:74ch;
  font-size:16px;
  line-height:1.6;
  color:var(--ink-2);
  margin:6px 0 18px;
}

/* four-up key-fact strip */
.fact-strip{
  list-style:none;
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:1px;
  background:var(--line);
  border:1px solid var(--line);
  border-radius:var(--r-md);
  overflow:hidden;
  margin:0;
}
.fact{
  background:var(--surface);
  padding:14px 16px;
  display:flex;
  flex-direction:column;
  gap:4px;
  min-width:0;
}
.fact-lab{
  font-size:11.5px;
  font-weight:600;
  letter-spacing:.06em;
  text-transform:uppercase;
  color:var(--teal-ink);
}
.fact-plan{
  font-size:13px;
  font-weight:500;
  color:var(--ink-3);
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.fact-val{
  font-size:19px;
  font-weight:700;
  color:var(--ink);
  letter-spacing:-.01em;
}

/* dated trust line */
.answer-trust{
  font-size:12.5px;
  line-height:1.7;
  color:var(--ink-3);
  margin:16px 0 0;
}
.answer-trust a{color:var(--teal-strong)}

@media(max-width:720px){
  .fact-strip{grid-template-columns:1fr 1fr}
}
@media(max-width:420px){
  .fact-strip{grid-template-columns:1fr}
}
```

## 7. Schema hook (recommended, not blocking)

Pair the block with a `FAQPage` JSON-LD entry whose first question mirrors the H1
("What is the best PPO dental plan?") and whose answer is the exact direct-answer
sentence from 4a. Mirroring the visible text verbatim is what lets the AI Overview
attribute the snippet. Do not invent a numeric answer here; the sentence is
methodology, the fact strip carries the numbers.

## 8. Constraints honored

- No em-dashes anywhere in copy.
- No premium changes; cheapest premium binds to existing frozen data.
- Server-rendered, first card, no JS dependency for the text or facts.
- Reuses shipped jade tokens; no new colors, no Fraunces, no gold.
- Factual, no hype, no "best ever" claims; "best" is defined as fit, not ranked.
