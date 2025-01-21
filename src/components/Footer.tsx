import { ExternalLink, Heart, ArrowUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
    <footer className="bg-[#1A1F2C] text-white py-16 relative">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6 text-cuba-red">Quick Links</h3>
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

          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6 text-cuba-red">Contract</h3>
            <div className="bg-[#2A2F3C] p-4 rounded-lg">
              <p className="text-sm break-all mb-2 text-gray-300">
                27T4BetBEXjxfqeUb7WWcCz8rKPUJuxNu2CGzApPpump
              </p>
              <button
                onClick={copyAddress}
                className="text-sm text-cuba-red hover:text-white transition-colors duration-300 flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Copy Address
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6 text-cuba-red">Community</h3>
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
                Twitter
              </a>
              <p className="text-gray-300 mt-4">
                Contact: support@cubacoin.com
              </p>
            </div>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-gray-800 relative">
          <p className="text-gray-400 flex items-center justify-center gap-2">
            © 2025 $CUBA – Made with <Heart className="w-4 h-4 text-cuba-red" /> All Rights Reserved
          </p>
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