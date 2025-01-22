import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Meme } from "@/types/meme";
import { useAuth } from "@/contexts/AuthContext";

export const useUserMemes = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [memes, setMemes] = useState<Meme[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserMemes = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("memes")
        .select("*")
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const formattedMemes = data.map(meme => ({
          id: meme.id,
          image: meme.image_url,
          title: meme.title,
          description: meme.description,
          upvotes: meme.upvotes || 0,
          downvotes: meme.downvotes || 0
        }));
        
        setMemes(formattedMemes);
      }
    } catch (error: any) {
      console.error('Error fetching user memes:', error);
      toast({
        title: "Error",
        description: "Failed to fetch your memes",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserMemes();
  }, [user]);

  return { memes, isLoading, fetchUserMemes };
};