import { useUser } from "@clerk/clerk-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import {
  Calendar,
  ArrowUpRight,
  XCircle,
  Clock,
  Video,
  MapPin,
} from "lucide-react";

const BookingHistory = () => {
  const [loading, setLoading] = useState(true);

  const { user } = useUser();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (user) {
      setLoading(true);
      axios
        .get(`http://localhost:8000/appointments/me?patient_id=${user.id}`)
        .then((res) => {
          setAppointments(res.data);
          setLoading(false); // 🟢 Stop loading
        })
        .catch(() => setLoading(false));
    }
  }, [user]);

  const formatDateTime = (dateString) => {
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  const handleCancel = async (id) => {
    if (!id || !user) return;

    const userEmail = user.primaryEmailAddress?.emailAddress;
    await axios.patch(
      `http://localhost:8000/appointments/${id}/cancel?patient_id=${user.id}&email=${userEmail}`
    );

    Swal.fire({
      title: "Cancel Appointment?",
      text: "This slot will be released back to the system.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981", // emerald-500
      cancelButtonColor: "#f43f5e", // rose-500
      confirmButtonText: "Yes, cancel it",
      cancelButtonText: "Keep it",
      background: "#ffffff",
      borderRadius: "2rem",
      customClass: {
        popup: "rounded-[2rem] border-none shadow-2xl font-geist",
        title: "text-slate-900 font-black uppercase tracking-tight",
        htmlContainer: "text-slate-500 font-medium",
        confirmButton:
          "rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest",
        cancelButton:
          "rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.patch(
            `http://localhost:8000/appointments/${id}/cancel?patient_id=${user.id}`
          );

          setAppointments((prev) =>
            prev.map((a) => (a.id === id ? { ...a, status: "CANCELLED" } : a))
          );

          Swal.fire({
            title: "Cancelled!",
            text: "Your appointment has been removed. Notification email sent.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
            borderRadius: "2rem",
          });
        } catch (err) {
          Swal.fire("Error", "Could not cancel the appointment.", "error");
        }
      }
    });
  };

  return (
    <div className="relative w-full min-h-screen bg-slate-50 font-geist antialiased overflow-hidden">
      {/* --- HOMEPAGE GRID BACKGROUND --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(#64748b 0.8px, transparent 0.8px)`,
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute top-[-10%] right-[-5%] w-[70%] h-[800px] rounded-full bg-emerald-200/40 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto pt-40 px-8 pb-40">
        {/* RECTANGULAR STAT CARD */}
        <div className="flex justify-start mb-10">
          <div className="bg-white/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-white shadow-sm flex items-center gap-5">
            <div className="p-2.5 bg-emerald-600 rounded-xl text-white">
              <Calendar size={18} />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                Activity
              </p>

              {/* To this: Only count active (booked) slots */}
              <p className="text-2xl font-black text-slate-900 leading-none">
                {
                  appointments.filter(
                    (a) => a.status?.toLowerCase() === "booked"
                  ).length
                }
                <span className="text-[10px] text-slate-400 uppercase tracking-tighter ml-1">
                  active slots
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* HISTORY TABLE */}
        <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white/50 overflow-hidden shadow-2xl">
          <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
            <table className="w-full text-left border-collapse sticky-header">
              <thead className="bg-emerald-200/10 border-b border-emerald-200 sticky top-0 z-20 backdrop-blur-md">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-emerald-800 tracking-widest">
                    Consultant
                  </th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-emerald-800 tracking-widest text-center">
                    Mode
                  </th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-emerald-800 tracking-widest">
                    Timestamp
                  </th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-emerald-800 tracking-widest text-center">
                    Status
                  </th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-emerald-800 tracking-widest text-right">
                    Options
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50">
                {appointments.map((appt) => (
                  <tr
                    key={appt.id}
                    className="hover:bg-white/80 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <Link
                        to={`/doctor/${appt.doctor_id}`}
                        className="inline-flex items-center gap-2 group/link"
                      >
                        <span className="font-bold text-slate-800 text-lg group-hover/link:text-emerald-600 transition-colors">
                          {appt.doctor_name}
                        </span>
                        <ArrowUpRight
                          size={14}
                          className="text-slate-300 group-hover/link:translate-x-0.5 transition-transform"
                        />
                      </Link>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="flex justify-center">
                        <span
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                            (appt.mode || appt.type)?.toLowerCase() === "online"
                              ? "text-indigo-600 bg-indigo-50 border-indigo-100 shadow-sm shadow-indigo-100"
                              : "text-emerald-600 bg-emerald-50 border-emerald-100 shadow-sm shadow-emerald-100"
                          }`}
                        >
                          {(appt.mode || appt.type)?.toLowerCase() ===
                          "online" ? (
                            <Video size={10} />
                          ) : (
                            <MapPin size={10} />
                          )}
                          {appt.mode || appt.type || "OFFLINE"}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock size={12} className="text-emerald-500" />
                        <span className="font-bold text-[13px]">
                          {formatDateTime(appt.time)}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span
                        className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter ${
                          appt.status === "booked"
                            ? "text-emerald-600 bg-emerald-100/50 border border-emerald-200"
                            : "text-rose-600 bg-rose-50 border border-rose-100"
                        }`}
                      >
                        {appt.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      {appt.status === "booked" ? (
                        <button
                          onClick={() => handleCancel(appt.id)}
                          className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-200 hover:shadow-rose-300 transition-all active:scale-95 flex items-center gap-2 ml-auto"
                        >
                          <XCircle size={14} />
                          Cancel Slot
                        </button>
                      ) : (
                        <span className="text-slate-300 text-[10px] font-bold uppercase tracking-widest pr-4 italic">
                          Archived
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
