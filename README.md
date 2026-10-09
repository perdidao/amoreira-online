# Amoreira Online

A city-level menu: local restaurants and food services with their menus, working days
and contact info, browsable by category.

This is still a **prototype**. Store data comes from local JSON fixtures served by Next.js
API routes. No database, no admin, no way to register a store yet.

## Running

Requires Node 18+ (developed on Node 22).

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # Vitest: data layer + API handlers
npm run lint
npm run build && npm start
```

## How it fits together

```
src/data/*.json        fixtures (stores with menus, categories)
src/lib/stores.ts      data layer: filtering, open/closed, menu ordering, counts
src/lib/http.ts        shared API helpers (GET-only, slug validation)
src/pages/api/         GET /api/stores[?category=], /api/stores/[slug],
                       GET /api/categories, /api/categories/[slug]
src/services/          react-query hooks that call the API
src/pages/             Next.js pages (Pages Router), pt-br routes: /lojas, /categoria
src/components/        atomic components: X.tsx / X.types.ts / X.styles.ts / index.ts
src/theme, src/helpers design tokens and the `platipus` styling helpers
```

- **Business rules live behind the API.** Whether a store is open today (São Paulo time),
  category counts, menu ordering and discount normalization are computed in
  `src/lib/stores.ts`. The frontend only formats what it receives.
- **Adding a store:** append an entry to `src/data/stores.json`. Logos go in
  `public/assets/stores/` (or on `i.imgur.com`, the only remote image host allowed).
  Each category needs an icon at `public/assets/icons/categories/<slug>.png`.
- **New component:** `npx plop component` scaffolds the four files and registers the export.
- **Copy** is in Portuguese. Shared strings are in `public/locales/pt-br.json` (next-intl).

## Tests

`npm test` runs Vitest with no external dependencies:

- `src/lib/stores.test.ts`: data-layer rules, including the São Paulo vs UTC day boundary
- `tests/api/`: API handlers called with a fake request/response (400, 404, 405, filtering)

API handler tests live outside `src/pages` because every file there becomes a route.

Plans for larger changes are in `docs/plans/`.
