import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Video, MapPin } from "lucide-react";

const AppointmentMode = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const { doctorId } = useParams();

  return (
    <div className="relative w-full min-h-screen bg-slate-50 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      {/* 🔲 GRID BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Grid Layer */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#065f46 1px, transparent 1px), linear-gradient(90deg, #065f46 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* 🌿 Soft Emerald Glow */}
        <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-emerald-300 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-100px] right-[-80px] w-80 h-80 bg-emerald-400 opacity-20 rounded-full blur-3xl"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-emerald-600 font-medium mb-2 tracking-wide text-sm">
            APPOINTMENT MODE
          </p>

          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3 tracking-tight">
            Choose how you want to consult
          </h1>

          <p className="text-gray-600 text-sm">
            Select your preferred consultation type
          </p>
        </div>

        {/* Cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ONLINE */}
          <div
            onClick={() => {
              setSelected("online");
              setTimeout(
                () => navigate("/book/online", { state: { doctorId } }),
                200
              );
            }}
            className={`p-6 rounded-xl backdrop-blur-md bg-white/70 border 
                        transition-all duration-300 ease-in-out cursor-pointer group
                        ${
                          selected === "online"
                            ? "border-emerald-500 shadow-[0_10px_30px_rgba(16,185,129,0.3)] scale-[1.02]"
                            : "border-white/40 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(16,185,129,0.2)]"
                        }`}
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 
                            bg-gradient-to-tr from-emerald-500 to-emerald-400 text-white
                            shadow-sm transition-all duration-300
                            ${
                              selected === "online"
                                ? "scale-110 rotate-3"
                                : "group-hover:scale-105"
                            }`}
            >
              <Video size={20} />
            </div>

            <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-emerald-600 transition">
              Online Consultation
            </h3>

            <p className="text-gray-600 text-sm mb-4">
              Talk to doctors via secure video call.
            </p>

            <button className="text-emerald-600 text-sm font-medium flex items-center group-hover:translate-x-1 transition">
              Continue <span className="ml-1">→</span>
            </button>
          </div>

          {/* OFFLINE */}
          <div
            onClick={() => {
              setSelected("offline");
              setTimeout(
                () => navigate("/book/offline", { state: { doctorId } }),
                200
              );
            }}
            className={`p-6 rounded-xl backdrop-blur-md bg-white/70 border 
                        transition-all duration-300 ease-in-out cursor-pointer group
                        ${
                          selected === "offline"
                            ? "border-emerald-500 shadow-[0_10px_30px_rgba(16,185,129,0.3)] scale-[1.02]"
                            : "border-white/40 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(16,185,129,0.2)]"
                        }`}
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 
                            bg-gradient-to-tr from-emerald-500 to-emerald-400 text-white
                            shadow-sm transition-all duration-300
                            ${
                              selected === "offline"
                                ? "scale-110 -rotate-3"
                                : "group-hover:scale-105"
                            }`}
            >
              <MapPin size={20} />
            </div>

            <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-emerald-600 transition">
              Offline Visit
            </h3>

            <p className="text-gray-600 text-sm mb-4">
              Visit the hospital for in-person consultation.
            </p>

            <button className="text-emerald-600 text-sm font-medium flex items-center group-hover:translate-x-1 transition">
              Continue <span className="ml-1">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentMode;
