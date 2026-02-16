import React, { useState } from 'react';
import { toast } from 'sonner';

const Commission = () => {
    // MOCK DATA: Providers who owe commission
    const [outstandingCommissions, setOutstandingCommissions] = useState([
        { id: 1, provider: "Tunde Fixes", owe: "₦5,000", jobs: 12, week: "Oct 16 - Oct 22", status: "Due" },
        { id: 2, provider: "Clean & Shine", owe: "₦2,500", jobs: 5, week: "Oct 16 - Oct 22", status: "Due" },
        { id: 3, provider: "Sarah's Kitchen", owe: "₦15,000", jobs: 25, week: "Oct 16 - Oct 22", status: "Overdue" },
    ]);

    // MOCK DATA: Confirmed payments
    const history = [
         { id: 'TXN-001', provider: "Ibrahim Electric", amount: "₦3,200", date: "Oct 23, 2023", method: "Bank Transfer" },
         { id: 'TXN-002', provider: "Mary Cleaners", amount: "₦1,500", date: "Oct 22, 2023", method: "Bank Transfer" },
    ];

    const markAsPaid = (id) => {
        // API call to update status
        setOutstandingCommissions(outstandingCommissions.filter(c => c.id !== id));
        toast.success('Payment confirmed successfully');
    };

    return (
        <div className="space-y-8 animate-fade-in relative z-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Commission Management</h2>
                    <p className="text-gray-500">Track and collect weekly platform fees.</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-green-50 text-green-700 px-4 py-2 rounded-xl border border-green-100 shadow-sm">
                        <p className="text-xs uppercase font-bold tracking-wider">Collected (Oct)</p>
                        <p className="text-xl font-black">₦245,000</p>
                    </div>
                    <div className="bg-orange-50 text-orange-700 px-4 py-2 rounded-xl border border-orange-100 shadow-sm">
                        <p className="text-xs uppercase font-bold tracking-wider">Pending</p>
                        <p className="text-xl font-black">₦22,500</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Outstanding Payments */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                            <h3 className="font-bold text-gray-900">Outstanding Balances</h3>
                            <button className="text-xs font-bold bg-white border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50">Download Report</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="text-xs text-gray-400 uppercase bg-gray-50 border-b border-gray-100 font-semibold">
                                    <tr>
                                        <th className="px-6 py-3">Provider</th>
                                        <th className="px-6 py-3">Week</th>
                                        <th className="px-6 py-3 text-center">Jobs</th>
                                        <th className="px-6 py-3 text-right">Amount Due</th>
                                        <th className="px-6 py-3 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-gray-600">
                                    {outstandingCommissions.length > 0 ? (
                                        outstandingCommissions.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 font-bold text-gray-900">{item.provider}</td>
                                                <td className="px-6 py-4 text-xs">{item.week}</td>
                                                <td className="px-6 py-4 text-center">{item.jobs}</td>
                                                <td className="px-6 py-4 text-right font-black text-gray-900">
                                                    {item.owe}
                                                    {item.status === 'Overdue' && (
                                                        <span className="block text-[10px] text-red-500 font-bold uppercase mt-0.5">Overdue</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button 
                                                        onClick={() => markAsPaid(item.id)}
                                                        className="text-xs font-bold bg-green-600 text-white px-3 py-1.5 rounded-lg shadow-sm hover:bg-green-700 transition-colors"
                                                    >
                                                        Confirm Payment
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                                                <span className="material-icons-outlined text-2xl mb-1">check_circle</span>
                                                <p>No outstanding commissions.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column: Recent History */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <h3 className="font-bold text-gray-900 mb-4">Payment History</h3>
                        <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-2 before:w-0.5 before:bg-gray-100 before:ml-1.5">
                            {history.map((txn) => (
                                <div key={txn.id} className="relative pl-8">
                                    <div className="absolute left-0 top-1 h-5 w-5 rounded-full bg-green-100 border-2 border-white flex items-center justify-center z-10">
                                        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{txn.provider}</p>
                                        <p className="text-xs text-gray-400">Paid {txn.amount} via {txn.method}</p>
                                        <p className="text-[10px] text-gray-300 mt-1">{txn.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 text-xs font-bold text-gray-500 hover:text-gray-900 border border-gray-200 rounded-xl py-3 hover:bg-gray-50 transition-colors">
                            View Full History
                        </button>
                    </div>

                    <div className="bg-gray-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="font-bold text-lg mb-2">Commission Settings</h3>
                            <p className="text-gray-400 text-xs mb-4">Current platform fee applied to all completed jobs.</p>
                            <div className="flex items-center justify-between mb-4 bg-gray-800 p-3 rounded-xl border border-gray-700">
                                <span className="text-sm font-medium">Platform Fee</span>
                                <span className="font-bold text-xl text-green-400">10%</span>
                            </div>
                            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold py-3 rounded-xl transition-colors">
                                Update Percentage
                            </button>
                        </div>
                        {/* Decorative background blur */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-600 rounded-full blur-3xl opacity-10 transform translate-x-10 -translate-y-10"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Commission;