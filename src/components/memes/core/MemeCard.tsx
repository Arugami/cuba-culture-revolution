import { Card, CardContent } from "@/components/ui/card";
import MemeImage from "./MemeImage";
import VoteButtons from "./VoteButtons";
import DownloadButton from "../votes/DownloadButton";
import { useIsMobile } from "@/hooks/use-mobile";

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

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white relative group">
      <CardContent className="p-0">
        <div className="relative">
          <MemeImage
            image={image}
            title={title}
            description={description}
          />
          <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 transition-opacity duration-200 ${
            isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}>
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
      </CardContent>
    </Card>
  );
};

export default MemeCard;