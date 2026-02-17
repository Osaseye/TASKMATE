import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // MOCK AUTHENTICATION
        setTimeout(() => {
            setIsLoading(false);
            if (formData.email === 'admin@taskmate.com' && formData.password === 'admin123') {
                toast.success('Welcome back, Admin!');
                navigate('/admin/dashboard');
            } else {
                toast.error('Invalid credentials');
            }
        }, 1500);
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex bg-white overflow-hidden"
        >
            {/* Left Side - Hero Image (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-[45%] bg-green-900 relative overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
                        alt="Admin Workspace"
                        className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-black opacity-90" />
                </div>
                <div className="relative z-10 w-full h-full flex flex-col justify-between p-12 text-white">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                            <span className="material-icons text-2xl text-green-400">admin_panel_settings</span>
                        </div>
                        <span className="text-xl font-bold tracking-wide">TaskMate Admin</span>
                    </div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-4xl font-display font-bold mb-6 leading-tight">
                            Manage your platform with confidence.
                        </h2>
                        <div className="space-y-4 text-green-100/80">
                            <div className="flex items-center gap-3">
                                <span className="material-icons-outlined text-green-400">shield</span>
                                <span>Secure administrative access</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-icons-outlined text-green-400">analytics</span>
                                <span>Real-time platform insights</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-icons-outlined text-green-400">people</span>
                                <span>User & Provider management</span>
                            </div>
                        </div>
                    </motion.div>
                    
                    <div className="text-xs text-green-200/40">
                        &copy; {new Date().getFullYear()} TaskMate Inc. All rights reserved.
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex flex-col justify-center h-full px-4 sm:px-6 lg:px-20 xl:px-24 bg-gray-50/50">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className="text-center lg:text-left mb-10">
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Portal</h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Please authenticate to access the dashboard.
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-icons-outlined text-gray-400 text-lg">email</span>
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-white shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all sm:text-sm"
                                    placeholder="admin@taskmate.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-icons-outlined text-gray-400 text-lg">lock</span>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-white shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all sm:text-sm"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-green-600 hover:text-green-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-lg shadow-green-600/30 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                                        Authenticating...
                                    </span>
                                ) : (
                                    'Sign in'
                                )}
                            </button>
                        </div>
                    </form>
                    
                    <div className="mt-8 text-center text-xs text-gray-400">
                        <p>Unauthorized access is a violation of company policy.</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AdminLogin;