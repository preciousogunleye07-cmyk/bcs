import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Calendar, ArrowRight, X, Sparkles, Check, CheckCircle2, User, Phone, Mail, Award, Clock } from 'lucide-react';
import { Expert, AppointmentBooking, ReferralSubmission } from '../types';

export default function ActionGrid({ 
  preselectedService, 
  clearPreselectedService,
  onRequestAppointment
}: { 
  preselectedService?: string; 
  clearPreselectedService?: () => void;
  onRequestAppointment?: () => void;
}) {
  const [activeModal, setActiveModal] = useState<'none' | 'professionals' | 'appointment' | 'referrals'>(
    preselectedService ? 'appointment' : 'none'
  );

  // Appointment Form state
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState<AppointmentBooking>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    expertId: '',
    serviceId: preselectedService || '',
    date: '',
    timeSlot: '',
    notes: ''
  });
  const [bookingSuccessData, setBookingSuccessData] = useState<{ id: string } | null>(null);

  // Referral Form state
  const [referralData, setReferralData] = useState<ReferralSubmission>({
    referrerName: '',
    referrerContact: '',
    patientName: '',
    patientContact: '',
    serviceNeeded: '',
    notes: ''
  });
  const [referralSuccessData, setReferralSuccessData] = useState<{ ticket: string } | null>(null);

  // Staff list
  const staffList: Expert[] = [
    {
      id: 'staff-vance',
      name: 'Dr. Leni Vance',
      role: 'Director of Clinical Wellness Programs',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=400&auto=format&fit=crop',
      specialties: ['Somatic Regulation', 'Mindfulness Coaching', 'Senior Transitions'],
      bio: 'Dr. Vance coordinates our clinical program frameworks with fifteen years of experience in mindfulness-based therapy.',
      education: 'PhD in Clinical Psychology — Georgetown University'
    },
    {
      id: 'staff-mercer',
      name: 'Dr. Alan Mercer',
      role: 'Consulting Psychiatrist & Medical Advisor',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop',
      specialties: ['Psychiatric Assessments', 'Medication Management', 'Neurodiversity'],
      bio: 'Dr. Mercer consults on integrated care pathways, bringing comprehensive medication integration analysis to complex anxiety recovery.',
      education: 'MD in Psychiatry — Johns Hopkins University School of Medicine'
    },
    {
      id: 'staff-sterling',
      name: 'Clara Sterling, LCSW',
      role: 'Lead Youth & Family Counselor',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
      specialties: ['Teen Therapy', 'Grief Counseling', 'Cognitive Behavioral Therapy'],
      bio: 'Clara focuses on supporting young adults and families through critical developmental and situational adjustments.',
      education: 'Master of Social Work — Boston University'
    },
    {
      id: 'staff-wu',
      name: 'Jordan Wu, LMFT',
      role: 'Marriage & Relationship Therapist',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
      specialties: ['Couples Therapy', 'Conflict Resolution', 'Emotional Safety'],
      bio: 'Jordan provides structured, active dialogue sessions for couples attempting to restore dynamic bonds and overcome communication blockages.',
      education: 'MS in Marriage and Family Therapy — University of Maryland'
    }
  ];

  const handleOpenAppointment = () => {
    setBookingStep(1);
    setBookingSuccessData(null);
    setBookingData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      expertId: '',
      serviceId: preselectedService || '',
      date: '',
      timeSlot: '',
      notes: ''
    });
    setActiveModal('appointment');
  };

  const handleAutoFillBooking = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    setBookingData({
      firstName: 'Jordan',
      lastName: 'Morgan',
      email: 'jordan.morgan.test@example.com',
      phone: '(410) 555-0198',
      expertId: 'staff-vance',
      serviceId: preselectedService || 'Psychiatric Evaluation & Medication Management',
      date: todayStr,
      timeSlot: '10:00 AM - 11:00 AM',
      notes: 'Test consultation request for routine care assessment.'
    });
  };

  const handleAutoFillReferral = () => {
    setReferralData({
      referrerName: 'Dr. Emily Carter, MD',
      referrerContact: 'emily.carter@columbiamedical.org',
      patientName: 'Alex Rivera',
      patientContact: '(410) 555-0144',
      serviceNeeded: 'Psychiatric Evaluation & Medication Management',
      notes: 'Referred for comprehensive outpatient mental health evaluation and ongoing medication management.'
    });
  };

  const handleOpenReferrals = () => {
    setReferralSuccessData(null);
    setReferralData({
      referrerName: '',
      referrerContact: '',
      patientName: '',
      patientContact: '',
      serviceNeeded: '',
      notes: ''
    });
    setActiveModal('referrals');
  };

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API reservation ID
    const randomId = 'BC-' + Math.floor(Math.random() * 900000 + 100000);
    setBookingSuccessData({ id: randomId });
    setBookingStep(4);
  };

  const handleReferralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomTicket = 'REF-' + Math.floor(Math.random() * 90000 + 10000);
    setReferralSuccessData({ ticket: randomTicket });
  };

  const selectedExpertObj = staffList.find(s => s.id === bookingData.expertId);

  // Trigger appointment modal from main page if preselectedService changes
  React.useEffect(() => {
    if (preselectedService) {
      if (onRequestAppointment) {
        onRequestAppointment();
      } else {
        setBookingData(prev => ({ ...prev, serviceId: preselectedService }));
        setBookingStep(1);
        setBookingSuccessData(null);
        setActiveModal('appointment');
      }
    }
  }, [preselectedService, onRequestAppointment]);

  const closeAppointmentModal = () => {
    setActiveModal('none');
    if (clearPreselectedService) {
      clearPreselectedService();
    }
  };

  return (
    <section id="professionals" className="py-12 bg-brand-bg max-w-[1600px] mx-auto px-4 sm:px-6 md:px-16 lg:px-24 pb-24">
      <div className="grid grid-cols-1 gap-8 max-w-xl mx-auto">
        
        {/* Card 2: Schedule an Appointment */}
        <motion.button 
          type="button"
          onClick={onRequestAppointment || handleOpenAppointment}
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="group relative h-[420px] rounded-[3rem] overflow-hidden shadow-soft cursor-pointer border border-white/60 bg-brand-dark block w-full relative text-left"
        >
          <img 
            src="https://images.unsplash.com/photo-1527137341206-1d1b48bae20b?q=80&w=1200&auto=format&fit=crop" 
            alt="A man and a woman sitting on a couch talking" 
            className="absolute inset-0 w-full h-full object-cover object-center opacity-90 transition-transform duration-700 group-hover:scale-103" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent"></div>
          
          {/* Top highlight badge */}
          <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm border border-white/50 text-[10px] font-bold text-brand-dark tracking-wide uppercase">
            Easy Online Booking
          </div>

          <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 flex flex-col justify-end h-full z-10 text-left">
            <span className="text-brand-blue text-xs font-bold uppercase tracking-widest mb-2">Book a Session</span>
            <h3 className="text-3xl font-extrabold text-white mb-3 leading-tight tracking-tight">
              Schedule your<br />Appointment
            </h3>
            <p className="text-white/80 text-xs md:text-sm font-medium leading-relaxed max-w-md mb-6 transition-all duration-300">
              Take the first step toward clinical excellence and personal harmony. Pick your target service, preferred specialist, and select a convenient consultation date.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-brand-blue group-hover:text-white transition-colors">
              <span className="bg-brand-blue text-white group-hover:bg-white group-hover:text-brand-dark w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm">
                →
              </span>
              <span>Start Booking Wizard</span>
            </div>
          </div>
        </motion.button>
      </div>

      {/* MODAL 1: MEET OUR PROFESSIONALS */}
      <AnimatePresence>
        {activeModal === 'professionals' && (
          <div className="fixed inset-0 bg-brand-dark/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="bg-white rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-float relative max-h-[85vh] overflow-y-auto"
            >
              <button 
                onClick={() => setActiveModal('none')}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 text-brand-dark transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-brand-coral" />
                <span className="text-xs font-bold uppercase tracking-wider text-brand-coral">Licensed Practitioners</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-brand-dark mb-6">Our Mental Health Specialists</h3>
              
              <div className="space-y-6">
                {staffList.map((staff) => (
                  <div key={staff.id} className="flex flex-col sm:flex-row gap-5 p-5 bg-brand-bg rounded-2xl border border-neutral-200/50">
                    <img 
                      src={staff.image} 
                      alt={staff.name} 
                      className="w-24 h-24 rounded-2xl object-cover object-center shrink-0 border border-brand-sage" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="space-y-2 flex-grow">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="font-bold text-brand-dark text-lg">{staff.name}</h4>
                        <span className="text-xs font-bold text-brand-coral bg-brand-coral/10 px-2.5 py-0.5 rounded-full">
                          {staff.role}
                        </span>
                      </div>
                      <p className="text-xs text-brand-muted font-medium">{staff.education}</p>
                      <p className="text-xs text-brand-muted leading-relaxed">{staff.bio}</p>
                      
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {staff.specialties.map((spec, i) => (
                          <span key={i} className="text-[10px] bg-white border border-neutral-200 text-brand-dark font-semibold px-2 py-0.5 rounded-md">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-100 flex justify-end">
                <button 
                  onClick={() => { 
                    setActiveModal('none'); 
                    if (onRequestAppointment) {
                      onRequestAppointment();
                    } else {
                      handleOpenAppointment(); 
                    }
                  }}
                  className="bg-gradient-to-r from-brand-green to-brand-blue hover:from-brand-greenHover hover:to-brand-blueHover text-white font-bold py-3 px-6 rounded-full text-xs transition-colors cursor-pointer"
                >
                  Book with a Specialist
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: INTERACTIVE APPOINTMENT BOOKING WIZARD */}
      <AnimatePresence>
        {activeModal === 'appointment' && (
          <div className="fixed inset-0 bg-brand-dark/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-float relative max-h-[90vh] flex flex-col"
            >
              {/* Header with step indicator */}
              <div className="bg-brand-dark text-white p-6 relative shrink-0">
                <button 
                  onClick={closeAppointmentModal}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center justify-between gap-2 pr-10">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-coral block mb-1">
                      Secure Consultation System
                    </span>
                    <h3 className="text-xl md:text-2xl font-extrabold">Schedule an Appointment</h3>
                  </div>
                  {bookingStep < 4 && (
                    <button
                      type="button"
                      onClick={handleAutoFillBooking}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold rounded-xl border border-white/20 transition-all flex items-center gap-1 cursor-pointer shrink-0"
                      title="Fill with test sample data"
                    >
                      <Sparkles className="w-3 h-3 text-brand-coral" />
                      <span>⚡ Auto-Fill</span>
                    </button>
                  )}
                </div>
                
                {bookingStep < 4 && (
                  <div className="flex items-center gap-1.5 mt-4">
                    {[1, 2, 3].map((step) => (
                      <div 
                        key={step} 
                        className={`h-1.5 rounded-full flex-grow transition-all duration-300 ${
                          step <= bookingStep ? 'bg-brand-coral' : 'bg-white/20'
                        }`} 
                      />
                    ))}
                    <span className="text-xs font-bold text-brand-coral ml-2">Step {bookingStep} of 3</span>
                  </div>
                )}
              </div>

              {/* Booking Body Form */}
              <form onSubmit={handleBookSubmit} className="p-6 md:p-8 overflow-y-auto flex-grow flex flex-col">
                
                {/* STEP 1: SELECT CARE NEED */}
                {bookingStep === 1 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4 flex-grow">
                    <h4 className="font-bold text-brand-dark text-sm mb-1">What program matches your health requirements?</h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {[
                        { label: 'Depression Care Support', value: 'Depression Care' },
                        { label: 'Anxiety Somatic & Cognitive Treatment', value: 'Anxiety Treatment' },
                        { label: 'Youth & Family Therapy', value: 'Youth & Family Therapy' },
                        { label: 'Marriage & Conflict Resolution Therapy', value: 'Marriage & Relationship Therapy' },
                        { label: 'General Psychiatric Consultation', value: 'General Psychiatric' }
                      ].map((item) => (
                        <label 
                          key={item.value}
                          className={`p-4 rounded-xl border text-xs font-semibold cursor-pointer flex items-center justify-between transition-colors ${
                            bookingData.serviceId === item.value 
                              ? 'border-brand-coral bg-brand-coral/5 text-brand-dark' 
                              : 'border-neutral-200 hover:bg-neutral-50 text-brand-muted'
                          }`}
                        >
                          <span>{item.label}</span>
                          <input 
                            type="radio" 
                            name="serviceId" 
                            value={item.value} 
                            checked={bookingData.serviceId === item.value}
                            onChange={(e) => setBookingData({ ...bookingData, serviceId: e.target.value })}
                            className="text-brand-coral focus:ring-brand-coral shrink-0"
                            required
                          />
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: DATE & TIME */}
                {bookingStep === 2 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4 flex-grow">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-brand-dark text-sm mb-1">Pick a convenient target day &amp; time slot</h4>
                    </div>
                    
                    {/* Cal.com Direct Booking Link */}
                    <div className="p-3 bg-brand-blue/5 border border-brand-blue/20 rounded-xl flex items-center justify-between gap-2">
                      <div className="text-left">
                        <span className="text-xs font-bold text-brand-dark block">Or Book Live via Cal.com</span>
                        <span className="text-[10px] text-brand-muted">Open live calendar view in popup</span>
                      </div>
                      <button
                        type="button"
                        data-cal-link="balancecare-health-services-u53h5o/appointment-request-portal"
                        data-cal-namespace="appointment-request-portal"
                        data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                        className="px-3 py-1.5 bg-brand-dark hover:bg-black text-white text-[11px] font-bold rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3 text-brand-coral" />
                        <span>Open Cal.com</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-dark mb-1">Target Consultation Date</label>
                        <input 
                          type="date" 
                          required
                          value={bookingData.date}
                          onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                          className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-coral"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-dark mb-2">Available Time Windows</label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            '09:00 AM - 10:00 AM',
                            '11:30 AM - 12:30 PM',
                            '02:00 PM - 03:00 PM',
                            '04:15 PM - 05:15 PM'
                          ].map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setBookingData({ ...bookingData, timeSlot: time })}
                              className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                                bookingData.timeSlot === time 
                                  ? 'bg-brand-dark text-white border-brand-dark' 
                                  : 'border-neutral-200 hover:bg-neutral-50 text-brand-muted bg-white'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: PERSONAL DATA */}
                {bookingStep === 3 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4 flex-grow">
                    <h4 className="font-bold text-brand-dark text-sm mb-1">Complete your registration secure record</h4>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-brand-dark mb-1">First Name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="John"
                          value={bookingData.firstName}
                          onChange={(e) => setBookingData({ ...bookingData, firstName: e.target.value })}
                          className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-coral"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-brand-dark mb-1">Last Name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Doe"
                          value={bookingData.lastName}
                          onChange={(e) => setBookingData({ ...bookingData, lastName: e.target.value })}
                          className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-coral"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-brand-dark mb-1">Email Address</label>
                        <input 
                          type="email" 
                          required
                          placeholder="john.doe@example.com"
                          value={bookingData.email}
                          onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                          className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-coral"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-brand-dark mb-1">Phone Number</label>
                        <input 
                          type="tel" 
                          required
                          placeholder="(410) 555-1234"
                          value={bookingData.phone}
                          onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                          className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-coral"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-brand-dark mb-1">Coping Goals or Private Notes (Optional)</label>
                        <textarea 
                          rows={2}
                          placeholder="Tell us a little bit about what you are currently managing..."
                          value={bookingData.notes}
                          onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                          className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-coral resize-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: SUCCESS BLOCK */}
                {bookingStep === 4 && bookingSuccessData && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="space-y-6 text-center py-6 flex-grow flex flex-col justify-center items-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <div>
                      <h4 className="text-xl font-extrabold text-brand-dark">Consultation Reserved!</h4>
                      <p className="text-xs text-brand-muted mt-1 leading-relaxed max-w-sm">
                        Thank you, {bookingData.firstName}! A BalanceCare intake advisor will text or call you at <strong>{bookingData.phone}</strong> to finalize details.
                      </p>
                    </div>

                    <div className="bg-brand-bg rounded-2xl border border-neutral-200 p-5 text-left text-xs space-y-2.5 w-full max-w-xs">
                      <div className="flex justify-between border-b border-neutral-200/60 pb-2">
                        <span className="text-brand-muted">Booking Ticket:</span>
                        <span className="font-bold text-brand-dark font-mono">{bookingSuccessData.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-muted">Assigned Care:</span>
                        <span className="font-bold text-brand-dark">{bookingData.serviceId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-muted">Advisor:</span>
                        <span className="font-bold text-brand-dark">
                          {selectedExpertObj ? selectedExpertObj.name : 'Intake Specialist'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-muted">Target Schedule:</span>
                        <span className="font-bold text-brand-dark">{bookingData.date} ({bookingData.timeSlot.split(' ')[0]})</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Footer Buttons for Wizard navigation */}
                <div className="pt-6 mt-6 border-t border-neutral-100 flex gap-3 shrink-0">
                  {bookingStep > 1 && bookingStep < 4 && (
                    <button 
                      type="button" 
                      onClick={() => setBookingStep(bookingStep - 1)}
                      className="flex-1 py-3 px-4 border border-neutral-200 text-brand-dark font-bold text-xs rounded-xl hover:bg-neutral-50 transition-colors"
                    >
                      Back
                    </button>
                  )}
                  
                  {bookingStep < 3 ? (
                    <button 
                      type="button" 
                      disabled={
                        (bookingStep === 1 && !bookingData.serviceId) ||
                        (bookingStep === 2 && (!bookingData.date || !bookingData.timeSlot))
                      }
                      onClick={() => setBookingStep(bookingStep + 1)}
                      className={`flex-1 py-3 px-4 text-white font-bold text-xs rounded-xl transition-all ${
                        ((bookingStep === 1 && !bookingData.serviceId) || (bookingStep === 2 && (!bookingData.date || !bookingData.timeSlot)))
                          ? 'bg-neutral-300 cursor-not-allowed'
                          : 'bg-gradient-to-r from-brand-green to-brand-blue hover:from-brand-greenHover hover:to-brand-blueHover shadow-sm'
                      }`}
                    >
                      Continue
                    </button>
                  ) : bookingStep === 3 ? (
                    <button 
                      type="submit"
                      className="flex-1 py-3 px-4 bg-brand-dark hover:bg-black text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
                    >
                      Reserve Consultation
                    </button>
                  ) : (
                    <button 
                      type="button" 
                      onClick={closeAppointmentModal}
                      className="w-full py-3 px-4 bg-gradient-to-r from-brand-green to-brand-blue hover:from-brand-greenHover hover:to-brand-blueHover text-white font-bold text-xs rounded-xl transition-colors"
                    >
                      Finish
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 3: SECURE REFERRAL SYSTEM */}
      <AnimatePresence>
        {activeModal === 'referrals' && (
          <div className="fixed inset-0 bg-brand-dark/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-float relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setActiveModal('none')}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 text-brand-dark transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-brand-coral" />
                <span className="text-xs font-bold uppercase tracking-wider text-brand-coral">Clinician Referral Network</span>
              </div>
              <h3 className="text-2xl font-extrabold text-brand-dark mb-4">Patient Referral Program</h3>
              
              {!referralSuccessData ? (
                <form onSubmit={handleReferralSubmit} className="space-y-4">
                  <p className="text-xs text-brand-muted leading-relaxed mb-4">
                    Send patient referrals directly to our certified intake coordinators. All data is protected and evaluated strictly within standard clinical privacy codes.
                  </p>
                  
                  <div className="p-4 bg-brand-bg rounded-2xl border border-neutral-200/50 space-y-3">
                    <span className="text-[10px] font-bold text-brand-dark uppercase tracking-wider block border-b border-neutral-200/60 pb-1">
                      Referrer Details (You)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <input 
                        type="text" 
                        required
                        placeholder="Your Name / Practice" 
                        value={referralData.referrerName}
                        onChange={(e) => setReferralData({ ...referralData, referrerName: e.target.value })}
                        className="p-3 bg-white border border-neutral-200 rounded-xl text-xs text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-coral"
                      />
                      <input 
                        type="text" 
                        required
                        placeholder="Your Phone / Email" 
                        value={referralData.referrerContact}
                        onChange={(e) => setReferralData({ ...referralData, referrerContact: e.target.value })}
                        className="p-3 bg-white border border-neutral-200 rounded-xl text-xs text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-coral"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-brand-bg rounded-2xl border border-neutral-200/50 space-y-3">
                    <span className="text-[10px] font-bold text-brand-dark uppercase tracking-wider block border-b border-neutral-200/60 pb-1">
                      Patient Details (Person in Need)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <input 
                        type="text" 
                        required
                        placeholder="Patient Full Name" 
                        value={referralData.patientName}
                        onChange={(e) => setReferralData({ ...referralData, patientName: e.target.value })}
                        className="p-3 bg-white border border-neutral-200 rounded-xl text-xs text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-coral"
                      />
                      <input 
                        type="text" 
                        required
                        placeholder="Patient Phone / Contact" 
                        value={referralData.patientContact}
                        onChange={(e) => setReferralData({ ...referralData, patientContact: e.target.value })}
                        className="p-3 bg-white border border-neutral-200 rounded-xl text-xs text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-coral"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-2.5">
                      <select
                        required
                        value={referralData.serviceNeeded}
                        onChange={(e) => setReferralData({ ...referralData, serviceNeeded: e.target.value })}
                        className="p-3 bg-white border border-neutral-200 rounded-xl text-xs text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-coral"
                      >
                        <option value="">Select service required...</option>
                        <option value="Depression Care">Depression Care Pathways</option>
                        <option value="Anxiety Treatment">Anxiety Treatment Regulation</option>
                        <option value="EMDR / Trauma">EMDR / Trauma Program</option>
                        <option value="Youth Support">Youth &amp; Adolescent Counseling</option>
                        <option value="Senior Consult">Senior Transitions Counsel</option>
                      </select>
                      <textarea 
                        rows={2}
                        placeholder="Coordination clinical notes or specific requests..."
                        value={referralData.notes}
                        onChange={(e) => setReferralData({ ...referralData, notes: e.target.value })}
                        className="p-3 bg-white border border-neutral-200 rounded-xl text-xs text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-coral resize-none"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-brand-green to-brand-blue hover:from-brand-greenHover hover:to-brand-blueHover text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-colors shadow-sm shadow-brand-blue/15"
                  >
                    Submit Secure Referral
                  </button>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="space-y-6 text-center py-6"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600 mb-2">
                    <Check className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-extrabold text-brand-dark">Referral Securely Lodged!</h4>
                    <p className="text-xs text-brand-muted mt-1 leading-relaxed max-w-sm mx-auto">
                      Intake coordinators have received your referral for <strong>{referralData.patientName}</strong>. A case ticket <strong>{referralSuccessData.ticket}</strong> has been produced for internal records.
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveModal('none')}
                    className="w-full bg-brand-dark hover:bg-black text-white font-bold py-3 px-6 rounded-xl text-xs transition-colors"
                  >
                    Return to Professionals Portal
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
