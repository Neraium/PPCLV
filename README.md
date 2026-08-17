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
- Fails gracefully with PPC phone/email fallback if Zoho is unavailable.
- Uses Zoho Mail's HTTPS API from the Worker, so it does not require raw SMTP, Cloudflare Email Sending, or Workers Paid.
- Refreshes short-lived OAuth access tokens server-side from a least-privilege `ZohoMail.messages.CREATE` grant.
- Keeps the sender and recipient fixed server-side as `Adria@ProfessionalPoolCare.com`.
- Uses the visitor's server-validated email as the per-message Reply-To when an email is provided; phone-only requests omit Reply-To.

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
5. Deploy with `npm run build && npx wrangler deploy`, submit one real contact request, and confirm it appears in the Zoho mailbox and its existing Gmail forwarding destination. If terminal authentication is unavailable, push the verified commit to `origin/main`; the configured Cloudflare Git deployment will build and deploy from `main` without an interactive Wrangler login.

The implementation sends escaped, readable HTML and includes the validated visitor email as both a mail link and the per-message Reply-To when available.

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

- In the Cloudflare dashboard, confirm the Worker lists all four required Zoho secret names. Secret values are intentionally not readable after creation.
- Confirm the Cloudflare Git deployment from `main` completes after the final push.
- Verify Adria receives a real test submission.
- Remove or disable the PPC Preview Access application or policy in Cloudflare Access.
- Confirm anonymous visitors can load the public site.
- Verify `https://professionalpoolcare.com`.
- Verify `https://www.professionalpoolcare.com` redirects to `https://professionalpoolcare.com`.
- Verify HTTPS.
- Submit the sitemap/search-console later if desired.
