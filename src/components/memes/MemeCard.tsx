import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

interface MemeCardProps {
  id: string;
  image: string;
  title: string;
  description: string | null;
  upvotes?: number;
  downvotes?: number;
  onVote: (memeId: string, voteType: boolean) => Promise<void>;
}

const MemeCard = ({ 
  id, 
  image, 
  title, 
  description, 
  upvotes = 0, 
  downvotes = 0,
  onVote 
}: MemeCardProps) => {
  const { toast } = useToast();
  const [userVote, setUserVote] = useState<boolean | null>(null);
  const [localUpvotes, setLocalUpvotes] = useState<number>(upvotes);
  const [localDownvotes, setLocalDownvotes] = useState<number>(downvotes);
  const [isVoting, setIsVoting] = useState(false);

  useEffect(() => {
    const initializeSession = async () => {
      let sessionId = localStorage.getItem('voteSessionId');
      if (!sessionId) {
        sessionId = uuidv4();
        localStorage.setItem('voteSessionId', sessionId);
      }

      // Check existing vote
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

    initializeSession();
  }, [id]);

  const handleVote = async (e: React.MouseEvent, voteType: boolean) => {
    e.preventDefault();
    e.stopPropagation();

    if (isVoting) return;

    try {
      setIsVoting(true);
      const sessionId = localStorage.getItem('voteSessionId');
      if (!sessionId) {
        toast({
          title: "Error",
          description: "Session not initialized. Please refresh the page.",
          variant: "destructive",
        });
        return;
      }

      // If user has already voted with the same vote type, remove the vote
      if (userVote === voteType) {
        const { error: deleteError } = await supabase
          .from('meme_votes')
          .delete()
          .eq('meme_id', id)
          .eq('session_id', sessionId);

        if (deleteError) throw deleteError;
        
        setUserVote(null);
        if (voteType) {
          setLocalUpvotes(prev => Math.max(0, prev - 1));
        } else {
          setLocalDownvotes(prev => Math.max(0, prev - 1));
        }
      } else {
        // If user has already voted but with different type, first delete the old vote
        if (userVote !== null) {
          await supabase
            .from('meme_votes')
            .delete()
            .eq('meme_id', id)
            .eq('session_id', sessionId);
        }

        // Insert the new vote
        const { error: insertError } = await supabase
          .from('meme_votes')
          .insert({
            meme_id: id,
            session_id: sessionId,
            vote_type: voteType
          });

        if (insertError) throw insertError;
        
        setUserVote(voteType);
        if (voteType) {
          setLocalUpvotes(prev => prev + 1);
          if (userVote === false) setLocalDownvotes(prev => Math.max(0, prev - 1));
        } else {
          setLocalDownvotes(prev => prev + 1);
          if (userVote === true) setLocalUpvotes(prev => Math.max(0, prev - 1));
        }
      }

      // Call parent onVote handler to sync state
      await onVote(id, voteType);

      toast({
        title: "Success",
        description: userVote === voteType 
          ? "Vote removed" 
          : `Meme ${voteType ? 'upvoted' : 'downvoted'}`
      });

    } catch (error: any) {
      console.error('Error handling vote:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to process vote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVoting(false);
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
          <img src={image} alt={title} className="object-cover w-full h-full" />
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
                  disabled={isVoting}
                  className={`text-white ${userVote === true ? 'bg-cuba-blue/20' : 'hover:text-cuba-blue'}`}
                  onClick={(e) => handleVote(e, true)}
                >
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  {localUpvotes}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={isVoting}
                  className={`text-white ${userVote === false ? 'bg-cuba-blue/20' : 'hover:text-cuba-blue'}`}
                  onClick={(e) => handleVote(e, false)}
                >
                  <ThumbsDown className="w-4 h-4 mr-1" />
                  {localDownvotes}
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