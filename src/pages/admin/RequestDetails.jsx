import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

const RequestDetails = () => {
    const { id } = useParams();
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const docRef = doc(db, 'requests', id);
                const snap = await getDoc(docRef);
                
                if (snap.exists()) {
                    const data = snap.data();
                    let customer = { id: data.customerId, name: data.customerName || 'Unknown', email: 'N/A' };
                    let provider = null;

                    if (data.customerId) {
                         const userSnap = await getDoc(doc(db, 'users', data.customerId));
                         if (userSnap.exists()) {
                             const u = userSnap.data();
                             customer = { id: userSnap.id, name: u.fullName || 'User', email: u.email };
                         }
                    }

                    if (data.providerId) {
                         const provSnap = await getDoc(doc(db, 'users', data.providerId));
                         if (provSnap.exists()) {
                             const p = provSnap.data();
                             provider = { id: provSnap.id, name: p.fullName || 'Provider', service: p.serviceType || 'Service', email: p.email };
                         }
                    }
                    
                    // Simple timeline based on status
                    const timeline = [
                        { status: 'Request Created', date: data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleDateString() : 'N/A', completed: true },
                        { status: 'In Progress', date: data.status === 'In Progress' ? 'Now' : '-', completed: data.status === 'In Progress' || data.status === 'Completed' },
                        { status: 'Completed', date: data.status === 'Completed' ? 'Done' : '-', completed: data.status === 'Completed' },
                    ];

                    setRequest({
                        id: snap.id,
                        status: data.status || 'Open',
                        service: data.serviceType || 'Service',
                        amount: data.budget ? `₦${data.budget}` : 'N/A',
                        description: data.description || 'No Description',
                        location: data.location || 'No Location',
                        timeline: timeline,
                        customer,
                        provider
                    });
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchRequest();
    }, [id]);

    if (loading) return <div className="p-10 text-center">Loading request details...</div>;
    if (!request) return <div className="p-10 text-center">Request not found</div>;

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'In Progress': return 'bg-blue-100 text-blue-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
             <div className="flex flex-col gap-2">
                <Breadcrumbs 
                    items={[
                        { label: 'Requests', path: '/admin/requests' },
                        { label: request.id, path: `/admin/requests/${id}` }
                    ]} 
                />
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">Request #{request.id.slice(0,8)}</h1>
                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${getStatusColor(request.status)}`}>
                        {request.status}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Request Overview */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Overview</h3>
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Service Type</p>
                                <p className="font-medium text-gray-900 text-lg">{request.service}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Agreed Amount</p>
                                <p className="font-bold text-gray-900 text-lg font-mono">{request.amount}</p>
                            </div>
                        </div>
                        <div>
                             <p className="text-sm text-gray-500 mb-2">Description</p>
                             <p className="text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                {request.description}
                             </p>
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-100">
                            <p className="text-sm text-gray-500 mb-1">Service Location</p>
                            <div className="flex items-center gap-2 text-gray-900">
                                <span className="material-icons text-gray-400 text-sm">location_on</span>
                                {request.location}
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Request Timeline</h3>
                        <div className="relative border-l-2 border-gray-200 ml-3 space-y-8">
                            {request.timeline.map((item, i) => (
                                <div key={i} className="relative pl-8">
                                    <span className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-white ${
                                        item.completed ? 'bg-green-500' : 'bg-gray-300'
                                    }`}></span>
                                    <h4 className={`text-sm font-bold ${item.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                                        {item.status}
                                    </h4>
                                    <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    {/* Customer Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                        <h3 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-4">Customer</h3>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold">
                                {(request.customer.name || '?').charAt(0)}
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">{request.customer.name}</p>
                                <p className="text-xs text-gray-500">{request.customer.email}</p>
                            </div>
                        </div>
                        <Link to={`/admin/users/${request.customer.id}`} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                            View Profile &rarr;
                        </Link>
                    </div>

                    {/* Provider Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                        <h3 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-4">Assigned Provider</h3>
                        {request.provider ? (
                             <>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="h-10 w-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center font-bold">
                                        {request.provider.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">{request.provider.name}</p>
                                        <p className="text-xs text-gray-500">{request.provider.service}</p>
                                    </div>
                                </div>
                                <Link to={`/admin/users/${request.provider.id}`} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                    View Profile &rarr;
                                </Link>
                             </>
                        ) : (
                            <p className="text-sm text-gray-500 italic text-center py-4">No provider assigned</p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                        <h3 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-4">Admin Actions</h3>
                        <div className="space-y-3">
                            <button className="w-full py-2 px-4 rounded-lg bg-gray-900 text-white font-medium text-sm hover:bg-gray-800 transition-colors">
                                Resolve Dispute
                            </button>
                             <button className="w-full py-2 px-4 rounded-lg border border-red-200 text-red-600 bg-red-50 font-medium text-sm hover:bg-red-100 transition-colors">
                                Cancel Request
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestDetails;
