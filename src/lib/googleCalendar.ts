import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
// Request Google Calendar events write permission
provider.addScope('https://www.googleapis.com/auth/calendar.events');

let isSigningIn = false;
let cachedAccessToken: string | null = null;

// Initialize auth state listener
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // In client-side only Firebase popup flow, the token is obtained during signInWithPopup
        // and is not automatically retrieved on page reload unless we re-auth or store it (which is discouraged for security).
        // If we don't have it cached, we treat it as unauthenticated for Google Calendar operations.
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Google sign-in trigger
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get access token from Firebase Auth');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

// Helper to convert timeSlot string "09:00 AM - 10:00 AM" to 24-hour ISO strings
export function parseDateTimeRange(date: string, timeSlot: string): { startISO: string; endISO: string } {
  // Default values in case parsing fails
  const defaultStart = `${date}T09:00:00`;
  const defaultEnd = `${date}T10:00:00`;

  try {
    const parts = timeSlot.split('-');
    if (parts.length !== 2) return { startISO: defaultStart, endISO: defaultEnd };

    const parseTimeTo24h = (timeStr: string): string => {
      const cleaned = timeStr.trim();
      const match = cleaned.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
      if (!match) return "09:00";
      
      let [_, hours, minutes, ampm] = match;
      let h = parseInt(hours, 10);
      if (ampm.toUpperCase() === 'PM' && h < 12) h += 12;
      if (ampm.toUpperCase() === 'AM' && h === 12) h = 0;
      return `${h.toString().padStart(2, '0')}:${minutes}`;
    };

    const startISO = `${date}T${parseTimeTo24h(parts[0])}:00`;
    const endISO = `${date}T${parseTimeTo24h(parts[1])}:00`;

    return { startISO, endISO };
  } catch (err) {
    console.error('Error parsing date/time range:', err);
    return { startISO: defaultStart, endISO: defaultEnd };
  }
}

interface CalendarEventParams {
  summary: string;
  description: string;
  date: string;
  timeSlot: string;
  expertName: string;
}

// Create event in Google Calendar
export const createCalendarEvent = async (
  accessToken: string,
  params: CalendarEventParams
): Promise<any> => {
  const { startISO, endISO } = parseDateTimeRange(params.date, params.timeSlot);

  const eventBody = {
    summary: params.summary,
    description: params.description,
    start: {
      dateTime: startISO,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York'
    },
    end: {
      dateTime: endISO,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York'
    },
    reminders: {
      useDefault: true
    }
  };

  const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventBody)
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error('Google Calendar API Error:', errText);
    throw new Error(`Failed to create calendar event: ${response.statusText}`);
  }

  return response.json();
};
