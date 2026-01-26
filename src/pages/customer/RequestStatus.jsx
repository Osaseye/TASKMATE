import React from 'react';
import Sidebar from '../../components/layout/Sidebar';
import MobileNavBar from '../../components/layout/MobileNavBar';

const RequestStatus = () => {
    return (
        <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
            <Sidebar />
            
            <main className="flex-1 overflow-hidden flex flex-col min-w-0">
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-8">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                                        Plumbing Repair - Kitchen Sink
                                    </h1>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Order ID: #TM-84920 • Placed on Oct 24, 2023
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
                                    <h2 className="text-lg font-medium text-gray-900 mb-6">Request Status</h2>
                                    <div className="relative pl-4">
                                        <div className="absolute left-7 top-0 bottom-6 w-0.5 bg-gray-200 -z-10"></div>
                                        
                                        {/* Status 1: Received */}
                                        <div className="flex items-start mb-8 relative">
                                            <div className="flex-shrink-0 mr-4">
                                                <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center ring-4 ring-white z-10">
                                                    <span className="material-icons-outlined text-white text-sm">check</span>
                                                </div>
                                            </div>
                                            <div className="flex-grow pt-0.5">
                                                <h3 className="text-sm font-semibold text-gray-900">Request Sent</h3>
                                                <p className="text-sm text-gray-500 mt-1">Your request has been received and is being processed.</p>
                                                <span className="text-xs text-gray-400 mt-1 block">Oct 24, 10:30 AM</span>
                                            </div>
                                        </div>

                                        {/* Status 2: Provider Assigned */}
                                        <div className="flex items-start mb-8 relative">
                                            <div className="flex-shrink-0 mr-4">
                                                <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center ring-4 ring-white z-10">
                                                    <span className="material-icons-outlined text-white text-sm">check</span>
                                                </div>
                                            </div>
                                            <div className="flex-grow pt-0.5">
                                                <h3 className="text-sm font-semibold text-gray-900">Provider Assigned</h3>
                                                <p className="text-sm text-gray-500 mt-1">Emmanuel Okafor has accepted your request.</p>
                                                <span className="text-xs text-gray-400 mt-1 block">Oct 24, 11:15 AM</span>
                                                <div className="mt-3 flex items-center p-3 border border-gray-200 rounded-md bg-gray-50">
                                                    <img alt="Provider Avatar" className="h-10 w-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAJ1iNTEkALEAtX8-GML3QtWOrsP9Zq9oakd62z8pcI2_TSIMBy1ialnReulFWYMee6-1PrfVUUIPidxZB0efKdJELhiHt5Wk5EYSq40_3svfAfesXt514p1MV-4GLCB_doQBAYPYSYJIgwws3emy5jMLlWVFBytbpAJXTHY_KHQQqBVN-qV77WL0-WNBqrLlaNBd8hFB4cFCw1z5kRMK0zDbkkK50cTES5YUoKGHAMiVyxAaVpTtH3xdujxEGZ5gr9I1-VCCcVxU"/>
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-gray-900">Emmanuel Okafor</p>
                                                        <div className="flex items-center">
                                                            <span className="material-icons-outlined text-yellow-500 text-xs">star</span>
                                                            <span className="text-xs text-gray-500 ml-1">4.8 (124 jobs)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status 3: Work in Progress */}
                                        <div className="flex items-start mb-8 relative">
                                            <div className="flex-shrink-0 mr-4">
                                                <div className="h-6 w-6 rounded-full bg-white border-2 border-green-500 flex items-center justify-center ring-4 ring-white z-10 animate-pulse">
                                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                                                </div>
                                            </div>
                                            <div className="flex-grow pt-0.5">
                                                <h3 className="text-sm font-semibold text-green-600">Work in Progress</h3>
                                                <p className="text-sm text-gray-500 mt-1">Provider is currently working on your request.</p>
                                                <span className="text-xs text-green-600 font-medium mt-1 block">Ongoing</span>
                                            </div>
                                        </div>

                                        {/* Status 4: Completed (Future) */}
                                        <div className="flex items-start relative">
                                            <div className="flex-shrink-0 mr-4">
                                                <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center ring-4 ring-white z-10">
                                                    <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                                                </div>
                                            </div>
                                            <div className="flex-grow pt-0.5">
                                                <h3 className="text-sm font-medium text-gray-400">Completed</h3>
                                                <p className="text-sm text-gray-400 mt-1">Job finished and payment processed.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="lg:col-span-1 space-y-6">
                                <div className="bg-white shadow rounded-lg p-6">
                                    <h2 className="text-lg font-medium text-gray-900 mb-4">Job Details</h2>
                                    <dl className="grid grid-cols-1 gap-y-6">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Service Type</dt>
                                            <dd className="mt-1 text-sm text-gray-900">Plumbing</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Estimated Cost</dt>
                                            <dd className="mt-1 text-sm text-gray-900">₦ 15,000 - ₦ 20,000</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Description</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                Kitchen sink is leaking from the bottom pipe. The water pressure is low as well. Need urgent fix before evening.
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Address</dt>
                                            <dd className="mt-1 text-sm text-gray-900 flex items-start">
                                                <span className="material-icons-outlined text-gray-400 mr-1 text-sm mt-0.5">location_on</span>
                                                Block 4, Flat 12, Lekki Gardens Phase 2, Lagos
                                            </dd>
                                        </div>
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
