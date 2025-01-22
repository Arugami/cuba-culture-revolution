import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export const useVoteHandler = () => {
  const { toast } = useToast();
  const [userVotes, setUserVotes] = useState<Map<string, boolean>>(new Map());
  const [isVoting, setIsVoting] = useState(false);
  const { user } = useAuth();

  const handleVote = async (memeId: string, voteType: boolean) => {
    if (isVoting) return;
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to vote",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsVoting(true);
      console.log('Processing vote:', { memeId, voteType, currentVote: userVotes.get(memeId) });

      // Get existing vote
      const { data: existingVotes, error: fetchError } = await supabase
        .from('meme_votes')
        .select('*')
        .eq('meme_id', memeId)
        .eq('user_id', user.id);

      if (fetchError) throw fetchError;

      const existingVote = existingVotes && existingVotes[0];

      // If clicking the same vote type, remove the vote
      if (existingVote && existingVote.vote_type === voteType) {
        console.log('Removing vote');
        const { error: deleteError } = await supabase
          .from('meme_votes')
          .delete()
          .eq('meme_id', memeId)
          .eq('user_id', user.id);

        if (deleteError) throw deleteError;
        
        const newVotes = new Map(userVotes);
        newVotes.delete(memeId);
        setUserVotes(newVotes);
        
        toast({
          title: "Vote removed",
          description: `${voteType ? 'Upvote' : 'Downvote'} removed`
        });
        return;
      }

      // If a vote exists but with different type, update it
      if (existingVote) {
        console.log('Updating vote');
        const { error: updateError } = await supabase
          .from('meme_votes')
          .update({ vote_type: voteType })
          .eq('meme_id', memeId)
          .eq('user_id', user.id);

        if (updateError) throw updateError;
      } else {
        // If no vote exists, create a new one
        console.log('Creating new vote');
        const { error: insertError } = await supabase
          .from('meme_votes')
          .insert({
            meme_id: memeId,
            user_id: user.id,
            vote_type: voteType
          });

        if (insertError) throw insertError;
      }
      
      const newVotes = new Map(userVotes);
      newVotes.set(memeId, voteType);
      setUserVotes(newVotes);
      
      toast({
        title: "Vote recorded",
        description: `Meme ${voteType ? 'upvoted' : 'downvoted'}`
      });

    } catch (error: any) {
      console.error('Error handling vote:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to process vote",
        variant: "destructive",
      });
    } finally {
      setIsVoting(false);
    }
  };

  const getUserVote = async (memeId: string): Promise<boolean | null> => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('meme_votes')
        .select('vote_type')
        .eq('meme_id', memeId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      return data ? data.vote_type : null;
    } catch (error) {
      console.error('Error getting user vote:', error);
      return null;
    }
  };

  return {
    getUserVote,
    isVoting,
    handleVote
  };
};