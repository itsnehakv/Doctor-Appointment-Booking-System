import React, { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Navigation,
  ShieldCheck,
  Calendar as CalendarIcon,
  ArrowLeft,
  Video,
  CheckCircle2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
const OfflineBooking = () => {
  const { doctorId } = useParams(); // Get ID from URL
  const [doctor, setDoctor] = useState(null);
  const [slots, setSlots] = useState([]); // 🟢 Fixes the ReferenceError
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    // Fetch doctor and slots here
    const fetchData = async () => {
      try {
        const docRes = await axios.get(
          `http://localhost:8000/doctors/${doctorId}`
        );
        setDoctor(docRes.data);

        // Fetch slots for the current date
        const today = new Date().toISOString().split("T")[0];
        const slotRes = await axios.get(
          `http://localhost:8000/doctors/${doctorId}/slots?mode=offline&booking_date=${today}`
        );
        setSlots(slotRes.data.slots);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [doctorId]);

  if (loading) return <div>Loading Clinic Details...</div>;

  return (
    <div className="min-h-screen bg-slate-50 pt-28 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start justify-between">
          <div>
            <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              In-Person Consultation
            </span>
            <h1 className="text-3xl font-black text-slate-900 mt-4">
              {doctor?.name}
            </h1>
            <p className="flex items-center gap-2 text-slate-500 mt-2 font-medium">
              <MapPin size={16} className="text-rose-500" /> {doctor?.address}
            </p>
          </div>
          <button className="p-4 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all">
            <Navigation size={20} />
          </button>
        </div>
      </div>
      {/* 🟢 SLOT SELECTION */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100">
          <h3 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-6">
            Available Slots
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {slots.map((slot) => (
              <button
                key={slot.time}
                onClick={() => setSelectedSlot(slot)}
                className={`py-4 rounded-2xl font-bold transition-all ${
                  selectedSlot?.time === slot.time
                    ? "bg-slate-900 text-white"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>

        {/* 🟢 CHECK-IN NOTICE */}
        {selectedSlot && (
          <div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-emerald-100 animate-in fade-in slide-in-from-bottom-4">
            <h3 className="font-black uppercase text-[10px] tracking-[0.2em] opacity-80 mb-4">
              Booking Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-sm opacity-90">Appointment Time</span>
                <span className="font-bold text-xl">{selectedSlot.time}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-sm opacity-90">Required Check-in</span>
                <span className="font-bold text-xl text-emerald-200">
                  {selectedSlot.check_in}
                </span>
              </div>
            </div>
            <button
              onClick={handlePaymentIntent}
              className="w-full mt-8 py-5 bg-white text-emerald-700 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-emerald-50 transition-all"
            >
              Proceed to Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default OfflineBooking;
