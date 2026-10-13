import React from 'react';
import { MapPin, Clock, Phone, Navigation, ExternalLink, Calendar, Mail, CheckCircle2 } from 'lucide-react';
import { CLINIC_INFO } from '../data/mockData';

interface LocationSectionProps {
  onOpenBooking: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="location" className="py-20 bg-slate-50/70 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Visit Amazing Smile Dental Care</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Conveniently Located at Gol Maidan, Ulhasnagar
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Easily accessible via auto-rickshaws, city buses, or personal car with nearby parking space.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Info cards (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Address Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-teal-700">Official Clinic Location</div>
                  <h3 className="font-heading font-extrabold text-slate-900 text-lg">
                    {CLINIC_INFO.name}
                  </h3>
                  
                  {/* Detailed address layout */}
                  <div className="mt-2 text-sm text-slate-700 font-medium leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <div className="font-bold text-slate-900 text-base">
                      Gol Maidan, Sidhi Vinayak Nagar
                    </div>
                    <div className="text-slate-600 mt-0.5">
                      Ulhasnagar, Maharashtra
                    </div>
                    <div className="text-slate-600">
                      Pincode: <strong>421002</strong>
                    </div>
                  </div>

                  {/* Landmark chip */}
                  <div className="mt-3 text-xs font-medium text-teal-900 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200/80 flex items-center gap-1.5">
                    <span className="font-bold text-teal-800">Landmark:</span>
                    <span>Near Gol Maidan, Sidhi Vinayak Nagar</span>
                  </div>

                  {/* Address attribute pills */}
                  <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                    <div className="bg-slate-100 p-2 rounded-lg">
                      <span className="text-slate-400 block text-[9px] uppercase font-bold">Area / Landmark</span>
                      <strong className="text-slate-900">Gol Maidan</strong>
                    </div>
                    <div className="bg-slate-100 p-2 rounded-lg">
                      <span className="text-slate-400 block text-[9px] uppercase font-bold">City & Pincode</span>
                      <strong className="text-slate-900">Ulhasnagar – 421002</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                <a
                  href={CLINIC_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-xs transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Navigate via Google Maps</span>
                </a>
              </div>
            </div>

            {/* Timings Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-700 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-slate-900 text-base">
                    Clinic Consultation Timings
                  </h3>
                  <div className="mt-2 space-y-1.5 text-xs sm:text-sm text-slate-600">
                    <div className="flex justify-between font-medium">
                      <span>Morning Shift:</span>
                      <span className="font-bold text-slate-900">10:00 AM – 01:30 PM</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Evening Shift:</span>
                      <span className="font-bold text-slate-900">05:00 PM – 09:30 PM</span>
                    </div>
                    <div className="flex justify-between text-slate-500 pt-1 border-t border-slate-100 text-xs">
                      <span>Sundays:</span>
                      <span className="text-teal-700 font-semibold">10:30 AM – 01:30 PM (Prior Appt Only)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Helpline Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-slate-900 text-base">
                    Doctor & Reception Contact
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Call for same-day walk-in confirmation or emergency advice.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href={`tel:${CLINIC_INFO.phone.replace(/[^0-9+]/g, '')}`}
                      className="px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{CLINIC_INFO.phone}</span>
                    </a>
                    <a
                      href={`https://wa.me/919845442734?text=Hello%20Amazing%20Smile%20Dental%20Care,%20I%20would%20like%20to%20inquire%20about%20a%20dental%20appointment.`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <span>WhatsApp Chat</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Map Visual (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-md">
            
            {/* Embedded interactive map visual preview */}
            <div className="relative rounded-2xl overflow-hidden h-80 sm:h-96 bg-slate-100 border border-slate-200 group">
              <iframe
                title="Amazing Smile Dental Care Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.883713063548!2d73.1583!3d19.2366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7958fdf7bd6af%3A0x11e71f133cb8a566!2sAmazing%20Smile%20Dental%20Care!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter grayscale-0 contrast-105"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating Pin Card overlay */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-200 max-w-xs pointer-events-none">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                    AS
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">Amazing Smile Dental Care</div>
                    <div className="text-[10px] text-teal-700 font-medium">Ulhasnagar • 4.9 ★ Rating</div>
                  </div>
                </div>
              </div>

              {/* Bottom direct button */}
              <div className="absolute bottom-4 right-4">
                <a
                  href={CLINIC_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white/95 hover:bg-white text-slate-900 font-bold text-xs px-4 py-2 rounded-xl shadow-lg border border-slate-200 flex items-center gap-1.5 transition-transform hover:scale-105"
                >
                  <span>Open in Google Maps App</span>
                  <ExternalLink className="w-3.5 h-3.5 text-teal-600" />
                </a>
              </div>
            </div>

            {/* Transportation tips */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="font-bold text-slate-900 mb-0.5">By Auto / Cab</div>
                <div>Minutes away from Ulhasnagar Railway Station via Gol Maidan main road.</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="font-bold text-slate-900 mb-0.5">By Bus / Transit</div>
                <div>Frequent auto-rickshaws and local transit connect to Gol Maidan & Sidhi Vinayak Nagar.</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="font-bold text-slate-900 mb-0.5">Parking</div>
                <div>Convenient roadside and complex parking available for two & four wheelers.</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
