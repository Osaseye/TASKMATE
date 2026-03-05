import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from '../components/layout/AdminSidebar';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const location = useLocation();

    const getPageTitle = (pathname) => {
        const path = pathname.split('/').pop();
        if (!path || path === 'dashboard') return 'Dashboard';
        return path.charAt(0).toUpperCase() + path.slice(1);
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
            <AdminSidebar 
                isCollapsed={sidebarCollapsed} 
                toggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />
            
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-gray-900/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
                {/* Header */}
                <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button 
                            className="p-2 -ml-2 rounded-lg text-gray-500 hover:bg-gray-100 md:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="material-icons">menu</span>
                        </button>
                        <h1 className="text-xl font-bold text-gray-800 hidden sm:block">
                            {getPageTitle(location.pathname)}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <span className="material-icons-outlined">notifications</span>
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
                            <div className="hidden md:block text-right">
                                <p className="text-sm font-bold text-gray-900">Admin User</p>
                                <p className="text-xs text-gray-500">Super Admin</p>
                            </div>
                            <div className="h-9 w-9 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-gray-100">
                                AD
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-[#F8F9FA] p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto w-full">
                        <Outlet />
                    </div>
                    
                    <footer className="mt-auto py-6 text-center text-xs text-gray-400 border-t border-gray-200 mx-8">
                        &copy; {new Date().getFullYear()} TaskMate Admin Portal. Authorized Personnel Only.
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;