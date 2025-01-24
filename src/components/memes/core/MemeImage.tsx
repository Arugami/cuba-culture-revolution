import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MemeImageProps {
  id: string;
  image: string;
  title: string;
  description: string | null;
  userId: string | null;
  onDelete?: () => void;
}

const MemeImage = ({ id, image, title, userId, onDelete }: MemeImageProps) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!user || user.id !== userId) return;

    try {
      // Delete the image from storage
      const imageUrl = new URL(image);
      const imagePath = imageUrl.pathname.split('/').pop();
      if (imagePath) {
        await supabase.storage
          .from('memes')
          .remove([imagePath]);
      }

      // Delete the meme from the database
      const { error } = await supabase
        .from('memes')
        .delete()
        .eq('id', id);

      if (error) throw error;

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
    <div className="relative w-full aspect-square group">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover"
      />
      {user && user.id === userId && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 p-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
          aria-label="Delete meme"
        >
          <Trash2 className="w-5 h-5 text-white" />
        </button>
      )}
    </div>
  );
};

export default MemeImage;