import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import { db } from '../../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'sonner';

const VerificationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [verification, setVerification] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVerification = async () => {
            try {
                // Fetch the verification request
                const docRef = doc(db, 'verifications', id);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    setVerification({ id: docSnap.id, ...docSnap.data() });
                } else {
                    toast.error("Verification request not found");
                    navigate('/admin/verifications');
                }
            } catch (err) {
                console.error("Error fetching verification details:", err);
                toast.error("Failed to load details");
            } finally {
                setLoading(false);
            }
        };
        fetchVerification();
    }, [id, navigate]);

    const handleApprove = async () => {
        if (!verification) return;
        const targetUserId = verification.uid || verification.userId;
        
        try {
            const batch = [];
            // Use batch write or separate awaits? separate is fine but correct reference is keys.
            
            // 1. Update Verification Request Status
            await updateDoc(doc(db, 'verifications', id), {
                status: 'approved',
                reviewedAt: new Date().toISOString()
            });

            // 2. Update User Profile
            if (targetUserId) {
                await updateDoc(doc(db, 'users', targetUserId), {
                    isVerified: true,
                    verificationStatus: 'verified'
                });
            } else {
                toast.warning("User ID missing on verification request, profile not updated.");
            }

            toast.success("Provider approved!");
            navigate('/admin/verifications');
        } catch (err) {
            console.error(err);
            toast.error("Failed to approve provider");
        }
    };

    const handleReject = async () => {
        if(!window.confirm("Are you sure you want to reject this application?")) return;
        const targetUserId = verification.uid || verification.userId;

        try {
            await updateDoc(doc(db, 'verifications', id), {
                status: 'rejected',
                reviewedAt: new Date().toISOString()
            });
            // Ensure user remains unverified
            if (targetUserId) {
                await updateDoc(doc(db, 'users', targetUserId), {
                    isVerified: false,
                    verificationStatus: 'rejected'
                });
            }
            toast.success("Provider rejected");
            navigate('/admin/verifications');
        } catch (err) {
            console.error(err);
            toast.error("Failed to reject provider");
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    if (!verification) return null;

    // Helper to render documents safely
    const renderDocuments = () => {
        const docs = verification.documents || {};
        // If it's an array (old data), handle it
        if (Array.isArray(docs)) {
             return docs.map((url, i) => (
                <DocumentItem key={i} title={`Document ${i + 1}`} type="Document" url={url} />
             ));
        }
        // If it's an object (new seed data), handle it
        return Object.entries(docs).map(([key, url]) => (
            <DocumentItem 
                key={key} 
                title={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} // CamelCase to Title Case
                type={key} 
                url={url} 
            />
        ));
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
                 <h1 className="text-3xl font-bold text-gray-900">Review Application</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* User Info */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex items-start gap-5">
                         <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl uppercase">
                             {(verification.providerName || '?').charAt(0)}
                         </div>
                         <div>
                             <h2 className="text-xl font-bold text-gray-900">{verification.providerName || 'Unknown Name'}</h2>
                             <p className="text-gray-500 text-sm">Provider Application</p>
                             <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                                 <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                                     <span className="material-icons text-xs text-gray-400">email</span> 
                                     {verification.email}
                                </div>
                                 <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                                     <span className="material-icons text-xs text-gray-400">calendar_today</span> 
                                     Submitted: {verification.submittedAt ? new Date(verification.submittedAt.toDate ? verification.submittedAt.toDate() : verification.submittedAt).toLocaleDateString() : 'N/A'}
                                </div>
                             </div>
                         </div>
                    </div>
                    
                    {/* Documents List */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-gray-900">Submitted Documents</h3>
                                <p className="text-sm text-gray-500">Review all attached files for authenticity.</p>
                            </div>
                            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">
                                {Object.keys(verification.documents || {}).length} File(s)
                            </span>
                        </div>
                        <ul className="divide-y divide-gray-100">
                            {renderDocuments()}
                            {Object.keys(verification.documents || {}).length === 0 && (
                                <li className="p-8 text-center text-gray-400 italic">No documents uploaded.</li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="space-y-6">
                     <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 sticky top-6">
                        <h3 className="font-bold text-gray-900 mb-4">Admin Decision</h3>
                        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                            <strong>Approve:</strong> Grants "Verified" badge and full access to platform jobs.<br/>
                            <strong>Reject:</strong> Sends notification to resubmit documents.
                        </p>
                        
                        <div className="space-y-3">
                            {verification.status === 'pending' ? (
                                <>
                                    <button 
                                        onClick={handleApprove}
                                        className="w-full py-3 px-4 rounded-xl bg-green-600 text-white font-bold shadow-lg shadow-green-600/20 hover:bg-green-700 hover:shadow-green-600/30 transition-all hover:-translate-y-0.5 flex justify-center items-center gap-2"
                                    >
                                        <span className="material-icons text-sm">check_circle</span>
                                        Approve Application
                                    </button>
                                     <button 
                                        onClick={handleReject}
                                        className="w-full py-3 px-4 rounded-xl bg-white border border-red-200 text-red-600 font-bold hover:bg-red-50 transition-all flex justify-center items-center gap-2"
                                    >
                                        <span className="material-icons text-sm">cancel</span>
                                        Reject Application
                                    </button>
                                </>
                            ) : (
                                <div className={`text-center py-4 rounded-xl font-bold border ${
                                    verification.status === 'approved' 
                                        ? 'bg-green-50 text-green-700 border-green-200' 
                                        : 'bg-red-50 text-red-700 border-red-200'
                                }`}>
                                    Application {verification.status.charAt(0).toUpperCase() + verification.status.slice(1)}
                                </div>
                            )}
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

const DocumentItem = ({ title, type, url }) => (
    <li className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors group">
        <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-gray-200">
                <span className="material-icons">description</span>
            </div>
            <div>
                <p className="font-bold text-gray-900">{title}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">{type}</p>
            </div>
        </div>
        <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1 text-sm text-blue-600 font-bold hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors"
        >
            <span>View</span>
            <span className="material-icons text-sm">open_in_new</span>
        </a>
    </li>
);

export default VerificationDetails;
