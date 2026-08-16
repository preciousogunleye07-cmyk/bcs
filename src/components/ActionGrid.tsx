import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Calendar, ArrowRight, X, Sparkles, Check, CheckCircle2, User, Phone, Mail, Award, Clock, Download, ExternalLink, AlertTriangle, Lock, Loader2 } from 'lucide-react';
import { Expert, AppointmentBooking, ReferralSubmission } from '../types';
import { getGoogleCalendarUrl, downloadIcsFile } from '../lib/googleCalendar';
import { saveAppointmentToSupabase, saveReferralToSupabase, isSupabaseConfigured, fetchBookedSlotsForDate, checkSlotAvailability, isDateAdministrativelyBlocked, ALL_STANDARD_TIME_SLOTS } from '../lib/supabase';

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

  // Slot restriction and live availability states
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState<boolean>(false);
  const [slotConflictError, setSlotConflictError] = useState<string | null>(null);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState<boolean>(false);

  // Google Calendar integration state
  const [syncingCalendar, setSyncingCalendar] = useState(false);
  const [calendarSyncSuccess, setCalendarSyncSuccess] = useState(false);
  const [calendarSyncError, setCalendarSyncError] = useState<string | null>(null);

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

  // Load booked slots from Supabase whenever date changes
  useEffect(() => {
    let isCurrent = true;
    if (!bookingData.date) {
      setBookedSlots([]);
      setIsLoadingSlots(false);
      return;
    }

    // Check if the date is administratively blocked
    const blockCheck = isDateAdministrativelyBlocked(bookingData.date);
    if (blockCheck.blocked) {
      setBookedSlots([...ALL_STANDARD_TIME_SLOTS]);
      setIsLoadingSlots(false);
      setBookingData(prev => ({ ...prev, timeSlot: '' }));
      setSlotConflictError(blockCheck.reason || 'This date is administratively blocked. Please choose another date.');
      return;
    }

    setIsLoadingSlots(true);
    setSlotConflictError(null);

    fetchBookedSlotsForDate(bookingData.date).then((slots) => {
      if (isCurrent) {
        setBookedSlots(slots);
        setIsLoadingSlots(false);
        // If current selected timeSlot is already booked, clear it
        if (bookingData.timeSlot && slots.some(s => s.trim().toLowerCase() === bookingData.timeSlot.trim().toLowerCase())) {
          setBookingData(prev => ({ ...prev, timeSlot: '' }));
          setSlotConflictError(`The time slot "${bookingData.timeSlot}" on this date has already been booked by another client in our database. Please select another time window.`);
        }
      }
    }).catch(() => {
      if (isCurrent) {
        setIsLoadingSlots(false);
      }
    });

    return () => {
      isCurrent = false;
    };
  }, [bookingData.date]);

  const handleOpenAppointment = () => {
    setBookingStep(1);
    setBookingSuccessData(null);
    setCalendarSyncSuccess(false);
    setCalendarSyncError(null);
    setSlotConflictError(null);
    setSyncingCalendar(false);
    setBookedSlots([]);
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

  const handleAdvanceStep = async () => {
    if (bookingStep === 2) {
      if (!bookingData.date || !bookingData.timeSlot) return;

      setIsLoadingSlots(true);
      setSlotConflictError(null);

      const check = await checkSlotAvailability(bookingData.date, bookingData.timeSlot);
      setIsLoadingSlots(false);

      if (!check.available) {
        setSlotConflictError(check.reason || 'This slot is no longer available. Please select another time slot.');
        // Refresh booked slots list
        const updated = await fetchBookedSlotsForDate(bookingData.date);
        setBookedSlots(updated);
        setBookingData(prev => ({ ...prev, timeSlot: '' }));
        return;
      }
    }

    setBookingStep(prev => prev + 1);
  };

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSlotConflictError(null);
    setIsSubmittingBooking(true);

    const randomId = 'BC-' + Math.floor(Math.random() * 900000 + 100000);

    // Persist appointment to Supabase with duplicate slot restriction
    const result = await saveAppointmentToSupabase({
      ticketId: randomId,
      firstName: bookingData.firstName,
      lastName: bookingData.lastName,
      email: bookingData.email,
      phone: bookingData.phone,
      expertId: bookingData.expertId,
      serviceId: bookingData.serviceId,
      date: bookingData.date,
      timeSlot: bookingData.timeSlot,
      notes: bookingData.notes,
      status: 'confirmed'
    });

    setIsSubmittingBooking(false);

    if (!result.success) {
      setSlotConflictError(result.error || 'Failed to reserve appointment because this slot is taken.');
      setBookingStep(2); // Send back to step 2 to choose another time
      const updated = await fetchBookedSlotsForDate(bookingData.date);
      setBookedSlots(updated);
      setBookingData(prev => ({ ...prev, timeSlot: '' }));
      return;
    }

    setBookingSuccessData({ id: randomId });
    setBookingStep(4);
  };

  const handleOpenGoogleCalendar = () => {
    const expertName = selectedExpertObj ? selectedExpertObj.name : 'Intake Specialist';
    const eventDetails = {
      summary: `BalanceCare Health Consultation: ${bookingData.serviceId}`,
      description: `Wellness consultation with BalanceCare specialist: ${expertName}.\nProgram: ${bookingData.serviceId}\nNotes: ${bookingData.notes || 'No notes provided.'}\nAssigned Care Advisor: ${expertName}\nDirect Helpline: 410-977-2847`,
      date: bookingData.date,
      timeSlot: bookingData.timeSlot,
      expertName,
      location: 'BalanceCare Health & Wellness Hub (Columbia, MD / Washington, DC)'
    };

    const url = getGoogleCalendarUrl(eventDetails);
    window.open(url, '_blank', 'noopener,noreferrer');
    setCalendarSyncSuccess(true);
  };

  const handleDownloadIcs = () => {
    const expertName = selectedExpertObj ? selectedExpertObj.name : 'Intake Specialist';
    const eventDetails = {
      summary: `BalanceCare Health Consultation: ${bookingData.serviceId}`,
      description: `Wellness consultation with BalanceCare specialist: ${expertName}.\nProgram: ${bookingData.serviceId}\nNotes: ${bookingData.notes || 'No notes provided.'}\nAssigned Care Advisor: ${expertName}\nDirect Helpline: 410-977-2847`,
      date: bookingData.date,
      timeSlot: bookingData.timeSlot,
      expertName,
      location: 'BalanceCare Health & Wellness Hub (Columbia, MD / Washington, DC)'
    };

    downloadIcsFile(eventDetails);
    setCalendarSyncSuccess(true);
  };

  const handleReferralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const randomTicket = 'REF-' + Math.floor(Math.random() * 90000 + 10000);
    setReferralSuccessData({ ticket: randomTicket });

    // Persist referral to Supabase
    await saveReferralToSupabase({
      ticket: randomTicket,
      referrerName: referralData.referrerName,
      referrerContact: referralData.referrerContact,
      patientName: referralData.patientName,
      patientContact: referralData.patientContact,
      serviceNeeded: referralData.serviceNeeded,
      notes: referralData.notes
    });
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
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-coral block mb-1">
                  Secure Consultation System
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold">Schedule an Appointment</h3>
                
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
                    <div>
                      <h4 className="font-bold text-brand-dark text-sm mb-0.5">Pick a convenient target day &amp; time slot</h4>
                      <p className="text-xs text-brand-muted">Each time slot can only be reserved by one client. Confirmed slots are automatically locked.</p>
                    </div>

                    {slotConflictError && (
                      <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">Time Slot Unavailable:</span> {slotConflictError}
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-dark">Target Consultation Date</label>
                          {bookingData.date && (
                            <span className="text-[11px] font-semibold text-brand-muted">
                              {isLoadingSlots ? (
                                <span className="inline-flex items-center gap-1 text-brand-coral">
                                  <Loader2 className="w-3 h-3 animate-spin" /> Checking live slot availability...
                                </span>
                              ) : isDateAdministrativelyBlocked(bookingData.date).blocked ? (
                                <span className="inline-flex items-center gap-1 text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                                  <Lock className="w-3 h-3 text-rose-600" /> Date Blocked (0 slots available)
                                </span>
                              ) : bookedSlots.length >= ALL_STANDARD_TIME_SLOTS.length ? (
                                <span className="inline-flex items-center gap-1 text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                                  <Lock className="w-3 h-3" /> Fully Booked (0 slots available)
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                  <Sparkles className="w-3 h-3 text-emerald-500" /> {ALL_STANDARD_TIME_SLOTS.length - bookedSlots.length} of {ALL_STANDARD_TIME_SLOTS.length} slots available
                                </span>
                              )}
                            </span>
                          )}
                        </div>
                        <input 
                          type="date" 
                          required
                          min={new Date().toISOString().split('T')[0]}
                          value={bookingData.date}
                          onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                          className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-coral"
                        />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-dark">Available Time Windows</label>
                          {bookingData.date && !isLoadingSlots && !isDateAdministrativelyBlocked(bookingData.date).blocked && bookedSlots.length < ALL_STANDARD_TIME_SLOTS.length && (
                            <span className="text-[10px] text-brand-muted font-medium">
                              Open: <strong className="text-emerald-700">{ALL_STANDARD_TIME_SLOTS.filter(t => !bookedSlots.some(b => b.trim().toLowerCase() === t.trim().toLowerCase())).join(' | ')}</strong>
                            </span>
                          )}
                        </div>
                        
                        {!bookingData.date ? (
                          <div className="p-4 rounded-xl border border-dashed border-neutral-200 bg-neutral-50 text-center text-xs text-brand-muted">
                            Please select a consultation date above to view open time slots.
                          </div>
                        ) : isDateAdministrativelyBlocked(bookingData.date).blocked ? (
                          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50 text-center text-xs text-rose-900 space-y-1.5">
                            <p className="font-bold flex items-center justify-center gap-1 text-rose-800">
                              <Lock className="w-4 h-4 text-rose-600" /> 
                              {isDateAdministrativelyBlocked(bookingData.date).reason || 'This date is administratively blocked.'}
                            </p>
                            <p className="text-[11px] text-rose-700">No appointments can be reserved on this date. Please pick an alternative open date on the calendar above.</p>
                          </div>
                        ) : bookedSlots.length >= ALL_STANDARD_TIME_SLOTS.length ? (
                          <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-center text-xs text-red-800 space-y-1">
                            <p className="font-bold">⚠️ All consultation slots for this date are fully reserved in our database.</p>
                            <p className="text-[11px] text-red-700">Please choose another date on the calendar above to find open availability.</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                              {ALL_STANDARD_TIME_SLOTS.map((time) => {
                                const isTaken = bookedSlots.some(s => s.trim().toLowerCase() === time.trim().toLowerCase());
                                const isSelected = bookingData.timeSlot === time;

                                return (
                                  <button
                                    key={time}
                                    type="button"
                                    disabled={isTaken}
                                    onClick={() => {
                                      if (!isTaken) {
                                        setSlotConflictError(null);
                                        setBookingData({ ...bookingData, timeSlot: time });
                                      }
                                    }}
                                    className={`p-3 rounded-xl border text-xs font-semibold transition-all relative text-left flex items-center justify-between ${
                                      isTaken
                                        ? 'bg-neutral-100/90 text-neutral-400 border-neutral-200 cursor-not-allowed opacity-60'
                                        : isSelected 
                                          ? 'bg-brand-dark text-white border-brand-dark shadow-sm ring-2 ring-brand-coral/30' 
                                          : 'border-emerald-200/80 hover:bg-emerald-50/50 text-brand-dark bg-white hover:border-emerald-300'
                                    }`}
                                  >
                                    <div className="flex flex-col">
                                      <span className={isTaken ? 'line-through text-neutral-400' : 'font-bold'}>{time}</span>
                                      <span className={`text-[9px] font-medium ${isTaken ? 'text-rose-600 font-semibold' : isSelected ? 'text-brand-coral' : 'text-emerald-600'}`}>
                                        {isTaken ? 'Taken (Reserved in DB)' : 'Available for booking'}
                                      </span>
                                    </div>
                                    {isTaken ? (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-neutral-200 text-neutral-700 px-1.5 py-0.5 rounded shrink-0 border border-neutral-300">
                                        <Lock className="w-2.5 h-2.5 text-neutral-600" /> Taken
                                      </span>
                                    ) : isSelected ? (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-white text-brand-dark px-1.5 py-0.5 rounded shrink-0 shadow-xs">
                                        <Check className="w-3 h-3 text-brand-coral" /> Selected
                                      </span>
                                    ) : (
                                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">
                                        Open
                                      </span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
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

                    {/* Calendar Sync Card */}
                    <div className="w-full max-w-xs bg-brand-bg rounded-2xl border border-neutral-200 p-5 text-left text-xs space-y-3.5">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-brand-coral" />
                        <span className="font-bold text-brand-dark">Add to Personal Calendar</span>
                      </div>
                      
                      <p className="text-[11px] text-brand-muted leading-relaxed">
                        Add this appointment to your Google, Apple, or Outlook calendar to receive reminders across your devices.
                      </p>

                      <div className="space-y-2">
                        <button
                          type="button"
                          onClick={handleOpenGoogleCalendar}
                          className="w-full py-2.5 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-[11px] cursor-pointer bg-white border border-neutral-200 text-brand-dark hover:bg-neutral-50 shadow-sm hover:border-neutral-300"
                        >
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                            <path
                              fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.62-.62-1.05-1.37-1.38-2.15z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                            />
                          </svg>
                          <span>Add to Google Calendar</span>
                          <ExternalLink className="w-3 h-3 ml-auto text-brand-muted" />
                        </button>

                        <button
                          type="button"
                          onClick={handleDownloadIcs}
                          className="w-full py-2.5 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-[11px] cursor-pointer bg-white border border-neutral-200 text-brand-dark hover:bg-neutral-50 shadow-sm hover:border-neutral-300"
                        >
                          <Download className="w-3.5 h-3.5 text-brand-blue" />
                          <span>Download .ics (Apple / Outlook)</span>
                        </button>
                      </div>

                      {calendarSyncSuccess && (
                        <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl">
                          <Check className="w-4 h-4 shrink-0" />
                          <span className="font-bold text-[11px]">Calendar event generated!</span>
                        </div>
                      )}
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
                        (bookingStep === 2 && (!bookingData.date || !bookingData.timeSlot || isLoadingSlots))
                      }
                      onClick={handleAdvanceStep}
                      className={`flex-1 py-3 px-4 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                        ((bookingStep === 1 && !bookingData.serviceId) || (bookingStep === 2 && (!bookingData.date || !bookingData.timeSlot || isLoadingSlots)))
                          ? 'bg-neutral-300 cursor-not-allowed'
                          : 'bg-gradient-to-r from-brand-green to-brand-blue hover:from-brand-greenHover hover:to-brand-blueHover shadow-sm'
                      }`}
                    >
                      {isLoadingSlots ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Checking...</span>
                        </>
                      ) : (
                        <span>Continue</span>
                      )}
                    </button>
                  ) : bookingStep === 3 ? (
                    <button 
                      type="submit"
                      disabled={isSubmittingBooking}
                      className={`flex-1 py-3 px-4 text-white font-bold text-xs rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5 ${
                        isSubmittingBooking 
                          ? 'bg-neutral-400 cursor-not-allowed' 
                          : 'bg-brand-dark hover:bg-black'
                      }`}
                    >
                      {isSubmittingBooking ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Securing Reservation...</span>
                        </>
                      ) : (
                        <span>Reserve Consultation</span>
                      )}
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
