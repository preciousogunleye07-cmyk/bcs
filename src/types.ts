export interface Expert {
  id: string;
  name: string;
  role: string;
  image: string;
  specialties: string[];
  bio: string;
  education: string;
}

export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  longDescription: string;
  benefits: string[];
}

export interface AppointmentBooking {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  expertId: string;
  serviceId: string;
  date: string;
  timeSlot: string;
  notes: string;
}

export interface ReferralSubmission {
  referrerName: string;
  referrerContact: string;
  patientName: string;
  patientContact: string;
  serviceNeeded: string;
  notes: string;
}
