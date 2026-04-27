import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Video,
  Power,
  Calendar,
  Clock,
  User,
  CheckCircle,
  Award,
  Activity,
} from "lucide-react";
import { useUser } from "@clerk/clerk-react";

export default function DoctorDashboard() {
  const { user, isLoaded } = useUser();
  const [doctorId, setDoctorId] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  // Memoized headers to prevent unnecessary re-renders
  const doctorHeaders = {
    "x-user-role": user?.publicMetadata?.role || "doctor",
    "x-user-email": user?.primaryEmailAddress?.emailAddress,
  };

  const fetchDashboard = async (id) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/doctor/me?doctor_id=${id}`, {
        headers: doctorHeaders,
      });
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Dashboard access denied:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const getMyId = async () => {
      if (!isLoaded || !user?.primaryEmailAddress?.emailAddress) return;

      try {
        const res = await axios.get(
          `${API_BASE_URL}/doctor/id-lookup?email=${user.primaryEmailAddress.emailAddress}`
        );
        if (res.data.doctor_id) {
          setDoctorId(res.data.doctor_id);
          fetchDashboard(res.data.doctor_id);
        }
      } catch (err) {
        console.error("Email not found in Doctors table");
        setLoading(false);
      }
    };
    getMyId();
  }, [user, isLoaded]);

  const toggleStatus = async () => {
    try {
      await axios.patch(
        `${API_BASE_URL}/doctor/status?doctor_id=${doctorId}`,
        {},
        { headers: doctorHeaders }
      );
      fetchDashboard(doctorId);
    } catch (err) {
      console.error("Status toggle failed:", err);
    }
  };

  if (loading || !isLoaded)
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );

  if (!doctorId)
    return (
      <div className="pt-40 text-center text-red-500 font-bold">
        Profile Linkage Required. Contact Administrator.
      </div>
    );

  return (
    <div className="relative w-full min-h-screen bg-slate-50 overflow-hidden font-poppins">
      {/* --- BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[600px] rounded-full bg-emerald-200/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[500px] rounded-full bg-teal-100/30 blur-[100px]" />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 pt-32 px-6 max-w-7xl mx-auto pb-20">
        {/* HERO SECTION */}
        <div className="relative overflow-hidden mb-12 bg-gradient-to-br from-emerald-600/90 to-teal-700/90 backdrop-blur-md p-10 rounded-[3rem] shadow-2xl shadow-emerald-900/20 border border-white/10">
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6 text-center md:text-left flex-col md:flex-row">
              <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-inner">
                <User size={48} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <h1 className="text-3xl font-black text-white tracking-tight">
                    {data.profile.name}
                  </h1>
                  <span className="bg-emerald-400/30 text-white text-[10px] px-2 py-1 rounded-full border border-emerald-300/50 font-bold tracking-widest uppercase">
                    Verified Specialist
                  </span>
                </div>
                <p className="text-emerald-50 opacity-90 mt-1 font-medium text-lg">
                  {data.profile.specialization} • {data.profile.hospital_name}
                </p>
              </div>
            </div>

            <button
              onClick={toggleStatus}
              className={`group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-black transition-all duration-500 ${
                data.profile.is_active
                  ? "bg-white text-emerald-700 shadow-xl shadow-black/10"
                  : "bg-emerald-800/40 text-emerald-100 border border-emerald-500/30"
              }`}
            >
              <Power
                size={20}
                className={data.profile.is_active ? "animate-pulse" : ""}
              />
              {data.profile.is_active ? "ACTIVE" : "INACTIVE"}
            </button>
          </div>
        </div>

        {/* DASHBOARD GRID */}
        <div className="grid lg:grid-cols-4 gap-10">
          {/* LEFT: APPOINTMENTS LIST */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <Calendar className="text-emerald-600" />
                Upcoming Schedule
              </h3>
              <span className="text-xs font-bold text-slate-500 bg-white/50 backdrop-blur-sm border border-white px-4 py-2 rounded-full shadow-sm">
                {data.appointments.length} Consultations Pending
              </span>
            </div>

            <div className="grid gap-4">
              {data.appointments.map((appt) => {
                const appointmentDate = new Date(appt.appointment_time);
                const isExpired = appointmentDate < new Date();

                return (
                  <div
                    key={appt.id}
                    className={`group border p-6 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center transition-all duration-300 backdrop-blur-md ${
                      isExpired
                        ? "bg-slate-100/50 border-slate-200 opacity-60 grayscale-[0.5]"
                        : "bg-white/70 border-white/40 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5"
                    }`}
                  >
                    <div className="flex items-center gap-5 w-full">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                          isExpired
                            ? "bg-slate-200 text-slate-400"
                            : "bg-white text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 shadow-sm"
                        }`}
                      >
                        <User size={28} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <p className="font-black text-slate-800 text-lg">
                            {appt.patient_name || "New Patient"}
                          </p>
                          {isExpired && (
                            <span className="text-[9px] font-black bg-slate-200 text-slate-500 px-2 py-0.5 rounded-md tracking-widest uppercase">
                              Expired
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-1.5 font-bold">
                            <Calendar
                              size={14}
                              className={
                                isExpired
                                  ? "text-slate-400"
                                  : "text-emerald-500"
                              }
                            />
                            {appointmentDate.toLocaleDateString([], {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>

                          <span className="flex items-center gap-1.5 font-bold">
                            <Clock
                              size={14}
                              className={
                                isExpired
                                  ? "text-slate-400"
                                  : "text-emerald-500"
                              }
                            />
                            {appointmentDate.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>

                          <span
                            className={`uppercase font-black text-[9px] px-3 py-1 rounded-lg ${
                              isExpired
                                ? "bg-slate-200 text-slate-500"
                                : appt.type === "online"
                                ? "bg-blue-50 text-blue-600"
                                : "bg-orange-50 text-orange-600"
                            }`}
                          >
                            {appt.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    {appt.type === "online" && (
                      <button
                        disabled={isExpired}
                        onClick={() =>
                          !isExpired && window.open("/meeting-room", "_blank")
                        }
                        className={`mt-4 md:mt-0 w-full md:w-auto px-8 py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 text-sm font-black shadow-lg ${
                          isExpired
                            ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                            : "bg-slate-800 hover:bg-emerald-600 text-white hover:shadow-emerald-500/40"
                        }`}
                      >
                        <Video size={18} />
                        {isExpired ? "Closed" : "Enter Room"}
                      </button>
                    )}
                  </div>
                );
              })}

              {data.appointments.length === 0 && (
                <div className="text-center py-24 bg-white/60 backdrop-blur-md rounded-[3rem] border border-dashed border-slate-200">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={40} className="text-slate-200" />
                  </div>
                  <p className="text-slate-400 font-bold">
                    No consultations scheduled.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: OVERVIEW SIDEBAR */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-[3rem] border border-white shadow-xl shadow-emerald-900/5 overflow-hidden relative">
              <Activity className="absolute right-[-10px] top-[-10px] text-emerald-500/10 w-24 h-24" />
              <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-6">
                Today's Overview
              </h4>

              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                    {
                      data.appointments.filter((a) => a.type === "online")
                        .length
                    }
                  </div>
                  <p className="text-sm font-bold text-slate-700">
                    Online Sessions
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center font-bold">
                    {
                      data.appointments.filter((a) => a.type === "offline")
                        .length
                    }
                  </div>
                  <p className="text-sm font-bold text-slate-700">
                    In-Clinic Visits
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
