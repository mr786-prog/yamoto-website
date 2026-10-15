# Yamoto Tyre Shop - SEO & Performance Optimisation Plan

> **Document Version:** 1.0  
> **Last Updated:** 2026-10-14  
> **Target:** Improve SEO rankings, Core Web Vitals, and page load speed

---

## 📋 Executive Summary

This plan addresses **12 SEO errors** and **10 performance issues** identified in the website audit. Implementation is divided into **4 phases** based on priority and impact.

### Current Status
- **SEO Score:** ~70/100
- **LCP (Largest Contentful Paint):** 5-8 seconds (Target: <2.5s)
- **FCP (First Contentful Paint):** 2-4 seconds (Target: <1.8s)
- **Speed Index:** 4-7 seconds (Target: <3.4s)
- **Total Page Weight:** ~20+ MB (Target: <3 MB)

### Expected Improvements
- **SEO Score:** 70/100 → 90+/100
- **LCP:** 5-8s → 1.5-2.5s (60-70% improvement)
- **FCP:** 2-4s → 0.8-1.5s (50-60% improvement)
- **Speed Index:** 4-7s → 2-3s (50% improvement)
- **Page Weight:** 20+ MB → 2-3 MB (85% reduction)

---

## 🎯 Phase 1: Critical Fixes (Do First)

**Impact:** Will immediately improve Core Web Vitals and basic SEO  
**Time Estimate:** 2-3 hours  
**Who Does What:** 
- Devin: Code changes
- You: Image optimization (manual task)

### 1.3 Fix Coordinate Inconsistency

**Issue:** Three different coordinate values used in different places  
**Impact:** Confuses local SEO algorithms  
**Priority:** CRITICAL

#### Your Manual Task
**Step 1:** Verify correct coordinates
- Open Google Maps
- Search for "Yamoto Narsingi" or your exact address
- Note the exact coordinates (latitude, longitude)

**Step 2:** Confirm with me the correct coordinates

#### Devin's Code Changes
**File:** `index.html` (lines 192, 199, 433)

**After you confirm the correct coordinates, I will update:**
1. Directions link (line 192)
2. Map embed (line 199)
3. Schema.org geo coordinates (line 433)

**All three will use the SAME coordinates.**

**Verification:**
- Click "Get Directions" button - should open correct location
- Map embed should show correct location
- Schema validator should show consistent coordinates

---

### 1.4 Compress Hero Image (LCP Element)

**Issue:** Hero image is 2.4 MB - largest contentful paint element  
**Impact:** Directly destroys LCP score  
**Priority:** CRITICAL

#### Your Manual Task

**Step 1:** Download image optimization tool
- Use: https://squoosh.app (free, no installation needed)
- OR: https://tinypng.com (web-based)
- OR: Install ImageOptim (Mac) or FileOptimizer (Windows)

**Step 2:** Compress the hero image
1. Open `images/hero image 1.png` in Squoosh.app
2. Choose "WebP" format (better compression)
3. Set quality to 80-85%
4. Compare before/after - aim for <500 KB
5. Download as `hero-image-1.webp`

**Step 3:** Create multiple sizes for responsive images
Create these versions:
- `hero-image-1-400w.webp` (for mobile, ~100-150 KB)
- `hero-image-1-800w.webp` (for tablets, ~200-300 KB)
- `hero-image-1-1200w.webp` (for laptops, ~300-400 KB)
- `hero-image-1-1920w.webp` (for desktop, ~400-500 KB)
- `hero-image-1-fallback.jpg` (JPEG fallback for old browsers, ~500 KB)

**Step 4:** Place files in `images/` folder

#### Devin's Code Changes
**File:** `index.html` (line 69)

**I will update the hero section to use responsive images:**

**Change this:**
```html
<div class="hero-slide hero-slide--service active" 
     style="background-image:url('images/hero image 1.png')" 
     aria-hidden="false">
```

**To this:**
```html
<div class="hero-slide hero-slide--service active" aria-hidden="false">
  <picture class="hero-bg">
    <source srcset="images/hero-image-1-400w.webp" media="(max-width: 480px)">
    <source srcset="images/hero-image-1-800w.webp" media="(max-width: 768px)">
    <source srcset="images/hero-image-1-1200w.webp" media="(max-width: 1024px)">
    <img srcset="images/hero-image-1-1920w.webp" 
         src="images/hero-image-1-fallback.jpg" 
         alt="Wheel alignment and tyre care services at Yamoto Narsingi Hyderabad"
         class="hero-bg-img">
  </picture>
```

