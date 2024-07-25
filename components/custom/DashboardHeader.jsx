import { UserButton } from "@clerk/nextjs";
import React from "react";

const DashboardHeader = () => {
  return (
    <div className="p-5 shadow-lg border-b flex justify-between items-center">
      <div></div>
      <div>
        <UserButton />
      </div>
    </div>
  );
};

export default DashboardHeader;
