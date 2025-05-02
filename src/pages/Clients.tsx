import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus, Eye, Download, User, Edit, UploadCloud, Users, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

// Sample client data
const initialClientsData = [
  {
    id: "1",
    name: "Retail Corp SA",
    industry: "Retail",
    locations: 8,
    recentScore: 92,
    status: "active",
    contactName: "John Smith",
    contactEmail: "john@retailcorpsa.com",
    contactPhone: "+27 21 555 1234",
    businessAddress: "123 Main Road, Cape Town, South Africa",
    lastAudit: "2023-04-15",
    sites: [
      { id: "1-1", name: "Cape Town Central" },
      { id: "1-2", name: "Durban North" },
      { id: "1-3", name: "Johannesburg East" },
    ]
  },
  {
    id: "2",
    name: "QuickMart",
    industry: "Grocery",
    locations: 12,
    recentScore: 78,
    status: "active",
    contactName: "Sarah Johnson",
    contactEmail: "sarah@quickmart.co.za",
    contactPhone: "+27 11 444 5678",
    businessAddress: "45 Market St, Johannesburg, South Africa",
    lastAudit: "2023-05-02",
    sites: [
      { id: "2-1", name: "Sandton" },
      { id: "2-2", name: "Pretoria East" },
      { id: "2-3", name: "Bloemfontein" },
    ]
  },
  {
    id: "3",
    name: "EcoFuel",
    industry: "Energy",
    locations: 15,
    recentScore: 85,
    status: "active",
    contactName: "David Ndlovu",
    contactEmail: "david@ecofuel.com",
    contactPhone: "+27 31 333 9876",
    businessAddress: "78 Petroleum Road, Durban, South Africa",
    lastAudit: "2023-03-28",
    sites: [
      { id: "3-1", name: "Durban Central" },
      { id: "3-2", name: "Cape Town South" },
      { id: "3-3", name: "Port Elizabeth" },
    ]
  },
  {
    id: "4",
    name: "LuxCafé",
    industry: "Food & Beverage",
    locations: 5,
    recentScore: 89,
    status: "active",
    contactName: "Emily Davis",
    contactEmail: "emily@luxcafe.com",
    contactPhone: "+27 20 666 7890",
    businessAddress: "100 Coffee Lane, Johannesburg, South Africa",
    lastAudit: "2023-06-10",
    sites: [
      { id: "4-1", name: "Johannesburg Central" },
      { id: "4-2", name: "Cape Town West" },
    ]
  },
  {
    id: "5",
    name: "FreshGrocer",
    industry: "Grocery",
    locations: 7,
    recentScore: 82,
    status: "active",
    contactName: "Michael Brown",
    contactEmail: "michael@freshgrocer.com",
    contactPhone: "+27 12 345 6789",
    businessAddress: "50 Market St, Cape Town, South Africa",
    lastAudit: "2023-07-15",
    sites: [
      { id: "5-1", name: "Cape Town Central" },
      { id: "5-2", name: "Durban North" },
    ]
  },
  {
    id: "6",
    name: "HealthPharm",
    industry: "Healthcare",
    locations: 9,
    recentScore: 88,
    status: "active",
    contactName: "Linda Wilson",
    contactEmail: "linda@healthpharm.com",
    contactPhone: "+27 22 777 8901",
    businessAddress: "150 Medical Park, Johannesburg, South Africa",
    lastAudit: "2023-08-20",
    sites: [
      { id: "6-1", name: "Johannesburg Central" },
      { id: "6-2", name: "Cape Town West" },
    ]
  },
  {
    id: "7",
    name: "TechZone",
    industry: "Electronics",
    locations: 4,
    recentScore: 79,
    status: "inactive",
    contactName: "David Johnson",
    contactEmail: "david@techzone.com",
    contactPhone: "+27 23 888 9012",
    businessAddress: "200 Tech Park, Cape Town, South Africa",
    lastAudit: "2023-09-25",
    sites: [
      { id: "7-1", name: "Cape Town Central" },
    ]
  },
  {
    id: "8",
    name: "HomeStyle",
    industry: "Home Improvement",
    locations: 6,
    recentScore: 81,
    status: "active",
    contactName: "Sarah Lee",
    contactEmail: "sarah@homestyle.com",
    contactPhone: "+27 24 999 0123",
    businessAddress: "100 Home St, Cape Town, South Africa",
    lastAudit: "2023-10-10",
    sites: [
      { id: "8-1", name: "Cape Town Central" },
      { id: "8-2", name: "Durban North" },
    ]
  },
];

