import React from 'react';
import { Phone, Calendar, ShieldCheck, MapPin, Clock, Menu, X, Lock } from 'lucide-react';
import { CLINIC_INFO } from '../data/mockData';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenPortal: (targetMode?: 'developer' | 'client') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenPortal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top micro banner */}
      <div className="bg-teal-700 text-teal-50 px-4 py-1.5 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-teal-300" />
              Khadakpada, Kalyan West (Near Union Bank Aarti Nagari)
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-teal-300" />
              Mon-Sat: 10:00 AM - 1:30 PM & 5:00 PM - 9:30 PM
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${CLINIC_INFO.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-1 text-teal-100 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-teal-300" />
              <span className="font-semibold">{CLINIC_INFO.phone}</span>
            </a>
            <span className="text-teal-400">|</span>
            <span className="bg-teal-800/80 px-2 py-0.5 rounded text-[11px] font-semibold text-amber-300 flex items-center gap-1">
              ★ 4.9 on Google Maps
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-700 flex items-center justify-center text-white shadow-md shadow-teal-600/20 group-hover:scale-105 transition-transform">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.5 2 6 4.5 6 8c0 3 1.5 5.5 3 8 1 1.7 1.5 4 3 4s2-2.3 3-4c1.5-2.5 3-5 3-8 0-3.5-2.5-6-6-6z" />
                <path d="M10 8c0 .5.5 1 2 1s2-.5 2-1" />
              </svg>
            </div>
            <div>
              <div className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
                Amazing Smile
              </div>
              <div className="text-xs font-semibold tracking-wider text-teal-700 uppercase -mt-0.5 flex items-center gap-1">
                <span>Dental Care</span>
                <span className="inline-block w-1 h-1 rounded-full bg-teal-500"></span>
                <span className="text-slate-500 font-normal">Kalyan West</span>
              </div>
            </div>
          </a>

          {/* Desktop Nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            <a href="#services" className="hover:text-teal-700 transition-colors">
              Treatments
            </a>
            <a href="#gallery" className="hover:text-teal-700 transition-colors flex items-center gap-1">
              <span>Office Gallery</span>
              <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full">Tour</span>
            </a>
            <a href="#doctors" className="hover:text-teal-700 transition-colors">
              Our Doctors
            </a>
            <a href="#reviews" className="hover:text-teal-700 transition-colors">
              Patient Reviews
            </a>
            <a href="#location" className="hover:text-teal-700 transition-colors">
              Location & Hours
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenPortal('client')}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors"
              title="Access Doctor / Admin Clinic Portal"
            >
              <Lock className="w-3.5 h-3.5 text-teal-600" />
              <span>Clinic Portal</span>
            </button>

            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-md shadow-teal-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="p-2 rounded-lg bg-teal-600 text-white text-xs font-semibold"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-2 text-base font-medium text-slate-800">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-teal-700"
            >
              Treatments & Services
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-teal-700 flex items-center justify-between"
            >
              <span>Clinic Office Gallery</span>
              <span className="text-xs bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-bold">Photos</span>
            </a>
            <a
              href="#doctors"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-teal-700"
            >
              Meet Dr. Manish & Dr. Bhriti
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-teal-700"
            >
              Google Reviews (4.9★)
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-teal-700"
            >
              Clinic Directions & Timings
            </a>
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 bg-teal-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-md shadow-teal-600/20"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment Now
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal('client');
              }}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 border border-slate-300"
            >
              <Lock className="w-4 h-4 text-teal-700" />
              Doctor & Admin Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
