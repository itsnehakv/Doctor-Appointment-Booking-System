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

        {/* RIGHT IMAGE - HIGH-ENERGY 3D MULTI-FRAME */}
        <div className="w-full max-w-sm md:max-w-md mx-auto relative group perspective-1000">
          {/* 1. The "Energy Layers" - Dramatic expansion on hover */}
          <div
            className="absolute inset-0 z-0 bg-emerald-200/40 rounded-[4rem] blur-[20px] 
    transition-all duration-500 ease-out 
    group-hover:-translate-x-12 group-hover:-translate-y-8 group-hover:scale-110 group-hover:rotate-6"
          />

          <div
            className="absolute inset-0 z-0 bg-slate-200/60 rounded-[4rem] blur-[15px] 
    transition-all duration-500 ease-out delay-75
    group-hover:translate-x-12 group-hover:translate-y-8 group-hover:-rotate-6"
          />

          {/* 2. The Main Structure - With 3D Tilt effect */}
          <div
            className="relative z-10 w-full aspect-square bg-white border-2 border-slate-100 p-4 rounded-[3.5rem] 
    shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] 
    transition-all duration-500 ease-out
    group-hover:scale-105 group-hover:-rotate-2 group-hover:border-emerald-200 group-hover:shadow-[0_40px_80px_-20px_rgba(16,185,129,0.25)]
    overflow-hidden"
          >
            {/* Inner Precision Grid */}
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: `linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />

            {/* 3. The Lens - Beveled inner container */}
            <div
              className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-slate-100 bg-white 
      transition-all duration-500 
      group-hover:border-emerald-400 group-hover:p-1"
            >
              {/* 4. The Image - Heavy Zoom and Brightness Pop */}
              <img
                src={teleimg}
                alt="Operations Visual"
                className="w-full h-full object-cover rounded-[2rem]
          transition-all duration-700 ease-in-out
          group-hover:scale-125 group-hover:brightness-110 group-hover:contrast-110"
              />

              {/* 5. Animated Scanline Effect */}
              <div
                className="absolute inset-0 z-10 pointer-events-none 
        bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent 
        h-[200%] w-full -translate-y-full 
        group-hover:animate-[scan_2s_linear_infinite]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
