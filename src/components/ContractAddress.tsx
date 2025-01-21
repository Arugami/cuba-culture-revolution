import { useState } from "react";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const ContractAddress = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const contractAddress = "27T4BetBEXjxfqeUb7WWcCz8rKPUJuxNu2CGzApPpump";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      toast({
        title: t("howToBuy.addressCopied"),
        description: t("howToBuy.addressCopiedDesc"),
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: t("howToBuy.copyError"),
        description: t("howToBuy.copyErrorDesc"),
      });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <h3 className="text-white text-xl mb-2">{t("howToBuy.contractAddress")}</h3>
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
          <span className="hidden sm:inline">{t("howToBuy.copyAddress")}</span>
        </button>
      </div>
    </div>
  );
};

export default ContractAddress;