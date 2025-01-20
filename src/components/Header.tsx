import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed w-full bg-[#0A0B24] backdrop-blur-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold">
              <span className="text-[#FFD700]">$CUBA</span>
            </span>
          </div>
          
          {/* Mobile menu button */}
          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isOpen ? <X /> : <Menu />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-white hover:text-cuba-red transition-colors">Home</a>
            <a href="#about" className="text-white hover:text-cuba-red transition-colors">Contract Address</a>
            <a href="#how-to-buy" className="text-white hover:text-cuba-red transition-colors">How to Buy</a>
            <div className="relative group">
              <button className="text-white hover:text-cuba-red transition-colors flex items-center gap-1">
                More <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </nav>

          <Button
            className="hidden md:inline-flex bg-cuba-red hover:bg-cuba-red/90 text-white px-6"
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
              <a href="#home" className="text-white hover:text-cuba-red transition-colors" onClick={toggleMenu}>Home</a>
              <a href="#about" className="text-white hover:text-cuba-red transition-colors" onClick={toggleMenu}>Contract Address</a>
              <a href="#how-to-buy" className="text-white hover:text-cuba-red transition-colors" onClick={toggleMenu}>How to Buy</a>
              <a href="#more" className="text-white hover:text-cuba-red transition-colors" onClick={toggleMenu}>More</a>
              <Button className="bg-cuba-red hover:bg-cuba-red/90 w-full text-white" asChild>
                <a href="https://raydium.io" target="_blank" rel="noopener noreferrer">
                  Buy Now
                </a>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;