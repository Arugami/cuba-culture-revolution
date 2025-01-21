import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

interface AuthModalProps {
  trigger?: React.ReactNode;
  mode?: "sign-in" | "sign-up";
}

export function AuthModal({ trigger, mode = "sign-in" }: AuthModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState(mode);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (currentMode === "sign-in") {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      setIsOpen(false);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setCurrentMode(currentMode === "sign-in" ? "sign-up" : "sign-in");
    setEmail("");
    setPassword("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Sign In</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {currentMode === "sign-in" ? "Sign In" : "Create Account"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col space-y-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : currentMode === "sign-in" ? "Sign In" : "Sign Up"}
            </Button>
            <Button type="button" variant="ghost" onClick={toggleMode}>
              {currentMode === "sign-in"
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign In"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}