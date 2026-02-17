import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/ui/Breadcrumbs';

const UserDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // MOCK FETCH
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setUser({
                id: id,
                name: 'Chidubem Okafor',
                role: 'Provider',
                service: 'Plumbing',
                rating: 4.8,
                status: 'Active',
                joined: 'Oct 2023',
                verified: true,
                email: 'chidubem@example.com',
                phone: '09011223344',
                location: 'Surulere, Lagos',
                completedJobs: 45,
                bio: 'Experienced plumber with over 10 years of field experience in residential and commercial plumbing systems.',
                earnings: '₦450,000',
                recentActivity: [
                    { action: 'Completed job #REQ-105', date: '2 days ago' },
                    { action: 'Updated profile picture', date: '5 days ago' },
                    { action: 'Withdrew ₦50,000', date: '1 week ago' }
                ]
            });
            setLoading(false);
        }, 1000);
    }, [id]);

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!user) {
        return <div className="p-6 text-center text-gray-500">User not found</div>;
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header with Breadcrumbs */}
            <div className="flex flex-col gap-2">
                <Breadcrumbs 
                    items={[
                        { label: 'Users', path: '/admin/users' },
                        { label: user.name, path: `/admin/users/${id}` }
                    ]} 
                />
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
                            Edit Profile
                        </button>
                        <button className="px-4 py-2 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100">
                             Suspend User
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info Card */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                         <div className="flex items-start gap-6">
                            <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center text-3xl font-bold text-gray-400">
                                {user.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold text-gray-900">{user.role}</h3>
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                        user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                        {user.status}
                                    </span>
                                    {user.verified && (
                                         <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full text-xs font-bold border border-blue-100">
                                            <span className="material-icons text-[14px]">verified</span>
                                            Verified
                                        </span>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-4">
                                    <div>
                                        <p className="text-gray-500 mb-1">Email Address</p>
                                        <p className="font-medium text-gray-900">{user.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 mb-1">Phone Number</p>
                                        <p className="font-medium text-gray-900">{user.phone}</p>
                                    </div>
                                     <div>
                                        <p className="text-gray-500 mb-1">Location</p>
                                        <p className="font-medium text-gray-900">{user.location}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 mb-1">Joined Date</p>
                                        <p className="font-medium text-gray-900">{user.joined}</p>
                                    </div>
                                </div>
                            </div>
                         </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                            {user.recentActivity.map((activity, i) => (
                                <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                            <span className="material-icons text-sm">history</span>
                                        </div>
                                        <span className="text-gray-700">{activity.action}</span>
                                    </div>
                                    <span className="text-xs text-gray-400">{activity.date}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                        <h3 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-4">Performance</h3>
                        <div className="space-y-4">
                             <div className="flex justify-between items-center">
                                <span className="text-gray-600">Total Earnings</span>
                                <span className="font-bold text-gray-900">{user.earnings}</span>
                             </div>
                             <div className="flex justify-between items-center">
                                <span className="text-gray-600">Jobs Completed</span>
                                <span className="font-bold text-gray-900">{user.completedJobs}</span>
                             </div>
                             <div className="flex justify-between items-center">
                                <span className="text-gray-600">Average Rating</span>
                                <div className="flex items-center gap-1 font-bold text-gray-900">
                                    <span>{user.rating}</span>
                                    <span className="material-icons text-yellow-400 text-sm">star</span>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
