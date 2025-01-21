import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import HowToBuy from "@/components/HowToBuy";
import Community from "@/components/Community";
import Revolution from "@/components/Revolution";
import FAQ from "@/components/FAQ";
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
      <Revolution />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;