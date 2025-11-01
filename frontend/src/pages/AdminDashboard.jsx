import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  ClipboardList,
  Wallet,
  Star,
  MessageSquare,
  Settings,
  Menu,
  LogOut,
} from "lucide-react";

// Sections (import existing or create admin versions)
import BrowseGigs from "../pages/FreeSections/BrowseGigs";
import MyBookings from "../pages/FreeSections/MyBookings";
import WalletSection from "../pages/FreeSections/WalletSection";
import ReviewsRatings from "../pages/FreeSections/ReviewsRatings";
import Profile from "../pages/FreeSections/Profile";
import MyGigs from "../pages/gigs/allGigs";

// ✅ Admin-specific sections (you can create later)
// import ManageUsers from "../pages/AdminSections/ManageUsers";
// import ManagePayments from "../pages/AdminSections/ManagePayments";
// import AdminSettings from "../pages/AdminSections/AdminSettings";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-blue-600">
              Admin Overview
            </h2>
            <p className="text-gray-600">
              Welcome to the admin dashboard! Manage users, gigs, payments, and
              monitor performance.
            </p>
          </div>
        );
      case "users":
        return <ManageUsers />;
      case "gigs":
        return <MyGigs />;
      case "bookings":
        return <MyBookings />;
      case "wallet":
        return <ManagePayments />;
      case "reviews":
        return <ReviewsRatings userType="admin" />;
      case "chats":
        return <ChatSection />;
      case "profile":
        return <Profile />;
      case "settings":
        return <AdminSettings />;
      default:
        return <BrowseGigs />;
    }
  };

  const menuItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "users", label: "Manage Users", icon: Users },
    { id: "gigs", label: "Manage Gigs", icon: Briefcase },
    { id: "bookings", label: "Bookings", icon: ClipboardList },
    { id: "wallet", label: "Payments", icon: Wallet },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "chats", label: "Chats", icon: MessageSquare },
    { id: "profile", label: "Profile", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-xl border-r border-gray-200 flex flex-col transition-all duration-300`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <div
            className={`flex items-center gap-2 transition-all duration-300 ${
              isSidebarOpen
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4 w-0"
            }`}
          >
            <h2
              className={`font-bold text-xl text-blue-600 whitespace-nowrap transition-all duration-300 ${
                isSidebarOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Admin Panel
            </h2>
          </div>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Sidebar Menu */}
        <ul className="mt-6 flex-1 space-y-5">
          {menuItems.map(({ id, label, icon: Icon }) => (
            <li
              key={id}
              className={`group flex items-center px-4 py-2.5 mx-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                activeTab === id
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(id)}
            >
              <Icon
                className={`mr-3 h-5 w-5 ${
                  activeTab === id ? "text-blue-600" : "text-gray-500"
                }`}
              />
              {isSidebarOpen && (
                <span className="text-sm tracking-wide">{label}</span>
              )}
            </li>
          ))}
        </ul>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => console.log("Logout")}
            className="flex items-center gap-3 text-gray-600 hover:text-red-500 transition-colors text-sm"
          >
            <LogOut className="h-5 w-5" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
        <div className="max-w-6xl mx-auto">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
