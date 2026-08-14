# Design Manifest

> Generated: 2026-08-14
> Mode: extracted and refined
> Source: `styles.css`, PPC logo, the four Essential public pages, and commercial-brand refinement criteria

## Colors

### Primary Palette

- primary: `#0b5c82` — buttons, links, navigation indicators, and interactive accents
- primary-hover: `#084667`
- primary-muted: `#e3f0f6`
- secondary: `#0b6763` — large service calls to action and success states
- secondary-hover: `#137a74`
- focus: `#26b7ca`
- decorative-accent: `#d2ad55`
- accent-text: `#8b681b`
- accent-on-dark: `#f0d38a`

### Neutral Palette

- background: `#ffffff`
- surface: `#f2f8fb` — section backgrounds
- surface-alt: `#e3f0f6` — featured cards and hero gradients
- border: `#c8dce7`
- text-primary: `#142e40`
- text-secondary: `#496779`
- text-on-dark: `#d6e7ed`
- text-muted-on-dark: `#bfd4dc`
- navy-950: `#031a2d`
- navy-900: `#062f4f`
- navy-800: `#0a4b73`

### Semantic

- success: `#0b6763`
- warning: `#8b681b`
- error: `#98382d`
- info: `#0b5c82`

## Typography

- font-family: `Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- heading-font: `Manrope, Inter, system-ui, sans-serif`
- Type scale: xs `0.74rem`, sm `0.86rem`, base `1rem`, lg `1.15rem`, xl `1.45rem`, 2xl `1.9rem`, 3xl `3rem`, display `4.25rem`
- Line heights: tight `1.08`, normal `1.4`, relaxed `1.65`
- Font weights used: `400`, `600`, `700`, `800`

## Spacing

- Base unit: `4px`
- Scale: `4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`, `48px`, `72px`, `108px`
- Component padding: `12px 21px` for buttons and `27px-46px` for form panels
- Section gap: `68px-108px` using `--section-space`
- Page margin: `24px` desktop/tablet and `15px` compact mobile

## Shape

- Border radius: button `3px`, input `4px`, default `6px`
- Default radius: `6px`
- Shadow scale: soft `0 8px 22px rgba(3, 26, 45, 0.08)`, standard `0 18px 38px rgba(3, 26, 45, 0.12)`, image-dark `0 20px 46px rgba(0, 0, 0, 0.26)`

## Layout

- Max content width: `1200px`
- Breakpoints: compact `560px`, stacked `760px`, tablet navigation `900px`, wide adjustment `1060px`
- Grid/flex preference: CSS Grid for page composition; Flexbox for navigation and action groups
- Spacing rhythm: generous section spacing, compact internal item dividers, and consistent `12px-34px` component gaps

## Component Patterns

- Button: minimum `48px` height, `12px 21px` padding, `3px` radius, weight `800`, pool-blue primary fill, 160ms transition
- Card: `6px` radius, pale blue surface or white background, subtle navy shadow, gold decorative rule where appropriate
- Input: minimum `50px` height, `11px 13px` padding, `4px` radius, `#aebfca` border, aqua focus ring
- Dark section: solid deep navy, white headings, muted blue-gray body copy, warm gold eyebrow or decorative accent
- CTA band: solid restrained teal with white action controls

## Anti-Patterns (things to flag)

- Colors outside this palette without an accessibility or content-specific reason
- Gold decorative shades used for small text on light backgrounds; use `#8b681b` instead
- Teal replacing the logo-aligned pool blue as the primary interaction color
- Gradients, glow effects, or saturated cyan used without a functional hierarchy reason
- Large or dark shadows that make cards and images appear to float
- Font sizes outside the documented type scale without a responsive typography reason
- Spacing values outside the documented rhythm without a layout constraint
- Border radii that do not match the `3px`, `4px`, or `6px` shape system
- Hardcoded colors when an equivalent CSS custom property exists
