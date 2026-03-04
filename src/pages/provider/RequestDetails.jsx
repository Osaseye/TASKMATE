import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../context/AuthContext';
import ProviderSidebar from '../../components/layout/ProviderSidebar';
import ProviderMobileNavBar from '../../components/layout/ProviderMobileNavBar';
import Breadcrumbs from '../../components/ui/Breadcrumbs';

const RequestDetails = () => {
    const { id } = useParams();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const unsubscribe = onSnapshot(doc(db, "requests", id), (docSnapshot) => {
            if (docSnapshot.exists()) {
                setRequest({ id: docSnapshot.id, ...docSnapshot.data() });
            } else {
                toast.error("Request not found");
                navigate('/provider/requests');
            }
            setLoading(false);
        }, (error) => {
            console.error("Error fetching request:", error);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [id, navigate]);

    const handleAccept = async () => {
        if (!currentUser) return;
        
        try {
            const reqRef = doc(db, "requests", id);
            await updateDoc(reqRef, {
                status: 'Scheduled', // Or 'In-Progress' depending on workflow
                providerId: currentUser.uid,
                providerName: currentUser.displayName,
                providerPhoto: currentUser.photoURL,
                acceptedAt: new Date(),
                timeline: arrayUnion({
                    title: 'Provider Accepted',
                    time: new Date().toLocaleTimeString(),
                    status: 'completed'
                })
            });
            toast.success("Job Accepted!", {
                 description: "You can find this job in 'My Jobs'."
            });
            navigate(`/provider/jobs`);
        } catch (error) {
            console.error("Error accepting job:", error);
            toast.error("Failed to accept job");
        }
    };
    
    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (!request) return <div className="p-8 text-center">Request not found</div>;

    const breadcrumbItems = [
        { label: 'Dashboard', href: '/provider/dashboard' },
        { label: 'Requests', href: '/provider/requests' },
        { label: `View Request #${request.id.substring(0,6)}`, href: '#' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-text-light">
            <ProviderSidebar />
            <ProviderMobileNavBar />

            <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
                {/* Header */}
                 <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
                    <div className="flex items-center gap-2">
                        <Link to="/provider/requests" className="md:hidden p-1 -ml-2 text-gray-500">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </Link>
                        <h1 className="text-xl font-semibold text-gray-800">Request Details</h1>
                    </div>
                 </header>

                 <div className="p-4 md:p-8 max-w-5xl mx-auto">
                    <Breadcrumbs items={breadcrumbItems} />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Job Header Card */}
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-2xl font-bold text-gray-900">{request.serviceType || request.title}</h2>
                                    <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full uppercase tracking-wide">
                                        {request.urgency || 'Normal'} Priority
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-2 text-gray-500 mb-6">
                                    <span className="material-symbols-outlined text-lg">schedule</span>
                                    <span className="text-sm">Posted {request.createdAt ? new Date(request.createdAt.seconds * 1000).toLocaleDateString() : 'Recently'}</span>
                                    <span className="mx-2">•</span>
                                    <span className="material-symbols-outlined text-lg">location_on</span>
                                    <span className="text-sm">{request.location}</span>
                                </div>

                                <div className="prose prose-sm max-w-none text-gray-600">
                                    <h3 className="text-gray-900 font-semibold mb-2">Description</h3>
                                    <p className="leading-relaxed">{request.description}</p>
                                </div>

                                {/* Images Preview (Conditional) */}
                                {request.images && request.images.length > 0 && (
                                    <div className="mt-6 grid grid-cols-2 gap-4">
                                       {request.images.map((img, idx) => (
                                           <div key={idx} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                                <img src={img} alt={`Job ${idx}`} className="w-full h-full object-cover"/>
                                           </div>
                                       ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar/Action Card */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
                                <div className="text-center mb-6">
                                    <p className="text-sm text-gray-500 mb-1">Estimated Budget</p>
                                    <p className="text-3xl font-bold text-primary">{request.budget || 'Negotiable'}</p>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                            <span className="material-symbols-outlined text-gray-500">person</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{request.customerName || 'Customer'}</p>
                                            <p className="text-xs text-gray-500">New Customer</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                                        <span className="material-symbols-outlined text-gray-400 mt-0.5">map</span>
                                        <p className="text-sm text-gray-600 leading-snug">{request.location}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-3">
                                    <button 
                                        onClick={handleAccept}
                                        className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                                    >
                                        Accept Job
                                    </button>
                                    <Link to="/provider/requests" className="w-full py-3 bg-white text-gray-700 font-bold border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors block text-center">
                                        Decline / Back
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
            </main>
        </div>
    );
};

export default RequestDetails;
