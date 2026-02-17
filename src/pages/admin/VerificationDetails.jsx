import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/ui/Breadcrumbs';

const VerificationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [verification, setVerification] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // MOCK FETCH
        setTimeout(() => {
            setVerification({
                id: id,
                name: "Chinedu Okeke", 
                email: "chinedu@example.com",
                phone: "08012345678",
                service: "Plumbing", 
                submitted: "Oct 24, 2023", 
                status: "Pending",
                documents: [
                    { name: 'NIN Identification', type: 'ID Card', status: 'Pending', url: '#' },
                    { name: 'Utility Bill (Lekki)', type: 'Address Proof', status: 'Approved', url: '#' },
                    { name: 'Trade Test Cert III', type: 'Certificate', status: 'Reviewing', url: '#' }
                ]
            });
            setLoading(false);
        }, 800);
    }, [id]);

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    const handleApprove = () => {
        // logic
        navigate('/admin/verifications');
    };

     const handleReject = () => {
        // logic
        navigate('/admin/verifications');
    };

    return (
        <div className="space-y-6 animate-fade-in">
             <div className="flex flex-col gap-2">
                <Breadcrumbs 
                    items={[
                        { label: 'Verifications', path: '/admin/verifications' },
                        { label: 'Review', path: `/admin/verifications/${id}` }
                    ]} 
                />
                 <h1 className="text-3xl font-bold text-gray-900">Review Verification Application</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* User Info */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex items-start gap-5">
                         <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-2xl">
                             {verification.name.charAt(0)}
                         </div>
                         <div>
                             <h2 className="text-xl font-bold text-gray-900">{verification.name}</h2>
                             <p className="text-gray-500 text-sm">Applying for <span className="font-semibold text-gray-800">{verification.service}</span> Provider</p>
                             <div className="flex gap-4 mt-2 text-sm text-gray-600">
                                 <span className="flex items-center gap-1"><span className="material-icons text-xs">email</span> {verification.email}</span>
                                 <span className="flex items-center gap-1"><span className="material-icons text-xs">phone</span> {verification.phone}</span>
                             </div>
                         </div>
                    </div>
                    
                    {/* Documents List */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h3 className="font-bold text-gray-900">Submitted Documents</h3>
                            <p className="text-sm text-gray-500">Review all attached files carefully.</p>
                        </div>
                        <ul className="divide-y divide-gray-100">
                            {verification.documents.map((doc, i) => (
                                <li key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                                            <span className="material-icons">description</span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{doc.name}</p>
                                            <p className="text-xs text-gray-500">{doc.type}</p>
                                        </div>
                                    </div>
                                    <button className="text-sm text-blue-600 font-bold hover:underline">
                                        View Document
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="space-y-6">
                     <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                        <h3 className="font-bold text-gray-900 mb-4">Decision</h3>
                        <p className="text-sm text-gray-500 mb-6">
                            Approve enables this provider to start accepting jobs immediately. Reject will send them a notification to resubmit.
                        </p>
                        <div className="space-y-3">
                            <button 
                                onClick={handleApprove}
                                className="w-full py-3 px-4 rounded-xl bg-green-600 text-white font-bold shadow-lg shadow-green-600/20 hover:bg-green-700 hover:shadow-green-600/30 transition-all hover:-translate-y-0.5"
                            >
                                Approve Application
                            </button>
                             <button 
                                onClick={handleReject}
                                className="w-full py-3 px-4 rounded-xl bg-white border border-red-200 text-red-600 font-bold hover:bg-red-50 transition-all"
                            >
                                Reject
                            </button>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationDetails;
