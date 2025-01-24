import { useAuth } from "@/contexts/AuthContext";
import { useVotes } from "@/hooks/memes/useVotes";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface VoteButtonsProps {
  memeId: string;
  upvotes: number;
  downvotes: number;
}

const VoteButtons = ({ memeId, upvotes, downvotes }: VoteButtonsProps) => {
  const { user } = useAuth();
  const { userVote, handleVote } = useVotes(memeId);

  const handleVoteClick = (voteType: 'upvote' | 'downvote') => {
    if (!user) return;
    handleVote(voteType);
  };

  return (
    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full p-1">
      <Button
        variant="ghost"
        size="icon"
        className={`rounded-full ${userVote === 'upvote' ? 'text-green-500' : 'text-gray-500'}`}
        onClick={() => handleVoteClick('upvote')}
        disabled={!user}
      >
        <ThumbsUp className="h-4 w-4" />
        <span className="ml-1">{upvotes}</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className={`rounded-full ${userVote === 'downvote' ? 'text-red-500' : 'text-gray-500'}`}
        onClick={() => handleVoteClick('downvote')}
        disabled={!user}
      >
        <ThumbsDown className="h-4 w-4" />
        <span className="ml-1">{downvotes}</span>
      </Button>
    </div>
  );
};

export default VoteButtons;