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
    if (isVoting) {
      console.log('Already processing a vote');
      return;
    }

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

      console.log('Current vote state:', { userVote, voteType, sessionId });

      const { data: existingVote, error: fetchError } = await supabase
        .from('meme_votes')
        .select('vote_type')
        .eq('meme_id', memeId)
        .eq('session_id', sessionId)
        .maybeSingle();

      if (fetchError) throw fetchError;

      console.log('Existing vote:', existingVote);

      // If clicking the same vote type, remove the vote
      if (existingVote && existingVote.vote_type === voteType) {
        console.log('Removing existing vote');
        const { error: deleteError } = await supabase
          .from('meme_votes')
          .delete()
          .match({ meme_id: memeId, session_id: sessionId });

        if (deleteError) throw deleteError;
        
        setUserVote(null);
        if (voteType) {
          setLocalUpvotes(prev => Math.max(0, prev - 1));
        } else {
          setLocalDownvotes(prev => Math.max(0, prev - 1));
        }

        toast({
          title: "Success",
          description: "Vote removed"
        });
        return; // Add return to prevent further execution
      }

      // If changing vote type, update the existing vote
      if (existingVote) {
        console.log('Changing vote type');
        const { error: updateError } = await supabase
          .from('meme_votes')
          .update({ vote_type: voteType })
          .match({ meme_id: memeId, session_id: sessionId });

        if (updateError) throw updateError;
        
        setUserVote(voteType);
        if (voteType) {
          setLocalUpvotes(prev => prev + 1);
          setLocalDownvotes(prev => Math.max(0, prev - 1));
        } else {
          setLocalDownvotes(prev => prev + 1);
          setLocalUpvotes(prev => Math.max(0, prev - 1));
        }

        toast({
          title: "Success",
          description: `Vote changed to ${voteType ? 'upvote' : 'downvote'}`
        });
        return; // Add return to prevent further execution
      }

      // If no vote exists, create a new one
      console.log('Creating new vote');
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
      } else {
        setLocalDownvotes(prev => prev + 1);
      }

      toast({
        title: "Success",
        description: `Meme ${voteType ? 'upvoted' : 'downvoted'}`
      });
      return; // Add return for consistency

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