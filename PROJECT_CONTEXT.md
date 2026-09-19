# Project context — Bhawesh Kalauni portfolio

Hand-off notes for an assistant that has not seen this repo. Everything below is taken from files in this tree. Hosting vendor, live domain, and API tokens are **not** recorded in source; do not assume them.

---

## What this is

A personal portfolio for **Bhawesh Kalauni** (copy uses “BHAWESH KALAUNI”), a Master in Management candidate at NEOMA Business School (Rouen) with a Mechanical Engineering background. Purpose: document supply-chain, operations, logistics, procurement, and analytics work and provide contact paths.

`metadata.json` describes it as: “Minimal, typography-driven personal portfolio for Bhawesh Kalauni — Supply Chain, Operations, Logistics & Analytics.”

Two routes (`src/App.tsx`):

| Path | What it is |
|---|---|
| `/` | Single-page portfolio: loading screen, navbar, hero, projects, expertise, background, timeline, contact, footer. |
| `/projects/france-india-trade-forecast` | **TradeFlow** case study: France **imports from** India (not exports), HS2 52 / 61 / 62 / 63 / 64 (“soft goods” because 64 is footwear). Two-tier page: summary + charts, then methodology notes. Data is a **baked JSON snapshot**, not a live browser fetch. |

Contact from `src/data.ts`: `bhaveshkalauni12@gmail.com`, LinkedIn `https://linkedin.com/in/bhaveshkalauni`, GitHub `https://github.com/bhaveshkalauni`.

npm `name` is still `"react-example"` (`package.json`). That is leftover scaffolding, not the public brand.

---

## Tech stack (declared vs installed)

From `package.json` ranges and `package-lock.json` resolved versions:

| Piece | package.json | lockfile (installed) |
|---|---|---|
| React / React DOM | `^19.0.1` | **19.2.8** |
| react-router-dom | `^7.18.2` | **7.18.2** |
| Vite | `^6.2.3` (also listed under devDependencies) | **6.4.3** |
| TypeScript | `~5.8.2` | **5.8.3** |
| Tailwind CSS | `^4.1.14` | **4.3.3** |
| `@tailwindcss/vite` | `^4.1.14` | (plugin; used in `vite.config.ts`) |
| Recharts | `^3.10.1` | **3.10.1** |
| Motion | `^12.23.24` | (loading screen) |
| lucide-react | `^0.546.0` | icons |
| Radix dialog / select / slot | `^1.1.23` / `^2.3.7` / `^1.3.3` | TradeFlow UI primitives |
| sonner | `^2.0.8` | toasts on TradeFlow |
| exceljs | `^4.4.0` (dev) | **4.4.0** — workbook generator |
| tsx | `^4.21.0` (dev) | runs `scripts/build-tradeflow-artifacts.ts` |
| `@vitejs/plugin-react` | `^5.0.4` | |

TypeScript target ES2022, `moduleResolution: "bundler"`, `jsx: "react-jsx"`, path alias `@/*` → repo root (`tsconfig.json`).

**Listed in `package.json` but not imported anywhere under `src/` or `scripts/`:** `@google/genai`, `@tanstack/react-query`, `dotenv`, `express` (and `@types/express`). Treat them as unused leftovers unless you find new imports.

No `engines` field. `@types/node` is `^22.14.0`.

---

## Commands

From the repo root (`package.json`):

```bash
npm install
npm run dev              # vite --port=3000 --host=0.0.0.0
npm run build            # vite build → dist/
npm run preview          # vite preview (Vite default port 4173 unless overridden)
npm run lint             # tsc --noEmit
npm run fetch:comext     # node scripts/fetch-comext.mjs
npm run artifacts:tradeflow  # tsx scripts/build-tradeflow-artifacts.ts
npm run clean            # rm -rf dist server.js  (Unix-style; may fail on Windows cmd)
```

Local TradeFlow URL after `npm run dev`: `http://localhost:3000/projects/france-india-trade-forecast`.

Refresh Comext snapshot + Excel/Power BI pack:

```bash
npm run fetch:comext
npm run artifacts:tradeflow
```

`fetch:comext` writes:

- `src/projects/france-india-trade-forecast/data/comext-fr-in-softgoods.json`
- `public/data/comext-fr-in-softgoods.csv`

`artifacts:tradeflow` writes:

- `public/data/tradeflow-france-india-softgoods.xlsx`
- `public/data/powerbi/*` (CSV star schema, `measures.dax`, `transform.m`, `README.md`)
- `public/data/tradeflow-powerbi.zip`

### Deploy (what the repo actually specifies)

There is **no** `deploy` script, no GitHub Action, no Vercel/Netlify/Cloudflare config in this tree.

`npm run build` emits `dist/`. Vite copies `public/` into `dist/`, including:

- `dist/index.html` (hashed `/assets/*.js` and `.css`, **not** `/src/main.tsx`)
- `dist/.htaccess`
- `dist/data/` (CSV, xlsx, Power BI zip)

`public/.htaccess` is Apache: serve real files as-is; otherwise rewrite to `index.html` so React Router paths work.

**Do not upload the GitHub source tree as the website.** Source `index.html` loads `/src/main.tsx`. A host that serves the repo instead of `dist/` will show a blank page.

Upload **the contents of `dist/`** to the web root (so `index.html`, `assets/`, `data/`, and `.htaccess` sit at the site root, not inside a nested `dist/` folder).

---

## Folder structure

```
.
├── index.html                 # Dev entry; title; Google Fonts links
├── package.json
├── package-lock.json
├── tsconfig.json              # includes src + vite.config.ts; excludes nested "project 1 supply chain files"
├── vite.config.ts             # React + Tailwind plugins; @ alias; /api/comext proxy; DISABLE_HMR
├── metadata.json              # AI Studio applet metadata (Gemini capability flag)
├── .env.example
├── .gitignore                 # node_modules, dist, build, coverage, .env* except .env.example
├── docs/
│   ├── tradeflow-v2-plan.md   # Method, scope, phases
│   └── power-bi-model.md      # How to rebuild a Desktop report from the pack
├── scripts/
│   ├── fetch-comext.mjs       # Pulls Eurostat; bakes JSON + CSV
│   └── build-tradeflow-artifacts.ts
├── public/
│   ├── .htaccess
│   └── data/                  # Static downloads copied to dist
└── src/
    ├── main.tsx               # createRoot + StrictMode
    ├── App.tsx                # BrowserRouter routes
    ├── PortfolioHome.tsx
    ├── index.css              # Tailwind v4 @theme + portfolio tokens; imports tradeflow.css
    ├── data.ts                # All portfolio copy and the case-study card
    ├── types.ts
    ├── vite-env.d.ts
    ├── components/            # Home-page sections
    └── projects/france-india-trade-forecast/
```

### Home (`src/components/`)

| File | Role |
|---|---|
| `LoadingScreen.tsx` | 600ms full-screen intro (`motion`) |
| `Navbar.tsx` | Sticky; hash links `#projects` `#expertise` `#background` `#timeline` `#contact` |
| `Hero.tsx` | “BUILDING. LEARNING. EVOLVING.” + spec card |
| `Projects.tsx` | Cards from `caseStudies`. If `study.href` is set, `navigate(href)`; else modal |
| `Skills.tsx` | `#expertise` |
| `About.tsx` | `#background` |
| `Timeline.tsx` | `#timeline` — tabs wrap `Experience` + `Education` |
| `Contact.tsx` | `#contact` — copy email, Gmail compose, LinkedIn |
| `Footer.tsx` | LinkedIn, Gmail, back-to-top |
| `ThemeToggle.tsx` | Dark/light toggle writing `html.dark` + `localStorage.theme`. **Not imported by `PortfolioHome`.** |

### TradeFlow (`src/projects/france-india-trade-forecast/`)

| Path | Role |
|---|---|
| `TradeFlowPage.tsx` | Page: summary, chart window, KPI/charts/alerts, CSV + Excel + Power BI downloads, notes |
| `tradeflow.css` | Tokens under `html.tradeflow` so portals match; portfolio home stays on hex theme |
| `data/comext-fr-in-softgoods.json` | Baked extract. Snapshot in repo: `flow: "1"` (imports), `latestPeriod: "2026-06"`, `fetchedAt: "2026-09-10T19:10:51.818Z"` |
| `lib/analysis.ts` | Forecast `F(t)=A(t-12)×(1+g)`, rolling-origin backtest, bands, alerts, `analyzeSoftGoods()` |
| `lib/trade-data.ts` | Labels, date helpers, CSV export of the **chart window** (not the 15-year long table) |
| `components/tradeflow/*` | Charts, KPI cards, alerts, tables, case-study copy |
| `components/ui/*` | Radix-styled button, dialog, select, sonner |

