import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface MemeCardProps {
  id: string;
  image: string;
  title: string;
  description: string | null;
  upvotes?: number;
  downvotes?: number;
  onVote: (memeId: string, voteType: boolean) => Promise<void>;
}

const MemeCard = ({ id, image, title, description, upvotes, downvotes, onVote }: MemeCardProps) => {
  const handleVote = async (e: React.MouseEvent, voteType: boolean) => {
    e.preventDefault();
    await onVote(id, voteType);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
      <CardContent className="p-0 h-full">
        <div className="relative h-full aspect-square">
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
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-cuba-blue"
                onClick={(e) => handleVote(e, true)}
              >
                <ThumbsUp className="w-4 h-4 mr-1" />
                {upvotes || 0}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-cuba-blue"
                onClick={(e) => handleVote(e, false)}
              >
                <ThumbsDown className="w-4 h-4 mr-1" />
                {downvotes || 0}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemeCard;