import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Info,
  Globe,
  ExternalLink
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PhoneNumbers = () => {
  const [selectedCountry, setSelectedCountry] = useState("");

  const providers = [
    {
      name: "Twilio",
      description: "Twilio combines the best in communications and customer data ... Verify, activate, and connect with global customers over SMS, voice, email, chat, and WhatsApp.",
      price: "Starts from $1",
      logo: (
        <img 
          src="https://www.twilio.com/marketing/bundles/company/img/logos/red/twilio-logo-red.svg" 
          alt="Twilio Logo" 
          className="w-8 h-8"
        />
      )
    },
    {
      name: "Vonage",
      description: "Instantly provision virtual phone numbers to send or receive text messages and phone calls. Gone are the days when application developers needed to negotiate painful agreements with each telco operator to obtain regionally limited phone numbers at exorbitant rates.",
      price: "Starts from $1",
      logo: (
        <img 
          src="https://www.vonage.com/content/dam/vonage/images/logos/vonage-logo.svg" 
          alt="Vonage Logo" 
          className="w-8 h-8"
        />
      )
    },
    {
      name: "Numero",
      description: "Make local and international calls with almost local rates and receive free calls anywhere using Numero eSIM. Simply, stay connected anywhere.",
      price: "Starts from $4",
      logo: (
        <img 
          src="https://www.numeroesim.com/images/logo.svg" 
          alt="Numero Logo" 
          className="w-8 h-8"
        />
      )
    },
    {
      name: "Telnyx",
      description: "Get flexible pricing for Local, National and Toll-free Numbers, with the option to pay as you go or volume-based pricing.",
      price: "Starts from $1",
      logo: (
        <img 
          src="https://telnyx.com/assets/images/telnyx-logo.svg" 
          alt="Telnyx Logo" 
          className="w-8 h-8"
        />
      )
    },
    {
      name: "Your Business Number",
      description: "Get your virtual WhatsApp Business number today at just $6.99 Monthly",
      price: "$7",
      logo: (
        <img 
          src="https://www.yourbusinessnumber.com/images/logo.svg" 
          alt="Your Business Number Logo" 
          className="w-8 h-8"
        />
      )
    },
    {
      name: "RingCentral",
      description: "Get AI-powered phone, message, video, contact center, and virtual events solutions with RingCentral, the complete cloud communications platform",
      price: "$1",
      logo: (
        <img 
          src="https://www.ringcentral.com/content/dam/ringcentral/images/logos/ringcentral-logo.svg" 
          alt="RingCentral Logo" 
          className="w-8 h-8"
        />
      )
    },
    {
      name: "Hushed",
      description: "Hushed is the best second number app for Wi-Fi calling. Make private calls, send texts, and manage multiple numbers all on a single device.",
      price: "Starts at $2.99 & Lifetime Number at Just $25",
      logo: (
        <img 
          src="https://hushed.com/images/hushed-logo.svg" 
          alt="Hushed Logo" 
          className="w-8 h-8"
        />
      )
    }
  ];

  return (
    <div className="page-container">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Buy A New Phone Number</h1>
        
        {/* Info Box */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-blue-800">
                  To start using WhatsApp Business API, you must have a New Contact number that is not registered with WhatsApp.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Country Dropdown */}
        <div className="max-w-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose Country
          </label>
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
              <SelectItem value="au">Australia</SelectItem>
              <SelectItem value="de">Germany</SelectItem>
              <SelectItem value="fr">France</SelectItem>
              <SelectItem value="in">India</SelectItem>
              <SelectItem value="pk">Pakistan</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Provider Cards */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Phone className="w-5 h-5" />
          Provider Cards List
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {providers.map((provider, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-200 border border-gray-200 h-full">
              <CardContent className="p-6 h-full flex flex-col">
                {/* Header with Logo and Price */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#16a34a] rounded-lg flex items-center justify-center shadow-sm">
                    <div className="text-white">
                      {provider.logo}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg">{provider.name}</h3>
                    <p className="text-[#16a34a] font-semibold text-sm">{provider.price}</p>
                  </div>
                </div>
                
                {/* Description */}
                <div className="flex-1 mb-6">
                  <p className="text-sm text-gray-600 leading-relaxed">{provider.description}</p>
                </div>
                
                {/* Buttons - Fixed at bottom */}
                <div className="mt-auto">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 h-9 bg-gray-50 hover:bg-gray-100 border-gray-300 text-gray-700 hover:text-gray-900"
                      onClick={() => {
                        if (provider.name === "Twilio") {
                          window.open('https://www.twilio.com/en-us', '_blank', 'noopener,noreferrer');
                        } else if (provider.name === "Vonage") {
                          window.open('https://www.vonage.com/', '_blank', 'noopener,noreferrer');
                        } else if (provider.name === "Numero") {
                          window.open('https://www.numeroesim.com/en', '_blank', 'noopener,noreferrer');
                        } else if (provider.name === "Telnyx") {
                          window.open('https://telnyx.com/', '_blank', 'noopener,noreferrer');
                        } else if (provider.name === "Your Business Number") {
                          window.open('https://www.yourbusinessnumber.com/en-US?via=034dc3', '_blank', 'noopener,noreferrer');
                        } else if (provider.name === "RingCentral") {
                          window.open('https://www.ringcentral.com/', '_blank', 'noopener,noreferrer');
                        } else if (provider.name === "Hushed") {
                          window.open('https://hushed.com/', '_blank', 'noopener,noreferrer');
                        } else {
                          console.log(`${provider.name} Login clicked`);
                        }
                      }}
                    >
                      Login
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 h-9 bg-gray-50 hover:bg-gray-100 border-gray-300 text-gray-700 hover:text-gray-900"
                      onClick={() => {
                        if (provider.name === "Twilio") {
                          window.open('https://www.twilio.com/en-us', '_blank', 'noopener,noreferrer');
                        } else if (provider.name === "Vonage") {
                          window.open('https://www.vonage.com/', '_blank', 'noopener,noreferrer');
                        } else if (provider.name === "Numero") {
                          window.open('https://www.numeroesim.com/en', '_blank', 'noopener,noreferrer');
                        } else if (provider.name === "Telnyx") {
                          window.open('https://telnyx.com/', '_blank', 'noopener,noreferrer');
                        } else if (provider.name === "Your Business Number") {
                          window.open('https://www.yourbusinessnumber.com/en-US?via=034dc3', '_blank', 'noopener,noreferrer');
                        } else if (provider.name === "RingCentral") {
                          window.open('https://www.ringcentral.com/', '_blank', 'noopener,noreferrer');
                        } else if (provider.name === "Hushed") {
                          window.open('https://hushed.com/', '_blank', 'noopener,noreferrer');
                        } else {
                          console.log(`${provider.name} Signup clicked`);
                        }
                      }}
                    >
                      Signup
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-8 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          https://wapi.flaxxa.com/number_purchase
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>1/2</span>
          <span>•</span>
          <span>2/2</span>
        </div>
      </div>
    </div>
  );
};

export default PhoneNumbers;
