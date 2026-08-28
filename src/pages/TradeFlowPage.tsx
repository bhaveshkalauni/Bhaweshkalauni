import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { TopBar, type DataStatus } from "@/components/tradeflow/TopBar";
import { FilterBar } from "@/components/tradeflow/FilterBar";
import { KpiCards } from "@/components/tradeflow/KpiCards";
import { TradeChart } from "@/components/tradeflow/TradeChart";
import { AlertsPanel } from "@/components/tradeflow/AlertsPanel";
import { VolumeVsUnitValue, TopCategories } from "@/components/tradeflow/SecondaryCharts";
import { ExceptionTable } from "@/components/tradeflow/ExceptionTable";
import { DetailDialog } from "@/components/tradeflow/DetailDialog";
import { Methodology } from "@/components/tradeflow/Methodology";
import { EmptyState } from "@/components/tradeflow/shared";
import { buildAlerts } from "@/lib/alerts";
import { loadTradeExtract } from "@/lib/eurostat";
import { buildDatasetFromExtract, extractMeta } from "@/lib/forecast";
import {
  datasetToCsv,
  emptyDataset,
  emptyMeta,
  type Filters,
} from "@/lib/trade-data";
import { Toaster } from "sonner";

const TRADE_QUERY_KEY = ["trade-extract"] as const;

export default function TradeFlowPage() {
  const [filters, setFilters] = useState<Filters>({
    flow: "fr_imports_in",
    group: "all",
    hsLevel: "HS2",
    range: "24",
  });
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    document.title = "TradeFlow Intelligence — France–India Import Forecast";
    return () => {
      document.title = "Bhawesh Kalauni — Supply Chain & Operations";
    };
  }, []);

  const extractQuery = useQuery({
    queryKey: TRADE_QUERY_KEY,
    queryFn: () => loadTradeExtract(),
    staleTime: 60 * 60 * 1000,
    retry: 1,
  });

  const data = useMemo(() => {
    if (!extractQuery.data) return emptyDataset(emptyMeta(false));
    return buildDatasetFromExtract(extractQuery.data, filters);
  }, [extractQuery.data, filters]);

  const alerts = useMemo(() => buildAlerts(data, filters.flow), [data, filters.flow]);
  const openRow = data.categoryRows.find((r) => r.id === openId) ?? null;
  const meta = extractQuery.data ? extractMeta(extractQuery.data) : data.meta;

  const status: DataStatus = extractQuery.isError
    ? "error"
    : extractQuery.isPending
      ? "loading"
      : extractQuery.data?.stale
        ? "stale"
        : "live";

  const update = (next: Partial<Filters>) => setFilters((f) => ({ ...f, ...next }));

  const handleExport = () => {
    if (extractQuery.isError || data.isEmpty) {
      toast.error("Nothing to export", {
        description: "Wait for Comext data to load, then try again.",
      });
      return;
    }
    const blob = new Blob([datasetToCsv(data)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tradeflow-france-india-${meta.latestPeriod || "extract"}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Insight report ready", {
      description: "France–India inbound flow summary (Eurostat Comext) downloaded.",
    });
  };

  return (
    <div className="tradeflow-root min-h-screen bg-background">
      <TopBar status={status} />

      <main className="mx-auto max-w-[1440px] space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-semibold tracking-tight text-navy sm:text-[1.75rem]">
            France–India Import Forecast
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-muted">
            Identify inbound-flow changes before they become sourcing or inventory problems.
          </p>
        </div>

        <FilterBar filters={filters} onChange={update} onExport={handleExport} />

        {extractQuery.isError && !extractQuery.data ? (
          <div className="space-y-3">
            <EmptyState
              title="Live trade data did not load"
              body="Eurostat Comext is unreachable and there is no cached extract. Check the network connection and retry. No demo figures are shown."
            />
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => void extractQuery.refetch()}
                className="rounded-md border border-hairline bg-panel px-3 py-1.5 text-xs font-medium text-navy hover:bg-muted"
              >
                Retry Comext
              </button>
            </div>
          </div>
        ) : extractQuery.isPending && !extractQuery.data ? (
          <>
            <KpiCards data={emptyDataset(meta)} />
            <EmptyState
              title="Loading Eurostat Comext"
              body="Fetching monthly France–India customs flows. This can take a few seconds on the first request."
            />
          </>
        ) : (
          <>
            {status === "stale" ? (
              <p className="rounded-md border border-saffron/30 bg-saffron-soft/40 px-4 py-2 text-xs text-navy-soft">
                Showing the last successful Comext extract. A fresh pull failed; figures may lag the
                official release.
              </p>
            ) : null}
            <KpiCards data={data} />

            <div className="grid gap-6 lg:grid-cols-[1.75fr_1fr]">
              <TradeChart data={data} />
              <AlertsPanel alerts={alerts} onOpen={setOpenId} />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <VolumeVsUnitValue data={data} />
              <TopCategories data={data} />
            </div>

            <ExceptionTable data={data} hsLevel={filters.hsLevel} onOpen={setOpenId} />
          </>
        )}

        <Methodology meta={meta} />

        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-hairline pt-4 text-[0.7rem] text-slate-muted">
          <p>
            Data source: <span className="font-medium text-navy-soft">Eurostat Comext {meta.datasetId}</span>{" "}
            · monthly, {meta.historyStartLabel} – {meta.historyEndLabel}
            {meta.stale ? " · cached copy" : ""}
          </p>
          <p>TradeFlow Intelligence · bhaweshkalauni.com</p>
        </footer>
      </main>

      <DetailDialog row={openRow} onClose={() => setOpenId(null)} />
      <Toaster position="bottom-right" />
    </div>
  );
}
