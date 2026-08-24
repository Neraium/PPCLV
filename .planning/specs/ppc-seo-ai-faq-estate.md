# PPC SEO, AI Search, FAQ, and Estate Implementation Specification

Date: 2026-08-24
Campaign: `.planning/campaigns/ppc-seo-ai-faq-estate.md`

## Content and Positioning Decisions

- Keep the primary header at its existing five links. Add FAQ to every footer plus contextual links from Home, Services, Contact, and FAQ itself.
- Keep every commercial-first H1 except where a descriptive local-service refinement improves page intent. Do not use residential-service language in titles, headings, navigation, or service names.
- Add large private estates only in subordinate Home, Services, About, Contact, and FAQ copy. Every broad property list that includes estates must also foreground commercial aquatic facilities or managed properties.
- Use this residential boundary exactly in the FAQ: `PPC's primary focus is commercial aquatic facilities and large private estates rather than routine residential pool service.`
- Replace the unsupported pool-deck phrase `pool-, deck-, and décor-safe` with this exact paragraph: `Commercial pool deck power washing using cleaning solutions selected for compatibility with pool areas, deck surfaces, and surrounding décor, focused on helping remove dirt, buildup, organic debris, and surface staining. Surface material and condition affect compatibility and results, and complete stain removal is not promised.`
- Do not change property names, property imagery, customer implications, business contact facts, service availability terms, or contact processing.

## New FAQ Page

- Route: `faq.html`
- Metadata intent: Commercial Pool & Spa Service FAQ in Las Vegas; production canonical and Open Graph URL; indexable; one H1.
- Design: existing light-blue page hero, a narrow two-column desktop FAQ layout that collapses to one column, native `<details>/<summary>`, 48px minimum summary target, navy/blue/gold palette, border-only cards, no dependency or custom accordion JavaScript.
- Crawl/accessibility: every answer exists in server-delivered HTML; native details are keyboard operable; summary has a visible focus state; no answer is client-generated.
- Structured data: one `FAQPage` JSON-LD block on `faq.html` only. All 20 Question/Answer strings must match visible text after whitespace normalization. This is schema.org semantic markup for compatible consumers, not a Google rich-result promise; Google removed FAQ rich results in May 2026.
- Page footer: standard entity/contact facts, five core marketing links plus FAQ, and Request Service.

## Exact FAQ Content, IDs, and Contextual Links

The visible answer text below is final. FAQPage `Answer.text` values must match it after whitespace normalization. Links may wrap the named phrases without changing their text.

1. ID `types-commercial-pools-spas`
   - Question: `What types of commercial pools and spas does PPC service?`
   - Answer: `Professional Pool Care LLC services commercial pools, commercial spas, and aquatic facilities for resorts, hotels, hospitality properties, communities, casinos, and other managed properties. Separately, PPC also supports estate pools, spas, and aquatic facilities at large private estates when the property's needs fit PPC's service scope.`
   - Links: `commercial pools` to `services.html#commercial-pool-maintenance`; `commercial spas` to `services.html#commercial-spa-maintenance`.
2. ID `service-area`
   - Question: `What areas does Professional Pool Care LLC serve?`
   - Answer: `Professional Pool Care LLC serves commercial aquatic facilities and large private estates throughout the Greater Las Vegas Area. Specific property needs and service availability are confirmed when PPC reviews a request.`
3. ID `cpo-services`
   - Question: `Does PPC provide Certified Pool Operator (CPO) services?`
   - Answer: `Yes. PPC provides Certified Pool Operator (CPO) services for commercial aquatic facilities that need qualified operational oversight, routine documentation, water-quality management, service logs, and inspection-readiness support.`
   - Link: `Certified Pool Operator (CPO) services` to `services.html#certified-pool-operator-services`.
4. ID `equipment-troubleshooting-repair`
   - Question: `Does PPC handle commercial pool equipment troubleshooting and repair?`
   - Answer: `Yes. PPC reviews commercial pool and spa equipment concerns involving circulation, filtration, heating, chemical delivery, and facility operation, then communicates practical repair or service next steps.`
   - Link: `equipment troubleshooting and repair` to `services.html#equipment-repair-troubleshooting`.
5. ID `chemical-feed-automation`
   - Question: `Does PPC service chemical feed and pool automation systems?`
   - Answer: `Yes. PPC provides observation and troubleshooting support for chemical feeders, controllers, and pool automation interfaces, with clear reporting when settings, delivery, or equipment condition need attention.`
   - Link: `chemical feed and pool automation systems` to `services.html#chemical-feed-automation-support`.
