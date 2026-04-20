import React from "react";
import {
  Calendar,
  Clock,
  CreditCard,
  XCircle,
  Activity,
  ShieldCheck,
  FileText,
  Headphones,
  Bell
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      title: "Smart Booking",
      description: "Browse doctors by specialty, location, and ratings. Book appointments instantly without waiting or calling clinics.",
      icon: <Calendar size={18} />,
    },
    {
      title: "Flexible Slots",
      description: "Choose time slots that fit your schedule, including same-day bookings and both in-person or online consultations.",
      icon: <Clock size={18} />,
    },
    {
      title: "Secure Payments",
      description: "Pay safely using trusted payment methods. All transactions are encrypted to protect your personal and financial data.",
      icon: <CreditCard size={18} />,
    },
    {
      title: "Easy Cancellation",
      description: "Plans changed? Cancel or reschedule appointments anytime with just a few clicks, no hassle or long processes.",
      icon: <XCircle size={18} />,
    },
    {
      title: "Live Availability",
      description: "View real-time doctor availability and instantly see open slots without calling or waiting for confirmation.",
      icon: <Activity size={18} />,
    },
    {
      title: "Verified Doctors",
      description: "All doctors are verified professionals with proper credentials, ensuring safe and trusted healthcare services.",
      icon: <ShieldCheck size={18} />,
    },
    {
      title: "Patient Records",
      description: "Securely store and access your medical history, prescriptions, and reports anytime from one place.",
      icon: <FileText size={18} />,
    },
    {
      title: "24/7 Support",
      description: "Need help? Our support team is available anytime to assist with bookings, cancellations, or any issues.",
      icon: <Headphones size={18} />,
    },
    {
      title: "Instant Notifications",
      description: "Receive timely reminders, booking confirmations, and updates so you never miss your appointment.",
      icon: <Bell size={18} />,
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-slate-50 px-6 md:px-16 py-20 flex flex-col items-center">

      {/* Header */}
      <div className="max-w-4xl w-full mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-emerald-700 mb-3 tracking-tight">
          InstantMD Platform Features
        </h1>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          Built to simplify healthcare access with speed, security, and seamless experience.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full max-w-5xl border border-slate-200 rounded-2xl overflow-hidden bg-white/70 backdrop-blur">

        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 flex flex-col gap-3 border-r border-b border-slate-200 
            transition-all duration-300 cursor-pointer group 
            hover:bg-gradient-to-br hover:from-white hover:to-emerald-50
            hover:shadow-lg hover:scale-[1.02]"
          >
            {/* Icon */}
            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 
            group-hover:scale-110 transition">
              {feature.icon}
            </div>

            {/* Title */}
            <h3 className="text-sm font-semibold text-slate-800">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-xs text-slate-500 leading-relaxed">
              {feature.description}
            </p>

            {/* Bottom Glow Line */}
            <div className="w-6 h-[2px] bg-emerald-300 rounded-full mt-3 group-hover:w-12 transition-all duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;