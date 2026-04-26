# 🛒 Shopedia Portfolio Demo

A fully functional, static demo of an Indonesian e-commerce platform built with **Next.js 16**, **Tailwind CSS v4**, and **TypeScript**. Designed for Cloudflare Pages deployment.

> ⚠️ **Demo Only** — All data is mocked. No backend required.

---

## 📦 Monorepo Structure

```
shopedia-portfolio/
├── apps/
│   ├── admin-demo/        # Admin Dashboard (62 static pages)
│   └── storefront-demo/   # Customer Storefront (37 static pages)
├── packages/
│   └── dummy-data/        # Shared mock data (products, orders, customers, WMS, etc.)
├── package.json
└── turbo.json
```

---

## 🚀 Live URLs

| App | URL |
|-----|-----|
| **Admin Dashboard** | https://shopedia-admin.pages.dev |
| **Storefront** | https://shopedia-storefront.pages.dev |

### Admin Login (Fake)
- The login page auto-redirects to the dashboard — no credentials needed.
- Auth is simulated via `localStorage`.

---

## ✨ Features

### Admin Dashboard
- 📊 Overview with charts & stats
- 🛍️ Products, Orders, Customers, Collections, Categories, Promotions CRUD views
- 📦 WMS sub-pages: Overview, Inbound, Outbound, Opname, Stock, Transactions
- ⚙️ Settings page
- 🔗 Cross-link to storefront

### Storefront
- 🏠 Homepage with hero banner, product grid, collections, categories
- 🔍 Product listing & detail with variant selection
- 🛒 Shopping cart (localStorage)
- 💳 Fake checkout → order confirmation
- 🔗 Cross-link to admin dashboard

---

## 🛠️ Tech Stack

- **Next.js 16.2.4** — App Router, static export (`output: 'export'`)
- **Tailwind CSS v4** — Utility-first styling
- **TypeScript** — Type-safe across all packages
- **shadcn/ui** — Headless UI components
- **Turborepo** — Monorepo tooling
- **Cloudflare Pages** — Static hosting

---

## 🏗️ Build & Deploy

### Prerequisites
```bash
node -v   # >= 20
npm -v    # >= 10
```

### Install dependencies
```bash
npm install
```

### Build Admin
```bash
cd apps/admin-demo
npm install --legacy-peer-deps
npm run build
# Output: apps/admin-demo/dist
```

### Build Storefront
```bash
cd apps/storefront-demo
npm install --legacy-peer-deps
npm run build
# Output: apps/storefront-demo/dist
```

### Deploy to Cloudflare Pages
Upload the `dist/` folder for each app via the Cloudflare dashboard or Wrangler CLI.

---

## 📁 Dummy Data

All mock data lives in `packages/dummy-data/src/`:
- `products.ts` — 16 products with variants, images, categories
- `orders.ts` — 15 orders with line items, payments, shipping
- `customers.ts` — 10 customers with addresses
- `collections.ts` — 4 curated collections
- `categories.ts` — 10 product categories
- `promotions.ts` — 4 active promotions
- `wms.ts` — Warehouse transactions, stock levels, opname data

---

## 📝 Notes

- `cmdk@0.2.1` requires `--legacy-peer-deps` due to React 19 compatibility.
- Static export means **no server runtime** — all dynamic behavior is client-side (`useState`, `localStorage`, etc.).
- Product images use `unoptimized` mode for static builds.

---

## 📄 License

MIT
