import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import HomePage from "./pages/homepage";
import AboutUs from "./pages/about-us";
import Contact from "./pages/contact.jsx";
import AuthPage from "./pages/auth";
import Footer from "./components/footer.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import Logo from "./components/logo.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function App() {
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      appearance={{
        elements: {
          rootBox:
            "!border-[4px] !border-emerald-600 !rounded-[2.5rem] !shadow-[0_0_40px_rgba(5,150,105,0.2)] !overflow-hidden !bg-white",
          card: "!border-none !shadow-none !bg-transparent",

          headerTitle: "cl-headerTitle",
          formButtonPrimary: "cl-formButtonPrimary",

          headerSubtitle:
            "!text-slate-400 !font-semibold !tracking-widest !text-[10px] !mt-2",

          // Form fields
          formFieldInput:
            "!border-2 !border-slate-100 !rounded-xl focus:!border-emerald-500 !h-12",
          formFieldLabel: "!text-slate-700 !font-bold",
        },
      }}
    >
      <Router>
        <div className="font-geist antialiased">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login/*" element={<AuthPage />} />
              <Route path="/signup/*" element={<AuthPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App;
