import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Filter,
  FolderX,
  User,
  ArrowUp,
  Plus,
  Bot,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Play,
  Pause,
  Settings,
  Eye,
  CheckCircle,
  Clock,
  ArrowRightLeft
} from "lucide-react";

interface Bot {
  id: string;
  name: string;
  description: string;
  type: 'welcome' | 'support' | 'sales' | 'faq' | 'custom';
  status: 'active' | 'inactive' | 'draft';
  triggers: number;
  responses: number;
  lastActive: string;
  createdAt: string;
  enabled: boolean;
  keywords: string[];
  responseMessage: string;
  triggerConditions: string[];
}

const ReplyBots = () => {
  const [filters, setFilters] = useState({
    name: "",
    type: "",
    date: ""
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBot, setEditingBot] = useState<Bot | null>(null);

  const [botForm, setBotForm] = useState({
    name: "",
    description: "",
    type: "welcome" as Bot['type'],
    responseMessage: "",
    keywords: "",
    triggerConditions: ""
  });

  // Load bots from localStorage
  const [bots, setBots] = useState<Bot[]>(() => {
    const saved = localStorage.getItem('replyBots');
    return saved ? JSON.parse(saved) : [
      {
        id: "1",
        name: "Welcome Bot",
        description: "Automated welcome messages for new customers",
        type: "welcome",
        status: "active",
        triggers: 5,
        responses: 12,
        lastActive: "2025-01-14",
        createdAt: "2025-01-01",
        enabled: true,
        keywords: ["hello", "hi", "start"],
        responseMessage: "Welcome! How can I help you today?",
        triggerConditions: ["new_customer", "first_message"]
      },
      {
        id: "2",
        name: "Support Bot",
        description: "Handles common support queries automatically",
        type: "support",
        status: "active",
        triggers: 8,
        responses: 25,
        lastActive: "2025-01-14",
        createdAt: "2025-01-02",
        enabled: true,
        keywords: ["help", "support", "problem"],
        responseMessage: "I'm here to help! What issue are you experiencing?",
        triggerConditions: ["support_keyword", "help_request"]
      },
      {
        id: "3",
        name: "Sales Bot",
        description: "Qualifies leads and provides product information",
        type: "sales",
        status: "inactive",
        triggers: 3,
        responses: 8,
        lastActive: "2025-01-10",
        createdAt: "2025-01-05",
        enabled: false,
        keywords: ["price", "cost", "buy"],
        responseMessage: "Great! Let me tell you about our products and pricing.",
        triggerConditions: ["sales_inquiry", "pricing_question"]
      }
    ];
  });

  // Save bots to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('replyBots', JSON.stringify(bots));
  }, [bots]);

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      name: "",
      type: "",
      date: ""
    });
  };

  const filteredBots = bots.filter(bot => {
    const matchesName = bot.name.toLowerCase().includes(filters.name.toLowerCase());
    const matchesType = !filters.type || bot.type === filters.type;
    const matchesDate = !filters.date || bot.createdAt.includes(filters.date);
    
    return matchesName && matchesType && matchesDate;
  });

  const handleCreateBot = () => {
    if (!botForm.name.trim() || !botForm.description.trim() || !botForm.responseMessage.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newBot: Bot = {
      id: Date.now().toString(),
      name: botForm.name.trim(),
      description: botForm.description.trim(),
      type: botForm.type,
      status: "draft",
      triggers: 0,
      responses: 0,
      lastActive: "Never",
      createdAt: new Date().toISOString().split('T')[0],
      enabled: false,
      keywords: botForm.keywords.split(',').map(k => k.trim()).filter(k => k),
      responseMessage: botForm.responseMessage.trim(),
      triggerConditions: botForm.triggerConditions.split(',').map(t => t.trim()).filter(t => t)
    };

    setBots(prev => [...prev, newBot]);
    setIsCreateModalOpen(false);
    setBotForm({
      name: "",
      description: "",
      type: "welcome",
      responseMessage: "",
      keywords: "",
      triggerConditions: ""
    });
    toast.success("Bot created successfully!");
  };

  const handleEditBot = (bot: Bot) => {
    setEditingBot(bot);
    setBotForm({
      name: bot.name,
      description: bot.description,
      type: bot.type,
      responseMessage: bot.responseMessage,
      keywords: bot.keywords.join(', '),
      triggerConditions: bot.triggerConditions.join(', ')
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateBot = () => {
    if (!editingBot || !botForm.name.trim() || !botForm.description.trim() || !botForm.responseMessage.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setBots(prev => prev.map(bot => 
      bot.id === editingBot.id 
        ? {
            ...bot,
            name: botForm.name.trim(),
            description: botForm.description.trim(),
            type: botForm.type,
            keywords: botForm.keywords.split(',').map(k => k.trim()).filter(k => k),
            responseMessage: botForm.responseMessage.trim(),
            triggerConditions: botForm.triggerConditions.split(',').map(t => t.trim()).filter(t => t)
          }
        : bot
    ));

    setIsEditModalOpen(false);
    setEditingBot(null);
    setBotForm({
      name: "",
      description: "",
      type: "welcome",
      responseMessage: "",
      keywords: "",
      triggerConditions: ""
    });
    toast.success("Bot updated successfully!");
  };

  const handleDeleteBot = (id: string) => {
    setBots(prev => prev.filter(bot => bot.id !== id));
    toast.success("Bot deleted successfully!");
  };

  const handleDuplicateBot = (bot: Bot) => {
    const duplicatedBot: Bot = {
      ...bot,
      id: Date.now().toString(),
      name: `${bot.name} (Copy)`,
      status: "draft",
      triggers: 0,
      responses: 0,
      lastActive: "Never",
      createdAt: new Date().toISOString().split('T')[0],
      enabled: false
    };

    setBots(prev => [...prev, duplicatedBot]);
    toast.success("Bot duplicated successfully!");
  };

  const handleToggleBot = (id: string) => {
    setBots(prev => prev.map(bot => 
      bot.id === id 
        ? { 
            ...bot, 
            enabled: !bot.enabled,
            status: !bot.enabled ? "active" : "inactive",
            lastActive: !bot.enabled ? new Date().toISOString().split('T')[0] : bot.lastActive
          }
        : bot
    ));
    toast.success("Bot status updated!");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Play className="w-4 h-4 text-green-500" />;
      case "inactive":
        return <Pause className="w-4 h-4 text-red-500" />;
      case "draft":
        return <Edit className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive":
        return <Badge className="bg-red-100 text-red-800">Inactive</Badge>;
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "welcome": return "Welcome Bot";
      case "support": return "Support Bot";
      case "sales": return "Sales Bot";
      case "faq": return "FAQ Bot";
      case "custom": return "Custom Bot";
      default: return type;
    }
  };

  return (
    <div className="page-container">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Reply Bots - idea bot</h1>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Bot
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Bot</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="create-name">Bot Name *</Label>
                  <Input
                    id="create-name"
                    placeholder="Enter bot name"
                    value={botForm.name}
                    onChange={(e) => setBotForm(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="create-description">Description *</Label>
                  <Textarea
                    id="create-description"
                    placeholder="Enter bot description"
                    value={botForm.description}
                    onChange={(e) => setBotForm(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="create-type">Bot Type *</Label>
                  <Select value={botForm.type} onValueChange={(value) => setBotForm(prev => ({ ...prev, type: value as Bot['type'] }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="welcome">Welcome Bot</SelectItem>
                      <SelectItem value="support">Support Bot</SelectItem>
                      <SelectItem value="sales">Sales Bot</SelectItem>
                      <SelectItem value="faq">FAQ Bot</SelectItem>
                      <SelectItem value="custom">Custom Bot</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="create-response">Response Message *</Label>
                  <Textarea
                    id="create-response"
                    placeholder="Enter the message this bot will send"
                    value={botForm.responseMessage}
                    onChange={(e) => setBotForm(prev => ({ ...prev, responseMessage: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="create-keywords">Keywords (comma-separated)</Label>
                  <Input
                    id="create-keywords"
                    placeholder="hello, hi, help"
                    value={botForm.keywords}
                    onChange={(e) => setBotForm(prev => ({ ...prev, keywords: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="create-triggers">Trigger Conditions (comma-separated)</Label>
                  <Input
                    id="create-triggers"
                    placeholder="new_customer, first_message"
                    value={botForm.triggerConditions}
                    onChange={(e) => setBotForm(prev => ({ ...prev, triggerConditions: e.target.value }))}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateBot} className="bg-[#16a34a] hover:bg-[#15803d] text-white">
                    Create Bot
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white">
            Upgrade
          </Button>
        </div>
      </div>

      {/* Main Content Card */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          {/* Page Title */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Bots Configurations</h2>
          </div>

          {/* Filter Section */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Name Field */}
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter name"
                  value={filters.name}
                  onChange={(e) => handleFilterChange('name', e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* Type Field */}
              <div>
                <Label htmlFor="type" className="text-sm font-medium text-gray-700">
                  Type
                </Label>
                <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="welcome">Welcome Bot</SelectItem>
                    <SelectItem value="support">Support Bot</SelectItem>
                    <SelectItem value="sales">Sales Bot</SelectItem>
                    <SelectItem value="faq">FAQ Bot</SelectItem>
                    <SelectItem value="custom">Custom Bot</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Field */}
              <div>
                <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                  Date
                </Label>
                <Input
                  id="date"
                  placeholder="YYYY-MM-DD"
                  value={filters.date}
                  onChange={(e) => handleFilterChange('date', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2 mt-4">
              <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button 
                variant="outline" 
                className="bg-yellow-100 text-yellow-800 border-yellow-300"
                onClick={clearFilters}
              >
                Clear filters
              </Button>
            </div>
          </div>

          {/* Bots List or Empty State */}
          {filteredBots.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBots.map((bot) => (
                <Card key={bot.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Bot Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#16a34a] rounded-full flex items-center justify-center">
                            <Bot className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{bot.name}</h3>
                            <p className="text-sm text-gray-600">{getTypeLabel(bot.type)}</p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleEditBot(bot)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicateBot(bot)}>
                              <Copy className="w-4 h-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleBot(bot.id)}>
                              {bot.enabled ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                              {bot.enabled ? 'Disable' : 'Enable'}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDeleteBot(bot.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Bot Description */}
                      <p className="text-sm text-gray-600">{bot.description}</p>

                      {/* Status and Toggle */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(bot.status)}
                          {getStatusBadge(bot.status)}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">Enabled</span>
                          <Switch 
                            checked={bot.enabled} 
                            onCheckedChange={() => handleToggleBot(bot.id)}
                          />
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <ArrowRightLeft className="w-5 h-5 text-gray-500 mx-auto mb-1" />
                          <p className="text-sm text-gray-500">Triggers</p>
                          <p className="font-semibold">{bot.triggers}</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto mb-1" />
                          <p className="text-sm text-gray-500">Responses</p>
                          <p className="font-semibold">{bot.responses}</p>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Last Active</span>
                          <span className="font-medium">{bot.lastActive}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Created</span>
                          <span className="font-medium">{bot.createdAt}</span>
                        </div>
                      </div>

                      {/* Keywords */}
                      {bot.keywords.length > 0 && (
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Keywords:</p>
                          <div className="flex flex-wrap gap-1">
                            {bot.keywords.map((keyword, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-16">
              <div className="relative mb-6">
                {/* Main folder with X */}
                <div className="w-24 h-24 bg-[#16a34a] rounded-lg flex items-center justify-center relative z-10">
                  <FolderX className="w-12 h-12 text-white" />
                </div>
                
                {/* Flying documents */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-300 rounded opacity-60 transform rotate-12"></div>
                <div className="absolute -top-1 -right-6 w-5 h-5 bg-gray-300 rounded opacity-40 transform -rotate-12"></div>
                <div className="absolute top-2 -right-8 w-4 h-4 bg-gray-300 rounded opacity-30 transform rotate-45"></div>
                <div className="absolute top-6 -right-4 w-3 h-3 bg-gray-300 rounded opacity-20 transform -rotate-45"></div>
                
                {/* Woman illustration */}
                <div className="absolute -right-8 top-2">
                  <div className="w-16 h-20 relative">
                    {/* Head */}
                    <div className="w-8 h-8 bg-gray-300 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2"></div>
                    {/* Hair */}
                    <div className="w-10 h-6 bg-gray-800 rounded-full absolute -top-1 left-1/2 transform -translate-x-1/2"></div>
                    {/* Body */}
                    <div className="w-8 h-12 bg-[#16a34a] rounded absolute top-6 left-1/2 transform -translate-x-1/2"></div>
                    {/* Skirt */}
                    <div className="w-10 h-8 bg-black absolute top-16 left-1/2 transform -translate-x-1/2 rounded-b-lg"></div>
                    <div className="w-2 h-2 bg-white absolute top-18 left-1/2 transform -translate-x-1/2 rounded"></div>
                    {/* Hand */}
                    <div className="w-3 h-3 bg-gray-300 rounded-full absolute top-8 -left-1"></div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                There Are No Replies...
              </h3>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Bot Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Bot</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Bot Name *</Label>
              <Input
                id="edit-name"
                placeholder="Enter bot name"
                value={botForm.name}
                onChange={(e) => setBotForm(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description *</Label>
              <Textarea
                id="edit-description"
                placeholder="Enter bot description"
                value={botForm.description}
                onChange={(e) => setBotForm(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="edit-type">Bot Type *</Label>
              <Select value={botForm.type} onValueChange={(value) => setBotForm(prev => ({ ...prev, type: value as Bot['type'] }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="welcome">Welcome Bot</SelectItem>
                  <SelectItem value="support">Support Bot</SelectItem>
                  <SelectItem value="sales">Sales Bot</SelectItem>
                  <SelectItem value="faq">FAQ Bot</SelectItem>
                  <SelectItem value="custom">Custom Bot</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-response">Response Message *</Label>
              <Textarea
                id="edit-response"
                placeholder="Enter the message this bot will send"
                value={botForm.responseMessage}
                onChange={(e) => setBotForm(prev => ({ ...prev, responseMessage: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="edit-keywords">Keywords (comma-separated)</Label>
              <Input
                id="edit-keywords"
                placeholder="hello, hi, help"
                value={botForm.keywords}
                onChange={(e) => setBotForm(prev => ({ ...prev, keywords: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="edit-triggers">Trigger Conditions (comma-separated)</Label>
              <Input
                id="edit-triggers"
                placeholder="new_customer, first_message"
                value={botForm.triggerConditions}
                onChange={(e) => setBotForm(prev => ({ ...prev, triggerConditions: e.target.value }))}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateBot} className="bg-[#16a34a] hover:bg-[#15803d] text-white">
                Update Bot
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReplyBots;
