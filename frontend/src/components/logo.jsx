/* BRAND LOGO (Fast-Schedule Style) */
function Logo({
  iconColor = "text-emerald-500",
  textColor = "text-slate-950",
  spanColor = "text-emerald-600",
}) {
  return (
    <div className="flex items-center gap-3 select-none">
      {/* Increased size from 34 to 42 for a bolder presence */}
      <svg
        width="42"
        height="42"
        viewBox="0 0 24 24"
        fill="none"
        className={iconColor}
      >
        {/* Calendar Frame */}
        <rect
          x="3"
          y="5"
          width="18"
          height="16"
          rx="3"
          stroke="currentColor"
          strokeWidth="2"
        />

        {/* Top Header Line */}
        <path
          d="M3 10H21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Binding Rings */}
        <path
          d="M8 3V7M16 3V7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* The Lightning Bolt - Replaces the 'Slot' */}
        {/* Designed to look like it's 'striking' the appointment date */}
        <path
          d="M13 12L9 16H12L11 20L15 16H12L13 12Z"
          fill="currentColor"
          className="animate-pulse"
        />

        {/* Precision Point */}
        <circle cx="12" cy="16" r="0.5" fill="white" />
      </svg>

      {/* Brand Text - Bolder weight to match the bigger icon */}
      <h1
        className={`${textColor} font-extrabold text-2xl tracking-tighter leading-none`}
      >
        Instant<span className={spanColor}>MD</span>
      </h1>
    </div>
  );
}

export default Logo;
