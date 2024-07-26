import React from 'react'
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts'

const BarChartDashboard = ({ budgetList }) => {
    return (
        <div className='border rounded-lg md:p-5 barchart'>
            <h2 className='font-bold text-lg'>Activity</h2>
            {/* data should have a value of array since budgetList is an array passed as props */}
            <BarChart width={1000} height={300} data={budgetList} margin={{ top: 7 }}>
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='totalSpend' stackId='a' fill='#2E236C' />
                <Bar dataKey='amount' stackId='a' fill='#433D8B' />
            </BarChart>
        </div>
    )
}

export default BarChartDashboard