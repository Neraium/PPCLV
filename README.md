# PPC LLC Essential Business Website

Static five-page Essential website for Professional Pool Care LLC, also known as PPC LLC.

Production domain: `https://professionalpoolcare.com`

Canonical host: `professionalpoolcare.com`

Cloudflare should redirect `https://www.professionalpoolcare.com` to `https://professionalpoolcare.com`. Do this at the Cloudflare edge; do not add a client-side redirect.

## Public Site Structure

The only promoted marketing pages are:

- `index.html`: homepage with commercial positioning, concise service overview, credibility content, a four-image work-gallery preview, and service request call to action.
- `services.html`: PPC's nine approved service categories organized into Maintenance, Equipment & Restoration, and Urgent & Operational Support.
- `properties.html`: public Gallery page with seven image-led examples of commercial pool and spa environments across Greater Las Vegas; the stable filename is retained to avoid link churn.
- `about.html`: company identity, Las Vegas history, commercial focus, and property-team communication.
- `contact.html`: accessible commercial service-request form.

`privacy.html` and `terms.html` are concise legal utility pages. They are linked only in the footer, marked `noindex`, and are not promoted as marketing pages.

Primary navigation and the compact footer promote Home, Services, Gallery, About, and Contact.

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
- Pool Deck Cleaning.
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
- Fails gracefully with PPC phone/email fallback if Zoho is unavailable.
- Uses Zoho Mail's HTTPS API from the Worker, so it does not require raw SMTP, Cloudflare Email Sending, or Workers Paid.
- Refreshes short-lived OAuth access tokens server-side from a least-privilege `ZohoMail.messages.CREATE` grant.
- Keeps the sender and recipient fixed server-side as `Adria@ProfessionalPoolCare.com`.
- Validates the visitor's email and includes it as an escaped, clickable `mailto:` link in the notification body when provided.
- Does not send an undocumented per-message Reply-To field or change the Zoho mailbox's account-level Reply-To setting.

Required Worker secrets:

- `ZOHO_CLIENT_ID`
- `ZOHO_CLIENT_SECRET`
- `ZOHO_REFRESH_TOKEN`
- `ZOHO_ACCOUNT_ID`

Optional Worker variable:

- `ZOHO_DATA_CENTER` defaults to `us`. Set it only if the mailbox is hosted elsewhere. Supported values are `us`, `eu`, `in`, `au`, `jp`, `ca`, `cn`, `ae`, and `sa`.

One-time production setup:

1. Sign in to the Adria Zoho mailbox and note the data center from the Mail URL. For example, `mail.zoho.com` is `us` and `mail.zoho.eu` is `eu`. Do not change the existing Zoho MX, SPF, or DKIM records.
2. In the matching regional Zoho API Console, create a Self Client. Generate a temporary code with `ZohoMail.accounts.READ`, exchange it for tokens, call the matching regional `GET /api/accounts`, and record the `accountId` whose `primaryEmailAddress` is `Adria@ProfessionalPoolCare.com`. Revoke the temporary account-read refresh token afterward.
3. In the same Self Client, generate a new authorization code with only `ZohoMail.messages.CREATE`. Exchange it before it expires and retain its `refresh_token`. Do not retain the one-hour access token.
4. From an authenticated terminal, run `npx wrangler secret put` once for each required secret name above. If the mailbox is not in the US data center, also set `ZOHO_DATA_CENTER` as a Worker variable in Cloudflare Workers & Pages > ppclv > Settings > Variables and Secrets.
5. After the production-readiness guard passes, deploy with `npm run deploy`, submit one real contact request, and confirm it appears in the Zoho mailbox and its existing Gmail forwarding destination. `npm run deploy` rebuilds, checks for legacy temporary-image references, and only then invokes Wrangler. If terminal authentication is unavailable, push the verified production-ready commit to `origin/main`; the configured Cloudflare Git deployment will build and deploy from `main` without an interactive Wrangler login.

The implementation sends escaped, readable HTML and includes the validated visitor email as a safe mail link when available. Zoho's official send-message API does not document a per-message Reply-To field, so the Worker deliberately does not depend on one.

The production delivery check remains external because the four secret values are not stored in this repository. After deployment, submit one real request using an address the tester can access, confirm the message arrives at `Adria@ProfessionalPoolCare.com` and the existing Gmail forwarding destination, and confirm the visitor address is readable and clickable in the message body. Do not print, log, or copy secret values into test output.

## SEO And Domain

Canonical URLs, Open Graph URLs, `sitemap.xml`, and `robots.txt` use `https://professionalpoolcare.com`.

Core canonical URLs:

- Home: `https://professionalpoolcare.com/`
- Services: `https://professionalpoolcare.com/services.html`
- Gallery: `https://professionalpoolcare.com/properties.html`
- About: `https://professionalpoolcare.com/about.html`
- Contact: `https://professionalpoolcare.com/contact.html`
- Privacy: `https://professionalpoolcare.com/privacy.html`
- Terms: `https://professionalpoolcare.com/terms.html`

