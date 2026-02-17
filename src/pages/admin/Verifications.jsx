import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Verifications = () => {
    // MOCK DATA for Pending Verifications
    const navigate = useNavigate();
    const [verifications, setVerifications] = useState([]);

    const handleAction = (id, action) => {
        navigate(`/admin/verifications/${id}`);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Identity Verification</h2>
                    <p className="text-gray-500">Review and approve provider documents.</p>
                </div>
                <div className="flex gap-2">
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                        {verifications.length} Pending
                    </span>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-400 font-bold">
                            <tr>
                                <th className="px-6 py-4">Provider</th>
                                <th className="px-6 py-4">Service</th>
                                <th className="px-6 py-4">Documents</th>
                                <th className="px-6 py-4">Submitted</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {verifications.length > 0 ? (
                                verifications.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900">{user.name}</div>
                                                    <div className="text-xs text-gray-400">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{user.service}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {user.documents.map((doc, i) => (
                                                    <span key={i} className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100 cursor-pointer hover:bg-blue-100">
                                                        <span className="material-icons-outlined text-[10px] mr-1">description</span>
                                                        {doc}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-medium">{user.submitted}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button 
                                                    onClick={() => handleAction(user.id, 'view')}
                                                    className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-700 transition-colors shadow-sm shadow-green-200"
                                                >
                                                    <span className="material-icons-outlined text-sm">visibility</span>
                                                    Review
                                                </button>
                                                <button 
                                                    onClick={() => handleAction(user.id, 'reject')}
                                                    className="flex items-center gap-1 bg-white text-red-600 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-50 hover:border-red-100 transition-colors"
                                                >
                                                    <span className="material-icons-outlined text-sm">close</span>
                                                    Reject
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                                        <span className="material-icons-outlined text-4xl mb-2">check_circle</span>
                                        <p>All verifications completed!</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Verifications;