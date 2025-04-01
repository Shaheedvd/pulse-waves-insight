
import React, { useState } from "react";
import {
  Card,
  CardContent,
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
  Building,
  ChevronLeft,
  ChevronRight,
  Download,
  MapPin,
  Phone,
  Plus,
  Search,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Sample client data
const clientsData = [
  {
    id: "CL-2023-001",
    name: "Retail Corp SA",
    industry: "Retail",
    locations: 24,
    contactPerson: "Jane Smith",
    email: "jane.smith@retailcorp.co.za",
    phone: "+27 21 555 1234",
    status: "Active",
  },
  {
    id: "CL-2023-002",
    name: "QuickMart",
    industry: "Grocery",
    locations: 36,
    contactPerson: "Michael Johnson",
    email: "michael@quickmart.co.za",
    phone: "+27 11 555 2345",
    status: "Active",
  },
  {
    id: "CL-2023-003",
    name: "EcoFuel",
    industry: "Gas Station",
    locations: 42,
    contactPerson: "Sarah Williams",
    email: "sarah@ecofuel.co.za",
    phone: "+27 31 555 3456",
    status: "Active",
  },
  {
    id: "CL-2023-004",
    name: "LuxCafé",
    industry: "Restaurant",
    locations: 8,
    contactPerson: "David Brown",
    email: "david@luxcafe.co.za",
    phone: "+27 12 555 4567",
    status: "Active",
  },
  {
    id: "CL-2023-005",
    name: "HealthPharm",
    industry: "Pharmacy",
    locations: 18,
    contactPerson: "Emily Davis",
    email: "emily@healthpharm.co.za",
    phone: "+27 41 555 5678",
    status: "Active",
  },
  {
    id: "CL-2023-006",
    name: "FreshGrocer",
    industry: "Grocery",
    locations: 12,
    contactPerson: "Robert Wilson",
    email: "robert@freshgrocer.co.za",
    phone: "+27 51 555 6789",
    status: "Active",
  },
  {
    id: "CL-2023-007",
    name: "SwiftBank",
    industry: "Banking",
    locations: 28,
    contactPerson: "Lisa Taylor",
    email: "lisa@swiftbank.co.za",
    phone: "+27 21 555 7890",
    status: "Inactive",
  },
  {
    id: "CL-2023-008",
    name: "ComfortInn",
    industry: "Hospitality",
    locations: 6,
    contactPerson: "John Anderson",
    email: "john@comfortinn.co.za",
    phone: "+27 11 555 8901",
    status: "Active",
  },
  {
    id: "CL-2023-009",
    name: "TechRetail",
    industry: "Electronics",
    locations: 15,
    contactPerson: "Nancy Miller",
    email: "nancy@techretail.co.za",
    phone: "+27 31 555 9012",
    status: "Active",
  },
  {
    id: "CL-2023-010",
    name: "SportShop",
    industry: "Retail",
    locations: 9,
    contactPerson: "Kevin Thompson",
    email: "kevin@sportshop.co.za",
    phone: "+27 12 555 0123",
    status: "Inactive",
  },
];

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter clients based on search term
  const filteredClients = clientsData.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate clients
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClients = filteredClients.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Clients</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Client
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Client Management</CardTitle>
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
            </div>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {currentClients.length > 0 ? (
              currentClients.map((client) => (
                <Card key={client.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{client.name}</CardTitle>
                      <Badge
                        variant={client.status === "Active" ? "default" : "secondary"}
                      >
                        {client.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Building className="mr-2 h-4 w-4" />
                        {client.industry}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="mr-2 h-4 w-4" />
                        {client.locations} locations
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <User className="mr-2 h-4 w-4" />
                        {client.contactPerson}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Phone className="mr-2 h-4 w-4" />
                        {client.phone}
                      </div>
                      
                      <div className="flex justify-end pt-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-3 py-8 text-center text-muted-foreground">
                No clients found matching your search.
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="text-sm text-muted-foreground">
                Showing {indexOfFirstItem + 1}-
                {Math.min(indexOfLastItem, filteredClients.length)} of{" "}
                {filteredClients.length}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="icon"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  )
                )}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Clients;
