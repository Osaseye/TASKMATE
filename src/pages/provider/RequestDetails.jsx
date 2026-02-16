import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProviderSidebar from '../../components/layout/ProviderSidebar';
import ProviderMobileNavBar from '../../components/layout/ProviderMobileNavBar';
import Breadcrumbs from '../../components/ui/Breadcrumbs';

const RequestDetails = () => {
    const { id } = useParams();
    const [isAccepted, setIsAccepted] = useState(false);

    // Mock Data based on ID (In a real app, fetch from API)
    const request = {
        id: id || 'REQ-001',
        title: 'Generator Repair',
        customer: 'Mr. David Okonkwo',
        location: '12 Admiralty Way, Lekki Phase 1, Lagos',
        distance: '2.5km away',
        priceRange: '₦15,000 - ₦25,000',
        description: 'My 5KVA generator is making a loud noise and smoking. Need someone to check the carburetor and maybe service it completely. Please bring necessary tools.',
        urgency: 'High',
        postedTime: '2 hours ago',
        images: [
            '/api/placeholder/400/300', 
            '/api/placeholder/400/300'
        ]
    };

    const breadcrumbItems = [
        { label: 'Dashboard', href: '/provider/dashboard' },
        { label: 'Requests', href: '/provider/requests' },
        { label: `View Request #${request.id}`, href: '#' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-text-light">
            <ProviderSidebar />
            <ProviderMobileNavBar />

            <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
                {/* Header */}
                 <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
                    <div className="flex items-center gap-2">
                        <Link to="/provider/dashboard" className="md:hidden p-1 -ml-2 text-gray-500">
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
                                    <h2 className="text-2xl font-bold text-gray-900">{request.title}</h2>
                                    <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full uppercase tracking-wide">
                                        {request.urgency} Priority
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-2 text-gray-500 mb-6">
                                    <span className="material-symbols-outlined text-lg">schedule</span>
                                    <span className="text-sm">Posted {request.postedTime}</span>
                                    <span className="mx-2">•</span>
                                    <span className="material-symbols-outlined text-lg">location_on</span>
                                    <span className="text-sm">{request.distance}</span>
                                </div>

                                <div className="prose prose-sm max-w-none text-gray-600">
                                    <h3 className="text-gray-900 font-semibold mb-2">Description</h3>
                                    <p className="leading-relaxed">{request.description}</p>
                                </div>

                                {/* Images Preview Mock */}
                                <div className="mt-6 grid grid-cols-2 gap-4">
                                   <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                                        <span className="material-symbols-outlined">image</span>
                                   </div>
                                   <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                                        <span className="material-symbols-outlined">image</span>
                                   </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar/Action Card */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
                                <div className="text-center mb-6">
                                    <p className="text-sm text-gray-500 mb-1">Estimated Budget</p>
                                    <p className="text-3xl font-bold text-primary">{request.priceRange}</p>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                            <span className="material-symbols-outlined text-gray-500">person</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{request.customer}</p>
                                            <p className="text-xs text-gray-500">4.8 ★ (12 Reviews)</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                                        <span className="material-symbols-outlined text-gray-400 mt-0.5">map</span>
                                        <p className="text-sm text-gray-600 leading-snug">{request.location}</p>
                                    </div>
                                </div>

                                {!isAccepted ? (
                                    <div className="grid grid-cols-1 gap-3">
                                        <button 
                                            onClick={() => setIsAccepted(true)}
                                            className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                                        >
                                            Accept Job
                                        </button>
                                        <button className="w-full py-3 bg-white text-gray-700 font-bold border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                                            Decline
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center py-4 bg-green-50 rounded-xl border border-green-100">
                                        <span className="material-symbols-outlined text-green-600 text-3xl mb-2">check_circle</span>
                                        <p className="text-green-800 font-bold">Job Accepted!</p>
                                        <p className="text-xs text-green-600 mt-1">Check your schedule for details.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                 </div>
            </main>
        </div>
    );
};

export default RequestDetails;
