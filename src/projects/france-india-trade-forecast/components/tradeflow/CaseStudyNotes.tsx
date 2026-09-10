import type { AnalysisReport } from "@/src/projects/france-india-trade-forecast/lib/analysis";
import { BacktestTable } from "./BacktestTable";
import { Panel } from "./shared";

function pct(v: number | null | undefined): string {
  if (v == null || !Number.isFinite(v)) return "—";
  return `${(v * 100).toFixed(0)}%`;
}

export function CaseStudyNotes({ report }: { report: AnalysisReport }) {
  const losers = report.categories.filter((c) => c.beatsSeasonalAtH1 === false);
  const highShare =
    report.firingRate.total > 0 ? report.firingRate.high / report.firingRate.total : 0;
  const medShare =
    report.firingRate.total > 0 ? report.firingRate.medium / report.firingRate.total : 0;
  const valueGaps = Object.values(report.gapCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[0.68rem] font-medium uppercase tracking-wide text-slate-muted">
          How this was made
        </p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight text-navy">Methodology notes</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-muted">
          Decisions and tradeoffs, in the order they were taken. This is the analysis record — not a
          walkthrough of the interface above.
        </p>
      </div>

      <Panel title="1. Data" subtitle="Eurostat Comext DS-045409 · FR reporter · IN partner · imports">
        <div className="space-y-3 text-sm leading-relaxed text-navy-soft">
          <p>
            Monthly series from January 2011 through {report.meta.historyEndLabel}. Weight is Comext{" "}
            <span className="font-mono text-xs">QUANTITY_IN_100KG</span> (×100 = kg, ×0.1 = tonnes).
            Getting that unit wrong would silently corrupt every €/kg figure.
          </p>
          <p>
            HS 64 is footwear, not textile. The basket is <strong className="text-navy">soft goods</strong>{" "}
            — cotton, knitted apparel, woven apparel, made-ups, footwear. A textiles-only Eurostat
            summary will not reconcile against these totals.
          </p>
          <p>
            Missing-data rule: do not zero-fill. If A(t−12) is unpublished, F(t) is omitted. At HS2
            for this reporter/partner/flow the extract has {valueGaps} missing value months
            {valueGaps === 0
              ? " — suppression did not punch holes in these five chapters, though confidential trade can still bias partner totals low."
              : "."}
          </p>
          <p>
            The page reads a JSON snapshot baked at build time. The Vite `/api/comext` proxy does not
            exist in production, so a live browser fetch would depend on Eurostat CORS and fail
            silently. A static extract also means the charts quote the same numbers a workbook would.
          </p>
        </div>
      </Panel>

      <Panel title="2. Method — and the one not used">
        <div className="space-y-3 text-sm leading-relaxed text-navy-soft">
          <p>
            Forecast: F(t) = A(t−12) × (1 + g), where g is the trailing-12-month average year-on-year
            growth rate. g is a single multiplier, so there is no extra drift across h = 1, 2, 3.
          </p>
          <p>
            Holt-Winters via Excel FORECAST.ETS() was rejected on purpose. It is a better fitter on
            many seasonal series, but its level, trend, and seasonal smoothing parameters are hard to
            justify under questioning. An explainable method you can defend on a whiteboard beats a
            more sophisticated one whose knobs you cannot.
          </p>
        </div>
      </Panel>

      <Panel title="3. Confidence band">
        <div className="space-y-3 text-sm leading-relaxed text-navy-soft">
          <p>
            The band is not ±1.28σ × √h. That scaling describes random-walk error accumulation, where
            each step builds on a prior forecast. This estimator does not work that way: for h ≤ 3
            the base A(t+h−12) is an observed actual, so errors do not compound across the horizon.
          </p>
          <p>
            σ is measured separately at h = 1, 2, 3 from rolling-origin residuals, per series. If
            those residuals are skewed (common in trade spikes), the band uses the 10th/90th
            percentiles instead of a normal z. The band still tends to widen with horizon because g
            degrades — but that widening is measured, not assumed.
          </p>
        </div>
      </Panel>

      <Panel title="4. Backtest versus baselines">
        <div className="space-y-4 text-sm leading-relaxed text-navy-soft">
          <p>
            Walk-forward from month 24 (once two years of history exist). At each origin, forecast
            h = 1–3 using only data available then. A bare MAPE is meaningless without a baseline, so
            the same origins are scored for seasonal-naive and last-month naive.
          </p>
          <BacktestTable report={report} />
          {losers.length > 0 ? (
            <p>
              The trend term does not beat plain seasonal-naive at h = 1 for{" "}
              {losers.map((c) => `${c.label} (HS ${c.hs2})`).join(", ")}. That result is kept on the
              page: adding a growth rate is not free, and it should only stay where it earns its
              place.
            </p>
          ) : (
            <p>
              On this extract the trend term beats seasonal-naive at h = 1 in every chapter. That is
              a result for this sample, not a general claim about the method.
            </p>
          )}
        </div>
      </Panel>

      <Panel title="5. Alerts">
        <div className="space-y-3 text-sm leading-relaxed text-navy-soft">
          <p>
            A chapter is flagged on the z-score of the latest residual against that chapter’s own
            trailing residual distribution. High: |z| &gt; 2. Medium: 1.5–2. A flat “+20% = High”
            cutoff treats cotton yarn and woven apparel as if they had the same noise.
          </p>
          <p>
            On this history those cuts fire High on {pct(highShare)} of category-months and Medium on{" "}
            {pct(medShare)} (
            {report.firingRate.high + report.firingRate.medium} of {report.firingRate.total}). z
            &gt; 1 would fire about 16% of the time under normality —
            roughly one alert in six, which is fatigue for a planner.
          </p>
          <p>
            The three-month horizon is about one India→France ocean lead-time cycle (typically 6–10
            weeks door-to-door, 3–5 weeks port-to-port) plus a reaction buffer — not two cycles.
          </p>
        </div>
      </Panel>

      <Panel title="6. Decision log">
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-navy-soft">
          <li>
            Started from a live Comext fetch and a widening band of the form value × (8% + 4% × h).
            Replaced both: the fetch is a baked snapshot; the band is per-horizon residual σ.
          </li>
          <li>
            Dropped HS4 from v1. A drill hierarchy is real modelling work, not a toggle. Scoped to
            HS2; HS4 is a documented next step.
          </li>
          <li>
            Relabelled the basket from “apparel & textiles” to “soft goods” once HS 64 (footwear)
            was kept in scope.
          </li>
          {report.redSea.afterMape != null && report.redSea.beforeMape != null ? (
            <li>
              Split the backtest at Nov 2023 (Red Sea diversions / Cape routing). Basket h = 1 MAPE
              moved from {pct(report.redSea.beforeMape)} before to {pct(report.redSea.afterMape)}{" "}
              after (n = {report.redSea.nBefore} / {report.redSea.nAfter}). That window is where the
              model is most likely to degrade, and it has an external cause.
            </li>
          ) : null}
        </ul>
      </Panel>

      <Panel title="7. Limitations and next steps">
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-navy-soft">
          <li>HS2 only. HS4 needs a second dimension table and a working drill path.</li>
          <li>
            Static snapshot. Refresh is `npm run fetch:comext`, not a scheduled pipeline. In
            production the workbook would sit behind a gateway; here the JSON is the workbook.
          </li>
          <li>
            Confidential Comext cells are suppressed, not zero. Partner totals can run low even when
            this five-chapter extract looks complete.
          </li>
          <li>
            Excel and Power BI remain the intended modelling artefacts for a planner audience. This
            page is the case study wrapper because Power BI publish-to-web needs a Pro tenant.
          </li>
        </ul>
      </Panel>
    </div>
  );
}
