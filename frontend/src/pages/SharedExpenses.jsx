import React, { useState, useEffect } from 'react';
import ExpenseService from '../services/expenses';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, CheckCircle, Clock } from 'lucide-react';

const SharedExpenses = () => {
    const navigate = useNavigate();
    const [owed, setOwed] = useState([]);
    const [lended, setLended] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [owedRes, lendedRes] = await Promise.all([
                ExpenseService.getSharedOwed(),
                ExpenseService.getSharedLended()
            ]);
            setOwed(owedRes.data);
            setLended(lendedRes.data);
        } catch (error) {
            console.error("Error loading shared expenses", error);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    const totalOwed = owed.reduce((sum, item) => sum + (item.amountOwed || 0), 0);
    const totalLended = lended.reduce((sum, item) => sum + (item.amountOwed || 0), 0);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Shared Expenses</h1>
                            <p className="text-sm text-gray-500">Track split bills and settlements</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium opacity-90">You Owe</span>
                            <TrendingDown size={24} className="opacity-80" />
                        </div>
                        <h2 className="text-4xl font-extrabold">{formatCurrency(totalOwed)}</h2>
                        <p className="text-sm opacity-80 mt-2">{owed.length} pending payments</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium opacity-90">You're Owed</span>
                            <TrendingUp size={24} className="opacity-80" />
                        </div>
                        <h2 className="text-4xl font-extrabold">{formatCurrency(totalLended)}</h2>
                        <p className="text-sm opacity-80 mt-2">{lended.length} pending collections</p>
                    </div>
                </div>

                {/* You Owe Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <TrendingDown size={20} className="text-red-500" /> You Owe
                        </h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {owed.map(item => (
                            <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold">
                                                {item.payer?.name?.charAt(0) || 'U'}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{item.payer?.name || 'Unknown'}</p>
                                                <p className="text-sm text-gray-500">Expense ID: {item.expenseId}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-red-600">{formatCurrency(item.amountOwed)}</p>
                                        {item.isSettled ? (
                                            <span className="inline-flex items-center gap-1 text-xs text-green-600 mt-1">
                                                <CheckCircle size={12} /> Settled
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 text-xs text-orange-600 mt-1">
                                                <Clock size={12} /> Pending
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {owed.length === 0 && (
                            <div className="p-12 text-center text-gray-500">
                                <TrendingDown size={48} className="mx-auto text-gray-300 mb-3" />
                                <p>No debts! You're all clear.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* You're Owed Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <TrendingUp size={20} className="text-green-500" /> You're Owed
                        </h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {lended.map(item => (
                            <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                                                {item.debtor?.name?.charAt(0) || 'U'}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{item.debtor?.name || 'Unknown'}</p>
                                                <p className="text-sm text-gray-500">Expense ID: {item.expenseId}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-green-600">{formatCurrency(item.amountOwed)}</p>
                                        {item.isSettled ? (
                                            <span className="inline-flex items-center gap-1 text-xs text-green-600 mt-1">
                                                <CheckCircle size={12} /> Settled
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 text-xs text-orange-600 mt-1">
                                                <Clock size={12} /> Pending
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {lended.length === 0 && (
                            <div className="p-12 text-center text-gray-500">
                                <TrendingUp size={48} className="mx-auto text-gray-300 mb-3" />
                                <p>Nobody owes you anything yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SharedExpenses;
