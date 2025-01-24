import { Card, CardContent } from "@/components/ui/card";
import MemeImage from "./MemeImage";
import VoteButtons from "./VoteButtons";
import DownloadButton from "../votes/DownloadButton";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MemeCardProps {
  id: string;
  image: string;
  title: string;
  description: string | null;
  upvotes: number;
  downvotes: number;
  userId?: string | null;
  onDelete?: () => void;
}

const MemeCard = ({ 
  id, 
  image, 
  title, 
  description,
  upvotes = 0,
  downvotes = 0,
  userId,
  onDelete
}: MemeCardProps) => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      // Delete the meme record
      const { error: deleteError } = await supabase
        .from('memes')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      // Extract storage path from the full URL
      const imagePath = image.split('/').pop();
      if (imagePath) {
        const { error: storageError } = await supabase.storage
          .from('memes')
          .remove([imagePath]);

        if (storageError) {
          console.error('Error deleting image from storage:', storageError);
        }
      }

      toast({
        title: "Success",
        description: "Meme deleted successfully",
      });

      if (onDelete) onDelete();
    } catch (error: any) {
      console.error('Error deleting meme:', error);
      toast({
        title: "Error",
        description: "Failed to delete meme",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white relative group">
      <CardContent className="p-0">
        <div className="relative">
          {user && user.id === userId && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
          <MemeImage
            image={image}
            title={title}
            description={description}
          />
          <div className={`${isMobile ? 'p-4 bg-white border-t border-gray-100' : 'absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200'}`}>
            <div className="flex items-center gap-2">
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemeCard;