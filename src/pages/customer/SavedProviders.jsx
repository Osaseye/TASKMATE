import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import MobileNavBar from '../../components/layout/MobileNavBar';

const SavedProviders = () => {
    // Mock saved providers - similar to Browse but filtered
    const savedProviders = [
        {
            id: 1,
            name: "Chidubem Okafor",
            service: "Expert Plumber",
            rating: 4.9,
            reviews: 124,
            rate: "₦5,000/hr",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAChwLOdEWqeXaVEnO14L0LhJNUA7J7sZW74A-zu78YcAzIt6cP11IxY1aU9LWB-IrI4MVYvfBPMCfWilq6HCqtiJgwuASg2Y_Btd8RSv3KRGYJzOfkZfuWrzgiYuhrEULY1D190jv8Z0YGYlpwY94xabYhXSTozGgHMYC65n8EnWTkgYBz8hB9pmfbNZVHjlT7s-2YqTVbV5nroMhnNqEA_or2yCEMJJz-Th2sTpm3rLN6mAnxjfwk-FGOeAPSjOJmhesZFe_-PSo",
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
            rate: "₦7,500/hr",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeCBy35V7ZhVfbcz-weSwZlAU9sFOTvjk_ZVZVjsVHak6KA7wyRIh2AvKAp5Zvyj-8AwQsdLUbv7i5aWSPJ7tr3-KGPuTfGKXy4I_5A10PFYXeTCGYK_Ued-2lS4dIQjx3REapUZhORL1I0yAAKO29WWkBLjQcgc2Do_FpjClpV1g2b7IrflDxHO0yAiaGqUFY7ZTYuks3BZwF5Hb-QIyYGIeDdUf376dXwmABCzq97rcvRm9bqN6BiQiFrEtv5M_bb7-85WjebMA",
            location: "Ikeja GRA",
            verified: true,
            isOnline: false
        }
    ];

    return (
        <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
            <Sidebar />
            
            <main className="flex-1 overflow-hidden flex flex-col min-w-0">
                <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Saved Providers</h1>
                        <p className="text-sm text-gray-500 mt-1">Your bookmarked service professionals</p>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    {savedProviders.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {savedProviders.map((provider) => (
                                <div key={provider.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                                    <div className="relative">
                                        <img 
                                            src={provider.image} 
                                            alt={provider.name} 
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute top-3 right-3">
                                            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm text-red-500 hover:bg-white transition-colors">
                                                <span className="material-icons-outlined text-xl">favorite</span>
                                            </button>
                                        </div>
                                        {provider.verified && (
                                            <div className="absolute bottom-3 left-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center shadow-sm">
                                                <span className="material-icons-outlined text-[14px] mr-1">verified</span>
                                                Verified
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="p-5">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-bold text-lg text-gray-900">{provider.name}</h3>
                                                <p className="text-sm text-gray-500">{provider.service}</p>
                                            </div>
                                            <div className="flex items-center bg-gray-50 px-2 py-1 rounded text-xs font-bold text-gray-700">
                                                <span className="material-icons-outlined text-yellow-500 text-sm mr-1">star</span>
                                                {provider.rating}
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center text-sm text-gray-500 mb-4">
                                            <span className="material-icons-outlined text-gray-400 text-base mr-1">location_on</span>
                                            {provider.location}
                                        </div>
                                        
                                        <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Rate</p>
                                                <p className="text-green-600 font-bold">{provider.rate}</p>
                                            </div>
                                            <Link 
                                                to={`/customer/provider/${provider.id}`}
                                                className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                            >
                                                View Profile
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center p-8">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <span className="material-icons-outlined text-4xl text-gray-400">bookmark_border</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No saved providers yet</h3>
                            <p className="text-gray-500 max-w-md mb-6">Found someone you like? Tap the heart icon to save them for later access.</p>
                            <Link to="/customer/browse" className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors">
                                Browse Providers
                            </Link>
                        </div>
                    )}
                </div>
                <MobileNavBar />
            </main>
        </div>
    );
};

export default SavedProviders;
