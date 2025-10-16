import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Copy,
  Trash2,
  Play,
  Pause,
  CheckCircle,
  Clock,
  Users,
  Bot
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface Agent {
  id: string;
  name: string;
  email: string;
  role: 'Senior Agent' | 'Agent' | 'Junior Agent' | 'Bot Agent';
  status: 'online' | 'away' | 'offline';
  activeChats: number;
  totalChats: number;
  rating: number;
  lastActive: string;
  skills: string[];
  enabled: boolean;
}

const ChatAgents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [viewingAgent, setViewingAgent] = useState<Agent | null>(null);
  const [agentForm, setAgentForm] = useState({
    name: "",
    email: "",
    role: "Agent" as Agent['role'],
    status: "online" as Agent['status'],
    skills: "",
    enabled: true
  });

  const [agents, setAgents] = useState<Agent[]>(() => {
    const saved = localStorage.getItem('chatAgents');
    return saved ? JSON.parse(saved) : [
      {
        id: "1",
        name: "Sarah Johnson",
        email: "sarah@flaxxa.com",
        role: "Senior Agent",
        status: "online",
        activeChats: 5,
        totalChats: 1250,
        rating: 4.8,
        lastActive: "2 min ago",
        skills: ["Sales", "Customer Support", "Technical Assistance"],
        enabled: true
      },
      {
        id: "2",
        name: "Michael Chen",
        email: "michael@flaxxa.com",
        role: "Agent",
        status: "away",
        activeChats: 3,
        totalChats: 890,
        rating: 4.6,
        lastActive: "15 min ago",
        skills: ["Support", "Billing", "Account Management"],
        enabled: true
      },
      {
        id: "3",
        name: "Emily Davis",
        email: "emily@flaxxa.com",
        role: "Junior Agent",
        status: "offline",
        activeChats: 0,
        totalChats: 450,
        rating: 4.4,
        lastActive: "2 hours ago",
        skills: ["Customer Support", "Product Information"],
        enabled: true
      },
      {
        id: "4",
        name: "AI Assistant",
        email: "ai@flaxxa.com",
        role: "Bot Agent",
        status: "online",
        activeChats: 12,
        totalChats: 5000,
        rating: 4.2,
        lastActive: "Now",
        skills: ["FAQ", "Basic Support", "Lead Qualification", "Appointment Booking"],
        enabled: true
      },
      {
        id: "5",
        name: "David Rodriguez",
        email: "david@flaxxa.com",
        role: "Agent",
        status: "online",
        activeChats: 4,
        totalChats: 678,
        rating: 4.7,
        lastActive: "5 min ago",
        skills: ["Sales", "Technical Support", "Integration Help"],
        enabled: true
      },
      {
        id: "6",
        name: "Lisa Wang",
        email: "lisa@flaxxa.com",
        role: "Senior Agent",
        status: "away",
        activeChats: 2,
        totalChats: 1100,
        rating: 4.9,
        lastActive: "30 min ago",
        skills: ["Customer Success", "Training", "Escalation Management"],
        enabled: true
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('chatAgents', JSON.stringify(agents));
  }, [agents]);

  // Filter agents based on search term
  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // CRUD Operations
  const resetForm = () => {
    setAgentForm({
      name: "",
      email: "",
      role: "Agent",
      status: "online",
      skills: "",
      enabled: true
    });
  };

  const handleCreateAgent = () => {
    if (!agentForm.name || !agentForm.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newAgent: Agent = {
      id: Date.now().toString(),
      name: agentForm.name,
      email: agentForm.email,
      role: agentForm.role,
      status: agentForm.status,
      activeChats: 0,
      totalChats: 0,
      rating: 0,
      lastActive: "Now",
      skills: agentForm.skills.split(',').map(s => s.trim()).filter(s => s),
      enabled: agentForm.enabled
    };

    setAgents([...agents, newAgent]);
    resetForm();
    setIsCreateModalOpen(false);
    toast.success("Agent created successfully");
  };

  const handleEditAgent = (agent: Agent) => {
    setEditingAgent(agent);
    setAgentForm({
      name: agent.name,
      email: agent.email,
      role: agent.role,
      status: agent.status,
      skills: agent.skills.join(', '),
      enabled: agent.enabled
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateAgent = () => {
    if (!agentForm.name || !agentForm.email || !editingAgent) {
      toast.error("Please fill in all required fields");
      return;
    }

    const updatedAgent: Agent = {
      ...editingAgent,
      name: agentForm.name,
      email: agentForm.email,
      role: agentForm.role,
      status: agentForm.status,
      skills: agentForm.skills.split(',').map(s => s.trim()).filter(s => s),
      enabled: agentForm.enabled
    };

    setAgents(agents.map(agent => agent.id === editingAgent.id ? updatedAgent : agent));
    setIsEditModalOpen(false);
    setEditingAgent(null);
    resetForm();
    toast.success("Agent updated successfully");
  };

  const handleDeleteAgent = (id: string) => {
    setAgents(agents.filter(agent => agent.id !== id));
    toast.success("Agent deleted successfully");
  };

  const handleDuplicateAgent = (agent: Agent) => {
    const duplicatedAgent: Agent = {
      ...agent,
      id: Date.now().toString(),
      name: `${agent.name} (Copy)`,
      email: `${agent.email.split('@')[0]}_copy@${agent.email.split('@')[1]}`,
      activeChats: 0,
      totalChats: 0,
      lastActive: "Now"
    };
    setAgents([...agents, duplicatedAgent]);
    toast.success("Agent duplicated successfully");
  };

  const handleViewAgent = (agent: Agent) => {
    setViewingAgent(agent);
    setIsViewModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return <Badge className="bg-green-100 text-green-800">Online</Badge>;
      case "away":
        return <Badge className="bg-yellow-100 text-yellow-800">Away</Badge>;
      case "offline":
        return <Badge className="bg-gray-100 text-gray-800">Offline</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Senior Agent":
        return <Badge className="bg-blue-100 text-blue-800">Senior</Badge>;
      case "Agent":
        return <Badge className="bg-green-100 text-green-800">Agent</Badge>;
      case "Junior Agent":
        return <Badge className="bg-orange-100 text-orange-800">Junior</Badge>;
      case "Bot Agent":
        return <Badge className="bg-purple-100 text-purple-800">Bot</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Chat Agents</h1>
          <p className="text-gray-600">Manage your customer support agents and AI assistants</p>
        </div>
        <Button 
          onClick={() => {
            resetForm();
            setIsCreateModalOpen(true);
          }}
          className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Agent
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Agents</p>
                <p className="text-2xl font-bold text-gray-900">{agents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Online</p>
                <p className="text-2xl font-bold text-gray-900">
                  {agents.filter(a => a.status === 'online').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Chats</p>
                <p className="text-2xl font-bold text-gray-900">
                  {agents.reduce((sum, a) => sum + a.activeChats, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">AI Agents</p>
                <p className="text-2xl font-bold text-gray-900">
                  {agents.filter(a => a.role === 'Bot Agent').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                      {agent.role === 'Bot Agent' ? (
                        <Bot className="w-5 h-5 text-white" />
                      ) : (
                        <span className="text-white text-sm font-medium">
                          {agent.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      )}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(agent.status)}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <CardDescription className="text-sm">{agent.email}</CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleViewAgent(agent)}>
                      <Eye className="w-4 h-4 mr-2" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEditAgent(agent)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDuplicateAgent(agent)}>
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDeleteAgent(agent.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {/* Status and Role */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusBadge(agent.status)}
                  </div>
                  {getRoleBadge(agent.role)}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <MessageCircle className="w-5 h-5 text-gray-500 mx-auto mb-1" />
                    <p className="text-sm text-gray-500">Active Chats</p>
                    <p className="font-semibold">{agent.activeChats}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Users className="w-5 h-5 text-green-500 mx-auto mb-1" />
                    <p className="text-sm text-gray-500">Total Chats</p>
                    <p className="font-semibold">{agent.totalChats.toLocaleString()}</p>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <p className="text-sm text-gray-500 mb-2">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {agent.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Rating</span>
                    <span className="font-medium">{agent.rating}/5.0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Last Active</span>
                    <span className="font-medium">{agent.lastActive}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Agent Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={(open) => {
        setIsCreateModalOpen(open);
        if (!open) resetForm();
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Agent</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={agentForm.name}
                onChange={(e) => setAgentForm({...agentForm, name: e.target.value})}
                placeholder="Enter agent name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={agentForm.email}
                onChange={(e) => setAgentForm({...agentForm, email: e.target.value})}
                placeholder="Enter agent email"
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={agentForm.role} onValueChange={(value: Agent['role']) => setAgentForm({...agentForm, role: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Junior Agent">Junior Agent</SelectItem>
                  <SelectItem value="Agent">Agent</SelectItem>
                  <SelectItem value="Senior Agent">Senior Agent</SelectItem>
                  <SelectItem value="Bot Agent">Bot Agent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={agentForm.status} onValueChange={(value: Agent['status']) => setAgentForm({...agentForm, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="away">Away</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                value={agentForm.skills}
                onChange={(e) => setAgentForm({...agentForm, skills: e.target.value})}
                placeholder="Enter skills separated by commas"
              />
            </div>
            <div className="col-span-2 flex items-center space-x-2">
              <Switch
                id="enabled"
                checked={agentForm.enabled}
                onCheckedChange={(checked) => setAgentForm({...agentForm, enabled: checked})}
              />
              <Label htmlFor="enabled">Enable Agent</Label>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => {
              setIsCreateModalOpen(false);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button onClick={handleCreateAgent} className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white">
              Create Agent
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Agent Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={(open) => {
        setIsEditModalOpen(open);
        if (!open) {
          setEditingAgent(null);
          resetForm();
        }
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Agent</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-name">Name *</Label>
              <Input
                id="edit-name"
                value={agentForm.name}
                onChange={(e) => setAgentForm({...agentForm, name: e.target.value})}
                placeholder="Enter agent name"
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email *</Label>
              <Input
                id="edit-email"
                type="email"
                value={agentForm.email}
                onChange={(e) => setAgentForm({...agentForm, email: e.target.value})}
                placeholder="Enter agent email"
              />
            </div>
            <div>
              <Label htmlFor="edit-role">Role</Label>
              <Select value={agentForm.role} onValueChange={(value: Agent['role']) => setAgentForm({...agentForm, role: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Junior Agent">Junior Agent</SelectItem>
                  <SelectItem value="Agent">Agent</SelectItem>
                  <SelectItem value="Senior Agent">Senior Agent</SelectItem>
                  <SelectItem value="Bot Agent">Bot Agent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-status">Status</Label>
              <Select value={agentForm.status} onValueChange={(value: Agent['status']) => setAgentForm({...agentForm, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="away">Away</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label htmlFor="edit-skills">Skills</Label>
              <Input
                id="edit-skills"
                value={agentForm.skills}
                onChange={(e) => setAgentForm({...agentForm, skills: e.target.value})}
                placeholder="Enter skills separated by commas"
              />
            </div>
            <div className="col-span-2 flex items-center space-x-2">
              <Switch
                id="edit-enabled"
                checked={agentForm.enabled}
                onCheckedChange={(checked) => setAgentForm({...agentForm, enabled: checked})}
              />
              <Label htmlFor="edit-enabled">Enable Agent</Label>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => {
              setIsEditModalOpen(false);
              setEditingAgent(null);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button onClick={handleUpdateAgent} className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white">
              Update Agent
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Agent Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Agent Profile</DialogTitle>
          </DialogHeader>
          {viewingAgent && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                    {viewingAgent.role === 'Bot Agent' ? (
                      <Bot className="w-8 h-8 text-white" />
                    ) : (
                      <span className="text-white text-lg font-medium">
                        {viewingAgent.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(viewingAgent.status)}`} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{viewingAgent.name}</h3>
                  <p className="text-gray-600">{viewingAgent.email}</p>
                  <div className="flex gap-2 mt-2">
                    {getStatusBadge(viewingAgent.status)}
                    {getRoleBadge(viewingAgent.role)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Performance</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Active Chats</span>
                        <span className="font-medium">{viewingAgent.activeChats}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Chats</span>
                        <span className="font-medium">{viewingAgent.totalChats.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rating</span>
                        <span className="font-medium">{viewingAgent.rating}/5.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Active</span>
                        <span className="font-medium">{viewingAgent.lastActive}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {viewingAgent.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
              Close
            </Button>
            <Button onClick={() => {
              setIsViewModalOpen(false);
              if (viewingAgent) handleEditAgent(viewingAgent);
            }} className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white">
              Edit Agent
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatAgents;
