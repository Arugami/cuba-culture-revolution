import { Button } from "@/components/ui/button";
import ContractAddress from "./ContractAddress";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <section id="home" className="relative min-h-screen bg-hero-pattern overflow-hidden flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between py-20 lg:py-0 mt-16 sm:mt-20 lg:mt-0">
        {/* Left side content */}
        <div className="w-full lg:w-3/5 text-left space-y-4 sm:space-y-6 lg:space-y-8">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <span className="text-white">{t("hero.taglineStart")}</span>
            <br />
            <span className="text-cuba-red">{t("hero.taglineMiddle")}</span>
            <br />
            <span className="text-white">{t("hero.taglineEnd")}</span>
          </h1>
          
          <p className="text-2xl sm:text-3xl lg:text-3xl text-white/80 max-w-2xl">
            {t("hero.subtitle")}
          </p>

          {/* Image shown on mobile only */}
          <div className="block lg:hidden w-full px-2 sm:px-8 py-4 sm:py-6 relative">
            <img 
              src="/lovable-uploads/ac63db1b-a80e-4ac4-ae92-d8513c944579.png" 
              alt={t("hero.flagAlt")}
              className="w-full h-auto max-w-md mx-auto object-contain transform -rotate-12 hover:rotate-0 transition-transform duration-500"
            />
            {/* Quote on mobile - moved inside the image container */}
            <p className="text-white/60 italic text-xl sm:text-2xl mt-4">
              {t("hero.quote")}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            <Button
              size="lg"
              className="bg-cuba-red hover:bg-cuba-red/90 text-white text-base sm:text-lg px-4 sm:px-6 py-4 sm:py-6 rounded-full w-full sm:w-auto shadow-lg hover:shadow-cuba-red/50 hover:shadow-xl transition-all duration-300"
              asChild
            >
              <a href="https://raydium.io" target="_blank" rel="noopener noreferrer">
                {t("hero.buyButton")}
              </a>
            </Button>
            <Button
              size="lg"
              className="bg-cuba-blue hover:bg-cuba-blue/90 text-white text-base sm:text-lg px-4 sm:px-6 py-4 sm:py-6 rounded-full w-full sm:w-auto shadow-lg hover:shadow-cuba-blue/50 hover:shadow-xl transition-all duration-300"
              asChild
            >
              <a href="https://t.me/cubacoin" target="_blank" rel="noopener noreferrer">
                {t("hero.joinButton")}
              </a>
            </Button>
          </div>

          {/* Add Contract Address Component */}
          <ContractAddress />
        </div>

        {/* Right side - Image and quote (desktop only) */}
        <div className="hidden lg:block w-2/5 relative">
          <img 
            src="/lovable-uploads/ac63db1b-a80e-4ac4-ae92-d8513c944579.png" 
            alt={t("hero.flagAlt")}
            className="w-full h-auto object-contain transform -rotate-12 hover:rotate-0 transition-transform duration-500"
          />
          {/* Quote on desktop - moved closer to the image */}
          <p className="text-white/60 italic text-xl absolute bottom-4 right-4">
            {t("hero.quote")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;