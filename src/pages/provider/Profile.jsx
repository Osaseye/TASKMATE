import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProviderSidebar from '../../components/layout/ProviderSidebar';
import ProviderMobileNavBar from '../../components/layout/ProviderMobileNavBar';
import { Toaster, toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';
import { storage, db } from '../../lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';

const Profile = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('details'); // details, services, reviews
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    rating: 0,
    jobsCompleted: 0,
    memberSince: '',
    avatar: 'https://via.placeholder.com/150',
    banner: null,
    reviews: []
  });

  const [services, setServices] = useState([]);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [newService, setNewService] = useState({ name: '', rate: '', unit: 'per hour' });

  // Listen for real-time updates to user profile (ratings, jobs, etc.)
  useEffect(() => {
    if (!currentUser?.uid) return;

    const unsubscribe = onSnapshot(doc(db, "users", currentUser.uid), (docSnap) => {
        if (docSnap.exists()) {
            const data = docSnap.data();
            setProfile(prev => ({
                ...prev,
                name: data.displayName || prev.name,
                email: data.email || prev.email,
                phone: data.phoneNumber || prev.phone,
                location: data.address || prev.location,
                bio: data.description || data.bio || prev.bio,
                rating: data.rating || 0,
                jobsCompleted: data.jobsCompleted || 0,
                memberSince: data.createdAt ? new Date(data.createdAt).toLocaleDateString() : prev.memberSince,
                avatar: data.photoURL || prev.avatar,
                banner: data.banner || prev.banner,
                reviews: data.reviews || []
            }));
            if (data.services) {
                setServices(data.services);
            }
        }
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Fallback initial load from AuthContext while listener connects
  useEffect(() => {
    if (currentUser && !profile.email) {
      setProfile({
        name: currentUser.displayName || '',
        email: currentUser.email || '',
        phone: currentUser.phoneNumber || '',
        location: currentUser.address || '',
        bio: currentUser.description || currentUser.bio || '',
        rating: currentUser.rating || 0,
        jobsCompleted: currentUser.jobsCompleted || 0,
        memberSince: currentUser.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : '---',
        avatar: currentUser.photoURL || 'https://via.placeholder.com/150',
        banner: currentUser.banner || null,
        reviews: currentUser.reviews || []
      });
      if (currentUser.services) {
        setServices(currentUser.services);
      }
    }
  }, [currentUser, profile.email]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUserProfile({
        displayName: profile.name,
        phoneNumber: profile.phone,
        address: profile.location,
        bio: profile.bio,
        description: profile.bio, // Keep description in sync
        services: services 
      });
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = () => {
      if (!newService.name || !newService.rate) {
          toast.error("Please fill in service name and rate");
          return;
      }
      const service = { ...newService, id: Date.now() };
      setServices([...services, service]);
      setNewService({ name: '', rate: '', unit: 'per hour' }); // Reset
      setShowServiceModal(false);
      
      // Auto-save services to Firestore
      updateUserProfile({ services: [...services, service] })
        .then(() => toast.success("Service added"))
        .catch(() => toast.error("Failed to save service"));
  };

  const handleDeleteService = (id) => {
      const updatedServices = services.filter(s => s.id !== id);
      setServices(updatedServices);
      
      // Auto-save deletion
      updateUserProfile({ services: updatedServices })
        .then(() => toast.success("Service removed"))
        .catch(() => toast.error("Failed to remove service"));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size should be less than 5MB');
        return;
    }

    const toastId = toast.loading(`Uploading ${type}...`);

    try {
        const storageRef = ref(storage, `${type === 'avatar' ? 'profile_pictures' : 'banners'}/${currentUser.uid}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // Optional: Update progress in UI
            },
            (error) => {
                console.error("Upload error:", error);
                toast.error(`Failed to upload ${type}`, { id: toastId });
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                
                // Update Firestore and Local State immediately
                const updateData = type === 'avatar' ? { photoURL: downloadURL } : { banner: downloadURL };
                await updateUserProfile(updateData);
                
                setProfile(prev => ({ 
                    ...prev, 
                    [type === 'avatar' ? 'avatar' : 'banner']: downloadURL 
                }));
                
                toast.success(`${type === 'avatar' ? 'Profile picture' : 'Banner'} updated!`, { id: toastId });
            }
        );
    } catch (error) {
        console.error("Error setting up upload:", error);
        toast.error("An error occurred", { id: toastId });
    }
  };

  const handleImageUploadClick = (type) => {
    document.getElementById(`file-input-${type}`).click();
  };

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
                 <button 
                    onClick={() => setIsEditing(false)} 
                    disabled={loading}
                    className="px-4 py-1.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 disabled:opacity-50"
                >
                    Cancel
                </button>
                 <button 
                    onClick={handleSave} 
                    disabled={loading}
                    className="px-4 py-1.5 rounded-lg bg-primary text-primary-content font-bold shadow-sm disabled:opacity-50 flex items-center gap-2"
                >
                    {loading ? <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span> : null}
                    Save Changes
                </button>
             </div>
          ) : (
             <button onClick={() => setIsEditing(true)} className="text-primary font-medium hover:underline">Edit Profile</button>
          )}
        </header>

        <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
          
          {/* Hidden File Inputs */}
          <input 
            type="file" 
            id="file-input-avatar" 
            className="hidden" 
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'avatar')}
          />
          <input 
            type="file" 
            id="file-input-cover" 
            className="hidden" 
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'cover')}
          />

          {/* Profile Header Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div 
                className={`h-32 bg-primary/10 relative group ${isEditing ? 'cursor-pointer hover:bg-primary/20' : ''}`} 
                onClick={() => isEditing && handleImageUploadClick('cover')}
            >
               {profile.banner && <img src={profile.banner} alt="Banner" className="w-full h-full object-cover" />}
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
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=User'; }}
                  />
                  {isEditing && (
                    <button 
                        onClick={(e) => { e.stopPropagation(); handleImageUploadClick('avatar'); }}
                        className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border-4 border-transparent cursor-pointer"
                    >
                         <span className="material-symbols-outlined text-white">photo_camera</span>
                    </button>
                  )}
                  {!isEditing && <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>}
                </div>
                <div className="flex-1 w-full">
                  {isEditing ? (
                      <div className="space-y-2 max-w-md">
                          <label className="block text-xs text-gray-400 uppercase font-semibold">Display Name</label>
                          <input 
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            className="text-2xl font-bold text-gray-900 border-b border-gray-300 focus:border-primary outline-none bg-transparent w-full pb-1"
                            placeholder="Your Name"
                          />
                          <label className="block text-xs text-gray-400 uppercase font-semibold mt-2">Location</label>
                          <input 
                            name="location"
                            value={profile.location}
                            onChange={handleChange}
                            className="text-gray-500 text-sm border-b border-gray-300 focus:border-primary outline-none bg-transparent w-full pb-1"
                            placeholder="City, State"
                          />
                      </div>
                  ) : (
                      <>
                        <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                        <p className="text-gray-500 flex items-center gap-1 text-sm">
                            <span className="material-symbols-outlined text-lg">location_on</span>
                            {profile.location || 'Location not set'}
                        </p>
                      </>
                  )}
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                  <div className="text-center px-4 py-2 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="text-lg font-bold text-gray-900">{parseFloat(profile.rating).toFixed(1)}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Rating</div>
                  </div>
                  <div className="text-center px-4 py-2 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="text-lg font-bold text-gray-900">{profile.jobsCompleted}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Jobs</div>
                  </div>
                </div>
              </div>
              
              {isEditing ? (
                  <div className="mt-4">
                    <label className="block text-xs text-gray-400 uppercase font-semibold mb-1">Bio</label>
                    <textarea 
                        name="bio"
                        value={profile.bio}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:border-primary outline-none text-gray-600 leading-relaxed min-h-[100px]"
                        placeholder="Tell customers about your experience and skills..."
                    />
                  </div>
              ) : (
                  <p className="text-gray-600 leading-relaxed max-w-3xl mt-2">
                    {profile.bio || 'No bio provided yet.'}
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
                    <button 
                        onClick={() => setShowServiceModal(true)}
                        className="text-sm font-bold text-primary flex items-center gap-1 hover:underline"
                    >
                        <span className="material-symbols-outlined text-lg">add</span>
                        Add Service
                    </button>
                 </div>
                 
                 {showServiceModal && (
                    <div className="p-6 bg-gray-50 border-b border-gray-100 space-y-4 animate-fade-in">
                        <h4 className="font-bold text-gray-800 text-sm">New Service Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input 
                                placeholder="Service Name (e.g. Consulting)" 
                                value={newService.name}
                                onChange={(e) => setNewService({...newService, name: e.target.value})}
                                className="border border-gray-300 rounded-lg p-2 text-sm focus:border-primary outline-none"
                            />
                            <div className="flex bg-white border border-gray-300 rounded-lg overflow-hidden focus-within:border-primary">
                                <span className="bg-gray-100 px-3 py-2 text-gray-500 text-sm border-r border-gray-300">₦</span>
                                <input 
                                    placeholder="Rate" 
                                    type="number"
                                    value={newService.rate}
                                    onChange={(e) => setNewService({...newService, rate: e.target.value})}
                                    className="w-full p-2 text-sm outline-none"
                                />
                            </div>
                            <select 
                                value={newService.unit}
                                onChange={(e) => setNewService({...newService, unit: e.target.value})}
                                className="border border-gray-300 rounded-lg p-2 text-sm focus:border-primary outline-none bg-white"
                            >
                                <option value="per hour">per hour</option>
                                <option value="per visit">per visit</option>
                                <option value="per project">per project</option>
                                <option value="per item">per item</option>
                            </select>
                        </div>
                        <div className="flex gap-2 justify-end">
                            <button 
                                onClick={() => setShowServiceModal(false)}
                                className="px-4 py-2 text-gray-500 text-sm hover:bg-gray-200 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleAddService}
                                className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-dark"
                            >
                                Add Service
                            </button>
                        </div>
                    </div>
                 )}

                 <div className="divide-y divide-gray-100 service-list">
                    {services.length > 0 ? (
                        services.map((service) => (
                        <div key={service.id || Math.random()} className="p-4 md:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                            <div>
                                <p className="font-bold text-gray-900">{service.name}</p>
                                <p className="text-sm text-gray-500 capitalize">{service.unit}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="font-bold text-gray-900">
                                        {/* Handle both number and formatted string for robustness */}
                                        {isNaN(service.rate) ? service.rate : `₦${Number(service.rate).toLocaleString()}`}
                                    </p>
                                </div>
                                <button 
                                    onClick={() => handleDeleteService(service.id)}
                                    className="p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all rounded-full hover:bg-red-50"
                                    title="Remove Service"
                                >
                                    <span className="material-symbols-outlined">delete</span>
                                </button>
                            </div>
                        </div>
                    ))
                    ) : (
                        <div className="p-8 text-center text-gray-400">
                            <span className="material-symbols-outlined text-4xl mb-2 opacity-30">design_services</span>
                            <p>No services listed. Add services to attract customers!</p>
                        </div>
                    )}
                 </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    {profile.reviews && profile.reviews.length > 0 ? (
                        profile.reviews.map((review, idx) => (
                            <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold border border-green-200">
                                            {review.user ? review.user.charAt(0).toUpperCase() : 'C'}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{review.user || 'Customer'}</p>
                                            <p className="text-xs text-gray-500">{review.date ? review.date : new Date(review.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex text-yellow-500">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={`material-symbols-outlined text-sm ${i < (review.rating || 0) ? 'fill-current' : 'text-gray-300'}`}>star</span>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-3">{review.comment || review.text}</p>
                                {review.tags && review.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {review.tags.map((tag, i) => (
                                            <span key={i} className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-100">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center text-gray-500">
                            <span className="material-symbols-outlined text-4xl mb-2 opacity-50">reviews</span>
                            <p>No reviews recieved yet. Complete jobs to earn ratings!</p>
                        </div>
                    )}
                </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