**Still in the tree but not used by `TradeFlowPage.tsx`:** `lib/eurostat.ts` (live Comext client + 24h cache), `lib/forecast.ts`, `lib/alerts.ts`, `lib/get-trade-extract.ts` (comment: kept for scripts; page uses `analyzeSoftGoods()`), `components/tradeflow/FilterBar.tsx`, `components/tradeflow/Methodology.tsx`. These are leftovers from the live-fetch dashboard.

### Untracked / excluded

`tsconfig.json` excludes `"project 1 supply chain files"`. That folder may exist locally as untracked nested files (including a Lovable `AGENTS.md`). It is **not** part of the Vite app.

---

## Design

### Portfolio home

Hardcoded hex in class names (not CSS variables), 2px black borders, offset shadows (`shadow-[4px_4px_0px_#111214]`), hover that shifts 2px and reduces the shadow. Section labels: numbered mono eyebrows with a cyan square (`#20A0B5`).

| Token | Hex |
|---|---|
| Canvas | `#F3F2F0` |
| Ink | `#111214` |
| Muted text | `#3F454A` |
| Panel | `#F7F7F6` |
| Accent / cyan | `#20A0B5` |
| Status green (theme only) | `#1E7A62` (`--color-status` in `index.css`) |

Layout: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`. Hero is a 12-column grid (copy 8, spec card 4 on `lg+`). Sticky navbar `border-b-2`. Full-viewport-ish hero `min-h-[calc(100svh-4.5rem)]`.

Fonts (loaded in `index.html`, mapped in `src/index.css` `@theme`):

- Body: **Plus Jakarta Sans** (`--font-sans`)
- Display token: **Syne** (`--font-display`) — defined; headlines mostly use `font-black` on the sans stack
- Mono: **JetBrains Mono** (`--font-mono`) — nav indexes, buttons, spec card

Also linked but used on TradeFlow: **Inter Tight**, **IBM Plex Mono**.

8px editorial scrollbar; selection cyan on ink. No dark theme on the live home layout (`ThemeToggle` unused). `LoadingScreen` uses an 8px ink border.

### TradeFlow page

`TradeFlowPage` adds class `tradeflow` on `html` while mounted. Palette switches to oklch navy / saffron / teal (`tradeflow.css`). Font: Inter Tight + IBM Plex Mono. Layout `max-w-[1440px]`. Status badge is `snapshot` (“Snapshot · Eurostat Comext”), not live fetch.

Do not restyle the home page to match TradeFlow, or vice versa, unless asked. The split is intentional.

---

## Coding conventions

- **2-space indent**, TypeScript, default exports for pages and home sections.
- Portfolio copy and case-study card live in `src/data.ts` + `src/types.ts`, not inlined in every section.
- TradeFlow analysis stays in `lib/analysis.ts`; UI components stay presentational.
- Path alias: `@/src/...` (see `CaseStudyNotes.tsx`).
- `cn()` (`clsx` + `tailwind-merge`) in TradeFlow UI; home sections usually concatenate Tailwind strings.
- Quotes: double quotes in most TSX.
- React Router hash `#projects` is handled in `PortfolioHome` via `scrollIntoView`.
- Forecast math: missing Comext months stay `null` (never zero-fill). Errors are percentage-based. Bands are per-horizon residual σ (or p10/p90 if skewed), **not** `±1.28σ√h`. Alerts: High `|z|>2`, Medium `1.5–2`. Basket label is **soft goods**, not “textiles”.
- Excel/Power BI artifacts must be rebuilt from the same JSON as the page (`KPI` sheet `ValueOnPage` is the reconciliation check).
- Volatility / z-score belong on **DimCategory**, not summed as facts (`docs/power-bi-model.md`).

---

## Environment variables

`.env.example` (no secrets):

| Name | Comment in file |
|---|---|
| `GEMINI_API_KEY` | “Required for Gemini AI API calls” / AI Studio secrets. **No `src/` usage found.** |
| `APP_URL` | Hosted applet URL. **No `src/` usage found.** |

