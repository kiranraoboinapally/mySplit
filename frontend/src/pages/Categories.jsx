import React, { useState, useEffect } from 'react';
import ExpenseService from '../services/expenses';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Tag, ArrowLeft, Coffee, ShoppingCart, Home, Car, Heart, Briefcase, TrendingUp, Edit2, Sparkles } from 'lucide-react';

const ICON_MAP = {
    coffee: { icon: Coffee, label: 'Food & Drink', color: 'bg-amber-100 text-amber-600' },
    shopping: { icon: ShoppingCart, label: 'Shopping', color: 'bg-blue-100 text-blue-600' },
    home: { icon: Home, label: 'Home', color: 'bg-green-100 text-green-600' },
    car: { icon: Car, label: 'Transport', color: 'bg-red-100 text-red-600' },
    heart: { icon: Heart, label: 'Health', color: 'bg-pink-100 text-pink-600' },
    briefcase: { icon: Briefcase, label: 'Work', color: 'bg-purple-100 text-purple-600' },
    tag: { icon: Tag, label: 'Other', color: 'bg-gray-100 text-gray-600' }
};

const Categories = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [newCategory, setNewCategory] = useState({ name: '', type: 'EXPENSE', icon: 'tag' });

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        setLoading(true);
        try {
            const res = await ExpenseService.getCategories();
            setCategories(res.data);
        } catch (error) {
            console.error("Error loading categories", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await ExpenseService.createCategory(newCategory);
            setShowModal(false);
            setNewCategory({ name: '', type: 'EXPENSE', icon: 'tag' });
            loadCategories();
        } catch (error) {
            console.error("Error creating category", error);
            alert("Failed to create category");
        }
    };

    // Calculate total spending per category (mock - you'd get this from backend)
    const getCategoryStats = (cat) => {
        return {
            count: Math.floor(Math.random() * 50) + 1,
            total: (Math.random() * 10000).toFixed(0)
        };
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-white border-b-2 border-gray-100 sticky top-0 z-30 backdrop-blur-sm bg-white/90">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="p-3 hover:bg-gray-100 rounded-xl transition-all hover:scale-110 active:scale-95"
                        >
                            <ArrowLeft size={22} className="text-gray-700" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent flex items-center gap-2">
                                <Sparkles size={28} className="text-violet-600" /> Categories
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">Organize your financial life</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-violet-500/50 transform hover:-translate-y-0.5 hover:scale-105 transition-all font-bold text-lg"
                    >
                        <Plus size={20} /> New Category
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border-2 border-gray-100 animate-pulse">
                                <div className="w-16 h-16 bg-gray-200 rounded-2xl mb-4"></div>
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map(cat => {
                            const iconData = ICON_MAP[cat.icon] || ICON_MAP['tag'];
                            const IconComponent = iconData.icon;
                            const stats = getCategoryStats(cat);

                            return (
                                <div
                                    key={cat.id}
                                    className="bg-white rounded-3xl p-7 shadow-md border-2 border-gray-100 hover:shadow-2xl hover:border-violet-200 transition-all group cursor-pointer hover:-translate-y-1 relative overflow-hidden"
                                >
                                    {/* Background gradient effect */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-100/50 to-fuchsia-100/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                    <div className="relative z-10">
                                        <div className="flex items-start justify-between mb-5">
                                            <div className={`w-16 h-16 ${iconData.color} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg`}>
                                                <IconComponent size={28} />
                                            </div>
                                            <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${cat.type === 'EXPENSE'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-emerald-100 text-emerald-700'
                                                } shadow-sm`}>
                                                {cat.type}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-violet-600 transition-colors">
                                            {cat.name}
                                        </h3>

                                        <div className="flex items-center justify-between pt-4 mt-4 border-t-2 border-gray-100">
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Transactions</p>
                                                <p className="text-lg font-bold text-gray-900">{stats.count}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Total Spent</p>
                                                <p className="text-lg font-bold text-violet-600">₹{stats.total}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {categories.length === 0 && !loading && (
                            <div className="col-span-full text-center py-32">
                                <div className="w-32 h-32 bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                                    <Tag size={64} className="text-violet-600" />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-3">No categories yet</h3>
                                <p className="text-gray-600 text-lg mb-6">Start organizing your expenses by creating your first category</p>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-violet-500/50 transform hover:scale-105 transition-all"
                                >
                                    Create First Category
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden transform animate-slideUp">
                        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 p-8 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
                                    <Plus size={28} />
                                </div>
                                <h3 className="text-3xl font-extrabold">New Category</h3>
                                <p className="opacity-90 mt-1">Organize your expenses better</p>
                            </div>
                        </div>

                        <form onSubmit={handleCreate} className="p-8 space-y-6">
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Category Name</label>
                                <input
                                    type="text"
                                    required
                                    value={newCategory.name}
                                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                    className="w-full px-5 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-50 transition-all outline-none"
                                    placeholder="e.g. Groceries, Entertainment"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Icon</label>
                                <div className="grid grid-cols-4 gap-3">
                                    {Object.keys(ICON_MAP).map(iconKey => {
                                        const iconData = ICON_MAP[iconKey];
                                        const IconComp = iconData.icon;
                                        const isSelected = newCategory.icon === iconKey;

                                        return (
                                            <button
                                                key={iconKey}
                                                type="button"
                                                onClick={() => setNewCategory({ ...newCategory, icon: iconKey })}
                                                className={`p-5 rounded-2xl border-2 transition-all group relative ${isSelected
                                                        ? 'border-violet-600 bg-violet-50 scale-105 shadow-lg'
                                                        : 'border-gray-200 hover:border-gray-300 hover:scale-105'
                                                    }`}
                                            >
                                                <IconComp
                                                    size={28}
                                                    className={isSelected ? 'text-violet-600' : 'text-gray-400 group-hover:text-gray-600'}
                                                />
                                                {isSelected && (
                                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center">
                                                        <span className="text-white text-xs">✓</span>
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-5 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-5 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-violet-500/50 transition-all hover:scale-105"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
                .animate-slideUp {
                    animation: slideUp 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default Categories;
