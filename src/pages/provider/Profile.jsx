import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProviderSidebar from '../../components/layout/ProviderSidebar';
import ProviderMobileNavBar from '../../components/layout/ProviderMobileNavBar';
import { Toaster, toast } from 'sonner';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('details'); // details, services, reviews
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: '---',
    email: '---',
    phone: '---',
    location: '---',
    bio: '---',
    rating: 0,
    jobsCompleted: 0,
    memberSince: '---',
    avatar: '', // Placeholder
    banner: null
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (type) => {
    // Mock upload
    toast.info(`Click here to upload ${type}`);
  };

  const [services, setServices] = useState([
    { id: 1, name: 'Generator Repair', rate: '₦5,000', unit: 'per visit' },
    { id: 2, name: 'House Wiring', rate: '₦15,000', unit: 'per room' },
    { id: 3, name: 'AC Installation', rate: '₦10,000', unit: 'per unit' },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-gray-800">
      <ProviderSidebar />
      <ProviderMobileNavBar />
      <Toaster position="top-right" />

      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-4 md:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">My Profile</h1>
          {isEditing ? (
             <div className="flex gap-2">
                 <button onClick={() => setIsEditing(false)} className="px-4 py-1.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100">Cancel</button>
                 <button onClick={handleSave} className="px-4 py-1.5 rounded-lg bg-primary text-primary-content font-bold shadow-sm">Save Changes</button>
             </div>
          ) : (
             <button onClick={() => setIsEditing(true)} className="text-primary font-medium hover:underline">Edit Profile</button>
          )}
        </header>

        <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
          
          {/* Profile Header Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className={`h-32 bg-primary/10 relative group ${isEditing ? 'cursor-pointer hover:bg-primary/20' : ''}`} onClick={() => isEditing && handleImageUpload('cover')}>
               {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-white text-3xl drop-shadow-md">upload</span>
                  </div>
               )}
            </div>
            <div className="px-6 pb-6 relative">
              <div className="flex flex-col md:flex-row items-start md:items-end -mt-12 mb-4 gap-4">
                <div className="relative group">
                  <img 
                    src={profile.avatar} 
                    alt={profile.name} 
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover bg-white"
                  />
                  {isEditing && (
                    <button 
                        onClick={() => handleImageUpload('avatar')}
                        className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border-4 border-transparent"
                    >
                         <span className="material-symbols-outlined text-white">photo_camera</span>
                    </button>
                  )}
                  {!isEditing && <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>}
                </div>
                <div className="flex-1 w-full">
                  {isEditing ? (
                      <div className="space-y-2 max-w-md">
                          <input 
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            className="text-2xl font-bold text-gray-900 border-b border-gray-300 focus:border-primary outline-none bg-transparent w-full pb-1"
                          />
                          <input 
                            name="location"
                            value={profile.location}
                            onChange={handleChange}
                            className="text-gray-500 text-sm border-b border-gray-300 focus:border-primary outline-none bg-transparent w-full pb-1"
                          />
                      </div>
                  ) : (
                      <>
                        <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                        <p className="text-gray-500 flex items-center gap-1 text-sm">
                            <span className="material-symbols-outlined text-lg">location_on</span>
                            {profile.location}
                        </p>
                      </>
                  )}
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                  <div className="text-center px-4 py-2 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="text-lg font-bold text-gray-900">{profile.rating}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Rating</div>
                  </div>
                  <div className="text-center px-4 py-2 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="text-lg font-bold text-gray-900">{profile.jobsCompleted}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Jobs</div>
                  </div>
                </div>
              </div>
              
              {isEditing ? (
                  <textarea 
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:border-primary outline-none text-gray-600 leading-relaxed min-h-[100px]"
                  />
              ) : (
                  <p className="text-gray-600 leading-relaxed max-w-3xl">
                    {profile.bio}
                  </p>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200 overflow-x-auto no-scrollbar">
            {['details', 'services', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap border-b-2 ${
                  activeTab === tab 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {activeTab === 'details' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                  <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Contact Information</h3>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Email Address</label>
                    <p className="text-gray-900 font-medium text-gray-500 cursor-not-allowed" title="Contact support to change email">{profile.email}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Phone Number</label>
                    {isEditing ? (
                        <input 
                            name="phone"
                            value={profile.phone}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:border-primary outline-none"
                        />
                    ) : (
                        <p className="text-gray-900 font-medium">{profile.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Member Since</label>
                    <p className="text-gray-900 font-medium">{profile.memberSince}</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <h3 className="font-bold text-gray-900">Verification Status</h3>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">VERIFIED</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-600">
                      <span className="material-symbols-outlined text-green-600">check_circle</span>
                      <span className="text-sm">Identity Verified (NIN)</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <span className="material-symbols-outlined text-green-600">check_circle</span>
                      <span className="text-sm">Address Verified</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <span className="material-symbols-outlined text-green-600">check_circle</span>
                      <span className="text-sm">Background Check Cleared</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'services' && (
               <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
              >
                 <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">Services Offered</h3>
                    <button className="text-sm font-bold text-primary flex items-center gap-1 hover:underline">
                        <span className="material-symbols-outlined text-lg">add</span>
                        Add Service
                    </button>
                 </div>
                 <div className="divide-y divide-gray-100">
                    {services.map((service) => (
                        <div key={service.id} className="p-4 md:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                            <div>
                                <p className="font-bold text-gray-900">{service.name}</p>
                                <p className="text-sm text-gray-500">Standard service</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-gray-900">{service.rate}</p>
                                <p className="text-xs text-gray-500">{service.unit}</p>
                            </div>
                        </div>
                    ))}
                 </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center text-gray-500"
                >
                    <span className="material-symbols-outlined text-4xl mb-2 opacity-50">reviews</span>
                    <p>Reviews will appear here once you complete jobs.</p>
                </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
