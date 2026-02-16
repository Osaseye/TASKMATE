import React from 'react';
import { useNavigate } from 'react-router-dom';

const Terms = () => {
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

                <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b-4 border-primary pb-4 inline-block">Terms of Service</h1>

                <div className="prose prose-lg text-gray-600 space-y-8">
                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">1. Acceptance of Terms</h2>
                        <p>By accessing or using the TaskMate services, you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the service.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">2. User Accounts</h2>
                        <p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">3. Service Provider Obligations</h2>
                        <p>Service Providers agree to perform the services requested by Users in a professional, timely, and workmanlike manner. Service Providers are independent contractors and not employees of TaskMate.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">4. User Obligations</h2>
                        <p>Users agree to provide a safe and appropriate environment for Service Providers. Users are responsible for the accuracy of the service request details.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">5. Payments & Fees</h2>
                        <p>Fees for services will be displayed to the User prior to booking. TaskMate collects a commission from the Service Provider for each completed job. All payments are processed securely through our third-party payment processor.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">6. Limitation of Liability</h2>
                        <p>In no event shall TaskMate, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
                    </section>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100 text-center text-sm text-gray-500">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );
};

export default Terms;
