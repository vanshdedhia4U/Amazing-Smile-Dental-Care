import React, { useState } from 'react';
import {
  KeyRound,
  ShieldAlert,
  Save,
  Copy,
  Check,
  Eye,
  EyeOff,
  RefreshCw,
  UserCheck,
  Lock,
  Sparkles,
  Info
} from 'lucide-react';
import { ClientCredentials } from '../../types/clinic';

interface DeveloperCredentialsManagerProps {
  credentials: ClientCredentials;
  onUpdateCredentials: (newCreds: ClientCredentials) => void;
  onSwitchToDoctorLogin: () => void;
}

export const DeveloperCredentialsManager: React.FC<DeveloperCredentialsManagerProps> = ({
  credentials,
  onUpdateCredentials,
  onSwitchToDoctorLogin,
}) => {
  const [form, setForm] = useState<ClientCredentials>({ ...credentials });
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleGeneratePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%';
    let pass = 'Smile';
    for (let i = 0; i < 6; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    pass += '2026!';
    setForm(prev => ({ ...prev, clientPassword: pass }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...form,
      lastUpdated: new Date().toISOString()
    };
    onUpdateCredentials(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleCopyShareableText = () => {
    const shareText = `Amazing Smile Dental Care - Doctor Clinic Portal Access Details:\n\nPortal URL: ${window.location.origin}\nDoctor Username: ${form.clientUsername}\nTemporary Password: ${form.clientPassword}\nQuick Access PIN: ${form.clientPin}\n\nPlease keep these credentials confidential.`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Developer Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-teal-500/10 blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center shrink-0">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-1">
                <ShieldAlert className="w-3 h-3" />
                Developer Master Control
              </div>
              <h2 className="font-heading font-extrabold text-2xl text-white">
                Client Credentials Management
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Only you (the developer/agency) can configure and issue login credentials. Your client (Dr. Manish) uses these to access their appointments & schedule.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyShareableText}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Details!' : 'Copy to Send Client'}</span>
            </button>
            <button
              onClick={onSwitchToDoctorLogin}
              className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Test Doctor Login View</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Credentials Form */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
        
        {savedSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fade-in">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Client credentials have been updated and stored securely! The doctor can now log in using these new details.</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Client Username */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Doctor's Login Username *
            </label>
            <input
              type="text"
              required
              value={form.clientUsername}
              onChange={(e) => setForm({ ...form, clientUsername: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-mono text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              The doctor enters this username at the login gate.
            </p>
          </div>

          {/* Client Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Doctor's Password *
              </label>
              <button
                type="button"
                onClick={handleGeneratePassword}
                className="text-[11px] text-teal-700 hover:text-teal-800 font-bold flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Generate Random</span>
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={form.clientPassword}
                onChange={(e) => setForm({ ...form, clientPassword: e.target.value })}
                className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-300 font-mono text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Minimum 8 characters. Must contain letters & symbols.
            </p>
          </div>

          {/* Quick PIN */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              4-Digit Quick Unlock PIN
            </label>
            <input
              type="text"
              maxLength={4}
              value={form.clientPin}
              onChange={(e) => setForm({ ...form, clientPin: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-mono text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Optional shortcut PIN for clinic chairside access.
            </p>
          </div>

          {/* Doctor Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Doctor Display Name
            </label>
            <input
              type="text"
              value={form.clientName}
              onChange={(e) => setForm({ ...form, clientName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Appears on the doctor's greeting & clinical notes.
            </p>
          </div>

          {/* Doctor Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Doctor Contact Email
            </label>
            <input
              type="email"
              value={form.clientEmail}
              onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Clinic Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Clinic Organization Name
            </label>
            <input
              type="text"
              value={form.clinicName}
              onChange={(e) => setForm({ ...form, clinicName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

        </div>

        {/* Client Permissions */}
        <div className="pt-4 border-t border-slate-200">
          <div className="font-heading font-bold text-slate-900 text-sm mb-3">
            Doctor Dashboard Permissions (Client Access Boundaries)
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.allowScheduleOverride}
                onChange={(e) => setForm({ ...form, allowScheduleOverride: e.target.checked })}
                className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
              />
              <span className="text-xs sm:text-sm text-slate-700 font-medium">
                Allow Client to modify clinic schedule & block/unblock time slots directly
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.allowClinicalNotesExport}
                onChange={(e) => setForm({ ...form, allowClinicalNotesExport: e.target.checked })}
                className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
              />
              <span className="text-xs sm:text-sm text-slate-700 font-medium">
                Allow Client to print and export patient clinical notes & prescriptions
              </span>
            </label>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500">
            Last updated by developer: {new Date(credentials.lastUpdated).toLocaleString()}
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save & Apply Client Credentials</span>
          </button>
        </div>

      </form>

      {/* Safety Notice */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Role Protection Guarantee: </span>
          The client cannot access this configuration panel. When the client logs into the portal using the credentials above, they are routed strictly to the Doctor Clinic Dashboard where they can only see appointments, write clinical notes, and manage their working schedule.
        </div>
      </div>

    </div>
  );
};
