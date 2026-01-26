import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import MobileNavBar from '../../components/layout/MobileNavBar';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('All');

    // Sample data for the table
    const requests = [
        { id: '#REQ-2024-001', service: 'Plumbing Repair', date: 'Oct 24, 2023', provider: 'Tunde Fixes', status: 'In Progress', amount: '₦15,000' },
        { id: '#REQ-2024-002', service: 'House Cleaning', date: 'Oct 22, 2023', provider: 'Clean & Shine', status: 'Scheduled', amount: '₦12,500' },
        { id: '#REQ-2024-003', service: 'Electrical Work', date: 'Oct 20, 2023', provider: 'Ibrahim Electric', status: 'Completed', amount: '₦8,000' },
        { id: '#REQ-2024-004', service: 'Catering Service', date: 'Oct 18, 2023', provider: "Sarah's Kitchen", status: 'Cancelled', amount: '₦45,000' },
    ];

    const filteredRequests = activeTab === 'All' 
        ? requests 
        : requests.filter(req => req.status === activeTab);

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
            {/* Sidebar Component */}
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 md:hidden">
                    <div className="flex items-center gap-2">
                        <img alt="Logo" className="h-6 w-6" src="/icon.png" />
                        <span className="text-xl font-bold text-green-800">TaskMate</span>
                    </div>
                    <div className="flex items-center gap-3">
                         <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-600">
                             <span className="material-icons-outlined text-xl">notifications</span>
                         </button>
                         <img alt="Profile" className="h-8 w-8 rounded-full object-cover border border-gray-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4gAl8ygivGzLV7fguS8_HqLj4Nz8L6xulfQanmWwRILtbM7AGp_NgwIsDJTevzZC37joVIxncbKh1hQ3p46OohQQKX70g-Dk9ta5N4y4_mLayLFl7vMKCRxYsjxtJCdqL_wV0li03JRubJX_fd8xTOHlw3hbtwoOkhRbM5muqwGY024FFkF4Ce_jaa6he7FAo4QXOIYQVmMrLehG_oZBzG8BHMDJAJ43Mlz4_SOhPXXfzT2w_Hgxv6ShHVYaLCbeDxiz3DyS0MS4" />
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto bg-gray-50 p-6 md:p-8 pb-24">
                    <div className="mx-auto max-w-7xl">
                        
                        {/* 1. Welcome Section & Search */}
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Welcome back, Segun!</h1>
                                <p className="mt-1 text-sm text-gray-500">Here's what's happening with your tasks today.</p>
                            </div>
                            <div className="hidden md:flex items-center gap-3">
                                <div className="relative">
                                    <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                                    <input 
                                        className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 md:w-64" 
                                        placeholder="Search services..." 
                                        type="text" 
                                    />
                                </div>
                                <button className="flex h-10 items-center justify-center rounded-lg border border-gray-200 bg-white px-3 hover:bg-gray-50">
                                    <span className="material-icons-outlined text-gray-600">notifications</span>
                                </button>
                                <img alt="Profile" className="h-10 w-10 rounded-full object-cover border border-gray-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4gAl8ygivGzLV7fguS8_HqLj4Nz8L6xulfQanmWwRILtbM7AGp_NgwIsDJTevzZC37joVIxncbKh1hQ3p46OohQQKX70g-Dk9ta5N4y4_mLayLFl7vMKCRxYsjxtJCdqL_wV0li03JRubJX_fd8xTOHlw3hbtwoOkhRbM5muqwGY024FFkF4Ce_jaa6he7FAo4QXOIYQVmMrLehG_oZBzG8BHMDJAJ43Mlz4_SOhPXXfzT2w_Hgxv6ShHVYaLCbeDxiz3DyS0MS4" />
                            </div>
                        </div>

                        {/* Banner */}
                        <div className="mt-8 overflow-hidden rounded-2xl bg-green-800 text-white shadow-lg">
                            <div className="flex flex-col md:flex-row">
                                <div className="p-8 md:w-2/3">
                                    <div className="inline-flex rounded-full bg-green-700 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-100">New Feature</div>
                                    <h2 className="mt-4 text-2xl font-bold">Track your service providers in real-time</h2>
                                    <p className="mt-2 text-green-100 opacity-90">Get live updates on location and estimated arrival times for your on-going tasks.</p>
                                    <button className="mt-6 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-green-800 hover:bg-green-50">Try it now</button>
                                </div>
                                <div className="relative hidden md:block md:w-1/3 bg-green-700">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                       <span className="material-icons-outlined text-[120px] text-green-800 opacity-50">map</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Active Requests Table */}
                        <section className="mt-10">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                                <h2 className="text-lg font-bold text-gray-900">Active Requests</h2>
                                <div className="flex items-center gap-3">
                                    <div className="flex rounded-lg bg-gray-100 p-1">
                                        {['All', 'In Progress', 'Scheduled'].map((tab) => (
                                            <button
                                                key={tab}
                                                onClick={() => setActiveTab(tab)}
                                                className={`rounded px-4 py-1.5 text-xs font-medium transition-all ${
                                                    activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                                                }`}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </div>
                                    <Link 
                                        to="/customer/post-request"
                                        className="flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 shadow-sm transition-colors"
                                    >
                                        <span className="material-icons-outlined text-lg">add</span>
                                        New Request
                                    </Link>
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm text-gray-500">
                                        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                                            <tr>
                                                <th className="px-6 py-4 font-semibold">Service ID</th>
                                                <th className="px-6 py-4 font-semibold">Service Type</th>
                                                <th className="px-6 py-4 font-semibold">Date</th>
                                                <th className="px-6 py-4 font-semibold">Provider</th>
                                                <th className="px-6 py-4 font-semibold">Status</th>
                                                <th className="px-6 py-4 font-semibold text-right">Amount</th>
                                                <th className="px-6 py-4 text-center font-semibold">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {filteredRequests.map((req) => (
                                                <tr key={req.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 font-medium text-gray-900">{req.id}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-8 w-8 rounded bg-green-50 flex items-center justify-center text-green-700">
                                                                <span className="material-icons-outlined text-sm">build</span>
                                                            </div>
                                                            {req.service}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">{req.date}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-6 w-6 rounded-full bg-gray-200"></div> 
                                                            {req.provider}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                            req.status === 'In Progress' ? 'bg-blue-50 text-blue-700' :
                                                            req.status === 'Completed' ? 'bg-green-50 text-green-700' :
                                                            req.status === 'Cancelled' ? 'bg-red-50 text-red-700' :
                                                            'bg-orange-50 text-orange-700'
                                                        }`}>
                                                            {req.status === 'In Progress' && <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>}
                                                            {req.status === 'Completed' && <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>}
                                                            {req.status === 'Scheduled' && <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>}
                                                            {req.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right font-medium text-gray-900">{req.amount}</td>
                                                    <td className="px-6 py-4 text-center">
                                                        <button className="text-gray-400 hover:text-gray-900">
                                                            <span className="material-icons-outlined">more_vert</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-4">
                                    <span className="text-xs text-gray-500">Showing {filteredRequests.length} of {requests.length} requests</span>
                                    <div className="flex gap-2">
                                        <button className="rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
                                        <button className="rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-600 hover:bg-gray-50">Next</button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 5. Recommendations (Preserved) */}
                        <section className="mt-10">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-gray-900">Recommended For You</h2>
                                <div className="flex gap-2">
                                    <button className="rounded-full border border-gray-300 p-1 text-gray-500 hover:bg-gray-100">
                                        <span className="material-icons-outlined text-lg">chevron_left</span>
                                    </button>
                                    <button className="rounded-full border border-gray-300 p-1 text-gray-500 hover:bg-gray-100">
                                        <span className="material-icons-outlined text-lg">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* Card 1 */}
                                <div className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <img alt="Provider" className="h-12 w-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvFbL4ShmOz7h5KPFx3iHbS2v1n1V0pN6cfIzbwdW7aCBY7COFhTn7PCPBWn5IVv8sJXqh8bVV9BT7PgR4kFo4hLR1TLsrPjZvgoQudw0KcKQ7Tnyf6gH0fghAfn7qRBnLyJIcGO5LJjeTsNZq-Tsu-B7SCFTvuS97GiXdIQeKbP3R8Kcuh1is2VILnzrmS_juUiey2aMl1-lhu2PHL8qUcAktRT8bHijlZQMwr7__vXr6Wbc1KQ2w_os8y9c5NGMkEvF361gjU6s" />
                                        <span className="flex items-center gap-1 rounded bg-yellow-100 px-1.5 py-0.5 text-xs font-semibold text-yellow-700">
                                            <span className="material-icons-outlined text-xs">star</span> 4.9
                                        </span>
                                    </div>
                                    <div className="mt-3">
                                        <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">Tunde Fixes</h3>
                                        <p className="text-xs text-gray-500">Plumbing &amp; Repairs</p>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-xs font-medium text-gray-900">₦5,000/hr</span>
                                        <button className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-900 hover:bg-primary hover:text-white transition-colors">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                                {/* Card 2 */}
                                <div className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <img alt="Provider" className="h-12 w-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSWit8UOE-VCy65lONwDkCTehWf5Ow31DkYe1Wxl8t3S-DxbGlAXtqvpXs-FmEnutt_ZY8Tnn8Pfrzfeha4jAm2ch_sTsBYe3L5EoxbxEisBBcZhnwLJ1rceV2ejC3R2elmxTrgwJSk6jIoM_sGofaM4HrhlDE5hL8OG5Mw8G2EWL6wqU0h9Yao0In5MZH2schO2mXpSPpPyiNpIpC5yQMJNryhGtyZC_FE0cijcroSDjbSBb2ziISOwfIrtdr8W4kfDix9x7BOXw" />
                                        <span className="flex items-center gap-1 rounded bg-yellow-100 px-1.5 py-0.5 text-xs font-semibold text-yellow-700">
                                            <span className="material-icons-outlined text-xs">star</span> 4.8
                                        </span>
                                    </div>
                                    <div className="mt-3">
                                        <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">Sarah's Kitchen</h3>
                                        <p className="text-xs text-gray-500">Catering &amp; Events</p>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-xs font-medium text-gray-900">₦12,000/meal</span>
                                        <button className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-900 hover:bg-primary hover:text-white transition-colors">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                                {/* Card 3 */}
                                <div className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <img alt="Provider" className="h-12 w-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuANe_dtvvmaha_OcFvj1pJtucGl7vgiqgYfCpKe6J_IrN62HXCsIp-YBAbRFT_4zkEzIAseLgPXQhdHImYAY99XNhObW03GrE98nUxZxdzfM8uamvMacsYM1wLv2k6pEVshEOjm02zc4gh6CtObrezJ4y8bHKFxLQFpDdFp5xqIgTl3NUeLDsjFWHkT5s5GIDhh1ZhDLvcf-z1GMziggD4ougk9bo5xBG8cZCJ39dXYj7UdrcKzFtJiLDwzKKEl6MyfiH3l5TWMdxE" />
                                        <span className="flex items-center gap-1 rounded bg-yellow-100 px-1.5 py-0.5 text-xs font-semibold text-yellow-700">
                                            <span className="material-icons-outlined text-xs">star</span> 5.0
                                        </span>
                                    </div>
                                    <div className="mt-3">
                                        <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">Ibrahim Electric</h3>
                                        <p className="text-xs text-gray-500">Electrical Services</p>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-xs font-medium text-gray-900">₦7,500/visit</span>
                                        <button className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-900 hover:bg-primary hover:text-white transition-colors">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                                {/* Card 4 */}
                                <div className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <img alt="Provider" className="h-12 w-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4gAl8ygivGzLV7fguS8_HqLj4Nz8L6xulfQanmWwRILtbM7AGp_NgwIsDJTevzZC37joVIxncbKh1hQ3p46OohQQKX70g-Dk9ta5N4y4_mLayLFl7vMKCRxYsjxtJCdqL_wV0li03JRubJX_fd8xTOHlw3hbtwoOkhRbM5muqwGY024FFkF4Ce_jaa6he7FAo4QXOIYQVmMrLehG_oZBzG8BHMDJAJ43Mlz4_SOhPXXfzT2w_Hgxv6ShHVYaLCbeDxiz3DyS0MS4" />
                                        <span className="flex items-center gap-1 rounded bg-yellow-100 px-1.5 py-0.5 text-xs font-semibold text-yellow-700">
                                            <span className="material-icons-outlined text-xs">star</span> 4.7
                                        </span>
                                    </div>
                                    <div className="mt-3">
                                        <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">Clean &amp; Shine</h3>
                                        <p className="text-xs text-gray-500">House Cleaning</p>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-xs font-medium text-gray-900">₦15,000/day</span>
                                        <button className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-900 hover:bg-primary hover:text-white transition-colors">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="mt-12 text-center text-xs text-gray-500 border-t border-gray-200 pt-6">
                            © 2026 TaskMate Nigeria. All rights reserved.
                        </div>
                    </div>
                </main>
                
                <MobileNavBar />
            </div>
        </div>
    );
};

export default Dashboard;
