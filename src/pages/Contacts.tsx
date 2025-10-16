import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Clock,
  Users,
  FileText,
  Download,
  X,
  Filter,
  ChevronDown,
  Upload,
  Tag
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [showInfoBanner, setShowInfoBanner] = useState(true);
  const [filters, setFilters] = useState({
    name: "",
    phone: "",
    groups: "",
    country: "",
    email: ""
  });
  const navigate = useNavigate();

  const contacts = [
    {
      id: 1,
      sno: 1,
      name: "Sarah Johnson",
      countryCode: "+1",
      phone: "555-0123",
      countryName: "United States",
      countryFlag: "🇺🇸",
      email: "sarah.johnson@email.com",
      lastMessage: "2 hours ago",
      status: "active",
      tags: ["VIP", "Premium"]
    },
    {
      id: 2,
      sno: 2,
      name: "Michael Chen",
      countryCode: "+44",
      phone: "20-7946-0958",
      countryName: "United Kingdom",
      countryFlag: "🇬🇧",
      email: "michael.chen@email.com",
      lastMessage: "1 day ago",
      status: "active",
      tags: ["Regular"]
    },
    {
      id: 3,
      sno: 3,
      name: "Ahmed Hassan",
      countryCode: "+92",
      phone: "300-1234567",
      countryName: "Pakistan",
      countryFlag: "🇵🇰",
      email: "ahmed.hassan@email.com",
      lastMessage: "3 hours ago",
      status: "active",
      tags: ["VIP"]
    },
    {
      id: 4,
      sno: 4,
      name: "Emily Rodriguez",
      countryCode: "+34",
      phone: "612-345-678",
      countryName: "Spain",
      countryFlag: "🇪🇸",
      email: "emily.rodriguez@email.com",
      lastMessage: "5 hours ago",
      status: "inactive",
      tags: ["New"]
    },
    {
      id: 5,
      sno: 5,
      name: "David Kim",
      countryCode: "+82",
      phone: "10-1234-5678",
      countryName: "South Korea",
      countryFlag: "🇰🇷",
      email: "david.kim@email.com",
      lastMessage: "1 week ago",
      status: "inactive",
      tags: ["Regular"]
    },
    {
      id: 6,
      sno: 6,
      name: "Lisa Thompson",
      countryCode: "+1",
      phone: "555-9876",
      countryName: "United States",
      countryFlag: "🇺🇸",
      email: "lisa.thompson@email.com",
      lastMessage: "2 days ago",
      status: "active",
      tags: ["Premium", "VIP"]
    }
  ];

  const handleSelectContact = (contactId: number) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleSelectAll = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contacts.map(contact => contact.id));
    }
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      name: "",
      phone: "",
      groups: "",
      country: "",
      email: ""
    });
  };

  return (
    <div className="page-container">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Contacts Management</h1>
          <p className="text-muted-foreground mt-1">1541 Contacts</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Add new contact</span>
            <span className="sm:hidden">Add</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/contact-labels')}
            className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
          >
            <Tag className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Labels</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/groups-management')}
            className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
          >
            <Users className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Groups</span>
          </Button>
          <Button variant="outline" className="border-green-500 text-green-600">
            <FileText className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Fields</span>
          </Button>
          <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white">
            <Download className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/contacts-import')}
            className="border-green-500 text-green-600"
          >
            <Upload className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Import</span>
          </Button>
        </div>
      </div>

      {/* Information Banner */}
      {showInfoBanner && (
        <Card className="bg-white border-green-200 border-l-4">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <p className="text-sm text-gray-700">
                The contact list keeps a record of the numbers you've added and imported to our system. You also have the option to manually export or import contacts.
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowInfoBanner(false)}
                className="h-6 w-6 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filter Section */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">Name</Label>
              <Input
                id="name"
                placeholder="Enter name"
                value={filters.name}
                onChange={(e) => handleFilterChange('name', e.target.value)}
                className="mt-1"
              />
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</Label>
              <Input
                id="phone"
                placeholder="Enter phone"
                value={filters.phone}
                onChange={(e) => handleFilterChange('phone', e.target.value)}
                className="mt-1"
              />
            </div>

            {/* Groups */}
            <div>
              <Label htmlFor="groups" className="text-sm font-medium text-gray-700">Groups</Label>
              <Select value={filters.groups} onValueChange={(value) => handleFilterChange('groups', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select Groups" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="prospect">Prospect</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Country */}
            <div>
              <Label htmlFor="country" className="text-sm font-medium text-gray-700">Country</Label>
              <Select value={filters.country} onValueChange={(value) => handleFilterChange('country', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="in">India</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Email */}
            <div className="md:col-span-2 lg:col-span-4">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
              <Input
                id="email"
                placeholder="Enter email"
                value={filters.email}
                onChange={(e) => handleFilterChange('email', e.target.value)}
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
            <Button variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
              Clear filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table Section */}
      <Card className="shadow-sm">
        <CardContent className="p-0">
          {/* Table Controls */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Show</span>
              <Select defaultValue="10">
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-700">entries</span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <Checkbox 
                      checked={selectedContacts.length === contacts.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sno
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country Flag
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Checkbox 
                        checked={selectedContacts.includes(contact.id)}
                        onCheckedChange={() => handleSelectContact(contact.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {contact.sno}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {contact.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.countryCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.countryName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.countryFlag}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contacts;