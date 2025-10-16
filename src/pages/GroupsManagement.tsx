import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  Filter,
  Users,
  FolderX,
  User
} from "lucide-react";

const GroupsManagement = () => {
  const [filters, setFilters] = useState({
    name: ""
  });

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      name: ""
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Groups Management - Flaxxa Wapi</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add new group
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <Card className="shadow-sm bg-gray-50">
        <CardContent className="p-6">
          {/* Filter Section */}
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Name *
                </Label>
                <Input
                  id="name"
                  placeholder="Enter name."
                  value={filters.name}
                  onChange={(e) => handleFilterChange('name', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex items-end gap-2">
                <Button className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white">
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
          </div>

          {/* Empty State */}
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
                  <div className="w-8 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded absolute top-6 left-1/2 transform -translate-x-1/2"></div>
                  {/* Skirt */}
                  <div className="w-10 h-8 bg-black absolute top-16 left-1/2 transform -translate-x-1/2 rounded-b-lg"></div>
                  <div className="w-2 h-2 bg-white absolute top-18 left-1/2 transform -translate-x-1/2 rounded"></div>
                  {/* Hand */}
                  <div className="w-3 h-3 bg-gray-300 rounded-full absolute top-8 -left-1"></div>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              There Are No Groups...
            </h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupsManagement;
