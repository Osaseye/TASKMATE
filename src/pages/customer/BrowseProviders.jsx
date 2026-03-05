import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import MobileNavBar from '../../components/layout/MobileNavBar';
import { useData } from '../../context/DataContext';
import Tutorial from '../../components/ui/Tutorial';

const BrowseProviders = () => {
    const { getProviders, savedProviderIds, toggleSavedProvider } = useData();
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [priceRange, setPriceRange] = useState(50000);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const tutorialSteps = [
        {
            target: '#tour-search-providers',
            content: 'Use this search bar to quickly find providers by name or specific skills.',
            disableBeacon: true,
        },
        {
            target: '#tour-filter-sidebar',
            content: 'Filter providers by service type, minimum rating, or price range to narrow down your options.',
        },
        {
            target: '#tour-sort-options',
            content: 'Sort the results by recommended, highest rated, or lowest price.',
        },
        {
            target: '#tour-provider-list',
            content: 'Here are the providers matching your criteria. Click on a provider to view their full profile or heart icon to save them for later.',
        }
    ];

    useEffect(() => {
        const fetchProviders = async () => {
            setLoading(true);
            const data = await getProviders(selectedCategory);
            setProviders(data);
            setLoading(false);
        };
        fetchProviders();
    }, [selectedCategory, getProviders]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(prev => prev === category ? 'All' : category);
    };

    return (
        <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
            <Sidebar />
            <Tutorial steps={tutorialSteps} tutorialKey="customerFindProviders" />
            
            <main className="flex-1 overflow-hidden flex flex-col min-w-0">
                {/* Header (Simplified for Mobile) */}
                <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 md:hidden">
                    <div className="flex items-center gap-2">
                        <img alt="Logo" className="h-6 w-6" src="/icon.png" />
                        <span className="text-xl font-bold text-green-800">TaskMate</span>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 lg:p-8 pb-24">
                    <div className="mx-auto max-w-7xl">
                        {/* Page Header */}
                        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Browse Providers</h1>
                                <p className="mt-1 text-sm text-gray-500">Find the best professionals for your needs.</p>
                            </div>
                            {/* Mobile Filter Toggle could go here */}
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Filter Sidebar */}
                            <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
                                <div className="relative" id="tour-search-providers">
                                    <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                                    <input 
                                        className="block w-full rounded-lg border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:border-green-600 focus:ring-green-600 focus:bg-white transition-colors outline-none shadow-sm border" 
                                        placeholder="Search providers..." 
                                        type="text"
                                    />
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6" id="tour-filter-sidebar">
                                    {/* Service Type */}
                                    <div>
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Service Type</h3>
                                        <div className="space-y-3">
                                            {['Cleaning', 'Plumbing', 'Electrical', 'Painting', 'Carpentry'].map(service => (
                                                <label key={service} className="flex items-center group cursor-pointer">
                                                    <input 
                                                        className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600 cursor-pointer" 
                                                        type="checkbox"
                                                        checked={selectedCategory === service}
                                                        onChange={() => handleCategoryChange(service)}
                                                    />
                                                    <span className="ml-3 text-sm text-gray-600 group-hover:text-green-700 transition-colors">{service}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <hr className="border-gray-100" />

                                    {/* Rating */}
                                    <div>
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Rating</h3>
                                        <div className="space-y-3">
                                            {[5, 4, 3].map(rating => (
                                                <label key={rating} className="flex items-center cursor-pointer group">
                                                    <input 
                                                        name="rating" 
                                                        type="radio" 
                                                        className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600 cursor-pointer"
                                                        defaultChecked={rating === 4} 
                                                    />
                                                    <div className="ml-3 flex items-center">
                                                        <div className="flex text-yellow-400">
                                                            {[...Array(5)].map((_, i) => (
                                                                <span key={i} className={`material-icons-outlined text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-200'}`}>star</span>
                                                            ))}
                                                        </div>
                                                        <span className="ml-2 text-sm text-gray-600 group-hover:text-green-700 transition-colors">{rating}.0 & up</span>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <hr className="border-gray-100" />

                                    {/* Price Range */}
                                    <div>
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Price Range (₦)</h3>
                                        <div className="space-y-4">
                                            <div className="flex gap-4">
                                                <div className="relative w-full">
                                                    <span className="absolute left-3 top-2 text-xs text-gray-400">₦</span>
                                                    <input 
                                                        className="w-full rounded-md border-gray-200 bg-gray-50 pl-6 py-1.5 text-sm focus:border-green-600 focus:ring-0" 
                                                        placeholder="Min" 
                                                        type="number"
                                                    />
                                                </div>
                                                <div className="relative w-full">
                                                    <span className="absolute left-3 top-2 text-xs text-gray-400">₦</span>
                                                    <input 
                                                        className="w-full rounded-md border-gray-200 bg-gray-50 pl-6 py-1.5 text-sm focus:border-green-600 focus:ring-0" 
                                                        placeholder="Max" 
                                                        type="number"
                                                    />
                                                </div>
                                            </div>
                                            <input 
                                                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600" 
                                                max="100000" 
                                                min="1000" 
                                                type="range" 
                                                value={priceRange}
                                                onChange={(e) => setPriceRange(e.target.value)}
                                            />
                                            <div className="text-xs text-gray-500 text-right">Up to ₦{Number(priceRange).toLocaleString()}</div>
                                        </div>
                                    </div>

                                    <button className="w-full rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all">
                                        Apply Filters
                                    </button>
                                </div>
                            </aside>

                            {/* Main Content */}
                            <div className="flex-1">
                                <div className="mb-6 flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm lg:bg-transparent lg:p-0 lg:border-0 lg:shadow-none">
                                    <span className="text-sm font-medium text-gray-700">Showing <span className="text-green-700 font-bold">{providers.length}</span> results</span>
                                    <div className="flex items-center gap-2" id="tour-sort-options">
                                        <span className="hidden sm:inline text-sm text-gray-500">Sort by:</span>
                                        <select className="rounded-lg border-gray-200 bg-gray-50 py-1.5 pl-3 pr-8 text-sm focus:border-green-600 focus:ring-green-600 cursor-pointer outline-none">
                                            <option>Recommended</option>
                                            <option>Highest Rated</option>
                                            <option>Lowest Price</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" id="tour-provider-list">
                                    {loading ? (
                                        <div className="col-span-full py-20 text-center">
                                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                                            <p className="mt-4 text-gray-500">Finding taskers near you...</p>
                                        </div>
                                    ) : providers.length === 0 ? (
                                        <div className="col-span-full py-20 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                                            <span className="material-icons-outlined text-4xl text-gray-300 mb-2">person_off</span>
                                            <h3 className="text-lg font-bold text-gray-900">No providers found</h3>
                                            <p className="text-gray-500">Try adjusting your filters or search for something else.</p>
                                        </div>
                                    ) : (
                                        providers.map((provider) => (
                                        <div key={provider.id} className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                                            <button 
                                                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-all active:scale-95"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    toggleSavedProvider(provider.id);
                                                }}
                                            >
                                                <span className={`material-icons text-xl ${savedProviderIds.includes(provider.id) ? 'text-red-500' : 'text-gray-400'}`}>
                                                    {savedProviderIds.includes(provider.id) ? 'favorite' : 'favorite_border'}
                                                </span>
                                            </button>
                                            
                                            {/* Header */}
                                            <div className="p-6 flex flex-col items-center flex-1">
                                                <div className="relative mb-4">
                                                    <div className="h-24 w-24 rounded-full p-1 bg-white shadow-sm border border-gray-100 group-hover:border-green-100 transition-colors">
                                                        <img 
                                                            alt={provider.displayName} 
                                                            className="h-full w-full rounded-full object-cover" 
                                                            src={provider.photoURL || `https://ui-avatars.com/api/?name=${provider.displayName}&background=random`}
                                                        />
                                                    </div>
                                                    <span className="absolute bottom-2 right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500 shadow-sm" title="Online"></span>
                                                </div>
                                                
                                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors text-center">{provider.displayName || 'Unnamed Provider'}</h3>
                                                <p className="text-sm font-medium text-green-600 mb-3 text-center">
                                                    {provider.category || (provider.preferences && provider.preferences.length > 0 
                                                        ? provider.preferences.slice(0, 2).join(', ') 
                                                        : 'Service Provider')}
                                                </p>

                                                <div className="flex items-center gap-1.5 rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700 mb-4">
                                                    <span className="material-icons-outlined text-sm text-yellow-500">star</span>
                                                    {provider.rating ? Number(provider.rating).toFixed(1) : 'New'}
                                                    <span className="text-yellow-600/60 font-medium ml-1">
                                                        ({provider.reviews ? provider.reviews.length : 0} reviews)
                                                    </span>
                                                </div>

                                                <div className="w-full border-t border-gray-50 pt-4 space-y-3 mt-auto">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-500 flex items-center gap-2">
                                                            <span className="material-icons-outlined text-gray-400 text-base">location_on</span>
                                                            Location
                                                        </span>
                                                        <span className="font-semibold text-gray-700 truncate max-w-[120px]">{provider.location || 'Remote'}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-500 flex items-center gap-2">
                                                            <span className="material-icons-outlined text-gray-400 text-base">payments</span>
                                                            Starting at
                                                        </span>
                                                        <span className="font-semibold text-gray-900">₦{Number(provider.baseRate || 5000).toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Footer Action */}
                                            <div className="mt-auto p-4 bg-gray-50 border-t border-gray-100 group-hover:bg-green-50/50 transition-colors">
                                                <Link to={`/customer/provider/${provider.id}`} className="w-full flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-green-700 active:scale-95 shadow-sm">
                                                    View Profile
                                                    <span className="material-icons-outlined text-sm">arrow_forward</span>
                                                </Link>
                                            </div>
                                        </div>
                                    )))}
                                </div>

                                {/* Pagination */}
                                <div className="mt-10 flex justify-center">
                                    <nav className="flex items-center gap-1 rounded-lg bg-white p-1 shadow-sm border border-gray-200">
                                        <button className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 hover:bg-gray-50 hover:text-gray-600">
                                            <span className="material-icons-outlined text-lg">chevron_left</span>
                                        </button>
                                        <button className="flex h-8 w-8 items-center justify-center rounded-md bg-green-50 text-sm font-semibold text-green-700">1</button>
                                        <button className="flex h-8 w-8 items-center justify-center rounded-md text-sm font-semibold text-gray-600 hover:bg-gray-50">2</button>
                                        <button className="flex h-8 w-8 items-center justify-center rounded-md text-sm font-semibold text-gray-600 hover:bg-gray-50">3</button>
                                        <span className="flex h-8 w-8 items-center justify-center text-gray-400">...</span>
                                        <button className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 hover:bg-gray-50 hover:text-gray-600">
                                            <span className="material-icons-outlined text-lg">chevron_right</span>
                                        </button>
                                    </nav>
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

export default BrowseProviders;
