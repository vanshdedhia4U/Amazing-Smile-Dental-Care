import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { GallerySection } from './components/GallerySection';
import { DoctorsSection } from './components/DoctorsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { PortalWrapper } from './components/portal/PortalWrapper';
import {
  getStoredAppointments,
  saveStoredAppointments,
  getStoredSchedule,
  saveStoredSchedule,
  getStoredCredentials,
  saveStoredCredentials
} from './utils/storage';
import { Appointment, ScheduleConfig, ClientCredentials } from './types/clinic';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  // App views: 'public' | 'portal'
  const [currentView, setCurrentView] = useState<'public' | 'portal'>('public');
  const [portalInitialRole, setPortalInitialRole] = useState<'developer' | 'client'>('client');

  // Booking Modal
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | undefined>(undefined);
  const [preSelectedDoctorId, setPreSelectedDoctorId] = useState<string | undefined>(undefined);

  // Persistent States
  const [appointments, setAppointments] = useState<Appointment[]>(getStoredAppointments);
  const [schedule, setSchedule] = useState<ScheduleConfig>(getStoredSchedule);
  const [credentials, setCredentials] = useState<ClientCredentials>(getStoredCredentials);

  // New booking notification badge
  const [notification, setNotification] = useState<string | null>(null);

  // Handle appointment updates
  const handleUpdateAppointments = (updated: Appointment[]) => {
    setAppointments(updated);
    saveStoredAppointments(updated);
  };

  // Handle schedule updates
  const handleUpdateSchedule = (updatedSchedule: ScheduleConfig) => {
    setSchedule(updatedSchedule);
    saveStoredSchedule(updatedSchedule);
  };

  // Handle credentials updates
  const handleUpdateCredentials = (updatedCreds: ClientCredentials) => {
    setCredentials(updatedCreds);
    saveStoredCredentials(updatedCreds);
  };

  // Handle booking completed by patient
  const handleAppointmentBooked = (newAppt: Appointment) => {
    const updated = [newAppt, ...appointments];
    handleUpdateAppointments(updated);
    setNotification(`Appointment ${newAppt.id} successfully recorded for ${newAppt.patientName}! It is now visible in the Doctor Clinic Portal.`);
    setTimeout(() => {
      setNotification(null);
    }, 6000);
  };

  const handleOpenBookingWithService = (serviceId: string) => {
    setPreSelectedServiceId(serviceId);
    setPreSelectedDoctorId(undefined);
    setIsBookingOpen(true);
  };

  const handleOpenBookingWithDoctor = (doctorId: string) => {
    setPreSelectedDoctorId(doctorId);
    setPreSelectedServiceId(undefined);
    setIsBookingOpen(true);
  };

  const handleOpenPortal = (targetRole: 'developer' | 'client' = 'client') => {
    setPortalInitialRole(targetRole);
    setCurrentView('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-teal-600 selection:text-white">
      
      {/* Floating System Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-teal-500/50 max-w-md flex items-start gap-3 animate-slide-up">
          <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
          <div className="flex-1 text-xs leading-relaxed">
            <span className="font-bold text-teal-300 block mb-0.5">Booking Registered in Clinic Schedule</span>
            <span>{notification}</span>
            <div className="mt-2">
              <button
                onClick={() => handleOpenPortal('client')}
                className="text-xs font-bold text-teal-400 hover:text-teal-300 underline"
              >
                Open Doctor Dashboard to View →
              </button>
            </div>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {currentView === 'portal' ? (
        <PortalWrapper
          initialMode={portalInitialRole}
          credentials={credentials}
          appointments={appointments}
          schedule={schedule}
          onUpdateCredentials={handleUpdateCredentials}
          onUpdateAppointments={handleUpdateAppointments}
          onUpdateSchedule={handleUpdateSchedule}
          onClosePortal={() => {
            setCurrentView('public');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      ) : (
        <>
          <Navbar
            onOpenBooking={() => {
              setPreSelectedServiceId(undefined);
              setPreSelectedDoctorId(undefined);
              setIsBookingOpen(true);
            }}
            onOpenPortal={handleOpenPortal}
          />

          <main>
            <Hero
              onOpenBooking={() => {
                setPreSelectedServiceId(undefined);
                setPreSelectedDoctorId(undefined);
                setIsBookingOpen(true);
              }}
            />

            <ServicesSection
              onSelectServiceToBook={handleOpenBookingWithService}
            />

            <GallerySection
              onOpenBooking={() => {
                setPreSelectedServiceId(undefined);
                setPreSelectedDoctorId(undefined);
                setIsBookingOpen(true);
              }}
            />

            <DoctorsSection
              onSelectDoctorToBook={handleOpenBookingWithDoctor}
            />

            <ReviewsSection />

            <LocationSection
              onOpenBooking={() => {
                setPreSelectedServiceId(undefined);
                setPreSelectedDoctorId(undefined);
                setIsBookingOpen(true);
              }}
            />
          </main>

          <Footer
            onOpenPortal={handleOpenPortal}
            onOpenBooking={() => {
              setPreSelectedServiceId(undefined);
              setPreSelectedDoctorId(undefined);
              setIsBookingOpen(true);
            }}
          />

          <BookingModal
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            preSelectedServiceId={preSelectedServiceId}
            preSelectedDoctorId={preSelectedDoctorId}
            scheduleConfig={schedule}
            existingAppointments={appointments}
            onAppointmentBooked={handleAppointmentBooked}
          />
        </>
      )}

    </div>
  );
}
