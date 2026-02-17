import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import MobileNavBar from '../../components/layout/MobileNavBar';

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('All');
    const [openDropdown, setOpenDropdown] = useState(null);

    // Sample data for the table
    const requests = [];

    const recentActivity = [];

    const toggleDropdown = (e, id) => {
        e.stopPropagation();
        setOpenDropdown(openDropdown === id ? null : id);
    };

    const handleRowClick = (id) => {
        navigate(`/customer/request-status`);
    };

    const filteredRequests = activeTab === 'All' 
        ? requests 
        : requests.filter(req => req.status === activeTab);

    return (
        <div className="flex min-h-screen bg-[#F8F9FA] font-sans text-gray-900" onClick={() => setOpenDropdown(null)}>
            {/* Sidebar Component */}
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 md:hidden">
                    <div className="flex items-center gap-2">
                        <img alt="Logo" className="h-6 w-6" src="/icon.png" />
                        <span className="text-xl font-bold text-green-800">TaskMate</span>
                    </div>
                    <div className="flex items-center gap-3">
                         <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-600">
                             <span className="material-icons-outlined text-xl">notifications</span>
                         </button>
                         <img alt="Profile" className="h-8 w-8 rounded-full object-cover border border-gray-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4gAl8ygivGzLV7fguS8_HqLj4Nz8L6xulfQanmWwRILtbM7AGp_NgwIsDJTevzZC37joVIxncbKh1hQ3p46OohQQKX70g-Dk9ta5N4y4_mLayLFl7vMKCRxYsjxtJCdqL_wV0li03JRubJX_fd8xTOHlw3hbtwoOkhRbM5muqwGY024FFkF4Ce_jaa6he7FAo4QXOIYQVmMrLehG_oZBzG8BHMDJAJ43Mlz4_SOhPXXfzT2w_Hgxv6ShHVYaLCbeDxiz3DyS0MS4" />
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6 md:p-8 pb-24">
                    <div className="mx-auto max-w-7xl space-y-8">
                        
                        {/* 1. Welcome Section & Search */}
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
                                <p className="mt-2 text-gray-500">Welcome back, Segun! Here is your daily activity.</p>
                            </div>
                            <div className="hidden md:flex items-center gap-4">
                                <div className="relative group">
                                    <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors">search</span>
                                    <input 
                                        className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all md:w-72 shadow-sm" 
                                        placeholder="Find a service..." 
                                        type="text" 
                                    />
                                </div>
                                <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all relative">
                                    <span className="material-icons-outlined text-gray-600">notifications</span>
                                    <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 border border-white"></span>
                                </button>
                                <img alt="Profile" className="h-11 w-11 rounded-full object-cover border-2 border-white shadow-md cursor-pointer hover:scale-105 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4gAl8ygivGzLV7fguS8_HqLj4Nz8L6xulfQanmWwRILtbM7AGp_NgwIsDJTevzZC37joVIxncbKh1hQ3p46OohQQKX70g-Dk9ta5N4y4_mLayLFl7vMKCRxYsjxtJCdqL_wV0li03JRubJX_fd8xTOHlw3hbtwoOkhRbM5muqwGY024FFkF4Ce_jaa6he7FAo4QXOIYQVmMrLehG_oZBzG8BHMDJAJ43Mlz4_SOhPXXfzT2w_Hgxv6ShHVYaLCbeDxiz3DyS0MS4" />
                            </div>
                        </div>

                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                             {/* Left Column (Stats + Table) */}
                             <div className="lg:col-span-2 space-y-8">
                                
                                {/* Stats Cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                                        <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                            <span className="material-icons-outlined">pending_actions</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Active Tasks</p>
                                            <h3 className="text-2xl font-bold text-gray-900">0</h3>
                                        </div>
                                    </div>
                                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                                        <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                            <span className="material-icons-outlined">task_alt</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Completed</p>
                                            <h3 className="text-2xl font-bold text-gray-900">0</h3>
                                        </div>
                                    </div>
                                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                                        <div className="h-12 w-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                                            <span className="material-icons-outlined">account_balance_wallet</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Total Spent</p>
                                            <h3 className="text-2xl font-bold text-gray-900">₦0.00</h3>
                                        </div>
                                    </div>
                                </div>

                                {/* Active Requests Table */}
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-gray-900">Active Requests</h2>
                                        <div className="flex items-center gap-3">
                                            <div className="hidden sm:flex rounded-lg bg-gray-100 p-1">
                                                {['All', 'In Progress', 'Scheduled'].map((tab) => (
                                                    <button
                                                        key={tab}
                                                        onClick={() => setActiveTab(tab)}
                                                        className={`rounded px-4 py-1.5 text-xs font-medium transition-all ${
                                                            activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                                                        }`}
                                                    >
                                                        {tab}
                                                    </button>
                                                ))}
                                            </div>
                                            <Link 
                                                to="/customer/post-request"
                                                className="flex items-center gap-2 rounded-xl bg-green-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-green-800 shadow-lg shadow-green-700/20 transition-all hover:scale-105"
                                            >
                                                <span className="material-icons-outlined text-lg">add</span>
                                                New Request
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-sm text-gray-500">
                                                <thead className="bg-gray-50/50 text-xs uppercase text-gray-400">
                                                    <tr>
                                                        <th className="px-6 py-4 font-semibold">Service</th>
                                                        <th className="px-6 py-4 font-semibold">Date</th>
                                                        <th className="px-6 py-4 font-semibold">Provider</th>
                                                        <th className="px-6 py-4 font-semibold">Status</th>
                                                        <th className="px-6 py-4 font-semibold text-right">Amount</th>
                                                        <th className="px-6 py-4 text-center font-semibold">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {filteredRequests.map((req) => (
                                                        <tr 
                                                            key={req.id} 
                                                            className="hover:bg-gray-50/80 transition-colors cursor-pointer"
                                                            onClick={() => handleRowClick(req.id)}
                                                        >
                                                            <td className="px-6 py-4">
                                                                <div>
                                                                    <div className="font-bold text-gray-900">{req.service}</div>
                                                                    <div className="text-xs text-gray-400">{req.id}</div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 font-medium">{req.date}</td>
                                                            <td className="px-6 py-4">
                                                                <div className="flex items-center gap-2">
                                                                    <img src={req.avatar} alt="" className="h-6 w-6 rounded-full bg-gray-200" />
                                                                    <span className="font-medium text-gray-900">{req.provider}</span>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                                                                    req.status === 'In Progress' ? 'bg-blue-50 text-blue-600' :
                                                                    req.status === 'Completed' ? 'bg-green-50 text-green-600' :
                                                                    req.status === 'Cancelled' ? 'bg-red-50 text-red-600' :
                                                                    'bg-orange-50 text-orange-600'
                                                                }`}>
                                                                    {req.status === 'In Progress' && <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>}
                                                                    {req.status}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 text-right font-bold text-gray-900">{req.amount}</td>
                                                            <td className="px-6 py-4 text-center relative">
                                                                <button 
                                                                    onClick={(e) => toggleDropdown(e, req.id)}
                                                                    className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                                                                >
                                                                    <span className="material-icons-outlined">more_vert</span>
                                                                </button>
                                                                
                                                                {/* Dropdown Menu */}
                                                                {openDropdown === req.id && (
                                                                    <div className="absolute right-8 top-8 z-10 w-40 rounded-xl bg-white p-1 shadow-xl border border-gray-100 ring-1 ring-black ring-opacity-5 origin-top-right">
                                                                        <button onClick={() => navigate('/customer/request-status')} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                                                            <span className="material-icons-outlined text-sm">visibility</span>
                                                                            View Details
                                                                        </button>
                                                                        <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                                                            <span className="material-icons-outlined text-sm">chat</span>
                                                                            Message
                                                                        </button>
                                                                        <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                                                                            <span className="material-icons-outlined text-sm">cancel</span>
                                                                            Cancel
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                             </div>

                             {/* Right Column (Timeline & Ads) */}
                             <div className="space-y-8">
                                {/* Recent Activity Timeline */}
                                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="font-bold text-gray-900">Recent Activity</h3>
                                        <button className="text-xs font-semibold text-green-700 hover:underline">View All</button>
                                    </div>
                                    <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-5 before:w-0.5 before:bg-gray-100">
                                        {recentActivity.map((activity) => (
                                            <div key={activity.id} className="relative flex items-start gap-4">
                                                <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white ${activity.color}`}>
                                                    <span className="material-icons-outlined text-lg">{activity.icon}</span>
                                                </div>
                                                <div className="pt-1">
                                                    <p className="text-sm font-medium text-gray-900">{activity.text}</p>
                                                    <span className="text-xs text-gray-500">{activity.time}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Promo Card (Less intrusive) */}
                                <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white shadow-lg overflow-hidden relative">
                                    <div className="relative z-10">
                                        <span className="inline-block rounded-md bg-white/20 px-2 py-1 text-xs font-bold uppercase backdrop-blur-sm mb-3">Premium</span>
                                        <h3 className="text-lg font-bold">Refer & Earn ₦2,000</h3>
                                        <p className="mt-1 text-sm text-gray-300 opacity-90">Invite friends to TaskMate and earn bonus credits.</p>
                                        <button className="mt-4 text-xs font-bold bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">Invite Friends</button>
                                    </div>
                                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-green-500 rounded-full blur-3xl opacity-20"></div>
                                </div>
                             </div>
                         </div>

                        {/* 5. Recommendations (Redesigned) */}
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Recommended For You</h2>
                                    <p className="text-sm text-gray-500">Top rated providers in your area</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all">
                                        <span className="material-icons-outlined text-lg">chevron_left</span>
                                    </button>
                                    <button className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all">
                                        <span className="material-icons-outlined text-lg">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* Card Template */}
                                {[
                                    { name: 'Tunde Fixes', role: 'Plumbing & Repairs', rate: '₦5,000/hr', rating: 4.9, img: 'https://i.pravatar.cc/150?u=1', jobs: 142 },
                                    { name: "Sarah's Kitchen", role: 'Catering & Events', rate: '₦12,000/meal', rating: 4.8, img: 'https://i.pravatar.cc/150?u=2', jobs: 89 },
                                    { name: 'Ibrahim Electric', role: 'Electrical Services', rate: '₦7,500/visit', rating: 5.0, img: 'https://i.pravatar.cc/150?u=3', jobs: 215 },
                                    { name: 'Clean & Shine', role: 'House Cleaning', rate: '₦15,000/day', rating: 4.7, img: 'https://i.pravatar.cc/150?u=4', jobs: 67 },
                                ].map((provider, idx) => (
                                    <Link to={`/customer/provider/${idx}`} key={idx} className="group bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                        <div className="flex items-start justify-between mb-4">
                                             <div className="relative">
                                                <img src={provider.img} alt={provider.name} className="h-14 w-14 rounded-full object-cover border-2 border-white shadow-sm" />
                                                <div className="absolute -bottom-1 -right-1 bg-green-500 border-2 border-white w-4 h-4 rounded-full"></div>
                                             </div>
                                             <div className="flex flex-col items-end">
                                                 <span className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-lg text-xs font-bold">
                                                     <span className="material-icons-outlined text-[14px]">star</span> {provider.rating}
                                                 </span>
                                                 <span className="text-[10px] text-gray-400 mt-1">{provider.jobs} Jobs</span>
                                             </div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors">{provider.name}</h3>
                                            <p className="text-xs text-gray-500 font-medium">{provider.role}</p>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Rate</span>
                                                <span className="text-sm font-bold text-gray-900">{provider.rate}</span>
                                            </div>
                                            <button className="bg-gray-900 text-white p-2 rounded-lg group-hover:bg-green-700 transition-colors">
                                                <span className="material-icons-outlined text-lg">arrow_forward</span>
                                            </button>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </div>
                </main>
                <MobileNavBar />
            </div>
        </div>
    );
};

export default Dashboard;

