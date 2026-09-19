import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { TopBar } from "./components/tradeflow/TopBar";
import { KpiCards } from "./components/tradeflow/KpiCards";
import { TradeChart } from "./components/tradeflow/TradeChart";
import { AlertsPanel } from "./components/tradeflow/AlertsPanel";
import { VolumeVsUnitValue, TopCategories } from "./components/tradeflow/SecondaryCharts";
import { ExceptionTable } from "./components/tradeflow/ExceptionTable";
import { DetailDialog } from "./components/tradeflow/DetailDialog";
import { CaseStudySummary } from "./components/tradeflow/CaseStudySummary";
import { CaseStudyNotes } from "./components/tradeflow/CaseStudyNotes";
import { Toaster } from "./components/ui/sonner";
import { analyzeSoftGoods } from "./lib/analysis";
import { DATE_RANGES, datasetToCsv } from "./lib/trade-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

export default function TradeFlowPage() {
  const [range, setRange] = useState("24");
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("tradeflow");
    return () => {
      document.documentElement.classList.remove("tradeflow");
    };
  }, []);

  const months = DATE_RANGES.find((r) => r.id === range)?.months ?? 24;
  const report = useMemo(() => analyzeSoftGoods(months), [months]);
  const data = report.dataset;
  const openRow = data.categoryRows.find((r) => r.id === openId) ?? null;

  const handleExport = () => {
    const blob = new Blob([datasetToCsv(data)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tradeflow-france-india-softgoods-${report.meta.latestPeriod}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Extract downloaded", {
      description: "Same baked Comext snapshot the charts use — not a live pull.",
    });
  };

  return (
    <div id="tradeflow-root" className="tradeflow-root min-h-screen bg-background font-sans antialiased">
      <TopBar
        status="snapshot"
        backTo={
          <Link
            to="/#projects"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-navy-soft transition-colors hover:text-navy"
          >
            <ArrowLeft className="size-3.5" />
            Back to Portfolio
          </Link>
        }
      />

      <main className="mx-auto max-w-[1440px] space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-[0.68rem] font-medium uppercase tracking-wide text-slate-muted">
            Supply chain analytics · HS2 case study
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-navy sm:text-[1.75rem]">
            France–India soft-goods import forecast
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-muted">
            A seasonal-naive + trend forecast of France’s imports from India in cotton, apparel,
            home textiles, and footwear — with a rolling-origin backtest, per-horizon confidence
            bands, and alerts tied to each chapter’s own noise.
          </p>
        </div>

        <CaseStudySummary report={report} />

        <div className="flex flex-wrap items-end justify-between gap-3 rounded-lg border border-hairline bg-panel px-4 py-3">
          <label className="flex min-w-[12rem] flex-col gap-1.5">
            <span className="text-[0.68rem] font-medium uppercase tracking-wide text-slate-muted">
              Chart window
            </span>
            <Select value={range} onValueChange={setRange}>
              <SelectTrigger className="border-hairline bg-background text-sm shadow-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-hairline bg-panel">
                {DATE_RANGES.map((r) => (
                  <SelectItem key={r.id} value={r.id}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleExport}
              className="h-9 rounded-md border border-navy bg-navy px-3 text-xs font-medium text-panel hover:bg-navy-soft"
            >
              Download snapshot CSV
            </button>
            <a
              href="/data/tradeflow-france-india-softgoods.xlsx"
              download
              className="inline-flex h-9 items-center rounded-md border border-navy px-3 text-xs font-medium text-navy hover:bg-panel"
            >
              Download Excel model
            </a>
            <a
              href="/data/tradeflow-powerbi.zip"
              download
              className="inline-flex h-9 items-center rounded-md border border-navy px-3 text-xs font-medium text-navy hover:bg-panel"
            >
              Download Power BI pack
            </a>
          </div>
        </div>

        <KpiCards data={data} />

        <div className="grid gap-6 lg:grid-cols-[1.75fr_1fr]">
          <TradeChart data={data} />
          <AlertsPanel alerts={report.alerts} onOpen={setOpenId} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <VolumeVsUnitValue data={data} />
          <TopCategories data={data} />
        </div>

        <ExceptionTable data={data} hsLevel="HS2" onOpen={setOpenId} />

        <p className="text-xs leading-relaxed text-slate-muted">
          Snapshot: Eurostat Comext {report.meta.datasetId} · {report.meta.historyStartLabel} –{" "}
          {report.meta.historyEndLabel} · France imports from India · HS2 52 / 61 / 62 / 63 / 64.
          Forecasts and bands are computed from that file, not from a live API.
        </p>

        <div className="border-t border-hairline pt-10">
          <CaseStudyNotes report={report} />
        </div>
      </main>

      <DetailDialog row={openRow} onClose={() => setOpenId(null)} />
      <Toaster />
    </div>
  );
}
