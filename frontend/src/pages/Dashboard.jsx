import React, { useEffect, useState } from 'react';
import ExpenseService from '../services/expense.service';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [totals, setTotals] = useState({ daily: 0, monthly: 0 });
    const [categoryData, setCategoryData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await ExpenseService.getAllExpenses();
        setExpenses(data);
        calculateStats(data);
    };

    const calculateStats = (data) => {
        let total = 0;
        const catMap = {};

        data.forEach(exp => {
            total += Number(exp.TotalAmount || 0);

            // Category aggregation
            const catName = exp.Category ? exp.Category.name : 'Uncategorized';
            if (!catMap[catName]) catMap[catName] = 0;
            catMap[catName] += Number(exp.TotalAmount || 0);
        });

        setTotals({ daily: total / 30, monthly: total }); // Simplified logic for demo

        // Prepare Chart Data
        setCategoryData({
            labels: Object.keys(catMap),
            datasets: [
                {
                    label: 'Expenses by Category',
                    data: Object.values(catMap),
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40'
                    ],
                },
            ],
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            await ExpenseService.deleteExpense(id);
            fetchData();
        }
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary">
                    <h3 className="text-gray-500">Total Spending</h3>
                    <p className="text-2xl font-bold">${totals.monthly.toFixed(2)}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-secondary">
                    <h3 className="text-gray-500">Daily Average</h3>
                    <p className="text-2xl font-bold">${totals.daily.toFixed(2)}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                    <h3 className="text-gray-500">Recent Transactions</h3>
                    <p className="text-2xl font-bold">{expenses.length}</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold mb-4">Expenses by Category</h3>
                    <div className="h-64 flex justify-center">
                        {categoryData ? <Pie data={categoryData} /> : <p>Loading...</p>}
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold mb-4">Recent Expenses List</h3>
                    <div className="overflow-y-auto h-64">
                        <table className="w-full text-left">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-2">Item</th>
                                    <th className="p-2">Date</th>
                                    <th className="p-2">Amount</th>
                                    <th className="p-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expenses.map(exp => (
                                    <tr key={exp.id} className="border-b">
                                        <td className="p-2">
                                            <div className="font-bold">{exp.ItemName}</div>
                                            <div className="text-xs text-gray-500">{exp.Quantity} {exp.Unit}</div>
                                        </td>
                                        <td className="p-2">{exp.Date}</td>
                                        <td className="p-2 font-bold text-red-500">
                                            -${Number(exp.TotalAmount || 0).toFixed(2)}
                                        </td>
                                        <td className="p-2">
                                            <button onClick={() => handleDelete(exp.id)} className="text-red-500 hover:text-red-700">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
