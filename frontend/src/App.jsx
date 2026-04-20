<<<<<<< Updated upstream
import Homepage from "./pages/homepage";

function App() {
  return <Homepage />;
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import HomePage from "./pages/homepage";
import AboutUs from "./pages/about-us";
import Contact from "./pages/contact.jsx";
import Footer from "./components/footer.jsx";
import Services from "./pages/services.jsx";

function App() {
  return (
    <Router>
      <div className="font-geist antialiased">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
>>>>>>> Stashed changes
}

export default App;