import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "./AuthModal";

const MemeUpload = ({ onUploadSuccess }: { onUploadSuccess: () => void }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Error",
        description: "Please sign in to upload memes",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("memes")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("memes")
        .getPublicUrl(fileName);

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
      onUploadSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload meme",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center p-6 bg-white rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Sign in to Upload Memes</h3>
        <AuthModal trigger={
          <Button className="bg-cuba-blue hover:bg-cuba-blue/90">
            Sign In to Upload
          </Button>
        } />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow">
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
      <Button type="submit" disabled={isUploading} className="w-full bg-cuba-blue hover:bg-cuba-blue/90">
        {isUploading ? "Uploading..." : "Upload Meme"}
      </Button>
    </form>
  );
};

export default MemeUpload;