import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Revolution = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 sm:py-16 px-4 md:px-8 bg-gradient-to-br from-cuba-blue via-cuba-red to-cuba-white">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          {/* Text Content */}
          <div className="flex-1 text-left">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-cuba-white mb-4 sm:mb-6" style={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
            }}>
              {t('revolution.title')}
            </h2>
            <div className="bg-[rgba(0,0,0,0.5)] p-4 sm:p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-cuba-white mb-3 sm:mb-4">
                {t('revolution.mission')}
              </h3>
              <p className="text-base sm:text-lg text-cuba-white leading-relaxed">
                {t('revolution.description')}
              </p>
            </div>
          </div>
          
          {/* Image */}
          <div className="flex-1 mt-6 sm:mt-0">
            <img
              src="/lovable-uploads/43aa06bf-91a0-45d1-9952-0a9349bbe641.png"
              alt="$CUBA Community Support"
              className="w-full h-auto max-w-sm sm:max-w-md mx-auto rounded-lg shadow-xl"
              style={{
                filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.3))"
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Revolution;