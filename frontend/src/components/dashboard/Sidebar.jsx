// src/components/Sidebar.jsx
import React from "react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "manageUsers", label: "Manage Users" },
    { id: "manageGigs", label: "Manage Gigs" },
    { id: "wallets", label: "Wallets" },
    { id: "reports", label: "Reports" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <aside style={{ width: "200px", background: "#eee", padding: "20px" }}>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tabs.map((tab) => (
          <li
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "10px",
              cursor: "pointer",
              background: activeTab === tab.id ? "#ccc" : "transparent",
            }}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
