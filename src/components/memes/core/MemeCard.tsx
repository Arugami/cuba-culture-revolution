import { Card, CardContent } from "@/components/ui/card";
import MemeImage from "./MemeImage";
import VoteButtons from "./VoteButtons";

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
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white relative group">
      <CardContent className="p-0">
        <div className="relative">
          <MemeImage
            image={image}
            title={title}
            description={description}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <VoteButtons
                memeId={id}
                upvotes={upvotes}
                downvotes={downvotes}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemeCard;