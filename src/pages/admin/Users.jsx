import React, { useState } from 'react';
import { toast } from 'sonner';

const Users = () => {
    // MOCK DATA: List of Users
    const [providers, setProviders] = useState([
        { id: 1, name: 'Chidubem Okafor', role: 'Provider', service: 'Plumbing', rating: 4.8, status: 'Active', joined: 'Oct 2023', verified: true },
        { id: 2, name: 'Grace Adebayo', role: 'Provider', service: 'Catering', rating: 4.5, status: 'Active', joined: 'Sep 2023', verified: true },
        { id: 3, name: 'Emmanuel John', role: 'Provider', service: 'Electrical', rating: 3.9, status: 'Suspended', joined: 'Aug 2023', verified: false },
        { id: 4, name: 'Sarah Musa', role: 'Provider', service: 'Cleaning', rating: 4.2, status: 'Pending', joined: 'Nov 2023', verified: false },
    ]);

    const [customers, setCustomers] = useState([
        { id: 101, name: 'Tunde Bakare', role: 'Customer', requests: 12, spent: '₦45,000', status: 'Active', joined: 'Jan 2023' },
        { id: 102, name: 'Chioma Nnadi', role: 'Customer', requests: 5, spent: '₦12,500', status: 'Active', joined: 'Mar 2023' },
        { id: 103, name: 'Ahmed Lawal', role: 'Customer', requests: 0, spent: '₦0', status: 'Inactive', joined: 'Oct 2023' },
    ]);

    const [activeTab, setActiveTab] = useState('Providers');

    const toggleStatus = (id, type) => {
        const userList = type === 'provider' ? providers : customers;
        const user = userList.find(u => u.id === id);
        const newStatus = user.status === 'Active' ? 'Suspended' : 'Active';
        const actionText = user.status === 'Active' ? 'Suspend' : 'Activate';

        toast(`Are you sure you want to ${actionText.toLowerCase()} ${user.name}?`, {
            action: {
                label: 'Yes, Confirm',
                onClick: () => {
                   if (type === 'provider') {
                        setProviders(providers.map(p => p.id === id ? { ...p, status: newStatus } : p));
                    } else {
                        setCustomers(customers.map(c => c.id === id ? { ...c, status: newStatus } : c));
                    }
                    toast.success(`User ${newStatus.toLowerCase()} successfully.`);
                }
            },
            cancel: {
                 label: 'No',
            }
        });
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">User Management</h2>
                    <p className="text-gray-500">Manage provider and customer accounts.</p>
                </div>
                <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
                    {['Providers', 'Customers'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                                activeTab === tab
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Providers Table */}
            {activeTab === 'Providers' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-500">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-400 font-bold border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Service</th>
                                    <th className="px-6 py-4 text-center">Rating</th>
                                    <th className="px-6 py-4 text-center">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {providers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 flex items-center gap-1">
                                                        {user.name}
                                                        {user.verified && (
                                                            <span className="material-icons text-blue-500 text-[14px]" title="Verified Provider">verified</span>
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-gray-400">Joined {user.joined}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-700">{user.service}</td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center gap-0.5" title={user.rating}>
                                               {[...Array(5)].map((_, i) => (
                                                    <span key={i} className={`material-icons text-[14px] ${i < Math.round(user.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                                                        star
                                                    </span>
                                               ))}
                                               <span className="text-xs font-bold text-gray-500 ml-1">{user.rating}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                user.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                user.status === 'Suspended' ? 'bg-red-100 text-red-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button 
                                                onClick={() => toggleStatus(user.id, 'provider')}
                                                className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${
                                                    user.status === 'Active' 
                                                    ? 'text-red-600 border-red-200 hover:bg-red-50' 
                                                    : 'text-green-600 border-green-200 hover:bg-green-50'
                                                }`}
                                            >
                                                {user.status === 'Active' ? 'Suspend' : 'Activate'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Customers Table */}
            {activeTab === 'Customers' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-500">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-400 font-bold border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4 text-center">Requests</th>
                                    <th className="px-6 py-4 text-right">Total Spent</th>
                                    <th className="px-6 py-4 text-center">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {customers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900">{user.name}</div>
                                                    <div className="text-xs text-gray-400">Joined {user.joined}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center font-bold text-gray-700">{user.requests}</td>
                                        <td className="px-6 py-4 text-right font-bold text-gray-900">{user.spent}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                user.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button 
                                                onClick={() => toggleStatus(user.id, 'customer')}
                                                className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${
                                                    user.status === 'Active' 
                                                    ? 'text-red-600 border-red-200 hover:bg-red-50' 
                                                    : 'text-green-600 border-green-200 hover:bg-green-50'
                                                }`}
                                            >
                                                {user.status === 'Active' ? 'Suspend' : 'Activate'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;