import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const navItems = [
        { icon: 'dashboard', label: 'Dashboard', href: '/dashboard' },
        { icon: 'search', label: 'Find Providers', href: '/customer/browse' },
        { icon: 'list_alt', label: 'My Requests', href: '/customer/requests' }, 
        { icon: 'favorite_border', label: 'Saved Providers', href: '/customer/saved' },
        { icon: 'group_add', label: 'Invite Friends', href: '/customer/invite' },
        { icon: 'settings', label: 'Settings', href: '/customer/settings' },
    ];

    return (
        <aside 
            className={`hidden flex-col bg-white border-r border-gray-200 md:flex transition-all duration-300 h-screen ${
                isCollapsed ? 'w-20' : 'w-64'
            }`}
        >
            <div className={`flex items-center h-20 px-6 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                 <div className="flex items-center justify-center">
                    {isCollapsed ? (
                        <img alt="TaskMate Icon" className="h-8 w-8 object-contain" src="/icon.png" />
                    ) : (
                        <img alt="TaskMate Logo" className="h-18 w-auto object-contain" src="/logo.png" />
                    )}
                </div>
                 <button 
                    onClick={toggleSidebar}
                    className={`p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors ${isCollapsed ? 'hidden' : 'block'}`}
                >
                    <span className="material-icons-outlined text-xl">chevron_left</span>
                </button>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 py-4">
                <ul className="space-y-1 px-3">
                    {navItems.map((item) => (
                        <li key={item.label}>
                            <Link 
                                to={item.href} 
                                className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                                    item.active 
                                        ? 'bg-primary/10 text-primary font-medium' 
                                        : 'text-gray-500 hover:bg-gray-100'
                                } ${isCollapsed ? 'justify-center px-2' : ''}`}
                            >
                                <span className="material-icons-outlined text-xl">{item.icon}</span>
                                {!isCollapsed && <span>{item.label}</span>}
                            </Link>
                        </li>
                    ))}
                     <li>
                        <button 
                            onClick={handleLogout}
                            className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-500 hover:bg-red-50 transition-colors ${isCollapsed ? 'justify-center px-2' : ''}`}
                        >
                            <span className="material-icons-outlined text-xl">logout</span>
                            {!isCollapsed && <span>Logout</span>}
                        </button>
                    </li>
                </ul>
            </nav>

             {isCollapsed && (
                <div className="p-4 flex justify-center border-t border-gray-100">
                    <button 
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
                    >
                        <span className="material-icons-outlined">chevron_right</span>
                    </button>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
