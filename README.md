# PPC LLC Website

Static GitHub Pages website for PPC LLC, the public brand for Professional Pool Care LLC, a Las Vegas commercial pool and spa maintenance company.

Live site target: `https://neraium.github.io/PPCLV/`

## Presentation concept

This repository is a client-presentation concept showing a possible future direction for the PPC website. A production launch would include verified business details, verified PPC project photography, live form integration, analytics and domain configuration, and final legal and accessibility review.

## Site structure

- `index.html`: Homepage with commercial hero, editorial service overview, commercial credibility section, managed-property imagery, and decisive service CTA.
- `services.html`: Full commercial pool, spa, equipment, restoration, emergency, bio cleanup, and SNHD inspection-readiness service details.
- `industries.html`: Specific industry guidance for resorts, apartments, HOAs, municipal and public facilities, and commercial properties.
- `our-work.html`: Public page for Commercial Service Environments using representative imagery until verified PPC photography is available.
- `gallery.html`: Compatibility URL that redirects and canonicalizes to `our-work.html`; it is not included in `sitemap.xml`.
- `about.html`: PPC commercial focus, property types served, maintenance approach, communication style, Southern Nevada operating conditions, emergency coordination, and inspection-readiness support.
- `faq.html`: Commercial service FAQ with FAQPage JSON-LD.
- `contact.html`: Provider-neutral service request form with validation, spam protection, and launch notice until a live endpoint is connected.
- `commercial-pool-service-las-vegas.html`: Dedicated landing page for Commercial Pool Service Las Vegas search intent.
- `privacy.html`: Privacy policy focused on form information, processor configuration, analytics and cookies if enabled, information requests, and external links.
- `terms.html`: Website terms focused on informational content, availability limits, regulatory limitations, search-results limitations, acceptable use, IP, external links, liability, and changes.
- `robots.txt` and `sitemap.xml`: Search crawler and sitemap files.
- `styles.css`: Shared responsive design system.
- `script.js`: Accessible mobile navigation, reduced-motion aware reveal behavior, form validation, spam-field handling, and endpoint-not-configured messaging.

## Verified PPC information still needed

Do not add these items visibly until PPC verifies and approves them:

- Phone number.
- Email address.
- Business hours.
- Emergency availability language.
- Detailed service areas beyond Las Vegas and Southern Nevada.
- License information.
- Insurance information.
- Certifications.
- Leadership or team details.
- Years in business.
- Social profile links.
- Testimonials.
- Real PPC project photography.
- Final production canonical domain if different from GitHub Pages.

## Contact form setup

The contact form currently uses `action="#"` and `data-endpoint-configured="false"`. It is intentionally not presented as a live submission endpoint. Before production launch:

1. Connect the form to Formspree, Netlify Forms, Basin, or a custom endpoint.
2. Update `action` with the provider endpoint.
3. Set `data-endpoint-configured="true"`.
4. Submit a test request and confirm PPC receives every field.
5. Update `privacy.html` with the selected third-party form processor.

## Image replacement guidance

Current imagery is representative and documented in `images/README.md`. The website avoids calling these photos PPC projects. Replace images with verified PPC-owned or properly licensed photography when available, especially for:

- Commercial pools.
- Commercial spas.
- Equipment rooms.
- Surface restoration.
- Water testing.
- Service coordination or technician imagery.
- Approved before-and-after areas.

The `our-work.html` file includes visible framing and HTML comments identifying images that should be replaced before implying PPC project ownership.

## SEO and schema maintenance

Each public page includes a unique title, meta description, canonical URL, Open Graph metadata, Twitter card metadata, one H1, internal links, and local commercial-service language. `faq.html` includes FAQPage JSON-LD.

Add Organization, LocalBusiness, ProfessionalService, Service, WebSite, WebPage, and BreadcrumbList schema only after verified details are available. Do not add ratings, reviews, price ranges, opening hours, coordinates, address information, credentials, license data, or insurance language until verified.

## Analytics

No analytics script is enabled. If analytics are added, update `privacy.html`, document cookie behavior if applicable, and keep scripts lightweight.

## GitHub Pages deployment

The existing `.github/workflows/pages.yml` workflow uploads the static site from the repository root and deploys GitHub Pages after pushes to `main`. The current site remains static and GitHub Pages compatible.

## Local development and validation

Use Node.js 20 or newer, then run:

```sh
npm ci
npx playwright install --with-deps chromium
npm run build
npm test
```

The build copies the production static files to `dist/` without changing the root-based GitHub Pages deployment. Playwright starts a local HTTP server and tests navigation, CTAs, form validation, the mobile menu, headings, keyboard focus, internal links, images, console errors, horizontal overflow, sticky-header behavior, footer links, and the requested responsive widths. Final review screenshots are written to `test-artifacts/screenshots/final-review/`.

## Launch checklist

- Verify and add approved phone, email, business hours, emergency availability, service areas, license, insurance, certifications, leadership details, years in business, and social links.
- Replace representative images with verified PPC photography where possible.
- Connect and test the contact form endpoint.
- Update canonical URLs and `sitemap.xml` if the production domain changes.
- Review every claim for support and remove unsupported claims.
- Test all internal links.
- Confirm every page has exactly one H1.
- Test desktop, tablet, and mobile layouts in a real browser.
- Test keyboard navigation, focus states, FAQ disclosure controls, and form validation.
- Confirm `gallery.html` redirects or canonicalizes to `our-work.html` and remains absent from `sitemap.xml`.
- Confirm no visible development placeholders appear on public pages.
- Run an HTML validation pass before production launch.

## Accessibility and performance notes

The site uses semantic sections, accessible labels, visible focus states, keyboard-friendly disclosure elements, reduced-motion handling, explicit image dimensions, lazy loading below the fold, and no large framework. Keep future changes static and GitHub Pages compatible unless deployment requirements change.
