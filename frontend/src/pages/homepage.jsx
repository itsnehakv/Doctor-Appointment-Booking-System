import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturesSection from "../components/feature-section";
import Testimonials from "../components/review";
import Footer from "../components/footer";

function HomePage() {
  return (
    <div className="relative w-full min-h-screen bg-slate-50 font-geist">
      {/* --- SHARED BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* 1. Large Scale Grid Layer (Continuous) */}
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

        {/* 3. Hero Section Glow */}
        <div className="absolute top-[-10%] right-[-5%] w-[70%] h-[800px] rounded-full bg-emerald-200/40 blur-[120px]" />

        {/* 4. Features Section Glow (Positioned further down) */}
        <div className="absolute top-[700px] left-[-10%] w-[60%] h-[700px] rounded-full bg-emerald-100/30 blur-[130px]" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <FeaturesSection />
        <Testimonials />
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
