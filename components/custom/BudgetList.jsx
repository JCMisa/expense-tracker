"use client";

import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { db } from "@/utils/db";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import BudgetItem from "./BudgetItem";
import { Button } from "../ui/button";
import { numeric } from "drizzle-orm/pg-core";

const BudgetList = () => {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([])

  useEffect(() => {
    getBudgetList();
  }, [user]);

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

      if (result && result.length > 0) {
        setBudgetList(result)
        toast(
          <p className="text-sm font-bold text-green-500">
            Budgets fetched successfully
          </p>
        );
        console.log("Result: ", result);
        console.log("budgetList: ", budgetList);

        console.log("joined expenses and budgets tables: ", budgetList);
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

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 gap-5">
        {/*adding refreshData method that calls the getBudgetList will enable us to see in the list the added record right after it is added by refreshing the invocation of the method getBudgetList */}
        <CreateBudget refreshData={() => getBudgetList()} />
        {budgetList.length > 0 ? budgetList.map((budget) => (
          <div key={budget.id}>
            <BudgetItem budget={budget} />
          </div>
        )) : [1, 2, 3].map((item, index) => (
          <div key={index} className="w-full bg-dark rounded-lg h-[150px] animate-pulse">

          </div>
        ))}
        <Button className="fixed bottom-3 right-3" onClick={() => getBudgetList()}>Refresh</Button>
      </div>
    </div>
  );
};

export default BudgetList;
