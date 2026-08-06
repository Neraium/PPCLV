import { cp, mkdir, rm } from "node:fs/promises";

const output = new URL("../dist/", import.meta.url);
const root = new URL("../", import.meta.url);

const publicFiles = [
  "index.html",
  "services.html",
  "about.html",
  "contact.html",
  "privacy.html",
  "terms.html",
  "styles.css",
  "script.js",
  "robots.txt",
  "sitemap.xml",
  ".nojekyll"
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

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const file of publicFiles) {
  await cp(new URL(file, root), new URL(file, output));
}

await mkdir(new URL("images/", output));
for (const image of publicImages) {
  await cp(new URL(`images/${image}`, root), new URL(`images/${image}`, output));
}
console.log("Built the Essential public site in dist/.");
