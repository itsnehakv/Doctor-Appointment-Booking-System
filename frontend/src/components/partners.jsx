import React from "react";

const PartnersMarquee = () => {
  // Medical/Insurance focused "logos"
  const partners = [
    "Aster CMI Hospital",
    "Manipal Hospital",
    "Apollo Hospital",
    "Fortis Hospital",
    "Sakra World Hospital",
    "St. John's Medical Hospital",
    
  ];

  return (
    <section className="relative w-full py-10 bg-transparent overflow-hidden">
      <style>{`
                .marquee-inner {
                    animation: marqueeScroll 25s linear infinite;
                }

                @keyframes marqueeScroll {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>

      <div className="max-w-5xl mx-auto px-4 mb-6">
        <p className="text-center text-slate-400 text-xs font-bold tracking-[0.2em] uppercase">
          Supported Insurance & Medical Partners
        </p>
      </div>

      <div className="overflow-hidden w-full relative select-none">
        {/* Fade effect to match the Slate-50 background */}
        <div className="absolute left-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-r from-slate-50 to-transparent" />

        <div className="marquee-inner flex will-change-transform min-w-max">
          {/* Doubling the array for seamless loop */}
          {[...partners, ...partners, ...partners, ...partners].map(
            (partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center mx-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default"
              >
                <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter italic">
                  {partner}
                </span>
              </div>
            )
          )}
        </div>

        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-slate-50 to-transparent" />
      </div>
    </section>
  );
};

export default PartnersMarquee;
