import { useQuery } from "@tanstack/react-query";

interface TokenStats {
  price: number;
  volume24h: number;
  marketCap: number;
  priceChange24h: number;
  tvl?: number;
  holders?: number;
}

const fetchTokenStats = async (): Promise<TokenStats> => {
  // Mock data for $CUBA token
  return {
    price: 0.000123,
    volume24h: 250000,
    marketCap: 3000000, // $3M as requested
    priceChange24h: 15.5,
    tvl: 1500000,
    holders: 12000, // 12K holders as requested
  };
};

export const useTokenStats = () => {
  return useQuery({
    queryKey: ["tokenStats"],
    queryFn: fetchTokenStats,
    refetchInterval: 30000, // Still refresh every 30 seconds to simulate real data
  });
};