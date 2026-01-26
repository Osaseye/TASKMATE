import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
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
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  )
}

export default App
