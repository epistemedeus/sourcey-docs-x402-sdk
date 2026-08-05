# Minimal TypeScript seller pattern

SameDayDesk's public gateway uses the official x402 TypeScript packages with an
Express server. The reduced pattern below shows the same component boundaries
without copying product-specific routes or credentials.

```ts
import express from "express";
import { paymentMiddleware } from "@x402/express";
import { x402ResourceServer, HTTPFacilitatorClient } from "@x402/core/server";
import { ExactEvmScheme } from "@x402/evm/exact/server";

const app = express();
const network = "eip155:8453";

const facilitator = new HTTPFacilitatorClient({
  url: process.env.X402_FACILITATOR_URL,
});

const resourceServer = new x402ResourceServer(facilitator).register(
  network,
  new ExactEvmScheme(),
);

app.use(
  paymentMiddleware(
    {
      "GET /paid": {
        accepts: {
          scheme: "exact",
          network,
          payTo: process.env.X402_PAY_TO,
          price: "$0.01",
        },
        description: "Example paid resource",
        mimeType: "application/json",
      },
    },
    resourceServer,
  ),
);

app.get("/paid", (_req, res) => {
  res.json({ ok: true });
});
```

## Production requirements

The snippet is intentionally small. A real seller should also add:

- Startup validation for the facilitator URL, payment receiver, network, and
  asset.
- Request limits and timeouts before any expensive work begins.
- Idempotency around work that must not repeat after a paid retry.
- Structured logs that keep payment identifiers while excluding signatures and
  secrets.
- A public `/.well-known/x402` resource manifest for agent discovery.
- Tests for the unpaid 402 response, paid retry, failed verification, and
  settlement result.

For the complete public implementation, see the
[SameDayDesk gateway repository](https://github.com/epistemedeus/x402-url-extractor).
For SDK behavior and current signatures, use the upstream x402 repository and
the generated API reference in this site.
