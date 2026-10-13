import React from 'react';
import { ShieldCheck, Star, Calendar, ArrowRight, Phone, CheckCircle2, Award, Sparkles, MapPin } from 'lucide-react';
import { CLINIC_INFO } from '../data/mockData';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/60 via-white to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/60">
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-teal-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-cyan-200/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 border border-teal-200 text-teal-800 text-xs sm:text-sm font-semibold tracking-wide shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-teal-600 animate-pulse"></span>
              <span>Khadakpada, Kalyan West • 12+ Years Clinical Excellence</span>
              <span className="hidden sm:inline text-teal-500">|</span>
              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center gap-1 text-teal-900 hover:underline"
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span className="font-bold">4.9</span> (148+ Google Reviews)
              </a>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Gentle, Painless Dentistry for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-700">
                Healthy, Confident Smiles.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Led by <strong className="text-slate-900 font-semibold">{CLINIC_INFO.leadDoctor}</strong> and{' '}
              <strong className="text-slate-900 font-semibold">{CLINIC_INFO.coDoctor}</strong>. Specialized in single-sitting painless root canals, world-class dental implants, smile design, and gentle family dental care.
            </p>

            {/* Key benefits list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Single-sitting painless root canals</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Hospital-grade Class-B autoclave hygiene</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Digital RVG instant low-dose X-rays</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Flexible evening slots until 9:30 PM</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-teal-600 via-teal-700 to-cyan-700 hover:from-teal-700 hover:to-cyan-800 text-white font-bold text-base px-7 py-4 rounded-xl shadow-lg shadow-teal-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#gallery"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base px-6 py-4 rounded-xl border border-slate-300 shadow-xs hover:border-teal-500 transition-colors"
              >
                <span>View Clinic Office</span>
                <span className="text-xs bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded-full">
                  6 Photos
                </span>
              </a>
            </div>

            {/* Emergency and direct call notice */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5 text-rose-600 font-semibold">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                Emergency Toothache?
              </span>
              <span>Direct Clinic Call:</span>
              <a
                href={`tel:${CLINIC_INFO.phone.replace(/[^0-9+]/g, '')}`}
                className="font-bold text-slate-800 hover:text-teal-700 underline"
              >
                {CLINIC_INFO.phone}
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Clinic Card */}
              <div className="rounded-3xl overflow-hidden bg-white p-3 shadow-2xl border border-slate-200/80">
                <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80"
                    alt="Amazing Smile Dental Care Clinic Operatory"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  {/* Floating Doctor Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md flex items-center gap-2">
                    <Award className="w-4 h-4 text-teal-600" />
                    <div>
                      <div className="text-[11px] font-bold text-slate-900 leading-tight">Dr. Manish Gangwani</div>
                      <div className="text-[9px] font-medium text-slate-500">BDS, MDS • 12+ Yrs Exp</div>
                    </div>
                  </div>

                  {/* Operatory feature tag */}
                  <div className="absolute top-3 right-3 bg-teal-800/90 text-white backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Sterile Operatory</span>
                  </div>

                  {/* Bottom details on image */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="font-heading font-bold text-lg text-white">
                      Modern Ergonomic Dental Suite
                    </div>
                    <p className="text-xs text-slate-200 line-clamp-1">
                      Equipped with digital intraoral sensors, ultrasonic scalers & shadowless surgical lamps.
                    </p>
                  </div>
                </div>

                {/* Micro info strip */}
                <div className="mt-4 grid grid-cols-3 gap-2 text-center pt-1 border-t border-slate-100">
                  <div className="p-2 rounded-xl bg-teal-50/70">
                    <div className="font-heading font-bold text-teal-800 text-lg sm:text-xl">15k+</div>
                    <div className="text-[11px] text-slate-600 font-medium">Patients Treated</div>
                  </div>
                  <div className="p-2 rounded-xl bg-cyan-50/70">
                    <div className="font-heading font-bold text-cyan-800 text-lg sm:text-xl">4.9 ★</div>
                    <div className="text-[11px] text-slate-600 font-medium">Google Rating</div>
                  </div>
                  <div className="p-2 rounded-xl bg-amber-50/70">
                    <div className="font-heading font-bold text-amber-800 text-lg sm:text-xl">100%</div>
                    <div className="text-[11px] text-slate-600 font-medium">Sterilization</div>
                  </div>
                </div>
              </div>

              {/* Floating review card */}
              <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-200 max-w-xs animate-fade-in">
                <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm shrink-0">
                  ★ 5.0
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">"Completely painless RCT!"</div>
                  <div className="text-[11px] text-slate-500">Kavita R. • Google Verified Review</div>
                </div>
              </div>

              {/* Landmark pill */}
              <div className="absolute -top-4 -right-4 hidden sm:flex items-center gap-2 bg-slate-900 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                <span>Near Union Bank Aarti Nagari</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
