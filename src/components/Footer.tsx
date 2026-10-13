import React from 'react';
import { Phone, MapPin, Clock, Mail, ShieldCheck, Lock, ExternalLink, Heart } from 'lucide-react';
import { CLINIC_INFO } from '../data/mockData';

interface FooterProps {
  onOpenPortal: (role?: 'developer' | 'client') => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPortal, onOpenBooking }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-900">
      
      {/* Upper CTA banner */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-cyan-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-teal-700/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="text-teal-300 font-bold text-xs uppercase tracking-wider">
              Experience Pain-Free Dental Care
            </span>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl mt-1 text-white">
              Ready for a Brighter, Healthier Smile?
            </h3>
            <p className="text-sm text-teal-100 max-w-xl mt-1">
              Book your consultation with Dr. Manish Gangwani or Dr. Bhriti Gangwani at Amazing Smile Dental Care in Kalyan West today.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3.5 rounded-xl bg-white text-teal-900 font-extrabold text-sm shadow-xl hover:bg-teal-50 transition-all hover:scale-105"
            >
              Book Appointment Now
            </button>
            <a
              href={`tel:${CLINIC_INFO.phone.replace(/[^0-9+]/g, '')}`}
              className="px-5 py-3.5 rounded-xl bg-teal-950/60 hover:bg-teal-950 text-white font-bold text-sm border border-teal-500/40 transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-teal-300" />
              <span>Call Clinic Helpline</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main footer columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Clinic Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
                AS
              </div>
              <div>
                <div className="font-heading font-extrabold text-lg text-white">
                  Amazing Smile
                </div>
                <div className="text-[10px] font-bold text-teal-400 uppercase tracking-wider -mt-1">
                  Dental Care • Kalyan West
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Premier multi-specialty dental clinic in Khadakpada, Kalyan West. Specializing in single-sitting rotary root canal treatments, implants, aesthetic veneers, and gentle dentistry.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>100% Hospital-Grade Autoclave Sterilization</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Treatments & Office
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-teal-400 transition-colors">
                  Painless Root Canal (RCT)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-400 transition-colors">
                  Ceramic Veneers & Smile Makeover
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-400 transition-colors">
                  Titanium Dental Implants
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-400 transition-colors">
                  Clear Aligners & Invisible Braces
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  <span>Clinic Office & Operatory Gallery</span>
                  <span className="text-[10px] bg-teal-900 text-teal-300 px-1.5 py-0.2 rounded font-bold">Photos</span>
                </a>
              </li>
              <li>
                <a href="#doctors" className="hover:text-teal-400 transition-colors">
                  Meet Dr. Manish & Dr. Bhriti Gangwani
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Clinic Hours & Location */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Consultation Hours
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-900 pb-1">
                <span>Morning Shift:</span>
                <span className="text-white font-medium">10:00 AM – 1:30 PM</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 pb-1">
                <span>Evening Shift:</span>
                <span className="text-white font-medium">5:00 PM – 9:30 PM</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 pb-1">
                <span>Sundays:</span>
                <span className="text-teal-300 font-medium">By Prior Appointment</span>
              </div>
            </div>

            <div className="pt-2 text-xs">
              <div className="text-slate-400 flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <span>Near Union Bank Aarti Nagari, Khadakpada, Kalyan West 421301</span>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Portal Gateway */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Contact & Portal
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-500 block">Clinic Contact:</span>
                <a href={`tel:${CLINIC_INFO.phone}`} className="text-white font-bold hover:text-teal-300">
                  {CLINIC_INFO.phone}
                </a>
              </div>
              <div>
                <span className="text-slate-500 block">Email Inquiries:</span>
                <span className="text-slate-300">{CLINIC_INFO.email}</span>
              </div>
              <div className="pt-1">
                <a
                  href={CLINIC_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-teal-400 hover:text-teal-300 font-semibold"
                >
                  <span>Google Maps Listing</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Admin Portal Gateway Button */}
            <div className="pt-3">
              <button
                onClick={() => onOpenPortal('client')}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Lock className="w-3.5 h-3.5 text-teal-400" />
                <span>Doctor / Admin Clinic Portal</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div>
            © {new Date().getFullYear()} Amazing Smile Dental Care. All rights reserved. Dr. Manish Gangwani & Dr. Bhriti Gangwani.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenPortal('developer')}
              className="text-slate-400 hover:text-teal-300 underline"
            >
              Developer Access & Credentials Setup
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
