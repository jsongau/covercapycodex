# T6 Database Schema — Supabase
## CoverCapy | June 2026

Supabase project: `hfvbeqlefwwjlrbyxpbj`

---

## Current State (as of June 2026)

`provider_profiles` table exists with 2 rows (david-abri, isaac-sun-dds).

`provider_offices` junction table exists with 3 rows.

Both tables are missing critical columns, indexes, triggers, and RLS write policies. Apply migrations in order below.

---

## Migration 1 — Extend `provider_profiles`

```sql
-- t6_provider_profiles_extend.sql
ALTER TABLE public.provider_profiles
  ADD COLUMN IF NOT EXISTS license_number          text,
  ADD COLUMN IF NOT EXISTS license_expiry          date,
  ADD COLUMN IF NOT EXISTS board_certifications    text[]   DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS ada_member              boolean  DEFAULT false,
  ADD COLUMN IF NOT EXISTS awards                  jsonb    DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS publications            jsonb    DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS gender                  text     CHECK (gender IN ('male','female','nonbinary','undisclosed')),
  ADD COLUMN IF NOT EXISTS residency               text,
  ADD COLUMN IF NOT EXISTS fellowship              text,
  ADD COLUMN IF NOT EXISTS accepting_new_patients_override boolean,
  ADD COLUMN IF NOT EXISTS social_links            jsonb    DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS custom_seo_title        text,
  ADD COLUMN IF NOT EXISTS custom_meta_description text,
  ADD COLUMN IF NOT EXISTS custom_bio_long         text,
  ADD COLUMN IF NOT EXISTS review_quote            text,
  ADD COLUMN IF NOT EXISTS claim_status            text     NOT NULL DEFAULT 'unclaimed'
                                                   CHECK (claim_status IN ('unclaimed','pending','claimed')),
  ADD COLUMN IF NOT EXISTS claimed_by_email        text,
  ADD COLUMN IF NOT EXISTS claimed_at              timestamptz;

-- NOTE: grad_year column already exists. Do not add graduation_year duplicate.
-- NOTE: do NOT store date_of_birth — privacy risk, no use case.
```

**Column rationale:**
- `license_number` + `license_expiry` — paired with existing `license_state`/`license_verified`. Enables on-page display and state board cross-link.
- `board_certifications` — text[] ("Board Certified, American Board of Dental Sleep Medicine"). Schema.org `memberOf`.
- `ada_member` — American Dental Association. Highest-trust badge for dentists. Sourced via NPPES taxonomy or self-reported.
- `awards` + `publications` — jsonb arrays: `[{"year": 2023, "title": "...", "org": "..."}]`
- `gender` — schema.org `Person.gender`. Used in schema markup only.
- `residency` + `fellowship` — free text institution name.
- `accepting_new_patients_override` — null = defer to linked offices; true/false = override.
- `social_links` — `{"linkedin": "...", "instagram": "...", "facebook": "..."}`
- `custom_seo_title` + `custom_meta_description` — manual override for high-value profiles.
- `custom_bio_long` — 400-800 word GEO-optimized bio, separate from short `bio` field.
- `review_quote` — single best patient quote shown as pullquote on T6 page.
- `claim_status` / `claimed_by_email` / `claimed_at` — claim workflow state machine.

---

## Migration 2 — Extend `provider_offices`

```sql
-- t6_provider_offices_extend.sql
ALTER TABLE public.provider_offices
  ADD COLUMN IF NOT EXISTS id         uuid         DEFAULT gen_random_uuid(),
  ADD COLUMN IF NOT EXISTS sort_order integer      DEFAULT 0,
  ADD COLUMN IF NOT EXISTS created_at timestamptz  DEFAULT now();

-- Add FK to dentists.slug (verify slug uniqueness first)
-- Run this check before adding constraint:
-- SELECT COUNT(*), COUNT(DISTINCT slug) FROM dentists WHERE slug IS NOT NULL;

ALTER TABLE public.provider_offices
  ADD CONSTRAINT IF NOT EXISTS provider_offices_office_slug_fkey
  FOREIGN KEY (office_slug) REFERENCES public.dentists(slug)
  ON DELETE CASCADE
  DEFERRABLE INITIALLY DEFERRED;
```

---

## Migration 3 — `updated_at` Trigger

```sql
-- t6_updated_at_trigger.sql
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER provider_profiles_updated_at
  BEFORE UPDATE ON public.provider_profiles
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
```

---

## Migration 4 — RLS Policies

Existing policies: public reads where `is_published = true`. Write policies missing.

