# Power BI pack

Rebuild the report in Power BI Desktop from these tables. There is no published `.pbix` because a free/personal account cannot publish-to-web.

1. Get Data → Folder (this folder) **or** Excel → `../tradeflow-france-india-softgoods.xlsx`.
2. Mark `dim_date[Date]` as the Date table.
3. Relationships: Date 1:* FactImports/FactForecast; HS2 1:* FactImports (category grain on forecast).
4. Paste `measures.dax` before building visuals.
5. Do not SUM `AnnualizedCV` — it is a category attribute.

Full notes: `docs/power-bi-model.md` in the repo.

Refresh: `npm run fetch:comext && npm run artifacts:tradeflow`
