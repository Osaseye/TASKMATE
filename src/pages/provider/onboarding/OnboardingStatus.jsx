import React from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingLayout from './OnboardingLayout';
import { motion } from 'framer-motion';

const OnboardingStatus = () => {
  const navigate = useNavigate();
  // Status will always be pending/under-review for now as per requirements
  const status = 'pending'; 

  return (
    <OnboardingLayout title="Application Status" step={4}>
      
      <div className="bg-surface-light rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col items-center justify-center p-12 min-h-[400px]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            key="pending"
            className="flex flex-col items-center text-center max-w-lg"
          >
            <div className="w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center mb-6 relative">
                <span className="material-symbols-outlined text-4xl text-yellow-500">pending_actions</span>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Submission Under Review</h2>
            <p className="text-gray-500 mb-8">
                Thank you for applying to join TaskMate! We represent quality and trust, so we carefully review every provider.
            </p>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-left w-full mb-8">
                <div className="flex gap-4">
                    <span className="material-symbols-outlined text-blue-500 mt-1">info</span>
                    <div>
                        <h3 className="font-semibold text-blue-900 text-sm mb-1">What happens next?</h3>
                        <p className="text-sm text-blue-700 leading-relaxed">
                            Our team will verify your documents and profile details. This typically takes <strong>24-48 hours</strong>. 
                            You will be notified via email once your account is approved.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full gap-3">
                 <button 
                  onClick={() => navigate('/provider/dashboard')}
                  className="w-full py-3 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-colors shadow-sm"
                 >
                  Go to Dashboard (View Only)
                 </button>
            </div>
          </motion.div>
      </div>
     
    </OnboardingLayout>
  );
};

export default OnboardingStatus;
