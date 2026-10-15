# SEO Features Already Implemented

Audit scope: Phase 1 and Phase 2 of `SEO_OPTIMISATION_PLAN.md`, based on the current site files. Image file-size/compression work and map/coordinate work were excluded as requested. Social preview image *dimensions/weight* were not assessed.

## Phase 1

- **Meta description:** `index.html` includes a descriptive `<meta name="description">` tag.
- **Hero heading structure:** Both hero slides currently use H1 headings. This is intentionally retained for the desired slide design, per the site owner's direction; it is not tracked as outstanding work.
- **Font display:** The Google Fonts stylesheet URL includes `display=swap`, allowing fallback text to render while the web fonts load.

## Phase 2

- **Open Graph preview metadata:** `index.html` includes `og:image`, width, height, and alt metadata. The referenced `social media images/instagram.jpg` asset exists. Social platform preview behavior was not externally validated.
- **Twitter card metadata:** `twitter:card`, title, description, and image tags are present.
- **Image filenames:** Image assets have no spaces in their filenames; references in the site use the renamed filenames. Folder names may still contain spaces.
- **Below-fold image loading:** Content images below the hero use `loading="lazy"`. The map iframe also has lazy loading, but map work is outside this audit scope.
- **Review structured data:** `index.html` contains AggregateRating structured data and individual Review entries for the displayed reviews. This confirms implementation in the page source; rich result eligibility was not externally validated.

## Remaining plan items

The unfinished Phase 1/2 implementation tasks remain in `SEO_OPTIMISATION_PLAN.md`. The image compression/size work and map/coordinate work were left there without audit, per the owner's exclusions.
