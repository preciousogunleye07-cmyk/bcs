import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, HelpCircle, Phone, Sparkles, AlertTriangle, ShieldCheck, Check, Heart } from 'lucide-react';
// @ts-ignore
import ptsdImage from '../assets/images/regenerated_image_1782964108429.jpg';
// @ts-ignore
import whatWeDoHeroImage from '../assets/images/regenerated_image_1782964927900.jpg';
// @ts-ignore
import telehealthImage from '../assets/images/regenerated_image_1782965080514.jpg';
// @ts-ignore
import medicationImage from '../assets/images/regenerated_image_1782965079605.jpg';
// @ts-ignore
import anxietyDisorderImage from '../assets/images/regenerated_image_1782965370312.jpg';
// @ts-ignore
import expertiseImage from '../assets/images/regenerated_image_1782965285313.jpg';
// @ts-ignore
import sleepDisordersImage from '../assets/images/regenerated_image_1782965370920.jpg';
// @ts-ignore
import griefAndLossImage from '../assets/images/regenerated_image_1782965371617.jpg';
// @ts-ignore
import bipolarDisorderImage from '../assets/images/regenerated_image_1782965479370.jpg';

interface WhatWeDoViewProps {
  onBackToHome: () => void;
  onBookService: (serviceName: string) => void;
}

interface ConditionCard {
  title: string;
  description: string;
  image: string;
  alt: string;
}

const conditionsData: ConditionCard[] = [
  {
    title: 'Telehealth Services',
    description: 'At BalanceCare Health Services, we embrace innovation to bring quality mental health care right to your fingertips.',
    image: telehealthImage,
    alt: 'Woman consulting to a psychiatrist online via laptop screen'
  },
  {
    title: 'Medication Management',
    description: 'We provide personalized medication plans to support stability and well-being.',
    image: medicationImage,
    alt: 'Healthcare provider discussing medication guidelines with patient'
  },
  {
    title: 'Anxiety Disorder',
    description: 'We help manage anxiety with proven treatments that promote calm and control.',
    image: anxietyDisorderImage,
    alt: 'A person holding head in contemplation in front of files at desk'
  },
  {
    title: 'Depression',
    description: 'We offer personalized care to improve mood, energy, and daily function.',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=600&auto=format&fit=crop',
    alt: 'Young man experiencing sadness and looking down'
  },
  {
    title: 'Bipolar Disorder',
    description: 'We support mood stability with structured, long-term treatment plans.',
    image: bipolarDisorderImage,
    alt: 'A tree with dual lighting representing mood cycles and stability'
  },
  {
    title: 'ADHD',
    description: 'We provide therapy and medication to help manage focus and impulse control.',
    image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=600&auto=format&fit=crop',
    alt: 'Therapist observing young mother and daughter playing with blocks'
  },
  {
    title: 'PTSD',
    description: 'We use trauma-informed care to help individuals process and manage past trauma.',
    image: ptsdImage,
    alt: 'Trauma support counseling session in an office'
  },
  {
    title: 'Expertise in Diverse Psychiatric Conditions',
    description: 'We treat a wide range of mental health conditions with expert, personalized care.',
    image: expertiseImage,
    alt: 'Expert clinical advisor talking gently with patient'
  },
  {
    title: 'Autism Spectrum Disorders',
    description: 'We offer psychiatric support tailored to the unique needs of individuals with ASD.',
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=600&auto=format&fit=crop',
    alt: 'Autistic child building block structure in a treatment clinic'
  },
  {
    title: 'Schizophrenia',
    description: 'We provide ongoing care to support stability, daily function, and symptom management.',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop',
    alt: 'Abstract overlapping shapes representing multi-faceted thoughts'
  },
  {
    title: 'OCD',
    description: 'We treat obsessive thoughts and compulsions with targeted, evidence-based care.',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop',
    alt: 'Neat organized flatlay structure illustrating detail sorting'
  },
  {
    title: 'Eating Disorders',
    description: 'We support recovery through compassionate care for disordered eating patterns.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600&auto=format&fit=crop',
    alt: 'Table with clean food ingredients showing physical wellness balance'
  },
  {
    title: 'Sleep Disorders',
    description: 'We help improve rest and function by treating sleep-related mental health issues.',
    image: sleepDisordersImage,
    alt: 'Restless woman in bed experiencing sleep issues'
  },
  {
    title: 'Personality Disorders',
    description: 'We offer structured support to improve coping, behavior, and relationships.',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop',
    alt: 'Woman consulting with a psychological therapist in a serene office'
  },
  {
    title: 'Substance Abuse',
    description: 'We provide nonjudgmental, integrated care to support lasting recovery.',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop',
    alt: 'Supportive recovery handwritten notes on a corkboard'
  },
  {
    title: 'Stress Management',
    description: 'We teach practical strategies to reduce stress and improve daily balance.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop',
    alt: 'Calm young woman meditating in clean lit room'
  },
  {
    title: 'Grief and Loss',
    description: 'We offer support through all stages of grief with compassionate care.',
    image: griefAndLossImage,
    alt: 'Individual counseling support for processing heavy loss'
  },
  {
    title: 'Relationship Issues',
    description: 'We help individuals improve communication, boundaries, and emotional connection.',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop',
    alt: 'Couple consulting about marital boundaries with advisor'
  },
  {
    title: 'Telepsychiatry',
    description: 'We connect you to expert psychiatric care through secure, convenient online sessions.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop',
    alt: 'Online virtual mental health consultation through screen'
  }
];

