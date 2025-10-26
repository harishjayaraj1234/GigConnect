import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/login";
import IdVerify from "./pages/Auth/IdVerify";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword"
import Home from "./pages/Auth/Home";
import ProtectedRoute from "./pages/Auth/protectedRoute";
import AllGigs from "./pages/gigs/allGigs";
import GigsDetails from "./pages/gigs/gigsDetails";
import CreateGig from "./pages/gigs/createGigs";
import Chat from "./pages/chatting/chat"

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
        <Route path="/all-gigs" element={<AllGigs />} />
        <Route path="/GigsDetails/:id" element={<GigsDetails />} />
        <Route path="/chating/:id" element={<Chat />} />
        <Route path="/creategigs" element={<CreateGig/>}/>
      </Routes>
    </Router>
  );
}

export default App;