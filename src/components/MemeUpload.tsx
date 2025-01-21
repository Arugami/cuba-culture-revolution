import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const MemeUpload = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) {
      toast({
        title: "Error",
        description: "Please provide a title and select an image",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploading(true);
      
      // Upload image to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const { error: uploadError, data } = await supabase.storage
        .from('memes')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('memes')
        .getPublicUrl(fileName);

      // Save meme to database
      const { error: dbError } = await supabase
        .from('memes')
        .insert({
          title,
          description,
          image_url: publicUrl,
        });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Meme uploaded successfully!",
      });

      // Reset form
      setTitle("");
      setDescription("");
      setFile(null);
      
    } catch (error) {
      console.error('Error uploading meme:', error);
      toast({
        title: "Error",
        description: "Failed to upload meme. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4 max-w-md mx-auto p-4">
      <div>
        <Input
          type="text"
          placeholder="Meme Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
      </div>
      <Button type="submit" disabled={uploading} className="w-full">
        {uploading ? "Uploading..." : "Upload Meme"}
      </Button>
    </form>
  );
};

export default MemeUpload;