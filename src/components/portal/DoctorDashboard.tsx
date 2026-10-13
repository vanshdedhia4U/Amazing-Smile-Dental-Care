import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  FileText,
  CheckCircle,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Check,
  X,
  Lock,
  LogOut,
  Stethoscope,
  ChevronRight,
  Printer,
  CalendarCheck2,
  Sliders,
  ChevronDown,
  UserPlus
} from 'lucide-react';
import { Appointment, ScheduleConfig, ClientCredentials, ClinicalNote, AppointmentStatus } from '../../types/clinic';
import { CLINIC_INFO, getRelativeDate, DOCTORS, SERVICES } from '../../data/mockData';
import { ClinicalNotesModal } from './ClinicalNotesModal';

interface DoctorDashboardProps {
  credentials: ClientCredentials;
  appointments: Appointment[];
  schedule: ScheduleConfig;
  onUpdateAppointments: (updated: Appointment[]) => void;
  onUpdateSchedule: (updatedSchedule: ScheduleConfig) => void;
  onLogout: () => void;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({
  credentials,
  appointments,
  schedule,
  onUpdateAppointments,
  onUpdateSchedule,
  onLogout,
}) => {
  // Selected date for viewing daily visits (defaults to today)
  const [selectedDate, setSelectedDate] = useState<string>(getRelativeDate(0));
  const [activeTab, setActiveTab] = useState<'appointments' | 'schedule'>('appointments');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Clinical Notes Modal
  const [selectedAppointmentForNotes, setSelectedAppointmentForNotes] = useState<Appointment | null>(null);

  // Quick Walk-in Modal
  const [showWalkinModal, setShowWalkinModal] = useState<boolean>(false);
  const [walkinName, setWalkinName] = useState<string>('');
  const [walkinPhone, setWalkinPhone] = useState<string>('');
  const [walkinService, setWalkinService] = useState<string>(SERVICES[0].id);
  const [walkinSlot, setWalkinSlot] = useState<string>('11:00 AM');
  const [walkinDoctor, setWalkinDoctor] = useState<string>('dr-manish');

  // Filter appointments by selected date
  const dateAppointments = appointments.filter(a => a.date === selectedDate);

  // Filter by search & status
  const filteredAppointments = dateAppointments.filter(a => {
    const matchesSearch =
      a.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.patientPhone.includes(searchQuery) ||
      a.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' ? true : a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate Daily Visit Summary statistics
  const totalVisits = dateAppointments.length;
  const inChairVisits = dateAppointments.filter(a => a.status === 'in-chair').length;
  const completedVisits = dateAppointments.filter(a => a.status === 'completed').length;
  const waitingVisits = dateAppointments.filter(a => a.status === 'confirmed').length;
  const cancelledVisits = dateAppointments.filter(a => a.status === 'cancelled').length;
  const notesRecordedCount = dateAppointments.filter(a => !!a.clinicalNotes).length;

  // Handle appointment status change
  const handleUpdateStatus = (id: string, newStatus: AppointmentStatus) => {
    const updated = appointments.map(a => {
      if (a.id === id) {
        return { ...a, status: newStatus };
      }
      return a;
    });
    onUpdateAppointments(updated);
  };

  // Handle saving clinical notes
  const handleSaveNotes = (id: string, newNote: ClinicalNote) => {
    const updated = appointments.map(a => {
      if (a.id === id) {
        return {
          ...a,
          clinicalNotes: newNote,
          // If status was confirmed or in-chair, optionally advance to completed
          status: a.status === 'confirmed' ? 'in-chair' : a.status
        };
      }
      return a;
    });
    onUpdateAppointments(updated);
  };

  // Handle slot block/unblock in schedule
  const handleToggleBlockSlot = (slot: string) => {
    const currentBlocked = schedule.blockedSlots[selectedDate] || [];
    let updatedForDate: string[];
    if (currentBlocked.includes(slot)) {
      updatedForDate = currentBlocked.filter(s => s !== slot);
    } else {
      updatedForDate = [...currentBlocked, slot];
    }

    const updatedSchedule: ScheduleConfig = {
      ...schedule,
      blockedSlots: {
        ...schedule.blockedSlots,
        [selectedDate]: updatedForDate
      }
    };
    onUpdateSchedule(updatedSchedule);
  };

  // Quick Walk-in form submit
  const handleAddWalkin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkinName.trim() || !walkinPhone.trim()) return;

    const srv = SERVICES.find(s => s.id === walkinService) || SERVICES[0];
    const doc = DOCTORS.find(d => d.id === walkinDoctor) || DOCTORS[0];

    const newAppt: Appointment = {
      id: `WALK-${Date.now().toString().slice(-5)}`,
      patientName: walkinName.trim(),
      patientPhone: walkinPhone.trim(),
      patientEmail: 'walkin@clinic.local',
      date: selectedDate,
      timeSlot: walkinSlot,
      doctorId: doc.id,
      doctorName: doc.name,
      serviceId: srv.id,
      serviceName: srv.title,
      status: 'confirmed',
      visitType: 'first-visit',
      symptoms: 'Direct clinic walk-in / receptionist booking',
      createdAt: new Date().toISOString()
    };

    onUpdateAppointments([newAppt, ...appointments]);
    setShowWalkinModal(false);
    setWalkinName('');
    setWalkinPhone('');
  };

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'in-chair':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-amber-600"></span>
            In Chair (Active)
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle className="w-3.5 h-3.5" />
            Completed
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-300">
            <Clock className="w-3.5 h-3.5" />
            Waiting / Scheduled
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
            <X className="w-3.5 h-3.5" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  // Schedule slot generator
  const allDaySlots = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM",
    "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
    "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM"
  ];

