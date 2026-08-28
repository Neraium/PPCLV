import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const defaultRoot = fileURLToPath(new URL("../", import.meta.url));

export const publicHtmlPages = [
  "index.html",
  "services.html",
  "properties.html",
  "about.html",
  "contact.html",
  "faq.html",
  "privacy.html",
  "terms.html"
];

// The site logo is the only intentionally repeated visible <img> branding asset.
const excludedVisibleImagePaths = new Set(["images/logo.webp"]);

function lineNumberAt(text, offset) {
  return text.slice(0, offset).split(/\r?\n/).length;
}

function localImagePath(src) {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(src)) return null;
  const path = src.split(/[?#]/, 1)[0];
  try {
    return decodeURIComponent(path).replace(/^\.\//, "");
  } catch {
    return path.replace(/^\.\//, "");
  }
}

export function findVisibleImageSources(html) {
  const images = [];
  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    const source = tag.match(/\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/i);
    if (!source) continue;
    images.push({ src: source[1] ?? source[2] ?? source[3], line: lineNumberAt(html, match.index) });
  }
  return images;
}

export async function auditVisiblePhotoDuplicates({
  rootDirectory = defaultRoot,
  pages = publicHtmlPages
} = {}) {
  const siteRoot = resolve(rootDirectory);
  const placements = [];
  const missingFiles = [];

  for (const page of pages) {
    const pagePath = resolve(siteRoot, page);
    const html = await readFile(pagePath, "utf8");
    for (const image of findVisibleImageSources(html)) {
      const localPath = localImagePath(image.src);
      if (!localPath || excludedVisibleImagePaths.has(localPath)) continue;

      const resolvedPath = resolve(dirname(pagePath), localPath);
      const displayPath = relative(siteRoot, resolvedPath).replaceAll("\\", "/");
      const placement = { page, line: image.line, src: image.src, path: displayPath, resolvedPath };
      placements.push(placement);

      if (displayPath === ".." || displayPath.startsWith("../")) {
        missingFiles.push({ ...placement, reason: "resolves outside the public site root" });
        continue;
      }

      try {
        placement.hash = createHash("sha256").update(await readFile(resolvedPath)).digest("hex");
      } catch (error) {
        missingFiles.push({ ...placement, reason: error.code === "ENOENT" ? "file is missing" : error.message });
      }
    }
  }

  const duplicates = [];
  const byPath = Map.groupBy(placements, (placement) => placement.resolvedPath);
  for (const group of byPath.values()) {
    if (group.length > 1) duplicates.push({ type: "path", value: group[0].path, placements: group });
  }

  const hashedPlacements = placements.filter((placement) => placement.hash);
  const byHash = Map.groupBy(hashedPlacements, (placement) => placement.hash);
  for (const [hash, group] of byHash) {
    if (new Set(group.map((placement) => placement.resolvedPath)).size > 1) {
      duplicates.push({ type: "hash", value: hash, placements: group });
    }
  }

  return { placements, duplicates, missingFiles };
}

export function formatVisiblePhotoAuditFailures(audit) {
  const lines = [];
  for (const missing of audit.missingFiles) {
    lines.push(`MISSING ${missing.path} at ${missing.page}:${missing.line} (${missing.reason})`);
  }
  for (const duplicate of audit.duplicates) {
    const label = duplicate.type === "path"
      ? `DUPLICATE PATH ${duplicate.value}`
      : `DUPLICATE SHA-256 ${duplicate.value}`;
    lines.push(label);
    for (const placement of duplicate.placements) {
      lines.push(`  - ${placement.page}:${placement.line} -> ${placement.path}`);
    }
  }
  return lines;
}

const isCommandLine = process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1]);
if (isCommandLine) {
  const audit = await auditVisiblePhotoDuplicates();
  const failures = formatVisiblePhotoAuditFailures(audit);
  if (failures.length) {
    console.error("VISIBLE PUBLIC PHOTO DUPLICATES: FAIL");
    failures.forEach((failure) => console.error(failure));
    process.exitCode = 1;
  } else {
    console.log("VISIBLE PUBLIC PHOTO DUPLICATES: 0");
  }
}
