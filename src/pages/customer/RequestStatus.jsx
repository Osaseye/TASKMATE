import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import MobileNavBar from '../../components/layout/MobileNavBar';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { format } from 'date-fns';

const RequestStatus = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequest = async () => {
            if (!id) return;
            try {
                const docRef = doc(db, "requests", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setRequest({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log("No such request!");
                }
            } catch (error) {
                console.error("Error fetching request:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRequest();
    }, [id]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    if (!request) {
        return (
             <div className="flex h-screen items-center justify-center bg-gray-50 flex-col gap-4">
                <p className="text-gray-500">Request not found.</p>
                <button onClick={() => navigate('/dashboard')} className="text-green-600 font-bold hover:underline">Back to Dashboard</button>
            </div>
        );
    }
    
    // Status Logic helper
    const getStatusIndex = (status) => {
        switch(status) {
            case 'Pending': return 0; // Direct request sent
            case 'Open': return 0; // General request sent
            case 'Scheduled': return 1; // Provider Assigned
            case 'In Progress': return 2; // Work started
            case 'Completed': return 3;
            default: return 0;
        }
    };
    
    const currentStatusIndex = getStatusIndex(request.status);
    const dateStr = request.createdAt?.toDate ? format(request.createdAt.toDate(), 'MMM dd, yyyy h:mm a') : 'Just now';

    return (
        <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
            <Sidebar />
            
            <main className="flex-1 overflow-hidden flex flex-col min-w-0">
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-8">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                                        {request.title}
                                    </h1>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Order ID: #{request.id.slice(0, 8).toUpperCase()} • Placed on {dateStr}
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" type="button">
                                        Report Issue
                                    </button>
                                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" type="button">
                                        Cancel Request
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-white shadow rounded-lg p-6">
                                    <h2 className="text-lg font-medium text-gray-900 mb-6 font-display">Request Status Timeline</h2>
                                    <div className="relative pl-4">
                                        {/* Vertical Line */}
                                        <div className="absolute left-3 top-2 bottom-6 w-0.5 bg-gray-200 -z-10"></div>
                                        
                                        {(request.timeline && request.timeline.length > 0) ? (
                                            request.timeline.map((event, index) => (
                                                <div key={index} className="flex items-start mb-8 relative">
                                                    <div className="flex-shrink-0 mr-4">
                                                        <div className={`h-6 w-6 rounded-full flex items-center justify-center ring-4 ring-white z-10 ${index <= request.timeline.length - 1 ? 'bg-green-500' : 'bg-gray-200'}`}>
                                                            <span className="material-icons-outlined text-white text-sm">check</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow pt-0.5">
                                                        <h3 className="text-sm font-semibold text-gray-900">{event.title}</h3>
                                                        <p className="text-sm text-gray-500 mt-1">{event.description || 'Status updated'}</p>
                                                        <span className="text-xs text-gray-400 mt-1 block">{event.time || format(new Date(), 'h:mm a')}</span>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            // Fallback if no timeline array exists yet (e.g. legacy or fresh req)
                                            <>
                                            <div className="flex items-start mb-8 relative">
                                                <div className="flex-shrink-0 mr-4">
                                                    <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center ring-4 ring-white z-10">
                                                        <span className="material-icons-outlined text-white text-sm">check</span>
                                                    </div>
                                                </div>
                                                <div className="flex-grow pt-0.5">
                                                    <h3 className="text-sm font-semibold text-gray-900">Request Sent</h3>
                                                    <p className="text-sm text-gray-500 mt-1">Your request has been received.</p>
                                                    <span className="text-xs text-gray-400 mt-1 block">{dateStr}</span>
                                                </div>
                                            </div>
                                            {request.status !== 'Open' && request.status !== 'Pending' && (
                                                <div className="flex items-start mb-8 relative">
                                                    <div className="flex-shrink-0 mr-4">
                                                        <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center ring-4 ring-white z-10">
                                                            <span className="material-icons-outlined text-white text-sm">person</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow pt-0.5">
                                                        <h3 className="text-sm font-semibold text-gray-900">Provider Assigned</h3>
                                                        <p className="text-sm text-gray-500 mt-1">{request.providerName} accepted the job.</p>
                                                    </div>
                                                </div>
                                            )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="lg:col-span-1 space-y-6">
                                <div className="bg-white shadow rounded-lg p-6">
                                    <h2 className="text-lg font-medium text-gray-900 mb-4 font-display">Job Details</h2>
                                    <dl className="grid grid-cols-1 gap-y-6">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Service Type</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{request.category}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Budget</dt>
                                            <dd className="mt-1 text-sm text-gray-900">₦{request.budget}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Description</dt>
                                            <dd className="mt-1 text-sm text-gray-900 line-clamp-3">
                                                {request.description}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Address</dt>
                                            <dd className="mt-1 text-sm text-gray-900 flex items-start">
                                                <span className="material-icons-outlined text-gray-400 mr-1 text-sm mt-0.5">location_on</span>
                                                {request.location || 'No location provided'}
                                            </dd>
                                        </div>
                                        {request.image && (
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Attachment</dt>
                                                <dd className="mt-2">
                                                    <img src={request.image} alt="Request attachment" className="h-24 w-full object-cover rounded-md border border-gray-200" />
                                                </dd>
                                            </div>
                                        )}
                                    </dl>
                                </div>

                                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <span className="material-icons-outlined text-green-400">info</span>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-green-800">Safety Tip</h3>
                                            <div className="mt-2 text-sm text-green-700">
                                                <p>For your safety, please ensure you verify the provider's identity code before allowing entry.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <MobileNavBar />
            </main>
        </div>
    );
};

export default RequestStatus;
