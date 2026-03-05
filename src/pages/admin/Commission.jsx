import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { db } from '../../lib/firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

const Commission = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        // Query completed requests to calculate commission
        // Note: In a real app, you'd have a separate 'transactions' or 'payments' collection
        const q = query(
            collection(db, 'requests'), 
            where('status', '==', 'Completed')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            let revenue = 0;
            const data = snapshot.docs.map(doc => {
                const req = doc.data();
                const commission = (req.budget || 0) * 0.10; // 10% Commission
                revenue += commission;
                return {
                    id: doc.id,
                    ...req,
                    commission,
                    rawDate: req.updatedAt || req.createdAt
                };
            }).sort((a, b) => (b.rawDate?.seconds || 0) - (a.rawDate?.seconds || 0));

            setTransactions(data);
            setTotalRevenue(revenue);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in relative z-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Commission & Revenue</h2>
                    <p className="text-gray-500">Track platform earnings from completed jobs.</p>
                </div>
                
                <div className="bg-green-50 px-6 py-3 rounded-2xl border border-green-100 flex flex-col items-end">
                    <span className="text-xs text-green-600 font-bold uppercase tracking-wider">Total Revenue</span>
                    <span className="text-2xl font-extrabold text-green-700">{formatCurrency(totalRevenue)}</span>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">Recent Transactions</h3>
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{transactions.length} Completed Jobs</span>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-400 font-bold">
                            <tr>
                                <th className="px-6 py-4">Job ID</th>
                                <th className="px-6 py-4">Service</th>
                                <th className="px-6 py-4">Provider</th>
                                <th className="px-6 py-4 text-right">Job Amount</th>
                                <th className="px-6 py-4 text-right">Commission (10%)</th>
                                <th className="px-6 py-4 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {transactions.length > 0 ? (
                                transactions.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs">{tx.id.slice(0, 8)}...</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{tx.category || tx.title}</td>
                                        <td className="px-6 py-4">
                                            {tx.providerName || tx.serviceProvider || 'Unknown Provider'}
                                        </td>
                                        <td className="px-6 py-4 text-right font-medium">
                                            {formatCurrency(tx.budget || 0)}
                                        </td>
                                        <td className="px-6 py-4 text-right font-bold text-green-600">
                                            + {formatCurrency(tx.commission)}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Paid
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-400">
                                        No completed jobs found yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Commission;
