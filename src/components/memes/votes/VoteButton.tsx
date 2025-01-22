import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
      className={cn(
        "transition-all duration-200",
        isActive 
          ? 'text-cuba-blue bg-white/90 scale-110' 
          : 'text-white hover:text-cuba-blue hover:bg-white/90 hover:scale-110'
      )}
      onClick={onClick}
    >
      <Icon className="w-4 h-4 mr-1" />
      {count}
    </Button>
  );
};

export default VoteButton;