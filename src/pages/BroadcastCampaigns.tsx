import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { 
  Megaphone, 
  Filter,
  X,
  RefreshCw,
  Mailbox,
  ArrowUp,
  Plus,
  Edit,
  Trash2,
  Copy,
  Eye,
  Play,
  Pause,
  CheckCircle,
  Clock,
  Users,
  Calendar,
  MoreVertical
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Campaign {
  id: string;
  name: string;
  template: string;
  contacts: number;
  deliveredTo: number;
  readBy: number;
  status: 'draft' | 'scheduled' | 'active' | 'completed' | 'paused';
  createdAt: string;
  scheduledFor?: string;
  message: string;
  templateId: string;
}

interface TemplateStatus {
  id: string;
  status: string;
  messageId: string;
  delivered: boolean;
  read: boolean;
}

const BroadcastCampaigns = () => {
  const [showInfoBox, setShowInfoBox] = useState(true);
  const [campaignName, setCampaignName] = useState("");
  const [templateStatus, setTemplateStatus] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  
  // Campaign form state
  const [campaignForm, setCampaignForm] = useState({
    name: "",
    template: "",
    message: "",
    scheduledFor: "",
    contacts: 0
  });

  // Load campaigns from localStorage
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const saved = localStorage.getItem('broadcastCampaigns');
    return saved ? JSON.parse(saved) : [
      {
        id: "1",
        name: "Welcome Campaign",
        template: "Welcome Template",
        contacts: 150,
        deliveredTo: 145,
        readBy: 98,
        status: "completed",
      createdAt: "2025-01-14",
        scheduledFor: "2025-01-14 10:00",
        message: "Welcome to our service!",
        templateId: "welcome_001"
      },
      {
        id: "2",
        name: "Product Launch",
        template: "Product Template",
        contacts: 200,
        deliveredTo: 0,
        readBy: 0,
      status: "scheduled",
        createdAt: "2025-01-15",
        scheduledFor: "2025-01-16 09:00",
        message: "Check out our new product!",
        templateId: "product_001"
      }
    ];
  });

  const [templateStatuses, setTemplateStatuses] = useState<TemplateStatus[]>([]);

  // Save campaigns to localStorage whenever campaigns change
  useEffect(() => {
    localStorage.setItem('broadcastCampaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  const clearFilters = () => {
    setCampaignName("");
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(campaignName.toLowerCase())
  );

  const handleCreateCampaign = () => {
    if (!campaignForm.name || !campaignForm.template || !campaignForm.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newCampaign: Campaign = {
      id: Date.now().toString(),
      name: campaignForm.name,
      template: campaignForm.template,
      contacts: campaignForm.contacts,
      deliveredTo: 0,
      readBy: 0,
      status: campaignForm.scheduledFor ? "scheduled" : "draft",
      createdAt: new Date().toISOString().split('T')[0],
      scheduledFor: campaignForm.scheduledFor,
      message: campaignForm.message,
      templateId: `template_${Date.now()}`
    };

    setCampaigns(prev => [newCampaign, ...prev]);
    setCampaignForm({ name: "", template: "", message: "", scheduledFor: "", contacts: 0 });
    setIsCreateModalOpen(false);
    toast.success("Campaign created successfully!");
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setCampaignForm({
      name: campaign.name,
      template: campaign.template,
      message: campaign.message,
      scheduledFor: campaign.scheduledFor || "",
      contacts: campaign.contacts
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateCampaign = () => {
    if (!editingCampaign) return;

    setCampaigns(prev => prev.map(campaign => 
      campaign.id === editingCampaign.id 
        ? { 
            ...campaign, 
            ...campaignForm,
            status: campaignForm.scheduledFor ? "scheduled" : "draft"
          }
        : campaign
    ));
    
    setIsEditModalOpen(false);
    setEditingCampaign(null);
    setCampaignForm({ name: "", template: "", message: "", scheduledFor: "", contacts: 0 });
    toast.success("Campaign updated successfully!");
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
    toast.success("Campaign deleted successfully!");
  };

  const handleDuplicateCampaign = (campaign: Campaign) => {
    const duplicatedCampaign: Campaign = {
      ...campaign,
      id: Date.now().toString(),
      name: `${campaign.name} (Copy)`,
      status: "draft",
      deliveredTo: 0,
      readBy: 0,
      createdAt: new Date().toISOString().split('T')[0],
      scheduledFor: ""
    };
    setCampaigns(prev => [duplicatedCampaign, ...prev]);
    toast.success("Campaign duplicated successfully!");
  };

  const handleStatusChange = (id: string, newStatus: Campaign['status']) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === id ? { ...campaign, status: newStatus } : campaign
    ));
    toast.success(`Campaign status updated to ${newStatus}`);
  };

  const handleRefreshTemplateStatus = () => {
    if (!templateStatus || !templateId) {
      toast.error("Please enter both status and ID");
      return;
    }

    const newStatus: TemplateStatus = {
      id: templateId,
      status: templateStatus,
      messageId: `msg_${Date.now()}`,
      delivered: Math.random() > 0.5,
      read: Math.random() > 0.7
    };

    setTemplateStatuses(prev => [newStatus, ...prev]);
    toast.success("Template status refreshed!");
  };

  const getStatusIcon = (status: Campaign['status']) => {
    switch (status) {
      case "active":
        return <Play className="w-4 h-4 text-green-500" />;
      case "scheduled":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-gray-500" />;
      case "draft":
        return <Edit className="w-4 h-4 text-yellow-500" />;
      case "paused":
        return <Pause className="w-4 h-4 text-orange-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: Campaign['status']) => {
    const statusConfig = {
      active: { className: "bg-green-100 text-green-800", text: "Active" },
      scheduled: { className: "bg-blue-100 text-blue-800", text: "Scheduled" },
      completed: { className: "bg-gray-100 text-gray-800", text: "Completed" },
      draft: { className: "bg-yellow-100 text-yellow-800", text: "Draft" },
      paused: { className: "bg-orange-100 text-orange-800", text: "Paused" }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.text}</Badge>;
  };

  return (
    <div className="page-container">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Broadcast Campaigns - idea bot</h1>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg">
                <Megaphone className="w-4 h-4 mr-2" />
                Send new campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Campaign</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="campaignName">Campaign Name *</Label>
                  <Input
                    id="campaignName"
                    value={campaignForm.name}
                    onChange={(e) => setCampaignForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter campaign name"
                  />
                </div>
                <div>
                  <Label htmlFor="template">Template *</Label>
                  <Select value={campaignForm.template} onValueChange={(value) => setCampaignForm(prev => ({ ...prev, template: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="welcome">Welcome Template</SelectItem>
                      <SelectItem value="product">Product Template</SelectItem>
                      <SelectItem value="promotion">Promotion Template</SelectItem>
                      <SelectItem value="support">Support Template</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={campaignForm.message}
                    onChange={(e) => setCampaignForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Enter your message"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="contacts">Number of Contacts</Label>
                  <Input
                    id="contacts"
                    type="number"
                    value={campaignForm.contacts}
                    onChange={(e) => setCampaignForm(prev => ({ ...prev, contacts: parseInt(e.target.value) || 0 }))}
                    placeholder="Enter number of contacts"
                  />
                </div>
                <div>
                  <Label htmlFor="scheduledFor">Schedule For (Optional)</Label>
                  <Input
                    id="scheduledFor"
                    type="datetime-local"
                    value={campaignForm.scheduledFor}
                    onChange={(e) => setCampaignForm(prev => ({ ...prev, scheduledFor: e.target.value }))}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateCampaign} className="bg-[#16a34a] hover:bg-[#15803d]">
          Create Campaign
        </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Information Alert Box */}
      {showInfoBox && (
        <Card className="bg-green-50 border-green-200 border-l-4">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-3 text-sm text-gray-700">
                <p>
                  Send out a Whatsapp message broadcast from your business to a list of contacts or groups. This feature allows you to reach several users individually, and simultaneously.
                </p>
                <p className="text-red-600 font-semibold">
                  Note: Before sending and publishing a broadcast campaign you need to add a <strong>valid payment method</strong> to your <strong>WhatsApp Business account</strong> in <strong>Billing & payments</strong>. Your first 1,000 service conversations each month are free.
                </p>
                <p>
                  <a href="#" className="text-blue-600 hover:underline">
                    Learn how to add a card to your WhatsApp business account.
                  </a>
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowInfoBox(false)}
                className="h-6 w-6 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Send Template Message Status Section */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold text-gray-900">Send Template Message Status:</h3>
              <div className="flex items-center gap-2">
                <Input 
                  placeholder="Enter status" 
                  value={templateStatus}
                  onChange={(e) => setTemplateStatus(e.target.value)}
                  className="w-40"
                />
                <Input 
                  placeholder="Enter ID" 
                  value={templateId}
                  onChange={(e) => setTemplateId(e.target.value)}
                  className="w-40"
                />
              </div>
              <Button 
                variant="outline" 
                className="text-blue-600 border-blue-300"
                onClick={handleRefreshTemplateStatus}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Status
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white">
                View Details
              </Button>
              <Badge className="bg-orange-500 text-white">
                LIMITED
              </Badge>
            </div>
          </div>
          
          {/* Template Status Results */}
          {templateStatuses.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="font-medium">Recent Status Updates:</h4>
              {templateStatuses.slice(0, 3).map((status, index) => (
                <div key={index} className="flex items-center gap-4 p-2 bg-gray-50 rounded">
                  <span className="text-sm">ID: {status.id}</span>
                  <span className="text-sm">Status: {status.status}</span>
                  <span className="text-sm">Message ID: {status.messageId}</span>
                  <Badge className={status.delivered ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {status.delivered ? "Delivered" : "Not Delivered"}
                  </Badge>
                  <Badge className={status.read ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}>
                    {status.read ? "Read" : "Not Read"}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Campaigns Filter Section */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label htmlFor="campaignName" className="text-sm font-medium text-gray-700">
                Campaigns Name *
              </Label>
              <Input
                id="campaignName"
                placeholder="Enter Campaigns name"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex items-end gap-2">
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
        </CardContent>
      </Card>

      {/* Campaigns Table */}
      <Card className="shadow-sm">
        <CardContent className="p-0">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-7 gap-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
              <div>Name</div>
              <div>Date</div>
              <div>Template</div>
              <div>Contacts</div>
              <div>Delivered To</div>
              <div>Read By</div>
              <div>Action</div>
                  </div>
                </div>

          {/* Table Body */}
          {filteredCampaigns.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredCampaigns.map((campaign) => (
                <div key={campaign.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="grid grid-cols-7 gap-4 items-center">
                <div className="flex items-center gap-2">
                  {getStatusIcon(campaign.status)}
                      <span className="font-medium">{campaign.name}</span>
                    </div>
                    <div className="text-sm text-gray-600">{campaign.createdAt}</div>
                    <div className="text-sm text-gray-600">{campaign.template}</div>
                    <div className="text-sm text-gray-600">{campaign.contacts}</div>
                    <div className="text-sm text-gray-600">{campaign.deliveredTo}</div>
                    <div className="text-sm text-gray-600">{campaign.readBy}</div>
                    <div className="flex items-center gap-2">
                  {getStatusBadge(campaign.status)}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleEditCampaign(campaign)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicateCampaign(campaign)}>
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                          {campaign.status === "draft" && (
                            <DropdownMenuItem onClick={() => handleStatusChange(campaign.id, "active")}>
                              <Play className="w-4 h-4 mr-2" />
                              Start Campaign
                            </DropdownMenuItem>
                          )}
                      {campaign.status === "active" && (
                            <DropdownMenuItem onClick={() => handleStatusChange(campaign.id, "paused")}>
                          <Pause className="w-4 h-4 mr-2" />
                              Pause Campaign
                        </DropdownMenuItem>
                      )}
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteCampaign(campaign.id)}
                          >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                  </div>
                </div>
              ))}
                  </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-16">
              <div className="relative mb-6">
                {/* Mailbox Icon */}
                <div className="w-24 h-24 border-2 border-gray-300 rounded-lg flex items-center justify-center relative">
                  <Mailbox className="w-12 h-12 text-gray-400" />
                  <ArrowUp className="w-6 h-6 text-gray-400 absolute -top-2 right-2" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {campaignName ? "No campaigns found matching your search" : "There are no campaigns, send your first one!"}
              </h3>
            </div>
          )}
            </CardContent>
          </Card>

      {/* Edit Campaign Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Campaign</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="editCampaignName">Campaign Name *</Label>
              <Input
                id="editCampaignName"
                value={campaignForm.name}
                onChange={(e) => setCampaignForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter campaign name"
              />
            </div>
            <div>
              <Label htmlFor="editTemplate">Template *</Label>
              <Select value={campaignForm.template} onValueChange={(value) => setCampaignForm(prev => ({ ...prev, template: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="welcome">Welcome Template</SelectItem>
                  <SelectItem value="product">Product Template</SelectItem>
                  <SelectItem value="promotion">Promotion Template</SelectItem>
                  <SelectItem value="support">Support Template</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="editMessage">Message *</Label>
              <Textarea
                id="editMessage"
                value={campaignForm.message}
                onChange={(e) => setCampaignForm(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Enter your message"
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="editContacts">Number of Contacts</Label>
              <Input
                id="editContacts"
                type="number"
                value={campaignForm.contacts}
                onChange={(e) => setCampaignForm(prev => ({ ...prev, contacts: parseInt(e.target.value) || 0 }))}
                placeholder="Enter number of contacts"
              />
            </div>
            <div>
              <Label htmlFor="editScheduledFor">Schedule For (Optional)</Label>
              <Input
                id="editScheduledFor"
                type="datetime-local"
                value={campaignForm.scheduledFor}
                onChange={(e) => setCampaignForm(prev => ({ ...prev, scheduledFor: e.target.value }))}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateCampaign} className="bg-[#16a34a] hover:bg-[#15803d]">
                Update Campaign
              </Button>
            </div>
      </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BroadcastCampaigns;
