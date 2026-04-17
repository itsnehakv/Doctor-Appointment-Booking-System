function Logo() {
  return (
    <div className="flex items-center gap-3">
      
      {/* Pulse Icon */}
      <svg
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="none"
        className="text-emerald-800"
      >
        <path
          d="M3 12h4l2-5 4 10 2-5h4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Brand */}
      <h1 className="text-white font-semibold text-xl tracking-tight">
        Instant<span className="text-emerald-800">MD</span>
      </h1>

    </div>
  );
}

export default Logo;