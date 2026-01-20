import React, { useState, useEffect } from 'react';
import ExpenseService from '../services/expenses';
import { ChevronDown, AlertCircle } from 'lucide-react';

/**
 * Cascading Category Selector Component
 * Allows selection of hierarchical categories (Level 0 -> Level 1 -> Level 2)
 * Used in expense creation forms
 */
const CategorySelector = ({ onCategorySelect, value, required = false }) => {
    const [level0Categories, setLevel0Categories] = useState([]);
    const [level1Categories, setLevel1Categories] = useState([]);
    const [level2Categories, setLevel2Categories] = useState([]);

    const [selectedLevel0, setSelectedLevel0] = useState('');
    const [selectedLevel1, setSelectedLevel1] = useState('');
    const [selectedLevel2, setSelectedLevel2] = useState('');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Load top-level categories on mount
    useEffect(() => {
        loadLevel0Categories();
    }, []);

    const loadLevel0Categories = async () => {
        try {
            setLoading(true);
            const res = await ExpenseService.getCategoriesByLevel(0);
            setLevel0Categories(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error loading categories:', err);
            setError('Failed to load categories');
            setLoading(false);
        }
    };

    const handleLevel0Change = async (e) => {
        const value = e.target.value;
        setSelectedLevel0(value);
        setSelectedLevel1('');
        setSelectedLevel2('');
        setLevel1Categories([]);
        setLevel2Categories([]);

        if (value) {
            // Load child categories
            try {
                const res = await ExpenseService.getCategoryChildren(value);
                setLevel1Categories(res.data);
            } catch (err) {
                console.error('Error loading subcategories:', err);
            }
        }

        onCategorySelect(null); // Clear selection
    };

    const handleLevel1Change = async (e) => {
        const value = e.target.value;
        setSelectedLevel1(value);
        setSelectedLevel2('');
        setLevel2Categories([]);

        if (value) {
            // Load level 2 categories
            try {
                const res = await ExpenseService.getCategoryChildren(value);
                if (res.data.length > 0) {
                    setLevel2Categories(res.data);
                } else {
                    // If no children, this is the final selection
                    onCategorySelect(parseInt(value));
                }
            } catch (err) {
                console.error('Error loading items:', err);
            }
        } else {
            onCategorySelect(null);
        }
    };

    const handleLevel2Change = (e) => {
        const value = e.target.value;
        setSelectedLevel2(value);

        if (value) {
            onCategorySelect(parseInt(value));
        } else {
            onCategorySelect(null);
        }
    };

    if (loading) {
        return (
            <div className="space-y-4">
                <div className="animate-pulse">
                    <div className="h-12 bg-gray-200 rounded-xl"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
                <AlertCircle size={20} />
                <span>{error}</span>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Level 0: Main Category */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Main Category {required && <span className="text-red-500">*</span>}
                </label>
                <div className="relative">
                    <select
                        value={selectedLevel0}
                        onChange={handleLevel0Change}
                        required={required}
                        className="w-full px-4 py-3 pr-10 text-lg rounded-xl border-2 border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-50 transition-all outline-none appearance-none bg-white cursor-pointer"
                    >
                        <option value="">-- Select Main Category --</option>
                        {level0Categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
            </div>

            {/* Level 1: Subcategory */}
            {level1Categories.length > 0 && (
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                        Subcategory {required && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative">
                        <select
                            value={selectedLevel1}
                            onChange={handleLevel1Change}
                            required={required && selectedLevel0 !== ''}
                            className="w-full px-4 py-3 pr-10 text-lg rounded-xl border-2 border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-50 transition-all outline-none appearance-none bg-white cursor-pointer"
                        >
                            <option value="">-- Select Subcategory --</option>
                            {level1Categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                </div>
            )}

            {/* Level 2: Item Category */}
            {level2Categories.length > 0 && (
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                        Item {required && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative">
                        <select
                            value={selectedLevel2}
                            onChange={handleLevel2Change}
                            required={required && selectedLevel1 !== ''}
                            className="w-full px-4 py-3 pr-10 text-lg rounded-xl border-2 border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-50 transition-all outline-none appearance-none bg-white cursor-pointer"
                        >
                            <option value="">-- Select Item --</option>
                            {level2Categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategorySelector;
