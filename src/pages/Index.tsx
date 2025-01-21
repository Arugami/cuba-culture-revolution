import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import HowToBuy from "@/components/HowToBuy";
import Community from "@/components/Community";
import Footer from "@/components/Footer";
import ContinuousSlider from "@/components/ContinuousSlider";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <Hero />
      <ContinuousSlider />
      <About />
      <HowToBuy />
      <Community />
      <Footer />
    </div>
  );
};

export default Index;