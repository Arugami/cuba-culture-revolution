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
      className={`text-white ${isActive ? 'bg-cuba-blue/20' : 'hover:text-cuba-blue'}`}
      onClick={onClick}
    >
      <Icon className="w-4 h-4 mr-1" />
      {count}
    </Button>
  );
};

export default VoteButton;