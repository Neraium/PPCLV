# PPC LLC Website Image Replacement Map

## Brand Assets

- `logo.png`: original PPC LLC logo source.
- `logo.webp`: optimized public logo.

## Current Representative Photography

The current public images communicate a commercial visual direction while PPC gathers approved company and customer/property photography. They are not presented as PPC customer properties or completed PPC work.

All replacement photos must be commercial. Do not use residential backyard pool photography. Water-testing photography is not required. The dimensions below deliberately match the current intrinsic dimensions in the page markup. Exporting to those dimensions and replacing the files under the same names requires no HTML, CSS, or JavaScript changes.

| Current filename | All placements | Intended approved subject | Orientation / minimum export / aspect ratio | Safe crop considerations | Delivery target | Alt-text guidance | Permission requirement |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `resort-hotel-pool-deck.webp` | Open Graph image for Home and Contact; Open Graph image plus Our Work and Industries cards on archived pages (not deployed) | One high-impact commercial pool at a resort, hotel, multifamily, HOA, municipal, or other managed aquatic facility | Portrait; 1440 × 1920 px; 3:4 | Keep the primary pool/facility detail near center; allow substantial edge loss and preserve calm areas behind hero copy across narrow and wide screens | WebP quality 76–82; keep filename exactly | Describe the visible commercial facility and setting, not ownership or customer status | Written photo-use permission is required for customer/property imagery and recognizable people; naming requires separate written approval |
| `resort-hotel-pool-deck-960.webp` | Responsive source for Our Work and Industries cards (archived, not deployed) | The same source and crop as the 1440 px image | Portrait; 960 × 1280 px; 3:4 | Match the larger image's crop and focal point so responsive switching is not noticeable | WebP quality 76–82; keep filename exactly | Uses each parent image's HTML alt; no separate wording needed | Same permission as the master image |
| `commercial-surface-cleaning.jpg` | Home / Commercial Focus; Our Work card (archived, not deployed) | PPC technician, approved service activity, or commercial field-service scene | Portrait; 1200 × 1824 px; 25:38 (approximately 2:3) | Keep hands, tools, and service action away from extreme edges; leave enough context to read as commercial | Progressive JPEG quality 80–85; keep filename exactly | Describe the visible task and commercial setting; do not claim the person or property is a customer unless approved | Written permission for recognizable people and customer/property use; property naming requires separate written approval |
| `apartment-community-pool-deck.jpg` | Industries card (archived, not deployed) | Apartment or multifamily commercial pool amenity | Landscape; 1500 × 1000 px; 3:2 | Keep the pool and shared amenity context centered; avoid critical signage, faces, or logos at the edges | Progressive JPEG quality 80–85; keep filename exactly while used as a representative image | Describe the visible apartment-community pool/deck without naming it | Confirm documented source rights before any archived page is published |
| `commercial-hotel-spa.jpg` | Our Work and Industries cards (archived, not deployed) | Representative commercial spa | Portrait; 1400 × 2100 px; 2:3 | Center the spa basin and recognizable commercial context; allow top/bottom crop without losing the subject | Progressive JPEG quality 80–85; keep filename exactly while used as a representative image | Describe the visible commercial spa and setting without naming it; avoid unsupported maintenance claims | Confirm documented source rights before any archived page is published |
| `municipal-lap-pool-lanes.jpg` | Services / Urgent & Operational Support; Commercial Pool Service and Industries cards (archived, not deployed) | Representative large managed aquatic facility | Portrait; 1400 × 2100 px; 2:3 | Keep lane/facility cues central and usable in both portrait card and wider service-section crops; avoid edge-dependent signage | Progressive JPEG quality 80–85; keep filename exactly | Describe the visible aquatic facility without naming it; do not imply CPO coverage, recovery work, or inspection outcomes solely from the image | Confirm documented source rights and permission for recognizable people |
| `commercial-equipment-room-service.jpg` | Services / Equipment & Restoration; About / Commercial Focus; Open Graph image for Services and About; two Our Work cards (archived, not deployed) | Commercial equipment or service scene | Landscape; 1500 × 1000 px; 3:2 | Keep the key equipment/service action centered; allow vertical and horizontal crop; remove or avoid legible account labels, access codes, and sensitive facility details | Progressive JPEG quality 80–85; keep filename exactly | Describe only visible equipment or service access without naming it; do not infer repair completion, compliance, or inspection results | Written customer/property and recognizable-person permission; confirm sensitive mechanical-room details are safe to publish |
| `commercial-water-testing.jpg` | Services / Maintenance; Our Work and Industries cards (archived, not deployed) | Commercial pool or spa maintenance scene; water testing is optional | Portrait; 1200 × 1800 px; 2:3 | Keep the maintenance subject central so the layout can use a wider crop; avoid tiny instruments or text as the only meaningful detail | Progressive JPEG quality 80–85; keep filename exactly | Describe the visible maintenance activity and commercial setting without promising water-quality outcomes | Written customer/property and recognizable-person permission; written naming permission if identified |

