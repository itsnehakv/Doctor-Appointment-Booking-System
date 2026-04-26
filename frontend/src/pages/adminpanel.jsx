import React, { useEffect, useState } from "react";
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
    if (window.confirm("Delete this doctor profile?")) {
      await axios.delete(`http://localhost:8000/admin/doctors/${id}`, {
        headers: adminHeaders,
      });
      fetchDoctors();
    }
  };

  const resolveInquiry = async (id) => {
    try {
      await axios.patch(
        `http://localhost:8000/admin/inquiries/${id}/resolve`,
        {},
        { headers: adminHeaders }
      );
      fetchInquiries(); // Refresh list
    } catch (err) {
      console.error("Resolve error:", err);
    }
  };

  const filteredDoctors = doctors.filter((doc) =>
    doc.id.toString().includes(searchId)
  );

  return (
    <div className="pt-32 px-6 md:px-10 pb-40 min-h-screen font-poppins bg-[#fafafa]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 text-slate-900">
            Admin Control
          </h1>
          <p className="text-stone-500 text-sm">
            System-wide provider and inquiry management
          </p>
        </div>

        <div className="flex bg-stone-200/50 p-1 rounded-2xl w-full md:w-auto border border-stone-200">
          <button
            onClick={() => setActiveTab("doctors")}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === "doctors"
                ? "bg-white shadow-sm text-emerald-600"
                : "text-stone-500"
            }`}
          >
            <Users size={18} /> Doctors
          </button>
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === "inquiries"
                ? "bg-white shadow-sm text-blue-600"
                : "text-stone-500"
            }`}
          >
            <MessageSquare size={18} /> Inquiries
          </button>
        </div>
      </div>

      <div className="bg-white border border-stone-100 rounded-[2.5rem] p-8 shadow-sm min-h-[500px]">
        {activeTab === "doctors" ? (
          <div className="animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-stone-800">
                Doctor Registry
              </h2>
              <div className="relative">
                <Search
                  className="absolute left-3 top-2.5 text-stone-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search ID..."
                  className="pl-10 pr-4 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-stone-50"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredDoctors.map((doc) => (
                <div
                  key={doc.id}
                  className="p-5 bg-white border border-stone-100 rounded-2xl hover:border-emerald-200 transition-all flex justify-between items-center group"
                >
                  <div>
                    <h3 className="font-bold text-lg text-stone-800">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-stone-400 font-mono uppercase">
                      ID: {doc.id} • {doc.specialization}
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <span
                      className={`text-[10px] uppercase tracking-widest font-black px-3 py-1 rounded-full ${
                        doc.is_active
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : "bg-stone-50 text-stone-400 border border-stone-100"
                      }`}
                    >
                      {doc.is_active ? "Active" : "Inactive"}
                    </span>
                    <button
                      onClick={() => deleteDoctor(doc.id)}
                      className="text-stone-300 hover:text-rose-500 hover:bg-rose-50 p-2 rounded-xl transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-xl font-bold text-stone-800 mb-8">
              Patient Inquiries
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inquiries.length > 0 ? (
                inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className={`p-6 border rounded-[2rem] transition-all relative overflow-hidden ${
                      inq.is_resolved
                        ? "opacity-60 bg-stone-50 border-stone-200 grayscale"
                        : "bg-white border-blue-100 shadow-sm"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest ${
                          inq.is_resolved ? "text-stone-400" : "text-blue-500"
                        }`}
                      >
                        {inq.subject || "General Inquiry"}
                      </span>
                      {!inq.is_resolved && (
                        <button
                          onClick={() => resolveInquiry(inq.id)}
                          className="flex items-center gap-1 text-[10px] bg-blue-600 text-white px-3 py-1.5 rounded-full font-bold hover:bg-blue-700 transition-colors"
                        >
                          <CheckCircle size={12} /> Mark Resolved
                        </button>
                      )}
                    </div>
                    <h4 className="font-bold text-slate-900">{inq.name}</h4>
                    <p className="text-xs text-slate-400 mb-3">{inq.email}</p>
                    <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                      <p className="text-sm text-slate-600 italic leading-relaxed">
                        "{inq.message}"
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <div className="bg-stone-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="text-stone-300" />
                  </div>
                  <p className="text-stone-400 italic">
                    No new support tickets in the system.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
