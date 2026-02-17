import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const AdminSidebar = ({ isCollapsed, toggleCollapse }) => {
    const navigate = useNavigate();

    const menuItems = [
        { icon: 'dashboard', label: 'Dashboard', path: '/admin/dashboard' },
        { icon: 'people', label: 'Users', path: '/admin/users' },
        { icon: 'assignment', label: 'Requests', path: '/admin/requests' },
        { icon: 'verified', label: 'Verifications', path: '/admin/verifications' },
        { icon: 'monetization_on', label: 'Commission', path: '/admin/commission' },
        { icon: 'support_agent', label: 'Support', path: '/admin/support' }, // Added Support
        { icon: 'settings', label: 'Settings', path: '/admin/settings' },
    ];

    const handleLogout = () => {
        // Clear admin session/token
        navigate('/admin/login');
    };

    return (
        <aside 
            className={`hidden md:flex flex-col bg-gray-900 border-r border-gray-800 h-screen fixed left-0 top-0 z-50 text-white transition-all duration-300 ${
                isCollapsed ? 'w-20' : 'w-64'
            }`}
        >
            <div className={`flex items-center gap-3 px-6 py-6 border-b border-gray-800 h-[88px] ${isCollapsed ? 'justify-center' : ''}`}>
                {/* User requested removing the icon beside text, so showing only text or just a simplified view */}
                {!isCollapsed && (
                    <span className="text-xl font-bold tracking-tight text-white whitespace-nowrap">TaskMate Admin</span>
                )}
                {isCollapsed && (
                     <span className="text-xl font-bold tracking-tight text-green-500">TM</span>
                )}
            </div>

            <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        title={isCollapsed ? item.label : ''}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-xl transition-all ${
                                isActive
                                    ? 'bg-green-600 text-white shadow-lg shadow-green-900/20'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            } ${isCollapsed ? 'justify-center' : ''}`
                        }
                    >
                        <span className="material-icons-outlined text-xl">{item.icon}</span>
                        {!isCollapsed && <span>{item.label}</span>}
                    </NavLink>
                ))}
            </nav>

            <div className="p-3 border-t border-gray-800 space-y-2">
                <button 
                   onClick={toggleCollapse}
                   className="flex items-center justify-center w-full px-3 py-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                >
                    <span className="material-icons-outlined">
                        {isCollapsed ? 'chevron_right' : 'chevron_left'}
                    </span>
                </button>

                <button 
                    onClick={handleLogout}
                    className={`flex items-center gap-3 w-full px-3 py-3 text-sm font-medium text-red-400 rounded-xl hover:bg-red-500/10 hover:text-red-300 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
                    title={isCollapsed ? "Logout" : ""}
                >
                    <span className="material-icons-outlined">logout</span>
                    {!isCollapsed && "Logout"}
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;