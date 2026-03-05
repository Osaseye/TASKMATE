import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Reveal = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-1000 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      {children}
    </div>
  );
};

const Landing = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'process', 'pros'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = (section) =>
    `text-gray-600 hover:text-primary font-medium transition-colors duration-300 border-b-2 ${
      activeSection === section ? 'border-primary text-primary' : 'border-transparent'
    }`;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-surface-light text-gray-900 font-sans transition-colors duration-300" id="home"
    >
      <nav className="bg-surface-light border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <img
                alt="TaskMate Logo"
                className="h-10 w-10"
                src="/icon.png"
              />
              <span className="font-display font-bold text-2xl text-secondary">
                TaskMate
              </span>
            </div>
            <div className="hidden md:flex space-x-8 items-center cursor-pointer">
              <a
                className={navLinkClass('services')}
                onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
              >
                Find a Pro
              </a>
              <a
                className={navLinkClass('process')}
                onClick={() => document.getElementById('process').scrollIntoView({ behavior: 'smooth' })}
              >
                How it Works
              </a>
              <a
                className={navLinkClass('pros')}
                onClick={() => document.getElementById('pros').scrollIntoView({ behavior: 'smooth' })}
              >
                Top Rated
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                className="hidden sm:inline-block px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-green-50 hover:bg-green-100 transition"
                to="/login"
              >
                Log In
              </Link>
              <Link
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition shadow-lg shadow-green-200"
                to="/register"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative overflow-hidden bg-surface-light min-h-[90vh] flex items-center lg:block lg:min-h-0">
        {/* Mobile Background Image */}
        <div className="absolute inset-0 lg:hidden z-0">
             <img
                alt="Background"
                className="w-full h-full object-cover blur-[2px] brightness-[40%] filter"
                src="/Taskmate.png"
            />
            <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="relative pb-8 bg-transparent sm:bg-surface-light sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-6 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <Reveal className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-display font-extrabold text-white lg:text-gray-900 sm:text-5xl md:text-6xl drop-shadow-md lg:drop-shadow-none">
                  <span className="block xl:inline">Get things done with</span>
                  <span className="block text-primary-light lg:text-primary">
                    trusted Nigerian pros
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-200 lg:text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 drop-shadow lg:drop-shadow-none">
                  From home repairs to beauty services, TaskMate connects you
                  with skilled professionals in Lagos, Abuja, and beyond. Fast,
                  reliable, and secure.
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                  <form
                    action="#"
                    className="mt-3 sm:flex sm:shadow-lg sm:rounded-lg sm:overflow-hidden relative z-20"
                  >
                    <label className="sr-only" htmlFor="search">
                      What service do you need?
                    </label>
                    <div className="relative flex-grow bg-white shadow-lg rounded-lg sm:shadow-none sm:rounded-none">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-icons-outlined text-gray-400">
                          search
                        </span>
                      </div>
                      <input
                        className="block w-full pl-10 pr-3 py-5 border-none leading-5 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                        id="search"
                        name="search"
                        placeholder="Try 'Plumber', 'Cleaner', or 'Mechanic'"
                        type="text"
                      />
                    </div>
                    <button
                      className="w-full sm:w-auto mt-4 sm:mt-0 px-8 py-5 border border-transparent text-lg font-medium text-white bg-primary hover:bg-primary-dark transition flex items-center justify-center rounded-lg shadow-lg sm:shadow-none sm:rounded-none"
                      type="submit"
                    >
                      Search
                    </button>
                  </form>
                  <p className="mt-3 text-sm text-gray-200 lg:text-gray-500">
                    Popular:{' '}
                    <span className="text-white lg:text-primary cursor-pointer hover:underline font-medium">
                      House Cleaning
                    </span>
                    ,{' '}
                    <span className="text-white lg:text-primary cursor-pointer hover:underline font-medium">
                      Generator Repair
                    </span>
                    ,{' '}
                    <span className="text-white lg:text-primary cursor-pointer hover:underline font-medium">
                      Moving
                    </span>
                  </p>
                  
                  {/* Trust Indicators (Mobile Only) */}
                  <div className="mt-8 flex items-center gap-3 lg:hidden">
                    <div className="flex -space-x-3">
                        <img className="inline-block h-10 w-10 rounded-full ring-2 ring-primary object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" alt="User"/>
                        <img className="inline-block h-10 w-10 rounded-full ring-2 ring-primary object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64" alt="User"/>
                        <img className="inline-block h-10 w-10 rounded-full ring-2 ring-primary object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64" alt="User"/>
                         <div className="flex items-center justify-center h-10 w-10 rounded-full ring-2 ring-primary bg-surface-light text-xs font-bold text-primary">
                             +2k
                         </div>
                    </div>
                    <div className="text-white text-sm font-medium drop-shadow-md">
                        <p>Trusted by over</p>
                        <p className="text-primary-light font-bold">2,000+ Nigerians</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </main>
          </div>
        </div>
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-50">
          <img
            alt="Professional worker fixing something"
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full opacity-90"
            src="/Taskmate.png"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-light to-transparent lg:via-surface-light/20"></div>
        </div>
      </div>

      <div className="bg-white py-8 border-y border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wider">
            Trusted by homeowners and businesses across Nigeria
          </p>
        </div>
        {/* Marquee Container */}
        <div className="relative flex overflow-x-hidden">
          <div className="flex animate-marquee whitespace-nowrap min-w-full">
             {/* First copy */}
             <div className="flex space-x-16 mx-8">
                 {[1, 2, 3, 4].map((i) => (
                    <div key={`a-${i}`} className="flex space-x-16 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="flex items-center gap-2 text-xl font-bold text-gray-600">
                        <span className="material-icons-outlined text-3xl">verified_user</span> SecurePay
                        </div>
                        <div className="flex items-center gap-2 text-xl font-bold text-gray-600">
                        <span className="material-icons-outlined text-3xl">home_work</span> LagosHomes
                        </div>
                        <div className="flex items-center gap-2 text-xl font-bold text-gray-600">
                        <span className="material-icons-outlined text-3xl">engineering</span> TechFix
                        </div>
                        <div className="flex items-center gap-2 text-xl font-bold text-gray-600">
                        <span className="material-icons-outlined text-3xl">local_shipping</span> SwiftMove
                        </div>
                    </div>
                 ))}
             </div>
             {/* Second copy for infinite loop */}
             <div className="flex space-x-16 mx-8">
                 {[1, 2, 3, 4].map((i) => (
                    <div key={`b-${i}`} className="flex space-x-16 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="flex items-center gap-2 text-xl font-bold text-gray-600">
                        <span className="material-icons-outlined text-3xl">verified_user</span> SecurePay
                        </div>
                        <div className="flex items-center gap-2 text-xl font-bold text-gray-600">
                        <span className="material-icons-outlined text-3xl">home_work</span> LagosHomes
                        </div>
                        <div className="flex items-center gap-2 text-xl font-bold text-gray-600">
                        <span className="material-icons-outlined text-3xl">engineering</span> TechFix
                        </div>
                        <div className="flex items-center gap-2 text-xl font-bold text-gray-600">
                        <span className="material-icons-outlined text-3xl">local_shipping</span> SwiftMove
                        </div>
                    </div>
                 ))}
             </div>
          </div>
        </div>
      </div>

      <div id="services" className="py-16 bg-background-light scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
              Services
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl font-display">
              Everything you need, handled.
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Explore our most popular service categories and find the right
              expert for your job.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {[
              { icon: "plumbing", title: "Plumbing", desc: "Leak repairs, installation & more", color: "text-green-600", bg: "bg-green-100" },
              { icon: "electrical_services", title: "Electrical", desc: "Wiring, repairs & appliances", color: "text-blue-600", bg: "bg-blue-100" },
              { icon: "cleaning_services", title: "Cleaning", desc: "Home & office deep cleaning", color: "text-yellow-600", bg: "bg-yellow-100" },
              { icon: "local_shipping", title: "Moving", desc: "Relocation & heavy lifting", color: "text-purple-600", bg: "bg-purple-100" },
              { icon: "brush", title: "Painting", desc: "Interior & exterior painting", color: "text-red-600", bg: "bg-red-100" },
              { icon: "spa", title: "Beauty", desc: "Makeup, hair & nails at home", color: "text-pink-600", bg: "bg-pink-100" },
              { icon: "pest_control", title: "Fumigation", desc: "Pest control services", color: "text-orange-600", bg: "bg-orange-100" },
              { icon: "more_horiz", title: "More", desc: "See all 50+ categories", color: "text-gray-600", bg: "bg-gray-100" },
            ].map((service, idx) => (
                <Reveal key={idx} className="h-full" delay={idx * 100}>
                    <a
                    className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col items-center text-center border border-gray-100 h-full"
                    href="#"
                    >
                    <div className={`h-16 w-16 ${service.bg} rounded-full flex items-center justify-center ${service.color} mb-4 group-hover:bg-primary group-hover:text-white transition-colors`}>
                        <span className="material-icons-outlined text-3xl">
                        {service.icon}
                        </span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">
                        {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                        {service.desc}
                    </p>
                    </a>
                </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div id="process" className="bg-white py-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
              Process
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl font-display">
              How TaskMate Works
            </p>
          </Reveal>
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              <Reveal delay={0}>
                <div className="bg-white p-6 rounded-lg text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white text-2xl font-bold shadow-lg shadow-green-200 mb-6 relative z-10">
                    1
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Describe Your Task
                    </h3>
                    <p className="text-gray-500">
                    Tell us what you need done, when you need it, and where you
                    are located.
                    </p>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <div className="bg-white p-6 rounded-lg text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white text-2xl font-bold shadow-lg shadow-green-200 mb-6 relative z-10">
                    2
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Choose a Tasker
                    </h3>
                    <p className="text-gray-500">
                    Browse profiles, read reviews, and check prices in Naira (₦)
                    to find your perfect match.
                    </p>
                </div>
              </Reveal>
              <Reveal delay={400}>
                <div className="bg-white p-6 rounded-lg text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white text-2xl font-bold shadow-lg shadow-green-200 mb-6 relative z-10">
                    3
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Get It Done
                    </h3>
                    <p className="text-gray-500">
                    Your Tasker arrives and gets the job done. Pay securely only
                    when you are satisfied.
                    </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      <div id="pros" className="py-16 bg-background-light scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col sm:flex-row justify-between items-end mb-8 text-center sm:text-left">
            <div className="w-full sm:w-auto">
              <h2 className="text-3xl font-extrabold text-gray-900 font-display">
                Top Rated Pros
              </h2>
              <p className="mt-2 text-gray-500">
                Verified professionals ready to work today.
              </p>
            </div>
            <a
              className="mt-4 sm:mt-0 text-primary font-medium hover:text-primary-dark w-full sm:w-auto block"
              href="#"
            >
              View all pros →
            </a>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Reveal delay={0}>
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100">
                <div className="p-6">
                    <div className="flex items-center">
                    <img
                        alt="Emmanuel O."
                        className="h-12 w-12 rounded-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2kS-M0CSbBftO2pr4G1LzUja-SFakYPkaNJ8uFrqVqinYQ0v8z1AHJk2dGa_lLVykiZqVrvT1puV3qa2Om8wSKlyYd3pNxQK1De4VoHsmsF5z5bUP2ZT6ToUaBYd4GDiXLa2geYlnQzzy3uhqHHNSVuiUh6BKl5EnOohAD_TRL-e-9rlCAh-nGeAzuq0TBYK-00QE0rvLj9Ev6twC-I9uieeaQ3hvB8rkP4GDDxU6VXj--qE45Ehg0Pm0sP_b6UCvRiIm8e_SanI"
                    />
                    <div className="ml-4">
                        <h3 className="text-lg font-bold text-gray-900">
                        Emmanuel O.
                        </h3>
                        <p className="text-sm text-gray-500">
                        Generator Mechanic
                        </p>
                    </div>
                    <div className="ml-auto flex items-center bg-green-50 px-2 py-1 rounded">
                        <span className="material-icons-outlined text-yellow-400 text-sm">
                        star
                        </span>
                        <span className="ml-1 text-sm font-bold text-gray-700">
                        4.9
                        </span>
                    </div>
                    </div>
                    <p className="mt-4 text-gray-600 text-sm line-clamp-2">
                    Expert in repairing tiger generators and large diesel sets.
                    Over 10 years experience in Lagos.
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">
                        Starting at
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                        ₦5,000
                    </span>
                    </div>
                </div>
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                    <span className="flex items-center text-xs text-gray-500">
                    <span className="material-icons-outlined text-sm mr-1">
                        verified
                    </span>{' '}
                    ID Verified
                    </span>
                    <button className="text-sm font-medium text-primary hover:text-primary-dark">
                    Book Now
                    </button>
                </div>
                </div>
            </Reveal>
            <Reveal delay={200}>
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100">
                <div className="p-6">
                    <div className="flex items-center">
                    <img
                        alt="Chioma A."
                        className="h-12 w-12 rounded-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCC5-HQk3UiaRgVZZN32q7QuPJOmyXw_fX6KslzYU4ZxQqvl6ZJfTcQ-aT_ubnzNG0a4AIOSKtJ6kmNYxfyaeWfFgEGGnfWzr8WWJD665MLBQzAe4tJ-2vn9xtSQ-ORJgANWW1YIDscEBePZn_qOd_2id36lAHFo-c-5aSCN2KrJD4b21P-zbjgdXtFejba71sCtiOZhPO4eO4GpCNEFt-6VTW0Bt9LoNYwopBq6lfoC5L6St2gMOgd2EHkb0XuQFs1k81pVkEdkCU"
                    />
                    <div className="ml-4">
                        <h3 className="text-lg font-bold text-gray-900">
                        Chioma A.
                        </h3>
                        <p className="text-sm text-gray-500">
                        Home Cleaner
                        </p>
                    </div>
                    <div className="ml-auto flex items-center bg-green-50 px-2 py-1 rounded">
                        <span className="material-icons-outlined text-yellow-400 text-sm">
                        star
                        </span>
                        <span className="ml-1 text-sm font-bold text-gray-700">
                        5.0
                        </span>
                    </div>
                    </div>
                    <p className="mt-4 text-gray-600 text-sm line-clamp-2">
                    Meticulous cleaning for apartments and offices. I bring my own
                    supplies if needed.
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">
                        Starting at
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                        ₦3,500
                    </span>
                    </div>
                </div>
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                    <span className="flex items-center text-xs text-gray-500">
                    <span className="material-icons-outlined text-sm mr-1">
                        verified
                    </span>{' '}
                    ID Verified
                    </span>
                    <button className="text-sm font-medium text-primary hover:text-primary-dark">
                    Book Now
                    </button>
                </div>
                </div>
            </Reveal>
            <Reveal delay={400}>
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100">
                <div className="p-6">
                    <div className="flex items-center">
                    <img
                        alt="Tunde B."
                        className="h-12 w-12 rounded-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF2oPtFIizVraN-ygTaTfxs7Y6ygUsk6Ua7TZZpU4UsyIWLS_r3Ql-N2nF8PuYkDmV2-13M9LFTnUGcaxqY8_b-tltV1PAQW4xfVjQFfZGOpztFIja1pcTKyGfqWu61ynxLyA2BElirn88B5GpdlK6nLd6kEwwOgf39F4095w2XbiYYBFkkZClq5YZHL8ViPTu67n7ZBZZC8ZHARRqY3QcvItMVefTQPwCRRSqLoKBMEygW3nIQ-c8NYupH56Gy9-MZbtKd_SXLks"
                    />
                    <div className="ml-4">
                        <h3 className="text-lg font-bold text-gray-900">
                        Tunde B.
                        </h3>
                        <p className="text-sm text-gray-500">
                        Plumber
                        </p>
                    </div>
                    <div className="ml-auto flex items-center bg-green-50 px-2 py-1 rounded">
                        <span className="material-icons-outlined text-yellow-400 text-sm">
                        star
                        </span>
                        <span className="ml-1 text-sm font-bold text-gray-700">
                        4.8
                        </span>
                    </div>
                    </div>
                    <p className="mt-4 text-gray-600 text-sm line-clamp-2">
                    Specializing in fixing pipe leaks, sink installation, and
                    water pump maintenance.
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">
                        Starting at
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                        ₦7,000
                    </span>
                    </div>
                </div>
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                    <span className="flex items-center text-xs text-gray-500">
                    <span className="material-icons-outlined text-sm mr-1">
                        verified
                    </span>{' '}
                    ID Verified
                    </span>
                    <button className="text-sm font-medium text-primary hover:text-primary-dark">
                    Book Now
                    </button>
                </div>
                </div>
             </Reveal>
          </div>
          <div className="mt-6 text-center sm:hidden">
            <a
              className="text-primary font-medium hover:text-primary-dark"
              href="#"
            >
              View all pros →
            </a>
          </div>
        </div>
      </div>
      
      {/* CTA Section with Blurred Background */}
      <div className="relative overflow-hidden">
         {/* Background Image with Blur */}
         <div className="absolute inset-0 z-0">
             <img 
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2531&auto=format&fit=crop" 
                alt="Background" 
                className="w-full h-full object-cover filter blur-sm brightness-50 transform scale-105"
             />
             <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
         </div>

        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between z-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl font-display">
            <span className="block">Are you a skilled professional?</span>
            <span className="block text-green-100">Join TaskMate and earn more.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 transition"
                to="/register"
              >
                Become a Tasker
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-secondary/80 hover:bg-secondary transition backdrop-blur-sm"
                to="/register"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img
                  alt="TaskMate Logo"
                  className="h-8 w-8 brightness-0 invert"
                  src="/icon.png"
                />
                <span className="font-display font-bold text-xl text-white">
                  TaskMate
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                The easiest way to find and hire trusted professionals in
                Nigeria for any task.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">
                Discover
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    className="text-base text-gray-400 hover:text-white"
                    href="#"
                  >
                    Become a Tasker
                  </a>
                </li>
                <li>
                  <a
                    className="text-base text-gray-400 hover:text-white"
                    href="#"
                  >
                    Services By City
                  </a>
                </li>
                <li>
                  <a
                    className="text-base text-gray-400 hover:text-white"
                    href="#"
                  >
                    All Services
                  </a>
                </li>
                <li>
                  <a
                    className="text-base text-gray-400 hover:text-white"
                    href="#"
                  >
                    Elite Taskers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    className="text-base text-gray-400 hover:text-white"
                    href="#"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    className="text-base text-gray-400 hover:text-white"
                    href="#"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    className="text-base text-gray-400 hover:text-white"
                    href="#"
                  >
                    Press
                  </a>
                </li>
                <li>
                  <a
                    className="text-base text-gray-400 hover:text-white"
                    href="#"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-base text-gray-400">
              © 2026     TaskMate Nigeria. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a className="text-gray-400 hover:text-white" href="#">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    clipRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a className="text-gray-400 hover:text-white" href="#">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.4485a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Landing;
