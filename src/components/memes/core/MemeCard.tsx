import { Card, CardContent } from "@/components/ui/card";
import MemeImage from "./MemeImage";
import VoteButtons from "./VoteButtons";
import DownloadButton from "../votes/DownloadButton";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

interface MemeCardProps {
  id: string;
  image: string;
  title: string;
  description: string | null;
  upvotes: number;
  downvotes: number;
}

const MemeCard = ({ 
  id, 
  image, 
  title, 
  description,
  upvotes = 0,
  downvotes = 0
}: MemeCardProps) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('memes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Meme deleted successfully",
      });
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
          {!isMobile && (
            <button
              onClick={handleDelete}
              className="absolute top-2 right-2 z-10 p-2 bg-red-500 hover:bg-red-600 rounded-full shadow-lg"
            >
              <Trash2 className="h-5 w-5 text-white" />
            </button>
          )}
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
                  <button
                    onClick={handleDelete}
                    className="p-2 bg-red-500 hover:bg-red-600 rounded-full shadow-lg"
                  >
                    <Trash2 className="h-5 w-5 text-white" />
                  </button>
                  <DownloadButton
                    image={image}
                    title={title}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
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
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MemeCard;