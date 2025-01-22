import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useVoteHandler = () => {
  const { toast } = useToast();
  const [userVote, setUserVote] = useState<boolean | null>(null);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (memeId: string, voteType: boolean) => {
    if (isVoting) return;

    try {
      setIsVoting(true);
      const sessionId = localStorage.getItem('voteSessionId');
      
      if (!sessionId) {
        toast({
          title: "Error",
          description: "Session not initialized",
          variant: "destructive",
        });
        return;
      }

      const { data: existingVote } = await supabase
        .from('meme_votes')
        .select('vote_type')
        .eq('meme_id', memeId)
        .eq('session_id', sessionId)
        .maybeSingle();

      // Remove vote if clicking the same type
      if (existingVote && existingVote.vote_type === voteType) {
        const { error: deleteError } = await supabase
          .from('meme_votes')
          .delete()
          .match({ meme_id: memeId, session_id: sessionId });

        if (deleteError) throw deleteError;
        
        setUserVote(null);
        toast({
          title: "Success",
          description: "Vote removed"
        });
        return;
      }

      // Update vote if different type
      if (existingVote) {
        const { error: updateError } = await supabase
          .from('meme_votes')
          .update({ vote_type: voteType })
          .match({ meme_id: memeId, session_id: sessionId });

        if (updateError) throw updateError;
        
        setUserVote(voteType);
        toast({
          title: "Success",
          description: `Vote changed to ${voteType ? 'upvote' : 'downvote'}`
        });
        return;
      }

      // Create new vote
      const { error: insertError } = await supabase
        .from('meme_votes')
        .insert({
          meme_id: memeId,
          session_id: sessionId,
          vote_type: voteType
        });

      if (insertError) throw insertError;
      
      setUserVote(voteType);
      toast({
        title: "Success",
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

  return {
    userVote,
    isVoting,
    handleVote,
    setUserVote
  };
};