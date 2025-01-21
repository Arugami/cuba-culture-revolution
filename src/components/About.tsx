import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="py-20 bg-[#0b0f2a]">
      <div className="container mx-auto px-4">
        <div 
          className="relative p-[12px] rounded-2xl shadow-lg overflow-hidden border-2 border-white"
          style={{
            background: '#0b0f2a',
          }}
        >
          <div
            className="relative z-10 rounded-xl"
            style={{
              backgroundImage: "url('/lovable-uploads/59df5922-3c15-48c7-b48f-f2d65933b6af.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div className="p-8">
              <h1 className="text-4xl md:text-5xl font-bold text-left mb-8 text-white">
                {t("about.title")}
                <br />
                <span className="bg-gradient-to-r from-cuba-red via-cuba-blue to-cuba-white bg-clip-text text-transparent">
                  {t("about.subtitle")}
                </span>
              </h1>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-1/2">
                  <img 
                    src="/lovable-uploads/69044ac3-a853-4f81-95d9-69b3a070d3a4.png"
                    alt={t("about.imageAlt")}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
                <div className="w-full md:w-1/2 text-left">
                  <p className="text-lg text-white">
                    {t("about.paragraph1")}
                  </p>
                  <p className="text-lg mt-6 text-white">
                    {t("about.paragraph2")}
                  </p>
                  <p className="text-lg mt-6 text-white">
                    {t("about.paragraph3")}
                  </p>
                  <p className="text-lg mt-6 text-white">
                    {t("about.paragraph4")}
                  </p>
                  <div className="mt-8 flex justify-center md:justify-end">
                    <a 
                      href="https://t.me/CubaCTO" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block px-4 sm:px-8 py-4 bg-cuba-red text-white text-sm sm:text-base font-bold rounded-lg shadow-lg hover:opacity-90 transition-opacity whitespace-nowrap min-w-[200px] text-center"
                    >
                      {t("about.joinButton")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;