import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "../AuthModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const MemeUpload = ({ onUploadSuccess }: { onUploadSuccess: () => void }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !user) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and make sure you're logged in",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      // Generate a unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      // Upload file to Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from("memes")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get the public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from("memes")
        .getPublicUrl(fileName);

      // Insert meme record into the database
      const { error: dbError } = await supabase
        .from("memes")
        .insert({
          title,
          description,
          image_url: publicUrl,
          user_id: user.id,
        });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Meme uploaded successfully!",
      });
      
      setTitle("");
      setDescription("");
      setFile(null);
      setIsDialogOpen(false);
      onUploadSuccess();
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to upload meme",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const uploadButton = (
    <Button className="bg-cuba-blue hover:bg-cuba-blue/90">
      Upload Meme
    </Button>
  );

  if (!user) {
    return (
      <div className="flex justify-center w-full">
        <AuthModal trigger={uploadButton} />
      </div>
    );
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {uploadButton}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Your Meme</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Meme Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="text"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
              className="w-full"
            />
          </div>
          <Button 
            type="submit" 
            disabled={isUploading} 
            className="w-full bg-cuba-blue hover:bg-cuba-blue/90"
          >
            {isUploading ? "Uploading..." : "Upload Meme"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MemeUpload;
