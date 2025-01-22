import { Card, CardContent } from "@/components/ui/card";
import MemeImage from "./MemeImage";

interface MemeCardProps {
  id: string;
  image: string;
  title: string;
  description: string | null;
}

const MemeCard = ({ 
  id, 
  image, 
  title, 
  description
}: MemeCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white relative group">
      <CardContent className="p-0">
        <MemeImage
          image={image}
          title={title}
          description={description}
        />
      </CardContent>
    </Card>
  );
};

export default MemeCard;