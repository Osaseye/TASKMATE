import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import Landing from './pages/public/Landing'
// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
// Customer Pages
import Onboarding from './pages/customer/Onboarding';
import Dashboard from './pages/customer/Dashboard';
import PostRequest from './pages/customer/PostRequest';
import BrowseProviders from './pages/customer/BrowseProviders';
import ProviderProfile from './pages/customer/ProviderProfile';
import RequestStatus from './pages/customer/RequestStatus';
import ServiceReview from './pages/customer/ServiceReview';
import Settings from './pages/customer/Settings';
import SavedProviders from './pages/customer/SavedProviders';
import MyRequests from './pages/customer/MyRequests';

// Provider Pages
import ProfessionalInfo from './pages/provider/onboarding/ProfessionalInfo';
import ServiceDetails from './pages/provider/onboarding/ServiceDetails';
import IdentityVerification from './pages/provider/onboarding/IdentityVerification';
import OnboardingStatus from './pages/provider/onboarding/OnboardingStatus';
import ProviderDashboard from './pages/provider/Dashboard';
import RequestDetails from './pages/provider/RequestDetails';
import Schedule from './pages/provider/Schedule';

import Requests from './pages/provider/Requests';
import MyJobs from './pages/provider/MyJobs';
import JobDetails from './pages/provider/JobDetails';
import Earnings from './pages/provider/Earnings';
import MyProfile from './pages/provider/Profile';
import ProviderSettings from './pages/provider/Settings';
import ChangePassword from './pages/provider/ChangePassword';
import Support from './pages/provider/Support';
import Privacy from './pages/public/Privacy';
import Terms from './pages/public/Terms';

// Admin Pages
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminVerifications from './pages/admin/Verifications';
import AdminCommission from './pages/admin/Commission';
import AdminUsers from './pages/admin/Users';
import AdminRequests from './pages/admin/Requests';
import AdminSettings from './pages/admin/Settings';
import AdminLogin from './pages/admin/Login';
import AdminSupport from './pages/admin/Support';
import AdminUserDetails from './pages/admin/UserDetails';
import AdminRequestDetails from './pages/admin/RequestDetails';
import AdminVerificationDetails from './pages/admin/VerificationDetails';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/customer/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customer/post-request" element={<PostRequest />} />
        <Route path="/customer/browse" element={<BrowseProviders />} />
        <Route path="/customer/provider/:id" element={<ProviderProfile />} />
        <Route path="/customer/requests" element={<MyRequests />} />
        <Route path="/customer/request-status" element={<RequestStatus />} />
        <Route path="/customer/service-review" element={<ServiceReview />} />
        <Route path="/customer/settings" element={<Settings />} />
        <Route path="/customer/saved" element={<SavedProviders />} />

        {/* Provider Onboarding Routes */}
        <Route path="/provider/onboarding" element={<Navigate to="/provider/onboarding/step-1" replace />} />
        <Route path="/provider/onboarding/step-1" element={<ProfessionalInfo />} />
        <Route path="/provider/onboarding/step-2" element={<ServiceDetails />} />
        <Route path="/provider/onboarding/step-3" element={<IdentityVerification />} />
        <Route path="/provider/onboarding/status" element={<OnboardingStatus />} />
        <Route path="/provider/dashboard" element={<ProviderDashboard />} />
        <Route path="/provider/requests" element={<Requests />} />
        <Route path="/provider/jobs" element={<MyJobs />} />
        <Route path="/provider/jobs/:id" element={<JobDetails />} />
        <Route path="/provider/requests/:id" element={<RequestDetails />} />
        <Route path="/provider/earnings" element={<Earnings />} />
        <Route path="/provider/profile" element={<MyProfile />} />
        <Route path="/provider/settings" element={<ProviderSettings />} />
        <Route path="/provider/settings/password" element={<ChangePassword />} />
        <Route path="/provider/support" element={<Support />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/provider/schedule" element={<Schedule />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="users/:id" element={<AdminUserDetails />} />
          <Route path="requests" element={<AdminRequests />} />
          <Route path="requests/:id" element={<AdminRequestDetails />} />
          <Route path="verifications" element={<AdminVerifications />} />
          <Route path="verifications/:id" element={<AdminVerificationDetails />} />
          <Route path="commission" element={<AdminCommission />} />
          <Route path="support" element={<AdminSupport />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>  
      <Toaster position="top-right" richColors />
      <AnimatedRoutes />
    </Router>
  )
}

export default App
