import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Star,
  Settings,
  Mail,
  Clock,
  MessageSquare,
  Languages,
  Smartphone,
  ShoppingBag,
  CreditCard,
  Zap,
  Bot,
  CheckCircle,
  XCircle,
  Link,
  Eye,
  Save,
  TestTube
} from "lucide-react";

interface Integration {
  id: number;
  name: string;
  description: string;
  iconType: 'shopify' | 'woocommerce' | 'razorpay' | 'phonepe' | 'openai' | 'mail' | 'clock' | 'message' | 'languages' | 'smartphone';
  hasButtons: boolean;
  buttons?: Array<{
    text: string;
    variant: "default" | "destructive" | "outline";
    className?: string;
  }>;
  status: 'connected' | 'disconnected' | 'configuring' | 'testing';
  config?: {
    apiKey?: string;
    webhookUrl?: string;
    enabled?: boolean;
    settings?: Record<string, any>;
  };
  lastSync?: string;
  category: string;
}

const Integrations = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [integrations, setIntegrations] = useState<Integration[]>(() => {
    const saved = localStorage.getItem('integrations');
    return saved ? JSON.parse(saved) : [];
  });
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [editingIntegration, setEditingIntegration] = useState<Integration | null>(null);
  const [configForm, setConfigForm] = useState({
    apiKey: "",
    webhookUrl: "",
    enabled: true,
    customSettings: ""
  });

  // Initialize integrations if not already saved
  useEffect(() => {
    if (integrations.length === 0) {
      const initialIntegrations = [
        // Page 1
        {
          id: 1,
          name: "Shopify",
          description: "Easily integrate your Shopify store to sync products, manage orders, and send automated WhatsApp updates to customers.",
          iconType: 'shopify' as const,
          hasButtons: false,
          status: 'disconnected' as const,
          category: "E-commerce"
        },
        {
          id: 2,
          name: "Woocommerce",
          description: "Connect your WooCommerce store to automate order notifications, abandoned cart reminders, and customer engagement on WhatsApp.",
          iconType: 'woocommerce' as const,
          hasButtons: false,
          status: 'disconnected' as const,
          category: "E-commerce"
        },
        {
          id: 3,
          name: "Razorpay",
          description: "Enable seamless payment collection through Razorpay and send instant payment confirmations or reminders via WhatsApp.",
          iconType: 'razorpay' as const,
          hasButtons: false,
          status: 'disconnected' as const,
          category: "Payments"
        },
        {
          id: 4,
          name: "Phonepe",
          description: "Integrate PhonePe for quick, secure transactions and keep your customers updated with automated payment alerts.",
          iconType: 'phonepe' as const,
          hasButtons: false,
          status: 'disconnected' as const,
          category: "Payments"
        },
        {
          id: 5,
          name: "Open_AI",
          description: "Power your workflows with AI automation - generate smart replies, personalized messages, and intelligent chat experiences.",
          iconType: 'openai' as const,
          hasButtons: true,
          buttons: [
            { text: "Disconnect", variant: "destructive" as const },
            { text: "Configure", variant: "default" as const, className: "bg-green-600 hover:bg-green-700 text-white" }
          ],
          status: 'connected' as const,
          config: {
            apiKey: "sk-***hidden***",
            enabled: true
          },
          lastSync: "2025-01-14 10:30",
          category: "AI"
        },
        // Page 2
        {
          id: 6,
          name: "Email settings",
          description: "Configure your email server and sender details to enable smooth email communication alongside WhatsApp campaigns.",
          iconType: 'mail' as const,
          hasButtons: true,
          buttons: [{ text: "Configure", variant: "default" as const, className: "bg-green-600 hover:bg-green-700 text-white" }],
          status: 'disconnected' as const,
          category: "Communication"
        },
        {
          id: 7,
          name: "Email Templates",
          description: "Create and manage ready-to-use email templates for marketing, transactional, or reminder campaigns.",
          iconType: 'mail' as const,
          hasButtons: true,
          buttons: [{ text: "Configure", variant: "default" as const, className: "bg-green-600 hover:bg-green-700 text-white" }],
          status: 'disconnected' as const,
          category: "Communication"
        },
        {
          id: 8,
          name: "Reminders",
          description: "Set up automated reminders for payments, appointments, or follow-ups directly through WhatsApp and email.",
          iconType: 'clock' as const,
          hasButtons: true,
          buttons: [{ text: "Configure", variant: "default" as const, className: "bg-green-600 hover:bg-green-700 text-white" }],
          status: 'disconnected' as const,
          category: "Automation"
        },
        {
          id: 9,
          name: "SMS Twilio",
          description: "Connect Twilio to send and receive SMS directly from the platform, enabling instant customer communication worldwide.",
          iconType: 'message' as const,
          hasButtons: true,
          buttons: [{ text: "Configure", variant: "default" as const, className: "bg-green-600 hover:bg-green-700 text-white" }],
          status: 'disconnected' as const,
          category: "Communication"
        },
        {
          id: 10,
          name: "SMS Templates",
          description: "Create and manage predefined SMS templates for faster, consistent, and professional communication with your audience.",
          iconType: 'message' as const,
          hasButtons: true,
          buttons: [{ text: "Configure", variant: "default" as const, className: "bg-green-600 hover:bg-green-700 text-white" }],
          status: 'disconnected' as const,
          category: "Communication"
        },
        // Page 3
        {
          id: 11,
          name: "Translation settings",
          description: "Enable multilingual support by configuring translation settings to communicate with customers in their preferred language.",
          iconType: 'languages' as const,
          hasButtons: true,
          buttons: [{ text: "Configure", variant: "default" as const, className: "bg-green-600 hover:bg-green-700 text-white" }],
          status: 'disconnected' as const,
          category: "Localization"
        },
        {
          id: 12,
          name: "Click to Whatsapp Ads",
          description: "Integrate your Meta/WhatsApp ads to capture leads instantly and sync data for automated WhatsApp follow-ups.",
          iconType: 'smartphone' as const,
          hasButtons: true,
          buttons: [
            { text: "Configure", variant: "default" as const, className: "bg-green-600 hover:bg-green-700 text-white" },
            { text: "Sync Data", variant: "outline" as const, className: "border-green-600 text-green-600 hover:bg-green-50" }
          ],
          status: 'disconnected' as const,
          category: "Marketing"
        }
      ];
      setIntegrations(initialIntegrations);
    }
  }, [integrations.length]);

  // Persist integrations to localStorage
  useEffect(() => {
    localStorage.setItem('integrations', JSON.stringify(integrations));
  }, [integrations]);

  const page1Integrations = integrations.filter(integration => integration.id >= 1 && integration.id <= 5);
  const page2Integrations = integrations.filter(integration => integration.id >= 6 && integration.id <= 10);
  const page3Integrations = integrations.filter(integration => integration.id >= 11 && integration.id <= 12);

  const getCurrentIntegrations = () => {
    switch (currentPage) {
      case 1:
        return page1Integrations;
      case 2:
        return page2Integrations;
      case 3:
        return page3Integrations;
      default:
        return page1Integrations;
    }
  };

  const renderIcon = (iconType: Integration['iconType']) => {
    switch (iconType) {
      case 'shopify':
        return (
          <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
            <div className="text-white font-bold text-lg">S</div>
          </div>
        );
      case 'woocommerce':
        return (
          <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
            <div className="text-white font-bold text-sm">Woo</div>
          </div>
        );
      case 'razorpay':
        return (
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
            <div className="text-white font-bold text-xs">Razorpay</div>
          </div>
        );
      case 'phonepe':
        return (
          <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
            <div className="text-white font-bold text-sm">PhonePe</div>
          </div>
        );
      case 'openai':
        return (
          <div className="w-12 h-12 bg-white border border-gray-300 rounded-lg flex items-center justify-center">
            <Bot className="w-6 h-6 text-gray-800" />
          </div>
        );
      case 'mail':
        return <Mail className="w-6 h-6 text-gray-600" />;
      case 'clock':
        return <Clock className="w-6 h-6 text-gray-600" />;
      case 'message':
        return <MessageSquare className="w-6 h-6 text-gray-600" />;
      case 'languages':
        return <Languages className="w-6 h-6 text-gray-600" />;
      case 'smartphone':
        return <Smartphone className="w-6 h-6 text-gray-600" />;
      default:
        return (
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-gray-500 font-bold">?</div>
          </div>
        );
    }
  };

  const getStatusIcon = (status: Integration['status']) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "disconnected":
        return <XCircle className="w-4 h-4 text-gray-400" />;
      case "configuring":
        return <Settings className="w-4 h-4 text-yellow-500 animate-spin" />;
      case "testing":
        return <TestTube className="w-4 h-4 text-blue-500" />;
      default:
        return <XCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: Integration['status']) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-100 text-green-800">Connected</Badge>;
      case "disconnected":
        return <Badge className="bg-gray-100 text-gray-800">Disconnected</Badge>;
      case "configuring":
        return <Badge className="bg-yellow-100 text-yellow-800">Configuring</Badge>;
      case "testing":
        return <Badge className="bg-blue-100 text-blue-800">Testing</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Disconnected</Badge>;
    }
  };

  const handleConfigure = (integration: Integration) => {
    setEditingIntegration(integration);
    setConfigForm({
      apiKey: integration.config?.apiKey || "",
      webhookUrl: integration.config?.webhookUrl || "",
      enabled: integration.config?.enabled || false,
      customSettings: JSON.stringify(integration.config?.settings || {}, null, 2)
    });
    setIsConfigModalOpen(true);
  };

  const handleDisconnect = (integrationId: number) => {
    setIntegrations(integrations.map(integration => 
      integration.id === integrationId 
        ? { ...integration, status: 'disconnected' as const, config: undefined, lastSync: undefined }
        : integration
    ));
    toast.success("Integration disconnected successfully");
  };

  const handleConnect = (integrationId: number) => {
    setIntegrations(integrations.map(integration => 
      integration.id === integrationId 
        ? { ...integration, status: 'configuring' as const }
        : integration
    ));
    const integration = integrations.find(i => i.id === integrationId);
    if (integration) {
      handleConfigure(integration);
    }
  };

  const handleSaveConfig = () => {
    if (!editingIntegration) return;

    try {
      const settings = configForm.customSettings ? JSON.parse(configForm.customSettings) : {};
      
      setIntegrations(integrations.map(integration => 
        integration.id === editingIntegration.id 
          ? { 
              ...integration, 
              status: 'connected' as const,
              config: {
                apiKey: configForm.apiKey,
                webhookUrl: configForm.webhookUrl,
                enabled: configForm.enabled,
                settings
              },
              lastSync: new Date().toLocaleString()
            }
          : integration
      ));
      
      setIsConfigModalOpen(false);
      setEditingIntegration(null);
      toast.success(`${editingIntegration.name} configured successfully`);
    } catch (error) {
      toast.error("Invalid JSON in custom settings");
    }
  };

  const handleTestConnection = (integrationId: number) => {
    setIntegrations(integrations.map(integration => 
      integration.id === integrationId 
        ? { ...integration, status: 'testing' as const }
        : integration
    ));

    // Simulate API test
    setTimeout(() => {
      setIntegrations(integrations.map(integration => 
        integration.id === integrationId 
          ? { ...integration, status: 'connected' as const }
          : integration
      ));
      toast.success("Connection test successful");
    }, 2000);
  };

  const handleSyncData = (integrationId: number) => {
    const integration = integrations.find(i => i.id === integrationId);
    if (!integration) return;

    toast.success(`Syncing data for ${integration.name}...`);
    
    // Simulate data sync
    setTimeout(() => {
      setIntegrations(integrations.map(integration => 
        integration.id === integrationId 
          ? { ...integration, lastSync: new Date().toLocaleString() }
          : integration
      ));
      toast.success(`${integration.name} data synced successfully`);
    }, 3000);
  };

  const getActionButtons = (integration: Integration) => {
    const buttons = [];

    if (integration.status === 'connected') {
      buttons.push(
        <Button
          key="configure"
          variant="default"
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={() => handleConfigure(integration)}
        >
          <Settings className="w-4 h-4 mr-2" />
          Configure
        </Button>
      );
      
      if (integration.name === "Open_AI") {
        buttons.push(
          <Button
            key="disconnect"
            variant="destructive"
            onClick={() => handleDisconnect(integration.id)}
          >
            Disconnect
          </Button>
        );
      }

      if (integration.name === "Click to Whatsapp Ads") {
        buttons.push(
          <Button
            key="sync"
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50"
            onClick={() => handleSyncData(integration.id)}
          >
            Sync Data
          </Button>
        );
      }
    } else {
      buttons.push(
        <Button
          key="connect"
          variant="default"
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={() => handleConnect(integration.id)}
        >
          <Link className="w-4 h-4 mr-2" />
          Connect
        </Button>
      );
    }

    return buttons;
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Integrations - idea bot</h1>
        </div>
      </div>

      {/* Integrations Cards */}
      <div className="space-y-4">
        {getCurrentIntegrations().map((integration) => (
          <Card key={integration.id} className="shadow-sm">
        <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  {renderIcon(integration.iconType)}
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{integration.name}</h3>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(integration.status)}
                    {getStatusBadge(integration.status)}
                  </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{integration.description}</p>
                  
                  {/* Last Sync Info */}
                  {integration.lastSync && (
                    <div className="text-sm text-gray-500 mb-4">
                      Last sync: {integration.lastSync}
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {getActionButtons(integration)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <div className="flex space-x-2">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 text-sm rounded ${
                currentPage === page
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      {/* Configuration Modal */}
      <Dialog open={isConfigModalOpen} onOpenChange={setIsConfigModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Configure {editingIntegration?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={configForm.apiKey}
                onChange={(e) => setConfigForm({...configForm, apiKey: e.target.value})}
                placeholder="Enter your API key"
              />
            </div>
            
            <div>
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input
                id="webhookUrl"
                value={configForm.webhookUrl}
                onChange={(e) => setConfigForm({...configForm, webhookUrl: e.target.value})}
                placeholder="https://your-domain.com/webhook"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="enabled"
                checked={configForm.enabled}
                onCheckedChange={(checked) => setConfigForm({...configForm, enabled: checked})}
              />
              <Label htmlFor="enabled">Enable Integration</Label>
            </div>
            
            <div>
              <Label htmlFor="customSettings">Custom Settings (JSON)</Label>
              <Textarea
                id="customSettings"
                value={configForm.customSettings}
                onChange={(e) => setConfigForm({...configForm, customSettings: e.target.value})}
                placeholder='{"key": "value"}'
                rows={4}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setIsConfigModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => handleTestConnection(editingIntegration?.id || 0)}
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <TestTube className="w-4 h-4 mr-2" />
              Test Connection
            </Button>
            <Button onClick={handleSaveConfig} className="bg-green-600 hover:bg-green-700 text-white">
              <Save className="w-4 h-4 mr-2" />
              Save Configuration
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating Star Icon */}
      <div className="fixed bottom-6 right-6">
        <Button size="sm" className="w-10 h-10 bg-gray-800 hover:bg-gray-900 text-yellow-400 p-0">
          <Star className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default Integrations;
