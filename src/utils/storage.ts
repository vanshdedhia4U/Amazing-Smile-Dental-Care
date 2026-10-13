import {
  Appointment,
  ScheduleConfig,
  ClientCredentials,
  ClinicalNote,
  AppointmentStatus
} from '../types/clinic';
import {
  INITIAL_APPOINTMENTS,
  DEFAULT_SCHEDULE_CONFIG,
  DEFAULT_CLIENT_CREDENTIALS
} from '../data/mockData';

const APPOINTMENTS_KEY = 'amazing_smile_appointments_v1';
const SCHEDULE_KEY = 'amazing_smile_schedule_v1';
const CREDENTIALS_KEY = 'amazing_smile_credentials_v1';

// In-memory fallback in case iframe blocks localStorage
const memoryStorage: Record<string, string> = {};

function safeGetItem(key: string): string | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch (e) {
    // Iframe or security restriction
  }
  return memoryStorage[key] ?? null;
}

function safeSetItem(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch (e) {
    // Iframe or security restriction
  }
  memoryStorage[key] = value;
}

export function getStoredAppointments(): Appointment[] {
  try {
    const raw = safeGetItem(APPOINTMENTS_KEY);
    if (!raw) {
      safeSetItem(APPOINTMENTS_KEY, JSON.stringify(INITIAL_APPOINTMENTS));
      return INITIAL_APPOINTMENTS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return INITIAL_APPOINTMENTS;
    }
    return parsed;
  } catch (err) {
    console.warn('Fallback to INITIAL_APPOINTMENTS:', err);
    return INITIAL_APPOINTMENTS;
  }
}

export function saveStoredAppointments(appointments: Appointment[]): void {
  try {
    safeSetItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
  } catch (err) {
    console.error('Failed saving appointments', err);
  }
}

export function getStoredSchedule(): ScheduleConfig {
  try {
    const raw = safeGetItem(SCHEDULE_KEY);
    if (!raw) {
      safeSetItem(SCHEDULE_KEY, JSON.stringify(DEFAULT_SCHEDULE_CONFIG));
      return DEFAULT_SCHEDULE_CONFIG;
    }
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_SCHEDULE_CONFIG,
      ...parsed,
      blockedSlots: parsed?.blockedSlots || {},
      blockedDates: parsed?.blockedDates || [],
      morningShift: parsed?.morningShift || DEFAULT_SCHEDULE_CONFIG.morningShift,
      eveningShift: parsed?.eveningShift || DEFAULT_SCHEDULE_CONFIG.eveningShift,
    };
  } catch (err) {
    console.warn('Fallback to DEFAULT_SCHEDULE_CONFIG:', err);
    return DEFAULT_SCHEDULE_CONFIG;
  }
}

export function saveStoredSchedule(schedule: ScheduleConfig): void {
  try {
    safeSetItem(SCHEDULE_KEY, JSON.stringify(schedule));
  } catch (err) {
    console.error('Failed saving schedule', err);
  }
}

export function getStoredCredentials(): ClientCredentials {
  try {
    const raw = safeGetItem(CREDENTIALS_KEY);
    if (!raw) {
      safeSetItem(CREDENTIALS_KEY, JSON.stringify(DEFAULT_CLIENT_CREDENTIALS));
      return DEFAULT_CLIENT_CREDENTIALS;
    }
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_CLIENT_CREDENTIALS,
      ...parsed,
    };
  } catch (err) {
    console.warn('Fallback to DEFAULT_CLIENT_CREDENTIALS:', err);
    return DEFAULT_CLIENT_CREDENTIALS;
  }
}

export function saveStoredCredentials(creds: ClientCredentials): void {
  try {
    safeSetItem(CREDENTIALS_KEY, JSON.stringify(creds));
  } catch (err) {
    console.error('Failed saving credentials', err);
  }
}

/**
 * Standard Available Slots generator for public and admin scheduling
 */
export function generateAvailableSlots(
  dateStr: string,
  schedule: ScheduleConfig,
  existingAppointments: Appointment[],
  filterDoctorId?: string
): { slot: string; isBooked: boolean; isBlocked: boolean; patientName?: string }[] {
  const morningSlots = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM"
  ];
  const eveningSlots = [
    "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
    "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM"
  ];

  const safeSchedule: ScheduleConfig = {
    ...DEFAULT_SCHEDULE_CONFIG,
    ...(schedule || {}),
    blockedSlots: (schedule && schedule.blockedSlots) || {},
    blockedDates: (schedule && schedule.blockedDates) || [],
    morningShift: (schedule && schedule.morningShift) || DEFAULT_SCHEDULE_CONFIG.morningShift,
    eveningShift: (schedule && schedule.eveningShift) || DEFAULT_SCHEDULE_CONFIG.eveningShift,
  };

  const safeAppointments = Array.isArray(existingAppointments) ? existingAppointments : [];

  const slotsList: string[] = [];
  if (safeSchedule.morningShift.enabled) slotsList.push(...morningSlots);
  if (safeSchedule.eveningShift.enabled) slotsList.push(...eveningSlots);

  const blockedForDate = safeSchedule.blockedSlots[dateStr] || [];
  const isDateBlocked = safeSchedule.blockedDates.includes(dateStr);

  return slotsList.map(slot => {
    const matchingAppt = safeAppointments.find(
      a => a && a.date === dateStr && a.timeSlot === slot &&
        (filterDoctorId ? a.doctorId === filterDoctorId : true) &&
        a.status !== 'cancelled'
    );

    const isBlocked = isDateBlocked || blockedForDate.includes(slot);

    return {
      slot,
      isBooked: !!matchingAppt,
      isBlocked,
      patientName: matchingAppt ? matchingAppt.patientName : undefined
    };
  });
}
