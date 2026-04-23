import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  GraduationCap,
  User,
  Calendar,
  ShieldCheck,
  Award,
} from "lucide-react";

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/doctors/${id}`);
        setDoctor(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
        setLoading(false);
      }
    };
    fetchDoctorDetails();
  }, [id]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );

  if (!doctor)
    return <div className="text-center pt-40">Doctor not found.</div>;

  return (
    <div className="max-w-[1200px] mx-auto p-4 pt-32 pb-20 bg-white min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold uppercase text-xs tracking-widest transition-colors mb-8 group"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Go Back
      </button>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* LEFT COLUMN: Profile Card */}
        <div className="w-full lg:w-[400px] shrink-0">
          <div className="relative rounded-[3rem] overflow-hidden border border-slate-100 shadow-2xl">
            {/* Dotted Background Layer */}
            <div
              className="absolute inset-0 pointer-events-none z-0 opacity-40"
              style={{
                background: `radial-gradient(circle at 2px 2px, #10b981 1.5px, transparent 0)`,
                backgroundSize: "24px 24px",
              }}
            ></div>

            <div className="relative z-10">
              <img
                src={doctor.image_url || "https://via.placeholder.com/400x600"}
                className="w-full aspect-[3/4] object-cover"
                alt={doctor.name}
              />
              <div className="p-8 bg-white/90 backdrop-blur-md">
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-emerald-600 text-white px-4 py-1 rounded-full font-black text-[10px] uppercase tracking-widest">
                    {doctor.specialization}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star
                      className="text-yellow-500 fill-yellow-500"
                      size={16}
                    />
                    <span className="font-black text-slate-900">
                      {doctor.rating?.toFixed(1)}
                    </span>
                  </div>
                </div>
                <h1 className="text-3xl font-black text-slate-900 leading-tight mb-2">
                  {doctor.name}
                </h1>
                <p className="text-slate-500 font-medium italic mb-6">
                  {doctor.education}
                </p>

                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-slate-700">
                    <Award size={20} className="text-emerald-500" />
                    <span className="text-sm font-bold">
                      {doctor.experience} Experience
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <ShieldCheck size={20} className="text-emerald-500" />
                    <span className="text-sm font-bold">
                      {doctor.total_consultations}+ Consultations
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Detailed Info */}
        <div className="flex-1 space-y-10">
          {/* Bio Section */}
          <section>
            <h3 className="text-xs font-black text-emerald-600 uppercase tracking-[0.3em] mb-4">
              About the Doctor
            </h3>
            <p className="text-slate-600 leading-relaxed text-lg font-medium">
              {doctor.bio || "No biography provided for this specialist."}
            </p>
          </section>

          {/* Practical Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
              <Clock className="text-emerald-600 mb-4" size={28} />
              <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-2">
                OPD Timings
              </h4>
              <p className="text-slate-700 font-bold">
                {doctor.start_time} - {doctor.end_time}
              </p>
              <p className="text-slate-400 text-[10px] mt-1 uppercase font-bold">
                Monday to Saturday
              </p>
            </div>

            <div className="p-8 bg-slate-900 rounded-[2rem] text-white">
              <MapPin className="text-emerald-400 mb-4" size={28} />
              <h4 className="font-black text-emerald-400 uppercase text-xs tracking-widest mb-2">
                Hospital Location
              </h4>
              <p className="font-bold">{doctor.hospital_name}</p>
              <p className="text-slate-400 text-sm mt-1">{doctor.address}</p>
            </div>
          </div>

          {/* Fee & Action */}
          <div className="pt-10 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
                Consultation Fee
              </p>
              <p className="text-5xl font-black text-slate-900">
                ₹{doctor.fees}
              </p>
            </div>

            {/* Your Custom Animated Button */}
            <button
              type="button"
              className="bg-slate-950 text-center w-72 rounded-2xl h-20 relative text-white text-xs font-black uppercase tracking-[0.2em] border-4 border-slate-950 group overflow-hidden"
            >
              <div className="bg-emerald-400 rounded-xl h-[72px] w-1/4 flex items-center justify-center absolute left-0 top-0 group-hover:w-full z-10 duration-500 ease-in-out">
                <Calendar size={24} className="text-slate-950" />
              </div>
              <span className="relative z-20 block w-full text-center pl-12 opacity-100 group-hover:opacity-0 transition-all duration-300">
                Book Appointment
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
