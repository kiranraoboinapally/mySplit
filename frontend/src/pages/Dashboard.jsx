import React, { useEffect, useState } from 'react';
import ExpenseService from '../services/expenses';
import { useNavigate } from 'react-router-dom';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import {
    Plus, Trash2, TrendingUp, TrendingDown, DollarSign, Calendar, LogOut, Wallet
} from 'lucide-react';

const COLORS = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [analysis, setAnalysis] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login');
            return;
        }

        loadData();
    }, [navigate]);

    const loadData = async () => {
        try {
            const [expRes, analysisRes] = await Promise.all([
                ExpenseService.getAllExpenses(),
                ExpenseService.getSpendingAnalysis()
            ]);
            setExpenses(expRes.data);
            setAnalysis(analysisRes.data);
        } catch (error) {
            console.error("Error loading dashboard data", error);
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                localStorage.removeItem('user');
                navigate('/login');
            }
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this expense?')) {
            await ExpenseService.deleteExpense(id);
            loadData();
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    // Prepare chart data
    const pieData = analysis ? Object.keys(analysis.byCategory).map(key => ({
        name: key,
        value: analysis.byCategory[key]
    })) : [];

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            {/* Sidebar / Navigation */}
            <nav className="fixed top-0 left-0 h-full w-20 md:w-64 bg-white shadow-xl flex flex-col justify-between hidden md:flex transition-all duration-300 z-50">
                <div className="p-6">
                    <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center gap-2">
                        <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white text-lg">S</div>
                        <span className="hidden md:block">mySplit</span>
                    </h1>

                    <div className="mt-10 space-y-2">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-3 w-full p-3 bg-violet-50 text-violet-700 rounded-xl font-medium transition-colors"
                        >
                            <TrendingUp size={20} /> <span className="hidden md:block">Dashboard</span>
                        </button>
                        <button
                            onClick={() => navigate('/categories')}
                            className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition-colors"
                        >
                            <Calendar size={20} /> <span className="hidden md:block">Categories</span>
                        </button>
                        <button
                            onClick={() => navigate('/shared')}
                            className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition-colors"
                        >
                            <DollarSign size={20} /> <span className="hidden md:block">Split Bills</span>
                        </button>
                        <button
                            onClick={() => navigate('/profile')}
                            className="flex items-center gap gap-3 w-full p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition-colors"
                        >
                            <Wallet size={20} /> <span className="hidden md:block">Profile</span>
                        </button>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-100">
                    <button onClick={handleLogout} className="flex items-center gap-3 w-full p-3 text-red-500 hover:bg-red-50 rounded-xl font-medium transition-colors">
                        <LogOut size={20} /> <span className="hidden md:block">Logout</span>
                    </button>
                </div>
            </nav>

            {/* Mobile Header */}
            <div className="md:hidden bg-white p-4 shadow-sm flex justify-between items-center sticky top-0 z-40">
                <h1 className="text-xl font-bold text-violet-600">mySplit</h1>
                <button onClick={handleLogout}><LogOut size={20} className="text-gray-500" /></button>
            </div>

            {/* Main Content */}
            <main className="md:ml-64 p-6 lg:p-10 space-y-8 pb-24">

                {/* Header Section */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
                        <p className="text-gray-500 text-sm">Track your spending patterns</p>
                    </div>
                    <button
                        onClick={() => navigate('/add-expense')}
                        className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all font-medium"
                    >
                        <Plus size={20} /> Add Expense
                    </button>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Wallet size={100} className="text-violet-600" />
                        </div>
                        <div className="relative z-10">
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Spent (Month)</p>
                            <h3 className="text-3xl font-extrabold text-gray-900 mt-2">
                                {formatCurrency(analysis ? analysis.totalSpent : 0)}
                            </h3>
                            <p className="text-xs text-green-500 mt-2 font-medium flex items-center gap-1">
                                <TrendingUp size={12} /> +12% from last month
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Most Spent Category</p>
                        <h3 className="text-xl font-bold text-gray-900 mt-2 truncate">
                            {pieData.length > 0 ? pieData.sort((a, b) => b.value - a.value)[0].name : "N/A"}
                        </h3>
                    </div>

                    <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 p-6 rounded-2xl shadow-lg text-white">
                        <p className="text-sm font-medium opacity-80 uppercase tracking-wider">Remaining Budget</p>
                        <h3 className="text-3xl font-extrabold mt-2">₹12,450.00</h3>
                        <div className="w-full bg-white/20 h-2 rounded-full mt-4">
                            <div className="bg-white h-2 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                        <p className="text-xs mt-2 opacity-80">70% utilized</p>
                    </div>
                </div>

                {/* Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Spending Trend */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold mb-6 text-gray-800">Spending Trend</h3>
                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={analysis ? analysis.dailyTrend : []}>
                                    <defs>
                                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: 'none' }}
                                        itemStyle={{ color: '#4B5563' }}
                                    />
                                    <Area type="monotone" dataKey="amount" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Category Distribution */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
                        <h3 className="text-lg font-bold mb-4 w-full text-left text-gray-800">Categories</h3>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '8px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="w-full space-y-3 mt-4">
                            {pieData.slice(0, 4).map((entry, index) => (
                                <div key={index} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                        <span className="text-gray-600 font-medium">{entry.name}</span>
                                    </div>
                                    <span className="font-bold text-gray-900">{formatCurrency(entry.value)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-gray-800">Recent Transactions</h3>
                        <button className="text-violet-600 text-sm font-medium hover:text-violet-700">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider font-semibold">
                                <tr>
                                    <th className="p-4">Item</th>
                                    <th className="p-4">Category</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Amount</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {expenses.slice(0, 5).map(exp => (
                                    <tr key={exp.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="p-4 font-medium text-gray-900">
                                            {exp.itemName}
                                            <div className="text-xs text-gray-400 font-normal mt-0.5">{exp.notes}</div>
                                        </td>
                                        <td className="p-4">
                                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                                {exp.category ? exp.category.name : 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-500">
                                            {new Date(exp.date).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 font-bold text-gray-900">
                                            {formatCurrency(exp.totalAmount)}
                                        </td>
                                        <td className="p-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleDelete(exp.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {expenses.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-gray-500">
                                            No expenses found. Start adding some!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
