# GEO.md: Generative Engine Optimization for a Tyre Shop Website

> **GEO = Generative Engine Optimization.** SEO gets the site *ranked* in Google. GEO gets the shop *mentioned, cited and recommended* inside AI answers: ChatGPT, Google AI Overviews / AI Mode, Gemini, Perplexity, Copilot, Claude, Siri and Apple Maps.
> Companion files: [`skills.md`](./skills.md) (design + SEO), [`implementation-plan.md`](./implementation-plan.md) (build plan) and [`README.md`](./README.md) (project guide).
> Spelling: copy uses "tyre"; also cover the "tire" variant in keywords and FAQs. The schema.org type stays `TireShop`.
> **Tech constraint (unchanged): pure HTML + CSS + vanilla JS, static, no backend, no forms. Contact = WhatsApp + phone links.**

**Honest expectations**
- Nobody can guarantee being named by an AI. Answers are non-deterministic and engines change often.
- GEO is **a layer on top of good SEO**, not a replacement. Strong local SEO, Google Business Profile and reviews remain the best predictors of AI visibility for local searches.
- Google states that no special markup or files are required for AI Overviews / AI Mode; its ranking systems are the same core systems. Extra files below (`llms.txt`, etc.) are cheap, harmless experiments that mainly help *non-Google* engines.
- Never write separate content "for AI" or fake mentions/reviews. One page serves humans and machines.

---

## 1. What AI assistants are asked about tyre shops

| User prompt (typed or spoken) | What the AI needs to find |
|---|---|
| "Best tyre shop near me" / "tyre shop open now in [city]" | Local entities, ratings, hours, distance (Maps data + reviews) |
| "How much does a tyre replacement cost in [city]?" | Price ranges, clear price tables |
| "Where can I get a flat tyre fixed today?" | Same-day / emergency service, hours, phone |
| "Do I need an alignment after new tyres?" | Direct expert answer |
| "Michelin vs Bridgestone for [car model]" | Comparison with specifics |
| "What does 205/55 R16 91V mean?" | Definition |
| "Is [Shop name] good? What are their reviews?" | Brand facts + third-party reviews |
| "Which tyre shop in [area] does mobile tyre fitting?" | Services + service areas |

**Goal:** be the clearest, most factual, best-corroborated answer to those prompts.

---

## 2. How AI engines pick sources (mental model)

| Engine | Where it looks | Implication for this shop |
|---|---|---|
| **Google AI Overviews / AI Mode / Gemini** | Google index, Knowledge Graph, **Google Business Profile / Maps** | Rank well in normal Google; GBP must be perfect |
| **ChatGPT (search on)** | Web search (Bing-influenced) plus partner/local data; reads pages live | Bing indexing, Bing Places, Yelp/Apple listings, clear page text |
| **Perplexity** | Own crawler + search; always cites | Fresh, well-structured, citable pages |
| **Copilot** | Bing index | Bing Webmaster Tools + Bing Places |
| **Claude** | Web search when enabled, plus training data | Clear, consistent public facts across the web |
| **Siri / Apple Maps** | Apple Business Connect | Claim and complete Apple Business listing |

**Three pillars**
1. **Structure**: make every key fact extractable (answer-first, tables, FAQ, schema).
2. **Authority**: make claims citable (real numbers, sources, named experts, reviews).
3. **Presence**: be consistent on every site AI looks at (GBP, Bing, Apple, Yelp, directories, press).

**Consensus rule:** AI trusts what *multiple independent sources agree on*. Name, address, phone, hours, services and positioning must match everywhere.

---

## 3. Let the right bots in (robots.txt)

Different AI user agents have different purposes. Don't block discovery bots by accident.

| Purpose | User agents |
|---|---|
| Search / discovery (feeds answers) | `OAI-SearchBot`, `PerplexityBot`, `Claude-SearchBot`, `Bingbot`, `Googlebot` |
| User-triggered fetch (a person asked the AI to open your page) | `ChatGPT-User`, `Claude-User`, `Perplexity-User` |
| Possible model training | `GPTBot`, `ClaudeBot` |
| Google product control (not Search ranking) | `Google-Extended` |
| Apple | `Applebot`, `Applebot-Extended` |

