import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVotes } from "@/hooks/memes/useVotes";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface VoteButtonsProps {
  memeId: string;
  upvotes: number;
  downvotes: number;
}

const VoteButtons = ({ memeId, upvotes: initialUpvotes, downvotes: initialDownvotes }: VoteButtonsProps) => {
  const { userVote, vote, isLoading } = useVotes(memeId);
  const { user } = useAuth();

  // Calculate current vote counts based on user's vote
  const upvotes = initialUpvotes + (userVote === 'upvote' ? 1 : 0);
  const downvotes = initialDownvotes + (userVote === 'downvote' ? 1 : 0);

  const handleVoteClick = (voteType: 'upvote' | 'downvote') => {
    if (user) {
      vote(voteType);
    }
  };

  return (
    <div className="flex items-center gap-1 bg-black/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleVoteClick('upvote')}
        disabled={isLoading || !user}
        className={cn(
          "h-7 px-2 hover:bg-transparent",
          userVote === 'upvote' 
            ? "text-green-500" 
            : "text-gray-300 hover:text-green-500"
        )}
      >
        <ThumbsUp className="w-4 h-4 mr-1" />
        <span className="text-sm">{upvotes}</span>
      </Button>

      <div className="w-px h-4 bg-gray-600" />

      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleVoteClick('downvote')}
        disabled={isLoading || !user}
        className={cn(
          "h-7 px-2 hover:bg-transparent",
          userVote === 'downvote' 
            ? "text-red-500" 
            : "text-gray-300 hover:text-red-500"
        )}
      >
        <ThumbsDown className="w-4 h-4 mr-1" />
        <span className="text-sm">{downvotes}</span>
      </Button>
    </div>
  );
};

export default VoteButtons;