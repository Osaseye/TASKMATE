import React, { useState } from 'react';

const Verifications = () => {
    // MOCK DATA for Pending Verifications
    const [selectedVerification, setSelectedVerification] = useState(null);
    const [verifications, setVerifications] = useState([
        { 
            id: 1, 
            name: "Chinedu Okeke", 
            email: "chinedu@example.com",
            phone: "08012345678",
            service: "Plumbing", 
            submitted: "Oct 24, 2023", 
            documents: ["ID Card", "Utility Bill", "Trade Certificate"],
            status: "Pending" 
        },
        { 
            id: 2, 
            name: "Grace Adebayo", 
            email: "grace@example.com",
            phone: "08123456789",
            service: "Catering", 
            submitted: "Oct 23, 2023", 
            documents: ["ID Card", "Food Safety Cert"],
            status: "Pending" 
        },
        { 
            id: 3, 
            name: "Emmanuel John", 
            email: "emmanuel@example.com",
            phone: "07098765432",
            service: "Electrical", 
            submitted: "Oct 22, 2023", 
            documents: ["ID Card", "NIN Slip"],
            status: "Pending" 
        }
    ]);

    const handleAction = (id, action) => {
        // In a real app, this would make an API call
        setVerifications(verifications.filter(v => v.id !== id));
        setSelectedVerification(null);
        // Show success toast
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
                                                    onClick={() => setSelectedVerification(user)}
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

            {/* Verification Details Modal */}
            {selectedVerification && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-scale-in flex flex-col max-h-[90vh]">
                        <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Verification Review</h3>
                                <p className="text-sm text-gray-500">Review submitted documents for compliance.</p>
                            </div>
                            <button 
                                onClick={() => setSelectedVerification(null)}
                                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-white transition-colors"
                            >
                                <span className="material-icons-outlined">close</span>
                            </button>
                        </div>
                        
                        <div className="p-8 overflow-y-auto">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center font-bold text-2xl text-gray-500">
                                    {selectedVerification.name.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{selectedVerification.name}</h2>
                                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <span className="material-icons-outlined text-sm">email</span>
                                            {selectedVerification.email}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <span className="material-icons-outlined text-sm">phone</span>
                                            {selectedVerification.phone}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Service Details</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-0.5">Category</p>
                                            <p className="font-medium text-gray-800">{selectedVerification.service}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-0.5">Submitted On</p>
                                            <p className="font-medium text-gray-800">{selectedVerification.submitted}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Documents</h4>
                                    <div className="space-y-3">
                                        {selectedVerification.documents.map((doc, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl bg-gray-50 cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all group">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                                                        <span className="material-icons-outlined text-sm">description</span>
                                                    </div>
                                                    <span className="font-medium text-gray-700 text-sm group-hover:text-blue-700">{doc}</span>
                                                </div>
                                                <span className="material-icons-outlined text-gray-400 group-hover:text-blue-500">visibility</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 mt-auto">
                            <button 
                                onClick={() => handleAction(selectedVerification.id, 'reject')}
                                className="px-6 py-2.5 bg-white text-red-600 font-bold text-sm rounded-xl border border-red-200 hover:bg-red-50 hover:border-red-300 transition-all shadow-sm"
                            >
                                Reject Application
                            </button>
                            <button 
                                onClick={() => handleAction(selectedVerification.id, 'approve')}
                                className="px-6 py-2.5 bg-green-600 text-white font-bold text-sm rounded-xl hover:bg-green-700 hover:shadow-lg hover:shadow-green-200 transition-all shadow-md"
                            >
                                Approve Provider
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Verifications;