# Image Replacement Guide

The website now uses generated commercial pool imagery for the hero, primary service panel, resort panel, spa panel, and equipment-room panel. Remaining image slots use styled CSS fallback panels so the page does not show broken image icons.

Current generated assets:

- `hero-pool.png` - Premium commercial resort pool hero and resort section image.
- `commercial-service.png` - Commercial maintenance service image used for service and spa panels.
- `equipment-room.png` - Commercial pool mechanical-room image.

Recommended future image assets:

- `hero.jpg` - Real Professional Pool Care or client-approved commercial pool hero image.
- `commercial-pool.jpg` - Commercial pool maintenance image.
- `resort-pool.jpg` - Resort or hospitality pool image.
- `spa-maintenance.jpg` - Commercial spa maintenance image.
- `equipment-room.jpg` - Pool equipment room or mechanical system image.
- `acid-washing.jpg` - Acid washing or surface restoration image.
- `before-after.jpg` - Before and after service image.
- `team.jpg` - Professional Pool Care LLC team image.
- `company-vehicle.jpg` - Branded company vehicle image.

When real photography is available, replace the generated PNG references in `styles.css` with approved photography. Keep the same class names so the current layout and responsive behavior continue to work.
