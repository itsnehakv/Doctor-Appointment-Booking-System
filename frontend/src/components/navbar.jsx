import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import GetStarted from "./getstarted.jsx";
import Logo from "./logo.jsx";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between border-3 border-emerald-600 mx-4 mt-4 px-6 py-4 rounded-full bg-[#FAFAF9]/80 backdrop-blur-md shadow-sm antialiased text-stone-700 text-sm [text-rendering:optimizeLegibility] font-poppins">
      <Link to="/" className="flex items-center gap-2">
        <Logo iconColor="text-emerald-600" textColor="text-slate-900" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 ml-7">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="relative overflow-hidden h-6 group font-semibold transition-all duration-300 hover:-translate-y-0.5 text-stone-700"
          >
            <span className="block group-hover:-translate-y-full transition-transform duration-300">
              {link.name}
            </span>
            <span className="block absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-300 text-emerald-600">
              {link.name}
            </span>
            <span
              className={`absolute left-0 -bottom-1 h-[2px] bg-emerald-500 transition-all duration-300 ${
                location.pathname === link.path
                  ? "w-full"
                  : "w-0 group-hover:w-full"
              }`}
            ></span>
          </Link>
        ))}
      </div>

      {/* 2. Authentication Logic for Desktop */}
      <div className="hidden md:flex items-center gap-4 ml-10">
        <SignedOut>
          <GetStarted />
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>

      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-stone-600 text-xl p-2"
      >
        {open ? "✕" : "☰"}
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-20 left-0 bg-[#FAFAF9] w-full flex flex-col items-center gap-4 py-8 border-t border-stone-200 shadow-xl rounded-b-3xl md:hidden animate-in slide-in-from-top-5 duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setOpen(false)}
              className="font-semibold text-lg hover:text-emerald-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4">
            <SignedOut>
              <GetStarted />
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
