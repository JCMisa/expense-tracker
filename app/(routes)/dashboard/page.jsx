"use client"

import CardInfo from "@/components/custom/CardInfo";
import { db } from "@/utils/db";
import { Budgets, Expenses } from "@/utils/schema";
import { UserButton, useUser } from "@clerk/nextjs";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import BarChartDashboard from "@/components/custom/BarChartDashboard";
import BudgetItem from "@/components/custom/BudgetItem";
import ExpenseList from "@/components/custom/ExpenseList";

const Dashboard = () => {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([])
  const [expensesList, setExpensesList] = useState()

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

    const getAllExpenses = async () => {
      // even though you get all the properties of Expenses, you still need to get it from budgets table simply because expenses table doesnt have createdBy, and we need it from Budgets table to get the records of currently logged in user so we perform the right join
      try {
        const result = await db.select({
          id: Expenses.id,
          name: Expenses.name,
          amount: Expenses.amount,
          createdAt: Expenses.createdAt,
        })
          .from(Budgets)
          .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
          .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
          .orderBy(desc(Expenses.id))

        setExpensesList(result)
      } catch (error) {
        toast(
          <p className="text-sm font-bold text-red-500">
            Internal error occured while performing left join
          </p>
        )
      }
    }

    getBudgetList()
    getAllExpenses()
  }, [user]);



  return <div className="p-5">
    <h2 className="text-light font-bold text-3xl">Hello <span className="text-secondary">{user?.fullName}</span> 👋 </h2>
    <p className="text-gray-500">Check the flow of your money, and manage your expenses.</p>

    <CardInfo budgetList={budgetList} />

    <div>
      <BarChartDashboard budgetList={budgetList} />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 mt-7 gap-5">
      <div className="md:col-span-2">
        <ExpenseList expenseList={expensesList} refreshData={() => getBudgetList()} />
      </div>
    </div>

    <h2 className="text-lg font-bold mt-7">Budget List</h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {
        budgetList.map((budget, index) => (
          <BudgetItem budget={budget} key={index} />
        ))
      }
    </div>
  </div>;
};

export default Dashboard;
