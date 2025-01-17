import Link from 'next/link'
import React from 'react'

const BudgetItem = ({ budget }) => {
    const calculateProgress = () => {
        const percent = (budget?.totalSpend / budget?.amount) * 100
        return percent.toFixed(2)
    }

    return (
        <Link href={`/dashboard/expenses/${budget?.id}`} >
            <div className='p-5 border rounded-lg bg-dark px-5 py-[2.2rem] cursor-pointer hover:shadow-md transition-all min-h-[100px] min-w-[280px]'>
                <div className='flex items-center gap-2 justify-between'>
                    <div className='flex gap-2 items-center'>
                        <h2 className='text-3xl p-2 bg-secondary rounded-full'>{budget?.icon}</h2>
                        <div>
                            <h2 className='font-bold'>{budget?.name}</h2>
                            <h2 className='text-sm text-gray-500'>{budget?.totalItem} Expenses</h2>
                        </div>
                    </div>
                    <h2 className='font-bold text-green-500 text-lg'>${budget?.amount}</h2>
                </div>
                <div className='mt-5'>
                    <div className='flex justify-between mb-3'>
                        <h2 className='text-xs text-green-500'>${budget?.totalSpend ? budget?.totalSpend : 0} <span className='text-slate-500'>Spent</span></h2>
                        <h2 className='text-xs text-green-500'>${budget?.amount - (budget?.totalSpend ? budget?.totalSpend : 0)} <span className='text-slate-500'>Remaining</span></h2>
                    </div>
                    <div className='w-full bg-secondary h-2 rounded-full'>
                        <div className='bg-light h-2 rounded-full' style={{ width: `${calculateProgress()}%` }}>

                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default BudgetItem