`sitemap.xml` lists only the five indexable marketing pages. The utility legal pages are intentionally `noindex`.

No active FAQPage schema, industry-specific landing-page architecture, expanded local SEO package, advanced schema strategy, GEO package, or AI-answer optimization package is included in the Essential build.

## Photography

The current website content and photography are approved by PPC for production use. Approved public images are stored under `images/production/` with neutral filenames. The site presents them as generic examples of PPC service environments without publicly identifying customer accounts.

See `images/README.md` for internal source provenance, retrieval dates, production filenames, placements, and crop/alt-text guidance. Source identities remain internal and are not public customer/property labels. The production-readiness check rejects any legacy temporary path or filename:

```sh
npm run test:production-ready
```

Future image changes can be installed without another layout or design pass when dimensions and subject placement remain compatible.

Gallery safeguards:

- Do not display individual customer or property names in public gallery copy, captions, alt text, metadata, or schema.
- Keep the current production approval recorded factually as: “Approved by PPC for production website use.”
- Source identities may remain in internal rights documentation but must not be copied into public content.
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

The public Essential site now ships Gallery and FAQ within its core five-page marketing journey. It does not ship standalone Industries, case-study, industry-specific SEO, advanced schema, GEO, or AI-search deliverables.

## Build And Deployment

The Cloudflare Worker serves the static asset directory `./dist` and handles only the form route separately.

The site uses the same conservative security-header set for both static assets and Worker-generated form responses: `_headers` covers Cloudflare static asset delivery, while the Worker applies the matching headers to its own responses and proxied assets. The policy includes a self-restricted CSP, clickjacking protection, MIME sniffing protection, a strict-origin referrer policy, and a limited Permissions Policy. HSTS is intentionally not guessed in repository code; enable or confirm it at the Cloudflare zone only after HTTPS behavior for the apex and `www` host has been verified.

Local checks:

```sh
npm clean-install
npm run build
npm test
npm run test:e2e
npm run test:screenshots
npm run test:production-ready
node --check script.js
git diff --check
npm run deploy -- --dry-run
```

The build uses an explicit allowlist for the five marketing pages, two utility pages, shared assets, crawler files, the approved production imagery, and the Cloudflare `_headers` file. Source archives, tests, reports, internal screenshots, and project files are not published. The production-readiness check continues to reject legacy temporary image paths and filenames.

## FINAL PPC LAUNCH CHECKLIST

PHOTOS:

- Current website photography is approved by PPC for production website use.
- Approved imagery uses neutral production filenames under `images/production/`.
- Public Gallery copy, captions, alt text, metadata, and schema do not identify individual customer/property names.
- Internal provenance remains documented in `images/README.md`.
- Require `npm run test:production-ready` to pass before deployment.

External launch actions:

- In the Cloudflare dashboard, confirm the Worker lists exactly the four required Zoho secret names: `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, `ZOHO_REFRESH_TOKEN`, and `ZOHO_ACCOUNT_ID`. Secret values are intentionally not readable after creation.
- Confirm the Cloudflare Git deployment from `main` completes after the final push.
- Submit one real contact request and verify Adria receives it, the existing Gmail forwarding receives it, and the validated visitor email appears as a safe mail link in the message body.
- Remove or disable the PPC Preview Access application or policy in Cloudflare Access.
- Confirm anonymous visitors can load the public site.
- Verify `https://professionalpoolcare.com`.
- Verify `https://www.professionalpoolcare.com` redirects to `https://professionalpoolcare.com`.
- Verify HTTPS.
- After both production hosts are verified on HTTPS, confirm the intended Cloudflare-zone HSTS setting; do not infer it from local Worker tests.
- Submit the sitemap/search-console later if desired.

## Launch-Readiness Review

### A. MUST FIX BEFORE PUBLIC LAUNCH

- Configure and confirm the four exact Worker secrets, deploy the final `main` build, and complete the real Zoho delivery/forwarding check described above.
- Remove the Cloudflare Access preview restriction, then verify anonymous apex-domain access, the `www` redirect, and HTTPS from outside the authenticated preview session.

### B. OPTIONAL POLISH

- Submit `sitemap.xml` to the preferred search-console account after public access is enabled.
- Review the final image crops on physical iOS and Android devices after approved photography is installed.

### C. FUTURE IMPROVEMENTS

- Add privacy-conscious analytics and conversion tracking only after vendor and consent decisions are approved.
- Add testimonials, customer/property logos, and case studies only with written permission.
- Consider service-area landing pages, structured inquiry routing, and a lightweight content-maintenance workflow after launch.
- Add independent uptime and contact-form delivery monitoring after the production delivery path is established.

## FINAL HANDOFF

- Production URL: `https://professionalpoolcare.com`
- Repository: `https://github.com/Neraium/PPCLV`
- Build command: `npm run build`
- Deployment: Cloudflare Worker/static assets, with production updates from `main`
- Contact form endpoint: `/contact-request`
- Image provenance: `images/README.md`
- Gallery route: `properties.html`
