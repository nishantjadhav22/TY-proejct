import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./main.css";
import "./i18n/i18n";   // 👈 BAS YE LINE ADD KI HAI

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
