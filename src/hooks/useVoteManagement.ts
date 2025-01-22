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
      const sessionId = localStorage.getItem('voteSessionId') || crypto.randomUUID();
      localStorage.setItem('voteSessionId', sessionId);

      // Check for existing vote
      const { data: existingVote, error: fetchError } = await supabase
        .from('meme_votes')
        .select()
        .eq('meme_id', memeId)
        .eq('session_id', sessionId)
        .maybeSingle();

      if (fetchError) throw fetchError;

      let action;
      if (existingVote) {
        if (existingVote.vote_type === voteType) {
          // Remove vote if clicking the same button
          action = supabase
            .from('meme_votes')
            .delete()
            .eq('id', existingVote.id);
        } else {
          // Update vote if changing from up to down or vice versa
          action = supabase
            .from('meme_votes')
            .update({ vote_type: voteType })
            .eq('id', existingVote.id);
        }
      } else {
        // Create new vote
        action = supabase
          .from('meme_votes')
          .insert({
            meme_id: memeId,
            session_id: sessionId,
            vote_type: voteType
          });
      }

      const { error: actionError } = await action;
      if (actionError) throw actionError;

      toast({
        title: "Success",
        description: existingVote 
          ? existingVote.vote_type === voteType 
            ? "Vote removed successfully"
            : "Vote changed successfully"
          : `Successfully ${voteType ? 'upvoted' : 'downvoted'} the meme`,
      });

    } catch (error: any) {
      console.error('Error processing vote:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsVoting(false);
    }
  };

  return { handleVote, isVoting };
};