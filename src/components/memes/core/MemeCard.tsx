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
        <MemeImage
          image={image}
          title={title}
          description={description}
        />
        <div className="p-4">
          <VoteButtons
            memeId={id}
            upvotes={upvotes}
            downvotes={downvotes}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MemeCard;