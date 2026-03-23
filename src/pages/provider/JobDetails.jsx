import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { doc, onSnapshot, updateDoc, arrayUnion, Timestamp, increment, getDoc, collection, query, where, getCountFromServer } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../context/AuthContext';
import ProviderSidebar from '../../components/layout/ProviderSidebar';
import ProviderMobileNavBar from '../../components/layout/ProviderMobileNavBar';
import StatusUpdateModal from '../../components/provider/StatusUpdateModal';
import InvoiceUploadModal from '../../components/provider/InvoiceUploadModal';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const JobDetails = () => {
    const { id } = useParams();
    const { currentUser } = useAuth();
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const [uploadedInvoice, setUploadedInvoice] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const [job, setJob] = useState(null);
    const [customerProfile, setCustomerProfile] = useState(null);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    useEffect(() => {
        if (!id) return;
        
        const unsubscribe = onSnapshot(doc(db, "requests", id), async (docSnapshot) => {
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                
                let customerData = {
                    name: data.customerName || 'Customer',
                    image: data.customerPhoto || '',
                    phone: data.customerPhone || null,
                    jobs: 0 // Default
                };

                // Fetch real customer data if ID exists
                if (data.customerId) {
                    try {
                        const userDoc = await getDoc(doc(db, "users", data.customerId));
                        if (userDoc.exists()) {
                            const uData = userDoc.data();
                            customerData.name = uData.displayName || customerData.name;
                            customerData.image = uData.photoURL || customerData.image;
                            customerData.phone = uData.phoneNumber || customerData.phone;
                            
                            // Get Completed Jobs Count
                            const jobsQuery = query(
                                collection(db, "requests"), 
                                where("customerId", "==", data.customerId),
                                where("status", "==", "Completed")
                            );
                            const snapshot = await getCountFromServer(jobsQuery);
                            customerData.jobs = snapshot.data().count;

                            setCustomerProfile({
                                ...uData,
                                id: userDoc.id,
                                completedJobs: snapshot.data().count
                            });
                        }
                    } catch (err) {
                        console.error("Error fetching customer details:", err);
                    }
                }

                setJob({
                    id: docSnapshot.id,
                    ...data,
                    // Ensure timeline exists
                    timeline: data.timeline || [
                         { title: 'Request Received', time: data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleString() : '---', status: 'completed' },
                         { title: 'Provider Assigned', time: '---', status: 'current' }
                    ],
                    customer: customerData,
                    location: {
                        address: data.location || '---',
                        mapImage: '' 
                    },
                    pricing: {
                        total: data.budget || '---',
                        method: 'Cash'
                    },
                    statusCode: data.status ? data.status.toLowerCase().replace(' ', '_') : 'pending' 
                });
            } else {
                toast.error("Job request not found");
            }
            setLoading(false);
        }, (error) => {
            console.error("Error fetching job:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [id]);

    const getStatusLabel = (code) => {
        switch(code) {
            case 'on_way': return 'On the way';
            case 'arrived': return 'Arrived';
            case 'started': return 'In Progress';
            case 'parts': return 'Paused (Parts)';
            case 'completed': return 'Completed';
            default: return 'Active';
        }
    };

    const handleStatusUpdate = async (statusCode, note) => {
        setIsStatusModalOpen(false);
        const statusLabel = getStatusLabel(statusCode);
        const time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        
        try {
            const jobRef = doc(db, "requests", id);
            
            // Construct new timeline entry
            const newEntry = {
                title: statusLabel,
                time: `Today, ${time}`,
                status: 'current'
            };

            await updateDoc(jobRef, {
                status: statusLabel,
                statusCode: statusCode, // We should store this in Firestore too if needed
                timeline: arrayUnion(newEntry)
                // Note: Updating previous timeline items to 'completed' happens in logic, 
                // but with arrayUnion we just append. To mark others as completed we'd need to rewrite the whole array.
                // For simplicity here we just modify local state or re-fetch.
                // But let's actually update the whole timeline if we want consistency.
            });
            
            // To update previous timeline items, we should ideally read the current timeline, modify it, and write it back.
            // Since onSnapshot will update specific fields, let's just do a full timeline rewrite if we have the job object.
            if (job && job.timeline) {
                const updatedTimeline = job.timeline.map(t => 
                   t.status === 'current' ? { ...t, status: 'completed' } : t
                );
                updatedTimeline.push(newEntry);
                
                await updateDoc(jobRef, {
                    timeline: updatedTimeline,
                    status: statusLabel
                });
            }

            toast.success(`Job status updated to: ${statusLabel}`, {
                description: note ? `Note added: ${note}` : 'Customer has been notified.'
            });

        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update status");
        }
    };

    const applyCommissionCharge = async (amount) => {
        if (!currentUser) return;
        const commission = amount * 0.1; // 10%
        try {
            const userRef = doc(db, "users", currentUser.uid);
            await updateDoc(userRef, {
                commissionBalance: increment(commission),
                earnings: increment(amount - commission), 
                completedJobs: increment(1)
            });
            console.log(`Commission of ${commission} applied.`);
        } catch (error) {
            console.error("Error applying commission:", error);
            toast.error("Failed to update commission balance");
        }
    };

    const handleInvoiceUpload = async (file, amount) => {
        setIsInvoiceModalOpen(false);
        const time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        
        try {
              // 1. Upload Invoice File (TODO: Actual Storage Upload)
              // const invoiceUrl = await uploadFile(file);
              
              // 2. Add Commission Logic
              await applyCommissionCharge(Number(amount));

              // 3. Update Job
              const jobRef = doc(db, "requests", id);
              
              await updateDoc(jobRef, {
                  status: 'Completed',
                  completedAt: new Date(),
                  finalAmount: amount,
                  commission: amount * 0.1,
                  invoiceUploaded: true
                  // Update timeline...
              });

              setUploadedInvoice({ name: file?.name || 'Payment Record', amount, date: new Date().toLocaleDateString() });

              toast.success('Job Completed Successfully', {
                description: `Commission of ₦${(amount * 0.1).toLocaleString()} has been added to your outstanding balance.`
            });
        } catch (error) {
             console.error("Error completing job:", error);
             toast.error("Failed to update job");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
            </div>
        );
    }
    
    if (!job) {
         return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p>Job not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-text-light">
            <ProviderSidebar />
            <ProviderMobileNavBar />
            
            <StatusUpdateModal 
                isOpen={isStatusModalOpen}
                onClose={() => setIsStatusModalOpen(false)}
                onUpdate={handleStatusUpdate}
                currentStatus={job.statusCode} 
            />
            
            <InvoiceUploadModal 
                isOpen={isInvoiceModalOpen}
                onClose={() => setIsInvoiceModalOpen(false)}
                onUpload={handleInvoiceUpload}
            />

            <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-20">
                    <div className="flex items-center gap-2">
                        <Link to="/provider/jobs" className="md:hidden p-1 -ml-2 text-gray-500">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </Link>
                        <h1 className="text-xl font-semibold text-gray-800">Job Details</h1>
                    </div>
                </header>

                <div className="p-4 md:p-8 max-w-7xl mx-auto">
                    {/* Breadcrumbs */}
                    <div className="flex flex-wrap gap-2 mb-6 text-sm">
                        <Link to="/provider/dashboard" className="text-gray-500 hover:text-primary transition-colors">Dashboard</Link>
                        <span className="text-gray-400">/</span>
                        <Link to="/provider/jobs" className="text-gray-500 hover:text-primary transition-colors">My Jobs</Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 font-medium">Job #{job.id}</span>
                    </div>

                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl md:text-4xl font-black leading-tight text-gray-900">
                                {job.title}
                            </h1>
                            <p className="text-gray-500 font-normal flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">tag</span>
                                Job ID: #{job.id}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold border ${
                                job.statusCode === 'completed' 
                                ? 'bg-green-100 text-green-700 border-green-200' 
                                : 'bg-blue-100 text-blue-700 border-blue-200'
                            }`}>
                                {job.statusCode !== 'completed' && <span className="size-2 rounded-full bg-blue-500 animate-pulse"></span>}
                                {job.status}
                            </span>
                        </div>
                    </div>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Job Context (Span 2) */}
                        <div className="lg:col-span-2 flex flex-col gap-8">
                            {/* Description Section */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                                    <span className="material-symbols-outlined text-primary">description</span>
                                    Issue Description
                                </h3>
                                <p className="text-gray-700 leading-relaxed text-base">
                                    {job.description}
                                </p>
                            </div>

                            {/* Photos Section */}
                            {job.photos && job.photos.length > 0 && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                                    <span className="material-symbols-outlined text-primary">image</span>
                                    Job Photos
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {job.photos.slice(0, 2).map((photo, index) => (
                                        <div key={index} className="aspect-square rounded-xl bg-gray-100 overflow-hidden group cursor-pointer relative shadow-inner">
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                                            <img className="w-full h-full object-cover" src={photo} alt={`Job proof ${index + 1}`} />
                                        </div>
                                    ))}
                                    {job.photos.length > 2 && (
                                    <div className="aspect-square rounded-xl bg-gray-100 overflow-hidden group cursor-pointer relative flex items-center justify-center">
                                        <img className="w-full h-full object-cover opacity-60 filter blur-sm" src={job.photos[2]} alt="More photos" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">+{job.photos.length - 2} more</span>
                                        </div>
                                    </div>
                                    )}
                                </div>
                            </div>
                            )}

                            {/* Location Map */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 flex flex-col">
                                <div className="p-6 pb-4">
                                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-gray-900">
                                        <span className="material-symbols-outlined text-primary">location_on</span>
                                        Location
                                    </h3>
                                    <p className="text-gray-700 text-base">
                                        {typeof job.location === 'string' ? job.location : job.location?.address || 'No location provided'}
                                    </p>
                                </div>
                                <div className="relative h-64 w-full bg-gray-100 z-0">
                                    {(job.coordinates || (job.location && typeof job.location !== 'string' && job.location.lat)) ? (
                                        <MapContainer 
                                            center={job.coordinates ? [job.coordinates.lat, job.coordinates.lng] : [job.location.lat, job.location.lng]} 
                                            zoom={13} 
                                            style={{ height: '100%', width: '100%', zIndex: 0 }}
                                        >
                                            <TileLayer
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            />
                                            <Marker position={job.coordinates ? [job.coordinates.lat, job.coordinates.lng] : [job.location.lat, job.location.lng]}>
                                                <Popup>
                                                    Service Location
                                                </Popup>
                                            </Marker>
                                        </MapContainer>
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400">
                                            <span className="material-symbols-outlined text-4xl">map</span>
                                            <span className="ml-2">Map not available</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Action & Status (Span 1) */}
                        <div className="flex flex-col gap-6">
                            {/* Customer Profile Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="size-14 rounded-full bg-gray-100 overflow-hidden ring-2 ring-primary/20">
                                        {job.customer.image ? (
                                            <img className="w-full h-full object-cover" src={job.customer.image} alt={job.customer.name} />
                                        ) : (
                                            <span className="material-symbols-outlined text-3xl text-gray-400 w-full h-full flex items-center justify-center">person</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-1">
                                            {job.customer.name}
                                            <span className="material-symbols-outlined text-blue-500 text-[16px]" title="Verified Customer">verified</span>
                                        </h3>
                                        <p className={`text-sm font-medium ${job.customer.jobs > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                                            {job.customer.jobs} Tasks Completed
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    {job.customer.phone ? (
                                        <a 
                                            href={`tel:${job.customer.phone}`}
                                            className="w-full py-2.5 rounded-xl bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors flex items-center justify-center gap-2 font-bold text-sm"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">call</span>
                                            {job.customer.phone}
                                        </a>
                                    ) : (
                                        <button disabled className="w-full py-2.5 rounded-xl bg-gray-50 text-gray-400 border border-gray-200 cursor-not-allowed flex items-center justify-center gap-2 font-medium text-sm">
                                            <span className="material-symbols-outlined text-[18px]">no_cell</span>
                                            No Phone Number
                                        </button>
                                    )}

                                    <button 
                                        onClick={() => setIsProfileModalOpen(true)}
                                        className="w-full py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-gray-700 font-medium text-sm"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                                        View Profile
                                    </button>
                                </div>
                            </div>


                            {/* Timeline */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                <h3 className="text-lg font-bold mb-6 text-gray-900">Job Timeline</h3>
                                <div className="relative pl-4 border-l-2 border-gray-100 space-y-8">
                                    {job.timeline.map((step, idx) => (
                                        <div key={idx} className="relative">
                                            <div className={`absolute -left-[21px] top-1 rounded-full size-4 border-4 border-white ${
                                                step.status === 'completed' ? 'bg-primary' : 
                                                step.status === 'current' ? 'bg-primary animate-pulse shadow-[0_0_0_4px_rgba(19,236,91,0.2)]' : 
                                                'bg-gray-200'
                                            }`}></div>
                                            <div className={`flex flex-col ${step.status === 'upcoming' ? 'opacity-50' : ''}`}>
                                                <p className={`text-sm font-bold ${step.status === 'current' ? 'text-primary' : 'text-gray-900'}`}>{step.title}</p>
                                                <p className="text-xs text-gray-500">{step.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Financials & Actions */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col gap-4">
                                <div className="flex justify-between items-end pb-4 border-b border-gray-100">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Est. Total</span>
                                        <span className="text-2xl font-black text-primary">{job.pricing.total}</span>
                                    </div>
                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 font-medium">{job.pricing.method}</span>
                                </div>
                                <div className="flex flex-col gap-3 pt-2">
                                    {job.statusCode !== 'completed' && (
                                        <button 
                                            onClick={() => setIsStatusModalOpen(true)}
                                            className="w-full py-3 rounded-xl bg-primary hover:bg-green-400 transition-colors text-black font-bold text-sm shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transform active:scale-[0.98]"
                                        >
                                            <span>Update Status</span>
                                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                        </button>
                                    )}
                                    
                                    {job.statusCode === 'completed' ? (
                                        <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex flex-col items-start gap-1">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-green-600 text-lg">check_circle</span>
                                                <p className="text-sm font-bold text-green-900">Job & Payment Completed</p>
                                            </div>
                                            {uploadedInvoice && (
                                                <p className="text-xs text-green-700 pl-7">
                                                    Commission Deducted: <span className="font-bold">₦{(uploadedInvoice.amount * 0.1).toLocaleString()}</span>
                                                </p>
                                            )}
                                        </div>
                                    ) : (
                                        <button 
                                            onClick={() => setIsInvoiceModalOpen(true)}
                                            className="w-full py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-gray-700 font-semibold text-sm flex items-center justify-center gap-2"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">payments</span>
                                            Record Payment & Complete
                                        </button>
                                    )}

                                    {job.statusCode !== 'completed' && (
                                        <button className="w-full py-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors font-medium text-sm mt-2">
                                            Report Issue
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {isProfileModalOpen && customerProfile && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl relative animate-in fade-in zoom-in duration-200">
                        <button 
                            onClick={() => setIsProfileModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                        
                        <div className="flex flex-col items-center text-center">
                            <div className="size-24 rounded-full bg-gray-100 overflow-hidden ring-4 ring-primary/20 mb-4">
                                {customerProfile.photoURL || customerProfile.image ? (
                                    <img className="w-full h-full object-cover" src={customerProfile.photoURL || customerProfile.image} alt={customerProfile.displayName || customerProfile.name} />
                                ) : (
                                    <span className="material-symbols-outlined text-5xl text-gray-400 w-full h-full flex items-center justify-center">person</span>
                                )}
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                                {customerProfile.displayName || customerProfile.name || 'Customer'}
                            </h3>
                            <p className="text-sm text-gray-500 mb-6">TaskMate Customer</p>
                            
                            <div className="w-full grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-gray-50 p-3 rounded-xl">
                                    <p className="text-xl font-bold text-gray-900">{customerProfile.completedJobs || 0}</p>
                                    <p className="text-xs text-gray-500 font-medium">Tasks Done</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-xl">
                                    <p className="text-xl font-bold text-gray-900">Active</p>
                                    <p className="text-xs text-gray-500 font-medium">Status</p>
                                </div>
                            </div>

                            <div className="w-full space-y-3">
                                {(customerProfile.phoneNumber || customerProfile.phone) && (
                                     <a href={`tel:${customerProfile.phoneNumber || customerProfile.phone}`} className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined">call</span>
                                        Call {customerProfile.phoneNumber || customerProfile.phone}
                                     </a>
                                )}
                                <button 
                                    onClick={() => setIsProfileModalOpen(false)}
                                    className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobDetails;
