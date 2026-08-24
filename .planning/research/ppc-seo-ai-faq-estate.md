# PPC SEO, AI Search, FAQ, and Crawler Guidance

Date: 2026-08-24
Scope: Current primary-source guidance relevant to a static local-service website, visible FAQ content, structured data, sitemap/indexing, and AI crawler access.

## Findings

### 1. Google AI search does not require a special GEO file or proprietary schema

- Finding: Google states that the same foundational SEO requirements apply to AI Overviews and AI Mode. Pages must be indexable and snippet-eligible; important content should be available as text; internal links should make it discoverable; and structured data should match visible content. Google explicitly says no special AI schema or machine-readable file is required.
- Source: https://developers.google.com/search/docs/appearance/ai-features
- Confidence: High (current Google Search Central documentation, updated 2025-12-10 and surfaced in the August 2026 audit).
- Action: Prefer direct, visible, answer-first service and entity language, good internal links, crawlability, and accurate schema. Do not add `llms.txt` or claim a special GEO ranking mechanism.

### 2. Google FAQ rich results are deprecated, but visible FAQ content remains useful

- Finding: Google deprecated the FAQ rich-result feature effective May 7, 2026 and removed its documentation in June 2026. Earlier guidance already restricted the visual treatment to authoritative government and health sites. This affects the Google search presentation, not whether clear visible FAQs help visitors and retrieval systems understand a business.
- Sources: https://developers.google.com/search/updates and https://developers.google.com/search/blog/2023/08/howto-faq-changes
- Confidence: High (current Google Search Central changelog and official announcement).
- Action: Build a visible, crawlable FAQ for customer usefulness and semantic answerability. If `FAQPage` is retained for schema.org consumers, keep one block on the FAQ page only and require exact visible-content parity; do not describe it as eligible for a Google rich result.

### 3. Organization markup belongs on one authoritative page and should be selective

- Finding: Google recommends `Organization` data on the home page or one organization-focused page, not every page. It can help disambiguate the entity and specify its preferred logo. There are no required properties; accuracy is more important than completeness. `name`, `url`, `logo`, `telephone`, and an applicable `foundingDate` are supported, while an address should only be supplied if it actually applies.
- Source: https://developers.google.com/search/docs/appearance/structured-data/organization
- Confidence: High (current Google Search Central documentation).
- Action: Add one compact home-page Organization entity using only verified PPC facts, with a stable `@id`. Omit address, coordinates, ratings, reviews, price range, and unverified profiles.

### 4. LocalBusiness markup is location-oriented and should not imply a storefront

- Finding: Google's LocalBusiness documentation asks publishers to define each physical location and recommends the most specific supported subtype. The repository and approved brief do not provide a public address or storefront.
- Source: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Confidence: High for Google's LocalBusiness requirements; High for the repository's absence of a supported address.
- Action: Use `Organization` rather than manufacturing a storefront-style LocalBusiness location. Express local relevance through accurate `areaServed`, visible Greater Las Vegas language, and service schema.

### 5. Service schema can describe provider, type, and service area without offers

- Finding: Schema.org defines `Service` for services supplied by an organization and supports `provider`, `areaServed`, and `serviceType`. Google does not document Service as a dedicated rich-result feature, so it should be used as concise semantic description rather than as a ranking or rich-result promise.
- Source: https://schema.org/Service
- Confidence: High for vocabulary; Medium for retrieval impact because search engines do not promise a Service rich result.
- Action: Use a compact graph on the Services page only, reference PPC's home-page `@id`, name supported service groups, and omit prices, offers, reviews, ratings, or availability promises.

### 6. Structured data must represent visible content and must not be misleading

- Finding: Google's general structured-data guidelines require markup to represent the page's main content and warn against hidden, incorrect, or misleading data. JSON-LD is Google's recommended format.
- Source: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Confidence: High (current Google Search Central policy).
- Action: Validate every JSON-LD block as JSON, assert visible/schema parity in tests, and avoid schema-only claims or duplicated entity blocks.

### 7. Sitemaps should contain canonical, indexable URLs

