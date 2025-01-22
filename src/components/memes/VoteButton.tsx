import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface VoteButtonProps {
  type: 'up' | 'down';
  count: number;
  isActive: boolean;
  isDisabled: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const VoteButton = ({ type, count, isActive, isDisabled, onClick }: VoteButtonProps) => {
  const Icon = type === 'up' ? ThumbsUp : ThumbsDown;
  
  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={isDisabled}
      className={`text-white ${isActive ? 'bg-cuba-blue/20' : 'hover:text-cuba-blue'}`}
      onClick={onClick}
    >
      <Icon className="w-4 h-4 mr-1" />
      {count}
    </Button>
  );
};

export default VoteButton;