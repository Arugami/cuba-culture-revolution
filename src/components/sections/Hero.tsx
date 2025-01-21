import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <section className="relative bg-hero-pattern bg-cover bg-center h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Welcome to $CUBA
          </h1>
          <p className="text-lg md:text-xl text-white mb-8">
            Join us in our mission to empower the Cuban people through decentralized technology.
          </p>
          <Button className="bg-cuba-red hover:bg-cuba-red/90" size="lg">
            {t("hero.joinNow")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
