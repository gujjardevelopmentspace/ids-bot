import { FeatureCarousel } from "@/components/FeatureCarousel";
import { LoginForm } from "@/components/LoginForm";
import { WaveBackground } from "@/components/WaveBackground";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
    };
    
    checkAuth();
    
    // Listen for storage changes
    const handleStorageChange = () => checkAuth();
    window.addEventListener('storage', handleStorageChange);
    
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (isLoggedIn === null) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden">
      <WaveBackground />
      
      <div className="flex-1 relative z-10 bg-background/80 backdrop-blur-sm">
        <FeatureCarousel />
      </div>
      
      <div className="flex-1 relative z-10 bg-card/95 backdrop-blur-sm border-t lg:border-t-0 lg:border-l border-border">
        <LoginForm />
      </div>
    </div>
  );
};

export default Index;
