# SKILLS.md: Tire Business Website (Design + Local SEO Playbook)

> Purpose: everything a builder (human or AI) must know to design and build a **static, SEO-first website for a local tire shop**.
> **Tech constraint: pure HTML + CSS + vanilla JavaScript only. No framework, no backend, no forms. All contact happens via WhatsApp / phone links.**
> AI-search visibility (ChatGPT, Google AI Overviews, Perplexity, etc.) is covered in [`geo.md`](./geo.md).
> Primary goal: **rank in the Google Local Pack / top 3 for "tire shop near me" style searches** and turn visitors into calls and bookings.
> Reality check: rankings take time (3-6 months for local terms, 6-12 for competitive ones). We remove every obstacle and stack every advantage. We never promise #1.

---

## 0. How people search for tires (know the customer)

| Intent | Example searches | Page that answers it |
|---|---|---|
| Emergency / urgent | "flat tire repair near me", "tire shop open now", "mobile tire service" | Home, Flat Tire Repair, Emergency |
| Buy | "buy tires [city]", "Michelin tires [city]", "cheap tires near me" | Tires, Brand pages |
| Service | "tire rotation", "wheel alignment [city]", "tire balancing" | Service pages |
| Research | "best tires for rain", "when to replace tires" | Blog / guides |
| Local / brand | "[Shop name] reviews", "[Shop name] hours" | Home, Contact, Reviews |

Most tire searches are **local and urgent**. Phone number, hours, and "open now" must be visible within 1 second on mobile.

---

## 1. Pages required (static site)

| # | Page | URL | Primary keyword (example) |
|---|---|---|---|
| 1 | Home | `/` | tire shop [city] |
| 2 | Tires (hub) | `/tires/` | buy tires [city] |
| 3 | Tire brands (one per brand) | `/tires/michelin/` ... | Michelin tires [city] |
| 4 | Services (hub) | `/services/` | tire services [city] |
| 5 | Tire installation | `/services/tire-installation/` | tire installation [city] |
| 6 | Tire repair / flat fix | `/services/flat-tire-repair/` | flat tire repair [city] |
| 7 | Wheel alignment | `/services/wheel-alignment/` | wheel alignment [city] |
| 8 | Tire rotation & balancing | `/services/tire-rotation-balancing/` | tire rotation [city] |
| 9 | Wheels / rims (if sold) | `/services/wheels-rims/` | alloy wheels [city] |
| 10 | Mobile / emergency tire service (if offered) | `/services/mobile-tire-service/` | mobile tire service [city] |
| 11 | Location pages (one per area served) | `/locations/[area]/` | tire shop [area] |
| 12 | About | `/about/` | (brand + trust) |
| 13 | Reviews / testimonials | `/reviews/` | [shop] reviews |
| 14 | Contact + map + hours | `/contact/` | tire shop [city] contact |
| 15 | FAQ | `/faq/` | tire FAQs |
| 16 | Blog / guides (hub + posts) | `/blog/` | long-tail informational |
| 17 | Tire size finder / guide | `/tire-size-guide/` | how to read tire size |
| 18 | Offers / coupons | `/offers/` | tire deals [city] |
| 19 | Privacy, Terms | `/privacy/`, `/terms/` | n/a (noindex optional) |
| 20 | Custom 404 | `/404.html` | n/a |

**Rule: one page = one primary keyword = one search intent.** Never two pages for the same keyword (cannibalization).

---

## 2. Design system

### 2.1 Brand feel
Trustworthy, fast, strong, local. Think "reliable mechanic," not "luxury boutique." Bold, high-contrast, uncluttered.

### 2.2 Colors (example tokens, adjust to client logo)
```css
:root {
  --color-primary: #E11D2E;     /* action red: CTAs, highlights */
  --color-dark: #111827;        /* rubber black: headers, footer */
  --color-surface: #F3F4F6;     /* light grey sections */
  --color-white: #FFFFFF;
  --color-accent: #FACC15;      /* yellow: stars, offers, badges */
  --color-text: #1F2937;
  --color-success: #16A34A;     /* "open now" */
}
```
- Text contrast must pass **WCAG AA (4.5:1)**.
- One strong CTA color, used only for actions.

