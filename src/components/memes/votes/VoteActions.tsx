import VoteButton from "./VoteButton";
import DownloadButton from "./DownloadButton";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface VoteActionsProps {
  id: string;
  title: string;
  image: string;
  upvotes: number;
  downvotes: number;
  userVote: boolean | null;
  isVoting: boolean;
  onVote: (memeId: string, voteType: boolean) => Promise<void>;
}

const VoteActions = ({
  id,
  title,
  image,
  upvotes,
  downvotes,
  userVote,
  isVoting,
  onVote,
}: VoteActionsProps) => {
  const handleVote = async (e: React.MouseEvent, voteType: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    await onVote(id, voteType);
  };

  return (
    <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
      <VoteButton
        icon={ThumbsUp}
        count={upvotes}
        isActive={userVote === true}
        isDisabled={isVoting}
        onClick={(e) => handleVote(e, true)}
      />
      <VoteButton
        icon={ThumbsDown}
        count={downvotes}
        isActive={userVote === false}
        isDisabled={isVoting}
        onClick={(e) => handleVote(e, false)}
      />
      <DownloadButton image={image} title={title} />
    </div>
  );
};

export default VoteActions;