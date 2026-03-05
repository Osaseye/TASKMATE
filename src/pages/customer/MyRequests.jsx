import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import MobileNavBar from '../../components/layout/MobileNavBar';
import { useData } from '../../context/DataContext';
import { format } from 'date-fns';

const MyRequests = () => {
    const navigate = useNavigate();
    const { requests: allRequests } = useData(); // Aliasing
    const [activeTab, setActiveTab] = useState('All');

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
            case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Scheduled': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
            case 'Open': return 'bg-orange-100 text-orange-700 border-orange-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const filteredRequests = activeTab === 'All' 
        ? allRequests 
        : activeTab === 'History' 
            ? allRequests.filter(r => ['Completed', 'Cancelled'].includes(r.status))
            : allRequests.filter(r => ['Open', 'In Progress', 'Scheduled'].includes(r.status));

    return (
        <div className="flex h-screen bg-[#F8F9FA] font-sans text-gray-900">
            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        
                        {/* Header */}
                        <div className="md:flex md:items-center md:justify-between mb-8">
                            <div>
                                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Requests</h1>
                                <p className="mt-1 text-sm text-gray-500">Manage and track all your service requests.</p>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <Link to="/customer/post-request" className="inline-flex items-center px-5 py-2.5 rounded-xl shadow-lg shadow-green-600/20 bg-green-600 text-white text-sm font-bold hover:bg-green-700 transition-all hover:scale-[1.02] active:scale-[0.98]">
                                    <span className="material-icons-outlined text-lg mr-2">add</span>
                                    New Request
                                </Link>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="bg-white rounded-2xl p-1.5 inline-flex shadow-sm border border-gray-100 mb-8">
                            {['All', 'Active', 'History'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                        activeTab === tab
                                            ? 'bg-gray-900 text-white shadow-md'
                                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Requests List */}
                        <div className="space-y-4">
                            {filteredRequests.length > 0 ? (
                                filteredRequests.map((req) => {
                                    const date = req.createdAt && req.createdAt.toDate ? format(req.createdAt.toDate(), 'MMM dd, yyyy') : 'Just now';
                                    const providerName = req.providerName || "Pending Assign...";
                                    const providerAvatar = req.providerAvatar || `https://ui-avatars.com/api/?name=${providerName}&background=random`;
                                    
                                    return (
                                    <div 
                                        key={req.id}
                                        onClick={() => navigate(req.status === 'Completed' ? `/customer/service-review/${req.id}` : `/customer/request-status/${req.id}`)}
                                        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-200 transition-all cursor-pointer group"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            
                                            {/* Left: Service & Provider */}
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                                                    <span className="material-icons-outlined text-gray-400">handyman</span>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                                                        {req.title || req.category}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        {req.providerName ? (
                                                            <>
                                                                <img src={providerAvatar} alt={providerName} className="w-4 h-4 rounded-full" />
                                                                <span className="text-sm text-gray-500 font-medium">{providerName}</span>
                                                            </>
                                                        ) : (
                                                            <span className="text-xs text-orange-500 bg-orange-50 px-2 py-0.5 rounded-md font-medium">Looking for provider...</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Middle: Date & Time */}
                                            <div className="hidden md:block text-left md:text-center">
                                                <div className="text-sm font-bold text-gray-900">{date}</div>
                                                <div className="text-xs text-gray-400 capitalize">{req.urgency || 'Standard'} Priority</div>
                                            </div>

                                            {/* Right: Amount & Status */}
                                            <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8 w-full md:w-auto mt-2 md:mt-0 pl-16 md:pl-0">
                                                <div className="text-right">
                                                    <div className="text-lg font-black text-gray-900">₦{req.budget}</div>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(req.status)}`}>
                                                    {req.status}
                                                </span>
                                                <span className="material-icons-outlined text-gray-300 group-hover:text-green-600 transition-colors">chevron_right</span>
                                            </div>

                                        </div>
                                    </div>
                                )})
                            ) : (
                                <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
                                        <span className="material-icons-outlined text-gray-400 text-3xl">assignment_late</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">No requests found</h3>
                                    <p className="text-gray-500 mt-1">You don't have any {activeTab.toLowerCase()} requests at the moment.</p>
                                    <Link to="/customer/post-request" className="inline-block mt-6 px-6 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors">
                                        Post a Request
                                    </Link>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
                <MobileNavBar />
            </main>
        </div>
    );
};

export default MyRequests;
