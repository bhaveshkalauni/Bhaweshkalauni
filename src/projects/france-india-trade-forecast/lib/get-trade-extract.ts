import { loadTradeExtract } from "./eurostat";
import type { TradeExtract } from "./trade-extract";

/** Client-safe fetch wrapper (Eurostat via Vite proxy in dev). */
export async function getTradeExtract(): Promise<TradeExtract> {
  return loadTradeExtract();
}
