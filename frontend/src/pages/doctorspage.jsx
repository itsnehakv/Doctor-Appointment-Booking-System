import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Calendar, Star, MapPin, Clock, ArrowUpRight } from "lucide-react";

const DoctorsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialSpecialty = location.state?.selectedCategory || "All";
  const [doctors, setDoctors] = useState([]);
  const [filter, setFilter] = useState(initialSpecialty);
  const [loading, setLoading] = useState(true);

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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );

  return (
    <div className="max-w-[1300px] mx-auto p-4 pt-44 pb-20 bg-white min-h-screen">
      {/* HEADER */}
      <div className="mb-12 px-6">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase border-l-8 border-emerald-500 pl-6">
          {filter !== "All" ? filter : "Top"}{" "}
          <span className="text-emerald-500">Specialists</span>
        </h1>
      </div>

      <div className="grid gap-8">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            onClick={() => navigate(`/doctor/${doctor.id}`)}
            /* LARGER CARD RADIUS & WIDTH */
            className="flex flex-col md:flex-row bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:border-emerald-400 transition-all duration-500 cursor-pointer group shadow-lg hover:shadow-2xl relative"
          >
            {/* STRONGER DOTTED GRADIENT */}
            <div
              className="absolute inset-0 pointer-events-none z-0"
              style={{
                background: `
                  radial-gradient(circle at 2px 2px, #10b981 1.5px, transparent 0),
                  linear-gradient(135deg, #d1fae5 0%, #ffffff 50%, #10b981 180%)
                `,
                backgroundSize: "30px 30px, 100% 100%",
                opacity: 0.7,
              }}
            ></div>

            {/* LARGER PICTURE FRAME */}
            <div className="w-full md:w-[300px] lg:w-[340px] aspect-[4/5] md:h-auto relative overflow-hidden bg-slate-900 shrink-0 z-10">
              <img
                src={doctor.image_url || "https://via.placeholder.com/400x600"}
                alt={doctor.name}
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
              />

              <div className="absolute top-6 left-6 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-xl">
                <Star className="text-yellow-500 fill-yellow-500" size={16} />
                <span className="text-lg font-black text-slate-900">
                  {doctor.rating ? doctor.rating.toFixed(1) : "0.0"}
                </span>
              </div>
            </div>

            <div className="flex-1 p-8 lg:p-12 flex flex-col justify-between relative z-20">
              <div>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight group-hover:text-emerald-600 transition-colors leading-tight">
                      {doctor.name}
                    </h2>
                    <div className="flex items-center gap-4">
                      <span className="px-4 py-1 bg-emerald-600 text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-full">
                        {doctor.specialization}
                      </span>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                        {doctor.experience} Experience
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-4xl font-black text-slate-900 tracking-tighter leading-none">
                      ₹{doctor.fees}
                    </p>
                    <p className="text-xs text-emerald-600 font-black uppercase tracking-widest mt-2">
                      Consultation
                    </p>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white shadow-md rounded-2xl flex items-center justify-center text-emerald-600 border border-emerald-50 shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 leading-none">
                        {doctor.hospital_name || "Specialty Clinic"}
                      </p>
                      <p className="text-xs text-slate-400 mt-2 font-medium uppercase">
                        Bengaluru, KA
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-slate-900 shadow-md rounded-2xl flex items-center justify-center text-white shrink-0">
                      <Clock size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 leading-none">
                        Next Slot
                      </p>
                      <p className="text-xs text-emerald-600 mt-2 font-black uppercase tracking-widest">
                        Available Today
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTION AREA WITH OVERLAP FIX */}
              <div className="mt-12 flex flex-wrap items-center gap-6">
                {/* Fixed Overlap Button */}
                <button
                  type="button"
                  className="bg-slate-950 text-center w-64 rounded-2xl h-16 relative text-white text-xs font-black uppercase tracking-[0.2em] border-4 border-slate-950 group overflow-hidden"
                >
                  {/* Green Sliding Part */}
                  <div className="bg-emerald-400 rounded-xl h-[56px] w-1/4 flex items-center justify-center absolute left-0 top-0 group-hover:w-full z-10 duration-500 ease-in-out">
                    {/* Icon stays visible at all times, but shifts to center on hover */}
                    <Calendar
                      size={22}
                      className="text-slate-950 transition-all duration-500"
                    />
                  </div>

                  <span className="relative z-20 block w-full text-center pl-12 opacity-100 group-hover:opacity-0 transition-opacity duration-300 ease-in-out">
                    Book Appointment
                  </span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/doctor/${doctor.id}`);
                  }}
                  /* Removed 'hover:text-white' to keep text black */
                  className="h-16 px-10 relative overflow-hidden border-2 border-slate-950 text-slate-950 font-black text-xs uppercase tracking-[0.3em] rounded-2xl group transition-all duration-300"
                >
                  {/* The "Liquid" Fill Effect - stays behind the text */}
                  <span className="absolute inset-0 w-0 bg-slate-100 transition-all duration-500 ease-out group-hover:w-full -z-10"></span>

                  <span className="relative z-10 flex items-center gap-2">
                    View Profile
                    <ArrowUpRight
                      size={14}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsPage;
