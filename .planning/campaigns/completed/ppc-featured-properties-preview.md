# PPC Featured Properties Preview Campaign

Status: complete
Direction: Build the PPC featured-properties showcase with seven exact property names, isolated temporary web-sourced aquatic imagery, production launch guards, complete navigation/SEO coverage, responsive visual QA, and a verified commit pushed to `origin/main`.
Scope: Public HTML pages, shared CSS/JavaScript as needed, temporary property-reference images, photo replacement documentation, sitemap, build/test tooling, Playwright regression and screenshot coverage, generated distribution verification, commit, and push.

## Constraints

- Do not touch Neraium, AWS, Cloudflare, Zoho, DNS, or unrelated infrastructure.
- Do not invent any property names or imply image reuse rights, PPC ownership, or property endorsement.
- Keep every web-sourced property image isolated under `images/temp-property-reference/` and mark it preview-only.
- Preserve the existing PPC design system and avoid an unrelated redesign.
- The production-readiness guard must fail on any public source or built reference to the temporary directory or a `temp-` image filename.

## Phases

| Phase | Title | Status | Validator retries remaining |
|---|---|---|---|
| 1 | Repository architecture and baseline audit | complete | 3 |
| 2 | Official-source image research and replacement specification | complete | 3 |
| 3 | Showcase implementation, assets, navigation, and documentation | complete | 3 |
| 4 | Production guard and regression coverage | complete | 3 |
| 5 | Build, full browser/responsive QA, commit, push, and report | complete | 3 |

## Phase End Conditions

| Phase | Non-manual end conditions | Manual review |
|---|---|---|
| 1 | Existing page, navigation, style, build, test, and documentation conventions are recorded; baseline `npm run build` and `npm test` outcomes are known | Existing PPC page rhythm and property-card precedent reviewed |
| 2 | Seven exact properties each have a documented image source URL/domain and a downloadable representative aquatic image candidate | Source identity and visible relevance reviewed |
| 3 | `properties.html` exists; homepage has exactly four intended featured properties; Properties has all seven; temp WebPs and replacement map exist | Premium card consistency, image crops, and naming reviewed |
| 4 | Guard intentionally fails against active preview references and passes in an approved-photo fixture/scenario; navigation, metadata, names, sitemap, overflow, and grid tests exist | Safeguard wording and replacement workflow reviewed |
| 5 | Build, all Playwright suites, responsive screenshots, diff check, and final repository audit pass; commit is pushed to `origin/main` | Required 390px, 430px, and 1440px page screenshots visually inspected |

## Feature Ledger

- 2026-08-23: Campaign created from a clean `main` synchronized with `origin/main`; repository-local `CLAUDE.md`, rules summary, and harness configuration are absent.
- 2026-08-23: Phase 1 audit confirmed `properties.html` was genuinely absent, recorded the duplicated shared-shell/build/test conventions, and established a green baseline: build passed, 255/255 site tests passed across Chromium desktop/mobile and WebKit, and diff check passed. Independent phase validator verdict: pass.
- 2026-08-23: Phase 2 documented seven exact source page/asset URLs and domains. Six selections are first-party/official-community sources; Palms uses a clearly identified LVCVA-hosted fallback because its preferred first-party asset rejected workspace retrieval. Independent phase validator verdict: pass with explicit rights warnings.
- 2026-08-23: Phase 3 built the homepage four-card preview and seven-card Properties page, standardized 16:9 responsive cards, isolated seven 1200×675 WebPs, wired navigation/build/sitemap/SEO, and documented every source and approved-photo replacement field. Independent review and phase validator verdicts: pass.
- 2026-08-23: Phase 4 added a source-and-dist launch guard, guarded the local deploy command, and expanded regression coverage for exact names, navigation, metadata, sitemap, layout, overflow, stale labels, and temporary-reference detection. The validator caught and verified correction of an over-broad OG-description assertion. Independent review and final phase validator verdicts: pass.
- 2026-08-23: Phase 5 passed the final build; 291/291 site tests; 486/486 full Playwright tests; 195/195 responsive screenshot tests; manual homepage and Properties inspection at 390, 430, and 1440 px; the expected-failing 20-finding production guard; script syntax checks; and `git diff --check`. Final read-only review verdict: pass. Citadel push-policy verdict: allow for the explicitly requested non-force internal-preview push while the documented Access restriction remains in place.

## Decision Log

- User explicitly authorized the final commit and push to `origin/main`; no unrelated external system changes are authorized.
- This is a one-session campaign unless an unforeseen blocker requires continuation; daemon mode is unnecessary.
- Temporary image references must remain active for internal preview while a separate production-readiness command is expected to fail until approved replacements are installed.

## Completion Context

- All five phases and independent reviews are complete. The scoped commit uses the user-required message and the authorized non-force push targets only `origin/main`. Temporary imagery remains deliberately launch-blocking until approved replacements are installed.

## Continuation State

- checkpoint-phase-1: none (baseline was clean; campaign record is the first modification)
- checkpoint-phase-2: none (research is read-only until image acquisition)
- checkpoint-phase-3: implementation and documentation reviewed and independently validated
- checkpoint-phase-4: production guard and regression suite reviewed and independently validated
- checkpoint-phase-5: final build, browser, responsive visual, guard, diff, scope, and push-policy gates passed
- current: complete
- blockers: none
