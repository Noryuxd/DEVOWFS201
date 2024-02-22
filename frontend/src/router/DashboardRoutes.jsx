import React from "react";
import { Route, Routes } from "react-router-dom";
import ".././App.css";
import Sidebar from "../pages/JobSeekerDashBoard/layouts/Sidebar";
import Navbar from "../pages/JobSeekerDashBoard/layouts/Navbar";
import Content from "../pages/JobSeekerDashBoard/container/Content";
import Dashboard from "../pages/JobSeekerDashBoard/components/Dashboard";
import Messages from "../pages/JobSeekerDashBoard/components/Messages";
import BrowseCompanies from "../pages/JobSeekerDashBoard/components/BrowseCompanies";
import MyPublicProfile from "../pages/JobSeekerDashBoard/components/MyPublicProfile";
import Settings from "../pages/JobSeekerDashBoard/components/Settings";
import HelpCenter from "../pages/JobSeekerDashBoard/components/HelpCenter";
import MyOffers from "../pages/JobSeekerDashBoard/components/MyOffers";

const DashboardRouters = () => {
  return (
    <div className="flex  overflow-hidden h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <Routes>
          <Route path="/" element={<Content />}>
            <Route index element={<Dashboard />} />
            <Route path="messages" element={<Messages />} />
            <Route path="my-offers" element={<MyOffers />} />
            <Route path="browse-companies" element={<BrowseCompanies />} />
            <Route path="public-profile" element={<MyPublicProfile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="help" element={<HelpCenter />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default DashboardRouters;
