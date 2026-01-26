import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import MobileNavBar from '../../components/layout/MobileNavBar';

const ProviderProfile = () => {
    const { id } = useParams();

    // In a real app, we would fetch data based on ID. 
    // For now, we'll hardcode the sample data structure to match the UI.
    const provider = {
        name: "Chidubem Okafor",
        location: "Lekki Phase 1, Lagos",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAChwLOdEWqeXaVEnO14L0LhJNUA7J7sZW74A-zu78YcAzIt6cP11IxY1aU9LWB-IrI4MVYvfBPMCfWilq6HCqtiJgwuASg2Y_Btd8RSv3KRGYJzOfkZfuWrzgiYuhrEULY1D190jv8Z0YGYlpwY94xabYhXSTozGgHMYC65n8EnWTkgYBz8hB9pmfbNZVHjlT7s-2YqTVbV5nroMhnNqEA_or2yCEMJJz-Th2sTpm3rLN6mAnxjfwk-FGOeAPSjOJmhesZFe_-PSo",
        rating: 4.9,
        reviews: 124,
        jobs: "250+",
        tags: ["Plumbing", "Pipe Fitting", "Water Heater Repair", "Drain Cleaning"],
        about: [
            "With over 8 years of hands-on experience in residential and commercial plumbing across Lagos, I pride myself on delivering swift, reliable, and durable solutions. I specialize in leak detection, complex pipe installations, and modern bathroom fittings.",
            "I understand the hassle of plumbing emergencies, which is why I am available for urgent call-outs. My goal is to fix it right the first time, saving you time and money. I bring all necessary tools and ensure a clean workspace after every job."
        ],
        portfolio: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAnm2Ptbc4IcDY6hd9kEMBnFe2whpufjVxFiXrTdIOu917qCaUrXD1yV8x5T1WqHxhwP04mS7jIEshbCGrAeh1NESmv4_u6gP73I8DSrL_kMLiDkgjg0tWvaNPcCxJUiHFRWI54RWPTDF9fGmkVni6OX1A3cAasaKV801I0H1I0IfjbooSYYha03Y95XeKXF55W0Y_BIbMdKQW6SBuwrcRvGxEdyJmjojV8rQ7dzLBpx6AqUpD4FrhjBaVZTUO3v-wvnLPxEIJoXRA",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuC5cnwEtGLQxW-Qg2cpFOTvQOi_CkG90PrW_Vq3J4JjYoeX_ugVn2ZRkhGHF1YdnXSPRQEAEGq7Z_oM42A0Pa4IoNB5BUkC0g8pkUcliU_hZf4U3mliQFyFkvYvKjwZA3XV8cl5A9VyhISvFhTqse6EPkRg3Yhrj05dAHlcQur1zBp55K2zgAaJMYVag5m6s7UTtYrAI72tKq75ulOlebOyEyWSvz4mATulezI7QPireDyzryhnnHJyn3ZzkDF6IdjbRGqlkSisGoM",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDF3V1sYZqil_tyc_d7FObbXH4FJMZJJeqqVjAUNVWg1fLaTGdHsMKEbRWejVyDmm-Mm-i7B_M_ZN5RdAM_yVX5JN85yqpWyDpAF7Li_neJl-3SIJhwkV03gVccRrEkOMPSyUbDlpcn0q45O-2nqD-HAKsI02OSOeyNGfq_2L5EUyF6DL7T2cGNNdKBd_xTKe4iyZJTGaepBlEV9sqr6yrxXxKbHhd0OSeszGpfmt59nSDIlUwlCB9cqUdSsYFUxaA0zsddRMq6OJk",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCV0RLwcFGYMfxPLWCtYkcp7bo718mR1vhTQ0tNcR7sUfXQAWpnUnWHfF4HeXhq52w_H69f3BhgE1sEklcRzKRFkqXKuDGZNsQggJGgksEXcJU_Nhm_GM_s1JddXn4LqOltt0UOZHIPqwkoAAr5DbCdVd2OnT6sMq3zh8bH1JUnfikI_1Va676NNz6orzNdv4npbARB0NCK5iNgL5k-W6K-Tya9qEhfZy-cR0GXTjMmcs26mbTazWIJeKM3Rk6qYQvMQogkc704u6A"
        ],
        price: "₦5,000",
        unit: "/hr"
    };

    return (
        <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
            <Sidebar />
            
            <main className="flex-1 overflow-hidden flex flex-col min-w-0">
                {/* Mobile Header */}
                <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 md:hidden">
                    <div className="flex items-center gap-2">
                         <Link to="/customer/browse" className="text-gray-500 hover:text-gray-900">
                             <span className="material-icons-outlined">arrow_back</span>
                         </Link>
                        <span className="text-lg font-bold text-gray-900">Provider Profile</span>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto pb-24">
                     {/* Banner / Header Image Area */}
                    <div className="relative h-48 bg-gradient-to-r from-green-500 to-green-700">
                        {/* Desktop Back Button */}
                        <div className="absolute top-6 left-6 hidden md:block">
                            <Link to="/customer/browse" className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/30 transition-colors">
                                <span className="material-icons-outlined text-sm">arrow_back</span>
                                Back to Browse
                            </Link>
                        </div>
                    </div>

                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-24">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            
                            {/* Left Column: Profile Info */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Profile Card */}
                                <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
                                    <div className="px-6 pb-6 relative pt-24 md:pt-20">
                                        <div className="absolute -top-16 left-6 md:left-8">
                                            <div className="relative">
                                                <img 
                                                    alt="Service Provider" 
                                                    className="h-32 w-32 rounded-full ring-4 ring-white bg-white object-cover shadow-md" 
                                                    src={provider.image} 
                                                />
                                                <div className="absolute bottom-2 right-2 bg-blue-500 text-white p-1 rounded-full shadow-sm flex items-center justify-center" title="Verified Pro">
                                                    <span className="material-icons-outlined text-sm">verified</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-2 md:ml-40 md:-mt-12">
                                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                                <div>
                                                    <h1 className="text-2xl font-bold text-gray-900">{provider.name}</h1>
                                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                                        <span className="material-icons-outlined text-base mr-1">location_on</span>
                                                        {provider.location}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center bg-yellow-100 px-2.5 py-1 rounded-lg text-yellow-800">
                                                        <span className="material-icons-outlined text-yellow-600 text-sm mr-1">star</span>
                                                        <span className="font-bold text-sm">{provider.rating}</span>
                                                        <span className="text-xs ml-1 opacity-75">({provider.reviews} reviews)</span>
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <span className="material-icons-outlined text-base mr-1">work_history</span>
                                                        <span>{provider.jobs} Jobs</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2 mt-6">
                                                {provider.tags.map(tag => (
                                                    <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* About Section */}
                                <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
                                    <h2 className="text-lg font-bold text-gray-900 mb-4">About Me</h2>
                                    <div className="prose prose-sm text-gray-600 max-w-none">
                                        {provider.about.map((paragraph, idx) => (
                                            <p key={idx} className={idx > 0 ? "mt-3" : ""}>{paragraph}</p>
                                        ))}
                                    </div>
                                </div>

                                {/* Portfolio Section */}
                                <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-lg font-bold text-gray-900">Recent Projects</h2>
                                        <Link to="#" className="text-green-600 hover:text-green-700 text-sm font-medium">View all</Link>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {provider.portfolio.map((img, idx) => (
                                            <div key={idx} className={`relative rounded-lg overflow-hidden h-24 group cursor-pointer ${idx === 3 ? 'bg-gray-900' : ''}`}>
                                                <img 
                                                    alt={`Work sample ${idx + 1}`}
                                                    className={`h-full w-full object-cover transition duration-300 ${idx === 3 ? 'opacity-50 group-hover:opacity-40' : 'hover:opacity-90'}`} 
                                                    src={img} 
                                                />
                                                {idx === 3 && (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <span className="text-white font-bold text-lg">+12</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Reviews Section */}
                                <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
                                    <h2 className="text-lg font-bold text-gray-900 mb-6">Customer Reviews</h2>
                                    <div className="space-y-6">
                                        {/* Review 1 */}
                                        <div className="flex gap-4">
                                            <img alt="Reviewer" className="h-10 w-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpKlNVRNSwZYgQtHgX87NoxWpSz8nK2xOoOVAMsZCC40TDYrpuDil5sNPw3DCuRpF9OLL1RkhfGLNIG4gXl5KtOfZ07KuuGH6g5o700gUHaZFbNi52Txaat0ecI4vG4mD94aUETE7DljD24o3Lwq00b0gyewzILEQLzdyHocctE2JK_8sWgpEhlVYQ53SsxttvNj41v3rAmUQiBBWVhc7-nCswMx6zPC0Jy1fU1OAEJmLETdPd0nUEx1JvUwZ_5ijZSOATbb5TorA"/>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-sm font-bold text-gray-900">Adaobi N.</h3>
                                                    <span className="text-xs text-gray-500">2 days ago</span>
                                                </div>
                                                <div className="flex items-center mt-1 text-yellow-400">
                                                    {[1,2,3,4,5].map(i => <span key={i} className="material-icons-outlined text-sm">star</span>)}
                                                </div>
                                                <p className="text-sm text-gray-600 mt-2">
                                                    Chidubem did a fantastic job fixing the leak under my kitchen sink. He arrived on time and was very professional. Highly recommended!
                                                </p>
                                            </div>
                                        </div>
                                        <div className="border-t border-gray-100"></div>
                                        {/* Review 2 */}
                                        <div className="flex gap-4">
                                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">TB</div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-sm font-bold text-gray-900">Tunde B.</h3>
                                                    <span className="text-xs text-gray-500">1 week ago</span>
                                                </div>
                                                <div className="flex items-center mt-1 text-yellow-400">
                                                    {[1,2,3,4].map(i => <span key={i} className="material-icons-outlined text-sm">star</span>)}
                                                    <span className="material-icons-outlined text-sm text-gray-300">star</span>
                                                </div>
                                                <p className="text-sm text-gray-600 mt-2">
                                                    Good work overall, though he arrived a bit later than scheduled due to traffic. The repair was solid though.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 text-center">
                                        <button className="text-green-600 hover:text-green-700 font-medium text-sm transition-colors">Load more reviews</button>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Booking Card (Sticky) */}
                            <div className="lg:col-span-1">
                                <div className="bg-white shadow-lg rounded-xl p-6 sticky top-6 border border-gray-100">
                                    <div className="flex justify-between items-baseline mb-4">
                                        <h3 className="text-lg font-bold text-gray-900">Estimated Price</h3>
                                        <span className="text-2xl font-bold text-green-700">{provider.price}<span className="text-sm font-normal text-gray-500">{provider.unit}</span></span>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-6">Price may vary based on the complexity of the task and materials required.</p>
                                    
                                    <form className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="service-type">Select Service</label>
                                            <div className="relative">
                                                <select className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm py-2.5 px-3 border outline-none bg-white" id="service-type" name="service-type">
                                                    <option>General Plumbing Repair</option>
                                                    <option>Installation</option>
                                                    <option>Inspection</option>
                                                    <option>Emergency Service</option>
                                                </select>
                                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500">
                                                    <span className="material-icons-outlined text-sm">expand_more</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="date">Date</label>
                                            <input 
                                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm py-2.5 px-3 border outline-none" 
                                                id="date" 
                                                name="date" 
                                                type="date"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">Brief Description</label>
                                            <textarea 
                                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm py-2.5 px-3 border outline-none" 
                                                id="message" 
                                                name="message" 
                                                placeholder="Describe your issue..." 
                                                rows="3"
                                            ></textarea>
                                        </div>
                                        <button className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors" type="submit">
                                            Hire {provider.name.split(' ')[0]} Now
                                        </button>
                                        <button className="w-full flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors gap-2" type="button">
                                            <span className="material-icons-outlined text-gray-400 text-lg">chat</span>
                                            Message Provider
                                        </button>
                                    </form>

                                    <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-gray-500 bg-gray-50 py-2 rounded-lg">
                                        <span className="material-icons-outlined text-base">shield</span>
                                        <span>TaskMate Protection Guarantee</span>
                                    </div>
                                </div>
                                
                                <div className="mt-6 bg-white shadow-sm rounded-xl p-6 border border-gray-100">
                                    <h3 className="text-sm font-bold text-gray-900 mb-3">Availability</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Mon - Fri</span>
                                            <span className="text-gray-900 font-medium">8:00 AM - 6:00 PM</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Saturday</span>
                                            <span className="text-gray-900 font-medium">9:00 AM - 4:00 PM</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Sunday</span>
                                            <span className="text-red-500 font-medium">Closed</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                         {/* Footer Copyright */}
                         <div className="mt-12 mb-8 text-center text-xs text-gray-500 border-t border-gray-200 pt-6">
                            © 2026 TaskMate Nigeria. All rights reserved.
                        </div>
                    </div>
                </div>

                <MobileNavBar />
            </main>
        </div>
    );
};

export default ProviderProfile;
