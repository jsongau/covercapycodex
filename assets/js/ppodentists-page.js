import { supabase } from './supabase-dentists.js'

const FALLBACK_ZIP = '92708'
const FALLBACK_CITY = 'Fountain Valley'
const FALLBACK_AREA = 'Orange County'

async function getZipContext(zip) {
  const { data, error } = await supabase
    .from('zip_city_map')
    .select('*')
    .eq('zip', String(zip))
    .maybeSingle()

  if (error) {
    console.error('ZIP lookup failed:', error)
    return null
  }

  return data
}

function getAggregateRating(d) {
  const googleCount = d.google_review_count || 0
  const yelpCount = d.yelp_review_count || 0
  const capyCount = d.capy_review_count || 0

  const weightedCount =
    googleCount + yelpCount + capyCount * 2

  if (!weightedCount) {
    return { rating: 0, count: 0, score: 0 }
  }

  const total =
    (d.google_rating || 0) * googleCount +
    (d.yelp_rating || 0) * yelpCount +
    (d.capy_rating || 0) * capyCount * 2

  const rating = total / weightedCount
  const reviewVolumeBonus = Math.log(weightedCount + 1) * 40

  return {
    rating,
    count: weightedCount,
    score: rating * 100 + reviewVolumeBonus
  }
}

function getPlacementScore(d, context) {
  const tier = String(d.featured_tier || '').toLowerCase()

  const sameCity =
    String(d.city || '').toLowerCase() ===
    String(context.city || '').toLowerCase()

  const sameArea =
    String(d.area || '').toLowerCase() ===
    String(context.area || '').toLowerCase()

  if (tier === 'platinum-elite' && sameArea) return 100000
  if (tier === 'capy-accredited' && sameCity) return 80000
  if (tier === 'verified' && sameCity) return 50000
  if (sameCity) return 20000
  if (sameArea) return 10000

  return 0
}

function getDistanceScore(distanceMiles) {
  if (distanceMiles == null) return 0
  return Math.max(0, 3000 - distanceMiles * 150)
}

function getCapyEngagementScore(d) {
  return (d.capy_review_count || 0) * 25
}

function getCoverCapyRankScore(d, context) {
  const ratingData = getAggregateRating(d)

  return (
    getPlacementScore(d, context) +
    getDistanceScore(d.distance_miles) +
    ratingData.score +
    getCapyEngagementScore(d)
  )
}

function rankDentists(dentists, context) {
  return dentists
    .map(d => {
      const ratingData = getAggregateRating(d)

      return {
        ...d,
        aggregate_rating: Number(ratingData.rating.toFixed(1)),
        aggregate_review_count: ratingData.count,
        covercapy_rank_score: getCoverCapyRankScore(d, context)
      }
    })
    .sort((a, b) => b.covercapy_rank_score - a.covercapy_rank_score)
}

async function fetchDentists(context) {
  const { data, error } = await supabase
    .from('dentists')
    .select('*')
    .eq('area', context.area || FALLBACK_AREA)

  if (error) {
    console.error('Dentist fetch failed:', error)
    return []
  }

  return rankDentists(data || [], context)
}

function getSearchZip() {
  const zipInput = document.getElementById('ppo-zip')
  const url = new URL(window.location.href)
  const zipParam = url.searchParams.get('zip')

  return zipParam || zipInput?.value || FALLBACK_ZIP
}

async function loadPage() {
  const zip = getSearchZip()

  let context = await getZipContext(zip)

  if (!context) {
    context = {
      zip: FALLBACK_ZIP,
      city: FALLBACK_CITY,
      area: FALLBACK_AREA,
      location: 'Southern California',
      region: 'West Coast'
    }
  }

  console.log('ZIP Context:', context)

  const dentists = await fetchDentists(context)

  console.log('Ranked Dentists:', dentists)

  window.CoverCapyLiveDentists = {
    context,
    dentists
  }
}

loadPage()
