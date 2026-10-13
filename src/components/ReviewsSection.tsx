import React from 'react';
import { Star, MessageSquare, ExternalLink, CheckCircle2 } from 'lucide-react';
import { PATIENT_REVIEWS, CLINIC_INFO } from '../data/mockData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Verified Google Reviews</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Loved by Families Across Ulhasnagar
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              Real stories from patients who experienced our painless root canal treatments, friendly smile makeovers, and hygienic clinic.
            </p>
          </div>

          {/* Rating scorecard */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 flex items-center gap-5 shrink-0 shadow-xs">
            <div className="text-center">
              <div className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 leading-tight">
                4.9
              </div>
              <div className="flex items-center justify-center gap-0.5 my-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-[11px] font-semibold text-slate-500">
                148+ Google Reviews
              </div>
            </div>

            <div className="border-l border-slate-200 pl-5">
              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 hover:underline"
              >
                <span>Open Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <p className="text-[11px] text-slate-500 mt-1 max-w-[150px]">
                Read all verified reviews directly on Google.
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PATIENT_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400">{rev.date}</span>
                </div>

                <div className="bg-teal-50 border border-teal-100/80 text-teal-800 text-xs font-semibold px-2.5 py-1 rounded-md mb-3 inline-block">
                  "{rev.highlight}"
                </div>

                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                  "{rev.text}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center">
                  {rev.author.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{rev.author}</div>
                  <div className="text-[10px] text-teal-700 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-teal-600" />
                    Verified Patient
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
