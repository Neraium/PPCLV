# PPC LLC Website Image Provenance and Production Map

## Brand Assets

- `logo.png`: original PPC LLC logo source.
- `logo.webp`: optimized public logo.

## Current Representative Photography

The current public images communicate PPC's commercial service environments. The current website photography is approved by PPC for production website use. Public copy presents the images as generic examples without identifying customer accounts. This internal record preserves source provenance without asserting ownership, license terms, releases, or third-party endorsement.

Future replacement photos must be commercial. Do not use residential backyard pool photography. Water-testing photography is not required. The dimensions below match the current intrinsic dimensions in the page markup.

| Current filename | All placements | Intended approved subject | Orientation / minimum export / aspect ratio | Safe crop considerations | Delivery target | Alt-text guidance | Permission requirement |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `resort-hotel-pool-deck.webp` | Open Graph image for Home and Contact; Open Graph image plus Our Work and Industries cards on archived pages (not deployed) | One high-impact commercial pool at a resort, hotel, multifamily, HOA, municipal, or other managed aquatic facility | Portrait; 1440 × 1920 px; 3:4 | Keep the primary pool/facility detail near center; allow substantial edge loss and preserve calm areas behind hero copy across narrow and wide screens | WebP quality 76–82; keep filename exactly | Describe the visible commercial facility and setting, not ownership or customer status | Written photo-use permission is required for customer/property imagery and recognizable people; naming requires separate written approval |
| `resort-hotel-pool-deck-960.webp` | Responsive source for Our Work and Industries cards (archived, not deployed) | The same source and crop as the 1440 px image | Portrait; 960 × 1280 px; 3:4 | Match the larger image's crop and focal point so responsive switching is not noticeable | WebP quality 76–82; keep filename exactly | Uses each parent image's HTML alt; no separate wording needed | Same permission as the master image |
| `commercial-surface-cleaning.jpg` | Home / Commercial Focus; Services / Maintenance; Our Work card (archived, not deployed) | PPC technician, approved service activity, or commercial field-service scene | Portrait; 1200 × 1824 px; 25:38 (approximately 2:3) | Keep hands, tools, and service action away from extreme edges; leave enough context to read as commercial | Progressive JPEG quality 80–85; keep filename exactly | Describe the visible task and commercial setting; do not claim the person or property is a customer unless approved | Written permission for recognizable people and customer/property use; property naming requires separate written approval |
| `apartment-community-pool-deck.jpg` | Industries card (archived, not deployed) | Apartment or multifamily commercial pool amenity | Landscape; 1500 × 1000 px; 3:2 | Keep the pool and shared amenity context centered; avoid critical signage, faces, or logos at the edges | Progressive JPEG quality 80–85; keep filename exactly while used as a representative image | Describe the visible apartment-community pool/deck without naming it | Confirm documented source rights before any archived page is published |
| `commercial-hotel-spa.jpg` | Our Work and Industries cards (archived, not deployed) | Representative commercial spa | Portrait; 1400 × 2100 px; 2:3 | Center the spa basin and recognizable commercial context; allow top/bottom crop without losing the subject | Progressive JPEG quality 80–85; keep filename exactly while used as a representative image | Describe the visible commercial spa and setting without naming it; avoid unsupported maintenance claims | Confirm documented source rights before any archived page is published |
| `municipal-lap-pool-lanes.jpg` | Commercial Pool Service and Industries cards (archived, not deployed); retained as a source asset | Representative large managed aquatic facility | Portrait; 1400 × 2100 px; 2:3 | Keep lane/facility cues central and usable in both portrait card and wider service-section crops; avoid edge-dependent signage | Progressive JPEG quality 80–85; keep filename exactly | Describe the visible aquatic facility without naming it; do not imply CPO coverage, recovery work, or inspection outcomes solely from the image | Confirm documented source rights and permission for recognizable people |
| `commercial-equipment-room-service.jpg` | Two Our Work cards (archived, not deployed); retained as a source asset | Commercial equipment or service scene | Landscape; 1500 × 1000 px; 3:2 | Keep the key equipment/service action centered; allow vertical and horizontal crop; remove or avoid legible account labels, access codes, and sensitive facility details | Progressive JPEG quality 80–85; keep filename exactly | Describe only visible equipment or service access without naming it; do not infer repair completion, compliance, or inspection results | Written customer/property and recognizable-person permission; confirm sensitive mechanical-room details are safe to publish |
| `commercial-water-testing.jpg` | FAQ Open Graph image; Our Work and Industries cards (archived, not deployed) | Commercial pool or spa maintenance scene; water testing is optional | Portrait; 1200 × 1800 px; 2:3 | Keep the maintenance subject central so the layout can use a wider crop; avoid tiny instruments or text as the only meaningful detail | Progressive JPEG quality 80–85; keep filename exactly | Describe the visible maintenance activity and commercial setting without promising water-quality outcomes | Written customer/property and recognizable-person permission; written naming permission if identified |

