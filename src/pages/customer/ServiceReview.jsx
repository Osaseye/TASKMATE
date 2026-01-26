import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import MobileNavBar from '../../components/layout/MobileNavBar';

const ServiceReview = () => {
    return (
        <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
            <Sidebar />
            
            <main className="flex-1 overflow-hidden flex flex-col min-w-0">
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <div className="text-center space-y-4">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                                <span className="material-icons-outlined text-4xl text-green-600">check_circle</span>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900">Service Completed!</h1>
                            <p className="text-lg text-gray-500 max-w-lg mx-auto">
                                Your plumbing repair service has been marked as complete. Please review the summary and rate your experience.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-1 space-y-6">
                                <div className="bg-white shadow rounded-2xl overflow-hidden border border-gray-100">
                                    <div className="p-6">
                                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Job Summary</h3>
                                        <div className="flex items-start space-x-4 mb-6">
                                            <img alt="Provider" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAJ1iNTEkALEAtX8-GML3QtWOrsP9Zq9oakd62z8pcI2_TSIMBy1ialnReulFWYMee6-1PrfVUUIPidxZB0efKdJELhiHt5Wk5EYSq40_3svfAfesXt514p1MV-4GLCB_doQBAYPYSYJIgwws3emy5jMLlWVFBytbpAJXTHY_KHQQqBVN-qV77WL0-WNBqrLlaNBd8hFB4cFCw1z5kRMK0zDbkkK50cTES5YUoKGHAMiVyxAaVpTtH3xdujxEGZ5gr9I1-VCCcVxU"/>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">Emmanuel Okafor</p>
                                                <p className="text-xs text-gray-500 flex items-center">
                                                    <span className="material-icons-outlined text-yellow-500 text-sm mr-1">star</span> 4.8 (124 jobs)
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-xs text-gray-500">Service Type</p>
                                                <p className="font-medium text-gray-900">Plumbing Repair</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Date</p>
                                                <p className="font-medium text-gray-900">Oct 24, 2023</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Duration</p>
                                                <p className="font-medium text-gray-900">2 hrs 30 mins</p>
                                            </div>
                                            <div className="pt-3 border-t border-gray-100">
                                                <p className="text-xs text-gray-500">Total Amount</p>
                                                <p className="text-2xl font-bold text-green-600">₦15,000</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center">
                                        <span className="text-xs font-medium text-gray-500">Invoice #INV-2023-001</span>
                                        <a className="text-xs font-medium text-green-600 hover:text-green-700" href="#">View Invoice</a>
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <div className="bg-white shadow rounded-2xl p-6 sm:p-8 border border-gray-100 h-full">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">Rate & Review</h2>
                                    <form className="space-y-6">
                                        <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl mb-6 border border-gray-100">
                                            <label className="block text-sm font-medium text-gray-700 mb-3">How would you rate the service?</label>
                                            <div className="flex flex-row gap-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button key={star} type="button" className="focus:outline-none">
                                                        <span className={`material-icons-outlined text-4xl ${star <= 4 ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}>star</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">What went well?</label>
                                            <div className="flex flex-wrap gap-2">
                                                {['Punctuality', 'Professionalism', 'Quality of Work', 'Communication'].map((tag) => (
                                                    <label key={tag} className="cursor-pointer">
                                                        <input className="peer sr-only" type="checkbox"/>
                                                        <span className="px-3 py-1.5 rounded-full text-sm border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 peer-checked:bg-green-50 peer-checked:text-green-700 peer-checked:border-green-200 transition-all select-none">
                                                            {tag}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="feedback">Share your experience</label>
                                            <div className="mt-1">
                                                <textarea className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md p-3 border outline-none" id="feedback" name="feedback" placeholder="Tell us more about the service provided..." rows="4"></textarea>
                                            </div>
                                            <p className="mt-2 text-xs text-gray-500">Your review helps others in the TaskMate community.</p>
                                        </div>
                                        
                                        <div className="border-t border-gray-100 pt-6">
                                            <label className="block text-sm font-medium text-gray-700 mb-3">Add a tip (Optional)</label>
                                            <div className="flex gap-3">
                                                <button className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" type="button">₦500</button>
                                                <button className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" type="button">₦1,000</button>
                                                <button className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" type="button">₦2,000</button>
                                            </div>
                                        </div>
                                        
                                        <div className="pt-4">
                                            <button className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors" type="submit">
                                                Submit Review
                                            </button>
                                            <div className="mt-4 text-center">
                                                <Link to="/dashboard" className="text-sm text-gray-500 hover:text-gray-900 underline">Skip feedback</Link>
                                            </div>
                                        </div>
                                    </form>
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

export default ServiceReview;
