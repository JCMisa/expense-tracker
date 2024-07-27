import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { db } from '@/utils/db'
import { Budgets, Expenses } from '@/utils/schema'
import moment from 'moment'
import { LoaderCircle } from 'lucide-react'

const AddExpense = ({ budgetId, refreshData }) => {
    const [name, setName] = useState()
    const [amount, setAmount] = useState()
    const [loading, setLoading] = useState(false)

    const addNewExpense = async () => {
        setLoading(true)
        try {
            const result = await db.insert(Expenses).values({
                name: name,
                amount: amount,
                budgetId: budgetId,
                createdAt: moment().format("MM-DD-yyyy")
            }).returning({ insertedId: Budgets.id })

            setName('')
            setAmount('')

            if (result) {
                console.log("created expense:", result);
                toast(<p className="text-sm font-bold text-green-500">
                    New expense created successfully
                </p>)
                refreshData();
                setLoading(false);
            }
        } catch (error) {
            toast(<p className="text-sm font-bold text-red-500">
                Internal error occured while creating expense
            </p>)
            setLoading(false);
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='border p-5 rounded-lg bg-dark'>
            <h2 className='font-bold text-lg'>Add Expense</h2>
            <div className="mt-5">
                <h2 className="text-light font-medium my-1">Expense Name</h2>
                <Input
                    value={name}
                    required
                    placeholder="e.g Car Maintenance"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mt-5">
                <h2 className="text-light font-medium my-1">Expense Amount</h2>
                <Input
                    value={amount}
                    required
                    type="number"
                    placeholder="e.g $300"
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <Button onClick={() => addNewExpense()} className="mt-3 w-full" disabled={!(name && amount) || loading}>
                {
                    loading ? <LoaderCircle className='animate-spin' /> : "Add New Expense"
                }

            </Button>

            <Button className="fixed bottom-3 right-3" onClick={() => refreshData()}>Refresh</Button>
        </div>
    )
}

export default AddExpense