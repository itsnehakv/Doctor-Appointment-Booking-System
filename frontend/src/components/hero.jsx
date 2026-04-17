import img from "../assets/doctor-hero.jpg";

const Hero = () => {
  return (
    <section className="relative w-full bg-transparent px-4 pb-16 pt-8">
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
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(#64748b 0.8px, transparent 0.8px)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* 3. Primary Emerald Glow (Top Right) */}
        <div className="absolute top-[-15%] right-[-5%] w-[70%] h-[70%] rounded-full bg-emerald-200/40 blur-[120px]" />

        {/* 4. Secondary Slate Glow (Bottom Left) */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-slate-300/40 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full md:px-16 lg:px-24 xl:px-32 mx-auto flex flex-col md:flex-row items-center justify-between gap-12 py-16">
        
        {/* LEFT CONTENT */}
        <div className="flex flex-col items-start w-full md:w-[55%]">
          
          {/* Status Badge */}
          <div className="relative inline-flex items-center gap-2.5 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full pl-1.5 pr-4 py-1.5 text-sm shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <p className="text-slate-700 font-medium">
              Trusted by 10,000+ patients
            </p>
          </div>

          <h1 className="text-slate-950 text-4xl md:text-5xl lg:text-[56px] leading-[1.1] font-extrabold tracking-tighter max-w-[640px] mt-6">
            Healthcare, <span className="text-emerald-600">Simpler.</span>{" "}
            <br />
            Find Doctors Instantly.
          </h1>

          <p className="text-lg text-slate-600 max-w-lg mt-6 leading-relaxed">
            InstantMD connects you with verified specialists. Browse live
            availability, read reviews, and book confirmed slots in seconds.
            Fast, seamless healthcare.
          </p>

          {/* Search Bar */}
          <div className="flex items-center border border-slate-200 bg-white h-16 w-full rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden mt-10 focus-within:ring-2 focus-within:ring-emerald-200 transition-all">
            <div className="flex items-center flex-1 h-full border-r border-slate-100 pl-6">
              <svg
                className="size-5 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Doctor name, specialization..."
                className="w-full h-full pl-3 outline-none text-base bg-transparent text-slate-900 placeholder:text-slate-400"
              />
            </div>

            <button className="bg-emerald-600 hover:bg-emerald-700 h-full px-8 text-base font-semibold text-white cursor-pointer transition flex items-center gap-2">
              Search
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE - Clean Framed Design */}
        <div className="w-full max-w-md md:max-w-lg mx-auto relative group flex justify-center items-center">
          
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-emerald-400/20 blur-[60px] rounded-full scale-75 group-hover:scale-90 transition-transform duration-500" />

          {/* Rating Badge */}
          <div className="absolute -right-8 bottom-12 p-4 bg-white/90 backdrop-blur-md border border-slate-100 rounded-2xl shadow-2xl z-20 group-hover:translate-y-[-4px] transition-transform">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400 text-xs">
                    ★
                  </span>
                ))}
              </div>
              <span className="text-slate-900 font-bold text-sm">4.9/5</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium mt-1">
              Patient Satisfaction
            </p>
          </div>

          <img
            src={img}
            alt="Verified Doctor"
            className="w-[90%] h-auto rounded-[2.5rem] shadow-2xl relative z-10 border-8 border-white object-cover aspect-[4/5] group-hover:rotate-1 transition-transform duration-500"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;