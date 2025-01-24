import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import MemeImage from "./MemeImage";
import VoteButtons from "./VoteButtons";

interface MemeCardProps {
  id: string;
  image: string;
  title: string;
  description: string | null;
  upvotes: number;
  downvotes: number;
  userId: string | null;
  onDelete?: () => void;
}

const MemeCard = ({ 
  id, 
  image, 
  title, 
  description, 
  upvotes, 
  downvotes,
  userId,
  onDelete 
}: MemeCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </CardHeader>
      <CardContent className="p-0">
        <MemeImage 
          id={id}
          image={image} 
          title={title} 
          description={description}
          userId={userId}
          onDelete={onDelete}
        />
      </CardContent>
      <CardFooter className="p-4">
        <VoteButtons
          memeId={id}
          upvotes={upvotes}
          downvotes={downvotes}
        />
      </CardFooter>
    </Card>
  );
};

export default MemeCard;