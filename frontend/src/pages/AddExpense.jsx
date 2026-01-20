import React, { useState, useEffect } from 'react';
import ExpenseService from '../services/expenses';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, PlusCircle, PenTool } from 'lucide-react';

const AddExpense = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        categoryId: '',
        itemName: '',
        quantity: '',
        unit: 'psc',
        pricePerUnit: '',
        totalAmount: '',
        date: new Date().toISOString().split('T')[0],
        notes: ''
    });

    useEffect(() => {
        ExpenseService.getCategories().then(res => setCategories(res.data));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedFormData = { ...formData, [name]: value };

        // Auto-calculate total if price and quantity are present
        if (name === 'quantity' || name === 'pricePerUnit') {
            const qty = parseFloat(name === 'quantity' ? value : formData.quantity);
            const price = parseFloat(name === 'pricePerUnit' ? value : formData.pricePerUnit);
            if (!isNaN(qty) && !isNaN(price)) {
                updatedFormData.totalAmount = (qty * price).toFixed(2);
            }
        }

        setFormData(updatedFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            itemName: formData.itemName,
            quantity: formData.quantity ? parseFloat(formData.quantity) : null,
            unit: formData.unit,
            pricePerUnit: formData.pricePerUnit ? parseFloat(formData.pricePerUnit) : null,
            totalAmount: parseFloat(formData.totalAmount),
            date: formData.date
                ? new Date(formData.date).toISOString()
                : null,
            notes: formData.notes,
            category: { id: parseInt(formData.categoryId) }
        };

        if (isNaN(payload.totalAmount)) {
            alert("Total Amount is required");
            return;
        }

        try {
            await ExpenseService.createExpense(payload);
            navigate('/');
        } catch (err) {
            console.error(err);
            alert("Failed to add expense");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden relative">
                {/* Decorative Header */}
                <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 p-8 text-white relative">
                    <button
                        onClick={() => navigate('/')}
                        className="absolute top-8 left-8 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div className="text-center mt-4">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto flex items-center justify-center backdrop-blur-sm mb-4">
                            <PlusCircle size={32} />
                        </div>
                        <h2 className="text-3xl font-bold">Add New Expense</h2>
                        <p className="opacity-80">Track every penny, keep growing.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Item Name</label>
                            <input
                                type="text"
                                name="itemName"
                                required
                                value={formData.itemName}
                                onChange={handleChange}
                                placeholder="e.g. Weekly Groceries"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-50 transition-all outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Category</label>
                            <select
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-50 transition-all outline-none bg-white"
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-50 transition-all outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Unit</label>
                            <select
                                name="unit"
                                value={formData.unit}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-50 transition-all outline-none bg-white"
                            >
                                <option value="kg">kg</option>
                                <option value="litre">litre</option>
                                <option value="psc">psc</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Price / Unit</label>
                            <input
                                type="number"
                                name="pricePerUnit"
                                value={formData.pricePerUnit}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-50 transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <PenTool size={16} className="text-violet-600" /> Total Amount (Computed)
                            </label>
                            <span className="text-xs text-violet-600 bg-violet-100 px-2 py-1 rounded-md font-medium">Auto-filled</span>
                        </div>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                            <input
                                type="number"
                                name="totalAmount"
                                required
                                value={formData.totalAmount}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 text-lg font-bold text-gray-900 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all outline-none"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Date</label>
                        <input
                            type="date"
                            name="date"
                            required
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-50 transition-all outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Notes (Optional)</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            rows="2"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-50 transition-all outline-none resize-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transform transition-all flex items-center justify-center gap-2"
                    >
                        <Save size={20} /> Save Expense
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddExpense;
