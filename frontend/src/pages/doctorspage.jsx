/* LIST OF DOCTORS */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser, SignInButton } from "@clerk/clerk-react";
import { Calendar, Star, MapPin, Clock, ArrowUpRight } from "lucide-react";

const DoctorsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useUser();

  const initialSpecialty = location.state?.selectedCategory || "All";
  const [doctors, setDoctors] = useState([]);
  const [filter, setFilter] = useState(initialSpecialty);
  const [loading, setLoading] = useState(true);
  const [pendingDocId, setPendingDocId] = useState(null); // Track which doc they clicked

  useEffect(() => {
    if (isLoaded && isSignedIn && pendingDocId) {
      navigate(`/mode/${pendingDocId}`);
    }
  }, [isSignedIn, isLoaded, pendingDocId, navigate]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8000/doctors");
        setDoctors(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors =
    filter === "All"
      ? doctors
      : doctors.filter(
          (doc) => doc.specialization.toLowerCase() === filter.toLowerCase()
        );

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );

  return (
    <div className="relative w-full min-h-screen bg-slate-50 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* GRID */}
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

        {/* DOT MESH */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              radial-gradient(#64748b 0.8px, transparent 0.8px)
            `,
            backgroundSize: "24px 24px",
          }}
        />

        {/* EMERALD GLOW TOP RIGHT */}
        <div className="absolute top-[-10%] right-[-5%] w-[70%] h-[700px] rounded-full bg-emerald-200/40 blur-[120px]" />

        {/* EMERALD GLOW LEFT */}
        <div className="absolute top-[500px] left-[-10%] w-[60%] h-[600px] rounded-full bg-emerald-100/30 blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto p-4 pt-40 pb-16">
        <div className="mb-10 px-4">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase border-l-6 border-emerald-500 pl-4">
            {filter !== "All" ? filter : "Top"}{" "}
            <span className="text-emerald-600">Specialists</span>
          </h1>
        </div>

        <div className="grid gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              onClick={() => navigate(`/doctor/${doctor.id}`)}
              className="flex flex-col md:flex-row bg-white/80 backdrop-blur-md rounded-[2rem] overflow-hidden border border-gray-100 hover:border-emerald-400 transition-all duration-500 cursor-pointer group shadow-md hover:shadow-lg relative"
            >
              <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                  background:
                    "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.04) 1px, transparent 0)",
                  backgroundSize: "28px 28px",
                  opacity: 0.4,
                }}
              ></div>

              {/* ... IMAGE SECTION ... */}
              <div className="w-full md:w-[250px] lg:w-[280px] aspect-[4/5] relative overflow-hidden bg-gray-100 shrink-0 z-10">
                <img
                  src={
                    doctor.image_url || "https://via.placeholder.com/400x600"
                  }
                  alt={doctor.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-4 left-4 flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow">
                  <Star className="text-yellow-500 fill-yellow-500" size={14} />
                  <span className="text-sm font-bold text-gray-800">
                    {doctor.rating ? doctor.rating.toFixed(1) : "0.0"}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between relative z-20">
                <div>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-black text-gray-900 group-hover:text-emerald-600 transition-colors">
                        {doctor.name}
                      </h2>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] uppercase rounded-full">
                          {doctor.specialization}
                        </span>
                        <p className="text-gray-400 text-[10px] font-semibold uppercase">
                          {doctor.experience} Experience
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-gray-900">
                        ₹{doctor.fees}
                      </p>
                      <p className="text-[10px] text-emerald-600 font-bold uppercase mt-1">
                        Consultation
                      </p>
                    </div>
                  </div>

                  {/* INFO BOXES */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-50 shadow rounded-xl flex items-center justify-center text-emerald-600 border">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900">
                          {doctor.hospital_name || "Clinic"}
                        </p>
                        <p className="text-[10px] text-gray-400 uppercase">
                          Bengaluru, KA
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-600 shadow rounded-xl flex items-center justify-center text-white">
                        <Clock size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900">
                          Next Slot
                        </p>
                        <p className="text-[10px] text-emerald-600 font-bold uppercase">
                          Available Today
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  {/* 🟢 5. Protected Button Logic */}
                  {isSignedIn ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/mode/${doctor.id}`);
                      }}
                      className="bg-emerald-600 w-52 rounded-xl h-12 relative text-white text-[10px] font-bold uppercase border border-emerald-600 group overflow-hidden hover:bg-emerald-700"
                    >
                      <BookBtnInner />
                    </button>
                  ) : (
                    <SignInButton mode="modal">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPendingDocId(doctor.id); // 🟢 Store ID so we can redirect after login
                        }}
                        className="bg-emerald-600 w-52 rounded-xl h-12 relative text-white text-[10px] font-bold uppercase border border-emerald-600 group overflow-hidden hover:bg-emerald-700"
                      >
                        <BookBtnInner />
                      </button>
                    </SignInButton>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/doctor/${doctor.id}`);
                    }}
                    className="h-12 px-6 border border-emerald-500 text-emerald-600 text-[10px] font-bold uppercase rounded-xl hover:bg-emerald-50 transition"
                  >
                    <span className="flex items-center gap-1">
                      View Profile <ArrowUpRight size={12} />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 🟢 6. Sub-component for the Button UI
const BookBtnInner = () => (
  <>
    <div className="bg-white/20 rounded-lg h-[44px] w-1/4 flex items-center justify-center absolute left-0 top-0 group-hover:w-full z-10 duration-500">
      <Calendar size={18} className="text-white" />
    </div>
    <span className="relative z-20 block w-full text-center pl-10 group-hover:opacity-0 transition">
      Book Appointment
    </span>
  </>
);

export default DoctorsPage;
