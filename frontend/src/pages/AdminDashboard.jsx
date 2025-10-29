import React, { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Overview from "./adminSections/Overview";
import ManageUsers from "./adminSections/ManageUsers";
import ManageGigs from "./adminSections/ManageGigs";
import Wallets from "./adminSections/Wallets";
import Reports from "./adminSections/Reports";
import Settings from "./adminSections/Settings";

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
