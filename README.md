# sourcey-docs-x402-sdk

A reproducible Sourcey documentation site for the Go SDK in
[`x402-foundation/x402`](https://github.com/x402-foundation/x402), paired with
production integration notes from SameDayDesk's live x402 data gateway.

- Live docs: https://samedaydesk.com/docs/x402-sdk/
- Product integration: https://samedaydesk.com/x402
- Upstream target: x402 SDK 2.21.0 at commit
  `34cb6bd04c88f4333f56b9c778d3d35df997379c`, Apache 2.0
- Product evidence: SameDayDesk gateway commit
  `518f5333fb96316426289ce7795e059eb0c3f336`
- Coverage: 37 packages and 1,077 exported functions, types, and methods
- Generator: Sourcey 3.6.5 with its native godoc snapshot adapter
- Governed proof: runx receipt
  `sha256:b6d815ea372ff33825cff1ec527c126db725aa80f096c52521f0a21bae585538`

SameDayDesk is an independent x402 integrator, not the x402 Foundation and not
an upstream maintainer. This site exists because the SameDayDesk gateway uses
the x402 SDK family in production. The exact relationship is proven by the
gateway's commit-pinned package manifest.

## Layout

- `sourcey.config.ts`, `godoc.json`, and the root markdown files are the Sourcey inputs.
- `scripts/` contains the reproducible snapshot and public-output normalization steps.
- `site/` is the complete generated static site published on SameDayDesk.
- `skill/sourcey-x402-docs-audit/` recomputes the API surface and checks provenance.
- `delivery/` contains the evidence record, report, verification record, and sealed receipt.

## Reproduce

```sh
git clone https://github.com/x402-foundation/x402.git source
git -C source checkout 34cb6bd04c88f4333f56b9c778d3d35df997379c
npm ci
npm run snapshot
npm run build
```

The snapshot normalizer preserves all exported symbols, documentation, source
positions, and immutable source links. It elides only the literal bodies of
three multi-megabyte embedded paywall-template constants so the reference stays
fast to load. See `version-and-scope.md` for the precise scope.

Verify the sealed receipt:

```sh
RUNX_RECEIPT_VERIFY_KID=epistemedeus-secret-catcher \
RUNX_RECEIPT_VERIFY_ED25519_PUBLIC_KEY_BASE64=WsDXUw1Os7UbLMG+qDfsbTAysd30qEeXfZsgNyzVFTc= \
runx verify --receipt delivery/receipt.json -j
```

The authored audit and integration material is MIT licensed. Generated API
material and upstream-derived metadata remain subject to x402's Apache 2.0
license and upstream copyright.
