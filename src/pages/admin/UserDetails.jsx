import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { toast } from 'sonner';

const UserDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [clearingDebt, setClearingDebt] = useState(false);

    const DEBT_LIMIT = 5000; // Limit in Naira

    const handleToggleSuspension = async () => {
        const isCurrentlySuspended = user.status === 'Suspended';
        const action = isCurrentlySuspended ? 'reactivate' : 'suspend';
        
        if (!window.confirm(`Are you sure you want to ${action} this user?`)) return;

        try {
            const newStatus = isCurrentlySuspended ? 'Active' : 'Suspended';
            await updateDoc(doc(db, "users", id), {
                status: newStatus
            });
            setUser(prev => ({ ...prev, status: newStatus }));
            toast.success(`User successfully ${isCurrentlySuspended ? 'reactivated' : 'suspended'}`);
        } catch (error) {
            console.error(`Error trying to ${action} user:`, error);
            toast.error(`Failed to ${action} user`);
        }
    };

    const handleClearDebt = async () => {
        if (!confirm("Are you sure you want to clear this provider's commission debt?")) return;
        
        setClearingDebt(true);
        try {
            await updateDoc(doc(db, "users", id), {
                commissionBalance: 0
            });
            setUser(prev => ({ ...prev, commissionBalance: 0 }));
            toast.success("Debt cleared successfully");
        } catch (error) {
            console.error("Error clearing debt:", error);
            toast.error("Failed to clear debt");
        } finally {
            setClearingDebt(false);
        }
    };

    useEffect(() => {
        const fetchUserAndStats = async () => {
            try {
                // 1. Fetch User Profile
                const userDoc = await getDoc(doc(db, "users", id));
                if (!userDoc.exists()) {
                    toast.error("User not found");
                    navigate('/admin/users');
                    return;
                }

                const data = userDoc.data();
                const userId = userDoc.id;
                const role = data.role;

                // 2. Fetch User Requests/Jobs
                // Determine query based on role
                let requestsQuery;
                if (role === 'provider') {
                    // Providers: Get jobs they are assigned to
                    requestsQuery = query(
                        collection(db, "requests"), 
                        where("providerId", "==", userId)
                    );
                } else {
                    // Customers: Get jobs they posted
                    requestsQuery = query(
                        collection(db, "requests"),
                        where("customerId", "==", userId)
                    );
                }

                const requestSnaps = await getDocs(requestsQuery);
                const requests = requestSnaps.docs.map(d => ({ id: d.id, ...d.data() }))
                    .sort((a, b) => {
                         const timeA = a.updatedAt?.seconds || 0;
                         const timeB = b.updatedAt?.seconds || 0;
                         return timeB - timeA;
                    });

                // 3. Calculate Stats
                const completedRequests = requests.filter(r => r.status === 'Completed' || r.status === 'Paid');
                
                let earningsCalculated = 0;
                let jobsCompletedCount = completedRequests.length;

                if (role === 'provider') {
                    // For providers, sum up the budget (minus commission if applic, but for now just sum budget or simple formula)
                    // Assuming provider gets 90% of budget
                    earningsCalculated = completedRequests.reduce((acc, curr) => {
                        const amount = Number(curr.budget) || 0;
                        return acc + (amount * 0.9);
                    }, 0);
                } else {
                    // For customers, total spent
                    earningsCalculated = completedRequests.reduce((acc, curr) => acc + (Number(curr.budget) || 0), 0);
                }

                // 4. Activity Log (Top 5 recent jobs)
                const recentActivity = requests.slice(0, 5).map(req => {
                    let dateStr = 'Recent';
                    if (req.updatedAt) {
                        if (req.updatedAt.seconds) dateStr = new Date(req.updatedAt.seconds * 1000).toLocaleDateString();
                        else if (req.updatedAt.toDate) dateStr = req.updatedAt.toDate().toLocaleDateString();
                        else dateStr = new Date(req.updatedAt).toLocaleDateString();
                    }
                    return {
                        action: `${req.status} Request: ${req.title}`,
                        date: dateStr
                    };
                });
                
                let joinedDate = 'N/A';
                if (data.createdAt) {
                    if (data.createdAt.seconds) joinedDate = new Date(data.createdAt.seconds * 1000).toLocaleDateString();
                    else if (data.createdAt.toDate) joinedDate = data.createdAt.toDate().toLocaleDateString();
                    else joinedDate = new Date(data.createdAt).toLocaleDateString();
                }

                setUser({
                    id: userId,
                    name: data.displayName || data.email,
                    role: data.role,
                    service: data.category || data.serviceType || 'N/A',
                    rating: data.rating || 0,
                    status: data.status || 'Active',
                    joined: joinedDate,
                    verified: data.isVerified || false,
                    email: data.email,
                    phone: data.phoneNumber || 'N/A',
                    location: data.address || 'N/A',
                    completedJobs: jobsCompletedCount, // Use calculated count
                    bio: data.bio || 'No bio available.',
                    earnings: `₦${earningsCalculated.toLocaleString()}`, // Use calculated earnings
                    recentActivity: recentActivity.length > 0 ? recentActivity : (data.recentActivity || []),
                    commissionBalance: data.commissionBalance || 0  // Get current debt
                });

            } catch (error) {
                console.error("Error fetching user details:", error);
                toast.error("Failed to fetch user details");
            } finally {
                setLoading(false);
            }
        };

        fetchUserAndStats();
    }, [id, navigate]);

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
                        <button 
                            onClick={handleToggleSuspension}
                            className={`px-4 py-2 font-medium rounded-lg transition-colors ${
                                user.status === 'Suspended' 
                                ? 'bg-green-50 text-green-600 hover:bg-green-100'
                                : 'bg-red-50 text-red-600 hover:bg-red-100'
                            }`}
                        >
                             {user.status === 'Suspended' ? 'Reactivate User' : 'Suspend User'}
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
                                <span className="text-gray-600">
                                    {user.role === 'provider' ? 'Total Earnings' : 'Total Spent'}
                                </span>
                                <span className="font-bold text-gray-900">{user.earnings}</span>
                             </div>

                             {user.role === 'provider' && (
                                <div className="border-t border-dashed pt-4">
                                     <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-600 font-medium">Commission Debt</span>
                                        <span className={`font-bold ${user.commissionBalance > 5000 ? 'text-red-600' : 'text-green-600'}`}>
                                            ₦{user.commissionBalance?.toLocaleString() || '0'}
                                        </span>
                                     </div>
                                     {user.commissionBalance > 0 && (
                                         <button 
                                            onClick={handleClearDebt}
                                            disabled={clearingDebt}
                                            className="w-full text-xs bg-red-50 text-red-600 py-1.5 rounded-lg hover:bg-red-100 font-medium transition-colors"
                                         >
                                            {clearingDebt ? 'Clearing...' : 'Clear Debt (Payment Received)'}
                                         </button>
                                     )}
                                     {user.commissionBalance > 5000 && (
                                         <p className="text-xs text-red-500 mt-1 italic">
                                            Warning: User has exceeded the debt limit of ₦5,000.
                                         </p>
                                     )}
                                </div>
                             )}

                             <div className="flex justify-between items-center">
                                <span className="text-gray-600">Jobs Completed</span>
                                <span className="font-bold text-gray-900">{user.completedJobs}</span>
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
