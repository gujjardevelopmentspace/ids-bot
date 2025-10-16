import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Copy,
  Download,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Key,
  Globe,
  Database,
  Zap,
  BookOpen,
  ExternalLink
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const API = () => {
  const [apiKey, setApiKey] = useState("sk_1234567890abcdef");
  const [baseUrl, setBaseUrl] = useState("https://api.flaxxawapi.com/v1");

  const codeExamples = {
    javascript: `// Send a message
const response = await fetch('${baseUrl}/messages', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${apiKey}',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: '+1234567890',
    message: 'Hello from FlaxxaWapi!'
  })
});

const data = await response.json();
console.log(data);`,
    python: `import requests

# Send a message
url = "${baseUrl}/messages"
headers = {
    "Authorization": f"Bearer ${apiKey}",
    "Content-Type": "application/json"
}
data = {
    "to": "+1234567890",
    "message": "Hello from FlaxxaWapi!"
}

response = requests.post(url, headers=headers, json=data)
print(response.json())`,
    curl: `curl -X POST "${baseUrl}/messages" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+1234567890",
    "message": "Hello from FlaxxaWapi!"
  }'`
  };

  const endpoints = [
    {
      method: "POST",
      path: "/messages",
      description: "Send a message",
      parameters: ["to", "message", "type"]
    },
    {
      method: "GET",
      path: "/messages",
      description: "Get message history",
      parameters: ["limit", "offset", "status"]
    },
    {
      method: "POST",
      path: "/contacts",
      description: "Create a contact",
      parameters: ["phone", "name", "email"]
    },
    {
      method: "GET",
      path: "/contacts",
      description: "List contacts",
      parameters: ["limit", "offset", "search"]
    },
    {
      method: "POST",
      path: "/campaigns",
      description: "Create a campaign",
      parameters: ["name", "message", "contacts", "schedule"]
    },
    {
      method: "GET",
      path: "/campaigns",
      description: "List campaigns",
      parameters: ["limit", "offset", "status"]
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const generateNewKey = () => {
    const newKey = "sk_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setApiKey(newKey);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">API Documentation</h1>
          <p className="text-gray-600">Integrate FlaxxaWapi with your applications</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <BookOpen className="w-4 h-4 mr-2" />
            Full Docs
          </Button>
          <Button variant="outline">
            <ExternalLink className="w-4 h-4 mr-2" />
            Postman Collection
          </Button>
        </div>
      </div>

      {/* API Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">API Status</p>
                <p className="text-lg font-semibold text-green-600">Online</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Requests Today</p>
                <p className="text-lg font-semibold text-blue-600">1,234</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Rate Limit</p>
                <p className="text-lg font-semibold text-purple-600">1,000/hr</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Key className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">API Version</p>
                <p className="text-lg font-semibold text-orange-600">v1.0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            API Configuration
          </CardTitle>
          <CardDescription>
            Your API credentials and base URL
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="apiKey">API Key</Label>
              <div className="flex gap-2">
                <Input
                  id="apiKey"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" onClick={() => copyToClipboard(apiKey)}>
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="outline" onClick={generateNewKey}>
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="baseUrl">Base URL</Label>
              <div className="flex gap-2">
                <Input
                  id="baseUrl"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" onClick={() => copyToClipboard(baseUrl)}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Documentation */}
      <Tabs defaultValue="endpoints" className="space-y-4">
        <TabsList>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="examples">Code Examples</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="endpoints" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Endpoints</CardTitle>
              <CardDescription>
                Available endpoints for interacting with FlaxxaWapi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {endpoints.map((endpoint, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Badge 
                          className={
                            endpoint.method === "GET" 
                              ? "bg-blue-100 text-blue-800" 
                              : endpoint.method === "POST"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                          {endpoint.path}
                        </code>
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{endpoint.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {endpoint.parameters.map((param, paramIndex) => (
                        <Badge key={paramIndex} variant="secondary" className="text-xs">
                          {param}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Code Examples</CardTitle>
              <CardDescription>
                Example code for different programming languages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="javascript" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                </TabsList>
                <TabsContent value="javascript">
                  <div className="relative">
                    <Textarea
                      value={codeExamples.javascript}
                      readOnly
                      className="font-mono text-sm h-64"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(codeExamples.javascript)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="python">
                  <div className="relative">
                    <Textarea
                      value={codeExamples.python}
                      readOnly
                      className="font-mono text-sm h-64"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(codeExamples.python)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="curl">
                  <div className="relative">
                    <Textarea
                      value={codeExamples.curl}
                      readOnly
                      className="font-mono text-sm h-64"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(codeExamples.curl)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Webhook Configuration</CardTitle>
              <CardDescription>
                Configure webhooks to receive real-time updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium text-blue-800">Webhook Events</h4>
                </div>
                <p className="text-sm text-blue-700 mb-3">
                  Configure your webhook URL to receive real-time notifications for:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Badge className="bg-blue-100 text-blue-800">message.received</Badge>
                  <Badge className="bg-blue-100 text-blue-800">message.sent</Badge>
                  <Badge className="bg-blue-100 text-blue-800">message.delivered</Badge>
                  <Badge className="bg-blue-100 text-blue-800">message.read</Badge>
                  <Badge className="bg-blue-100 text-blue-800">contact.created</Badge>
                  <Badge className="bg-blue-100 text-blue-800">campaign.completed</Badge>
                </div>
              </div>
              <div>
                <Label htmlFor="webhookUrl">Webhook URL</Label>
                <Input
                  id="webhookUrl"
                  placeholder="https://your-domain.com/webhook"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="webhookSecret">Webhook Secret</Label>
                <Input
                  id="webhookSecret"
                  type="password"
                  placeholder="Your webhook secret"
                  className="mt-1"
                />
              </div>
              <Button className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white">
                <Globe className="w-4 h-4 mr-2" />
                Save Webhook
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default API;
