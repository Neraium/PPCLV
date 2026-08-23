# Expanded-tier source archive

This directory retains work created for the Expanded Commercial Website package so it can be considered in a future upgrade without being part of the Essential delivery.

Retained source material:

- `industries.html`: industry-specific marketing content.
- `our-work.html`: standalone work and gallery-style content.
- `gallery.html`: former gallery compatibility route.
- `faq.html`: expanded FAQ content and FAQPage structured data.
- `commercial-pool-service-las-vegas.html`: dedicated commercial search landing page.
- `expanded-styles.css`: pre-alignment shared stylesheet retained with the expanded implementation.
- `expanded-script.js`: pre-alignment shared behavior retained with the expanded implementation.

Every archived HTML file includes a `noindex` directive. The production build uses an explicit public-file allowlist and does not copy this directory into `dist/`, so these sources do not ship through the Cloudflare Worker deployment. They are also absent from the core navigation, footer, and sitemap.

Archived HTML files preserve their original root-relative source references for future development. The companion stylesheet and script preserve the implementation context from immediately before the Essential alignment. Restore and review paths, copy, claims, schema, photography permissions, and package scope before promoting any of this material again.
