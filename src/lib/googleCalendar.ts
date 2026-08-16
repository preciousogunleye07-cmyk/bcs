// Google Calendar helper utilities without Firebase dependencies

// Helper to convert date and timeSlot string "09:00 AM - 10:00 AM" to 24-hour ISO strings
export function parseDateTimeRange(date: string, timeSlot: string): { startISO: string; endISO: string; startFormatted: string; endFormatted: string } {
  const defaultStart = `${date}T09:00:00`;
  const defaultEnd = `${date}T10:00:00`;

  try {
    const parts = timeSlot.split('-');
    if (parts.length !== 2) {
      return { 
        startISO: defaultStart, 
        endISO: defaultEnd,
        startFormatted: `${date.replace(/-/g, '')}T090000`,
        endFormatted: `${date.replace(/-/g, '')}T100000`
      };
    }

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

    const startH = parseTimeTo24h(parts[0]);
    const endH = parseTimeTo24h(parts[1]);

    const startISO = `${date}T${startH}:00`;
    const endISO = `${date}T${endH}:00`;

    const startFormatted = `${date.replace(/-/g, '')}T${startH.replace(':', '')}00`;
    const endFormatted = `${date.replace(/-/g, '')}T${endH.replace(':', '')}00`;

    return { startISO, endISO, startFormatted, endFormatted };
  } catch (err) {
    console.error('Error parsing date/time range:', err);
    return { 
      startISO: defaultStart, 
      endISO: defaultEnd,
      startFormatted: `${date.replace(/-/g, '')}T090000`,
      endFormatted: `${date.replace(/-/g, '')}T100000`
    };
  }
}

export interface CalendarEventParams {
  summary: string;
  description: string;
  date: string;
  timeSlot: string;
  expertName: string;
  location?: string;
}

/**
 * Generate a direct "Add to Google Calendar" web link
 */
export function getGoogleCalendarUrl(params: CalendarEventParams): string {
  const { startFormatted, endFormatted } = parseDateTimeRange(params.date, params.timeSlot);
  const location = params.location || 'BalanceCare Health & Wellness Clinic (Columbia, MD / Washington, DC)';
  
  const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
  const urlParams = new URLSearchParams({
    text: params.summary,
    dates: `${startFormatted}/${endFormatted}`,
    details: params.description,
    location: location,
  });

  return `${baseUrl}&${urlParams.toString()}`;
}

/**
 * Generate and trigger download of an .ics iCalendar file for Outlook, Apple Calendar, and Google Calendar
 */
export function downloadIcsFile(params: CalendarEventParams) {
  const { startFormatted, endFormatted } = parseDateTimeRange(params.date, params.timeSlot);
  const location = params.location || 'BalanceCare Health & Wellness Clinic';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//BalanceCare Health Services//Appointment Schedule//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `SUMMARY:${params.summary.replace(/,/g, '\\,')}`,
    `DESCRIPTION:${params.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location.replace(/,/g, '\\,')}`,
    `DTSTART:${startFormatted}`,
    `DTEND:${endFormatted}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `BalanceCare_Appointment_${params.date}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
