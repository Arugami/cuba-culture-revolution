import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import VoteButton from "./VoteButton";

interface MemeActionsProps {
  id: string;
  title: string;
  image: string;
  upvotes: number;
  downvotes: number;
  userVote: boolean | null;
  isVoting: boolean;
  onVote: (e: React.MouseEvent, voteType: boolean) => Promise<void>;
}

const MemeActions = ({ 
  id, 
  title, 
  image, 
  upvotes, 
  downvotes, 
  userVote, 
  isVoting, 
  onVote 
}: MemeActionsProps) => {
  const { toast } = useToast();

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
    <div className="flex justify-between mt-2">
      <div className="flex gap-2">
        <VoteButton
          type="up"
          count={upvotes}
          isActive={userVote === true}
          isDisabled={isVoting}
          onClick={(e) => onVote(e, true)}
        />
        <VoteButton
          type="down"
          count={downvotes}
          isActive={userVote === false}
          isDisabled={isVoting}
          onClick={(e) => onVote(e, false)}
        />
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="text-white hover:text-cuba-blue"
        onClick={handleDownload}
      >
        <Download className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default MemeActions;