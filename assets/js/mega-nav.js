/* ════════════════════════════════════════════════════════════════
   CoverCapy MEGA NAV — behavior + data + interactions
   Extracted verbatim from membership v513.

   Architecture:
     • Top-level declarations (data + named functions) are global
       because this file is loaded as a non-module <script src=>.
       That's required so inline onclick="megaGo(...)" handlers
       inside mega-nav.html (which is injected dynamically) can
       resolve them by bare name.
     • DOM binding (link hover/click/escape, initial paint, calc
       pre-select, crown count-up) lives inside window.initMegaNav(),
       which load-nav.js calls AFTER the nav HTML is injected.
     • initMegaNav() is idempotent — guarded by window.__megaNavInitialized.
   ════════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════
   v201 DATA — sourced directly from v156
   Hierarchy:  Region → Location (state) → Popular Areas (county) → Cities (w/ ZIP)
   No status labels. Only data that renders.
   ════════════════════════════════════════════════════════════════ */

// Tier 1: Regions, display order = west-coast · southwest · midwest · south · east-coast
const REGIONS = {
  'west-coast': { name:'West Coast', icon:'🌊', locations:['southern-california','northern-california','washington','oregon'],         awaiting:36 },
  'southwest':  { name:'Southwest',  icon:'🌵', locations:['central-california','nevada','arizona'],                                   awaiting:31 },
  'midwest':    { name:'Midwest',    icon:'🌾', locations:['illinois','michigan','ohio'],                                             awaiting:21 },
  'south':      { name:'South',      icon:'🤠', locations:['texas','georgia','north-carolina','greater-new-orleans'],                 awaiting:33 },
  'east-coast': { name:'East Coast', icon:'🗽', locations:['new-york','new-jersey','florida','dmv-area'],                             awaiting:46 }
};
const REGION_ORDER = ['west-coast','southwest','midwest','south','east-coast'];

// Tier 2: Locations (states / sub-regions)
const LOCATIONS = {
  // West Coast
  'northern-california': { name:'San Francisco Bay Area', icon:'🌉' },
  'washington':          { name:'Washington',             icon:'🌧️' },
  'oregon':              { name:'Oregon',                 icon:'🌲' },
  // Southwest
  'southern-california': { name:'Southern California',    icon:'🌴' },
  'central-california':  { name:'Central California',     icon:'🍇' },
  'nevada':              { name:'Nevada',                 icon:'🎰' },
  'arizona':             { name:'Arizona',                icon:'🌵' },
  // Midwest
  'illinois':            { name:'Chicagoland',            icon:'🌆' },
  'michigan':            { name:'Michigan',               icon:'🚗' },
  'ohio':                { name:'Ohio',                   icon:'🍂' },
  // South
  'texas':               { name:'Texas',                  icon:'⭐' },
  'georgia':             { name:'Georgia',                icon:'🍑' },
  'north-carolina':      { name:'North Carolina',         icon:'🌳' },
  'greater-new-orleans': { name:'Greater New Orleans',    icon:'🎷' },
  // East Coast
  'new-york':            { name:'NYC Metro',              icon:'🗽' },
  'new-jersey':          { name:'New Jersey',             icon:'🏙️' },
  'florida':             { name:'South Florida',          icon:'🐊' },
  'dmv-area':            { name:'DMV Area',               icon:'🏛️' }
};

// Tier 3: Popular Areas (mixed counties + cities from v156's POPULAR_AREAS_V104)
// Each area lists its child cities (with ZIPs) where applicable.
const AREAS = {
  // ── Southern California ─────────────────────────────────────────────
  'orange-county':    { name:'Orange County',     icon:'🌴', loc:'southern-california', count:'48',  cities:['irvine','newport-beach','fountain-valley','costa-mesa','huntington-beach'] },
  'los-angeles':      { name:'Los Angeles',       icon:'🌆', loc:'southern-california', count:'124', cities:['beverly-hills','santa-monica','long-beach','pasadena','culver-city','rowland-heights','west-covina','diamond-bar','arcadia','el-monte'] },
  'san-diego':        { name:'San Diego',         icon:'🌊', loc:'southern-california', count:'52',  cities:['la-jolla','carlsbad','encinitas','del-mar'] },
  'inland-empire':    { name:'Inland Empire',     icon:'🍊', loc:'southern-california', count:'29',  cities:['riverside','temecula','corona'] },
  'san-bernardino':   { name:'San Bernardino',    icon:'🏔️', loc:'southern-california', count:'24',  cities:['rancho-cucamonga','redlands','ontario'] },
  'ventura-county':   { name:'Ventura County',    icon:'🌅', loc:'southern-california', count:'420+',cities:['thousand-oaks','ventura','oxnard'] },

  // ── Bay Area ────────────────────────────────────────────────────────
  'san-francisco':    { name:'San Francisco',     icon:'🌉', loc:'northern-california', count:'600+',cities:['pacific-heights','marina','mission'] },
  'oakland':          { name:'Oakland',           icon:'🌳', loc:'northern-california', count:'350+',cities:['oakland-downtown','berkeley','fremont'] },
  'san-jose':         { name:'San Jose',          icon:'💻', loc:'northern-california', count:'380+',cities:['san-jose-downtown','palo-alto','sunnyvale'] },

  // ── Central CA ──────────────────────────────────────────────────────
  'fresno':           { name:'Fresno',            icon:'🍇', loc:'central-california', count:'250+',cities:['fresno-downtown','clovis','sanger'] },
  'bakersfield':      { name:'Bakersfield',       icon:'🌾', loc:'central-california', count:'180+',cities:['bakersfield-downtown','delano'] },

  // ── Washington ──────────────────────────────────────────────────────
  'seattle':          { name:'Seattle',           icon:'🌧️', loc:'washington',         count:'600+',cities:['seattle-downtown','bellevue','redmond'] },
  'tacoma':           { name:'Tacoma',            icon:'🏔️', loc:'washington',         count:'180+',cities:['tacoma-downtown','puyallup','lakewood'] },
  'everett':          { name:'Everett',           icon:'🌲', loc:'washington',         count:'150+',cities:['everett-downtown','lynnwood','marysville'] },

  // ── Oregon ──────────────────────────────────────────────────────────
  'portland':         { name:'Portland',          icon:'🌲', loc:'oregon',             count:'350+',cities:['portland-downtown','gresham'] },
  'beaverton':        { name:'Beaverton',         icon:'🍃', loc:'oregon',             count:'120+',cities:['beaverton-downtown','hillsboro','tigard'] },

  // ── Nevada ──────────────────────────────────────────────────────────
  'las-vegas':        { name:'Las Vegas',         icon:'🎰', loc:'nevada',             count:'450+',cities:['las-vegas-strip','henderson','north-las-vegas'] },
  'reno':             { name:'Reno',              icon:'🏔️', loc:'nevada',             count:'180+',cities:['reno-downtown','sparks','incline-village'] },

  // ── Arizona ─────────────────────────────────────────────────────────
  'phoenix':          { name:'Phoenix',           icon:'🌵', loc:'arizona',            count:'750+',cities:['phoenix-downtown','scottsdale','mesa','tempe'] },
  'tucson':           { name:'Tucson',            icon:'🦎', loc:'arizona',            count:'250+',cities:['tucson-downtown','oro-valley','marana'] },

  // ── Illinois ────────────────────────────────────────────────────────
  'chicago':          { name:'Chicago',           icon:'🌆', loc:'illinois',           count:'900+',cities:['chicago-downtown','evanston','oak-park'] },
  'naperville':       { name:'Naperville',        icon:'🌳', loc:'illinois',           count:'180+',cities:['naperville-downtown','wheaton','downers-grove'] },

  // ── Michigan ────────────────────────────────────────────────────────
  'detroit':          { name:'Detroit',           icon:'🚗', loc:'michigan',           count:'300+',cities:['detroit-downtown','livonia','dearborn'] },
  'troy':             { name:'Troy',              icon:'🍂', loc:'michigan',           count:'160+',cities:['troy-downtown','royal-oak','birmingham-mi'] },

  // ── Ohio ────────────────────────────────────────────────────────────
  'columbus':         { name:'Columbus',          icon:'🦌', loc:'ohio',               count:'280+',cities:['columbus-downtown','dublin','westerville'] },
  'cleveland':        { name:'Cleveland',         icon:'🏈', loc:'ohio',               count:'250+',cities:['cleveland-downtown','beachwood','westlake'] },

  // ── Texas ───────────────────────────────────────────────────────────
  'houston':          { name:'Houston',           icon:'🚀', loc:'texas',              count:'700+',cities:['houston-downtown','bellaire','sugar-land'] },
  'dallas':           { name:'Dallas',            icon:'⭐', loc:'texas',              count:'600+',cities:['dallas-downtown','plano','frisco','mckinney'] },
  'austin':           { name:'Austin',            icon:'🎸', loc:'texas',              count:'280+',cities:['austin-downtown','west-lake-hills'] },

  // ── Georgia ─────────────────────────────────────────────────────────
  'atlanta':          { name:'Atlanta',           icon:'🍑', loc:'georgia',            count:'400+',cities:['atlanta-downtown','sandy-springs','roswell'] },
  'gwinnett':         { name:'Gwinnett',          icon:'🌳', loc:'georgia',            count:'250+',cities:['lawrenceville','duluth','suwanee'] },

  // ── North Carolina ──────────────────────────────────────────────────
  'raleigh':          { name:'Raleigh',           icon:'🌳', loc:'north-carolina',     count:'250+',cities:['raleigh-downtown','cary','apex'] },
  'charlotte':        { name:'Charlotte',         icon:'🐝', loc:'north-carolina',     count:'320+',cities:['charlotte-downtown','matthews','davidson'] },

  // ── Greater New Orleans ─────────────────────────────────────────────
  'new-orleans':      { name:'New Orleans',       icon:'🎷', loc:'greater-new-orleans',count:'400+',cities:['french-quarter','garden-district','uptown'] },
  'metairie':         { name:'Metairie',          icon:'⚜️', loc:'greater-new-orleans',count:'350+',cities:['metairie-downtown','kenner','gretna'] },
  'st-tammany':       { name:'St. Tammany',       icon:'🌳', loc:'greater-new-orleans',count:'200+',cities:['mandeville','covington','slidell'] },

  // ── New York ────────────────────────────────────────────────────────
  'manhattan':        { name:'Manhattan',         icon:'🏙️', loc:'new-york',          count:'800+',cities:['upper-east-side','tribeca','chelsea'] },
  'brooklyn':         { name:'Brooklyn',          icon:'🌉', loc:'new-york',          count:'600+',cities:['williamsburg','park-slope','dumbo'] },
  'queens':           { name:'Queens',            icon:'🌎', loc:'new-york',          count:'700+',cities:['astoria','lic','forest-hills'] },

  // ── New Jersey ──────────────────────────────────────────────────────
  'jersey-city':      { name:'Jersey City',       icon:'🌉', loc:'new-jersey',         count:'200+',cities:['jersey-city-downtown','hoboken','bayonne'] },
  'hackensack':       { name:'Hackensack',        icon:'🌳', loc:'new-jersey',         count:'180+',cities:['hackensack-downtown','paramus','englewood'] },
  'middlesex':        { name:'Middlesex',         icon:'🏙️', loc:'new-jersey',        count:'220+',cities:['edison','new-brunswick','woodbridge'] },

  // ── Florida ─────────────────────────────────────────────────────────
  'miami':            { name:'Miami',             icon:'🌊', loc:'florida',            count:'600+',cities:['miami-downtown','miami-beach','coral-gables'] },
  'broward':          { name:'Broward',           icon:'🐊', loc:'florida',            count:'700+',cities:['fort-lauderdale','hollywood-fl'] },
  'orlando':          { name:'Orlando',           icon:'🍊', loc:'florida',            count:'500+',cities:['orlando-downtown','winter-park'] },

  // ── DMV ─────────────────────────────────────────────────────────────
  'washington-dc':    { name:'Washington DC',     icon:'🏛️', loc:'dmv-area',          count:'600+',cities:['capitol-hill','georgetown','dupont'] },
  'arlington':        { name:'Arlington',         icon:'🌳', loc:'dmv-area',           count:'300+',cities:['arlington-downtown','crystal-city','rosslyn'] },
  'montgomery':       { name:'Montgomery',        icon:'🌲', loc:'dmv-area',           count:'700+',cities:['bethesda','rockville','silver-spring'] },
  'fairfax':          { name:'Fairfax',           icon:'🦌', loc:'dmv-area',           count:'650+',cities:['reston','tysons','fairfax-city'] }
};

