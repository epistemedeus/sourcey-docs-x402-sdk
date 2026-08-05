# Frantic #33: Sourcey x402 SDK integration reference

Bounty: Frantic #33, "Publish Sourcey docs for a maintained OSS library" ($20).

## Why this is a credible project-owned publication

The target is the maintained, Apache 2.0 licensed x402 SDK monorepo, pinned at
commit `34cb6bd04c88f4333f56b9c778d3d35df997379c` from 2026-08-04. The generated
Go reference covers module `github.com/x402-foundation/x402/go/v2` at SDK
version 2.21.0.

SameDayDesk is not claiming to maintain x402. It is a production integrator:

1. The public product page at https://samedaydesk.com/x402 describes the live
   pay-per-call data gateway and links directly to this SDK reference.
2. The gateway source is public at
   https://github.com/epistemedeus/x402-url-extractor. Its package manifest at
   commit `518f5333fb96316426289ce7795e059eb0c3f336` declares `@x402/core`,
   `@x402/evm`, `@x402/express`, `@x402/extensions`, and `@x402/mcp`.
3. The live gateway publishes a seven-resource x402 manifest at
   https://x402-url-extractor-production.up.railway.app/.well-known/x402.
4. SameDayDesk links the reference from its product page, resources hub,
   `llms.txt`, sitemap, and noscript index. The docs are useful product
   documentation, not an orphan file placed on an unrelated domain.

This relationship directly addresses the provenance issue in the earlier
go-chi attempt. The docs live on a durable domain operated by a real user of
the documented SDK family, with both the dependency evidence and the inbound
product link pinned or publicly inspectable.

## What was built

- Sourcey 3.6.5 using its native godoc snapshot adapter.
- Five authored integration and reference pages: introduction, SameDayDesk
  production relationship, TypeScript seller setup, Go quickstart, and pinned
  version and generation scope.
- A searchable Go API reference for 37 non-legacy packages.
- Immutable source links to the exact upstream commit, including the correct
  `go/` source path and line number.
- A reproducible, normalized `godoc.json` snapshot and complete generated site.
- A governed runx audit that independently recomputes the API counts and checks
  the upstream pin, license, durable docs URL, product URL, product repository,
  product commit, and commit-pinned relationship evidence.

The snapshot contains 524 exported constants, 90 exported variables, 379
exported functions, 431 exported types, 267 exported methods, and 1,026
exported fields. The narrow bounty count of functions, types, and methods is
1,077, far above the minimum of 20.

Three exported `http` constants contain complete multi-megabyte AVM, EVM, and
SVM paywall templates. Their names, docs, source positions, and immutable source
links remain in the reference, while only their literal bodies are elided. This
reduced the generated site from 28 MB to 9.6 MB without removing API symbols.

## Documentation gap analysis

The pinned godoc snapshot exposes four concrete upstream documentation gaps:

1. Package-level orientation is sparse. 27 of 37 included packages have no
   package comment in the snapshot. This is most noticeable in the root module,
   all three HTTP middleware packages, the signer packages, and most mechanism
   role packages. Adding short `doc.go` files would turn the package index into
   an architectural map instead of a list of symbols.

2. Exported symbol coverage is incomplete. Of the included surface, 8 of 379
   functions, 3 of 431 types, and 53 of 267 methods have empty doc comments.
   The method gap is material because generated reference pages show signatures
   without intent, invariants, or error behavior.

3. The generated godoc snapshot contains zero conventional Go examples. The
   repository has runnable application examples elsewhere, but package-local
   `Example...` tests would appear directly beside the related APIs in standard
   Go documentation and would also verify that snippets compile.

4. `go/README.md` understates the current surface. Its middleware inventory
   highlights Gin, while the pinned source also ships Echo and `net/http`
   middleware. Its package map omits the MCP package, EVM `upto`, EVM batch
   settlement, and several extensions now visible in the snapshot. Updating the
   README inventory from the current package tree would prevent new users from
   overlooking supported integration paths.

These findings are measurements from the committed snapshot, not guesses about
the project. The evidence file records the exact denominators and pin.

## Verification

- `npm run build` completed successfully for the SameDayDesk application at
  deployment commit `226c94e2cd2ea0755e5b01c3f4dc4b36d867e613`.
- An internal link and fragment crawl successfully scanned all 46 local routes.
- The public-output scan found no em dash or en dash characters.
- The governed audit ran with exact version output `runx-cli 0.6.13`, passed all
  9 checks, and recomputed 1,077 APIs across 37
  packages.
- `runx verify` validated the digest, content address, and production Ed25519
  signature of receipt
  `runx:receipt:sha256:b6d815ea372ff33825cff1ec527c126db725aa80f096c52521f0a21bae585538`.

## Artifacts

- `public_url`: https://samedaydesk.com/docs/x402-sdk/
- `evidence_json`: `delivery/evidence.json`
- `report`: this file
- `receipt_ref`: `runx:receipt:sha256:b6d815ea372ff33825cff1ec527c126db725aa80f096c52521f0a21bae585538`
