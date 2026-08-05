import { defineConfig, godoc, markdown } from "sourcey";

const sourceCommit = "34cb6bd04c88f4333f56b9c778d3d35df997379c";

export default defineConfig({
  name: "x402 SDK Integration",
  siteUrl: "https://samedaydesk.com",
  baseUrl: "/docs/x402-sdk",
  prettyUrls: false,
  repo: "https://github.com/x402-foundation/x402",
  editBranch: sourceCommit,
  theme: {
    preset: "api-first",
    colors: {
      primary: "#2357d9",
      light: "#4d79e6",
      dark: "#173b94",
    },
  },
  navigation: {
    tabs: [
      {
        tab: "Integration",
        slug: "",
        source: markdown({
          groups: [
            {
              group: "Start here",
              pages: ["introduction", "samedaydesk-production", "typescript-seller"],
            },
            {
              group: "Reference notes",
              pages: ["go-quickstart", "version-and-scope"],
            },
          ],
        }),
      },
      {
        tab: "Go API Reference",
        slug: "api",
        source: godoc({
          module: "./source/go",
          snapshot: "./godoc.json",
          mode: "snapshot",
          includeTests: false,
          sourceBasePath: "go",
          exclude: [
            "github.com/x402-foundation/x402/go/v2/legacy",
            "github.com/x402-foundation/x402/go/v2/test",
          ],
        }),
      },
    ],
  },
  navbar: {
    links: [
      {
        type: "link",
        href: "https://samedaydesk.com/x402",
        label: "SameDayDesk x402",
      },
      {
        type: "github",
        href: "https://github.com/x402-foundation/x402",
        label: "Upstream x402",
      },
    ],
  },
  footer: {
    links: [
      {
        type: "link",
        href: "https://x402-url-extractor-production.up.railway.app/.well-known/x402",
        label: "Live x402 manifest",
      },
      {
        type: "link",
        href: `https://github.com/x402-foundation/x402/tree/${sourceCommit}`,
        label: "Pinned upstream source",
      },
      {
        type: "link",
        href: `https://github.com/x402-foundation/x402/blob/${sourceCommit}/LICENSE`,
        label: "Apache 2.0 license",
      },
    ],
  },
});
