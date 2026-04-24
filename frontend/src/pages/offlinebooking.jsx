import React, { useState, useEffect } from "react";
import {
  MapPin,
  Navigation,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const OfflineBooking = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRes = await axios.get(
          `http://localhost:8000/doctors/${doctorId}`
        );
        setDoctor(docRes.data);

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

  const handlePaymentIntent = () => {
    if (!selectedSlot) return;
    console.log("Proceeding with:", selectedSlot);
  };

  if (loading)
    return (
      <div className="text-center mt-40 text-slate-500">
        Loading Clinic Details...
      </div>
    );

  return (
    <div className="relative w-full min-h-screen bg-slate-50 pt-28 pb-16 px-4">

      {/* 🔥 SAME BG AS ONLINE */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(#065f46 0.8px, transparent 0.8px)`,
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[600px] bg-emerald-200/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[50%] h-[500px] bg-emerald-100/30 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* 🔙 BACK */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 text-emerald-700 font-bold uppercase text-[10px] tracking-[0.2em] mb-8 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full border border-emerald-100 hover:bg-emerald-600 hover:text-white transition-all duration-300 shadow-sm"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        {/* 🟢 MAIN CARD */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-14 border-[3px] border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.2)] relative overflow-hidden">

          {/* HEADER */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-4 border border-emerald-100">
              In-Person Consultation
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Visit{" "}
              <span className="text-emerald-600 font-extrabold">
                {doctor?.name}
              </span>
            </h2>

            <p className="flex items-center gap-2 text-slate-500 mt-3 font-medium">
              <MapPin size={16} className="text-rose-500" />
              {doctor?.address}
            </p>
          </div>

          {/* SLOT SECTION */}
          <div className="space-y-6">

            <label className="text-slate-500 font-bold tracking-widest text-[10px] uppercase">
              Available Slots
            </label>

            {loading ? (
              <div className="py-20 text-center animate-pulse">
                <p className="text-emerald-600 font-bold uppercase text-[9px] tracking-[0.3em]">
                  Checking Availability...
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {slots.length > 0 ? (
                  slots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-3 rounded-xl border font-bold transition-all ${
                        selectedSlot?.time === slot.time
                          ? "border-emerald-500 bg-emerald-600 text-white"
                          : "border-slate-100 bg-white text-slate-600 hover:border-emerald-200"
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
                    <p className="text-slate-400 text-xs font-medium italic">
                      No slots available for today.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* FOOTER */}
          {selectedSlot && (
            <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shadow-inner">
                  <CheckCircle2 size={24} />
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
                    Selected Time
                  </p>
                  <p className="text-2xl font-black text-slate-900">
                    {selectedSlot.time}
                  </p>
                </div>
              </div>

              <button
                onClick={handlePaymentIntent}
                className="w-full md:w-auto bg-emerald-600 text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-200 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                Proceed to Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfflineBooking;