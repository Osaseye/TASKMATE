import React, { useState } from 'react';

const Requests = () => {
    // MOCK DATA for Admin Requests
    const [requests, setRequests] = useState([
        { id: 'REQ-101', customer: 'Tunde Bakare', provider: 'Chidubem Okafor', service: 'Plumbing', status: 'In Progress', date: 'Oct 24, 2023', amount: '₦15,000' },
        { id: 'REQ-102', customer: 'Chioma Nnadi', provider: 'Grace Adebayo', service: 'Catering', status: 'Pending', date: 'Oct 25, 2023', amount: '₦45,000' },
        { id: 'REQ-103', customer: 'Ahmed Lawal', provider: 'Unassigned', service: 'Electrical', status: 'Open', date: 'Oct 26, 2023', amount: '₦8,000' },
        { id: 'REQ-104', customer: 'Sarah Musa', provider: 'Emmanuel John', service: 'Cleaning', status: 'Completed', date: 'Oct 20, 2023', amount: '₦12,000' },
        { id: 'REQ-105', customer: 'John Doe', provider: 'Chidubem Okafor', service: 'Plumbing', status: 'Cancelled', date: 'Oct 18, 2023', amount: '₦5,000' },
    ]);

    const [filter, setFilter] = useState('All');

    const [selectedRequest, setSelectedRequest] = useState(null);

    const handleAction = (id, action) => {
        if (action === 'view') {
            const req = requests.find(r => r.id === id);
            setSelectedRequest(req);
        } else if (action === 'cancel') {
             // Handle cancel logic with toast...
             console.log(`Cancelling request ${id}`);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'In Progress': return 'bg-blue-100 text-blue-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Open': return 'bg-gray-100 text-gray-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
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
                            {filteredRequests.map((req) => (
                                <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs">{req.id}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{req.customer}</td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {req.provider === 'Unassigned' ? (
                                            <span className="italic text-gray-400">Unassigned</span>
                                        ) : (
                                            req.provider
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{req.service}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusColor(req.status)}`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-gray-900">{req.amount}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button 
                                            onClick={() => handleAction(req.id, 'view')}
                                            className="text-gray-400 hover:text-gray-600 p-1 rounded-full transition-colors"
                                            title="View Details"
                                        >
                                            <span className="material-icons-outlined text-lg">visibility</span>
                                        </button>
                                        <button 
                                            onClick={() => handleAction(req.id, 'cancel')}
                                            className="text-red-400 hover:text-red-600 p-1 rounded-full transition-colors ml-2"
                                            title="Force Cancel"
                                        >
                                            <span className="material-icons-outlined text-lg">cancel</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredRequests.length === 0 && (
                    <div className="p-8 text-center text-gray-400">
                        <p>No requests found matching this filter.</p>
                    </div>
                )}
            </div>

            {/* Request Details Modal */}
            {selectedRequest && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-scale-in">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                            <h3 className="text-lg font-bold text-gray-900">Request Details</h3>
                            <button 
                                onClick={() => setSelectedRequest(null)}
                                className="text-gray-400 hover:text-gray-600 p-1 rounded-full"
                            >
                                <span className="material-icons-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Request ID</p>
                                    <p className="font-mono font-bold text-gray-900">{selectedRequest.id}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(selectedRequest.status)}`}>
                                    {selectedRequest.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Customer</p>
                                    <p className="text-gray-900 font-medium">{selectedRequest.customer}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Provider</p>
                                    <p className="text-gray-900 font-medium">{selectedRequest.provider}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Service</p>
                                    <p className="text-gray-900">{selectedRequest.service}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Date</p>
                                    <p className="text-gray-900">{selectedRequest.date}</p>
                                </div>
                            </div>
                             
                            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                <p className="font-bold text-gray-700">Total Amount</p>
                                <p className="text-xl font-black text-gray-900">{selectedRequest.amount}</p>
                            </div>

                             {selectedRequest.status === 'In Progress' && (
                                <div className="mt-4 p-4 bg-blue-50 text-blue-800 rounded-xl text-sm">
                                    <p className="font-bold mb-1">Admin Info</p>
                                    <p>This job is currently active. Monitor for completion or disputes.</p>
                                </div>
                            )}
                        </div>
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                            <button 
                                onClick={() => setSelectedRequest(null)}
                                className="px-4 py-2 bg-white text-gray-700 font-bold text-sm rounded-lg border border-gray-200 hover:bg-gray-50"
                            >
                                Close
                            </button>
                             <button className="px-4 py-2 bg-blue-600 text-white font-bold text-sm rounded-lg hover:bg-blue-700">
                                Contact Parties
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Requests;