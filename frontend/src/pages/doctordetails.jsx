import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
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
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );

  if (!doctor)
    return <div className="text-center pt-40">Doctor not found.</div>;

  return (
    <div className="relative w-full min-h-screen bg-slate-50 overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(#0f172a 1px, transparent 1px),
              linear-gradient(90deg, #0f172a 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(#64748b 0.8px, transparent 0.8px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[600px] rounded-full bg-emerald-200/30 blur-[110px]" />
        <div className="absolute top-[450px] left-[-10%] w-[55%] h-[500px] rounded-full bg-emerald-100/25 blur-[120px]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-[1100px] mx-auto p-4 pt-28 pb-16">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-semibold text-xs tracking-wider transition mb-6 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition" />
          Go Back
        </button>

        <div className="flex flex-col lg:flex-row gap-10">

          {/* LEFT CARD */}
          <div className="w-full lg:w-[360px] shrink-0">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-xl bg-white/70 backdrop-blur-md">

              <img
                src={doctor.image_url || "https://via.placeholder.com/400x600"}
                className="w-full aspect-[3/4] object-cover"
                alt={doctor.name}
              />

              <div className="p-6">

                <div className="flex justify-between items-center mb-3">
                  <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                    {doctor.specialization}
                  </span>

                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-slate-800 text-sm">
                      {doctor.rating?.toFixed(1)}
                    </span>
                  </div>
                </div>

                <h1 className="text-2xl font-bold text-slate-900">
                  {doctor.name}
                </h1>

                <p className="text-slate-500 text-sm italic mt-1">
                  {doctor.education}
                </p>

              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1 space-y-8">

            {/* ABOUT */}
            <section>
              <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3">
                About the Doctor
              </h3>

              <p className="text-slate-600 leading-relaxed text-base mb-5">
                {doctor.bio || "No biography provided."}
              </p>

              {/* CAPSULES */}
              <div className="flex flex-wrap gap-3">

                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 shadow-sm">
                  <Award size={16} className="text-emerald-500" />
                  <span className="text-sm font-semibold text-slate-700">
                    {doctor.experience} Experience
                  </span>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 shadow-sm">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  <span className="text-sm font-semibold text-slate-700">
                    {doctor.total_consultations}+ Consultations
                  </span>
                </div>

              </div>
            </section>

            {/* INFO BOXES */}
            <div className="space-y-4 max-w-[320px] w-full">

              {/* OPD */}
              <div className="group p-4 bg-white/70 backdrop-blur-md rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition relative overflow-hidden">

                <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/0 via-emerald-200/30 to-emerald-100/0 opacity-0 group-hover:opacity-100 transition"></div>

                <div className="relative z-10">

                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="text-emerald-500" size={18} />

                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative h-2 w-2 rounded-full bg-emerald-500"></span>
                    </span>

                    <span className="text-[10px] font-bold text-emerald-600 uppercase">
                      Open Now
                    </span>
                  </div>

                  <h4 className="text-[10px] font-bold uppercase text-slate-800 mb-1">
                    OPD Timings
                  </h4>

                  <p className="text-sm font-semibold text-slate-700">
                    {doctor.start_time} - {doctor.end_time}
                  </p>

                </div>
              </div>

              {/* HOSPITAL */}
              <div className="group p-4 bg-white/70 backdrop-blur-md rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition relative overflow-hidden">

                <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/0 via-emerald-200/30 to-emerald-100/0 opacity-0 group-hover:opacity-100 transition"></div>

                <div className="relative z-10">

                  <MapPin className="text-emerald-500 mb-2" size={18} />

                  <h4 className="text-[10px] font-bold uppercase text-slate-800 mb-1">
                    Hospital
                  </h4>

                  <p className="text-sm font-semibold text-slate-800">
                    {doctor.hospital_name}
                  </p>

                  <p className="text-xs text-slate-400">
                    {doctor.address}
                  </p>

                </div>
              </div>

            </div>

            {/* ACTION */}
            <div className="pt-6 border-t border-slate-100">

              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow-sm flex items-center justify-between gap-6">

                <div>
                  <p className="text-xs text-slate-400 uppercase">
                    Consultation Fee
                  </p>
                  <p className="text-3xl font-bold text-slate-900">
                    ₹{doctor.fees}
                  </p>
                </div>

                <button className="relative h-12 px-6 rounded-xl overflow-hidden group flex items-center gap-3">

                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500 group-hover:scale-105 transition"></div>

                  <div className="relative z-10 bg-white/20 p-2 rounded-lg">
                    <Calendar size={16} className="text-white" />
                  </div>

                  <span className="relative z-10 text-white text-xs font-bold">
                    Book Appointment
                  </span>

                </button>

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;