## Approved Production Gallery Provenance

> **Approved by PPC for production website use.**

The approved public files are stored under `images/production/` with neutral filenames. `npm run test:production-ready` rejects any legacy `images/temp-property-reference/` path or `temp-*` public filename so the retired preview state cannot be reintroduced accidentally.

The shared image-only Gallery layout uses the approved crops with factual alt text and no visible property captions. No crop, layout, or image-content change was made when the files moved to production paths.

The named headings below are retained only as internal source-provenance records. They are not public copy and must not be used in visible labels, alt text, metadata, or schema.

### Commercial Pool Mechanical Room

- Production filename: `images/production/commercial-mechanical-room.jpg`.
- Source page URL / domain: `https://www.sunbeltpools.com/projects/garland-isd-natatorium/` / `sunbeltpools.com`.
- Source asset URL / domain: `https://www.sunbeltpools.com/wp-content/uploads/2022/11/Garland-ISD-Web-1-scaled.jpg` / `sunbeltpools.com`.
- Date retrieved: 2026-08-24.
- Placements: Services / Equipment & Restoration; About / Commercial Focus; Services and About Open Graph images.
- Approval status: Approved by PPC for production website use.
- Current dimensions / ratio: landscape / 2560 × 1707 px / approximately 3:2.
- Crop guidance: retain the large filtration vessels, central circulation piping, valves, and control equipment; avoid losing the blue filtration vessel at narrow crops.
- Alt-text guidance: describe only the visible filtration vessels, piping, valves, and controls; do not infer repair completion, compliance, or PPC involvement.

### Commercial Pool Operational Check

- Production filename: `images/production/commercial-water-check.jpg`.
- Source page URL / domain: `https://waterrijkzwembadtechniek.nl/de-essentiele-zwembadtechnieken-van-publieke-zwembaden/` / `waterrijkzwembadtechniek.nl`.
- Source asset URL / domain: `https://waterrijkzwembadtechniek.nl/wp-content/uploads/2022/09/Waterrijk-Zwembadtechniek-07-09-22-LR-93.jpg` / `waterrijkzwembadtechniek.nl`.
- Date retrieved: 2026-08-25.
- Placement: Services / Urgent & Operational Support.
- Approval status: Approved by PPC for production website use.
- Current dimensions / ratio: landscape / 2000 × 1333 px / approximately 3:2.
- Crop guidance: retain the operator's hands, open testing case, pool edge, and enough of the indoor facility to preserve the operational context; avoid cutting through the operator's head or hands.
- Alt-text guidance: describe the visible operator, water check, testing case, and public pool without identifying the person or implying PPC employment, regulatory approval, or a customer relationship.

### Aliante Casino Hotel Spa

- Production filename: `images/production/gallery-pool-01.webp`.
- Source page URL / domain: `https://aliante.boydgaming.com/stay/resort-pool/` / `aliante.boydgaming.com`.
- Source asset URL / domain: `https://mc-d7f7cc1f-1a7c-4fc5-b531-6087-cdn-endpoint.azureedge.net/-/media/project/boyd/property/lasvegas/aliante/hero/al_resortpool_hero_1200x570.jpg?h=570&iar=0&rev=630b3de596ab4fdebc57815578cfe19b&w=1200` / `mc-d7f7cc1f-1a7c-4fc5-b531-6087-cdn-endpoint.azureedge.net`.
- Date retrieved: 2026-08-23.
- Placements: Gallery page image tile; not in the homepage gallery preview.
- Preferred final orientation / ratio / minimum: landscape / 16:9 / 1600 × 900 px.
- Crop guidance: retain the central pool, palms, and cabanas; allow equal loss at the left and right edges; keep important deck details away from the outer 10%.
- Recommended output: optimized WebP at quality 80–84; retain an approved high-quality JPEG source outside the public build if supplied.
- Alt-text guidance: describe the visible palm-lined pool, cabanas, deck, and seating; do not infer PPC work, ownership, or endorsement.
- Approval status: Approved by PPC for production website use.

### Golden Nugget Las Vegas Hotel & Casino

- Production filename: `images/production/gallery-pool-02.webp`.
- Source page URL / domain: `https://www.goldennugget.com/las-vegas/amenities/h2o-pool/` / `goldennugget.com`.
- Source asset URL / domain: `https://www.goldennugget.com/contentassets/37efe8dc02cd438a8e60f3399b32419e/new-pool-gal-1.jpg` / `goldennugget.com`.
- Date retrieved: 2026-08-23.
- Placements: homepage gallery preview and Gallery page image tile.
- Preferred final orientation / ratio / minimum: landscape / 16:9 / 1600 × 900 px.
- Crop guidance: retain the circular deck, pool, slide, and central resort architecture; avoid cutting the pool curve or slide at card edges.
- Recommended output: optimized WebP at quality 80–84; retain an approved high-quality JPEG source outside the public build if supplied.
- Alt-text guidance: describe the elevated view of the pool complex, circular decks, and waterslide; do not infer PPC work, ownership, or endorsement.
- Approval status: Approved by PPC for production website use.

### Palms Casino Resort

- Production filename: `images/production/gallery-pool-03.webp`.
- Source page URL / domain: `https://www.visitlasvegas.com/es/experience/post/piscinas-imperdibles-en-las-vegas/` / `visitlasvegas.com`.
- Source asset URL / domain: `https://assets.simpleviewcms.com/simpleview/image/upload/v1/clients/lasvegas/127685_03_LVCVA_Misc_Web_Requests_1200x800_0004_Photo_Credit_Travel_Ruby_09da0d4a-b606-4f26-8b4a-35a218056076.jpg` / `assets.simpleviewcms.com`.
- Source-selection note: the first-party source returned HTTP 403 to the workspace downloader; the retained source identity and embedded credit are documented here for provenance.
- Date retrieved: 2026-08-23.
- Placements: homepage gallery preview and Gallery page image tile.
- Preferred final orientation / ratio / minimum: landscape / 16:9 / 1600 × 900 px.
- Crop guidance: retain the pool basin and multi-level deck; keep any recognizable person away from edge crops and prefer a people-free approved final image.
- Recommended output: optimized WebP at quality 80–84; retain an approved high-quality JPEG source outside the public build if supplied.
- Alt-text guidance: describe the visible guest, pool, deck, and resort setting without identifying the person or inferring PPC work, ownership, or endorsement.
- Approval status: Approved by PPC for production website use.

### The Vistas Pool at The Vistas Community Center

- Production filename: `images/production/gallery-pool-04.webp`.
- Source page URL / domain: `https://summerlin.com/summerlin-community-centers-and-pools/` / `summerlin.com`.
- Source asset URL / domain: `https://summerlin.com/wp-content/uploads/2022/07/Vistas-Community-Center-and-Pool_08-1-scaled-1.webp` / `summerlin.com`.
- Date retrieved: 2026-08-23.
- Placements: Gallery page image tile; not in the homepage gallery preview.
- Preferred final orientation / ratio / minimum: landscape / 16:9 / 1600 × 900 px.
- Crop guidance: retain the main pool, lap area, shade structures, and mountain context; avoid centering identifiable swimmers in the final crop.
- Recommended output: optimized WebP at quality 80–84; retain an approved high-quality JPEG source outside the public build if supplied.
- Alt-text guidance: describe the visible community pool complex, shade structures, and mountain backdrop; do not infer PPC work, ownership, or endorsement.
- Approval status: Approved by PPC for production website use.

### Sam's Town Hotel & Gambling Hall

- Production filename: `images/production/gallery-pool-05.webp`.
- Source page URL / domain: `https://samstownlv.boydgaming.com/stay/resort-pool` / `samstownlv.boydgaming.com`.
- Source asset URL / domain: `https://mc-d7f7cc1f-1a7c-4fc5-b531-6087-cdn-endpoint.azureedge.net/-/media/project/boyd/property/lasvegas/sams-town-las-vegas/hero/lv_resortpool_hero_1200x570.jpg?h=570&iar=0&rev=7924858ba8c9498cabc2678bfb90435d&w=1200` / `mc-d7f7cc1f-1a7c-4fc5-b531-6087-cdn-endpoint.azureedge.net`.
- Date retrieved: 2026-08-23.
- Placements: Gallery page image tile; not in the homepage gallery preview.
- Preferred final orientation / ratio / minimum: landscape / 16:9 / 1600 × 900 px.
- Crop guidance: preserve the pool curve, palms, water reflections, and lounge seating; avoid losing the pool edge on narrow crops.
- Recommended output: optimized WebP at quality 80–84; retain an approved high-quality JPEG source outside the public build if supplied.
- Alt-text guidance: describe the visible curved pool, palm trees, and lounge seating; do not infer PPC work, ownership, or endorsement.
- Approval status: Approved by PPC for production website use.

### Durango Casino & Resort

- Production filename: `images/production/gallery-pool-06.webp`.
- Source page URL / domain: `https://durangoresort.com/bel-aire-backyard/` / `durangoresort.com`.
- Source asset URL / domain: `https://durangoresort.com/wp-content/uploads/2024/02/Durango-Bel-Aire-Backyard-Pool.jpg` / `durangoresort.com`.
- Date retrieved: 2026-08-23.
- Placements: homepage gallery preview and Gallery page image tile.
- Preferred final orientation / ratio / minimum: landscape / 16:9 / 1600 × 900 px.
- Crop guidance: retain the main pool, in-water loungers, cabanas, and palm-lined sightline; keep the central fountain visible when present.
- Recommended output: optimized WebP at quality 80–84; retain an approved high-quality JPEG source outside the public build if supplied.
- Alt-text guidance: describe the visible pool, in-water loungers, cabanas, and deck; do not infer PPC work, ownership, or endorsement.
- Approval status: Approved by PPC for production website use.

### Red Rock Casino Resort and Spa

- Production filename: `images/production/gallery-pool-07.webp`.
- Source page URL / domain: `https://redrockresort.com/see-and-do/pool/` / `redrockresort.com`.
- Source asset URL / domain: `https://redrockresort.com/wp-content/uploads/2023/11/Main-Pool-at-Red-Rock.jpg` / `redrockresort.com`.
- Date retrieved: 2026-08-23.
- Placements: homepage hero, homepage gallery preview, and Gallery page image tile.
- Preferred final orientation / ratio / minimum: landscape / 16:9 / 1600 × 900 px.
- Crop guidance: retain the main pool, fountain, red loungers, palms, and resort context; keep the fountain near center across responsive crops.
- Recommended output: optimized WebP at quality 80–84; retain an approved high-quality JPEG source outside the public build if supplied.
- Alt-text guidance: describe the visible pool, fountain, red loungers, and palm-lined grounds; do not infer PPC work, ownership, or endorsement.
- Approval status: Approved by PPC for production website use.

