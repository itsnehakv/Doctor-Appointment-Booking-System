import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Clock,
  Calendar as CalendarIcon,
  ArrowLeft,
  Video,
  CheckCircle2,
} from "lucide-react";
import axios from "axios";

const OnlineBooking = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  // --- STATE ---
  const [duration, setDuration] = useState(15);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- PRICING LOGIC ---
  const [doctorFee, setDoctorFee] = useState(0);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/doctors/${doctorId}`);
        setDoctorFee(response.data.fees); // Store the base fee from your DB
      } catch (err) {
        console.error("Could not fetch doctor fees", err);
      }
    };
    fetchDoctorDetails();
  }, [doctorId]);
  const calculateFee = () => {
    const multipliers = { 15: 1.0, 30: 1.5, 45: 2.0, 60: 2.5 };
    const multiplier = multipliers[duration] || 1.0;
    return doctorFee * multiplier;
  };
  // --- EFFECTS ---
  useEffect(() => {
    if (!doctorId) return;
    const fetchSlots = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_BASE_URL}/doctors/${doctorId}/slots?booking_date=${selectedDate}&mode=online&requested_duration=${duration}`
        );
        setSlots(response.data.slots);
      } catch (err) {
        console.error("Error fetching slots:", err);
      }
      setLoading(false);
    };
    fetchSlots();
  }, [doctorId, selectedDate, duration]);

  // 2. Reset selection if user changes filters (Step 1 or Date)
  useEffect(() => {
    setSelectedSlot(null);
  }, [duration, selectedDate]);

  const handlePaymentInitiation = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/bookings/create-intent`,
        {
          doctor_id: doctorId,
          duration: duration,
          date: selectedDate,
          slot: selectedSlot,
          mode: "online",
          amount: calculateFee(),
        }
      );

      // This is where the magic happens!
      const { order_id, amount } = response.data;

      // Navigate to the simulator we just built
      navigate("/payment-gate", {
        state: {
          order_id,
          amount,
          doctor: { name: "Doctor" }, // Add doctor info
          slot: { time: selectedSlot }, // Standardize slot format
          mode: "online",
        },
      });
    } catch (err) {
      console.error("Payment initiation failed:", err);
      alert("Could not initiate payment. Please try again.");
    }
  };
  return (
    <div className="relative w-full min-h-screen bg-slate-50 pt-28 pb-16 px-4">
      {/* 🟢 DOTTED MESH BACKGROUND */}
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
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 text-emerald-700 font-bold uppercase text-[10px] tracking-[0.2em] mb-8 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full border border-emerald-100 hover:bg-emerald-600 hover:text-white transition-all duration-300 shadow-sm"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Mode
        </button>

        {/* MAIN CARD */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-14 border-[3px] border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.2)] relative z-10 overflow-hidden">
          {/* HEADING */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-4 border border-emerald-100">
              <Video size={10} /> Video Consultation
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Book your{" "}
              <span className="text-emerald-600 font-extrabold">Time Slot</span>
            </h2>
          </div>

          {/* STEP 1: DURATION */}
          <div className="mb-10">
            <label className="flex items-center gap-2 text-slate-500 font-bold mb-4 tracking-widest text-[10px] uppercase">
              <Clock size={12} /> Step 1: Duration
            </label>
            <div className="grid grid-cols-4 gap-3 w-full max-w-sm mx-auto">
              {[15, 30, 45, 60].map((mins) => (
                <button
                  key={mins}
                  onClick={() => setDuration(mins)}
                  className={`py-3 rounded-2xl border-2 transition-all duration-300 ${
                    duration === mins
                      ? "border-emerald-500 bg-emerald-400 text-white shadow-md scale-105"
                      : "border-slate-100 bg-white/50 text-slate-500 hover:border-emerald-200"
                  }`}
                >
                  <span className="block text-lg font-bold">{mins}</span>
                  <span className="text-[9px] uppercase font-bold tracking-tighter opacity-80">
                    Mins
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 2: DATE & SLOTS */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <label className="flex items-center gap-2 text-slate-500 font-bold tracking-widest text-[10px] uppercase">
                <CalendarIcon size={12} /> Step 2: Select Time
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
              <div className="py-20 text-center animate-pulse">
                <p className="text-emerald-600 font-bold uppercase text-[9px] tracking-[0.3em]">
                  Checking Availability...
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {slots.length > 0 ? (
                  slots
                    .filter((slot) =>
                      duration === 60
                        ? slot.time.endsWith(":00") || slot.time.endsWith(":30")
                        : true
                    )
                    .map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => setSelectedSlot(slot.time)}
                        className={`py-3 rounded-xl border font-bold transition-all ${
                          selectedSlot === slot.time
                            ? "border-emerald-500 bg-emerald-600 text-white"
                            : "border-slate-100 bg-white text-slate-600"
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))
                ) : (
                  <div className="col-span-full py-12 text-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
                    <p className="text-slate-400 text-xs font-medium italic">
                      No slots available for this date.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* STEP 3: CONFIRMATION FOOTER */}
          {selectedSlot && (
            <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shadow-inner">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
                    Total Fee
                  </p>
                  <p className="text-3xl font-black text-slate-900">
                    ₹{calculateFee()}
                  </p>
                </div>
              </div>

              <button
                onClick={handlePaymentInitiation}
                className="w-full md:w-auto bg-emerald-600 text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-200 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                Confirm & Pay Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnlineBooking;
