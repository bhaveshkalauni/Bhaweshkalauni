# TradeFlow Power BI model

Excel owns the forecast. Power BI presents the snapshot. Do not connect Power BI to the Comext API.

## Files

| File | Role |
|---|---|
| `public/data/tradeflow-france-india-softgoods.xlsx` | Model workbook (star schema + methodology + calculator) |
| `public/data/powerbi/*.csv` | Same tables, for Get Data → Folder |
| `public/data/powerbi/measures.dax` | Measures — define these before any visual |
| `public/data/powerbi/transform.m` | Power Query against the workbook |
| `public/data/tradeflow-powerbi.zip` | Pack of the CSV + DAX + M files |

There is no `.pbix` in the repo. Power BI Desktop project files are binary and a free/personal account cannot publish-to-web. Rebuild the report from these tables in Desktop; the public surface is the case-study page.

## Star schema

```
DimDate[Date]      1:*  FactImports[Date]
DimCategory[HS2]   1:*  FactImports[HS2]
DimDate[Date]      1:*  FactForecast[Date]
DimCategory[HS2]   1:*  FactForecast[HS2]   (keep Grain = "category" on that relationship)
```

Mark **DimDate** as the official Date table.

**Volatility is not a fact.** `AnnualizedCV` and `LatestZ` sit on DimCategory. If they sit on the fact table someone will SUM them.

FactBacktest is a validation table. Either leave it disconnected and use it on a backtest page, or relate TargetYearMonth via a second, inactive date relationship.

## Visuals (after measures exist)

1. Line + stacked area: actual `Import Value`, forecast `Forecast 3M EUR`, band as an invisible lower series plus a shaded width series. Vertical marker at the first forecast month.
2. KPI cards: `Import Value R12`, `Import Value R12 YoY %`, `Volume R12 t`, `Forecast 3M EUR`.
3. Combo: volume vs `Unit Value EUR per kg`.
4. Volume vs price: `VolumePrice` sheet in the workbook (`volumeEffect` + `priceEffect` = value change).
5. Horizontal bar: top categories by rolling-12 value.
6. Conditional-formatted table: `Alerts` / DimCategory `Severity`.

## Refresh

```
npm run fetch:comext
npm run artifacts:tradeflow
```

Then refresh Power BI from the workbook or CSV folder. A hardcoded local path is fragile; production would use a gateway or a shared drive. The site, the workbook, and this model are kept on one snapshot on purpose.
