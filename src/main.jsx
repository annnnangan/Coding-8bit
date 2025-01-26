import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import App from "./App.jsx";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "sweetalert2/src/sweetalert2.scss";
import "aos/dist/aos.css";
import "./assets/scss/all.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </HashRouter>
  </StrictMode>
);