```sql
-- t6_rls_policies.sql

-- Claimed provider can update their own profile
CREATE POLICY "claimed provider can update own profile"
  ON public.provider_profiles
  FOR UPDATE
  TO authenticated
  USING (
    claimed_by_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  )
  WITH CHECK (
    claimed_by_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Authenticated can insert their own profile (claim flow — status = pending only)
CREATE POLICY "authenticated can insert own profile"
  ON public.provider_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    claim_status = 'pending'
    AND claimed_by_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Provider can manage their own junction rows
CREATE POLICY "claimed provider can manage own offices"
  ON public.provider_offices
  FOR ALL
  TO authenticated
  USING (
    provider_slug IN (
      SELECT slug FROM public.provider_profiles
      WHERE claimed_by_email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  )
  WITH CHECK (
    provider_slug IN (
      SELECT slug FROM public.provider_profiles
      WHERE claimed_by_email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );
```

Admin ops use the `service_role` key which bypasses RLS entirely — no admin policy needed.

---

## Migration 5 — Indexes

```sql
-- t6_indexes.sql

-- Filtered index for published profiles (primary SEO query)
CREATE INDEX IF NOT EXISTS provider_profiles_published_idx
  ON public.provider_profiles (slug)
  WHERE is_published = true;

-- Claim status workflow (admin dashboard)
CREATE INDEX IF NOT EXISTS provider_profiles_claim_status_idx
  ON public.provider_profiles (claim_status)
  WHERE claim_status != 'claimed';

-- NPI lookup (enrichment scripts)
CREATE INDEX IF NOT EXISTS provider_profiles_npi_idx
  ON public.provider_profiles (npi)
  WHERE npi IS NOT NULL;

-- License state + verification (verification dashboard)
CREATE INDEX IF NOT EXISTS provider_profiles_license_state_idx
  ON public.provider_profiles (license_state, license_verified);

-- Provider offices sorted (multi-office T6 page rendering)
CREATE INDEX IF NOT EXISTS provider_offices_provider_sorted_idx
  ON public.provider_offices (provider_slug, sort_order ASC, is_primary DESC);
```

---

## Migration 6 — Slug Function

```sql
-- t6_slug_function.sql
CREATE OR REPLACE FUNCTION public.doctor_name_to_slug(raw_name text)
RETURNS text
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT REGEXP_REPLACE(
    TRIM(BOTH '-' FROM
      REGEXP_REPLACE(
        LOWER(
          TRIM(
            REGEXP_REPLACE(
              REGEXP_REPLACE(raw_name, '^[Dd][Rr]\.?\s+', ''),
              ',?\s+(DDS|DMD|MD|MS|PhD|FAGD|FICOI|FACP|FICD|FACD|ABOD|MSD|BS|BA)(\s*,\s*(DDS|DMD|MD|MS|PhD|FAGD|FICOI))*\s*$',
              '',
              'i'
            )
          )
        ),
        '[^a-z0-9]+', '-', 'g'
      )
    ),
    '-{2,}', '-', 'g'
  );
$$;
```

---

## Migration 7 — Seed from `dentists.doctor_name`

Only 271 of 7,042 dentists currently have `doctor_name` populated. This seeds initial profiles.

```sql
-- t6_seed_provider_profiles.sql

INSERT INTO public.provider_profiles (
  slug,
  name,
  license_state,
  is_published,
  claim_status,
  created_at,
  updated_at
)
SELECT DISTINCT ON (doctor_name_to_slug(d.doctor_name))
  doctor_name_to_slug(d.doctor_name)                          AS slug,
  TRIM(REGEXP_REPLACE(d.doctor_name, '^[Dd][Rr]\.?\s+', '')) AS name,
  d.state                                                      AS license_state,
  false                                                        AS is_published,
  'unclaimed'                                                  AS claim_status,
  now()                                                        AS created_at,
  now()                                                        AS updated_at
FROM public.dentists d
WHERE d.doctor_name IS NOT NULL
  AND TRIM(d.doctor_name) != ''
  AND TRIM(d.doctor_name) NOT IN ('Staff', 'Team', 'Front Desk', 'Office')
  AND doctor_name_to_slug(d.doctor_name) NOT IN (SELECT slug FROM public.provider_profiles)
ORDER BY doctor_name_to_slug(d.doctor_name), d.created_at ASC
ON CONFLICT (slug) DO NOTHING;
```

All seeded rows start `is_published = false`. They only go live after bio/enrichment minimum met.

---

## Migration 8 — Seed Junction Table

