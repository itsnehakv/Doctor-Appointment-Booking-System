import React from "react";
import aboutImg from "../assets/about-us-hero.webp";

const AboutUs = () => {
  return (
    // Remove any pt-24 or mt-24 from this main div
    <div className="relative w-full min-h-screen bg-slate-50 antialiased">
      {" "}
      {/* HERO SECTION - Ensure it is top-0 and h-screen */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* The Image Container */}
        <div className="absolute inset-0 z-0">
          <img
            src={aboutImg}
            alt="Modern Clinic"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay to make white text and your Navbar visible */}
          <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[1px]" />
        </div>

        {/* Content - Center it, but add top margin so it doesn't collide with the fixed Navbar */}
        <div className="relative z-10 text-center px-4 pt-20">
          <span className="text-emerald-400 font-bold text-sm tracking-widest uppercase mb-4 block">
            The InstantMD Story
          </span>
          <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-tighter">
            About <span className="text-emerald-400">Us</span>
          </h1>
          <p className="text-slate-100 text-lg md:text-2xl mt-8 max-w-3xl mx-auto font-medium">
            Redefining the medical experience through technology and empathy.
          </p>
        </div>
      </section>
      {/* Content below the fold */}
      <div className="max-w-5xl mx-auto px-4 py-24">
        {/* ... (rest of your story, mission, and grid content) ... */}
      </div>
    </div>
  );
};

export default AboutUs;
