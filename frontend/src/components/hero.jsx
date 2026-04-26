import img from "../assets/doctor-hero.jpg";
import { Star } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative w-full bg-transparent px-4 pb-16 pt-8">
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(#64748b 0.8px, transparent 0.8px)`,
            backgroundSize: "24px 24px",
          }}
        />

        <div className="absolute top-[-15%] right-[-5%] w-[70%] h-[70%] rounded-full bg-emerald-200/40 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-slate-300/40 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full md:px-16 lg:px-24 xl:px-32 mx-auto flex flex-col md:flex-row items-center justify-between gap-12 py-16">
        {/* LEFT */}
        <div className="flex flex-col items-start w-full md:w-[55%]">
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
            Healthcare, <span className="text-emerald-600">Simpler.</span>
            <br />
            Find Doctors Instantly.
          </h1>

          <p className="text-lg text-slate-600 max-w-lg mt-6 leading-relaxed">
            InstantMD connects you with verified specialists. Browse live
            availability, read reviews, and book confirmed slots in seconds.
            Fast, seamless healthcare.
          </p>

          {/* --- MINIMALIST STATS ROW --- */}
          <div className="flex flex-row items-center gap-8 md:gap-12 mt-10 mb-8 w-full">
            {/* Specialists Stat */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">
                  500<span className="text-emerald-500">+</span>
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.15em] mt-1">
                Specialists
              </p>
            </div>

            {/* Vertical Divider */}
            <div className="w-px h-10 bg-slate-200/80" />

            {/* Consultations Stat */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">
                  15K<span className="text-emerald-500">+</span>
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.15em] mt-1">
                Consultations
              </p>
            </div>

            {/* Vertical Divider */}
            <div className="w-px h-10 bg-slate-200/80" />

            {/* Rating Stat */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">
                  4.9
                </span>
                <Star
                  size={16}
                  className="text-yellow-400 fill-yellow-400 mb-1"
                />
              </div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.15em] mt-1">
                Avg Rating
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full max-w-md md:max-w-lg mx-auto relative group flex justify-center items-center">
          {/* Glow */}
          <div className="absolute inset-0 bg-emerald-400/20 blur-[60px] rounded-full scale-75 group-hover:scale-90 transition-transform duration-500" />

          {/* ⭐ Rating */}
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

          {/* 🟢 SINCE 2020 */}
          <div className="absolute -right-8 bottom-36 p-4 bg-white/90 backdrop-blur-md border border-slate-100 rounded-2xl shadow-2xl z-20 group-hover:translate-y-[-4px] transition-transform">
            <span className="text-emerald-700 font-bold text-sm">
              SINCE 2020
            </span>
            <p className="text-[10px] text-slate-500 font-medium mt-1">
              Serving Patients with Care
            </p>
          </div>

          {/* Image (MOTION REMOVED HERE) */}
          <img
            src={img}
            alt="Verified Doctor"
            className="w-[90%] h-auto rounded-[2.5rem] shadow-2xl relative z-10 border-8 border-white object-cover aspect-[4/5]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
