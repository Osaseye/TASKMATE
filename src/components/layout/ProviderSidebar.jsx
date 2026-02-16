import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ProviderSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const navItems = [
        { icon: 'dashboard', label: 'Dashboard', href: '/provider/dashboard' },
        { icon: 'assignment', label: 'Requests', href: '/provider/requests' },
        { icon: 'work', label: 'My Jobs', href: '/provider/jobs' },
        { icon: 'payments', label: 'Earnings', href: '/provider/earnings' },
        { icon: 'person', label: 'Profile', href: '/provider/profile' },
        { icon: 'settings', label: 'Settings', href: '/provider/settings' },
    ];

    return (
        <aside 
            className={`hidden flex-col bg-white border-r border-gray-200 md:flex transition-all duration-300 h-screen sticky top-0 ${
                isCollapsed ? 'w-20' : 'w-64'
            }`}
        >
            <div className={`flex items-center h-20 px-6 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                 <div className="flex items-center justify-center gap-2">
                    <img alt="TaskMate Icon" className="h-8 w-8 object-contain rounded-lg" src="/icon.png" />
                    {!isCollapsed && <span className="font-display font-bold text-gray-900 text-lg">TaskMate Provider</span>}
                </div>
                 <button 
                    onClick={toggleSidebar}
                    className={`p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors ${isCollapsed ? 'hidden' : 'block'}`}
                >
                    <span className="material-symbols-outlined text-xl">chevron_left</span>
                </button>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 py-4">
                <ul className="space-y-1 px-3">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <li key={item.label}>
                                <Link 
                                    to={item.href} 
                                    className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-colors ${
                                        isActive 
                                            ? 'bg-primary/10 text-primary font-medium' 
                                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                    } ${isCollapsed ? 'justify-center px-2' : ''}`}
                                >
                                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                                    {!isCollapsed && <span>{item.label}</span>}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="p-4 border-t border-gray-100">
                <Link 
                    to="/" 
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-red-500 hover:bg-red-50 transition-colors ${isCollapsed ? 'justify-center px-2' : ''}`}
                >
                    <span className="material-symbols-outlined text-xl">logout</span>
                    {!isCollapsed && <span>Logout</span>}
                </Link>
             </div>

             {isCollapsed && (
                <div className="p-4 flex justify-center">
                    <button 
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
                    >
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            )}
        </aside>
    );
};

export default ProviderSidebar;