6. ID `pool-deck-cleaning`
   - Question: `Does PPC provide pool deck cleaning?`
   - Answer: `Yes. PPC provides commercial pool deck power washing focused on helping remove dirt, buildup, organic debris, and surface staining. Cleaning methods and results depend on the deck material and condition.`
   - Link: `pool deck cleaning` to `services.html#pool-deck-cleaning`.
7. ID `deck-cleaning-method`
   - Question: `How does PPC clean commercial pool decks?`
   - Answer: `PPC uses commercial pool deck power washing with cleaning solutions selected for compatibility with pool areas, deck surfaces, and surrounding décor, focused on removing dirt, buildup, organic debris, and surface staining. Surface condition and material affect compatibility and results, so complete stain removal is not promised.`
   - Link: `commercial pool deck power washing` to `services.html#pool-deck-cleaning`.
8. ID `emergency-service`
   - Question: `Does PPC provide emergency pool and spa service?`
   - Answer: `Yes. PPC accepts requests for emergency commercial pool and spa service, including urgent water-quality, circulation, equipment, or biological contamination concerns; similar support may be available for large private estates. Timing and scope are subject to service availability.`
   - Link: `emergency commercial pool and spa service` to `services.html#emergency-service-bio-cleanup`.
9. ID `biological-contamination`
   - Question: `Does PPC handle biological contamination and bio cleanup?`
   - Answer: `Yes. PPC provides bio cleanup support for biological contamination concerns, which may include water care, filtration attention, recovery coordination, operational checks, and clear communication with the property team.`
   - Link: `bio cleanup support` to `services.html#emergency-service-bio-cleanup`.
10. ID `inspection-readiness`
    - Question: `Can PPC help prepare a commercial pool or spa for inspection?`
    - Answer: `Yes. PPC can provide maintenance attention, equipment observations, documentation, and inspection-readiness support to help a property team prepare for applicable health and safety reviews. Property owners and operators remain responsible for regulatory requirements and compliance outcomes.`
    - Link: `inspection-readiness support` to `services.html#inspection-readiness-support`.
11. ID `acid-washing-restoration`
    - Question: `Does PPC provide acid washing and surface restoration?`
    - Answer: `Yes. PPC provides planned acid washing and surface restoration for commercial pools and spas affected by scale, staining, or buildup. The appropriate treatment depends on the surface and its condition.`
    - Link: `acid washing and surface restoration` to `services.html#acid-washing-surface-restoration`.
12. ID `operating-schedules`
    - Question: `Can PPC work around hotel, resort, HOA, community, and facility operating schedules?`
    - Answer: `PPC coordinates service with facility access, guest or resident use, and day-to-day operating priorities in mind. Specific timing and access arrangements are confirmed with each property.`
13. ID `request-service`
    - Question: `How do I request commercial pool or spa service from PPC?`
    - Answer: `Submit the PPC service request form, call 702-357-7027, or email Adria@ProfessionalPoolCare.com. Include the property, service need, and a way for PPC to contact you.`
    - Links: `service request form` to `contact.html#quote`; exact phone/email to their current protocols.
14. ID `residential-pools`
    - Question: `Does PPC service residential pools?`
    - Answer: `PPC's primary focus is commercial aquatic facilities and large private estates rather than routine residential pool service. For a residence with a large estate pool or spa system, contact PPC to discuss whether the property's needs fit PPC's service scope.`
    - Link: `contact PPC` to `contact.html#quote`.
15. ID `private-estates`
    - Question: `Does PPC service private estates?`
    - Answer: `Yes. In addition to commercial aquatic facilities, Professional Pool Care LLC can provide pool and spa service for large private estates in the Greater Las Vegas Area. Applicable services may include water care, equipment support, chemical automation, deck cleaning, spa service, and other PPC services based on the property's needs.`
    - Link: `large private estates` to `services.html#large-private-estates`.
16. ID `estate-services`
    - Question: `What types of services can PPC provide for large private estates?`
    - Answer: `PPC can support large private estates with water care, pool and spa equipment support, chemical feed and automation, deck cleaning, spa service, and applicable acid washing or surface restoration. The right service scope depends on the estate's aquatic facilities and operating needs.`
    - Links: `chemical feed and automation` and `deck cleaning` to their Services fragments; `service scope` to `services.html#large-private-estates`.
