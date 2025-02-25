import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./hooks/useCart"; // ✅ Import CartProvider
import { AuthProvider } from "./hooks/useAuth.jsx"; // ✅ Import AuthProvider
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter> {/* ✅ ONLY ONE BrowserRouter (here) */}
      <CartProvider> {/* ✅ CartProvider should wrap AuthProvider */}
        <AuthProvider>
          <App />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </AuthProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
