import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="text-3xl md:text-4xl font-extrabold text-cuba-red tracking-tight">$CUBA</div>
          
          <div className="flex items-center gap-4 md:hidden">
            <Button
              className="bg-cuba-red hover:bg-cuba-red/90"
              size="sm"
              asChild
            >
              <a href="https://raydium.io" target="_blank" rel="noopener noreferrer">
                Buy Now
              </a>
            </Button>
            <button onClick={toggleMenu}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#home" className="hover:text-cuba-red hover:font-semibold transition-all duration-200">Home</a>
            <a href="#about" className="hover:text-cuba-red hover:font-semibold transition-all duration-200">About</a>
            <a href="#how-to-buy" className="hover:text-cuba-red hover:font-semibold transition-all duration-200">How to Buy</a>
            <a href="#community" className="hover:text-cuba-red hover:font-semibold transition-all duration-200">Community</a>
            <a href="#vision" className="hover:text-cuba-red hover:font-semibold transition-all duration-200">Vision</a>
          </nav>

          <Button
            className="hidden md:inline-flex bg-cuba-red hover:bg-cuba-red/90"
            asChild
          >
            <a href="https://raydium.io" target="_blank" rel="noopener noreferrer">
              Buy Now
            </a>
          </Button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col gap-4">
              <a href="#home" className="hover:text-cuba-red hover:font-semibold transition-all duration-200" onClick={toggleMenu}>Home</a>
              <a href="#about" className="hover:text-cuba-red hover:font-semibold transition-all duration-200" onClick={toggleMenu}>About</a>
              <a href="#how-to-buy" className="hover:text-cuba-red hover:font-semibold transition-all duration-200" onClick={toggleMenu}>How to Buy</a>
              <a href="#community" className="hover:text-cuba-red hover:font-semibold transition-all duration-200" onClick={toggleMenu}>Community</a>
              <a href="#vision" className="hover:text-cuba-red hover:font-semibold transition-all duration-200" onClick={toggleMenu}>Vision</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;