import React, { useState, useEffect } from "react";
import {
  MapPin,
  Navigation,
  ArrowLeft,
  CheckCircle2,
  Building2,
  Clock,
  CreditCard,
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
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handlePaymentIntent = async () => {
    if (!selectedSlot) return;
    setIsProcessing(true);

    try {
      const today = new Date().toISOString().split("T")[0];
      const res = await axios.post(
        "http://localhost:8000/bookings/create-intent",
        {
          doctor_id: parseInt(doctorId),
          slot: selectedSlot.time,
          date: today,
          duration: selectedSlot.duration,
          mode: "offline",
        }
      );

      navigate("/payment-gate", {
        state: {
          order_id: res.data.order_id,
          amount: doctor?.fees,
          slot: selectedSlot,
          doctor: doctor,
          mode: "offline",
        },
      });
    } catch (err) {
      alert(err.response?.data?.detail || "Slot is no longer available.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-40 text-slate-500 animate-pulse">
        Initializing Clinic Link...
      </div>
    );

  return (
    <div className="relative w-full min-h-screen bg-slate-50 pt-28 pb-16 px-4">
      {/* BACKGROUND DECO */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(#065f46 0.8px, transparent 0.8px)`,
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[600px] bg-emerald-200/40 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 text-emerald-700 font-bold uppercase text-[10px] tracking-[0.2em] mb-8 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full border border-emerald-100 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />{" "}
          Back
        </button>

        {/* MAIN CARD */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-8 md:p-14 border-[1px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
          {/* HEADER SECTION */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-4 border border-emerald-100">
              Offline/In-Person Consultation
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-6">
              Confirm visit with
              <span className="text-emerald-600">{doctor?.name}</span>
            </h2>

            {/* 🟢 NEW: HOSPITAL & ADDRESS CARD */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50/50 border border-slate-100 p-6 rounded-3xl flex items-start gap-4">
                <div className="bg-white p-3 rounded-2xl shadow-sm text-emerald-600">
                  <Building2 size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
                    Clinic / Hospital
                  </p>
                  <p className="font-bold text-slate-800">
                    {doctor?.hospital_name || "InstantMD General Center"}
                  </p>
                </div>
              </div>
              <div className="bg-slate-50/50 border border-slate-100 p-6 rounded-3xl flex items-start gap-4">
                <div className="bg-white p-3 rounded-2xl shadow-sm text-rose-500">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
                    Address
                  </p>
                  <p className="font-bold text-slate-800 text-sm leading-relaxed">
                    {doctor?.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SLOT SELECTION */}
          <div className="space-y-6 mt-10">
            <div className="flex justify-between items-end">
              <label className="text-slate-500 font-black tracking-widest text-[10px] uppercase">
                Select Your Time
              </label>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                Today's Available Slots
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {slots.length > 0 ? (
                slots.map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-4 rounded-2xl border-2 font-black transition-all duration-300 ${
                      selectedSlot?.time === slot.time
                        ? "border-emerald-500 bg-emerald-600 text-white shadow-lg shadow-emerald-200 scale-[1.02]"
                        : "border-slate-100 bg-white text-slate-500 hover:border-emerald-200 hover:text-emerald-600"
                    }`}
                  >
                    {slot.time}
                  </button>
                ))
              ) : (
                <div className="col-span-full py-12 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                  <p className="text-slate-400 text-xs font-medium italic">
                    No physical consultation slots available today.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* SELECTION FOOTER */}
          {selectedSlot && (
            <div className="mt-12 p-8 bg-emerald-600 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 animate-in fade-in slide-in-from-bottom-6 shadow-xl shadow-emerald-200/50">
              <div className="flex gap-8">
                {/* CHECK-IN SECTION */}
                <div className="flex flex-col">
                  <p className="text-[10px] font-black uppercase text-emerald-100 tracking-widest mb-2">
                    Check-in By
                  </p>
                  <div className="flex items-center gap-2 text-white">
                    <Clock size={18} className="text-emerald-200" />
                    <p className="text-2xl font-black">
                      {selectedSlot.check_in}
                    </p>
                  </div>
                </div>

                {/* DIVIDER */}
                <div className="w-px h-12 bg-white/20 hidden md:block" />

                {/* FEE SECTION */}
                <div className="flex flex-col">
                  <p className="text-[10px] font-black uppercase text-emerald-100 tracking-widest mb-2">
                    Consultation Fee
                  </p>
                  <p className="text-2xl font-black text-white">
                    ₹{doctor?.fees}
                  </p>
                </div>
              </div>

              {/* PAYMENT BUTTON */}
              <button
                onClick={handlePaymentIntent}
                disabled={isProcessing}
                className={`w-full md:w-auto px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-lg ${
                  isProcessing
                    ? "bg-emerald-700 cursor-not-allowed opacity-50"
                    : "bg-white text-emerald-700 hover:bg-emerald-50 hover:scale-105 active:scale-95"
                }`}
              >
                {isProcessing ? (
                  "Processing..."
                ) : (
                  <>
                    <CreditCard size={18} /> Pay & Confirm
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfflineBooking;
