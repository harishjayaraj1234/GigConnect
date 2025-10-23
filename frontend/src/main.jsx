import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import "./index.css";
import Navbar from "./components/common/Navbar"
import Footer from "./components/common/Footer";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
          <App />
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
