import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Page2 from "./components/Page2.tsx"
import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<App />} />
        <Route path="/Page2" element={<Page2 />} />
      </Routes>

      <App />
    </BrowserRouter>
  </React.StrictMode>
)
