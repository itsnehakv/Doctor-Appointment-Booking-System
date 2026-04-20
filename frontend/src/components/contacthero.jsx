import teleimg from "../assets/telephone.avif";

const ContactHero = () => {
  return (
    <section className="relative w-full bg-white px-4 pb-20 pt-32 overflow-hidden">
      {/* --- ENHANCED BACKGROUND DESIGN --- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* 1. Large Scale Grid Layer */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* 2. High-Density Dot Mesh Overlay */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `radial-gradient(#64748b 0.8px, transparent 0.8px)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* 3. Primary Emerald Glow (Top Right) */}
        <div className="absolute top-[-15%] right-[-5%] w-[70%] h-[70%] rounded-full bg-emerald-100/40 blur-[120px]" />

        {/* 4. Secondary Slate Glow (Bottom Left) */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-slate-200/40 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full md:px-16 lg:px-24 xl:px-32 mx-auto flex flex-col md:flex-row items-center justify-between gap-16 py-12">
        {/* LEFT CONTENT */}
        <div className="flex flex-col items-start w-full md:w-[55%]">
          {/* Section Label */}
          <h2 className="text-emerald-600 font-bold text-[11px] uppercase tracking-[0.3em] mb-4">
            Contact Us
          </h2>

          <h1 className="text-slate-950 text-5xl md:text-6xl lg:text-[64px] leading-[1.1] font-bold tracking-tighter max-w-[600px]">
            Connect with our <br />
            <span className="text-emerald-600 font-extrabold">
              Operations Team.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-lg mt-8 leading-relaxed font-light">
            Have questions about our medical infrastructure or need technical
            support? Our team is architecting the future of care, one connection
            at a time.
          </p>

          {/* Quick Support Link */}
          <div className="flex items-center gap-3 mt-12 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="size-10 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-emerald-500">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">
                Direct Line
              </span>
              <p className="text-lg font-semibold text-slate-900">
                +91 98765 43210
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE - New Square Framed Design */}
        <div className="w-full max-w-sm md:max-w-md mx-auto relative group">
          {/* Main Background Container */}
          <div className="relative z-10 w-full aspect-square bg-white p-2.5 rounded-[3rem] border border-slate-100/80 shadow-2xl shadow-slate-900/5 group-hover:border-emerald-100/60 transition-colors duration-500">
            {/* Emerald Accent Layer (Behind Image) */}
            <div className="absolute inset-1.5 bg-emerald-50/50 rounded-[2.5rem] -z-10 group-hover:bg-emerald-50 transition-colors" />

            {/* Subtle Hover Glow Effect */}
            <div className="absolute inset-0 bg-emerald-400/0 blur-[40px] rounded-full group-hover:bg-emerald-400/5 transition-colors duration-1000" />

            {/* Precision Image Container */}
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-inner p-1.5 bg-white">
              {/* Image with subtle aesthetic adjustments */}
              <img
                src={teleimg}
                alt="Operations Visual"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1500ms] brightness-[1.02] contrast-[1.03] rounded-[2rem]"
              />

              {/* Ultra-subtle overlay for tech texture */}
              <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.015] bg-[linear-gradient(90deg,transparent_24%,#64748b_25%,#64748b_26%,transparent_27%,transparent_74%,#64748b_75%,#64748b_76%,transparent_77%)] bg-[length:24px_100%]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
