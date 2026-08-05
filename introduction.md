# x402 SDK integration reference

This is SameDayDesk's independent integration reference for the open source
[x402 SDK](https://github.com/x402-foundation/x402). SameDayDesk uses x402 in
its live pay-per-call MCP gateway and in its payment settlement tooling. This
site keeps the operational guidance beside a complete, searchable Sourcey
reference for the upstream Go SDK.

## What is here

- A map from SameDayDesk's production payment flow to the upstream x402 SDK.
- A minimal TypeScript seller pattern using the same package family as our live
  gateway.
- A generated Go reference covering 37 packages and more than 1,300 exported
  top-level declarations before methods and fields are counted.
- Stable links to the exact upstream commit used to generate this site.

## Why SameDayDesk hosts it

The [SameDayDesk x402 Data Gateway](https://samedaydesk.com/x402) exposes paid
agent tools over both HTTP and MCP. Its public server installs `@x402/core`,
`@x402/evm`, `@x402/express`, `@x402/extensions`, and `@x402/mcp`. Our settlement
and self-test tooling also uses `@x402/fetch`. These docs are therefore part of
the product's operating surface, not a generic mirror.

Use the integration guides when building against SameDayDesk. Use the API tab
when you need symbol-level detail for the upstream Go implementation.

## Independence and attribution

SameDayDesk is not the x402 Foundation and does not claim to be the upstream
maintainer. The generated API reference comes from
[`x402-foundation/x402`](https://github.com/x402-foundation/x402) at commit
[`34cb6bd04c88f4333f56b9c778d3d35df997379c`](https://github.com/x402-foundation/x402/tree/34cb6bd04c88f4333f56b9c778d3d35df997379c),
licensed under Apache 2.0. Product-specific guidance is maintained by
SameDayDesk.
