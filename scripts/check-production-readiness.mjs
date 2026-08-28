import { access, readdir, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const distribution = join(root, "dist");
const publicSourceFiles = [
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
  "sitemap.xml"
];
const textExtensions = new Set([".html", ".css", ".js", ".mjs", ".xml", ".txt"]);
const temporaryDirectoryPattern = /(?:^|["'(/=\s])(?:\.\/|\/)?images\/temp-property-reference\//i;
const temporaryFilenamePattern = /(?:^|["'(/=\s])temp-[a-z0-9][a-z0-9._-]*/i;

export function scanTextForLaunchBlockingReferences(text) {
  return temporaryDirectoryPattern.test(text) || temporaryFilenamePattern.test(text);
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}

export async function findLaunchBlockingImageReferences() {
  const failures = [];
  for (const source of publicSourceFiles) {
    const path = join(root, source);
    const text = await readFile(path, "utf8");
    if (!scanTextForLaunchBlockingReferences(text)) continue;
    text.split(/\r?\n/).forEach((line, index) => {
      if (scanTextForLaunchBlockingReferences(line)) failures.push(`${source}:${index + 1}`);
    });
  }

  try {
    await access(distribution, constants.R_OK);
  } catch {
    failures.push("dist/ is missing; run npm run build before the production-readiness check");
    return failures;
  }

  for (const path of await walk(distribution)) {
    const builtPath = relative(root, path);
    if (path.split(/[\\/]/).some((segment) => segment.toLowerCase().startsWith("temp-"))) {
      failures.push(builtPath);
      continue;
    }
    if (!textExtensions.has(extname(path).toLowerCase())) continue;
    const text = await readFile(path, "utf8");
    if (scanTextForLaunchBlockingReferences(text)) failures.push(builtPath);
  }
  return [...new Set(failures)].sort();
}

const isCommandLine = process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1]);
if (isCommandLine) {
  const failures = await findLaunchBlockingImageReferences();
  if (failures.length) {
    console.error("PRODUCTION READINESS: FAIL");
    console.error("Legacy temporary image references remain in public output.");
    console.error("Move every approved image to its production path before deployment:");
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exitCode = 1;
  } else {
    console.log("PRODUCTION READINESS: PASS — approved production imagery is in use and no legacy temporary references remain.");
  }
}
