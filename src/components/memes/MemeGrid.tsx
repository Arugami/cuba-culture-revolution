import { Meme } from "@/types/meme";
import MemeCard from "./MemeCard";

interface MemeGridProps {
  memes: Meme[];
  onVote: (memeId: string, voteType: boolean) => Promise<void>;
}

const MemeGrid = ({ memes, onVote }: MemeGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {memes.map((meme) => (
        <MemeCard
          key={meme.id}
          {...meme}
          onVote={onVote}
        />
      ))}
    </div>
  );
};

export default MemeGrid;