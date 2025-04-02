
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
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus, Eye, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
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
  },
  {
    id: "2",
    name: "QuickMart",
    industry: "Grocery",
    locations: 12,
    recentScore: 78,
    status: "active",
  },
  {
    id: "3",
    name: "EcoFuel",
    industry: "Energy",
    locations: 15,
    recentScore: 85,
    status: "active",
  },
  {
    id: "4",
    name: "LuxCafé",
    industry: "Food & Beverage",
    locations: 5,
    recentScore: 89,
    status: "active",
  },
  {
    id: "5",
    name: "FreshGrocer",
    industry: "Grocery",
    locations: 7,
    recentScore: 82,
    status: "active",
  },
  {
    id: "6",
    name: "HealthPharm",
    industry: "Healthcare",
    locations: 9,
    recentScore: 88,
    status: "active",
  },
  {
    id: "7",
    name: "TechZone",
    industry: "Electronics",
    locations: 4,
    recentScore: 79,
    status: "inactive",
  },
  {
    id: "8",
    name: "HomeStyle",
    industry: "Home Improvement",
    locations: 6,
    recentScore: 81,
    status: "active",
  },
];

const Clients = () => {
  const [clients, setClients] = useState(initialClientsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [isViewClientOpen, setIsViewClientOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [newClient, setNewClient] = useState({
    name: "",
    industry: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    businessAddress: "",
    numberOfLocations: "",
  });
  const { toast } = useToast();
  const { hasPermission } = useAuth();

  // Filter clients based on search term and industry
  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesIndustry =
      industryFilter === "all" || client.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });

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

    const id = (clients.length + 1).toString();
    const newClientData = {
      id,
      name: newClient.name,
      industry: newClient.industry,
      locations: parseInt(newClient.numberOfLocations) || 1,
      recentScore: 0,
      status: "active",
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
      numberOfLocations: "",
    });

    toast({
      title: "Client Added",
      description: `${newClient.name} has been added to your clients`,
    });
  };

  const handleViewClient = (client: any) => {
    setSelectedClient(client);
    setIsViewClientOpen(true);
  };

  const handleDownload = () => {
    toast({
      title: "Report Downloaded",
      description: "Client data has been downloaded successfully",
    });
  };

  const handleToggleClientStatus = () => {
    if (!selectedClient) return;

    const updatedClients = clients.map((client) => {
      if (client.id === selectedClient.id) {
        const newStatus = client.status === "active" ? "inactive" : "active";
        const updatedClient = {
          ...client,
          status: newStatus,
        };
        setSelectedClient(updatedClient);
        return updatedClient;
      }
      return client;
    });

    setClients(updatedClients);
    toast({
      title: "Status Updated",
      description: `${selectedClient.name} is now ${selectedClient.status === "active" ? "inactive" : "active"}`,
    });
  };

  const getScoreBadgeColor = (score: number) => {
    if (score === 0) return "bg-gray-100 text-gray-800";
    if (score >= 85) return "bg-green-100 text-green-800";
    if (score >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Clients</h1>
        <Button onClick={() => setIsAddClientOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Client
        </Button>
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
                {filteredClients.length > 0 ? (
                  filteredClients.map((client) => (
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
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewClient(client)}
                        >
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No clients found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Client Dialog */}
      <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
            <DialogDescription>
              Enter the details of the new client to add them to your system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
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
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddClientOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddClient}>Add Client</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Client Dialog */}
      <Dialog open={isViewClientOpen} onOpenChange={setIsViewClientOpen}>
        {selectedClient && (
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>{selectedClient.name}</DialogTitle>
              <DialogDescription>
                Client information and performance data
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
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
                <h3 className="font-medium mb-2">Additional Information</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-muted-foreground">Contact Person:</span>{" "}
                    John Smith
                  </p>
                  <p>
                    <span className="text-muted-foreground">Email:</span>{" "}
                    john.smith@{selectedClient.name.toLowerCase().replace(/\s+/g, "")}.com
                  </p>
                  <p>
                    <span className="text-muted-foreground">Phone:</span> +27 21 555 1234
                  </p>
                  <p>
                    <span className="text-muted-foreground">Address:</span> 123 Business Ave, Cape Town, South Africa
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter className="flex justify-between">
              <div>
                {hasPermission("canManageUsers") && (
                  <Button
                    variant={selectedClient.status === "active" ? "destructive" : "default"}
                    onClick={handleToggleClientStatus}
                  >
                    {selectedClient.status === "active" ? "Deactivate" : "Activate"} Client
                  </Button>
                )}
              </div>
              <Button variant="outline" onClick={() => setIsViewClientOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default Clients;
