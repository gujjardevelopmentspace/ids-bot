import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { 
  Star,
  FolderX,
  User,
  ArrowUp,
  Plus,
  Search,
  Edit,
  Trash2,
  Copy,
  MoreVertical,
  Bot,
  Mail,
  Phone,
  Calendar,
  Users,
  Activity,
  Settings,
  Eye
} from "lucide-react";

interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  status: 'active' | 'inactive' | 'busy' | 'offline';
  role: 'admin' | 'agent' | 'supervisor';
  skills: string[];
  languages: string[];
  maxConcurrentChats: number;
  currentChats: number;
  totalChats: number;
  responseTime: number;
  satisfaction: number;
  joinedDate: string;
  lastActive: string;
  notes?: string;
  enabled: boolean;
}

const AgentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [agentForm, setAgentForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    status: "active" as Agent['status'],
    role: "agent" as Agent['role'],
    skills: "",
    languages: "",
    maxConcurrentChats: "",
    notes: ""
  });

  const [agents, setAgents] = useState<Agent[]>(() => {
    const saved = localStorage.getItem('agents');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist data to localStorage
  useEffect(() => {
    localStorage.setItem('agents', JSON.stringify(agents));
  }, [agents]);

  // Filter agents based on search term
  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate statistics
  const totalAgents = agents.length;
  const activeAgents = agents.filter(a => a.status === 'active').length;
  const totalChats = agents.reduce((sum, a) => sum + a.totalChats, 0);
  const avgResponseTime = agents.length > 0 ? agents.reduce((sum, a) => sum + a.responseTime, 0) / agents.length : 0;

  // CRUD Operations
  const handleCreateAgent = () => {
    if (!agentForm.name || !agentForm.email || !agentForm.department) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newAgent: Agent = {
      id: Date.now().toString(),
      name: agentForm.name,
      email: agentForm.email,
      phone: agentForm.phone,
      department: agentForm.department,
      status: agentForm.status,
      role: agentForm.role,
      skills: agentForm.skills.split(',').map(s => s.trim()).filter(s => s),
      languages: agentForm.languages.split(',').map(s => s.trim()).filter(s => s),
      maxConcurrentChats: parseInt(agentForm.maxConcurrentChats) || 5,
      currentChats: 0,
      totalChats: 0,
      responseTime: 0,
      satisfaction: 0,
      joinedDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString(),
      notes: agentForm.notes,
      enabled: true
    };

    console.log("Adding new agent:", newAgent);
    setAgents([...agents, newAgent]);
    
    // Reset form
    setAgentForm({
      name: "",
      email: "",
      phone: "",
      department: "",
      status: "active",
      role: "agent",
      skills: "",
      languages: "",
      maxConcurrentChats: "",
      notes: ""
    });
    
    setIsCreateModalOpen(false);
    toast.success("Agent created successfully");
  };

  const handleEditAgent = (agent: Agent) => {
    setEditingAgent(agent);
    setAgentForm({
      name: agent.name,
      email: agent.email,
      phone: agent.phone,
      department: agent.department,
      status: agent.status,
      role: agent.role,
      skills: agent.skills.join(', '),
      languages: agent.languages.join(', '),
      maxConcurrentChats: agent.maxConcurrentChats.toString(),
      notes: agent.notes || ""
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateAgent = () => {
    if (!editingAgent || !agentForm.name || !agentForm.email || !agentForm.department) {
      toast.error("Please fill in all required fields");
      return;
    }

    const updatedAgent: Agent = {
      ...editingAgent,
      name: agentForm.name,
      email: agentForm.email,
      phone: agentForm.phone,
      department: agentForm.department,
      status: agentForm.status,
      role: agentForm.role,
      skills: agentForm.skills.split(',').map(s => s.trim()).filter(s => s),
      languages: agentForm.languages.split(',').map(s => s.trim()).filter(s => s),
      maxConcurrentChats: parseInt(agentForm.maxConcurrentChats) || 5,
      notes: agentForm.notes
    };

    setAgents(agents.map(a => a.id === editingAgent.id ? updatedAgent : a));
    setIsEditModalOpen(false);
    setEditingAgent(null);
    toast.success("Agent updated successfully");
  };

  const handleDeleteAgent = (id: string) => {
    setAgents(agents.filter(a => a.id !== id));
    toast.success("Agent deleted successfully");
  };

  const handleDuplicateAgent = (agent: Agent) => {
    const duplicatedAgent: Agent = {
      ...agent,
      id: Date.now().toString(),
      name: `${agent.name} (Copy)`,
      currentChats: 0,
      totalChats: 0,
      joinedDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString()
    };
    setAgents([...agents, duplicatedAgent]);
    toast.success("Agent duplicated successfully");
  };

  const handleToggleAgent = (id: string) => {
    setAgents(agents.map(a => 
      a.id === id ? { ...a, enabled: !a.enabled, status: !a.enabled ? 'active' : 'offline' } : a
    ));
    toast.success("Agent status updated");
  };

  const getStatusBadge = (status: Agent['status']) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "busy":
        return <Badge className="bg-yellow-100 text-yellow-800">Busy</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      case "offline":
        return <Badge className="bg-red-100 text-red-800">Offline</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getRoleBadge = (role: Agent['role']) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-100 text-purple-800">Admin</Badge>;
      case "supervisor":
        return <Badge className="bg-blue-100 text-blue-800">Supervisor</Badge>;
      case "agent":
        return <Badge className="bg-green-100 text-green-800">Agent</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleUpgrade = () => {
    setIsUpgradeModalOpen(true);
  };

  const resetForm = () => {
    setAgentForm({
      name: "",
      email: "",
      phone: "",
      department: "",
      status: "active",
      role: "agent",
      skills: "",
      languages: "",
      maxConcurrentChats: "",
      notes: ""
    });
  };

  const handleOpenCreateModal = () => {
    resetForm();
    setIsCreateModalOpen(true);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agent Management</h1>
          <p className="text-gray-600">Agent Management - Flaxxa Wapi</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleOpenCreateModal}
            className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Agent
          </Button>
          
          <Dialog open={isCreateModalOpen} onOpenChange={(open) => {
            setIsCreateModalOpen(open);
            if (!open) {
              resetForm();
            }
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
                    placeholder="e.g., Sarah Johnson"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={agentForm.email}
                    onChange={(e) => setAgentForm({...agentForm, email: e.target.value})}
                    placeholder="e.g., sarah@flaxxa.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={agentForm.phone}
                    onChange={(e) => setAgentForm({...agentForm, phone: e.target.value})}
                    placeholder="e.g., +1 234 567 8900"
                  />
                </div>
                <div>
                  <Label htmlFor="department">Department *</Label>
                  <Input
                    id="department"
                    value={agentForm.department}
                    onChange={(e) => setAgentForm({...agentForm, department: e.target.value})}
                    placeholder="e.g., Customer Support"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={agentForm.status} onValueChange={(value) => setAgentForm({...agentForm, status: value as Agent['status']})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="busy">Busy</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select value={agentForm.role} onValueChange={(value) => setAgentForm({...agentForm, role: value as Agent['role']})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agent">Agent</SelectItem>
                      <SelectItem value="supervisor">Supervisor</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="skills">Skills (comma separated)</Label>
                  <Input
                    id="skills"
                    value={agentForm.skills}
                    onChange={(e) => setAgentForm({...agentForm, skills: e.target.value})}
                    placeholder="e.g., WhatsApp, Customer Service"
                  />
                </div>
                <div>
                  <Label htmlFor="languages">Languages (comma separated)</Label>
                  <Input
                    id="languages"
                    value={agentForm.languages}
                    onChange={(e) => setAgentForm({...agentForm, languages: e.target.value})}
                    placeholder="e.g., English, Spanish"
                  />
                </div>
                <div>
                  <Label htmlFor="maxConcurrentChats">Max Concurrent Chats</Label>
                  <Input
                    id="maxConcurrentChats"
                    type="number"
                    value={agentForm.maxConcurrentChats}
                    onChange={(e) => setAgentForm({...agentForm, maxConcurrentChats: e.target.value})}
                    placeholder="5"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={agentForm.notes}
                    onChange={(e) => setAgentForm({...agentForm, notes: e.target.value})}
                    placeholder="Additional notes..."
                    rows={3}
                  />
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
          <Button 
            onClick={handleUpgrade}
            className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white"
          >
            upgrade
          </Button>
          
          {/* Test Button */}
          <Button 
            onClick={() => {
              console.log("Test button clicked");
              console.log("Current agents:", agents);
              console.log("Modal state:", isCreateModalOpen);
              
              // Test direct agent creation
              const testAgent: Agent = {
                id: Date.now().toString(),
                name: "Test Agent",
                email: "test@example.com",
                phone: "+1 234 567 8900",
                department: "Test Department",
                status: "active",
                role: "agent",
                skills: ["Test Skill"],
                languages: ["English"],
                maxConcurrentChats: 5,
                currentChats: 0,
                totalChats: 0,
                responseTime: 0,
                satisfaction: 0,
                joinedDate: new Date().toISOString().split('T')[0],
                lastActive: new Date().toISOString(),
                notes: "Test agent",
                enabled: true
              };
              
              console.log("Adding test agent:", testAgent);
              setAgents([...agents, testAgent]);
              toast.success("Test agent added!");
            }}
            variant="outline"
          >
            Test Add Agent
          </Button>
        </div>
      </div>

      {/* Search Section */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search agents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Button className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white">
          <Search className="w-4 h-4" />
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Agents</p>
                <p className="text-2xl font-bold text-gray-900">{totalAgents}</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Agents</p>
                <p className="text-2xl font-bold text-gray-900">{activeAgents}</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Chats</p>
                <p className="text-2xl font-bold text-gray-900">{totalChats}</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-bold text-gray-900">{avgResponseTime.toFixed(1)}m</p>
              </div>
              <div className="relative">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Star className="w-2 h-2 text-white" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agents List or Empty State */}
      {filteredAgents.length > 0 ? (
        <div className="space-y-4">
          {filteredAgents.map((agent) => (
            <Card key={agent.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                      <p className="text-sm text-gray-600">{agent.department}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{agent.email}</span>
                        <Phone className="w-3 h-3 text-gray-400 ml-2" />
                        <span className="text-xs text-gray-500">{agent.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusBadge(agent.status)}
                        {getRoleBadge(agent.role)}
                        <Switch
                          checked={agent.enabled}
                          onCheckedChange={() => handleToggleAgent(agent.id)}
                        />
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Current Chats</p>
                          <p className="font-semibold">{agent.currentChats}/{agent.maxConcurrentChats}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Total Chats</p>
                          <p className="font-semibold">{agent.totalChats}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Response Time</p>
                          <p className="font-semibold">{agent.responseTime}m</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Satisfaction</p>
                          <p className="font-semibold">{agent.satisfaction}/5</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{agent.joinedDate}</span>
                        </div>
                        <div className="text-xs">Last active: {agent.lastActive}</div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleEditAgent(agent)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicateAgent(agent)}>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteAgent(agent.id)} className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-gray-50">
          <CardContent className="p-12">
            <div className="flex flex-col items-center justify-center">
              {/* Illustration */}
              <div className="relative mb-8">
                {/* Main folder with X */}
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center relative z-10">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                    <FolderX className="w-8 h-8 text-gray-400" />
                  </div>
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
                    <div className="w-8 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded absolute top-6 left-1/2 transform -translate-x-1/2"></div>
                    {/* Skirt */}
                    <div className="w-10 h-8 bg-black absolute top-16 left-1/2 transform -translate-x-1/2 rounded-b-lg"></div>
                    <div className="w-2 h-2 bg-white absolute top-18 left-1/2 transform -translate-x-1/2 rounded"></div>
                    {/* Hand */}
                    <div className="w-3 h-3 bg-gray-300 rounded-full absolute top-8 -left-1"></div>
                    {/* Thought lines */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full absolute top-1 left-1"></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full absolute top-2 left-2"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                There Are No Agent...
              </h3>
            </div>

            {/* Floating Star Icon */}
            <div className="absolute bottom-6 right-6">
              <Button size="sm" className="w-10 h-10 bg-gray-800 hover:bg-gray-900 text-yellow-400 p-0">
                <Star className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Agent Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
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
                placeholder="e.g., Sarah Johnson"
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email *</Label>
              <Input
                id="edit-email"
                type="email"
                value={agentForm.email}
                onChange={(e) => setAgentForm({...agentForm, email: e.target.value})}
                placeholder="e.g., sarah@flaxxa.com"
              />
            </div>
            <div>
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                value={agentForm.phone}
                onChange={(e) => setAgentForm({...agentForm, phone: e.target.value})}
                placeholder="e.g., +1 234 567 8900"
              />
            </div>
            <div>
              <Label htmlFor="edit-department">Department *</Label>
              <Input
                id="edit-department"
                value={agentForm.department}
                onChange={(e) => setAgentForm({...agentForm, department: e.target.value})}
                placeholder="e.g., Customer Support"
              />
            </div>
            <div>
              <Label htmlFor="edit-status">Status</Label>
              <Select value={agentForm.status} onValueChange={(value) => setAgentForm({...agentForm, status: value as Agent['status']})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-role">Role</Label>
              <Select value={agentForm.role} onValueChange={(value) => setAgentForm({...agentForm, role: value as Agent['role']})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="agent">Agent</SelectItem>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-skills">Skills (comma separated)</Label>
              <Input
                id="edit-skills"
                value={agentForm.skills}
                onChange={(e) => setAgentForm({...agentForm, skills: e.target.value})}
                placeholder="e.g., WhatsApp, Customer Service"
              />
            </div>
            <div>
              <Label htmlFor="edit-languages">Languages (comma separated)</Label>
              <Input
                id="edit-languages"
                value={agentForm.languages}
                onChange={(e) => setAgentForm({...agentForm, languages: e.target.value})}
                placeholder="e.g., English, Spanish"
              />
            </div>
            <div>
              <Label htmlFor="edit-maxConcurrentChats">Max Concurrent Chats</Label>
              <Input
                id="edit-maxConcurrentChats"
                type="number"
                value={agentForm.maxConcurrentChats}
                onChange={(e) => setAgentForm({...agentForm, maxConcurrentChats: e.target.value})}
                placeholder="5"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea
                id="edit-notes"
                value={agentForm.notes}
                onChange={(e) => setAgentForm({...agentForm, notes: e.target.value})}
                placeholder="Additional notes..."
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateAgent} className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white">
              Update Agent
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upgrade Modal */}
      <Dialog open={isUpgradeModalOpen} onOpenChange={setIsUpgradeModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Upgrade Agent Management Plan</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Features</h3>
              <p className="text-gray-600">Unlock advanced agent management capabilities</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Unlimited agents</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Advanced analytics & reporting</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Real-time monitoring</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Custom workflows</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">API access</span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">$149/month</div>
                <div className="text-sm text-gray-600">per agent management account</div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsUpgradeModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  setIsUpgradeModalOpen(false);
                  toast.success("Upgrade request submitted! Our team will contact you soon.");
                }}
                className="flex-1 bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white"
              >
                Upgrade Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AgentManagement;
