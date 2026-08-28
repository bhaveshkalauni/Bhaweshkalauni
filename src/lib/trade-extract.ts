export type ComextFlow = "1" | "2";

export interface SeriesPair {
  /** EUR millions, aligned to `times` */
  value: number[];
  /** tonnes, aligned to `times` */
  volume: number[];
}

export interface TradeExtract {
  datasetId: string;
  updated: string;
  fetchedAt: string;
  stale: boolean;
  times: string[];
  latestPeriod: string;
  /** key: `${flow}:${product}` e.g. "1:61" */
  series: Record<string, SeriesPair>;
}

export function seriesKey(flow: ComextFlow, product: string): string {
  return `${flow}:${product}`;
}
