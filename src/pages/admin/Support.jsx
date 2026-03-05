import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const Support = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "support_tickets"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const ticketData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTickets(ticketData);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateDoc(doc(db, "support_tickets", id), {
                status: newStatus
            });
            toast.success(`Ticket marked as ${newStatus}`);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this ticket?")) return;
        try {
            await deleteDoc(doc(db, "support_tickets", id));
            toast.success("Ticket deleted");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete ticket");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Resolved': return 'bg-green-100 text-green-800 border-green-200';
            case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Open': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in relative z-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Support Tickets</h2>
                    <p className="text-gray-500">Manage user inquiries and issues.</p>
                </div>
                <div className="flex gap-2">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        Total Tickets: {tickets.length}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {tickets.length > 0 ? (
                    tickets.map((ticket) => (
                        <div key={ticket.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                                        ticket.status === 'Resolved' ? 'bg-green-500' : 'bg-blue-500'
                                    }`}>
                                        {(ticket.userEmail || 'U').charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{ticket.subject || 'No Subject'}</h3>
                                        <p className="text-sm text-gray-500">{ticket.userEmail} &bull; {ticket.category}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(ticket.status || 'Open')}`}>
                                    {ticket.status || 'Open'}
                                </span>
                            </div>
                            
                            <div className="bg-gray-50 p-4 rounded-xl text-gray-700 text-sm mb-4 border border-gray-100">
                                {ticket.message}
                            </div>

                            <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                                <span>Submitted: {ticket.createdAt ? new Date(ticket.createdAt.toDate ? ticket.createdAt.toDate() : ticket.createdAt).toLocaleString() : 'Just now'}</span>
                                <div className="flex items-center gap-2">
                                    {ticket.status !== 'Resolved' && (
                                        <button 
                                            onClick={() => handleStatusChange(ticket.id, 'Resolved')}
                                            className="text-green-600 hover:bg-green-50 px-3 py-1 rounded-lg font-medium transition-colors"
                                        >
                                            Mark Resolved
                                        </button>
                                    )}
                                    {(!ticket.status || ticket.status === 'Open') && (
                                        <button 
                                            onClick={() => handleStatusChange(ticket.id, 'In Progress')}
                                            className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg font-medium transition-colors"
                                        >
                                            Mark In Progress
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => handleDelete(ticket.id)}
                                        className="text-red-500 hover:bg-red-50 px-3 py-1 rounded-lg transition-colors ml-2"
                                        title="Delete Ticket"
                                    >
                                        <span className="material-icons text-sm">delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-200 border-dashed">
                        <span className="material-icons text-4xl mb-2">confirmation_number</span>
                        <p>No support tickets found.</p>
                    </div>
                )}
            </div>
        </div>

    );
};

export default Support;