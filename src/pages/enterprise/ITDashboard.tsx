
import React, { useState } from "react";
import { useEnterprise } from "@/contexts/EnterpriseContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Server, AlertTriangle, CheckCircle, Clock, Plus } from "lucide-react";
import { PermissionGate } from "@/components/shared/PermissionGate";

const ITDashboardPage = () => {
  const { itSystems, itIncidents, addITSystem, addITIncident } = useEnterprise();
  const [activeTab, setActiveTab] = useState("systems");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSystems = itSystems.filter(system => 
    system.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    system.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredIncidents = itIncidents.filter(incident => 
    incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    incident.assignee.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "bg-green-100 text-green-800";
      case "degraded": return "bg-yellow-100 text-yellow-800";
      case "outage": return "bg-red-100 text-red-800";
      case "maintenance": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const operationalSystems = itSystems.filter(s => s.status === "operational").length;
  const openIncidents = itIncidents.filter(i => i.status === "open" || i.status === "investigating").length;
  const avgUptime = itSystems.reduce((sum, s) => sum + s.uptime, 0) / itSystems.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">IT Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor system health, track incidents, and manage IT infrastructure
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Systems</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{itSystems.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operational</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{operationalSystems}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openIncidents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Uptime</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgUptime.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="systems">Systems</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
        </TabsList>

        <TabsContent value="systems" className="space-y-4">
          <div className="flex justify-between items-center">
            <Input
              placeholder="Search systems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
            <PermissionGate module="it" action="create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New System
              </Button>
            </PermissionGate>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>IT Systems</CardTitle>
              <CardDescription>
                Monitor and manage IT infrastructure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>System</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Uptime</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Maintainer</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSystems.map((system) => (
                    <TableRow key={system.id}>
                      <TableCell className="font-medium">{system.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{system.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(system.status)}>
                          {system.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{system.uptime}%</TableCell>
                      <TableCell>{system.version}</TableCell>
                      <TableCell>{system.maintainer}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          <PermissionGate module="it" action="update">
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

        <TabsContent value="incidents" className="space-y-4">
          <div className="flex justify-between items-center">
            <Input
              placeholder="Search incidents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
            <PermissionGate module="it" action="create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Incident
              </Button>
            </PermissionGate>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>IT Incidents</CardTitle>
              <CardDescription>
                Track and resolve IT incidents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Incident</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Affected Users</TableHead>
                    <TableHead>Reported By</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIncidents.map((incident) => (
                    <TableRow key={incident.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{incident.title}</div>
                          <div className="text-sm text-gray-500">{incident.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(incident.severity)}>
                          {incident.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{incident.status}</Badge>
                      </TableCell>
                      <TableCell>{incident.assignee}</TableCell>
                      <TableCell>{incident.affectedUsers}</TableCell>
                      <TableCell>{incident.reportedBy}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          <PermissionGate module="it" action="update">
                            <Button variant="outline" size="sm">Resolve</Button>
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

export default ITDashboardPage;
