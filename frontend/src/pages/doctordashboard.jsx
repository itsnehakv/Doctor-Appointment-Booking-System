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
  const { user } = useUser();
  const [doctorId, setDoctorId] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const doctorHeaders = {
    "x-user-role": user?.publicMetadata?.role || "doctor",
    "x-user-email": user?.primaryEmailAddress?.emailAddress,
  };

  const fetchDashboard = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/doctor/me?doctor_id=${id}`,
        {
          headers: doctorHeaders,
        }
      );
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
            `http://localhost:8000/doctor/id-lookup?email=${user.primaryEmailAddress.emailAddress}`
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
    try {
      await axios.patch(
        `http://localhost:8000/doctor/status?doctor_id=${doctorId}`,
        {},
        { headers: doctorHeaders }
      );
      fetchDashboard(doctorId);
    } catch (err) {
      console.error("Status toggle failed:", err);
    }
  };

  if (loading)
    return (
      <div className="pt-40 text-center animate-pulse text-emerald-600 font-bold">
        Initializing Portal...
      </div>
    );
  if (!doctorId)
    return (
      <div className="pt-40 text-center text-red-500">
        Profile Linkage Required.
      </div>
    );

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto pb-20 font-poppins">
      <div className="relative overflow-hidden mb-12 bg-gradient-to-r from-emerald-600 to-teal-700 p-10 rounded-[3rem] shadow-2xl shadow-emerald-200/50">
        {/* Abstract Background Shapes */}
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[10%] w-40 h-40 bg-emerald-400/20 rounded-full blur-2xl"></div>

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
              <p className="text-emerald-50 opacity-90 mt-1 font-medium">
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

      <div className="grid lg:grid-cols-4 gap-10">
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
              <Calendar className="text-emerald-600" />
              Upcoming Schedule
            </h3>
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-4 py-2 rounded-full">
              {data.appointments.length} Consultations Pending
            </span>
          </div>

          <div className="grid gap-4">
            {data.appointments.map((appt) => (
              <div
                key={appt.id}
                className="group bg-white border border-slate-100 p-6 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300"
              >
                <div className="flex items-center gap-5 w-full">
                  <div className="w-14 h-14 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:from-emerald-50 group-hover:to-emerald-100 group-hover:text-emerald-600 transition-colors">
                    <User size={28} />
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-slate-800 text-lg">
                      {appt.patient_name || "New Patient"}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Clock size={14} className="text-emerald-500" />
                        {new Date(appt.appointment_time).toLocaleTimeString(
                          [],
                          { hour: "2-digit", minute: "2-digit" }
                        )}
                      </span>
                      <span
                        className={`uppercase font-black text-[9px] px-3 py-1 rounded-lg ${
                          appt.type === "online"
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
                    onClick={() => window.open("/meeting-room", "_blank")}
                    className="mt-4 md:mt-0 w-full md:w-auto bg-slate-400 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 text-sm font-black shadow-lg hover:shadow-emerald-500/40"
                  >
                    <Video size={18} /> Enter Room
                  </button>
                )}
              </div>
            ))}

            {data.appointments.length === 0 && (
              <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200">
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

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden relative">
            <Activity className="absolute right-[-10px] top-[-10px] text-emerald-50 w-24 h-24" />
            <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-6">
              Today's Overview
            </h4>

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                  {data.appointments.filter((a) => a.type === "online").length}
                </div>
                <p className="text-sm font-bold text-slate-700">
                  Online Sessions
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold">
                  {data.appointments.filter((a) => a.type === "offline").length}
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
  );
}
