import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reset password for:', email);
    setSubmitted(true);
    // Add logic here
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-10">
            <svg className="h-full w-full" width="100%" height="100%" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" stroke="#10B981" strokeWidth="1">
                    <path d="M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63"/>
                    <path d="M-169 529L135 559.5M-86 539L203 436.5M125 759L-67 563M353 301L534 561M353 301L39.5 541.5"/>
                    <path d="M784 57L339.5 72.5"/>
                </g>
            </svg>
        </div>

      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl z-10 border border-gray-100">
        <div className="text-center">
             <Link to="/" className="inline-block">
               <div className="flex items-center justify-center gap-2 mb-2">
                <img src="/icon.png" alt="TaskMate" className="h-10 w-10" />
                <span className="font-display font-bold text-3xl text-gray-900">TaskMate</span>
              </div>
            </Link>
          <h2 className="mt-4 text-2xl font-extrabold text-gray-900">Forgot Password?</h2>
          <p className="mt-2 text-sm text-gray-600">
            No worries, we'll send you reset instructions.
          </p>
        </div>

        {!submitted ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:z-10 sm:text-sm transition-all"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl shadow-green-200"
              >
                Reset Password
              </button>
            </div>
          </form>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-50 mb-6 animate-pulse">
              <span className="material-icons-outlined text-primary text-3xl">
                mark_email_read
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Check your email</h3>
            <p className="mt-2 text-sm text-gray-500">
              We have sent a password reset link to <span className="font-semibold text-gray-900">{email}</span>.
            </p>
            <div className="mt-6">
                <button
                    onClick={() => setSubmitted(false)}
                    className="text-sm text-primary hover:text-primary-dark font-medium underline"
                >
                    Did not receive the email? Click to resend
                </button>
            </div>
          </motion.div>
        )}

        <div className="flex items-center justify-center mt-6 pt-4 border-t border-gray-50">
          <Link to="/login" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors group">
            <span className="material-icons-outlined text-sm mr-2 group-hover:-translate-x-1 transition-transform">arrow_back</span>
            Back to log in
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
