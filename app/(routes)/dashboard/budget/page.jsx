"use client"

import BudgetList from "@/components/custom/BudgetList";
import { UserButton } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Budget = () => {
  const router = useRouter()

  return (
    <div>
      <h2 className="font-bold text-3xl flex items-center gap-2">
        <ArrowLeft width={20} height={20} className="cursor-pointer" onClick={() => router.back()} />
        My Budgets
      </h2>
      <BudgetList />
    </div>
  );
};

export default Budget;