// Tier 4: Cities (with anchor ZIP, sourced from v156)
const CITIES = {
  // SoCal — Orange County
  'irvine':              { name:'Irvine',           zip:'92602 · 92603 · 92618' },
  'newport-beach':       { name:'Newport Beach',    zip:'92660 · 92661 · 92663' },
  'fountain-valley':     { name:'Fountain Valley',  zip:'92708' },
  'costa-mesa':          { name:'Costa Mesa',       zip:'92626 · 92627' },
  'huntington-beach':    { name:'Huntington Beach', zip:'92647 · 92648' },
  // SoCal — Los Angeles
  'beverly-hills':       { name:'Beverly Hills',    zip:'90210 · 90212' },
  'santa-monica':        { name:'Santa Monica',     zip:'90401 · 90402' },
  'long-beach':          { name:'Long Beach',       zip:'90802 · 90803' },
  'pasadena':            { name:'Pasadena',         zip:'91101 · 91103' },
  'culver-city':         { name:'Culver City',      zip:'90230 · 90232' },
  // SoCal — San Gabriel Valley (under Los Angeles area)
  'rowland-heights':     { name:'Rowland Heights',  zip:'91748' },
  'west-covina':         { name:'West Covina',      zip:'91790 · 91791' },
  'diamond-bar':         { name:'Diamond Bar',      zip:'91765' },
  'arcadia':             { name:'Arcadia',          zip:'91006 · 91007' },
  'el-monte':            { name:'El Monte',         zip:'91731 · 91732' },
  // SoCal — San Diego
  'la-jolla':            { name:'La Jolla',         zip:'92037' },
  'carlsbad':            { name:'Carlsbad',         zip:'92008 · 92009' },
  'encinitas':           { name:'Encinitas',        zip:'92024' },
  'del-mar':             { name:'Del Mar',          zip:'92014' },
  // SoCal — Inland Empire
  'riverside':           { name:'Riverside',        zip:'92501 · 92503' },
  'temecula':            { name:'Temecula',         zip:'92590 · 92591' },
  'corona':              { name:'Corona',           zip:'92879 · 92881' },
  // SoCal — San Bernardino
  'rancho-cucamonga':    { name:'Rancho Cucamonga', zip:'91730 · 91737' },
  'redlands':            { name:'Redlands',         zip:'92373 · 92374' },
  'ontario':             { name:'Ontario',          zip:'91761 · 91764' },
  // SoCal — Ventura
  'thousand-oaks':       { name:'Thousand Oaks',    zip:'91360 · 91362' },
  'ventura':             { name:'Ventura',          zip:'93001 · 93003' },
  'oxnard':              { name:'Oxnard',           zip:'93030 · 93033' },
  // Bay Area
  'pacific-heights':     { name:'Pacific Heights',  zip:'94115 · 94123' },
  'marina':              { name:'Marina',           zip:'94123' },
  'mission':             { name:'Mission',          zip:'94110 · 94114' },
  'oakland-downtown':    { name:'Oakland Downtown', zip:'94607 · 94612' },
  'berkeley':            { name:'Berkeley',         zip:'94704 · 94705' },
  'fremont':             { name:'Fremont',          zip:'94536 · 94538' },
  'san-jose-downtown':   { name:'Downtown San Jose',zip:'95110 · 95113' },
  'palo-alto':           { name:'Palo Alto',        zip:'94301 · 94306' },
  'sunnyvale':           { name:'Sunnyvale',        zip:'94085 · 94087' },
  // Central CA
  'fresno-downtown':     { name:'Downtown Fresno',  zip:'93721' },
  'clovis':              { name:'Clovis',           zip:'93611 · 93612' },
  'sanger':              { name:'Sanger',           zip:'93657' },
  'bakersfield-downtown':{ name:'Downtown Bakersfield', zip:'93301' },
  'delano':              { name:'Delano',           zip:'93215' },
  // Washington
  'seattle-downtown':    { name:'Downtown Seattle', zip:'98101 · 98104' },
  'bellevue':            { name:'Bellevue',         zip:'98004 · 98007' },
  'redmond':             { name:'Redmond',          zip:'98052 · 98053' },
  'tacoma-downtown':     { name:'Downtown Tacoma',  zip:'98402 · 98403' },
  'puyallup':            { name:'Puyallup',         zip:'98371 · 98374' },
  'lakewood':            { name:'Lakewood',         zip:'98498 · 98499' },
  'everett-downtown':    { name:'Downtown Everett', zip:'98201 · 98203' },
  'lynnwood':            { name:'Lynnwood',         zip:'98036 · 98037' },
  'marysville':          { name:'Marysville',       zip:'98270 · 98271' },
  // Oregon
  'portland-downtown':   { name:'Downtown Portland',zip:'97201 · 97204' },
  'gresham':             { name:'Gresham',          zip:'97030 · 97080' },
  'beaverton-downtown':  { name:'Downtown Beaverton', zip:'97005 · 97006' },
  'hillsboro':           { name:'Hillsboro',        zip:'97123 · 97124' },
  'tigard':              { name:'Tigard',           zip:'97223 · 97224' },
  // Nevada
  'las-vegas-strip':     { name:'Las Vegas Strip',  zip:'89101 · 89109' },
  'henderson':           { name:'Henderson',        zip:'89014 · 89052' },
  'north-las-vegas':     { name:'North Las Vegas',  zip:'89030 · 89031' },
  'reno-downtown':       { name:'Downtown Reno',    zip:'89501 · 89503' },
  'sparks':              { name:'Sparks',           zip:'89431 · 89434' },
  'incline-village':     { name:'Incline Village',  zip:'89451' },
  // Arizona
  'phoenix-downtown':    { name:'Downtown Phoenix', zip:'85004 · 85007' },
  'scottsdale':          { name:'Scottsdale',       zip:'85251 · 85254' },
  'mesa':                { name:'Mesa',             zip:'85201 · 85204' },
  'tempe':               { name:'Tempe',            zip:'85281 · 85282' },
  'tucson-downtown':     { name:'Downtown Tucson',  zip:'85701 · 85705' },
  'oro-valley':          { name:'Oro Valley',       zip:'85737 · 85755' },
  'marana':              { name:'Marana',           zip:'85653 · 85658' },
  // Illinois
  'chicago-downtown':    { name:'Downtown Chicago', zip:'60601 · 60603' },
  'evanston':            { name:'Evanston',         zip:'60201 · 60202' },
  'oak-park':            { name:'Oak Park',         zip:'60301 · 60302' },
  'naperville-downtown': { name:'Downtown Naperville', zip:'60540' },
  'wheaton':             { name:'Wheaton',          zip:'60187 · 60189' },
  'downers-grove':       { name:'Downers Grove',    zip:'60515 · 60516' },
  // Michigan
  'detroit-downtown':    { name:'Downtown Detroit', zip:'48201 · 48226' },
  'livonia':             { name:'Livonia',          zip:'48150 · 48152' },
  'dearborn':            { name:'Dearborn',         zip:'48124 · 48126' },
  'troy-downtown':       { name:'Downtown Troy',    zip:'48084 · 48085' },
  'royal-oak':           { name:'Royal Oak',        zip:'48067 · 48073' },
  'birmingham-mi':       { name:'Birmingham',       zip:'48009' },
  // Ohio
  'columbus-downtown':   { name:'Downtown Columbus',zip:'43215 · 43219' },
  'dublin':              { name:'Dublin',           zip:'43016 · 43017' },
  'westerville':         { name:'Westerville',      zip:'43081 · 43082' },
  'cleveland-downtown':  { name:'Downtown Cleveland', zip:'44113 · 44115' },
  'beachwood':           { name:'Beachwood',        zip:'44122' },
  'westlake':            { name:'Westlake',         zip:'44145' },
  // Texas
  'houston-downtown':    { name:'Downtown Houston', zip:'77002 · 77003' },
  'bellaire':            { name:'Bellaire',         zip:'77401' },
  'sugar-land':          { name:'Sugar Land',       zip:'77478 · 77479' },
  'dallas-downtown':     { name:'Downtown Dallas',  zip:'75201 · 75202' },
  'plano':               { name:'Plano',            zip:'75024 · 75025' },
  'frisco':              { name:'Frisco',           zip:'75033 · 75034' },
  'mckinney':            { name:'McKinney',         zip:'75069 · 75070' },
  'austin-downtown':     { name:'Downtown Austin',  zip:'78701 · 78704' },
  'west-lake-hills':     { name:'West Lake Hills',  zip:'78746' },
  // Georgia
  'atlanta-downtown':    { name:'Downtown Atlanta', zip:'30303 · 30308' },
  'sandy-springs':       { name:'Sandy Springs',    zip:'30328 · 30342' },
  'roswell':             { name:'Roswell',          zip:'30075 · 30076' },
  'lawrenceville':       { name:'Lawrenceville',    zip:'30043 · 30044' },
  'duluth':              { name:'Duluth',           zip:'30096 · 30097' },
  'suwanee':             { name:'Suwanee',          zip:'30024' },
  // NC
  'raleigh-downtown':    { name:'Downtown Raleigh', zip:'27601 · 27603' },
  'cary':                { name:'Cary',             zip:'27511 · 27513' },
  'apex':                { name:'Apex',             zip:'27502 · 27523' },
  'charlotte-downtown':  { name:'Downtown Charlotte', zip:'28202 · 28204' },
  'matthews':            { name:'Matthews',         zip:'28104 · 28105' },
  'davidson':            { name:'Davidson',         zip:'28036' },
  // New Orleans
  'french-quarter':      { name:'French Quarter',   zip:'70112 · 70116' },
  'garden-district':     { name:'Garden District',  zip:'70115 · 70130' },
  'uptown':              { name:'Uptown',           zip:'70118 · 70125' },
  'metairie-downtown':   { name:'Downtown Metairie',zip:'70001 · 70003' },
  'kenner':              { name:'Kenner',           zip:'70062 · 70065' },
  'gretna':              { name:'Gretna',           zip:'70053 · 70056' },
  'mandeville':          { name:'Mandeville',       zip:'70448 · 70471' },
  'covington':           { name:'Covington',        zip:'70433 · 70435' },
  'slidell':             { name:'Slidell',          zip:'70458 · 70460' },
  // New York
  'upper-east-side':     { name:'Upper East Side',  zip:'10021 · 10028' },
  'tribeca':             { name:'Tribeca',          zip:'10007 · 10013' },
  'chelsea':             { name:'Chelsea',          zip:'10001 · 10011' },
  'williamsburg':        { name:'Williamsburg',     zip:'11211 · 11249' },
  'park-slope':          { name:'Park Slope',       zip:'11215 · 11217' },
  'dumbo':               { name:'DUMBO',            zip:'11201' },
  'astoria':             { name:'Astoria',          zip:'11102 · 11106' },
  'lic':                 { name:'Long Island City', zip:'11101 · 11109' },
  'forest-hills':        { name:'Forest Hills',     zip:'11375' },
  // New Jersey
  'jersey-city-downtown':{ name:'Downtown JC',      zip:'07302 · 07304' },
  'hoboken':             { name:'Hoboken',          zip:'07030' },
  'bayonne':             { name:'Bayonne',          zip:'07002' },
  'hackensack-downtown': { name:'Downtown Hackensack', zip:'07601' },
  'paramus':             { name:'Paramus',          zip:'07652 · 07653' },
  'englewood':           { name:'Englewood',        zip:'07631 · 07632' },
  'edison':              { name:'Edison',           zip:'08817 · 08820' },
  'new-brunswick':       { name:'New Brunswick',    zip:'08901' },
  'woodbridge':          { name:'Woodbridge',       zip:'07095' },
  // Florida
  'miami-downtown':      { name:'Downtown Miami',   zip:'33130 · 33131' },
  'miami-beach':         { name:'Miami Beach',      zip:'33139 · 33140' },
  'coral-gables':        { name:'Coral Gables',     zip:'33134 · 33146' },
  'fort-lauderdale':     { name:'Fort Lauderdale',  zip:'33301 · 33304' },
  'hollywood-fl':        { name:'Hollywood',        zip:'33019 · 33020' },
  'orlando-downtown':    { name:'Downtown Orlando', zip:'32801 · 32803' },
  'winter-park':         { name:'Winter Park',      zip:'32789 · 32792' },
  // DMV
  'capitol-hill':        { name:'Capitol Hill',     zip:'20002 · 20003' },
  'georgetown':          { name:'Georgetown',       zip:'20007' },
  'dupont':              { name:'Dupont',           zip:'20036' },
  'arlington-downtown':  { name:'Downtown Arlington', zip:'22201 · 22203' },
  'crystal-city':        { name:'Crystal City',     zip:'22202' },
  'rosslyn':             { name:'Rosslyn',          zip:'22209' },
  'bethesda':            { name:'Bethesda',         zip:'20814 · 20817' },
  'rockville':           { name:'Rockville',        zip:'20850 · 20852' },
  'silver-spring':       { name:'Silver Spring',    zip:'20901 · 20910' },
  'reston':              { name:'Reston',           zip:'20190 · 20194' },
  'tysons':              { name:'Tysons',           zip:'22102' },
  'fairfax-city':        { name:'Fairfax',          zip:'22030 · 22033' }
};

