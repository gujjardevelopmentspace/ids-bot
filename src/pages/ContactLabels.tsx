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
  Tag,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X
} from "lucide-react";

const ContactLabels = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLabel, setNewLabel] = useState({
    name: "",
    description: "",
    color: "#16a34a",
    aiBotStopLabel: false,
    status: "active"
  });

  const [labels, setLabels] = useState([
    // Empty array for now - showing "No data available in table"
  ]);

  const totalEntries = labels.length;
  const entriesPerPageNum = parseInt(entriesPerPage);
  const totalPages = Math.ceil(totalEntries / entriesPerPageNum);
  const startEntry = totalEntries > 0 ? 1 : 0;
  const endEntry = totalEntries > 0 ? Math.min(entriesPerPageNum, totalEntries) : 0;

  const handleAddLabel = () => {
    if (newLabel.name.trim()) {
      const label = {
        id: labels.length + 1,
        name: newLabel.name,
        description: newLabel.description,
        color: newLabel.color,
        aiBotStopLabel: newLabel.aiBotStopLabel,
        status: newLabel.status,
        creationDate: new Date().toLocaleDateString()
      };
      
      setLabels([...labels, label]);
      setNewLabel({
        name: "",
        description: "",
        color: "#16a34a",
        aiBotStopLabel: false,
        status: "active"
      });
      setShowAddModal(false);
    }
  };

  const handleMakeDefaultLabels = () => {
    const defaultLabels = [
      {
        id: 1,
        name: "VIP",
        description: "Very Important Person",
        color: "#f59e0b",
        aiBotStopLabel: false,
        status: "active",
        creationDate: new Date().toLocaleDateString()
      },
      {
        id: 2,
        name: "Customer",
        description: "Regular customer",
        color: "#16a34a",
        aiBotStopLabel: false,
        status: "active",
        creationDate: new Date().toLocaleDateString()
      },
      {
        id: 3,
        name: "Lead",
        description: "Potential customer",
        color: "#3b82f6",
        aiBotStopLabel: false,
        status: "active",
        creationDate: new Date().toLocaleDateString()
      }
    ];
    
    setLabels(defaultLabels);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">Contact Lables</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Label
          </Button>
          <Button 
            className="bg-green-400 hover:bg-green-500 text-white"
            onClick={handleMakeDefaultLabels}
          >
            <Tag className="w-4 h-4 mr-2" />
            Make Default Labels
          </Button>
        </div>
      </div>

      {/* Table Card */}
      <Card className="shadow-sm">
        <CardContent className="p-0">
          {/* Table Controls */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">10 Entries Per Page</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Search:</span>
              <Input
                placeholder=""
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      Id
                      <ChevronUp className="w-3 h-3" />
                      <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      Lable Name
                      <ChevronUp className="w-3 h-3" />
                      <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      Description
                      <ChevronUp className="w-3 h-3" />
                      <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      Lable Color
                      <ChevronUp className="w-3 h-3" />
                      <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      Ai Bot Stop Label
                      <ChevronUp className="w-3 h-3" />
                      <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      Status
                      <ChevronUp className="w-3 h-3" />
                      <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      Creation Date
                      <ChevronUp className="w-3 h-3" />
                      <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      Actions
                      <ChevronUp className="w-3 h-3" />
                      <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {labels.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <div className="text-gray-500 text-lg">
                        No data available in table
                      </div>
                    </td>
                  </tr>
                ) : (
                  labels.map((label) => (
                    <tr key={label.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {label.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {label.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {label.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: label.color }}
                          ></div>
                          <span>{label.color}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {label.aiBotStopLabel ? 'Yes' : 'No'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Badge className={label.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {label.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {label.creationDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing {startEntry} to {endEntry} of {totalEntries} entries
            </div>
            
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                disabled={true}
                className="h-8 w-8 p-0 rounded-full"
              >
                <ChevronsLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={true}
                className="h-8 w-8 p-0 rounded-full"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={true}
                className="h-8 w-8 p-0 rounded-full"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={true}
                className="h-8 w-8 p-0 rounded-full"
              >
                <ChevronsRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4">
        <div className="text-sm text-gray-500">
          https://wapi.flaxxa.com/contact_lables/index
        </div>
        <div className="text-sm text-gray-500">
          1/1
        </div>
      </div>

      {/* Add Label Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Add New Label</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddModal(false)}
                className="h-6 w-6 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="labelName">Label Name *</Label>
                <Input
                  id="labelName"
                  placeholder="Enter label name"
                  value={newLabel.name}
                  onChange={(e) => setNewLabel({...newLabel, name: e.target.value})}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="labelDescription">Description</Label>
                <Input
                  id="labelDescription"
                  placeholder="Enter description"
                  value={newLabel.description}
                  onChange={(e) => setNewLabel({...newLabel, description: e.target.value})}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="labelColor">Label Color</Label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="color"
                    id="labelColor"
                    value={newLabel.color}
                    onChange={(e) => setNewLabel({...newLabel, color: e.target.value})}
                    className="w-12 h-8 border border-gray-300 rounded"
                  />
                  <Input
                    value={newLabel.color}
                    onChange={(e) => setNewLabel({...newLabel, color: e.target.value})}
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="aiBotStop"
                  checked={newLabel.aiBotStopLabel}
                  onCheckedChange={(checked) => setNewLabel({...newLabel, aiBotStopLabel: !!checked})}
                />
                <Label htmlFor="aiBotStop">AI Bot Stop Label</Label>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddLabel}
                  className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white"
                >
                  Add Label
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ContactLabels;
