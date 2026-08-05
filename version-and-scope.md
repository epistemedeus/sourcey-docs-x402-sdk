# Version and generation scope

This site is reproducible and intentionally pinned. It is not a floating scrape
of the upstream default branch.

## Source

- Repository: [`x402-foundation/x402`](https://github.com/x402-foundation/x402)
- Commit: [`34cb6bd04c88f4333f56b9c778d3d35df997379c`](https://github.com/x402-foundation/x402/tree/34cb6bd04c88f4333f56b9c778d3d35df997379c)
- Go module: `github.com/x402-foundation/x402/go/v2`
- License: [Apache 2.0](https://github.com/x402-foundation/x402/blob/34cb6bd04c88f4333f56b9c778d3d35df997379c/LICENSE)
- Generator: Sourcey 3.6.5 using its native godoc snapshot adapter

## Display normalization

The `http` package exports three multi-megabyte constants containing complete
AVM, EVM, and SVM paywall HTML templates. Their names, documentation, source
positions, and immutable source links are preserved here. Only the literal
bodies are elided from the generated reference so the documentation remains
fast to load. Follow each symbol's source link to inspect its complete value.

## Generated coverage

The snapshot contains:

- 37 non-legacy packages
- 524 exported constants
- 90 exported variables
- 379 exported functions
- 431 exported types
- 267 exported methods
- 1,026 exported fields

The bounty threshold is 20 public APIs. This reference exceeds it by more than
an order of magnitude under even the narrowest top-level declaration count.

## Rebuild

```bash
npm run snapshot
npm run build
```

After rebuilding, review the snapshot diff, update this page if counts changed,
and verify all source and product links before publishing.
