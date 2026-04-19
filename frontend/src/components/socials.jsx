/* CONTACT PAGE*/
export function Socials() {
  return (
    <div className="mt-3">
      <div className="w-16 h-[3px] bg-gradient-to-r from-emerald-600 to-emerald-300 rounded-full mx-auto mb-3"></div>

      <p className="flex items-center justify-center py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
        Official Channels
      </p>

      <div className="flex items-center gap-2">
        {[
          {
            name: "X",
            path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932Z",
            type: "fill",
          },
          {
            name: "Instagram",
            path: "M2 2h20v20H2z",
            type: "stroke",
            extra: (
              <>
                <circle cx="12" cy="12" r="4" />
                <circle cx="18" cy="6" r="1" />
              </>
            ),
          },
          {
            name: "LinkedIn",
            path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z",
            type: "stroke",
            extra: <circle cx="4" cy="4" r="2" />,
          },
          {
            name: "YouTube",
            path: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10m-11.5-2 5-3-5-3z",
            type: "stroke",
          },
        ].map((social) => (
          <a
            key={social.name}
            href="#"
            className="flex items-center justify-center size-10 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 transition-all duration-300 group"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={social.type === "fill" ? "currentColor" : "none"}
              stroke={social.type === "stroke" ? "currentColor" : "none"}
              strokeWidth="2"
              className="group-hover:scale-110 transition-transform"
            >
              {social.name === "X" ? (
                <path d={social.path} />
              ) : (
                <>
                  <path
                    d={social.path}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {social.extra}
                </>
              )}
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}
