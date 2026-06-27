/**
 * CoverCapy SEO Dentist Graph
 * Data store + utility functions for the Orange County PPO dental authority engine.
 * Version: 1.0
 *
 * Usage: Include this file before related-dentists.js and seo-schema-generators.js.
 * The DENTISTS array is the single source of truth for all generated pages.
 */

/* ─── URL HELPERS ─── */
const CC = window.CC = window.CC || {};

CC.BASE = "https://www.covercapy.com";

CC.citySlug   = city   => city.toLowerCase().replace(/\s+/g, "-");
CC.countySlug = county => county.toLowerCase().replace(/\s+/g, "-");
CC.practiceSlug = name => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

CC.dentistUrl = d =>
  `${CC.BASE}/dentists/california/${CC.countySlug(d.county)}/${CC.citySlug(d.city)}/${d.slug}`;

CC.cityHubUrl = city =>
  `${CC.BASE}/ppo-dentists/california/orange-county/${CC.citySlug(city)}/`;

CC.carrierUrl = carrier =>
  `${CC.BASE}/ppo-dentists/california/orange-county/${CC.practiceSlug(carrier)}/`;

/* ─── DISTANCE ─── */
CC.distanceMiles = (lat1, lng1, lat2, lng2) => {
  const R = 3958.8;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
};

/* ─── TIER RANK ─── */
CC.tierRank = tier => ({
  "platinum-elite": 1,
  "capy-accredited": 2,
  "verified": 3,
  "public": 4
})[tier] || 5;

