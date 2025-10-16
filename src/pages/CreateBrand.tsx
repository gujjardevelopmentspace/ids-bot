import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Star } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateBrand = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isEditMode = location.state?.editMode || false;
  const brandData = location.state?.brandData || null;

  const [formData, setFormData] = useState({
    brandName: "",
    brandLogo: null as File | null,
    companyName: "",
    email: "",
    brandDescription: "",
    timezone: "",
    phone: "918519981421",
    emailNotification: "Yes"
  });

  // Pre-fill form data if in edit mode
  useEffect(() => {
    if (isEditMode && brandData) {
      setFormData({
        brandName: brandData.brandName || "",
        brandLogo: null,
        companyName: brandData.companyName || "",
        email: brandData.email || "",
        brandDescription: brandData.brandDescription || "",
        timezone: brandData.timezone || "",
        phone: brandData.phone || "918519981421",
        emailNotification: brandData.emailNotification || "Yes"
      });
    }
  }, [isEditMode, brandData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      brandLogo: file
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode) {
      toast.success(`Brand "${formData.brandName}" updated successfully!`);
      console.log("Brand updated:", formData);
    } else {
      toast.success(`Brand "${formData.brandName}" created successfully!`);
      console.log("Brand created:", formData);
    }
    // Navigate back to brands list
    navigate('/brand');
  };

  return (
    <div className="page-container" id="branding-create-page" data-testid="branding-create-page">
      {/* Header */}
      <div className="page-header" id="branding-create-header" data-testid="branding-create-header">
        <h1 className="page-title-gray" id="branding-create-title" data-testid="branding-create-title">
          {isEditMode ? `Edit Brand: ${brandData?.brandName || 'Brand'}` : 'Create Brand'}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Form */}
        <Card className="flex-1" id="branding-create-form-card" data-testid="branding-create-form-card">
          <CardHeader>
            <CardTitle>Create Brand</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6" id="branding-create-form" data-testid="branding-create-form">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Brand Name */}
                  <div id="branding-field-brandName" data-testid="branding-field-brandName">
                    <Label htmlFor="brandName" className="text-sm font-medium">
                      Brand Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="brandName"
                      placeholder="Enter Brand Name"
                      value={formData.brandName}
                      onChange={(e) => handleInputChange('brandName', e.target.value)}
                      className="mt-1"
                      data-testid="branding-input-brandName"
                      required
                    />
                  </div>

                  {/* Brand Logo */}
                  <div id="branding-field-brandLogo" data-testid="branding-field-brandLogo">
                    <Label htmlFor="brandLogo" className="text-sm font-medium">
                      Brand Logo
                    </Label>
                    <div className="mt-1">
                      <input
                        type="file"
                        id="brandLogo"
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                        data-testid="branding-input-brandLogo"
                      />
                      <label
                        htmlFor="brandLogo"
                        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                        id="branding-button-brandLogo"
                        data-testid="branding-button-brandLogo"
                      >
                        <Upload className="w-4 h-4" />
                        <span className="text-sm text-gray-600">
                          {formData.brandLogo ? formData.brandLogo.name : "Choose File"}
                        </span>
                      </label>
                      {!formData.brandLogo && (
                        <p className="text-xs text-gray-500 mt-1">No file chosen</p>
                      )}
                    </div>
                  </div>

                  {/* Company Name */}
                  <div id="branding-field-companyName" data-testid="branding-field-companyName">
                    <Label htmlFor="companyName" className="text-sm font-medium">
                      Company Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="companyName"
                      placeholder="Enter Company Name"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className="mt-1"
                      data-testid="branding-input-companyName"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div id="branding-field-email" data-testid="branding-field-email">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Add Email (If this field is empty then chat inbox messages is send to default login email.)
                    </Label>
                    <Input
                      id="email"
                      placeholder="example@gmail.com, example2@gr"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-1"
                      data-testid="branding-input-email"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Brand Description */}
                  <div id="branding-field-brandDescription" data-testid="branding-field-brandDescription">
                    <Label htmlFor="brandDescription" className="text-sm font-medium">
                      Brand Description
                    </Label>
                    <Textarea
                      id="brandDescription"
                      placeholder="Enter Brand Description"
                      value={formData.brandDescription}
                      onChange={(e) => handleInputChange('brandDescription', e.target.value)}
                      className="mt-1"
                      rows={4}
                      data-testid="branding-input-brandDescription"
                    />
                  </div>

                  {/* Timezone */}
                  <div id="branding-field-timezone" data-testid="branding-field-timezone">
                    <Label htmlFor="timezone" className="text-sm font-medium">
                      Timezone <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
                      <SelectTrigger className="mt-1" id="branding-input-timezone" data-testid="branding-input-timezone">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                        <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                        <SelectItem value="CST">Central Time (CST)</SelectItem>
                        <SelectItem value="MST">Mountain Time (MST)</SelectItem>
                        <SelectItem value="GMT">Greenwich Mean Time (GMT)</SelectItem>
                        <SelectItem value="IST">India Standard Time (IST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Phone */}
                  <div id="branding-field-phone" data-testid="branding-field-phone">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="mt-1"
                      data-testid="branding-input-phone"
                      required
                    />
                  </div>

                  {/* Email Notification */}
                  <div id="branding-field-emailNotification" data-testid="branding-field-emailNotification">
                    <Label htmlFor="emailNotification" className="text-sm font-medium">
                      Email Notification (If you you want email notification of every new message)
                    </Label>
                    <Select value={formData.emailNotification} onValueChange={(value) => handleInputChange('emailNotification', value)}>
                      <SelectTrigger className="mt-1" id="branding-input-emailNotification" data-testid="branding-input-emailNotification">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button 
                  type="submit" 
                  className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white"
                  id="branding-create-submit"
                  data-testid="branding-create-submit"
                >
                  {isEditMode ? 'Update Brand' : 'Create Brand'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Instructions Panel */}
        <Card className="w-80 bg-gray-50 border-dashed border-gray-300" id="branding-create-instructions" data-testid="branding-create-instructions">
          <CardHeader>
            <CardTitle className="text-lg">Create Brand Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Enter your brand name, description & logo.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Select your preferred time zone.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Enter your company name.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Enter your phone number For example, a US number 555-123-4567 should be formatted as +15551234567</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Star Icon */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2" id="branding-create-star" data-testid="branding-create-star">
        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
          <Star className="w-5 h-5 text-yellow-600 fill-current" />
        </div>
      </div>
    </div>
  );
};

export default CreateBrand;
