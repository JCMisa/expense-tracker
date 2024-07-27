"use client"

import ExpenseList from '@/components/custom/ExpenseList'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq, getTableColumns } from 'drizzle-orm'
import { Home } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const ExpensePage = () => {
    const { user } = useUser();
    const router = useRouter();

    const [expenseList, setExpenseList] = useState([])

    useEffect(() => {
        getExpensesList();
    }, [user])

    const getExpensesList = async () => {
        try {
            const result = await db.select({
                ...getTableColumns(Expenses)
            })
                .from(Budgets)
                .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
                .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
                .orderBy(desc(Expenses.id))

            if (result) {
                setExpenseList(result)
                console.log("expense page list: ", result);
            }
        } catch (error) {
            toast(<p className="text-sm font-bold text-red-500">
                Internal error occured while fetching data
            </p>)
            console.log(error);
        }
    }



    return (
        <>
            <div className='p-5'>
                <Button className="cursor-pointer flex items-center gap-2" onClick={() => router.push("/dashboard")}>
                    <Home width={20} height={20} /> Home
                </Button>
                <ExpenseList expenseList={expenseList && expenseList} refreshData={() => getExpensesList()} />
            </div>
            <Button className='fixed bottom-3 right-3' onClick={getExpensesList}>Refresh</Button>
        </>
    )
}

export default ExpensePage