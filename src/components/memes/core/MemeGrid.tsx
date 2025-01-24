import { Meme } from "@/types/meme";
import MemeCard from "./MemeCard";

interface MemeGridProps {
  memes: Meme[];
  onMemeDelete?: () => void;
}

const MemeGrid = ({ memes, onMemeDelete }: MemeGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {memes.map((meme) => (
        <MemeCard
          key={meme.id}
          id={meme.id}
          image={meme.image}
          title={meme.title}
          description={meme.description}
          upvotes={meme.upvotes}
          downvotes={meme.downvotes}
          userId={meme.userId}
          onDelete={onMemeDelete}
        />
      ))}
    </div>
  );
};

export default MemeGrid;