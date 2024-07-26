"use client"

import AddExpense from "@/components/custom/AddExpense";
import BudgetItem from "@/components/custom/BudgetItem";
import ExpenseList from "@/components/custom/ExpenseList";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { Budgets, Expenses } from "@/utils/schema";
import { UserButton, useUser } from "@clerk/nextjs";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation";
import EditBudget from "@/components/custom/EditBudget";


const Expense = ({ params }) => {
  const { user } = useUser();
  const route = useRouter();

  const [budgetInfo, setBudgetInfo] = useState({})
  const [expenseList, setExpenseList] = useState([])

  useEffect(() => {
    user && getBudgetInfo()
  }, [user])

  const getBudgetInfo = async () => {
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
        .where(eq(Budgets.id, params.budgetId))
        .groupBy(Budgets.id)

      if (result) {
        setBudgetInfo(result[0])
        console.log("budget info Result: ", result);
      } else {
        toast(
          <p className="text-sm font-bold text-red-500">
            Error occured while fetching budget info
          </p>
        );
      }

      getExpensesList()
    } catch (error) {
      toast(
        <p className="text-sm font-bold text-red-500">
          Internal error occured while fetching data
        </p>
      );
    }
  }

  const getExpensesList = async () => {
    try {
      const result = await db.select()
        .from(Expenses)
        .where(eq(Expenses.budgetId, params.budgetId))
        .orderBy(desc(Expenses.id))

      if (result) {
        setExpenseList(result)
        console.log("expense list: ", result);
      }
    } catch (error) {
      toast(<p className="text-sm font-bold text-red-500">
        Internal error occured while fetching data
      </p>)
    }
  }

  const deleteBudget = async () => {
    try {
      // we first delete the child record in order to not violate the foreign key constraints, because some of the records in Expenses are connected to Budgets table through budgetId property of Expenses and id proerty of Budgets
      const deleteExpenseRes = await db.delete(Expenses)
        .where(eq(Expenses.budgetId, params.budgetId))
        .returning({ deletedExpense: Expenses.budgetId })

      if (deleteExpenseRes) {
        toast(<p className="text-sm font-bold text-green-500">
          Expense with id {deleteExpenseRes.deletedExpense} was deleted successfully
        </p>)

        const deleteBudgetRes = await db.delete(Budgets)
          .where(eq(Budgets.id, params.budgetId))
          .returning({ deletedBudget: Budgets.id })

        if (deleteBudgetRes) {
          toast(<p className="text-sm font-bold text-green-500">
            Budget with id {deleteBudgetRes.deletedBudget} was deleted successfully
          </p>)

          route.replace('/dashboard/budget')
        }
      }
    } catch (error) {
      toast(<p className="text-sm font-bold text-red-500">
        Internal error occured while deleting the records
      </p>)
    }
  }

  return <div className="p-5">
    <h2 className="text-2xl font-bold flex justify-between items-center">
      My Expenses

      <div className="flex gap-2 items-center">
        <EditBudget budgetInfo={budgetInfo} refreshData={() => getBudgetInfo()} />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="flex gap-2 min-w-40" variant="destructive">
              <Trash /> Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your budget along with the expenses.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteBudget()}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 mt-7 gap-5">
      {budgetInfo ? <BudgetItem budget={budgetInfo} /> : <div className="w-full bg-dark rounded-lg h-[150px] animate-pulse"></div>}
      <AddExpense refreshData={() => getBudgetInfo()} budgetId={params.budgetId} />
    </div>
    <div className="mt-7">
      <h2 className="fonts-bold text-lg">Latest Expenses</h2>
      <ExpenseList expenseList={expenseList} refreshData={() => getBudgetInfo()} />
    </div>
  </div>;
};

export default Expense;
