import { Doctor, Service, GalleryItem, Appointment, ScheduleConfig, ClientCredentials } from '../types/clinic';

export const CLINIC_INFO = {
  name: "Amazing Smile Dental Care",
  tagline: "Advanced & Gentle Dental Care in Ulhasnagar",
  leadDoctor: "Dr. Manish Gangwani",
  coDoctor: "Dr. Bhriti Gangwani",
  experienceYears: 12,
  address: "Gol maidan, Sidhi Vinayak Nagar, Ulhasnagar, Maharashtra 421002",
  shortAddress: "Gol Maidan, Sidhi Vinayak Nagar, Ulhasnagar",
  area: "Gol Maidan",
  locality: "Sidhi Vinayak Nagar, Ulhasnagar",
  city: "Ulhasnagar, Maharashtra",
  pincode: "421002",
  landmark: "Near Gol Maidan, Sidhi Vinayak Nagar",
  phone: "+91 98454 42734",
  secondaryPhone: "+91 98200 12845",
  email: "care@amazingsmiledental.in",
  googleMapsUrl: "https://maps.app.goo.gl/zUZDw1MXTXvA1XfE7",
  rating: 4.9,
  reviewCount: 148,
  hours: {
    weekdays: "10:00 AM – 1:30 PM & 5:00 PM – 9:30 PM",
    sunday: "10:30 AM – 1:30 PM (By Appointment)",
  }
};

export const DOCTORS: Doctor[] = [
  {
    id: "dr-manish",
    name: "Dr. Manish Gangwani",
    title: "Senior Dental Surgeon & Implantologist",
    qualification: "BDS, MDS (Prosthodontics & Implantology)",
    experience: "12+ Years",
    specialties: [
      "Painless Root Canal (RCT)",
      "Dental Implants",
      "Fixed Prosthodontics & Bridges",
      "Impacted Tooth Extraction"
    ],
    bio: "With over 12 years of clinical excellence, Dr. Manish Gangwani is known across Ulhasnagar for his calm demeanor, precision-guided dentistry, and dedication to painless procedures.",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "dr-bhriti",
    name: "Dr. Bhriti Gangwani",
    title: "Aesthetic Dental Specialist & Orthodontics",
    qualification: "BDS, Fellowship in Aesthetic Dentistry & Clear Aligners",
    experience: "10+ Years",
    specialties: [
      "Clear Aligners & Braces",
      "Cosmetic Smile Design & Veneers",
      "Pediatric Gentle Dentistry",
      "Teeth Whitening"
    ],
    bio: "Dr. Bhriti Gangwani specializes in aesthetic smile makeovers, conservative dentistry, and children's oral health, ensuring patients feel relaxed and completely at ease.",
    image: "https://images.unsplash.com/photo-1594824813590-752ba14a8449?auto=format&fit=crop&w=800&q=80"
  }
];

export const SERVICES: Service[] = [
  {
    id: "rct",
    title: "Painless Root Canal Treatment (RCT)",
    category: "Restorative",
    description: "Single-sitting rotary endodontics with digital apex locators, ensuring 100% painless tooth preservation without extraction.",
    duration: "45 - 60 mins",
    priceRange: "₹3,500 - ₹6,000",
    icon: "Activity",
    popular: true
  },
  {
    id: "veneers",
    title: "Ceramic Veneers & Smile Makeover",
    category: "Cosmetic",
    description: "Ultra-thin custom porcelain laminate veneers and bonding that transform gaps, discoloration, and uneven teeth into a radiant smile.",
    duration: "60 mins",
    priceRange: "₹6,000 - ₹12,000 / tooth",
    icon: "Sparkles",
    popular: true
  },
  {
    id: "implants",
    title: "Titanium Dental Implants",
    category: "Surgical",
    description: "Permanent replacement for missing teeth with world-grade biocompatible titanium fixtures and natural lifelike zirconia crowns.",
    duration: "45 mins",
    priceRange: "₹22,000 - ₹38,000",
    icon: "ShieldCheck",
    popular: true
  },
  {
    id: "aligners",
    title: "Invisible Clear Aligners & Braces",
    category: "Orthodontic",
    description: "Virtually invisible removable orthodontic aligners and ceramic self-ligating brackets for discreet teeth straightening.",
    duration: "30 - 45 mins",
    priceRange: "₹45,000 - ₹1,20,000",
    icon: "Smile",
    popular: true
  },
  {
    id: "whitening",
    title: "In-Office Laser Teeth Whitening",
    category: "Cosmetic",
    description: "Instant 5 to 8 shades brighter smile in under an hour with safe LED-activated peroxide formulas that protect enamel.",
    duration: "45 mins",
    priceRange: "₹4,500 - ₹8,000",
    icon: "Sun",
    popular: false
  },
  {
    id: "gums",
    title: "Bleeding Gums & Periodontal Care",
    category: "General",
    description: "Ultrasonic scaling, deep root planing, and antimicrobial gum irrigation to reverse gingivitis and prevent tooth loss.",
    duration: "30 mins",
    priceRange: "₹1,200 - ₹2,500",
    icon: "HeartPulse",
    popular: false
  },
  {
    id: "extraction",
    title: "Impacted Wisdom Tooth Extraction",
    category: "Surgical",
    description: "Gentle surgical removal of third molars trapped under gums or bone using micro-surgical techniques for rapid healing.",
    duration: "40 mins",
    priceRange: "₹3,500 - ₹7,500",
    icon: "Scissors",
    popular: false
  },
  {
    id: "pediatric",
    title: "Pediatric Gentle Dentistry",
    category: "General",
    description: "Preventative dental sealants, fluoride varnishes, and joyful, friendly checkups designed to make kids love dental visits.",
    duration: "30 mins",
    priceRange: "₹800 - ₹2,000",
    icon: "Baby",
    popular: false
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gallery-1",
    title: "Primary Operatory Suite 1",
    category: "Operatories",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
    description: "Modern ergonomic dental unit with programmable memory positions, shadowless LED surgical lighting, and integrated intraoral camera monitor.",
    equipmentHighlights: [
      "Ergonomic Patient Chair with Lumbar Support",
      "Shadowless LED Operatory Light",
      "High-Vacuum Aerosol Evacuation Unit",
      "Chairside HD Patient Display Monitor"
    ]
  },
  {
    id: "gallery-2",
    title: "Cosmetic & Orthodontics Bay",
    category: "Operatories",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
    description: "Quiet, comfortable procedure room dedicated to smile makeovers, digital impressions, and clear aligner consultations.",
    equipmentHighlights: [
      "Ultra-gentle Ultrasonic Scalers",
      "Digital Intraoral 3D Scanner integration",
      "Noise-dampened electric micromotors"
    ]
  },
  {
    id: "gallery-3",
    title: "Hospital-Grade Sterilization Bay",
    category: "Hygiene",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    description: "Strict 5-step sterilization protocol featuring Class-B vacuum autoclave, ultrasonic bath cleaning, and individual heat-sealed sterile pouches.",
    equipmentHighlights: [
      "Class-B Vacuum Autoclave for 100% spore elimination",
      "Ultrasonic Enzymatic Instrument Cleaner",
      "Individual Sterility Indicator Pouches opened chairside",
      "Air Purification HEPA Filters"
    ]
  },
  {
    id: "gallery-4",
    title: "Digital RVG & OPG Imaging Suite",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    description: "Low-dose digital radiography unit providing instant high-contrast tooth and jaw scans with 90% less radiation than film.",
    equipmentHighlights: [
      "High-Resolution RVG Sensor",
      "Near-Zero Radiation Collimation",
      "Real-time chairside tooth diagnosis"
    ]
  },
  {
    id: "gallery-5",
    title: "Patient Welcome Lounge & Reception",
    category: "Reception",
    image: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80",
    description: "Calm, airy waiting lounge with pleasant ambient music, air-conditioned seating, chilled infused water, and a relaxed ambiance.",
    equipmentHighlights: [
      "Touchless Digital Check-in Kiosk",
      "Comfortable ergonomic seating",
      "Patient education tablets and library"
    ]
  },
  {
    id: "gallery-6",
    title: "Private Consultation & Smile Preview Office",
    category: "Operatories",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=80",
    description: "Private doctor consultation desk for reviewing dental x-rays, discussing smile treatment plans, and answering patient questions in comfort.",
    equipmentHighlights: [
      "Full Privacy Consultation Environment",
      "Visual Before/After Smile Mockup Software",
      "Transparent Treatment Estimation"
    ]
  }
];

