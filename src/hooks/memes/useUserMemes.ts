import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Meme } from "@/types/meme";

export const useUserMemes = () => {
  const { user } = useAuth();

  const fetchUserMemes = async (): Promise<Meme[]> => {
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('memes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user memes:', error);
      throw error;
    }

    return data || [];
  };

  return useQuery({
    queryKey: ['userMemes', user?.id],
    queryFn: fetchUserMemes,
    enabled: !!user,
  });
};