import React from "react";
import aboutImg from "../assets/about-us-hero.webp";

const AboutUs = () => {
  return (
    <div className="relative w-full min-h-screen bg-slate-50 antialiased">
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Image Container */}
        <div className="absolute inset-0 z-0">
          <img
            src={aboutImg}
            alt="Modern Clinic"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[1px]" />
        </div>

        {/* <div className="relative z-10 text-center px-4 pt-20">
          <span className="text-emerald-400 font-bold text-sm tracking-widest uppercase mb-4 block">
            The InstantMD Story
          </span>
          <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-tighter">
            About <span className="text-emerald-400">Us</span>
          </h1>
          <p className="text-slate-100 text-lg md:text-2xl mt-8 max-w-3xl mx-auto font-medium">
            Redefining the medical experience through technology and empathy.
          </p>
        </div> */}
        <div className="relative z-10 text-center px-4 pt-32 max-w-5xl mx-auto">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase text-emerald-400 border border-emerald-400/30 rounded-full bg-emerald-950/20 backdrop-blur-sm">
            Establishing a New Standard
          </span>

          <h1 className="text-6xl md:text-9xl font-black text-white tracking-tight leading-[0.9] mb-8">
            Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              Care.
            </span>
          </h1>

          <p className="text-slate-200 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed opacity-90">
            At InstantMD, we aren't just building a platform; we're architecting
            a seamless bridge between rapid medical response and empathetic
            human care.
          </p>

          {/* Added a decorative element to anchor the text */}
          <div className="mt-12 flex justify-center gap-4">
            <div className="h-[1px] w-12 bg-emerald-500/50 self-center"></div>
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <div className="h-[1px] w-12 bg-emerald-500/50 self-center"></div>
          </div>
        </div>
      </section>
      <div className="max-w-5xl mx-auto px-4 py-24"></div>
    </div>
  );
};

export default AboutUs;
