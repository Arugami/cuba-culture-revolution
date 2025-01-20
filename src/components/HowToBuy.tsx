import { Wallet, Search, ArrowRight } from "lucide-react";

const HowToBuy = () => {
  return (
    <section id="how-to-buy" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How to Buy <span className="text-cuba-red">$CUBA</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 bg-cuba-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-6 h-6 text-cuba-blue" />
            </div>
            <h3 className="font-bold mb-2">Step 1</h3>
            <p>Install a Solana-compatible wallet (e.g., Phantom)</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 bg-cuba-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowRight className="w-6 h-6 text-cuba-blue" />
            </div>
            <h3 className="font-bold mb-2">Step 2</h3>
            <p>Connect your wallet to Raydium</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 bg-cuba-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-cuba-blue" />
            </div>
            <h3 className="font-bold mb-2">Step 3</h3>
            <p>Search for $CUBA using contract address: 27T4BetBEXjxfqeUb7WWcCz8rKPUJuxNu2CGzApPpump</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="aspect-video max-w-2xl mx-auto bg-cuba-blue/10 rounded-lg flex items-center justify-center">
            <span className="text-cuba-blue">Video Tutorial Placeholder</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToBuy;