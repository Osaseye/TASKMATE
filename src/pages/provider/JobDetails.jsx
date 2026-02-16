import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import ProviderSidebar from '../../components/layout/ProviderSidebar';
import ProviderMobileNavBar from '../../components/layout/ProviderMobileNavBar';
import StatusUpdateModal from '../../components/provider/StatusUpdateModal';
import InvoiceUploadModal from '../../components/provider/InvoiceUploadModal';

const JobDetails = () => {
    const { id } = useParams();
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const [uploadedInvoice, setUploadedInvoice] = useState(null);
    
    // Initial Mock Data
    const [job, setJob] = useState({
        id: id || 'TM-9021',
        title: 'Plumbing Repair - Kitchen Sink',
        status: 'In Progress',
        statusCode: 'started', // on_way, arrived, started, parts, completed
        customer: {
            name: 'Chinedu Okafor',
            rating: 4.8,
            jobs: 24,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrv4vRS2hiNHUJozWi7RxLIotCZcYmy-bjGG1JVh6eXaEhPMVFwFgz0LkS4EaLA13I-wJw_fH-mWmfgP-DuK-70rzZdDuWxfT9TdyNWwOFhawUrI9j3to8z6Xg6-biOn3-pNEVbbQG2MrvLXevUMfxEcnhwOoMrZdIo8DLCNOArrCrhjP6CV3o67TUMztPX0G9d6I4c0sujMe1SOomLL55s4mm2eIbAjTi_o77i1DU51GlKLQnrOBx-gEL6zT-zRX2LT2OeGs08Lc'
        },
        location: {
            address: '14 Adetokunbo Ademola Street, Victoria Island, Lagos',
            mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFTeCZ7ERuk69xFuqaOWgMZHcJlq_jTGdw1hCAHjmLK9UKdoSn_DTOZW_CDNskGAjcgbh2Lpnxkp8FMMQCcHHTfZ2d0Z2crmboOvvy9udEUQqkFYtHwCggfKOWBhn0KU4QYT633pPyMSCIRZQCfi98ZeL5y39AgsG4UvdWDOR5z58atJ1PRNqSts0tZ81fBA8XjphM7YBaqzyEYzY7pl_BXVA1WYal3eumBdICSCBPC8mxd9cSPURf55_yPShCDa6XsAy_G_BY2_g'
        },
        description: 'The pipe under the kitchen sink is leaking heavily when the tap is turned on. It seems like the connection joint has come loose or the washer is damaged. Need urgent fix as the water is causing damage to the cabinet wood. Please bring replacement parts for a standard PVC trap.',
        photos: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDXwmJ6euTu5DX3olit3O-kLKqo--NMSGy4sYK211R2j1EwnXfZsRylFYmJ1MeAgz8bBNK8WNp0lZaBfZEkewWba3kEHfS2AupEpNl1pV_Pghll9KGUVGmvGH4MdLQY4oVs8Y50Ra7I0nEzggoHM5Wfdch1qDdrYDgZe11kIiSMbv6rIk4sRFe-Dq9KnLnAB6S6LhKmvMJHmBSlXqoypyHXhqypDvLkqB-JFwNPPwTKdt6oW1XrgP6xyKgW8QH5rfHzDE8x5FD0BOc',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAofPukpDZ4DTiUCIg06uyUoifZQc81ec6sKYar7tIGq9SXLxr8tf4Wl_z3LCThYuDpvBxFxIQLyvByhJ3ER3WHn2AwoarZ9O_HKuMcjD4TzcqMpSOCKZb4R9FQOpxopHJv1Kj2uMOKJStTvt3Q2SvavDbXeDVk1B6SDuM5PTDXzkXqsu6g7Ts1TSaaV1BzVzsTRo-jEzbQEUkzPODVaYgqPTPQh9B9ccQ5qQ0JDK6gG8DEyCFNVi0lrUeHL_JDGJ_TzTeSE91TiMA',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBlf6b71KhIc4XE4XnlUuykfFEFblZc_SPreMIwlnewazI1e7A5aX4L5S4DN4ZOJ8HAK_bTQ-Q7NpuEsi2o255vJ_9M3B0ji0fo44vlfHY_fBH5TMsC-JaZHLh4jprATvk-YiMkt5WftvzBBkfeiNK0qh36bbOlIQY4gXQ0Im1GOzsxL8h9NvF7phk6xU_7uHFhgmrChUovM-O9fdyXqRno0eZcbPV3Qq_4dMWXEOzPnwuschzvp8wYtO-CqsDxEgeDxsqzgfNf8C8'
        ],
        timeline: [
            { title: 'Request Accepted', time: 'Today, 10:00 AM', status: 'completed' },
            { title: 'Provider En Route', time: 'Today, 10:30 AM', status: 'completed' },
            { title: 'Work Started', time: '11:15 AM', status: 'current' },
            { title: 'Job Completed', time: 'Pending', status: 'upcoming' },
        ],
        pricing: {
            total: '₦12,500',
            method: 'Cash / Transfer'
        }
    });

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

    const handleStatusUpdate = (statusCode, note) => {
        setIsStatusModalOpen(false);
        const statusLabel = getStatusLabel(statusCode);
        const time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

        setJob(prev => {
            const newTimeline = prev.timeline.map(t => 
                t.status === 'current' ? { ...t, status: 'completed' } : t
            );
            
            // Add new timeline entry
            newTimeline.splice(newTimeline.length - 1, 0, {
                title: statusLabel,
                time: `Today, ${time}`,
                status: 'current'
            });

            return {
                ...prev,
                status: statusLabel,
                statusCode: statusCode,
                timeline: newTimeline
            };
        });

        toast.success(`Job status updated to: ${statusLabel}`, {
            description: note ? `Note added: ${note}` : 'Customer has been notified.'
        });
    };

    const handleInvoiceUpload = (file, amount) => {
        setIsInvoiceModalOpen(false);
        const time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

        setUploadedInvoice({ name: file?.name || 'Payment Record', amount, date: new Date().toLocaleDateString() });
        
        setJob(prev => ({
            ...prev,
            status: 'Completed',
            statusCode: 'completed',
            timeline: prev.timeline.map(t => {
                if (t.title === 'Job Completed') return { ...t, status: 'completed', time: `Today, ${time}` };
                return { ...t, status: 'completed' };
            })
        }));

         toast.success('Job Completed Successfully', {
            description: `Commission of ₦${(amount * 0.1).toLocaleString()} has been added to your outstanding balance.`
        });
    };

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
                                    <div className="aspect-square rounded-xl bg-gray-100 overflow-hidden group cursor-pointer relative flex items-center justify-center">
                                        <img className="w-full h-full object-cover opacity-60 filter blur-sm" src={job.photos[2]} alt="More photos" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">+1 more</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Location Map */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 flex flex-col">
                                <div className="p-6 pb-4">
                                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-gray-900">
                                        <span className="material-symbols-outlined text-primary">location_on</span>
                                        Location
                                    </h3>
                                    <p className="text-gray-700 text-base">
                                        {job.location.address}
                                    </p>
                                </div>
                                <div className="relative h-48 w-full bg-gray-100">
                                    <img 
                                        className="w-full h-full object-cover grayscale opacity-80" 
                                        src={job.location.mapImage} 
                                        alt="Map Location" 
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-primary/90 p-2 rounded-full shadow-lg border-2 border-white animate-bounce">
                                            <span className="material-symbols-outlined text-white text-2xl block">location_on</span>
                                        </div>
                                    </div>
                                    <button className="absolute bottom-3 right-3 bg-white text-gray-900 px-4 py-2 rounded-lg text-xs font-bold shadow-md hover:bg-gray-50 flex items-center gap-2 transition-transform active:scale-95">
                                        Open in Maps <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Action & Status (Span 1) */}
                        <div className="flex flex-col gap-6">
                            {/* Customer Profile Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="size-14 rounded-full bg-gray-100 overflow-hidden ring-2 ring-primary/20">
                                        <img className="w-full h-full object-cover" src={job.customer.image} alt={job.customer.name} />
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-1">
                                            {job.customer.name}
                                            <span className="material-symbols-outlined text-blue-500 text-[16px]" title="Verified Customer">verified</span>
                                        </h3>
                                        <div className="flex items-center gap-1 text-sm">
                                            <span className="material-symbols-outlined text-yellow-400 text-[18px] fill-current">star</span>
                                            <span className="font-semibold text-gray-900">{job.customer.rating}</span>
                                            <span className="text-gray-500">({job.customer.jobs} jobs)</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-gray-700 font-medium text-sm">
                                    <span className="material-symbols-outlined text-[18px]">chat</span>
                                    Message Customer
                                </button>
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
        </div>
    );
};

export default JobDetails;
