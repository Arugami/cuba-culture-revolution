import { useState } from "react";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ContractAddress = () => {
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const contractAddress = "27T4BetBEXjxfqeUb7WWcCz8rKPUJuxNu2CGzApPpump";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      toast({
        title: "Address Copied!",
        description: "Contract address has been copied to clipboard",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to copy address",
      });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <h3 className="text-white text-xl mb-2">Solana Contract Address</h3>
      <div 
        className="bg-white rounded-lg p-1 flex items-center shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="bg-black text-white px-3 py-2 rounded-lg mr-2">
          <span className="font-mono">CA:</span>
        </div>
        <div className="flex-1 font-mono text-black px-2 overflow-hidden overflow-ellipsis">
          {contractAddress}
        </div>
        <button
          onClick={copyToClipboard}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
            isHovered ? "bg-cuba-red text-white" : "bg-gray-100 text-gray-600"
          }`}
        >
          <Copy size={16} />
          <span className="hidden sm:inline">Copy Address</span>
        </button>
      </div>
    </div>
  );
};

export default ContractAddress;