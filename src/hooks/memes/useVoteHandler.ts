import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useVoteHandler = () => {
  const { toast } = useToast();
  const [userVotes, setUserVotes] = useState<Map<string, boolean>>(new Map());
  const [isVoting, setIsVoting] = useState(false);

  // Load initial vote states
  useEffect(() => {
    const loadUserVotes = async () => {
      const sessionId = localStorage.getItem('voteSessionId');
      if (!sessionId) return;

      try {
        const { data: votes, error } = await supabase
          .from('meme_votes')
          .select('meme_id, vote_type')
          .eq('session_id', sessionId);

        if (error) throw error;

        const votesMap = new Map();
        votes?.forEach(vote => {
          votesMap.set(vote.meme_id, vote.vote_type);
        });
        setUserVotes(votesMap);
      } catch (error) {
        console.error('Error loading user votes:', error);
      }
    };

    loadUserVotes();
  }, []);

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

      const currentVote = userVotes.get(memeId);
      console.log('Current vote state:', { currentVote, voteType, sessionId });

      const { data: existingVote, error: fetchError } = await supabase
        .from('meme_votes')
        .select('vote_type')
        .eq('meme_id', memeId)
        .eq('session_id', sessionId)
        .maybeSingle();

      if (fetchError) throw fetchError;

      console.log('Existing vote:', existingVote);

      // If there's an existing vote and clicking the same type, remove it
      if (existingVote && existingVote.vote_type === voteType) {
        console.log('Removing existing vote');
        const { error: deleteError } = await supabase
          .from('meme_votes')
          .delete()
          .match({ meme_id: memeId, session_id: sessionId });

        if (deleteError) throw deleteError;
        
        // Update local state to remove the vote
        const newVotes = new Map(userVotes);
        newVotes.delete(memeId);
        setUserVotes(newVotes);
        
        toast({
          title: "Success",
          description: "Vote removed"
        });
        return;
      }

      // If there's an existing vote but different type, update it
      if (existingVote) {
        console.log('Changing vote type');
        const { error: updateError } = await supabase
          .from('meme_votes')
          .update({ vote_type: voteType })
          .match({ meme_id: memeId, session_id: sessionId });

        if (updateError) throw updateError;
        
        // Update local state with the new vote type
        const newVotes = new Map(userVotes);
        newVotes.set(memeId, voteType);
        setUserVotes(newVotes);
        
        toast({
          title: "Success",
          description: `Vote changed to ${voteType ? 'upvote' : 'downvote'}`
        });
        return;
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
      
      // Update local state with the new vote
      const newVotes = new Map(userVotes);
      newVotes.set(memeId, voteType);
      setUserVotes(newVotes);
      
      toast({
        title: "Success",
        description: `Meme ${voteType ? 'upvoted' : 'downvoted'}`
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

  const getUserVote = (memeId: string): boolean | null => {
    return userVotes.has(memeId) ? userVotes.get(memeId)! : null;
  };

  return {
    getUserVote,
    isVoting,
    handleVote
  };
};