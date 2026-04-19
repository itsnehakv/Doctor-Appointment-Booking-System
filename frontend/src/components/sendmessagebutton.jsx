export default function TransmitButton({ text = "Dispatch Message" }) {
  return (
    <button
      type="submit"
      className="group relative inline-flex items-center justify-center gap-4 w-full py-5 bg-emerald-600 hover:bg-emerald-900 text-white rounded-2xl font-bold text-base transition-all duration-300 overflow-hidden shadow-xl shadow-emerald-500/10"
    >
      <div className="relative flex-shrink-0 size-8 bg-white rounded-full flex items-center justify-center overflow-hidden text-emerald-600 group-hover:text-slate-950 transition-colors duration-300">
        <svg
          viewBox="0 0 14 15"
          fill="none"
          className="size-3 transition-transform duration-300 group-hover:-translate-y-8 group-hover:translate-x-8"
        >
          <path
            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
            fill="currentColor"
          />
        </svg>

        <svg
          viewBox="0 0 14 15"
          fill="none"
          className="size-3 absolute transition-transform duration-300 translate-y-8 -translate-x-8 group-hover:translate-y-0 group-hover:translate-x-0"
        >
          <path
            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
            fill="currentColor"
          />
        </svg>
      </div>

      <span className="relative z-10 tracking-tight uppercase text-xs tracking-[0.1em]">
        {text}
      </span>
    </button>
  );
}
