import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVotes } from "@/hooks/memes/useVotes";
import { cn } from "@/lib/utils";

interface VoteButtonsProps {
  memeId: string;
  upvotes: number;
  downvotes: number;
}

const VoteButtons = ({ memeId, upvotes: initialUpvotes, downvotes: initialDownvotes }: VoteButtonsProps) => {
  const { userVote, vote, isLoading } = useVotes(memeId);

  // Calculate current vote counts based on user's vote
  const upvotes = initialUpvotes + (userVote === 'upvote' ? 1 : 0);
  const downvotes = initialDownvotes + (userVote === 'downvote' ? 1 : 0);

  return (
    <div className="flex items-center gap-2 bg-black/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg transition-opacity duration-200">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => vote('upvote')}
        disabled={isLoading}
        className={cn(
          "hover:bg-transparent",
          userVote === 'upvote' 
            ? "text-green-500" 
            : "text-gray-300 hover:text-green-500"
        )}
      >
        <ThumbsUp className="w-5 h-5 mr-1.5" />
        <span className="text-sm font-medium">{upvotes}</span>
      </Button>

      <div className="w-px h-4 bg-gray-600" />

      <Button
        variant="ghost"
        size="sm"
        onClick={() => vote('downvote')}
        disabled={isLoading}
        className={cn(
          "hover:bg-transparent",
          userVote === 'downvote' 
            ? "text-red-500" 
            : "text-gray-300 hover:text-red-500"
        )}
      >
        <ThumbsDown className="w-5 h-5 mr-1.5" />
        <span className="text-sm font-medium">{downvotes}</span>
      </Button>
    </div>
  );
};

export default VoteButtons;