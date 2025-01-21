import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Meme } from "@/types/meme";

export const useVoteManagement = (onVoteSuccess: () => void) => {
  const { toast } = useToast();
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (memeId: string, voteType: boolean) => {
    if (isVoting) return;
    
    setIsVoting(true);
    try {
      const sessionId = localStorage.getItem('voteSessionId') || crypto.randomUUID();
      localStorage.setItem('voteSessionId', sessionId);

      const { data: existingVote } = await supabase
        .from('meme_votes')
        .select()
        .eq('meme_id', memeId)
        .eq('session_id', sessionId)
        .maybeSingle();

      if (existingVote) {
        if (existingVote.vote_type === voteType) {
          await supabase
            .from('meme_votes')
            .delete()
            .eq('id', existingVote.id);

          toast({
            title: "Success!",
            description: "Vote removed",
          });
        } else {
          await supabase
            .from('meme_votes')
            .update({ vote_type: voteType })
            .eq('id', existingVote.id);

          toast({
            title: "Success!",
            description: `Vote changed to ${voteType ? 'up' : 'down'}`,
          });
        }
      } else {
        await supabase
          .from('meme_votes')
          .insert({
            meme_id: memeId,
            session_id: sessionId,
            vote_type: voteType
          });

        toast({
          title: "Success!",
          description: `Vote ${voteType ? 'up' : 'down'} recorded`,
        });
      }

      setTimeout(onVoteSuccess, 100);
    } catch (error: any) {
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