// Interface for the client object
interface Client {
  id: string;
  name: string;
  industry: string;
  locations: number;
  recentScore: number;
  status: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  businessAddress: string;
  lastAudit?: string;
  sites: { id: string; name: string; }[];
}

// Interface for site object
interface Site {
  id: string;
  name: string;
}

const Clients = () => {
  const [clients, setClients] = useState<Client[]>(initialClientsData);
  const [archivedClients, setArchivedClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [isEditClientOpen, setIsEditClientOpen] = useState(false);
  const [isViewClientOpen, setIsViewClientOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("active");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [newClient, setNewClient] = useState({
    name: "",
    industry: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    businessAddress: "",
    numberOfLocations: "1",
    sites: [],
  });
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportOptions, setReportOptions] = useState({
    client: "",
    site: "",
    startDate: "",
    endDate: "",
    format: "tables+charts",
    metrics: [] as string[],
    breakdown: "client",
  });

  const { toast } = useToast();
  const { hasPermission, currentUser } = useAuth();
  
  // Determine if user can manage clients
  const canManageClients = hasPermission("canEditClients");
  const isSuperUserOrManager = currentUser?.role === "superuser" || currentUser?.role === "manager";

  // Filter clients based on search term, industry, and active/archived status
  const getFilteredClients = (clientList: Client[]) => {
    return clientList.filter((client) => {
      const matchesSearch = client.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesIndustry =
        industryFilter === "all" || client.industry === industryFilter;
      return matchesSearch && matchesIndustry;
    });
  };

  const filteredActiveClients = getFilteredClients(clients);
  const filteredArchivedClients = getFilteredClients(archivedClients);

  // Get unique industries for the filter
  const industries = [...new Set(clients.map((client) => client.industry))];

  const handleAddClient = () => {
    if (!newClient.name || !newClient.industry) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const id = (clients.length + archivedClients.length + 1).toString();
    const newClientData: Client = {
      id,
      name: newClient.name,
      industry: newClient.industry,
      locations: parseInt(newClient.numberOfLocations) || 1,
      recentScore: 0,
      status: "active",
      contactName: newClient.contactName,
      contactEmail: newClient.contactEmail,
      contactPhone: newClient.contactPhone,
      businessAddress: newClient.businessAddress,
      sites: [],
    };

    setClients([...clients, newClientData]);
    setIsAddClientOpen(false);
    setNewClient({
      name: "",
      industry: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      businessAddress: "",
      numberOfLocations: "1",
      sites: [],
    });

    toast({
      title: "Client Added",
      description: `${newClient.name} has been added to your clients`,
    });
  };

  const handleEditClient = () => {
    if (!selectedClient) return;
    
    const updatedClients = clients.map(client =>
      client.id === selectedClient.id ? selectedClient : client
    );
    
    setClients(updatedClients);
    setIsEditClientOpen(false);
    
    toast({
      title: "Client Updated",
      description: `${selectedClient.name}'s information has been updated`,
    });
  };

  const handleViewClient = (client: Client) => {
    setSelectedClient(client);
    setIsViewClientOpen(true);
    setSelectedSite(client.sites.length > 0 ? client.sites[0].id : null);
  };

  const handleDownload = () => {
    toast({
      title: "Report Downloaded",
      description: "Client data has been downloaded successfully",
    });
  };

  const handleToggleClientStatus = (clientToToggle?: Client) => {
    const client = clientToToggle || selectedClient;
    if (!client) return;

    if (client.status === "active") {
      // Deactivate: remove from active, add to archived
      setClients(clients.filter(c => c.id !== client.id));
      setArchivedClients([...archivedClients, {...client, status: "inactive"}]);
      
      toast({
        title: "Client Deactivated",
        description: `${client.name} has been moved to archived clients`,
      });
    } else {
      // Reactivate: remove from archived, add to active
      setArchivedClients(archivedClients.filter(c => c.id !== client.id));
      setClients([...clients, {...client, status: "active"}]);
      
      toast({
        title: "Client Activated",
        description: `${client.name} has been moved to active clients`,
      });
    }
    
    setIsViewClientOpen(false);
  };

  const openEditDialog = (client: Client) => {
    setSelectedClient({...client});
    setIsEditClientOpen(true);
  };
  
  const handleGenerateReport = () => {
    if (!reportOptions.client || !reportOptions.startDate || !reportOptions.endDate || reportOptions.metrics.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to generate a report",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Report Generated",
      description: "Your report has been generated successfully",
    });
    
    setIsReportModalOpen(false);
  };

  const getScoreBadgeColor = (score: number) => {
    if (score === 0) return "bg-gray-100 text-gray-800";
    if (score >= 85) return "bg-green-100 text-green-800";
    if (score >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  // Function to check if the current user is the client's owner
  const isClientOwner = (client: Client) => {
    // In a real application, you'd match user ID with the client's owner ID
    // For now, we'll just return true for a manager or superuser
    return isSuperUserOrManager;
  };

  // Function to check if user can view the client
  const canViewClient = (client: Client) => {
    return hasPermission("canViewClients") || isClientOwner(client);
  };

  // Client table component based on status (active/archived)
  const ClientTable = ({ clients, status }: { clients: Client[]; status: 'active' | 'inactive' }) => {
    return (
      <div className="mt-4 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client Name</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Locations</TableHead>
              <TableHead>Recent Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.length > 0 ? (
              clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">
                    {client.name}
                  </TableCell>
                  <TableCell>{client.industry}</TableCell>
                  <TableCell>{client.locations}</TableCell>
                  <TableCell>
                    {client.recentScore > 0 ? (
                      <Badge
                        className={getScoreBadgeColor(client.recentScore)}
                      >
                        {client.recentScore}%
                      </Badge>
                    ) : (
                      "No data"
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        client.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {client.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      {canViewClient(client) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewClient(client)}
                        >
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      )}
                      
                      {canManageClients && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(client)}
                        >
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      )}
                      
                      {canManageClients && (
                        <Button
                          variant={status === "active" ? "destructive" : "default"}
                          size="sm"
                          onClick={() => handleToggleClientStatus(client)}
                        >
                          {status === "active" ? "Deactivate" : "Activate"}
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  No {status} clients found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Clients</h1>
        <div className="flex space-x-2">
          {canManageClients && (
            <Button onClick={() => setIsAddClientOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Client
            </Button>
          )}
          {isSuperUserOrManager && (
            <Button variant="outline" onClick={() => setIsReportModalOpen(true)}>
              <Download className="mr-2 h-4 w-4" /> Generate Report
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Client Management</CardTitle>
          <CardDescription>
            Manage and view client information and audit performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 md:space-x-4">
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search clients..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select
                value={industryFilter}
                onValueChange={(value) => setIndustryFilter(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Industry" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="icon" onClick={handleDownload}>
              <Download className="h-4 w-4" />
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList>
              <TabsTrigger value="active">
                Active Clients ({clients.length})
              </TabsTrigger>
              <TabsTrigger value="archived">
                Archived Clients ({archivedClients.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="mt-4">
              <ClientTable clients={filteredActiveClients} status="active" />
            </TabsContent>
            
            <TabsContent value="archived" className="mt-4">
              <ClientTable clients={filteredArchivedClients} status="inactive" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Add Client Modal */}
      <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
            <DialogDescription>
              Enter the details of the new client to add them to your system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input
                  id="clientName"
                  value={newClient.name}
                  onChange={(e) =>
                    setNewClient({ ...newClient, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  value={newClient.industry}
                  onChange={(e) =>
                    setNewClient({ ...newClient, industry: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="contactName">Contact Person</Label>
                <Input
                  id="contactName"
                  value={newClient.contactName}
                  onChange={(e) =>
                    setNewClient({ ...newClient, contactName: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={newClient.contactEmail}
                  onChange={(e) =>
                    setNewClient({ ...newClient, contactEmail: e.target.value })
                  }
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  value={newClient.contactPhone}
                  onChange={(e) =>
                    setNewClient({ ...newClient, contactPhone: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="numberOfLocations">Number of Locations</Label>
                <Input
                  id="numberOfLocations"
                  type="number"
                  min="1"
                  value={newClient.numberOfLocations}
                  onChange={(e) =>
                    setNewClient({ ...newClient, numberOfLocations: e.target.value })
                  }
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="businessAddress">Business Address</Label>
              <Input
                id="businessAddress"
                value={newClient.businessAddress}
                onChange={(e) =>
                  setNewClient({ ...newClient, businessAddress: e.target.value })
                }
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="logo">Logo Upload</Label>
              <div className="flex items-center gap-4">
                <Button variant="outline" type="button">
                  <UploadCloud className="mr-2 h-4 w-4" /> Upload Logo
                </Button>
                <span className="text-sm text-muted-foreground">
                  No file selected
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddClientOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddClient}>Add Client</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Client Modal */}
      <Dialog open={isEditClientOpen} onOpenChange={setIsEditClientOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Client</DialogTitle>
            <DialogDescription>
              Update client information
            </DialogDescription>
          </DialogHeader>
          {selectedClient && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="editClientName">Client Name</Label>
                  <Input
                    id="editClientName"
                    value={selectedClient.name}
                    onChange={(e) =>
                      setSelectedClient({ ...selectedClient, name: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editIndustry">Industry</Label>
                  <Input
                    id="editIndustry"
                    value={selectedClient.industry}
                    onChange={(e) =>
                      setSelectedClient({ ...selectedClient, industry: e.target.value })
                    }
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="editContactName">Contact Person</Label>
                  <Input
                    id="editContactName"
                    value={selectedClient.contactName}
                    onChange={(e) =>
                      setSelectedClient({ ...selectedClient, contactName: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editContactEmail">Contact Email</Label>
                  <Input
                    id="editContactEmail"
                    type="email"
                    value={selectedClient.contactEmail}
                    onChange={(e) =>
                      setSelectedClient({ ...selectedClient, contactEmail: e.target.value })
                    }
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="editContactPhone">Contact Phone</Label>
                  <Input
                    id="editContactPhone"
                    value={selectedClient.contactPhone}
                    onChange={(e) =>
                      setSelectedClient({ ...selectedClient, contactPhone: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editLocations">Number of Locations</Label>
                  <Input
                    id="editLocations"
                    type="number"
                    min="1"
                    value={selectedClient.locations}
                    onChange={(e) =>
                      setSelectedClient({ ...selectedClient, locations: parseInt(e.target.value) || 1 })
                    }
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="editBusinessAddress">Business Address</Label>
                <Input
                  id="editBusinessAddress"
                  value={selectedClient.businessAddress}
                  onChange={(e) =>
                    setSelectedClient({ ...selectedClient, businessAddress: e.target.value })
                  }
                />
              </div>
              
              <div className="grid gap-2">
                <Label>Site Management</Label>
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Client Sites</h4>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" /> Add Site
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {selectedClient.sites.length > 0 ? (
                      selectedClient.sites.map(site => (
                        <div key={site.id} className="flex justify-between items-center py-2 px-3 bg-muted/50 rounded-md">
                          <span>{site.name}</span>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        No sites added yet
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditClientOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditClient}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Client Dialog */}
      <Dialog open={isViewClientOpen} onOpenChange={setIsViewClientOpen}>
        {selectedClient && (
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedClient.name}</DialogTitle>
              <DialogDescription>
                Client information and performance data
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Industry</Label>
                  <p className="font-medium">{selectedClient.industry}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <p>
                    <Badge
                      className={
                        selectedClient.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {selectedClient.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </p>
                </div>
                
                <div>
                  <Label className="text-muted-foreground">Locations</Label>
                  <p className="font-medium">{selectedClient.locations}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Recent Score</Label>
                  <p>
                    {selectedClient.recentScore > 0 ? (
                      <Badge
                        className={getScoreBadgeColor(selectedClient.recentScore)}
                      >
                        {selectedClient.recentScore}%
                      </Badge>
                    ) : (
                      "No data"
                    )}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-muted-foreground">Contact Person</Label>
                    <p className="font-medium">{selectedClient.contactName}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="font-medium">{selectedClient.contactEmail}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Phone</Label>
                    <p className="font-medium">{selectedClient.contactPhone}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Last Audit</Label>
                    <p className="font-medium">{selectedClient.lastAudit || "No audit recorded"}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <Label className="text-muted-foreground">Address</Label>
                  <p className="font-medium">{selectedClient.businessAddress}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Sites</h3>
                {selectedClient.sites.length > 0 ? (
                  <div className="space-y-3">
                    <Select
                      value={selectedSite || ""}
                      onValueChange={setSelectedSite}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a site" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedClient.sites.map(site => (
                          <SelectItem key={site.id} value={site.id}>
                            {site.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {selectedSite && (
                      <div className="grid grid-cols-2 gap-4 mt-4 p-4 bg-muted/30 rounded-md">
                        <div>
                          <Label className="text-muted-foreground">Site</Label>
                          <p className="font-medium">
                            {selectedClient.sites.find(s => s.id === selectedSite)?.name}
                          </p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Latest Score</Label>
                          <p>
                            <Badge className="bg-green-100 text-green-800">
                              {selectedClient.recentScore}%
                            </Badge>
                          </p>
                        </div>
                        <div className="col-span-2">
                          <Button variant="outline" size="sm" className="mt-2">
                            <Eye className="mr-2 h-4 w-4" /> View Site Details
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No sites available for this client</p>
                )}
              </div>
            </div>
            <DialogFooter className="flex justify-between">
              <div>
                {canManageClients && (
                  <Button
                    variant={selectedClient.status === "active" ? "destructive" : "default"}
                    onClick={() => handleToggleClientStatus()}
                  >
                    {selectedClient.status === "active" ? "Deactivate" : "Activate"} Client
                  </Button>
                )}
              </div>
              <div className="flex space-x-2">
                {canManageClients && (
                  <Button variant="outline" onClick={() => {
                    setIsViewClientOpen(false);
                    openEditDialog(selectedClient);
                  }}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                )}
                <Button variant="outline" onClick={() => setIsViewClientOpen(false)}>
                  Close
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* Report Generator Modal */}
      <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Generate Client Report</DialogTitle>
            <DialogDescription>
              Select report parameters to generate a customized report
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="reportClient">Client</Label>
                <Select
                  value={reportOptions.client}
                  onValueChange={(value) => setReportOptions({...reportOptions, client: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map(client => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="reportSite">Site</Label>
                <Select
                  value={reportOptions.site}
                  onValueChange={(value) => setReportOptions({...reportOptions, site: value})}
                  disabled={!reportOptions.client}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select site" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportOptions.client && clients.find(c => c.id === reportOptions.client)?.sites.map(site => (
                      <SelectItem key={site.id} value={site.id}>
                        {site.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={reportOptions.startDate}
                  onChange={(e) => setReportOptions({...reportOptions, startDate: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={reportOptions.endDate}
                  onChange={(e) => setReportOptions({...reportOptions, endDate: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label>Report Format</Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={reportOptions.format === "tables+charts" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setReportOptions({...reportOptions, format: "tables+charts"})}
                >
                  Tables + Charts
                </Button>
                <Button
                  variant={reportOptions.format === "tables" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setReportOptions({...reportOptions, format: "tables"})}
                >
                  Tables Only
                </Button>
                <Button
                  variant={reportOptions.format === "charts" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setReportOptions({...reportOptions, format: "charts"})}
                >
                  Charts Only
                </Button>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label>Metrics</Label>
              <div className="grid grid-cols-2 gap-2">
                {["Overall Score", "Signage", "Lighting", "Exterior", "Shop", "Yard", 
                  "Staff Facilities", "Bakery", "Store", "Staff", "HSSE", "Admin", "Action Items"].map(metric => (
                  <div key={metric} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`metric-${metric}`}
                      checked={reportOptions.metrics.includes(metric)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setReportOptions({
                            ...reportOptions,
                            metrics: [...reportOptions.metrics, metric]
                          });
                        } else {
                          setReportOptions({
                            ...reportOptions,
                            metrics: reportOptions.metrics.filter(m => m !== metric)
                          });
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor={`metric-${metric}`}>{metric}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label>Breakdown By</Label>
              <Select
                value={reportOptions.breakdown}
                onValueChange={(value) => setReportOptions({...reportOptions, breakdown: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="evaluator">Evaluator</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                  <SelectItem value="section">Section</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReportModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleGenerateReport}>Generate Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Clients;
