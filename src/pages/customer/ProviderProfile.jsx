import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import MobileNavBar from '../../components/layout/MobileNavBar';

const ProviderProfile = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('About');

    // MOCK DATA
    const provider = {
        name: "Abubakar Musa",
        role: "Professional Electrician",
        verified: true,
        location: "Ikeja, Lagos",
        distance: "2.5km away",
        avatar: "https://i.pravatar.cc/300?u=a042581f4e29026704d",
        coverImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop",
        rating: 4.9,
        reviewCount: 142,
        jobsCompleted: 315,
        hourlyRate: "₦4,500",
        about: "Certified electrical engineer with over 10 years of experience in residential and commercial installations. Specializing in fault finding, rewiring, and smart home setups. I prioritize safety and adhere strictly to regulations.",
        skills: ["Fault Finding", "Rewiring", "Smart Home", "CCTV Installation", "Generator Repair"],
        reviews: [
            { user: "Tunde B.", rating: 5, date: "2 days ago", text: "Excellent service! Fixed my generator in no time. Very professional." },
            { user: "Chioma A.", rating: 4, date: "1 week ago", text: "Good work, but arrived 15 mins late. The repair was perfect though." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1558402529-d2638a7023e9?w=500&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1544724569-5f546fd6dd2d?w=500&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=500&auto=format&fit=crop&q=60"
        ]
    };

    return (
        <div className="flex h-screen bg-[#F8F9FA] font-sans text-gray-900">
            <Sidebar />
            
            <main className="flex-1 overflow-hidden flex flex-col min-w-0">
                <div className="flex-1 overflow-y-auto pb-24 relative">
                    
                    {/* Hero Banner */}
                    <div className="h-72 w-full relative">
                        <img src={provider.coverImage} alt="Cover" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-90"></div>
                        
                        <div className="absolute top-6 left-6 z-10">
                            <Link to="/customer/browse" className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-white/30 transition-all border border-white/10 text-sm font-medium">
                                <span className="material-icons-outlined text-sm">arrow_back</span>
                                Back
                            </Link>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
                        <div className="flex flex-col lg:flex-row gap-8">
                            
                            {/* Left Column (Main Info) */}
                            <div className="flex-1 min-w-0">
                                {/* Profile Card */}
                                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 md:p-8 border border-white">
                                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                                        <div className="relative shrink-0">
                                            <img src={provider.avatar} alt={provider.name} className="w-32 h-32 rounded-2xl object-cover shadow-lg border-4 border-white" />
                                            {provider.verified && (
                                                <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-1.5 rounded-full border-4 border-white shadow-sm" title="Verified Provider">
                                                    <span className="material-icons-outlined text-sm block">verified</span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="flex-1 min-w-0 pt-2">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div>
                                                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{provider.name}</h1>
                                                    <p className="text-gray-500 font-medium">{provider.role}</p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-right">
                                                        <div className="text-2xl font-bold text-gray-900">{provider.rating}</div>
                                                        <div className="text-xs text-gray-400 font-medium">Rating</div>
                                                    </div>
                                                    <div className="w-px h-8 bg-gray-200"></div>
                                                    <div className="text-right">
                                                        <div className="text-2xl font-bold text-gray-900">{provider.jobsCompleted}</div>
                                                        <div className="text-xs text-gray-400 font-medium">Jobs</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 mt-6 text-sm text-gray-500">
                                                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">
                                                    <span className="material-icons-outlined text-gray-400 text-lg">location_on</span>
                                                    {provider.location}
                                                </div>
                                                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">
                                                    <span className="material-icons-outlined text-gray-400 text-lg">near_me</span>
                                                    {provider.distance}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tabs */}
                                    <div className="flex items-center gap-8 mt-10 border-b border-gray-100">
                                        {['About', 'Reviews', 'Portfolio'].map((tab) => (
                                            <button 
                                                key={tab}
                                                onClick={() => setActiveTab(tab)}
                                                className={`pb-4 text-sm font-bold border-b-2 transition-all ${
                                                    activeTab === tab 
                                                    ? 'border-green-600 text-green-600' 
                                                    : 'border-transparent text-gray-400 hover:text-gray-600'
                                                }`}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="mt-8">
                                        {activeTab === 'About' && (
                                            <div className="space-y-8 animate-fade-in">
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 mb-3">Biography</h3>
                                                    <p className="text-gray-600 leading-relaxed">{provider.about}</p>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 mb-3">Skills & Expertise</h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {provider.skills.map((skill, idx) => (
                                                            <span key={idx} className="px-4 py-2 bg-gray-50 text-gray-700 rounded-xl text-sm font-semibold border border-gray-100">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === 'Reviews' && (
                                            <div className="space-y-4 animate-fade-in">
                                                {provider.reviews.map((review, idx) => (
                                                    <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="font-bold text-gray-900">{review.user}</div>
                                                            <span className="text-xs text-gray-400">{review.date}</span>
                                                        </div>
                                                        <div className="flex items-center mb-2 text-yellow-500">
                                                            {[...Array(5)].map((_, i) => (
                                                                <span key={i} className="material-icons-outlined text-sm">
                                                                    {i < review.rating ? 'star' : 'star_border'}
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <p className="text-gray-600 text-sm">{review.text}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {activeTab === 'Portfolio' && (
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-fade-in">
                                                {provider.portfolio.map((img, idx) => (
                                                    <img key={idx} src={img} alt="Work" className="rounded-xl w-full h-40 object-cover hover:scale-[1.02] transition-transform cursor-pointer shadow-sm" />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column (Booking Request) */}
                            <div className="lg:w-96 shrink-0 space-y-6">
                                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 border border-white sticky top-6">
                                    <div className="flex items-baseline justify-between mb-6">
                                        <h3 className="text-lg font-bold text-gray-900">Booking Rate</h3>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-2xl font-black text-gray-900">{provider.hourlyRate}</span>
                                            <span className="text-sm text-gray-500 font-medium">/ hour</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <button className="w-full py-4 bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-600/20 hover:bg-green-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                                            Request Service
                                            <span className="material-icons-outlined">arrow_forward</span>
                                        </button>
                                        <button className="w-full py-4 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all flex items-center justify-center gap-2">
                                            <span className="material-icons-outlined">chat_bubble_outline</span>
                                            Message Provider
                                        </button>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-gray-100">
                                        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 font-medium">
                                            <span className="material-icons-outlined text-green-600 text-base">security</span>
                                            Secure payments & buyer protection
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

export default ProviderProfile;
