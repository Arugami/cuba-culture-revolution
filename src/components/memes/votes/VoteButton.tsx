import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface VoteButtonProps {
  icon: LucideIcon;
  count: number;
  isActive: boolean;
  isDisabled: boolean;
  onClick: (e: React.MouseEvent) => Promise<void>;
}

const VoteButton = ({ icon: Icon, count, isActive, isDisabled, onClick }: VoteButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={isDisabled}
      className={`${
        isActive 
          ? 'text-cuba-blue bg-white/90' 
          : 'text-white hover:text-cuba-blue hover:bg-white/90'
      } transition-colors duration-200`}
      onClick={onClick}
    >
      <Icon className="w-4 h-4 mr-1" />
      {count}
    </Button>
  );
};

export default VoteButton;
