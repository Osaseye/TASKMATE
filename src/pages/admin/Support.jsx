import React, { useState } from 'react';
import { toast } from 'sonner';

const Support = () => {
    // MOCK DATA for Support Tickets - EMPTY STATE
    const [tickets, setTickets] = useState([]);

    const handleStatusChange = (id, newStatus) => {
        setTickets(tickets.map(t => t.id === id ? { ...t, status: newStatus } : t));
        toast.success(`Ticket ${id} marked as ${newStatus}`);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Resolved': return 'bg-green-100 text-green-800';
            case 'In Progress': return 'bg-blue-100 text-blue-800';
            case 'Open': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Support Center</h2>
                    <p className="text-gray-500">Manage user complaints and inquiries.</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-400 font-bold border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Ticket ID</th>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Subject</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {tickets.map((ticket) => (
                                <tr key={ticket.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs">{ticket.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-900">{ticket.user}</span>
                                            <span className="text-xs text-gray-400">{ticket.role}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-800 font-medium">{ticket.subject}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">{ticket.type}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusColor(ticket.status)}`}>
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            {ticket.status !== 'Resolved' && (
                                                <button 
                                                    onClick={() => handleStatusChange(ticket.id, 'Resolved')}
                                                    className="text-green-600 hover:bg-green-50 p-1.5 rounded-lg transition-colors border border-transparent hover:border-green-100"
                                                    title="Mark Resolved"
                                                >
                                                    <span className="material-icons-outlined text-lg">check_circle</span>
                                                </button>
                                            )}
                                            <button 
                                                className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                                                title="Reply via Email"
                                            >
                                                <span className="material-icons-outlined text-lg">mail</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {tickets.length === 0 && (
                    <div className="p-8 text-center text-gray-400">
                        <span className="material-icons-outlined text-4xl mb-2">thumb_up</span>
                        <p>No active support tickets.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Support;