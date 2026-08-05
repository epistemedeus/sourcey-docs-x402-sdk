import fs from "node:fs";
import crypto from "node:crypto";

const SCHEMA = "sourcey.x402.docs.audit.result.v1";
const SKILL = "sourcey-x402-docs-audit";
const VERSION = "0.1.0";

function readInputs() {
  const raw = process.env.RUNX_INPUTS_PATH
    ? fs.readFileSync(process.env.RUNX_INPUTS_PATH, "utf8")
    : process.env.RUNX_INPUTS_JSON || "{}";
  return JSON.parse(raw);
}

function countApis(godoc) {
  const totals = {
    packages: 0,
    consts: 0,
    vars: 0,
    funcs: 0,
    types: 0,
    methods: 0,
    fields: 0,
  };
  const packages = [];

  for (const pkg of godoc.packages || []) {
    const counts = {
      import_path: pkg.importPath || pkg.name,
      consts: (pkg.consts || []).length,
      vars: (pkg.vars || []).length,
      funcs: (pkg.funcs || []).length,
      types: (pkg.types || []).length,
      methods: (pkg.types || []).reduce(
        (sum, type) => sum + (type.methods || []).length,
        0,
      ),
      fields: (pkg.types || []).reduce(
        (sum, type) => sum + (type.fields || []).length,
        0,
      ),
    };
    totals.packages += 1;
    for (const key of ["consts", "vars", "funcs", "types", "methods", "fields"]) {
      totals[key] += counts[key];
    }
    packages.push(counts);
  }

  totals.api_total = totals.funcs + totals.types + totals.methods;
  totals.top_level_total = totals.consts + totals.vars + totals.funcs + totals.types;
  totals.all_exported_total = totals.top_level_total + totals.methods + totals.fields;
  return { totals, packages };
}

function main() {
  const input = readInputs();
  const minApis = Number.isFinite(input.min_apis) ? Number(input.min_apis) : 20;
  const snapshotRaw = fs.readFileSync(new URL("./godoc.json", import.meta.url), "utf8");
  const snapshotSha256 = crypto.createHash("sha256").update(snapshotRaw).digest("hex");
  const snapshot = JSON.parse(snapshotRaw);
  const apiSurface = countApis(snapshot);

  const checks = [];
  const check = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });
  const isCommit = (value) => typeof value === "string" && /^[0-9a-f]{40}$/.test(value);

  check(
    "module_matches_snapshot",
    input.module_path === snapshot.module_path,
    `snapshot=${snapshot.module_path}; declared=${input.module_path}`,
  );
  check(
    "api_surface_meets_minimum",
    apiSurface.totals.api_total >= minApis,
    `api_total=${apiSurface.totals.api_total}; minimum=${minApis}`,
  );
  check("upstream_commit_is_pinned", isCommit(input.pinned_commit), `commit=${input.pinned_commit}`);
  check("product_commit_is_pinned", isCommit(input.product_commit), `commit=${input.product_commit}`);
  check("license_is_apache_2", input.license === "Apache-2.0", `license=${input.license}`);
  check(
    "durable_public_home",
    /^https:\/\/samedaydesk\.com\/docs\/x402-sdk\/?$/.test(input.public_url || ""),
    `public_url=${input.public_url}`,
  );
  check(
    "product_home_matches",
    input.product_url === "https://samedaydesk.com/x402",
    `product_url=${input.product_url}`,
  );
  check(
    "product_repo_declared",
    input.product_repo === "https://github.com/epistemedeus/x402-url-extractor",
    `product_repo=${input.product_repo}`,
  );
  check(
    "relationship_evidence_is_commit_pinned",
    typeof input.relationship_evidence_url === "string" &&
      input.relationship_evidence_url ===
        `https://raw.githubusercontent.com/epistemedeus/x402-url-extractor/${input.product_commit}/package.json`,
    `relationship_evidence_url=${input.relationship_evidence_url}`,
  );

  const failed = checks.filter((item) => !item.pass);
  const decision = failed.length === 0 ? "pass" : "stop";
  const result = {
    schema: SCHEMA,
    skill: SKILL,
    version: VERSION,
    decision,
    target: {
      module_path: input.module_path,
      sdk_version: input.sdk_version,
      pinned_commit: input.pinned_commit,
      license: input.license,
    },
    publication: {
      public_url: input.public_url,
      product_url: input.product_url,
      product_repo: input.product_repo,
      product_commit: input.product_commit,
      relationship_evidence_url: input.relationship_evidence_url,
    },
    snapshot: {
      sha256: snapshotSha256,
      schema_version: snapshot.schema_version,
      generated_at: snapshot.generated_at,
    },
    api_surface: apiSurface,
    checks,
    observations: [
      `Recomputed ${apiSurface.totals.api_total} exported functions, types, and methods across ${apiSurface.totals.packages} packages.`,
      `Observed ${apiSurface.totals.top_level_total} top-level declarations and ${apiSurface.totals.all_exported_total} exported declarations including methods and fields.`,
      `The minimum is ${minApis}; meets_minimum=${apiSurface.totals.api_total >= minApis}.`,
      `The target is pinned to ${input.pinned_commit} under ${input.license}.`,
      `The product relationship is pinned to gateway commit ${input.product_commit}.`,
      `Governed checks passed: ${checks.length - failed.length}/${checks.length}; decision=${decision}.`,
    ],
  };

  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  process.exit(decision === "pass" ? 0 : 64);
}

main();