// Featured dentist per region (default for that region's hero card)
const REGION_FEATURED = {
  'west-coast': { name:'Dr. Kira Chen, DDS',  practice:'Bay Smile Studio',  loc:'Pacific Heights, SF · 4.9 ★', icon:'🦷' },
  'southwest':  { name:'KYT Dental Services', practice:'',                  loc:'Fountain Valley, CA · 4.9 ★',  icon:'🦷' },
  'midwest':    { name:'Dr. Amelia Voss, DDS',practice:'Loop Dental',        loc:'Downtown Chicago · 4.8 ★',     icon:'🦷' },
  'south':      { name:'Dr. Marco Reyes, DDS',practice:'River Oaks Dental',  loc:'Houston, TX · 4.9 ★',          icon:'🦷' },
  'east-coast': { name:'Dr. Jordan Kim, DDS', practice:'Tribeca Smile Co.',  loc:'Tribeca, NYC · 4.9 ★',         icon:'🦷' }
};

/* v215 — tier badge shown on the Featured Dentist card.
   v217 — badges now STACK: Platinum Elite cards also show Capy Accredited,
   Capy Accredited cards also show Verified. Each entry can override the
   default cascade with an explicit `badges: [...]` array (used by KYT). */
const FEATURED_DEFAULT_TIER = 'verified';

const TIER_LABEL = {
  'platinum-elite':  'Platinum Elite',
  'capy-accredited': 'Capy Accredited',
  'verified':        'Verified'
};
const TIER_ICON = {
  'platinum-elite':  '💎',
  'capy-accredited': '🦫',
  'verified':        '✓'
};

/* Standard tier cascade — render the dentist's tier plus the next one down.
   KYT (paying for the top tier monthly) overrides this and shows all three. */
const TIER_CASCADE = {
  'platinum-elite':  ['platinum-elite', 'capy-accredited'],
  'capy-accredited': ['capy-accredited', 'verified'],
  'verified':        ['verified']
};

function tierBadgesFor(f){
  if(f && Array.isArray(f.badges)) return f.badges;
  const t = (f && f.tier) || FEATURED_DEFAULT_TIER;
  return TIER_CASCADE[t] || [FEATURED_DEFAULT_TIER];
}

/* v410 — richer featured dentist data: single tier, reviews, PPO plans, practice href */
const AREA_FEATURED = {
  'orange-county': {
    name:'KYT Dental Services', loc:'Fountain Valley, CA', rating:'4.9', reviews:347,
    icon:'🦷', tier:'platinum-elite', href:'/dentists/kyt-dental-services',
    ppo:['UHC PPO','Guardian PPO','Aetna PPO','Ameritas']
  },
  'los-angeles': {
    name:'Pasadena Premier Dental', loc:'Pasadena, Los Angeles', rating:'4.9', reviews:212,
    icon:'🦷', tier:'capy-accredited', href:'/dentists/pasadena-premier-dental',
    ppo:['Delta Dental PPO','Cigna PPO','UHC PPO']
  },
  'manhattan': {
    name:'Tribeca Smile Co.', loc:'Tribeca, NYC', rating:'4.9', reviews:189,
    icon:'🦷', tier:'platinum-elite', href:'/dentists/tribeca-smile-co',
    ppo:['MetLife PPO','Aetna PPO','Guardian PPO']
  },
  'san-francisco': {
    name:'Bay Smile Studio', loc:'Pacific Heights, SF', rating:'4.9', reviews:164,
    icon:'🦷', tier:'capy-accredited', href:'/dentists/bay-smile-studio',
    ppo:['Delta Dental PPO','Cigna PPO','Guardian PPO']
  },
  'houston': {
    name:'River Oaks Dental', loc:'Houston, TX', rating:'4.9', reviews:143,
    icon:'🦷', tier:'verified', href:'/dentists/river-oaks-dental',
    ppo:['Cigna PPO','Aetna PPO','UHC PPO']
  },
  'chicago': {
    name:'Loop Dental', loc:'Downtown Chicago', rating:'4.8', reviews:128,
    icon:'🦷', tier:'capy-accredited', href:'/dentists/loop-dental',
    ppo:['Delta Dental PPO','MetLife PPO','Guardian PPO']
  }
};

// State
let activeRegion = 'west-coast';
let activeLocation = 'southern-california';
let activeArea = 'orange-county';
let activeCity = 'irvine';
let activeZipCluster = '92612';

/* ── RENDERERS ── */
function renderRegions(){
  const host = document.getElementById('find-regions');
  if(!host) return;
  host.innerHTML = REGION_ORDER.map(key => {
    const r = REGIONS[key];
    const active = key === activeRegion ? ' is-active' : '';
    const areaCount = r.locations.reduce((sum, locKey) => {
      return sum + Object.keys(AREAS).filter(aKey => AREAS[aKey].loc === locKey).length;
    }, 0);
    return `
      <a class="find-region${active}" data-region="${key}" href="${seoRegionUrl(key)}" onclick="event.stopPropagation();event.preventDefault();selectRegion('${key}');">
        <span class="find-region-icon">${r.icon}</span>
        <span class="find-region-name">${r.name}</span>
        <span class="find-region-sub">${areaCount} AREAS</span>
      </a>
    `;
  }).join('');
}

function renderLocations(){
  const host = document.getElementById('find-locations');
  if(!host) return;
  const r = REGIONS[activeRegion];
  host.innerHTML = r.locations.map(key => {
    const loc = LOCATIONS[key];
    if(!loc) return '';
    const active = key === activeLocation ? ' is-active' : '';
    const areaCount = Object.keys(AREAS).filter(aKey => AREAS[aKey].loc === key).length;
    return `
      <a class="find-location${active}" data-location="${key}" href="${seoLocationUrl(key)}" onclick="event.stopPropagation();event.preventDefault();selectLocation('${key}');">
        <span class="find-location-icon">${loc.icon}</span>
        <span class="find-location-text">
          <span class="find-location-name">${loc.name}</span>
          <span class="find-location-sub">${areaCount} local areas</span>
        </span>
      </a>
    `;
  }).join('');
  const tag = document.getElementById('find-locations-tag');
  if(tag) tag.textContent = r.locations.length + ' STATES';
}

/* ── v400: network status helper — always shows Building Network ── */
function networkStatus(countStr){
  const s = String(countStr || '');
  const n = parseInt(s.replace(/\D/g,''), 10);
  const hasPlus = s.includes('+');
  return { key:'building', label:'Building Network', title: (hasPlus ? n + '+' : n) + ' dentists in directory' };
}

function renderAreas(){
  const host = document.getElementById('find-areas');
  if(!host) return;
  const areas = Object.keys(AREAS).filter(key => AREAS[key].loc === activeLocation);
  host.innerHTML = areas.map(key => {
    const a = AREAS[key];
    const active = key === activeArea ? ' is-active' : '';
    const ns = networkStatus(a.count);
    return `
      <a class="find-area${active}" data-area="${key}" href="${seoAreaUrl(key)}" onclick="event.stopPropagation();event.preventDefault();selectArea('${key}');">
        <span class="find-area-icon">${a.icon}</span>
        <span class="find-area-name">${a.name}</span>
        <span class="find-area-count"><span class="net-status ${ns.key}" title="${ns.title}">${ns.label}</span></span>
      </a>
    `;
  }).join('');
  const tag = document.getElementById('find-areas-tag');
  if(tag) tag.textContent = areas.length + ' AREAS';
}

