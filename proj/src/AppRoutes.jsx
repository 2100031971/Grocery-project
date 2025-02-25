import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Home/HomePage";
import Food from "./pages/Food/Food";
import Cart from "./pages/Cart/Cart";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import AdminPage from "./pages/Admin/AdminPage";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import CheckOut from "./pages/Checkout/CheckOut";
import AuthRoute from "./components/Authroute/AuthRoute";
import Payment from "./pages/Payment/Payment"; // Keep Payment, but modify it

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/search/:searchTerm" element={<Homepage />} />
      <Route path="/tag/:tag" element={<Homepage />} />
      <Route path="/food/:id" element={<Food />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* ✅ Protected Admin Route */}
      <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
      <Route path="/checkout/*" element={<AuthRoute><CheckOut /></AuthRoute>} />

      {/* ✅ Payment Route (Without Stripe) */}
      <Route path="/payment" element={<AuthRoute><Payment /></AuthRoute>} />
    </Routes>
  );
};

export default AppRoutes;
