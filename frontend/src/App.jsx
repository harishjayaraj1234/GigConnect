import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";

// Dashboards
import FreelancerDashboard from "./pages/FreelancerDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import VerifyOtp from "./pages/Auth/verifyOtp";
import ChattingPage from "./pages/chatting/chat";
import PaymentSuccess from "./components/payment/paymentSuccess";

function App() {
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();

  // ✅ Get stored role (persist login after refresh)
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) setUserRole(storedRole);
  }, []);

  // ✅ Hide navbar/footer on dashboard pages
  const hideLayout =
    userRole &&
    (location.pathname.startsWith("/freelancer-dashboard") ||
      location.pathname.startsWith("/client-dashboard") ||
      location.pathname.startsWith("/admin-dashboard"));

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        {/* Redirect root to Home */}
        <Route path="/" element={<Home />} />

        {/* 🚀 Role-based Dashboard Routing */}
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
              <Navigate to="/" replace />
            )
          }
        />

        {/* 🧑‍💻 Freelancer Dashboard */}
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

        {/* 🏢 Client Dashboard */}
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

        {/* 👑 Admin Dashboard */}
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

        {/* 🔐 Auth Routes */}
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* 💬 Chat Route */}
        <Route path="/chat" element={<ChattingPage/>} />

        {/* ❌ 404 Page */}
        <Route
          path="*"
          element={<h2 className="text-center mt-10">404 - Page Not Found</h2>}
        />



        {/*route for payment */}

        <Route path="/paymentSuccess" element={<PaymentSuccess/>}/>





      </Routes>

      {!hideLayout && <Footer />}





    </>
  );
}

export default App;