17. ID `service-frequency`
    - Question: `How often should a commercial pool or spa be serviced?`
    - Answer: `There is no single service frequency for every commercial pool or spa. Facility use, bather load, Las Vegas heat and dust, equipment condition, water-quality demand, and operating needs all affect the appropriate service routine.`
18. ID `cpo-importance`
    - Question: `Why is CPO coverage important for a commercial aquatic facility?`
    - Answer: `CPO coverage provides qualified operational oversight for water-quality management, routine checks, documentation, and early identification of service needs. It can support inspection readiness and clear facility records without replacing the owner's or operator's regulatory responsibilities.`
    - Link: `CPO coverage` to `services.html#certified-pool-operator-services`.
19. ID `water-quality-equipment`
    - Question: `Can PPC troubleshoot water-quality problems as well as equipment issues?`
    - Answer: `Yes. PPC can review water condition and chemistry concerns along with circulation, filtration, heating, chemical delivery, and other equipment issues, then communicate findings and practical next steps.`
    - Links: `water condition` to `services.html#commercial-pool-maintenance`; `equipment issues` to `services.html#equipment-repair-troubleshooting`.
20. ID `property-types`
    - Question: `Does PPC service hotels, resorts, casinos, communities, aquatic facilities, and large private estates?`
    - Answer: `Yes. Professional Pool Care LLC serves hotels, resorts, casinos, communities, commercial aquatic facilities, and large private estates in the Greater Las Vegas Area. The exact service scope depends on the property's facilities, needs, and PPC service availability.`
    - Links: `commercial aquatic facilities` to `properties.html`; `service scope` to `services.html`.

## Home FAQ Preview

- `Does PPC service large private estates?` links to `faq.html#private-estates` and uses the first sentence of FAQ 15 as its preview answer.
- `Does PPC provide CPO services?` links to `faq.html#cpo-services` and uses the first sentence of FAQ 3 as its preview answer.
- `What areas does PPC serve?` links to `faq.html#service-area` and uses `Professional Pool Care LLC serves commercial aquatic facilities and large private estates throughout the Greater Las Vegas Area.`
- `View All FAQs` links to `faq.html`.

## Visible Page Changes

### Home

- Refine metadata for local commercial service plus narrowly scoped large-estate care.
- Add one compact Organization/WebSite JSON-LD graph using the user-approved name, alternate name, URL, logo, phone, email, Greater Las Vegas area, 2003 history, and tagline. Omit address, geo, sameAs, price, ratings, reviews, and credentials.
- Add large-private-estate context to supporting copy without changing the commercial H1.
- Add a compact three-question FAQ preview after Properties and before the closing CTA, linking to relevant FAQ anchors and the full FAQ.

### Services

- Use a clearer local-commercial H1 and answer-first lead naming Professional Pool Care LLC.
- Add a restrained `estate-service-note` after the three existing service groups; keep the nine established service offerings intact.
- Correct Pool Deck Cleaning wording.
- Add one compact Service JSON-LD graph with five supported service categories referencing the home Organization `@id`; include provider and Greater Las Vegas area only, with no Offer, pricing, rating, review, or availability objects.
- Add a secondary FAQ link in the final CTA.

### About

- Refine metadata and supporting copy to explicitly identify PPC's commercial-first service population plus large private estates.
- Add one natural contextual Services link; no new section.

### Contact

- Refine metadata and service-area copy to include large private estates without changing form behavior.
- Add `Large private estate` to the optional Property Type select only; do not add a broad residential option or change server validation.
- Add a contextual FAQ link.

### Properties

- Improve the title to identify Las Vegas commercial pool properties while preserving all approved property content, names, imagery, featured/broader distinction, and production guard.
- Add no estate property/customer claim.

### Privacy and Terms

- Preserve `noindex, follow` and legal content.
- Add complete production Open Graph metadata and `twitter:card` for metadata consistency. Keep these pages out of the sitemap.

## Metadata System

- Every deployed HTML page, including FAQ and both legal pages, must have a unique title, unique meta description, exactly one canonical, `og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `og:image:alt`, `og:site_name`, and `twitter:card`.
- Production origin must be `https://professionalpoolcare.com`; no Neraium, GitHub, localhost, or staging URLs in deployed source/dist.
- Normalize internal Home links from `index.html` to `/` while retaining `index.html` as the built source filename and root-page test alias.

