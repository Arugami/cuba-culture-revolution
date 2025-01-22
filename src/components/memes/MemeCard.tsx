import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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
  const [userVote, setUserVote] = useState<boolean | null>(null);

  useEffect(() => {
    const checkExistingVote = async () => {
      const sessionId = localStorage.getItem('voteSessionId');
      if (!sessionId) return;

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

    checkExistingVote();
  }, [id]);

  const handleVote = async (e: React.MouseEvent, voteType: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await onVote(id, voteType);
      setUserVote(userVote === voteType ? null : voteType);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record your vote. Please try again.",
        variant: "destructive",
      });
    }
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
                  className={`text-white ${userVote === true ? 'bg-cuba-blue/20' : 'hover:text-cuba-blue'}`}
                  onClick={(e) => handleVote(e, true)}
                >
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  {upvotes}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-white ${userVote === false ? 'bg-cuba-blue/20' : 'hover:text-cuba-blue'}`}
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
                onClick={handleDownload}
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemeCard;