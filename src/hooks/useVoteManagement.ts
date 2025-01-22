import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useVoteManagement = () => {
  const { toast } = useToast();
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (memeId: string, voteType: boolean) => {
    if (isVoting) return;
    
    setIsVoting(true);
    try {
      // Ensure we have a consistent session ID for the user
      const sessionId = localStorage.getItem('voteSessionId') || crypto.randomUUID();
      localStorage.setItem('voteSessionId', sessionId);

      // Check if user has already voted on this meme
      const { data: existingVote } = await supabase
        .from('meme_votes')
        .select()
        .eq('meme_id', memeId)
        .eq('session_id', sessionId)
        .maybeSingle();

      if (existingVote) {
        if (existingVote.vote_type === voteType) {
          // User clicked same vote type - remove the vote
          const { error } = await supabase
            .from('meme_votes')
            .delete()
            .eq('id', existingVote.id);

          if (error) throw error;
        } else {
          // User is switching their vote
          const { error } = await supabase
            .from('meme_votes')
            .update({ vote_type: voteType })
            .eq('id', existingVote.id);

          if (error) throw error;
        }
      } else {
        // This is a new vote
        const { error } = await supabase
          .from('meme_votes')
          .insert({
            meme_id: memeId,
            session_id: sessionId,
            vote_type: voteType
          });

        if (error) throw error;
      }

      // Show appropriate toast message
      toast({
        title: "Success",
        description: existingVote 
          ? (existingVote.vote_type === voteType 
            ? "Vote removed" 
            : "Vote changed")
          : `Meme ${voteType ? 'upvoted' : 'downvoted'}`
      });

    } catch (error) {
      console.error('Error processing vote:', error);
      toast({
        title: "Error",
        description: "Failed to process vote",
        variant: "destructive",
      });
    } finally {
      setIsVoting(false);
    }
  };

  return { handleVote, isVoting };
};