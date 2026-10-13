import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, KeyRound, Stethoscope, Lock, LogOut } from 'lucide-react';
import { Appointment, ScheduleConfig, ClientCredentials } from '../../types/clinic';
import { DeveloperCredentialsManager } from './DeveloperCredentialsManager';
import { DoctorLoginScreen } from './DoctorLoginScreen';
import { DoctorDashboard } from './DoctorDashboard';

interface PortalWrapperProps {
  initialMode?: 'developer' | 'client';
  credentials: ClientCredentials;
  appointments: Appointment[];
  schedule: ScheduleConfig;
  onUpdateCredentials: (newCreds: ClientCredentials) => void;
  onUpdateAppointments: (updated: Appointment[]) => void;
  onUpdateSchedule: (updatedSchedule: ScheduleConfig) => void;
  onClosePortal: () => void;
}

export const PortalWrapper: React.FC<PortalWrapperProps> = ({
  initialMode = 'client',
  credentials,
  appointments,
  schedule,
  onUpdateCredentials,
  onUpdateAppointments,
  onUpdateSchedule,
  onClosePortal,
}) => {
  const [activePortalRole, setActivePortalRole] = useState<'developer' | 'client'>(initialMode);
  const [isDoctorAuthenticated, setIsDoctorAuthenticated] = useState<boolean>(true); // Pre-authenticated for quick demo testing

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-800 pb-20">
      
      {/* Top Portal Navigation Bar */}
      <header className="sticky top-0 z-30 bg-slate-900 text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Back button & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClosePortal}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Public Website</span>
            </button>
            <div className="hidden sm:block h-5 w-px bg-slate-800" />
            <div className="hidden sm:flex items-center gap-2">
              <span className="font-heading font-extrabold text-white text-base">
                Amazing Smile Dental Care
              </span>
              <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Clinic Admin System
              </span>
            </div>
          </div>

          {/* Role Mode Switcher Tabs */}
          <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-2xl border border-slate-700">
            <button
              onClick={() => setActivePortalRole('developer')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                activePortalRole === 'developer'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Developer Hub</span>
              <span className="md:hidden">Developer</span>
            </button>

            <button
              onClick={() => setActivePortalRole('client')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                activePortalRole === 'client'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Doctor Clinic Portal</span>
              <span className="md:hidden">Doctor Portal</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activePortalRole === 'developer' ? (
          <DeveloperCredentialsManager
            credentials={credentials}
            onUpdateCredentials={onUpdateCredentials}
            onSwitchToDoctorLogin={() => {
              setActivePortalRole('client');
              setIsDoctorAuthenticated(false);
            }}
          />
        ) : (
          <div>
            {!isDoctorAuthenticated ? (
              <DoctorLoginScreen
                credentials={credentials}
                onLoginSuccess={() => setIsDoctorAuthenticated(true)}
                onOpenDeveloperHub={() => setActivePortalRole('developer')}
              />
            ) : (
              <DoctorDashboard
                credentials={credentials}
                appointments={appointments}
                schedule={schedule}
                onUpdateAppointments={onUpdateAppointments}
                onUpdateSchedule={onUpdateSchedule}
                onLogout={() => setIsDoctorAuthenticated(false)}
              />
            )}
          </div>
        )}
      </main>

    </div>
  );
};
