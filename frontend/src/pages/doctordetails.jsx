/* DOCTOR PORTFOLIO PAGE */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser, SignInButton } from "@clerk/clerk-react";
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

  // 🟢 Track Auth Status
  const { isSignedIn } = useUser();
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    if (!id || id === "undefined" || id === "null") return;

    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/doctors/${id}`);
        setDoctor(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
        setLoading(false);
      }
    };
    fetchDoctorDetails();
  }, [id, API_BASE_URL]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );

  if (!doctor)
    return (
      <div className="text-center pt-40 font-bold text-slate-800">
        Doctor not found.
      </div>
    );

  return (
    <div className="relative w-full min-h-screen bg-slate-50 overflow-hidden">
      {/* --- BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[600px] rounded-full bg-emerald-200/30 blur-[110px]" />
        <div className="absolute top-[450px] left-[-10%] w-[55%] h-[500px] rounded-full bg-emerald-100/25 blur-[120px]" />
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-10 max-w-[1100px] mx-auto p-4 pt-28 pb-16">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-semibold text-xs tracking-wider transition mb-6 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition"
          />
          Go Back
        </button>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT: DOCTOR CARD */}
          <div className="w-full lg:w-[360px] shrink-0">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-xl bg-white/70 backdrop-blur-md border border-white/20">
              <img
                src={doctor.image_url || "https://via.placeholder.com/400x600"}
                className="w-full aspect-[3/4] object-cover"
                alt={doctor.name}
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter">
                    {doctor.specialization}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star
                      size={14}
                      className="text-yellow-500 fill-yellow-500"
                    />
                    <span className="font-bold text-slate-800 text-sm">
                      {doctor.rating?.toFixed(1)}
                    </span>
                  </div>
                </div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  {doctor.name}
                </h1>
                <p className="text-slate-500 text-sm italic mt-1 font-medium">
                  {doctor.education}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: DETAILS & ACTIONS */}
          <div className="flex-1 space-y-8">
            <section>
              <h3 className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em] mb-4">
                About the Doctor
              </h3>
              <p className="text-slate-600 leading-relaxed text-base mb-6 font-medium">
                {doctor.bio || "No biography provided."}
              </p>

              <div className="flex flex-wrap gap-3">
                <Badge
                  icon={<Award size={16} />}
                  text={`${doctor.experience} Experience`}
                />
                <Badge
                  icon={<ShieldCheck size={16} />}
                  text={`${doctor.total_consultations}+ Consultations`}
                />
              </div>
            </section>

            {/* CLINIC INFO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard
                icon={<Clock className="text-emerald-500" size={18} />}
                title="OPD Timings"
                value={`${doctor.start_time} - ${doctor.end_time}`}
                isLive={true}
              />
              <InfoCard
                icon={<MapPin className="text-emerald-500" size={18} />}
                title="Hospital"
                value={doctor.hospital_name}
                subValue={doctor.address}
              />
            </div>

            {/* ACTION FOOTER */}
            <div className="pt-8 border-t border-slate-200/60">
              <div className="bg-white/80 backdrop-blur-md rounded-[2rem] p-6 border border-white/40 shadow-sm flex items-center justify-between gap-6">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
                    Consultation Fee
                  </p>
                  <p className="text-4xl font-black text-slate-900">
                    ₹{doctor.fees}
                  </p>
                </div>

                {/* CONDITIONAL BOOKING LOGIC */}
                {isSignedIn ? (
                  <button
                    onClick={() => navigate(`/mode/${id}`)}
                    className="group relative h-14 px-8 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg shadow-emerald-200 hover:shadow-emerald-300"
                  >
                    <ButtonContent />
                  </button>
                ) : (
                  <SignInButton mode="modal" forceRedirectUrl={`/mode/${id}`}>
                    <button className="group relative h-14 px-8 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg shadow-emerald-200 hover:shadow-emerald-300">
                      <ButtonContent />
                    </button>
                  </SignInButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- HELPER COMPONENTS (To keep main code clean) --- */

const ButtonContent = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600" />
    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative z-10 flex items-center gap-3">
      <div className="bg-white/20 p-2 rounded-lg text-white">
        <Calendar size={18} />
      </div>
      <span className="text-white text-xs font-black uppercase tracking-wider">
        Book Appointment
      </span>
    </div>
  </>
);

const Badge = ({ icon, text }) => (
  <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 border border-white shadow-sm">
    <span className="text-emerald-500">{icon}</span>
    <span className="text-sm font-bold text-slate-700">{text}</span>
  </div>
);

const InfoCard = ({ icon, title, value, subValue, isLive }) => (
  <div className="p-5 bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl shadow-sm hover:shadow-md transition">
    <div className="flex items-center gap-2 mb-3">
      {icon}
      {isLive && (
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[10px] font-black text-emerald-600 uppercase">
            Open Now
          </span>
        </span>
      )}
    </div>
    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
      {title}
    </h4>
    <p className="text-base font-bold text-slate-800">{value}</p>
    {subValue && (
      <p className="text-xs text-slate-400 font-medium mt-0.5">{subValue}</p>
    )}
  </div>
);

export default DoctorDetails;
