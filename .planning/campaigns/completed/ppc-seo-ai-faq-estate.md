# PPC SEO, AI Search, FAQ, and Estate Discovery Campaign

Status: complete
Direction: Improve Professional Pool Care LLC's technical SEO, local relevance, semantic answerability, service discovery, and large-private-estate discoverability; add an accessible FAQ experience; preserve the existing brand, architecture, photography, launch guard, and commercial-first positioning; then verify, commit, and push to `origin/main`.
Scope: Public HTML metadata and semantic content, restrained FAQ markup/CSS, accurate JSON-LD, sitemap/robots review, build registration, Playwright regression/visual coverage, commit, and push. No external account, infrastructure, DNS, contact-functionality, customer-proof, or photography changes.

## Constraints

- Use only the business facts approved by the user or already consistently supported in the repository.
- Keep the positioning centered on commercial aquatic facilities, resorts, hospitality properties, communities, and large private estates; do not position PPC as a general residential pool company.
- Do not invent an address, license, coverage, guarantees, awards, certifications, availability, reviews, ratings, coordinates, pricing, or customer relationships.
- Preserve the visual design, production-readiness safeguard, temporary property imagery, approved property names, and contact behavior.
- Use current primary search-engine documentation for changeable structured-data and crawler-policy decisions.
- Keep structured data visible-content-aligned, concise, valid, and non-duplicative.

## Phases

| Phase | Title | Status | Validator retries remaining |
|---|---|---|---|
| 1 | Repository, entity, technical SEO, and current-guidance audit | complete | 2 |
| 2 | SEO, FAQ, schema, internal-link, and estate-positioning specification | complete | 1 |
| 3 | Scoped implementation and regression coverage | complete | 3 |
| 4 | Technical, semantic, accessibility, and responsive visual QA | complete | 3 |
| 5 | Final verification, scope audit, commit, and push | complete | 3 |

## Phase End Conditions

| Phase | Non-manual end conditions | Manual review |
|---|---|---|
| 1 | Baseline build/tests pass; public-page metadata/schema/headings/entity facts, sitemap, robots, images, links, and launch safeguard are audited; current primary-source search guidance is documented | Existing page intent, estate-language boundaries, FAQ opportunity, and crawler posture reviewed for factual and brand fit |
| 2 | A file-level implementation specification maps exact metadata, visible FAQ answers, schema entities, service anchors, internal links, test changes, and no-change decisions to verified facts | Every proposed claim and estate reference reviewed for commercial-first positioning and unsupported-claim risk |
| 3 | FAQ, metadata, semantic content, schema, sitemap/build registration, internal links, and regression tests are implemented; focused build/tests and JSON-LD/link checks pass | Changed pages preserve the current PPC visual system and the FAQ reads clearly without marketing filler |
| 4 | Full semantic audits, accessibility interactions, all requested widths, required screenshot matrix, overflow/image integrity, and crawler/sitemap/canonical checks pass | FAQ 390/430/1440 and Home/Services/Properties 390 screenshots inspected; no residential repositioning or visual regression remains |
| 5 | `npm run build`, `npm test`, full Playwright, responsive screenshots, and `git diff --check` pass; diff/status/security/scope audits pass; exact commit is pushed non-force to `origin/main` | Final site, structured data, content scope, launch guard, and release state reviewed |

## Decision Log

- The user explicitly authorized one non-force commit and push to `origin/main` with the exact requested message.
- FAQ will use progressively enhanced, crawler-visible native HTML without a heavy dependency; the final interaction pattern will follow existing design conventions.
- Privacy and Terms remain public, canonical pages but retain their existing `noindex, follow` intent unless the audit identifies a concrete defect.
- Current search guidance will determine whether FAQ schema is useful even when visual rich-result eligibility is limited.
- This is a one-session campaign; daemon mode is unnecessary.

## Feature Ledger

- 2026-08-24: Phase 1 completed from clean `main` at `9ec1e74`. `npm run build` passed and the baseline focused suite passed 294/294. The audit confirmed consistent entity facts, five indexable marketing pages with unique production metadata, two intentional noindex legal pages, exactly one H1 on each deployed page, zero public JSON-LD blocks, a five-URL canonical sitemap, repository-level allow-all crawler posture, resolved internal links/fragments, sound image attributes, and an intentionally failing temporary-property production guard. Current official guidance confirms that Google AI features rely on standard SEO fundamentals and removed FAQ rich results in May 2026; a visible FAQ remains useful, while any FAQPage block must be treated as cross-consumer semantic markup rather than a Google rich-result promise. Independent validation initially failed because the research brief omitted concrete repository evidence; those omissions and two crawler/guidance wording caveats were corrected before Phase 2.
- 2026-08-24: Phase 2 produced an exact implementation contract for all eight pages: unique metadata values; 20 verbatim FAQ answers with stable IDs and link targets; a compact Home preview; Organization, WebSite, Place, ImageObject, Service, and FAQPage graphs with stable IDs; estate-language boundaries; compatibility-qualified deck-cleaning wording; build/sitemap/guard registration; and regression/visual coverage. Independent validation required two tightening rounds to replace answer directions with exact strings and remove unsupported location/service implications from Open Graph image-alt text; the final verdict passed.
- 2026-08-24: Phase 3 implemented the eight-page metadata matrix, a 20-question native HTML FAQ with exact visible/schema parity, restrained Organization/WebSite/Place/ImageObject and five-Service graphs, commercial-first estate discovery, contextual links, sitemap/build/readiness-guard registration, and expanded Playwright coverage. Independent validation passed with no blockers. A WebKit hover regression assertion was stabilized to wait for the existing CSS transition's declared end state; its isolated rerun passed. No imagery, business facts, contact behavior, robots policy, infrastructure, or production-launch guard was changed.
- 2026-08-24: Phase 4 passed on an owned threaded local server: the full Playwright suite passed 552/552, the explicit responsive screenshot suite passed 222/222, and seven focused FAQ/navigation/mobile flows passed. The audit covered 216 page-width cases across Chromium desktop, Chromium mobile, and WebKit, plus 72 independent overflow checks, 225 image-integrity checks, and 72 main/footer overlap checks. Manual review of FAQ 390/430/1440 and Home/Services/Properties 390 found no crop, distortion, overlap, or brand regression. Independent validation passed with no blockers. QA evidence is documented in `.planning/qa-report-2026-08-24-seo-faq.md` and `.planning/screenshots/ppc-seo-ai-faq/`.
- 2026-08-24: Phase 5 passed the exact ordered release gates: build, 330/330 focused site tests, 552/552 full Playwright cases, 222/222 explicit screenshot cases, and `git diff --check`. Final audits confirmed eight unique metadata sets, three valid JSON-LD blocks, exact 20/20 FAQ visible/schema parity, six sitemap URLs, 188 resolved local links/fragments, no secrets or stale development URLs in `dist`, no image/infrastructure/contact/robots drift, and an intact temporary-photography launch guard. Independent release validation passed with no blockers; the exact authorized non-force commit and push were cleared.

## Continuation State

- checkpoint-phase-1: stash@{0} (campaign and research audit record; applied with stash retained)
- checkpoint-phase-2: retained implementation-specification checkpoint
- checkpoint-phase-3: retained scoped implementation checkpoint
- checkpoint-phase-4: retained responsive and accessibility QA checkpoint
- current: campaign complete; exact release commit and non-force push authorized
- blockers: none
