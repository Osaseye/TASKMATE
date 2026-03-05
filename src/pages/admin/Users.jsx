import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { collection, query, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Loader2 } from 'lucide-react';

const Users = () => {
    const [providers, setProviders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Providers');
    const navigate = useNavigate();

    useEffect(() => {
        const q = query(collection(db, "users"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const allUsers = snapshot.docs.map(doc => ({ 
                id: doc.id, 
                ...doc.data(),
                // Default values for missing fields to prevent UI errors
                status: doc.data().status || 'Active',
                rating: doc.data().rating || 0,
                service: doc.data().serviceType || 'N/A',
                joined: doc.data().createdAt ? new Date(doc.data().createdAt).toLocaleDateString() : 'N/A',
                name: doc.data().displayName || doc.data().email
            }));
            
            setProviders(allUsers.filter(u => u.role === 'provider'));
            setCustomers(allUsers.filter(u => u.role === 'customer'));
            setLoading(false);
        }, (error) => {
            console.error("Error fetching users:", error);
            toast.error("Failed to load users");
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const toggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
        const actionText = currentStatus === 'Active' ? 'Suspend' : 'Activate';

        // Optimistic update handled by Firestore listener, but we can show toast
        try {
            const userRef = doc(db, "users", id);
            await updateDoc(userRef, { status: newStatus });
            toast.success(`User status updated to ${newStatus}`);
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update status");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in p-6">
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
                                {providers.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                                            No providers found.
                                        </td>
                                    </tr>
                                ) : (
                                    providers.map((user) => (
                                    <tr 
                                        key={user.id} 
                                        onClick={() => navigate(`/admin/users/${user.id}`)}
                                        className="hover:bg-gray-50/50 transition-colors cursor-pointer group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors uppercase">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 flex items-center gap-1 group-hover:text-blue-600 transition-colors">
                                                        {user.name}
                                                        {user.isVerified && (
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
                                               <span className="material-icons text-[16px] text-yellow-400">star</span>
                                               <span className="text-sm font-bold text-gray-700">{user.rating}</span>
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
                                                    toggleStatus(user.id, user.status);
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
                                )))}
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
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4 text-center">Requests</th>
                                    <th className="px-6 py-4 text-center">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {customers.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                                            No customers found.
                                        </td>
                                    </tr>
                                ) : (
                                    customers.map((user) => (
                                    <tr 
                                        key={user.id} 
                                        onClick={() => navigate(`/admin/users/${user.id}`)}
                                        className="hover:bg-gray-50/50 transition-colors cursor-pointer group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors uppercase">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                        {user.name}
                                                    </div>
                                                    <div className="text-xs text-gray-400">Joined {user.joined}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-700">{user.email}</td>
                                        <td className="px-6 py-4 text-center">
                                            {/* Placeholder for request count - would need separate query or counter field */}
                                            <span className="text-gray-500">-</span>
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
                                                    toggleStatus(user.id, user.status);
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
                                )))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;