# Tire Business Website: SEO-First Static Site

A fast, static, mobile-first website for a local tire shop. **Primary goal: rank in the top 3 of Google (Local Pack + organic) for local tire searches** and convert visitors into calls, directions, and quote requests.

> Companion file: [`skills.md`](./skills.md) is the full design and SEO playbook (keyword strategy, templates, schema, checklists). Read it before building.
> Also read [`geo.md`](./geo.md): the Generative Engine Optimization playbook for getting the shop named and cited by AI assistants (ChatGPT, Google AI Overviews, Gemini, Perplexity, Copilot).

---

## 1. Project Summary

| Item | Detail |
|---|---|
| Client | [Tire Shop Name] |
| Type | Local business, static website |
| Market | [City, State/Country] + nearby areas |
| #1 Goal | Local SEO: top 3 for "tire shop [city]", "tire shop near me", etc. |
| #2 Goal | Leads: WhatsApp chats, phone calls, directions |
| Stack | **Pure HTML + CSS + vanilla JavaScript** (no framework, no backend, no forms) |
| Contact method | **WhatsApp click-to-chat** (pre-filled message) + tap-to-call |
| Hosting | Cloudflare Pages / Netlify / GitHub Pages (HTTPS + CDN) |

**Honest expectation (share with the client):** no one can guarantee #1. Typical timeline: **3-6 months** for local top-3 on "tire shop [city]", longer in competitive markets. Reviews, Google Business Profile, and content consistency decide the pace.

---

## 2. Information to Collect from the Client (Day 1)

- [ ] Business name, exact address, phone, WhatsApp, email
- [ ] Opening hours (and holiday hours)
- [ ] Areas/neighborhoods served
- [ ] Services offered + approximate prices
- [ ] Tire brands carried
- [ ] Mobile/emergency service? 24-hour?
- [ ] Years in business, certifications, warranties
- [ ] Logo, brand colors, real photos (shop, team, work)
- [ ] **WhatsApp number** (digits with country code, e.g. 91XXXXXXXXXX) and the number for calls
- [ ] Existing Google Business Profile, social links, existing website/domain
- [ ] Top 3 competitors
- [ ] Existing customer reviews (and permission to display)

---

## 3. Site Map

```
/                                  Home
/tires/                            Tires hub
  /tires/[brand]/                  Brand pages (Michelin, Bridgestone, ...)
/services/                         Services hub
  /services/tire-installation/
  /services/flat-tire-repair/
  /services/wheel-alignment/
  /services/tire-rotation-balancing/
  /services/wheels-rims/
  /services/mobile-tire-service/
/locations/[area]/                 One unique page per area served
/tire-size-guide/
/offers/
/reviews/
/about/
/faq/
/blog/                             Hub
  /blog/[post-slug]/
/contact/                          Map + hours + WhatsApp/Call buttons (no form)
/privacy/  /terms/
/404.html
/sitemap.xml   /robots.txt
```

---

## 4. Project Structure (plain HTML/CSS/JS)

```
tire-website/
├── index.html                       # Home
├── tires/
│   ├── index.html                   # Tires hub
│   └── michelin/index.html          # one folder per brand
├── services/
│   ├── index.html
│   ├── tire-installation/index.html
│   ├── flat-tire-repair/index.html
│   ├── wheel-alignment/index.html
│   ├── tire-rotation-balancing/index.html
│   └── mobile-tire-service/index.html
├── locations/[area]/index.html      # unique content per area
├── blog/
│   ├── index.html
│   └── [post-slug]/index.html
├── about/index.html
├── reviews/index.html
├── faq/index.html
├── offers/index.html
├── tire-size-guide/index.html
├── contact/index.html               # map, hours, WhatsApp + call buttons
├── 404.html
├── robots.txt
├── sitemap.xml                      # hand-written; update with every new page
├── css/main.css
├── js/main.js                       # optional, deferred, tiny
├── img/                             # AVIF/WebP + JPG fallback, og-cover.jpg
├── fonts/                           # self-hosted WOFF2
├── favicon.svg
├── NAP.txt                          # master Name/Address/Phone/WhatsApp/Hours
├── skills.md
├── geo.md
├── llms.txt                         # AI-readable summary (see geo.md)
├── pricing.md                       # plain price list (see geo.md)
└── README.md
```

