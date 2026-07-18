import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Smile, ArrowRight, HeartPulse, ShieldCheck, Sparkles, X } from 'lucide-react';

export default function AboutSection() {
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [showEmotionalModal, setShowEmotionalModal] = useState(false);

  return (
    <section id="about" className="py-20 bg-brand-bg max-w-[1600px] mx-auto px-4 sm:px-6 md:px-16 lg:px-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Bento Box 1: Large Image with Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[2rem] overflow-hidden aspect-[4/3] lg:aspect-[3/4] bg-neutral-200 group shadow-soft border border-neutral-100"
        >
          <img 
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop" 
            alt="Woman feeling calm and mindful outdoors" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          
          {/* Inner Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

          {/* Floating Bottom Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-6 left-6 right-6 lg:right-auto lg:w-85 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-float border border-white/50 transform transition-all duration-300 hover:-translate-y-1"
          >
            <h4 className="font-bold text-brand-dark text-lg mb-2 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <Brain className="w-4 h-4" />
              </div>
              Clarity of Mind
            </h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              Reflection allows individuals to process their thoughts clearly, reduce mental overload, and build emotional clarity over time. Our experts guide this contemplative pathway.
            </p>
          </motion.div>
        </motion.div>

        {/* Right Column Grid */}
        <div className="flex flex-col justify-center">
          
          {/* Main About Content Box */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-[2rem] p-8 md:p-12 shadow-soft border border-white/60 flex flex-col justify-center"
          >
            {/* Specific label style from reference */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs font-bold tracking-wider text-brand-dark uppercase">About Us</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-extrabold text-brand-dark mb-6 leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">BalanceCare</span> <br />
              Health Services
            </h2>
            
            <p className="text-brand-muted mb-6 leading-relaxed font-medium text-base">
              At BalanceCare Health Services, we specialize in mental and behavioral health care that puts people first. Our mission is to help individuals regain emotional stability, improve quality of life, and thrive in their personal and professional environments.
            </p>
            
            <p className="text-brand-dark mb-8 leading-relaxed text-sm opacity-90">
              We provide a full range of evidence-based services—from individual and family therapy to behavioral interventions and virtual health support. As dedicated healthcare practitioners, we prioritize genuine human connections over algorithmic protocols.
            </p>

            <div>
              <button 
                onClick={() => setShowStoryModal(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-green to-brand-blue hover:from-brand-greenHover hover:to-brand-blueHover text-white font-bold py-3.5 px-8 rounded-full transition-all duration-300 shadow-md shadow-brand-blue/15 hover:shadow-brand-blue/30 text-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98] group"
              >
                <span>Read Our Story</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
          
        </div>
      </div>

      {/* Story Modal */}
      <AnimatePresence>
        {showStoryModal && (
          <div className="fixed inset-0 bg-brand-dark/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-10 shadow-float relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setShowStoryModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 text-brand-dark transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              
              <span className="text-xs font-bold uppercase tracking-wider text-brand-blue block mb-2">Our Foundation</span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-brand-dark mb-6">The BalanceCare Journey</h3>
              
              <div className="space-y-4 text-sm text-brand-muted leading-relaxed">
                <p>
                  BalanceCare Health Services was founded with a simple vision: to provide compassionate, high-quality healthcare that places people—not processes—at the center of every decision. Our multidisciplinary team is dedicated to delivering personalized, evidence-based care that supports mental, behavioral, and physical well-being.
                </p>
                <p>
                  We believe that healing happens through meaningful relationships, respect, and individualized care. By listening to each person’s unique needs, we create treatment plans that promote recovery, independence, and long-term wellness.
                </p>
                <p>
                  Today, BalanceCare proudly serves individuals and families throughout Maryland and Washington, DC, offering psychiatric medication management, behavioral health services, home care, telehealth, and DDA Waiver services. We are committed to helping every client achieve a healthier, more fulfilling life through compassionate care and trusted clinical expertise.
                </p>
                <p className="font-semibold text-brand-dark italic">
                  “Your health. Your journey. Your balance.”
                </p>
              </div>
              
              <button 
                onClick={() => setShowStoryModal(false)}
                className="mt-8 bg-brand-dark hover:bg-black text-white font-bold py-3 px-6 rounded-full text-xs transition-colors cursor-pointer"
              >
                Close Story
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Emotional Awareness Modal */}
      <AnimatePresence>
        {showEmotionalModal && (
          <div className="fixed inset-0 bg-brand-dark/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-10 shadow-float relative"
            >
              <button 
                onClick={() => setShowEmotionalModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 text-brand-dark transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-12 h-12 rounded-full bg-brand-sage/40 flex items-center justify-center text-brand-dark mb-4">
                <Smile className="w-6 h-6 text-brand-blue" />
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-brand-dark mb-4">Cultivating Emotional Awareness</h3>
              
              <div className="space-y-4 text-sm text-brand-muted leading-relaxed">
                <p>
                  Emotional awareness is the foundation of mental resilience. Rather than suppressing uncomfortable feelings like grief, anxiety, or stress, our therapeutic guides teach cognitive tools to:
                </p>
                <ul className="list-disc list-inside space-y-2 font-medium text-brand-dark pl-2">
                  <li>Identify emotional triggers in real-time</li>
                  <li>Understand the physiological sensations of emotional shifts</li>
                  <li>Incorporate daily mindfulness breathing and reflection</li>
                  <li>Replace destructive coping loops with adaptive, healthy habits</li>
                </ul>
                <p>
                  With structured programs customized to both teens and adults, our care pathways build a robust vocabulary for mental wellness.
                </p>
              </div>
              
              <button 
                onClick={() => setShowEmotionalModal(false)}
                className="mt-8 w-full bg-gradient-to-r from-brand-green to-brand-blue hover:from-brand-greenHover hover:to-brand-blueHover text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-colors cursor-pointer shadow-md shadow-brand-blue/15"
              >
                Back to About Us
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
