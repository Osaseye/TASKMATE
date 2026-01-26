import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileNavBar = () => {
    const location = useLocation();
    
    const navItems = [
        { icon: 'dashboard', label: 'Home', path: '/dashboard' },
        { icon: 'search', label: 'Browse', path: '/customer/browse' },
        { icon: 'add_circle', label: 'Post', path: '/customer/post-request', isMain: true },
        { icon: 'favorite_border', label: 'Saved', path: '/customer/saved' },
        { icon: 'settings', label: 'Settings', path: '/customer/settings' },
    ];

    return (
        <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 md:hidden">
            <nav className="flex items-center gap-1 rounded-full border border-gray-200 bg-white/90 p-2 shadow-xl backdrop-blur-lg ring-1 ring-black/5">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    
                    if (item.isMain) {
                        return (
                            <Link 
                                key={item.label}
                                to={item.path}
                                className="mx-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white shadow-lg shadow-green-600/30 transition-transform hover:scale-105 active:scale-95"
                            >
                                <span className="material-icons-outlined text-2xl">{item.icon}</span>
                            </Link>
                        );
                    }

                    return (
                        <Link
                            key={item.label}
                            to={item.path}
                            className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
                                isActive 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                        >
                            <span className="material-icons-outlined text-xl">{item.icon}</span>
                            {isActive && (
                                <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-green-600"></span>
                            )}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};

export default MobileNavBar;
