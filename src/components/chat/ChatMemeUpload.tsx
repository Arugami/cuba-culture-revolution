import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface ChatMemeUploadProps {
  onUploadSuccess: () => void;
}

const ChatMemeUpload = ({ onUploadSuccess }: ChatMemeUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleMemeCommand = async (message: string) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to upload memes",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);
      const parts = message.split(" ");
      
      // Expected format: /meme "title" "description" imageUrl
      if (parts.length < 3) {
        throw new Error('Invalid format. Use: /meme "title" "description" imageUrl');
      }

      // Extract title (removing quotes)
      const titleMatch = message.match(/"([^"]+)"/);
      if (!titleMatch) throw new Error("Title must be in quotes");
      const title = titleMatch[1];

      // Extract description (removing quotes)
      const descMatch = message.substring(message.indexOf(titleMatch[0]) + titleMatch[0].length).match(/"([^"]+)"/);
      if (!descMatch) throw new Error("Description must be in quotes");
      const description = descMatch[1];

      // Get URL (everything after the last quote)
      const imageUrl = message.substring(message.lastIndexOf('"') + 1).trim();
      if (!imageUrl) throw new Error("Image URL is required");

      const { error } = await supabase.rpc('chat_upload_meme', {
        title,
        description,
        image_url: imageUrl,
        user_id: user.id
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Meme uploaded successfully",
      });

      onUploadSuccess();
    } catch (error: any) {
      console.error("Meme upload error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to upload meme",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return {
    handleMemeCommand,
    isUploading
  };
};

export default ChatMemeUpload;