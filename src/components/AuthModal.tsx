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
import { useToast } from "@/components/ui/use-toast";
import { X } from "lucide-react";

interface AuthModalProps {
  trigger?: React.ReactNode;
  mode?: "sign-in" | "sign-up";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AuthModal({ trigger, mode = "sign-in", open, onOpenChange }: AuthModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState(mode);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleOpenChange = (newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    } else {
      setIsOpen(newOpen);
    }
  };

  const validatePassword = (password: string): boolean => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (currentMode === "sign-up" && !validatePassword(password)) {
        toast({
          title: "Invalid Password",
          description: "Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters.",
          variant: "destructive",
        });
        return;
      }

      if (currentMode === "sign-in") {
        await signIn(email, password);
        toast({
          title: "Welcome back!",
          description: "Successfully signed in.",
        });
      } else {
        await signUp(email, password);
        toast({
          title: "Account created",
          description: "Please check your email to confirm your account.",
        });
      }
      handleOpenChange(false);
      setEmail("");
      setPassword("");
    } catch (error: any) {
      console.error("Auth error:", error);
      let errorMessage = "An unexpected error occurred";
      
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Invalid email or password";
      } else if (error.message.includes("Email not confirmed")) {
        errorMessage = "Please confirm your email address";
      } else if (error.message.includes("User already registered")) {
        errorMessage = "This email is already registered";
      } else if (error.message.includes("Too many requests")) {
        errorMessage = "Too many login attempts. Please try again later";
      }

      toast({
        title: "Authentication Error",
        description: errorMessage,
        variant: "destructive",
      });
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
    <Dialog 
      open={open !== undefined ? open : isOpen} 
      onOpenChange={handleOpenChange}
    >
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Sign In</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0 bg-white">
        <div className="relative p-6">
          <button
            onClick={() => handleOpenChange(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {currentMode === "sign-in" ? "Sign In" : "Create Account"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md border-[#E5E7EB]"
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md border-[#E5E7EB]"
                placeholder="Enter your password"
              />
              {currentMode === "sign-up" && (
                <p className="text-sm text-gray-500 mt-1">
                  Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters.
                </p>
              )}
            </div>
            <div className="space-y-4">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-cuba-blue hover:bg-blue-700 text-white py-2 rounded-md"
              >
                {isLoading ? "Loading..." : currentMode === "sign-in" ? "Sign In" : "Sign Up"}
              </Button>
              <Button 
                type="button" 
                variant="ghost"
                onClick={toggleMode}
                className="w-full text-cuba-blue hover:text-blue-700"
              >
                {currentMode === "sign-in" ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}