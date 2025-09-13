import "./setupStaticApi"; // NEW: make /api/* read from /data/*
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "normalize.css";
import "./styles/main.scss";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
