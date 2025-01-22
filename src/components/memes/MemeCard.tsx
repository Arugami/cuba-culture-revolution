import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MemeCardProps {
  id: string;
  image: string;
  title: string;
  description: string | null;
  upvotes?: number;
  downvotes?: number;
  onVote: (memeId: string, voteType: boolean) => Promise<void>;
}

const MemeCard = ({ id, image, title, description, upvotes = 0, downvotes = 0, onVote }: MemeCardProps) => {
  const { toast } = useToast();

  const handleVote = async (e: React.MouseEvent, voteType: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await onVote(id, voteType);
      toast({
        title: "Success",
        description: `Successfully ${voteType ? 'upvoted' : 'downvoted'} the meme`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record your vote. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}?meme=${id}`;
    const shareText = `Check out this $CUBA meme: ${title}`;

    try {
      // Try native sharing first
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: shareText,
          url: shareUrl,
        });
        toast({
          title: "Success",
          description: "Share dialog opened successfully",
        });
        return;
      }

      // Fallback to X share URL
      const xShareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
      const newWindow = window.open(xShareUrl, '_blank');
      
      if (newWindow) {
        toast({
          title: "Success",
          description: "Opening X to share the meme",
        });
      } else {
        throw new Error("Popup blocked");
      }
    } catch (error) {
      console.error("Share error:", error);
      toast({
        title: "Error",
        description: "Failed to share the meme. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="relative aspect-square">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4">
            <h3 className="text-white font-patua text-lg truncate">{title}</h3>
            {description && (
              <p className="text-white/80 text-sm line-clamp-2">{description}</p>
            )}
            <div className="flex justify-between mt-2">
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-cuba-blue"
                  onClick={(e) => handleVote(e, true)}
                >
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  {upvotes}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-cuba-blue"
                  onClick={(e) => handleVote(e, false)}
                >
                  <ThumbsDown className="w-4 h-4 mr-1" />
                  {downvotes}
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-cuba-blue"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemeCard;