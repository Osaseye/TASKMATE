import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2, CheckCircle, XCircle } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'customer', // 'customer' or 'provider'
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Validation States
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleUserTypeChange = (type) => {
    setFormData(prev => ({ ...prev, userType: type }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
        await register(formData.email, formData.password, formData.fullName, formData.userType);
        toast.success(`Welcome, ${formData.fullName}!`);
        
        // Determine flow based on user type
        if (formData.userType === 'customer') {
          navigate('/customer/onboarding'); // Redirect to customer onboarding
        } else {
          navigate('/provider/onboarding/step-1'); 
        }
    } catch (error) {
        console.error("Registration failed", error);
        let msg = "Sign up failed: " + error.message;
        if (error.code === 'auth/email-already-in-use') msg = "Email is already registered.";
        toast.error(msg);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="h-screen flex bg-white overflow-hidden"
    >
      {/* Left Side - Hero Image (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[45%] bg-primary/10 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/create.jpg"
            alt="Teamwork"
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
            <h2 className="text-4xl font-display font-bold mb-4">Join Our Community</h2>
            <p className="text-lg opacity-90 max-w-md">
                Whether you need help or want to offer your skills, TaskMate is the place for you.
            </p>
           </motion.div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="flex-1 flex flex-col justify-center h-full px-4 sm:px-6 lg:px-16 xl:px-20">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center lg:text-left">
             <Link to="/" className="inline-block">
               <div className="flex items-center gap-2 mb-4">
                <img src="/icon.png" alt="TaskMate" className="h-8 w-8" />
                <span className="font-display font-bold text-2xl text-gray-900">TaskMate</span>
              </div>
            </Link>
            <h2 className="text-2xl font-extrabold text-gray-900">Create your account</h2>
            <p className="mt-1 text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-6">
            {/* User Type Toggle */}
            <div className="flex p-1 bg-gray-100 rounded-lg mb-4">
                  <button
                    type="button"
                    onClick={() => handleUserTypeChange('customer')}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                        formData.userType === 'customer' 
                        ? 'bg-white text-primary shadow-sm ring-1 ring-gray-100' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                    }`}
                  >
                    I need a service
                </button>
                <button
                    type="button"
                    onClick={() => handleUserTypeChange('provider')}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                        formData.userType === 'provider' 
                        ? 'bg-white text-primary shadow-sm ring-1 ring-gray-100' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                    }`}
                  >
                    I offer services
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`appearance-none block w-full px-3 py-2.5 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${errors.fullName ? 'border-red-300' : 'border-gray-300'}`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
                </div>

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
                      value={formData.email}
                      onChange={handleChange}
                      className={`appearance-none block w-full px-3 py-2.5 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
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
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`appearance-none block w-full px-3 py-2.5 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm pr-10 ${errors.password ? 'border-red-300' : 'border-gray-300'}`}
                      placeholder="Create a password"
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                   {errors.password ? <p className="mt-1 text-xs text-red-500">{errors.password}</p> : <p className="mt-1 text-xs text-gray-500">Min. 6 characters</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={formData.confirmPassword}
                      onChange={(e) => {
                          handleChange(e);
                          if (e.target.value !== formData.password) {
                              setErrors(prev => ({...prev, confirmPassword: "Passwords do not match"}));
                          } else {
                              setErrors(prev => ({...prev, confirmPassword: null}));
                          }
                      }}
                       className={`appearance-none block w-full px-3 py-2.5 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm pr-10 ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'}`}
                      placeholder="Confirm your password"
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="animate-spin h-5 w-5 text-white" />
                        Creating Account...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
            </form>

             <div className="mt-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                     <img className="h-5 w-5" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="" />
                     <span className="sr-only">Sign up with Google</span>
                  </button>
                   <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                     <img className="h-5 w-5" src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="" />
                     <span className="sr-only">Sign up with Facebook</span>
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
