# SameDayDesk production map

The SameDayDesk gateway turns HTTP and MCP tool calls into x402-protected
resources. This page maps each production concern to the public SDK component
that handles it.

## Live surfaces

- [Product page](https://samedaydesk.com/x402)
- [x402 resource manifest](https://x402-url-extractor-production.up.railway.app/.well-known/x402)
- [Gateway source](https://github.com/epistemedeus/x402-url-extractor)
- [Smithery listing](https://smithery.ai/servers/epistemedeus/x402-data-gateway)

## Component map

| Production concern | Package | Main role |
| --- | --- | --- |
| Resource server | `@x402/core/server` | Registers the Base payment mechanism and facilitator |
| Express routes | `@x402/express` | Returns payment requirements and releases paid responses |
| Base settlement | `@x402/evm/exact/server` | Implements the exact EVM payment scheme |
| Agent discovery | `@x402/extensions/bazaar` | Declares discoverable paid resources |
| MCP tool payment | `@x402/mcp` | Wraps MCP tools with x402 payment requirements |
| Buyer and settlement tests | `@x402/fetch` | Retries a 402 response with a signed payment |

The live gateway pins the x402 package family to version `2.16.0`. The manifest
is the source of truth for current resource names, prices, network, and payment
receiver. Clients should read it instead of hardcoding those values.

## Request lifecycle

1. A client calls a protected HTTP resource or MCP tool.
2. The gateway returns a structured x402 payment requirement.
3. The client chooses a compatible requirement and signs the payment payload.
4. The client retries the same call with that payload.
5. The facilitator verifies and settles the payment on Base.
6. The gateway returns the tool result and payment response metadata.

## Operational checks

When an integration fails, inspect the flow in this order:

1. Confirm the requested resource is present in the live manifest.
2. Confirm the client supports the advertised network and scheme.
3. Confirm the buyer wallet holds the advertised asset on that network.
4. Preserve the original method, URL, body, and content type on the paid retry.
5. Record the 402 requirements and the final payment response separately.
6. Treat settlement confirmation as the revenue signal, not the initial 402.

This sequence separates discovery, signing, transport, and settlement failures
without exposing private keys or other credentials.