## Licensed Non-Gallery Replacements

The approved Gallery files, order, crops, alt text, and copy remain unchanged. The seven files below are used only in the specified non-Gallery visible placements. Each provider page identifies the photo as free to use, and each output was cropped/resized and optimized as WebP without adding claims of PPC work, property ownership, or endorsement.

### Home Hero Resort Pool

- Filename: `images/production/home-hero-resort-pool.webp`.
- Source URL: `https://www.pexels.com/photo/swimming-pool-in-tropical-resort-6460876/`.
- Provider: Pexels.
- License basis: [Pexels License](https://www.pexels.com/license/) — permits free website and commercial use and modification without required attribution; endorsement may not be implied.
- Placement: Home hero only.
- Date retrieved: 2026-08-28.
- Dimensions: downloaded source 2400 × 1598 px; production output 1920 × 1080 px (16:9 WebP).
- Alt-text guidance: “Wide resort pool with palm trees and surrounding lounge deck.” Do not name the property or imply PPC work, ownership, or endorsement.

### Home Community Pool Preview

- Filename: `images/production/home-gallery-community-pool.webp`.
- Source URL: `https://www.pexels.com/photo/huge-swimming-pool-in-a-luxury-apartment-complex-16461488/`.
- Provider: Pexels.
- License basis: [Pexels License](https://www.pexels.com/license/) — permits free website and commercial use and modification without required attribution; endorsement may not be implied.
- Placement: Home / Our Work tile 1 only.
- Date retrieved: 2026-08-28.
- Dimensions: original source 4672 × 7008 px; production output 1600 × 900 px (16:9 WebP).
- Alt-text guidance: “High-rise community pool with a shared deck and lounge seating.” Do not name the property or imply PPC work or endorsement.

### Home Lap Pool Preview

- Filename: `images/production/home-gallery-lap-pool.webp`.
- Source URL: `https://unsplash.com/photos/outdoor-swimming-pool-with-lanes-and-diving-blocks-LVn0HMq1Pcg`.
- Provider: Unsplash.
- License basis: [Unsplash License](https://unsplash.com/license) — permits free commercial use and modification without required permission or attribution, excluding unmodified resale and competing image services.
- Placement: Home / Our Work tile 2 only.
- Date retrieved: 2026-08-28.
- Dimensions: original source 4284 × 5712 px; production output 1600 × 900 px (16:9 WebP).
- Alt-text guidance: “Outdoor aquatic facility with marked lap lanes and diving blocks.” Do not name the facility or infer PPC work or operational status.

### Home Commercial Spa Preview

- Filename: `images/production/home-gallery-commercial-spa.webp`.
- Source URL: `https://unsplash.com/photos/indoor-hot-tub-with-mountain-view-through-glass-walls-uE7vZHFqQNE`.
- Provider: Unsplash.
- License basis: [Unsplash License](https://unsplash.com/license) — permits free commercial use and modification without required permission or attribution, excluding unmodified resale and competing image services.
- Placement: Home / Our Work tile 3 only.
- Date retrieved: 2026-08-28.
- Dimensions: original source 4078 × 6117 px; production output 1600 × 900 px (16:9 WebP).
- Alt-text guidance: “Indoor spa pool with large windows and surrounding seating.” Do not name the property or infer PPC work, ownership, or endorsement.

### Home Hotel Pool Preview

- Filename: `images/production/home-gallery-hotel-pool.webp`.
- Source URL: `https://www.pexels.com/photo/swimming-pool-in-a-hotel-14022373/`.
- Provider: Pexels.
- License basis: [Pexels License](https://www.pexels.com/license/) — permits free website and commercial use and modification without required attribution; endorsement may not be implied.
- Placement: Home / Our Work tile 4 only.
- Date retrieved: 2026-08-28.
- Dimensions: original source 7721 × 5150 px; production output 1600 × 900 px (16:9 WebP).
- Alt-text guidance: “Hotel courtyard pool with surrounding deck and seating.” Do not name the property or infer PPC work, ownership, or endorsement.

### Home Commercial Maintenance

- Filename: `images/production/home-commercial-maintenance.webp`.
- Source URL: `https://unsplash.com/photos/man-cleaning-a-swimming-pool-with-a-long-pole-z183EqFxuTw`.
- Provider: Unsplash.
- License basis: [Unsplash License](https://unsplash.com/license) — permits free commercial use and modification without required permission or attribution, excluding unmodified resale and competing image services.
- Placement: Home / Commercial Focus only.
- Date retrieved: 2026-08-28.
- Dimensions: downloaded source 2000 × 3000 px; production output 1200 × 1800 px (2:3 WebP).
- Alt-text guidance: “Pool service worker using a long pole at an outdoor community pool.” Do not identify the person or imply PPC employment, a customer relationship, or a maintenance outcome.

### About Commercial Equipment

- Filename: `images/production/about-commercial-equipment.webp`.
- Source URL: `https://unsplash.com/photos/closeup-photo-of-machine-fFRtvdWqyLk`.
- Provider: Unsplash.
- License basis: [Unsplash License](https://unsplash.com/license) — permits free commercial use and modification without required permission or attribution, excluding unmodified resale and competing image services.
- Placement: About / Commercial Focus visible image only.
- Date retrieved: 2026-08-28.
- Dimensions: original source 6000 × 4000 px; production output 1600 × 1067 px (approximately 3:2 WebP).
- Alt-text guidance: “Industrial piping and mechanical equipment in a utility room.” Do not describe the room as pool-specific or imply PPC work, ownership, compliance, or endorsement.

### Production Approval Record

1. PPC approved the current website content and photography for production website use on 2026-08-27.
2. The approved image bytes and crops were retained unchanged.
3. Public references moved mechanically from the retired temporary directory to neutral paths under `images/production/`.
4. Source identities remain only in this internal provenance document.
5. The build and production-readiness checks require production paths and reject the legacy temporary naming convention.

This record does not create or describe license terms, ownership, releases, or third-party endorsement.

`resort-hotel-pool-deck.jpg` is the 1800 × 2400 px (3:4) source master for the two representative WebP files; it is retained in the repository but is not copied to `dist/`. Those WebP files remain in use for Open Graph metadata and archived page cards as mapped above, but no longer render as the homepage hero.

The archived Expanded-tier pages are excluded from `dist/` and are not part of the public Essential site. Their imagery, copy, and alt text must be reviewed separately before any future publication.

## Future PPC Photo Set

Recommended final photo package:

- 1 homepage hero image.
- 4 to 6 customer/property commercial photos.
- 1 to 2 commercial spa photos.
- 2 to 3 equipment or equipment-room photos.
- Optional company/team/service image for About.

## Approval Rules

- Do not display individual customer/property names in public gallery copy, alt text, metadata, or schema; retain source identities only in internal provenance records.
- Use website/customer-provided photos only with permission.
- If naming permission is unavailable, use neutral property-type labels.
- Do not imply PPC owns customer properties.
- Do not imply representative stock photos are PPC customers.
- Do not publish residential backyard pools.

## Future Image Swap Procedure

1. Confirm written photo-use permission and, separately, any property/customer naming permission.
2. Crop and export each approved photo to the exact dimensions, format, and filename in the map. Strip unnecessary metadata, especially location data.
3. Replace the existing file in `images/`; for the hero, replace the source master and both WebP derivatives together.
4. Run `npm run build` and `npm run test:screenshots`, then inspect every listed placement at mobile and desktop widths for faces, signage, focal-point cropping, and text readability.
5. Select a subject compatible with the placement and alt guidance above, then confirm the existing visible-subject description remains accurate. With the mapped subject, filename, format, and dimensions preserved, no HTML, CSS, or JavaScript change is required.
