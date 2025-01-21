import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import HowToBuy from "@/components/sections/HowToBuy";
import Community from "@/components/Community";
import Revolution from "@/components/Revolution";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/layout/Footer";
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
      <Revolution />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;