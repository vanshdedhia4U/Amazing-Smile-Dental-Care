import React, { useState } from 'react';
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Camera,
  Info
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/mockData';
import { GalleryItem } from '../types/clinic';

interface GallerySectionProps {
  onOpenBooking: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Operatories', 'Technology', 'Hygiene', 'Reception'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  const activeItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  const handleNext = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section id="gallery" className="py-20 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>Clinic Office Tour</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              A Modern, Spotless Dental Sanctuary
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              Take a virtual look inside Amazing Smile Dental Care. We designed our operatory and lounge to be welcoming, calm, and equipped with the highest standards of clinical hygiene.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setActiveLightboxIndex(null);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat === 'All' ? 'All Spaces (6)' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxIndex(index)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative h-64 overflow-hidden bg-slate-200">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors" />

                {/* Category Badge */}
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-900 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-xs">
                  {item.category}
                </span>

                {/* Expand Overlay Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-white/95 text-slate-900 text-xs font-bold px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Maximize2 className="w-3.5 h-3.5 text-teal-600" />
                    <span>View Details & Equipment</span>
                  </span>
                </div>
              </div>

              {/* Caption & Specs */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-slate-900 text-lg group-hover:text-teal-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-teal-700 font-semibold">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    {item.equipmentHighlights.length} Key Clinical Features
                  </span>
                  <span className="text-slate-400 group-hover:text-teal-700 group-hover:translate-x-0.5 transition-all">
                    Click to enlarge →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeItem && (
          <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
            <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col border border-slate-200">
              
              {/* Lightbox Header */}
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-full">
                    {activeItem.category}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-slate-900">
                    {activeItem.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveLightboxIndex(null)}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox Content */}
              <div className="overflow-y-auto p-6 space-y-6">
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 h-72 sm:h-96">
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Nav Chevrons */}
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg hover:bg-white hover:scale-105 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg hover:bg-white hover:scale-105 transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 mb-2">
                      <Info className="w-4 h-4 text-teal-600" />
                      About this Room / Setup
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {activeItem.description}
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 mb-2.5">
                      <ShieldCheck className="w-4 h-4 text-teal-600" />
                      Key Technology & Safety Equipment
                    </h4>
                    <ul className="space-y-2">
                      {activeItem.equipmentHighlights.map((eq, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                          <span>{eq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Lightbox Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-500 font-medium">
                  Image {(activeLightboxIndex ?? 0) + 1} of {filteredItems.length} in {selectedCategory}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setActiveLightboxIndex(null);
                      onOpenBooking();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-md transition-colors"
                  >
                    Schedule Visit in This Operatory
                  </button>
                  <button
                    onClick={() => setActiveLightboxIndex(null)}
                    className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors"
                  >
                    Close Tour
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
