import { db } from '@/utils/db'
import { Expenses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

const ExpenseList = ({ expenseList, refreshData }) => {
    const deleteExpense = async (expense) => {
        try {
            const result = await db.delete(Expenses).where(eq(Expenses.id, expense.id))
            if (result) {
                toast(<p className="text-sm font-bold text-green-500">
                    {expense?.name} deleted successfully
                </p>)
                refreshData();
            }
        } catch (error) {
            toast(<p className="text-sm font-bold text-red-500">
                Internal error occured while deleting expense
            </p>)
        }
    }
    return (
        <div className='mt-3'>
            <h2 className="fonts-bold text-lg">Latest Expenses</h2>
            <div className='grid grid-cols-4 bg-primary p-2 mt-3'>
                <h2 className='font-bold'>Name</h2>
                <h2 className='font-bold'>Amount</h2>
                <h2 className='font-bold'>Date</h2>
                <h2 className='flex justify-center items-center font-bold'>Action</h2>
            </div>
            {expenseList && expenseList.map((expense, index) => (
                <div className='grid grid-cols-4 bg-dark p-2' key={index}>
                    <h2>{expense?.name}</h2>
                    <h2>{expense?.amount}</h2>
                    <h2>{expense?.createdAt}</h2>
                    <h2 className='flex justify-center items-center cursor-pointer hover:scale-125' onClick={() => deleteExpense(expense)}><Trash className='text-red-500 hover:text-red-200' width={14} height={14} /></h2>
                </div>
            ))}
        </div>
    )
}

export default ExpenseList