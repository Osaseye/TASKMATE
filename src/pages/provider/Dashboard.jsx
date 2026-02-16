import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import ProviderSidebar from '../../components/layout/ProviderSidebar';
import ProviderMobileNavBar from '../../components/layout/ProviderMobileNavBar';

const ProviderDashboard = () => {
    // This would typically come from your auth context/user state
    const isVerified = true; // Toggle this to true to see the "Active" state

    useEffect(() => {
        // Simulate a new request coming in after 5 seconds just for demo
        const timer = setTimeout(() => {
            toast.info('New Request Nearby: Plumbing Job in Ikeja', {
                description: 'Est: ₦15,000 - 2.5km away',
                action: {
                    label: 'View',
                    onClick: () => console.log('View Request')
                },
                duration: 8000,
            });
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleDecline = (title) => {
        toast.success(`Declined request: ${title}`, {
            description: 'We will look for other providers.'
        });
    };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-text-light">
      {/* Provider Sidebar */}
      <ProviderSidebar />

      {/* Mobile Nav */}
      <ProviderMobileNavBar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
         {/* Top Bar */}
         <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
            <div className="flex items-center gap-2 md:hidden">
                 <img alt="TaskMate Icon" className="h-8 w-8 object-contain rounded-lg" src="/icon.png" />
                 <span className="font-display font-bold text-gray-900 text-lg">TaskMate</span>
            </div>
            
            <h1 className="text-xl font-semibold text-gray-800 hidden md:block">Dashboard</h1>

            <div className="flex items-center gap-4">
               {/* User Menu */}
               <div className="flex items-center gap-3">
                   <div className="hidden md:block text-right">
                       <p className="text-sm font-semibold text-gray-900">Ayomide J.</p>
                       <p className="text-xs text-gray-500">Provider ID: #TM-2024</p>
                   </div>
                   <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold border border-primary/20">
                       AJ
                   </div>
               </div>
            </div>
         </header>

         <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
            
            {/* 1. Account Status Banner (Shows if NOT verified) */}
            {!isVerified && (
                <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 flex flex-col md:flex-row items-start gap-4 shadow-sm"
                >
                <div className="bg-yellow-100 p-2 rounded-full shrink-0">
                    <span className="material-symbols-outlined text-yellow-600 text-2xl">pending_actions</span>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-yellow-800 mb-1">Account Under Review</h3>
                    <p className="text-yellow-700 text-sm leading-relaxed max-w-3xl">
                        Your profile is currently visible only to you. Once our team verifies your documents (within 24-48 hours), 
                        you will be able to accept requests and update your service details.
                    </p>
                    <div className="mt-4 flex gap-3">
                        <button className="px-4 py-2 bg-white text-yellow-700 text-sm font-semibold rounded-lg border border-yellow-200 hover:bg-yellow-50 transition-colors">
                            Check Status
                        </button>
                        <button className="px-4 py-2 text-yellow-700 text-sm font-semibold hover:underline">
                            Contact Support
                        </button>
                    </div>
                </div>
                </motion.div>
            )}

            {/* 2. Availability Toggle (Only visible/active if Verified, else disabled) */}
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
                    <p className="text-sm text-gray-500">Welcome back! Here's what's happening today.</p>
                </div>
                <div className={`bg-white p-2 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3 ${!isVerified ? 'opacity-50 pointer-events-none' : ''}`}>
                    <span className="text-sm font-medium pl-2 text-gray-600">Status:</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={isVerified} disabled={!isVerified} />
                        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                        <span className="ml-3 text-sm font-bold text-gray-700">Available</span>
                    </label>
                </div>
            </div>

            {/* 3. Stats Grid (Locked State applied via className) */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${!isVerified ? 'opacity-60 pointer-events-none select-none grayscale-[0.5]' : ''}`}>
               {/* Earnings Card */}
               <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between h-48 relative overflow-hidden group">
                  <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <span className="material-symbols-outlined text-8xl text-primary">payments</span>
                  </div>
                  <div className="flex justify-between items-start z-10">
                     <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Earnings (Oct)</p>
                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">₦145,200</h2>
                     </div>
                     <div className="p-2 bg-green-50 rounded-lg text-green-600">
                        <span className="material-symbols-outlined">trending_up</span>
                     </div>
                  </div>
                  
                  {/* Mini Graph Viz */}
                  <div className="flex items-end h-12 gap-1 mt-4 z-10 opacity-70">
                      {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                          <div key={i} className="flex-1 bg-primary rounded-t-sm" style={{ height: `${h}%` }}></div>
                      ))}
                  </div>

                  <p className="text-xs text-green-600 mt-3 font-medium flex items-center z-10">
                      <span className="material-symbols-outlined text-sm mr-1">arrow_upward</span> 
                      12% vs last month
                  </p>
               </div>

                {/* Jobs Card */}
               <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between h-48">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Jobs Completed</p>
                        <h2 className="text-3xl font-bold text-gray-900">28</h2>
                     </div>
                     <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <span className="material-symbols-outlined">assignment_turned_in</span>
                     </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                            <span className="text-gray-500">Completion Rate</span>
                            <span className="text-blue-600">98%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '98%' }}></div>
                        </div>
                    </div>
                     <div className="flex justify-between text-xs pt-1 border-t border-gray-50">
                        <span className="text-gray-400">Avg. Response Time</span>
                        <span className="font-semibold text-gray-700">15 mins</span>
                    </div>
                  </div>
               </div>

                {/* Pro Status Card */}
               <div className="bg-gradient-to-br from-[#13ec5b] to-green-700 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="material-symbols-outlined text-2xl">verified</span>
                                <h3 className="font-bold text-xl">Pro Tier</h3>
                            </div>
                            <p className="text-green-50 text-sm mb-4 leading-relaxed opacity-90">
                                You are in the top 5% of providers in Lagos. Keep it up to unlock lower fees!
                            </p>
                        </div>
                        <button className="w-full py-2.5 bg-white text-primary font-bold rounded-xl text-sm shadow-md hover:bg-green-50 transition-colors">
                            View Benefits
                        </button>
                    </div>
               </div>
            </div>

            {/* 4. Main Activity Area (2 Columns) */}
            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 h-full ${!isVerified ? 'opacity-40 grayscale pointer-events-none select-none relative' : ''}`}>
                
                {/* LOCKED OVERLAY (If not verified) */}
                {!isVerified && (
                    <div className="absolute inset-0 top-12 z-10 flex items-center justify-center">
                         <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-gray-100 text-center max-w-sm">
                             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-3xl text-gray-400">lock</span>
                             </div>
                             <h3 className="text-lg font-bold text-gray-900 mb-2">Dashboard Locked</h3>
                             <p className="text-sm text-gray-500">
                                Detailed activity and requests will appear here once your account is fully approved.
                             </p>
                         </div>
                    </div>
                )}


                {/* News & Requests (Left Col) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                            New Requests Nearby
                        </h3>
                        <button className="text-sm text-primary font-bold hover:underline">View Map</button>
                    </div>

                    {[
                        { title: 'Generator Repair', loc: 'Surulere, Lagos (2.5km)', price: '₦5k - ₦8k', type: 'Urgent', icon: 'bolt', color: 'bg-orange-100 text-orange-600' },
                        { title: 'House Wiring Check', loc: 'Ikeja GRA (5.0km)', price: '₦15k+', type: 'Large Project', icon: 'home_repair_service', color: 'bg-blue-100 text-blue-600' },
                         { title: 'Socket Replacement', loc: 'Yaba (1.2km)', price: '₦2,500', type: 'Small Job', icon: 'lightbulb', color: 'bg-purple-100 text-purple-600' },
                    ].map((job, idx) => (
                        <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                            <div className="flex justify-between items-start">
                                <div className="flex gap-4">
                                    <div className={`h-12 w-12 rounded-xl ${job.color} flex items-center justify-center shrink-0`}>
                                        <span className="material-symbols-outlined">{job.icon}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-base md:text-lg group-hover:text-primary transition-colors">{job.title}</h4>
                                        <p className="text-sm text-gray-500 flex items-center mt-1">
                                            <span className="material-symbols-outlined text-sm mr-1">location_on</span>
                                            {job.loc}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            <span className="px-2.5 py-1 bg-gray-100 text-xs font-medium rounded-md text-gray-600">{job.type}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg md:text-xl font-bold text-primary">{job.price}</p>
                                    <p className="text-xs text-gray-400 mt-1">Est. Price</p>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                                <span className="text-xs text-gray-400 font-medium">Posted 10 mins ago</span>
                                <div className="flex gap-3">
                                    <button onClick={() => handleDecline(job.title)} className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 border border-transparent hover:bg-gray-50 rounded-lg transition-colors">Decline</button>
                                    <Link to={`/provider/requests/${idx}`} className="px-4 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors">View Details</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Schedule */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4">Upcoming Schedule</h3>
                        <div className="space-y-4">
                             {[
                                 { day: '24', title: 'Inverter Install', time: '2:00 PM' },
                                 { day: '25', title: 'Maintenance', time: '10:00 AM' }
                             ].map((item, i) => (
                                <div key={i} className="flex gap-3">
                                    <div className="flex flex-col items-center justify-center w-12 bg-gray-50 rounded-xl p-2 text-center border border-gray-100">
                                        <span className="text-[10px] text-gray-400 uppercase font-bold">Oct</span>
                                        <span className="font-bold text-lg text-gray-900">{item.day}</span>
                                    </div>
                                    <div className="flex-1 py-1">
                                        <p className="text-sm font-bold text-gray-800 line-clamp-1">{item.title}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{item.time}</p>
                                    </div>
                                </div>
                             ))}
                        </div>
                        <Link to="/provider/schedule" className="w-full mt-5 py-2.5 text-sm text-primary font-bold border border-primary/20 rounded-xl hover:bg-primary/5 transition-colors block text-center">
                            View Calendar
                        </Link>
                    </div>

                    {/* Recent Activity Timeline */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
                        <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
                        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:w-0.5 before:-translate-x-1/2 before:bg-gray-200 before:h-full before:top-2 before:z-0">
                            {[
                                { title: 'Payment Received', time: '2 hours ago', icon: 'payments', color: 'bg-green-100 text-green-600', amount: '+₦15,000' },
                                { title: 'Job Completed', time: '5 hours ago', icon: 'check_circle', color: 'bg-blue-100 text-blue-600', desc: 'AC Repair - Lekki' },
                                { title: 'New Review', time: 'Yesterday', icon: 'star', color: 'bg-yellow-100 text-yellow-600', desc: '5.0 ★ from Sarah' }
                            ].map((activity, i) => (
                                <div key={i} className="relative z-10 flex gap-4">
                                    <div className={`w-10 h-10 rounded-full ${activity.color} flex items-center justify-center shrink-0 border-2 border-white shadow-sm`}>
                                        <span className="material-symbols-outlined text-lg">{activity.icon}</span>
                                    </div>
                                    <div className="py-1">
                                        <p className="text-sm font-bold text-gray-900">{activity.title}</p>
                                        <p className="text-xs text-gray-500">{activity.time}</p>
                                        {activity.amount && <p className="text-xs font-bold text-green-600 mt-1">{activity.amount}</p>}
                                        {activity.desc && <p className="text-xs text-gray-600 mt-1">{activity.desc}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 text-xs font-bold text-gray-500 hover:text-gray-900">View All Activity</button>
                    </div>

                    {/* Support Card */}
                    <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="material-symbols-outlined text-blue-600">headset_mic</span>
                            <h4 className="font-bold text-blue-900 text-sm">Need Help?</h4>
                        </div>
                        <p className="text-xs text-blue-700 mb-4 leading-relaxed">
                            Contact TaskMate support for assistance with jobs or payments.
                        </p>
                        <a href="#" className="text-xs font-bold text-blue-600 hover:underline flex items-center">
                            Contact Support 
                            <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                        </a>
                    </div>
                </div>
            </div>
         </div>
      </main>
    </div>
  );
};

export default ProviderDashboard;