## Featured Property Photo Replacement Map

> **TEMPORARY WEB-SOURCED REFERENCE IMAGES — NOT CLEARED FOR PUBLIC LAUNCH.**

Every file under `images/temp-property-reference/` is for PPC's internal preview only. Source provenance does not grant reuse rights. These files **MUST be replaced before public launch**, and `npm run test:production-ready` is intentionally designed to fail while any public source or built output still references them.

The shared property-card layout uses a 16:9 crop with flowing captions. Final approved images can replace these references without another design or layout pass. The only markup work should be the mechanical asset-path and intrinsic-dimension update described in the workflow below.

### Aliante Casino Hotel Spa

- Temporary filename: `images/temp-property-reference/temp-aliante.webp`.
- Source page URL / domain: `https://aliante.boydgaming.com/stay/resort-pool/` / `aliante.boydgaming.com`.
- Source asset URL / domain: `https://mc-d7f7cc1f-1a7c-4fc5-b531-6087-cdn-endpoint.azureedge.net/-/media/project/boyd/property/lasvegas/aliante/hero/al_resortpool_hero_1200x570.jpg?h=570&iar=0&rev=630b3de596ab4fdebc57815578cfe19b&w=1200` / `mc-d7f7cc1f-1a7c-4fc5-b531-6087-cdn-endpoint.azureedge.net`.
- Date retrieved: 2026-08-23.
- Placements: Properties page featured card; not on the homepage.
- Preferred final orientation / ratio / minimum: landscape / 16:9 / 1600 × 900 px.
- Crop guidance: retain the central pool, palms, and cabanas; allow equal loss at the left and right edges; keep important deck details away from the outer 10%.
- Recommended output: optimized WebP at quality 80–84; retain an approved high-quality JPEG source outside the public build if supplied.
- Alt-text guidance: describe the visible palm-lined pool, cabanas, deck, and seating; do not infer PPC work, ownership, or endorsement.
- Final approval: written public-use rights and PPC marketing approval are required, including releases for recognizable people or restricted property marks.
- Intended permanent filename: `images/properties/aliante-pool.webp`.

### Golden Nugget Las Vegas Hotel & Casino

- Temporary filename: `images/temp-property-reference/temp-golden-nugget.webp`.
- Source page URL / domain: `https://www.goldennugget.com/las-vegas/amenities/h2o-pool/` / `goldennugget.com`.
- Source asset URL / domain: `https://www.goldennugget.com/contentassets/37efe8dc02cd438a8e60f3399b32419e/new-pool-gal-1.jpg` / `goldennugget.com`.
- Date retrieved: 2026-08-23.
- Placements: homepage featured preview and Properties page featured card.
- Preferred final orientation / ratio / minimum: landscape / 16:9 / 1600 × 900 px.
- Crop guidance: retain the circular deck, pool, slide, and central resort architecture; avoid cutting the pool curve or slide at card edges.
- Recommended output: optimized WebP at quality 80–84; retain an approved high-quality JPEG source outside the public build if supplied.
- Alt-text guidance: describe the elevated view of the pool complex, circular decks, and waterslide; do not infer PPC work, ownership, or endorsement.
- Final approval: written public-use rights and PPC marketing approval are required, including releases for recognizable people or restricted property marks.
- Intended permanent filename: `images/properties/golden-nugget-las-vegas-pool.webp`.

### Palms Casino Resort

