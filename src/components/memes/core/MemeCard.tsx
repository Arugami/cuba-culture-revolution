import { Card, CardContent } from "@/components/ui/card";
import MemeImage from "./MemeImage";
import VoteButtons from "./VoteButtons";
import DownloadButton from "../votes/DownloadButton";
import { useIsMobile } from "@/hooks/use-mobile";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface MemeCardProps {
  id: string;
  image: string;
  title: string;
  description: string | null;
  upvotes: number;
  downvotes: number;
  userId?: string | null;
}

const MemeCard = ({ 
  id, 
  image, 
  title, 
  description,
  upvotes = 0,
  downvotes = 0,
  userId
}: MemeCardProps) => {
  const isMobile = useIsMobile();
  const { user } = useAuth();

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('memes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Meme deleted successfully');
      // The real-time subscription in the Memes component will handle the UI update
    } catch (error) {
      console.error('Error deleting meme:', error);
      toast.error('Failed to delete meme');
    }
  };

  const isOwner = user?.id === userId;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white relative group">
      <CardContent className="p-0">
        <div className="relative">
          <MemeImage
            image={image}
            title={title}
            description={description}
          />
          {isMobile ? (
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex items-center justify-between gap-2">
                <VoteButtons
                  memeId={id}
                  upvotes={upvotes}
                  downvotes={downvotes}
                />
                <div className="flex items-center gap-2">
                  {isOwner && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleDelete}
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                  <DownloadButton
                    image={image}
                    title={title}
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <VoteButtons
                  memeId={id}
                  upvotes={upvotes}
                  downvotes={downvotes}
                />
                <DownloadButton
                  image={image}
                  title={title}
                />
              </div>
              {isOwner && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDelete}
                  className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/50 hover:bg-black/70 text-white"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MemeCard;