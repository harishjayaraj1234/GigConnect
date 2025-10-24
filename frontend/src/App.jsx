import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/login";
import IdVerify from "./pages/Auth/IdVerify";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword"
import Home from "./pages/Auth/Home";
import ProtectedRoute from "./pages/Auth/protectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* ---------- Public Routes ---------- */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-account" element={<IdVerify/>}/>
        <Route path="/register" element={<Register />} />

        {/* ---------- Protected Routes ---------- */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* ---------- Catch-all ---------- */}
        <Route path="*" element={<h2>404 Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;