/* ── v410: city patient demand signal ── */
function cityMonthlySearches(slug){
  // Stable, deterministic number per city slug: 45–390 patients/month
  const h = stableHash('city-monthly-searches-v2:' + slug);
  const base = 45 + (h % 345);
  return base;
}

function cityFeaturedAreaSlug(slug){
  for(const aKey of Object.keys(AREAS)){
    if((AREAS[aKey].cities || []).indexOf(slug) !== -1) return aKey;
  }
  return null;
}

function renderCities(){
  const host = document.getElementById('find-cities');
  if(!host) return;
  const area = AREAS[activeArea];
  if(!area){ host.innerHTML = ''; return; }
  const cities = area.cities || [];
  const areaHasFeatured = !!AREA_FEATURED[activeArea];

  host.innerHTML = cities.map(slug => {
    const c = CITIES[slug];
    if(!c) return '';
    const active = slug === activeCity ? ' is-active' : '';
    const searches = cityMonthlySearches(slug);

    // Bottom line: if area already has a featured dentist, show "Featured area ✓"
    // otherwise show "Spot open · Be first" to drive dentist signups
    const statusHtml = areaHasFeatured
      ? `<span class="city-spot-featured">✓ Featured area</span>`
      : `<a class="city-spot-open" href="/get-featured/capy-accredited" onclick="event.stopPropagation();megaGo('accreditation');return false;">Open spot — apply</a>`;

    return `
      <a class="find-city${active}" data-city="${slug}" href="${seoDentistUrl(activeArea, slug)}" onclick="event.stopPropagation();event.preventDefault();selectCity('${slug}','${c.name.replace(/'/g,"\\'")}');">
        <span class="find-city-pin">📍</span>
        <span class="find-city-name">${c.name}</span>
        <span class="city-demand-wrap">
          <span class="city-demand-stat">${searches.toLocaleString()}<em> searches/mo</em></span>
          ${statusHtml}
        </span>
      </a>
    `;
  }).join('');
  const lbl = document.getElementById('find-cities-area');
  if(lbl) lbl.textContent = area.name;
  const tag = document.getElementById('find-cities-tag');
  if(tag) tag.textContent = cities.length + ' cities';
}

/* v208 — tracks the closest panel's current mode.
   v211 — added 'zip' mode for ZIP-aware city picking. */
let closestMode = 'area';

