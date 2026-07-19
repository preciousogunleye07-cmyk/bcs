import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Anchor, Phone, Share2, Facebook, Twitter, Globe, MessageSquare, Menu, X, ArrowUp, MapPin, ExternalLink } from 'lucide-react';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ActionGrid from './components/ActionGrid';
import CookieBanner from './components/CookieBanner';
import WhatWeDoView from './components/WhatWeDoView';
import AppointmentRequestForm from './components/AppointmentRequestForm';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'what-we-do'>('home');
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Monitor scroll height to style the navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler for anchor links
  const handleScrollTo = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const navigateToHomeAndScroll = (id: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Callback when user clicks "FIND CARE" or service booking
  const handleServiceSelect = (serviceName: string) => {
    setPreselectedService(serviceName);
    setIsRequestModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-bg font-sans selection:bg-brand-coral/30 text-brand-dark relative" id="app-root">
      
      {/* 1. Top Advisory & Contact Bar */}
      <div className="bg-brand-dark text-white text-xs py-2.5 px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-3 z-50 relative font-medium tracking-wide border-b border-white/5">
        <div className="flex items-center gap-2 opacity-90">
          <span>Have Questions? Call Us Now!</span>
          <a href="tel:410-977-2847" className="font-bold text-brand-coral hover:underline transition-all">410-977-2847</a>
        </div>
        
        <div className="flex items-center gap-6 opacity-90">
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-[11px] text-gray-400">Share:</span>
            <div className="relative">
              <button 
                onClick={handleShareClick} 
                className="hover:text-brand-coral transition-colors p-1 flex items-center gap-1" 
                aria-label="Share page link"
              >
                <Share2 className="w-3.5 h-3.5" />
                {copied && (
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-0.5 bg-brand-coral text-white text-[9px] rounded font-bold whitespace-nowrap z-50 animate-fade-in shadow-sm">
                    Copied!
                  </span>
                )}
              </button>
            </div>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-coral transition-colors p-1" aria-label="Facebook">
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-coral transition-colors p-1" aria-label="Twitter">
              <Twitter className="w-3.5 h-3.5" />
            </a>
          </div>
          
          <div className="flex items-center gap-1.5 border-l border-white/10 pl-5">
            <Globe className="w-3.5 h-3.5 text-brand-coral" />
            <span>EN</span>
          </div>
        </div>
      </div>

      {/* 2. Primary Navigation Bar */}
      <nav className={`sticky top-0 z-40 transition-all duration-300 w-full ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100 py-3' 
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-full px-6 py-3.5 flex justify-between items-center mx-auto bg-white/70">
            
            {/* Logo Brand Group */}
            <div className="flex-shrink-0 flex items-center">
              <button 
                onClick={handleScrollToTop}
                className="text-2xl font-extrabold tracking-tight text-brand-dark flex items-center gap-2.5 group focus:outline-none"
              >
                <img 
                  src="https://plain-weur-prod-public.komododecks.com/202606/30/bEWa4J3Aw82gY8ZvTqLN/image.png"
                  alt="BalanceCare Logo"
                  className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </button>
            </div>
            
            {/* Desktop Menu Pill */}
            <div className="hidden md:flex items-center bg-white/50 rounded-full p-1 border border-white/60">
              <button 
                onClick={() => { setCurrentView('home'); handleScrollToTop(); }}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                  currentView === 'home' ? 'bg-white text-brand-dark shadow-sm' : 'text-brand-dark/70 hover:text-brand-dark'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => navigateToHomeAndScroll('about')}
                className="text-brand-dark/70 hover:text-brand-dark px-5 py-2.5 rounded-full text-sm font-semibold transition-colors cursor-pointer"
              >
                Who We Are
              </button>
              <button 
                onClick={() => { setCurrentView('what-we-do'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                  currentView === 'what-we-do' ? 'bg-white text-brand-dark shadow-sm' : 'text-brand-dark/70 hover:text-brand-dark'
                }`}
              >
                What We Do
              </button>
              <button 
                onClick={() => navigateToHomeAndScroll('professionals')}
                className="text-brand-dark/70 hover:text-brand-dark px-5 py-2.5 rounded-full text-sm font-semibold transition-colors cursor-pointer"
              >
                Work With Us
              </button>
              <button 
                onClick={() => navigateToHomeAndScroll('locations')}
                className="text-brand-dark/70 hover:text-brand-dark px-5 py-2.5 rounded-full text-sm font-semibold transition-colors cursor-pointer"
              >
                Our Locations
              </button>
            </div>

            {/* Navigation CTA */}
            <div className="hidden md:block">
              <button 
                onClick={() => setIsRequestModalOpen(true)}
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-brand-green to-brand-blue hover:from-brand-greenHover hover:to-brand-blueHover text-white px-6 py-3 rounded-full text-sm font-bold shadow-md shadow-brand-blue/15 hover:shadow-brand-blue/30 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Request Appointment</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-brand-dark p-2 hover:bg-neutral-100 rounded-full transition-colors"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu Slide-down Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="md:hidden absolute top-full left-4 right-4 mt-2 bg-white rounded-3xl shadow-float overflow-hidden border border-neutral-100 z-50 p-4 space-y-2.5 text-left"
            >
              <button 
                onClick={() => { setMobileMenuOpen(false); setCurrentView('home'); handleScrollToTop(); }}
                className={`block w-full text-left px-5 py-3.5 rounded-2xl text-base font-bold ${
                  currentView === 'home' ? 'text-brand-coral bg-brand-coral/5' : 'text-brand-dark hover:bg-neutral-50'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); navigateToHomeAndScroll('about'); }}
                className="block w-full text-left px-5 py-3.5 rounded-2xl text-base font-semibold text-brand-dark hover:bg-neutral-50 transition-colors text-left w-full"
              >
                Who We Are
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); setCurrentView('what-we-do'); window.scrollTo({ top: 0 }); }}
                className={`block w-full text-left px-5 py-3.5 rounded-2xl text-base font-bold ${
                  currentView === 'what-we-do' ? 'text-brand-coral bg-brand-coral/5' : 'text-brand-dark hover:bg-neutral-50'
                }`}
              >
                What We Do
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); navigateToHomeAndScroll('professionals'); }}
                className="block w-full text-left px-5 py-3.5 rounded-2xl text-base font-semibold text-brand-dark hover:bg-neutral-50 transition-colors text-left w-full"
              >
                Work With Us
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); navigateToHomeAndScroll('locations'); }}
                className="block w-full text-left px-5 py-3.5 rounded-2xl text-base font-semibold text-brand-dark hover:bg-neutral-50 transition-colors text-left w-full"
              >
                Our Locations
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); setIsRequestModalOpen(true); }}
                className="block w-full text-center py-4 bg-gradient-to-r from-brand-green to-brand-blue hover:from-brand-greenHover hover:to-brand-blueHover text-white font-bold rounded-2xl text-base mt-4 shadow-sm cursor-pointer"
              >
                Request Appointment
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence mode="wait">
        {currentView === 'home' ? (
          <motion.div
            key="home-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* 3. Hero Header Area */}
            <HeroSection onFindCareClick={() => handleServiceSelect('Depression Care')} />

            {/* 4. Milestone Stats Section */}
            <StatsSection />

            {/* 5. Bento Grid About Section */}
            <AboutSection />

            {/* 6. Programs and Services Section */}
            <ServicesSection 
              onBookService={handleServiceSelect} 
              onNavigateToWhatWeDo={() => {
                setCurrentView('what-we-do');
                window.scrollTo({ top: 0 });
              }}
            />

            {/* 7. Comprehensive Mission Statement Block */}
            <section className="py-24 bg-white max-w-[1600px] mx-auto px-4 sm:px-6 md:px-16 lg:px-24">
              <div className="bg-brand-sage/20 rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden border border-brand-sage/40">
                {/* Subtle graphic patterns */}
                <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-brand-coral/5 blur-xl pointer-events-none"></div>
                <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-brand-dark/5 blur-xl pointer-events-none"></div>

                <div className="relative z-10 max-w-4xl mx-auto">
                  <div className="flex justify-center items-center gap-2 mb-6">
                    <span className="text-brand-coral font-bold">\ \</span>
                    <span className="text-xs font-bold tracking-widest text-brand-dark uppercase">Our Care Philosophy</span>
                    <span className="text-brand-coral font-bold">/ /</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-extrabold text-brand-dark mb-8 tracking-tight leading-tight">
                    Mission Statement
                  </h3>
                  
                  <div className="space-y-6 text-lg md:text-xl text-brand-dark/95 leading-relaxed max-w-3xl mx-auto font-sans">
                    <p>
                      At <span className="font-semibold text-brand-dark">BalanceCare Health Services</span>, we are committed to enhancing the health, well-being, and independence of every individual we serve through compassionate, person-centered, and evidence-based care. We recognize that every person’s journey is unique, and we provide comprehensive, recovery-oriented services designed to promote healing, resilience, and an improved quality of life.
                    </p>
                    <p className="text-brand-dark/80">
                      Our integrated approach includes psychiatric medication management, mental and behavioral health counseling, home care services, telehealth, and Developmental Disabilities Administration (DDA) Waiver Program services. By partnering with individuals, families, caregivers, and community resources, we empower our clients to achieve their goals, maximize their potential, and live healthier, more fulfilling lives.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 8. Active Appointment & Professionals Hub */}
            <ActionGrid 
              preselectedService={preselectedService} 
              clearPreselectedService={() => setPreselectedService(undefined)} 
              onRequestAppointment={() => setIsRequestModalOpen(true)}
            />

            {/* 9. Our Locations & Interactive Google Maps */}
            <section id="locations" className="py-24 max-w-[1600px] mx-auto px-4 sm:px-6 md:px-16 lg:px-24">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <div className="flex justify-center items-center gap-2 mb-4">
                  <span className="text-brand-coral font-bold">\ \</span>
                  <span className="text-xs font-bold tracking-widest text-brand-dark uppercase bg-brand-coral/10 px-4 py-1.5 rounded-full">Our Care Hubs</span>
                  <span className="text-brand-coral font-bold">/ /</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-brand-dark mb-4 tracking-tight leading-tight">
                  Our Office Locations
                </h2>
                <p className="text-brand-muted text-sm leading-relaxed max-w-lg mx-auto font-medium">
                  We provide convenient hybrid care across Maryland and Washington DC. Visit our modern, comfortable clinical hubs for in-person consultations, evaluations, and specialized psychiatric treatments.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Maryland Location Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-[2.5rem] border border-neutral-100 p-8 shadow-soft flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-bold uppercase tracking-wider bg-brand-sage text-brand-dark px-3.5 py-1.5 rounded-xl">
                        Columbia, MD Office
                      </span>
                      <span className="text-brand-muted text-xs font-semibold">Primary Care Hub</span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-brand-dark mb-2 font-sans">Maryland Location</h3>
                    <div className="flex items-start gap-2.5 text-brand-muted text-xs leading-relaxed mb-6 font-medium">
                      <MapPin className="w-5 h-5 text-brand-coral shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-brand-dark">10320 Little Patuxent Parkway</p>
                        <p>Suite 200, Columbia, MD 21044</p>
                      </div>
                    </div>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden border border-neutral-100 shadow-sm bg-neutral-100 h-[280px] mb-6">
                    <iframe 
                      src="https://maps.google.com/maps?q=10320%20Little%20Patuxent%20Parkway%2C%20Suite%20200%2C%20Columbia%2C%20MD%2021044&t=&z=14&ie=UTF8&iwloc=&output=embed"
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen={false} 
                      loading="lazy" 
                      title="BalanceCare Maryland Office Location"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>

                  <a 
                    href="https://www.google.com/maps/dir/?api=1&destination=10320+Little+Patuxent+Parkway%2C+Suite+200%2C+Columbia%2C+MD+21044"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-4 px-4 bg-brand-dark hover:bg-black text-white font-bold text-xs rounded-xl transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" /> Get Directions on Google Maps
                  </a>
                </motion.div>

                {/* DC Location Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="bg-white rounded-[2.5rem] border border-neutral-100 p-8 shadow-soft flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-bold uppercase tracking-wider bg-brand-sage/40 text-brand-dark px-3.5 py-1.5 rounded-xl">
                        Washington, DC Office
                      </span>
                      <span className="text-brand-muted text-xs font-semibold">Capitol Care Hub</span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-brand-dark mb-2 font-sans">Washington DC Location</h3>
                    <div className="flex items-start gap-2.5 text-brand-muted text-xs leading-relaxed mb-6 font-medium">
                      <MapPin className="w-5 h-5 text-brand-coral shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-brand-dark">1050 Connecticut Avenue NW</p>
                        <p>Washington DC 20036</p>
                      </div>
                    </div>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden border border-neutral-100 shadow-sm bg-neutral-100 h-[280px] mb-6">
                    <iframe 
                      src="https://maps.google.com/maps?q=1050%20Connecticut%20Avenue%20NW%2C%20Washington%20DC%2020036&t=&z=14&ie=UTF8&iwloc=&output=embed"
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen={false} 
                      loading="lazy" 
                      title="BalanceCare Washington DC Office Location"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>

                  <a 
                    href="https://www.google.com/maps/dir/?api=1&destination=1050+Connecticut+Avenue+NW%2C+Washington+DC+20036"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-4 px-4 bg-brand-dark hover:bg-black text-white font-bold text-xs rounded-xl transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" /> Get Directions on Google Maps
                  </a>
                </motion.div>
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="what-we-do-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <WhatWeDoView 
              onBackToHome={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBookService={(serviceName) => {
                handleServiceSelect(serviceName);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 10. Footer Section */}
      <footer className="bg-brand-dark text-white pt-20 pb-8 rounded-t-[3rem] -mt-10 relative z-10 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Column 1: Brand details */}
            <div className="lg:col-span-2 space-y-6">
              <button 
                onClick={handleScrollToTop}
                className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2.5 text-left group focus:outline-none"
              >
                <img 
                  src="https://plain-weur-prod-public.komododecks.com/202606/30/bEWa4J3Aw82gY8ZvTqLN/image.png"
                  alt="BalanceCare Logo"
                  className="h-8 w-auto object-contain brightness-0 invert transition-transform group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </button>
              <p className="text-gray-400 max-w-sm text-sm leading-relaxed font-medium">
                Guiding individuals toward lasting mental wellness and behavioral peace through compassionate, highly personalized clinical care pathways.
              </p>
            </div>

            {/* Column 2: Navigation Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider mb-6 text-white/50">Navigation</h4>
              <ul className="space-y-3.5 text-sm font-medium">
                <li><button onClick={handleScrollToTop} className="text-gray-300 hover:text-brand-coral transition-colors">Home</button></li>
                <li><a href="#about" onClick={(e) => handleScrollTo(e, 'about')} className="text-gray-300 hover:text-brand-coral transition-colors">Who We Are</a></li>
                <li><a href="#services" onClick={(e) => handleScrollTo(e, 'services')} className="text-gray-300 hover:text-brand-coral transition-colors">What We Do</a></li>
                <li><a href="#professionals" onClick={(e) => handleScrollTo(e, 'professionals')} className="text-gray-300 hover:text-brand-coral transition-colors">Work With Us</a></li>
                <li><a href="#locations" onClick={(e) => handleScrollTo(e, 'locations')} className="text-gray-300 hover:text-brand-coral transition-colors">Our Locations</a></li>
                <li><button onClick={() => setIsRequestModalOpen(true)} className="text-gray-300 hover:text-brand-coral transition-colors text-left cursor-pointer">Request Appointment</button></li>
              </ul>
            </div>
            
            {/* Column 3: Contact Summary */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider mb-6 text-white/50">Direct Contact</h4>
              <ul className="space-y-3.5 text-sm font-medium">
                <li className="text-gray-300">
                  <span className="block text-gray-500 text-[10px] uppercase font-bold">Helpline:</span>
                  <a href="tel:410-977-2847" className="hover:text-brand-coral transition-colors">410-977-2847</a>
                </li>
                <li className="text-gray-300">
                  <span className="block text-gray-500 text-[10px] uppercase font-bold">Email Care:</span>
                  <a href="mailto:camphire@infobalancecare.com" className="hover:text-brand-coral transition-colors break-all">camphire@infobalancecare.com</a>
                </li>
                <li className="text-gray-300">
                  <span className="block text-gray-500 text-[10px] uppercase font-bold">Columbia, MD Hub:</span>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=10320+Little+Patuxent+Parkway%2C+Suite+200%2C+Columbia%2C+MD+21044" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-brand-coral transition-colors"
                  >
                    10320 Little Patuxent Pkwy, Suite 200, Columbia, MD 21044
                  </a>
                </li>
                <li className="text-gray-300">
                  <span className="block text-gray-500 text-[10px] uppercase font-bold">Washington, DC Hub:</span>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=1050+Connecticut+Avenue+NW%2C+Washington+DC+20036" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-brand-coral transition-colors"
                  >
                    1050 Connecticut Ave NW, Washington DC 20036
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar info */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium">
            <p>© Copyright 2025 - 2026 BalanceCare Health Services. All rights reserved.</p>
            <div className="flex gap-6 items-center">
              <a href="#about" onClick={(e) => handleScrollTo(e, 'about')} className="hover:text-white transition-colors">Privacy Policy</a>
              <span className="w-1 h-1 rounded-full bg-gray-600"></span>
              <span>Designed with BalanceCare Brand Guidelines</span>
            </div>
          </div>
        </div>
      </footer>

      {/* 11. Floating Scroll to Top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleScrollToTop}
            className="fixed bottom-6 right-6 p-3 rounded-full bg-gradient-to-r from-brand-green to-brand-blue hover:from-brand-greenHover hover:to-brand-blueHover text-white shadow-lg transition-all z-40 cursor-pointer"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 12. Floating Cookie Banner */}
      <CookieBanner />

      {/* 13. Appointment Request Modal Portal */}
      <AnimatePresence>
        {isRequestModalOpen && (
          <AppointmentRequestForm 
            isOpen={isRequestModalOpen} 
            onClose={() => setIsRequestModalOpen(false)} 
          />
        )}
      </AnimatePresence>

    </div>
  );
}