- Temporary filename: `images/temp-property-reference/temp-palms.webp`.
- Source page URL / domain: `https://www.visitlasvegas.com/es/experience/post/piscinas-imperdibles-en-las-vegas/` / `visitlasvegas.com`.
- Source asset URL / domain: `https://assets.simpleviewcms.com/simpleview/image/upload/v1/clients/lasvegas/127685_03_LVCVA_Misc_Web_Requests_1200x800_0004_Photo_Credit_Travel_Ruby_09da0d4a-b606-4f26-8b4a-35a218056076.jpg` / `assets.simpleviewcms.com`.
- Source-selection note: the first-party Palms Pool page at `https://www.palms.com/experiences/palms-pool` was preferred, but its image server returned HTTP 403 to the workspace downloader. The LVCVA-hosted, clearly identified Palms image is a preview-only fallback; its encoded Travel Ruby credit is not a reuse license.
- Date retrieved: 2026-08-23.
- Placements: homepage featured preview and Properties page featured card.
- Preferred final orientation / ratio / minimum: landscape / 16:9 / 1600 × 900 px.
- Crop guidance: retain the pool basin and multi-level deck; keep any recognizable person away from edge crops and prefer a people-free approved final image.
- Recommended output: optimized WebP at quality 80–84; retain an approved high-quality JPEG source outside the public build if supplied.
- Alt-text guidance: describe the visible guest, pool, deck, and resort setting without identifying the person or inferring PPC work, ownership, or endorsement.
- Final approval: written public-use rights from the actual rights holder and PPC marketing approval are required; recognizable-person releases must be confirmed.
- Intended permanent filename: `images/properties/palms-casino-resort-pool.webp`.

### The Vistas Pool at The Vistas Community Center

- Temporary filename: `images/temp-property-reference/temp-vistas.webp`.
- Source page URL / domain: `https://summerlin.com/summerlin-community-centers-and-pools/` / `summerlin.com`.
- Source asset URL / domain: `https://summerlin.com/wp-content/uploads/2022/07/Vistas-Community-Center-and-Pool_08-1-scaled-1.webp` / `summerlin.com`.
- Date retrieved: 2026-08-23.
- Placements: Properties page featured card; not on the homepage.
- Preferred final orientation / ratio / minimum: landscape / 16:9 / 1600 × 900 px.
- Crop guidance: retain the main pool, lap area, shade structures, and mountain context; avoid centering identifiable swimmers in the final crop.
- Recommended output: optimized WebP at quality 80–84; retain an approved high-quality JPEG source outside the public build if supplied.
- Alt-text guidance: describe the visible community pool complex, shade structures, and mountain backdrop; do not infer PPC work, ownership, or endorsement.
- Final approval: written public-use rights and PPC marketing approval are required, including releases for recognizable people.
- Intended permanent filename: `images/properties/vistas-community-center-pool.webp`.

### Sam's Town Hotel & Gambling Hall

- Temporary filename: `images/temp-property-reference/temp-sams-town.webp`.
- Source page URL / domain: `https://samstownlv.boydgaming.com/stay/resort-pool` / `samstownlv.boydgaming.com`.
- Source asset URL / domain: `https://mc-d7f7cc1f-1a7c-4fc5-b531-6087-cdn-endpoint.azureedge.net/-/media/project/boyd/property/lasvegas/sams-town-las-vegas/hero/lv_resortpool_hero_1200x570.jpg?h=570&iar=0&rev=7924858ba8c9498cabc2678bfb90435d&w=1200` / `mc-d7f7cc1f-1a7c-4fc5-b531-6087-cdn-endpoint.azureedge.net`.
- Date retrieved: 2026-08-23.
- Placements: Properties page featured card; not on the homepage.
- Preferred final orientation / ratio / minimum: landscape / 16:9 / 1600 × 900 px.
- Crop guidance: preserve the pool curve, palms, water reflections, and lounge seating; avoid losing the pool edge on narrow crops.
- Recommended output: optimized WebP at quality 80–84; retain an approved high-quality JPEG source outside the public build if supplied.
- Alt-text guidance: describe the visible curved pool, palm trees, and lounge seating; do not infer PPC work, ownership, or endorsement.
- Final approval: written public-use rights and PPC marketing approval are required, including releases for recognizable people or restricted property marks.
- Intended permanent filename: `images/properties/sams-town-las-vegas-pool.webp`.

### Durango Casino & Resort

- Temporary filename: `images/temp-property-reference/temp-durango.webp`.
- Source page URL / domain: `https://durangoresort.com/bel-aire-backyard/` / `durangoresort.com`.
- Source asset URL / domain: `https://durangoresort.com/wp-content/uploads/2024/02/Durango-Bel-Aire-Backyard-Pool.jpg` / `durangoresort.com`.
- Date retrieved: 2026-08-23.
- Placements: homepage featured preview and Properties page featured card.
- Preferred final orientation / ratio / minimum: landscape / 16:9 / 1600 × 900 px.
- Crop guidance: retain the main pool, in-water loungers, cabanas, and palm-lined sightline; keep the central fountain visible when present.
- Recommended output: optimized WebP at quality 80–84; retain an approved high-quality JPEG source outside the public build if supplied.
- Alt-text guidance: describe the visible pool, in-water loungers, cabanas, and deck; do not infer PPC work, ownership, or endorsement.
- Final approval: written public-use rights and PPC marketing approval are required, including releases for recognizable people or restricted property marks.
- Intended permanent filename: `images/properties/durango-casino-resort-pool.webp`.

### Red Rock Casino Resort and Spa

- Temporary filename: `images/temp-property-reference/temp-red-rock.webp`.
- Source page URL / domain: `https://redrockresort.com/see-and-do/pool/` / `redrockresort.com`.
- Source asset URL / domain: `https://redrockresort.com/wp-content/uploads/2023/11/Main-Pool-at-Red-Rock.jpg` / `redrockresort.com`.
- Date retrieved: 2026-08-23.
- Placements: homepage hero, homepage featured preview, and Properties page featured card. The hero placement is also temporary and keeps the production-readiness guard in a failing state until this file is replaced with approved property photography.
- Preferred final orientation / ratio / minimum: landscape / 16:9 / 1600 × 900 px.
- Crop guidance: retain the main pool, fountain, red loungers, palms, and resort context; keep the fountain near center across responsive crops.
- Recommended output: optimized WebP at quality 80–84; retain an approved high-quality JPEG source outside the public build if supplied.
- Alt-text guidance: describe the visible pool, fountain, red loungers, and palm-lined grounds; do not infer PPC work, ownership, or endorsement.
- Final approval: written public-use rights and PPC marketing approval are required, including releases for recognizable people or restricted property marks.
- Intended permanent filename: `images/properties/red-rock-casino-resort-pool.webp`.

### Approved Photo Swap Workflow

1. Confirm written public-use rights, property-name approval, PPC marketing approval, recognizable-person releases, and visible-mark treatment.
2. Crop and export each approved image at 16:9, preferably 1600 × 900 px, using its intended permanent filename above.
3. Replace each temporary `src` in `index.html` and `properties.html` with the mapped permanent path, update intrinsic dimensions if needed, and move the build allowlist entries from the temporary directory to `images/properties/`. This is a mechanical photo-reference update; no HTML structure or CSS redesign is required.
4. Remove the seven temporary files and their build-copy list only after every placement uses an approved asset.
5. Run `npm run build`, `npm test`, `npm run test:e2e`, `npm run test:screenshots`, and `npm run test:production-ready`.
6. Verify each crop at the documented responsive widths, then deploy.

In short: **replace approved photo → rebuild → verify crop → deploy**.

`resort-hotel-pool-deck.jpg` is the 1800 × 2400 px (3:4) source master for the two representative WebP files; it is retained in the repository but is not copied to `dist/`. Those WebP files remain in use for Open Graph metadata and archived page cards as mapped above, but no longer render as the homepage hero.

The archived Expanded-tier pages also reference some of these filenames, but they are excluded from `dist/` and are not part of the public Essential site. Same-filename replacements will automatically carry into those archived pages if that tier is built later; their copy and alt text must be reviewed before any future publication.

## Planned PPC Photo Set

Recommended final photo package:

- 1 homepage hero image.
- 4 to 6 customer/property commercial photos.
- 1 to 2 commercial spa photos.
- 2 to 3 equipment or equipment-room photos.
- Optional company/team/service image for About.

## Approval Rules

- Use real customer/property names only with written approval.
- Use website/customer-provided photos only with permission.
- If naming permission is unavailable, use neutral property-type labels.
- Do not imply PPC owns customer properties.
- Do not imply representative stock photos are PPC customers.
- Do not publish residential backyard pools.

## Same-Filename Swap Procedure

1. Confirm written photo-use permission and, separately, any property/customer naming permission.
2. Crop and export each approved photo to the exact dimensions, format, and filename in the map. Strip unnecessary metadata, especially location data.
3. Replace the existing file in `images/`; for the hero, replace the source master and both WebP derivatives together.
4. Run `npm run build` and `npm run test:screenshots`, then inspect every listed placement at mobile and desktop widths for faces, signage, focal-point cropping, and text readability.
5. Select a subject compatible with the placement and alt guidance above, then confirm the existing visible-subject description remains accurate. With the mapped subject, filename, format, and dimensions preserved, no HTML, CSS, or JavaScript change is required.
