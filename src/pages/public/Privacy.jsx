import React from 'react';
import { useNavigate } from 'react-router-dom';

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 relative">
        <button 
            onClick={() => navigate(-1)} 
            className="absolute top-8 right-8 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-900"
        >
            <span className="material-symbols-outlined">close</span>
        </button>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b-4 border-primary pb-4 inline-block">Privacy Policy</h1>
        
        <div className="prose prose-lg text-gray-600 space-y-8">
            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-2">1. Information We Collect</h2>
                <p>We collect information you provide directly to us, such as when you create or modify your account, request services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, items requested (for delivery services), notes, and other information you choose to provide.</p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-2">2. How We Use Your Information</h2>
                <p>To provide, maintain, and improve our services, including, for example, to facilitate payments, send receipts, provide products and services you request (and send related information), develop new features, provide customer support to Users and Drivers, develop safety features, authenticate users, and send product updates and administrative messages.</p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-2">3. Sharing of Information</h2>
                <p>We may share the information we collect about you as described in this Statement or as described at the time of collection or sharing, including as follows: Through our Services, we may share your information with other Users (e.g., Service Providers) to enable them to provide the Services you request.</p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-2">4. Data Security</h2>
                <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-2">5. Changes to the Policy</h2>
                <p>We may update this privacy policy from time to time. If we make significant changes, we will notify you of the changes through the TaskMate apps or through others means, such as email.</p>
            </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 text-center text-sm text-gray-500">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
