import React from "react";

/**
 * InstantMD Brand Logo
 * Features: Dotted grid boundary, precision matrix nodes, and high-contrast text.
 * Props: iconColor (SVG stroke/fill), textColor (Brand name), spanColor (Suffix "MD")
 */
function Logo({
  iconColor = "text-emerald-500",
  textColor = "text-slate-950",
  spanColor = "text-emerald-600",
}) {
  return (
    <div className="flex items-center gap-3 select-none">
      {/* Precision Matrix Symbol */}
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconColor} transition-colors duration-300`}
      >
        {/* Outer Matrix Boundary - Dotted Grid Aesthetic */}
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="4"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="1 3"
          className="opacity-40"
        />

        {/* Central Matrix Node (The "MD" Hub) */}
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />

        {/* Cardinal Direction Nodes (Medical Cross Framework) */}
        {/* Top */}
        <circle cx="12" cy="6" r="1.5" fill="currentColor" />
        {/* Bottom */}
        <circle cx="12" cy="18" r="1.5" fill="currentColor" />
        {/* Left */}
        <circle cx="6" cy="12" r="1.5" fill="currentColor" />
        {/* Right */}
        <circle cx="18" cy="12" r="1.5" fill="currentColor" />

        {/* Instant Connectors - Precision Engineering Lines */}
        <path
          d="M12 8.5V10.2M12 13.8V15.5M8.5 12H10.2M13.8 12H15.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Brand Wordmark */}
      <h1
        className={`${textColor} font-bold text-xl tracking-tighter leading-none`}
      >
        Instant<span className={spanColor}>MD</span>
      </h1>
    </div>
  );
}

export default Logo;
