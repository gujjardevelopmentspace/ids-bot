import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Smartphone, 
  Plus,
  X,
  MoreVertical,
  Star,
  Calendar,
  Clock,
  Users,
  User
} from "lucide-react";

const WhatsAppFlows = () => {
  const [activeTab, setActiveTab] = useState<'system' | 'user'>('system');
  const [showInfoBox, setShowInfoBox] = useState(true);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const flows = [
    {
      id: 1,
      name: "Customer Onboarding Bot",
      type: "system",
      description: "Automated customer welcome and setup flow",
      status: "active",
      title: "Welcome! Let's get you started",
      message: "Hi! I'm your personal assistant bot. I'll help you get set up with our services.",
      fields: [
        { type: "input", placeholder: "Enter your name", label: "What's your name?" },
        { type: "select", placeholder: "Select your industry", label: "What industry are you in?" },
        { type: "input", placeholder: "Enter your company name", label: "Company name?" }
      ],
      buttonText: "Start Setup",
      botType: "Onboarding"
    },
    {
      id: 2,
      name: "Support Bot Assistant",
      type: "system", 
      description: "Automated customer support and issue resolution",
      status: "active",
      title: "How can I help you today?",
      message: "I'm here to assist you! Please describe your issue and I'll help you resolve it.",
      fields: [
        { type: "select", placeholder: "Select issue type", label: "What type of issue are you experiencing?" },
        { type: "textarea", placeholder: "Describe your issue", label: "Please describe the problem" }
      ],
      options: ["Technical Issue", "Billing Question", "Account Problem", "Feature Request"],
      buttonText: "Get Help",
      botType: "Support"
    },
    {
      id: 3,
      name: "Lead Qualification Bot",
      type: "system",
      description: "Automated lead scoring and qualification",
      status: "active",
      title: "Tell me about your business needs",
      message: "I'll help determine if our solution is right for you. Let's start with some questions.",
      fields: [
        { type: "input", placeholder: "Company size", label: "How many employees?" },
        { type: "select", placeholder: "Current solution", label: "What do you currently use?" },
        { type: "select", placeholder: "Budget range", label: "What's your budget range?" }
      ],
      buttonText: "Qualify Lead",
      botType: "Sales"
    },
    {
      id: 4,
      name: "FAQ Bot",
      type: "system",
      description: "Automated frequently asked questions handler",
      status: "active",
      title: "Frequently Asked Questions",
      message: "I can answer common questions instantly. What would you like to know?",
      options: ["How to get started?", "Pricing information", "Feature comparison", "Technical requirements", "Contact support"],
      buttonText: "Ask Question",
      botType: "FAQ"
    },
    {
      id: 5,
      name: "Appointment Booking Bot",
      type: "system",
      description: "Automated appointment scheduling",
      status: "active",
      title: "Schedule your appointment",
      message: "I'll help you book a meeting with our team. Let's find a time that works!",
      fields: [
        { type: "input", placeholder: "Select date", label: "Preferred date?" },
        { type: "select", placeholder: "Select time", label: "Preferred time?" },
        { type: "input", placeholder: "Your name", label: "Your name?" },
        { type: "input", placeholder: "Phone number", label: "Contact number?" }
      ],
      buttonText: "Book Appointment",
      botType: "Booking"
    }
  ];

  // User flows are empty - no user-created flows exist
  const userFlows: any[] = [];

  const filteredFlows = activeTab === 'system' ? flows : userFlows;

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Whatsapp Flows - idea bot</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create Flow
          </Button>
        </div>
      </div>

      {/* Informational Alert Box */}
      {showInfoBox && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 relative">
          <button
            onClick={() => setShowInfoBox(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
          <p className="text-sm text-gray-700 pr-6">
            WhatsApp Flows allow businesses to create organized and interactive messaging experiences. 
            With Flows, you can design and customize messages to provide customers with a more guided 
            and structured way to communicate. Use WhatsApp Flows to attract new customers and keep 
            existing ones engaged.
          </p>
        </div>
      )}

      {/* Flow Type Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('system')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === 'system' 
                ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All System Flows
          </button>
          <button
            onClick={() => setActiveTab('user')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === 'user' 
                ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            User Flows
          </button>
        </div>
        <Button className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white">
          Upgrade
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="bg-gray-50 p-6 rounded-lg min-h-[600px]">
        {filteredFlows.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFlows.map((flow) => (
              <div key={flow.id} className="bg-white rounded-xl shadow-lg p-4 max-w-sm mx-auto">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full"></div>
                  <h3 className="text-sm font-semibold text-gray-900">{flow.name}</h3>
                  <div className="flex items-center gap-1">
                    <button className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600">
                      <X className="w-4 h-4" />
                    </button>
                    <button className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Mobile Content */}
                <div className="space-y-4">
                  {/* Bot Type Badge */}
                  <div className="text-center">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
                      {flow.botType} Bot
                    </span>
                  </div>

                  {/* Title */}
                  <div className="text-center">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{flow.title}</h4>
                    {flow.message && (
                      <p className="text-sm text-gray-600 mb-3">{flow.message}</p>
                    )}
                    {flow.question && (
                      <p className="text-sm text-gray-600">{flow.question}</p>
                    )}
                    {flow.instruction && (
                      <p className="text-sm text-gray-600">{flow.instruction}</p>
                    )}
                  </div>

                  {/* Form Fields */}
                  {flow.fields && (
                    <div className="space-y-3">
                      {flow.fields.map((field, index) => (
                        <div key={index}>
                          {field.type === 'input' && (
                            <Input
                              placeholder={field.placeholder}
                              className="text-sm"
                            />
                          )}
                          {field.type === 'select' && (
                            <div className="relative">
                              <Input
                                placeholder={field.placeholder}
                                className="text-sm pr-8"
                              />
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <div className="w-2 h-2 bg-gray-400"></div>
                              </div>
                            </div>
                          )}
                          {field.type === 'textarea' && (
                            <textarea
                              placeholder={field.placeholder}
                              className="w-full p-2 border border-gray-300 rounded-md text-sm resize-none"
                              rows={3}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Radio Options */}
                  {flow.options && (
                    <div className="space-y-2">
                      {flow.options.map((option, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 border border-gray-200 rounded-lg">
                          <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                          <span className="text-sm text-gray-700">{option}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="pt-2">
                    <Button 
                      className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm py-2"
                      onClick={() => {
                        if (flow.id === 1) setIsOnboardingModalOpen(true);
                        if (flow.id === 2) setIsSupportModalOpen(true);
                      }}
                    >
                      {flow.buttonText}
                    </Button>
                  </div>

                  {/* Footer */}
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Managed by the business. Learn more</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center h-96">
            <div className="relative mb-6">
              {/* Main folder with X */}
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center relative z-10">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <X className="w-8 h-8 text-gray-400" />
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
              There is no Flow Available
            </h3>
          </div>
        )}
      </div>

      {/* Customer Onboarding Bot Modal */}
      <Dialog open={isOnboardingModalOpen} onOpenChange={setIsOnboardingModalOpen}>
        <DialogContent className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg">
            {/* Mobile Header */}
            <div className="bg-gray-100 p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Customer Onboarding Bot</h2>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setIsOnboardingModalOpen(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile Content */}
            <div className="p-6 space-y-6">
              <div className="text-center">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-3">
                  Onboarding Bot
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome! Let's get you started</h3>
                <p className="text-sm text-gray-600">Hi! I'm your personal assistant bot. I'll help you get set up with our services.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    What's your name?
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="industry" className="text-sm font-medium text-gray-700">
                    What industry are you in?
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="industry"
                      placeholder="Select your industry"
                      className="pr-8"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-2 h-2 bg-gray-400"></div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                    Company name?
                  </Label>
                  <Input
                    id="company"
                    placeholder="Enter your company name"
                    className="mt-1"
                  />
                </div>
              </div>

              <Button className="w-full bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white">
                Start Setup
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Support Bot Modal */}
      <Dialog open={isSupportModalOpen} onOpenChange={setIsSupportModalOpen}>
        <DialogContent className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg">
            {/* Mobile Header */}
            <div className="bg-gray-100 p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Support Bot Assistant</h2>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setIsSupportModalOpen(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile Content */}
            <div className="p-6 space-y-6">
              <div className="text-center">
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-3">
                  Support Bot
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">How can I help you today?</h3>
                <p className="text-sm text-gray-600">I'm here to assist you! Please describe your issue and I'll help you resolve it.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="issue-type" className="text-sm font-medium text-gray-700">
                    What type of issue are you experiencing?
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="issue-type"
                      placeholder="Select issue type"
                      className="pr-8"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-2 h-2 bg-gray-400"></div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="issue-description" className="text-sm font-medium text-gray-700">
                    Please describe the problem
                  </Label>
                  <textarea
                    id="issue-description"
                    placeholder="Describe your issue"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm resize-none mt-1"
                    rows={3}
                  />
                </div>
              </div>

              <Button className="w-full bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white">
                Get Help
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Demo Buttons for Testing */}
      <div className="flex gap-2">
        <Button 
          onClick={() => setIsOnboardingModalOpen(true)}
          variant="outline"
          className="text-sm"
        >
          Preview Onboarding Bot
        </Button>
        <Button 
          onClick={() => setIsSupportModalOpen(true)}
          variant="outline"
          className="text-sm"
        >
          Preview Support Bot
        </Button>
      </div>
    </div>
  );
};

export default WhatsAppFlows;