**And update CSS** (`css/style.css`) to handle the new structure:
```css
.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.hero-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

**Verification:**
- Test on mobile - should load small image (~100-150 KB)
- Test on desktop - should load large image (~400-500 KB)
- Check LCP in Chrome DevTools - should be <2.5s

---

## 🚀 Phase 2: High Priority Fixes

**Impact:** Further improve SEO and performance  
**Time Estimate:** 3-4 hours  
**Who Does What:** 
- Devin: Code changes
- You: Image optimization (manual task)

### 2.4 Compress All Other Images

**Issue:** All images are uncompressed and large  
**Impact:** Slow page load, high bandwidth usage  
**Priority:** HIGH

#### Your Manual Task

**Step 1:** Compress stock images
Use Squoosh.app or TinyPNG to compress:
- `stock-image-1.jpeg` (currently 2.8 MB) → target <300 KB
- `stock-image-2.jpeg` (currently 3.4 MB) → target <300 KB
- `stock-image-3.jpeg` (currently 3.0 MB) → target <300 KB
- `stock-image-4.jpeg` (currently 2.6 MB) → target <300 KB
- `stock-image-5.jpeg` (currently 2.9 MB) → target <300 KB

**Step 2:** Convert to WebP
Convert all JPEG/PNG images to WebP format for better compression.

**Step 3:** Compress other images
- `hero-image-2.png` (194 KB) → target <100 KB
- `shop-image.jpeg` (169 KB) → target <100 KB
- `services-section-bg.png` (1.9 MB) → target <500 KB
- `yamoto-logo.png` (986 KB) → target <200 KB
- All service photos (50-90 KB each) → target <50 KB each
- All brand logos (10-27 KB each) → target <15 KB each
- All "Why Yamoto" images (38-116 KB each) → target <50 KB each

**Verification:**
- Check total page weight in Chrome DevTools
- Should be <3 MB total
- Images should load progressively as you scroll

---

## 📈 Phase 3: Medium Priority Fixes

**Impact:** Enhance SEO and user experience  
**Time Estimate:** 2-3 hours  
**Who Does What:** 
- Devin: Code changes
- You: Add more reviews (manual task)

### 3.1 Add More Reviews with Dates

**Issue:** Only 3 reviews, no dates  
**Impact:** Low social proof, search engines can't determine recency  
**Priority:** MEDIUM

#### Your Manual Task
**Step 1:** Collect more reviews
- Get 2-7 more customer reviews from Google Business Profile
- Include customer name, car model, and date

**Step 2:** Provide the reviews to me
Format:
```
Name: [Customer Name]
Car: [Car Model]
Rating: [1-5]
Review: [Review text]
Date: [YYYY-MM-DD]
```

#### Devin's Code Changes
**File:** `index.html` (lines 294-314)

**I will add the new reviews to the reviews section:**
```html
<article class="review-card">
  <div class="review-stars" aria-label="5 out of 5 stars">★★★★★</div>
  <blockquote>
    <p>"[Review text]"</p>
  </blockquote>
  <footer>
    <strong>[Customer Name], [Car Model]</strong><br>
    <time datetime="[YYYY-MM-DD]">[Month Day, Year]</time>
  </footer>
</article>
```

**And update the Review schema to include all reviews.**

**Verification:**
- Confirm all reviews display correctly
- Dates show in human-readable format
- Schema includes all reviews

---

### 3.2 Inline Critical CSS

**Issue:** External CSS blocks rendering  
**Impact:** Delays FCP  
**Priority:** MEDIUM

#### Devin's Code Changes
**Step 1:** Extract critical CSS
I will identify above-the-fold CSS (header, hero, critical styles).

**Step 2:** Inline critical CSS in `<head>`
**File:** `index.html` (after line 24)

**Add inline critical CSS:**
```html
<style>
/* Critical CSS - Above the Fold */
:root {
  --navy-dark: #08142C;
  --yellow-accent: #FDB913;
  --font-base: 'Inter', system-ui, -apple-system, sans-serif;
  --font-heading: 'Barlow Condensed', -apple-system, sans-serif;
}
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: var(--font-base);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
/* Header styles */
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--navy-dark);
  z-index: 1000;
}
/* Hero styles */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
}
.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.hero-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero-content {
  position: relative;
  z-index: 1;
  color: white;
}
.hero-content h1 {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 2rem;
}
.btn {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.25s ease-in-out;
}
.btn-primary {
  background: var(--yellow-accent);
  color: var(--navy-dark);
}
</style>
```

**Step 3:** Defer non-critical CSS
**File:** `index.html` (line 24)

**Change this:**
```html
<link rel="stylesheet" href="css/style.css">
```

**To this:**
```html
<link rel="preload" href="css/style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="css/style.css"></noscript>
```

**Verification:**
- Page renders quickly with critical CSS
- Full styles load after critical path
- No flash of unstyled content (FOUC)

---

### 3.3 Add OG Site Name

**Issue:** Missing `og:site_name` tag  
**Impact:** Social platforms may not display site name correctly  
**Priority:** MEDIUM

#### Devin's Code Changes
**File:** `index.html` (after line 15)

**Add this line:**
```html
<meta property="og:site_name" content="Yamoto">
```

**Verification:**
- Test with Facebook Sharing Debugger
- Confirm site name appears in preview

---

### 3.4 Optimize Google Maps Load

**Issue:** Iframe loads external scripts immediately  
**Impact:** Slows page load  
**Priority:** MEDIUM

#### Devin's Code Changes
**File:** `index.html` (lines 198-200)

**Option 1: Load iframe when in viewport (Intersection Observer)**
Add to `js/main.js`:
```javascript
function initLazyMap() {
  const mapIframe = document.querySelector('.location-map iframe');
  if (!mapIframe) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const src = mapIframe.getAttribute('data-src');
        if (src) {
          mapIframe.src = src;
          observer.unobserve(mapIframe);
        }
      }
    });
  }, { rootMargin: '200px' });

  mapIframe.setAttribute('data-src', mapIframe.src);
  mapIframe.removeAttribute('src');
  observer.observe(mapIframe);
}

