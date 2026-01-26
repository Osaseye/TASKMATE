import React from 'react';
import Sidebar from '../../components/layout/Sidebar';
import MobileNavBar from '../../components/layout/MobileNavBar';

const Settings = () => {
    return (
        <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
            <Sidebar />
            
            <main className="flex-1 overflow-hidden flex flex-col min-w-0">
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        {/* Page Heading */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Account Settings</h2>
                            <p className="text-gray-500 mt-2">Manage your personal information and security preferences.</p>
                        </div>
                        
                        {/* Tabs */}
                        <div className="border-b border-gray-200 mb-8 overflow-x-auto">
                            <nav className="flex gap-8 min-w-max">
                                <a className="border-b-2 border-green-500 text-gray-900 pb-4 px-1 text-sm font-bold" href="#">Profile</a>
                                <a className="border-b-2 border-transparent text-gray-500 hover:text-gray-900 pb-4 px-1 text-sm font-medium transition-all" href="#">Security</a>
                                {/* Payment Methods removed as requested */}
                                <a className="border-b-2 border-transparent text-gray-500 hover:text-gray-900 pb-4 px-1 text-sm font-medium transition-all" href="#">Notifications</a>
                            </nav>
                        </div>
                        
                        {/* Profile Tab Content */}
                        <div className="space-y-10">
                            {/* Profile Picture Section */}
                            <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-white border border-gray-200 rounded-xl shadow-sm gap-4">
                                <div className="flex items-center gap-6">
                                    <div className="relative group">
                                        <div className="h-24 w-24 rounded-full bg-cover bg-center border-4 border-gray-100 shadow-lg" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBBtcXgozOQE2hfGZcdaUkvZW5-Xq60-dvBRewTsQhCRqfZlRqi7Wwwfsfe9LMRmAX5yK2hqi_iUchM37-ALM1FJTje8liIEV3sopKdSLlCZsBtVsvsdUNnkwtMDYLADPozKKsDUCiUIsMG1vhTSx2hBaVk8ukru_Wgy2cMy2ugWL2rSYpZXBdPx4hOdzxlce0hqm7N1oJXy7bt6fHuFlAqlaF81be8gzfUhdxL8yvjdENd2x-oSFy68MQb6EYhwUKgLYap-BOPGEk')"}}></div>
                                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                            <span className="material-icons-outlined text-white">photo_camera</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold">Profile Photo</h3>
                                        <p className="text-sm text-gray-500">JPG, GIF or PNG. Max size of 800KB</p>
                                    </div>
                                </div>
                                <button className="px-5 py-2.5 bg-gray-100 text-gray-900 text-sm font-bold rounded-lg hover:bg-gray-200 transition-all whitespace-nowrap">
                                    Change Photo
                                </button>
                            </div>
                            
                            {/* Personal Information Form */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <span className="material-icons-outlined text-green-500">person</span>
                                    Personal Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Full Name */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-gray-900">Full Name</label>
                                        <input className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" placeholder="Enter your full name" type="text" defaultValue="Chinelo Ada"/>
                                    </div>
                                    {/* Email (Read-only styled) */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-gray-900">Email Address</label>
                                        <div className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed flex items-center gap-2">
                                            <span className="material-icons-outlined text-sm">lock</span>
                                            chinelo@example.ng
                                        </div>
                                    </div>
                                    {/* Phone Number */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-gray-900">Phone Number</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 gap-2 pointer-events-none border-r border-gray-200 pr-2 mr-2">
                                                <span className="text-lg">🇳🇬</span>
                                                <span className="text-sm font-medium">+234</span>
                                            </div>
                                            <input className="w-full pl-24 pr-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" type="tel" defaultValue="8031234567"/>
                                        </div>
                                    </div>
                                    {/* Primary Address */}
                                    <div className="flex flex-col gap-2 md:col-span-2">
                                        <label className="text-sm font-semibold text-gray-900">Primary Address</label>
                                        <div className="relative">
                                            <span className="material-icons-outlined absolute left-4 top-3.5 text-gray-400">location_on</span>
                                            <input className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" placeholder="Enter your address" type="text" defaultValue="15b Admiralty Way, Lekki Phase 1, Lagos"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Location details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-gray-900">State</label>
                                    <select className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all">
                                        <option defaultValue>Lagos</option>
                                        <option>Abuja (FCT)</option>
                                        <option>Rivers</option>
                                        <option>Ogun</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-gray-900">LGA</label>
                                    <select className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all">
                                        <option defaultValue>Eti-Osa</option>
                                        <option>Ikeja</option>
                                        <option>Ikorodu</option>
                                        <option>Surulere</option>
                                    </select>
                                </div>
                            </div>
                            
                            {/* Form Actions */}
                            <div className="flex items-center justify-end gap-4 pt-10 mt-10 border-t border-gray-200">
                                <button className="px-6 py-3 text-gray-600 hover:text-gray-900 font-bold transition-all">
                                    Cancel
                                </button>
                                <button className="px-8 py-3 bg-green-500 text-white font-black rounded-lg shadow-lg shadow-green-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <MobileNavBar />
            </main>
        </div>
    );
};

export default Settings;
