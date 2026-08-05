# Go SDK quickstart

The Sourcey API tab is generated from the x402 Go v2 module. This short path
helps Go users find the right package before drilling into individual symbols.

## Install

```bash
go get github.com/x402-foundation/x402/go/v2
```

## Choose a role

| You are building | Start with |
| --- | --- |
| A client that pays for resources | `x402.X402Client` and `http.HTTPClient` |
| A server that accepts payments | `x402.X402ResourceServer` and an HTTP middleware package |
| A facilitator | `x402.X402Facilitator` and `http.HTTPFacilitatorClient` |
| A Base or EVM integration | `mechanisms/evm` plus an exact, upto, or batch-settlement role package |
| An MCP server | `mcp` plus a configured resource server |
| A discoverable resource | `extensions/bazaar` |

## Reference scope

The generated snapshot excludes the deprecated `legacy` tree and test helper
packages. It includes the core module, HTTP integrations, MCP support,
extensions, signers, EVM and SVM mechanisms, and their public role-specific
packages.

Every package page is generated from the pinned upstream source. Where upstream
has a doc comment, Sourcey displays it with the matching declaration. The
version and scope page records the exact commit and coverage counts.
