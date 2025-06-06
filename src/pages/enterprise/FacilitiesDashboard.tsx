
import React, { useState } from "react";
import { useEnterprise } from "@/contexts/EnterpriseContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building, AlertTriangle, Users, Wrench, Plus } from "lucide-react";
import { PermissionGate } from "@/components/shared/PermissionGate";

const FacilitiesDashboardPage = () => {
  const { facilities, addFacility, updateFacility, deleteFacility } = useEnterprise();
  const [activeTab, setActiveTab] = useState("facilities");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFacilities = facilities.filter(facility => 
    facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "excellent": return "bg-green-100 text-green-800";
      case "good": return "bg-blue-100 text-blue-800";
      case "fair": return "bg-yellow-100 text-yellow-800";
      case "poor": return "bg-orange-100 text-orange-800";
      case "needs-replacement": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getIssuePriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const totalCapacity = facilities.reduce((sum, f) => sum + f.capacity, 0);
  const totalOccupancy = facilities.reduce((sum, f) => sum + f.currentOccupancy, 0);
  const totalAssets = facilities.reduce((sum, f) => sum + f.assets.length, 0);
  const totalIssues = facilities.reduce((sum, f) => sum + f.issues.length, 0);

  const allAssets = facilities.flatMap(f => f.assets);
  const allIssues = facilities.flatMap(f => f.issues);

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Facilities Dashboard</h1>
        <p className="text-muted-foreground">
          Manage facilities, assets, and maintenance operations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Facilities</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{facilities.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalCapacity > 0 ? Math.round((totalOccupancy / totalCapacity) * 100) : 0}%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAssets}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalIssues}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
        </TabsList>

        <TabsContent value="facilities" className="space-y-4">
          <div className="flex justify-between items-center">
            <Input
              placeholder="Search facilities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
            <PermissionGate module="facilities" action="create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Facility
              </Button>
            </PermissionGate>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Facility Management</CardTitle>
              <CardDescription>
                Overview of all facilities and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Facility</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Manager</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Occupancy</TableHead>
                    <TableHead>Assets</TableHead>
                    <TableHead>Issues</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFacilities.map((facility) => (
                    <TableRow key={facility.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{facility.name}</div>
                          <div className="text-sm text-gray-500">{facility.address}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{facility.type}</Badge>
                      </TableCell>
                      <TableCell>{facility.manager}</TableCell>
                      <TableCell>{facility.capacity}</TableCell>
                      <TableCell>{facility.currentOccupancy}</TableCell>
                      <TableCell>{facility.assets.length}</TableCell>
                      <TableCell>{facility.issues.length}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          <PermissionGate module="facilities" action="update">
                            <Button variant="outline" size="sm">Edit</Button>
                          </PermissionGate>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Asset Management</CardTitle>
              <CardDescription>
                Track and maintain facility assets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Serial Number</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Purchase Date</TableHead>
                    <TableHead>Warranty</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allAssets.map((asset) => (
                    <TableRow key={asset.id}>
                      <TableCell className="font-medium">{asset.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{asset.type}</Badge>
                      </TableCell>
                      <TableCell>{asset.serialNumber}</TableCell>
                      <TableCell>
                        <Badge className={getConditionColor(asset.condition)}>
                          {asset.condition}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(asset.purchaseDate).toLocaleDateString()}</TableCell>
                      <TableCell>{asset.warranty}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          <PermissionGate module="facilities" action="update">
                            <Button variant="outline" size="sm">Maintain</Button>
                          </PermissionGate>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Facility Issues</CardTitle>
              <CardDescription>
                Track and resolve facility maintenance issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Issue</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Est. Cost</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allIssues.map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{issue.title}</div>
                          <div className="text-sm text-gray-500">{issue.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getIssuePriorityColor(issue.priority)}>
                          {issue.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{issue.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{issue.status}</Badge>
                      </TableCell>
                      <TableCell>{issue.assignee}</TableCell>
                      <TableCell>${issue.estimatedCost.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          <PermissionGate module="facilities" action="update">
                            <Button variant="outline" size="sm">Assign</Button>
                          </PermissionGate>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FacilitiesDashboardPage;
