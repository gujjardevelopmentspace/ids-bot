import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  RefreshCw, 
  Plus,
  ExternalLink,
  Filter,
  X,
  FolderX,
  User
} from "lucide-react";

const Templates = () => {
  const [showInfoBox, setShowInfoBox] = useState(true);
  const [filters, setFilters] = useState({
    status: "",
    languages: "",
    category: "",
    search: "",
    mediaType: "",
    buttonsType: ""
  });

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      languages: "",
      category: "",
      search: "",
      mediaType: "",
      buttonsType: ""
    });
  };

  return (
    <div className="page-container">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Templates Management - idea bot</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg">
            <RefreshCw className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Click to Sync Templates from Meta</span>
            <span className="sm:hidden">Sync Templates</span>
          </Button>
          <Button className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
            <span className="hidden sm:inline">Create Template</span>
            <span className="sm:hidden">Create</span>
          </Button>
          <Button className="bg-accent/10 text-accent border-accent/20 hover:bg-accent/20">
            <ExternalLink className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Manage Template on Meta</span>
            <span className="sm:hidden">Manage</span>
          </Button>
        </div>
      </div>

      {/* Information Box */}
      {showInfoBox && (
        <Card className="bg-primary/5 border-primary/20 border-l-4 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Streamline your template creation process with Flaxxa WAPI. Whatsapp Templates are ready-made formats that allow businesses to connect with their customers efficiently. These templates can be straightforward text-only messages or a combination of text and media to enhance communication.
                </p>
                <p>
                  Before sending notification messages to your users via WhatsApp, it's mandatory to obtain template approval.
                </p>
                <p className="font-semibold">
                  Note: The number of templates a WhatsApp Business Account can have is determined by its parent business. If a parent business is unverified, each of its WhatsApp Business Accounts is limited to 250 templates.
                </p>
                <p>
                  However, if the parent business is verified and at least one of its WhatsApp Business Accounts has a business phone number with an approved display name, each of its WhatsApp Business Accounts can have up to 6,000 templates.
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

      {/* Filter Section */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Status */}
            <div>
              <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                Status *
              </Label>
              <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Languages */}
            <div>
              <Label htmlFor="languages" className="text-sm font-medium text-gray-700">
                Languages
              </Label>
              <Select value={filters.languages} onValueChange={(value) => handleFilterChange('languages', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select Languages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                  <SelectItem value="italian">Italian</SelectItem>
                  <SelectItem value="portuguese">Portuguese</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                Category
              </Label>
              <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="greeting">Greeting</SelectItem>
                  <SelectItem value="transactional">Transactional</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                  <SelectItem value="utility">Utility</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search */}
            <div>
              <Label htmlFor="search" className="text-sm font-medium text-gray-700">
                Search
              </Label>
              <Input
                id="search"
                placeholder="Enter name"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="mt-1"
              />
            </div>

            {/* Media Type */}
            <div>
              <Label htmlFor="mediaType" className="text-sm font-medium text-gray-700">
                Media type
              </Label>
              <Select value={filters.mediaType} onValueChange={(value) => handleFilterChange('mediaType', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select Media type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="document">Document</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Buttons Type */}
            <div>
              <Label htmlFor="buttonsType" className="text-sm font-medium text-gray-700">
                Buttons type
              </Label>
              <Select value={filters.buttonsType} onValueChange={(value) => handleFilterChange('buttonsType', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select Buttons type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quick-reply">Quick Reply</SelectItem>
                  <SelectItem value="call-to-action">Call to Action</SelectItem>
                  <SelectItem value="url">URL</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2 mt-4">
            <Button className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25">
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
        </CardContent>
      </Card>

      {/* Empty State */}
      <Card className="shadow-sm bg-gray-50">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="relative mb-6">
              {/* Main folder with X */}
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center relative z-10">
                <FolderX className="w-12 h-12 text-white" />
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
                  <div className="w-8 h-12 bg-gradient-to-b from-blue-600 to-indigo-600 rounded absolute top-6 left-1/2 transform -translate-x-1/2"></div>
                  {/* Skirt */}
                  <div className="w-10 h-8 bg-black absolute top-16 left-1/2 transform -translate-x-1/2 rounded-b-lg"></div>
                  <div className="w-2 h-2 bg-white absolute top-18 left-1/2 transform -translate-x-1/2 rounded"></div>
                  {/* Hand */}
                  <div className="w-3 h-3 bg-gray-300 rounded-full absolute top-8 -left-1"></div>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              There Are No Templates...
            </h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Templates;
