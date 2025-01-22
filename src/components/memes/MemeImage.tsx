interface MemeImageProps {
  image: string;
  title: string;
  description: string | null;
}

const MemeImage = ({ image, title }: MemeImageProps) => {
  return (
    <img 
      src={image} 
      alt={title} 
      className="w-full aspect-square object-cover"
    />
  );
};

export default MemeImage;