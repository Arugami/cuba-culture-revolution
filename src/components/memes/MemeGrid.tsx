import { Meme } from "@/types/meme";
import MemeCard from "./MemeCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface MemeGridProps {
  memes: Meme[];
  onVote: (memeId: string, voteType: boolean) => Promise<void>;
}

const MemeGrid = ({ memes, onVote }: MemeGridProps) => {
  return (
    <div className="w-full px-8">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-1">
          {memes.map((meme) => (
            <CarouselItem key={meme.id} className="pl-1 basis-full md:basis-1/3 lg:basis-1/4">
              <MemeCard {...meme} onVote={onVote} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default MemeGrid;