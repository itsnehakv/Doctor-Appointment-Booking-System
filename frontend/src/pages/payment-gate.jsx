import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ShieldCheck,
  XCircle,
  CreditCard,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const PaymentGate = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle"); // 'idle', 'processing', 'success', 'error'

  const [errorMessage, setErrorMessage] = useState("");
  const handleConfirm = async () => {
    if (!isLoaded || !isSignedIn) {
      alert("Please sign in to complete booking");
      return;
    }
    const orderId = state?.order_id;
    if (!orderId) {
      setErrorMessage(
        "Missing Transaction Reference. Please restart the booking."
      );
      setStatus("error");
      return;
    }

    setStatus("processing");
    try {
      const userEmail = user.primaryEmailAddress?.emailAddress;
      await axios.post("http://localhost:8000/bookings/confirm", {
        order_id: orderId,
        patient_id: user.id,
        email: userEmail,
      });
      setStatus("success");
      setTimeout(() => navigate("/my-appointments"), 2000);
    } catch (err) {
      console.error(err);
      setStatus("error");

      if (!err.response) {
        // No response = Server is down
        setErrorMessage(
          "Could not connect to the database. Please ensure your FastAPI backend is running."
        );
      } else {
        setErrorMessage(
          "This booking session has expired or the slot was already finalized. Please try a different time."
        );
      }
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-emerald-500 via-white to-emerald-200 flex flex-col items-center justify-center p-6 pt-40">
      {/* 🟢 SUBTLE MESH OVERLAY */}
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#10b981 0.5px, transparent 0.5px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* 🟢 CENTERED GLASS CARD */}
      <div className="relative z-10 max-w-md w-full">
        <div className="bg-white/80 backdrop-blur-2xl rounded-[3rem] p-10 md:p-12 border-[3px] border-emerald-500/20 shadow-[0_20px_50px_rgba(16,185,129,0.1)] text-center">
          {/* ICON SECTION */}
          <div className="inline-flex h-20 w-20 bg-emerald-100 text-emerald-600 rounded-3xl items-center justify-center shadow-inner mb-8">
            <CreditCard size={38} />
          </div>

          {/* TEXT CONTENT */}
          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
              Complete Payment
            </h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
              Order ID:{" "}
              <span className="text-emerald-600 font-mono">
                {state?.order_id || "PB_INTENT_404"}
              </span>
            </p>
          </div>
          <div className="flex items-center justify-between gap-4 mb-6 px-2">
            <div className="text-left">
              <p className="text-[9px] font-black uppercase text-slate-400 tracking-tighter">
                Consultation
              </p>
              <p className="text-sm font-bold text-slate-700 capitalize">
                {state?.mode || "Medical"} Visit
              </p>
            </div>
            <div className="h-8 w-px bg-slate-100" />
            <div className="text-right">
              <p className="text-[9px] font-black uppercase text-slate-400 tracking-tighter">
                Time Slot
              </p>
              <p className="text-sm font-bold text-slate-700">
                {state?.slot?.time || state?.slot || "--:--"}
              </p>
            </div>
          </div>

          {/* PRICING DISPLAY */}
          <div className="bg-emerald-50/50 rounded-[2rem] p-8 mb-10 border border-emerald-100 shadow-inner">
            <p className="text-[10px] uppercase font-black text-emerald-700/50 tracking-[0.2em] mb-2">
              Total Amount Due
            </p>
            <p className="text-5xl font-black text-slate-900">
              <span className="text-2xl align-top mr-1 font-bold">₹</span>
              {state?.amount || "0"}
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="space-y-4">
            <button
              onClick={handleConfirm}
              disabled={status === "processing" || status === "success"}
              className={`w-full py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl ${
                status === "processing"
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 shadow-emerald-200 hover:shadow-emerald-300"
              }`}
            >
              {status === "processing" ? (
                "Processing..."
              ) : (
                <>
                  <ShieldCheck size={18} /> Pay Amount
                </>
              )}
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full py-5 bg-transparent text-slate-400 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:text-red-500 transition-all flex items-center justify-center gap-2"
            >
              <XCircle size={14} /> Cancel Transaction
            </button>
          </div>
        </div>
      </div>

      {/* 🟢 CUSTOM OVERLAY MODAL */}
      {status !== "idle" && status !== "processing" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-emerald-900/20 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] p-12 max-w-sm w-full shadow-2xl text-center border-4 border-white">
            <div
              className={`w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center ${
                status === "success"
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {status === "success" ? (
                <CheckCircle2 size={48} className="animate-bounce" />
              ) : (
                <AlertCircle size={48} />
              )}
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-3 uppercase tracking-tight">
              {status === "success"
                ? "Payment Verified"
                : errorMessage.includes("database")
                ? "System Error"
                : "Session Expired"}
            </h3>

            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-10 px-4">
              {status === "success"
                ? "Your appointment has been confirmed. You will be redirected to your dashboard now."
                : errorMessage}
            </p>

            {status === "error" && (
              <button
                onClick={() => {
                  setStatus("idle");
                  if (!errorMessage.includes("database")) {
                    navigate(-1); // If it's a session error, send them back to pick a new slot
                  }
                }}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest"
              >
                {errorMessage.includes("database")
                  ? "Retry Transaction"
                  : "Pick New Slot"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentGate;
