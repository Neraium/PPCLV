# PPC LLC Essential Business Website

Static GitHub Pages website for Professional Pool Care LLC, also known as PPC LLC. The public delivery is intentionally scoped as a concise four-page commercial website for the $1,250 Essential Business Website package.

Live site target: `https://neraium.github.io/PPCLV/`

## Public site structure

The only promoted marketing pages are:

- `index.html`: image-led homepage with commercial positioning, a concise service overview, credibility content, the Properties We Serve showcase, and a final service call to action.
- `services.html`: PPC's approved service categories organized into Maintenance, Equipment & Restoration, and Urgent & Operational Support.
- `about.html`: company identity, commercial focus, Southern Nevada service context, maintenance approach, and property-team communication.
- `contact.html`: accessible service-request form collecting only the information needed to start a conversation.

`privacy.html` and `terms.html` are concise legal utility pages. They are linked only in the footer, marked `noindex`, and are not promoted as marketing pages.

Primary navigation and the compact footer promote only Home, Services, About, and Contact.

## Expanded-tier material retained

Expanded-package source work is preserved in `archive/expanded/`:

- Industries page.
- Our Work and gallery-style pages.
- Expanded FAQ page and FAQPage schema.
- Dedicated Commercial Pool Service Las Vegas search landing page.

These files are marked `noindex`, have no links from the Essential site, are absent from `sitemap.xml`, and are excluded from the production `dist/` artifact. They remain available in source control for a possible future package upgrade.

The public Essential site does not ship a standalone Industries, Our Work, Gallery, FAQ, case-study, industry-specific SEO, advanced schema, GEO, or AI-search deliverable.

## PPC Information Required Before Launch

PPC must provide and approve the following before final launch:

- Main phone number.
- Main email address.
- Business hours.
- Approved service area wording.
- Approved final service list and descriptions.
- Approved company background and year established.
- Any license, certification, or insurance wording PPC wants shown.
- Contact-form destination and selected form processor.
- Final production domain.
- Customer or property names approved for display.
- Customer or property photography PPC owns or has permission to publish.
- Written permission to publish each named property and its photography.

The site does not invent or visibly substitute any of this information. Source comments identify the relevant insertion points.

## Customer and property approval rules

The homepage Properties We Serve section currently uses licensed representative commercial imagery with property-type labels only. It does not identify the photographs as PPC projects or pair stock images with real customer names.

Before adding a named property, confirm that PPC currently services it or is otherwise authorized to reference it, that PPC has permission to display the name, and that PPC owns or has permission to publish the paired photo. If photo use is approved but name use is not, retain a generic property-type label.

## Photo replacement map

| Public placement | Current file | PPC replacement needed |
| --- | --- | --- |
| Homepage hero | `images/resort-hotel-pool-deck.webp` plus 960px derivative | One approved, high-impact commercial resort, hotel, multifamily, HOA, municipal, or large aquatic-deck photo |
| Homepage credibility | `images/commercial-surface-cleaning.jpg` | One approved commercial technician or field-service photo |
| Properties We Serve, Apartment Community | `images/apartment-community-pool-deck.jpg` | Approved customer/property photo and optional approved property name |
| Properties We Serve, Commercial Spa | `images/commercial-hotel-spa.jpg` | Approved customer/property spa photo and optional approved property name |
| Properties We Serve, Municipal Facility | `images/municipal-lap-pool-lanes.jpg` | Approved customer/property photo and optional approved property name |
| Properties We Serve, Commercial Facility | `images/commercial-equipment-room-service.jpg` | Approved customer/property photo and optional approved property name |
| Services, Maintenance | `images/commercial-water-testing.jpg` | One to two approved commercial pool or spa maintenance photos; water-testing photography is not required |
| Services, Equipment & Restoration | `images/commercial-equipment-room-service.jpg` | Two to three approved equipment or equipment-room photos |
| Services, Urgent & Operational Support | `images/municipal-lap-pool-lanes.jpg` | One approved commercial facility or operational-support photo |
| About | `images/commercial-equipment-room-service.jpg` | One approved company, team, equipment-room, or field-service photo |

The current homepage uses six unique image files and does not repeat photography within the page. When PPC photography arrives, use meaningful filenames, preserve intrinsic dimensions, create WebP derivatives where appropriate, add responsive `srcset` for large images, use meaningful alt text, load below-the-fold images lazily, and keep the hero image high priority.

## Contact form setup

The form remains provider-neutral and includes accessible labels, native validation, an email-or-phone requirement, privacy consent, and a honeypot. It intentionally exposes no setup or development notice on the public page.

Before launch:

1. Set the `action` in `contact.html` to the approved provider endpoint.
2. Set `data-endpoint-configured="true"`.
3. Confirm each field arrives at PPC's approved destination.
4. Test validation, spam handling, success behavior, and failure behavior.
5. Update `privacy.html` with the selected processor and PPC's approved privacy contact details.

## Basic SEO

The four core pages retain unique titles and meta descriptions, canonical URLs, basic Open Graph metadata, one H1 each, logical heading order, crawlable HTML, and meaningful image alt text. `sitemap.xml` lists only the four indexable marketing pages.

No active FAQPage schema, industry-specific landing-page architecture, enhanced local SEO package, advanced schema strategy, GEO package, or AI-answer optimization package is included in the Essential build.

Update the canonical URLs, Open Graph URLs, `robots.txt`, and `sitemap.xml` after PPC supplies the final domain.

## Deployment and validation

The GitHub Pages workflow installs dependencies, runs `npm run build`, and deploys only `dist/`. The build uses an explicit allowlist for the four marketing pages, two utility pages, shared assets, crawler files, and `.nojekyll`. Source archives, tests, reports, and project files are not published.

Local checks:

```sh
npm ci
npm run build
npm test
npm run test:screenshots
git diff --check
node --check script.js
```

Playwright covers navigation scope, headings, links, image loading and alt text, form accessibility and validation, mobile-menu behavior, stable sticky-header dimensions, overflow, archive exclusion, sitemap scope, and the requested responsive widths.
