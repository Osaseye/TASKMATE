import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AdminSidebar = ({ isCollapsed, toggleCollapse }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { icon: 'dashboard', label: 'Dashboard', path: '/admin/dashboard' },
        { icon: 'people', label: 'Users', path: '/admin/users' },
        { icon: 'assignment', label: 'Requests', path: '/admin/requests' },
        { icon: 'verified', label: 'Verifications', path: '/admin/verifications' },
        { icon: 'monetization_on', label: 'Commission', path: '/admin/commission' },
        { icon: 'support_agent', label: 'Support', path: '/admin/support' },
        { icon: 'settings', label: 'Settings', path: '/admin/settings' },
    ];

    const handleLogout = () => {
        // Clear admin session/token
        navigate('/admin/login');
    };

    return (
        <aside 
            className={`hidden md:flex flex-col bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-50 transition-all duration-300 ${
                isCollapsed ? 'w-20' : 'w-64'
            }`}
        >
            <div className={`flex items-center h-20 px-6 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                 <div className="flex items-center justify-center gap-2">
                    <img alt="TaskMate Icon" className="h-8 w-8 object-contain rounded-lg" src="/icon.png" />
                    {!isCollapsed && <span className="font-display font-bold text-gray-900 text-lg">TaskMate Admin</span>}
                </div>
                 <button 
                    onClick={toggleCollapse}
                    className={`p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors ${isCollapsed ? 'hidden' : 'block'}`}
                >
                    <span className="material-icons-outlined text-xl">chevron_left</span>
                </button>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 py-4 overflow-y-auto [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <ul className="space-y-1 px-3">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <li key={item.label}>
                                <Link 
                                    to={item.path} 
                                    className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-colors ${
                                        isActive 
                                            ? 'bg-green-50 text-green-700 font-medium' 
                                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                    } ${isCollapsed ? 'justify-center px-2' : ''}`}
                                    title={isCollapsed ? item.label : ''}
                                >
                                    <span className="material-icons-outlined text-xl">{item.icon}</span>
                                    {!isCollapsed && <span>{item.label}</span>}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button 
                    onClick={handleLogout}
                    className={`nav-link font-medium text-red-600 hover:bg-red-50 flex items-center w-full ${isCollapsed ? 'justify-center p-2' : 'px-4 py-3 gap-3'} rounded-xl transition-all`}
                    title={isCollapsed ? "Logout" : ""}
                >
                    <span className="material-icons-outlined text-xl">logout</span>
                    {!isCollapsed && <span>Logout</span>}
                </button>
            </div>

             {isCollapsed && (
                <div className="p-4 flex justify-center">
                    <button 
                        onClick={toggleCollapse}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
                    >
                        <span className="material-icons-outlined">chevron_right</span>
                    </button>
                </div>
            )}
        </aside>
    );
};

export default AdminSidebar;