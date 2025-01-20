import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import HowToBuy from "@/components/HowToBuy";
import Community from "@/components/Community";
import Vision from "@/components/Vision";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <HowToBuy />
      <Community />
      <Vision />
      <Footer />
    </div>
  );
};

export default Index;