import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Video,
  Power,
  Calendar,
  Clock,
  User,
  CheckCircle,
  Activity,
} from "lucide-react";
import { useUser } from "@clerk/clerk-react";

export default function DoctorDashboard() {
  const { user } = useUser();
  const [doctorId, setDoctorId] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

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
      if (user?.primaryEmailAddress?.emailAddress) {
        try {
          const res = await axios.get(
            `${API_BASE_URL}/doctor/id-lookup?email=${user.primaryEmailAddress.emailAddress}`
          );
          setDoctorId(res.data.doctor_id);
          fetchDashboard(res.data.doctor_id);
        } catch (err) {
          console.error("Email not found in Doctors table");
          setLoading(false);
        }
      }
    };
    getMyId();
  }, [user]);

  const toggleStatus = async () => {
    const originalStatus = data.profile.is_active;

    setData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        is_active: !originalStatus,
      },
    }));

    try {
      await axios.patch(
        `${API_BASE_URL}/doctor/status?doctor_id=${doctorId}`,
        {},
        { headers: doctorHeaders }
      );
      fetchDashboard(doctorId);
    } catch (err) {
      console.error("Status toggle failed:", err);

      setData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          is_active: originalStatus,
        },
      }));
      alert("Failed to update status. Please check your connection.");
    }
  };
  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );

  if (!doctorId)
    return (
      <div className="pt-40 text-center text-red-500 font-bold">
        Profile Linkage Required.
      </div>
    );

  return (
    <div className="relative min-h-screen bg-slate-100 overflow-hidden font-poppins">
      {/* --- ENHANCED LAYERED BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Primary Grid Texture */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Large Decorative Aura Blurs */}
        <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[600px] bg-emerald-200/30 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[500px] bg-teal-200/25 blur-[120px] rounded-full" />
        <div className="absolute top-[30%] left-[20%] w-[30%] h-[300px] bg-indigo-100/20 blur-[100px] rounded-full" />

        {/* Subtle Vignette for depth */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-100/10 to-slate-200/40" />
      </div>

      <div className="relative z-10 pt-32 px-6 max-w-7xl mx-auto pb-20">
        {/* Profile Header */}
        <div className="relative overflow-hidden mb-12 bg-gradient-to-br from-emerald-600 to-teal-800 p-10 rounded-[3rem] shadow-2xl shadow-emerald-900/20 border border-white/10 backdrop-blur-sm">
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />

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
              className={`group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-black transition-all duration-500 shadow-lg ${
                data.profile.is_active
                  ? "bg-white text-emerald-700 hover:scale-105"
                  : "bg-emerald-900/40 text-emerald-100 border border-emerald-500/30 hover:bg-emerald-900/60"
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

        <div className="grid lg:grid-cols-4 gap-10">
          {/* Appointment List */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <Calendar className="text-emerald-600" />
                Upcoming Schedule
              </h3>
              <span className="text-xs font-bold text-slate-500 bg-white/70 backdrop-blur-sm border border-white/50 px-4 py-2 rounded-full shadow-sm">
                {`${
                  data.appointments.filter(
                    (appt) =>
                      appt.status === "booked" &&
                      new Date(appt.appointment_time) > new Date()
                  ).length
                } Consultations Pending`}
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
                        ? "bg-slate-200/40 border-slate-300 opacity-60 grayscale"
                        : "bg-white/80 border-white/60 hover:border-emerald-300 hover:bg-white shadow-xl shadow-slate-200/50"
                    }`}
                  >
                    <div className="flex items-center gap-5 w-full">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors shadow-inner border border-slate-100 ${
                          isExpired
                            ? "bg-slate-300 text-slate-500"
                            : "bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600"
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
                            <span className="text-[9px] font-black bg-slate-300 text-slate-600 px-2 py-0.5 rounded-md tracking-widest uppercase">
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
                                ? "bg-slate-300 text-slate-600"
                                : appt.type === "online"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-cyan-100 text-violet-700"
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
                            ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                            : "bg-emerald-700 hover:bg-emerald-600 text-white hover:shadow-emerald-500/40"
                        }`}
                      >
                        <Video size={18} />
                        {isExpired ? "Closed" : "Enter Room"}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Stats Sidebar */}
          <div className="space-y-6">
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[3rem] border border-white shadow-2xl shadow-slate-200/50 overflow-hidden relative">
              <Activity className="absolute right-[-10px] top-[-10px] text-emerald-500/5 w-24 h-24" />
              <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-6">
                Today's Overview
              </h4>
              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold border border-blue-100 shadow-sm">
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
                  <div className="w-10 h-10 bg-violet-100 text-indigo-600 rounded-xl flex items-center justify-center font-bold border border-indigo-100 shadow-sm">
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
