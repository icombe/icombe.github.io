import React from "react";
import { createRoot } from "react-dom/client";
// this pulls in your Tailwind build:
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode><App/></React.StrictMode>
);
