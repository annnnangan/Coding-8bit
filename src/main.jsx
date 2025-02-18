import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { store } from "./utils/store.js";
import { Provider } from "react-redux";

import App from "./App.jsx";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "sweetalert2/src/sweetalert2.scss";
import "aos/dist/aos.css";
import "./assets/scss/all.scss";
import "react-quill-new/dist/quill.snow.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </StrictMode>
);
