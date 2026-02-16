import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const OnboardingLayout = ({ children, title, step, sidebar }) => {
  const steps = [
    { number: 1, label: 'Professional Info' },
    { number: 2, label: 'Service Details' },
    { number: 3, label: 'ID Verification' },
    { number: 4, label: 'Status' },
  ];

  const progress = ((step) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background-light font-sans flex flex-col text-text-light">
    {/* Header */}
        <header className="bg-surface-light border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
            <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <img src="/icon.png" alt="TaskMate" className="w-8 h-8 rounded-lg shadow-sm group-hover:opacity-80 transition-opacity" />
              <span className="font-display font-bold text-gray-900 text-lg hidden sm:block">TaskMate</span>
            </Link>
            <div className="h-6 w-px bg-gray-200 hidden sm:block mx-2"></div>
            <span className="text-sm font-medium text-gray-500 hidden sm:block">Provider Onboarding</span>
            </div>
            
            <div className="flex items-center gap-4">
             <Link to="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors px-3 py-1.5 rounded-md hover:bg-gray-100">
               Save & Exit
             </Link>
            </div>
          </div>
          
          {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-1">
          <motion.div 
            className="bg-primary h-1 shadow-[0_0_10px_rgba(102,188,41,0.5)]" 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "circOut" }}
          />
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Step Indicators - Desktop */}
        <div className="mb-10 hidden md:flex justify-between items-center max-w-3xl mx-auto relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 -translate-y-1/2 rounded-full"></div>
          
          {steps.map((s) => {
            const isActive = step === s.number;
            const isCompleted = step > s.number;
            
            return (
              <div key={s.number} className="flex flex-col items-center bg-background-light px-2 z-10">
                 <div 
                   className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-2 ${
                     isActive ? 'bg-primary border-primary text-white scale-110 shadow-md ring-4 ring-green-50' : 
                     isCompleted ? 'bg-primary border-primary text-white' : 
                     'bg-white border-gray-300 text-gray-400'
                   }`}
                 >
                   {isCompleted ? (
                     <span className="material-symbols-outlined text-sm font-bold">check</span>
                   ) : s.number}
                 </div>
                 <span className={`text-xs mt-2 font-medium transition-colors duration-300 ${
                   isActive ? 'text-primary' : isCompleted ? 'text-primary' : 'text-gray-400'
                 }`}>
                   {s.label}
                 </span>
              </div>
            );
          })}
        </div>

        {/* Mobile Step Indicator */}
        <div className="md:hidden mb-6 flex items-center gap-3 text-sm text-gray-500">
           <span className="font-semibold text-primary bg-green-50 px-2 py-0.5 rounded text-xs uppercase tracking-wider">Step {step} of 4</span>
           <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
           <span className="truncate max-w-[200px] font-medium text-gray-900">{title}</span>
        </div>

        <div className="mb-8 max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-900">{title}</h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">Please fill in the details below to proceed.</p>
        </div>
        
        <div className={`grid grid-cols-1 ${sidebar ? 'lg:grid-cols-3 gap-8' : 'gap-8'}`}>
            <div className={`w-full ${sidebar ? 'lg:col-span-2' : 'max-w-3xl mx-auto'}`}>
                <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.div>
                </AnimatePresence>
            </div>

             {/* Sidebar (Optional) */}
            {sidebar && (
                <div className="hidden lg:block lg:col-span-1 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {sidebar}
                    </motion.div>
                </div>
            )}
        </div>

      </main>
    </div>
  );
};

export default OnboardingLayout;
