import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Meme } from "@/types/meme";

export const useMemes = () => {
  const { toast } = useToast();
  const [memes, setMemes] = useState<Meme[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMemes = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("memes")
        .select("*")
        .order("created_at", { ascending: false });

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
      console.error('Error fetching memes:', error);
      toast({
        title: "Error",
        description: "Failed to fetch memes",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMemes();

    const channel = supabase
      .channel('memes-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'memes'
        },
        (payload) => {
          console.log('Meme update received:', payload);
          
          if (payload.eventType === 'UPDATE') {
            // Update the specific meme's vote counts without a full refresh
            setMemes(currentMemes => 
              currentMemes.map(meme => 
                meme.id === payload.new.id 
                  ? {
                      ...meme,
                      upvotes: payload.new.upvotes || 0,
                      downvotes: payload.new.downvotes || 0
                    }
                  : meme
              )
            );
          } else if (payload.eventType === 'INSERT') {
            // Only fetch all memes when a new meme is added
            fetchMemes();
          } else if (payload.eventType === 'DELETE') {
            // Remove the deleted meme from the state
            setMemes(currentMemes => 
              currentMemes.filter(meme => meme.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status);
        if (status === 'SUBSCRIBED') {
          console.log('Successfully subscribed to real-time updates');
        }
      });

    return () => {
      console.log('Cleaning up subscription');
      supabase.removeChannel(channel);
    };
  }, []);

  return { memes, isLoading, fetchMemes };
};