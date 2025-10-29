import React, { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
//import MyGigs from "../components/Gigs/MyGigs";
import WalletSection from "../components/Wallet/WalletSection";
import ReviewsRatings from "../components/Reviews/ReviewsRatings";
import ProfileSection from "../components/Profile/ProfileSection";
import ChatSection from "../components/Chat/ChatSection";

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState("myGigs");

  const renderSection = () => {
    switch (activeTab) {
      case "myGigs":
        return <MyGigs />;
      case "chat":
        return <ChatSection />;
      case "wallet":
        return <WalletSection />;
      case "reviews":
        return <ReviewsRatings userType="client" />;
      case "profile":
        return <ProfileSection userType="client" />;
      default:
        return <MyGigs />;
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar
        userType="client"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Dashboard Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-semibold mb-6">Client Dashboard</h1>
        {renderSection()}
      </div>
    </div>
  );
};

export default ClientDashboard;
