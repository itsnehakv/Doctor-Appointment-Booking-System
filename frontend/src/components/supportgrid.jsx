/* SUPPORT GRID (Soft Glass Style) */
export function SupportGrid() {
  const tiers = [
    {
      title: "General Inquiry",
      email: "hello@instantmd.com",
      desc: "General questions about our platform and services for patients.",
      icon: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
    },
    {
      title: "Medical Partners",
      email: "partners@instantmd.com",
      desc: "For clinics and doctors looking to integrate with our booking infrastructure.",
      icon: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
    },
    {
      title: "Technical Support",
      email: "dev@instantmd.com",
      desc: "API access, system status, and technical integration assistance.",
      icon: "M16 18l6-6-6-6M8 6l-6 6 6 6",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 mb-20 px-4 md:px-0">
      {tiers.map((tier, i) => (
        <div
          key={i}
          className="group relative p-10 rounded-[2.5rem] bg-white/60 border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.12)] hover:border-emerald-500/20 transition-all duration-500 overflow-hidden"
        >
          {/* UPGRADED: Top-right Blur Accent */}
          <div className="absolute top-0 right-0 size-32 bg-emerald-500/5 rounded-bl-[5rem] border-l border-b border-emerald-100/50 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-y-4 translate-x-4 group-hover:translate-y-0 group-hover:translate-x-0" />

          {/* UPGRADED: Glass-morphism Icon Container */}
          <div className="size-14 mb-8 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-emerald-600 group-hover:text-white group-hover:bg-emerald-600 shadow-[0_2px_10px_rgba(0,0,0,0.02)] group-hover:shadow-lg group-hover:shadow-emerald-200 group-hover:-translate-y-1 transition-all duration-500">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={tier.icon} />
              {i === 0 && <circle cx="12" cy="7" r="4" />}
              {i === 1 && (
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              )}
            </svg>
          </div>

          <h3 className="relative z-10 text-[12px] font-black uppercase tracking-[0.25em] text-slate-700 group-hover:text-emerald-700 mb-4 transition-colors">
            {tier.title}
          </h3>

          <p className="relative z-10 text-slate-600 text-base mb-8 leading-relaxed font-medium">
            {tier.desc}
          </p>

          <div className="pt-6 border-t border-slate-100">
            <a
              href={`mailto:${tier.email}`}
              className="inline-flex items-center gap-3 text-emerald-600 font-bold text-sm hover:text-emerald-700 transition-colors"
            >
              <span className="underline underline-offset-4 decoration-2 decoration-emerald-500/20 group-hover:decoration-emerald-500">
                {tier.email}
              </span>
              <div className="size-6 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                <svg
                  className="size-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="4"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
