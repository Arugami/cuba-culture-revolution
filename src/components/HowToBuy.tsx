import { Wallet, Search, ArrowRight } from "lucide-react";

const HowToBuy = () => {
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How to Buy <span className="text-cuba-red">$CUBA</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-cuba-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-6 h-6 text-cuba-blue" />
            </div>
            <h3 className="font-bold mb-2">Step 1</h3>
            <p>Install a Solana Wallet (e.g., Phantom)</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-cuba-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowRight className="w-6 h-6 text-cuba-blue" />
            </div>
            <h3 className="font-bold mb-2">Step 2</h3>
            <p>Connect to Raydium.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-cuba-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-cuba-blue" />
            </div>
            <h3 className="font-bold mb-2">Step 3</h3>
            <p>Search for $CUBA</p>
          </div>
        </div>

        <ContractAddress />
      </div>
    </section>
  );
};

export default HowToBuy;