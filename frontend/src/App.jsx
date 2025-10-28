import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import VerifyOtp from "./pages/Auth/verifyOtp";
import ChattingPage from "./pages/chatting/chat";
import PaymentSuccess from "./components/payment/paymentSuccess";
import GigsDetails from "./components/gigs/gigsDetails";
import EditProfile from "./pages/Auth/EditProfile";

function App() {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // load role from localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) setUserRole(storedRole);
    setLoading(false); // done loading
  }, []);

  if (loading) {
    // prevent redirect flicker
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  }

  const hideLayout =
    userRole &&
    (location.pathname.startsWith("/freelancer-dashboard") ||
      location.pathname.startsWith("/client-dashboard") ||
      location.pathname.startsWith("/admin-dashboard"));

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />

        {/* redirect based on role */}
        <Route
          path="/dashboard"
          element={
            userRole === "freelancer" ? (
              <Navigate to="/freelancer-dashboard" replace />
            ) : userRole === "client" ? (
              <Navigate to="/client-dashboard" replace />
            ) : userRole === "admin" ? (
              <Navigate to="/admin-dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Freelancer Dashboard */}
        <Route
          path="/freelancer-dashboard"
          element={
            userRole === "freelancer" ? (
              <FreelancerDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/freelancer-dashboard/:id"
          element={
            userRole === "freelancer" ? (
              <GigsDetails />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Client Dashboard */}
        <Route
          path="/client-dashboard"
          element={
            userRole === "client" ? (
              <ClientDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            userRole === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Auth Routes */}
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/update-profile" element={<EditProfile />} />

        {/* Chat */}
        <Route path="/chat" element={<ChattingPage />} />

        {/* Payment */}
        <Route path="/paymentSuccess" element={<PaymentSuccess />} />

        {/* 404 */}
        <Route
          path="*"
          element={<h2 className="text-center mt-10">404 - Page Not Found</h2>}
        />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
