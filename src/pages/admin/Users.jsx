import React, { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    // MOCK DATA: List of Users - EMPTY STATE
    const [providers, setProviders] = useState([]);
    const [customers, setCustomers] = useState([]);

    const [activeTab, setActiveTab] = useState('Providers');
    const navigate = useNavigate();

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
                                    <tr 
                                        key={user.id} 
                                        onClick={() => navigate(`/admin/users/${user.id}`)}
                                        className="hover:bg-gray-50/50 transition-colors cursor-pointer group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 flex items-center gap-1 group-hover:text-blue-600 transition-colors">
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
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleStatus(user.id, 'provider');
                                                }}
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