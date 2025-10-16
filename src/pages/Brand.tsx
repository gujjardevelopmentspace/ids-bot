import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Tag, 
  Search,
  Eye,
  Edit,
  Settings,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Plus
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Brand = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const brands = [
    {
      id: 1,
      brandName: "Inventor Design Studio",
      companyName: "inventor design studio",
      phone: "37044417882",
      creationDate: "Thursday, October 9, 2025 1:11 AM",
      status: "Active"
    }
  ];

  const totalEntries = brands.length;
  const entriesPerPageNum = parseInt(entriesPerPage);
  const totalPages = Math.ceil(totalEntries / entriesPerPageNum);
  const startEntry = (currentPage - 1) * entriesPerPageNum + 1;
  const endEntry = Math.min(currentPage * entriesPerPageNum, totalEntries);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleViewBrand = (brandId: number) => {
    const brand = brands.find(b => b.id === brandId);
    if (brand) {
      toast.success(`Viewing brand: ${brand.brandName}`);
      // For now, show brand details in a modal or navigate to details page
      // navigate(`/brand/${brandId}`);
    }
  };

  const handleEditBrand = (brandId: number) => {
    const brand = brands.find(b => b.id === brandId);
    if (brand) {
      toast.success(`Opening edit form for: ${brand.brandName}`);
      // Navigate to edit brand page with pre-filled data
      navigate('/create-brand', { 
        state: { 
          editMode: true, 
          brandData: brand 
        } 
      });
    }
  };

  const handleBrandSettings = (brandId: number) => {
    const brand = brands.find(b => b.id === brandId);
    if (brand) {
      toast.success(`Opening settings for: ${brand.brandName}`);
      // Navigate to brand settings page
      navigate('/wapi-settings', { 
        state: { 
          brandId: brandId,
          brandName: brand.brandName 
        } 
      });
    }
  };

  const handleDeleteBrand = (brandId: number) => {
    const brand = brands.find(b => b.id === brandId);
    if (brand) {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete the brand "${brand.brandName}"?\n\nThis action cannot be undone.`
      );
      
      if (confirmDelete) {
        toast.success(`Brand "${brand.brandName}" has been deleted successfully`);
        // Here you would typically make an API call to delete the brand
        // For now, we'll just show a success message
        console.log(`Deleting brand with ID: ${brandId}`);
      } else {
        toast.info('Brand deletion cancelled');
      }
    }
  };

  return (
    <div className="page-container" id="branding-page" data-testid="branding-page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" id="branding-header" data-testid="branding-header">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900" id="branding-title" data-testid="branding-title">Brands</h1>
        <Button 
          className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white"
          onClick={() => navigate('/create-brand')}
          id="branding-create-button"
          data-testid="branding-create-button"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Brand
        </Button>
      </div>

      {/* Table Card */}
      <Card className="shadow-sm" id="branding-table-card" data-testid="branding-table-card">
        <CardContent className="p-0">
          {/* Top Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 lg:p-6 border-b border-gray-200 gap-4" id="branding-controls" data-testid="branding-controls">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Entries Per Page</label>
              <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
                <SelectTrigger className="w-20" id="branding-entries-per-page" data-testid="branding-entries-per-page">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10" id="branding-epp-10">10</SelectItem>
                  <SelectItem value="25" id="branding-epp-25">25</SelectItem>
                  <SelectItem value="50" id="branding-epp-50">50</SelectItem>
                  <SelectItem value="100" id="branding-epp-100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="relative w-full sm:w-auto" id="branding-search" data-testid="branding-search">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
                id="branding-search-input"
                data-testid="branding-search-input"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto" id="branding-table-wrapper" data-testid="branding-table-wrapper">
            <table className="w-full" id="branding-table" data-testid="branding-table">
              <thead className="bg-gray-50" id="branding-table-head" data-testid="branding-table-head">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Id
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Brand Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Creation Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200" id="branding-table-body" data-testid="branding-table-body">
                {brands.map((brand) => (
                  <tr key={brand.id} className="hover:bg-gray-50" id={`branding-row-${brand.id}`} data-testid={`branding-row-${brand.id}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {brand.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900" id={`branding-name-${brand.id}`} data-testid={`branding-name-${brand.id}`}>{brand.brandName}</span>
                        <Badge className="bg-green-100 text-green-800 text-xs" id={`branding-status-${brand.id}`} data-testid={`branding-status-${brand.id}`}>
                          {brand.status}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {brand.companyName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {brand.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {brand.creationDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600" 
                          id={`branding-view-${brand.id}`} 
                          data-testid={`branding-view-${brand.id}`}
                          onClick={() => handleViewBrand(brand.id)}
                          title="View Brand"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600" 
                          id={`branding-edit-${brand.id}`} 
                          data-testid={`branding-edit-${brand.id}`}
                          onClick={() => handleEditBrand(brand.id)}
                          title="Edit Brand"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-gray-50 hover:text-gray-600" 
                          id={`branding-settings-${brand.id}`} 
                          data-testid={`branding-settings-${brand.id}`}
                          onClick={() => handleBrandSettings(brand.id)}
                          title="Brand Settings"
                        >
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50" 
                          id={`branding-delete-${brand.id}`} 
                          data-testid={`branding-delete-${brand.id}`}
                          onClick={() => handleDeleteBrand(brand.id)}
                          title="Delete Brand"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200" id="branding-pagination" data-testid="branding-pagination">
            <div className="text-sm text-gray-700">
              Showing {startEntry} to {endEntry} of {totalEntries} entry
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
                id="branding-page-prev"
                data-testid="branding-page-prev"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className={`h-8 w-8 p-0 ${
                    currentPage === page 
                      ? "bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white" 
                      : ""
                  }`}
                  id={`branding-page-${page}`}
                  data-testid={`branding-page-${page}`}
                >
                  {page}
                </Button>
              ))}
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
                id="branding-page-next"
                data-testid="branding-page-next"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4" id="branding-footer" data-testid="branding-footer">
        <div className="text-sm text-gray-500">
          https://wapi.flaxxa.com/brands/manage
        </div>
        <div className="text-sm text-gray-500">
          1/1
        </div>
      </div>
    </div>
  );
};

export default Brand;
