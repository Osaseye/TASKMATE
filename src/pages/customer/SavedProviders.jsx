import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import MobileNavBar from '../../components/layout/MobileNavBar';

const SavedProviders = () => {
    // MOCK DATA
    const savedProviders = [
        {
            id: 1,
            name: "Chidubem Okafor",
            service: "Expert Plumber",
            rating: 4.9,
            reviews: 124,
            rate: "₦5,000",
            image: "https://i.pravatar.cc/300?u=1",
            location: "Lekki Phase 1",
            verified: true,
            isOnline: true
        },
        {
            id: 3,
            name: "Tobi Adebayo",
            service: "Electrical Engineer",
            rating: 4.8,
            reviews: 89,
            rate: "₦7,500",
            image: "https://i.pravatar.cc/300?u=3",
            location: "Ikeja GRA",
            verified: true,
            isOnline: false
        },
        {
            id: 5,
            name: "Sola David",
            service: "Home Cleaner",
            rating: 4.7,
            reviews: 56,
            rate: "₦3,500",
            image: "https://i.pravatar.cc/300?u=5",
            location: "Yaba, Lagos",
            verified: true,
            isOnline: true
        }
    ];

    return (
        <div className="flex h-screen bg-[#F8F9FA] font-sans text-gray-900">
            <Sidebar />
            
            <main className="flex-1 overflow-hidden flex flex-col min-w-0">
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        
                        {/* Header */}
                        <div className="flex items-end justify-between mb-8">
                            <div>
                                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Saved Providers</h1>
                                <p className="mt-1 text-sm text-gray-500">Service professionals you've bookmarked for later.</p>
                            </div>
                            <Link to="/customer/browse" className="hidden sm:inline-flex items-center text-sm font-bold text-green-600 hover:text-green-700">
                                Browse more
                                <span className="material-icons-outlined text-lg ml-1">arrow_forward</span>
                            </Link>
                        </div>

                        {/* Grid */}
                        {savedProviders.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {savedProviders.map((provider) => (
                                    <div key={provider.id} className="group bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 border border-gray-100 transition-all duration-300 relative flex flex-col">
                                        
                                        {/* Image Header */}
                                        <div className="relative mb-4">
                                            <div className="h-48 rounded-2xl overflow-hidden bg-gray-100">
                                                <img 
                                                    src={provider.image} 
                                                    alt={provider.name} 
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm text-red-500 hover:scale-110 transition-transform active:scale-95">
                                                <span className="material-icons text-xl">favorite</span>
                                            </button>
                                            {provider.verified && (
                                                <div className="absolute bottom-3 left-3 bg-blue-600 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-lg shadow-sm flex items-center gap-1">
                                                    <span className="material-icons-outlined text-xs">verified</span>
                                                    Verified
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between items-start mb-1">
                                                <div>
                                                    <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{provider.name}</h3>
                                                    <p className="text-sm font-medium text-gray-500">{provider.service}</p>
                                                </div>
                                                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                                                    <span className="material-icons text-yellow-500 text-sm">star</span>
                                                    <span className="text-xs font-bold text-gray-900">{provider.rating}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-1 text-sm text-gray-400 mt-2 mb-4">
                                                <span className="material-icons-outlined text-base">location_on</span>
                                                <span className="truncate">{provider.location}</span>
                                            </div>

                                            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs text-gray-400 font-medium uppercase">Rate</p>
                                                    <div className="flex items-baseline gap-0.5">
                                                        <span className="text-lg font-black text-gray-900">{provider.rate}</span>
                                                        <span className="text-xs text-gray-500 font-medium">/hr</span>
                                                    </div>
                                                </div>
                                                <Link 
                                                    to={`/customer/provider/${provider.id}`}
                                                    className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20"
                                                >
                                                    View
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 mb-6">
                                    <span className="material-icons-outlined text-gray-400 text-4xl">bookmark_border</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No saved providers yet</h3>
                                <p className="text-gray-500 max-w-md mx-auto mb-8">Found someone you like? Tap the heart icon on their profile to save them here for quick access later.</p>
                                <Link to="/customer/browse" className="inline-flex items-center bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 hover:scale-[1.02]">
                                    Browse Providers
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                <MobileNavBar />
            </main>
        </div>
    );
};

export default SavedProviders;