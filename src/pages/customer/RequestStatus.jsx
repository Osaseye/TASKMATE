import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import MobileNavBar from '../../components/layout/MobileNavBar';
import { doc, onSnapshot, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { format } from 'date-fns';
import { toast } from 'sonner';

const RequestStatus = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [request, setRequest] = useState(null);
    const [providerData, setProviderData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        
        const unsubscribe = onSnapshot(doc(db, "requests", id), async (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setRequest({ id: docSnap.id, ...data });

                // Fetch real provider data if assigned
                if (data.providerId) {
                    try {
                        const providerSnap = await getDoc(doc(db, "users", data.providerId));
                        if (providerSnap.exists()) {
                            setProviderData(providerSnap.data());
                        }
                    } catch (err) {
                        console.error("Error fetching provider details:", err);
                    }
                }
            } else {
                console.log("No such request!");
            }
            setLoading(false);
        }, (error) => {
            console.error("Error fetching request:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [id]);

    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [cancelReason, setCancelReason] = useState("");
    const [reportDetails, setReportDetails] = useState("");

    const handleCancelRequest = async () => {
        if (!cancelReason.trim()) {
            toast.error("Please provide a reason for cancellation");
            return;
        }
        try {
            const requestRef = doc(db, "requests", id);
            await updateDoc(requestRef, {
                status: 'Cancelled',
                cancelReason: cancelReason,
                updatedAt: new Date()
            });
            toast.success("Request cancelled successfully");
            setIsCancelModalOpen(false);
            window.location.reload(); // Refresh to get updated status
        } catch (error) {
            console.error("Error cancelling request:", error);
            toast.error("Failed to cancel request");
        }
    };

    const handleReportIssue = async () => {
        if (!reportDetails.trim()) {
            toast.error("Please provide details of the issue");
            return;
        }
        try {
            const requestRef = doc(db, "requests", id);
            // Optionally store reports in a separate collection, but for now we embed or add a field
            await updateDoc(requestRef, {
                hasIssue: true,
                issueDetails: reportDetails,
                updatedAt: new Date()
            });
            toast.success("Issue reported to admin successfully");
            setIsReportModalOpen(false);
        } catch (error) {
            console.error("Error reporting issue:", error);
            toast.error("Failed to report issue");
        }
    };

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
            case 'Declined': return -1; // Rejected
            case 'Rejected': return -1; 
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
                            {/* Alert for Rejected/Declined Requests */}
                            {(request.status === 'Declined' || request.status === 'Rejected') && (
                                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <span className="material-icons text-red-400">error</span>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-red-800">Request Declined by Provider</h3>
                                            <div className="mt-2 text-sm text-red-700">
                                                <p>The provider could not accept your request. Reason:</p>
                                                <p className="font-bold mt-1">"{request.rejectionReason || 'No reason provided'}"</p>
                                                <p className="mt-2">You can edit the request to address the feedback (e.g., adjust budget) and resubmit it.</p>
                                            </div>
                                            <div className="mt-4">
                                                <button
                                                    type="button"
                                                    onClick={() => navigate('/customer/post-request', { state: { request: request } })}
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                >
                                                    Edit & Resubmit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

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
                                    {request.status === 'Completed' && !request.review ? (
                                        <button 
                                            onClick={() => navigate(`/customer/service-review/${id}`)}
                                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                            type="button"
                                        >
                                            <span className="material-icons-outlined text-sm mr-2">star</span>
                                            Leave Review
                                        </button>
                                    ) : request.status === 'Declined' || request.status === 'Rejected' ? (
                                        <button 
                                            onClick={() => navigate('/customer/post-request', { state: { request: request } })}
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" 
                                            type="button"
                                        >
                                            Edit Request
                                        </button>
                                    ) : (
                                        <>
                                            <button 
                                                onClick={() => setIsReportModalOpen(true)}
                                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" type="button">
                                                Report Issue
                                            </button>
                                            {request.status !== 'Completed' && request.status !== 'Cancelled' && request.status !== 'Declined' && request.status !== 'Rejected' && (
                                                <button 
                                                    onClick={() => setIsCancelModalOpen(true)}
                                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" type="button">
                                                    Cancel Request
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                {/* Provider Profile Card */}
                                {(request.providerId && providerData) && (request.status !== 'Declined' && request.status !== 'Rejected') && (
                                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row items-center gap-6">
                                        <div className="size-20 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden">
                                            {providerData.photoURL || request.providerPhoto ? (
                                                <img src={providerData.photoURL || request.providerPhoto} alt={providerData.displayName || request.providerName} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="material-icons text-4xl text-gray-400 w-full h-full flex items-center justify-center">person</span>
                                            )}
                                        </div>
                                        <div className="flex-1 text-center md:text-left">
                                            <h3 className="text-lg font-bold text-gray-900">{providerData.displayName || request.providerName || 'Provider Assigned'}</h3>
                                            <div className="flex items-center justify-center md:justify-start gap-1 text-yellow-500 my-1">
                                                <span className="material-icons text-sm">star</span>
                                                <span className="text-sm font-bold text-gray-700">{providerData.rating ? Number(providerData.rating).toFixed(1) : 'New'}</span>
                                                <span className="text-xs text-gray-500">
                                                    (Verified Provider)
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500">Your task has been assigned to this provider.</p>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full md:w-auto">
                                            {providerData.phoneNumber || request.providerPhone ? (
                                                <a 
                                                    href={`tel:${providerData.phoneNumber || request.providerPhone}`}
                                                    className="inline-flex justify-center items-center px-4 py-2 border border-green-600 shadow-sm text-sm font-bold rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none w-full md:w-auto"
                                                >
                                                    <span className="material-icons text-sm mr-2">call</span>
                                                    {providerData.phoneNumber || request.providerPhone}
                                                </a>
                                            ) : (
                                                 <button 
                                                    className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none w-full md:w-auto"
                                                >
                                                    <span className="material-icons text-sm mr-2">chat</span>
                                                    Message
                                                </button>
                                            )}
                                            
                                            <button 
                                                onClick={() => navigate(`/customer/provider/${request.providerId}`)}
                                                className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none w-full md:w-auto"
                                            >
                                                View Profile
                                            </button>
                                        </div>
                                    </div>
                                )}

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

            {/* Cancel Request Modal */}
            {isCancelModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl relative animate-in fade-in zoom-in duration-200">
                        <button onClick={() => setIsCancelModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                            <span className="material-icons-outlined">close</span>
                        </button>
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                                <span className="material-icons-outlined">cancel</span>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Cancel Request</h2>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">Please let us know why you are cancelling this request. This action cannot be undone.</p>
                        <textarea
                            className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 mb-4 min-h-[100px]"
                            placeholder="Reason for cancellation..."
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                        />
                        <div className="flex gap-3 justify-end">
                            <button onClick={() => setIsCancelModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100">
                                Keep Request
                            </button>
                            <button onClick={handleCancelRequest} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">
                                Yes, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Report Issue Modal */}
            {isReportModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl relative animate-in fade-in zoom-in duration-200">
                        <button onClick={() => setIsReportModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                            <span className="material-icons-outlined">close</span>
                        </button>
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                                <span className="material-icons-outlined">report_problem</span>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Report an Issue</h2>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">Please describe the issue you're experiencing with this request. Our support team will review it shortly.</p>
                        <textarea
                            className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 mb-4 min-h-[120px]"
                            placeholder="Describe the issue in detail..."
                            value={reportDetails}
                            onChange={(e) => setReportDetails(e.target.value)}
                        />
                        <div className="flex gap-3 justify-end">
                            <button onClick={() => setIsReportModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100">
                                Dismiss
                            </button>
                            <button onClick={handleReportIssue} className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700">
                                Submit Report
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default RequestStatus;
