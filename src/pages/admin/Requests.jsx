import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, onSnapshot, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const Requests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [filter, setFilter] = useState('All');

    useEffect(() => {
        // Query requests sorted by creation date (newest first)
        // Note: You might need a composite index in Firestore for 'createdAt' desc
        // If it fails, remove orderBy or create index via console link in error
        const q = query(collection(db, "requests"), orderBy("createdAt", "desc"));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const reqs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                // Normalize data fields
                customer: doc.data().customerName || doc.data().displayName || 'Unknown Customer',
                provider: doc.data().providerName || (doc.data().providerId ? 'Assigned' : 'Unassigned'),
                service: doc.data().serviceType || doc.data().title || 'General Service',
                status: doc.data().status || 'Open',
                amount: doc.data().budget ? `₦${doc.data().budget.toLocaleString()}` : 'Negotiable',
                date: doc.data().createdAt ? new Date(doc.data().createdAt?.toDate ? doc.data().createdAt.toDate() : doc.data().createdAt).toLocaleDateString() : 'N/A'
            }));
            setRequests(reqs);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching requests:", error);
            // Fallback if index missing or other error
            toast.error("Could not load requests. Check console.");
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const filteredRequests = filter === 'All' ? requests : requests.filter(req => req.status === filter);

    const handleAction = async (id, action) => {
        if (action === 'view') {
            navigate(`/admin/requests/${id}`);
        } else if (action === 'cancel') {
             if (window.confirm("Are you sure you want to cancel this request?")) {
                 try {
                     await updateDoc(doc(db, "requests", id), { status: 'Cancelled' });
                     toast.success("Request cancelled successfully");
                 } catch (error) {
                     console.error("Error cancelling request:", error);
                     toast.error("Failed to cancel request");
                 }
             }
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'In Progress': return 'bg-blue-100 text-blue-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Open': return 'bg-purple-100 text-purple-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            case 'Declined': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
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
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Request Center</h2>
                    <p className="text-gray-500">Monitor and manage all service requests.</p>
                </div>
                 <div className="flex bg-gray-100 p-1 rounded-xl w-fit overflow-x-auto">
                    {['All', 'Open', 'In Progress', 'Completed', 'Cancelled'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                                filter === status
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900'
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-400 font-bold border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Request ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Provider</th>
                                <th className="px-6 py-4">Service</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-right">Amount</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredRequests.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-8 text-center text-gray-400">
                                        No requests found.
                                    </td>
                                </tr>
                            ) : (
                                filteredRequests.map((req) => (
                                    <tr 
                                        key={req.id} 
                                        onClick={() => handleAction(req.id, 'view')}
                                        className="hover:bg-gray-50/50 transition-colors cursor-pointer group"
                                    >
                                        <td className="px-6 py-4 font-mono text-xs group-hover:text-blue-600 font-bold transition-colors">
                                            {req.id.slice(0, 8)}...
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{req.customer}</td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {req.provider === 'Unassigned' ? (
                                                <span className="italic text-gray-400">Unassigned</span>
                                            ) : (
                                                req.provider
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 truncate max-w-[150px]" title={req.service}>
                                            {req.service}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusColor(req.status)}`}>
                                                {req.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-bold text-gray-900">{req.amount}</td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center">
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAction(req.id, 'cancel');
                                                    }}
                                                    className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                                    title="Force Cancel"
                                                >
                                                    <span className="material-icons-outlined text-lg">cancel</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Requests;