**Recommended for a local business that wants maximum visibility** (owner can still choose to block training bots; that does not by itself remove you from AI search citations):

```
# /robots.txt
User-agent: *
Allow: /

# AI search and retrieval bots: explicitly welcome
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: Claude-User
Allow: /
User-agent: Perplexity-User
Allow: /

Sitemap: https://www.example.com/sitemap.xml
```

Also check:
- [ ] Cloudflare / host **bot-protection or WAF rules** are not blocking these agents (common silent problem).
- [ ] No important content behind login, popups, or JS-only rendering. (Static HTML already passes this.)
- [ ] Pages return fast and with HTTP 200; no soft 404s.
- [ ] Bing Webmaster Tools verified and sitemap submitted (ChatGPT and Copilot lean on Bing).

---

## 4. Content structure that AI can extract

AI systems lift **passages**, not whole pages. Every key answer should stand alone.

### 4.1 Rules
1. **Answer first.** Put a direct 40-60 word answer right under the heading, then expand.
2. **Headings phrased like real questions** ("How much does a tyre change cost in [City]?").
3. **One idea per paragraph**, plain language, no filler.
4. **Tables for comparisons and prices; numbered lists for processes.**
5. **Specifics beat adjectives.** "Same-day fitting for most sizes, 9am-7pm, Mon-Sat" beats "fast, quality service."
6. **Real numbers + sources** (price ranges, tread-depth limits, legal minimums, manufacturer guidance) with named source and date.
7. **Visible author + reviewer** (owner/mechanic name, years of experience) and a visible **"Last updated: [date]"** on every page.
8. **Keep pages open.** No gating of useful content.
9. **No keyword stuffing**: research on generative engines found it reduces visibility, while stats, quotes and citations increase it.

### 4.2 Reusable answer blocks (copy into pages)

**Definition block** (tyre-size-guide page)
```html
<h2>What does 205/55 R16 mean on a tyre?</h2>
<p>205/55 R16 describes tyre size: 205 is the width in millimetres, 55 is the sidewall height as a percentage of that width, R means radial construction, and 16 is the wheel diameter in inches. You'll find it printed on the tyre sidewall and often inside the driver's door frame.</p>
```

**Price block** (service pages; AI loves clear numbers)
```html
<h2>How much does tyre installation cost in [City]?</h2>
<p>At [Shop Name], tyre fitting, balancing and valve replacement start from [₹/$X] per tyre for standard car sizes. Prices vary by rim size and tyre type. Last updated [date].</p>
<table>
  <caption>Tyre fitting prices at [Shop Name], [City] (updated [date])</caption>
  <thead><tr><th>Service</th><th>Car (up to 16")</th><th>SUV / 17"+</th><th>Time</th></tr></thead>
  <tbody>
    <tr><td>Tyre fitting + balancing</td><td>from X</td><td>from Y</td><td>30-45 min</td></tr>
    <tr><td>Puncture / flat repair</td><td>from X</td><td>from Y</td><td>15-20 min</td></tr>
    <tr><td>Wheel alignment (4-wheel)</td><td>from X</td><td>from Y</td><td>45-60 min</td></tr>
  </tbody>
</table>
```

**Comparison block** (brand / tyre-type pages)
```html
<h2>All-season vs summer tyres: which should you choose in [City]?</h2>
<p>For [City]'s [climate/road conditions], [choice] is usually the better fit because [one-line reason].</p>
<table>
  <thead><tr><th></th><th>All-season</th><th>Summer</th></tr></thead>
  <tbody>
    <tr><th>Best for</th><td>...</td><td>...</td></tr>
    <tr><th>Wet grip</th><td>...</td><td>...</td></tr>
    <tr><th>Tread life</th><td>...</td><td>...</td></tr>
    <tr><th>Typical price</th><td>...</td><td>...</td></tr>
  </tbody>
</table>
```

