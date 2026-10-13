import React from 'react';
import { Award, GraduationCap, CheckCircle, Calendar, Heart, Shield } from 'lucide-react';
import { DOCTORS } from '../data/mockData';

interface DoctorsSectionProps {
  onSelectDoctorToBook: (doctorId: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onSelectDoctorToBook }) => {
  return (
    <section id="doctors" className="py-20 bg-slate-50/70 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5" />
            <span>Experienced Dental Specialists</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Meet the Dentists Caring for Your Smile
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Backed by over a decade of patient trust in Ulhasnagar, our doctors bring clinical mastery, gentle communication, and the latest treatment techniques to every appointment.
          </p>
        </div>

        {/* Doctor Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {DOCTORS.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6 text-center sm:text-left">
                  <div className="relative shrink-0">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-teal-500 shadow-md"
                    />
                    <span className="absolute -bottom-2 -right-2 bg-teal-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                      {doctor.experience}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading text-2xl font-bold text-slate-900">
                      {doctor.name}
                    </h3>
                    <div className="text-teal-700 font-semibold text-sm mt-0.5">
                      {doctor.title}
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-500 mt-1 font-medium">
                      <GraduationCap className="w-4 h-4 text-slate-400" />
                      <span>{doctor.qualification}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {doctor.bio}
                </p>

                {/* Specialties list */}
                <div className="space-y-2 mb-6">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-teal-600" />
                    Areas of Expertise:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {doctor.specialties.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span className="font-medium">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => onSelectDoctorToBook(doctor.id)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-md shadow-teal-600/20 transition-all hover:scale-[1.01]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book with {doctor.name.split(' ')[0]} {doctor.name.split(' ')[1]}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Doctor pledge */}
        <div className="mt-12 max-w-4xl mx-auto bg-teal-50 rounded-2xl p-6 border border-teal-200/80 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-full bg-teal-700 text-white flex items-center justify-center shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="font-heading font-bold text-slate-900 text-base">
              Our Clinical Promise to Anxious Patients
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              We never rush appointments. Dr. Manish and Dr. Bhriti will explain every procedure beforehand, administer topical pre-numbing gels so you won't even feel the injection, and pause whenever you need.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
