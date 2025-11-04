// src/pages/AdminDashboard.jsx
import React, { useState } from "react";

import ManageUsers from "./AdminSections/ManageUsers";
import ManageGigs from "./AdminSections/ManageGigs";
import Wallets from "./AdminSections/Wallets";
import Reports from "./AdminSections/Reports";
import Settings from "./AdminSections/Settings";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const renderSection = () => {
    switch (activeTab) {
      case "manageUsers":
        return <ManageUsers />;
      case "manageGigs":
        return <ManageGigs />;
      case "wallets":
        return <Wallets />;
      case "reports":
        return <Reports />;
      case "settings":
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main style={{ flex: 1, padding: "20px" }}>{renderSection()}</main>
    </div>
  );
};

export default AdminDashboard;