- Finding: Google recommends fully qualified canonical URLs in a root sitemap and says to include URLs intended for search results. A robots.txt sitemap directive is a supported discovery method.
- Source: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Confidence: High (current Google Search Central documentation).
- Action: Add the new indexable FAQ canonical URL to the XML sitemap. Keep noindex legal pages out of the sitemap and preserve the production-domain robots sitemap directive.

### 8. Distinct, concise page titles and descriptions remain foundational

- Finding: Google recommends a unique, descriptive, concise title for every page and discourages boilerplate or keyword repetition. Search snippets may use the meta description when it best describes the page.
- Sources: https://developers.google.com/search/docs/appearance/title-link and https://developers.google.com/search/docs/appearance/snippet
- Confidence: High (current Google Search Central documentation).
- Action: Give each public page a distinct human-readable title and description, keep Open Graph fields aligned with page intent, and avoid exact-match keyword lists.

### 8a. WebSite markup can provide a preferred site name

- Finding: Google documents `WebSite` structured data on the home page as the primary way to indicate a preferred site name and optional alternate name. It must describe the same site and use the canonical home URL.
- Source: https://developers.google.com/search/docs/appearance/site-names
- Confidence: High (current Google Search Central documentation).
- Action: Include one compact `WebSite` node in the home-page graph, linked to the Organization publisher, with `Professional Pool Care LLC` and `PPC LLC` only.

### 9. Current generic robots policy allows major search and AI search crawlers

- Finding: The repository's `User-agent: * / Allow: /` policy does not single out or block Googlebot, Bingbot, OAI-SearchBot, GPTBot, Claude-SearchBot, Claude-User, or ClaudeBot. Google and Bing obey generic robots rules. OpenAI distinguishes OAI-SearchBot (ChatGPT search), GPTBot (model training), and ChatGPT-User (user-triggered access); OpenAI notes that robots.txt may not apply to user-initiated ChatGPT-User requests. Anthropic likewise distinguishes Claude-SearchBot, ClaudeBot, and Claude-User.
- Sources: https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers, https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0, https://developers.openai.com/api/docs/bots, and https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- Confidence: High for site-level robots posture. Account/CDN bot policies are outside scope and were not inspected.
- Action: Leave the simple allow-all site policy unchanged. Report that it permits robots-controlled AI search and training crawlers; separating search access from model-training access is a future owner policy choice, not an SEO defect. CDN, hosting, firewall, and account-level bot controls were not inspected and remain outside this site-level audit.

## Repository Audit

### Public-page and metadata baseline

- The deployed source set contains seven HTML pages: Home, Services, Properties, About, Contact, Privacy, and Terms. `scripts/build.mjs` explicitly publishes all seven.
- The five indexable marketing pages each have one unique title, one unique meta description, one production-domain canonical, matching `og:url`, and Open Graph title/description/image fields. They also include `twitter:card`. These are currently enforced by `tests/site.spec.js`.
- Privacy and Terms each have one production canonical and intentional `noindex, follow`, but lack Open Graph fields. They are public utility pages rather than intended landing pages.
- The Properties title, `Properties We Serve | PPC LLC`, is the least descriptive title because it omits both the service and Las Vegas context present in the page H1 and description.
- No current public page includes `og:site_name` or `og:image:alt`. This is a consistency opportunity, not an indexing blocker.
- No current public page contains JSON-LD. The schema baseline is exactly zero blocks.
- Each of the seven deployed pages has exactly one H1. Services has three logical H2 service groups and nine crawlable H3 service names with stable fragment IDs.

### Verified entity facts and repository sources

- Name: `Professional Pool Care LLC`, present in every header/footer and explicitly connected to `PPC LLC` on About.
- Telephone: `702-357-7027`, consistently linked as `tel:+17023577027` in every footer and Contact.
- Email: `Adria@ProfessionalPoolCare.com`, consistently linked as `mailto:Adria@ProfessionalPoolCare.com` in every footer and Contact.
- Service area: `Greater Las Vegas Area`, repeated across all marketing pages and shared footers.
- History: `Family owned and operated in Las Vegas since 2003.`, repeated exactly in every footer; the user separately approved this as the Established fact for structured-data consideration.
- Tagline: `PPC LLC, The Difference Is Clear.`, repeated in every footer and on About.
- Published office/contact hours: `Monday-Friday, 8:00 AM-4:00 PM`, repeated in every footer and Contact. These are not represented as physical storefront hours.
- Not present or supported: street address, coordinates, license, bonded/insured status, round-the-clock availability, guarantees, awards, ratings, reviews, prices, or official social profiles.

