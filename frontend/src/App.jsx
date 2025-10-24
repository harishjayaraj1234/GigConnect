import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import VerifyOtp from "./pages/Auth/VerifyOtp";

function App() {
  return (
    <Routes>
      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />

      {/* Optional 404 route */}
      <Route
        path="*"
        element={<h2 className="text-center mt-10">404 - Page Not Found</h2>}
      />
    </Routes>
  );
}

export default App;
