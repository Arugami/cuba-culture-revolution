import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import MemeImage from "./MemeImage";
import VoteActions from "../votes/VoteActions";

interface MemeCardProps {
  id: string;
  image: string;
  title: string;
  description: string | null;
  upvotes?: number;
  downvotes?: number;
  userVote: boolean | null;
  isVoting: boolean;
  onVote: (memeId: string, voteType: boolean) => Promise<void>;
}

const MemeCard = ({ 
  id, 
  image, 
  title, 
  description, 
  upvotes = 0, 
  downvotes = 0,
  userVote,
  isVoting,
  onVote 
}: MemeCardProps) => {
  const [currentUserVote, setCurrentUserVote] = useState<boolean | null>(userVote);

  useEffect(() => {
    setCurrentUserVote(userVote);
  }, [userVote]);

  const handleVoteClick = async (memeId: string, voteType: boolean) => {
    console.log('Vote clicked:', { memeId, voteType, currentUserVote });
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
            <VoteActions
              id={id}
              title={title}
              image={image}
              upvotes={upvotes}
              downvotes={downvotes}
              userVote={currentUserVote}
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