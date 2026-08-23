# PPC LLC Website Image Replacement Map

## Brand Assets

- `logo.png`: original PPC LLC logo source.
- `logo.webp`: optimized public logo.

## Current Representative Photography

The current public images communicate a commercial visual direction while PPC gathers approved company and customer/property photography. They are not presented as PPC customer properties or completed PPC work.

All replacement photos must be commercial. Do not use residential backyard pool photography. Water-testing photography is not required. The dimensions below deliberately match the current intrinsic dimensions in the page markup. Exporting to those dimensions and replacing the files under the same names requires no HTML, CSS, or JavaScript changes.

| Current filename | All placements | Intended approved subject | Orientation / minimum export / aspect ratio | Safe crop considerations | Delivery target | Alt-text guidance | Permission requirement |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `resort-hotel-pool-deck.webp` | Home hero; Open Graph image for Home and Contact; Open Graph image plus Our Work and Industries cards on archived pages (not deployed) | One high-impact commercial pool at a resort, hotel, multifamily, HOA, municipal, or other managed aquatic facility | Portrait; 1440 × 1920 px; 3:4 | Keep the primary pool/facility detail near center; allow substantial edge loss and preserve calm areas behind hero copy across narrow and wide screens | WebP quality 76–82; keep filename exactly | Describe the visible commercial facility and setting, not ownership or customer status | Written photo-use permission is required for customer/property imagery and recognizable people; naming requires separate written approval |
| `resort-hotel-pool-deck-960.webp` | Home hero responsive source up to 960 px; responsive source for Our Work and Industries cards (archived, not deployed) | The same source and crop as the 1440 px hero | Portrait; 960 × 1280 px; 3:4 | Match the larger hero's crop and focal point so responsive switching is not noticeable | WebP quality 76–82; keep filename exactly | Uses each parent image's HTML alt; no separate wording needed | Same permission as the master hero image |
| `commercial-surface-cleaning.jpg` | Home / Commercial Focus; Our Work card (archived, not deployed) | PPC technician, approved service activity, or commercial field-service scene | Portrait; 1200 × 1824 px; 25:38 (approximately 2:3) | Keep hands, tools, and service action away from extreme edges; leave enough context to read as commercial | Progressive JPEG quality 80–85; keep filename exactly | Describe the visible task and commercial setting; do not claim the person or property is a customer unless approved | Written permission for recognizable people and customer/property use; property naming requires separate written approval |
| `apartment-community-pool-deck.jpg` | Home / Properties We Serve / Golden Nugget temporary placeholder; Industries card (archived, not deployed) | Apartment or multifamily commercial pool amenity; this image is not Golden Nugget | Landscape; 1500 × 1000 px; 3:2 | Keep the pool and shared amenity context centered; avoid critical signage, faces, or logos at the edges | Progressive JPEG quality 80–85; keep filename exactly while used as a placeholder | Describe the visible apartment-community pool/deck without naming it | Representative placeholder only; do not present as Golden Nugget photography |
| `commercial-hotel-spa.jpg` | Home / Properties We Serve / Red Rock Casino Resort & Spa temporary placeholder; Our Work and Industries cards (archived, not deployed) | Representative commercial spa; this image is not Red Rock Casino Resort & Spa | Portrait; 1400 × 2100 px; 2:3 | Center the spa basin and recognizable commercial context; allow top/bottom crop without losing the subject | Progressive JPEG quality 80–85; keep filename exactly while used as a placeholder | Describe the visible commercial spa and setting without naming it; avoid unsupported maintenance claims | Representative placeholder only; do not present as Red Rock Casino Resort & Spa photography |
| `municipal-lap-pool-lanes.jpg` | Home / Properties We Serve / Station Casinos temporary placeholder; Services / Urgent & Operational Support; Commercial Pool Service and Industries cards (archived, not deployed) | Representative large managed aquatic facility; this image is not a Station Casinos property | Portrait; 1400 × 2100 px; 2:3 | Keep lane/facility cues central and usable in both portrait card and wider service-section crops; avoid edge-dependent signage | Progressive JPEG quality 80–85; keep filename exactly while used as a placeholder | Describe the visible aquatic facility without naming it; do not imply CPO coverage, recovery work, or inspection outcomes solely from the image | Representative placeholder only; do not present as Station Casinos photography |
| `commercial-equipment-room-service.jpg` | Home / Properties We Serve / Palms Casino Resort temporary placeholder; Services / Equipment & Restoration; About / Commercial Focus; Open Graph image for Services and About; two Our Work cards (archived, not deployed) | Representative commercial equipment/service scene; this image is not Palms Casino Resort | Landscape; 1500 × 1000 px; 3:2 | Keep the key equipment/service action centered; allow vertical and horizontal crop; remove or avoid legible account labels, access codes, and sensitive facility details | Progressive JPEG quality 80–85; keep filename exactly while used as a placeholder | Describe only visible equipment or service access without naming it; do not infer repair completion, compliance, or inspection results | Representative placeholder only; do not present as Palms Casino Resort photography |
| `commercial-water-testing.jpg` | Services / Maintenance; Our Work and Industries cards (archived, not deployed) | Commercial pool or spa maintenance scene; water testing is optional | Portrait; 1200 × 1800 px; 2:3 | Keep the maintenance subject central so the layout can use a wider crop; avoid tiny instruments or text as the only meaningful detail | Progressive JPEG quality 80–85; keep filename exactly | Describe the visible maintenance activity and commercial setting without promising water-quality outcomes | Written customer/property and recognizable-person permission; written naming permission if identified |

## Home Property Showcase Approval and Replacement Map

The four property names are staged for the homepage but remain pending final written marketing-use approval. The current images are representative placeholders and are not photos of the named properties. No property website photo, search result, or third-party image may be downloaded or reused unless explicit reuse permission or a clearly permissive license is documented.

Use dedicated image files for the final showcase so replacing a homepage placeholder does not silently change the same image on Services, About, or archived pages.

| Card label | Current temporary placeholder | Planned dedicated approved file | Final image and alt-text guidance | Approval status |
| --- | --- | --- | --- | --- |
| Golden Nugget | `apartment-community-pool-deck.jpg` | `golden-nugget-pool.jpg` | Use an approved real Golden Nugget property/pool photo. Alt text must name Golden Nugget and describe the actual pool, spa, deck, or hospitality setting visibly shown without inferring PPC work from the image alone. | Property-name and photo marketing-use approval pending |
| Red Rock Casino Resort & Spa | `commercial-hotel-spa.jpg` | `red-rock-casino-resort-spa-pool.jpg` | Use an approved real Red Rock Casino Resort & Spa pool or spa photo. Alt text must name the property and describe the actual aquatic area and visible setting without unsupported service claims. | Property-name and photo marketing-use approval pending |
| Station Casinos | `municipal-lap-pool-lanes.jpg` | `station-casinos-pool.jpg` | Use an approved real pool or spa photo from the intended Station Casinos property. Alt text must identify the specific approved property when known and describe the actual aquatic area shown rather than a generic facility type. | Property-name and photo marketing-use approval pending |
| Palms Casino Resort | `commercial-equipment-room-service.jpg` | `palms-casino-resort-pool.jpg` | Use an approved real Palms Casino Resort pool or spa photo. Alt text must name Palms Casino Resort and describe the actual pool, spa, deck, or hospitality setting visibly shown without unsupported service claims. | Property-name and photo marketing-use approval pending |

When an approved file is delivered, add it under the planned dedicated filename (or document an approved replacement filename), update that card's `src`, intrinsic dimensions, and truthful alt text in `index.html`, and add the new file to `publicImages` in `scripts/build.mjs`. Do not overwrite a shared placeholder filename. Confirm written name approval, photo-use rights, recognizable-person releases, and any visible signage or trademark treatment separately before publication. The card design permits property-name text only; do not add property logos.

`resort-hotel-pool-deck.jpg` is the 1800 × 2400 px (3:4) source master for the two deployed hero WebP files; it is retained in the repository but is not copied to `dist/`. Replace it with the approved full-resolution master at 1800 × 2400 px or larger, then export the two exact WebP derivatives above. This source-file swap also requires no markup or styling changes.

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
