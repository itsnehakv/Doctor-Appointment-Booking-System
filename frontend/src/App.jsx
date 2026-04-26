import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Navbar from "./components/navbar";
import HomePage from "./pages/homepage";
import AboutUs from "./pages/about-us";
import Contact from "./pages/contact.jsx";
import AuthPage from "./pages/Auth";
import Footer from "./components/footer.jsx";
import Services from "./pages/services.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import Logo from "./components/logo.jsx";
import DoctorsPage from "./pages/doctorspage.jsx";
import DoctorDetails from "./pages/doctordetails.jsx";
import AppointmentMode from "./pages/AppointmentMode.jsx";
import OnlineBooking from "./pages/onlinebooking.jsx";
import ScrollToTop from "./components/scrolltotop.jsx";
import PaymentGate from "./pages/payment-gate.jsx";
import BookingHistory from "./pages/bookinghistory.jsx";
import ProtectedRoute from "./components/protectedroute.jsx";
import OfflineBooking from "./pages/offlinebooking.jsx";
import AdminPanel from "./pages/adminpanel.jsx";
import DoctorDashboard from "./pages/doctordashboard.jsx";
import MeetingRoom from "./pages/meetingroom.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const AppRoutes = () => {
  const { isLoaded, user } = useUser();

  if (!isLoaded)
    return (
      <div className="h-screen flex items-center justify-center font-poppins text-slate-400">
        Loading Session...
      </div>
    );

  const userRole = user?.publicMetadata?.role;

  return (
    <Router>
      <ScrollToTop />
      <div className="font-geist antialiased">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login/*" element={<AuthPage />} />
            <Route path="/signup/*" element={<AuthPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/doctor/:id" element={<DoctorDetails />} />
            <Route path="/mode/:doctorId" element={<AppointmentMode />} />
            <Route path="/book/online/:doctorId" element={<OnlineBooking />} />
            <Route
              path="/book/offline/:doctorId"
              element={<OfflineBooking />}
            />
            <Route path="/payment-gate" element={<PaymentGate />} />
            <Route
              path="/my-appointments"
              element={
                <ProtectedRoute>
                  <BookingHistory />
                </ProtectedRoute>
              }
            />
            <Route path="/admin" element={<AdminPanel />} />
            <Route
              path="/doctor-dashboard"
              element={
                userRole === "doctor" ? (
                  <DoctorDashboard />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route path="/meeting-room" element={<MeetingRoom />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};
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

          formFieldInput:
            "!border-2 !border-slate-100 !rounded-xl focus:!border-emerald-500 !h-12",
          formFieldLabel: "!text-slate-700 !font-bold",
        },
      }}
    >
      <AppRoutes />
    </ClerkProvider>
  );
}
export default App;
