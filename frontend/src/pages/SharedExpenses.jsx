import React, { useEffect, useState } from 'react';
import SharedService from '../services/shared.service';

const SharedExpenses = () => {
    const [owed, setOwed] = useState([]);
    const [lended, setLended] = useState([]);

    useEffect(() => {
        SharedService.getOwedByMe().then(setOwed);
        SharedService.getLendedByMe().then(setLended);
    }, []);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Shared Expenses</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Money I Owe */}
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-500">
                    <h3 className="text-xl font-semibold mb-4 text-red-600">You Owe</h3>
                    {owed.length === 0 ? <p className="text-gray-500">You are debt free!</p> : (
                        <ul className="space-y-3">
                            {owed.map(item => (
                                <li key={item.id} className="flex justify-between border-b pb-2">
                                    <div>
                                        <div className="font-bold">{item.expense.itemName}</div>
                                        <div className="text-xs text-gray-500">To: {item.payer.name}</div>
                                    </div>
                                    <div className="text-red-600 font-bold">${item.amountOwed.toFixed(2)}</div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Money Owed to Me */}
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
                    <h3 className="text-xl font-semibold mb-4 text-green-600">Owed to You</h3>
                    {lended.length === 0 ? <p className="text-gray-500">No one owes you money.</p> : (
                        <ul className="space-y-3">
                            {lended.map(item => (
                                <li key={item.id} className="flex justify-between border-b pb-2">
                                    <div>
                                        <div className="font-bold">{item.expense.itemName}</div>
                                        <div className="text-xs text-gray-500">From: {item.debtor.name}</div>
                                    </div>
                                    <div className="text-green-600 font-bold">${item.amountOwed.toFixed(2)}</div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SharedExpenses;
