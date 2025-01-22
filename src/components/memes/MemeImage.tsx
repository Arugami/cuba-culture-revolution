interface MemeImageProps {
  image: string;
  title: string;
  description: string | null;
}

const MemeImage = ({ image, title, description }: MemeImageProps) => {
  return (
    <div className="relative">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-[300px] object-cover rounded-t-lg"
      />
    </div>
  );
};

export default MemeImage;