/* ─── DENTIST DATA ─── */
CC.DENTISTS = [
  {
    practice_name: "KYT Dental Services",
    doctor_name: null,
    slug: "kyt-dental-services",
    address: "10720 Warner Ave, Suite 103",
    city: "Fountain Valley",
    county: "Orange County",
    state: "CA",
    zip: "92708",
    lat: 33.7092,
    lng: -117.9474,
    phone: null,
    website: null,
    google_rating: null,
    google_reviews: null,
    place_id: null,
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=KYT+Dental+Services+Fountain+Valley+CA",
    specialty: ["general-dentistry", "family-dentistry"],
    tags: ["ppo-friendly", "fountain-valley"],
    languages: [],
    has_saturday: null,
    has_sunday: null,
    membership_tier: "public",
    accreditation_status: "pending",
    ppo_carriers: [],
    email: null,
    details_synced_at: "2026-06-12",
    website_scraped_at: null
  },
  {
    practice_name: "Magnolia Family Dental",
    doctor_name: null,
    slug: "magnolia-family-dental",
    address: "9055 Magnolia Ave",
    city: "Fountain Valley",
    county: "Orange County",
    state: "CA",
    zip: "92708",
    lat: 33.7121,
    lng: -117.9523,
    phone: null,
    website: null,
    google_rating: null,
    google_reviews: null,
    place_id: null,
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=Magnolia+Family+Dental+Fountain+Valley+CA",
    specialty: ["general-dentistry", "family-dentistry"],
    tags: ["ppo-friendly", "fountain-valley"],
    languages: [],
    has_saturday: null,
    has_sunday: null,
    membership_tier: "public",
    accreditation_status: "pending",
    ppo_carriers: [],
    email: null,
    details_synced_at: "2026-06-12",
    website_scraped_at: null
  },
  {
    practice_name: "Brookhurst Dental Care",
    doctor_name: null,
    slug: "brookhurst-dental-care",
    address: "17300 Brookhurst St",
    city: "Fountain Valley",
    county: "Orange County",
    state: "CA",
    zip: "92708",
    lat: 33.7076,
    lng: -117.9566,
    phone: null,
    website: null,
    google_rating: null,
    google_reviews: null,
    place_id: null,
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=Brookhurst+Dental+Care+Fountain+Valley+CA",
    specialty: ["general-dentistry"],
    tags: ["ppo-friendly", "fountain-valley"],
    languages: [],
    has_saturday: null,
    has_sunday: null,
    membership_tier: "public",
    accreditation_status: "pending",
    ppo_carriers: [],
    email: null,
    details_synced_at: "2026-06-12",
    website_scraped_at: null
  },
  {
    practice_name: "Beach Cities Dental",
    doctor_name: null,
    slug: "beach-cities-dental",
    address: "18582 Beach Blvd",
    city: "Huntington Beach",
    county: "Orange County",
    state: "CA",
    zip: "92648",
    lat: 33.7248,
    lng: -117.9985,
    phone: null,
    website: null,
    google_rating: null,
    google_reviews: null,
    place_id: null,
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=Beach+Cities+Dental+Huntington+Beach+CA",
    specialty: ["general-dentistry", "cosmetic-dentistry"],
    tags: ["ppo-friendly", "huntington-beach"],
    languages: [],
    has_saturday: null,
    has_sunday: null,
    membership_tier: "public",
    accreditation_status: "pending",
    ppo_carriers: [],
    email: null,
    details_synced_at: "2026-06-12",
    website_scraped_at: null
  },
  {
    practice_name: "Pacific Coast Dental",
    doctor_name: null,
    slug: "pacific-coast-dental",
    address: "20902 Brookhurst St",
    city: "Huntington Beach",
    county: "Orange County",
    state: "CA",
    zip: "92646",
    lat: 33.6918,
    lng: -117.9567,
    phone: null,
    website: null,
    google_rating: null,
    google_reviews: null,
    place_id: null,
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=Pacific+Coast+Dental+Huntington+Beach+CA",
    specialty: ["general-dentistry", "family-dentistry"],
    tags: ["ppo-friendly", "huntington-beach"],
    languages: [],
    has_saturday: null,
    has_sunday: null,
    membership_tier: "public",
    accreditation_status: "pending",
    ppo_carriers: [],
    email: null,
    details_synced_at: "2026-06-12",
    website_scraped_at: null
  },
  {
    practice_name: "Westminster Dental Group",
    doctor_name: null,
    slug: "westminster-dental-group",
    address: "14540 Magnolia St",
    city: "Westminster",
    county: "Orange County",
    state: "CA",
    zip: "92683",
    lat: 33.7526,
    lng: -117.9938,
    phone: null,
    website: null,
    google_rating: null,
    google_reviews: null,
    place_id: null,
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=Westminster+Dental+Group+Westminster+CA",
    specialty: ["general-dentistry", "family-dentistry"],
    tags: ["ppo-friendly", "westminster", "vietnamese-speaking"],
    languages: ["Vietnamese"],
    has_saturday: null,
    has_sunday: null,
    membership_tier: "public",
    accreditation_status: "pending",
    ppo_carriers: [],
    email: null,
    details_synced_at: "2026-06-12",
    website_scraped_at: null
  },
  {
    practice_name: "Bolsa Dental",
    doctor_name: null,
    slug: "bolsa-dental",
    address: "9822 Bolsa Ave",
    city: "Westminster",
    county: "Orange County",
    state: "CA",
    zip: "92683",
    lat: 33.7512,
    lng: -117.9876,
    phone: null,
    website: null,
    google_rating: null,
    google_reviews: null,
    place_id: null,
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=Bolsa+Dental+Westminster+CA",
    specialty: ["general-dentistry"],
    tags: ["ppo-friendly", "westminster", "vietnamese-speaking"],
    languages: ["Vietnamese"],
    has_saturday: null,
    has_sunday: null,
    membership_tier: "public",
    accreditation_status: "pending",
    ppo_carriers: [],
    email: null,
    details_synced_at: "2026-06-12",
    website_scraped_at: null
  },
  {
    practice_name: "Garden Grove Dental Arts",
    doctor_name: null,
    slug: "garden-grove-dental-arts",
    address: "12900 Garden Grove Blvd",
    city: "Garden Grove",
    county: "Orange County",
    state: "CA",
    zip: "92843",
    lat: 33.7742,
    lng: -117.9337,
    phone: null,
    website: null,
    google_rating: null,
    google_reviews: null,
    place_id: null,
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=Garden+Grove+Dental+Arts+Garden+Grove+CA",
    specialty: ["general-dentistry", "cosmetic-dentistry"],
    tags: ["ppo-friendly", "garden-grove"],
    languages: [],
    has_saturday: null,
    has_sunday: null,
    membership_tier: "public",
    accreditation_status: "pending",
    ppo_carriers: [],
    email: null,
    details_synced_at: "2026-06-12",
    website_scraped_at: null
  },
  {
    practice_name: "Harbor Dental Care",
    doctor_name: null,
    slug: "harbor-dental-care",
    address: "10542 Garden Grove Blvd",
    city: "Garden Grove",
    county: "Orange County",
    state: "CA",
    zip: "92843",
    lat: 33.7714,
    lng: -117.9380,
    phone: null,
    website: null,
    google_rating: null,
    google_reviews: null,
    place_id: null,
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=Harbor+Dental+Care+Garden+Grove+CA",
    specialty: ["general-dentistry", "family-dentistry"],
    tags: ["ppo-friendly", "garden-grove"],
    languages: [],
    has_saturday: null,
    has_sunday: null,
    membership_tier: "public",
    accreditation_status: "pending",
    ppo_carriers: [],
    email: null,
    details_synced_at: "2026-06-12",
    website_scraped_at: null
  },
  {
    practice_name: "Costa Mesa Family Dental",
    doctor_name: null,
    slug: "costa-mesa-family-dental",
    address: "1835 Newport Blvd",
    city: "Costa Mesa",
    county: "Orange County",
    state: "CA",
    zip: "92627",
    lat: 33.6416,
    lng: -117.9190,
    phone: null,
    website: null,
    google_rating: null,
    google_reviews: null,
    place_id: null,
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=Costa+Mesa+Family+Dental+Costa+Mesa+CA",
    specialty: ["general-dentistry", "family-dentistry"],
    tags: ["ppo-friendly", "costa-mesa"],
    languages: [],
    has_saturday: null,
    has_sunday: null,
    membership_tier: "public",
    accreditation_status: "pending",
    ppo_carriers: [],
    email: null,
    details_synced_at: "2026-06-12",
    website_scraped_at: null
  }
];

/* ─── LOOKUP HELPERS ─── */
CC.getDentistsByCity = city =>
  CC.DENTISTS.filter(d => d.city.toLowerCase() === city.toLowerCase());

CC.getDentistsBySpecialty = specialty =>
  CC.DENTISTS.filter(d => d.specialty.includes(specialty));

CC.getDentistsByLanguage = lang =>
  CC.DENTISTS.filter(d => d.languages.map(l => l.toLowerCase()).includes(lang.toLowerCase()));

CC.getDentistsByCarrier = carrier =>
  CC.DENTISTS.filter(d => d.ppo_carriers.map(c => c.toLowerCase()).includes(carrier.toLowerCase()));

CC.getNearby = (lat, lng, radiusMiles = 10) =>
  CC.DENTISTS
    .map(d => ({ ...d, _dist: CC.distanceMiles(lat, lng, d.lat, d.lng) }))
    .filter(d => d._dist <= radiusMiles)
    .sort((a, b) => a._dist - b._dist);
