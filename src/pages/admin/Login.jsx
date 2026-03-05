import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const AdminLogin = () => {
    const navigate = useNavigate();
    const { login, logout } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // 1. Authenticate with Firebase
            const userCredential = await login(formData.email, formData.password);
            const user = userCredential.user;

            // 2. Verify Admin Role in Firestore
            const userDocRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userDocRef);

            if (userSnap.exists()) {
                const userData = userSnap.data();
                if (userData.role === 'admin') {
                    toast.success('Welcome back, Admin!');
                    navigate('/admin/dashboard');
                } else {
                    // Not an admin - log them out immediately
                    await logout();
                    setError('Access denied. You do not have admin privileges.');
                    toast.error('Unauthorized access');
                }
            } else {
                await logout();
                setError('User profile not found.');
            }
        } catch (err) {
            console.error(err);
            setError('Invalid credentials or system error.');
            toast.error('Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-screen flex bg-white overflow-hidden"
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
                <div className="relative z-10 w-full h-full flex flex-col justify-end p-12 text-white">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                                <span className="material-icons text-2xl text-green-400">admin_panel_settings</span>
                            </div>
                            <span className="text-xl font-bold tracking-wide">TaskMate Admin</span>
                        </div>
                        <h2 className="text-4xl font-display font-bold mb-4 leading-tight">
                            Admin Portal
                        </h2>
                         <p className="text-lg opacity-90 max-w-md">
                            Manage your platform, users, and providers with confidence and security.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex flex-col justify-center h-full px-4 sm:px-6 lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className="text-center lg:text-left mb-6">
                        <Link to="/" className="inline-block">
                           <div className="flex items-center gap-2 mb-6">
                            <img src="/icon.png" alt="TaskMate" className="h-8 w-8" />
                            <span className="font-display font-bold text-2xl text-gray-900">TaskMate</span>
                          </div>
                        </Link>
                        <h2 className="text-2xl font-extrabold text-gray-900">Sign in to Admin Console</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Only authorized personnel.
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email address
                            </label>
                            <div className="relative">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
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
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm pr-10"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
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
                                <Link to="/forgot-password" className="font-medium text-green-600 hover:text-green-500">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
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