// Add to DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initOpenStatus();
  initHeroSlider();
  initMobileMenu();
  initTracking();
  initQuoteForm();
  initLazyMap(); // Add this
});
```

**And update HTML:**
```html
<div class="location-map">
  <iframe title="Yamoto Tyre Shop — Narsingi, Hyderabad"
    data-src="https://maps.google.com/maps?q=17.3822,78.3582&z=15&output=embed"
    width="100%" height="340"
    style="border:0;" 
    allowfullscreen="" 
    loading="lazy" 
    referrerpolicy="no-referrer-when-downgrade"></iframe>
</div>
```

**Verification:**
- Map doesn't load until user scrolls to it
- Page loads faster initially
- Map still loads correctly when needed

---

### 3.5 Create Proper Favicon

**Issue:** Inline SVG favicon  
**Impact:** Not supported by all browsers, adds to HTML size  
**Priority:** MEDIUM

#### Your Manual Task
**Step 1:** Create favicon files
- Use your logo (Yamoto Logo.PNG)
- Create these sizes:
  - `favicon.ico` (16x16, 32x32, 48x48)
  - `favicon-16x16.png` (16x16)
  - `favicon-32x32.png` (32x32)
  - `apple-touch-icon.png` (180x180)

**Tools:** 
- https://realfavicongenerator.net/ (recommended)
- Or: https://www.favicon-generator.org/

**Step 2:** Place files in root folder
- `favicon.ico`
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png`

#### Devin's Code Changes
**File:** `index.html` (lines 17-18)

**Replace this:**
```html
<link rel="icon"
  href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>...">
```

**With this:**
```html
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
```

**Verification:**
- Favicon appears in browser tab
- Favicon appears in bookmarks
- Works across different browsers

---

## ✨ Phase 4: Low Priority & Nice-to-Have

**Impact:** Minor improvements, polish  
**Time Estimate:** 1-2 hours  
**Who Does What:** 
- Devin: Code changes
- You: Optional enhancements

### 4.1 Add Breadcrumb Schema

**Issue:** No breadcrumb structured data  
**Impact:** Missed opportunity for rich snippets  
**Priority:** LOW

#### Devin's Code Changes
**File:** `index.html` (after line 438)

**Add BreadcrumbList schema:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://yamoto.in/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://yamoto.in/#services"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Location",
      "item": "https://yamoto.in/#location"
    }
  ]
}
</script>
```

**Verification:**
- Use Rich Results Test
- Confirm breadcrumb schema is detected

---

### 4.2 Add Preconnect for External Domains

**Issue:** No preconnect for Google Maps  
**Impact:** Slight delay in loading external resources  
**Priority:** LOW

#### Devin's Code Changes
**File:** `index.html` (after line 20)

**Add these lines:**
```html
<link rel="preconnect" href="https://maps.google.com">
<link rel="preconnect" href="https://maps.gstatic.com">
```

**Verification:**
- Check Network tab in DevTools
- Maps connections should be faster

---

### 4.3 Add Product Schema for Tyre Brands

**Issue:** No product structured data for tyre brands  
**Impact:** Missed opportunity for product rich snippets  
**Priority:** LOW

#### Devin's Code Changes
**File:** `index.html` (after line 438)

**Add Product schema for top brands:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "MRF Tyres",
  "description": "Genuine MRF tyres available at Yamoto Narsingi",
  "brand": {
    "@type": "Brand",
    "name": "MRF"
  },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "INR",
    "seller": {
      "@type": "TireShop",
      "name": "Yamoto - Your Auto Mate"
    }
  }
}
</script>
```