**Rules for this stack**
- Folder + `index.html` per page gives clean URLs (`/services/wheel-alignment/`).
- Header, footer, and call bar are **copied into every HTML file** (not loaded via JS) so crawlers and no-JS users see them.
- JS is optional enhancement only: mobile menu, "open now" badge, FAQ accordion, GA4 click events. The site must work with JS disabled.
- **NAP consistency:** keep `NAP.txt` as the master. If it changes, find-and-replace across all files, and update Google Business Profile.

## 5. UI / UX Requirements

**Must-have on every page**
- Sticky header with **tap-to-call** (`<a href="tel:+91XXXXXXXXXX">`) and a **WhatsApp** button
- **Sticky mobile bottom bar:** WhatsApp · Call · Directions (floating WhatsApp button on desktop)
- Breadcrumbs, footer with full NAP + hours + service areas
- One clear CTA at the end of every page

**Home page sections (in order)**
1. Hero: H1 (keyword + city), subhead, WhatsApp and Call buttons, rating badge
2. Trust strip: years, Google rating, brands, warranty
3. Services grid
4. Brands carried
5. "Get a Quote on WhatsApp" block (tire-size chips, each opens WhatsApp with a pre-filled message)
6. Why choose us
7. Reviews
8. Service areas
9. FAQ
10. Map + hours + address
11. Final CTA

### Contact flow: WhatsApp redirect (no forms, no backend)

Every "Contact Us / Get Quote / Book Now" button is a normal link that opens WhatsApp with a ready-made message:

```html
<a class="btn btn-primary wa-link"
   href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%20need%20a%20tire%20quote"
   target="_blank" rel="noopener" data-wa="hero">
  Chat on WhatsApp
</a>
<a class="btn btn-outline" href="tel:+91XXXXXXXXXX" data-wa="hero-call">Call Now</a>
```

- Number format in `wa.me`: **digits only with country code** (no `+`, spaces, dashes).
- Use a **different pre-filled message per page** (alignment page: "I want to book a wheel alignment") so the shop knows the need immediately.
- URL-encode messages: space = `%20`, `/` = `%2F`, `,` = `%2C`.
- `href` is hard-coded in HTML, so it works without JS and is crawlable.
- Optional GA4 tracking in `js/main.js`:
```js
document.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (!a || typeof gtag !== "function") return;
  if (a.matches(".wa-link"))     gtag("event", "whatsapp_click", { location: a.dataset.wa || "unknown" });
  if (a.href.startsWith("tel:")) gtag("event", "call_click",     { location: a.dataset.wa || "unknown" });
});
```

**Design tokens** (adjust to client logo)
```css
--color-primary: #E11D2E;  --color-dark: #111827;
--color-surface: #F3F4F6;  --color-accent: #FACC15;
--color-text: #1F2937;     --color-success: #16A34A;
```
Fonts: one heading font + system/Inter body, self-hosted, `font-display: swap`. Mobile-first, 44px tap targets, WCAG AA contrast.

Full component checklist: see **skills.md → Section 3**.

---

## 6. SEO Implementation Summary

Full details and templates are in **skills.md → Section 4**. The short version:

### Local SEO (biggest lever)
- Claim and fully complete **Google Business Profile** (category: *Tire shop*), 25+ real photos, weekly posts, services listed
- **Review engine:** QR code + WhatsApp/SMS link; reply to every review
- Identical **NAP** everywhere; build 20+ citations (Bing, Apple, Yelp, Facebook, local directories)
- Unique location pages per area served (never copy-paste city swaps)

### On-page
- 1 keyword per page, 1 H1, keyword-led title (≤60 chars), benefit-led meta (≤160)
- Clean URLs, internal links (every page ≤3 clicks from home), image alt text

### Technical
- Static HTML, no heavy JS, AVIF/WebP, preloaded hero + fonts, CDN
- Targets: **LCP < 2.5s · INP < 200ms · CLS < 0.1 · Lighthouse mobile 90+**
- Canonical tags, `sitemap.xml`, `robots.txt`, HTTPS + single canonical domain, custom 404

### Structured data (JSON-LD)
`TireShop` (LocalBusiness), `Service`, `FAQPage`, `BreadcrumbList`, `Article`, `WebSite`. Validate with Google Rich Results Test.

### Content
- Pillar + cluster blog (2-4 posts/month): tire size guide, when to replace tires, tire rotation, alignment signs, brand comparisons, local price guide
- FAQ blocks with short direct answers for "People also ask" and voice search

