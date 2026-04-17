import React from "react";

const FeaturesSection = () => {
  const features = [
    {
      title: "Smart Booking",
      desc: "Select a medical service and instantly browse a list of board-certified specialists ready to assist you.",
      size: "md:col-span-2 md:row-span-1",
      icon: (
        <>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </>
      ),
    },
    {
      title: "Flexible Slots",
      desc: "Choose between physical in-person visits or convenient online video consultations.",
      size: "md:col-span-1 md:row-span-1",
      icon: (
        <>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </>
      ),
    },
    {
      title: "Secure Payments",
      desc: "Complete your booking with a secure, encrypted payment gateway for peace of mind.",
      size: "md:col-span-1 md:row-span-2",
      icon: (
        <>
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </>
      ),
    },
    {
      title: "Easy Cancellation",
      desc: "Cancel or reschedule appointments instantly through your personal health dashboard.",
      size: "md:col-span-1 md:row-span-1",
      icon: (
        <>
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </>
      ),
    },
    {
      title: "Live Availability",
      desc: "View real-time doctor schedules. Book confirmed time slots without the need for phone calls.",
      size: "md:col-span-2 md:row-span-1",
      icon: (
        <>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </>
      ),
    },
  ];

  return (
    <section className="relative w-full bg-transparent py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase">
            Platform Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight mt-2">
            Modern Healthcare,{" "}
            <span className="text-emerald-600">Simplified.</span>
          </h2>
        </div>

        {/* Bento Grid with Permanent Emerald Accents */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:min-h-[500px]">
          {features.map((f, i) => (
            <div
              key={i}
              className={`${f.size} bg-white border border-stone-200 p-8 rounded-[2.5rem] flex flex-col justify-between hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-500 group`}
            >
              {/* Permanent Emerald Icon Box */}
              <div className="size-12 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm transition-transform duration-300 group-hover:scale-110">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {f.icon}
                </svg>
              </div>

              <div>
                <h3 className="text-xl font-bold text-stone-900 tracking-tight mb-3">
                  {f.title}
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed">
                  {f.desc}
                </p>

                {/* Visual indicator that always stays visible */}
                <div className="w-8 h-1 bg-emerald-100 rounded-full mt-6 group-hover:w-16 group-hover:bg-emerald-500 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
