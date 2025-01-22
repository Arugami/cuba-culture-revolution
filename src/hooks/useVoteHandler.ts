import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useVoteHandler = (initialUpvotes = 0, initialDownvotes = 0) => {
  const { toast } = useToast();
  const [userVote, setUserVote] = useState<boolean | null>(null);
  const [localUpvotes, setLocalUpvotes] = useState<number>(initialUpvotes);
  const [localDownvotes, setLocalDownvotes] = useState<number>(initialDownvotes);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (memeId: string, voteType: boolean) => {
    if (isVoting) return;

    try {
      setIsVoting(true);
      const sessionId = localStorage.getItem('voteSessionId');
      if (!sessionId) {
        toast({
          title: "Error",
          description: "Session not initialized. Please refresh the page.",
          variant: "destructive",
        });
        return;
      }

      if (userVote === voteType) {
        const { error: deleteError } = await supabase
          .from('meme_votes')
          .delete()
          .eq('meme_id', memeId)
          .eq('session_id', sessionId);

        if (deleteError) throw deleteError;
        
        setUserVote(null);
        if (voteType) {
          setLocalUpvotes(prev => Math.max(0, prev - 1));
        } else {
          setLocalDownvotes(prev => Math.max(0, prev - 1));
        }
      } else {
        if (userVote !== null) {
          await supabase
            .from('meme_votes')
            .delete()
            .eq('meme_id', memeId)
            .eq('session_id', sessionId);
        }

        const { error: insertError } = await supabase
          .from('meme_votes')
          .insert({
            meme_id: memeId,
            session_id: sessionId,
            vote_type: voteType
          });

        if (insertError) throw insertError;
        
        setUserVote(voteType);
        if (voteType) {
          setLocalUpvotes(prev => prev + 1);
          if (userVote === false) setLocalDownvotes(prev => Math.max(0, prev - 1));
        } else {
          setLocalDownvotes(prev => prev + 1);
          if (userVote === true) setLocalUpvotes(prev => Math.max(0, prev - 1));
        }
      }

      toast({
        title: "Success",
        description: userVote === voteType 
          ? "Vote removed" 
          : `Meme ${voteType ? 'upvoted' : 'downvoted'}`
      });

    } catch (error: any) {
      console.error('Error handling vote:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to process vote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVoting(false);
    }
  };

  return {
    userVote,
    localUpvotes,
    localDownvotes,
    isVoting,
    handleVote,
    setUserVote
  };
};