### Service and FAQ source facts

- Services visibly covers commercial pool maintenance, commercial spa maintenance, equipment repair and troubleshooting, chemical feed and automation support, acid washing and surface restoration, pool deck cleaning, emergency service and bio cleanup, Certified Pool Operator services, and inspection-readiness/compliance support.
- Existing service fragments are: `#commercial-pool-maintenance`, `#commercial-spa-maintenance`, `#equipment-repair-troubleshooting`, `#chemical-feed-automation-support`, `#acid-washing-surface-restoration`, `#pool-deck-cleaning`, `#emergency-service-bio-cleanup`, `#certified-pool-operator-services`, and `#inspection-readiness-support`.
- Existing copy supports answers about commercial property types, Greater Las Vegas service area, CPO coverage, equipment/water-quality troubleshooting, automation, deck cleaning, emergency and contamination support, inspection readiness, acid washing, facility coordination, request methods, frequency factors, and Las Vegas operating conditions.
- The user has newly authorized large private estates as a supported service category and supplied the residential-positioning boundary. Estate answers must be treated as newly approved content, not inferred from the pre-change repository.
- The archived FAQ is not a safe source to copy: it uses Neraium URLs, broader Southern Nevada language, SNHD-specific wording, removed navigation, and obsolete form-field assumptions.

### Sitemap, robots, and internal discovery

- `sitemap.xml` currently contains exactly five fully qualified canonical URLs: Home, Services, Properties, About, and Contact. Privacy and Terms are correctly omitted because they are noindex.
- `robots.txt` contains a generic allow-all rule and the production sitemap URL. It blocks no major robots-controlled search or AI crawler at the repository level.
- Existing internal links and fragments pass the baseline Playwright resolver test. Primary and footer navigation contain the same five marketing pages; no live FAQ link exists.
- Homepage service cards link to three group-level service fragments, but the other individual service anchors have no contextual inbound links. A focused FAQ can improve discovery without linking every paragraph.
- Header/footer Home links use `index.html` while the canonical is `/`; this is a mild duplicate-signal inconsistency rather than a broken link.
- `archive/expanded/` is explicitly noindexed and excluded from the production build. Its `faq.html` name is currently part of the archived-page exclusion tests and must be separated from the new root FAQ registration.

### Image SEO and exact launch-safeguard posture

- Main-content images use descriptive filenames, nonempty subject-focused alt text, intrinsic `width`/`height`, and lazy loading below the hero. The home hero uses `fetchpriority="high"`, responsive `srcset`, and no lazy loading. The empty logo alt is appropriate because the link has an accessible name and visible adjacent business name.
- All Open Graph images are production-domain URLs. No `og:image:alt` is currently present.
- Seven property images are temporary web-sourced references under `images/temp-property-reference/`. Their current alt describes the visible scene without claiming the image depicts a PPC customer relationship.
- `scripts/build.mjs` intentionally copies those seven temporary images into `dist/`. `scripts/check-production-readiness.mjs` scans both source and built text/assets for the temporary path/name pattern.
- The baseline `npm run test:production-ready` is intentionally expected to fail until approved images replace every temporary reference; the deploy script invokes this guard before deployment, and `tests/site.spec.js` verifies the failure message and affected Home/Properties sources.
- Two representative JPEGs used only by archived pages are also copied into `dist`; removing them would be a minor build cleanup but is outside the requested SEO/FAQ pass and would not materially change page performance.

## Implementation Guardrails

- Use visible HTML for all business-critical answers; no schema-only FAQ or client-only FAQ rendering.
- Keep one Organization entity and one Services-page graph rather than duplicating them on every page.
- Keep the estate category narrow: large private estates, estate pools and spas, and estate aquatic facilities; explicitly contrast this with routine residential service.
- Preserve `noindex, follow` on Privacy and Terms and keep them out of the sitemap.
- Keep the existing launch-blocking temporary-property-image safeguard unchanged and register the new FAQ source in its public-source scan list.
- Do not add crawler-specific rules unless the owner makes an explicit training-access policy choice.
