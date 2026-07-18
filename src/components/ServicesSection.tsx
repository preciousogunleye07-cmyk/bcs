import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, ShieldAlert, Heart, Calendar } from 'lucide-react';
import { Service } from '../types';
// @ts-ignore
import anxietyImage from '../assets/images/regenerated_image_1782964348769.jpg';
// @ts-ignore
import moreServicesImage from '../assets/images/regenerated_image_1782964526400.jpg';

export default function ServicesSection({ 
  onBookService,
  onNavigateToWhatWeDo
}: { 
  onBookService: (serviceName: string) => void;
  onNavigateToWhatWeDo?: () => void;
}) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const servicesData: Service[] = [
    {
      id: 'srv-depression',
      title: 'Depression Care',
      icon: 'depression',
      description: 'Our depression treatment program provides compassionate, evidence-based care through individual therapy and psychiatric medication management when appropriate.',
      longDescription: 'Our depression treatment program provides compassionate, evidence-based care through individual therapy and psychiatric medication management when appropriate. We work collaboratively with clients to address the emotional, behavioral, and biological factors contributing to depression while promoting resilience, recovery, and long-term wellness.',
      benefits: [
        'Comprehensive assessment and medication management',
        'Individualized therapy focused on recovery and resilience',
        'Improved mood, motivation, and daily functioning',
        'Healthy coping strategies for managing depressive symptoms',
        'Ongoing support to promote lasting emotional wellness'
      ]
    },
    {
      id: 'srv-anxiety',
      title: 'Anxiety Treatment',
      icon: 'anxiety',
      description: 'From chronic worry to acute panic attacks, our therapists offer personalized, somatic, and behavioral strategies to regulate your nervous system.',
      longDescription: 'Anxiety triggers a physical stress response. Our clinical anxiety care pairs traditional talk-therapy with body-focused sensory somatic regulation. Learn structured deep breathing patterns, identify cognitive distortions, and practice exposure techniques in a safe, judgment-free space.',
      benefits: [
        'Regulate physical anxiety symptoms immediately',
        'De-escalate panic attacks using proven somatic tools',
        'Reduce chronic daily worry and catastrophic thoughts',
        'Access to on-demand emergency coping worksheets'
      ]
    },
    {
      id: 'srv-more',
      title: 'Integrated Care & Trauma Support',
      icon: 'more',
      description: 'Explore the full spectrum of our behavioral therapy, including EMDR trauma care, grief support, relationship navigation, and senior psychiatric consultations.',
      longDescription: 'Our holistic mental health framework expands to cover complex behavioral needs. From post-traumatic stress recovery (using EMDR methodologies) to complex grief processing, family therapeutic structures, and elder emotional support, we coordinate care tailored to every generational stage.',
      benefits: [
        'Certified EMDR techniques for trauma and PTSD',
        'Grief counseling following deep physical or emotional loss',
        'Virtual and in-person hybrid support configurations',
        'Coordination with local medical doctors and psychiatrists'
      ]
    }
  ];

  const handleOpenService = (service: Service) => {
    setSelectedService(service);
  };

  return (
    <section id="services" className="py-20 bg-brand-bg max-w-[1600px] mx-auto px-4 sm:px-6 md:px-16 lg:px-24">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold tracking-wider text-brand-dark uppercase">What We Offer</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark leading-tight tracking-tight">Our Available Services</h2>
        </div>
        <div className="md:max-w-md text-sm text-brand-muted leading-relaxed border-l-2 border-brand-blue pl-5">
          At BalanceCare Health Services, we provide a comprehensive range of mental and behavioral health care services designed to support individuals and families at every stage of their wellness journey.
        </div>
      </div>

      {/* Grid of 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Service Card 1: Depression */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[2rem] p-6 hover:shadow-float transition-all duration-300 group border border-white/60 flex flex-col justify-between overflow-hidden"
        >
          <div>
            <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6 shadow-inner bg-neutral-100">
              <img 
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop" 
                alt="Mindfulness yoga meditation for calm and depression care" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
            </div>
            <h3 className="text-xl font-extrabold text-brand-dark mb-3">Depression Care</h3>
            <p className="text-brand-muted mb-6 text-xs leading-relaxed">
              Our depression treatment program provides compassionate, evidence-based care through individual therapy and psychiatric medication management when appropriate.
            </p>
          </div>
          <button 
            onClick={() => handleOpenService(servicesData[0])}
            className="inline-flex items-center text-xs font-extrabold text-brand-dark group-hover:text-brand-green transition-colors w-fit gap-1 cursor-pointer"
          >
            CLICK HERE 
            <span className="transform group-hover:translate-x-1.5 transition-transform font-bold">→</span>
          </button>
        </motion.div>

        {/* Service Card 2: Anxiety */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-[2rem] p-6 hover:shadow-float transition-all duration-300 group border border-white/60 flex flex-col justify-between overflow-hidden"
        >
          <div>
            <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6 shadow-inner bg-neutral-100">
              <img 
                src={anxietyImage} 
                alt="A man and a woman sitting on a couch talking" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
            </div>
            <h3 className="text-xl font-extrabold text-brand-dark mb-3">Anxiety Treatment</h3>
            <p className="text-brand-muted mb-6 text-xs leading-relaxed">
              From panic attacks to chronic worry, our clinical therapists offer personalized cognitive and somatic strategies to calm your central nervous system.
            </p>
          </div>
          <button 
            onClick={() => handleOpenService(servicesData[1])}
            className="inline-flex items-center text-xs font-extrabold text-brand-dark group-hover:text-brand-blue transition-colors w-fit gap-1 cursor-pointer"
          >
            CLICK HERE 
            <span className="transform group-hover:translate-x-1.5 transition-transform font-bold">→</span>
          </button>
        </motion.div>

        {/* Service Card 3: More Services (Elegant dark-styled card) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={() => {
            if (onNavigateToWhatWeDo) {
              onNavigateToWhatWeDo();
            } else {
              handleOpenService(servicesData[2]);
            }
          }}
          className="bg-brand-dark rounded-[2rem] p-6 hover:shadow-float transition-all duration-300 group flex flex-col justify-between relative overflow-hidden text-white cursor-pointer"
        >
          {/* Abstract decoration shape */}
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full border-[10px] border-white/5 opacity-50 pointer-events-none"></div>
          
          <div>
            <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6 shadow-inner bg-neutral-800">
              <img 
                src={moreServicesImage} 
                alt="A man and a woman sitting on a couch talking" 
                className="w-full h-full object-cover opacity-85 transition-transform duration-500 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
            </div>
            <h3 className="text-xl font-extrabold text-white mb-3">More Services</h3>
            <p className="text-white/70 mb-6 text-xs leading-relaxed">
              Explore our full spectrum of specialized programs, including EMDR trauma counseling, psychiatric medication evaluations, and family therapeutic care.
            </p>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (onNavigateToWhatWeDo) {
                onNavigateToWhatWeDo();
              } else {
                handleOpenService(servicesData[2]);
              }
            }}
            className="inline-flex items-center text-xs font-extrabold text-white group-hover:text-brand-green transition-colors w-fit gap-1 cursor-pointer relative z-10"
          >
            CLICK HERE 
            <span className="transform group-hover:translate-x-1.5 transition-transform font-bold">→</span>
          </button>
        </motion.div>
      </div>

      {/* Service Detailed Information Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 bg-brand-dark/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-float relative max-h-[90vh] flex flex-col"
            >
              {/* Header block of modal */}
              <div className="bg-brand-dark text-white p-6 md:p-8 relative">
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2.5 py-0.5 bg-brand-blue text-white text-[10px] font-bold uppercase rounded-full">
                    Certified Clinical Pathway
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold">{selectedService.title}</h3>
              </div>

              {/* Body Content */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-grow">
                <div>
                  <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">Service Overview</h4>
                  <p className="text-sm text-brand-muted leading-relaxed">
                    {selectedService.longDescription}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider mb-3">Key Benefits & Expected Outcomes</h4>
                  <ul className="space-y-2">
                    {selectedService.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-brand-dark font-medium">
                        <Check className="w-4 h-4 text-brand-green shrink-0 mt-1" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-brand-bg p-4 rounded-xl border border-gray-200 text-xs text-brand-muted leading-relaxed flex gap-2">
                  <ShieldAlert className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                  <span>
                    Our clinical services operate in strictly confidential parameters. Client logs are kept safe and secure under HIPPA-compliant protocols and service laws.
                  </span>
                </div>
              </div>

              {/* Action buttons on modal footer */}
              <div className="p-6 border-t border-gray-100 flex gap-4 bg-gray-50 shrink-0">
                <a 
                  href="https://intakeq.com/new/lgmlqn"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSelectedService(null)}
                  className="flex-1 bg-gradient-to-r from-brand-green to-brand-blue hover:from-brand-greenHover hover:to-brand-blueHover text-white font-bold py-3.5 px-6 rounded-xl text-xs text-center transition-all shadow-md shadow-brand-blue/15 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" /> Book Consultation
                </a>
                <button 
                  onClick={() => setSelectedService(null)}
                  className="flex-1 border border-neutral-200 bg-white text-brand-dark hover:bg-neutral-50 font-bold py-3.5 px-6 rounded-xl text-xs text-center transition-colors cursor-pointer"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
