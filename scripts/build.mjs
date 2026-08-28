import { cp, mkdir, rm } from "node:fs/promises";

const output = new URL("../dist/", import.meta.url);
const root = new URL("../", import.meta.url);

const publicFiles = [
  "index.html",
  "services.html",
  "properties.html",
  "about.html",
  "contact.html",
  "faq.html",
  "privacy.html",
  "terms.html",
  "styles.css",
  "script.js",
  "robots.txt",
  "sitemap.xml",
  "_headers"
];

const publicImages = [
  "logo.webp",
  "resort-hotel-pool-deck.webp",
  "resort-hotel-pool-deck-960.webp",
  "commercial-surface-cleaning.jpg",
  "apartment-community-pool-deck.jpg",
  "commercial-hotel-spa.jpg",
  "municipal-lap-pool-lanes.jpg",
  "commercial-equipment-room-service.jpg",
  "commercial-water-testing.jpg"
];

const approvedProductionImages = [
  "about-commercial-equipment.webp",
  "commercial-mechanical-room.jpg",
  "commercial-water-check.jpg",
  "gallery-pool-01.webp",
  "gallery-pool-02.webp",
  "gallery-pool-03.webp",
  "gallery-pool-04.webp",
  "gallery-pool-05.webp",
  "gallery-pool-06.webp",
  "gallery-pool-07.webp",
  "home-commercial-maintenance.webp",
  "home-gallery-commercial-spa.webp",
  "home-gallery-community-pool.webp",
  "home-gallery-hotel-pool.webp",
  "home-gallery-lap-pool.webp",
  "home-hero-resort-pool.webp"
];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const file of publicFiles) {
  await cp(new URL(file, root), new URL(file, output));
}

await mkdir(new URL("images/", output));
for (const image of publicImages) {
  await cp(new URL(`images/${image}`, root), new URL(`images/${image}`, output));
}
await mkdir(new URL("images/production/", output));
for (const image of approvedProductionImages) {
  await cp(
    new URL(`images/production/${image}`, root),
    new URL(`images/production/${image}`, output)
  );
}
console.log("Built the Essential public site in dist/.");