`vite.config.ts` also reads:

| Name | Effect |
|---|---|
| `DISABLE_HMR` | If `"true"`, disables Vite HMR and file watching (comment: AI Studio). |

`.gitignore` ignores `.env*` except `.env.example`. The production case study does **not** need API keys.

---

## Third-party services / APIs

| Service | How it is used |
|---|---|
| **Eurostat Comext** `DS-045409` | `https://ec.europa.eu/eurostat/api/comext/dissemination/statistics/1.0/data` — no API key. Query in `scripts/fetch-comext.mjs`: reporter `FR`, partner `IN`, `flow=1` (imports), `freq=M`, `sinceTimePeriod=2011-01`, indicators `VALUE_IN_EUROS` and `QUANTITY_IN_100KG`, products 52/61/62/63/64. Weight: ×100 = kg, ×0.1 = tonnes. |
| **Vite proxy** `/api/comext` | Same Eurostat host, for **dev** CORS. Production page does not call it; leftover `eurostat.ts` would. |
| **Google Fonts** | `index.html` |
| **Gmail compose** | Contact/hero/footer links (`mail.google.com/mail/?view=cm&fs=1&to=...`) |
| **LinkedIn / GitHub** | External profile URLs in `data.ts` |
| **Radix UI** | Dialog, select |
| **Recharts** | TradeFlow charts |

`metadata.json` sets `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API`. There is no Gemini call in application source.

There is **no `.pbix`**. Power BI is a Desktop rebuild from CSV/xlsx (`public/data/powerbi/README.md`). Publish-to-web is documented as unavailable on a free/personal account.

---

## Known issues / traps

1. **Deploying git source** produces a blank page (`index.html` → `/src/main.tsx`).
2. **SPA routes 404** on Apache unless `.htaccess` is in the web root.
3. **`npm run clean`** uses `rm -rf` (not PowerShell).
4. **Unused dependencies and v1 TradeFlow files** (live fetch, HS4 filters, export flow toggle in `trade-data.ts` `FLOWS`) can mislead. The shipped case study is imports-only, HS2-only, baked snapshot.
5. **`ThemeToggle`** is dead code; home is always the light editorial theme.
6. **`getTradeExtract()`** maps nulls to `0` for value/volume. The case-study engine in `analysis.ts` does **not**. Do not wire the page back through `getTradeExtract` without fixing that.
7. **Excel Calculator** sheet uses live formulas against table `tblFactImports`. Open in Excel/LibreOffice to evaluate; the other model sheets are precomputed values from `analysis.ts`.
8. **CSV button** on the page is the visible chart window, not the 930-row FactImports history (that is the xlsx `FactImports` sheet / `comext-fr-in-softgoods.csv`).
9. **No export series** in the extract (`flow: "1"` only).
10. Chunk warning on `vite build`: main JS > 500 kB (Recharts + page). Not a functional bug.
11. Nested **`project 1 supply chain files/`** (if present) is excluded from `tsc` and must not be committed unless asked.

---

## Unfinished / next steps (from `docs/` and on-page notes)

Documented limitations on the case-study page and in `docs/tradeflow-v2-plan.md`:

- **HS4 drill-down** not built (needs a second dimension and a real hierarchy). HS4 codes in `trade-data.ts` / `eurostat.ts` are leftover from v1.
- **No scheduled Comext refresh** — manual `npm run fetch:comext` then `artifacts:tradeflow`.
- **No Power BI `.pbix` / publish-to-web.** Desktop rebuild + downloads only.
- **Excel workbook path / gateway** for production BI is described as a tradeoff, not implemented.
- **France exports to India** are not in the extract.
- Plan still mentions university Power BI Pro / screen-recording walkthrough; those artifacts are not in the repo.
- Dead v1 modules (`eurostat.ts`, `FilterBar`, etc.) have not been deleted.
- Unused npm packages (`@google/genai`, `express`, React Query, `dotenv`) have not been removed.
- Package name remains `react-example`.

Do not silently re-enable live Comext in production: the Vite `/api/comext` proxy does not exist there, and the write-up states the snapshot exists so the page, Excel, and Power BI stay on one number.
