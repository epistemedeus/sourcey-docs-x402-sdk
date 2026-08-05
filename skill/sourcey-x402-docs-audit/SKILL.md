---
name: sourcey-x402-docs-audit
description: Governed validation of the SameDayDesk x402 Sourcey site. Recomputes the exported Go API surface from a committed godoc snapshot and asserts the pinned upstream target, Apache license, durable public home, and product integration evidence. Reads only local public data and performs no network access or mutation.
---

# sourcey-x402-docs-audit

This skill checks that the SameDayDesk x402 integration reference is backed by
a real, pinned, sufficiently large public SDK surface and a declared production
relationship.

## Inputs

- `module_path`: the Go module covered by the generated API reference.
- `sdk_version`: the SDK version reported by the pinned source.
- `pinned_commit`: the 40-character upstream commit used for the snapshot.
- `license`: the upstream license identifier.
- `public_url`: the durable published documentation URL.
- `product_url`: the SameDayDesk product page that uses x402.
- `product_repo`: the public gateway repository.
- `product_commit`: the pinned gateway commit proving the dependency set.
- `relationship_evidence_url`: a commit-pinned public package manifest.
- `min_apis`: the minimum exported function, type, and method count. Defaults to 20.

## Governed behavior

1. Read the bundled `godoc.json` snapshot.
2. Recompute package, constant, variable, function, type, method, and field counts.
3. Check the module, commit pins, license, durable public URL, product URL, and
   commit-pinned relationship evidence shape.
4. Emit a `sourcey.x402.docs.audit.result.v1` object and stop with exit 64 if
   any check fails.

The skill performs no network access and publishes nothing.
