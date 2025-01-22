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

      // Get existing vote
      const { data: existingVote } = await supabase
        .from('meme_votes')
        .select()
        .eq('meme_id', memeId)
        .eq('session_id', sessionId)
        .maybeSingle();

      if (existingVote) {
        if (existingVote.vote_type === voteType) {
          // Remove vote if clicking same button
          const { error } = await supabase
            .from('meme_votes')
            .delete()
            .eq('id', existingVote.id);

          if (error) throw error;
          
          toast({
            title: "Success",
            description: "Vote removed successfully",
          });
        } else {
          // Switch vote type
          const { error } = await supabase
            .from('meme_votes')
            .update({ vote_type: voteType })
            .eq('id', existingVote.id);

          if (error) throw error;
          
          toast({
            title: "Success",
            description: "Vote changed successfully",
          });
        }
      } else {
        // New vote
        const { error } = await supabase
          .from('meme_votes')
          .insert({
            meme_id: memeId,
            session_id: sessionId,
            vote_type: voteType
          });

        if (error) throw error;
        
        toast({
          title: "Success",
          description: `Successfully ${voteType ? 'upvoted' : 'downvoted'} the meme`,
        });
      }

    } catch (error: any) {
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