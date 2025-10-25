import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Auth/login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Auth/Home";
import ProtectedRoute from "./pages/Auth/protectedRoute";
import AllGigs from "./pages/gigs/allGigs";
import GigsDetails from "./pages/gigs/gigsDetails";
import CreateGig from "./pages/gigs/createGigs";

function App() {
  return (
    <Router>
      <Routes>
       <Route path="/creategigs" element={<CreateGig/>}/>

      </Routes>
    </Router>
  );
}

export default App;