import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseService from '../services/expense.service';

const AddExpense = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        itemName: '',
        quantity: 1,
        unit: 'piece',
        pricePerUnit: '',
        totalAmount: 0,
        categoryId: '',
        date: '',
        notes: ''
    });

    useEffect(() => {
        ExpenseService.getCategories().then(data => {
            setCategories(data);
            if (data.length > 0) setFormData(prev => ({ ...prev, categoryId: data[0].id }));
        });
    }, []);

    useEffect(() => {
        // Auto calculate total
        if (formData.quantity && formData.pricePerUnit) {
            setFormData(prev => ({
                ...prev,
                totalAmount: (parseFloat(prev.quantity) * parseFloat(prev.pricePerUnit)).toFixed(2)
            }));
        }
    }, [formData.quantity, formData.pricePerUnit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            category: { id: formData.categoryId }
        };
        await ExpenseService.createExpense(payload);
        navigate('/');
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Add New Expense</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                {/* Item Name */}
                <div>
                    <label className="block text-gray-700">Item Name</label>
                    <input type="text" className="w-full border p-2 rounded"
                        value={formData.itemName}
                        onChange={e => setFormData({ ...formData, itemName: e.target.value })}
                        required placeholder="e.g., Milk, Rent, Movie"
                    />
                </div>

                {/* Quantity & Unit Row */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">Quantity</label>
                        <input type="number" step="0.01" className="w-full border p-2 rounded"
                            value={formData.quantity}
                            onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Unit</label>
                        <select className="w-full border p-2 rounded"
                            value={formData.unit}
                            onChange={e => setFormData({ ...formData, unit: e.target.value })}
                        >
                            <option value="piece">Piece(s)</option>
                            <option value="kg">Kilogram (kg)</option>
                            <option value="g">Gram (g)</option>
                            <option value="litre">Litre (L)</option>
                            <option value="pack">Pack</option>
                            <option value="dozen">Dozen</option>
                            <option value="bottle">Bottle</option>
                            <option value="carton">Carton</option>
                            <option value="month">Month (Rent/Sub)</option>
                        </select>
                    </div>
                </div>

                {/* Price Calculation Row */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">Price per Unit</label>
                        <input type="number" step="0.01" className="w-full border p-2 rounded"
                            value={formData.pricePerUnit}
                            onChange={e => setFormData({ ...formData, pricePerUnit: e.target.value })}
                            required placeholder="0.00"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold">Total Amount</label>
                        <input type="number" className="w-full border p-2 rounded bg-gray-100"
                            value={formData.totalAmount}
                            readOnly
                        />
                    </div>
                </div>

                {/* Category & Date Row */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">Category</label>
                        <select className="w-full border p-2 rounded"
                            value={formData.categoryId}
                            onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
                        >
                            {categories.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Date</label>
                        <input type="date" className="w-full border p-2 rounded"
                            value={formData.date}
                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                        />
                    </div>
                </div>

                {/* Notes */}
                <div>
                    <label className="block text-gray-700">Notes (Optional)</label>
                    <textarea className="w-full border p-2 rounded"
                        value={formData.notes}
                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    />
                </div>

                <button type="submit" className="bg-primary text-white py-2 rounded hover:bg-indigo-600">
                    Add Expense
                </button>
            </form>
        </div>
    );
};

export default AddExpense;