  return (
    <div className="space-y-6">
      
      {/* Doctor Header Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-900 to-cyan-950 text-white rounded-3xl p-6 shadow-xl border border-teal-700/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-teal-500/30 text-teal-200 border border-teal-400/30 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Doctor Clinic Portal
            </span>
            <span className="text-xs text-teal-300">Khadakpada, Kalyan West</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl mt-1 text-white">
            Welcome, {credentials.clientName}
          </h1>
          <p className="text-xs sm:text-sm text-teal-200/80 mt-0.5">
            Amazing Smile Dental Care • Schedule & Patient Record System
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowWalkinModal(true)}
            className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md flex items-center gap-1.5 transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Walk-in Visit</span>
          </button>
          <button
            onClick={onLogout}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Log Out of Doctor Portal"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'appointments'
                ? 'bg-teal-700 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <CalendarCheck2 className="w-4 h-4" />
            <span>Appointments & Clinical Notes</span>
            <span className="text-xs px-2 py-0.2 rounded-full bg-white/20">
              {totalVisits}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'schedule'
                ? 'bg-teal-700 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Manage Clinic Schedule</span>
          </button>
        </div>

        {/* Date Selector Switcher */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs">
          <button
            onClick={() => setSelectedDate(getRelativeDate(0))}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedDate === getRelativeDate(0)
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setSelectedDate(getRelativeDate(1))}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedDate === getRelativeDate(1)
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tomorrow
          </button>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-2 py-1 text-xs rounded-xl border border-slate-200 text-slate-700 font-semibold focus:outline-none"
          />
        </div>
      </div>

      {/* TAB 1: Appointments & Clinical Notes */}
      {activeTab === 'appointments' && (
        <div className="space-y-6">
          
          {/* DAILY VISITS SUMMARY METRICS CARD */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-teal-700">
                  Daily Visits Summary
                </div>
                <h3 className="font-heading font-extrabold text-xl text-slate-900">
                  Patient Visits for {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </h3>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Clinical Notes Logged: <strong className="text-teal-700">{notesRecordedCount} of {totalVisits}</strong>
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-[11px] font-bold text-slate-500 uppercase">Total Visits</div>
                <div className="font-heading font-extrabold text-2xl text-slate-900 mt-1">{totalVisits}</div>
                <div className="text-[10px] text-slate-400">Scheduled on date</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
                <div className="text-[11px] font-bold text-amber-800 uppercase flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping"></span>
                  In Chair
                </div>
                <div className="font-heading font-extrabold text-2xl text-amber-900 mt-1">{inChairVisits}</div>
                <div className="text-[10px] text-amber-700">Currently in operatory</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="text-[11px] font-bold text-emerald-800 uppercase">Completed</div>
                <div className="font-heading font-extrabold text-2xl text-emerald-900 mt-1">{completedVisits}</div>
                <div className="text-[10px] text-emerald-700">Treatments done</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200">
                <div className="text-[11px] font-bold text-teal-800 uppercase">Waiting / Next</div>
                <div className="font-heading font-extrabold text-2xl text-teal-900 mt-1">{waitingVisits}</div>
                <div className="text-[10px] text-teal-700">In reception lounge</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200">
                <div className="text-[11px] font-bold text-rose-800 uppercase">Cancelled</div>
                <div className="font-heading font-extrabold text-2xl text-rose-900 mt-1">{cancelledVisits}</div>
                <div className="text-[10px] text-rose-700">No-show / Rescheduled</div>
              </div>
            </div>

            {/* Daily Completion Progress Bar */}
            <div>
              <div className="flex justify-between text-xs text-slate-600 font-semibold mb-1">
                <span>Daily Consultation Progress</span>
                <span>{totalVisits > 0 ? Math.round(((completedVisits + inChairVisits) / totalVisits) * 100) : 0}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-500"
                  style={{
                    width: `${totalVisits > 0 ? ((completedVisits + inChairVisits) / totalVisits) * 100 : 0}%`
                  }}
                />
              </div>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search patient, phone, token, treatment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1">
              {['all', 'confirmed', 'in-chair', 'completed', 'cancelled'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                    statusFilter === st
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {st === 'all' ? 'All Visits' : st}
                </button>
              ))}
            </div>
          </div>

          {/* Appointments Table / Cards */}
          {filteredAppointments.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Calendar className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-slate-900 text-base">
                No Appointments Found for Selected Date & Filter
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                There are no scheduled visits matching this view. You can add a walk-in patient or check another date.
              </p>
              <button
                onClick={() => setShowWalkinModal(true)}
                className="px-4 py-2 bg-teal-600 text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Add Patient Visit
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAppointments.map((appt) => (
                <div
                  key={appt.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-teal-300 shadow-2xs hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  {/* Left: Time & Patient */}
                  <div className="flex items-start gap-4">
                    <div className="w-20 text-center py-2 px-1 rounded-xl bg-teal-50 border border-teal-100 shrink-0">
                      <div className="font-heading font-extrabold text-sm text-teal-900">
                        {appt.timeSlot}
                      </div>
                      <div className="text-[10px] text-teal-700 font-bold uppercase mt-0.5">
                        {appt.visitType.replace('-', ' ')}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-heading font-bold text-base text-slate-900">
                          {appt.patientName}
                        </h4>
                        <span className="text-xs text-slate-500 font-medium">
                          ({appt.age ? `${appt.age}y` : 'Adult'}, {appt.gender || 'Patient'})
                        </span>
                        {getStatusBadge(appt.status)}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                        <a
                          href={`tel:${appt.patientPhone}`}
                          className="flex items-center gap-1 font-semibold text-slate-800 hover:text-teal-700"
                        >
                          <Phone className="w-3.5 h-3.5 text-teal-600" />
                          <span>{appt.patientPhone}</span>
                        </a>
                        <span className="text-slate-300">•</span>
                        <span className="font-medium text-teal-800 bg-teal-50/80 px-2 py-0.5 rounded">
                          {appt.serviceName}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-500">Doctor: {appt.doctorName}</span>
                      </div>

                      {appt.symptoms && (
                        <p className="text-xs text-slate-500 italic line-clamp-1">
                          Reason/Symptoms: "{appt.symptoms}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: Actions & Clinical Notes Status */}
                  <div className="flex flex-wrap items-center gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    
                    {/* Status Toggles */}
                    {appt.status !== 'in-chair' && appt.status !== 'completed' && (
                      <button
                        onClick={() => handleUpdateStatus(appt.id, 'in-chair')}
                        className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-2xs transition-colors"
                        title="Move patient into operatory chair"
                      >
                        Start In-Chair
                      </button>
                    )}

                    {appt.status === 'in-chair' && (
                      <button
                        onClick={() => handleUpdateStatus(appt.id, 'completed')}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs transition-colors"
                      >
                        Mark Completed
                      </button>
                    )}

                    {/* Clinical Notes Button */}
                    <button
                      onClick={() => setSelectedAppointmentForNotes(appt)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border ${
                        appt.clinicalNotes
                          ? 'bg-teal-50 border-teal-300 text-teal-800 hover:bg-teal-100'
                          : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
                      <span>{appt.clinicalNotes ? 'View/Edit Clinical Note' : '+ Write Clinical Note'}</span>
                    </button>

                    {/* Cancel status */}
                    {appt.status !== 'cancelled' && (
                      <button
                        onClick={() => handleUpdateStatus(appt.id, 'cancelled')}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Cancel Appointment"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* TAB 2: Manage Clinic Schedule Directly */}
      {activeTab === 'schedule' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Clinic Schedule & Operating Slots
              </div>
              <h3 className="font-heading font-extrabold text-xl text-slate-900">
                Manage Consultation Hours & Slot Availability
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Directly configure shift times or click any time slot on {selectedDate} to block/unblock it.
              </p>
            </div>
          </div>

          {/* Shifts Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-slate-900">Morning Shift</div>
                <div className="text-xs text-slate-500">10:00 AM – 01:30 PM</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={schedule.morningShift.enabled}
                  onChange={(e) => {
                    onUpdateSchedule({
                      ...schedule,
                      morningShift: { ...schedule.morningShift, enabled: e.target.checked }
                    });
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-slate-900">Evening Shift</div>
                <div className="text-xs text-slate-500">05:00 PM – 09:30 PM</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={schedule.eveningShift.enabled}
                  onChange={(e) => {
                    onUpdateSchedule({
                      ...schedule,
                      eveningShift: { ...schedule.eveningShift, enabled: e.target.checked }
                    });
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>
          </div>

          {/* Interactive Slot Blocker for Selected Date */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Interactive Slot Blocker for {selectedDate}
              </label>
              <span className="text-[11px] text-slate-500">
                Click a slot to toggle between Available and Blocked (e.g. for doctor's lunch or surgery)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
              {allDaySlots.map((slot) => {
                const isBlocked = (schedule.blockedSlots[selectedDate] || []).includes(slot);
                const hasAppt = dateAppointments.some(a => a.timeSlot === slot && a.status !== 'cancelled');

                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => handleToggleBlockSlot(slot)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      isBlocked
                        ? 'bg-rose-50 border-rose-300 text-rose-800'
                        : hasAppt
                        ? 'bg-teal-50 border-teal-300 text-teal-800'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <div className="font-heading font-bold text-xs">{slot}</div>
                    <div className="text-[10px] mt-0.5 font-medium">
                      {isBlocked
                        ? 'Blocked (Click to free)'
                        : hasAppt
                        ? 'Patient Booked'
                        : 'Available (Click to block)'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* Clinical Notes Modal */}
      {selectedAppointmentForNotes && (
        <ClinicalNotesModal
          appointment={selectedAppointmentForNotes}
          isOpen={!!selectedAppointmentForNotes}
          onClose={() => setSelectedAppointmentForNotes(null)}
          onSaveNotes={handleSaveNotes}
        />
      )}

      {/* Walk-in Add Modal */}
      {showWalkinModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-heading font-bold text-lg text-slate-900">
                Register Walk-in / Urgent Patient
              </h3>
              <button onClick={() => setShowWalkinModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddWalkin} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Patient Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Shinde"
                  value={walkinName}
                  onChange={(e) => setWalkinName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98XXX XXXXX"
                  value={walkinPhone}
                  onChange={(e) => setWalkinPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Time Slot</label>
                  <select
                    value={walkinSlot}
                    onChange={(e) => setWalkinSlot(e.target.value)}
                    className="w-full px-2 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                  >
                    {allDaySlots.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Doctor</label>
                  <select
                    value={walkinDoctor}
                    onChange={(e) => setWalkinDoctor(e.target.value)}
                    className="w-full px-2 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                  >
                    {DOCTORS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Procedure</label>
                <select
                  value={walkinService}
                  onChange={(e) => setWalkinService(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                >
                  {SERVICES.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowWalkinModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md"
                >
                  Add to Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
