import Logo from "./logo.jsx";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-emerald-600 w-full text-white pt-12 pb-6 px-4 sm:px-8 md:px-16 lg:px-24">
      {/* HOVER STYLES */}
      <style>{`
        a.footer-link, button.footer-link {
          display: inline-block;
          transition: all 0.3s ease;
        }

        a.footer-link:hover, button.footer-link:hover {
          transform: translateX(4px);
          color: #a7f3d0; /* emerald-200 */
        }

        a.social-icon {
          transition: all 0.3s ease;
        }

        a.social-icon:hover {
          transform: translateY(-4px) scale(1.1);
          background: white;
          color: #059669;
        }
      `}</style>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* About */}
        <div className="space-y-4">
          <Logo
            iconColor="text-emerald-200"
            textColor="text-white"
            spanColor="text-emerald-200"
          />
          <p className="text-sm text-emerald-100 leading-relaxed opacity-90">
            Book doctor appointments instantly. Find trusted doctors, check
            availability, and get quality healthcare anytime, anywhere. Our
            platform connects patients with verified healthcare professionals,
            making it easy to search, compare, and book appointments anytime.
          </p>
        </div>

        {/* Services - The "Specialization" Move */}
        <div>
          <h3 className="font-bold uppercase tracking-widest text-xs mb-6 text-emerald-200">
            Specializations
          </h3>
          <ul className="space-y-3 text-sm text-emerald-100">
            {["Cardiology", "Paediatrics", "Neurology", "Dermatology"].map(
              (service) => (
                <li key={service}>
                  <button
                    onClick={() =>
                      navigate("/doctors", {
                        state: { selectedCategory: service },
                      })
                    }
                    className="footer-link text-left hover:text-white transition-colors"
                  >
                    {service}
                  </button>
                </li>
              )
            )}

            <li className="pt-2 border-t border-emerald-500/30 mt-2">
              <button
                onClick={() => navigate("/services")}
                className="text-white font-bold hover:underline underline-offset-4 flex items-center gap-2 group"
              >
                View all 21+ Services
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-bold uppercase tracking-widest text-xs mb-6 text-emerald-200">
            Company
          </h3>
          <ul className="space-y-3 text-sm text-emerald-100">
            <li>
              <a
                href="https://github.com/itsnehakv/Doctor-Appointment-Booking-System.git"
                className="footer-link"
              >
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-medium mb-4">Contact</h3>
          <ul className="space-y-2 text-sm text-emerald-100 mb-4">
            <li>Email: support@instantmd.com</li>
            <li>Phone: +91 98765 43210</li>
            <li className="leading-relaxed">
              Location: building no 19, 25/1, 9th Cross Rd, Marenahalli, 2nd
              Phase, J. P. Nagar, Bengaluru, Karnataka 560038
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex items-center gap-3 text-emerald-100">
            <a
              href="#"
              className="social-icon flex items-center justify-center w-10 h-10 bg-emerald-500/20 rounded-full border border-emerald-400/30"
            >
              <svg
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932Z" />
              </svg>
            </a>

            <a
              href="#"
              className="social-icon flex items-center justify-center w-10 h-10 bg-emerald-500/20 rounded-full border border-emerald-400/30"
            >
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="18" cy="6" r="1" />
              </svg>
            </a>

            <a
              href="#"
              className="social-icon flex items-center justify-center w-10 h-10 bg-emerald-500/20 rounded-full border border-emerald-400/30"
            >
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              </svg>
            </a>

            <a
              href="#"
              className="social-icon flex items-center justify-center w-10 h-10 bg-emerald-500/20 rounded-full border border-emerald-400/30"
            >
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10" />
                <path d="m10 15 5-3-5-3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-16 border-t border-emerald-500/50 pt-8 text-center">
        <p className="text-sm text-emerald-100 pb-5">
          © 2026 InstantMD. All rights reserved.
        </p>
        {/*  Developer Credits */}
        <div className="flex items-center justify-center gap-4">
          <span className="text-[10px] tracking-[0.2em] text-emerald-200/40 font-bold uppercase">
            Developed by:
          </span>
          <svg
            width="12"
            height="12"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="opacity-70 group-hover:opacity-100 transition-opacity"
          >
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
          <a
            href="https://www.linkedin.com/in/nehakvallappil"
            target="_blank"
            rel="noreferrer"
            className="text-[10px] tracking-[0.2em] text-emerald-100 hover:text-white font-bold uppercase transition-all duration-300 border-b border-transparent hover:border-emerald-400 pb-0.5"
          >
            Neha K V
          </a>
          <span className="text-emerald-500/50">•</span>
          <svg
            width="12"
            height="12"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="opacity-70 group-hover:opacity-100 transition-opacity"
          >
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
          <a
            href="https://www.linkedin.com/in/k-suchith"
            target="_blank"
            rel="noreferrer"
            className="text-[10px] tracking-[0.2em] text-emerald-100 hover:text-white font-bold uppercase transition-all duration-300 border-b border-transparent hover:border-emerald-400 pb-0.5"
          >
            Suchith K
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
