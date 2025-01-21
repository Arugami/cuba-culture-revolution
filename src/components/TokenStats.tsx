import { useTokenStats } from "@/hooks/useTokenStats";
import { Loader2 } from "lucide-react";

const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(2)}M`;
  }
  if (num >= 1000) {
    return `$${(num / 1000).toFixed(2)}K`;
  }
  return `$${num.toFixed(2)}`;
};

const TokenStats = () => {
  const { data, isLoading, error } = useTokenStats();

  if (error) {
    console.error("Token stats error:", error);
    return (
      <div className="w-full bg-cuba-blue/10 py-2">
        <div className="container mx-auto px-4">
          <div className="text-sm text-gray-600">
            Market data temporarily unavailable
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full bg-cuba-blue/10 py-2">
        <div className="container flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-cuba-blue" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-cuba-blue/10 py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <span className="text-cuba-blue font-semibold">Price:</span>
            <span>{formatNumber(data?.price || 0)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cuba-blue font-semibold">24h Volume:</span>
            <span>{formatNumber(data?.volume24h || 0)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cuba-blue font-semibold">Market Cap:</span>
            <span>{formatNumber(data?.marketCap || 0)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cuba-blue font-semibold">24h Change:</span>
            <span className={data?.priceChange24h && data.priceChange24h >= 0 ? "text-green-600" : "text-red-600"}>
              {data?.priceChange24h ? `${data.priceChange24h.toFixed(2)}%` : "0%"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenStats;