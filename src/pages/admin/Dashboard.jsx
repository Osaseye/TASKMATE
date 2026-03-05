import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../lib/firebase';
import { collection, query, where, getCountFromServer, getDocs, limit } from 'firebase/firestore';

const AdminDashboard = () => {
    const [stats, setStats] = useState([
        { title: "Total Commission", value: "₦0.00", change: "0%", icon: "monetization_on", color: "bg-green-500", trend: "neutral" },
        { title: "Pending Commission", value: "₦0.00", change: "0%", icon: "pending", color: "bg-orange-500", trend: "neutral" },
        { title: "Total Tasks", value: "0", change: "0%", icon: "assignment", color: "bg-blue-500", trend: "neutral" },
        { title: "Active Providers", value: "0", change: "0%", icon: "engineering", color: "bg-purple-500", trend: "neutral" },
    ]);
    const [commissionStats, setCommissionStats] = useState({ 
        current: 0, 
        goal: 100000, // Static goal for demo
        progress: 0 
    });
    const [systemHealth, setSystemHealth] = useState({
        server: 'Operational',
        db: 'Connected',
        backup: 'Daily (Automated)',
        users: 0
    });
    const [pendingVerifications, setPendingVerifications] = useState([]);
    const [recentCommissions, setRecentCommissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Get Total Tasks
                const tasksSnapshot = await getCountFromServer(collection(db, "requests"));
                const totalTasks = tasksSnapshot.data().count;

                // Get Active Providers
                const providersQuery = query(collection(db, "users"), where("role", "==", "provider"));
                const providersSnapshot = await getCountFromServer(providersQuery);
                const activeProviders = providersSnapshot.data().count;

                // Get Total Users (for System Health)
                const usersSnapshot = await getCountFromServer(collection(db, "users"));
                const totalUsers = usersSnapshot.data().count;

                // Get Pending Verifications (from verifications collection)
                const unverifiedQuery = query(
                    collection(db, "verifications"), 
                    where("status", "==", "pending"),
                    limit(5)
                );
                
                const unverifiedSnapshot = await getDocs(unverifiedQuery);
                const unverifiedData = unverifiedSnapshot.docs.map(doc => {
                    const data = doc.data();
                    let submittedDate = "Recently";
                    if (data.submittedAt) {
                         // Check if it's a Firestore timestamp
                         if (data.submittedAt.toDate) {
                             submittedDate = data.submittedAt.toDate().toLocaleDateString();
                         } else {
                             submittedDate = new Date(data.submittedAt).toLocaleDateString();
                         }
                    }

                    return {
                        id: doc.id,
                        provider: data.providerName || data.displayName || 'Unknown Provider',
                        submitted: submittedDate,
                        status: "Pending"
                    };
                });

                // Get Recent Commissions & Calculate Weekly Revenue
                // Note: For 'orderBy' to work with 'where', an index is required. 
                // We'll fetch 'Completed' requests and sort client-side to avoid index errors for now.
                const completedQuery = query(
                    collection(db, "requests"), 
                    where("status", "==", "Completed"),
                    limit(20) // Limit scan for performance
                );
                const completedSnapshot = await getDocs(completedQuery);
                
                const completedRequests = completedSnapshot.docs.map(doc => {
                    const data = doc.data();
                    return { ...data, id: doc.id };
                });

                // Sort by date desc
                completedRequests.sort((a, b) => {
                    const dateA = a.updatedAt?.seconds || 0;
                    const dateB = b.updatedAt?.seconds || 0;
                    return dateB - dateA;
                });

                // 1. Recent Commissions List
                const recent = completedRequests.slice(0, 5).map(req => ({
                    id: req.id.slice(0, 8),
                    provider: req.providerName || 'Unknown',
                    job: req.category || 'Service',
                    amount: `₦${((req.budget || 0) * 0.1).toLocaleString()}`,
                    status: 'Paid'
                }));
                setRecentCommissions(recent);

                // 2. Weekly Revenue Calculation
                const now = new Date();
                const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
                startOfWeek.setHours(0, 0, 0, 0);

                let weeklyRev = 0;
                let totalRev = 0;

                completedRequests.forEach(req => {
                    const comm = (req.budget || 0) * 0.1;
                    totalRev += comm;
                    
                    // Check if transaction is this week
                    let reqDate = new Date();
                    if(req.updatedAt?.toDate) reqDate = req.updatedAt.toDate();
                    
                    if (reqDate >= startOfWeek) {
                        weeklyRev += comm;
                    }
                });

                const goal = 100000;
                const progress = Math.min((weeklyRev / goal) * 100, 100);

                setCommissionStats({
                    current: weeklyRev,
                    goal: goal,
                    progress: progress
                });

                setSystemHealth({
                    server: 'Operational',
                    db: 'Connected',
                    backup: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    users: totalUsers
                });

                // Update Stats
                setStats([
                    { title: "Total Commission", value: `₦${totalRev.toLocaleString()}`, change: "+12%", icon: "monetization_on", color: "bg-green-500", trend: "up" },
                    { title: "Pending Commission", value: "₦0.00", change: "0%", icon: "pending", color: "bg-orange-500", trend: "neutral" }, // Pending not implemented yet
                    { title: "Total Tasks", value: totalTasks.toString(), change: "+5%", icon: "assignment", color: "bg-blue-500", trend: "up" },
                    { title: "Active Providers", value: activeProviders.toString(), change: "+2%", icon: "engineering", color: "bg-purple-500", trend: "up" },
                ]);

                setPendingVerifications(unverifiedData);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching admin stats:", err);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

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
                            {pendingVerifications.length === 0 ? (
                                <p className="p-4 text-sm text-gray-500 text-center">No pending verifications</p>
                            ) : (
                                pendingVerifications.map((user) => (
                                    <div key={user.id} className="p-4 sm:px-6 hover:bg-gray-50 transition-colors flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                                                {(user.provider || '?').charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 text-sm">{user.provider}</p>
                                                <p className="text-xs text-gray-400">Applied {user.submitted}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Link to={`/admin/verifications/${user.id}`} className="text-xs font-bold bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                                                Review
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-center">
                        </div>
                    </div>

                    {/* Commission Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                         <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <h3 className="font-bold text-gray-900">Recent Commissions</h3>
                            <Link to="/admin/commission" className="text-sm font-bold text-green-600 hover:text-green-700">View Report</Link>
                        </div>
                        <div className="overflow-x-auto">
                            {recentCommissions.length === 0 ? (
                                <p className="p-8 text-center text-sm text-gray-500">No recent commissions</p>
                            ) : (
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
                            )}
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
                                <span className="text-4xl font-black">₦{commissionStats.current.toLocaleString()}</span>
                                <span className="text-sm text-gray-400 mb-1">/ ₦{commissionStats.goal.toLocaleString()} Goal</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${commissionStats.progress}%` }}></div>
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
                                    {systemHealth.server}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Database</span>
                                <span className="text-green-600 font-bold">{systemHealth.db}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Last Backup</span>
                                <span className="text-gray-700">{systemHealth.backup}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Active Users</span>
                                <span className="text-gray-700 font-bold">{systemHealth.users}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;