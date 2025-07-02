
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Package,
  Plus,
  Search,
  QrCode,
  FileText,
  Calendar,
  MapPin,
  User,
  Wrench,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  Download,
  Upload
} from "lucide-react";

export const AssetManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewAssetOpen, setIsNewAssetOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("all");

  const mockAssets = [
    {
      id: "asset-1",
      name: "Compressor Unit A1",
      type: "HVAC Equipment",
      model: "XY-5000",
      serialNumber: "SN-2024-001",
      location: "Building A - Floor 2",
      department: "Facilities",
      status: "active",
      assignedTechnician: "John Smith",
      purchaseDate: "2023-01-15",
      warrantyExpiry: "2025-01-15",
      lastServiceDate: "2024-01-10",
      nextScheduledMaintenance: "2024-02-10",
      criticality: "high",
      totalDowntimeHours: 24.5,
      maintenanceCount: 12,
      qrCode: "QR-COMP-A1-001"
    },
    {
      id: "asset-2",
      name: "Conveyor Belt B2",
      type: "Production Equipment",
      model: "CB-3000",
      serialNumber: "SN-2024-002",
      location: "Production Floor",
      department: "Manufacturing",
      status: "under-repair",
      assignedTechnician: "Sarah Johnson",
      purchaseDate: "2023-03-20",
      warrantyExpiry: "2024-03-20",
      lastServiceDate: "2024-01-08",
      nextScheduledMaintenance: "2024-02-08",
      criticality: "critical",
      totalDowntimeHours: 18.2,
      maintenanceCount: 8,
      qrCode: "QR-CONV-B2-002"
    },
    {
      id: "asset-3",
      name: "Generator D4",
      type: "Power Equipment",
      model: "GEN-7500",
      serialNumber: "SN-2024-003",
      location: "Basement - Power Room",
      department: "Facilities",
      status: "active",
      assignedTechnician: "Mike Wilson",
      purchaseDate: "2022-11-10",
      warrantyExpiry: "2025-11-10",
      lastServiceDate: "2024-01-05",
      nextScheduledMaintenance: "2024-03-05",
      criticality: "critical",
      totalDowntimeHours: 6.3,
      maintenanceCount: 15,
      qrCode: "QR-GEN-D4-003"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "idle": return "bg-gray-100 text-gray-800";
      case "under-repair": return "bg-red-100 text-red-800";
      case "retired": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCriticalityColor = (criticality: string) => {
    switch (criticality) {
      case "critical": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "idle": return <Clock className="h-4 w-4 text-gray-500" />;
      case "under-repair": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "retired": return <Package className="h-4 w-4 text-yellow-500" />;
      default: return <Package className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || asset.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Asset Management</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import Assets
          </Button>
          <Dialog open={isNewAssetOpen} onOpenChange={setIsNewAssetOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Asset
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Add New Asset</DialogTitle>
                <DialogDescription>
                  Register a new asset in the maintenance management system
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Asset Name</Label>
                    <Input id="name" placeholder="Enter asset name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Asset Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select asset type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hvac">HVAC Equipment</SelectItem>
                        <SelectItem value="production">Production Equipment</SelectItem>
                        <SelectItem value="power">Power Equipment</SelectItem>
                        <SelectItem value="it">IT Equipment</SelectItem>
                        <SelectItem value="facility">Facility Equipment</SelectItem>
                        <SelectItem value="vehicle">Vehicle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input id="model" placeholder="Asset model" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serial">Serial Number</Label>
                    <Input id="serial" placeholder="Serial number" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Asset location" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="facilities">Facilities</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="purchase-date">Purchase Date</Label>
                    <Input id="purchase-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="warranty">Warranty Expiry</Label>
                    <Input id="warranty" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="criticality">Criticality</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select criticality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="technician">Assigned Technician</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select technician" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Smith</SelectItem>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="mike">Mike Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Additional notes about the asset" />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsNewAssetOpen(false)}>
                  Create Asset
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Asset Inventory</CardTitle>
          <CardDescription>Manage and track all organizational assets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search assets by name, type, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="idle">Idle</SelectItem>
                <SelectItem value="under-repair">Under Repair</SelectItem>
                <SelectItem value="retired">Retired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Type & Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Criticality</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Next Service</TableHead>
                <TableHead>Downtime</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{asset.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {asset.model} • {asset.serialNumber}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{asset.type}</div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-3 w-3" />
                        {asset.location}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(asset.status)}
                      <Badge className={getStatusColor(asset.status)}>
                        {asset.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCriticalityColor(asset.criticality)}>
                      {asset.criticality.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="mr-1 h-3 w-3" />
                      {asset.assignedTechnician}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-1 h-3 w-3" />
                      {asset.nextScheduledMaintenance}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{asset.totalDowntimeHours}h</div>
                      <div className="text-muted-foreground">{asset.maintenanceCount} repairs</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm">
                        <QrCode className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Wrench className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
