import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  FileText,
  Printer,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  MapPin
} from 'lucide-react';
import { SERVICES, DOCTORS, CLINIC_INFO, getRelativeDate } from '../data/mockData';
import { Appointment, ScheduleConfig, VisitType } from '../types/clinic';
import { generateAvailableSlots } from '../utils/storage';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedServiceId?: string;
  preSelectedDoctorId?: string;
  scheduleConfig: ScheduleConfig;
  existingAppointments: Appointment[];
  onAppointmentBooked: (newAppointment: Appointment) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedServiceId,
  preSelectedDoctorId,
  scheduleConfig,
  existingAppointments,
  onAppointmentBooked,
}) => {
  const [step, setStep] = useState<number>(1);

  // Form State
  const [serviceId, setServiceId] = useState<string>(preSelectedServiceId || SERVICES[0].id);
  const [doctorId, setDoctorId] = useState<string>(preSelectedDoctorId || 'dr-manish');
  const [date, setDate] = useState<string>(getRelativeDate(0));
  const [timeSlot, setTimeSlot] = useState<string>('');
  
  // Patient details
  const [patientName, setPatientName] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [age, setAge] = useState<string>('28');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [visitType, setVisitType] = useState<VisitType>('first-visit');
  const [symptoms, setSymptoms] = useState<string>('');

  // Confirmation state
  const [confirmedAppt, setConfirmedAppt] = useState<Appointment | null>(null);

  // Sync if props change
  React.useEffect(() => {
    if (preSelectedServiceId) setServiceId(preSelectedServiceId);
    if (preSelectedDoctorId) setDoctorId(preSelectedDoctorId);
  }, [preSelectedServiceId, preSelectedDoctorId]);

  if (!isOpen) return null;

  const selectedService = SERVICES.find((s) => s.id === serviceId) || SERVICES[0];
  const selectedDoctor = DOCTORS.find((d) => d.id === doctorId) || DOCTORS[0];

  // Slot calculations
  const slotsData = generateAvailableSlots(date, scheduleConfig, existingAppointments, doctorId);

  const handleNextFromStep1 = () => {
    setStep(2);
  };

  const handleNextFromStep2 = () => {
    if (!timeSlot) return;
    setStep(3);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) return;

    const newAppt: Appointment = {
      id: `APT-${Date.now().toString().slice(-6)}`,
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      patientEmail: patientEmail.trim() || `${patientName.toLowerCase().replace(/\s+/g, '')}@patient.care`,
      age: parseInt(age, 10) || 30,
      gender,
      date,
      timeSlot,
      doctorId,
      doctorName: selectedDoctor.name,
      serviceId,
      serviceName: selectedService.title,
      status: 'confirmed',
      visitType,
      symptoms: symptoms.trim() || 'General dental consultation & checkup',
      createdAt: new Date().toISOString(),
    };

    onAppointmentBooked(newAppt);
    setConfirmedAppt(newAppt);
    setStep(4);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-fade-in my-8">
        
        {/* Modal Top Bar */}
        <div className="bg-gradient-to-r from-teal-700 to-cyan-800 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-teal-200">
              Online Appointment System
            </div>
            <h3 className="font-heading font-bold text-lg">
              Amazing Smile Dental Care
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step < 4 && (
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className={step >= 1 ? 'text-teal-700 font-bold' : 'text-slate-400'}>
                1. Service & Doctor
              </span>
              <span className="text-slate-300">→</span>
              <span className={step >= 2 ? 'text-teal-700 font-bold' : 'text-slate-400'}>
                2. Date & Time
              </span>
              <span className="text-slate-300">→</span>
              <span className={step >= 3 ? 'text-teal-700 font-bold' : 'text-slate-400'}>
                3. Patient Details
              </span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6">
          
          {/* STEP 1: Service & Doctor Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Select Treatment / Reason for Visit
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
                  {SERVICES.map((srv) => (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => setServiceId(srv.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        serviceId === srv.id
                          ? 'border-teal-600 bg-teal-50/80 ring-2 ring-teal-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="font-heading font-bold text-xs sm:text-sm text-slate-900">
                          {srv.title}
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {srv.description}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[11px]">
                        <span className="text-teal-700 font-semibold">{srv.duration}</span>
                        <span className="text-slate-700 font-bold">{srv.priceRange}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Select Preferred Doctor
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DOCTORS.map((doc) => (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => setDoctorId(doc.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all flex items-center gap-3 ${
                        doctorId === doc.id
                          ? 'border-teal-600 bg-teal-50/80 ring-2 ring-teal-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <div className="font-heading font-bold text-sm text-slate-900">
                          {doc.name}
                        </div>
                        <div className="text-[11px] text-teal-700 font-medium">
                          {doc.title}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {doc.experience}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextFromStep1}
                  className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-md flex items-center gap-2"
                >
                  <span>Continue to Date & Time</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Date & Slot Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase">Selected Doctor & Treatment</div>
                  <div className="font-heading font-bold text-sm text-slate-900">
                    {selectedDoctor.name} • {selectedService.title}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-teal-700 font-bold hover:underline"
                >
                  Change
                </button>
              </div>

              {/* Date selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Choose Appointment Date
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {[0, 1, 2, 3, 4].map((offset) => {
                    const dStr = getRelativeDate(offset);
                    const dateObj = new Date(dStr + 'T00:00:00');
                    const dayLabel = offset === 0 ? 'Today' : offset === 1 ? 'Tomorrow' : dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                    const dateNum = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });

                    return (
                      <button
                        key={dStr}
                        type="button"
                        onClick={() => {
                          setDate(dStr);
                          setTimeSlot('');
                        }}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex flex-col items-center border transition-all ${
                          date === dStr
                            ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-[10px] opacity-80">{dayLabel}</span>
                        <span className="font-bold">{dateNum}</span>
                      </button>
                    );
                  })}
                  
                  {/* Custom date input */}
                  <div className="flex items-center">
                    <input
                      type="date"
                      value={date}
                      min={getRelativeDate(0)}
                      onChange={(e) => {
                        setDate(e.target.value);
                        setTimeSlot('');
                      }}
                      className="px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Slots */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Available Time Slots ({date})
                </label>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-52 overflow-y-auto pr-1">
                  {slotsData.map((slotItem) => {
                    const isSelectable = !slotItem.isBooked && !slotItem.isBlocked;
                    const isSelected = timeSlot === slotItem.slot;

                    return (
                      <button
                        key={slotItem.slot}
                        type="button"
                        disabled={!isSelectable}
                        onClick={() => setTimeSlot(slotItem.slot)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-semibold transition-all border text-center ${
                          isSelected
                            ? 'bg-teal-600 text-white border-teal-600 shadow-md ring-2 ring-teal-500/30'
                            : isSelectable
                            ? 'bg-white hover:bg-teal-50 text-slate-800 border-slate-200 hover:border-teal-400'
                            : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-60'
                        }`}
                      >
                        <div>{slotItem.slot}</div>
                        <div className="text-[9px] font-normal">
                          {slotItem.isBooked
                            ? 'Booked'
                            : slotItem.isBlocked
                            ? 'Unavailable'
                            : 'Available'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  disabled={!timeSlot}
                  onClick={handleNextFromStep2}
                  className={`px-6 py-2.5 rounded-xl font-semibold text-xs shadow-md flex items-center gap-2 ${
                    timeSlot
                      ? 'bg-teal-600 hover:bg-teal-700 text-white'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>Continue with {timeSlot || 'Slot'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Patient Information Form */}
          {step === 3 && (
            <form onSubmit={handleSubmitBooking} className="space-y-4">
              <div className="bg-teal-50 p-3 rounded-xl border border-teal-200/80 text-xs text-teal-900 flex items-center justify-between">
                <div>
                  <span className="font-bold">{date} at {timeSlot}</span> with{' '}
                  <span className="font-bold">{selectedDoctor.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-teal-700 font-bold hover:underline"
                >
                  Change Slot
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Patient Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kadam"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number (SMS / WhatsApp) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98XXX XXXXX"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      placeholder="patient@example.com"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Age</label>
                    <input
                      type="number"
                      min="3"
                      max="105"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="w-full px-2 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Visit Category
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'first-visit', label: 'First Visit' },
                    { id: 'routine-checkup', label: 'Routine Check' },
                    { id: 'emergency', label: 'Pain / Emergency' },
                  ].map((vt) => (
                    <button
                      key={vt.id}
                      type="button"
                      onClick={() => setVisitType(vt.id as VisitType)}
                      className={`p-2 rounded-lg border text-center font-medium ${
                        visitType === vt.id
                          ? 'bg-teal-50 border-teal-600 text-teal-800 font-bold'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      {vt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Describe Symptoms or Specific Dental Issues (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Sensitivity to cold drinks, pain while biting, bleeding gums..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Appointment</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success & Confirmation Slip */}
          {step === 4 && confirmedAppt && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Confirmed & Scheduled
                </span>
                <h3 className="font-heading font-extrabold text-2xl text-slate-900 mt-2">
                  Appointment Booked Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  A confirmation summary has been registered in the clinic schedule. Please arrive 10 minutes prior to your slot.
                </p>
              </div>

              {/* Digital Slip Card */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left space-y-3.5 max-w-lg mx-auto">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Booking Token</div>
                    <div className="font-heading font-extrabold text-teal-800 text-base">{confirmedAppt.id}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Status</div>
                    <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Confirmed
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Patient Name</span>
                    <strong className="text-slate-800">{confirmedAppt.patientName}</strong> ({confirmedAppt.age}y, {confirmedAppt.gender})
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Mobile</span>
                    <strong className="text-slate-800">{confirmedAppt.patientPhone}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Doctor</span>
                    <strong className="text-slate-800">{confirmedAppt.doctorName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Treatment</span>
                    <strong className="text-slate-800">{confirmedAppt.serviceName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Date</span>
                    <strong className="text-slate-800">{confirmedAppt.date}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Time Slot</span>
                    <strong className="text-slate-800">{confirmedAppt.timeSlot}</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <span>{CLINIC_INFO.address}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrintSlip}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Slip</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
