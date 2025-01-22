import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/AuthModal";
import UploadForm from "./UploadForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MemeUploadProps {
  onUploadSuccess: () => void;
}

const MemeUpload = ({ onUploadSuccess }: MemeUploadProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useAuth();

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
        <UploadForm 
          onSuccess={onUploadSuccess}
          onClose={() => setIsDialogOpen(false)}
          userId={user.id}
        />
      </DialogContent>
    </Dialog>
  );
};

export default MemeUpload;