import React, { useState, useEffect } from "react";
import {
  MapPin,
  ArrowLeft,
  CheckCircle2,
  Building2,
  Clock,
  Calendar as CalendarIcon,
  CreditCard,
  MapPinned,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const OfflineBooking = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  // --- STATE ---
  const [duration, setDuration] = useState(30); // Default 30 for offline
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // --- FETCH DOCTOR DETAILS ---
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/doctors/${doctorId}`
        );
        setDoctor(response.data);
      } catch (err) {
        console.error("Error fetching doctor details:", err);
      }
    };
    fetchDoctor();
  }, [doctorId]);

  // --- FETCH SLOTS ---
  useEffect(() => {
    if (!doctorId) return;
    const fetchSlots = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/doctors/${doctorId}/slots?booking_date=${selectedDate}&mode=offline&requested_duration=${duration}`
        );
        setSlots(response.data.slots);
      } catch (err) {
        console.error("Error fetching slots:", err);
      }
      setLoading(false);
    };
    fetchSlots();
  }, [doctorId, selectedDate, duration]);

  // Reset selection on filter change
  useEffect(() => {
    setSelectedSlot(null);
  }, [duration, selectedDate]);

  // --- PRICING LOGIC ---
  const calculateFee = () => {
    if (!doctor) return 0;
    const multipliers = { 15: 1.0, 30: 1.0, 45: 1.5, 60: 2.0 };
    const multiplier = multipliers[duration] || 1.0;
    return doctor.fees * multiplier;
  };

  const handlePaymentInitiation = async () => {
    if (!selectedSlot) return;
    setIsProcessing(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/bookings/create-intent",
        {
          doctor_id: doctorId,
          duration: duration,
          date: selectedDate,
          slot: selectedSlot.time,
          mode: "offline",
          amount: calculateFee(),
        }
      );

      const { order_id, amount } = response.data;

      navigate("/payment-gate", {
        state: {
          order_id,
          amount,
          doctor: doctor,
          slot: selectedSlot,
          mode: "offline",
        },
      });
    } catch (err) {
      console.error("Booking initiation failed:", err);
      alert(err.response?.data?.detail || "Could not initiate booking.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-slate-50 pt-28 pb-16 px-4">
      {/* MESH BACKGROUND */}
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

        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-14 border-[3px] border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
          {/* HEADER */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-4 border border-emerald-100">
              <MapPinned size={10} /> In-Person Visit
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Visit{" "}
              <span className="text-emerald-600 font-extrabold">
                {doctor?.name}
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-slate-50/50 border border-slate-100 p-4 rounded-2xl flex items-center gap-3">
                <Building2 size={18} className="text-emerald-600" />
                <div>
                  <p className="text-[9px] font-black uppercase text-slate-400">
                    Clinic
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    {doctor?.hospital_name}
                  </p>
                </div>
              </div>
              <div className="bg-slate-50/50 border border-slate-100 p-4 rounded-2xl flex items-center gap-3">
                <MapPin size={18} className="text-rose-500" />
                <div>
                  <p className="text-[9px] font-black uppercase text-slate-400">
                    Location
                  </p>
                  <p className="text-sm font-bold text-slate-800 truncate w-40">
                    {doctor?.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/*  DATE & SLOTS */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <label className="flex items-center gap-2 text-slate-500 font-bold tracking-widest text-[10px] uppercase">
                <CalendarIcon size={12} /> Choose Date & Time
              </label>
              <input
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-emerald-500 transition-all cursor-pointer"
              />
            </div>

            {loading ? (
              <div className="py-20 text-center animate-pulse text-emerald-600 font-bold uppercase text-[9px] tracking-[0.3em]">
                Fetching Available Slots...
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
                      No available slots for this selection.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {selectedSlot && (
            <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
                    Check-in at {selectedSlot.check_in}
                  </p>
                  <p className="text-3xl font-black text-slate-900">
                    ₹{calculateFee()}
                  </p>
                </div>
              </div>

              <button
                onClick={handlePaymentInitiation}
                disabled={isProcessing}
                className="w-full md:w-auto bg-emerald-600 text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-emerald-100"
              >
                {isProcessing ? (
                  "Processing..."
                ) : (
                  <>
                    <CreditCard size={18} /> Confirm & Pay
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