### 2.3 Typography
- Headings: bold sans (Poppins, Montserrat, Barlow Condensed, or system-ui stack).
- Body: Inter / system-ui, 16-18px, line-height 1.6.
- Max 2 font families, max 2-3 weights. Self-host fonts as WOFF2 with `font-display: swap`, preloaded. No render-blocking Google Fonts requests.

### 2.4 Layout rules
- **Mobile-first** (over 70% of local tire traffic is mobile).
- 8px spacing grid, container max-width about 1200px.
- Generous whitespace, one idea per section.
- Tap targets at least 44x44px.

### 2.5 Imagery
- Real photos of the actual shop, team, and work beat stock photos (trust + E-E-A-T).
- Formats: **AVIF/WebP** with JPEG fallback, responsive `srcset`, explicit `width`/`height` (prevents layout shift).
- Descriptive file names: `michelin-tire-installation-hyderabad.webp`.
- Hero image is **never lazy-loaded** (it's the LCP element); everything below the fold is `loading="lazy"`.

---

## 3. UI components checklist

**Global**
- [ ] Sticky header: logo, nav, **click-to-call button** (`tel:`), **"WhatsApp Us"** CTA
- [ ] **Sticky bottom bar on mobile** (WhatsApp / Call / Directions) + floating WhatsApp button on desktop
- [ ] "Open now / Closes at X" status badge (JS enhancement; static hours still in HTML)
- [ ] Breadcrumbs on every inner page
- [ ] Footer with NAP (Name, Address, Phone), hours, service areas, social links, sitemap links

**Home**
- [ ] Hero: H1 with keyword + city, subhead, 2 CTAs (Call, Book/Quote), trust badges
- [ ] Trust strip: years in business, Google rating, brands carried, warranty
- [ ] Services grid (icon + short text + link)
- [ ] Brands carried (logos, linked to brand pages)
- [ ] "Get a Quote on WhatsApp" block: popular tire-size / vehicle chips, each a link that opens WhatsApp with a pre-filled message (no form)
- [ ] Why choose us (3-4 points, specific not generic)
- [ ] Reviews carousel (real Google reviews, with link to profile)
- [ ] Service area list (links to location pages)
- [ ] FAQ accordion (also marked up with schema)
- [ ] Map embed + hours + address
- [ ] Final CTA band

**Service pages**: what's included, pricing or "from $X", process steps, time needed, FAQs, related services, CTA, location mentions.

**Contact flow: WhatsApp only (NO forms, NO backend)**
- Every "Contact us / Get a Quote / Book Now" button is a plain link that opens WhatsApp with a **pre-filled message**. No form fields, no server, no third-party form service.
- Pattern: `https://wa.me/<countrycode><number>?text=<url-encoded message>` (digits only in the number: no `+`, spaces, or dashes).
- Hard-code the `href` in the HTML. It works with JS disabled and is crawlable. JS is only for analytics.
- Use a **different pre-filled message per page/button** so the shop knows what the customer wants.
- Always provide a second path: `tel:` call button for people who prefer calling.

```html
<!-- Generic button -->
<a class="btn btn-primary wa-link"
   href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%20need%20a%20tire%20quote"
   target="_blank" rel="noopener" data-wa="header">
  Chat on WhatsApp
</a>

<!-- Page-specific message (wheel alignment page) -->
<a class="btn btn-primary wa-link"
   href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%20want%20to%20book%20a%20wheel%20alignment"
   target="_blank" rel="noopener" data-wa="alignment-hero">
  Book Alignment on WhatsApp
</a>

<!-- Tire-size quick chips (still just links, no form) -->
<a href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%20need%20a%20quote%20for%20tire%20size%20195%2F65R15"
   target="_blank" rel="noopener" data-wa="size-195-65-15">195/65 R15</a>
```

Optional vanilla JS (`/js/main.js`) for analytics, nothing else required:
```js
// Track WhatsApp and call clicks in GA4 (safe if gtag is missing)
document.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (!a || typeof gtag !== "function") return;
  if (a.matches(".wa-link"))   gtag("event", "whatsapp_click", { location: a.dataset.wa || "unknown" });
  if (a.href.startsWith("tel:")) gtag("event", "call_click",   { location: a.dataset.wa || "unknown" });
});
```
- Floating WhatsApp button (bottom right on desktop, part of the sticky bar on mobile) on every page.
- Encode messages with `encodeURIComponent()` or manually (`%20` for spaces, `%2F` for `/`).

**Trust elements**: Google reviews, certifications, warranties, brand partner badges, payment methods, real team photos.

**Accessibility**: semantic HTML, visible focus states, alt text, labels on inputs, skip link, keyboard navigable, `prefers-reduced-motion` respected.

---

## 4. SEO strategy (the core)

### 4.1 Keyword research
1. Seed terms: `tire shop`, `tires`, `tire repair`, `wheel alignment`, `tire installation`, `flat tire`, `new tires`, `used tires`, `[brand] tires`, `mobile tire service`, `24 hour tire shop`.
2. Add modifiers: **city, neighborhood, "near me", "open now", "cheap", "best", "same day", "emergency"**.
3. Tools: Google Keyword Planner, Ahrefs/SEMrush/Ubersuggest, Google Search Console, Google autosuggest, "People also ask", competitor sites.
4. **Spy on the top 3 local competitors**: their pages, keywords, review counts, backlinks. Beat them in specifics.
5. Build a keyword map (spreadsheet): `keyword | volume | difficulty | intent | assigned URL`.

### 4.2 On-page templates

**Title tag** (50-60 chars, keyword first, brand last):
```
Home:      Tire Shop in [City] | New Tires, Repair & Alignment | [Brand]
Service:   Flat Tire Repair in [City] | Fast, Same-Day | [Brand]
Brand:     Michelin Tires in [City] | Sales & Installation | [Brand]
Location:  Tire Shop in [Area], [City] | [Brand]
```

**Meta description** (140-160 chars, includes benefit + CTA + phone/city):
```
Looking for a tire shop in [City]? [Brand] offers new tires, repair, alignment & same-day service. Call [phone] or get a free quote today.
```

**Heading structure**
- Exactly **one H1** per page containing the primary keyword (+ city).
- H2s for main sections, H3s for sub-points; never skip levels.
- Keyword in the first 100 words, used naturally. Include variations and related terms.

**URLs**: lowercase, hyphens, short, keyword-rich, no parameters, no dates, trailing-slash consistent.

**Internal linking**
- Every page reachable within **3 clicks** of home.
- Home links to all hubs; hubs link to children; children link back to hub and to 2-3 related pages.
- Use descriptive anchors ("wheel alignment in [City]"), not "click here".

**Images**: descriptive alt text (not stuffed), compressed, named properly.

**Content length**: service pages 600-1,200 words of **unique, useful** text. Location pages must be genuinely unique (local landmarks, roads, driving distance, local customer stories), never find-and-replace city names (that's doorway spam and gets penalized).

### 4.3 Local SEO (the biggest lever for "tire shop near me")

Local pack ranking = **Relevance + Distance + Prominence**.

**Google Business Profile (GBP): do this first, it matters more than the website**
- Claim and verify. Primary category: **Tire shop**. Secondary: Auto repair shop, Wheel alignment service, Car repair and maintenance, etc. (only what's true).
- Complete **every** field: hours (+ holiday hours), phone, website, services list with descriptions, products, attributes, opening date, service area.
- Business name = real name only (no keyword stuffing, it's against guidelines).
- Add **25+ real photos** (exterior, interior, team, work, tires) and keep adding monthly.
- Post weekly (offers, tips, new stock). Enable messaging; answer Q&A.
- **Reviews**: ask every happy customer (QR code at counter, SMS/WhatsApp link). Aim for steady growth, reply to **every** review within 48 hours. Review quantity, recency, rating, and keywords in reviews all help.
- Use the website URL with UTM: `?utm_source=gbp&utm_medium=organic`.

**NAP consistency**: Name, Address, Phone **identical** everywhere (website, GBP, directories, social). Use one format.

**Citations** (directories): Google, Bing Places, Apple Business Connect, Yelp, Facebook, Yellow Pages, Better Business Bureau, Foursquare, plus industry (Tire Review, Cars.com, local chamber of commerce, local country directories such as Justdial / Sulekha / IndiaMART where relevant).

**Embed Google Map** on the Contact page and each location page. Include the real address as text (not only in an image).

**Local content**: "Tire shop serving [Area1], [Area2], [Area3]", local road conditions, seasonal tire advice for the region, local events/sponsorships.

### 4.4 Technical SEO (static site advantages: use them)

**Performance (Core Web Vitals targets, mobile)**
| Metric | Target |
|---|---|
| LCP | under 2.5 s |
| INP | under 200 ms |
| CLS | under 0.1 |
| Lighthouse (mobile) | 90+ on all four categories |

How: static HTML, inline critical CSS, minimal/deferred JS, no heavy frameworks/sliders, AVIF/WebP, preloaded hero + fonts, Brotli/gzip, long cache headers for assets, CDN (Cloudflare / Netlify / Vercel / GitHub Pages + Cloudflare), HTTP/2 or HTTP/3.

**Crawl and index**
- `robots.txt` (allow all, link sitemap).
- Hand-written `sitemap.xml` with real `<lastmod>` dates (update when pages change), submitted to Google Search Console and Bing Webmaster Tools.
- `<link rel="canonical" href="https://www.example.com/page/">` on **every** page (self-referencing).
- Pick **one** version (https + www or non-www); 301 all others to it. Force HTTPS + HSTS.
- Custom 404 page that links to key pages. No soft 404s. No redirect chains. No orphan pages.

**Essential `<head>` template**
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Tire Shop in [City] | New Tires, Repair & Alignment | [Brand]</title>
  <meta name="description" content="Looking for a tire shop in [City]? ... Call [phone] today.">
  <link rel="canonical" href="https://www.example.com/">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="theme-color" content="#E11D2E">

  <!-- Open Graph / Twitter -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Tire Shop in [City] | [Brand]">
  <meta property="og:description" content="New tires, repair, alignment and same-day service in [City].">
  <meta property="og:url" content="https://www.example.com/">
  <meta property="og:image" content="https://www.example.com/img/og-cover.jpg">
  <meta name="twitter:card" content="summary_large_image">

  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" as="image" href="/img/hero.avif" fetchpriority="high">
  <style>/* critical CSS inline */</style>
  <link rel="stylesheet" href="/css/main.css" media="print" onload="this.media='all'">
</head>
```

### 4.5 Structured data (JSON-LD): the edge

Use `TireShop` (schema.org subtype of Store); add `AutoRepair` only if applicable.

**Home / Contact: LocalBusiness**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TireShop",
  "@id": "https://www.example.com/#business",
  "name": "[Brand Name]",
  "url": "https://www.example.com/",
  "image": "https://www.example.com/img/storefront.jpg",
  "logo": "https://www.example.com/img/logo.png",
  "telephone": "+91-XXXXXXXXXX",
  "email": "info@example.com",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Street]",
    "addressLocality": "[City]",
    "addressRegion": "[State]",
    "postalCode": "[ZIP]",
    "addressCountry": "[IN/US/...]"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 0.0, "longitude": 0.0 },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    "opens": "09:00", "closes": "19:00"
  }],
  "areaServed": ["[Area 1]", "[Area 2]", "[City]"],
  "sameAs": [
    "https://www.google.com/maps?cid=XXXX",
    "https://www.facebook.com/[page]",
    "https://www.instagram.com/[page]"
  ],
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "120" }
}
</script>
```
> Only include `aggregateRating` if the reviews are real, visible on the page, and you can stand behind them. Fake or invisible markup risks a manual penalty.

**Other schema to add**
- `BreadcrumbList` on all inner pages
- `Service` on each service page
- `FAQPage` on pages with visible FAQs
- `Product` / `Offer` on tire product pages (if prices shown)
- `Article` + `author` on blog posts
- `WebSite` on home
- Validate with Google Rich Results Test and Schema.org validator.

### 4.6 Content strategy (topic clusters)

**Pillar to cluster**
- Pillar: `/blog/complete-guide-to-buying-tires/`
  - How to read a tire size
  - When to replace tires (tread depth / penny test)
  - Summer vs all-season vs winter tires
  - Tire pressure guide
  - How often to rotate tires
  - Signs you need a wheel alignment
  - Tire repair vs replace
  - Best tires for [local climate / roads]
  - Tire brand comparisons (Michelin vs Bridgestone, etc.)
  - Tire price guide for [City]
- Publish **2-4 posts/month**, each targeting a long-tail keyword, answering the question fully in the first paragraph (wins featured snippets), with images, internal links, and a CTA.
- Add FAQ blocks (answer in 40-60 words, direct) to target "People also ask" and voice search ("tire shop open near me").

**E-E-A-T signals**: real author bios (mechanics/owner), years of experience, certifications, original photos, real customer stories, clear contact info, transparent pricing and warranty policy.

### 4.7 Off-page SEO (backlinks)
- Local sponsorships (sports teams, events, schools) which give a link and a mention.
- Local chamber of commerce, business associations, supplier/manufacturer "dealer locator" listings (brand dealer pages = high-value links).
- Local press / news / blogs, "Best of [City]" lists.
- Partnerships: car dealers, taxi/fleet companies, driving schools, car clubs.
- Linkable assets: tire size calculator, tire price guide, seasonal checklist.
- Never buy links or use PBNs.

### 4.8 Tracking and measurement
- **Google Search Console** (verify, submit sitemap, monitor Coverage, Performance, Core Web Vitals).
- **Bing Webmaster Tools**.
- **GA4**: events for `tel:` clicks, **WhatsApp clicks**, direction clicks (these are your real conversions; see the JS snippet in Section 3).
- Call tracking (optional): use a dynamic number for the website only; keep the main NAP number in the static HTML.
- Track weekly: local pack position (BrightLocal / Local Falcon / manual), GBP calls/direction requests, organic clicks, top queries.

---

## 5. Conversion rules (ranking without leads is worthless)
- WhatsApp + phone buttons visible in the header, hero, footer, and sticky mobile bar.
- Every page ends with a CTA.
- Show **real prices or "from" prices** where possible (builds trust, reduces bounce).
- Emphasize: same-day service, warranty, free tire check, financing, free fitting offers.
- Social proof near every CTA.
- Make "Get Directions" a one-tap action.

---

## 6. Tech stack: pure HTML, CSS, JavaScript

**Rules**
- Hand-written **HTML5 + CSS3 + vanilla JS**. No React/Vue/Angular, no jQuery, no Tailwind CDN, no build step required.
- No backend, no database, no forms, no third-party form services.
- JS is optional enhancement only (mobile menu, "open now" badge, FAQ accordion, analytics events). **The site must work fully with JS disabled.**
- All content lives in real HTML (crawlable). Never inject core content via JS.

**Folder structure**
```
/
├── index.html
├── tires/index.html
├── tires/michelin/index.html
├── services/index.html
├── services/flat-tire-repair/index.html
├── locations/[area]/index.html
├── blog/index.html
├── blog/[post-slug]/index.html
├── contact/index.html        # map, hours, WhatsApp + call buttons (no form)
├── about/  reviews/  faq/  offers/  tire-size-guide/
├── 404.html
├── robots.txt
├── sitemap.xml               # hand-written, update on every new page
├── css/main.css              # one file, minified for production
├── js/main.js                # small, deferred (<script src defer>)
├── img/                      # AVIF/WebP + fallback
└── fonts/                    # self-hosted WOFF2
```
Using `folder/index.html` gives clean URLs (`/services/flat-tire-repair/`) with no `.html` extension.

**Repetition without a framework**
- Header/footer must be in the HTML of every page (do **not** load them with JS `fetch`, since crawlers and no-JS users would miss them). Copy-paste them, or generate with a tiny optional Node/Python script, or VS Code find-and-replace across files.
- Keep a master `NAP.txt` (name, address, phone, WhatsApp, hours). When it changes, find-and-replace across all files.

**Hosting (all free, HTTPS + CDN):** Cloudflare Pages, Netlify, GitHub Pages, Vercel (static).

**Tools (optional, not part of the site)**: Squoosh for AVIF/WebP, an HTML minifier, Lighthouse, W3C validator.

---

## 7. Common mistakes (avoid)
1. Keyword stuffing in titles, GBP name, or body.
2. Duplicate or doorway location pages (city-name swaps).
3. Huge unoptimized hero images / auto-play sliders.
4. Phone number as an image (not clickable, not crawlable).
5. NAP mismatches across directories.
6. Missing canonical, sitemap, or Search Console.
7. Blocking CSS/JS in robots.txt.
8. Fake reviews or fake schema ratings.
9. Ignoring mobile.
10. Launching without 301 redirects when replacing an old site.
11. Not asking for reviews.
12. Thin pages (under 300 words with no unique value).
13. Adding contact forms, a backend, or heavy JS libraries (this project is WhatsApp + phone only).
14. WhatsApp link with `+`, spaces, or dashes in the number (it must be digits only, with country code).

---

## 8. Pre-launch SEO checklist

**Content and on-page**
- [ ] Keyword map complete; 1 keyword per page
- [ ] Unique title and meta description on every page
- [ ] One H1 per page; logical H2/H3
- [ ] Alt text on all images
- [ ] Internal links added; no orphan pages
- [ ] NAP identical everywhere

**Technical**
- [ ] HTTPS, single canonical domain, 301s in place
- [ ] Canonical tags on all pages
- [ ] `robots.txt` and `sitemap.xml` live
- [ ] Custom 404
- [ ] Lighthouse mobile 90+; CWV passing
- [ ] No broken links (check with Screaming Frog / Broken Link Checker)
- [ ] Mobile usability tested on real devices

**Schema and social**
- [ ] LocalBusiness/TireShop, Breadcrumb, FAQ, Service schema validated
- [ ] Open Graph + Twitter tags; OG image 1200x630

**Local and tracking**
- [ ] GBP verified and fully completed
- [ ] Bing Places, Apple Business, Facebook, Yelp, top 10 directories created
- [ ] Search Console + Bing Webmaster verified; sitemap submitted
- [ ] GA4 conversion events set (WhatsApp clicks, calls, directions)
- [ ] Review-request link/QR ready

## 9. 90-day roadmap

| Period | Focus |
|---|---|
| Week 0-1 | Keyword research, competitor audit, GBP setup, NAP decided |
| Week 2-4 | Build and launch site, schema, Search Console, citations (20+), first reviews push |
| Month 2 | 6-8 blog posts, location pages, backlink outreach (local), GBP posts weekly, photos |
| Month 3 | Review rankings and queries, improve pages with impressions but low CTR (titles/meta), more content, more reviews |
| Ongoing | Monthly content, reviews, citations, link building, performance and ranking reports |

**Realistic expectation**: easy local terms in 1-3 months, "tire shop [city]" top 3 in about 3-6 months, with strong reviews and GBP, longer in a crowded market.

---

## 10. Quick cheat sheet

```
RANK = Relevance + Distance + Prominence
Local pack wins  ->  GBP (categories, reviews, photos, posts) + NAP + citations
Organic wins     ->  fast static site + keyword-mapped pages + schema + content + links
Leads            ->  tap-to-call, sticky CTA, real prices, reviews near buttons

Title:   Keyword + City | Benefit | Brand   (<=60 chars)
Meta:    Benefit + CTA + phone              (<=160 chars)
H1:      one per page, keyword + city
LCP <2.5s | INP <200ms | CLS <0.1
Schema:  TireShop, Service, FAQPage, BreadcrumbList, Article
Reviews: ask every customer, reply to every review
```
