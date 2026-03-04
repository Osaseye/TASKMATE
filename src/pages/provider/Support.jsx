import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'sonner';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Support = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    category: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.message) {
        toast.error("Please fill in all required fields");
        return;
    }

    setIsSubmitting(true);
    
    try {
        await addDoc(collection(db, "support_tickets"), {
            userId: currentUser?.uid,
            userEmail: currentUser?.email,
            userName: currentUser?.displayName,
            userRole: 'provider',
            subject: formData.subject,
            category: formData.category,
            message: formData.message,
            status: 'Open',
            createdAt: serverTimestamp()
        });

        toast.success("Message sent! Our team will response within 24 hours.");
        setIsContactModalOpen(false);
        setFormData({ subject: '', category: 'general', message: '' });
    } catch (error) {
        console.error("Error sending support ticket:", error);
        toast.error("Failed to send message. Please try again.");
    } finally {
        setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      question: "How do I get paid?",
      answer: "Payments are processed weekly. Ensure your bank account details are up to date in the Earnings section."
    },
    {
      question: "How is my commission calculated?",
      answer: "TaskMate charges a flat 10% commission on all completed jobs. You can view your commission breakdown in the Earnings tab."
    },
    {
      question: "Can I change my service area?",
      answer: "Yes, you can update your location in your Profile settings. This will adjust the radius for job requests you receive."
    },
    {
      question: "What happens if a customer cancels?",
      answer: "If a customer cancels within 24 hours of the scheduled time, you may be eligible for a cancellation fee."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Toaster position="top-right" richColors />
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
           <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
               <span className="material-symbols-outlined">arrow_back</span>
           </button>
           <h1 className="text-lg font-bold">Help & Support</h1>
           <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        
        {/* Contact Support Card */}
        <section className="bg-primary/5 rounded-2xl p-6 border border-primary/10 text-center space-y-4">
           <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined">support_agent</span>
           </div>
           <div>
              <h2 className="text-xl font-bold text-gray-900">Need help with an order?</h2>
              <p className="text-gray-600 mt-1">Our support team is available 24/7 to assist you.</p>
           </div>
           <button 
                onClick={() => setIsContactModalOpen(true)}
                className="bg-primary text-primary-content px-6 py-2.5 rounded-lg font-bold shadow-sm hover:shadow-md transition-all w-full md:w-auto flex items-center justify-center gap-2"
           >
               <span className="material-symbols-outlined">mail</span>
               Contact Support
           </button>
        </section>

        <AnimatePresence>
            {isContactModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        onClick={() => setIsContactModalOpen(false)}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
                        animate={{ opacity: 1, scale: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.95, y: 20 }} 
                        className="bg-white rounded-2xl shadow-xl w-full max-w-lg z-10 overflow-hidden"
                    >
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">Contact Support</h2>
                            <button 
                                onClick={() => setIsContactModalOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
                                <select 
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white"
                                >
                                    <option value="general">General Inquiry</option>
                                    <option value="payment">Payment Issue</option>
                                    <option value="account">Account & Login</option>
                                    <option value="technical">Technical Support</option>
                                    <option value="report">Report a User</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <input 
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Brief summary of your issue"
                                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea 
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows="4"
                                    placeholder="Describe your issue in detail..."
                                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                                ></textarea>
                            </div>

                            <div className="pt-2 flex justify-end gap-3">
                                <button 
                                    type="button"
                                    onClick={() => setIsContactModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-2 bg-primary text-primary-content font-bold rounded-lg shadow-sm hover:shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <span>Send Message</span>
                                            <span className="material-symbols-outlined text-sm">send</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

        {/* FAQ Section */}
        <section>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-4 hover:border-primary/30 transition-colors bg-gray-50/50">
                        <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Resources Links */}
        <section className="space-y-2">
            <h3 className="text-lg font-bold text-gray-900 mb-2">More Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="/privacy" className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-gray-700">Privacy Policy</span>
                    <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                </a>
                <a href="/terms" className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-gray-700">Terms of Service</span>
                    <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                </a>
            </div>
        </section>

      </main>
    </div>
  );
};

export default Support;
