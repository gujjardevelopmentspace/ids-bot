import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Megaphone, 
  User, 
  ArrowRightLeft, 
  FileText as FileTemplateIcon,
  Network,
  Play,
  Bot,
  Smartphone,
  MessageSquare,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  Calendar,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Users2,
  Download,
  Facebook,
  BookOpen,
  ExternalLink,
  Loader2,
  TrendingUp,
  Activity,
  Zap,
  Target,
  DollarSign,
  Eye,
  Heart,
  Star
} from "lucide-react";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Quick Action Cards with better descriptions
  const quickActions = [
    { 
      title: "Send Campaign", 
      description: "Broadcast messages to your audience",
      icon: Megaphone, 
      color: "text-[#16a34a]",
      bgColor: "bg-green-50",
      action: "Create and send targeted campaigns"
    },
    { 
      title: "Add Contact", 
      description: "Import or create new contacts",
      icon: User, 
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      action: "Expand your contact database"
    },
    { 
      title: "Create Bot", 
      description: "Set up automated responses",
      icon: ArrowRightLeft, 
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      action: "Automate customer interactions"
    },
    { 
      title: "New Template", 
      description: "Design message templates",
      icon: FileTemplateIcon, 
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      action: "Create reusable message formats"
    }
  ];

  // Realistic Statistics
  const stats = {
    totalContacts: 2847,
    activeCampaigns: 12,
    messagesSent: 45623,
    responseRate: 87.3,
    totalRevenue: 125430,
    activeAgents: 8,
    templatesCreated: 45,
    botsActive: 6
  };

  // Recent Activity Data
  const recentActivity = [
    {
      id: 1,
      type: "campaign",
      title: "Black Friday Sale Campaign",
      description: "Sent to 1,247 contacts",
      time: "2 minutes ago",
      status: "delivered",
      icon: Megaphone,
      color: "text-green-600"
    },
    {
      id: 2,
      type: "contact",
      title: "New Contact Added",
      description: "Sarah Johnson joined your list",
      time: "5 minutes ago",
      status: "success",
      icon: User,
      color: "text-blue-600"
    },
    {
      id: 3,
      type: "bot",
      title: "Customer Support Bot",
      description: "Responded to 23 queries",
      time: "8 minutes ago",
      status: "active",
      icon: Bot,
      color: "text-purple-600"
    },
    {
      id: 4,
      type: "template",
      title: "Welcome Template",
      description: "Template approved by Meta",
      time: "15 minutes ago",
      status: "approved",
      icon: FileTemplateIcon,
      color: "text-orange-600"
    }
  ];

  // Performance Metrics
  const performanceMetrics = [
    {
      title: "Message Delivery Rate",
      value: "98.7%",
      change: "+2.3%",
      trend: "up",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Response Time",
      value: "2.4s",
      change: "-0.8s",
      trend: "up",
      icon: Clock,
      color: "text-blue-600"
    },
    {
      title: "Customer Satisfaction",
      value: "4.8/5",
      change: "+0.2",
      trend: "up",
      icon: Star,
      color: "text-yellow-600"
    },
    {
      title: "Revenue Growth",
      value: "23.5%",
      change: "+5.2%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-600"
    }
  ];

  // Contacts Section Cards
  const contactCards = [
    { 
      title: "Contact List", 
      description: "Manage your contacts",
      count: stats.totalContacts,
      icon: FileText, 
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    { 
      title: "Contact Fields", 
      description: "Customize contact data",
      count: 12,
      icon: FileTemplateIcon, 
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    { 
      title: "Contact Groups", 
      description: "Organize contacts",
      count: 8,
      icon: Users2, 
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    { 
      title: "Contact Import", 
      description: "Bulk import contacts",
      count: "CSV/Excel",
      icon: Download, 
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  // Knowledgebase Links
  const knowledgebaseLinks = [
    "Get started with idea bot",
    "How to Create and Import Contacts?",
    "How to Add your WhatsApp Number with idea bot?",
    "How to Create Broadcast Campaigns in idea bot?",
    "How to Create a New WhatsApp Marketing Template from Scratch?",
    "Learn How to Create Effective WhatsApp Message Templates?",
    "Steps to Use Phone Number that has been Registered with WhatsApp Business Before"
  ];

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-[#16a34a]" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Welcome Section */}
      <Card className="card-responsive">
        <CardContent className="card-content-responsive">
          <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-6">
            <div className="space-y-4 flex-1">
              <h1 className="text-responsive-xl font-bold text-foreground">
                Welcome back, Muhammad Abdullah Qureshi 👋
              </h1>
              <p className="text-responsive-base text-muted-foreground">
                Your WhatsApp Business automation platform is running smoothly. 
                <span className="text-primary font-medium"> {stats.totalContacts.toLocaleString()} contacts</span> are ready for engagement.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg">
                  <Play className="w-4 h-4 mr-2" />
                  Quick Start
                </Button>
                <div className="text-sm text-muted-foreground">
                  Last updated: {currentTime.toLocaleTimeString()}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-primary/20">
                <Smartphone className="w-12 h-12 lg:w-16 lg:h-16 text-primary" />
              </div>
              <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
                <Bot className="w-10 h-10 lg:w-12 lg:h-12 text-primary-foreground" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Action Cards */}
      <div className="grid-responsive-4">
        {quickActions.map((action, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-200 cursor-pointer group card-responsive">
            <CardContent className="card-content-responsive">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className={`w-10 h-10 lg:w-12 lg:h-12 ${action.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform backdrop-blur-sm border border-primary/20 flex-shrink-0`}>
                  <action.icon className={`w-5 h-5 lg:w-6 lg:h-6 ${action.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm lg:text-base text-foreground group-hover:text-primary transition-colors truncate">{action.title}</h3>
                  <p className="text-xs lg:text-sm text-muted-foreground line-clamp-2">{action.description}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{action.action}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest updates from your WhatsApp Business account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-primary/5 transition-colors backdrop-blur-sm border border-transparent hover:border-primary/20">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.color.replace('text-', 'bg-').replace('-600', '-50')} backdrop-blur-sm border border-primary/20`}>
                  <activity.icon className={`w-5 h-5 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{activity.title}</h4>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="mb-1 bg-primary/10 text-primary border-primary/20">{activity.status}</Badge>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feature Cards */}
      <div className="grid-responsive-3">
        {/* Flows Section */}
        <Card className="bg-gradient-to-br from-primary to-accent text-primary-foreground border-0 shadow-lg">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <Network className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-primary-foreground">
              Flows
            </h3>
            <p className="text-sm mb-6 text-primary-foreground/90 flex-grow">
              Create interactive, automated chat experiences to streamline your interactions with customers.
            </p>
            <Button 
              variant="secondary"
              className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg mt-auto"
            >
              Create Flows
            </Button>
          </CardContent>
        </Card>

        {/* Templates Section */}
        <Card className="bg-white border-0 shadow-lg">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <FileTemplateIcon className="w-8 h-8 text-[#16a34a]" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              Templates
            </h3>
            <p className="text-sm mb-6 text-gray-600 flex-grow">
              WhatsApp Templates can be anything ranging from promotional messages, product launches, weekly newsletters, abandoned cart reminders, festive greetings and much more.
            </p>
            <Button 
              className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white mt-auto"
            >
              Use Now
            </Button>
          </CardContent>
        </Card>

        {/* Campaigns Section */}
        <Card className="bg-white border-0 shadow-lg">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <Megaphone className="w-8 h-8 text-[#16a34a]" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              Campaigns
            </h3>
            <p className="text-sm mb-6 text-gray-600 flex-grow">
              WhatsApp Campaign lets you send new messages to individuals and to your groups and interact with customers directly.
            </p>
            <Button 
              className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white mt-auto"
            >
              Send New Campaigns
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Contacts Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid-responsive-4">
            {contactCards.map((contact, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-3 lg:p-4 text-center">
                  <contact.icon className={`w-5 h-5 lg:w-6 lg:h-6 mx-auto mb-2 ${contact.color}`} />
                  <h4 className="font-medium text-gray-800 text-xs lg:text-sm">{contact.title}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Facebook Catalogue Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Facebook className="w-5 h-5" />
            Facebook Catalogue
          </CardTitle>
          <CardDescription>
            Create Facebook catalog to send products and collections in WhatsApp messages to your users in just a click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Connect Wapi to Facebook (OAuth)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Map Catalogue to WABA registered with Wapi</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Start sharing the products with your users</span>
            </div>
            <div className="pt-4">
              <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white">
                Connect Catalogue
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Quick Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-gray-400 mx-auto mb-2 animate-spin" />
              <p className="text-gray-500">Loading analytics...</p>
              <p className="text-sm text-gray-400">11:38</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Knowledgebase Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Knowledgebase
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {knowledgebaseLinks.map((link, index) => (
              <div key={index} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                <ExternalLink className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">{link}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t">
            <Button variant="outline" className="w-full">
              View All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 py-4">
        https://idea-bot.com/dashboard
      </div>
    </div>
  );
};

export default Dashboard;
