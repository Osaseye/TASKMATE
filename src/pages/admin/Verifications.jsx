import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const Verifications = () => {
    const navigate = useNavigate();
    const [verifications, setVerifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Query the 'verifications' collection for pending requests
        const q = query(
            collection(db, 'verifications'), 
            where('status', '==', 'pending')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setVerifications(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })));
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleAction = (id) => {
        navigate(`/admin/verifications/${id}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Identity Verification</h2>
                    <p className="text-gray-500">Review and approve provider documents.</p>
                </div>
                {/* <div className="flex gap-2">
                    <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">Filter</button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm shadow-blue-200">Export</button>
                </div> */}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Provider</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Submitted</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {verifications.length > 0 ? (
                            verifications.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                                                {(item.providerName || '?').charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{item.providerName || 'Unknown Provider'}</div>
                                                <div className="text-sm text-gray-500">{item.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {item.submittedAt ? new Date(item.submittedAt.toDate ? item.submittedAt.toDate() : item.submittedAt).toLocaleDateString() : 'Just now'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button 
                                            onClick={() => handleAction(item.id)}
                                            className="text-blue-600 hover:text-blue-900 font-medium text-sm"
                                        >
                                            Review
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center text-gray-400">
                                    No pending verifications found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Verifications;