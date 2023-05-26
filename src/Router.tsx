import { memo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Home/Home";
import { PortfolioPage } from "./pages/Portfolio/Portfolio";

function RouterComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio/:portfolioId" element={<PortfolioPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default memo(RouterComponent);
