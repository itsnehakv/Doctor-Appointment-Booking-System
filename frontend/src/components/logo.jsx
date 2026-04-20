function Logo({
  iconColor = "text-emerald-500",
  textColor = "text-slate-950",
  spanColor = "text-emerald-600",
}) {
  return (
    <div className="flex items-center gap-3">
      {/* Precision Medical Symbol */}
      <svg
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="none"
        className={iconColor}
      >
        {/* Horizontal Bar */}
        <rect
          x="3"
          y="10"
          width="18"
          height="4"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="2.2"
        />
        {/* Vertical Bar */}
        <rect
          x="10"
          y="3"
          width="4"
          height="18"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="2.2"
        />
        {/* Center Precision Point */}
        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      </svg>

      {/* Brand Text */}
      <h1 className={`${textColor} font-bold text-xl tracking-tighter`}>
        Instant<span className={spanColor}>MD</span>
      </h1>
    </div>
  );
}

export default Logo;