**Steps block** (how-to)
```html
<h2>How to check if your tyres need replacing</h2>
<ol>
  <li>Check the tread depth with a gauge; replace at or below 1.6 mm (legal minimum in many regions, check your local rule).</li>
  <li>Look for cracks, bulges or uneven wear on the sidewall and tread.</li>
  <li>Check the 4-digit DOT date code; consider replacing tyres older than about 6 years.</li>
</ol>
```

**FAQ block** (also add `FAQPage` schema; answers 40-60 words, self-contained)

### 4.3 Semantic HTML (AI agents read the DOM and accessibility tree)
- Use `<header> <nav> <main> <article> <section> <footer>`, one `<h1>`, logical heading order.
- Real `<table>`, `<ol>`, `<ul>`, `<address>`, `<time datetime="2026-10-13">`.
- Label every button/link clearly ("Chat on WhatsApp", not "Click here").
- Put phone, address, hours as **real text** in HTML (not images).

---

## 5. Entity optimization (make the shop a recognised "thing")

AI builds an entity for the business. Feed it identical facts everywhere.

### 5.1 "Quick facts" block (home, about, contact)
```html
<section aria-labelledby="facts">
  <h2 id="facts">[Shop Name] at a glance</h2>
  <dl>
    <dt>What we are</dt><dd>Independent tyre shop in [Area], [City], serving since [year]</dd>
    <dt>Services</dt><dd>New tyres, fitting and balancing, flat repair, wheel alignment, rotation, mobile tyre service</dd>
    <dt>Brands</dt><dd>Michelin, Bridgestone, MRF, CEAT, ...</dd>
    <dt>Address</dt><dd><address>[Street, Area, City, ZIP]</address></dd>
    <dt>Phone / WhatsApp</dt><dd>[phone] / [whatsapp]</dd>
    <dt>Hours</dt><dd>Mon-Sat 9:00-19:00, Sun [closed/hours]</dd>
    <dt>Areas served</dt><dd>[Area 1], [Area 2], [Area 3]</dd>
    <dt>Rating</dt><dd>[4.8] from [120] Google reviews (as of [date])</dd>
  </dl>
</section>
```

### 5.2 Entity schema (JSON-LD) with `@id`, `sameAs`, services and contact
Extends the `TireShop` schema in skills.md; add `sameAs` links to **every** official profile so engines connect them to one entity.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TireShop",
      "@id": "https://www.example.com/#business",
      "name": "[Shop Name]",
      "alternateName": "[Short name / common spelling]",
      "description": "Independent tyre shop in [Area], [City] offering new tyres, fitting, flat repair and wheel alignment since [year].",
      "url": "https://www.example.com/",
      "telephone": "+91-XXXXXXXXXX",
      "foundingDate": "[year]",
      "address": { "@type": "PostalAddress", "streetAddress": "[Street]", "addressLocality": "[City]", "addressRegion": "[State]", "postalCode": "[ZIP]", "addressCountry": "[IN]" },
      "geo": { "@type": "GeoCoordinates", "latitude": 0.0, "longitude": 0.0 },
      "areaServed": ["[Area 1]", "[Area 2]", "[City]"],
      "knowsAbout": ["Tyre fitting", "Wheel alignment", "Flat tyre repair", "Tyre selection"],
      "contactPoint": [
        { "@type": "ContactPoint", "contactType": "customer service", "telephone": "+91-XXXXXXXXXX", "availableLanguage": ["English", "Hindi", "Telugu"] },
        { "@type": "ContactPoint", "contactType": "sales", "url": "https://wa.me/91XXXXXXXXXX", "availableLanguage": ["English"] }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Tyre services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Tyre fitting and balancing", "url": "https://www.example.com/services/tyre-installation/" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Flat tyre repair", "url": "https://www.example.com/services/flat-tyre-repair/" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Wheel alignment", "url": "https://www.example.com/services/wheel-alignment/" } }
        ]
      },
      "sameAs": [
        "https://www.google.com/maps?cid=XXXX",
        "https://www.facebook.com/[page]",
        "https://www.instagram.com/[page]",
        "https://www.yelp.com/biz/[slug]",
        "https://www.bing.com/maps?...",
        "https://business.apple.com/..."
      ]
    },
    { "@type": "WebSite", "@id": "https://www.example.com/#website", "url": "https://www.example.com/", "name": "[Shop Name]", "publisher": { "@id": "https://www.example.com/#business" } }
  ]
}
</script>
```

Also on every content page:
- `Article`/`BlogPosting` with `author` (a real `Person`), `datePublished`, `dateModified`.
- `FAQPage`, `Service`, `BreadcrumbList`, `HowTo` where the content matches.
- Only mark up what is **visible on the page**. Don't use fake ratings.

### 5.3 Consistency checklist (consensus)
- [ ] Shop name spelled **identically** everywhere (no "Ravi Tyres" vs "Ravi Tyres Pvt Ltd" drift; if both exist, list one in `alternateName`)
- [ ] One-sentence description reused on website, GBP, Bing, Apple, Facebook, Yelp
- [ ] Same categories, services, brands, hours, phone, address, service areas
- [ ] Founder/owner name and bio consistent
- [ ] All profiles link back to the website; website links to all profiles (`sameAs`)

---

## 6. Local GEO: where AI gets "near me" answers

For "best tyre shop near me" the AI mostly reads **maps/listing data + reviews**, not just your website.

| Platform | Action |
|---|---|
| **Google Business Profile** (Gemini, AI Overviews, Maps) | Complete everything: categories, services with descriptions, products, attributes, hours, photos (25+), weekly posts, Q&A seeded with real questions and answers |
| **Bing Places** (ChatGPT, Copilot) | Claim and sync from GBP; verify website |
| **Apple Business Connect** (Siri, Apple Maps) | Claim, complete, add photos and hours |
| **Yelp, Facebook, Justdial / Sulekha / local directories** | Same NAP and description |
| **Brand dealer locators** (Michelin, Bridgestone, MRF, etc.) | Request dealer-locator listing: strong third-party corroboration |

**Reviews are GEO fuel.** AI summarizes review text.
- Ask every customer; reply to every review.
- Encourage **specific** reviews naturally (service, car, area, speed), e.g. "Fixed my flat in 15 minutes in [Area]". Never script, buy, incentivize in violation of platform rules, or fake reviews.
- Add a `reviews` page with real, dated, attributable testimonials (with permission) and link to the Google profile.

**Local content AI can cite**
- Service-area pages with genuinely local details (roads, climate, typical vehicles, landmarks, drive time).
- "Tyre price guide for [City] ([year])" with dated price table.
- Seasonal guides ("Monsoon tyre checklist for [City]").

---

## 7. Build authority and presence (off-site)

AI often trusts third parties over your own claims.

- [ ] Local news / blog features, "Best of [City]" lists
- [ ] Chamber of commerce, business associations, supplier dealer pages
- [ ] Local sponsorships (clubs, schools, events) that publish a mention + link
- [ ] Genuine answers in local forums, Reddit, Quora where relevant, as a helpful person, never spam, always disclose affiliation
- [ ] YouTube: short real videos ("How to check tyre tread", "What happens in a wheel alignment") with accurate titles, descriptions, captions and chapters; AI reads the text layer (title, transcript, description)
- [ ] Google Business Profile posts and photos with captions
- [ ] Original data: e.g. "Most common tyre sizes we fitted in [City] in [year]" (original numbers get cited)

---

## 8. Machine-readable files for a static site

All optional, cheap, and static (just upload files). Google doesn't require them; other AI tools may read them.

### 8.1 `/llms.txt` (root of site)
```markdown
# [Shop Name]

> Independent tyre shop in [Area], [City] offering new tyres, fitting and balancing, flat tyre repair, wheel alignment and mobile tyre service. Open Mon-Sat 9:00-19:00. Contact via WhatsApp or phone.

