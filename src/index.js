// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ← 追加
import App from "./App";
import './components/Calendar.css'; // components フォルダにある場合


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter> {/* ← ここでラップ */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
