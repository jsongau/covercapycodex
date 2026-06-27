/**
 * CoverCapy SEO Schema Generators
 * JSON-LD utilities for WebPage, BreadcrumbList, Dentist, MedicalBusiness, FAQPage, CollectionPage.
 * Requires: seo-dentist-graph.js (CC namespace).
 * Version: 1.0
 *
 * These generators are used at build time (called from a Node script or browser console)
 * to produce the <script type="application/ld+json"> blocks embedded in each page.
 * They are also safe to run client-side.
 */
(function() {
  "use strict";

  const CC = window.CC;

  /* ─── WEBSITE ROOT (shared across all pages) ─── */
  CC.schema = CC.schema || {};

  CC.schema.website = {
    "@type": "WebSite",
    "@id": "https://www.covercapy.com/#website",
    "url": "https://www.covercapy.com/",
    "name": "CoverCapy",
    "description": "PPO dental concierge marketplace and dentist directory for Orange County and California."
  };

  /* ─── BREADCRUMB LIST ─── */
  CC.schema.breadcrumbs = function(items, pageId) {
    return {
      "@type": "BreadcrumbList",
      "@id": `${pageId}#breadcrumbs`,
      "itemListElement": items.map((item, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": item.name,
        ...(item.url ? { "item": item.url } : {})
      }))
    };
  };

  /* ─── WEBPAGE ─── */
  CC.schema.webPage = function({ pageId, url, name, description, cssSelectors }) {
    return {
      "@type": "WebPage",
      "@id": `${pageId}#webpage`,
      "url": url,
      "name": name,
      "description": description,
      "isPartOf": { "@id": "https://www.covercapy.com/#website" },
      "inLanguage": "en-US",
      ...(cssSelectors ? {
        "speakable": { "@type": "SpeakableSpecification", "cssSelector": cssSelectors }
      } : {})
    };
  };

  /* ─── COLLECTION PAGE (hub pages) ─── */
  CC.schema.collectionPage = function({ pageId, url, name, description, items }) {
    return {
      "@type": ["WebPage", "CollectionPage"],
      "@id": `${pageId}#webpage`,
      "url": url,
      "name": name,
      "description": description,
      "isPartOf": { "@id": "https://www.covercapy.com/#website" },
      "inLanguage": "en-US",
      ...(items ? { "mainEntity": { "@type": "ItemList", "itemListElement": items } } : {})
    };
  };

  /* ─── DENTIST / MEDICAL BUSINESS ─── */
  CC.schema.dentistOrg = function(d) {
    const pageId = CC.dentistUrl(d);
    const orgId  = `${pageId}#org`;
    const schema = {
      "@type": ["Dentist", "MedicalBusiness", "LocalBusiness"],
      "@id": orgId,
      "name": d.practice_name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": d.address,
        "addressLocality": d.city,
        "addressRegion": "CA",
        "postalCode": d.zip,
        "addressCountry": "US"
      },
      "areaServed": [
        { "@type": "City", "name": d.city },
        { "@type": "State", "name": "California" }
      ],
      "medicalSpecialty": "Dentistry"
    };
    if (d.phone) schema.telephone = d.phone;
    if (d.website) schema.url = d.website;
    if (d.google_rating) schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": d.google_rating,
      "reviewCount": d.google_reviews || 1,
      "bestRating": 5
    };
    if (d.lat && d.lng) schema.geo = {
      "@type": "GeoCoordinates",
      "latitude": d.lat,
      "longitude": d.lng
    };
    return schema;
  };

  /* ─── FAQ PAGE ─── */
  CC.schema.faqPage = function(faqs, pageId) {
    return {
      "@type": "FAQPage",
      "@id": `${pageId}#faq`,
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a }
      }))
    };
  };

  /* ─── ITEM LIST (for hub pages listing dentists) ─── */
  CC.schema.itemList = function(dentists, pageId) {
    return {
      "@type": "ItemList",
      "@id": `${pageId}#dentist-list`,
      "itemListElement": dentists.map((d, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": CC.dentistUrl(d),
        "name": d.practice_name
      }))
    };
  };

  /* ─── FULL PAGE GRAPH BUILDER ─── */
  CC.schema.buildGraph = function(nodes) {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [CC.schema.website, ...nodes]
    }, null, 2);
  };

  /* ─── DENTIST PROFILE FULL GRAPH ─── */
  CC.schema.dentistProfileGraph = function(d, faqs, breadcrumbItems) {
    const pageId = CC.dentistUrl(d);
    return CC.schema.buildGraph([
      CC.schema.webPage({
        pageId,
        url: pageId,
        name: `${d.practice_name} | PPO Dentist in ${d.city}, CA | CoverCapy`,
        description: `${d.practice_name} in ${d.city}, California. CoverCapy directory profile with address, specialties, PPO insurance guidance, and nearby dental offices.`,
        cssSelectors: ["#hero-h1", "#hero-sub"]
      }),
      CC.schema.breadcrumbs(breadcrumbItems, pageId),
      CC.schema.dentistOrg(d),
      ...(faqs ? [CC.schema.faqPage(faqs, pageId)] : [])
    ]);
  };

})();
