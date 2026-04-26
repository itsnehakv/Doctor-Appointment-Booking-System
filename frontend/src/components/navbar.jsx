import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import GetStarted from "./getstarted.jsx";
import Logo from "./logo.jsx";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";

function Navbar() {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";
  const isDoctor = user?.publicMetadata?.role === "doctor";
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  if (isAdmin) {
    navLinks.push({ name: "Admin Panel", path: "/admin" });
  }

  const NavLinkItem = ({ name, path, mobile = false }) => (
    <Link
      to={path}
      onClick={mobile ? () => setOpen(false) : undefined}
      className={
        mobile
          ? "font-semibold text-lg hover:text-emerald-600 transition-colors"
          : "relative overflow-hidden h-6 group font-semibold transition-all duration-300 hover:-translate-y-0.5 text-stone-700"
      }
    >
      <span
        className={
          !mobile
            ? "block group-hover:-translate-y-full transition-transform duration-300"
            : ""
        }
      >
        {name}
      </span>
      {!mobile && (
        <>
          <span className="block absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-300 text-emerald-600">
            {name}
          </span>
          <span
            className={`absolute left-0 -bottom-1 h-[2px] bg-emerald-500 transition-all duration-300 ${
              location.pathname === path ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></span>
        </>
      )}
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between border-3 border-emerald-600 mx-4 mt-4 px-6 py-4 rounded-full bg-[#FAFAF9]/80 backdrop-blur-md shadow-sm antialiased text-stone-700 text-sm font-poppins">
      <Link to="/" className="flex items-center gap-2">
        <Logo iconColor="text-emerald-600" textColor="text-slate-900" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 ml-7">
        {navLinks.map((link) => (
          <NavLinkItem key={link.name} {...link} />
        ))}

        <SignedIn>
          {/*Only show "My Bookings" if user is NOT an admin AND NOT a doctor */}
          {!isAdmin && !isDoctor && (
            <NavLinkItem name="My Bookings" path="/my-appointments" />
          )}

          {isDoctor && (
            <NavLinkItem name="Doctor Portal" path="/doctor-dashboard" />
          )}
        </SignedIn>
      </div>

      {/* Authentication Logic (Desktop) */}
      <div className="hidden md:flex items-center gap-4 ml-10">
        <SignedOut>
          <GetStarted />
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>

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
            <NavLinkItem key={link.name} {...link} mobile />
          ))}

          <SignedIn>
            {!isAdmin && !isDoctor && (
              <NavLinkItem name="My Bookings" path="/my-appointments" mobile />
            )}
            {isDoctor && (
              <NavLinkItem
                name="Doctor Portal"
                path="/doctor-dashboard"
                mobile
              />
            )}
          </SignedIn>

          <div className="pt-4 flex flex-col items-center gap-4">
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
