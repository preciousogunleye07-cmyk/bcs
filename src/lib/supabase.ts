import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { isDateAdministrativelyBlocked, ADMIN_BLOCKED_DATES } from '../data/blockedDates';

export { isDateAdministrativelyBlocked, ADMIN_BLOCKED_DATES };

const DEFAULT_SUPABASE_URL = 'https://ixecprkkxxdzglsymrua.supabase.co';
const DEFAULT_SUPABASE_KEY = 'sb_publishable_0-V_W7drQKyxLcqwxkohKQ_fLSR22Zz';

function cleanSupabaseUrl(rawUrl: string): string {
  if (!rawUrl) return '';
  let clean = rawUrl.trim();
  // Remove /rest/v1 suffix if user pasted the PostgREST endpoint
  clean = clean.replace(/\/rest\/v1\/?$/i, '');
  // Remove trailing slashes
  clean = clean.replace(/\/+$/, '');
  return clean;
}

const rawUrl = (import.meta as any).env?.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const rawKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_KEY;

export const supabaseUrl = cleanSupabaseUrl(rawUrl);
export const supabaseAnonKey = (rawKey || '').trim();

// Verify if Supabase credentials have been configured
export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl && 
    supabaseAnonKey && 
    !supabaseUrl.includes('placeholder') &&
    !supabaseAnonKey.includes('placeholder')
  );
};

// Safe Supabase client initialization
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});

export const createClientHelper = () => createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});

export interface IntakeSubmissionData {
  submissionType: 'new-client' | 'returning-client';
  ticketNumber: string;
  fullName: string;
  dob?: string;
  age?: string;
  gender?: string;
  parentGuardian?: string;
  relationshipToClient?: string;
  phone: string;
  email: string;
  homeAddress?: string;
  reasons: string[];
  otherReason?: string;
  concernsDescription?: string;
  paymentMethod: string;
  insuranceCompany?: string;
  memberId?: string;
  groupNumber?: string;
  policyHolder?: string;
  policyHolderDob?: string;
  relationshipToPolicyHolder?: string;
  preferredLocation?: string;
  preferredDays?: string[];
  preferredTimes?: string[];
  preferredDate?: string;
  currentMedications?: string;
  preferredPractitioner?: string;
  reminderMethod?: string;
}

export interface AppointmentRecord {
  ticketId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  expertId?: string;
  serviceId: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status?: string;
}

export const ALL_STANDARD_TIME_SLOTS = [
  '09:00 AM - 10:00 AM',
  '11:30 AM - 12:30 PM',
  '02:00 PM - 03:00 PM',
  '04:15 PM - 05:15 PM'
];

// Local session store for instant fallback if Supabase is offline or not yet migrated
const localBookedSlotsCache: Record<string, string[]> = {};

/**
 * Fetch all reserved time slots for a specific date from Supabase
 */
export async function fetchBookedSlotsForDate(date: string): Promise<string[]> {
  if (!date) return [];

  // Check if date is administratively blocked first
  const blockCheck = isDateAdministrativelyBlocked(date);
  if (blockCheck.blocked) {
    // If the entire date is blocked, all slots are flagged as taken/unavailable
    return [...ALL_STANDARD_TIME_SLOTS];
  }

  const localSlots = localBookedSlotsCache[date] || [];

  if (!isSupabaseConfigured() || !supabase) {
    return localSlots;
  }

  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('time_slot, status')
      .eq('date', date)
      .neq('status', 'cancelled');

    if (error) {
      console.warn('[Supabase] Could not fetch booked slots for date:', error.message);
      return localSlots;
    }

    const dbSlots = (data || []).map((row: any) => row.time_slot).filter(Boolean);
    const combined = Array.from(new Set([...localSlots, ...dbSlots]));
    localBookedSlotsCache[date] = combined;
    return combined;
  } catch (err) {
    console.warn('[Supabase] Error reading booked slots:', err);
    return localSlots;
  }
}

/**
 * Verify if a specific date and time slot is available
 */
export async function checkSlotAvailability(date: string, timeSlot: string): Promise<{ available: boolean; reason?: string }> {
  if (!date || !timeSlot) {
    return { available: false, reason: 'Date and time slot must be selected.' };
  }

  // 1. Check administrative blocklist
  const blockCheck = isDateAdministrativelyBlocked(date);
  if (blockCheck.blocked) {
    return {
      available: false,
      reason: blockCheck.reason || `The date ${date} is not available for bookings. Please choose an alternate date.`
    };
  }

  // 2. Check Supabase DB booked slots
  const bookedSlots = await fetchBookedSlotsForDate(date);
  const isTaken = bookedSlots.some(s => s.trim().toLowerCase() === timeSlot.trim().toLowerCase());

  if (isTaken) {
    return { 
      available: false, 
      reason: `The time slot "${timeSlot}" on ${date} is already reserved in our system. Please choose an alternate time or date.` 
    };
  }

  return { available: true };
}

