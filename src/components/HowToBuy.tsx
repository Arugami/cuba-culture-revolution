import { Wallet, Search, ArrowRight } from "lucide-react";
import ContractAddress from "./ContractAddress";
import { useLanguage } from "@/contexts/LanguageContext";

const HowToBuy = () => {
  const { t } = useLanguage();
  
  return (
    <section 
      id="how-to-buy" 
      className="py-20 relative"
      style={{
        backgroundImage: "url('/lovable-uploads/fb011771-1f83-461a-a8c5-363224c91988.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-0.5 w-16 bg-cuba-red"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            {t("howToBuy.title")} <span className="text-cuba-red">{t("howToBuy.subtitle")}</span>
          </h2>
          <div className="h-0.5 w-16 bg-cuba-red"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-cuba-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-6 h-6 text-cuba-blue" />
            </div>
            <h3 className="font-bold mb-2">{t("howToBuy.step1.title")}</h3>
            <p>{t("howToBuy.step1.description")}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-cuba-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowRight className="w-6 h-6 text-cuba-blue" />
            </div>
            <h3 className="font-bold mb-2">{t("howToBuy.step2.title")}</h3>
            <p>{t("howToBuy.step2.description")}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-cuba-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-cuba-blue" />
            </div>
            <h3 className="font-bold mb-2">{t("howToBuy.step3.title")}</h3>
            <p>{t("howToBuy.step3.description")}</p>
          </div>
        </div>

        <ContractAddress />
      </div>
    </section>
  );
};

export default HowToBuy;