function renderClosest(mode){
  const area = AREAS[activeArea];
  if(!area) return;
  if(mode === 'city' || mode === 'area' || mode === 'zip') closestMode = mode;

  const closestEl = document.getElementById('find-closest');
  const labelEl   = document.getElementById('find-closest-label');
  const nameEl    = document.getElementById('find-closest-name');
  const countEl   = document.getElementById('find-closest-count');
  const cta       = document.getElementById('find-closest-cta');
  const pillsEl   = document.getElementById('find-zip-pills');
  const fallbackEl= document.getElementById('find-zip-fallback');

  if(closestEl) closestEl.dataset.mode = closestMode;

  /* ── ZIP mode: pills + closest-indexed fallback line ── */
  if(closestMode === 'zip'){
    const cities = findCitiesAtZip(activeZipCluster);
    if(labelEl) labelEl.textContent = 'At ZIP ' + (activeZipCluster || '—');
    if(pillsEl){
      pillsEl.innerHTML = cities.map(c => {
        const active = (selectedZipCity && selectedZipCity.slug === c.slug) ? ' is-active' : '';
        const safeName = String(c.name).replace(/'/g, "\\'");
        return `<button type="button" class="zip-city${active}" data-slug="${c.slug}" data-indexed="${c.indexed}" onclick="event.stopPropagation();selectZipCity('${c.slug}','${safeName}',${c.indexed});">${c.name}</button>`;
      }).join('');
    }
    if(fallbackEl){
      const closest = CITIES[activeCity];
      if(closest){
        const closestZip = firstZip(closest.zip);
        fallbackEl.innerHTML = 'Closest indexed PPO city: <strong>' + closest.name + '</strong>'
          + (closestZip ? ' · ' + closestZip : '')
          + ' · ' + area.name;
      } else {
        fallbackEl.innerHTML = 'Nearest indexed area: <strong>' + area.name + '</strong>';
      }
    }
    if(cta){
      cta.setAttribute('href', zipModeRoute());
      cta.textContent = 'Find Nearby Dentists';
    }
    return;
  }

  /* ── CITY mode (v208): single nearby city, no pills ── */
  const city = CITIES[activeCity];
  if(closestMode === 'city' && city){
    if(labelEl) labelEl.textContent = 'Closest Nearby City';
    if(nameEl)  nameEl.textContent  = city.name;
    if(countEl){
      const ns = networkStatus(area.count);
      countEl.innerHTML = `<span class="net-status ${ns.key}">${ns.label}</span>&ensp;<span style="color:var(--ink-soft);font-size:10.5px;font-weight:500;">${area.name}</span>`;
    }
    if(cta){
      const href = activeZipCluster
        ? seoZipUrl(activeCity, activeZipCluster)
        : seoCityUrl(activeArea, activeCity);
      cta.setAttribute('href', href);
      cta.textContent = 'Find Nearby Dentists';
    }
    return;
  }

  /* ── AREA mode: default browsing, no ZIP context ── */
  if(labelEl) labelEl.textContent = 'Closest Nearby Area';
  if(nameEl)  nameEl.textContent  = area.name;
  if(countEl){
    const ns = networkStatus(area.count);
    countEl.innerHTML = `<span class="net-status ${ns.key}">${ns.label}</span>&ensp;<span style="color:var(--ink-soft);font-size:10.5px;font-weight:500;">${area.count} dentists in directory</span>`;
  }
  if(cta){
    cta.setAttribute('href', seoAreaUrl(activeArea, { canonical: true }));
    cta.textContent = 'Find Nearby Dentists';
  }
}

/* v211 — route for ZIP mode honoring the user's pill pick.
   - If the picked city is indexed, use the canonical SEO city slug path.
   - Otherwise keep the city + zip query form so dentists.html can run
     a proximity search around the chosen non-indexed city. */
function zipModeRoute(){
  const sel = selectedZipCity;
  const zip = activeZipCluster;
  if(sel && sel.indexed){
    return seoZipUrl(sel.slug, zip);
  }
  if(sel){
    const params = ['city=' + sel.slug];
    if(zip) params.push('zip=' + zip);
    return '/dentists.html?' + params.join('&');
  }
  // Fallback: just the ZIP, no city
  return '/dentists.html?zip=' + (zip || '');
}

/* v211 — pill click handler. Toggles which city the user has picked
   and updates the pills + CTA href in place. */
function selectZipCity(slug, name, indexed){
  selectedZipCity = { slug: slug, name: name, indexed: !!indexed };
  renderClosest('zip');
  toast('City picked', name);
}

/* v208 — ZIP proximity scoring across the entire CITIES inventory.
   Tier 1 (score 0):        exact ZIP match
   Tier 2 (numeric):        same first 3 digits → numeric distance is the score
   Tier 3 (1M+):            same first 2 digits → broad metro match, AREA mode
   Tier 4 (10M+):           same first 1 digit  → coarse, AREA mode
   Lower score = better. Tiers 1-2 trigger CITY mode; tiers 3-4 only AREA. */
function findClosestByZip(input){
  if(!/^\d{5}$/.test(input)) return null;
  const inputN = parseInt(input, 10);
  const p3 = input.slice(0,3), p2 = input.slice(0,2), p1 = input.slice(0,1);
  let best = null;
  Object.keys(CITIES).forEach(cityKey => {
    const c = CITIES[cityKey];
    const zips = String(c.zip || '').split('·').map(s => s.trim()).filter(Boolean);
    zips.forEach(zip => {
      if(!/^\d{5}$/.test(zip)) return;
      const zn = parseInt(zip, 10);
      let score;
      if(zip === input)                 score = 0;
      else if(zip.slice(0,3) === p3)    score = Math.abs(zn - inputN);
      else if(zip.slice(0,2) === p2)    score =  1000000 + Math.abs(zn - inputN);
      else if(zip.slice(0,1) === p1)    score = 10000000 + Math.abs(zn - inputN);
      else return;
      const areaKey = Object.keys(AREAS).find(a => (AREAS[a].cities || []).indexOf(cityKey) !== -1);
      if(!areaKey) return;
      if(!best || score < best.score){
        best = { cityKey, areaKey, zip, score };
      }
    });
  });
  return best;
}

/* v207 — keep the hierarchy step-rail in sync with the deepest active level.
   v214 — Step 5 (Find) is the action step; it keeps .is-action even when not current. */
function renderStepRail(level){
  const ids = ['step-region','step-location','step-area','step-city','step-find'];
  ids.forEach((id, i) => {
    const el = document.getElementById(id);
    if(!el) return;
    if(i === level) el.classList.add('is-current');
    else el.classList.remove('is-current');
  });
}

function slugify(value){
  return String(value || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/* ════════════════════════════════════════════════════════════════
   v207 SEO SLUG SYSTEM — Region → Location → Area → City/ZIP
   Returns real future-ready hrefs for dentists.html.
   Long-tail variants are deterministic per city so they're stable
   across paints (good for SEO crawlers, sitemaps, link-share).
   ════════════════════════════════════════════════════════════════ */
const STATE_BY_LOC = {
  'southern-california':'california',
  'northern-california':'california',
  'central-california':'california',
  'washington':'washington',
  'oregon':'oregon',
  'nevada':'nevada',
  'arizona':'arizona',
  'illinois':'illinois',
  'michigan':'michigan',
  'ohio':'ohio',
  'texas':'texas',
  'georgia':'georgia',
  'north-carolina':'north-carolina',
  'greater-new-orleans':'louisiana',
  'new-york':'new-york',
  'new-jersey':'new-jersey',
  'florida':'florida',
  'dmv-area':'dmv'
};

/* Long-tail "near me" variants used to give dentists.html SEO depth.
   v214 — exact slug set, future-ready for programmatic page templates.
   We pick one deterministically based on city slug character sum so a city
   always lands on the same long-tail variant (stable for crawlers + sitemaps). */
const SEO_LONGTAILS = [
  'best-ppo-dentists-near-me',
  'best-dentists-near-me-that-accept-ppo-insurance',
  'best-in-network-ppo-dentists-near-me',
  'best-ppo-friendly-dentists-near-me',
  'best-dentists-that-accept-ppo-insurance-near-me',
  'best-reviewed-ppo-dentists-near-me',
  'featured-ppo-dentists',
  'capy-accredited-dentists',
  'implant-dentist-with-ppo',
  'cosmetic-dentist-with-ppo'
];
function pickLongtail(seed){
  const s = String(seed || '');
  let sum = 0;
  for(let i = 0; i < s.length; i++) sum += s.charCodeAt(i);
  return SEO_LONGTAILS[sum % SEO_LONGTAILS.length];
}

function firstZip(zipString){
  return String(zipString || '').split('·')[0].trim();
}

/* Level 1 — Region: dentists.html?region=west-coast */
function seoRegionUrl(regionKey){
  const r = REGIONS[regionKey];
  if(!r) return '/dentists';
  return '/dentists.html?region=' + slugify(regionKey);
}

/* Level 2 — Location (state): dentists.html?region=X&location=Y */
function seoLocationUrl(locKey){
  const loc = LOCATIONS[locKey];
  if(!loc) return '/dentists';
  // Find region that contains this location
  let regionKey = null;
  for(const rk of REGION_ORDER){
    if(REGIONS[rk].locations.indexOf(locKey) !== -1){ regionKey = rk; break; }
  }
  const stateSlug = STATE_BY_LOC[locKey] || slugify(locKey);
  const params = ['region=' + slugify(regionKey || activeRegion), 'location=' + stateSlug];
  return '/dentists.html?' + params.join('&');
}

/* Level 3 — Area (county): dentists.html?area=orange-county
   OR canonical path: /dentists/california/orange-county */
function seoAreaUrl(areaKey, opts){
  const a = AREAS[areaKey];
  if(!a) return '/dentists';
  const stateSlug = STATE_BY_LOC[a.loc] || slugify(a.loc);
  if(opts && opts.canonical){
    return '/dentists/' + stateSlug + '/' + slugify(areaKey);
  }
  return '/dentists.html?area=' + slugify(areaKey) + '&location=' + stateSlug;
}

/* Level 4 — City + ZIP: canonical long-slug path
   /dentists/california/orange-county/irvine/best-ppo-dentists-near-me
   OR query form: dentists.html?city=irvine&zip=92612 */
function seoCityUrl(areaKey, cityKey, opts){
  const area = AREAS[areaKey] || {};
  const city = CITIES[cityKey] || {};
  const stateSlug = STATE_BY_LOC[area.loc] || slugify(area.loc || activeLocation);
  const zip = firstZip(city.zip);
  if(opts && opts.queryForm){
    const params = ['city=' + slugify(cityKey)];
    if(zip) params.push('zip=' + zip);
    return '/dentists.html?' + params.join('&');
  }
  // Canonical long-slug form (SEO-friendly)
  const longtail = (opts && opts.longtail) || pickLongtail(cityKey);
  return '/dentists/' + [
    stateSlug,
    slugify(areaKey),
    slugify(cityKey),
    longtail
  ].filter(Boolean).join('/');
}

/* ZIP search: dentists.html?city=irvine&zip=92612 */
function seoZipUrl(cityKey, zip){
  const params = [];
  if(cityKey) params.push('city=' + slugify(cityKey));
  if(zip) params.push('zip=' + zip);
  return '/dentists.html?' + params.join('&');
}

/* v214 — targeted long-tail helpers for future page templates.
   These build on seoCityUrl with a specific longtail slug. Use them when
   you know the user's intent (e.g. clicking the City Featured CTA, the
   Accreditation CTA, or a specialty card). */
function seoFeaturedDentistsUrl(areaKey, cityKey){
  return seoCityUrl(areaKey, cityKey, { longtail: 'featured-ppo-dentists' });
}
function seoAccreditedDentistsUrl(areaKey, cityKey){
  return seoCityUrl(areaKey, cityKey, { longtail: 'capy-accredited-dentists' });
}
function seoImplantDentistsUrl(areaKey, cityKey){
  return seoCityUrl(areaKey, cityKey, { longtail: 'implant-dentist-with-ppo' });
}
function seoCosmeticDentistsUrl(areaKey, cityKey){
  return seoCityUrl(areaKey, cityKey, { longtail: 'cosmetic-dentist-with-ppo' });
}

/* Back-compat shim — old call site still works */
function seoDentistUrl(areaKey, cityKey){
  return seoCityUrl(areaKey, cityKey);
}

/* ════════════════════════════════════════════════════════════════
   v211 — ZIP-AWARE CITY RECOGNITION
   ZIP_NEIGHBORHOODS lists real cities at a ZIP that aren't yet in our
   PPO dentist inventory (CITIES). Combined with the indexed cities,
   the merged ZIP_INDEX gives us a "what cities live at this ZIP"
   lookup so the user can pick which city they're in — even if we
   don't have PPO dentists there yet (we'll route them to dentists.html
   with that city + ZIP, where proximity search takes over).
   ════════════════════════════════════════════════════════════════ */
const ZIP_NEIGHBORHOODS = {
  // ── San Gabriel Valley (LA County) — most cities here aren't yet PPO-indexed
  '91745': ['Hacienda Heights', 'City of Industry'],
  '91744': ['La Puente', 'City of Industry'],
  '91746': ['La Puente', 'City of Industry'],
  '91748': ['City of Industry'],
  '91792': ['City of Industry'],
  '91722': ['Covina'],
  '91723': ['Covina'],
  '91724': ['Covina'],
  '91706': ['Baldwin Park'],
  '91773': ['San Dimas'],
  '91775': ['San Gabriel'],
  '91776': ['San Gabriel'],
  '91754': ['Monterey Park'],
  '91755': ['Monterey Park'],
  '91801': ['Alhambra'],
  '91803': ['Alhambra'],
  '91789': ['Walnut'],
  '91709': ['Chino Hills'],
  '91710': ['Chino'],
  '91711': ['Claremont'],
  '91767': ['Pomona'],
  '91768': ['Pomona'],

  // ── LA Westside / Hollywood
  '90028': ['Hollywood'],
  '90046': ['West Hollywood', 'Hollywood Hills'],
  '90069': ['West Hollywood'],
  '90291': ['Venice'],
  '90292': ['Marina del Rey'],
  '90049': ['Brentwood'],
  '90272': ['Pacific Palisades'],
  '90064': ['West Los Angeles'],
  '90025': ['West Los Angeles'],

  // ── South Bay / OC adjacencies
  '92692': ['Mission Viejo'],
  '92691': ['Mission Viejo'],
  '92630': ['Lake Forest'],
  '92614': ['Irvine'],
  '92604': ['Irvine'],
  '92653': ['Aliso Viejo', 'Laguna Hills'],
  '92677': ['Laguna Niguel'],

  // ── NYC neighborhoods not yet PPO-indexed
  '10003': ['East Village', 'NoHo'],
  '10009': ['East Village', 'Alphabet City'],
  '10014': ['West Village', 'Greenwich Village'],
  '10004': ['Financial District'],
  '10005': ['Financial District'],
  '10128': ['Carnegie Hill'],
  '10075': ['Upper East Side'],
  '10024': ['Upper West Side'],
  '10025': ['Upper West Side']
};

/* Build the merged ZIP → cities index.
   Each city is { name, slug, indexed }. Indexed cities come from CITIES
   (we have PPO dentists there). Non-indexed cities come from
   ZIP_NEIGHBORHOODS (we know the city exists, but no inventory yet). */
const ZIP_INDEX = (function(){
  const idx = {};
  function add(zip, entry){
    if(!idx[zip]) idx[zip] = [];
    if(idx[zip].some(c => c.slug === entry.slug)) return;
    idx[zip].push(entry);
  }
  // 1) Indexed cities → derived from CITIES.zip clusters
  Object.keys(CITIES).forEach(cityKey => {
    const c = CITIES[cityKey];
    String(c.zip || '').split('·').map(s => s.trim()).filter(Boolean).forEach(zip => {
      if(/^\d{5}$/.test(zip)){
        add(zip, { name: c.name, slug: cityKey, indexed: true });
      }
    });
  });
  // 2) Neighborhood cities (real but not yet indexed for PPO inventory)
  //    NB: if the slug coincides with an indexed CITIES key, we still mark
  //    it indexed=true — the city has PPO dentists, just not at this ZIP.
  Object.keys(ZIP_NEIGHBORHOODS).forEach(zip => {
    ZIP_NEIGHBORHOODS[zip].forEach(name => {
      const slug = slugify(name);
      const isIndexed = !!CITIES[slug];
      add(zip, { name: name, slug: slug, indexed: isIndexed });
    });
  });
  return idx;
})();

function findCitiesAtZip(zip){
  return ZIP_INDEX[zip] ? ZIP_INDEX[zip].slice() : [];
}

/* v211 state — the user's pick from the ZIP pills.
   selectedZipCity = { name, slug, indexed } | null */
let selectedZipCity = null;

/* v223 — deterministic patient demand signals for Get Featured.
   Demand is stable per market, saved locally, and only trends upward once per day. */
const FEATURED_DEMAND_RANGES = {
  'area:los-angeles':       [3200, 6200],
  'area:orange-county':     [1800, 3900],
  'area:san-diego':         [1400, 2800],
  'area:inland-empire':     [900, 2100],
  'city:irvine':            [420, 950],
  'city:newport-beach':     [260, 720],
  'city:costa-mesa':        [240, 650],
  'city:plano':             [350, 850],
  'area:austin':            [900, 2100],
  'area:houston':           [2200, 4400],
  'area:dallas':            [2400, 4700],
  'location:texas':         [3800, 7200]
};
const FEATURED_PREMIUM_MARKETS = new Set(['newport-beach','irvine','beverly-hills','scottsdale']);
const FEATURED_FAMILY_AREAS = new Set(['orange-county','inland-empire','san-diego','houston','dallas','austin','phoenix','raleigh','charlotte','naperville','fairfax','montgomery']);
const FEATURED_DEFAULT_CHIPS = ['Implants','Crowns','Emergency','Invisalign','Cosmetic'];
const FEATURED_PREMIUM_CHIPS = ['Cosmetic','Veneers','Invisalign','Whitening','TMJ Botox'];
const FEATURED_FAMILY_CHIPS = ['Implants','Crowns','Emergency','Family Dentistry','Invisalign'];

function stableHash(value){
  const s = String(value || '');
  let h = 2166136261;
  for(let i = 0; i < s.length; i++){
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function todayKey(){
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function daysBetween(fromKey, toKey){
  const from = new Date(fromKey + 'T00:00:00');
  const to = new Date(toKey + 'T00:00:00');
  const days = Math.floor((to - from) / 86400000);
  return Number.isFinite(days) ? Math.max(0, days) : 0;
}

function inferDemandRange(scope, key){
  const exact = FEATURED_DEMAND_RANGES[scope + ':' + key];
  if(exact) return exact;

  const area = AREAS[key];
  const city = CITIES[key];
  const loc = LOCATIONS[key];
  const region = REGIONS[key];
  const countValue = area ? parseInt(String(area.count || '').replace(/\D/g, ''), 10) : 0;
  if(region || loc || countValue >= 500) return [900, 1900];
  if(area || countValue >= 180) return [450, 1100];
  if(city) return [180, 520];
  return [450, 1100];
}

function currentDemandMarket(){
  if(activeCity && CITIES[activeCity]){
    return {
      scope: 'city',
      key: activeCity,
      name: CITIES[activeCity].name,
      context: 'PPO searches in ' + CITIES[activeCity].name + ' this month'
    };
  }
  if(activeArea && AREAS[activeArea]){
    return {
      scope: 'area',
      key: activeArea,
      name: AREAS[activeArea].name,
      context: 'PPO searches across ' + AREAS[activeArea].name + ' this month'
    };
  }
  if(activeLocation && LOCATIONS[activeLocation]){
    const locationName = /california/.test(activeLocation) ? 'California' : LOCATIONS[activeLocation].name;
    return {
      scope: 'location',
      key: activeLocation,
      name: locationName,
      context: 'PPO searches across ' + locationName + ' markets this month'
    };
  }
  return {
    scope: 'region',
    key: activeRegion,
    name: (REGIONS[activeRegion] && REGIONS[activeRegion].name) || 'your market',
    context: 'PPO searches across your market this month'
  };
}

function storedDemandForMarket(market){
  const range = inferDemandRange(market.scope, market.key);
  const storageKey = 'covercapy:featuredDemand:' + market.scope + ':' + market.key;
  const now = todayKey();
  let record = null;
  try{
    record = JSON.parse(localStorage.getItem(storageKey) || 'null');
  }catch(_e){
    record = null;
  }

  if(!record || typeof record.currentDemand !== 'number' || !record.lastUpdated){
    const hash = stableHash(storageKey);
    const start = range[0] + (hash % (range[1] - range[0] + 1));
    record = { currentDemand: start, lastUpdated: now };
  }else if(record.lastUpdated !== now){
    const elapsed = daysBetween(record.lastUpdated, now);
    if(elapsed > 0){
      for(let i = 0; i < elapsed; i++){
        const seed = stableHash(storageKey + ':' + record.lastUpdated + ':' + i);
        const pct = 0.003 + ((seed % 10) / 1000); // 0.3% to 1.2%
        const fixed = 1 + (seed % 9);
        const dailyGrowth = Math.max(fixed, Math.round(record.currentDemand * pct));
        record.currentDemand += dailyGrowth;
      }
      record.lastUpdated = now;
    }
  }

  try{
    localStorage.setItem(storageKey, JSON.stringify(record));
  }catch(_e){}
  return record.currentDemand;
}

function demandChipsForMarket(market){
  if(market.scope === 'city' && FEATURED_PREMIUM_MARKETS.has(market.key)) return FEATURED_PREMIUM_CHIPS;
  if(market.scope === 'area' && FEATURED_FAMILY_AREAS.has(market.key)) return FEATURED_FAMILY_CHIPS;
  if(activeArea && FEATURED_FAMILY_AREAS.has(activeArea)) return FEATURED_FAMILY_CHIPS;
  return FEATURED_DEFAULT_CHIPS;
}

function updateFeaturedDemand(){
  const countEl = document.getElementById('feat-demand-count');
  const contextEl = document.getElementById('feat-demand-context');
  const chipsEl = document.getElementById('feat-demand-chips');
  if(!countEl || !contextEl || !chipsEl) return;

  const market = currentDemandMarket();
  const demand = storedDemandForMarket(market);
  countEl.textContent = demand.toLocaleString();
  contextEl.textContent = market.context;
  chipsEl.innerHTML = demandChipsForMarket(market)
    .map(chip => '<span class="feat-demand-chip">' + chip + '</span>')
    .join('');
}

function renderAwaiting(){
  const r = REGIONS[activeRegion];
  if(!r) return;
  const numEl = document.getElementById('find-awaiting-num');
  const regionEl = document.getElementById('find-awaiting-region');
  if(numEl) numEl.innerHTML = '<em>~</em>' + r.awaiting;
  if(regionEl) regionEl.textContent = r.name;
}

function renderFeatured(){
  const featuredEl = document.getElementById('find-featured');
  if(!featuredEl) return;

  const area = AREAS[activeArea];
  const areaName = (area && area.name) || 'this area';
  const f = AREA_FEATURED[activeArea];

  if(f){
    // ── FILLED state: v224 prestige effects — same as feat-city-hero ──
    const tier = f.tier || 'verified';
    const tierLabel = { 'platinum-elite':'Platinum Elite', 'capy-accredited':'Capy Accredited', 'verified':'Verified' }[tier];
    const tierIcon  = { 'platinum-elite':'💎', 'capy-accredited':'🦫', 'verified':'✓' }[tier];

    // Same bloom + shimmer + sweep as feat-city-hero on ALL tiers
    const bgEffects = `<span class="feat-city-bloom" aria-hidden="true"></span>
      <span class="feat-city-shimmer" aria-hidden="true"></span>
      <span class="feat-city-sweep" aria-hidden="true"></span>`;

    // Same orbiting sparks as feat-city-medal on platinum + capy-accredited
    const hasSparks = (tier === 'platinum-elite' || tier === 'capy-accredited');
    const sparksHtml = hasSparks
      ? `<span class="feat-city-spark feat-city-spark-1" aria-hidden="true"></span><span class="feat-city-spark feat-city-spark-2" aria-hidden="true"></span><span class="feat-city-spark feat-city-spark-3" aria-hidden="true"></span><span class="feat-city-spark feat-city-spark-4" aria-hidden="true"></span><span class="feat-city-spark feat-city-spark-5" aria-hidden="true"></span><span class="feat-city-spark feat-city-spark-6" aria-hidden="true"></span>`
      : '';

    const avatarGlow = (tier !== 'verified')
      ? `<span class="ff-avatar-glow" aria-hidden="true"></span>`
      : '';

    featuredEl.setAttribute('data-state', 'filled');
    featuredEl.setAttribute('data-tier', tier);
    featuredEl.setAttribute('href', f.href || '/dentists/featured');
    featuredEl.setAttribute('onclick', "event.stopPropagation();return false;");

    featuredEl.innerHTML = `
      ${bgEffects}
      <div class="ff-avatar" data-tier="${tier}">
        ${avatarGlow}
        <span class="ff-avatar-shine" aria-hidden="true"></span>
        <span class="ff-avatar-icon">${f.icon || '🦷'}</span>
        ${sparksHtml}
      </div>
      <div class="ff-info">
        <span class="ff-tier-badge ${tier}">${tierIcon} ${tierLabel}</span>
        <a class="ff-name" href="${f.href || '/dentists/featured'}" onclick="event.stopPropagation();megaGo('featured-dentist');return false;">${f.name}</a>
        <div class="ff-meta">
          <span>📍 ${f.loc}</span>
          <span class="ff-meta-dot"></span>
          <span>⭐ ${f.rating} <span class="ff-reviews">(${(f.reviews || 0).toLocaleString()} reviews)</span></span>
        </div>
      </div>
      <div class="ff-actions">
        <button class="ff-btn-book" onclick="event.stopPropagation();megaGo('book-appointment');">Book Appointment</button>
        <button class="ff-btn-call" onclick="event.stopPropagation();megaGo('book-featured');">Call Office</button>
      </div>
    `;
    return;
  }

  // ── EMPTY state: open featured spot CTA ──
  featuredEl.setAttribute('data-state', 'empty');
  featuredEl.setAttribute('data-tier', 'empty');
  featuredEl.setAttribute('href', '/get-featured/capy-accredited');
  featuredEl.setAttribute('onclick', "event.stopPropagation();megaGo('accreditation');return false;");
  featuredEl.innerHTML = `
    <div class="ff-avatar" data-tier="verified">
      <span class="ff-avatar-shine" aria-hidden="true"></span>
      <span class="ff-avatar-icon">✨</span>
    </div>
    <div class="ff-info">
      <span class="ff-tier-badge empty">Featured Spot · Available</span>
      <div class="ff-name-plain">Your practice could be here.</div>
      <div class="ff-meta">Become the featured PPO dentist in ${areaName}</div>
    </div>
    <div class="ff-actions">
      <button class="ff-btn-book" onclick="event.stopPropagation();megaGo('accreditation');">Apply Now</button>
      <button class="ff-btn-call" onclick="event.stopPropagation();megaGo('city-featured');">See City Featured</button>
    </div>
  `;
}

/* ── CASCADE ── */
function selectRegion(key){
  if(!REGIONS[key]) return;
  closestMode = 'area';
  selectedZipCity = null;
  activeRegion = key;
  // Default to the first location in this region
  activeLocation = REGIONS[key].locations[0];
  // Default to the first area in this location
  const firstArea = Object.keys(AREAS).find(aKey => AREAS[aKey].loc === activeLocation);
  if(firstArea) activeArea = firstArea;
  const firstCity = activeArea && AREAS[activeArea] && AREAS[activeArea].cities && AREAS[activeArea].cities[0];
  if(firstCity) activeCity = firstCity;
  renderRegions();
  renderLocations();
  renderAreas();
  renderCities();
  renderClosest();
  renderAwaiting();
  renderFeatured();
  updateFeaturedDemand();
  renderStepRail(0);
  toast('Region', REGIONS[key].name);
}

function selectLocation(key){
  if(!LOCATIONS[key]) return;
  closestMode = 'area';
  selectedZipCity = null;
  activeLocation = key;
  // Default to the first area in this location
  const firstArea = Object.keys(AREAS).find(aKey => AREAS[aKey].loc === key);
  if(firstArea) activeArea = firstArea;
  const firstCity = activeArea && AREAS[activeArea] && AREAS[activeArea].cities && AREAS[activeArea].cities[0];
  if(firstCity) activeCity = firstCity;
  renderLocations();
  renderAreas();
  renderCities();
  renderClosest();
  renderFeatured();
  updateFeaturedDemand();
  renderStepRail(1);
  toast('Location', LOCATIONS[key].name);
}

function selectArea(key){
  if(!AREAS[key]) return;
  closestMode = 'area';
  selectedZipCity = null;
  activeArea = key;
  const firstCity = AREAS[key].cities && AREAS[key].cities[0];
  if(firstCity) activeCity = firstCity;
  renderAreas();
  renderCities();
  renderClosest();
  renderFeatured();
  updateFeaturedDemand();
  renderStepRail(2);
  toast('Area', AREAS[key].name);
}

function selectCity(slug, name){
  activeCity = slug;
  const c = CITIES[slug];
  if(c) activeZipCluster = (c.zip || '').split('·')[0].trim();
  renderCities();
  updateFeaturedDemand();
  renderStepRail(3);
  toast('City', name);
}

function findClosestDentists(){
  const area = AREAS[activeArea];
  const city = CITIES[activeCity];
  let label;
  if(closestMode === 'zip' && selectedZipCity){
    label = selectedZipCity.name;
  } else if(closestMode === 'city' && city){
    label = city.name;
  } else {
    label = area ? area.name : 'nearby';
  }
  renderStepRail(4);  // Step 5 = Find (zero-indexed at 4)
  toast('Find Dentists', label);
  closeNav();
}

/* ════════════════════════════════════════════════════════════════
   TOAST — visual feedback for every click
   ════════════════════════════════════════════════════════════════ */
let toastEl = null;
let toastTimer = null;
function toast(label, route){
  if(!toastEl){
    toastEl = document.createElement('div');
    toastEl.className = 'cc-toast';
    toastEl.innerHTML = `
      <span class="cc-toast-arrow">→</span>
      <span><span class="cc-toast-label"></span><span class="cc-toast-route"></span></span>
      <button class="cc-toast-close" aria-label="Dismiss">×</button>
    `;
    document.body.appendChild(toastEl);
    toastEl.querySelector('.cc-toast-close').addEventListener('click', () => {
      toastEl.classList.remove('show');
    });
  }
  toastEl.querySelector('.cc-toast-label').textContent = label + ' · ';
  toastEl.querySelector('.cc-toast-route').textContent = route;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2600);
}

function closeNav(){
  document.querySelectorAll('.cc-link.is-open').forEach(l => l.classList.remove('is-open'));
}

/* ════════════════════════════════════════════════════════════════
   v207 ROUTING TABLE — real, future-ready production hrefs.
   Replaces the v206 toast-only demo: every <a> already has a real
   href attribute, and the toast reflects exactly where the link
   would navigate in production.
   ════════════════════════════════════════════════════════════════ */
const MEGA_ROUTES = {
  // PPO Plans
  'match':           { label:'Smart Match',                 href:'/ppo-plans/smart-match' },
  'compare':         { label:'Compare Plans',               href:'/ppo-plans/compare' },
  'ppo-guide':       { label:'How PPO Works',               href:'/ppo-plans/how-it-works' },
  'cheapest-plans':  { label:'Cheapest Plans',              href:'/ppo-plans/cheapest' },
  'plans':           { label:'Coverage',                    href:'/ppo-plans' },
  'need-implants':   { label:'Implant Planning',            href:'/ppo-plans/implant-planning' },
  'need-crowns':     { label:'Crowns & Root Canals',        href:'/ppo-plans/crowns-root-canals' },
  'need-invisalign': { label:'Invisalign',                  href:'/ppo-plans/invisalign' },
  'need-emergency':  { label:'Emergency Dental',            href:'/ppo-plans/emergency-dental' },
  'need-preventive': { label:'Cleaning & Preventive',       href:'/ppo-plans/cleaning-preventive' },
  'need-veneers':    { label:'Veneers & Cosmetic',          href:'/ppo-plans/veneers-cosmetic' },
  'plan-uhc':        { label:'UHC Primary PPO',             href:'/ppo-plans/uhc-primary-ppo' },
  'plan-aetna':      { label:'Aetna Direct',                href:'/ppo-plans/aetna-direct' },
  'plan-ameritas':   { label:'Ameritas PrimeStar',          href:'/ppo-plans/ameritas-primestar' },
  'plan-guardian':   { label:'Guardian Premier',            href:'/ppo-plans/guardian-premier' },
  'plan-moo':        { label:'Mutual Preferred',            href:'/ppo-plans/mutual-of-omaha' },
  'plan-humana':     { label:'Humana',                      href:'/ppo-plans/humana' },
  'plan-cheapest':   { label:'Cheapest PPO',                href:'/ppo-plans/cheapest' },

  // Cost Calculator
  'calc':            { label:'Estimates',                   href:'/cost-calculator' },
  'cost-implant':    { label:'Implant Cost',                href:'/cost-calculator/implant' },
  'cost-crown':      { label:'Crown Cost',                  href:'/cost-calculator/crown' },
  'cost-invisalign': { label:'Invisalign Cost',             href:'/cost-calculator/invisalign' },
  'cost-emergency':  { label:'Emergency Cost',              href:'/cost-calculator/emergency' },
  'smart-timing':    { label:'Smart Timing Strategy',       href:'/guides/smart-timing-strategy' },
  'cost-guide':      { label:'Full Cost Guide',             href:'/guides/full-cost-guide' },

  // Find Dentist
  'directory':       { label:'Dentists',                    href:'/dentists' },
  'featured-dentist':{ label:'Featured Dentist',            href:'/dentists/featured' },
  'book-featured':   { label:'View Featured Profile',       href:'/dentists/featured' },
  'book-appointment':{ label:'Book Featured Appointment',   href:'/dentists/featured/book' },

  // Patient Rewards (v216 economy)
  'rewards':           { label:'Capy Crowns',                                 href:'/rewards' },
  'earn-create':       { label:'Earn · Create Account',                       href:'/rewards/earn/create-account' },
  'earn-activate':     { label:'Earn · Activate a PPO Plan',                  href:'/rewards/earn/activate-ppo' },
  'earn-book':         { label:'Earn · Book a PPO Dentist',                   href:'/rewards/earn/book-ppo-dentist' },
  'earn-refer':        { label:'Earn · Refer Friends & Family',               href:'/rewards/earn/refer-friends' },
  'redeem-whitening':  { label:'Redeem · In-Office Whitening',                href:'/rewards/redeem/in-office-whitening' },
  'redeem-invisalign': { label:'Redeem · Invisalign at Platinum Elite',       href:'/rewards/redeem/invisalign-platinum' },
  'redeem-tmj':        { label:'Redeem · Botox · TMJ',                        href:'/rewards/redeem/tmj-botox' },
  'refer':             { label:'Refer a Friend',                              href:'/rewards/refer-a-friend' },

  // Get Featured — for dentists
  'claim-profile':   { label:'Claim Free Profile',          href:'/dentist-portal/claim-profile' },
  'city-featured':   { label:'City Featured (paid)',        href:'/get-featured/city-featured' },
  'accreditation':   { label:'Capy Accredited',             href:'/get-featured/capy-accredited' },
  'platinum-elite':  { label:'Platinum Elite',              href:'/get-featured/platinum-elite' },
  'portal':          { label:'Dentist Portal',              href:'/dentist-portal' },

  // Shop
  'shop':            { label:'Shop',                        href:'/shop' },
  'shop-brushes':    { label:'Electric Toothbrushes',       href:'/shop/electric-toothbrushes' },
  'shop-whitening':  { label:'Whitening',                   href:'/shop/whitening' },
  'shop-gums':       { label:'Gum Health',                  href:'/shop/gum-health' },
  'shop-implants':   { label:'Crown & Implant Care',        href:'/shop/crown-implant-care' },
  'shop-ortho':      { label:'Invisalign & Braces',         href:'/shop/invisalign-braces' },
  'shop-sensitive':  { label:'Sensitive & Enamel',          href:'/shop/sensitive-enamel' },
  'shop-grinding':   { label:'Grinding & TMJ',              href:'/shop/grinding-tmj' },
  'shop-kids':       { label:'Kids & Family',               href:'/shop/kids-family' },

  // About + account
  'home':            { label:'CoverCapy Home',              href:'/' },
  'signin':          { label:'Sign In',                     href:'/sign-in' },
  'join':            { label:'Join Free',                   href:'/join' },
  'how-it-works':    { label:'How It Works',                href:'/about/how-it-works' },
  'why-free':        { label:'Why It’s Free',               href:'/about/why-its-free' },
  'founder':         { label:'Meet the Team',               href:'/about/team' },
  'win-win-model':   { label:'The Win-Win Model',           href:'/about/win-win-model' },
  'three-paths':     { label:'3 Paths to a Dentist',        href:'/about/three-paths-to-a-dentist' },
  'whywin':          { label:'What Makes Us Different',     href:'/about/what-makes-us-different' },
  'faq':             { label:'FAQ',                         href:'/about/faq' }
};

function megaGo(slug){
  const r = MEGA_ROUTES[slug] || { label: slug, href: '/' + slug };
  toast('Route', r.label);
  closeNav();
  // In production: window.location.assign(r.href);
}
function gotoTab(slug){ megaGo(slug); }
function goHome(){ megaGo('home'); }
function openPortalModal(){ toast('Modal', 'Dentist Portal'); closeNav(); }
function openSignupModal(){ toast('Modal', 'Join Free'); closeNav(); }

function rmgFindByZip(){
  const inputEl = document.getElementById('rmg-zip-input');
  const z = inputEl ? inputEl.value : '';
  const clean = (z || '').replace(/\D/g, '').slice(0, 5);
  if(clean.length !== 5){
    toast('ZIP Search', 'enter a 5-digit ZIP');
    return;
  }
  activeZipCluster = clean;

  // v211 — what real cities live at this ZIP? (Indexed + non-indexed)
  const recognized = findCitiesAtZip(clean);
  // Closest indexed city by numeric proximity (v208 logic).
  const best = findClosestByZip(clean);

  // Cascade area context from the closest indexed proximity result.
  // This ensures the cascade lands on a sensible metro even when the
  // recognized cities themselves aren't yet PPO-indexed.
  if(best){
    const area = AREAS[best.areaKey];
    if(area){
      activeArea = best.areaKey;
      activeLocation = area.loc;
      const newRegion = REGION_ORDER.find(rk => REGIONS[rk].locations.indexOf(area.loc) !== -1);
      if(newRegion) activeRegion = newRegion;
    }
    // If the proximity match is a close indexed city, also set activeCity
    // (used as the "closest indexed" fallback hint in ZIP mode).
    if(best.score < 1000000){
      activeCity = best.cityKey;
    }
  }

  // Decide display mode.
  // - 2+ recognized cities at this ZIP → ZIP MODE (pills)
  // - 1 recognized indexed city OR proximity score < 1M → CITY MODE
  // - Otherwise → AREA MODE
  let mode;
  if(recognized.length >= 2){
    mode = 'zip';
    // Default-select the first recognized city (typically the most populated).
    selectedZipCity = recognized[0];
    // If the default pick is indexed, surface it as activeCity too.
    if(recognized[0].indexed){
      activeCity = recognized[0].slug;
    }
  } else if(recognized.length === 1){
    // Single recognized city. If indexed, City mode with that city.
    // If non-indexed, ZIP mode with a single pill (still selectable).
    if(recognized[0].indexed){
      mode = 'city';
      activeCity = recognized[0].slug;
      selectedZipCity = recognized[0];
    } else {
      mode = 'zip';
      selectedZipCity = recognized[0];
    }
  } else if(best && best.score < 1000000){
    mode = 'city';
    selectedZipCity = null;
  } else if(best){
    mode = 'area';
    selectedZipCity = null;
  } else {
    toast('ZIP ' + clean, 'no PPO dentists indexed nearby');
    return;
  }

  // Repaint the whole cascade.
  renderRegions();
  renderLocations();
  renderAreas();
  renderCities();
  renderAwaiting();
  renderFeatured();
  updateFeaturedDemand();
  renderClosest(mode);
  renderStepRail(mode === 'area' ? 2 : 3);

  // Toast: just what got recognized, no URL trail.
  let label;
  if(mode === 'zip'){
    label = selectedZipCity.name
            + (recognized.length > 1 ? ' (' + recognized.length + ' cities)' : '');
  } else if(mode === 'city'){
    const c = CITIES[activeCity];
    label = c ? c.name : activeCity;
  } else {
    const a = AREAS[activeArea];
    label = a ? a.name : activeArea;
  }
  toast('ZIP ' + clean, label);
}
function rmgGoArea(slug, name){
  toast('Area', name || slug);
  closeNav();
}

/* ════════════════════════════════════════════════════════════════
   CALC TABS · TREATMENT SELECTOR · CROWN PROGRESS · ACCORDION
   ════════════════════════════════════════════════════════════════ */

// CALC TABS
function switchCalcTab(tab, btn){
  document.querySelectorAll('.calc-tab').forEach(t => t.classList.remove('is-active'));
  document.querySelectorAll('.calc-tab-panel').forEach(p => p.classList.remove('is-active'));
  if(btn) btn.classList.add('is-active');
  const panel = document.getElementById('calc-panel-' + tab);
  if(panel) panel.classList.add('is-active');
}

// TREATMENT SELECTOR
function selectTreatment(el){
  document.querySelectorAll('.calc-treat').forEach(t => {
    t.classList.remove('is-active');
    t.style.borderColor = '';
    t.style.background = '';
  });
  el.classList.add('is-active');
  el.style.borderColor = 'var(--g)';
  el.style.background = 'var(--gll)';
  const retail = parseInt(el.dataset.retail);
  const ppo    = parseInt(el.dataset.ppo);
  const save   = parseInt(el.dataset.save);
  const pct    = Math.round((ppo / retail) * 100);
  const fmt = n => '$' + n.toLocaleString();
  const retailEl  = document.getElementById('calc-retail');
  const ppoEl     = document.getElementById('calc-ppo');
  const saveEl    = document.getElementById('calc-save');
  const barEl     = document.getElementById('calc-bar');
  if(retailEl) retailEl.textContent = fmt(retail);
  if(ppoEl)    ppoEl.textContent    = ppo === 0 ? 'Free (covered)' : 'from ' + fmt(ppo);
  if(saveEl)   saveEl.textContent   = fmt(save);
  if(barEl)    barEl.style.width    = Math.max(5, pct) + '%';
}

// CROWN PROGRESS
function updateCrownProgress(crowns){
  const total = 2000;
  const pct   = Math.min(100, Math.round((crowns / total) * 100));
  const fill   = document.getElementById('crown-progress-fill');
  const marker = document.getElementById('crown-progress-marker');
  const balloon= document.getElementById('crown-progress-balloon');
  const balD   = document.getElementById('crown-bal-display');
  const needD  = document.getElementById('crown-need-display');
  if(fill)   fill.style.width  = pct + '%';
  if(marker) marker.style.left = Math.min(94, pct) + '%';
  if(balloon) balloon.textContent = crowns.toLocaleString() + ' 👑';
  if(balD)   balD.textContent  = crowns.toLocaleString();
  if(needD)  needD.textContent = Math.max(0, total - crowns).toLocaleString();
}

// CROWN ACCORDION TOGGLE
function toggleCrownAcc(which){
  const body    = document.getElementById('crown-' + which + '-body');
  const chevron = document.getElementById('crown-' + which + '-chevron');
  const toggle  = document.getElementById('crown-' + which + '-toggle');
  if(!body) return;
  const isOpen = body.classList.contains('is-open');
  body.classList.toggle('is-open', !isOpen);
  if(chevron) chevron.textContent = isOpen ? '▾' : '▴';
  if(toggle)  toggle.setAttribute('aria-expanded', String(!isOpen));
}


/* ════════════════════════════════════════════════════════════════
   DENTIST ZIP SEARCH (Membership dropdown claim form)
   ════════════════════════════════════════════════════════════════ */
// DENTIST ZIP SEARCH (claim profile lookup)
function dentZipKey(ev){
  const input = ev.target;
  input.value = input.value.replace(/\D/g, '');
  if(input.value.length === 5){
    dentZipSearch(ev);
  }
}
function dentZipSearch(ev){
  if(ev && ev.preventDefault) ev.preventDefault();
  const input = document.getElementById('dent-zip-input');
  const meta  = document.getElementById('dent-zip-meta');
  if(!input || !meta) return;
  const zip = (input.value || '').replace(/\D/g,'');
  if(zip.length !== 5){
    meta.textContent = 'Enter a 5-digit ZIP to search';
    meta.classList.remove('is-found');
    return;
  }
  meta.textContent = 'Searching our dentist index for ZIP ' + zip + '...';
  meta.classList.remove('is-found');
  setTimeout(function(){
    meta.textContent = "Found 14 practices near " + zip + " · Continue to claim yours";
    meta.classList.add('is-found');
    setTimeout(function(){
      if(typeof openPortalModal === 'function'){
        openPortalModal();
      } else if(typeof toast === 'function'){
        toast('Claim Profile', 'ZIP ' + zip);
      }
    }, 600);
  }, 700);
}

/* ════════════════════════════════════════════════════════════════
   window.initMegaNav() — called by load-nav.js once the nav HTML
   has been injected into #mega-nav-placeholder. Idempotent.
   ════════════════════════════════════════════════════════════════ */
window.initMegaNav = function(){
  if(window.__megaNavInitialized) return;
  var nav = document.getElementById('cc-nav');
  if(!nav) return; // HTML not in DOM yet — caller will retry
  window.__megaNavInitialized = true;

  /* ── 1. Initial paint of the Find Dentist cascade ───────────── */
  try {
    if(typeof renderRegions === 'function')        renderRegions();
    if(typeof renderLocations === 'function')      renderLocations();
    if(typeof renderAreas === 'function')          renderAreas();
    if(typeof renderCities === 'function')         renderCities();
    if(typeof renderClosest === 'function')        renderClosest();
    if(typeof renderAwaiting === 'function')       renderAwaiting();
    if(typeof renderFeatured === 'function')       renderFeatured();
    if(typeof updateFeaturedDemand === 'function') updateFeaturedDemand();
  } catch(e){ console.warn('[megaNav] initial render skipped:', e); }

  /* ── 2. Crown progress + treatment pre-select ───────────────── */
  try {
    if(typeof updateCrownProgress === 'function') updateCrownProgress(300);
    var firstTreat = nav.querySelector('.calc-treat');
    if(firstTreat){
      firstTreat.style.borderColor = 'var(--g)';
      firstTreat.style.background  = 'var(--gll)';
      firstTreat.classList.add('is-active');
    }
  } catch(e){}

  /* ── 3. MEGA NAV BEHAVIOR (production-ready, accessible) ──────
       Verbatim port of the source IIFE, scoped to the freshly
       injected nav. Uses event delegation where possible so
       dynamic content (regions, cities, areas, ZIP pills, etc.)
       keeps working when re-rendered.
     ─────────────────────────────────────────────────────────── */
  var links = nav.querySelectorAll('.cc-link');
  var openTimer = null;
  var closeTimer = null;
  var activeLink = null;

  function closeAll(except){
    links.forEach(function(l){
      if(l !== except){
        l.classList.remove('is-open');
        l.setAttribute('aria-expanded', 'false');
      }
    });
    if(except !== activeLink) activeLink = except || null;
  }

  function openLink(link){
    clearTimeout(closeTimer);
    closeAll(link);
    link.classList.add('is-open');
    link.setAttribute('aria-expanded', 'true');
    activeLink = link;
    positionDropdown(link);
  }

  function scheduleClose(link){
    clearTimeout(closeTimer);
    closeTimer = setTimeout(function(){
      link.classList.remove('is-open');
      link.setAttribute('aria-expanded', 'false');
      if(activeLink === link) activeLink = null;
    }, 180);
  }

  /* Center under link if it fits, else snap to viewport edge */
  function positionDropdown(link){
    var drop = link.querySelector('.cc-dropdown');
    if(!drop) return;
    drop.style.left = '50%';
    drop.style.transform = 'translate(-50%, 0)';
    requestAnimationFrame(function(){
      var linkRect = link.getBoundingClientRect();
      var dropRect = drop.getBoundingClientRect();
      var viewW = window.innerWidth;
      var pad = 16;
      var leftPx = linkRect.left + (linkRect.width / 2) - (dropRect.width / 2);
      if(leftPx < pad) leftPx = pad;
      if(leftPx + dropRect.width > viewW - pad) leftPx = viewW - pad - dropRect.width;
      drop.style.left = leftPx + 'px';
      drop.style.transform = 'translate(0, 0)';
    });
  }

  links.forEach(function(link){
    link.setAttribute('aria-haspopup', 'true');
    link.setAttribute('aria-expanded', 'false');

    // Hover open (desktop)
    link.addEventListener('mouseenter', function(){
      clearTimeout(closeTimer);
      openTimer = setTimeout(function(){ openLink(link); }, 60);
    });
    // Hover-out → debounced close (keeps dropdown open when cursor
    // re-enters the dropdown body, since the dropdown is a child of
    // .cc-link so mouseleave only fires when leaving both)
    link.addEventListener('mouseleave', function(){
      clearTimeout(openTimer);
      scheduleClose(link);
    });
    // Click toggle — but don't intercept clicks on interactive items
    // INSIDE the dropdown (tabs, links, buttons, ZIP input, region pills).
    link.addEventListener('click', function(e){
      if(e.target.closest('.cc-dropdown a, .cc-dropdown button, .cc-dropdown input, .cc-dropdown [data-region], .cc-dropdown [data-location], .cc-dropdown [data-area], .cc-dropdown [data-city]')) return;
      e.preventDefault();
      e.stopPropagation();
      if(link.classList.contains('is-open')){
        link.classList.remove('is-open');
        link.setAttribute('aria-expanded', 'false');
        activeLink = null;
      } else {
        openLink(link);
      }
    });
    // Keyboard accessibility
    link.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        if(link.classList.contains('is-open')){
          link.classList.remove('is-open');
          link.setAttribute('aria-expanded', 'false');
        } else {
          openLink(link);
        }
      }
      if(e.key === 'Escape'){
        link.classList.remove('is-open');
        link.setAttribute('aria-expanded', 'false');
        link.focus();
      }
    });
  });

  // Click outside the nav closes any open dropdown
  document.addEventListener('click', function(e){
    if(!e.target.closest('.cc-link')) closeAll();
  });
  // Global Escape closes everything
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeAll();
  });

  // Reposition active dropdown on resize / scroll
  var rafId;
  function reposition(){ if(activeLink) positionDropdown(activeLink); }
  window.addEventListener('resize', function(){
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(reposition);
  });
  window.addEventListener('scroll', reposition, { passive: true });

  /* ── 4. ZIP input (Find Dentist dropdown) ───────────────────── */
  var zipInput = document.getElementById('rmg-zip-input');
  if(zipInput){
    zipInput.addEventListener('input', function(e){
      e.target.value = e.target.value.replace(/\D/g, '');
      if(e.target.value.length === 5){
        e.stopPropagation();
        if(typeof rmgFindByZip === 'function') rmgFindByZip();
      }
    });
    zipInput.addEventListener('keydown', function(e){
      if(e.key === 'Enter'){
        e.stopPropagation();
        if(typeof rmgFindByZip === 'function') rmgFindByZip();
      }
    });
    zipInput.addEventListener('click', function(e){ e.stopPropagation(); });
  }

  /* ── 5. Crown balance count-up on first rewards hover ───────── */
  (function(){
    var bal = document.getElementById('mega-crown-bal');
    if(!bal) return;
    var target = 300;
    var cur = 0;
    var step = Math.max(1, Math.floor(target / 40));
    var started = false;
    function start(){
      if(started) return;
      started = true;
      var t = setInterval(function(){
        cur = Math.min(cur + step, target);
        bal.textContent = cur.toLocaleString();
        if(cur >= target) clearInterval(t);
      }, 30);
    }
    var rewardsLink = nav.querySelector('[data-link="rewards"]');
    if(rewardsLink) rewardsLink.addEventListener('mouseenter', start, { once: true });
  })();

};  // end window.initMegaNav
