import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface DownloadButtonProps {
  image: string;
  title: string;
}

const DownloadButton = ({ image, title }: DownloadButtonProps) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "Meme downloaded successfully",
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Error",
        description: "Failed to download the meme. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`${
        isMobile 
          ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100" 
          : "text-white/90 hover:text-white hover:bg-white/10"
      }`}
      onClick={handleDownload}
    >
      <Download className={`${isMobile ? "w-5 h-5" : "w-4 h-4"}`} />
    </Button>
  );
};

export default DownloadButton;