import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PortfolioHome from "./pages/PortfolioHome";

const TradeFlowPage = lazy(() => import("./pages/TradeFlowPage"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen bg-[#F3F2F0]" />}>
        <Routes>
          <Route path="/" element={<PortfolioHome />} />
          <Route path="/projects/france-india-trade-forecast" element={<TradeFlowPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
