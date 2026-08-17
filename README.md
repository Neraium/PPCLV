# PPC LLC Essential Business Website

Static four-page Essential website for Professional Pool Care LLC, also known as PPC LLC.

Production domain: `https://professionalpoolcare.com`

Canonical host: `professionalpoolcare.com`

Cloudflare should redirect `https://www.professionalpoolcare.com` to `https://professionalpoolcare.com`. Do this at the Cloudflare edge; do not add a client-side redirect.

## Public Site Structure

The only promoted marketing pages are:

- `index.html`: homepage with commercial positioning, concise service overview, credibility content, Properties We Serve, and service request call to action.
- `services.html`: PPC's eight approved service categories organized into Maintenance, Equipment & Restoration, and Urgent & Operational Support.
- `about.html`: company identity, Las Vegas history, commercial focus, and property-team communication.
- `contact.html`: accessible commercial service-request form.

`privacy.html` and `terms.html` are concise legal utility pages. They are linked only in the footer, marked `noindex`, and are not promoted as marketing pages.

Primary navigation and the compact footer promote only Home, Services, About, and Contact.

## Approved PPC Information

The public site uses the following approved information:

- Company: Professional Pool Care LLC.
- Brand: PPC LLC.
- Tagline: PPC LLC, The Difference Is Clear.
- Phone: 702-357-7027.
- Email: Adria@ProfessionalPoolCare.com.
- Office hours: Monday-Friday, 8:00 AM-4:00 PM.
- Service area: Greater Las Vegas Area.
- Company background: Family owned and operated in Las Vegas since 2003.

The site does not publish a street address, license number, certification number, insurance claim, bonding claim, 24/7 availability claim, response-time guarantee, regulatory guarantee, inspection approval guarantee, or reopening guarantee.

## Services

The Services page includes exactly these approved commercial services:

- Commercial Pool Maintenance.
- Commercial Spa Maintenance.
- Equipment Repair & Troubleshooting.
- Chemical Feed & Automation Support.
- Acid Washing & Surface Restoration.
- Emergency Service & Bio Cleanup.
- Certified Pool Operator (CPO) Services.
- Inspection-Readiness & Compliance Support.

One concise regulatory scope note remains: PPC supports maintenance and inspection readiness. Property owners and operators remain responsible for applicable regulatory requirements.

## Contact Form

The contact form posts to the Cloudflare Worker route `/contact-request`.

Repository-side implementation is complete:

- Accepts only POST submissions from the PPC contact form.
- Validates required fields server-side.
- Requires name, company/property, either email or phone, service needed, message, and privacy consent.
- Preserves the honeypot field.
- Rejects invalid submissions.
- Does not expose secrets client-side.
- Does not create an open email relay.
- Sends notifications only to `Adria@ProfessionalPoolCare.com`.
- Returns JSON for JavaScript submissions and simple HTML for conventional POST fallback.
- Fails gracefully with PPC phone/email fallback if Cloudflare Email Service is not available.

The Wrangler binding is named `PPC_CONTACT_EMAIL` and is restricted to the destination `Adria@ProfessionalPoolCare.com`.

Required Cloudflare dashboard action before public launch: configure Cloudflare Email Service for `professionalpoolcare.com` and verify that the Worker `send_email` binding can send from and to `Adria@ProfessionalPoolCare.com`.

## SEO And Domain

Canonical URLs, Open Graph URLs, `sitemap.xml`, and `robots.txt` use `https://professionalpoolcare.com`.

Core canonical URLs:

- Home: `https://professionalpoolcare.com/`
- Services: `https://professionalpoolcare.com/services.html`
- About: `https://professionalpoolcare.com/about.html`
- Contact: `https://professionalpoolcare.com/contact.html`
- Privacy: `https://professionalpoolcare.com/privacy.html`
- Terms: `https://professionalpoolcare.com/terms.html`

`sitemap.xml` lists only the four indexable marketing pages. The utility legal pages are intentionally `noindex`.

No active FAQPage schema, industry-specific landing-page architecture, expanded local SEO package, advanced schema strategy, GEO package, or AI-answer optimization package is included in the Essential build.

## Photography

The current site uses representative commercial photography. It does not identify the photographs as PPC projects and does not pair them with real customer names.

The only remaining normal content task is replacing representative photography with approved PPC/customer photos. See `images/README.md` for the placement-by-placement replacement map.

Customer/property showcase rules:

- Use a real customer or property name only with written approval.
- Use website/customer-provided photos only with permission.
- If naming permission is unavailable, use neutral property-type labels.
- Do not imply PPC owns customer properties.
- Do not imply representative stock photos are PPC customers.
- All future photos must be commercial.
- No residential backyard pools.
- Water-testing photography is not required.

## Expanded-Tier Material Retained

Expanded-package source work is preserved in `archive/expanded/`:

- Industries page.
- Our Work and gallery-style pages.
- Expanded FAQ page and FAQPage schema.
- Dedicated Commercial Pool Service Las Vegas search landing page.

These files are marked `noindex`, have no links from the Essential site, are absent from `sitemap.xml`, and are excluded from the production `dist/` artifact. They remain available in source control for a possible future package upgrade.

The public Essential site does not ship standalone Industries, Our Work, Gallery, FAQ, case-study, industry-specific SEO, advanced schema, GEO, or AI-search deliverables.

## Build And Deployment

The Cloudflare Worker serves the static asset directory `./dist` and handles only the form route separately.

Local checks:

```sh
npm clean-install
npm run build
npm test
npm run test:screenshots
node --check script.js
git diff --check
npx wrangler deploy --dry-run
```

The build uses an explicit allowlist for the four marketing pages, two utility pages, shared assets, crawler files, and `.nojekyll`. Source archives, tests, reports, internal screenshots, and project files are not published.

## FINAL PPC LAUNCH CHECKLIST

PHOTOS:

- Receive approved PPC/customer commercial images.
- Replace representative images according to `images/README.md`.
- Optimize images and responsive derivatives.
- Verify alt text.
- Verify written naming and photo-use permissions.

External launch actions:

- Configure/verify the Cloudflare Email Service domain and Worker email binding for `Adria@ProfessionalPoolCare.com`.
- Verify Adria receives a real test submission.
- Remove or disable the PPC Preview Access application or policy in Cloudflare Access.
- Confirm anonymous visitors can load the public site.
- Verify `https://professionalpoolcare.com`.
- Verify `https://www.professionalpoolcare.com` redirects to `https://professionalpoolcare.com`.
- Verify HTTPS.
- Submit the sitemap/search-console later if desired.
