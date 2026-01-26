import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import MobileNavBar from '../../components/layout/MobileNavBar';

const BrowseProviders = () => {
    const [priceRange, setPriceRange] = useState(50000);

    // Mock data for providers
    const providers = [
        {
            id: 1,
            name: "Emmanuel Okoro",
            role: "Master Plumber",
            rating: 4.9,
            reviews: 128,
            experience: "8 Years",
            price: "₦5,000",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFVuAkaYgVHvqB1eOTmc89qO7U3sfCPhLQXVum1tDH5gxFBEQQNdTrW6M7QNvZ2yPQRl2N6NHYm7aqJabmxt2j-4Ig12HhlJ1a2ipeyWMuCjc8hLNU5LMesuS4Rgh3mqawwVL7DaEz-AYTxL2CqQwyT77LC9D6ZVbtajza8xv4RVAE2mDpJrzRVTWxYTYPBYP_BeeKn8H9gUyZlC-_11qW-RgWrhIyUSZ4QrU1oN_cwFzAgEAbEywvnj115MdcVdo4_aqUfh1V9Us",
            isOnline: true,
            skills: ["Plumbing", "Pipe Fitting"]
        },
        {
            id: 2,
            name: "Aisha Bello",
            role: "Home Cleaning Specialist",
            rating: 4.8,
            reviews: 84,
            experience: "3 Years",
            price: "₦3,500",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUxqONCHc7ud0tvIJLa1En4H97XOAVWQvUIIeIY6b4JVrhqhFwUdmpzC7T2rG4ZRfmnujiJCEcm5FHkMHno_-iO_GoFfQywEq5dOKUQcAnjDMWnB6TDMpcIadNET83lSQQ2yS9026576CY45puXuyU3oKwkw2DsXOAaXvXIPIcug3y4uxG5WpQAubJXk8ZcOI55NeuYdhSfjSDPDgLS4vLsIgNcmPeNG6rHCgrQTvvdXbambJeP5Pdp0SYOf50N3pjW9pw6jMPjVc",
            isOnline: false,
            skills: ["Cleaning", "Organization"]
        },
        {
            id: 3,
            name: "Chinedu Eze",
            role: "Electrical Engineer",
            rating: 5.0,
            reviews: 42,
            experience: "10+ Years",
            price: "₦7,000",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKI3bT0PJgINtD673G1tSrnBxOnmPks0qgbCjOaaqjjqpvUv6Vy_cNeSexdgI5TSKxRnLjL9I6J8C2OYpD_3miTmaswtx2Vu8YMpJbig1sjgS-I-N3pD55sAQ-jiAsA6EkrRKM9SHXNUFwDwO_Cl0Ieu_YaxNpDYIQfhhNHX0JQ1tGkP_Ab0Q7U627plJpkAXi07JAZ2WDOjx21u1rQ_wum-6UCg1yKCn2w1eyrgCV1SeSrCjWR6FtVQnmXt4gzKb1RWb0TonkE1k",
            isOnline: true,
            skills: ["Wiring", "Installation"]
        },
        {
            id: 4,
            name: "Funmi Adebayo",
            role: "Interior Painter",
            rating: 4.7,
            reviews: 56,
            experience: "5 Years",
            price: "₦4,000",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3Q0ae8OoWH4G_faM3M6wpRGBrW-f6aTFeAYTAxc0dcODdCDLx0E-vs4wPKPJvpGCpU-T6NvetULJLrgn9UzTa2McDXrnB7AYB4bnw6egxaScBwwk6gluC2rmiYqLZkV-OazAWwRm6nZ-CRMY19u4q6SAiKy-qV8SkVC2DCsW_Uyw_2y4XtvgF-MOYsKpnlqmx93FGP967ZgvupK2tXC1abkm9sbJ7NnHU7BkQQlaBMF0BYt-KAFDkvzmBayQrFrZK_c-GEe1oVCk",
            isOnline: false,
            skills: ["Painting", "Decorating"]
        },
        {
            id: 5,
            name: "Yusuf Ibrahim",
            role: "Carpenter",
            rating: 4.6,
            reviews: 31,
            experience: "6 Years",
            price: "₦6,500",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAm8cAmmZAvBgX1i6jGyWcTYdLJHOIRdgWnaP-3g6QxWF0xRP5DqCPz7p49szvReQH2WTrOkq769zTVCB1XQNtKFj0ixNK6RRIr8bjZGJXBQ2WmBvld0JdE3aw8DIcjvI9IPXWprjCpZE9xYXEnZQwlfxZxKyHFbsNZtTgDzF4a8Ff6VzDYRC0iJty_Go60WlJe5aHm4_80vQb3adQ1Bf_LYODiqQEYJc2PmgH9a7jHXT-I4XzaxaeR02alA9u_uZV-0TTfErmm9_4",
            isOnline: true,
            skills: ["Carpentry", "Furniture"]
        },
        {
            id: 6,
            name: "David Okafor",
            role: "AC Repair & Service",
            rating: 4.9,
            reviews: 210,
            experience: "12 Years",
            price: "₦4,500",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgG_Igu4qAYUapztc8PmPt7XnxkZi2KlLUSq9bkyLUX_rp22YkWjgERgiZPHZeiOw5ipVfAV1vlOTABPR1LTjIaQXA1QqfTkDzwlsLwBYAKmHwVqM_5yoVpCN446BK-O2DSAe_CydGtKNvejdhZB4UoydH0s4klG_biXAZzOERESW6BX1rbILn4V3MaufwhSURp4W1zoeNcxN_zM-uc7iFY62GckRUNpMdNLC0msnt2EYyiicwclgNQEvjcNKiyrt1ZWk8L9nnf6o",
            isOnline: false,
            skills: ["AC Repair", "Maintenance"]
        }
    ];

    return (
        <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
            <Sidebar />
            
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
                                <div className="relative">
                                    <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                                    <input 
                                        className="block w-full rounded-lg border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:border-green-600 focus:ring-green-600 focus:bg-white transition-colors outline-none shadow-sm border" 
                                        placeholder="Search providers..." 
                                        type="text"
                                    />
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
                                    {/* Service Type */}
                                    <div>
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Service Type</h3>
                                        <div className="space-y-3">
                                            {['Cleaning', 'Plumbing', 'Electrical', 'Painting', 'Carpentry'].map(service => (
                                                <label key={service} className="flex items-center group cursor-pointer">
                                                    <input 
                                                        className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600 cursor-pointer" 
                                                        type="checkbox"
                                                        defaultChecked={service === 'Plumbing'} 
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
                                    <div className="flex items-center gap-2">
                                        <span className="hidden sm:inline text-sm text-gray-500">Sort by:</span>
                                        <select className="rounded-lg border-gray-200 bg-gray-50 py-1.5 pl-3 pr-8 text-sm focus:border-green-600 focus:ring-green-600 cursor-pointer outline-none">
                                            <option>Recommended</option>
                                            <option>Highest Rated</option>
                                            <option>Lowest Price</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {providers.map((provider) => (
                                        <div key={provider.id} className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                                            {/* Header */}
                                            <div className="p-6 flex flex-col items-center">
                                                <div className="relative mb-4">
                                                    <div className="h-24 w-24 rounded-full p-1 bg-white shadow-sm border border-gray-100 group-hover:border-green-100 transition-colors">
                                                        <img 
                                                            alt={provider.name} 
                                                            className="h-full w-full rounded-full object-cover" 
                                                            src={provider.image} 
                                                        />
                                                    </div>
                                                    {provider.isOnline && (
                                                        <span className="absolute bottom-2 right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500 shadow-sm" title="Online"></span>
                                                    )}
                                                </div>
                                                
                                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors">{provider.name}</h3>
                                                <p className="text-sm font-medium text-green-600 mb-3">{provider.role}</p>

                                                <div className="flex items-center gap-1.5 rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700 mb-4">
                                                    <span className="material-icons-outlined text-sm text-yellow-500">star</span>
                                                    {provider.rating}
                                                    <span className="text-yellow-600/60 font-medium ml-1">({provider.reviews})</span>
                                                </div>

                                                <div className="w-full border-t border-gray-50 pt-4 space-y-3">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-500 flex items-center gap-2">
                                                            <span className="material-icons-outlined text-gray-400 text-base">work_history</span>
                                                            Experience
                                                        </span>
                                                        <span className="font-semibold text-gray-700">{provider.experience}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-500 flex items-center gap-2">
                                                            <span className="material-icons-outlined text-gray-400 text-base">payments</span>
                                                            Starting at
                                                        </span>
                                                        <span className="font-semibold text-gray-900">{provider.price}</span>
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
                                    ))}
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
