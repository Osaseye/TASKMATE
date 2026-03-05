import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in or login successful
  React.useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'admin') navigate('/admin/dashboard', { replace: true });
      else if (currentUser.role === 'provider') navigate('/provider/dashboard', { replace: true });
      else if (currentUser.role === 'customer') navigate('/dashboard', { replace: true });
      // If role is undefined, maybe wait or send to onboarding (handled by ProtectedRoute logic usually)
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      toast.success("Welcome back!");
      // Navigation is now handled by the useEffect above
    } catch(err) {
      setError('Failed to login. Please check your credentials.');
      console.error(err);
      toast.error('Login failed');
      setLoading(false);
    }
    // Don't set loading false on success, as we are navigating away
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
      <div className="hidden lg:flex lg:w-[45%] bg-primary/10 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/Taskmate.png"
            alt="Workspace"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
        </div>
        <div className="relative z-10 w-full h-full flex flex-col justify-end p-12 text-white">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-display font-bold mb-4">Welcome Back!</h2>
            <p className="text-lg opacity-90 max-w-md">
                Connect with top-rated professionals and get your tasks done efficiently.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center h-full px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center lg:text-left">
            <Link to="/" className="inline-block">
               <div className="flex items-center gap-2 mb-6">
                <img src="/icon.png" alt="TaskMate" className="h-8 w-8" />
                <span className="font-display font-bold text-2xl text-gray-900">TaskMate</span>
              </div>
            </Link>
            <h2 className="text-2xl font-extrabold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{' '}
              <Link to="/register" className="font-medium text-primary hover:text-primary-dark">
                create a new account
              </Link>
            </p>
          </div>

          <div className="mt-6">
            <div className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm pr-10"
                      placeholder="••••••••"
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
                  {error && <p className="text-sm text-red-500">{error}</p>}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link to="/forgot-password" className="font-medium text-primary hover:text-primary-dark">
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="animate-spin h-5 w-5 text-white" />
                        Signing in...
                      </div>
                    ) : (
                      "Sign in"
                    )}
                  </button>
                </div>
              </form>
              
               <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                     <img className="h-5 w-5" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="" />
                     <span className="sr-only">Sign in with Google</span>
                  </button>
                   <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                     <img className="h-5 w-5" src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="" />
                     <span className="sr-only">Sign in with Facebook</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