| Page | Title and og:title | Meta and OG description | Canonical and og:url | og:image | og:image:alt |
|---|---|---|---|---|---|
| Home | `Commercial Pool & Spa Service Las Vegas \| PPC LLC` | `Professional Pool Care LLC provides commercial pool and spa maintenance, CPO coverage, equipment support, emergency service, and large-estate care across Greater Las Vegas.` | `https://professionalpoolcare.com/` | `https://professionalpoolcare.com/images/resort-hotel-pool-deck.webp` | `Large commercial resort pool deck with hospitality seating` |
| Services | `Commercial Pool & Spa Services Las Vegas \| PPC LLC` | `Explore PPC commercial pool and spa maintenance, CPO services, equipment repair, automation, deck cleaning, emergency support, and estate service in Greater Las Vegas.` | `https://professionalpoolcare.com/services.html` | `https://professionalpoolcare.com/images/commercial-equipment-room-service.jpg` | `Commercial pool equipment room with pumps and service access` |
| Properties | `Las Vegas Commercial Pool Properties \| PPC LLC` | `Explore featured Las Vegas resorts, communities, and aquatic facilities served by Professional Pool Care LLC across the Greater Las Vegas Area.` | `https://professionalpoolcare.com/properties.html` | `https://professionalpoolcare.com/images/resort-hotel-pool-deck.webp` | `Large commercial resort pool deck with hospitality seating` |
| About | `About Professional Pool Care LLC \| Las Vegas` | `Professional Pool Care LLC is family owned and operated in Las Vegas since 2003, serving commercial aquatic facilities and large private estates.` | `https://professionalpoolcare.com/about.html` | `https://professionalpoolcare.com/images/commercial-equipment-room-service.jpg` | `Commercial pool equipment room with pumps, piping, and service access` |
| Contact | `Request Pool & Spa Service in Las Vegas \| PPC LLC` | `Request commercial pool, spa, CPO, equipment, or large-private-estate service from Professional Pool Care LLC in the Greater Las Vegas Area.` | `https://professionalpoolcare.com/contact.html` | `https://professionalpoolcare.com/images/resort-hotel-pool-deck.webp` | `Large commercial resort pool deck with hospitality seating` |
| FAQ | `Commercial Pool & Spa Service FAQ \| PPC LLC Las Vegas` | `Answers about PPC commercial pool and spa maintenance, CPO coverage, equipment, deck cleaning, emergency service, and large private estates in Las Vegas.` | `https://professionalpoolcare.com/faq.html` | `https://professionalpoolcare.com/images/commercial-water-testing.jpg` | `Water-condition thermometer beside a large commercial pool` |
| Privacy | `Privacy Policy \| PPC LLC` | `Read how Professional Pool Care LLC handles information submitted through its commercial pool and spa service request form.` | `https://professionalpoolcare.com/privacy.html` | `https://professionalpoolcare.com/images/resort-hotel-pool-deck.webp` | `Large commercial resort pool deck with hospitality seating` |
| Terms | `Website Terms \| PPC LLC` | `Read the website terms for Professional Pool Care LLC service information and commercial pool and spa inquiries.` | `https://professionalpoolcare.com/terms.html` | `https://professionalpoolcare.com/images/resort-hotel-pool-deck.webp` | `Large commercial resort pool deck with hospitality seating` |

All pages use `og:site_name = Professional Pool Care LLC`, `og:type = website`, and `twitter:card = summary_large_image`.

## Exact Structured-Data Graphs

### Home graph

- `Organization` ID: `https://professionalpoolcare.com/#organization`
  - Properties: `name`, `alternateName`, `url`, `logo` as `https://professionalpoolcare.com/#logo`, `telephone`, `email`, `foundingDate = 2003`, `areaServed` reference to `https://professionalpoolcare.com/#greater-las-vegas-area`, and `slogan`.
- `ImageObject` ID: `https://professionalpoolcare.com/#logo`
  - Properties: `url`, `contentUrl`, `width = 480`, `height = 320` using the production `images/logo.webp` URL.
- `Place` ID: `https://professionalpoolcare.com/#greater-las-vegas-area`
  - Property: `name = Greater Las Vegas Area` only.
- `WebSite` ID: `https://professionalpoolcare.com/#website`
  - Properties: `url`, `name = Professional Pool Care LLC`, `alternateName = PPC LLC`, and `publisher` reference to the Organization.

No LocalBusiness, address, geo, sameAs, review, rating, price, openingHours, or credential property is permitted.

### Services graph

Use one `@graph` with these five `Service` nodes. Every node uses `provider = {"@id":"https://professionalpoolcare.com/#organization"}` and `areaServed = {"@id":"https://professionalpoolcare.com/#greater-las-vegas-area"}`.

