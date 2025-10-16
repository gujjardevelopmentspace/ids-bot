import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Upload, 
  Download, 
  FileText,
  Star
} from "lucide-react";

const ContactsImport = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedGroup, setSelectedGroup] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleImport = () => {
    if (selectedFile) {
      console.log("Importing file:", selectedFile.name);
      console.log("Selected group:", selectedGroup);
      // Handle import logic here
    }
  };

  const downloadSampleFile = () => {
    // Create and download sample CSV
    const csvContent = "name,phone\nJohn Doe,+15551234567\nJane Smith,+15551234568";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_contacts.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contacts Import - Flaxxa Wapi</h1>
        </div>
        <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white">
          Logs
        </Button>
      </div>

      {/* Main Import Form */}
      <Card className="max-w-4xl mx-auto shadow-sm">
        <CardContent className="p-8">
          <div className="space-y-8">
            {/* Title */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Contacts Import</h2>
            </div>

            {/* CSV File Upload Section */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="csvFile" className="text-sm font-medium">
                  CSV file <span className="text-red-500">*</span>
                </Label>
                <div className="mt-2">
                  <input
                    type="file"
                    id="csvFile"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="csvFile"
                    className="flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <Upload className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">Choose File</span>
                    <span className="text-gray-500">
                      {selectedFile ? selectedFile.name : "No file chosen"}
                    </span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">Headers phone,name</p>
                </div>
              </div>

              {/* Group Selection */}
              <div>
                <Label htmlFor="group" className="text-sm font-medium">
                  Group to insert into
                </Label>
                <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select Group to insert into" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vip">VIP</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="prospect">Prospect</SelectItem>
                    <SelectItem value="new">New Contacts</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Action Elements */}
              <div className="flex items-center justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={downloadSampleFile}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Sample file
                </Button>

                <Button
                  onClick={handleImport}
                  disabled={!selectedFile}
                  className="bg-[#16a34a] hover:bg-[#15803d] text-white px-8 py-3"
                >
                  Import contact
                </Button>
              </div>
            </div>

            {/* Instructions Section */}
            <div className="border-t border-gray-200 pt-8">
              <div className="text-right mb-4">
                <h3 className="text-lg font-bold text-gray-900">Instructions</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <button
                      onClick={downloadSampleFile}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Download sample file
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <p className="text-gray-700">
                    Make sure your CSV file has header with 'name' and 'phone' field
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <p className="text-gray-700">
                    Number format should be as: +15551234567
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4">
        <div className="text-sm text-gray-500">
          https://wapi.flaxxa.com/contacts/import
        </div>
        <div className="text-sm text-gray-500">
          1/1
        </div>
      </div>

      {/* Floating Star Icon */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2">
        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
          <Star className="w-5 h-5 text-yellow-600 fill-current" />
        </div>
      </div>
    </div>
  );
};

export default ContactsImport;
