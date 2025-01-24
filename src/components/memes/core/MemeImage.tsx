interface MemeImageProps {
  image: string;
  title: string;
  description: string | null;
}

const MemeImage = ({ image, title }: MemeImageProps) => {
  return (
    <div className="relative w-full aspect-square">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default MemeImage;