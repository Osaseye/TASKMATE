import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    // MOCK DATA for Admin Dashboard
    const stats = [
        { title: "Total Commission", value: "₦1,250,500", change: "+12.5%", icon: "monetization_on", color: "bg-green-500", trend: "up" },
        { title: "Pending Commission", value: "₦45,200", change: "-2.4%", icon: "pending", color: "bg-orange-500", trend: "down" },
        { title: "Total Tasks", value: "1,452", change: "+8.2%", icon: "assignment", color: "bg-blue-500", trend: "up" },
        { title: "Active Providers", value: "348", change: "+5.1%", icon: "engineering", color: "bg-purple-500", trend: "up" },
    ];

    const pendingVerifications = [
        { id: 1, name: "Chinedu Okeke", service: "Plumbing", date: "2 mins ago", status: "Pending" },
        { id: 2, name: "Grace Adebayo", service: "Catering", date: "1 hour ago", status: "Pending" },
        { id: 3, name: "Emmanuel John", service: "Electrical", date: "3 hours ago", status: "Pending" },
        { id: 4, name: "Fatima Yusuf", service: "Cleaning", date: "5 hours ago", status: "Pending" },
    ];

    const recentCommissions = [
        { id: 'TXN-9921', provider: 'Tunde Fixes', amount: '₦500', job: 'Plumbing Repair', date: 'Oct 24, 2023', status: 'Paid' },
        { id: 'TXN-9920', provider: 'Clean & Shine', amount: '₦1,500', job: 'House Cleaning', date: 'Oct 24, 2023', status: 'Pending' },
        { id: 'TXN-9919', provider: 'Ibrahim Electric', amount: '₦800', job: 'Wiring Fix', date: 'Oct 23, 2023', status: 'Paid' },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Page Header */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Dashboard Overview</h2>
                <p className="text-gray-500">Welcome to the TaskMate Admin Control Panel.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.title}</p>
                                <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                            </div>
                            <div className={`h-12 w-12 rounded-xl ${stat.color} flex items-center justify-center text-white shadow-sm`}>
                                <span className="material-icons text-white text-xl">{stat.icon}</span>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <span className={`flex items-center font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                <span className="material-icons text-base mr-1">{stat.trend === 'up' ? 'trending_up' : 'trending_down'}</span>
                                {stat.change}
                            </span>
                            <span className="text-gray-400 ml-2">vs last week</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Recent Verifications */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <h3 className="font-bold text-gray-900">Pending Verifications</h3>
                            <Link to="/admin/verifications" className="text-sm font-bold text-green-600 hover:text-green-700">View All</Link>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {pendingVerifications.map((user) => (
                                <div key={user.id} className="p-4 sm:px-6 hover:bg-gray-50 transition-colors flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm">{user.name}</p>
                                            <p className="text-xs text-gray-400">Applied for {user.service} • {user.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="text-xs font-bold bg-green-50 text-green-600 px-3 py-1.5 rounded-lg border border-green-100 hover:bg-green-100 transition-colors">Approve</button>
                                        <button className="text-xs font-bold bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">Review</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-center">
                            <p className="text-xs text-gray-400">12 more providers waiting for review</p>
                        </div>
                    </div>

                    {/* Commission Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                         <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <h3 className="font-bold text-gray-900">Recent Commissions</h3>
                            <Link to="/admin/commission" className="text-sm font-bold text-green-600 hover:text-green-700">View Report</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-400 uppercase bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 font-semibold">Transaction ID</th>
                                        <th className="px-6 py-3 font-semibold">Provider</th>
                                        <th className="px-6 py-3 font-semibold">Job</th>
                                        <th className="px-6 py-3 font-semibold">Commission</th>
                                        <th className="px-6 py-3 font-semibold">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-gray-600">
                                    {recentCommissions.map((txn, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50/50">
                                            <td className="px-6 py-3 font-mono text-xs">{txn.id}</td>
                                            <td className="px-6 py-3 font-medium text-gray-900">{txn.provider}</td>
                                            <td className="px-6 py-3">{txn.job}</td>
                                            <td className="px-6 py-3 font-bold text-gray-900">{txn.amount}</td>
                                            <td className="px-6 py-3">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                                                    txn.status === 'Paid' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                                                }`}>
                                                    {txn.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column - Status/Updates */}
                <div className="space-y-8">
                    <div className="bg-gray-900 rounded-2xl p-6 text-white shadow-xl shadow-gray-900/20 relative overflow-hidden">
                         <div className="relative z-10">
                            <h3 className="text-lg font-bold mb-1">Commission Due</h3>
                            <p className="text-gray-400 text-sm mb-6">Commission collected this week vs target.</p>
                            
                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-4xl font-black">₦85k</span>
                                <span className="text-sm text-gray-400 mb-1">/ ₦100k Goal</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                            <button className="w-full bg-white text-gray-900 font-bold py-3 rounded-xl hover:bg-green-50 transition-colors text-xs uppercase tracking-wider">
                                View Details
                            </button>
                         </div>
                         <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-green-500 rounded-full blur-3xl opacity-20"></div>
                         <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-900 mb-4">System Health</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Server Status</span>
                                <span className="flex items-center gap-1.5 text-green-600 font-bold">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    Operational
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Database</span>
                                <span className="text-green-600 font-bold">Connected</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Last Backup</span>
                                <span className="text-gray-700">2 hours ago</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Active Users</span>
                                <span className="text-gray-700 font-bold">1,204</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;