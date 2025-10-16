import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Search,
  Users,
  UserPlus,
  Star,
  Plus,
  Edit,
  Trash2,
  Copy,
  Eye,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  DollarSign
} from "lucide-react";

interface AgencyClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'active' | 'inactive' | 'pending';
  tier: 'gold' | 'silver' | 'bronze';
  clients: number;
  revenue: number;
  commission: number;
  joinedDate: string;
  notes?: string;
}

const AgencyReseller = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<AgencyClient | null>(null);
  const [clientForm, setClientForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "active" as AgencyClient['status'],
    tier: "bronze" as AgencyClient['tier'],
    clients: "",
    revenue: "",
    commission: "",
    notes: ""
  });

  const [clients, setClients] = useState<AgencyClient[]>(() => {
    const saved = localStorage.getItem('agencyClients');
    return saved ? JSON.parse(saved) : [
      {
        id: "1",
        name: "John Smith",
        email: "john@digitalmarketingpro.com",
        phone: "+1 234 567 8900",
        company: "Digital Marketing Pro",
        status: "active",
        tier: "gold",
        clients: 25,
        revenue: 15000,
        commission: 15,
        joinedDate: "2025-01-01",
        notes: "Top performing agency partner"
      },
      {
        id: "2",
        name: "Sarah Johnson",
        email: "sarah@socialmediasolutions.com",
        phone: "+1 234 567 8901",
        company: "Social Media Solutions",
        status: "active",
        tier: "silver",
        clients: 18,
        revenue: 12000,
        commission: 12,
        joinedDate: "2025-01-05",
        notes: "Strong social media focus"
      },
      {
        id: "3",
        name: "Mike Chen",
        email: "mike@techinnovators.com",
        phone: "+1 234 567 8902",
        company: "Tech Innovators",
        status: "pending",
        tier: "bronze",
        clients: 0,
        revenue: 0,
        commission: 10,
        joinedDate: "2025-01-10",
        notes: "New partner, awaiting approval"
      }
    ];
  });

  // Persist data to localStorage
  useEffect(() => {
    localStorage.setItem('agencyClients', JSON.stringify(clients));
  }, [clients]);

  // Filter clients based on search term
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate statistics
  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === 'active').length;
  const totalRevenue = clients.reduce((sum, c) => sum + c.revenue, 0);
  const totalClientCount = clients.reduce((sum, c) => sum + c.clients, 0);

  // CRUD Operations
  const handleCreateClient = () => {
    if (!clientForm.name || !clientForm.email || !clientForm.company) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newClient: AgencyClient = {
      id: Date.now().toString(),
      name: clientForm.name,
      email: clientForm.email,
      phone: clientForm.phone,
      company: clientForm.company,
      status: clientForm.status,
      tier: clientForm.tier,
      clients: parseInt(clientForm.clients) || 0,
      revenue: parseFloat(clientForm.revenue) || 0,
      commission: parseFloat(clientForm.commission) || 0,
      joinedDate: new Date().toISOString().split('T')[0],
      notes: clientForm.notes
    };

    setClients([...clients, newClient]);
    setClientForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      status: "active",
      tier: "bronze",
      clients: "",
      revenue: "",
      commission: "",
      notes: ""
    });
    setIsCreateModalOpen(false);
    toast.success("Client created successfully");
  };

  const handleEditClient = (client: AgencyClient) => {
    setEditingClient(client);
    setClientForm({
      name: client.name,
      email: client.email,
      phone: client.phone,
      company: client.company,
      status: client.status,
      tier: client.tier,
      clients: client.clients.toString(),
      revenue: client.revenue.toString(),
      commission: client.commission.toString(),
      notes: client.notes || ""
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateClient = () => {
    if (!editingClient || !clientForm.name || !clientForm.email || !clientForm.company) {
      toast.error("Please fill in all required fields");
      return;
    }

    const updatedClient: AgencyClient = {
      ...editingClient,
      name: clientForm.name,
      email: clientForm.email,
      phone: clientForm.phone,
      company: clientForm.company,
      status: clientForm.status,
      tier: clientForm.tier,
      clients: parseInt(clientForm.clients) || 0,
      revenue: parseFloat(clientForm.revenue) || 0,
      commission: parseFloat(clientForm.commission) || 0,
      notes: clientForm.notes
    };

    setClients(clients.map(c => c.id === editingClient.id ? updatedClient : c));
    setIsEditModalOpen(false);
    setEditingClient(null);
    toast.success("Client updated successfully");
  };

  const handleDeleteClient = (id: string) => {
    setClients(clients.filter(c => c.id !== id));
    toast.success("Client deleted successfully");
  };

  const handleDuplicateClient = (client: AgencyClient) => {
    const duplicatedClient: AgencyClient = {
      ...client,
      id: Date.now().toString(),
      name: `${client.name} (Copy)`,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setClients([...clients, duplicatedClient]);
    toast.success("Client duplicated successfully");
  };

  const handleUpgradeClient = (client: AgencyClient) => {
    const tierOrder = { bronze: 0, silver: 1, gold: 2 };
    const currentTierIndex = tierOrder[client.tier];
    
    if (currentTierIndex >= 2) {
      toast.info(`${client.name} is already at the highest tier (Gold)`);
      return;
    }

    const newTier = currentTierIndex === 0 ? 'silver' : 'gold';
    const updatedClient = {
      ...client,
      tier: newTier as AgencyClient['tier'],
      commission: newTier === 'silver' ? Math.min(client.commission + 2, 15) : Math.min(client.commission + 3, 20)
    };

    setClients(clients.map(c => c.id === client.id ? updatedClient : c));
    toast.success(`${client.name} upgraded to ${newTier.charAt(0).toUpperCase() + newTier.slice(1)} tier!`);
  };

  const handleMainUpgrade = () => {
    setIsUpgradeModalOpen(true);
  };

  const getStatusBadge = (status: AgencyClient['status']) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "inactive":
        return <Badge className="bg-red-100 text-red-800">Inactive</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getTierBadge = (tier: AgencyClient['tier']) => {
    switch (tier) {
      case "gold":
        return <Badge className="bg-yellow-100 text-yellow-800">Gold</Badge>;
      case "silver":
        return <Badge className="bg-gray-100 text-gray-800">Silver</Badge>;
      case "bronze":
        return <Badge className="bg-orange-100 text-orange-800">Bronze</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Agency Reseller</h1>
        <div className="flex gap-2">
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Client
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Agency Client</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={clientForm.name}
                    onChange={(e) => setClientForm({...clientForm, name: e.target.value})}
                    placeholder="e.g., John Smith"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={clientForm.email}
                    onChange={(e) => setClientForm({...clientForm, email: e.target.value})}
                    placeholder="e.g., john@company.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={clientForm.phone}
                    onChange={(e) => setClientForm({...clientForm, phone: e.target.value})}
                    placeholder="e.g., +1 234 567 8900"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    value={clientForm.company}
                    onChange={(e) => setClientForm({...clientForm, company: e.target.value})}
                    placeholder="e.g., Digital Marketing Pro"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={clientForm.status} onValueChange={(value) => setClientForm({...clientForm, status: value as AgencyClient['status']})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tier">Tier</Label>
                  <Select value={clientForm.tier} onValueChange={(value) => setClientForm({...clientForm, tier: value as AgencyClient['tier']})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="silver">Silver</SelectItem>
                      <SelectItem value="bronze">Bronze</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="clients">Client Count</Label>
                  <Input
                    id="clients"
                    type="number"
                    value={clientForm.clients}
                    onChange={(e) => setClientForm({...clientForm, clients: e.target.value})}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="revenue">Revenue</Label>
                  <Input
                    id="revenue"
                    type="number"
                    value={clientForm.revenue}
                    onChange={(e) => setClientForm({...clientForm, revenue: e.target.value})}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="commission">Commission %</Label>
                  <Input
                    id="commission"
                    type="number"
                    value={clientForm.commission}
                    onChange={(e) => setClientForm({...clientForm, commission: e.target.value})}
                    placeholder="0"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={clientForm.notes}
                    onChange={(e) => setClientForm({...clientForm, notes: e.target.value})}
                    placeholder="Additional notes..."
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateClient} className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white">
                  Create Client
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button 
            onClick={handleMainUpgrade}
            className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white"
          >
            Upgrade
          </Button>
        </div>
      </div>

      {/* Search Section */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search"
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Agency Clients</p>
                <p className="text-2xl font-bold text-gray-900">{totalClients}</p>
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
                <p className="text-sm text-gray-600">Client Created</p>
                <p className="text-2xl font-bold text-gray-900">{activeClients}</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Remaining Client</p>
                <p className="text-2xl font-bold text-gray-900">{totalClientCount}</p>
              </div>
              <div className="relative">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <UserPlus className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Star className="w-2 h-2 text-white" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clients List or Empty State */}
      {filteredClients.length > 0 ? (
        <div className="space-y-4">
          {filteredClients.map((client) => (
            <Card key={client.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                      <UserPlus className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{client.name}</h3>
                      <p className="text-sm text-gray-600">{client.company}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{client.email}</span>
                        <Phone className="w-3 h-3 text-gray-400 ml-2" />
                        <span className="text-xs text-gray-500">{client.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusBadge(client.status)}
                        {getTierBadge(client.tier)}
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Clients</p>
                          <p className="font-semibold">{client.clients}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Revenue</p>
                          <p className="font-semibold">${client.revenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Commission</p>
                          <p className="font-semibold">{client.commission}%</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{client.joinedDate}</span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleEditClient(client)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpgradeClient(client)}>
                            <DollarSign className="w-4 h-4 mr-2" />
                            Upgrade Tier
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicateClient(client)}>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteClient(client.id)} className="text-red-600">
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
        <Card className="bg-white">
          <CardContent className="p-12">
            <div className="flex flex-col items-center justify-center">
              {/* Illustration */}
              <div className="relative mb-8">
                {/* Plant */}
                <div className="absolute left-0 top-8">
                  <div className="w-8 h-8 bg-gray-800 rounded-b-lg"></div>
                  <div className="w-12 h-8 bg-green-600 rounded-full"></div>
                </div>
                
                {/* Handshake */}
                <div className="flex items-center justify-center">
                  {/* Woman */}
                  <div className="relative">
                    <div className="w-16 h-20 relative">
                      {/* Head */}
                      <div className="w-8 h-8 bg-gray-300 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2"></div>
                      {/* Hair */}
                      <div className="w-10 h-6 bg-gray-800 rounded-full absolute -top-1 left-1/2 transform -translate-x-1/2"></div>
                      {/* Body */}
                      <div className="w-8 h-12 bg-green-500 rounded absolute top-6 left-1/2 transform -translate-x-1/2"></div>
                      {/* Skirt */}
                      <div className="w-10 h-8 bg-gray-800 absolute top-16 left-1/2 transform -translate-x-1/2 rounded-b-lg"></div>
                      {/* Hand */}
                      <div className="w-3 h-3 bg-gray-300 rounded-full absolute top-8 -right-1"></div>
                    </div>
                  </div>
                  
                  {/* Man */}
                  <div className="relative">
                    <div className="w-16 h-20 relative">
                      {/* Head */}
                      <div className="w-8 h-8 bg-gray-400 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2"></div>
                      {/* Hair */}
                      <div className="w-10 h-6 bg-gray-800 rounded-full absolute -top-1 left-1/2 transform -translate-x-1/2"></div>
                      {/* Body */}
                      <div className="w-8 h-12 bg-gray-800 rounded absolute top-6 left-1/2 transform -translate-x-1/2"></div>
                      {/* Shirt */}
                      <div className="w-6 h-6 bg-white absolute top-6 left-1/2 transform -translate-x-1/2"></div>
                      {/* Tie */}
                      <div className="w-1 h-4 bg-gray-800 absolute top-8 left-1/2 transform -translate-x-1/2"></div>
                      {/* Hand */}
                      <div className="w-3 h-3 bg-gray-400 rounded-full absolute top-8 -left-1"></div>
                      {/* Briefcase */}
                      <div className="w-4 h-3 bg-green-500 absolute top-12 -left-2"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Clients Available
              </h3>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Client Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Agency Client</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-name">Name *</Label>
              <Input
                id="edit-name"
                value={clientForm.name}
                onChange={(e) => setClientForm({...clientForm, name: e.target.value})}
                placeholder="e.g., John Smith"
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email *</Label>
              <Input
                id="edit-email"
                type="email"
                value={clientForm.email}
                onChange={(e) => setClientForm({...clientForm, email: e.target.value})}
                placeholder="e.g., john@company.com"
              />
            </div>
            <div>
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                value={clientForm.phone}
                onChange={(e) => setClientForm({...clientForm, phone: e.target.value})}
                placeholder="e.g., +1 234 567 8900"
              />
            </div>
            <div>
              <Label htmlFor="edit-company">Company *</Label>
              <Input
                id="edit-company"
                value={clientForm.company}
                onChange={(e) => setClientForm({...clientForm, company: e.target.value})}
                placeholder="e.g., Digital Marketing Pro"
              />
            </div>
            <div>
              <Label htmlFor="edit-status">Status</Label>
              <Select value={clientForm.status} onValueChange={(value) => setClientForm({...clientForm, status: value as AgencyClient['status']})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-tier">Tier</Label>
              <Select value={clientForm.tier} onValueChange={(value) => setClientForm({...clientForm, tier: value as AgencyClient['tier']})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="silver">Silver</SelectItem>
                  <SelectItem value="bronze">Bronze</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-clients">Client Count</Label>
              <Input
                id="edit-clients"
                type="number"
                value={clientForm.clients}
                onChange={(e) => setClientForm({...clientForm, clients: e.target.value})}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="edit-revenue">Revenue</Label>
              <Input
                id="edit-revenue"
                type="number"
                value={clientForm.revenue}
                onChange={(e) => setClientForm({...clientForm, revenue: e.target.value})}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="edit-commission">Commission %</Label>
              <Input
                id="edit-commission"
                type="number"
                value={clientForm.commission}
                onChange={(e) => setClientForm({...clientForm, commission: e.target.value})}
                placeholder="0"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea
                id="edit-notes"
                value={clientForm.notes}
                onChange={(e) => setClientForm({...clientForm, notes: e.target.value})}
                placeholder="Additional notes..."
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateClient} className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white">
              Update Client
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upgrade Modal */}
      <Dialog open={isUpgradeModalOpen} onOpenChange={setIsUpgradeModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Upgrade Agency Reseller Plan</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Features</h3>
              <p className="text-gray-600">Unlock advanced agency management capabilities</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Unlimited agency clients</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Advanced analytics & reporting</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Priority support</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Custom commission structures</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">API access</span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">$99/month</div>
                <div className="text-sm text-gray-600">per agency reseller account</div>
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

export default AgencyReseller;
