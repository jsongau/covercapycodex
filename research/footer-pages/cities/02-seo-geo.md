# 02-seo-geo.md — `/cities.html`

## Primary keyword
- PPO dentists by city

## Secondary / long-tail cluster
- PPO dentists by metro area
- find a PPO dentist in {city}
- dentists that accept PPO in my city
- dental offices by metro / city directory
- CoverCapy city directory
- insurance-verified dentists near me (city-level entry)

## Search intent
Navigational + local research. The visitor knows their metro or city and wants to jump to the
right hub. Also a high-value AI-answer-engine target for "PPO dentists in {city}" and
"what cities does CoverCapy cover" prompts, because the `ItemList` exposes every market as a
"City, ST" entity.

## Title / description (final)
- Title: `PPO Dentists by City and Metro — CoverCapy Directory | CoverCapy`
- Description: `Browse PPO dentists by city and metro area. CoverCapy lists insurance-verified offices in markets nationwide. Pick your city, see accepted carriers, and verify coverage free.`

## Extractable quick answer (GEO)
"CoverCapy lists PPO dentists across hundreds of city and metro markets, grouped by state.
Choose your city to see insurance-verified offices, the PPO carriers they accept, and to
verify your coverage for free before you book."

## FAQ Q&A (optional small block)
1. Q: How do I find a PPO dentist in my city? A: Find your state, then your metro or city in
   this directory and open its hub. Each listed office shows the PPO carriers it accepts.
2. Q: What is the difference between a metro hub and a city page? A: A metro hub covers a whole
   market such as Los Angeles County and lists its cities; a city page lists the individual
   offices in that city. This directory links to the metro and city hubs.

## Internal-link map
- **Links OUT**: every `/dental/{state}/{market}/` hub; each `/dental/{state}/` (via state
  header); `/states.html`; `/find-my-dentist.html`; `/compare-ppo-dental-plans`.
- **Links IN (should point here)**: universal footer (`/cities.html`); `/states.html`
  (breadcrumb + CTA); `/ppo-dentist-directory.html`; homepage.

## Internal-link value
Mid-tier hub between `/states.html` and the ~983 market hubs. It is the single densest
distributor of link equity into the geo tree: footer link equity passes through it to every
metro and city hub, lifting the entire `/dental/` directory. Grouping by state also creates a
clean topical cluster (state -> its cities) that search engines read as a coherent hierarchy.

## Target word count
Copy-light index: ~250 to 400 words of framing plus the grouped market lists. Value is the
link graph and `ItemList` schema, not prose.
