import { ToastContainer } from "react-toastify";
import App from "./App.tsx";
import "./assets/styles/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <>
    <ToastContainer />
    <StrictMode>
      <App />
    </StrictMode>
  </>
);
