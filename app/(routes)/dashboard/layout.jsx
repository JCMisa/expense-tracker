import DashboardHeader from "@/components/custom/DashboardHeader";
import SideNav from "@/components/custom/SideNav";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <div className="fixed md:w-64 hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
