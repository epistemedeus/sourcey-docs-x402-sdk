import { readdir, readFile, writeFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const root = new URL("../dist/", import.meta.url);
const textExtensions = new Set([".css", ".html", ".js", ".json", ".txt", ".xml"]);
const editLinkPattern = /<a href="https:\/\/github\.com\/x402-foundation\/x402\/edit\/[^"]+"[^>]*>[\s\S]*?Edit this page<\/a>/g;

async function normalize(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await normalize(path);
      continue;
    }
    if (!textExtensions.has(extname(entry.name))) continue;

    const original = await readFile(path, "utf8");
    let updated = original
      .replaceAll("api/index.html", "api.html")
      .replace(/[\u2013\u2014]/g, "-");

    if (extname(entry.name) === ".html" && !relative(root.pathname, path).startsWith("api/")) {
      updated = updated.replace(editLinkPattern, "");
    }

    if (updated !== original) await writeFile(path, updated);
  }
}

await normalize(root.pathname);
