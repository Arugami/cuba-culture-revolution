import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';
import MemeImage from "./MemeImage";
import MemeActions from "./MemeActions";
import { useVoteHandler } from "@/hooks/useVoteHandler";

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
  const {
    userVote,
    localUpvotes,
    localDownvotes,
    isVoting,
    handleVote,
    setUserVote
  } = useVoteHandler(upvotes, downvotes);

  useEffect(() => {
    const initializeSession = async () => {
      let sessionId = localStorage.getItem('voteSessionId');
      if (!sessionId) {
        sessionId = uuidv4();
        localStorage.setItem('voteSessionId', sessionId);
      }

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
  }, [id, setUserVote]);

  const handleVoteClick = async (memeId: string, voteType: boolean) => {
    await handleVote(memeId, voteType);
    await onVote(memeId, voteType);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white relative group">
      <CardContent className="p-0">
        <MemeImage
          image={image}
          title={title}
          description={description}
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <MemeActions
              id={id}
              title={title}
              image={image}
              upvotes={localUpvotes}
              downvotes={localDownvotes}
              userVote={userVote}
              isVoting={isVoting}
              onVote={handleVoteClick}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemeCard;