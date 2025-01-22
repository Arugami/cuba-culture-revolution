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
import { Separator } from "@/components/ui/separator";

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
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const { toast } = useToast();

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
      setIsOpen(false);
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

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error: any) {
      console.error("Google auth error:", error);
      toast({
        title: "Authentication Error",
        description: "Failed to sign in with Google",
        variant: "destructive",
      });
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
        <div className="flex flex-col space-y-4">
          <Button 
            variant="outline" 
            onClick={handleGoogleSignIn}
            className="w-full"
          >
            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
            Continue with Google
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email input"
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
                aria-label={isLoading ? "Loading..." : currentMode === "sign-in" ? "Sign In" : "Sign Up"}
              >
                {isLoading ? "Loading..." : currentMode === "sign-in" ? "Sign In" : "Sign Up"}
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                onClick={toggleMode}
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