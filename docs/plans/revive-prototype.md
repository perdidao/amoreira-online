# Plan: revive the prototype

Branch: `perd1dao/revive-prototype` (no ticket)

## Context

The app installs, type-checks, lints and builds on Node 22 with the 2022 lockfile.
What is broken is the data: all four `run.mocky.io` endpoints the services call are
gone, so every page renders empty. On top of that, the pages ignore their `slug`, the
category filter is never applied, and some business rules (open/closed, discount
detection, menu ordering, category counts) live in the frontend.

Goal: a working prototype backed by local fixtures served through Next API routes,
with the rules moved server-side, so a real backend can later replace the
fixtures without touching the frontend.

## Decisions

- **Data source:** JSON fixtures in `src/data/`, read by a small data layer in
  `src/lib/`, exposed via Next API routes. The frontend keeps axios + react-query.
- **Scope:** data restoration, data-flow bug fixes and the cleanup items listed below.
- **Testing:** add Vitest (see *Testing strategy*).

## Steps (one commit each)

1. **Test tooling** — add `vitest` dev dependency, `vitest.config.ts` with the path
   aliases the tests need, and an `npm test` script.
2. **Fixtures + data layer**
   - `src/data/categories.json` — `{ id, title, slug }`, one per existing icon in
     `public/assets/icons/categories/`. `totalItems` is *not* stored; it is computed.
   - `src/data/stores.json` — a handful of fictional stores with placeholder phone
     numbers, `workdays`, `categories` and menus. Only `km-burguer.png` exists as a
     store logo, so the other stores reuse a local placeholder image.
   - `src/lib/stores.ts` — `getStores({ category })`, `getStoreBySlug(slug)`,
     `getCategories()`, `getCategoryBySlug(slug)`, `isOpenToday(workdays, now)`.
     Rules owned here:
     - open/closed is computed for the current weekday in `America/Sao_Paulo` using
       `Intl` (no dependency on the server's time zone)
     - `discountPrice` of `0` is normalized to `null`
     - menus are sorted by `priority`
     - category `totalItems` is the count of stores in that category
     - the store list omits `menu` (the cards don't use it)
   - Unit tests in `src/lib/stores.test.ts`.
3. **API routes** (thin handlers over `src/lib`)
   - `GET /api/stores?category=<slug>` → `Store[]`
   - `GET /api/stores/[slug]` → `Store` or 404
   - `GET /api/categories` → `Category[]`
   - `GET /api/categories/[slug]` → `Category` or 404
   - Any other method → 405 with an `Allow: GET` header. A slug or category that is
     not a single string matching `^[a-z0-9-]+$` → 400.
   - Handler tests in `tests/api/` (outside `src/pages`, where every file becomes a route).
4. **Model + services**
   - `Store` gains `isOpenToday: boolean`. `workdays` stays, since it is part of the
     store info to show later.
   - `useGetStores(categorySlug?)`, `useGetStore(slug)` and `useGetCategory(slug)`
     call the new routes with distinct query keys (`['stores', category]`,
     `['store', slug]`, `['categories']`, `['category', slug]`) and `enabled` only
     when a slug is present. This fixes the `['Store']` key clash.
5. **Pages + components**
   - `_app.tsx`: create the `QueryClient` once (`useState`) instead of on every render.
   - `StoreList` passes `categorySlug` through, so category pages actually filter.
   - `StoreCard` / `StoreHeader` read `isOpenToday`. `storeHelpers` keeps only
     presentation helpers (status text from a boolean, BRL formatting).
   - `StoreMenu` shows the discount when `discountPrice !== null`.
   - `StoreCard` category links get a `key`.
   - `categoria/[slug]` and `lojas/[slug]`: `getStaticProps` checks the slug against
     the data layer and returns `notFound: true` for unknown slugs (a real 404). This
     removes the self-redirect loop and the `router.push` during render. A failed
     client fetch shows a short message instead of redirecting.
6. **Cleanup**
   - Remove `moment` (replaced by `Intl` in step 2).
   - Delete the template route `src/pages/api/hello.ts`.
   - Rename the package from `run-boost` to `amoreira-online`.
   - Write `README.md`: purpose, setup, scripts, structure, where the data lives.

### Out of scope (noted for later)

- Real opening hours (time ranges, exceptions). `workdays` stays as-is.
- Design-token inconsistencies: `fontWeight('medium' | 'semibold')` refers to weights
  that don't exist, and `global.css` loads a different font from the theme.
- Upgrading Next.js / moving to the App Router.

## Testing strategy

There was no test runner, so Vitest is being added (agreed). It is fast enough to run on every change.

| Behavior | Level | Why |
|---|---|---|
| `isOpenToday` uses the São Paulo weekday, including when UTC is already the next day | Unit (fixed `Date`) | Time-zone logic is easy to get wrong and is deterministic |
| Category filter, unknown slug → `null`, menu sorted by priority, `discountPrice` 0 → `null`, `totalItems` counted | Unit | Core business rules of the data layer |
| Handlers: 200 shape, 404 unknown, 400 bad/array param, 405 non-GET | Integration-lite (handler called with fake `req`/`res`) | Exercises the HTTP contract the frontend depends on without starting a server |

No component, snapshot or E2E tests. The components are presentational and
already work, and an E2E suite isn't worth it for a fixture-backed prototype. Final
check: `npm test`, `npm run lint`, `npm run build`, plus a manual pass in the browser
(home, a category page, a store page, an unknown slug → 404).

Run: `npm test` (no external prerequisites).

## Security

| Risk | Assessment / mitigation |
|---|---|
| **Injection** | No database or shell. Slugs and the `category` param are validated against `^[a-z0-9-]+$` and only ever used for in-memory lookups, never in file paths or queries. React escapes all rendered text, and there is no `dangerouslySetInnerHTML`. `next/image` remote domains stay limited to `i.imgur.com`. |
| **Spoofing / auth** | No auth, sessions or cookies. All endpoints are public and read-only. Non-GET methods return 405, so there are no state-changing endpoints and nothing for CSRF to target. |
| **Tampering** | Fixtures are read-only files bundled at build time, with no write path. Query input is validated before use. |
| **Information disclosure** | Errors return a generic `{ error }` message with no stack traces or internals. No secrets or env vars are involved. Phone numbers are fictional placeholders, so there is no real PII. |
| **Privilege escalation** | No privileged paths exist. This becomes relevant once store registration/admin is added. |
| **Pen-test focus** | Query parsing in the API routes (array params, encoded characters, overlong values). The `fallback: 'blocking'` pages: arbitrary slugs trigger server work, which is now cheap thanks to the early `notFound`. |
