import React, { useState } from 'react';
import {
  Activity,
  Sparkles,
  ShieldCheck,
  Smile,
  Sun,
  HeartPulse,
  Scissors,
  Baby,
  Clock,
  ArrowRight,
  Check
} from 'lucide-react';
import { SERVICES } from '../data/mockData';
import { Service } from '../types/clinic';

interface ServicesSectionProps {
  onSelectServiceToBook: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceToBook }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Restorative', 'Cosmetic', 'Orthodontic', 'Surgical', 'General'];

  const filteredServices = activeCategory === 'All'
    ? SERVICES
    : SERVICES.filter(s => s.category === activeCategory);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-6 h-6 text-teal-600" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-amber-500" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-cyan-600" />;
      case 'Smile': return <Smile className="w-6 h-6 text-teal-600" />;
      case 'Sun': return <Sun className="w-6 h-6 text-amber-500" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6 text-rose-500" />;
      case 'Scissors': return <Scissors className="w-6 h-6 text-slate-700" />;
      case 'Baby': return <Baby className="w-6 h-6 text-indigo-500" />;
      default: return <Smile className="w-6 h-6 text-teal-600" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-50/70 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Specialized Clinical Treatments</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Dental Care Under One Roof
          </h2>
          <p className="mt-3 text-base text-slate-600">
            From emergency toothache relief to complete smile makeovers, our clinic is equipped with the latest diagnostic and micro-endodontic technology.
          </p>

          {/* Filter tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-teal-400 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {service.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-400 text-slate-950 font-extrabold text-[10px] px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  Popular
                </div>
              )}

              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {getServiceIcon(service.icon)}
                </div>

                <div className="text-[11px] font-bold text-teal-700 uppercase tracking-wider mb-1">
                  {service.category} Care
                </div>

                <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {service.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {service.duration}
                  </span>
                  <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                    {service.priceRange}
                  </span>
                </div>

                <button
                  onClick={() => onSelectServiceToBook(service.id)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-teal-700 text-white font-semibold text-xs transition-colors shadow-xs group-hover:bg-teal-600"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sterilization banner */}
        <div className="mt-12 bg-gradient-to-r from-teal-900 via-teal-800 to-cyan-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-teal-700/60 px-3 py-1 rounded-full text-xs font-semibold text-teal-200">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              100% Zero Cross-Contamination Protocol
            </div>
            <h4 className="font-heading text-xl sm:text-2xl font-bold">
              Uncompromising Hospital-Grade Sterilization
            </h4>
            <p className="text-sm text-teal-100 max-w-2xl">
              Every instrument undergoes enzymatic ultrasonic cavitation, sealed autoclaving with Class-B vacuum sterilization, and pouches are opened right before your eyes.
            </p>
          </div>
          <a
            href="#gallery"
            className="shrink-0 bg-white hover:bg-teal-50 text-teal-900 font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-md"
          >
            Inspect Sterilization Bay
          </a>
        </div>

      </div>
    </section>
  );
};
