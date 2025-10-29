import React from "react";
import DashboardLayout from "./DashboardLayout";
import FreelancerDashboard from "./FreelancerDashboard";
import ClientDashboard from "./ClientDashboard";
import AdminDashboard from "./AdminDashboard";
import { getUserType } from "../../utils/userType";

const Dashboard = () => {
  const userType = getUserType(); // e.g. "freelancer" | "client" | "admin"

  const renderDashboard = () => {
    switch (userType) {
      case "freelancer":
        return <FreelancerDashboard />;
      case "client":
        return <ClientDashboard />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <div>Invalid user type</div>;
    }
  };

  return (
    <DashboardLayout userType={userType}>{renderDashboard()}</DashboardLayout>
  );
};

export default Dashboard;
