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
      <DialogContent 
        className="sm:max-w-[425px] bg-[url('/lovable-uploads/5cfc9436-5af1-4040-8c8b-f965bbba05f2.png')] bg-cover bg-center before:content-[''] before:absolute before:inset-0 before:bg-white/90"
      >
        <div className="relative z-10">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {currentMode === "sign-in" ? "Sign In" : "Create Account"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md"
                aria-label="Email input"
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
                className="w-full px-3 py-2 border rounded-md"
                aria-label="Password input"
              />
              {currentMode === "sign-up" && (
                <p className="text-sm text-gray-500">
                  Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters.
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-cuba-blue hover:bg-blue-700 text-white"
                aria-label={isLoading ? "Loading..." : currentMode === "sign-in" ? "Sign In" : "Sign Up"}
              >
                {isLoading ? "Loading..." : currentMode === "sign-in" ? "Sign In" : "Sign Up"}
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                onClick={toggleMode}
                className="text-cuba-blue hover:text-blue-700"
                aria-label={currentMode === "sign-in" ? "Switch to Sign Up" : "Switch to Sign In"}
              >
                {currentMode === "sign-in"
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Sign In"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}