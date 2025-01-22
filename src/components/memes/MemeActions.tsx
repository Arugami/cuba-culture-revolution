import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Download } from "lucide-react";
import VoteButton from "./VoteButton";
import { useToast } from "@/hooks/use-toast";

interface MemeActionsProps {
  id: string;
  title: string;
  image: string;
  upvotes: number;
  downvotes: number;
  userVote: boolean | null;
  isVoting: boolean;
  onVote: (memeId: string, voteType: boolean) => Promise<void>;
}

const MemeActions = ({
  id,
  title,
  image,
  upvotes,
  downvotes,
  userVote,
  isVoting,
  onVote,
}: MemeActionsProps) => {
  const { toast } = useToast();

  const handleVote = async (e: React.MouseEvent, voteType: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    await onVote(id, voteType);
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "Meme downloaded successfully",
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Error",
        description: "Failed to download the meme. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center gap-2 bg-black/60 rounded-full px-4 py-2">
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
      <Button
        variant="ghost"
        size="sm"
        className="text-white/80 hover:text-white"
        onClick={handleDownload}
      >
        <Download className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default MemeActions;