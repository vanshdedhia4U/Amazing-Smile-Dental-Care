import React, { useState } from 'react';
import {
  X,
  FileText,
  Save,
  Printer,
  Plus,
  Trash2,
  CheckCircle2,
  User,
  Calendar,
  Clock,
  Sparkles,
  Stethoscope
} from 'lucide-react';
import { Appointment, ClinicalNote } from '../../types/clinic';
import { CLINIC_INFO } from '../../data/mockData';

interface ClinicalNotesModalProps {
  appointment: Appointment;
  isOpen: boolean;
  onClose: () => void;
  onSaveNotes: (appointmentId: string, updatedNotes: ClinicalNote) => void;
}

export const ClinicalNotesModal: React.FC<ClinicalNotesModalProps> = ({
  appointment,
  isOpen,
  onClose,
  onSaveNotes,
}) => {
  const existing = appointment.clinicalNotes;

  const [chiefComplaint, setChiefComplaint] = useState(
    existing?.chiefComplaint || appointment.symptoms || ''
  );
  const [examinationFindings, setExaminationFindings] = useState(
    existing?.examinationFindings || ''
  );
  const [diagnosis, setDiagnosis] = useState(
    existing?.diagnosis || appointment.serviceName || ''
  );
  const [treatmentDone, setTreatmentDone] = useState(
    existing?.treatmentDone || ''
  );
  const [prescriptions, setPrescriptions] = useState<Array<{
    medicine: string;
    dosage: string;
    frequency: string;
    duration: string;
  }>>(
    existing?.prescriptions || [
      { medicine: 'Tab. Zerodol-SP', dosage: '1 tab', frequency: 'Twice daily (after food)', duration: '3 days' }
    ]
  );
  const [nextVisitDate, setNextVisitDate] = useState(
    existing?.nextVisitDate || ''
  );
  const [advice, setAdvice] = useState(
    existing?.advice || 'Maintain good oral hygiene. Warm saline rinses 3 times a day.'
  );
  const [doctorSignature, setDoctorSignature] = useState(
    existing?.doctorSignature || `${appointment.doctorName} (MDS)`
  );

  const [isSavedNotice, setIsSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleAddMedicine = () => {
    setPrescriptions([
      ...prescriptions,
      { medicine: '', dosage: '1 tab', frequency: 'Twice daily', duration: '3 days' }
    ]);
  };

  const handleRemoveMedicine = (idx: number) => {
    setPrescriptions(prescriptions.filter((_, i) => i !== idx));
  };

  const handleUpdateMedicine = (idx: number, field: string, val: string) => {
    const updated = [...prescriptions];
    (updated[idx] as any)[field] = val;
    setPrescriptions(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedNote: ClinicalNote = {
      chiefComplaint,
      examinationFindings,
      diagnosis,
      treatmentDone,
      prescriptions,
      nextVisitDate,
      advice,
      updatedAt: new Date().toISOString(),
      doctorSignature
    };
    onSaveNotes(appointment.id, updatedNote);
    setIsSavedNotice(true);
    setTimeout(() => {
      setIsSavedNotice(false);
      onClose();
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col my-4">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-teal-800 to-cyan-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-teal-300">
                Electronic Dental Record & Clinical Notes
              </div>
              <h3 className="font-heading font-bold text-lg">
                Patient: {appointment.patientName} ({appointment.age || '30'}y, {appointment.gender || 'Patient'})
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Patient visit meta bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2 shrink-0">
          <div className="flex items-center gap-4">
            <span><strong>Token:</strong> {appointment.id}</span>
            <span><strong>Date:</strong> {appointment.date} ({appointment.timeSlot})</span>
            <span><strong>Doctor:</strong> {appointment.doctorName}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="capitalize px-2 py-0.5 rounded-full text-[11px] font-bold bg-teal-100 text-teal-800">
              {appointment.serviceName}
            </span>
          </div>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSave} className="overflow-y-auto p-6 space-y-5 flex-1">
          
          {isSavedNotice && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Clinical notes and prescription updated successfully!</span>
            </div>
          )}

          {/* Chief Complaint & Findings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Chief Complaint & History
              </label>
              <textarea
                rows={3}
                required
                value={chiefComplaint}
                onChange={(e) => setChiefComplaint(e.target.value)}
                placeholder="e.g. Throbbing pain in tooth 46, sensitivity to cold..."
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Clinical & Radiographic Findings
              </label>
              <textarea
                rows={3}
                value={examinationFindings}
                onChange={(e) => setExaminationFindings(e.target.value)}
                placeholder="e.g. Deep carious involvement with pulpal exposure. Percussion positive..."
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Diagnosis & Treatment Performed */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Working Clinical Diagnosis
              </label>
              <input
                type="text"
                required
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="e.g. Irreversible Pulpitis #46"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Next Follow-Up Date
              </label>
              <input
                type="date"
                value={nextVisitDate}
                onChange={(e) => setNextVisitDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
              Treatment Procedure Performed Today
            </label>
            <textarea
              rows={2}
              required
              value={treatmentDone}
              onChange={(e) => setTreatmentDone(e.target.value)}
              placeholder="e.g. Chemo-mechanical preparation done under rubber dam isolation. Canals irrigated with 3% NaOCl..."
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Prescriptions */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/60">
            <div className="flex items-center justify-between mb-3">
              <div className="font-heading font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <span>Rx - Medicines Prescribed</span>
                <span className="text-teal-700 font-semibold">({prescriptions.length})</span>
              </div>
              <button
                type="button"
                onClick={handleAddMedicine}
                className="px-2.5 py-1 bg-white hover:bg-teal-50 text-teal-700 border border-teal-300 rounded-lg text-xs font-bold flex items-center gap-1 shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Medicine</span>
              </button>
            </div>

            <div className="space-y-2">
              {prescriptions.map((rx, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200">
                  <input
                    type="text"
                    placeholder="Medicine Name (e.g. Tab. Zerodol-SP)"
                    value={rx.medicine}
                    onChange={(e) => handleUpdateMedicine(idx, 'medicine', e.target.value)}
                    className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-teal-500 w-full font-medium"
                  />
                  <input
                    type="text"
                    placeholder="Dosage (1 tab)"
                    value={rx.dosage}
                    onChange={(e) => handleUpdateMedicine(idx, 'dosage', e.target.value)}
                    className="w-full sm:w-24 px-2 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-teal-500"
                  />
                  <input
                    type="text"
                    placeholder="Frequency (Twice daily)"
                    value={rx.frequency}
                    onChange={(e) => handleUpdateMedicine(idx, 'frequency', e.target.value)}
                    className="w-full sm:w-36 px-2 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-teal-500"
                  />
                  <input
                    type="text"
                    placeholder="Duration (3 days)"
                    value={rx.duration}
                    onChange={(e) => handleUpdateMedicine(idx, 'duration', e.target.value)}
                    className="w-full sm:w-24 px-2 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-teal-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveMedicine(idx)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Advice & Signature */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Post-Treatment Advice to Patient
              </label>
              <textarea
                rows={2}
                value={advice}
                onChange={(e) => setAdvice(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Attending Doctor Signature / Stamp
              </label>
              <input
                type="text"
                value={doctorSignature}
                onChange={(e) => setDoctorSignature(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Stamp: Amazing Smile Dental Care, Gol Maidan, Sidhi Vinayak Nagar, Ulhasnagar
              </p>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print Prescription Slip</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Clinical Record</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
