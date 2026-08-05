import { readFile, writeFile } from "node:fs/promises";

const snapshotUrl = new URL("../godoc.json", import.meta.url);
const targetPackage = "github.com/x402-foundation/x402/go/v2/http";
const templates = new Set([
  "AVMPaywallTemplate",
  "EVMPaywallTemplate",
  "SVMPaywallTemplate",
]);

const snapshot = JSON.parse(await readFile(snapshotUrl, "utf8"));
const httpPackage = (snapshot.packages || []).find(
  (pkg) => pkg.importPath === targetPackage,
);

if (!httpPackage) {
  throw new Error(`Package not found in godoc snapshot: ${targetPackage}`);
}

const normalized = [];
for (const constant of httpPackage.consts || []) {
  if (!templates.has(constant.name)) continue;

  if (typeof constant.declaration !== "string") {
    throw new Error(`Missing declaration for ${constant.name}`);
  }

  constant.declaration =
    `const ${constant.name} = "[embedded paywall template literal omitted from generated docs; follow the source link for the complete value]"`;
  normalized.push(constant.name);
}

const missing = [...templates].filter((name) => !normalized.includes(name));
if (missing.length > 0) {
  throw new Error(`Expected template constants not found: ${missing.join(", ")}`);
}

const serialized = `${JSON.stringify(snapshot, null, 2)}\n`.replace(
  /[\u2013\u2014]/g,
  "-",
);
await writeFile(snapshotUrl, serialized);
process.stdout.write(
  `Normalized ${normalized.length} embedded template declarations: ${normalized.join(", ")}\n`,
);
