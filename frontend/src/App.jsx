import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import HomePage from "./pages/homepage";
import AboutUs from "./pages/about-us";
import Contact from "./pages/contact.jsx";
import Footer from "./components/footer.jsx";
import Category from"./pages/category.jsx";
import Services from "./pages/services.jsx";
import AppointmentMode from "./pages/AppointmentMode.jsx";


// import Footer from "./components/Footer";

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
                         <Route path="/services" element={<Services/>} />

            <Route path="/services/category" element={<Category/>}/>
                         <Route path="/mode" element={<AppointmentMode/>} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
