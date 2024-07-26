"use client"

import CardInfo from "@/components/custom/CardInfo";
import { db } from "@/utils/db";
import { Budgets, Expenses } from "@/utils/schema";
import { UserButton, useUser } from "@clerk/nextjs";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Dashboard = () => {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([])

  useEffect(() => {
    const getBudgetList = async () => {
      try {
        const result = await db
          .select({
            ...getTableColumns(Budgets), // it means select all columns from Budgets table
            totalItem: sql`count(${Expenses.id})`.mapWith(Number), // new column which is equal to the count of all Expenses records
            totalSpend: sql`sum(${Expenses.amount}::int)`.mapWith(Number), // new column which is equal to the sum of all Expenses amount combined
          })
          .from(Budgets)
          .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId)) // join te Expenses table to Budgets table where Expenses.budgetId is equal to Budgets.id
          .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
          .groupBy(Budgets.id)
          .orderBy(desc(Budgets.id));

        if (result) {
          setBudgetList(result)
          console.log("dashboard result: ", result);
          console.log("dashboard budgetList: ", budgetList);
        }
        else if (result.length == 0) {
          toast(<p className="text-sm font-bold text-light">
            You have no budget to show
          </p>)
        }
        else {
          toast(
            <p className="text-sm font-bold text-red-500">
              Error occured while joining expenses and budgets tables
            </p>
          );
        }

      } catch (error) {
        toast(
          <p className="text-sm font-bold text-red-500">
            Internal error occured while performing left join
          </p>
        );
        console.log(error);
      }
    };

    getBudgetList()
  }, [user]);



  return <div className="p-5">
    <h2 className="text-light font-bold text-3xl">Hello <span className="text-secondary">{user?.fullName}</span> 👋 </h2>
    <p className="text-gray-500">Check the flow of your money, and manage your expenses.</p>

    <CardInfo budgetList={budgetList} />
  </div>;
};

export default Dashboard;