/**
 * Check if an entire date has all slots booked or is administratively blocked
 */
export async function isDateFullyBooked(date: string): Promise<boolean> {
  const blockCheck = isDateAdministrativelyBlocked(date);
  if (blockCheck.blocked) return true;

  const booked = await fetchBookedSlotsForDate(date);
  return ALL_STANDARD_TIME_SLOTS.every(slot => 
    booked.some(b => b.trim().toLowerCase() === slot.trim().toLowerCase())
  );
}

export interface ReferralRecord {
  ticket: string;
  referrerName: string;
  referrerContact: string;
  patientName: string;
  patientContact: string;
  serviceNeeded: string;
  notes?: string;
}

/**
 * Save an Intake Submission to Supabase
 */
export async function saveIntakeToSupabase(data: IntakeSubmissionData): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured() || !supabase) {
    // Graceful fallback to client-side logging when environment variables are not yet populated
    console.info('[Supabase] Storing intake locally (Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to persist to live Supabase DB):', data);
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from('intake_submissions')
      .insert([
        {
          ticket_number: data.ticketNumber,
          submission_type: data.submissionType,
          full_name: data.fullName,
          dob: data.dob,
          age: data.age,
          gender: data.gender,
          parent_guardian: data.parentGuardian,
          relationship_to_client: data.relationshipToClient,
          phone: data.phone,
          email: data.email,
          home_address: data.homeAddress,
          reasons: data.reasons,
          other_reason: data.otherReason,
          concerns_description: data.concernsDescription,
          payment_method: data.paymentMethod,
          insurance_company: data.insuranceCompany,
          member_id: data.memberId,
          group_number: data.groupNumber,
          policy_holder: data.policyHolder,
          policy_holder_dob: data.policyHolderDob,
          relationship_to_policy_holder: data.relationshipToPolicyHolder,
          preferred_location: data.preferredLocation,
          preferred_days: data.preferredDays,
          preferred_times: data.preferredTimes,
          preferred_date: data.preferredDate,
          current_medications: data.currentMedications,
          preferred_practitioner: data.preferredPractitioner,
          reminder_method: data.reminderMethod,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('[Supabase] Insert Intake Error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('[Supabase] Unexpected error saving intake:', err);
    return { success: false, error: err?.message || 'Database error' };
  }
}

/**
 * Save an Appointment Reservation to Supabase with strict duplicate prevention
 */
export async function saveAppointmentToSupabase(data: AppointmentRecord): Promise<{ success: boolean; error?: string }> {
  // First check if the slot is already taken
  const availability = await checkSlotAvailability(data.date, data.timeSlot);
  if (!availability.available) {
    return { success: false, error: availability.reason };
  }

  // Update local cache immediately
  if (!localBookedSlotsCache[data.date]) {
    localBookedSlotsCache[data.date] = [];
  }
  if (!localBookedSlotsCache[data.date].includes(data.timeSlot)) {
    localBookedSlotsCache[data.date].push(data.timeSlot);
  }

  if (!isSupabaseConfigured() || !supabase) {
    console.info('[Supabase] Storing appointment in local slot registry (Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to persist to live Supabase DB):', data);
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from('appointments')
      .insert([
        {
          ticket_id: data.ticketId,
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          expert_id: data.expertId,
          service_id: data.serviceId,
          date: data.date,
          time_slot: data.timeSlot,
          notes: data.notes,
          status: data.status || 'confirmed',
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('[Supabase] Insert Appointment Error:', error.message);
      // Check if it was unique constraint violation
      if (error.code === '23505' || error.message?.toLowerCase().includes('duplicate') || error.message?.toLowerCase().includes('unique')) {
        return { 
          success: false, 
          error: `This date (${data.date}) and time (${data.timeSlot}) has just been taken by another client. Please select a different time.` 
        };
      }
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('[Supabase] Unexpected error saving appointment:', err);
    return { success: false, error: err?.message || 'Database error' };
  }
}

/**
 * Save a Referral to Supabase
 */
export async function saveReferralToSupabase(data: ReferralRecord): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured() || !supabase) {
    console.info('[Supabase] Storing referral locally (Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to persist to live Supabase DB):', data);
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from('referrals')
      .insert([
        {
          ticket: data.ticket,
          referrer_name: data.referrerName,
          referrer_contact: data.referrerContact,
          patient_name: data.patientName,
          patient_contact: data.patientContact,
          service_needed: data.serviceNeeded,
          notes: data.notes,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('[Supabase] Insert Referral Error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('[Supabase] Unexpected error saving referral:', err);
    return { success: false, error: err?.message || 'Database error' };
  }
}
