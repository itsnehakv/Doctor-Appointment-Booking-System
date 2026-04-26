import React, { useState } from "react";
import axios from "axios";
import TransmitButton from "./sendmessagebutton";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Service Request", // Default subject for all inquiries
    message: "",
  });

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
    try {
      const response = await axios.post(`${API_BASE_URL}/contact`, formData);
      if (response.status === 200) {
        setFormData({
          name: "",
          email: "",
          subject: "Service Request",
          message: "",
        }); // Clear form
      }
    } catch (err) {
      console.error("Submission Error:", err);
      alert("Failed to send inquiry. Is the backend running?");
    }
  };

  return (
    <section className="relative py-10 max-w-3xl mx-auto px-6 overflow-hidden">
      {/* ... decorative divs ... */}
      <div className="relative bg-white/70 backdrop-blur-xl border border-slate-200 p-8 md:p-14 rounded-[3rem] shadow-2xl shadow-slate-200/50">
        <div className="mb-12">
          <h3 className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-900">
            Submit a <span className="text-emerald-600">Service Request.</span>
          </h3>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-bold">
                FULL NAME
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500/50 transition-all"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-bold">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500/50 transition-all"
                placeholder="email@domain.com"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-bold">
              MESSAGE
            </label>
            <textarea
              rows="4"
              required
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500/50 transition-all resize-none"
              placeholder="Describe your requirements..."
            ></textarea>
          </div>

          <TransmitButton type="submit" />
        </form>
      </div>
    </section>
  );
}
