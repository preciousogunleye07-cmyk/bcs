import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Check, Sparkles, User, Calendar, CreditCard, MapPin, 
  Clock, Heart, ShieldCheck, Mail, Phone, FileText, ChevronRight,
  ChevronLeft, AlertCircle, ArrowRight, ClipboardCheck
} from 'lucide-react';

interface AppointmentRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormTab = 'new-client' | 'returning-client';

export default function AppointmentRequestForm({ isOpen, onClose }: AppointmentRequestFormProps) {
  const [activeTab, setActiveTab] = useState<FormTab>('new-client');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formTypeSubmitted, setFormTypeSubmitted] = useState<FormTab>('new-client');
  const [requestNumber, setRequestNumber] = useState('');

  // 1. New Client Form State
  const [newClientData, setNewClientData] = useState({
    // Client Info
    fullName: '',
    dob: '',
    age: '',
    gender: '',
    parentGuardian: '',
    relationshipToClient: '',
    phone: '',
    email: '',
    homeAddress: '',
    
    // Reason for Seeking Services
    reasons: [] as string[],
    otherReason: '',
    concernsDescription: '',

    // Payment Info
    paymentMethod: 'Insurance', // Insurance | Self-Pay
    insuranceCompany: '',
    memberId: '',
    groupNumber: '',
    policyHolder: '',
    policyHolderDob: '',
    relationshipToPolicyHolder: '',
    selfPayAcknowledge: false,

    // Preferred Appointment
    location: '', // Columbia, MD | Washington, DC | Virtual
    preferredDays: [] as string[], // Mon, Tue, Wed, Thu, Fri
    preferredTimes: [] as string[], // Morning, Afternoon, Evening
    preferredDate: '',

    // Consent
    consentUnderstand: false
  });

  // 2. Returning Client Form State
  const [returningClientData, setReturningClientData] = useState({
    // Client Info
    fullName: '',
    dob: '',
    phone: '',
    email: '',

    // Appointment Info
    providerName: '',
    lastAppointmentDate: '',

    // Payment Info
    paymentChanges: 'No Changes', // No Changes | Insurance Updated | Switching to Self-Pay | Switching to Insurance
    insuranceCompany: '',
    memberId: '',
    groupNumber: '',
    policyHolder: '',

    // Reason for Follow-Up
    reasons: [] as string[],
    otherReason: '',

    // Appointment Preference
    location: '', // Columbia, MD | Washington, DC | Virtual
    preferredDays: [] as string[], // Mon, Tue, Wed, Thu, Fri
    preferredTimes: [] as string[], // Morning, Afternoon, Evening
    preferredDate: '',

    // Changes Since Last Appt
    changes: [] as string[], // Address, Phone, Email, Insurance, New Medication, Hospitalization, ER Visit, No Changes
    changesExplanation: '',

    // Current Concerns
    currentConcerns: '',

    // Reminder Preference
    reminderMethod: '', // Text Message | Phone Call | Email

    // Consent
    consentUnderstand: false
  });

  // Form step indicators (if we want step wizard, but since the form is a standard paper structure, we can segment it into logical scrollable sections with tabs, giving a clean and high-fidelity form feel)
  
  const handleNewClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientData.consentUnderstand) {
      return;
    }
    const num = 'BC-INT-' + Math.floor(Math.random() * 90000 + 10000);
    setRequestNumber(num);
    setFormTypeSubmitted('new-client');
    setIsSubmitted(true);
  };

  const handleReturningClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!returningClientData.consentUnderstand) {
      return;
    }
    const num = 'BC-RET-' + Math.floor(Math.random() * 90000 + 10000);
    setRequestNumber(num);
    setFormTypeSubmitted('returning-client');
    setIsSubmitted(true);
  };

  const toggleReasonNewClient = (reason: string) => {
    const current = [...newClientData.reasons];
    if (current.includes(reason)) {
      setNewClientData({ ...newClientData, reasons: current.filter(r => r !== reason) });
    } else {
      setNewClientData({ ...newClientData, reasons: [...current, reason] });
    }
  };

  const toggleDayNewClient = (day: string) => {
    const current = [...newClientData.preferredDays];
    if (current.includes(day)) {
      setNewClientData({ ...newClientData, preferredDays: current.filter(d => d !== day) });
    } else {
      setNewClientData({ ...newClientData, preferredDays: [...current, day] });
    }
  };

  const toggleTimeNewClient = (time: string) => {
    const current = [...newClientData.preferredTimes];
    if (current.includes(time)) {
      setNewClientData({ ...newClientData, preferredTimes: current.filter(t => t !== time) });
    } else {
      setNewClientData({ ...newClientData, preferredTimes: [...current, time] });
    }
  };

  // Returning Client helpers
  const toggleReasonReturningClient = (reason: string) => {
    const current = [...returningClientData.reasons];
    if (current.includes(reason)) {
      setReturningClientData({ ...returningClientData, reasons: current.filter(r => r !== reason) });
    } else {
      setReturningClientData({ ...returningClientData, reasons: [...current, reason] });
    }
  };

  const toggleDayReturningClient = (day: string) => {
    const current = [...returningClientData.preferredDays];
    if (current.includes(day)) {
      setReturningClientData({ ...returningClientData, preferredDays: current.filter(d => d !== day) });
    } else {
      setReturningClientData({ ...returningClientData, preferredDays: [...current, day] });
    }
  };

  const toggleTimeReturningClient = (time: string) => {
    const current = [...returningClientData.preferredTimes];
    if (current.includes(time)) {
      setReturningClientData({ ...returningClientData, preferredTimes: current.filter(t => t !== time) });
    } else {
      setReturningClientData({ ...returningClientData, preferredTimes: [...current, time] });
    }
  };

  const toggleChangeReturningClient = (change: string) => {
    const current = [...returningClientData.changes];
    if (current.includes(change)) {
      setReturningClientData({ ...returningClientData, changes: current.filter(c => c !== change) });
    } else {
      setReturningClientData({ ...returningClientData, changes: [...current, change] });
    }
  };

  const resetForms = () => {
    setIsSubmitted(false);
    setNewClientData({
      fullName: '',
      dob: '',
      age: '',
      gender: '',
      parentGuardian: '',
      relationshipToClient: '',
      phone: '',
      email: '',
      homeAddress: '',
      reasons: [],
      otherReason: '',
      concernsDescription: '',
      paymentMethod: 'Insurance',
      insuranceCompany: '',
      memberId: '',
      groupNumber: '',
      policyHolder: '',
      policyHolderDob: '',
      relationshipToPolicyHolder: '',
      selfPayAcknowledge: false,
      location: '',
      preferredDays: [],
      preferredTimes: [],
      preferredDate: '',
      consentUnderstand: false
    });
    setReturningClientData({
      fullName: '',
      dob: '',
      phone: '',
      email: '',
      providerName: '',
      lastAppointmentDate: '',
      paymentChanges: 'No Changes',
      insuranceCompany: '',
      memberId: '',
      groupNumber: '',
      policyHolder: '',
      reasons: [],
      otherReason: '',
      location: '',
      preferredDays: [],
      preferredTimes: [],
      preferredDate: '',
      changes: [],
      changesExplanation: '',
      currentConcerns: '',
      reminderMethod: '',
      consentUnderstand: false
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-dark/70 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        className="bg-white rounded-2xl sm:rounded-[2.5rem] max-w-4xl w-full overflow-hidden shadow-float relative max-h-[96vh] sm:max-h-[90vh] flex flex-col border border-neutral-100"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 p-1.5 sm:p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-brand-dark transition-all z-10 cursor-pointer"
          aria-label="Close request form"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-brand-dark text-white p-4 sm:p-8 shrink-0 relative overflow-hidden">
          {/* Subtle patterns */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-brand-blue/10 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-brand-green/5 blur-2xl pointer-events-none"></div>

          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-coral block mb-1">
            Care Intake Office
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">Appointment Request Portal</h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-1 max-w-xl hidden sm:block">
            Please fill out our official clinic form. Our administrative staff will review your request and reach out to confirm details.
          </p>

          {/* Toggle Tabs */}
          {!isSubmitted && (
            <div className="flex bg-white/10 p-1 rounded-full mt-3 sm:mt-6 max-w-md border border-white/5">
              <button
                type="button"
                onClick={() => setActiveTab('new-client')}
                className={`flex-1 py-1.5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'new-client' 
                    ? 'bg-white text-brand-dark shadow-sm' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                New Client Intake Form
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('returning-client')}
                className={`flex-1 py-1.5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'returning-client' 
                    ? 'bg-white text-brand-dark shadow-sm' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Returning Client Form
              </button>
            </div>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-3 sm:p-8 overflow-y-auto flex-grow bg-brand-bg/50">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div 
                key="success-state"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-10 px-4 max-w-xl mx-auto space-y-6"
              >
                <div className="w-20 h-20 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto text-brand-green border border-brand-green/20">
                  <ClipboardCheck className="w-10 h-10 animate-bounce" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-brand-dark">Request Form Received</h3>
                  <p className="text-brand-muted text-sm font-semibold">
                    Thank you for submitting your Appointment Request Form.
                  </p>
                  <div className="inline-block bg-brand-dark text-white px-4 py-2 rounded-xl text-xs font-mono font-bold mt-2">
                    Request Ticket: {requestNumber}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-neutral-200/60 shadow-sm text-left space-y-3.5">
                  <h4 className="text-xs font-bold text-brand-coral uppercase tracking-wider border-b border-neutral-100 pb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-brand-green" /> Submission Highlights
                  </h4>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
                    <div>
                      <span className="text-gray-400 block font-bold text-[10px] uppercase">Client Name</span>
                      <span className="text-brand-dark font-extrabold">
                        {formTypeSubmitted === 'new-client' ? newClientData.fullName : returningClientData.fullName}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-bold text-[10px] uppercase">Client Status</span>
                      <span className="text-brand-dark font-extrabold capitalize">
                        {formTypeSubmitted === 'new-client' ? 'New Client' : 'Returning Client'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-bold text-[10px] uppercase">Date of Birth</span>
                      <span className="text-brand-dark font-medium">
                        {formTypeSubmitted === 'new-client' ? newClientData.dob : returningClientData.dob}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-bold text-[10px] uppercase">Preferred Date</span>
                      <span className="text-brand-dark font-medium">
                        {formTypeSubmitted === 'new-client' ? newClientData.preferredDate || 'Any Available' : returningClientData.preferredDate || 'Any Available'}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-400 block font-bold text-[10px] uppercase">Preferred Location</span>
                      <span className="text-brand-dark font-extrabold">
                        {formTypeSubmitted === 'new-client' ? newClientData.location || 'Virtual / Hybrid' : returningClientData.location || 'Virtual / Hybrid'}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-brand-muted leading-relaxed">
                  Our care coordinators are currently matching your request with our provider calendars. An advisor will contact you shortly via <strong>phone</strong> or <strong>email</strong>. This submission represents a scheduling request and is finalized only upon confirmation from BCHS staff.
                </p>

                <div className="flex gap-3 justify-center pt-4">
                  <button
                    onClick={resetForms}
                    className="px-6 py-3 rounded-full border border-neutral-200 hover:bg-neutral-50 text-brand-muted text-xs font-bold transition-all cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 rounded-full bg-brand-dark hover:bg-black text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    Back to Website
                  </button>
                </div>
              </motion.div>
            ) : (
              <div key="form-container">
                {activeTab === 'new-client' ? (
                  /* NEW CLIENT INTAKE FORM */
                  <form onSubmit={handleNewClientSubmit} className="space-y-8">
                    
                    {/* SECTION 1: CLIENT INFORMATION */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-neutral-200/50 shadow-sm space-y-6 text-left">
                      <h3 className="text-lg font-bold text-brand-dark flex items-center gap-2 border-b border-neutral-100 pb-3">
                        <User className="w-5 h-5 text-brand-coral" />
                        1. Client Information
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                        <div className="md:col-span-6">
                          <label className="block text-xs font-bold text-brand-dark mb-1.5">Full Name <span className="text-brand-coral">*</span></label>
                          <input
                            type="text"
                            required
                            placeholder="First and Last name"
                            value={newClientData.fullName}
                            onChange={e => setNewClientData({ ...newClientData, fullName: e.target.value })}
                            className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none"
                          />
                        </div>

                        <div className="md:col-span-3">
                          <label className="block text-xs font-bold text-brand-dark mb-1.5">Date of Birth <span className="text-brand-coral">*</span></label>
                          <input
                            type="date"
                            required
                            value={newClientData.dob}
                            onChange={e => setNewClientData({ ...newClientData, dob: e.target.value })}
                            className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none text-brand-muted"
                          />
                        </div>

                        <div className="md:col-span-3">
                          <label className="block text-xs font-bold text-brand-dark mb-1.5">Age</label>
                          <input
                            type="number"
                            placeholder="e.g. 25"
                            value={newClientData.age}
                            onChange={e => setNewClientData({ ...newClientData, age: e.target.value })}
                            className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none"
                          />
                        </div>

                        <div className="md:col-span-4">
                          <label className="block text-xs font-bold text-brand-dark mb-1.5">Gender <span className="text-brand-coral">*</span></label>
                          <div className="flex gap-4 pt-1">
                            {['Male', 'Female', 'Other'].map(g => (
                              <label key={g} className="flex items-center gap-2 cursor-pointer text-xs text-brand-muted font-semibold">
                                <input
                                  type="radio"
                                  name="gender-new"
                                  value={g}
                                  required
                                  checked={newClientData.gender === g}
                                  onChange={e => setNewClientData({ ...newClientData, gender: e.target.value })}
                                  className="text-brand-coral focus:ring-brand-coral"
                                />
                                {g}
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="md:col-span-4">
                          <label className="block text-xs font-bold text-brand-dark mb-1.5">Parent/Guardian <span className="text-xs text-brand-muted font-medium">(under 18)</span></label>
                          <input
                            type="text"
                            placeholder="Guardian name"
                            value={newClientData.parentGuardian}
                            onChange={e => setNewClientData({ ...newClientData, parentGuardian: e.target.value })}
                            className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none"
                          />
                        </div>

                        <div className="md:col-span-4">
                          <label className="block text-xs font-bold text-brand-dark mb-1.5">Relationship to Client</label>
                          <input
                            type="text"
                            placeholder="e.g. Mother, Father"
                            value={newClientData.relationshipToClient}
                            onChange={e => setNewClientData({ ...newClientData, relationshipToClient: e.target.value })}
                            className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none"
                          />
                        </div>

                        <div className="md:col-span-6">
                          <label className="block text-xs font-bold text-brand-dark mb-1.5">Phone Number <span className="text-brand-coral">*</span></label>
                          <input
                            type="tel"
                            required
                            placeholder="e.g. 410-555-1234"
                            value={newClientData.phone}
                            onChange={e => setNewClientData({ ...newClientData, phone: e.target.value })}
                            className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none"
                          />
                        </div>

                        <div className="md:col-span-6">
                          <label className="block text-xs font-bold text-brand-dark mb-1.5">Email Address <span className="text-brand-coral">*</span></label>
                          <input
                            type="email"
                            required
                            placeholder="e.g. patient@example.com"
                            value={newClientData.email}
                            onChange={e => setNewClientData({ ...newClientData, email: e.target.value })}
                            className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none"
                          />
                        </div>

                        <div className="md:col-span-12">
                          <label className="block text-xs font-bold text-brand-dark mb-1.5">Home Address <span className="text-brand-coral">*</span></label>
                          <input
                            type="text"
                            required
                            placeholder="Street address, City, State, ZIP Code"
                            value={newClientData.homeAddress}
                            onChange={e => setNewClientData({ ...newClientData, homeAddress: e.target.value })}
                            className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: REASON FOR SEEKING SERVICES */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-neutral-200/50 shadow-sm space-y-6 text-left">
                      <h3 className="text-lg font-bold text-brand-dark flex items-center gap-2 border-b border-neutral-100 pb-3">
                        <Heart className="w-5 h-5 text-brand-coral" />
                        2. Reason for Seeking Services
                      </h3>
                      
                      <div>
                        <label className="block text-xs font-bold text-brand-dark mb-3">Select all clinical and support services you require:</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {[
                            'Anxiety', 'Depression', 'Mood Changes', 'Behavioral Concerns', 
                            'Medication Management', 'Individual Therapy', 'Family Therapy', 
                            'Home Healthcare Services', 'Skilled Nursing', 'Personal Care', 
                            'Companion Care', 'Medication Assistance'
                          ].map(reason => (
                            <button
                              type="button"
                              key={reason}
                              onClick={() => toggleReasonNewClient(reason)}
                              className={`p-3.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                                newClientData.reasons.includes(reason)
                                  ? 'bg-brand-coral/10 border-brand-coral text-brand-dark'
                                  : 'bg-white border-neutral-200 hover:bg-neutral-50 text-brand-muted'
                              }`}
                            >
                              <span>{reason}</span>
                              {newClientData.reasons.includes(reason) && (
                                <Check className="w-4 h-4 text-brand-coral shrink-0 ml-2" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-brand-dark mb-1.5">Other Reason</label>
                          <input
                            type="text"
                            placeholder="Please specify if any other requirements"
                            value={newClientData.otherReason}
                            onChange={e => setNewClientData({ ...newClientData, otherReason: e.target.value })}
                            className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-brand-dark mb-1.5">Briefly describe your concerns <span className="text-brand-coral">*</span></label>
                          <textarea
                            required
                            rows={3}
                            placeholder="Describe any psychiatric symptoms, physical health issues, or social support needs..."
                            value={newClientData.concernsDescription}
                            onChange={e => setNewClientData({ ...newClientData, concernsDescription: e.target.value })}
                            className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: PAYMENT INFORMATION */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-neutral-200/50 shadow-sm space-y-6 text-left">
                      <h3 className="text-lg font-bold text-brand-dark flex items-center gap-2 border-b border-neutral-100 pb-3">
                        <CreditCard className="w-5 h-5 text-brand-coral" />
                        3. Payment Information
                      </h3>
                      
                      <div>
                        <label className="block text-xs font-bold text-brand-dark mb-2">How will you pay for services? <span className="text-brand-coral">*</span></label>
                        <div className="flex gap-6">
                          {['Insurance', 'Self-Pay'].map(method => (
                            <label key={method} className="flex items-center gap-2 cursor-pointer text-xs font-extrabold text-brand-dark">
                              <input
                                type="radio"
                                name="paymentMethod-new"
                                value={method}
                                checked={newClientData.paymentMethod === method}
                                onChange={e => setNewClientData({ ...newClientData, paymentMethod: e.target.value })}
                                className="text-brand-coral focus:ring-brand-coral"
                              />
                              {method}
                            </label>
                          ))}
                        </div>
                      </div>

                      {newClientData.paymentMethod === 'Insurance' ? (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-neutral-100"
                        >
                          <div className="col-span-2">
                            <p className="text-[11px] text-brand-coral font-bold bg-brand-coral/5 px-3.5 py-2 rounded-lg mb-1">
                              Please fill out policy details exactly as listed on your card. We verify insurance credentials prior to appointments.
                            </p>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-brand-dark mb-1.5">Insurance Company <span className="text-brand-coral">*</span></label>
                            <input
                              type="text"
                              required={newClientData.paymentMethod === 'Insurance'}
                              placeholder="e.g. CareFirst, BlueCross, Medicaid"
                              value={newClientData.insuranceCompany}
                              onChange={e => setNewClientData({ ...newClientData, insuranceCompany: e.target.value })}
                              className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-brand-dark mb-1.5">Member ID <span className="text-brand-coral">*</span></label>
                            <input
                              type="text"
                              required={newClientData.paymentMethod === 'Insurance'}
                              placeholder="e.g. W123456789"
                              value={newClientData.memberId}
                              onChange={e => setNewClientData({ ...newClientData, memberId: e.target.value })}
                              className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-brand-dark mb-1.5">Group #</label>
                            <input
                              type="text"
                              placeholder="e.g. 54321"
                              value={newClientData.groupNumber}
                              onChange={e => setNewClientData({ ...newClientData, groupNumber: e.target.value })}
                              className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-brand-dark mb-1.5">Policy Holder Name <span className="text-brand-coral">*</span></label>
                            <input
                              type="text"
                              required={newClientData.paymentMethod === 'Insurance'}
                              placeholder="Name of primary insured"
                              value={newClientData.policyHolder}
                              onChange={e => setNewClientData({ ...newClientData, policyHolder: e.target.value })}
                              className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-brand-dark mb-1.5">Policy Holder DOB <span className="text-brand-coral">*</span></label>
                            <input
                              type="date"
                              required={newClientData.paymentMethod === 'Insurance'}
                              value={newClientData.policyHolderDob}
                              onChange={e => setNewClientData({ ...newClientData, policyHolderDob: e.target.value })}
                              className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none text-brand-muted"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-brand-dark mb-1.5">Relationship to Policy Holder <span className="text-brand-coral">*</span></label>
                            <select
                              required={newClientData.paymentMethod === 'Insurance'}
                              value={newClientData.relationshipToPolicyHolder}
                              onChange={e => setNewClientData({ ...newClientData, relationshipToPolicyHolder: e.target.value })}
                              className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none text-brand-muted"
                            >
                              <option value="">-- Select relationship --</option>
                              <option value="Self">Self</option>
                              <option value="Parent">Parent</option>
                              <option value="Spouse">Spouse</option>
                              <option value="Guardian">Guardian</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="pt-3 border-t border-neutral-100"
                        >
                          <label className="flex items-start gap-3 p-4 bg-brand-coral/5 border border-brand-coral/20 rounded-2xl cursor-pointer">
                            <input
                              type="checkbox"
                              required={newClientData.paymentMethod === 'Self-Pay'}
                              checked={newClientData.selfPayAcknowledge}
                              onChange={e => setNewClientData({ ...newClientData, selfPayAcknowledge: e.target.checked })}
                              className="text-brand-coral focus:ring-brand-coral shrink-0 mt-0.5"
                            />
                            <p className="text-xs text-brand-dark font-semibold leading-relaxed">
                              I understand and agree that I am a self-pay client, and I am responsible for payment in full at the time services are rendered by BalanceCare Health Services.
                            </p>
                          </label>
                        </motion.div>
                      )}
                    </div>

                    {/* SECTION 4: PREFERRED APPOINTMENT SETTINGS */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-neutral-200/50 shadow-sm space-y-6 text-left">
                      <h3 className="text-lg font-bold text-brand-dark flex items-center gap-2 border-b border-neutral-100 pb-3">
                        <MapPin className="w-5 h-5 text-brand-coral" />
                        4. Preferred Appointment
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-brand-dark mb-2.5">Clinic Location / Format <span className="text-brand-coral">*</span></label>
                          <div className="space-y-2">
                            {['Columbia, MD', 'Washington, DC', 'Virtual'].map(loc => (
                              <label key={loc} className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-brand-muted">
                                <input
                                  type="radio"
                                  name="location-new"
                                  value={loc}
                                  required
                                  checked={newClientData.location === loc}
                                  onChange={e => setNewClientData({ ...newClientData, location: e.target.value })}
                                  className="text-brand-coral focus:ring-brand-coral"
                                />
                                {loc}
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-brand-dark mb-2.5">Preferred Days <span className="text-brand-muted text-[10px] font-normal">(select multiple)</span></label>
                          <div className="grid grid-cols-2 gap-2">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                              <label key={day} className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-brand-muted">
                                <input
                                  type="checkbox"
                                  checked={newClientData.preferredDays.includes(day)}
                                  onChange={() => toggleDayNewClient(day)}
                                  className="text-brand-coral focus:ring-brand-coral rounded"
                                />
                                {day}
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-brand-dark mb-2.5">Preferred Time Window <span className="text-brand-muted text-[10px] font-normal">(select multiple)</span></label>
                          <div className="space-y-2">
                            {['Morning', 'Afternoon', 'Evening'].map(time => (
                              <label key={time} className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-brand-muted">
                                <input
                                  type="checkbox"
                                  checked={newClientData.preferredTimes.includes(time)}
                                  onChange={() => toggleTimeNewClient(time)}
                                  className="text-brand-coral focus:ring-brand-coral rounded"
                                />
                                {time}
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-brand-dark mb-1.5">Target Booking Date <span className="text-brand-coral">*</span></label>
                          <input
                            type="date"
                            required
                            value={newClientData.preferredDate}
                            onChange={e => setNewClientData({ ...newClientData, preferredDate: e.target.value })}
                            className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none text-brand-muted"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 5: CONSENT & SUBMIT */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-neutral-200/50 shadow-sm space-y-6 text-left">
                      <h3 className="text-lg font-bold text-brand-dark flex items-center gap-2 border-b border-neutral-100 pb-3">
                        <ShieldCheck className="w-5 h-5 text-brand-coral" />
                        5. Consent &amp; Submit
                      </h3>
                      
                      <label className="flex items-start gap-3 cursor-pointer p-4 rounded-2xl bg-neutral-50 border border-neutral-200 hover:bg-neutral-100/50 transition-colors">
                        <input
                          type="checkbox"
                          required
                          checked={newClientData.consentUnderstand}
                          onChange={e => setNewClientData({ ...newClientData, consentUnderstand: e.target.checked })}
                          className="text-brand-coral focus:ring-brand-coral shrink-0 mt-0.5 rounded"
                        />
                        <p className="text-xs text-brand-dark font-semibold leading-relaxed">
                          I understand that this is an appointment request only, and is not confirmed until I receive formal confirmation (email, call, or calendar invite) from the intake team at BalanceCare Health Services. <span className="text-brand-coral font-bold">*</span>
                        </p>
                      </label>

                      <div className="pt-4 flex justify-end">
                        <button
                          type="submit"
                          className="bg-gradient-to-r from-brand-green to-brand-blue hover:from-brand-greenHover hover:to-brand-blueHover text-white font-bold py-4 px-10 rounded-full text-xs shadow-md shadow-brand-blue/10 hover:shadow-brand-blue/20 transition-all flex items-center gap-2 cursor-pointer"
                        >
                          Submit New Intake Request <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </form>
                ) : (
                  /* RETURNING CLIENT REQUEST FORM */
                  <form onSubmit={handleReturningClientSubmit} className="space-y-8">
                    
                    {/* SECTION 1: CLIENT INFORMATION */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-neutral-200/50 shadow-sm space-y-6 text-left">
                      <h3 className="text-lg font-bold text-brand-dark flex items-center gap-2 border-b border-neutral-100 pb-3">
                        <User className="w-5 h-5 text-brand-coral" />
                        1. Returning Client Information
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                        <div className="md:col-span-8">
                          <label className="block text-xs font-bold text-brand-dark mb-1.5">Client Name <span className="text-brand-coral">*</span></label>
                          <input
                            type="text"
                            required
                            placeholder="Your registered full name"
                            value={returningClientData.fullName}
                            onChange={e => setReturningClientData({ ...returningClientData, fullName: e.target.value })}
                            className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none"
                          />
                        </div>

                        <div className="md:col-span-4">
                          <label className="block text-xs font-bold text-brand-dark mb-1.5">Date of Birth <span className="text-brand-coral">*</span></label>
                          <input
                            type="date"
                            required
                            value={returningClientData.dob}
                            onChange={e => setReturningClientData({ ...returningClientData, dob: e.target.value })}
                            className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none text-brand-muted"
                          />
                        </div>

                        <div className="md:col-span-6">
                          <label className="block text-xs font-bold text-brand-dark mb-1.5">Phone Number <span className="text-brand-coral">*</span></label>
                          <input
                            type="tel"
                            required
                            placeholder="e.g. 410-555-1234"
                            value={returningClientData.phone}
                            onChange={e => setReturningClientData({ ...returningClientData, phone: e.target.value })}
                            className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none"
                          />
                        </div>

                        <div className="md:col-span-6">
                          <label className="block text-xs font-bold text-brand-dark mb-1.5">Email Address <span className="text-brand-coral">*</span></label>
                          <input
                            type="email"
                            required
                            placeholder="e.g. yourname@example.com"
                            value={returningClientData.email}
                            onChange={e => setReturningClientData({ ...returningClientData, email: e.target.value })}
                            className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: APPOINTMENT INFORMATION */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-neutral-200/50 shadow-sm space-y-6 text-left">
                      <h3 className="text-lg font-bold text-brand-dark flex items-center gap-2 border-b border-neutral-100 pb-3">
                        <Calendar className="w-5 h-5 text-brand-coral" />
                        2. Appointment History
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-brand-dark mb-1.5">Assigned Practitioner / Provider <span className="text-brand-coral">*</span></label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Dr. Alan Mercer, Clara Sterling, etc."
                            value={returningClientData.providerName}
                            onChange={e => setReturningClientData({ ...returningClientData, providerName: e.target.value })}
                            className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-brand-dark mb-1.5">Last Appointment Date <span className="text-brand-coral">*</span></label>
                          <input
                            type="date"
                            required
                            value={returningClientData.lastAppointmentDate}
                            onChange={e => setReturningClientData({ ...returningClientData, lastAppointmentDate: e.target.value })}
                            className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none text-brand-muted"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: REASON FOR FOLLOW-UP */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-neutral-200/50 shadow-sm space-y-6 text-left">
                      <h3 className="text-lg font-bold text-brand-dark flex items-center gap-2 border-b border-neutral-100 pb-3">
                        <FileText className="w-5 h-5 text-brand-coral" />
                        3. Reason for Follow-Up
                      </h3>

                      <div>
                        <label className="block text-xs font-bold text-brand-dark mb-3">Select the scope of this request:</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            'Individual Therapy', 'Family Therapy', 'Medication Management', 
                            'Reassessment', 'Treatment Plan Review', 'Care Coordination'
                          ].map(reason => (
                            <button
                              type="button"
                              key={reason}
                              onClick={() => toggleReasonReturningClient(reason)}
                              className={`p-3.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                                returningClientData.reasons.includes(reason)
                                  ? 'bg-brand-coral/10 border-brand-coral text-brand-dark'
                                  : 'bg-white border-neutral-200 hover:bg-neutral-50 text-brand-muted'
                              }`}
                            >
                              <span>{reason}</span>
                              {returningClientData.reasons.includes(reason) && (
                                <Check className="w-4 h-4 text-brand-coral shrink-0 ml-2" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-brand-dark mb-1.5">Other Reason</label>
                        <input
                          type="text"
                          placeholder="Please state if you require something else"
                          value={returningClientData.otherReason}
                          onChange={e => setReturningClientData({ ...returningClientData, otherReason: e.target.value })}
                          className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none"
                        />
                      </div>
                    </div>

                    {/* SECTION 4: PAYMENT INFORMATION */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-neutral-200/50 shadow-sm space-y-6 text-left">
                      <h3 className="text-lg font-bold text-brand-dark flex items-center gap-2 border-b border-neutral-100 pb-3">
                        <CreditCard className="w-5 h-5 text-brand-coral" />
                        4. Payment Method Update
                      </h3>

                      <div>
                        <label className="block text-xs font-bold text-brand-dark mb-3">Any changes to your payment method since last visit? <span className="text-brand-coral">*</span></label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {[
                            { label: 'No Changes (Keep current file card)', value: 'No Changes' },
                            { label: 'Insurance Details Updated', value: 'Insurance Updated' },
                            { label: 'Switching to Self-Pay billing', value: 'Switching to Self-Pay' },
                            { label: 'Switching to Insurance coverage', value: 'Switching to Insurance' }
                          ].map(opt => (
                            <label key={opt.value} className={`p-4 rounded-xl border text-xs font-semibold cursor-pointer flex items-center justify-between transition-colors ${
                              returningClientData.paymentChanges === opt.value
                                ? 'border-brand-coral bg-brand-coral/5 text-brand-dark'
                                : 'border-neutral-200 hover:bg-neutral-50 text-brand-muted'
                            }`}>
                              <span>{opt.label}</span>
                              <input
                                type="radio"
                                name="paymentChanges"
                                value={opt.value}
                                checked={returningClientData.paymentChanges === opt.value}
                                onChange={e => setReturningClientData({ ...returningClientData, paymentChanges: e.target.value })}
                                className="text-brand-coral focus:ring-brand-coral"
                              />
                            </label>
                          ))}
                        </div>
                      </div>

                      {returningClientData.paymentChanges !== 'No Changes' && returningClientData.paymentChanges !== 'Switching to Self-Pay' && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-neutral-100"
                        >
                          <div>
                            <label className="block text-xs font-bold text-brand-dark mb-1.5">New Insurance Company <span className="text-brand-coral">*</span></label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. CareFirst, Medicaid, etc."
                              value={returningClientData.insuranceCompany}
                              onChange={e => setReturningClientData({ ...returningClientData, insuranceCompany: e.target.value })}
                              className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-brand-dark mb-1.5">New Member ID <span className="text-brand-coral">*</span></label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. X12345678"
                              value={returningClientData.memberId}
                              onChange={e => setReturningClientData({ ...returningClientData, memberId: e.target.value })}
                              className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-brand-dark mb-1.5">Group #</label>
                            <input
                              type="text"
                              placeholder="e.g. 10025"
                              value={returningClientData.groupNumber}
                              onChange={e => setReturningClientData({ ...returningClientData, groupNumber: e.target.value })}
                              className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-brand-dark mb-1.5">Policy Holder Name <span className="text-brand-coral">*</span></label>
                            <input
                              type="text"
                              required
                              placeholder="Full name of primary insured"
                              value={returningClientData.policyHolder}
                              onChange={e => setReturningClientData({ ...returningClientData, policyHolder: e.target.value })}
                              className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none"
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* SECTION 5: APPOINTMENT PREFERENCE */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-neutral-200/50 shadow-sm space-y-6 text-left">
                      <h3 className="text-lg font-bold text-brand-dark flex items-center gap-2 border-b border-neutral-100 pb-3">
                        <MapPin className="w-5 h-5 text-brand-coral" />
                        5. Appointment Preferences
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-brand-dark mb-2.5">Location / Format <span className="text-brand-coral">*</span></label>
                          <div className="space-y-2">
                            {['Columbia, MD', 'Washington, DC', 'Virtual'].map(loc => (
                              <label key={loc} className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-brand-muted">
                                <input
                                  type="radio"
                                  name="location-returning"
                                  value={loc}
                                  required
                                  checked={returningClientData.location === loc}
                                  onChange={e => setReturningClientData({ ...returningClientData, location: e.target.value })}
                                  className="text-brand-coral focus:ring-brand-coral"
                                />
                                {loc}
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-brand-dark mb-2.5">Preferred Days <span className="text-brand-muted text-[10px] font-normal">(select multiple)</span></label>
                          <div className="grid grid-cols-2 gap-2">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                              <label key={day} className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-brand-muted">
                                <input
                                  type="checkbox"
                                  checked={returningClientData.preferredDays.includes(day)}
                                  onChange={() => toggleDayReturningClient(day)}
                                  className="text-brand-coral focus:ring-brand-coral rounded"
                                />
                                {day}
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-brand-dark mb-2.5">Preferred Time Window <span className="text-brand-muted text-[10px] font-normal">(select multiple)</span></label>
                          <div className="space-y-2">
                            {['Morning', 'Afternoon', 'Evening'].map(time => (
                              <label key={time} className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-brand-muted">
                                <input
                                  type="checkbox"
                                  checked={returningClientData.preferredTimes.includes(time)}
                                  onChange={() => toggleTimeReturningClient(time)}
                                  className="text-brand-coral focus:ring-brand-coral rounded"
                                />
                                {time}
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-brand-dark mb-1.5">Target Booking Date <span className="text-brand-coral">*</span></label>
                          <input
                            type="date"
                            required
                            value={returningClientData.preferredDate}
                            onChange={e => setReturningClientData({ ...returningClientData, preferredDate: e.target.value })}
                            className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none text-brand-muted"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 6: CHANGES SINCE LAST APPOINTMENT */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-neutral-200/50 shadow-sm space-y-6 text-left">
                      <h3 className="text-lg font-bold text-brand-dark flex items-center gap-2 border-b border-neutral-100 pb-3">
                        <AlertCircle className="w-5 h-5 text-brand-coral" />
                        6. Client Updates &amp; Clinic History
                      </h3>

                      <div>
                        <label className="block text-xs font-bold text-brand-dark mb-3">Have there been any vital status updates since your last session? <span className="text-brand-muted text-[10px] font-normal">(select all)</span></label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                          {['Address', 'Phone', 'Email', 'Insurance', 'New Medication', 'Hospitalization', 'ER Visit', 'No Changes'].map(item => (
                            <label key={item} className={`p-3.5 rounded-xl border text-[11px] font-bold cursor-pointer flex items-center gap-2 transition-all ${
                              returningClientData.changes.includes(item)
                                ? 'bg-brand-coral/10 border-brand-coral text-brand-dark'
                                : 'bg-white border-neutral-200 hover:bg-neutral-50 text-brand-muted'
                            }`}>
                              <input
                                type="checkbox"
                                checked={returningClientData.changes.includes(item)}
                                onChange={() => toggleChangeReturningClient(item)}
                                className="text-brand-coral focus:ring-brand-coral rounded scale-90"
                              />
                              <span>{item}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-brand-dark mb-1.5">Explain changes (if applicable)</label>
                        <textarea
                          rows={2}
                          placeholder="e.g. list new medications, describe recent medical treatments or updated contact logs..."
                          value={returningClientData.changesExplanation}
                          onChange={e => setReturningClientData({ ...returningClientData, changesExplanation: e.target.value })}
                          className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-brand-dark mb-1.5">Current Concerns / Discussion Points <span className="text-brand-coral">*</span></label>
                        <textarea
                          required
                          rows={3}
                          placeholder="What would you like to review with your clinician in this follow-up session?"
                          value={returningClientData.currentConcerns}
                          onChange={e => setReturningClientData({ ...returningClientData, currentConcerns: e.target.value })}
                          className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral outline-none"
                        />
                      </div>
                    </div>

                    {/* SECTION 7: REMINDER PREFERENCE */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-neutral-200/50 shadow-sm space-y-6 text-left">
                      <h3 className="text-lg font-bold text-brand-dark flex items-center gap-2 border-b border-neutral-100 pb-3">
                        <Clock className="w-5 h-5 text-brand-coral" />
                        7. Contact &amp; Reminder Preference
                      </h3>

                      <div>
                        <label className="block text-xs font-bold text-brand-dark mb-2.5">How should we send appointment reminders? <span className="text-brand-coral">*</span></label>
                        <div className="flex gap-6">
                          {['Text Message', 'Phone Call', 'Email'].map(method => (
                            <label key={method} className="flex items-center gap-2 cursor-pointer text-xs font-extrabold text-brand-dark">
                              <input
                                type="radio"
                                name="reminderMethod"
                                value={method}
                                required
                                checked={returningClientData.reminderMethod === method}
                                onChange={e => setReturningClientData({ ...returningClientData, reminderMethod: e.target.value })}
                                className="text-brand-coral focus:ring-brand-coral"
                              />
                              {method}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* SECTION 8: CONFIRMATION & CONSENT */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-neutral-200/50 shadow-sm space-y-6 text-left">
                      <h3 className="text-lg font-bold text-brand-dark flex items-center gap-2 border-b border-neutral-100 pb-3">
                        <ShieldCheck className="w-5 h-5 text-brand-coral" />
                        8. Consent &amp; Submit
                      </h3>

                      <label className="flex items-start gap-3 cursor-pointer p-4 rounded-2xl bg-neutral-50 border border-neutral-200 hover:bg-neutral-100/50 transition-colors">
                        <input
                          type="checkbox"
                          required
                          checked={returningClientData.consentUnderstand}
                          onChange={e => setReturningClientData({ ...returningClientData, consentUnderstand: e.target.checked })}
                          className="text-brand-coral focus:ring-brand-coral shrink-0 mt-0.5 rounded"
                        />
                        <p className="text-xs text-brand-dark font-semibold leading-relaxed">
                          I understand that this represents an appointment scheduling request only, and is not finalized nor confirmed until I receive formal confirmation from the administration staff at BalanceCare Health Services. <span className="text-brand-coral font-bold">*</span>
                        </p>
                      </label>

                      <div className="pt-4 flex justify-end">
                        <button
                          type="submit"
                          className="bg-gradient-to-r from-brand-green to-brand-blue hover:from-brand-greenHover hover:to-brand-blueHover text-white font-bold py-4 px-10 rounded-full text-xs shadow-md shadow-brand-blue/10 hover:shadow-brand-blue/20 transition-all flex items-center gap-2 cursor-pointer"
                        >
                          Submit Returning Request <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </form>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
}
