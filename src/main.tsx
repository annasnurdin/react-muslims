import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import PageLayout from "./layout/PageLayout.tsx";
import Home from "./pages/Home.tsx";
import "./App.css";
import Quran from "./pages/quran/Quran.tsx";
import Surat from "./pages/quran/Surat.tsx";
import AsmaulHusna from "./pages/AsmaulHusna.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/quran" element={<Quran />} />
          <Route path="/quran/:nomorSurat" element={<Surat />} />
          <Route path="/asmaul-husna" element={<AsmaulHusna />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
