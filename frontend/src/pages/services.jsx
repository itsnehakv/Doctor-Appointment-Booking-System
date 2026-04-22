import React, { useState } from 'react';
import {
  ShieldPlus,
  Scissors,
  HeartPulse,
  Activity,
  Stethoscope,
  Eye,
  Baby,
  Microscope,
  FlaskConical,
  Search,
  Brain,
  Ear,
  Droplets,
  Smile,
  Scan,
  UserRound,
  Bone,
  Sparkles,
  Wind
} from "lucide-react";

const servicesData = [
  { id: 1, title: "Oncology", description: "Expert cancer diagnosis, chemotherapy guidance, and multidisciplinary tumour board consultations.", category: "Medical", icon: <ShieldPlus size={20} /> },
  { id: 2, title: "Gynaecology & Obstetrics", description: "Comprehensive women's health from routine check-ups to high-risk pregnancy and fertility treatments.", category: "Surgical", icon: <Scissors size={20} /> },
  { id: 3, title: "Cardiology", description: "Heart health consultations, ECG analysis, stress tests, and cardiac rehabilitation planning.", category: "Medical", icon: <HeartPulse size={20} /> },
  { id: 4, title: "Pulmonology", description: "Asthma, COPD, sleep apnoea, tuberculosis, and post-COVID respiratory recovery.", category: "Medical", icon: <Wind size={20} /> },
  { id: 5, title: "Gastroenterology", description: "Colonoscopy, endoscopy, liver disease, IBS, Crohn's, and digestive health consultations.", category: "Surgical", icon: <Stethoscope size={20} /> },
  { id: 6, title: "Ophthalmology", description: "Eye exams, cataract assessment, glaucoma, LASIK consultations, and retinal care.", category: "Surgical", icon: <Eye size={20} /> },
  { id: 7, title: "Paediatrics", description: "Child health check-ups, vaccinations, growth monitoring, and developmental assessments.", category: "Paediatric", icon: <Baby size={20} /> },
  { id: 8, title: "Dermatology", description: "Skin conditions, acne, psoriasis, hair loss, mole checks, and cosmetic dermatology.", category: "Medical", icon: <Microscope size={20} /> },
  { id: 9, title: "Pathology & Diagnostics", description: "Lab test booking, report interpretation, health screening packages, and second opinion.", category: "Diagnostic", icon: <FlaskConical size={20} /> },
  { id: 10, title: "Orthopedics", description: "Bone, joint, muscle and sports injury treatment.", category: "Surgical", icon: <Bone size={20} /> },
  { id: 11, title: "Neurology", description: "Brain and nervous system disorder treatment.", category: "Medical", icon: <Brain size={20} /> },
  { id: 12, title: "Urology", description: "Kidney and urinary tract care treatments.", category: "Surgical", icon: <Droplets size={20} /> },
  { id: 13, title: "ENT", description: "Ear, nose, throat and sinus treatments.", category: "Medical", icon: <Ear size={20} /> },
  { id: 14, title: "Endocrinology", description: "Hormone disorders including diabetes and thyroid.", category: "Medical", icon: <Activity size={20} /> },
  { id: 15, title: "Nephrology", description: "Kidney disease and dialysis management.", category: "Medical", icon: <FlaskConical size={20} /> },
  { id: 16, title: "Psychiatry", description: "Mental health treatment, anxiety and depression care.", category: "Medical", icon: <UserRound size={20} /> },
  { id: 17, title: "Radiology", description: "X-ray, MRI, CT scan and imaging services.", category: "Diagnostic", icon: <Scan size={20} /> },
  { id: 18, title: "Dentistry", description: "Teeth cleaning, root canal and oral care treatments.", category: "Diagnostic", icon: <Smile size={20} /> },
  { id: 19, title: "General Medicine", description: "Primary healthcare for common illnesses.", category: "Medical", icon: <Stethoscope size={20} /> },
  { id: 20, title: "Physiotherapy", description: "Pain relief, rehabilitation and mobility recovery.", category: "Paediatric", icon: <Sparkles size={20} /> },
  { id: 21, title: "Emergency Medicine", description: "24/7 emergency care for trauma, accidents, and critical conditions.", category: "Medical", icon: <Activity size={20} /> }
];

const Services = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const categories = ["All", "Surgical", "Medical", "Paediatric", "Diagnostic"];

  // ✅ STRICT 3-LETTER SEARCH ONLY (NO DESCRIPTION MATCH)
  const filteredServices = servicesData.filter(service => {
    const query = search.toLowerCase().trim();

    const matchesCategory =
      filter === "All" || service.category === filter;

    const matchesSearch =
      query === "" ||
      service.title.toLowerCase().startsWith(query.slice(0, 3));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 pt-28 pb-16 px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <p className="text-emerald-600 font-semibold mb-2 tracking-wide">
          20+ SPECIALTIES
        </p>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          World-class specialists, <br /> one platform
        </h1>
      </div>

      {/* Search */}
      <div className="max-w-xl mx-auto mb-12 relative">
        <div className="flex items-center bg-white rounded-full border-2 border-emerald-300 focus-within:border-emerald-600 transition-all">

          <Search className="ml-4 text-emerald-600" size={18} />

          <input
            type="text"
            placeholder="Search specialties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoComplete="off"
            className="w-full px-3 py-3 outline-none bg-transparent text-gray-700"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="mr-4 text-gray-400 hover:text-emerald-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              filter === cat
                ? "bg-emerald-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-400 hover:text-emerald-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="p-5 rounded-xl bg-white/70 backdrop-blur-md border border-white/40
                       shadow-md transition-all duration-300
                       hover:-translate-y-3 hover:scale-[1.02]
                       hover:shadow-[0_15px_40px_rgba(16,185,129,0.25)] group"
          >

            <div className="w-12 h-12 flex items-center justify-center rounded-lg
                            bg-emerald-500 text-white mb-4 group-hover:scale-110 transition">
              {service.icon}
            </div>

            <h3 className="text-lg font-semibold mb-2 group-hover:text-emerald-600">
              {service.title}
            </h3>

            <p className="text-sm text-gray-600 mb-4">
              {service.description}
            </p>

            <span className="text-xs px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">
              {service.category}
            </span>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Services;