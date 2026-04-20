/*CONTACT PAGE*/
export function Socials() {
  return (
    <div className="mt-10 mb-6">
      {/* High Contrast Header - Larger Font */}
      <p className="text-center text-sm font-bold uppercase tracking-widest text-emerald-700 mb-6">
        Find Us On Social Media
      </p>

      <div className="flex flex-wrap items-center justify-center gap-6">
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
            aria-label={`Visit our ${social.name} page`}
            className="flex items-center justify-center size-16 rounded-2xl bg-white border-4 border-emerald-600 text-emerald-800 hover:bg-emerald-600 hover:text-white hover:border-emerald-700 transition-all duration-200 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill={social.type === "fill" ? "currentColor" : "none"}
              stroke={social.type === "stroke" ? "currentColor" : "none"}
              strokeWidth="2.5"
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
