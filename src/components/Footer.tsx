import { ExternalLink, Heart, ArrowUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const { toast } = useToast();

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText("27T4BetBEXjxfqeUb7WWcCz8rKPUJuxNu2CGzApPpump");
      toast({
        title: "Success!",
        description: "Contract address copied to clipboard",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to copy address",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0b0f2a] text-white py-8 md:py-16 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:grid md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12 relative">
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="hover:text-cuba-red transition-colors duration-300 flex items-center gap-2">
                  About
                </a>
              </li>
              <li>
                <a href="#how-to-buy" className="hover:text-cuba-red transition-colors duration-300 flex items-center gap-2">
                  How to Buy
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-cuba-red transition-colors duration-300 flex items-center gap-2">
                  Community
                </a>
              </li>
              <li>
                <a href="#vision" className="hover:text-cuba-red transition-colors duration-300 flex items-center gap-2">
                  Vision
                </a>
              </li>
            </ul>
          </div>

          <div className="hidden md:block absolute left-1/3 top-0 h-full">
            <Separator orientation="vertical" className="bg-white/10" />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-white">Contract</h3>
            <div className="bg-[#2A2F3C] p-4 rounded-lg">
              <p className="text-sm break-all mb-2 text-white">
                27T4BetBEXjxfqeUb7WWcCz8rKPUJuxNu2CGzApPpump
              </p>
              <button
                onClick={copyAddress}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cuba-red hover:bg-cuba-red/80 transition-colors duration-300 w-full justify-center text-sm min-h-[44px] text-white"
              >
                <ExternalLink className="w-4 h-4" />
                Copy Address
              </button>
            </div>
          </div>

          <div className="hidden md:block absolute left-2/3 top-0 h-full">
            <Separator orientation="vertical" className="bg-white/10" />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-white">Community</h3>
            <div className="space-y-3">
              <a
                href="https://t.me/cubacoin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-cuba-red transition-colors duration-300"
              >
                Telegram
              </a>
              <a
                href="https://x.com/cubacoin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-cuba-red transition-colors duration-300"
              >
                X
              </a>
            </div>
          </div>
        </div>

        <div className="text-center pt-6 md:pt-8 border-t border-gray-800 relative">
          <p className="text-white flex items-center justify-center gap-2 mb-2">
            © 2025 $CUBA
          </p>
          <p className="text-white text-sm opacity-75">Made by Arugami Labs</p>
          <button
            onClick={scrollToTop}
            className="absolute right-4 bottom-4 bg-cuba-red hover:bg-cuba-red/80 p-2 rounded-full transition-all duration-300 hover:transform hover:-translate-y-1"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;