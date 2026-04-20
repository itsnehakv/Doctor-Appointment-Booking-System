import { SupportGrid } from "../components/supportgrid";
import ContactHero from "../components/contacthero";
import { Socials } from "../components/socials";
import { ContactForm } from "../components/contactform";

export default function Contact() {
  return (
    <div className="relative w-full min-h-screen bg-slate-50 font-geist antialiased">
      {/* --- SHARED BACKGROUND LAYER (The Engineering Canvas) --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
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

        {/* 3. Top-Right Glow */}
        <div className="absolute top-[-10%] right-[-5%] w-[70%] h-[800px] rounded-full bg-emerald-200/40 blur-[120px]" />

        {/* 4. Bottom-Left Glow */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[700px] rounded-full bg-emerald-100/30 blur-[130px]" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 pt-24">
        {/* 1. Hero Section */}
        <ContactHero />

        {/* 2. Social Connection Hub */}
        <div className="flex items-center justify-center py-8">
          <Socials />
        </div>

        {/* 3. Support Grid Section (Full-page style) */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-12">
          <SupportGrid />
        </div>

        {/* 4. Visual Separator */}

        <div className="w-16 h-[3px] bg-gradient-to-r from-emerald-600 to-emerald-300 rounded-full mx-auto mb-3"></div>
        <ContactForm />
      </div>
    </div>
  );
}
