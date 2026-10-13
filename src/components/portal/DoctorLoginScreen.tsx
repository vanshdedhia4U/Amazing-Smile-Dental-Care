import React, { useState } from 'react';
import { Lock, User, Key, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { ClientCredentials } from '../../types/clinic';

interface DoctorLoginScreenProps {
  credentials: ClientCredentials;
  onLoginSuccess: () => void;
  onOpenDeveloperHub: () => void;
}

export const DoctorLoginScreen: React.FC<DoctorLoginScreenProps> = ({
  credentials,
  onLoginSuccess,
  onOpenDeveloperHub,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Check credentials configured by developer
    const matchesUserPass =
      username.trim().toLowerCase() === credentials.clientUsername.toLowerCase() &&
      password === credentials.clientPassword;

    const matchesPin = pin.trim() === credentials.clientPin && credentials.clientPin.length > 0;

    if (matchesUserPass || (pin && matchesPin)) {
      onLoginSuccess();
    } else {
      setError('Invalid doctor username or password. Please check with your system administrator.');
    }
  };

  const handleFillActiveCreds = () => {
    setUsername(credentials.clientUsername);
    setPassword(credentials.clientPassword);
    setPin(credentials.clientPin);
    setError(null);
  };

  return (
    <div className="max-w-md mx-auto my-6">
      
      {/* Clinic Logo Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-600 to-cyan-700 flex items-center justify-center text-white mx-auto shadow-lg shadow-teal-600/30 mb-3">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="font-heading font-extrabold text-2xl text-slate-900">
          Doctor Clinic Portal
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Amazing Smile Dental Care • Clinical Management
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
        
        {/* Helper preview bar */}
        <div className="bg-teal-50 border border-teal-200/80 rounded-2xl p-3 text-xs text-teal-900 flex items-center justify-between">
          <div>
            <span className="font-bold">Authorized Account:</span> {credentials.clientUsername}
          </div>
          <button
            type="button"
            onClick={handleFillActiveCreds}
            className="text-[11px] font-bold text-teal-700 bg-white px-2.5 py-1 rounded-lg border border-teal-300 hover:bg-teal-100 transition-colors"
          >
            Auto-fill
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Doctor Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                required
                placeholder="e.g. dr.manish"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required={!pin}
                placeholder="Enter doctor password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick PIN alternative */}
          <div className="pt-1">
            <div className="flex items-center gap-2 my-2">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-[10px] text-slate-400 uppercase font-bold">Or quick PIN</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <input
              type="text"
              maxLength={4}
              placeholder="4-digit chairside PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-center font-mono text-sm tracking-widest focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>Log In to Clinic Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            Encrypted Session
          </span>
          <button
            type="button"
            onClick={onOpenDeveloperHub}
            className="text-teal-700 font-bold hover:underline"
          >
            Developer Hub (Edit Credentials)
          </button>
        </div>

      </div>
    </div>
  );
};
