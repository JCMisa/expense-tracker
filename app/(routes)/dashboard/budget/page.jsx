import BudgetList from "@/components/custom/BudgetList";
import { UserButton } from "@clerk/nextjs";
import React from "react";

const Budget = () => {
  return (
    <div>
      <h2 className="font-bold text-3xl">My Budgets</h2>
      <BudgetList />
    </div>
  );
};

export default Budget;
