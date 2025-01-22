import { Card, CardContent } from "@/components/ui/card";

interface MemeImageProps {
  image: string;
  title: string;
  description: string | null;
}

const MemeImage = ({ image, title, description }: MemeImageProps) => {
  return (
    <div className="relative aspect-square">
      <img src={image} alt={title} className="object-cover w-full h-full" />
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4">
        <h3 className="text-white font-patua text-lg truncate">{title}</h3>
        {description && (
          <p className="text-white/80 text-sm line-clamp-2">{description}</p>
        )}
      </div>
    </div>
  );
};

export default MemeImage;