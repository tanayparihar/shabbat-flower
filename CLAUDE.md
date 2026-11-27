# Shabbat Flowers Club: Shopify theme

Custom storefront for Shabbat Flowers Club, built as a restyle and extension of Shopify's **Horizon** theme. The design lives in Framer; this repo is the Liquid implementation.

## Working style

- Be direct and brief. Give practical, working code, not abstract advice.
- Read existing Horizon files before writing new ones, and match their conventions (naming, schema, CSS, JS patterns).
- Make the smallest change that achieves the design. Don't refactor Horizon code that isn't involved.
- Never commit or push any changes. Only the code owner does that.

## Images

- Client requirement: never crop product images (cards, product page, cart, search). Keep each image's own aspect ratio (`image_ratio: adapt`, `height: auto`); no fixed ratios, fixed heights or `object-fit: cover`. This overrides Framer.
- Follow the same rule for other content photos. Hero banners are the exception and may fill their frame.

## Portability

The theme is built on a development account and will later move to the client's store. It must work there without code changes.

- Never hardcode store domains, theme IDs, resource IDs (products, variants, collections, selling plans, app blocks) or `cdn.shopify.com` URLs in theme files.
- Reference store content through theme editor settings. In JSON, use handle-based references only (`shopify://shop_images/<file>`, menu, collection, product and page handles).
- Images come from the local `shabbat-asset/` folder (not committed) and keep their original names. Shopify Files is flat and converts spaces and symbols to underscores (`hero image_home_mobile.jpg` becomes `hero_image_home_mobile.jpg`). Upload the same originals to both stores, with unique names, and reference the stored name.
- When code or JSON starts depending on a file, menu, product, collection, page, metafield or app, add it to the migration checklist in `MIGRATION.md`.

## Environment

- Store: `shabbat-flowers-ketjs3bi.myshopify.com`
- Theme: Horizon, pulled with `shopify theme pull`
- Live preview (keep running in a separate terminal): `shopify theme dev --store shabbat-flowers-ketjs3bi.myshopify.com`
- Lint after every batch of changes: `shopify theme check`
- Fix Theme Check errors in the code. Don't add ignores.

## Architecture rules

- Standard Online Store 2.0: sections with schema, JSON templates, blocks. The client must be able to edit text and images and reorder sections in the theme editor.
- Design tokens go in **theme settings** (`config/settings_schema.json`) and are exposed as CSS variables. Don't hardcode hex values or font names in section CSS.
- Prefer configuring existing Horizon sections and blocks. Write a custom section only where Horizon can't match the design.
- **Do not delete unused Horizon sections or snippets.** Dependencies are shared and a missed reference breaks things quietly.
- Use Liquid `routes.*` for storefront URLs. Never hardcode `/cart`, `/collections`, etc.
- Every user-facing string in a section goes through a schema setting or a translation key, so the client can change it.
- Keep every section responsive: desktop, tablet and phone designs exist in Framer.

## Design tokens (from Framer)

**Colors**

| Name | Value |
|---|---|
| Forest | `#3A6648` |
| Blush | `#F9E1E1` |
| Berry | `#A42360` |
| Raspberry | `#A8235A` |
| Paper | `#F8F5F1` |
| Ink | `#4F4C46` |
| Warm Dark | `#1C1A18` |
| Pure White | `#FFFFFF` |
| Image Placeholder | `#E9E5DF` |

Use colors exactly as Framer does. Berry and Raspberry are near-duplicates: Berry is for buttons and labels, Raspberry for inline text links. Both are in the theme palette and may be merged later.

**Fonts**: Spectral (headings), Plus Jakarta Sans (body, labels, menu). A few text layers use DM Sans (e.g. hero subtext) or Cormorant Garamond (e.g. review stars); use whatever the design uses.

