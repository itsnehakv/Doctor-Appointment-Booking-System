/* CONTACT PAGE */
export function SupportGrid() {
  const tiers = [
    {
      title: "General Inquiry",
      email: "hello@instantmd.com",
      desc: "General questions about our platform and services for patients.",
      icon: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", // Person icon
    },
    {
      title: "Medical Partners",
      email: "partners@instantmd.com",
      desc: "For clinics and doctors looking to integrate with our booking infrastructure.",
      icon: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2", // Clipboard icon
    },
    {
      title: "Technical Support",
      email: "dev@instantmd.com",
      desc: "API access, system status, and technical integration assistance.",
      icon: "M16 18l6-6-6-6M8 6l-6 6 6 6", // Code icon
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 mb-20 px-4 md:px-0">
      {tiers.map((tier, i) => (
        <div
          key={i}
          className="relative p-10 rounded-[2rem] border border-slate-300 bg-white hover:border-emerald-500/40 transition-all duration-500 group overflow-hidden"
        >
          {/* Subtle Hover Glow Effect */}
          <div className="absolute -top-24 -right-24 size-48 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/30 transition-all duration-700" />

          {/* Minimal Icon Accent */}
          <div className="size-10 mb-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors duration-500">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
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

          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600 mb-4">
            {tier.title}
          </h3>

          <p className="text-slate-500 text-sm mb-8 leading-relaxed font-light">
            {tier.desc}
          </p>

          <a
            href={`mailto:${tier.email}`}
            className="flex items-center gap-2 text-slate-900 font-bold text-sm group-hover:text-emerald-600 transition-colors"
          >
            <span>{tier.email}</span>
            <svg
              className="size-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      ))}
    </div>
  );
}