### Off-page
- Local sponsorships, chamber of commerce, brand dealer-locator listings, local press, partnerships (fleets, driving schools, car clubs). No bought links.

---

## 7. Getting Started

No install, no build tools required.

```bash
# 1. Create the folder structure from Section 4
# 2. Build pages in plain HTML (copy the <head> template from skills.md Section 4.4)
# 3. Preview locally with any static server:
npx serve .              # or: python3 -m http.server 8000
# or use the VS Code "Live Server" extension
```

`robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://www.example.com/sitemap.xml
```

`sitemap.xml` (hand-written; add one `<url>` per page):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.example.com/</loc>
    <lastmod>2026-10-13</lastmod>
  </url>
  <url>
    <loc>https://www.example.com/services/flat-tire-repair/</loc>
    <lastmod>2026-10-13</lastmod>
  </url>
</urlset>
```

---

## 8. Deployment

1. Push to GitHub (or drag-and-drop the folder to Netlify / Cloudflare Pages).
2. Connect to **Cloudflare Pages / Netlify / GitHub Pages**; no build command needed, publish directory = project root.
3. Attach custom domain; force **HTTPS**; choose one canonical host (www or non-www) and 301 the other.
4. Add cache headers (`_headers` file on Netlify/Cloudflare):
```
/img/*
  Cache-Control: public, max-age=31536000, immutable
/fonts/*
  Cache-Control: public, max-age=31536000, immutable
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```
5. If replacing an old site, **301-redirect every old URL** to its new equivalent (`_redirects` file).

---

## 9. Launch Checklist

**Before launch**
- [ ] All pages have unique title + meta description + one H1
- [ ] Canonical tags, sitemap, robots.txt live
- [ ] Schema validated (Rich Results Test)
- [ ] Lighthouse mobile 90+; Core Web Vitals pass
- [ ] No broken links; custom 404 works
- [ ] Phone/WhatsApp/map links tested on a real phone
- [ ] Every WhatsApp button opens the right chat with the right pre-filled message (test on iPhone + Android + desktop)
- [ ] NAP matches Google Business Profile exactly

**Launch day**
- [ ] Verify **Google Search Console** + **Bing Webmaster Tools**; submit sitemap
- [ ] Set up **GA4** with events: WhatsApp click, phone click, directions click
- [ ] Update GBP website link (with UTM)
- [ ] Publish citations (20+ directories)
- [ ] Start the review-request routine

**First 90 days**
- [ ] Weeks 1-4: citations, first 10+ reviews, GBP photos/posts
- [ ] Month 2: 6-8 blog posts, location pages, local link outreach
- [ ] Month 3: review Search Console, rewrite low-CTR titles, double down on queries with impressions
- [ ] Monthly report: rankings, GBP calls/directions, organic clicks, leads

---

## 10. Quality Gates (Definition of Done)

| Area | Requirement |
|---|---|
| Speed | LCP < 2.5s, CLS < 0.1, INP < 200ms on mobile |
| SEO | Every page indexed, unique title/meta, schema valid, no crawl errors |
| Accessibility | WCAG AA contrast, keyboard navigable, alt text, labels |
| Mobile | Fully responsive, sticky call bar, 44px tap targets |
| Trust | Real photos, real reviews, visible NAP + hours |
| Conversion | Click-to-call in header, hero, footer, sticky bar |

---

## 11. Tools

| Purpose | Tools |
|---|---|
| Keywords | Google Keyword Planner, Ahrefs, SEMrush, Ubersuggest, Search Console |
| Audit | Lighthouse, PageSpeed Insights, Screaming Frog, Rich Results Test |
| Local rank tracking | BrightLocal, Local Falcon, Whitespark |
| Citations | Whitespark, BrightLocal, manual submissions |
| Analytics | GA4, Search Console, Bing Webmaster |
| Images | Squoosh (AVIF/WebP), any image optimizer |

---

## 12. Rules of the Project

1. SEO decisions come before design decisions.
2. One page, one keyword, one intent.
3. Real content, real photos, real reviews. No fakes.
4. Speed is a feature: protect Core Web Vitals on every change.
5. NAP is sacred: `NAP.txt` is the master; update every page + Google Business Profile together.
6. Measure WhatsApp clicks, calls and directions, not just traffic.
7. HTML + CSS + vanilla JS only. No forms, no backend, no frameworks.

---

## License / Ownership
Project built for **[Tire Shop Name]**. All content and brand assets belong to the client.