1. ID `https://professionalpoolcare.com/services.html#commercial-maintenance-service`; name `Commercial Pool and Spa Maintenance`; serviceType `Commercial pool maintenance and commercial spa maintenance`.
2. ID `https://professionalpoolcare.com/services.html#equipment-restoration-service`; name `Commercial Pool Equipment and Restoration Support`; serviceType `Equipment troubleshooting and repair, chemical feed and automation support, pool deck cleaning, acid washing, and surface restoration`.
3. ID `https://professionalpoolcare.com/services.html#cpo-operational-service`; name `Certified Pool Operator and Inspection-Readiness Support`; serviceType `Certified Pool Operator services and commercial aquatic facility inspection-readiness support`.
4. ID `https://professionalpoolcare.com/services.html#emergency-commercial-service`; name `Emergency Commercial Pool and Spa Service and Bio Cleanup`; serviceType `Emergency commercial pool service, water-quality recovery, and biological contamination cleanup`.
5. ID `https://professionalpoolcare.com/services.html#estate-pool-spa-service`; name `Large Private Estate Pool and Spa Service`; serviceType `Pool, spa, equipment, automation, deck cleaning, and applicable restoration support for large private estates`.

Each Service may include a concise description only when it directly paraphrases visible Services copy. No Offer, price, review, rating, availability, hours, or guarantee property is permitted.

### FAQ graph

- One top-level `FAQPage` object on `faq.html` with ID `https://professionalpoolcare.com/faq.html#faq`, `url`, `name`, and `mainEntity` containing exactly 20 `Question` nodes.
- Each Question `name` and acceptedAnswer `Answer.text` must use the exact strings in the FAQ section above.
- No FAQPage block appears on Home or any other page.

## Exact Link Placement

- Home: three preview question links and `View All FAQs` as specified above; all existing service/property/request links remain.
- Services: estate note has `id="large-private-estates"`; closing action adds `Read Service FAQ` to `faq.html` beside `Request Service`.
- About: the final sentence of the Commercial Focus copy links descriptive text `commercial pool and spa services` to `services.html`.
- Contact: service-area panel adds `Read the service FAQ` to `faq.html`; optional Property Type adds `Large private estate`.
- FAQ: answer links use the exact mappings above; closing actions link `Request Service` to `contact.html#quote` and `View Services` to `services.html`.
- Every footer: add `FAQ` to `faq.html`; do not add FAQ to the five-link primary header.

## Crawl, Build, and Sitemap

- Add `faq.html` to `scripts/build.mjs` and the production-readiness guard's source list.
- Add only the indexable FAQ canonical to `sitemap.xml`; keep Privacy/Terms omitted.
- Leave `robots.txt` unchanged because the site-level allow-all policy blocks no major search or robots-controlled AI search crawler.
- Keep archived expanded pages noindexed and excluded. Split archived filenames from live FAQ expectations in tests.

## Tests and Verification

- Add FAQ to `publicPages`, build expectations, sitemap expectations, metadata matrix, internal-link checks, overflow/image checks, and `tests/visual.spec.js`.
- Add regressions for: 20 visible FAQ items; exact required questions; estate/residential positioning; native keyboard behavior; FAQ footer/contextual navigation; FAQPage JSON parse and visible parity; Organization/WebSite graph; Service graph; metadata uniqueness and canonical/OG consistency; large-estate contact option; corrected deck-cleaning wording; sitemap FAQ entry; FAQ build inclusion; launch-guard inclusion/preservation; no broad residential phrasing.
- Residential-language regression: allow the exact approved sentence `PPC's primary focus is commercial aquatic facilities and large private estates rather than routine residential pool service.` and its necessary question text, but reject affirmative phrases such as `residential pool cleaning`, `backyard pool service`, `weekly home pool service`, or any claim that PPC offers routine residential service.
- Final visual matrix: all eight public pages at 320, 375, 390, 430, 768, 1024, 1280, 1440, and 1920 across configured browser projects; manual inspection of FAQ 390/430/1440 plus Home/Services/Properties 390.
- Required final commands: `npm run build`, `npm test`, `npx playwright test`, `npm run test:screenshots`, `git diff --check`.

## Explicit No-Change Decisions

- No new estate page, primary-navigation item, framework, dependency, JavaScript accordion, photography, property name, customer proof, business credential, address, review, rating, pricing, infrastructure, contact endpoint, or deployment policy.
- No crawler-specific robots rules; training-bot access remains an owner policy decision outside this SEO defect pass.
- No removal or bypass of the temporary-property production-readiness failure.
