# TradeFlow v2 — France–India Import Forecast

Revised build plan. Replaces the v1 approach (live-fetching React dashboard) with an
Excel + Power BI analysis, presented on the portfolio as a two-tier case study.

**Destination:** this file lives at `docs/tradeflow-v2-plan.md`.

---

## Scope and intent

| | |
|---|---|
| Question | Which France→India soft-goods import categories need planner attention in the next 3 months? |
| Data | Eurostat Comext `DS-045409`, monthly, Jan 2011 → latest |
| Reporter / Partner / Flow | France / India / Imports |
| Products | HS2: 52, 61, 62, 63, 64 |
| Method | Seasonal-naive + trend, validated by rolling-origin backtest |
| Primary artifacts | Excel workbook (model), Power BI report (presentation) |
| Portfolio surface | Static case study page, two tiers |

**Deliberate scoping calls** — state these in the write-up rather than leaving them implicit:

- **HS2 only for v1.** HS4 needs a second dimension table and a working drill hierarchy.
  Documented as a next step, not silently dropped.
- **Static snapshot, not a live pipeline.** The forecast logic lives in Excel / this extract, so Power BI
  and the web page display a point-in-time snapshot. Refresh story is documented in Phase 6.

### Category naming caution

61 (knitted apparel), 62 (woven apparel), 63 (made-ups / home textiles) and 52 (cotton) are
textile. **64 is footwear.** Do not label the basket "textiles" — use "soft goods" or list the
chapters. This matters in Phase 5, where a textiles-only Eurostat summary will not reconcile.

---

## Phase 0 — Data acquisition and validation

See `scripts/fetch-comext.mjs` and `src/projects/france-india-trade-forecast/data/comext-fr-in-softgoods.json`.

- Base: `https://ec.europa.eu/eurostat/api/comext/dissemination/statistics/1.0/data`
- Dataset: `DS-045409`
- Weight unit: Comext `QUANTITY_IN_100KG` (×100 = kg; ×0.1 = tonnes)
- Missing months stay **null**. Do not zero-fill. If `A(t-12)` is missing, omit `F(t)`.
- Confidential trade is suppressed, not zero; France–India totals may run low.

Refresh the extract:

```
npm run fetch:comext
```

---

## Method (implemented on the case study page)

```
F(t) = A(t-12) × (1 + g)
g    = trailing-12-month average YoY growth rate
```

Rejected on purpose: `FORECAST.ETS()` / Holt-Winters — smoothing parameters are hard to defend.

Rolling-origin backtest from month 24 onward, horizons 1–3, percentage errors per category.

Confidence band: per-horizon σ from backtest residuals, **not** `±1.28σ × √h`.
If residuals are skewed, use 10th/90th percentiles instead of a normal z.

Baselines: seasonal-naive `A(t+h−12)` and naive `A(t)`. Report MAPE and MdAPE.

Annualized CV = `(STDEV.S / AVERAGE) × SQRT(12)`.

Alerts: z-score of latest deviation vs that category's own history. High: |z| > 2; Medium: 1.5–2.

3-month horizon: one India→France ocean lead-time cycle (6–10 weeks door-to-door) plus a reaction buffer.

---

## Portfolio surface

Route: `/projects/france-india-trade-forecast`

1. Tier 1 summary (question, source, method, backtest vs baseline, finding).
2. Project view from the baked extract (charts, KPIs, alerts).
3. Tier 2 methodology notes after the project.

Excel / Power BI remain the modelling artefacts for later; this repo ships the extract, the
engine, and the case study page.