| Style | Font | Size | Weight | Line height | Letter spacing |
|---|---|---|---|---|---|
| Hero | Spectral | 74px | 400 | 1.08 | -0.02em |
| Heading | Spectral | 44px | 500 | 1.12 | -0.02em |
| Subheading | Spectral | 28px | 500 | n/a | -0.02em |
| Subheading 2 | Spectral | 27px | 600 | n/a | -0.01em |
| Body | Plus Jakarta Sans | 18px | 400 | 1.45 | 0.02em |
| Body small | Plus Jakarta Sans | 15px | 400 | 1.35 | 0 |
| Label | Plus Jakarta Sans | 16px | 700 | 1.4 | 1.8px |
| Menu bold | Plus Jakarta Sans | 18px | 600 | 1.45 | 0.01em |

## Framer source

- Project: `web_sfc_home (copy 2)`, id `XqtKiuCGIADrOGyRBSYM`
- URL: https://framer.com/projects/XqtKiuCGIADrOGyRBSYM
- If the Framer MCP server is connected, open the project and read the page frames for exact spacing, copy and structure. Do not modify the Framer project.
- Homepage: build from `/homepage-copy` and its header and footer components (the latest design). `/sfc-home-reference` is older; use it only as a hint for tablet and phone layouts.
- `Designer-Instructions.md` records the latest design changes and wins over older Framer values.
- Skip the helper page `/consultations-for-image-placement-only`.

## Pages and their Framer sections

| Path | Framer sections |
|---|---|
| `/homepage-copy` (homepage; `/` is an empty frame) | Hero, Collections, How It Works, Separator, Gift, Special occasion flowers, Joanne Story, Workshops and Consultations, Fresh from the Studio, What They Say, Order Once Teaser, Sister Brand, Closing CTA |
| `/subscribe` | Subscription Hero, What is Shabbat Flowers Club, Collections, Build your subscription, Complete your Friday table, How It Works, Gift Subscription Callout, NefeshJardin Cards, Club Insider Benefits, Flower Care, What They Say, Questions answered, Your Friday Table CTA |
| `/gift-subscription` | Subscription Hero, What is Shabbat Flowers Club, Collections, Build your gift, How It Works, Club Insider Benefits, NefeshJardin Cards, Complete your Friday table, Flower Care, Questions answered, Your Friday Table CTA |
| `/order-once` | Subscription Hero, Choose your composition, Delivery information, Complete your Friday table, NefeshJardin Cards, Flower Care, Questions answered, Your Friday Table CTA |
| `/products/compositions` | Composition details (Shopify product template) |
| `/about` | About content |

Many sections repeat across pages (hero, How It Works, Flower Care, FAQ, CTA). Build each once as a reusable section and reuse it.

## Open questions

- **Subscription app is Recharge** (the client already uses it). Build the `/subscribe` and `/gift-subscription` builders for Recharge, and keep the app-specific parts isolated in one snippet.
- **Both builders are on hold until we have access to the client's account**, so they can be implemented against their Recharge app: "Build your subscription" (`/subscribe`) and "Build your gift" (`/gift-subscription`). Build every other section of those pages now. Until then the Subscribe buttons link to `/pages/subscribe#build-subscription`; the subscription builder needs that id. The Gift buttons link to `/pages/gift-subscription#build-gift`; the gift builder needs that id.
  - Planned setup, to check against their account: Recharge on Shopify checkout (selling plans); one product per collection (Colores de Temporada, Lavan) with Presentation and Size variant options; frequency as selling plans; welcome card set and preferences saved on the order line.
  - To confirm with the client: product setup, preferences fields, first delivery cut-off, four-delivery minimum (set in Recharge), and whether an unserved ZIP code blocks "Add to cart".
- **ZIP code checker comes from a third-party widget** the client hasn't chosen yet. Leave a swappable slot for it (app block or Custom Liquid) and don't build our own ZIP logic.
- Navigation and footer content (menus, links) are not yet confirmed.

## Build order

1. Theme settings: fonts and colors above.
2. Header, footer, and the announcement bar (the "Order deadline notice" in Framer).
3. Reusable content sections.
4. Subscription builder and one-time order sections.
5. Composition product template and cart.
6. Page templates, then a responsive and Theme Check pass.
