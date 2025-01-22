import React, { Suspense } from "react";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import AudioPlayer from "@/components/AudioPlayer";

// Lazy load components
const Hero = React.lazy(() => import("@/components/Hero"));
const About = React.lazy(() => import("@/components/About"));
const HowToBuy = React.lazy(() => import("@/components/HowToBuy"));
const Community = React.lazy(() => import("@/components/Community"));
const Revolution = React.lazy(() => import("@/components/Revolution"));
const FAQ = React.lazy(() => import("@/components/FAQ"));
const Footer = React.lazy(() => import("@/components/Footer"));
const ContinuousSlider = React.lazy(() => import("@/components/ContinuousSlider"));
const Memes = React.lazy(() => import("@/components/memes/Memes"));

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <AudioPlayer />
      <Suspense fallback={<Loading />}>
        <Hero />
        <ContinuousSlider />
        <About />
        <HowToBuy />
        <Community />
        <Memes />
        <Revolution />
        <FAQ />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;