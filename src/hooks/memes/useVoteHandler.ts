import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useVoteHandler = () => {
  const { toast } = useToast();
  const [userVotes, setUserVotes] = useState<Map<string, boolean>>(new Map());
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (memeId: string, voteType: boolean) => {
    if (isVoting) return;

    try {
      setIsVoting(true);
      console.log('Processing vote:', { memeId, voteType, currentVote: userVotes.get(memeId) });

      const { data: existingVote } = await supabase
        .from('meme_votes')
        .select('vote_type')
        .eq('meme_id', memeId)
        .single();

      // If clicking the same vote type, remove the vote
      if (existingVote && existingVote.vote_type === voteType) {
        console.log('Removing vote');
        const { error: deleteError } = await supabase
          .from('meme_votes')
          .delete()
          .eq('meme_id', memeId);

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

      // If no vote exists, create a new one
      console.log('Creating new vote');
      const { error: insertError } = await supabase
        .from('meme_votes')
        .insert({
          meme_id: memeId,
          vote_type: voteType
        });

      if (insertError) throw insertError;
      
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

  const getUserVote = (memeId: string): boolean | null => {
    return userVotes.has(memeId) ? userVotes.get(memeId)! : null;
  };

  return {
    getUserVote,
    isVoting,
    handleVote
  };
};