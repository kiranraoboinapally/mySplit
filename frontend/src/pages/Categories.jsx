import React, { useState, useEffect } from 'react';
import ExpenseService from '../services/expenses';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Tag, TrendingUp, Package, ChevronRight, Search, Filter } from 'lucide-react';

const Categories = () => {
    const navigate = useNavigate();
    const [categoryTree, setCategoryTree] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedCategories, setExpandedCategories] = useState(new Set());

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            // Load both category tree and expenses
            const [treeRes, expensesRes] = await Promise.all([
                ExpenseService.getCategoryTree(),
                ExpenseService.getAllExpenses()
            ]);

            setCategoryTree(treeRes.data);
            setExpenses(expensesRes.data);
        } catch (error) {
            console.error("Error loading data", error);
        } finally {
            setLoading(false);
        }
    };

    // Calculate stats for a category and its children
    const getCategoryStats = (categoryId) => {
        const categoryExpenses = expenses.filter(exp =>
            exp.categoryId === categoryId ||
            exp.category?.id === categoryId ||
            exp.category?.parentId === categoryId
        );

        const count = categoryExpenses.length;
        const total = categoryExpenses.reduce((sum, exp) => sum + (exp.totalAmount || 0), 0);

        return { count, total };
    };

    // Check if category or its children have been used
    const hasExpenses = (category) => {
        const stats = getCategoryStats(category.id);
        if (stats.count > 0) return true;

        // Check children
        if (category.children && category.children.length > 0) {
            return category.children.some(child => hasExpenses(child));
        }

        return false;
    };

    const toggleCategory = (categoryId) => {
        const newExpanded = new Set(expandedCategories);
        if (newExpanded.has(categoryId)) {
            newExpanded.delete(categoryId);
        } else {
            newExpanded.add(categoryId);
        }
        setExpandedCategories(newExpanded);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    // Filter categories based on search and expense usage
    const filteredCategories = categoryTree.filter(cat => {
        const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase());
        const hasData = hasExpenses(cat);
        return matchesSearch && hasData;
    });

    const renderCategory = (category, level = 0) => {
        const stats = getCategoryStats(category.id);
        const hasChildren = category.children && category.children.length > 0;
        const isExpanded = expandedCategories.has(category.id);
        const childrenWithData = hasChildren ? category.children.filter(hasExpenses) : [];

        if (stats.count === 0 && childrenWithData.length === 0) {
            return null; // Don't render if no expenses
        }

        return (
            <div key={category.id} className="mb-2">
                <div
                    onClick={() => hasChildren && toggleCategory(category.id)}
                    className={`group p-4 rounded-xl border-2 transition-all cursor-pointer
                        ${level === 0 ? 'bg-gradient-to-r from-violet-50 to-fuchsia-50 border-violet-200 hover:border-violet-400' :
                            level === 1 ? 'bg-white border-gray-200 hover:border-violet-300 ml-6' :
                                'bg-gray-50 border-gray-150 hover:border-gray-300 ml-12'}
                    `}
                    style={{ marginLeft: level > 2 ? `${level * 24}px` : undefined }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                            {hasChildren && (
                                <ChevronRight
                                    size={20}
                                    className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                                />
                            )}

                            <div className={`${level === 0 ? 'w-12 h-12' : 'w-10 h-10'} 
                                bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl 
                                flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                <Tag size={level === 0 ? 24 : 20} className="text-white" />
                            </div>

                            <div className="flex-1">
                                <h3 className={`font-bold text-gray-900 ${level === 0 ? 'text-xl' : 'text-lg'}`}>
                                    {category.name}
                                </h3>
                                {category.description && (
                                    <p className="text-sm text-gray-500 mt-0.5">{category.description}</p>
                                )}
                            </div>
                        </div>

                        {stats.count > 0 && (
                            <div className="flex items-center gap-6 ml-4">
                                <div className="text-right">
                                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Expenses</p>
                                    <p className="text-lg font-bold text-gray-900">{stats.count}</p>
                                </div>
                                <div className="text-right min-w-[120px]">
                                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Total</p>
                                    <p className="text-xl font-bold text-violet-600">{formatCurrency(stats.total)}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Render children */}
                {isExpanded && hasChildren && (
                    <div className="mt-2 space-y-2">
                        {childrenWithData.map(child => renderCategory(child, level + 1))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-white border-b-2 border-gray-100 sticky top-0 z-30 backdrop-blur-sm bg-white/90">
                <div className="max-w-6xl mx-auto px-6 py-5">
                    <div className="flex items-center gap-4 mb-4">
                        <button
                            onClick={() => navigate('/')}
                            className="p-3 hover:bg-gray-100 rounded-xl transition-all hover:scale-110 active:scale-95"
                        >
                            <ArrowLeft size={22} className="text-gray-700" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent flex items-center gap-2">
                                <Package size={28} className="text-violet-600" /> Category Insights
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">View your spending by category</p>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-50 transition-all outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                {loading ? (
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="bg-white rounded-xl p-6 border-2 border-gray-100 animate-pulse">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                                    <div className="flex-1">
                                        <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredCategories.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-32 h-32 bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                            <Tag size={64} className="text-violet-600" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-3">No expense data yet</h3>
                        <p className="text-gray-600 text-lg mb-6">Start adding expenses to see category breakdown</p>
                        <button
                            onClick={() => navigate('/add-expense')}
                            className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-violet-500/50 transform hover:scale-105 transition-all"
                        >
                            Add First Expense
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredCategories.map(cat => renderCategory(cat, 0))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Categories;