export const DEFAULT_SCHEDULE_CONFIG: ScheduleConfig = {
  morningShift: {
    start: "10:00 AM",
    end: "01:30 PM",
    enabled: true
  },
  eveningShift: {
    start: "05:00 PM",
    end: "09:30 PM",
    enabled: true
  },
  slotDurationMinutes: 30,
  blockedDates: [],
  blockedSlots: {}
};

export const DEFAULT_CLIENT_CREDENTIALS: ClientCredentials = {
  clientUsername: "dr.manish",
  clientPassword: "SmileKalyan2026!",
  clientPin: "4213",
  clientName: "Dr. Manish Gangwani",
  clientEmail: "manish.gangwani@amazingsmiledental.in",
  clinicName: "Amazing Smile Dental Care",
  lastUpdated: new Date().toISOString(),
  allowScheduleOverride: true,
  allowClinicalNotesExport: true
};

// Generates dynamic dates relative to today
export const getRelativeDate = (offsetDays: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "APT-2026-101",
    patientName: "Pooja Sharma",
    patientPhone: "+91 98231 44512",
    patientEmail: "pooja.sharma@example.com",
    age: 32,
    gender: "Female",
    date: getRelativeDate(0),
    timeSlot: "10:30 AM",
    doctorId: "dr-manish",
    doctorName: "Dr. Manish Gangwani",
    serviceId: "rct",
    serviceName: "Painless Root Canal Treatment (RCT)",
    status: "in-chair",
    visitType: "procedure",
    symptoms: "Severe throbbing pain in lower right molar (Tooth 46) during chewing.",
    clinicalNotes: {
      chiefComplaint: "Pain radiating to right jaw on mastication, nocturnal aggravation.",
      examinationFindings: "Deep disto-occlusal carious lesion on Tooth 46. Tenderness on percussion (++). Negative cold vitality test.",
      diagnosis: "Irreversible Pulpitis with symptomatic apical periodontitis #46.",
      treatmentDone: "Sitting 2: Working length determined via apex locator (MB: 21mm, ML: 21mm, D: 21.5mm). Biomechanical preparation done up to 25/0.04. Irrigated with 3% NaOCl & saline. Calcium hydroxide intra-canal medicament placed. Temporary Cavit seal.",
      prescriptions: [
        { medicine: "Tab. Zerodol-SP", dosage: "1 tab", frequency: "Twice daily (after food)", duration: "3 days" },
        { medicine: "Tab. Augmentin 625mg", dosage: "1 tab", frequency: "Twice daily", duration: "5 days" }
      ],
      nextVisitDate: getRelativeDate(3),
      advice: "Avoid chewing hard food on lower right quadrant until obturation and crown placement.",
      updatedAt: new Date(Date.now() - 30 * 60000).toISOString(),
      doctorSignature: "Dr. Manish Gangwani (MDS)"
    },
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: "APT-2026-102",
    patientName: "Rahul Varma",
    patientPhone: "+91 98920 18233",
    patientEmail: "rahul.varma@example.com",
    age: 28,
    gender: "Male",
    date: getRelativeDate(0),
    timeSlot: "11:15 AM",
    doctorId: "dr-bhriti",
    doctorName: "Dr. Bhriti Gangwani",
    serviceId: "veneers",
    serviceName: "Ceramic Veneers & Smile Makeover",
    status: "confirmed",
    visitType: "first-visit",
    symptoms: "Discolored fluorosis stains and minor gap between upper central incisors.",
    clinicalNotes: {
      chiefComplaint: "Desires aesthetic smile improvement before upcoming wedding.",
      examinationFindings: "Grade II enamel mottling with midline diastema (1.8mm) between #11 and #21.",
      diagnosis: "Dental fluorosis & midline diastema.",
      treatmentDone: "Initial digital diagnostic photo series taken. Intraoral 3D scan completed. Wax-up simulation discussed with patient.",
      prescriptions: [],
      nextVisitDate: getRelativeDate(5),
      advice: "Review digital smile design simulation preview sent on email.",
      updatedAt: new Date(Date.now() - 120 * 60000).toISOString(),
      doctorSignature: "Dr. Bhriti Gangwani (BDS)"
    },
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: "APT-2026-103",
    patientName: "Amit Deshmukh",
    patientPhone: "+91 97654 32190",
    patientEmail: "amit.deshmukh@example.com",
    age: 45,
    gender: "Male",
    date: getRelativeDate(0),
    timeSlot: "12:00 PM",
    doctorId: "dr-manish",
    doctorName: "Dr. Manish Gangwani",
    serviceId: "gums",
    serviceName: "Bleeding Gums & Periodontal Care",
    status: "completed",
    visitType: "routine-checkup",
    symptoms: "Bleeding while brushing and foul breath in the morning.",
    clinicalNotes: {
      chiefComplaint: "Bleeding gums while brushing since 2 months.",
      examinationFindings: "Generalized supra & sub-gingival calculus. Gingival erythema, BOP positive on lower anterior sextant.",
      diagnosis: "Chronic generalized plaque-induced gingivitis.",
      treatmentDone: "Full mouth ultrasonic scaling completed. Polishing with fine fluoridated paste. Subgingival chlorhexidine irrigation.",
      prescriptions: [
        { medicine: "Hexidine 0.2% Mouthwash", dosage: "10 ml undiluted", frequency: "Twice daily (rinse 1 min)", duration: "14 days" },
        { medicine: "Stolin Gum Paint", dosage: "Gentle massage", frequency: "Night after brushing", duration: "10 days" }
      ],
      nextVisitDate: getRelativeDate(30),
      advice: "Use soft-bristled toothbrush with modified Bass technique; avoid aggressive scrub brushing.",
      updatedAt: new Date().toISOString(),
      doctorSignature: "Dr. Manish Gangwani (MDS)"
    },
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: "APT-2026-104",
    patientName: "Sneha Patil",
    patientPhone: "+91 98198 77654",
    patientEmail: "sneha.patil@example.com",
    age: 24,
    gender: "Female",
    date: getRelativeDate(0),
    timeSlot: "05:30 PM",
    doctorId: "dr-bhriti",
    doctorName: "Dr. Bhriti Gangwani",
    serviceId: "aligners",
    serviceName: "Invisible Clear Aligners & Braces",
    status: "confirmed",
    visitType: "procedure",
    symptoms: "Aligner Tray #08 delivery and attachment review.",
    clinicalNotes: {
      chiefComplaint: "Routine aligner tracking checkup and pickup of next batch.",
      examinationFindings: "Tray #07 fitting tight and seated properly. Tracking aligned with 3D digital plan.",
      diagnosis: "Class I Malocclusion with mild anterior crowding (Active orthodontic aligner treatment).",
      treatmentDone: "IPR 0.2mm performed between #32-#33 as scheduled. Trays #08, #09, and #10 handed over.",
      prescriptions: [],
      nextVisitDate: getRelativeDate(21),
      advice: "Wear each tray 22 hours per day. Change to tray #09 on day 10.",
      updatedAt: new Date(Date.now() - 600000).toISOString(),
      doctorSignature: "Dr. Bhriti Gangwani (BDS)"
    },
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: "APT-2026-105",
    patientName: "Kiran Jha",
    patientPhone: "+91 99300 23411",
    patientEmail: "kiran.jha@example.com",
    age: 38,
    gender: "Male",
    date: getRelativeDate(0),
    timeSlot: "06:30 PM",
    doctorId: "dr-manish",
    doctorName: "Dr. Manish Gangwani",
    serviceId: "implants",
    serviceName: "Titanium Dental Implants",
    status: "confirmed",
    visitType: "follow-up",
    symptoms: "Follow-up evaluation for missing upper right premolar (#14).",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: "APT-2026-106",
    patientName: "Aarav Kulkarni",
    patientPhone: "+91 98701 44321",
    patientEmail: "sangeeta.kulkarni@example.com",
    age: 8,
    gender: "Male",
    date: getRelativeDate(0),
    timeSlot: "07:15 PM",
    doctorId: "dr-bhriti",
    doctorName: "Dr. Bhriti Gangwani",
    serviceId: "pediatric",
    serviceName: "Pediatric Gentle Dentistry",
    status: "confirmed",
    visitType: "first-visit",
    symptoms: "Mother noticed dark black spot on back milk tooth.",
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: "APT-2026-107",
    patientName: "Meena Chawla",
    patientPhone: "+91 98205 99881",
    patientEmail: "meena.chawla@example.com",
    age: 52,
    gender: "Female",
    date: getRelativeDate(1),
    timeSlot: "11:00 AM",
    doctorId: "dr-manish",
    doctorName: "Dr. Manish Gangwani",
    serviceId: "rct",
    serviceName: "Painless Root Canal Treatment (RCT)",
    status: "confirmed",
    visitType: "procedure",
    symptoms: "Obturation & final permanent restoration for tooth #35.",
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString()
  },
  {
    id: "APT-2026-108",
    patientName: "Vikram Singhania",
    patientPhone: "+91 98334 11229",
    patientEmail: "vikram.s@example.com",
    age: 34,
    gender: "Male",
    date: getRelativeDate(1),
    timeSlot: "06:00 PM",
    doctorId: "dr-manish",
    doctorName: "Dr. Manish Gangwani",
    serviceId: "extraction",
    serviceName: "Impacted Wisdom Tooth Extraction",
    status: "confirmed",
    visitType: "procedure",
    symptoms: "Recurrent swelling and cheek biting near lower left wisdom tooth #38.",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  }
];

export const PATIENT_REVIEWS = [
  {
    id: "rev-1",
    author: "Kavita R. (Ulhasnagar)",
    rating: 5,
    date: "2 weeks ago",
    text: "Had a wonderful painless root canal treatment done by Dr. Manish Gangwani! I was terrified of dental chairs, but his soft-spoken approach and gentle hands made the entire RCT comfortable. The clinic is spotlessly clean and modern.",
    highlight: "100% painless RCT & very hygienic clinic"
  },
  {
    id: "rev-2",
    author: "Prashant Nair",
    rating: 5,
    date: "1 month ago",
    text: "Amazing Smile Dental Care is hands down the best dental clinic near Gol Maidan. Dr. Bhriti Gangwani helped me with smile designing and veneers. Very polite staff, transparent rates, and no false promises. Truly grateful!",
    highlight: "Exceptional cosmetic smile makeover"
  },
  {
    id: "rev-3",
    author: "Deepali Joshi",
    rating: 5,
    date: "2 months ago",
    text: "Took my 7-year old son here for a cavity filling. Dr. Bhriti was so friendly that my son didn't cry even once! They have digital x-rays right at the chair. Excellent service and highly recommended for families.",
    highlight: "Great with kids & digital equipment"
  },
  {
    id: "rev-4",
    author: "Mahesh Panchal",
    rating: 5,
    date: "3 months ago",
    text: "Got dental implants done by Dr. Manish. The precision and post-procedure care was top notch. He clearly explains every step on the monitor before touching any tooth. Five stars!",
    highlight: "Expert dental implant surgery"
  }
];
