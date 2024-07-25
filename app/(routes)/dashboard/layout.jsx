"use client";

import DashboardHeader from "@/components/custom/DashboardHeader";
import SideNav from "@/components/custom/SideNav";
import { db } from "@/utils/db";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

const DashboardLayout = ({ children }) => {
  // const { user } = useUser();
  // const router = useRouter();

  // useEffect(() => {
  //   user && checkUserBudgets();
  // }, [user]);

  // const checkUserBudgets = async () => {
  //   try {
  //     const result = await db
  //       .select()
  //       .from(Budgets)
  //       .where(eq(Budgets?.createdBy, user?.primaryEmailAddress?.emailAddress));

  //     if (result) {
  //       toast(
  //         <p className="text-sm font-bold text-green-500">
  //           Budgets fetched successfully
  //         </p>
  //       );
  //       console.log("User budget: ", result);
  //     }
  //     if (result?.length == 0) {
  //       toast(
  //         <p className="text-sm font-bold text-light">
  //           You have no budget to show
  //         </p>
  //       );
  //       router.replace("/dashboard/budget");
  //     }
  //   } catch (error) {
  //     toast(
  //       <p className="text-sm font-bold text-red-500">
  //         Internal error occured while fetching the data
  //       </p>
  //     );
  //     console.log(error);
  //   }
  // };
  return (
    <div>
      <div className="fixed md:w-64 hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
