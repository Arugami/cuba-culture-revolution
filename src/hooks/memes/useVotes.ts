import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const useVotes = (memeId: string) => {
  const [userVote, setUserVote] = useState<'upvote' | 'downvote' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserVote();
    } else {
      setIsLoading(false);
    }
  }, [user, memeId]);

  const fetchUserVote = async () => {
    try {
      const { data, error } = await supabase
        .from('meme_votes')
        .select('vote_type')
        .eq('meme_id', memeId)
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error) throw error;
      setUserVote(data?.vote_type as 'upvote' | 'downvote' | null);
    } catch (error) {
      console.error('Error fetching vote:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const vote = async (voteType: 'upvote' | 'downvote') => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to vote",
        variant: "destructive",
      });
      return;
    }

    try {
      if (userVote === voteType) {
        // Remove vote if clicking the same button
        const { error } = await supabase
          .from('meme_votes')
          .delete()
          .eq('meme_id', memeId)
          .eq('user_id', user.id);

        if (error) throw error;
        setUserVote(null);
      } else if (userVote) {
        // Update vote if already voted
        const { error } = await supabase
          .from('meme_votes')
          .update({ vote_type: voteType })
          .eq('meme_id', memeId)
          .eq('user_id', user.id);

        if (error) throw error;
        setUserVote(voteType);
      } else {
        // Insert new vote
        const { error } = await supabase
          .from('meme_votes')
          .insert({
            meme_id: memeId,
            user_id: user.id,
            vote_type: voteType
          });

        if (error) throw error;
        setUserVote(voteType);
      }
    } catch (error: any) {
      console.error('Error voting:', error);
      toast({
        title: "Error",
        description: "Failed to register vote",
        variant: "destructive",
      });
    }
  };

  return { userVote, isLoading, vote };
};