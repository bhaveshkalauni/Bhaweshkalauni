import { BrowserRouter, Routes, Route } from "react-router-dom";
import PortfolioHome from "./PortfolioHome";
import TradeFlowPage from "./projects/france-india-trade-forecast/TradeFlowPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        <Route
          path="/projects/france-india-trade-forecast"
          element={<TradeFlowPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}
