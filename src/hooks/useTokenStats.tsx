import { useQuery } from "@tanstack/react-query";

interface TokenStats {
  price: number;
  volume24h: number;
  marketCap: number;
  priceChange24h: number;
}

const fetchTokenStats = async (): Promise<TokenStats> => {
  const response = await fetch(
    "https://api.raydium.io/v2/main/price?address=27T4BetBEXjxfqeUb7WWcCz8rKPUJuxNu2CGzApPpump"
  );
  
  if (!response.ok) {
    throw new Error("Failed to fetch token stats");
  }

  const data = await response.json();
  return {
    price: data.data?.price || 0,
    volume24h: data.data?.volume24h || 0,
    marketCap: data.data?.marketCap || 0,
    priceChange24h: data.data?.priceChange24h || 0,
  };
};

export const useTokenStats = () => {
  return useQuery({
    queryKey: ["tokenStats"],
    queryFn: fetchTokenStats,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};