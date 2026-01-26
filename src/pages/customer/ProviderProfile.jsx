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
                <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 md:hidden sticky top-0 z-20">
                    <div className="flex items-center gap-2">
                         <Link to="/customer/browse" className="text-gray-500 hover:text-gray-900">
                             <span className="material-icons-outlined">arrow_back</span>
                         </Link>
                        <span className="text-lg font-bold text-gray-900">Provider Profile</span>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto pb-24">
                     {/* Banner / Header Image Area - Premium Look with Dark Gradient Overlay */}
                    <div className="relative h-64 w-full bg-gray-900">
                        <img 
                            src="https://images.unsplash.com/photo-1581578014828-440141692ec7?q=80&w=1920&auto=format&fit=crop" 
                            alt="Plumbing Background" 
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent"></div>
                        
                        {/* Desktop Back Button */}
                        <div className="absolute top-6 left-6 hidden md:block">
                            <Link to="/customer/browse" className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md hover:bg-white/20 transition-all border border-white/10">
                                <span className="material-icons-outlined text-sm">arrow_back</span>
                                Back to Browse
                            </Link>
                        </div>
                    </div>

                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            
                            {/* Left Column: Profile Info */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Profile Card - Elevated Design */}
                                <div className="bg-white shadow-xl shadow-gray-200/50 rounded-2xl overflow-hidden border border-gray-100">
                                    <div className="px-8 pb-8 relative pt-20">
                                        <div className="absolute -top-16 left-8">
                                            <div className="relative">
                                                <img 
                                                    alt="Service Provider" 
                                                    className="h-32 w-32 rounded-2xl ring-4 ring-white bg-white object-cover shadow-lg" 
                                                    src={provider.image} 
                                                />
                                                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1.5 rounded-full shadow-lg border-2 border-white flex items-center justify-center" title="Verified Pro">
                                                    <span className="material-icons-outlined text-sm">verified</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-2 md:ml-40 md:-mt-14">
                                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                                <div>
                                                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{provider.name}</h1>
                                                    <div className="flex items-center text-sm text-gray-500 mt-2 font-medium">
                                                        <span className="material-icons-outlined text-lg mr-1 text-gray-400">location_on</span>
                                                        {provider.location}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                                        <span className="material-icons-outlined text-yellow-500 text-sm mr-1.5">star</span>
                                                        <span className="font-bold text-gray-900 text-sm">{provider.rating}</span>
                                                        <span className="text-xs text-gray-500 ml-1.5 border-l border-gray-200 pl-1.5">{provider.reviews} reviews</span>
                                                    </div>
                                                    <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 text-sm text-gray-600 font-medium">
                                                        <span className="material-icons-outlined text-gray-400 text-base mr-1.5">work_history</span>
                                                        <span>{provider.jobs} Jobs</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2 mt-6">
                                                {provider.tags.map(tag => (
                                                    <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-default">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* About Section - Minimalist */}
                                <div className="bg-white shadow-sm rounded-2xl p-8 border border-gray-100">
                                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <span className="material-icons-outlined text-gray-400">person</span>
                                        About Me
                                    </h2>
                                    <div className="prose prose-sm text-gray-600 max-w-none leading-relaxed">
                                        {provider.about.map((paragraph, idx) => (
                                            <p key={idx} className={idx > 0 ? "mt-4" : ""}>{paragraph}</p>
                                        ))}
                                    </div>
                                </div>

                                {/* Portfolio Section - Grid */}
                                <div className="bg-white shadow-sm rounded-2xl p-8 border border-gray-100">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                            <span className="material-icons-outlined text-gray-400">photo_library</span>
                                            Recent Projects
                                        </h2>
                                        <Link to="#" className="text-green-600 hover:text-green-700 text-sm font-semibold">View all projects</Link>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {provider.portfolio.map((img, idx) => (
                                            <div key={idx} className={`relative rounded-xl overflow-hidden h-32 group cursor-pointer ${idx === 3 ? 'bg-gray-900' : ''} shadow-sm border border-gray-100`}>
                                                <img 
                                                    alt={`Work sample ${idx + 1}`}
                                                    className={`h-full w-full object-cover transition duration-300 ${idx === 3 ? 'opacity-50 group-hover:opacity-40' : 'hover:scale-110'}`} 
                                                    src={img} 
                                                />
                                                {idx === 3 && (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <span className="text-white font-bold text-xl">+12</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Reviews Section */}
                                <div className="bg-white shadow-sm rounded-2xl p-8 border border-gray-100">
                                    <h2 className="text-lg font-bold text-gray-900 mb-8 flex items-center gap-2">
                                        <span className="material-icons-outlined text-gray-400">rate_review</span>
                                        Customer Reviews
                                    </h2>
                                    <div className="space-y-8">
                                        {/* Review 1 */}
                                        <div className="flex gap-4">
                                            <img alt="Reviewer" className="h-12 w-12 rounded-full object-cover border border-gray-100" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpKlNVRNSwZYgQtHgX87NoxWpSz8nK2xOoOVAMsZCC40TDYrpuDil5sNPw3DCuRpF9OLL1RkhfGLNIG4gXl5KtOfZ07KuuGH6g5o700gUHaZFbNi52Txaat0ecI4vG4mD94aUETE7DljD24o3Lwq00b0gyewzILEQLzdyHocctE2JK_8sWgpEhlVYQ53SsxttvNj41v3rAmUQiBBWVhc7-nCswMx6zPC0Jy1fU1OAEJmLETdPd0nUEx1JvUwZ_5ijZSOATbb5TorA"/>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-sm font-bold text-gray-900">Adaobi N.</h3>
                                                    <span className="text-xs text-gray-400">2 days ago</span>
                                                </div>
                                                <div className="flex items-center mt-1 text-yellow-400">
                                                    {[1,2,3,4,5].map(i => <span key={i} className="material-icons-outlined text-sm">star</span>)}
                                                </div>
                                                <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                                                    Chidubem did a fantastic job fixing the leak under my kitchen sink. He arrived on time and was very professional. Highly recommended!
                                                </p>
                                            </div>
                                        </div>
                                        <div className="border-t border-gray-50"></div>
                                        {/* Review 2 */}
                                        <div className="flex gap-4">
                                            <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm border border-blue-100">TB</div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-sm font-bold text-gray-900">Tunde B.</h3>
                                                    <span className="text-xs text-gray-400">1 week ago</span>
                                                </div>
                                                <div className="flex items-center mt-1 text-yellow-400">
                                                    {[1,2,3,4].map(i => <span key={i} className="material-icons-outlined text-sm">star</span>)}
                                                    <span className="material-icons-outlined text-sm text-gray-200">star</span>
                                                </div>
                                                <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                                                    Good work overall, though he arrived a bit later than scheduled due to traffic. The repair was solid though.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8 text-center">
                                        <button className="text-green-600 hover:text-green-700 font-semibold text-sm transition-colors border-b-2 border-transparent hover:border-green-600 pb-0.5">Load more reviews</button>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Booking Card (Sticky) */}
                            <div className="lg:col-span-1">
                                <div className="bg-white shadow-xl shadow-gray-200/50 rounded-2xl p-6 sticky top-6 border border-gray-100">
                                    <div className="flex justify-between items-baseline mb-6 pb-6 border-b border-gray-50">
                                        <h3 className="text-lg font-bold text-gray-900">Estimated Price</h3>
                                        <span className="text-3xl font-black text-gray-900 tracking-tight">{provider.price}<span className="text-sm font-medium text-gray-400 ml-1">{provider.unit}</span></span>
                                    </div>
                                    
                                    <form className="space-y-5">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2" htmlFor="service-type">Service Type</label>
                                            <div className="relative">
                                                <select className="block w-full rounded-xl border-gray-200 bg-gray-50 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm py-3 px-4 border outline-none font-medium text-gray-900 appearance-none" id="service-type" name="service-type">
                                                    <option>General Plumbing Repair</option>
                                                    <option>Installation</option>
                                                    <option>Inspection</option>
                                                    <option>Emergency Service</option>
                                                </select>
                                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500">
                                                    <span className="material-icons-outlined text-xl">expand_more</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2" htmlFor="date">Preferred Date</label>
                                            <input 
                                                className="block w-full rounded-xl border-gray-200 bg-gray-50 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm py-3 px-4 border outline-none font-medium text-gray-900" 
                                                id="date" 
                                                name="date" 
                                                type="date"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2" htmlFor="message">Description</label>
                                            <textarea 
                                                className="block w-full rounded-xl border-gray-200 bg-gray-50 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm py-3 px-4 border outline-none font-medium text-gray-900" 
                                                id="message" 
                                                name="message" 
                                                placeholder="Briefly describe your issue..." 
                                                rows="3"
                                            ></textarea>
                                        </div>
                                        <button className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-green-500/30 text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all transform hover:-translate-y-0.5" type="submit">
                                            Hire {provider.name.split(' ')[0]} Now
                                        </button>
                                        <button className="w-full flex justify-center items-center py-3 px-4 border border-gray-200 rounded-xl shadow-sm text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-all gap-2" type="button">
                                            <span className="material-icons-outlined text-gray-400 text-lg">chat</span>
                                            Message Provider
                                        </button>
                                    </form>

                                    <div className="mt-8 pt-6 border-t border-gray-50">
                                         <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Availability</h3>
                                         <div className="space-y-3">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-600 flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                                    Mon - Fri
                                                </span>
                                                <span className="text-gray-900 font-bold">8:00 AM - 6:00 PM</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-600 flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                                                    Saturday
                                                </span>
                                                <span className="text-gray-900 font-bold">9:00 AM - 4:00 PM</span>
                                            </div>
                                         </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-gray-400 font-medium">
                                    <span className="material-icons-outlined text-base text-gray-300">shield</span>
                                    <span>Guaranteed by TaskMate Protection</span>
                                </div>
                            </div>
                        </div>
                        
                         {/* Footer Copyright */}
                         <div className="mt-12 mb-8 text-center text-xs text-gray-400 border-t border-gray-200 pt-8">
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
