import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Phone, 
  Tag, 
  Users, 
  FileText, 
  Megaphone, 
  MessageSquare, 
  ArrowRightLeft, 
  Smartphone, 
  ShoppingCart, 
  Link, 
  UserCheck,
  ChevronDown,
  Video,
  Globe,
  HelpCircle,
  User,
  LogOut,
  Play,
  Bot,
  Zap,
  Send,
  Plus,
  FileText as FileTemplateIcon,
  Network,
  MessageCircle,
  Settings,
  Code
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, message: "New campaign sent successfully", time: "2 min ago", type: "success" },
    { id: 2, message: "3 new contacts added", time: "5 min ago", type: "info" },
    { id: 3, message: "Template approved by Meta", time: "1 hour ago", type: "success" }
  ]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleSidebarClick = (itemId: string, path: string) => {
    setActiveTab(itemId);
    navigate(path);
  };

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { id: "phone", label: "Phone Numbers", icon: Phone, path: "/phone-numbers" },
    { id: "brand", label: "Brand", icon: Tag, path: "/brand" },
    { id: "contacts", label: "Contacts", icon: Users, path: "/contacts" },
    { id: "groups", label: "Groups Management", icon: Users, path: "/groups-management" },
    { id: "templates", label: "Templates", icon: FileText, path: "/templates" },
    { id: "broadcast", label: "Broadcast Campaigns", icon: Megaphone, path: "/broadcast-campaigns" },
    { id: "chats", label: "Chats Inbox", icon: MessageSquare, path: "/chats-inbox" },
    { id: "bots", label: "Reply Bots", icon: ArrowRightLeft, path: "/reply-bots" },
    { id: "flows", label: "Whatsapp Flows", icon: Smartphone, path: "/whatsapp-flows" },
    { id: "commerce", label: "Commerce Catalogue", icon: ShoppingCart, path: "/commerce-catalogue" },
    { id: "integrations", label: "Integrations", icon: Link, path: "/integrations" },
    { id: "agency", label: "Agency Reseller", icon: UserCheck, path: "/agency-reseller" },
    { id: "chat-agents", label: "Chat Agents", icon: MessageCircle, path: "/chat-agents" },
    { id: "agent-management", label: "Agent Management", icon: Bot, path: "/agent-management" },
    { id: "wapi-settings", label: "Ideas bot Settings", icon: Settings, path: "/wapi-settings" },
    { id: "api", label: "API", icon: Code, path: "/api" },
  ];

  // Update active tab based on current location
  React.useEffect(() => {
    const currentItem = sidebarItems.find(item => item.path === location.pathname);
    if (currentItem) {
      setActiveTab(currentItem.id);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Wave Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M0,300 C300,250 600,350 900,300 C1200,250 1440,300 1440,300 L1440,0 L0,0 Z"
            fill="hsl(var(--wave-light))"
            opacity="0.1"
          />
          <path
            d="M0,400 C400,350 800,450 1200,400 C1400,375 1440,400 1440,400 L1440,0 L0,0 Z"
            fill="hsl(var(--wave-medium))"
            opacity="0.05"
          />
        </svg>
      </div>

      <div className="flex relative z-10 min-h-screen">
        {/* Sidebar - Hidden on mobile, visible on desktop */}
        <aside className="hidden lg:flex w-64 bg-card/80 backdrop-blur-sm border-r border-border/50 flex-col shrink-0">
          {/* Logo Section */}
          <div className="p-6 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <img src="/favicon.svg" alt="Inventer Design Studio" className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-black">Inventer Design Studio</h1>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Zap className="w-3 h-3 text-gray-500" />
                  <span>WhatsApp Business API</span>
                </div>
              </div>
            </div>
          </div>
        
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {sidebarItems.map((item) => (
              <div 
                key={item.id}
                className={`flex items-center px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
                  activeTab === item.id 
                    ? 'bg-primary/15 shadow-sm border border-primary/20 text-primary' 
                    : 'hover:bg-primary/10 hover:shadow-sm text-foreground'
                }`}
                onClick={() => handleSidebarClick(item.id, item.path)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <item.icon className={`w-5 h-5 shrink-0 ${activeTab === item.id ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={`text-sm font-medium truncate ${activeTab === item.id ? 'text-primary' : 'text-foreground'}`}>
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-background/50 backdrop-blur-sm min-w-0">
          {/* Header */}
          <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 px-4 lg:px-6 py-4 shrink-0">
            <div className="flex items-center justify-between gap-4">
              {/* Left Section - Mobile menu and title */}
              <div className="flex items-center gap-4 min-w-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="lg:hidden shrink-0"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </Button>
                <h2 className="text-xl font-semibold text-foreground truncate">
                  {sidebarItems.find(item => item.id === activeTab)?.label?.toUpperCase() || 'DASHBOARD'}
                </h2>
              </div>
              
              {/* Center Section - Desktop header buttons */}
              <div className="hidden lg:flex items-center gap-3">
                <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg">
                  <Video className="w-4 h-4 mr-2" />
                  Tutorials
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      Inventor Design Studio
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Inventor Design Studio</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" className="gap-2">
                  <Globe className="w-4 h-4" />
                  English
                </Button>
                <Button className="bg-black hover:bg-gray-800 text-white">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Support
                </Button>
              </div>
              
              {/* Right Section - User info and logout */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8 bg-black">
                    <AvatarFallback className="text-white text-sm font-bold">U</AvatarFallback>
                  </Avatar>
                  <div className="hidden lg:block text-right">
                    <p className="text-sm font-medium text-gray-800">Muhammad Abdullah Qureshi</p>
                    <p className="text-xs text-gray-500">Last Login: 2025-01-14 02:33:13</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-card/95 backdrop-blur-sm border-r border-border/50">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                      <img src="/favicon.svg" alt="Inventer Design Studio" className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <h1 className="text-xl font-bold text-black">Inventer Design Studio</h1>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Zap className="w-3 h-3 text-gray-500" />
                        <span>WhatsApp Business API</span>
                      </div>
                    </div>
                  </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
              
              <nav className="space-y-1">
                {sidebarItems.map((item) => (
                  <div 
                    key={item.id}
                    className={`flex items-center px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
                      activeTab === item.id 
                        ? 'bg-primary/15 shadow-sm border border-primary/20 text-primary' 
                        : 'hover:bg-primary/10 hover:shadow-sm text-foreground'
                    }`}
                    onClick={() => {
                      handleSidebarClick(item.id, item.path);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <item.icon className={`w-5 h-5 shrink-0 ${activeTab === item.id ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className={`text-sm font-medium truncate ${activeTab === item.id ? 'text-primary' : 'text-foreground'}`}>
                        {item.label}
                      </span>
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
