# PPC LLC Website

Static GitHub Pages website for PPC LLC, the public brand for Professional Pool Care LLC, a Las Vegas commercial pool and spa maintenance company.

Live site target: `https://neraium.github.io/PPCLV/`

## Site structure

- `index.html`: Homepage with hero, trust strip, services, industries, proof placeholders, testimonials placeholders, FAQ preview, and CTA.
- `services.html`: Commercial pool, spa, equipment, acid washing, emergency service, emergency bio cleanup, and SNHD-readiness support.
- `industries.html`: Resorts, apartments, HOAs, municipal and public facilities, and commercial properties.
- `our-work.html`: Renamed gallery experience with labels for temporary imagery and future verified PPC photography.
- `gallery.html`: Compatibility page linking visitors to `our-work.html`.
- `about.html`: Commercial focus, operating approach, and verification placeholders for leadership, certifications, licensing, insurance, and years in operation.
- `faq.html`: Accessible FAQ content with JSON-LD FAQPage schema.
- `contact.html`: Provider-neutral service request form with validation and a placeholder endpoint.
- `commercial-pool-service-las-vegas.html`: Focused commercial landing page.
- `privacy.html` and `terms.html`: General website policy pages that are not attorney-reviewed.
- `robots.txt` and `sitemap.xml`: Search crawler and sitemap files.
- `styles.css`: Shared responsive design system.
- `script.js`: Mobile navigation, reveal behavior, accessible form validation support.

## Centralized placeholders to replace before launch

Replace these visible placeholders throughout the HTML and schema where applicable:

- Phone: `[PPC phone number placeholder]`
- Email: `[PPC email placeholder]`
- Business hours: `[Business hours placeholder]`
- Service areas: `Las Vegas and Southern Nevada commercial properties`, then add any verified cities.
- Form endpoint: `FORM_ENDPOINT_PLACEHOLDER`
- License: `[License and insurance details placeholder, do not publish as verified until confirmed]`
- Insurance: use verified language only.
- Emergency availability: `[Emergency availability placeholder, verify before publishing]`
- Social links: add only verified profiles.
- Canonical domain: currently `https://neraium.github.io/PPCLV/`. Update every canonical tag, Open Graph URL, `robots.txt`, and `sitemap.xml` if the production domain changes.

## Placeholder images

The images in `images/` are temporary royalty-free Pexels images documented in `images/README.md`. Replace them with verified PPC photography before making project claims. Keep width, height, alt text, and licensing notes updated.

Priority replacement images:

- Commercial pools
- Commercial spas
- Equipment rooms
- Restoration work
- Water testing
- Service vehicles or technicians
- Before-and-after areas where approved

## Contact form setup

`contact.html` uses a provider-neutral form with `action="FORM_ENDPOINT_PLACEHOLDER"`. Before launch, connect it to one of these options:

1. Formspree endpoint.
2. Netlify Forms endpoint and related attributes if hosting on Netlify.
3. Basin endpoint.
4. A custom endpoint.

After connecting, submit a real test request and confirm the business receives all fields.

## SEO and schema maintenance

Each page includes a unique title, meta description, canonical URL, Open Graph metadata, Twitter card metadata, one H1, internal links, and local commercial-service language. `faq.html` includes FAQPage JSON-LD. Add Organization, LocalBusiness, ProfessionalService, Service, WebSite, WebPage, and BreadcrumbList schema only when verified details such as phone, URL, logo, service area, and contact endpoints are final. Do not add reviews, ratings, prices, coordinates, addresses, licenses, or hours until verified.

## Analytics

No analytics script is enabled. If analytics are added, document the provider in `privacy.html`, confirm cookie behavior, and avoid slowing initial page load.

## GitHub Pages deployment

The existing `.github/workflows/pages.yml` workflow uploads the static site from the repository root and deploys GitHub Pages after pushes to `main`. No deployment configuration changes were required.

## Launch checklist

- Verify phone, email, business hours, service area, emergency availability, social links, license, insurance, certifications, and years in operation.
- Replace temporary images with verified PPC-owned or properly licensed photography.
- Connect and test the contact form endpoint.
- Update canonical URLs and `sitemap.xml` if the domain changes.
- Review every claim for proof and remove unsupported claims.
- Test all internal links.
- Confirm every page has exactly one H1.
- Test mobile navigation at 360px, 390px, 768px, and desktop widths.
- Test keyboard navigation, focus states, FAQ disclosure controls, and form validation.
- Run an HTML validation pass before production launch.

## Accessibility and performance notes

The site uses semantic sections, accessible labels, visible focus states, keyboard-friendly disclosure elements, reduced-motion handling, explicit image dimensions, lazy loading below the fold, and no large framework. Keep future changes static and GitHub Pages compatible unless deployment requirements change.