```sql
-- t6_seed_provider_offices.sql

INSERT INTO public.provider_offices (provider_slug, office_slug, is_primary, sort_order, created_at)
SELECT
  pp.slug  AS provider_slug,
  d.slug   AS office_slug,
  true     AS is_primary,
  0        AS sort_order,
  now()    AS created_at
FROM public.dentists d
JOIN public.provider_profiles pp
  ON pp.slug = doctor_name_to_slug(d.doctor_name)
WHERE d.doctor_name IS NOT NULL
  AND TRIM(d.doctor_name) != ''
  AND d.slug IS NOT NULL
ON CONFLICT (provider_slug, office_slug) DO NOTHING;

-- Fix is_primary for multi-office providers
WITH ranked AS (
  SELECT provider_slug, office_slug,
    ROW_NUMBER() OVER (PARTITION BY provider_slug ORDER BY created_at ASC) AS rn
  FROM public.provider_offices
)
UPDATE public.provider_offices po
SET is_primary = (r.rn = 1)
FROM ranked r
WHERE po.provider_slug = r.provider_slug
  AND po.office_slug   = r.office_slug;
```

---

## Complete `provider_profiles` Column Reference

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| slug | text | PK | Unique identifier, URL slug |
| name | text | NOT NULL | Full name without "Dr." prefix |
| honorific_suffix | text | | DDS, DMD, MD, etc. |
| degree | text | | "Doctor of Dental Surgery (DDS)" |
| dental_school | text | | Full institution name |
| grad_year | integer | | Graduation year |
| residency | text | | NEW |
| fellowship | text | | NEW |
| specialties | text[] | {} | Clinical focus areas |
| bio | text | | Short bio (2-4 sentences) |
| custom_bio_long | text | | NEW — 400-800 word GEO bio |
| npi | text | | National Provider Identifier |
| photo_url | text | | CDN URL (Supabase Storage) |
| is_published | boolean | false | Controls page generation |
| license_state | text | | State of licensure |
| license_number | text | | NEW — from state board |
| license_expiry | date | | NEW |
| license_verified | boolean | false | Manually verified by CoverCapy |
| license_verified_at | date | | Date of verification |
| board_certifications | text[] | {} | NEW |
| ada_member | boolean | false | NEW |
| awards | jsonb | [] | NEW — [{year, title, org}] |
| publications | jsonb | [] | NEW — [{year, title, journal}] |
| languages | text[] | {} | Languages spoken |
| gender | text | | NEW — schema.org only |
| sameas | text[] | {} | sameAs URLs for schema |
| social_links | jsonb | {} | NEW — {linkedin, instagram} |
| years_experience | integer | | |
| accepting_new_patients_override | boolean | | NEW |
| custom_seo_title | text | | NEW |
| custom_meta_description | text | | NEW |
| review_quote | text | | NEW — best patient quote |
| claim_status | text | 'unclaimed' | NEW — unclaimed/pending/claimed |
| claimed_by_email | text | | NEW |
| claimed_at | timestamptz | | NEW |
| created_at | timestamptz | now() | |
| updated_at | timestamptz | now() | Auto-bumped by trigger |

---

## License Verification Workflow

State transitions for a doctor going from unclaimed to verified:

```
1. Seeded from doctor_name         → claim_status='unclaimed', license_verified=false
2. Doctor submits claim form        → claim_status='pending', claimed_by_email set
3. CoverCapy verifies state board   → license_verified=true, license_verified_at=today, license_number set
4. Profile reviewed and approved    → is_published=true, claim_status='claimed'
```

Admin update query (step 3):
```sql
UPDATE public.provider_profiles
SET
  license_verified     = true,
  license_verified_at  = CURRENT_DATE,
  license_number       = $1,
  license_expiry       = $2,
  updated_at           = now()
WHERE slug = $3;
```

---

## Photo Storage

**Bucket:** `provider-photos`
**Path:** `/providers/{slug}/photo.webp`
**Public URL:** `https://hfvbeqlefwwjlrbyxpbj.supabase.co/storage/v1/object/public/provider-photos/providers/{slug}/photo.webp`

Size: 400x400px minimum, WebP format. 5,776 photos ≈ 580MB (within free tier 1GB).

When `photo_url` is null, T6 pages display an initials monogram (same pattern as T5 office monograms).

---

## Run Order for All Migrations

```
1. t6_provider_profiles_extend.sql
2. t6_provider_offices_extend.sql
3. t6_updated_at_trigger.sql
4. t6_rls_policies.sql
5. t6_indexes.sql
6. t6_slug_function.sql
7. t6_seed_provider_profiles.sql
8. t6_seed_provider_offices.sql
```

After migration 8, run the NPI enrichment script (see `T6-scraping-strategy.md`) to populate `npi`, `license_number`, `credential`, and `gender` for all seeded profiles before publishing any T6 pages.
