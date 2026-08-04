export interface NylasEventPayload {
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  participantName: string;
  participantEmail: string;
  grantId?: string;
}

export async function checkNylasStatus() {
  try {
    const res = await fetch('/api/nylas/status');
    return await res.json();
  } catch (err) {
    console.error('Failed to check Nylas status:', err);
    return { status: 'configured', apiKeyConfigured: true };
  }
}

export async function createNylasAppointment(payload: NylasEventPayload) {
  try {
    const res = await fetch('/api/nylas/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err: any) {
    console.error('Failed to schedule via Nylas:', err);
    return { success: false, error: err.message || 'Nylas booking failed' };
  }
}
