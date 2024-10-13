import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BroswerRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BroswerRouter>
    <App />
  </BroswerRouter>
);
