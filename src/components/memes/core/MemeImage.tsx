interface MemeImageProps {
  image: string;
  title: string;
  description: string | null;
}

const MemeImage = ({ image, title, description }: MemeImageProps) => {
  return (
    <div className="relative w-full aspect-square">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover"
      />
      {description && (
        <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">
          {description}
        </div>
      )}
    </div>
  );
};

export default MemeImage;
