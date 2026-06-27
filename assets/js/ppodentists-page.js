import { supabase } from './supabase-dentists.js'

const FALLBACK_CONTEXT = {
  zip: '92708',
  city: 'Fountain Valley',
  area: 'Orange County',
  location: 'Southern California',
  region: 'West Coast',
  lat: 33.7092,
  lng: -117.9526
}

let ctx = { ...FALLBACK_CONTEXT }
let ALL_DENTISTS = []
let shown = 12
let activeSpecialty = 'all'
const SEARCH_RADIUS_MI = 15

const $ = (s, r = document) => r.querySelector(s)
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s))

function esc(v) {
  return String(v ?? '').replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[m]))
}

function slugToTitle(slug) {
  return String(slug || '')
    .split('-')
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function haversineMi(aLat, aLng, bLat, bLng) {
  const R = 3958.8
  const dl = (bLat - aLat) * Math.PI / 180
  const dn = (bLng - aLng) * Math.PI / 180
  const x = Math.sin(dl / 2) ** 2 +
    Math.cos(aLat * Math.PI / 180) * Math.cos(bLat * Math.PI / 180) * Math.sin(dn / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(x))
}

function getContextFromUrl() {
  const path = window.location.pathname
  const parts = path.split('/').filter(Boolean)

  const idx = parts.indexOf('best-ppo-dentists')
  if (idx >= 0) {
    const areaSlug = parts[idx + 1]
    const citySlug = parts[idx + 2]

    if (areaSlug) ctx.area = slugToTitle(areaSlug)
    if (citySlug) ctx.city = slugToTitle(citySlug)
  }

  const url = new URL(window.location.href)
  const zip = url.searchParams.get('zip')
  if (zip) ctx.zip = zip
}

// Geocode the searched location off the real dentists table (no zip_city_map table exists).
// Accepts a ZIP (3-5 digits) or a city name; returns {zip|null, city, area, lat, lng} or null.
async function getLocationContext(input) {
  if (!input) return null
  const raw = String(input).trim()
  if (!raw) return null

  const isZip = /^\d{3,5}$/.test(raw)
  let q = supabase
    .from('dentists')
    .select('city,local_area,market_area,latitude,longitude,zip')
    .not('latitude', 'is', null)

  q = isZip
    ? (raw.length === 5 ? q.eq('zip', raw) : q.like('zip', raw + '%'))
    : q.ilike('city', raw)

  let { data, error } = await q.limit(60)

  if (error) {
    console.error('Location lookup failed:', error)
    return null
  }

  // Fuzzy city fallback (contains) if exact match found nothing.
  if ((!data || !data.length) && !isZip) {
    const r2 = await supabase
      .from('dentists')
      .select('city,local_area,market_area,latitude,longitude,zip')
      .not('latitude', 'is', null)
      .ilike('city', '%' + raw + '%')
      .limit(60)
    data = r2.data
  }

  if (!data || !data.length) return null

  let la = 0, ln = 0
  data.forEach(d => { la += Number(d.latitude); ln += Number(d.longitude) })

  return {
    zip: isZip && raw.length === 5 ? raw : null,
    city: data[0].city || ctx.city,
    area: data[0].local_area || data[0].market_area || ctx.area,
    lat: la / data.length,
    lng: ln / data.length
  }
}

// Backwards-compatible alias.
async function getZipContext(zip) {
  return getLocationContext(zip)
}

// Pull offices inside a radius of the current context via a lat/lng bounding box,
// compute exact distance client-side, then normalize. Every row has lat/lng.
async function fetchDentists() {
  const lat = ctx.lat ?? FALLBACK_CONTEXT.lat
  const lng = ctx.lng ?? FALLBACK_CONTEXT.lng
  let radius = SEARCH_RADIUS_MI
  let mapped = []

  // Auto-widen up to 45 mi so sparse areas still return offices.
  while (radius <= 45) {
    const dLat = radius / 69
    const dLng = radius / (69 * Math.max(0.2, Math.cos(lat * Math.PI / 180)))

    const { data, error } = await supabase
      .from('dentists')
      .select('*')
      .not('latitude', 'is', null)
      .gte('latitude', lat - dLat).lte('latitude', lat + dLat)
      .gte('longitude', lng - dLng).lte('longitude', lng + dLng)
      .limit(400)

    if (error) {
      console.error('Dentist fetch failed:', error)
      return []
    }

    mapped = (data || [])
      .map(d => {
        const dist = haversineMi(lat, lng, Number(d.latitude), Number(d.longitude))
        return { ...d, distance_miles: Math.round(dist * 10) / 10 }
      })
      .filter(d => d.distance_miles <= radius)

    if (mapped.length) break
    radius += 15
  }

  return mapped.map(normalizeDentist)
}

function normalizeDentist(d) {
  const pending = d.pending_display_label || 'Public Directory Listing'

  // Real schema has no `featured_tier` column — derive it from the columns that exist.
  let tier = d.featured_tier
  if (!tier) {
    const acc = String(d.accreditation_status || '').toLowerCase()
    const mt = String(d.membership_tier || '').toLowerCase()
    if (acc.includes('platinum') || mt.includes('platinum')) tier = 'platinum-elite'
    else if (acc.includes('accredit') || mt.includes('accredit')) tier = 'capy-accredited'
    else if (d.profile_verified) tier = 'verified'
    else tier = 'public-directory'
  }

  return {
    ...d,
    id: d.id || d.slug,
    name: d.name || d.practice_name,
    practice_name: d.practice_name || d.name || 'Dental Office',
    featured_tier: tier,
    display_badge:
      tier === 'platinum-elite' ? 'Platinum Elite' :
      tier === 'capy-accredited' ? 'Capy Accredited' :
      tier === 'verified' ? 'Verified Profile' :
      pending,
    specialties: Array.isArray(d.specialties) ? d.specialties : [],
    languages: Array.isArray(d.languages) ? d.languages : [],
    insurance_networks: Array.isArray(d.insurance_networks) ? d.insurance_networks : [],
    procedures: Array.isArray(d.procedures) ? d.procedures : [],
    google_rating: Number(d.google_rating || 0),
    google_review_count: Number(d.google_review_count || 0),
    yelp_rating: Number(d.yelp_rating || 0),
    yelp_review_count: Number(d.yelp_review_count || 0),
    capy_rating: Number(d.capy_rating || 0),
    capy_review_count: Number(d.capy_review_count || 0),
    distance_miles: d.distance_miles == null ? null : Number(d.distance_miles)
  }
}

function getAggregateRating(d) {
  const googleCount = d.google_review_count || 0
  const yelpCount = d.yelp_review_count || 0
  const capyCount = d.capy_review_count || 0

  const weightedCount = googleCount + yelpCount * 0.7 + capyCount * 2

  if (!weightedCount) {
    // Fall back to the precomputed aggregate columns when per-source counts are absent.
    const ar = Number(d.aggregate_rating || 0)
    const arc = Number(d.aggregate_review_count || 0)
    if (ar) return { rating: ar, count: arc, score: ar * 100 + Math.log(arc + 1) * 40 }
    return { rating: 0, count: 0, score: 0 }
  }

  const total =
    d.google_rating * googleCount +
    d.yelp_rating * yelpCount * 0.7 +
    d.capy_rating * capyCount * 2

  const rating = total / weightedCount
  const count = googleCount + yelpCount + capyCount
  const score = rating * 100 + Math.log(count + 1) * 40

  return { rating, count, score }
}

function getPlacementScore(d) {
  const tier = String(d.featured_tier || '').toLowerCase()
  const sameCity = String(d.city || '').toLowerCase() === String(ctx.city || '').toLowerCase()
  const sameArea = String(d.local_area || d.market_area || '').toLowerCase() === String(ctx.area || '').toLowerCase()

  if (tier === 'platinum-elite' && sameArea) return 100000
  if (tier === 'capy-accredited' && sameCity) return 80000
  if (tier === 'verified' && sameCity) return 50000
  if (sameCity) return 30000
  if (sameArea) return 10000
  return 0
}

function getDistanceScore(d) {
  if (d.distance_miles == null) return 0
  return Math.max(0, 3000 - d.distance_miles * 150)
}

function getRankScore(d) {
  return (
    getPlacementScore(d) +
    getDistanceScore(d) +
    getAggregateRating(d).score +
    (d.capy_review_count || 0) * 25 +
    (d.is_sponsored ? 6000 : 0) +
    (d.is_featured ? 3000 : 0)
  )
}

function rankDentists(list) {
  return list
    .map(d => ({
      ...d,
      aggregate_rating: Number(getAggregateRating(d).rating.toFixed(1)),
      aggregate_review_count: getAggregateRating(d).count,
      covercapy_rank_score: getRankScore(d)
    }))
    .sort((a, b) => b.covercapy_rank_score - a.covercapy_rank_score)
}

function titleHtml(name) {
  const parts = String(name || 'Dental Office').split(' ')
  if (parts.length < 2) return esc(name)
  const last = parts.pop()
  return `${esc(parts.join(' '))} <em style="font-style:italic;color:var(--g);">${esc(last)}</em>`
}

function badgeClass(d) {
  if (d.featured_tier === 'platinum-elite') return 'platinum-elite'
  if (d.featured_tier === 'capy-accredited') return 'capy-accredited'
  if (d.featured_tier === 'verified') return 'unverified'
  return 'unverified'
}

function cardHtml(d) {
  const phoneHref = d.phone ? `tel:${String(d.phone).replace(/\s/g, '')}` : '#'
  const rating = d.aggregate_rating || d.google_rating || 0
  const reviewCount = d.aggregate_review_count || d.google_review_count || 0
  const profile = d.profile_url || `/dentist/${slug(d.city)}/${d.slug || slug(d.practice_name)}`
  const distance = d.distance_miles != null ? `${d.distance_miles} mi away` : ''
  const note = d.featured_tier === 'public-directory'
    ? 'Public directory profile. Not yet CoverCapy accredited. CoverCapy can contact this office about your PPO on request.'
    : 'CoverCapy network profile with enhanced PPO visibility.'

  return `
    <article class="ppo-card" data-tier="${esc(d.featured_tier)}" data-id="${esc(d.id)}">
      <header class="ppo-card-head">
        <div class="ppo-card-avatar" aria-hidden="true">🦷</div>
        <div>
          <h3 class="ppo-card-title">${titleHtml(d.practice_name)}</h3>
          <div class="ppo-card-loc">📍 ${esc(d.city || '')}</div>
          ${distance ? `<div class="ppo-card-distance">· ${esc(distance)}</div>` : ''}
          <div class="ppo-card-rating" title="Based on aggregated Google / Yelp reviews and verified CoverCapy patient feedback.">
            <span class="ppo-card-rating-star">★</span>
            <strong>${rating ? rating.toFixed(1) : '—'}</strong>
            <em>${reviewCount ? `${reviewCount} reviews` : 'reviews pending'}</em>
          </div>
        </div>
        <span class="tier-badge ${badgeClass(d)}"><span class="ic">○</span>${esc(d.display_badge)}</span>
      </header>

      ${d.specialties.length ? `
        <div>
          <div class="ppo-card-section-label">Specialties</div>
          <div class="ppo-card-tags">
            ${d.specialties.slice(0, 4).map(s => `<span class="ppo-tag is-specialty">${esc(s)}</span>`).join('')}
          </div>
        </div>` : ''}

      ${d.languages.length ? `
        <div>
          <div class="ppo-card-section-label">Languages</div>
          <div class="ppo-card-tags">
            ${d.languages.slice(0, 4).map(s => `<span class="ppo-tag is-language">${esc(s)}</span>`).join('')}
          </div>
        </div>` : ''}

      ${d.insurance_networks.length ? `
        <div>
          <div class="ppo-card-section-label">PPO & Insurance</div>
          <div class="ppo-card-tags">
            ${d.insurance_networks.slice(0, 5).map(s => `<span class="ppo-tag is-ppo">${esc(s)}</span>`).join('')}
          </div>
        </div>` : ''}

      <div class="ppo-card-note">
        <strong>${esc(d.display_badge)}.</strong> ${esc(d.short_description || note)}
      </div>

      <div class="ppo-card-actions">
        <a class="ppo-btn ppo-btn-primary" href="${esc(profile)}">View Profile</a>
        <a class="ppo-btn ppo-btn-secondary" href="${esc(d.booking_url || profile)}">Book Now</a>
        <a class="ppo-btn ppo-btn-secondary" href="${esc(phoneHref)}" data-span="full">Call Office</a>
        <button type="button" class="ppo-btn ppo-btn-ghost" data-span="full" data-act="ask">Ask CoverCapy to Check</button>
      </div>

      <div class="ppo-card-claim">
        <div class="ppo-card-claim-text">
          <strong>Own this office?</strong><br>
          Claim this profile to verify details & respond to inquiries.
        </div>
        <a class="ppo-card-claim-link" href="/claim-profile?dentist=${esc(d.slug || '')}">Claim Profile</a>
      </div>
    </article>
  `
}

function featuredHtml(d, mini = false) {
  const profile = d.profile_url || `/dentist/${slug(d.city)}/${d.slug || slug(d.practice_name)}`
  const rating = d.aggregate_rating || d.google_rating || 0
  const count = d.aggregate_review_count || d.google_review_count || 0

  return `
    <article class="ppo-feat ${d.featured_tier === 'platinum-elite' ? 'ppo-feat-platinum' : 'ppo-feat-runnerup'} ${mini ? 'ppo-feat-mini' : ''}">
      <header class="ppo-feat-head">
        <div class="ppo-feat-avatar">🦷</div>
        <div class="ppo-feat-head-text">
          <div class="ppo-feat-eyebrow">${esc(d.display_badge)}</div>
          <h3 class="ppo-feat-name">${titleHtml(d.practice_name)}</h3>
          <div class="ppo-feat-loc">
            📍 ${esc(d.city || '')}
            ${rating ? `<span class="ppo-feat-loc-dot"></span><span class="ppo-feat-rating">★ ${rating.toFixed(1)} <em>(${count} reviews)</em></span>` : ''}
          </div>
        </div>
        <span class="tier-badge ${badgeClass(d)}"><span class="ic">💎</span>${esc(d.display_badge)}</span>
      </header>

      <div class="ppo-feat-tags">
        ${d.specialties.slice(0, 4).map(s => `<span class="ppo-tag is-specialty">${esc(s)}</span>`).join('')}
      </div>

      <div class="ppo-feat-actions">
        <a class="ppo-btn ${d.featured_tier === 'platinum-elite' ? 'ppo-btn-platinum' : 'ppo-btn-primary'}" href="${esc(profile)}">View Profile</a>
        <a class="ppo-btn ppo-btn-secondary" href="${esc(d.booking_url || profile)}">Book Now</a>
      </div>
    </article>
  `
}

function slug(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function renderDirectory() {
  const host = $('#ppo-grid')
  if (!host) return

  let pool = ALL_DENTISTS.slice()

  if (activeSpecialty !== 'all') {
    const needle = activeSpecialty.toLowerCase()
    pool = pool.filter(d =>
      [...d.specialties, ...d.procedures].some(s =>
        String(s).toLowerCase().includes(needle)
      )
    )
  }

  const ranked = rankDentists(pool)
  const visible = ranked.slice(0, shown)

  const locEl = $('#ppo-dir-loc')
  const countEl = $('#ppo-dir-count')
  if (locEl) locEl.textContent = ctx.city || ctx.area || 'your area'
  if (countEl) countEl.textContent = ranked.length

  host.innerHTML = visible.length
    ? visible.map(cardHtml).join('')
    : `<div class="ppo-empty"><div class="ppo-empty-icon">🔎</div><h3>No dentists found yet.</h3><p>Try another city or ZIP.</p></div>`

  const more = $('#ppo-load-more')
  if (more) {
    more.hidden = shown >= ranked.length
    more.onclick = () => {
      shown += 12
      renderDirectory()
    }
  }
}

function renderFeatured() {
  const host = $('#ppo-featured-grid')
  if (!host) return

  const ranked = rankDentists(ALL_DENTISTS)
  const primary =
    ranked.find(d => d.featured_tier === 'platinum-elite') ||
    ranked.find(d => d.featured_tier === 'capy-accredited') ||
    ranked[0]

  const nearby = ranked
    .filter(d => primary && d.id !== primary.id)
    .slice(0, 3)

  const cityName = $('#ppo-feat-city-name')
  if (cityName) cityName.textContent = ctx.city || 'your area'

  if (!primary) {
    host.innerHTML = ''
    return
  }

  host.innerHTML = `
    <div class="ppo-featured-primary">
      ${featuredHtml(primary)}
    </div>
    ${nearby.length ? `
      <div class="ppo-featured-nearby">
        <div class="ppo-featured-nearby-head">
          <span class="ppo-eyebrow">Other featured offices nearby</span>
        </div>
        <div class="ppo-featured-nearby-row">
          ${nearby.map(d => featuredHtml(d, true)).join('')}
        </div>
      </div>` : ''}
  `
}

function renderSeoMeta() {
  const title = `PPO Dentists in ${ctx.city}, ${ctx.area} | CoverCapy`
  const desc = `Find PPO-friendly dentists near ${ctx.city}. Compare local offices, ratings, specialties, languages, and CoverCapy accreditation status before booking.`

  document.title = title

  const titleEl = $('#ppo-title')
  const descEl = $('#ppo-desc')
  const canon = $('#ppo-canonical')

  if (titleEl) titleEl.textContent = title
  if (descEl) descEl.setAttribute('content', desc)
  if (canon) canon.setAttribute('href', `https://www.covercapy.com/best-ppo-dentists/${slug(ctx.area)}/${slug(ctx.city)}`)
}

function bindFilters() {
  $$('.ppo-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.ppo-filter').forEach(b => b.classList.remove('is-active'))
      btn.classList.add('is-active')
      activeSpecialty = btn.dataset.filter || btn.textContent.trim().toLowerCase() || 'all'
      if (activeSpecialty === 'any') activeSpecialty = 'all'
      shown = 12
      renderDirectory()
    })
  })
}