## Key facts
- Address: [full address]
- Phone: [phone]
- WhatsApp: https://wa.me/91XXXXXXXXXX
- Hours: Mon-Sat 9:00-19:00; Sun [closed]
- Areas served: [Area 1], [Area 2], [Area 3]

## Services
- [Tyre installation](https://www.example.com/services/tyre-installation/): fitting, balancing, valves
- [Flat tyre repair](https://www.example.com/services/flat-tyre-repair/): puncture repair, same day
- [Wheel alignment](https://www.example.com/services/wheel-alignment/): 4-wheel alignment
- [Mobile tyre service](https://www.example.com/services/mobile-tyre-service/): we come to you

## Prices and brands
- [Price list](https://www.example.com/pricing.md)
- [Tyre brands](https://www.example.com/tyres/)

## Guides
- [How to read tyre size](https://www.example.com/tyre-size-guide/)
- [When to replace tyres](https://www.example.com/blog/when-to-replace-tyres/)

## Contact and reviews
- [Contact](https://www.example.com/contact/)
- [Reviews](https://www.example.com/reviews/)
```

### 8.2 `/pricing.md` (plain, parseable price list; keep it identical to the HTML price tables)
```markdown
# Price list: [Shop Name], [City] (updated 2026-10-13)

| Service | Car (up to 16") | SUV / 17"+ | Time |
|---|---|---|---|
| Tyre fitting + balancing | from X | from Y | 30-45 min |
| Flat tyre repair | from X | from Y | 15-20 min |
| Wheel alignment (4-wheel) | from X | from Y | 45-60 min |

Prices are starting prices; final quote depends on tyre size and type. Get a quote on WhatsApp: https://wa.me/91XXXXXXXXXX
```
Link both files from the footer and `sitemap.xml`. **Keep them updated; stale prices are worse than none.**

> Treat `llms.txt` as an experiment, not a ranking guarantee. The real work is sections 4-7.

---

## 9. Page-by-page GEO checklist

| Page | Must contain |
|---|---|
| **Home** | Quick-facts block, one-sentence definition of the business, services list, rating + date, FAQ, schema graph |
| **Service pages** | Answer-first intro, what's included, **price table**, time needed, process steps, FAQ, related services, `Service` + `FAQPage` schema |
| **Brand/tyre pages** | Who it suits, comparison table, price range, warranty facts, honest pros/cons |
| **Location pages** | Real local specifics, service list, hours, directions, map, local FAQ |
| **Tyre size guide** | Definition blocks, example breakdowns, how to find your size |
| **Blog guides** | Question headings, 40-60 word answers, sources, author, dated, `Article` schema |
| **About** | Owner/mechanic names, years, certifications, photos, story, quick facts |
| **Reviews** | Real, dated reviews, link to Google profile |
| **Contact** | NAP as text, hours, map, WhatsApp and call buttons, directions |

**Every page:** visible "Last updated", author/owner attribution where relevant, internal links to related pages, a WhatsApp CTA with a page-specific pre-filled message.

---

## 10. Priority content to publish first (fan-out coverage)

AI engines expand one question into several background queries, so cover the whole cluster, not one keyword.

**Cluster: "Buying new tyres in [City]"**
1. How much do tyres cost in [City] ([year] price guide)
2. How to choose the right tyre for your car
3. How to read tyre size (205/55 R16)
4. All-season vs summer vs all-terrain tyres
5. Best tyres for [local conditions: monsoon, highways, city traffic]
6. Tyre brand comparison (premium vs mid-range vs budget)
7. How long do tyres last? When to replace them
8. Do I need alignment after new tyres?
9. Tyre warranty: what's covered
10. Where to buy tyres in [City]: what to ask a shop

**Cluster: "Flat tyre / emergency"**: what to do, repair vs replace, can you drive on a flat, mobile tyre service, tyre pressure and TPMS guide.

---

## 11. Measurement (DIY, no paid tools needed)

AI answers vary run to run. One test is an anecdote; track **rates** over time.

### 11.1 Monthly prompt test
1. Write 20 realistic prompts (use the table in Section 1 with your real city/areas).
2. Run each **3-5 times** in ChatGPT (search on), Perplexity, Google (AI Overview/AI Mode), Gemini, Copilot.
3. Log in a sheet:

| Date | Prompt | Engine | Run # | Shop mentioned? | Cited URL | Recommended? | Competitors named | Facts wrong? |
|---|---|---|---|---|---|---|---|---|

4. Report **mention rate** (e.g. "mentioned 6/15 runs") month over month.
5. **Fix errors at the source:** if AI states a wrong price/hour, the page or listing that should state it isn't clear. Update it and the listings.
6. **Study who gets cited instead of you**: those sources are your outreach list (directories, local blogs, listings).

### 11.2 Analytics
- GA4: create a channel/segment for referrers such as `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com`, `claude.ai`.
- Track the same conversions as SEO: **WhatsApp clicks, call clicks, direction clicks**.
- Ask new customers "How did you find us?" and add "AI assistant (ChatGPT/Google AI/etc.)" as an option when logging leads on WhatsApp.
- Google gives no separate AI Overview report; use Search Console impressions and clicks for Google.

Optional paid trackers: Otterly, Peec AI, ZipTie, LLMrefs.

---

## 12. Do / Don't

**Do**
- Write answer-first, specific, dated, sourced content
- Keep facts identical across website, GBP, Bing, Apple, directories
- Publish real prices or "from" prices
- Earn real reviews and real local mentions
- Keep content fresh (review key pages every 3-6 months)
- Keep the site fast, static, crawlable

**Don't**
- Write separate "AI-only" pages or hidden text
- Chop content into meaningless fragments for bots
- Mass-produce thin city-swap pages
- Fake reviews, awards, ratings or "independent" review sites you own
- Stuff keywords
- Block `OAI-SearchBot`, `PerplexityBot`, `Claude-SearchBot` or Bingbot by accident
- Hide prices/contact in images, PDFs or JS-only widgets
- Promise the client a guaranteed AI ranking

---

## 13. 30-60-90 day GEO roadmap

| When | Tasks |
|---|---|
| **Days 1-14** | Complete GBP, Bing Places, Apple Business; align NAP and description everywhere; allow AI bots in robots.txt; verify Bing Webmaster Tools; build quick-facts block and entity schema; publish price tables |
| **Days 15-30** | Launch site with answer-first service pages, FAQ + schema, `llms.txt` and `pricing.md`; start review engine; run **baseline prompt test** |
| **Days 31-60** | Publish tyre-size guide + 6-8 cluster articles; local citations and dealer-locator listings; 2-3 YouTube how-tos; GBP posts weekly |
| **Days 61-90** | Re-run prompt test; fix factual errors AI shows; outreach to sources AI cites instead of you; refresh dated pages; publish original local data post |
| **Ongoing** | Monthly prompt test, quarterly content refresh, steady reviews, new local mentions |

---

## 14. Quick cheat sheet

```
GEO = SEO foundation + extractable answers + consistent entity facts + third-party corroboration

1. Rank & be found      -> great local SEO, GBP, Bing Places, Apple Business
2. Be readable          -> static HTML, semantic tags, tables, FAQs, answer-first (40-60 words)
3. Be factual           -> prices, hours, areas, brands, dates, named author/owner
4. Be consistent        -> same NAP + description + services on every profile (sameAs in schema)
5. Be corroborated      -> reviews, local press, dealer locators, directories, YouTube
6. Be accessible        -> robots.txt allows OAI-SearchBot, PerplexityBot, Claude-SearchBot, Bingbot
7. Be measurable        -> monthly prompt test (3-5 runs each), GA4 AI referrers, WhatsApp/call clicks
8. Be honest            -> no fake reviews, no AI-only content, no guarantees
```
