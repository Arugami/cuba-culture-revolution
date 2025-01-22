import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';
import MemeImage from "./MemeImage";
import MemeActions from "./MemeActions";

interface MemeCardProps {
  id: string;
  image: string;
  title: string;
  description: string | null;
  upvotes?: number;
  downvotes?: number;
  onVote: (memeId: string, voteType: boolean) => Promise<void>;
}

const MemeCard = ({ 
  id, 
  image, 
  title, 
  description, 
  upvotes = 0, 
  downvotes = 0,
  onVote 
}: MemeCardProps) => {
  const { toast } = useToast();
  const [userVote, setUserVote] = useState<boolean | null>(null);
  const [localUpvotes, setLocalUpvotes] = useState<number>(upvotes);
  const [localDownvotes, setLocalDownvotes] = useState<number>(downvotes);
  const [isVoting, setIsVoting] = useState(false);

  useEffect(() => {
    const initializeSession = async () => {
      let sessionId = localStorage.getItem('voteSessionId');
      if (!sessionId) {
        sessionId = uuidv4();
        localStorage.setItem('voteSessionId', sessionId);
      }

      // Check existing vote
      const { data } = await supabase
        .from('meme_votes')
        .select('vote_type')
        .eq('meme_id', id)
        .eq('session_id', sessionId)
        .maybeSingle();

      if (data) {
        setUserVote(data.vote_type);
      }
    };

    initializeSession();
  }, [id]);

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

      // If user has already voted with the same vote type, remove the vote
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
        // If user has already voted but with different type, first delete the old vote
        if (userVote !== null) {
          await supabase
            .from('meme_votes')
            .delete()
            .eq('meme_id', memeId)
            .eq('session_id', sessionId);
        }

        // Insert the new vote
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

      // Call parent onVote handler to sync state
      await onVote(memeId, voteType);

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

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <MemeImage
          image={image}
          title={title}
          description={description}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4">
          <h3 className="text-white font-patua text-lg truncate">{title}</h3>
          {description && (
            <p className="text-white/80 text-sm line-clamp-2">{description}</p>
          )}
          <MemeActions
            id={id}
            title={title}
            image={image}
            upvotes={localUpvotes}
            downvotes={localDownvotes}
            userVote={userVote}
            isVoting={isVoting}
            onVote={handleVote}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MemeCard;