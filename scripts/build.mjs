import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { extname } from "node:path";

const output = new URL("../dist/", import.meta.url);
const root = new URL("../", import.meta.url);
const rootFiles = await readdir(root, { withFileTypes: true });

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const entry of rootFiles) {
  if (entry.isFile() && [".html", ".css", ".js", ".xml", ".txt"].includes(extname(entry.name))) {
    await cp(new URL(entry.name, root), new URL(entry.name, output));
  }
}

await cp(new URL("images/", root), new URL("images/", output), { recursive: true });
await cp(new URL(".nojekyll", root), new URL(".nojekyll", output));
console.log("Built static site in dist/.");
