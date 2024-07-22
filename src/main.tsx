import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Page2 from "./pages/Page2.tsx";
import { HashRouter, Routes, Route } from 'react-router-dom';



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="page2" element={<Page2 />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