function bindSearch() {
  const buttons = [
    $('.ppo-search-submit'),
    $('#ppo-find-dentists'),
    $('[data-act="find-dentists"]')
  ].filter(Boolean)

  buttons.forEach(btn => {
    btn.addEventListener('click', async e => {
      e.preventDefault()
      const term = $('#ppo-zip')?.value || $('#ppo-sticky-zip')?.value
      if (!term) return
      const zctx = await getLocationContext(term)
      if (zctx) ctx = { ...ctx, ...zctx }
      shown = 12
      await reload()
      document.querySelector('.ppo-directory')?.scrollIntoView({ behavior: 'smooth' })
    })
  })
}

async function reload() {
  ALL_DENTISTS = await fetchDentists()
  renderSeoMeta()
  renderFeatured()
  renderDirectory()

  const zipI = $('#ppo-zip')
  if (zipI && ctx.zip) zipI.value = ctx.zip

  console.log('CoverCapy context:', ctx)
  console.log('CoverCapy dentists:', ALL_DENTISTS)
}

async function init() {
  getContextFromUrl()

  const term = $('#ppo-zip')?.value || ctx.zip
  const zctx = await getLocationContext(term)
  if (zctx) ctx = { ...ctx, ...zctx }

  await reload()
  bindSearch()
  bindFilters()

  window.CoverCapyPPO = {
    ctx,
    dentists: ALL_DENTISTS,
    reload,
    rankDentists
  }
}

init()
