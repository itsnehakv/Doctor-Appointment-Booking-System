import { useState } from "react";
import GetStarted from "./getstarted.jsx";
import Logo from "./logo.jsx";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between border-4 border-emerald-600 mx-4 mt-4 max-md:w-full px-6 py-4 rounded-full text-stone-700 text-sm bg-[#FAFAF9] shadow-sm relative">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Logo />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 ml-7">
        {["Home", "About Us", "Services", "Contact"].map((item) => (
          <a
            key={item}
            href="#"
            className="relative overflow-hidden h-6 group font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:rotate-1 text-stone-700"
          >
            {/* Top */}
            <span className="block group-hover:-translate-y-full transition-transform duration-300">
              {item}
            </span>

            {/* Bottom */}
            <span className="block absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-300 text-emerald-600">
              {item}
            </span>

            {/* Underline */}
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
      </div>

      {/* Buttons */}
      <div className="hidden md:flex items-center gap-4 ml-10">
        <GetStarted />
      </div>

      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-stone-600 text-xl"
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-20 left-0 bg-[#FAFAF9] w-full flex flex-col items-center gap-4 py-6 border-t border-stone-200 shadow-md md:hidden">
          {["Home", "About Us", "Services", "Contact"].map((item) => (
            <a key={item} href="#" className="hover:text-emerald-600">
              {item}
            </a>
          ))}

          <button className="bg-emerald-600 text-white px-4 py-2 rounded-full">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
