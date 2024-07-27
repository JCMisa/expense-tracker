import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const BarChartDashboard = ({ budgetList }) => {
    return (
        <div className='border rounded-lg md:p-5'>
            <h2 className='font-bold text-lg'>Activity</h2>
            {/* data should have a value of array since budgetList is an array passed as props */}
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={budgetList} margin={{ top: 7 }}>
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey='totalSpend' stackId='a' fill='#2E236C' />
                    <Bar dataKey='amount' stackId='a' fill='#433D8B' />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default BarChartDashboard