export default function WhatWeDoView({ onBackToHome, onBookService }: WhatWeDoViewProps) {
  // Automatically scroll to top on mount
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="py-12 max-w-[1600px] mx-auto px-4 sm:px-6 md:px-16 lg:px-24 bg-brand-bg text-brand-dark min-h-screen">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2.5 text-xs text-brand-muted mb-10 font-semibold tracking-wide">
        <button 
          onClick={onBackToHome}
          className="hover:text-brand-coral transition-colors flex items-center gap-1 focus:outline-none"
        >
          Home
        </button>
        <span className="text-gray-300">»</span>
        <span className="text-brand-dark font-bold">What We Do</span>
      </div>

      {/* Main Title Hero Card with beautiful side layout */}
      <div className="bg-white rounded-[3rem] border border-white/60 shadow-soft p-8 md:p-14 mb-16 relative overflow-hidden">
        {/* Decorative backdrop shapes */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-brand-coral/5 blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-brand-blue/5 blur-2xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-coral/10 text-brand-coral text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> What We Offer
            </div>
            
            <h1 className="text-3xl md:text-5xl font-extrabold text-brand-dark tracking-tight leading-tight">
              Our Comprehensive Care Services
            </h1>
            
            <p className="text-base md:text-lg text-brand-muted leading-relaxed font-medium">
              Our services are designed to address a wide range of psychiatric and behavioral health concerns with personalized, evidence-based care. Backed by expertise in diverse psychiatric conditions, we provide comprehensive evaluations and treatment plans tailored to each individual's needs and goals. From medication management to support for complex conditions, our team is committed to helping clients achieve long-term mental wellness.
            </p>

            <div className="h-[1px] bg-neutral-100 w-full my-6"></div>

            <p className="text-sm font-extrabold text-brand-dark flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-green"></span>
              We address a wide variety of psychiatric conditions and other concerns:
            </p>
          </div>

          <div className="lg:col-span-5 h-[320px] rounded-3xl overflow-hidden shadow-md bg-neutral-100 relative group border border-neutral-100">
            <img 
              src={whatWeDoHeroImage} 
              alt="People talking on a comfortable couch in a clinical office setting" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Featured Section: Home Health Care & DDA Waiver Services */}
      <div className="bg-white rounded-[3rem] border border-neutral-100 shadow-soft p-8 md:p-14 mb-16 relative overflow-hidden">
        {/* Decorative background gradients */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-brand-green/5 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-brand-blue/5 blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
          
          {/* Left: Image card */}
          <div className="lg:col-span-5 h-[360px] md:h-[420px] rounded-3xl overflow-hidden shadow-md bg-neutral-100 relative group border border-neutral-100">
            <img 
              src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=800&auto=format&fit=crop" 
              alt="Caregiver assisting elderly person with compassion in home environment" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/50 text-left">
              <span className="text-brand-coral text-[10px] font-bold uppercase tracking-widest block mb-1">Person-Centered Support</span>
              <p className="text-brand-dark text-xs font-extrabold">Promoting independence, dignity, and overall well-being in the comfort of your home.</p>
            </div>
          </div>

          {/* Right: Text content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-green/10 text-brand-green text-xs font-bold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5" /> Featured Program
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark tracking-tight leading-tight">
              Home Health Care &amp; DDA Waiver Services
            </h2>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-brand-coral uppercase tracking-widest">Service Overview</h3>
              <p className="text-sm md:text-base text-brand-muted leading-relaxed font-medium">
                Our Home Health Care and DDA Waiver services covers comprehensive range of supports such as respite care
                (hourly and daily), direct support professionals, professional and paraprofessional behavioral support, non-
                professional behavioral support plans, community support teams, host home providers, and companion
                services—all delivered to meet each individual’s unique needs. We provide person-centered care that promotes
                independence, dignity, and overall well-being.
              </p>
            </div>

            <div className="h-[1px] bg-neutral-100 w-full"></div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-brand-blue uppercase tracking-widest">Key Benefits</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-2.5">
                  <span className="p-1 rounded-full bg-brand-green/10 text-brand-green shrink-0 mt-0.5 animate-pulse">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <p className="text-xs text-brand-muted font-medium leading-relaxed">
                    <strong>Comprehensive behavioral health</strong>, including therapy and medication management.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="p-1 rounded-full bg-brand-green/10 text-brand-green shrink-0 mt-0.5 animate-pulse">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <p className="text-xs text-brand-muted font-medium leading-relaxed">
                    <strong>In-home care support</strong> assisting with bathing, dressing, and daily meals (ADLs).
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="p-1 rounded-full bg-brand-green/10 text-brand-green shrink-0 mt-0.5 animate-pulse">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <p className="text-xs text-brand-muted font-medium leading-relaxed">
                    <strong>DDA Waiver services</strong> focused on community integration and skill development.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="p-1 rounded-full bg-brand-green/10 text-brand-green shrink-0 mt-0.5 animate-pulse">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <p className="text-xs text-brand-muted font-medium leading-relaxed">
                    <strong>Telehealth options</strong> for easy, convenient access to care and health monitoring.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2.5 pt-1">
                <span className="p-1 rounded-full bg-brand-green/10 text-brand-green shrink-0 mt-0.5 animate-pulse">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <p className="text-xs text-brand-muted font-medium leading-relaxed">
                  <strong>Compassionate, multidisciplinary team</strong> committed to delivering high-quality, personalized care and improving overall well-being.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={() => onBookService('Home Health & DDA Waiver')}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-green to-brand-blue hover:from-brand-greenHover hover:to-brand-blueHover text-white px-7 py-3.5 rounded-full text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" /> Inquire About Waiver Services
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Service Conditions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {conditionsData.map((cond, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4) }}
            className="bg-white rounded-3xl overflow-hidden hover:shadow-float transition-all duration-300 border border-neutral-100 flex flex-col justify-between group h-full"
          >
            <div>
              <div className="h-52 w-full relative overflow-hidden bg-neutral-100">
                <img 
                  src={cond.image} 
                  alt={cond.alt} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent"></div>
              </div>

              <div className="p-7">
                <h3 className="text-xl font-extrabold text-brand-dark mb-3 group-hover:text-brand-coral transition-colors">
                  {cond.title}
                </h3>
                <p className="text-brand-muted text-xs leading-relaxed font-medium">
                  {cond.description}
                </p>
              </div>
            </div>

            <div className="p-7 pt-0">
              <button 
                onClick={() => onBookService(cond.title)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-dark hover:text-brand-coral transition-colors cursor-pointer group/btn"
              >
                <span>Click Here ››</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Take the First Step CTA section */}
      <div className="bg-brand-dark text-white rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-lg border border-white/5">
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-brand-green/10 blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-brand-blue/10 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/5 text-brand-coral mb-2">
            <HelpCircle className="w-8 h-8" />
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Take the First Step
          </h2>

          <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            You don’t have to navigate this alone. Our team is here to help you explore personalized treatment options grounded in science and guided by compassion. Schedule an Appointment with us today and take the next step toward improved well-being.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button 
              onClick={() => onBookService('General Request')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-green to-brand-blue hover:from-brand-greenHover hover:to-brand-blueHover text-white px-8 py-4 rounded-full text-sm font-bold shadow-md transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" /> Book an Appointment
            </button>
            
            <a 
              href="tel:410-977-2847"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white hover:bg-white/5 text-white px-8 py-4 rounded-full text-sm font-bold transition-all"
            >
              <Phone className="w-4 h-4 text-brand-coral" /> Call Helpline
            </a>
          </div>

          <div className="pt-6 flex flex-wrap justify-center gap-6 text-[11px] text-gray-400 font-semibold tracking-wide uppercase">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-brand-green" /> HIPAA-Compliant Care</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-brand-green" /> Expert Clinical Staff</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-brand-green" /> Maryland & DC Licensed</span>
          </div>
        </div>
      </div>

    </div>
  );
}
