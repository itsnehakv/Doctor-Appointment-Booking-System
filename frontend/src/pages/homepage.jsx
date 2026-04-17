import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/footer";
import Testimonials from "../components/review";

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Testimonials/>
      <Footer/>
    </>
  );
}

export default HomePage;