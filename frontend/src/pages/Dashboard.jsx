import React from "react";
<<<<<<< HEAD
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
=======
import Header from "../components/dashboard/Header";
import AdminDashboard from "./AdminDashboard";
import FreelancerDashboard from "./FreelancerDashboard";
import ClientDashboard from "./ClientDashboard";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <p>Please login</p>;

  switch (user.role) {
    case "admin":
      return (
        <div>
          <Header user={user} />
          <AdminDashboard />
        </div>
      );
    case "freelancer":
      return (
        <div>
          <Header user={user} />
          <FreelancerDashboard />
        </div>
      );
    default:
      return (
        <div>
          <Header user={user} />
          <ClientDashboard />
        </div>
      );
  }
};

export default Dashboard;
>>>>>>> 8685df037814285e8694df32842517a96114253e
