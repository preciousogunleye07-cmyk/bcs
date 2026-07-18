import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show banner after 1.5 seconds delay
    const timer = setTimeout(() => {
      const consent = localStorage.getItem('balancecare_cookie_consent');
      if (!consent) {
        setIsVisible(true);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('balancecare_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('balancecare_cookie_consent', 'rejected');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          className="fixed bottom-6 left-6 right-6 lg:left-1/2 lg:-translate-x-1/2 lg:w-[820px] bg-white rounded-3xl shadow-float z-[100] border border-neutral-100 overflow-hidden"
          id="cookieBanner"
        >
          <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 flex gap-4 items-start text-left">
              <div className="w-10 h-10 rounded-full bg-brand-sage/40 flex items-center justify-center text-brand-dark shrink-0 mt-0.5">
                <Shield className="w-5 h-5 text-brand-coral" />
              </div>
              <div>
                <h3 className="text-base font-bold text-brand-dark mb-1">We value your privacy</h3>
                <p className="text-xs text-brand-muted leading-relaxed font-medium">
                  We use cookies to enhance your browsing experience, serve personalized wellness articles or suggestions, and analyze our visitor traffic. By clicking "Accept All", you consent to our use of cookies.
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 shrink-0 w-full md:w-auto">
              <button 
                onClick={handleReject} 
                className="flex-1 md:flex-none px-5 py-2.5 text-xs font-bold text-brand-dark border border-neutral-200 rounded-full hover:bg-neutral-50 transition-colors cursor-pointer text-center"
              >
                Reject All
              </button>
              <button 
                onClick={handleAccept} 
                className="flex-1 md:flex-none px-5 py-2.5 text-xs font-bold text-white bg-brand-coral hover:bg-brand-coralHover rounded-full shadow-sm transition-colors cursor-pointer text-center"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
