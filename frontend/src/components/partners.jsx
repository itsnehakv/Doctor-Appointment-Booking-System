import React from "react";
import Narayana from "../assets/Narayana.png";
import Manipal from "../assets/Manipal-Hospitals-Logo.png";
import Aster from "../assets/Asterhospital.png";
import apollo from "../assets/apollo-hospitals.svg";
import fortis from "../assets/Fortis-Logo.png";
import Stjohn from "../assets/Stjohn.png";

const PartnersMarquee = () => {
  const partners = [
    "Aster CMI Hospital",
    "Manipal Hospital",
    "Apollo Hospital",
    "Fortis Hospital",
    "Sakra World Hospital",
    "St. John's Medical Hospital",
    
  ];

  // Doubling the array ensures the second set follows the first immediately
  const doubledPartners = [...partners, ...partners];

  return (
    <section className="w-full py-12 bg-white overflow-hidden">
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .animate-marquee {
          display: flex;
          width: max-content;
          animation: scroll 30s linear infinite;
        }

        /* Stops the jumpy behavior by keeping image widths consistent */
        .marquee-item {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      <p className="text-center text-slate-500 text-sm mb-8 tracking-widest uppercase">
        Trusted Hospital Partners
      </p>

      <div className="relative flex overflow-hidden">
        {/* The gap here (gap-16) must match the spacing at the end of the loop */}
        <div className="animate-marquee gap-16 items-center">
          {doubledPartners.map((partner, index) => (
            <div
              key={index}
              className="marquee-item grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-12 md:h-16 w-auto object-contain px-4"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersMarquee;