import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import ProviderSidebar from '../../components/layout/ProviderSidebar';
import ProviderMobileNavBar from '../../components/layout/ProviderMobileNavBar';

const Earnings = () => {
    const { jobs } = useData();
    const { currentUser } = useAuth();

    const { transactions, weeklyData, totalEarnings, totalCommission, maxVal } = useMemo(() => {
        if (!currentUser) return { transactions: [], weeklyData: Array(7).fill(0), totalEarnings: 0, totalCommission: 0, maxVal: 1000 };

        const completed = jobs.filter(job => 
            job.providerId === currentUser.uid && 
            (job.status === 'Completed' || job.status === 'Paid')
        );

        /* Calculate Totals */
        const earnings = completed.reduce((acc, job) => acc + (Number(job.finalAmount) || 0), 0);
        const commission = completed.reduce((acc, job) => acc + (Number(job.commission) || (Number(job.finalAmount) || 0) * 0.1), 0);

        /* Weekly Data (Sun-Sat) */
        const weekData = Array(7).fill(0);
        completed.forEach(job => {
            if (job.completedAt) {
                const date = job.completedAt.toDate ? job.completedAt.toDate() : new Date(job.completedAt);
                // Check if within last 7 days? Or just map to day of week?
                // Visual indicates S M T W T F S. Let's map strict day of week.
                const day = date.getDay();
                weekData[day] += (Number(job.finalAmount) || 0);
            }
        });

        const max = Math.max(...weekData, 1000);

        /* Transactions List */
        const txs = completed.map(job => ({
            id: job.id,
            type: 'credit', 
            description: `Job: ${job.serviceType || job.title}`,
            date: job.completedAt ? (job.completedAt.toDate ? job.completedAt.toDate().toLocaleDateString() : new Date(job.completedAt).toLocaleDateString()) : 'N/A',
            amount: `₦${(Number(job.finalAmount) || 0).toLocaleString()}`,
            status: 'Completed'
        })).sort((a,b) => new Date(b.date) - new Date(a.date));

        return { 
            transactions: txs, 
            weeklyData: weekData, 
            totalEarnings: earnings, 
            totalCommission: commission,
            maxVal: max
        };

    }, [jobs, currentUser]);

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-text-light">
            <ProviderSidebar />
            <ProviderMobileNavBar />

            <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-4 md:px-8 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-gray-800">Wallet & Commissions</h1>
                    <div className="flex gap-2">
                         <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium transition-colors">
                            <span className="material-symbols-outlined text-lg">history</span>
                            History
                         </button>
                    </div>
                </header>

                <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
                    
                    {/* Access Warning Banner - HIDDEN FOR EMPTY STATE */}
                    {/* <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start gap-3">
                        <span className="material-symbols-outlined text-orange-600">warning</span>
                        <div>
                            <h3 className="text-sm font-bold text-gray-900">Commission Payment Due</h3>
                            <p className="text-sm text-gray-600 mt-1">
                                Your outstanding commission balance is ₦6,300. Please clear your balance before it exceeds ₦10,000 to avoid temporary account suspension.
                            </p>
                        </div>
                    </div> */}

                    {/* Balance Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Outstanding Balance Card */}
                        <div className="bg-red-600 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <span className="material-symbols-outlined text-9xl">account_balance_wallet</span>
                            </div>
                            <div className="relative z-10">
                                <p className="text-sm font-bold opacity-80 mb-1">Outstanding Commission</p>
                                <h2 className="text-4xl font-black mb-6">
                                    {totalCommission.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                                </h2>
                                <button className="w-full py-3 bg-white text-red-600 font-bold rounded-xl shadow-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                    <span>Pay Commission</span>
                                    <span className="material-symbols-outlined text-lg">payments</span>
                                </button>
                            </div>
                        </div>

                        {/* Total Earnings Card */}
                        <div className="bg-green-600 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <span className="material-symbols-outlined text-9xl">attach_money</span>
                            </div>
                            <div className="relative z-10">
                                <p className="text-sm font-bold opacity-80 mb-1">Total Earnings</p>
                                <h2 className="text-4xl font-black mb-6">
                                    {totalEarnings.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                                </h2>
                                <p className="text-sm font-medium opacity-80">
                                    Total Commission Owed: {totalCommission.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })} (10%)
                                </p>
                            </div>
                        </div>

                        {/* Recent Commissions Summary (Weekly Chart) */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Weekly Trend</p>
                                <div className="flex items-end gap-2">
                                    <h2 className="text-3xl font-bold text-gray-900">
                                        {weeklyData.reduce((a, b) => a + b, 0).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                                    </h2>
                                </div>
                            </div>
                            {/* Chart */}
                            <div className="flex items-end justify-between h-24 gap-2 mt-4">
                                {weeklyData.map((val, i) => (
                                    <div key={i} className="flex flex-col items-center gap-1 flex-1">
                                        <div 
                                            className="w-full bg-red-100 hover:bg-red-200 rounded-t-md transition-all duration-300 relative group"
                                            style={{ height: `${(val / (maxVal || 1)) * 100}%` }}
                                        >
                                            <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                {val.toLocaleString()}
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-gray-400 font-medium">{'SMTWTFS'[i]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                         {/* Limit Card (Assuming 10k Limit) */}
                         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Commission Limit</p>
                                    <h2 className="text-3xl font-bold text-gray-900">₦10,000</h2>
                                </div>
                                <div className="p-2 bg-gray-50 text-gray-600 rounded-lg">
                                    <span className="material-symbols-outlined">verified_user</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Maximum debt allowed before <br/> account restrictions apply.
                            </p>
                             <div className="mt-4 pt-4 border-t border-gray-100">
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div 
                                        className={`h-2 rounded-full ${totalCommission > 8000 ? 'bg-red-500' : 'bg-green-500'}`} 
                                        style={{ width: `${Math.min((totalCommission / 10000) * 100, 100)}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-right mt-1 text-gray-500 font-medium">
                                    {Math.min((totalCommission / 10000) * 100, 100).toFixed(1)}% Used
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Transaction History */}
                    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900">Commission History</h3>
                            <button className="text-sm font-bold text-gray-500 hover:text-gray-900">View All</button>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {transactions.map((trx) => (
                                <div key={trx.id} className="p-4 md:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                            trx.type === 'credit' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                        }`}>
                                            <span className="material-symbols-outlined">
                                                {trx.type === 'credit' ? 'check_circle' : 'remove_circle_outline'}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{trx.description}</p>
                                            <p className="text-xs text-gray-500">{trx.date} • {trx.id}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-sm font-bold ${
                                            trx.type === 'd' ? 'text-green-600' : 'text-gray-900'
                                        }`}>
                                            {trx.amount}
                                        </p>
                                        <p className="text-xs text-gray-500 font-medium capitalize">{trx.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Method Info */}
                    <div className="bg-gray-100 rounded-2xl p-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Payment Method</h3>
                            <button className="text-sm font-bold text-primary hover:underline">Change</button>
                        </div>
                        <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-200">
                            <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                                <span className="material-symbols-outlined text-gray-400 text-2xl">credit_card</span>
                            </div>
                            <div>
                                <p className="text-gray-900 font-bold">Mastercard •••• 4291</p>
                                <p className="text-gray-500 text-sm">Expires 12/26</p>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Earnings;
