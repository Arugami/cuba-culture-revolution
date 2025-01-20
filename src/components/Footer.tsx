import { ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-cuba-red transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#how-to-buy" className="hover:text-cuba-red transition-colors">
                  How to Buy
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-cuba-red transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#vision" className="hover:text-cuba-red transition-colors">
                  Vision
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contract</h3>
            <p className="text-sm break-all">
              27T4BetBEXjxfqeUb7WWcCz8rKPUJuxNu2CGzApPpump
              <button
                onClick={() => navigator.clipboard.writeText("27T4BetBEXjxfqeUb7WWcCz8rKPUJuxNu2CGzApPpump")}
                className="ml-2 hover:text-cuba-red transition-colors"
                title="Copy to clipboard"
              >
                <ExternalLink className="w-4 h-4 inline" />
              </button>
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p>support@cubacoin.com</p>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-gray-800">
          <p>© 2025 $CUBA – All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;