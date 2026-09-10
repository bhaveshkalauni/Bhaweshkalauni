import { EXTRACT } from "./analysis";
import type { TradeExtract } from "./trade-extract";

/** Kept for scripts; the case study page uses the baked extract via analyzeSoftGoods(). */
export async function getTradeExtract(): Promise<TradeExtract> {
  const times = EXTRACT.times;
  const series: TradeExtract["series"] = {};
  for (const [product, s] of Object.entries(EXTRACT.series)) {
    series[`1:${product}`] = {
      value: s.valueEur.map((v) => (v == null ? 0 : v / 1_000_000)),
      volume: s.qty100kg.map((q) => (q == null ? 0 : q * 0.1)),
    };
  }
  return {
    datasetId: EXTRACT.datasetId,
    updated: EXTRACT.updated ?? EXTRACT.fetchedAt,
    fetchedAt: EXTRACT.fetchedAt,
    stale: false,
    times,
    latestPeriod: EXTRACT.latestPeriod,
    series,
  };
}
