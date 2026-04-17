import Logo from "./logo.jsx";

const Footer = () => {
  return (
    <footer className="bg-emerald-600 w-full text-white pt-10 pb-6 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About */}
        <div>
          <h2 className="text-xl font-semibold mb-4"><Logo/></h2>
          <p className="text-sm text-emerald-100">
            Book doctor appointments instantly. Find trusted doctors, check
            availability, and get quality healthcare anytime, anywhere.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-medium mb-4">Services</h3>
          <ul className="space-y-2 text-sm text-emerald-100">
            <li>
              <a href="#" className="hover:text-black transition">
                Find Doctors
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Book Appointment
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Online Consultation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Health Checkups
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-medium mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-emerald-100">
            <li>
              <a href="#" className="hover:text-black transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Privacy Policy
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
            <li>Location: Bangalore, India</li>
          </ul>

          {/* Social Icons (NOW HERE) */}
          <div className="flex items-center gap-3 text-emerald-100">
            {/* X */}
            <a
              href="#"
              className="flex items-center justify-center w-10 h-10 bg-emerald-500/20 rounded-full hover:bg-white hover:text-emerald-600 transition"
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

            {/* Instagram */}
            <a
              href="#"
              className="flex items-center justify-center w-10 h-10 bg-emerald-500/20 rounded-full hover:bg-white hover:text-emerald-600 transition"
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

            {/* LinkedIn */}
            <a
              href="#"
              className="flex items-center justify-center w-10 h-10 bg-emerald-500/20 rounded-full hover:bg-white hover:text-emerald-600 transition"
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

            {/* YouTube */}
            <a
              href="#"
              className="flex items-center justify-center w-10 h-10 bg-emerald-500/20 rounded-full hover:bg-white hover:text-emerald-600 transition"
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
      <div className="mt-10 border-t border-emerald-500 pt-4 text-center">
        <p className="text-sm text-emerald-100">
          © 2026 InstantMD. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
