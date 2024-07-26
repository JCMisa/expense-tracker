import { PiggyBank, ReceiptText, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const CardInfo = ({ budgetList }) => {
    const [totalBudget, setTotalBudget] = useState(0)
    const [totalSpend, setTotalSpend] = useState(0)

    useEffect(() => {
        calculateCardInfo()
    }, [budgetList])

    const calculateCardInfo = () => {
        let _totalBudget = 0;
        let _totalSpend = 0;

        budgetList?.forEach(element => {
            _totalBudget = _totalBudget + element?.amount
            _totalSpend = _totalSpend + element?.totalSpend
        });

        setTotalBudget(_totalBudget)
        setTotalSpend(_totalSpend)

        console.log("total budget: ", _totalBudget, " total spend: ", _totalSpend);
    }

    return (
        <div>
            {
                budgetList ? (
                    <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                        <div className='p-7 border rounded-lg flex items-center justify-between bg-primary'>
                            <div>
                                <h2 className='text-sm'>Total Budget</h2>
                                <h2 className='text-2xl font-bold'>${totalBudget}</h2>
                            </div>
                            <PiggyBank className='bg-secondary p-3 h-12 w-12 rounded-full text-light' />
                        </div>

                        <div className='p-7 border rounded-lg flex items-center justify-between bg-primary'>
                            <div>
                                <h2 className='text-sm'>Total Spent</h2>
                                <h2 className='text-2xl font-bold'>${totalSpend}</h2>
                            </div>
                            <ReceiptText className='bg-secondary p-3 h-12 w-12 rounded-full text-light' />
                        </div>

                        <div className='p-7 border rounded-lg flex items-center justify-between bg-primary'>
                            <div>
                                <h2 className='text-sm'>No. of Items to Budget</h2>
                                <h2 className='text-2xl font-bold'>{budgetList?.length}</h2>
                            </div>
                            <Wallet className='bg-secondary p-3 h-12 w-12 rounded-full text-light' />
                        </div>
                    </div>
                ) : (
                    <div>
                        {
                            [1, 2, 3].map((item) => (
                                <div key={item} className='h-[110px] bg-primary rounded-lg animate-pulse mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'></div>
                            ))
                        }
                    </div>
                )
            }

        </div>
    )
}

export default CardInfo