import React, { useState } from "react";
import {
  Briefcase,
  ClipboardList,
  Wallet,
  Star,
  User,
  Menu,
} from "lucide-react";
import BrowseGigs from "./FreeSections/BrowseGigs";
import MyBookings from "./FreeSections/MyBookings";
import WalletSection from "./FreeSections/WalletSection";
import ReviewsRatings from "./FreeSections/ReviewsRatings";
import Profile from "./FreeSections/Profile";

const FreelancerDashboard = () => {
  const [activeTab, setActiveTab] = useState("browse");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case "browse":
        return <BrowseGigs />;
      case "bookings":
        return <MyBookings />;
      case "wallet":
        return <WalletSection />;
      case "reviews":
        return <ReviewsRatings />;
      case "profile":
        return <Profile />;
      default:
        return <BrowseGigs />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-white shadow-md transition-all duration-300`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2
            className={`font-bold text-lg text-blue-600 transition-opacity ${
              isSidebarOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            Freelancer
          </h2>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <ul className="mt-4 space-y-2">
          <li
            className={`flex items-center px-4 py-2 cursor-pointer hover:bg-blue-50 ${
              activeTab === "browse" ? "bg-blue-100 text-blue-600" : ""
            }`}
            onClick={() => setActiveTab("browse")}
          >
            <Briefcase className="mr-3" /> {isSidebarOpen && "Browse Gigs"}
          </li>
          <li
            className={`flex items-center px-4 py-2 cursor-pointer hover:bg-blue-50 ${
              activeTab === "bookings" ? "bg-blue-100 text-blue-600" : ""
            }`}
            onClick={() => setActiveTab("bookings")}
          >
            <ClipboardList className="mr-3" /> {isSidebarOpen && "My Bookings"}
          </li>
          <li
            className={`flex items-center px-4 py-2 cursor-pointer hover:bg-blue-50 ${
              activeTab === "wallet" ? "bg-blue-100 text-blue-600" : ""
            }`}
            onClick={() => setActiveTab("wallet")}
          >
            <Wallet className="mr-3" /> {isSidebarOpen && "Wallet"}
          </li>
          <li
            className={`flex items-center px-4 py-2 cursor-pointer hover:bg-blue-50 ${
              activeTab === "reviews" ? "bg-blue-100 text-blue-600" : ""
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            <Star className="mr-3" /> {isSidebarOpen && "Reviews & Ratings"}
          </li>
          <li
            className={`flex items-center px-4 py-2 cursor-pointer hover:bg-blue-50 ${
              activeTab === "profile" ? "bg-blue-100 text-blue-600" : ""
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <User className="mr-3" /> {isSidebarOpen && "Profile"}
          </li>
        </ul>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">{renderContent()}</div>
    </div>
  );
};

export default FreelancerDashboard;