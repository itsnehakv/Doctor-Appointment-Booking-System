import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import {
  Trash2,
  Users,
  MessageSquare,
  Search,
  CheckCircle,
} from "lucide-react";

export default function AdminPanel() {
  const { user } = useUser();
  const [doctors, setDoctors] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [activeTab, setActiveTab] = useState("doctors");

  const adminHeaders = {
    "x-user-role": user?.publicMetadata?.role,
    "x-user-email": user?.primaryEmailAddress?.emailAddress,
  };

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:8000/admin/doctors", {
        headers: adminHeaders,
      });
      setDoctors(res.data);
    } catch (err) {
      console.error("Fetch doctors error:", err);
    }
  };

  const fetchInquiries = async () => {
    try {
      const res = await axios.get("http://localhost:8000/admin/inquiries", {
        headers: adminHeaders,
      });
      setInquiries(res.data);
    } catch (err) {
      console.error("Fetch inquiries error:", err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDoctors();
      fetchInquiries();
    }
  }, [user]);

  const deleteDoctor = async (id) => {
    const result = await Swal.fire({
      title: "Delete Doctor Profile?",
      text: "This action cannot be undone and will remove all associated slots.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#ffffff",
      borderRadius: "2rem",
      customClass: {
        popup: "rounded-[2.5rem] border-none shadow-xl",
        title: "font-black text-slate-900",
        confirmButton:
          "rounded-xl font-bold uppercase tracking-widest text-xs px-6 py-3",
        cancelButton:
          "rounded-xl font-bold uppercase tracking-widest text-xs px-6 py-3",
      },
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/admin/doctors/${id}`, {
          headers: adminHeaders,
        });
        Swal.fire({
          title: "Deleted!",
          text: "The doctor profile has been removed.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          borderRadius: "2rem",
        });
        fetchDoctors();
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: err.response?.data?.detail || "Failed to delete the doctor.",
          icon: "error",
          confirmButtonColor: "#059669",
        });
      }
    }
  };

  const resolveInquiry = async (id) => {
    try {
      await axios.patch(
        `http://localhost:8000/admin/inquiries/${id}/resolve`,
        {},
        { headers: adminHeaders }
      );
      fetchInquiries();
    } catch (err) {
      console.error("Resolve error:", err);
    }
  };

  const filteredDoctors = doctors.filter((doc) =>
    doc.id.toString().includes(searchId)
  );

  return (
    <div className="relative w-full min-h-screen bg-slate-50 pt-32 pb-40 px-6 md:px-10 font-poppins overflow-hidden">
      {/* 🟢 DOTTED MESH BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.7]"
          style={{
            backgroundImage: `radial-gradient(#065f46 0.8px, transparent 0.8px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-[-5%] right-[-10%] w-[50%] h-[500px] bg-emerald-200/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[5%] left-[-10%] w-[40%] h-[400px] bg-blue-100/40 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Admin <span className="text-emerald-600">Control</span>
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-1">
              System-wide provider and inquiry management
            </p>
          </div>

          <div className="flex bg-white/50 backdrop-blur-md p-1.5 rounded-2xl w-full md:w-auto border border-slate-200 shadow-sm">
            <button
              onClick={() => setActiveTab("doctors")}
              className={`flex items-center gap-2 px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                activeTab === "doctors"
                  ? "bg-emerald-600 shadow-lg shadow-emerald-200 text-white"
                  : "text-slate-500 hover:text-emerald-600"
              }`}
            >
              <Users size={16} /> Doctors
            </button>
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`flex items-center gap-2 px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                activeTab === "inquiries"
                  ? "bg-blue-600 shadow-lg shadow-blue-200 text-white"
                  : "text-slate-500 hover:text-blue-600"
              }`}
            >
              <MessageSquare size={16} /> Inquiries
            </button>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl border-t-[4px] border-emerald-500 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] min-h-[600px] relative overflow-hidden">
          {activeTab === "doctors" ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <h2 className="text-2xl font-bold text-slate-800">
                  Doctor Registry
                </h2>
                <div className="relative group w-full md:w-auto">
                  <Search
                    className="absolute left-4 top-3 text-slate-400 group-focus-within:text-emerald-500 transition-colors"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search by ID..."
                    className="pl-12 pr-6 py-3 w-full md:w-64 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-sm bg-slate-50/50 font-medium"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {filteredDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-6 bg-white border border-slate-100 rounded-3xl hover:border-emerald-300 hover:shadow-xl transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group"
                  >
                    <div>
                      <h3 className="font-bold text-xl text-slate-800 group-hover:text-emerald-700 transition-colors">
                        {doc.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-mono uppercase tracking-tighter mt-1">
                        ID:{" "}
                        <span className="text-emerald-600 font-bold">
                          #{doc.id}
                        </span>{" "}
                        • {doc.specialization}
                      </p>
                    </div>
                    <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                      <span
                        className={`text-[10px] uppercase tracking-[0.15em] font-black px-4 py-1.5 rounded-full border ${
                          doc.is_active
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : "bg-slate-50 text-slate-400 border-slate-100"
                        }`}
                      >
                        {doc.is_active ? "Active" : "Inactive"}
                      </span>
                      <button
                        onClick={() => deleteDoctor(doc.id)}
                        className="text-slate-300 hover:text-rose-600 hover:bg-rose-50 p-3 rounded-2xl transition-all duration-300"
                      >
                        <Trash2 size={22} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Patient Inquiries
                  </h2>
                  <p className="text-sm text-slate-400 font-medium">
                    Support tickets from the contact portal.
                  </p>
                </div>
                <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-2xl border border-blue-100 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    {inquiries.filter((i) => !i.is_resolved).length} Pending
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {inquiries.length > 0 ? (
                  inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className={`group relative p-8 border rounded-[2.5rem] transition-all duration-500 ${
                        inq.is_resolved
                          ? "bg-slate-50/50 border-slate-100 grayscale-[0.5] opacity-70"
                          : "bg-white border-blue-100 shadow-sm hover:border-blue-300"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-3 rounded-2xl ${
                              inq.is_resolved
                                ? "bg-slate-200 text-slate-500"
                                : "bg-blue-600 text-white shadow-lg shadow-blue-100"
                            }`}
                          >
                            <MessageSquare size={18} />
                          </div>
                          <div>
                            <span
                              className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                                inq.is_resolved
                                  ? "text-slate-400"
                                  : "text-blue-500"
                              }`}
                            >
                              {inq.subject || "Request"}
                            </span>
                            <p className="text-[9px] text-slate-400 font-mono">
                              #{inq.id}
                            </p>
                          </div>
                        </div>
                        {!inq.is_resolved && (
                          <button
                            onClick={() => resolveInquiry(inq.id)}
                            className="flex items-center gap-2 text-[10px] bg-white border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-xl font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                          >
                            <CheckCircle size={14} /> Resolve
                          </button>
                        )}
                      </div>
                      <h4 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                        {inq.name}{" "}
                        {inq.is_resolved && (
                          <CheckCircle size={16} className="text-emerald-500" />
                        )}
                      </h4>
                      <p className="text-xs text-slate-400 mb-4">{inq.email}</p>
                      <div
                        className={`p-5 rounded-3xl border ${
                          inq.is_resolved
                            ? "bg-slate-100/50 border-slate-200"
                            : "bg-blue-50/30 border-blue-100"
                        }`}
                      >
                        <p className="text-sm text-slate-600 italic leading-relaxed">
                          "{inq.message}"
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-24 text-center border-2 border-dashed border-slate-200 rounded-[3rem]">
                    <MessageSquare
                      className="text-slate-200 mx-auto mb-6"
                      size={32}
                    />
                    <h3 className="text-slate-800 font-bold text-lg">
                      Inbox Zero!
                    </h3>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
