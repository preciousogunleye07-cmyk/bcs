/**
 * BLOCKED / BLACKOUT DATES REGISTRY
 * 
 * Any date added to this list will be strictly blocked across the entire application.
 * Users will NOT be allowed to pick these dates, regardless of whether they are
 * recorded in the database or not.
 * 
 * Format: 'YYYY-MM-DD' (e.g., '2026-08-20', '2026-09-01')
 */

export const ADMIN_BLOCKED_DATES: string[] = [
  // Add any specific dates here (e.g. '2026-08-25', '2026-12-25')
];

/**
 * Optional custom labels / reasons for blocked dates
 */
export const BLOCKED_DATE_REASONS: Record<string, string> = {
  // Example: '2026-12-25': 'Christmas Holiday Closure',
};

/**
 * Check if a date string (YYYY-MM-DD) is administratively blocked
 */
export function isDateAdministrativelyBlocked(dateStr: string): { blocked: boolean; reason?: string } {
  if (!dateStr) return { blocked: false };

  // Normalize date string (strip time if present)
  const normalized = dateStr.trim().split('T')[0];

  // 1. Direct match in admin blocked dates
  if (ADMIN_BLOCKED_DATES.includes(normalized)) {
    const customReason = BLOCKED_DATE_REASONS[normalized] || 'This date is currently blocked by administration. No bookings are permitted.';
    return { blocked: true, reason: customReason };
  }

  // 2. Check if it's a Sunday (if your practice is closed on Sundays, standard clinic rule)
  const dateObj = new Date(normalized + 'T00:00:00');
  if (!isNaN(dateObj.getTime()) && dateObj.getDay() === 0) {
    return { blocked: true, reason: 'BalanceCare clinic offices are closed on Sundays.' };
  }

  return { blocked: false };
}
