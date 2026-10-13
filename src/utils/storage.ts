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

export function getStoredAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem(APPOINTMENTS_KEY);
    if (!raw) {
      localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(INITIAL_APPOINTMENTS));
      return INITIAL_APPOINTMENTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed reading appointments from localStorage', err);
    return INITIAL_APPOINTMENTS;
  }
}

export function saveStoredAppointments(appointments: Appointment[]): void {
  try {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
  } catch (err) {
    console.error('Failed saving appointments', err);
  }
}

export function getStoredSchedule(): ScheduleConfig {
  try {
    const raw = localStorage.getItem(SCHEDULE_KEY);
    if (!raw) {
      localStorage.setItem(SCHEDULE_KEY, JSON.stringify(DEFAULT_SCHEDULE_CONFIG));
      return DEFAULT_SCHEDULE_CONFIG;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed reading schedule from localStorage', err);
    return DEFAULT_SCHEDULE_CONFIG;
  }
}

export function saveStoredSchedule(schedule: ScheduleConfig): void {
  try {
    localStorage.setItem(SCHEDULE_KEY, JSON.stringify(schedule));
  } catch (err) {
    console.error('Failed saving schedule', err);
  }
}

export function getStoredCredentials(): ClientCredentials {
  try {
    const raw = localStorage.getItem(CREDENTIALS_KEY);
    if (!raw) {
      localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(DEFAULT_CLIENT_CREDENTIALS));
      return DEFAULT_CLIENT_CREDENTIALS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed reading credentials from localStorage', err);
    return DEFAULT_CLIENT_CREDENTIALS;
  }
}

export function saveStoredCredentials(creds: ClientCredentials): void {
  try {
    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(creds));
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

  const slotsList: string[] = [];
  if (schedule.morningShift.enabled) slotsList.push(...morningSlots);
  if (schedule.eveningShift.enabled) slotsList.push(...eveningSlots);

  const blockedForDate = schedule.blockedSlots[dateStr] || [];
  const isDateBlocked = schedule.blockedDates.includes(dateStr);

  return slotsList.map(slot => {
    // Check if slot has appointment
    const matchingAppt = existingAppointments.find(
      a => a.date === dateStr && a.timeSlot === slot &&
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
