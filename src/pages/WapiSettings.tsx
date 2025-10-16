import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Globe,
  Shield,
  Database,
  Bell,
  Key,
  Smartphone
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

const WapiSettings = () => {
  const [settings, setSettings] = useState({
    webhookUrl: "https://api.flaxxawapi.com/webhook",
    webhookSecret: "sk_1234567890abcdef",
    autoReply: true,
    businessHours: true,
    businessStartTime: "09:00",
    businessEndTime: "17:00",
    timezone: "UTC",
    maxRetries: 3,
    retryDelay: 5000,
    enableAnalytics: true,
    enableLogging: true,
    logLevel: "info",
    apiVersion: "v1.0",
    rateLimit: 1000,
    enableNotifications: true,
    notificationEmail: "admin@company.com"
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log("Saving settings:", settings);
  };

  const handleTestConnection = () => {
    // Here you would test the webhook connection
    console.log("Testing webhook connection...");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Wapi Settings</h1>
          <p className="text-gray-600">Configure your WhatsApp API settings and preferences</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleTestConnection}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Test Connection
          </Button>
          <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">API Status</p>
                <p className="text-lg font-semibold text-green-600">Connected</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Webhook Status</p>
                <p className="text-lg font-semibold text-blue-600">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Security</p>
                <p className="text-lg font-semibold text-purple-600">Secure</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Webhook Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Webhook Configuration
            </CardTitle>
            <CardDescription>
              Configure your webhook URL and security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input
                id="webhookUrl"
                value={settings.webhookUrl}
                onChange={(e) => handleSettingChange('webhookUrl', e.target.value)}
                placeholder="https://your-domain.com/webhook"
              />
            </div>
            <div>
              <Label htmlFor="webhookSecret">Webhook Secret</Label>
              <Input
                id="webhookSecret"
                type="password"
                value={settings.webhookSecret}
                onChange={(e) => handleSettingChange('webhookSecret', e.target.value)}
                placeholder="Your webhook secret key"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoReply">Auto Reply</Label>
                <p className="text-sm text-gray-500">Enable automatic replies to incoming messages</p>
              </div>
              <Switch
                id="autoReply"
                checked={settings.autoReply}
                onCheckedChange={(checked) => handleSettingChange('autoReply', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Business Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              Business Hours
            </CardTitle>
            <CardDescription>
              Set your business hours and timezone
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="businessHours">Enable Business Hours</Label>
                <p className="text-sm text-gray-500">Only respond during business hours</p>
              </div>
              <Switch
                id="businessHours"
                checked={settings.businessHours}
                onCheckedChange={(checked) => handleSettingChange('businessHours', checked)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessStartTime">Start Time</Label>
                <Input
                  id="businessStartTime"
                  type="time"
                  value={settings.businessStartTime}
                  onChange={(e) => handleSettingChange('businessStartTime', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="businessEndTime">End Time</Label>
                <Input
                  id="businessEndTime"
                  type="time"
                  value={settings.businessEndTime}
                  onChange={(e) => handleSettingChange('businessEndTime', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                value={settings.timezone}
                onChange={(e) => handleSettingChange('timezone', e.target.value)}
                placeholder="UTC"
              />
            </div>
          </CardContent>
        </Card>

        {/* API Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              API Configuration
            </CardTitle>
            <CardDescription>
              Configure API behavior and limits
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="apiVersion">API Version</Label>
              <Input
                id="apiVersion"
                value={settings.apiVersion}
                onChange={(e) => handleSettingChange('apiVersion', e.target.value)}
                placeholder="v1.0"
              />
            </div>
            <div>
              <Label htmlFor="rateLimit">Rate Limit (requests/hour)</Label>
              <Input
                id="rateLimit"
                type="number"
                value={settings.rateLimit}
                onChange={(e) => handleSettingChange('rateLimit', parseInt(e.target.value))}
                placeholder="1000"
              />
            </div>
            <div>
              <Label htmlFor="maxRetries">Max Retries</Label>
              <Input
                id="maxRetries"
                type="number"
                value={settings.maxRetries}
                onChange={(e) => handleSettingChange('maxRetries', parseInt(e.target.value))}
                placeholder="3"
              />
            </div>
            <div>
              <Label htmlFor="retryDelay">Retry Delay (ms)</Label>
              <Input
                id="retryDelay"
                type="number"
                value={settings.retryDelay}
                onChange={(e) => handleSettingChange('retryDelay', parseInt(e.target.value))}
                placeholder="5000"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications & Logging */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications & Logging
            </CardTitle>
            <CardDescription>
              Configure notifications and logging preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableNotifications">Enable Notifications</Label>
                <p className="text-sm text-gray-500">Receive email notifications for important events</p>
              </div>
              <Switch
                id="enableNotifications"
                checked={settings.enableNotifications}
                onCheckedChange={(checked) => handleSettingChange('enableNotifications', checked)}
              />
            </div>
            <div>
              <Label htmlFor="notificationEmail">Notification Email</Label>
              <Input
                id="notificationEmail"
                type="email"
                value={settings.notificationEmail}
                onChange={(e) => handleSettingChange('notificationEmail', e.target.value)}
                placeholder="admin@company.com"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableLogging">Enable Logging</Label>
                <p className="text-sm text-gray-500">Log API requests and responses</p>
              </div>
              <Switch
                id="enableLogging"
                checked={settings.enableLogging}
                onCheckedChange={(checked) => handleSettingChange('enableLogging', checked)}
              />
            </div>
            <div>
              <Label htmlFor="logLevel">Log Level</Label>
              <select
                id="logLevel"
                value={settings.logLevel}
                onChange={(e) => handleSettingChange('logLevel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#16a34a]"
              >
                <option value="debug">Debug</option>
                <option value="info">Info</option>
                <option value="warn">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security Settings
          </CardTitle>
          <CardDescription>
            Configure security and access control settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="font-medium text-yellow-800">API Key Rotation</p>
                  <p className="text-sm text-yellow-700">Your API key was last rotated 30 days ago</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Key className="w-4 h-4 mr-2" />
                Rotate Key
              </Button>
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Access Control</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Manage who can access your WhatsApp API settings
                </p>
                <Button variant="outline">
                  <Shield className="w-4 h-4 mr-2" />
                  Manage Access
                </Button>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Audit Logs</h4>
                <p className="text-sm text-gray-600 mb-4">
                  View and download audit logs for compliance
                </p>
                <Button variant="outline">
                  <Database className="w-4 h-4 mr-2" />
                  View Logs
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WapiSettings;