**(Repeat for other major brands: Michelin, Bridgestone, Apollo, etc.)**

**Verification:**
- Use Rich Results Test
- Confirm product schema is detected

---

### 4.4 Add WebSite Schema with SearchAction

**Issue:** No WebSite schema  
**Impact:** Missed opportunity for site search box in search results  
**Priority:** LOW

#### Devin's Code Changes
**File:** `index.html` (after line 438)

**Add WebSite schema:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Yamoto - Your Auto Mate",
  "url": "https://yamoto.in/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://yamoto.in/?s={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
```

**Note:** This requires implementing site search functionality. Optional.

---

### 4.5 Add Author Meta Tag

**Issue:** No author attribution  
**Impact:** No content attribution  
**Priority:** LOW

#### Devin's Code Changes
**File:** `index.html` (line 7)

**Add this line:**
```html
<meta name="author" content="Yamoto - Your Auto Mate">
```

**Verification:**
- Check page source
- Confirm author meta tag appears

---

## 📋 Summary Checklist

### Phase 1: Critical (Do First)
- [ ] Fix coordinate inconsistency (verify correct coords first)
- [ ] Compress hero image and create responsive versions

### Phase 2: High Priority
- [ ] Compress all other images

### Phase 3: Medium Priority
- [ ] Add more reviews with dates
- [ ] Inline critical CSS
- [ ] Add OG site name
- [ ] Optimize Google Maps load
- [ ] Create proper favicon files

### Phase 4: Low Priority
- [ ] Add Breadcrumb schema
- [ ] Add preconnect for external domains
- [ ] Add Product schema for tyre brands
- [ ] Add WebSite schema with SearchAction
- [ ] Add author meta tag

---

## 🛠️ Recommended Tools

### Image Optimization
- **Squoosh.app** - Free, no installation, excellent WebP conversion
- **TinyPNG.com** - Simple web-based compression
- **ImageOptim** (Mac) - Batch compression
- **FileOptimizer** (Windows) - Batch compression

### SEO Testing
- **Google Rich Results Test** - https://search.google.com/test/rich-results
- **Schema.org Validator** - https://validator.schema.org/
- **Facebook Sharing Debugger** - https://developers.facebook.com/tools/debug/
- **Twitter Card Validator** - https://cards-dev.twitter.com/validator

### Performance Testing
- **Google PageSpeed Insights** - https://pagespeed.web.dev/
- **Chrome DevTools** - Network tab, Lighthouse
- **WebPageTest** - https://www.webpagetest.org/

### Favicon Generation
- **RealFaviconGenerator** - https://realfavicongenerator.net/

---

## 📊 Expected Results

### After Phase 1 (Critical)
- **SEO Score:** 70 → 80
- **LCP:** 5-8s → 2-3s
- **FCP:** 2-4s → 1-2s
- **Speed Index:** 4-7s → 3-4s
- **Page Weight:** 20+ MB → 5-8 MB

### After Phase 2 (High Priority)
- **SEO Score:** 80 → 85
- **LCP:** 2-3s → 1.5-2.5s
- **FCP:** 1-2s → 0.8-1.5s
- **Speed Index:** 3-4s → 2-3s
- **Page Weight:** 5-8 MB → 2-3 MB

### After Phase 3 (Medium Priority)
- **SEO Score:** 85 → 90
- **LCP:** 1.5-2.5s → 1.2-2s
- **FCP:** 0.8-1.5s → 0.6-1.2s
- **Speed Index:** 2-3s → 1.8-2.5s
- **Page Weight:** 2-3 MB → 1.5-2 MB

### After Phase 4 (Low Priority)
- **SEO Score:** 90 → 92-95
- **Performance:** Minor improvements
- **Rich Snippets:** More opportunities for enhanced search results

---

## 🎯 Next Steps

1. **Start with Phase 1** - These will have the biggest impact
2. **Test after each phase** - Use PageSpeed Insights and Rich Results Test
3. **Monitor rankings** - Track Google Search Console for improvements
4. **Iterate** - Adjust based on results

---

## 📞 Support

If you need help with any step:
- Ask me to implement code changes
- Request clarification on any task
- Get help with tool usage

---

**End of SEO Optimisation Plan**



