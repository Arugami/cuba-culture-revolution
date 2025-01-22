import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVotes } from "@/hooks/memes/useVotes";
import { cn } from "@/lib/utils";

interface VoteButtonsProps {
  memeId: string;
  upvotes: number;
  downvotes: number;
}

const VoteButtons = ({ memeId, upvotes, downvotes }: VoteButtonsProps) => {
  const { userVote, vote } = useVotes(memeId);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => vote('upvote')}
          className={cn(
            "hover:text-green-500",
            userVote === 'upvote' && "text-green-500"
          )}
        >
          <ThumbsUp className="w-4 h-4 mr-1" />
          {upvotes}
        </Button>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => vote('downvote')}
          className={cn(
            "hover:text-red-500",
            userVote === 'downvote' && "text-red-500"
          )}
        >
          <ThumbsDown className="w-4 h-4 mr-1" />
          {downvotes}
        </Button>
      </div>
    </div>
  );
};

export default VoteButtons;