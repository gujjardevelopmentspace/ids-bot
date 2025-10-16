import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Facebook, Mail, Bot, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo credentials - only one set
    const demoEmail = "demo@flaxxawapi.com";
    const demoPassword = "demo123";
    
    if (email === demoEmail && password === demoPassword) {
      toast.success("Login successful! Welcome to Ideas bot Dashboard");
      // Store login state in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", "Muhammad Abdullah Qureshi");
      // Redirect to dashboard
      navigate("/dashboard");
    } else {
      toast.error("Invalid credentials. Please use: demo@flaxxawapi.com / demo123");
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`${provider} login would be implemented here`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 sm:p-6 lg:p-8 xl:p-12">
      <div className="w-full max-w-md space-y-6 lg:space-y-8">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#16a34a] to-[#15803d] rounded-xl flex items-center justify-center shadow-lg">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <div className="flex flex-col items-start">
                <h1 className="text-3xl font-bold text-foreground">Ideas bot</h1>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Zap className="w-3 h-3 text-yellow-500" />
                  <span>WhatsApp Business API</span>
                </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Demo Credentials Helper */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Demo Credentials:</h3>
            <div className="text-xs text-blue-700">
              <p>• demo@flaxxawapi.com / demo123</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email<span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password<span className="text-destructive">*</span>
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-11"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label
                htmlFor="remember"
                className="text-sm cursor-pointer font-normal"
              >
                Remember me
              </Label>
            </div>
            <a
              href="#"
              className="text-sm text-primary hover:underline"
              onClick={(e) => {
                e.preventDefault();
                toast.info("Password recovery would be implemented here");
              }}
            >
              Forgot your password?
            </a>
          </div>

          <Button type="submit" className="w-full h-12 text-base" size="lg">
            Log in
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-center text-sm font-medium text-muted-foreground">
              Sign in with Social Platforms
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                type="button"
                variant="social"
                className="h-11 flex items-center justify-center gap-2"
                onClick={() => handleSocialLogin("Facebook")}
              >
                <Facebook className="w-4 h-4 text-[#1877F2]" />
                <span className="hidden sm:inline">Facebook</span>
              </Button>
              <Button
                type="button"
                variant="social"
                className="h-11 flex items-center justify-center gap-2"
                onClick={() => handleSocialLogin("Google")}
              >
                <Mail className="w-4 h-4 text-[#EA4335]" />
                <span className="hidden sm:inline">Google</span>
              </Button>
              <Button
                type="button"
                variant="social"
                className="h-11 flex items-center justify-center gap-2"
                onClick={() => handleSocialLogin("WhatsApp")}
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="#25D366"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span className="hidden sm:inline">Whatsapp</span>
              </Button>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Don't have account?{" "}
            <a
              href="#"
              className="text-primary font-medium hover:underline"
              onClick={(e) => {
                e.preventDefault();
                toast.info("Sign up would be implemented here");
              }}
            >
              Free Signup.
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
