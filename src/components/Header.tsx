import { useState } from "react";
import { Menu, X, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "./AuthModal";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleLanguage = () => setLanguage(language === "en" ? "es" : "en");

  const scrollToFooter = (e: React.MouseEvent) => {
    e.preventDefault();
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMemes = (e: React.MouseEvent) => {
    e.preventDefault();
    const memesSection = document.querySelector('#memes');
    if (memesSection) {
      memesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="text-3xl md:text-4xl font-patua text-cuba-red tracking-tight">$CUBA</div>
            <img 
              src="/lovable-uploads/51490d66-3df6-4e43-9265-ea6fb6d9f800.png"
              alt="Country Takeover Logo"
              className="h-10 w-10 object-contain"
            />
          </div>
          
          <div className="flex items-center gap-4 md:hidden">
            <Button
              className="bg-cuba-red hover:bg-cuba-red/90"
              size="sm"
              asChild
            >
              <a href="https://raydium.io" target="_blank" rel="noopener noreferrer">
                {t("nav.buyNow")}
              </a>
            </Button>
            <button onClick={toggleMenu}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#home" className="hover:text-cuba-red hover:font-semibold transition-all duration-200">{t("nav.home")}</a>
            <a href="#about" className="hover:text-cuba-red hover:font-semibold transition-all duration-200">{t("nav.about")}</a>
            <a href="#how-to-buy" className="hover:text-cuba-red hover:font-semibold transition-all duration-200">{t("nav.howToBuy")}</a>
            <a href="#faq" className="hover:text-cuba-red hover:font-semibold transition-all duration-200">FAQ</a>
            <a href="#memes" onClick={scrollToMemes} className="hover:text-cuba-red hover:font-semibold transition-all duration-200 flex items-center gap-1">
              <Image className="w-4 h-4" />
              MEMES
            </a>
            <a href="#contract" onClick={scrollToFooter} className="hover:text-cuba-red hover:font-semibold transition-all duration-200">{t("nav.contractAddress")}</a>
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={toggleLanguage}
                    className="text-gray-600 hover:text-cuba-red transition-colors p-2 rounded-full hover:bg-gray-100"
                  >
                    <span className="text-xl">
                      {language === "en" ? "🇨🇺" : "🇺🇸"}
                    </span>
                    <span className="sr-only">
                      {t("nav.switchLanguage")}
                    </span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("nav.switchLanguage")}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://t.me/cubacoin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-cuba-red transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("social.joinTelegram")}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://x.com/CubaCTO"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-cuba-red transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768M20 4h-4.267"/></svg>
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("social.followX")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {user ? (
              <Button
                variant="outline"
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
            ) : (
              <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
            )}

            <Button
              className="bg-cuba-red hover:bg-cuba-red/90"
              asChild
            >
              <a href="https://raydium.io" target="_blank" rel="noopener noreferrer">
                {t("nav.buyNow")}
              </a>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col gap-4">
              <a href="#home" className="hover:text-cuba-red hover:font-semibold transition-all duration-200" onClick={toggleMenu}>{t("nav.home")}</a>
              <a href="#about" className="hover:text-cuba-red hover:font-semibold transition-all duration-200" onClick={toggleMenu}>{t("nav.about")}</a>
              <a href="#how-to-buy" className="hover:text-cuba-red hover:font-semibold transition-all duration-200" onClick={toggleMenu}>{t("nav.howToBuy")}</a>
              <a href="#faq" className="hover:text-cuba-red hover:font-semibold transition-all duration-200" onClick={toggleMenu}>FAQ</a>
              <a 
                href="#memes" 
                className="hover:text-cuba-red hover:font-semibold transition-all duration-200 flex items-center gap-1" 
                onClick={(e) => { scrollToMemes(e); toggleMenu(); }}
              >
                <Image className="w-4 h-4" />
                MEMES
              </a>
              <a href="#contract" className="hover:text-cuba-red hover:font-semibold transition-all duration-200" onClick={(e) => { scrollToFooter(e); toggleMenu(); }}>{t("nav.contractAddress")}</a>
              
              <div className="flex gap-4 pt-2">
                <button
                  onClick={toggleLanguage}
                  className="text-gray-600 hover:text-cuba-red transition-colors p-2 rounded-full hover:bg-gray-100"
                >
                  <span className="text-xl">
                    {language === "en" ? "🇨🇺" : "🇺🇸"}
                  </span>
                  <span className="sr-only">
                    {t("nav.switchLanguage")}
                  </span>
                </button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href="https://t.me/cubacoin"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-cuba-red transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t("social.joinTelegram")}</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href="https://x.com/CubaCTO"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-cuba-red transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768M20 4h-4.267"/></svg>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t("social.followX")}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              {user ? (
                <Button
                  variant="outline"
                  onClick={() => signOut()}
                  className="mt-2"
                >
                  Sign Out
                </Button>
              ) : (
                <div className="mt-2">
                  <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;