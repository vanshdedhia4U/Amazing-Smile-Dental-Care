export interface Doctor {
  id: string;
  name: string;
  title: string;
  qualification: string;
  experience: string;
  specialties: string[];
  bio: string;
  image: string;
}

export interface Service {
  id: string;
  title: string;
  category: 'General' | 'Cosmetic' | 'Surgical' | 'Orthodontic' | 'Restorative';
  description: string;
  duration: string;
  priceRange: string;
  icon: string;
  popular?: boolean;
}

export interface ClinicalNote {
  chiefComplaint: string;
  examinationFindings: string;
  diagnosis: string;
  treatmentDone: string;
  prescriptions: Array<{
    medicine: string;
    dosage: string;
    frequency: string;
    duration: string;
  }>;
  nextVisitDate?: string;
  advice?: string;
  updatedAt: string;
  doctorSignature: string;
}

export type AppointmentStatus = 'confirmed' | 'in-chair' | 'completed' | 'cancelled' | 'rescheduled' | 'no-show';
export type VisitType = 'first-visit' | 'routine-checkup' | 'procedure' | 'follow-up' | 'emergency';

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';
  date: string; // YYYY-MM-DD
  timeSlot: string;
  doctorId: string;
  doctorName: string;
  serviceId: string;
  serviceName: string;
  status: AppointmentStatus;
  visitType: VisitType;
  symptoms?: string;
  clinicalNotes?: ClinicalNote;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Operatories' | 'Technology' | 'Reception' | 'Hygiene';
  image: string;
  description: string;
  equipmentHighlights: string[];
}

export interface ScheduleConfig {
  morningShift: {
    start: string;
    end: string;
    enabled: boolean;
  };
  eveningShift: {
    start: string;
    end: string;
    enabled: boolean;
  };
  slotDurationMinutes: number;
  blockedDates: string[];
  blockedSlots: Record<string, string[]>; // 'YYYY-MM-DD': ['10:00 AM', ...]
}

export interface ClientCredentials {
  clientUsername: string;
  clientPassword: string;
  clientPin: string;
  clientName: string;
  clientEmail: string;
  clinicName: string;
  lastUpdated: string;
  allowScheduleOverride: boolean;
  allowClinicalNotesExport: boolean;
}

export type PortalMode = 'public' | 'portal';
export type UserRole = 'developer' | 'client_doctor' | 'guest';
