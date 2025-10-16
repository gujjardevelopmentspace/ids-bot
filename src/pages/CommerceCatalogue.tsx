import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Search,
  X,
  ChevronUp,
  ChevronDown,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Star,
  Plus,
  Edit,
  Trash2,
  Copy,
  Eye,
  MoreVertical,
  Package,
  DollarSign,
  Calendar,
  User,
  CreditCard
} from "lucide-react";

interface CatalogueItem {
  id: string;
  sno: number;
  image: string;
  retailerId: string;
  itemName: string;
  itemDescription: string;
  price: number;
  condition: 'new' | 'used' | 'refurbished';
  availability: 'in_stock' | 'out_of_stock' | 'limited';
  createdAt: string;
}

interface Order {
  id: string;
  createdAt: string;
  orderId: string;
  orderStatus: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  totalPrice: number;
  transactionId: string;
  customerName: string;
  customerEmail: string;
  items: CatalogueItem[];
}

const CommerceCatalogue = () => {
  const [activeTab, setActiveTab] = useState<'facebook' | 'catalogue' | 'orders'>('facebook');
  const [searchTerm, setSearchTerm] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  
  // Catalogue Items State
  const [catalogueItems, setCatalogueItems] = useState<CatalogueItem[]>(() => {
    const saved = localStorage.getItem('catalogueItems');
    return saved ? JSON.parse(saved) : [
      {
        id: "1",
        sno: 1,
        image: "📱",
        retailerId: "RET001",
        itemName: "iPhone 15 Pro",
        itemDescription: "Latest iPhone with advanced camera system",
        price: 999.99,
        condition: "new",
        availability: "in_stock",
        createdAt: "2025-01-14"
      },
      {
        id: "2",
        sno: 2,
        image: "💻",
        retailerId: "RET002",
        itemName: "MacBook Pro M3",
        itemDescription: "Powerful laptop for professionals",
        price: 1999.99,
        condition: "new",
        availability: "in_stock",
        createdAt: "2025-01-14"
      },
      {
        id: "3",
        sno: 3,
        image: "🎧",
        retailerId: "RET003",
        itemName: "AirPods Pro",
        itemDescription: "Wireless earbuds with noise cancellation",
        price: 249.99,
        condition: "new",
        availability: "limited",
        createdAt: "2025-01-14"
      }
    ];
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [
      {
        id: "1",
        createdAt: "2025-01-14T10:30:00Z",
        orderId: "ORD-001",
        orderStatus: "confirmed",
        paymentStatus: "paid",
        totalPrice: 1249.98,
        transactionId: "TXN-001",
        customerName: "John Doe",
        customerEmail: "john@example.com",
        items: []
      },
      {
        id: "2",
        createdAt: "2025-01-14T14:15:00Z",
        orderId: "ORD-002",
        orderStatus: "shipped",
        paymentStatus: "paid",
        totalPrice: 1999.99,
        transactionId: "TXN-002",
        customerName: "Jane Smith",
        customerEmail: "jane@example.com",
        items: []
      },
      {
        id: "3",
        createdAt: "2025-01-14T16:45:00Z",
        orderId: "ORD-003",
        orderStatus: "pending",
        paymentStatus: "pending",
        totalPrice: 249.99,
        transactionId: "TXN-003",
        customerName: "Bob Johnson",
        customerEmail: "bob@example.com",
        items: []
      }
    ];
  });

  // Modal States
  const [isCreateItemModalOpen, setIsCreateItemModalOpen] = useState(false);
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [isCreateOrderModalOpen, setIsCreateOrderModalOpen] = useState(false);
  const [isEditOrderModalOpen, setIsEditOrderModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CatalogueItem | null>(null);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  // Form States
  const [itemForm, setItemForm] = useState({
    retailerId: "",
    itemName: "",
    itemDescription: "",
    price: "",
    condition: "new" as CatalogueItem['condition'],
    availability: "in_stock" as CatalogueItem['availability']
  });

  const [orderForm, setOrderForm] = useState({
    orderId: "",
    orderStatus: "pending" as Order['orderStatus'],
    paymentStatus: "pending" as Order['paymentStatus'],
    totalPrice: "",
    transactionId: "",
    customerName: "",
    customerEmail: ""
  });

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentOrderPage, setCurrentOrderPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(10);

  // Persist data to localStorage
  useEffect(() => {
    localStorage.setItem('catalogueItems', JSON.stringify(catalogueItems));
  }, [catalogueItems]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const clearFilters = () => {
    setOrderStatus("");
    setPaymentStatus("");
  };

  // Filter and search functions
  const filteredCatalogueItems = catalogueItems.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.retailerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.itemDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOrders = orders.filter(order => {
    const matchesStatus = !orderStatus || order.orderStatus === orderStatus;
    const matchesPayment = !paymentStatus || order.paymentStatus === paymentStatus;
    return matchesStatus && matchesPayment;
  });

  // Pagination calculations
  const totalCataloguePages = Math.ceil(filteredCatalogueItems.length / itemsPerPage);
  const totalOrderPages = Math.ceil(filteredOrders.length / ordersPerPage);
  
  const paginatedCatalogueItems = filteredCatalogueItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginatedOrders = filteredOrders.slice(
    (currentOrderPage - 1) * ordersPerPage,
    currentOrderPage * ordersPerPage
  );

  // CRUD Operations for Catalogue Items
  const handleCreateItem = () => {
    if (!itemForm.itemName || !itemForm.retailerId || !itemForm.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newItem: CatalogueItem = {
      id: Date.now().toString(),
      sno: catalogueItems.length + 1,
      image: "📦",
      retailerId: itemForm.retailerId,
      itemName: itemForm.itemName,
      itemDescription: itemForm.itemDescription,
      price: parseFloat(itemForm.price),
      condition: itemForm.condition,
      availability: itemForm.availability,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCatalogueItems([...catalogueItems, newItem]);
    setItemForm({
      retailerId: "",
      itemName: "",
      itemDescription: "",
      price: "",
      condition: "new",
      availability: "in_stock"
    });
    setIsCreateItemModalOpen(false);
    toast.success("Catalogue item created successfully");
  };

  const handleEditItem = (item: CatalogueItem) => {
    setEditingItem(item);
    setItemForm({
      retailerId: item.retailerId,
      itemName: item.itemName,
      itemDescription: item.itemDescription,
      price: item.price.toString(),
      condition: item.condition,
      availability: item.availability
    });
    setIsEditItemModalOpen(true);
  };

  const handleUpdateItem = () => {
    if (!editingItem) return;

    const updatedItems = catalogueItems.map(item =>
      item.id === editingItem.id
        ? {
            ...item,
            retailerId: itemForm.retailerId,
            itemName: itemForm.itemName,
            itemDescription: itemForm.itemDescription,
            price: parseFloat(itemForm.price),
            condition: itemForm.condition,
            availability: itemForm.availability
          }
        : item
    );

    setCatalogueItems(updatedItems);
    setIsEditItemModalOpen(false);
    setEditingItem(null);
    toast.success("Catalogue item updated successfully");
  };

  const handleDeleteItem = (id: string) => {
    setCatalogueItems(catalogueItems.filter(item => item.id !== id));
    toast.success("Catalogue item deleted successfully");
  };

  const handleDuplicateItem = (item: CatalogueItem) => {
    const duplicatedItem: CatalogueItem = {
      ...item,
      id: Date.now().toString(),
      sno: catalogueItems.length + 1,
      itemName: `${item.itemName} (Copy)`
    };
    setCatalogueItems([...catalogueItems, duplicatedItem]);
    toast.success("Catalogue item duplicated successfully");
  };

  // CRUD Operations for Orders
  const handleCreateOrder = () => {
    if (!orderForm.orderId || !orderForm.customerName || !orderForm.totalPrice) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newOrder: Order = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      orderId: orderForm.orderId,
      orderStatus: orderForm.orderStatus,
      paymentStatus: orderForm.paymentStatus,
      totalPrice: parseFloat(orderForm.totalPrice),
      transactionId: orderForm.transactionId,
      customerName: orderForm.customerName,
      customerEmail: orderForm.customerEmail,
      items: []
    };

    setOrders([...orders, newOrder]);
    setOrderForm({
      orderId: "",
      orderStatus: "pending",
      paymentStatus: "pending",
      totalPrice: "",
      transactionId: "",
      customerName: "",
      customerEmail: ""
    });
    setIsCreateOrderModalOpen(false);
    toast.success("Order created successfully");
  };

  const handleEditOrder = (order: Order) => {
    setEditingOrder(order);
    setOrderForm({
      orderId: order.orderId,
      orderStatus: order.orderStatus,
      paymentStatus: order.paymentStatus,
      totalPrice: order.totalPrice.toString(),
      transactionId: order.transactionId,
      customerName: order.customerName,
      customerEmail: order.customerEmail
    });
    setIsEditOrderModalOpen(true);
  };

  const handleUpdateOrder = () => {
    if (!editingOrder) return;

    const updatedOrders = orders.map(order =>
      order.id === editingOrder.id
        ? {
            ...order,
            orderId: orderForm.orderId,
            orderStatus: orderForm.orderStatus,
            paymentStatus: orderForm.paymentStatus,
            totalPrice: parseFloat(orderForm.totalPrice),
            transactionId: orderForm.transactionId,
            customerName: orderForm.customerName,
            customerEmail: orderForm.customerEmail
          }
        : order
    );

    setOrders(updatedOrders);
    setIsEditOrderModalOpen(false);
    setEditingOrder(null);
    toast.success("Order updated successfully");
  };

  const handleDeleteOrder = (id: string) => {
    setOrders(orders.filter(order => order.id !== id));
    toast.success("Order deleted successfully");
  };

  // Helper functions
  const getStatusBadge = (status: string, type: 'order' | 'payment') => {
    const colors = {
      order: {
        pending: "bg-yellow-100 text-yellow-800",
        confirmed: "bg-blue-100 text-blue-800",
        shipped: "bg-purple-100 text-purple-800",
        delivered: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800"
      },
      payment: {
        pending: "bg-yellow-100 text-yellow-800",
        paid: "bg-green-100 text-green-800",
        failed: "bg-red-100 text-red-800",
        refunded: "bg-gray-100 text-gray-800"
      }
    };
    
    const colorClass = colors[type][status as keyof typeof colors[typeof type]] || "bg-gray-100 text-gray-800";
    return <Badge className={colorClass}>{status}</Badge>;
  };

  const getAvailabilityBadge = (availability: string) => {
    const colors = {
      in_stock: "bg-green-100 text-green-800",
      out_of_stock: "bg-red-100 text-red-800",
      limited: "bg-yellow-100 text-yellow-800"
    };
    return <Badge className={colors[availability as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{availability.replace('_', ' ')}</Badge>;
  };

  const getConditionBadge = (condition: string) => {
    const colors = {
      new: "bg-green-100 text-green-800",
      used: "bg-yellow-100 text-yellow-800",
      refurbished: "bg-blue-100 text-blue-800"
    };
    return <Badge className={colors[condition as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{condition}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Commerce Catalogue - Flaxxa Wapi</h1>
        </div>
        <Button className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white">
          Upgrade
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1">
        <button
          onClick={() => setActiveTab('facebook')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === 'facebook' 
              ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Facebook Catalogue
        </button>
        <button
          onClick={() => setActiveTab('catalogue')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === 'catalogue' 
              ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Manage Catalogue Item
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === 'orders' 
              ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Manage Orders
        </button>
      </div>

      {/* Facebook Catalogue Tab */}
      {activeTab === 'facebook' && (
        <Card className="shadow-sm">
          <CardContent className="p-8">
            {/* Title */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Facebook Catalogue</h2>
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className="text-gray-700 text-lg">
                Create Facebook catalog to send products and collections in whatsapp messages to your users in just a click.
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Connect wapi to Facebook (OAuth).</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Map Catalogue to WABA registered with Wapi.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Start sharing the products with your users.</p>
              </div>
            </div>

            {/* Upgrade Button */}
            <div className="flex justify-start">
              <Button className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white px-6 py-2">
                Upgrade
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Manage Catalogue Item Tab */}
      {activeTab === 'catalogue' && (
        <Card className="shadow-sm">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Manage Catalogue Item</h2>
              <div className="flex gap-2">
                <Dialog open={isCreateItemModalOpen} onOpenChange={setIsCreateItemModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Item
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create New Catalogue Item</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="retailerId">Retailer ID *</Label>
                        <Input
                          id="retailerId"
                          value={itemForm.retailerId}
                          onChange={(e) => setItemForm({...itemForm, retailerId: e.target.value})}
                          placeholder="e.g., RET001"
                        />
                      </div>
                      <div>
                        <Label htmlFor="itemName">Item Name *</Label>
                        <Input
                          id="itemName"
                          value={itemForm.itemName}
                          onChange={(e) => setItemForm({...itemForm, itemName: e.target.value})}
                          placeholder="e.g., iPhone 15 Pro"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="itemDescription">Item Description</Label>
                        <Textarea
                          id="itemDescription"
                          value={itemForm.itemDescription}
                          onChange={(e) => setItemForm({...itemForm, itemDescription: e.target.value})}
                          placeholder="Describe the item..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="price">Price *</Label>
                        <Input
                          id="price"
                          type="number"
                          value={itemForm.price}
                          onChange={(e) => setItemForm({...itemForm, price: e.target.value})}
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <Label htmlFor="condition">Condition</Label>
                        <Select value={itemForm.condition} onValueChange={(value) => setItemForm({...itemForm, condition: value as CatalogueItem['condition']})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="used">Used</SelectItem>
                            <SelectItem value="refurbished">Refurbished</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="availability">Availability</Label>
                        <Select value={itemForm.availability} onValueChange={(value) => setItemForm({...itemForm, availability: value as CatalogueItem['availability']})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="in_stock">In Stock</SelectItem>
                            <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                            <SelectItem value="limited">Limited</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" onClick={() => setIsCreateItemModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateItem} className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white">
                        Create Item
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white">
                  Order Automation Templates
                </Button>
              </div>
            </div>

            {/* Table Controls */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(parseInt(value))}>
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
                <span className="text-sm text-gray-600">Entries Per Page</span>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="search" className="text-sm">Search:</Label>
                <Input
                  id="search"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 p-3 text-left">
                      <div className="flex items-center gap-1">
                        Sno
                        <div className="flex flex-col">
                          <ChevronUp className="w-3 h-3" />
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </div>
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      <div className="flex items-center gap-1">
                        Images
                        <div className="flex flex-col">
                          <ChevronUp className="w-3 h-3" />
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </div>
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      <div className="flex items-center gap-1">
                        Retailer Id
                        <div className="flex flex-col">
                          <ChevronUp className="w-3 h-3" />
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </div>
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      <div className="flex items-center gap-1">
                        Item Name
                        <div className="flex flex-col">
                          <ChevronUp className="w-3 h-3" />
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </div>
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      <div className="flex items-center gap-1">
                        Item Description
                        <div className="flex flex-col">
                          <ChevronUp className="w-3 h-3" />
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </div>
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      <div className="flex items-center gap-1">
                        Price
                        <div className="flex flex-col">
                          <ChevronUp className="w-3 h-3" />
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </div>
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      <div className="flex items-center gap-1">
                        Condition
                        <div className="flex flex-col">
                          <ChevronUp className="w-3 h-3" />
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </div>
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      <div className="flex items-center gap-1">
                        Availability
                        <div className="flex flex-col">
                          <ChevronUp className="w-3 h-3" />
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </div>
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      <div className="flex items-center gap-1">
                        Act
                        <div className="flex flex-col">
                          <ChevronUp className="w-3 h-3" />
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCatalogueItems.length > 0 ? (
                    paginatedCatalogueItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-3">{item.sno}</td>
                        <td className="border border-gray-300 p-3 text-2xl">{item.image}</td>
                        <td className="border border-gray-300 p-3 font-mono text-sm">{item.retailerId}</td>
                        <td className="border border-gray-300 p-3 font-medium">{item.itemName}</td>
                        <td className="border border-gray-300 p-3 text-sm text-gray-600 max-w-xs truncate">{item.itemDescription}</td>
                        <td className="border border-gray-300 p-3 font-semibold">${item.price.toFixed(2)}</td>
                        <td className="border border-gray-300 p-3">{getConditionBadge(item.condition)}</td>
                        <td className="border border-gray-300 p-3">{getAvailabilityBadge(item.availability)}</td>
                        <td className="border border-gray-300 p-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => handleEditItem(item)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDuplicateItem(item)}>
                                <Copy className="w-4 h-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteItem(item.id)} className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="border border-gray-300 p-8 text-center text-gray-500">
                        No data available in table
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-600">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCatalogueItems.length)} of {filteredCatalogueItems.length} entries
              </div>
              <div className="flex items-center gap-1">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  <ChevronsLeft className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalCataloguePages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentPage(totalCataloguePages)}
                  disabled={currentPage === totalCataloguePages}
                >
                  <ChevronsRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Manage Orders Tab */}
      {activeTab === 'orders' && (
        <Card className="shadow-sm">
          <CardContent className="p-6">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Manage Orders</h2>
                <Dialog open={isCreateOrderModalOpen} onOpenChange={setIsCreateOrderModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Order
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create New Order</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="orderId">Order ID *</Label>
                        <Input
                          id="orderId"
                          value={orderForm.orderId}
                          onChange={(e) => setOrderForm({...orderForm, orderId: e.target.value})}
                          placeholder="e.g., ORD-001"
                        />
                      </div>
                      <div>
                        <Label htmlFor="customerName">Customer Name *</Label>
                        <Input
                          id="customerName"
                          value={orderForm.customerName}
                          onChange={(e) => setOrderForm({...orderForm, customerName: e.target.value})}
                          placeholder="e.g., John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="customerEmail">Customer Email</Label>
                        <Input
                          id="customerEmail"
                          type="email"
                          value={orderForm.customerEmail}
                          onChange={(e) => setOrderForm({...orderForm, customerEmail: e.target.value})}
                          placeholder="e.g., john@example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="totalPrice">Total Price *</Label>
                        <Input
                          id="totalPrice"
                          type="number"
                          value={orderForm.totalPrice}
                          onChange={(e) => setOrderForm({...orderForm, totalPrice: e.target.value})}
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <Label htmlFor="transactionId">Transaction ID</Label>
                        <Input
                          id="transactionId"
                          value={orderForm.transactionId}
                          onChange={(e) => setOrderForm({...orderForm, transactionId: e.target.value})}
                          placeholder="e.g., TXN-001"
                        />
                      </div>
                      <div>
                        <Label htmlFor="orderStatus">Order Status</Label>
                        <Select value={orderForm.orderStatus} onValueChange={(value) => setOrderForm({...orderForm, orderStatus: value as Order['orderStatus']})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="paymentStatus">Payment Status</Label>
                        <Select value={orderForm.paymentStatus} onValueChange={(value) => setOrderForm({...orderForm, paymentStatus: value as Order['paymentStatus']})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                            <SelectItem value="refunded">Refunded</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" onClick={() => setIsCreateOrderModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateOrder} className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white">
                        Create Order
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Filter Section */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="order-status" className="text-sm font-medium">
                    Order Status:
                  </Label>
                  <Select value={orderStatus} onValueChange={setOrderStatus}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select Order Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="payment-status" className="text-sm font-medium">
                    Payment Status:
                  </Label>
                  <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select Payment Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
                <Button variant="outline" onClick={clearFilters}>
                  <X className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>

            {/* Table Controls */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Select value={ordersPerPage.toString()} onValueChange={(value) => setOrdersPerPage(parseInt(value))}>
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
                <span className="text-sm text-gray-600">Entries Per Page</span>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="search-orders" className="text-sm">Search:</Label>
                <Input
                  id="search-orders"
                  placeholder="Search..."
                  className="w-64"
                />
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 p-3 text-left">
                      <div className="flex items-center gap-1">
                        Created At
                        <div className="flex flex-col">
                          <ChevronUp className="w-3 h-3" />
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </div>
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      <div className="flex items-center gap-1">
                        Order Id
                        <div className="flex flex-col">
                          <ChevronUp className="w-3 h-3" />
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </div>
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      <div className="flex items-center gap-1">
                        Order Status
                        <div className="flex flex-col">
                          <ChevronUp className="w-3 h-3" />
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </div>
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      <div className="flex items-center gap-1">
                        Payment Status
                        <div className="flex flex-col">
                          <ChevronUp className="w-3 h-3" />
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </div>
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      <div className="flex items-center gap-1">
                        Total Order Price
                        <div className="flex flex-col">
                          <ChevronUp className="w-3 h-3" />
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </div>
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      <div className="flex items-center gap-1">
                        Transaction ID
                        <div className="flex flex-col">
                          <ChevronUp className="w-3 h-3" />
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </div>
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      <div className="flex items-center gap-1">
                        Action
                        <div className="flex flex-col">
                          <ChevronUp className="w-3 h-3" />
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders.length > 0 ? (
                    paginatedOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-3 text-sm">{formatDateTime(order.createdAt)}</td>
                        <td className="border border-gray-300 p-3 font-mono text-sm">{order.orderId}</td>
                        <td className="border border-gray-300 p-3">{getStatusBadge(order.orderStatus, 'order')}</td>
                        <td className="border border-gray-300 p-3">{getStatusBadge(order.paymentStatus, 'payment')}</td>
                        <td className="border border-gray-300 p-3 font-semibold">${order.totalPrice.toFixed(2)}</td>
                        <td className="border border-gray-300 p-3 font-mono text-sm">{order.transactionId}</td>
                        <td className="border border-gray-300 p-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => handleEditOrder(order)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteOrder(order.id)} className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="border border-gray-300 p-8 text-center text-gray-500">
                        No data available in table
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-600">
                Showing {(currentOrderPage - 1) * ordersPerPage + 1} to {Math.min(currentOrderPage * ordersPerPage, filteredOrders.length)} of {filteredOrders.length} entries
              </div>
              <div className="flex items-center gap-1">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentOrderPage(1)}
                  disabled={currentOrderPage === 1}
                >
                  <ChevronsLeft className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentOrderPage(currentOrderPage - 1)}
                  disabled={currentOrderPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentOrderPage(currentOrderPage + 1)}
                  disabled={currentOrderPage === totalOrderPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentOrderPage(totalOrderPages)}
                  disabled={currentOrderPage === totalOrderPages}
                >
                  <ChevronsRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Floating Star Icon */}
            <div className="absolute bottom-6 right-6">
              <Button size="sm" className="w-10 h-10 bg-gray-800 hover:bg-gray-900 text-yellow-400 p-0">
                <Star className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Catalogue Item Modal */}
      <Dialog open={isEditItemModalOpen} onOpenChange={setIsEditItemModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Catalogue Item</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-retailerId">Retailer ID *</Label>
              <Input
                id="edit-retailerId"
                value={itemForm.retailerId}
                onChange={(e) => setItemForm({...itemForm, retailerId: e.target.value})}
                placeholder="e.g., RET001"
              />
            </div>
            <div>
              <Label htmlFor="edit-itemName">Item Name *</Label>
              <Input
                id="edit-itemName"
                value={itemForm.itemName}
                onChange={(e) => setItemForm({...itemForm, itemName: e.target.value})}
                placeholder="e.g., iPhone 15 Pro"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="edit-itemDescription">Item Description</Label>
              <Textarea
                id="edit-itemDescription"
                value={itemForm.itemDescription}
                onChange={(e) => setItemForm({...itemForm, itemDescription: e.target.value})}
                placeholder="Describe the item..."
              />
            </div>
            <div>
              <Label htmlFor="edit-price">Price *</Label>
              <Input
                id="edit-price"
                type="number"
                value={itemForm.price}
                onChange={(e) => setItemForm({...itemForm, price: e.target.value})}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="edit-condition">Condition</Label>
              <Select value={itemForm.condition} onValueChange={(value) => setItemForm({...itemForm, condition: value as CatalogueItem['condition']})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="used">Used</SelectItem>
                  <SelectItem value="refurbished">Refurbished</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-availability">Availability</Label>
              <Select value={itemForm.availability} onValueChange={(value) => setItemForm({...itemForm, availability: value as CatalogueItem['availability']})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in_stock">In Stock</SelectItem>
                  <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                  <SelectItem value="limited">Limited</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsEditItemModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateItem} className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white">
              Update Item
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Order Modal */}
      <Dialog open={isEditOrderModalOpen} onOpenChange={setIsEditOrderModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Order</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-orderId">Order ID *</Label>
              <Input
                id="edit-orderId"
                value={orderForm.orderId}
                onChange={(e) => setOrderForm({...orderForm, orderId: e.target.value})}
                placeholder="e.g., ORD-001"
              />
            </div>
            <div>
              <Label htmlFor="edit-customerName">Customer Name *</Label>
              <Input
                id="edit-customerName"
                value={orderForm.customerName}
                onChange={(e) => setOrderForm({...orderForm, customerName: e.target.value})}
                placeholder="e.g., John Doe"
              />
            </div>
            <div>
              <Label htmlFor="edit-customerEmail">Customer Email</Label>
              <Input
                id="edit-customerEmail"
                type="email"
                value={orderForm.customerEmail}
                onChange={(e) => setOrderForm({...orderForm, customerEmail: e.target.value})}
                placeholder="e.g., john@example.com"
              />
            </div>
            <div>
              <Label htmlFor="edit-totalPrice">Total Price *</Label>
              <Input
                id="edit-totalPrice"
                type="number"
                value={orderForm.totalPrice}
                onChange={(e) => setOrderForm({...orderForm, totalPrice: e.target.value})}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="edit-transactionId">Transaction ID</Label>
              <Input
                id="edit-transactionId"
                value={orderForm.transactionId}
                onChange={(e) => setOrderForm({...orderForm, transactionId: e.target.value})}
                placeholder="e.g., TXN-001"
              />
            </div>
            <div>
              <Label htmlFor="edit-orderStatus">Order Status</Label>
              <Select value={orderForm.orderStatus} onValueChange={(value) => setOrderForm({...orderForm, orderStatus: value as Order['orderStatus']})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-paymentStatus">Payment Status</Label>
              <Select value={orderForm.paymentStatus} onValueChange={(value) => setOrderForm({...orderForm, paymentStatus: value as Order['paymentStatus']})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsEditOrderModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateOrder} className="bg-black hover:bg-gray-800 text-white shadow-lg shadow-blue-500/25 text-white">
              Update Order
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommerceCatalogue;
