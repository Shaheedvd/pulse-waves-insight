
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
  Wrench,
  Plus,
  Search,
  Calendar,
  User,
  Clock,
  DollarSign,
  Package,
  FileText,
  CheckCircle,
  AlertTriangle,
  Pause,
  X,
  Play,
  Eye
} from "lucide-react";

export const WorkOrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewWorkOrderOpen, setIsNewWorkOrderOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");

  const mockWorkOrders = [
    {
      id: "wo-1",
      workOrderNumber: "WO-2024-001",
      title: "Replace HVAC Filter - Building A",
      description: "Monthly preventive maintenance - replace air filters",
      type: "preventive",
      priority: "medium",
      status: "in-progress",
      assetName: "HVAC System A1",
      location: "Building A - Roof",
      requestedBy: "System Auto",
      assignedTo: "John Smith",
      scheduledDate: "2024-01-15",
      estimatedHours: 2,
      actualHours: 1.5,
      estimatedCost: 150,
      actualCost: 135,
      partsRequired: 2,
      completionProgress: 75,
      createdAt: "2024-01-10"
    },
    {
      id: "wo-2",
      workOrderNumber: "WO-2024-002",
      title: "Repair Conveyor Belt Motor",
      description: "Motor making unusual noise and vibrating excessively",
      type: "corrective",
      priority: "high",
      status: "assigned",
      assetName: "Conveyor Belt B2",
      location: "Production Floor",
      requestedBy: "Sarah Johnson",
      assignedTo: "Mike Wilson",
      scheduledDate: "2024-01-16",
      estimatedHours: 4,
      estimatedCost: 800,
      partsRequired: 3,
      completionProgress: 0,
      createdAt: "2024-01-12"
    },
    {
      id: "wo-3",
      workOrderNumber: "WO-2024-003",
      title: "Emergency Generator Repair",
      description: "Generator failed during power outage test",
      type: "emergency",
      priority: "critical",
      status: "completed",
      assetName: "Generator D4",
      location: "Basement - Power Room",
      requestedBy: "Emergency System",
      assignedTo: "David Brown",
      scheduledDate: "2024-01-08",
      estimatedHours: 6,
      actualHours: 8,
      estimatedCost: 1200,
      actualCost: 1450,
      partsRequired: 5,
      completionProgress: 100,
      createdAt: "2024-01-08",
      completedDate: "2024-01-09"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "created": return "bg-blue-100 text-blue-800";
      case "assigned": return "bg-yellow-100 text-yellow-800";
      case "in-progress": return "bg-orange-100 text-orange-800";
      case "on-hold": return "bg-gray-100 text-gray-800";
      case "completed": return "bg-green-100 text-green-800";
      case "verified": return "bg-emerald-100 text-emerald-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "preventive": return "bg-blue-100 text-blue-800";
      case "corrective": return "bg-orange-100 text-orange-800";
      case "emergency": return "bg-red-100 text-red-800";
      case "inspection": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "created": return <FileText className="h-4 w-4 text-blue-500" />;
      case "assigned": return <User className="h-4 w-4 text-yellow-500" />;
      case "in-progress": return <Play className="h-4 w-4 text-orange-500" />;
      case "on-hold": return <Pause className="h-4 w-4 text-gray-500" />;
      case "completed": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "verified": return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case "cancelled": return <X className="h-4 w-4 text-red-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredWorkOrders = mockWorkOrders.filter(wo => {
    const matchesSearch = wo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wo.workOrderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wo.assetName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || wo.status === selectedStatus;
    const matchesPriority = selectedPriority === "all" || wo.priority === selectedPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wrench className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Work Order Management</h2>
        </div>
        <Dialog open={isNewWorkOrderOpen} onOpenChange={setIsNewWorkOrderOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Work Order
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Create New Work Order</DialogTitle>
              <DialogDescription>
                Create a new maintenance work order for asset servicing
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Work Order Title</Label>
                  <Input id="title" placeholder="Brief description of work needed" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select work order type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="preventive">Preventive</SelectItem>
                      <SelectItem value="corrective">Corrective</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                      <SelectItem value="inspection">Inspection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="asset">Asset</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select asset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hvac-a1">HVAC System A1</SelectItem>
                      <SelectItem value="conveyor-b2">Conveyor Belt B2</SelectItem>
                      <SelectItem value="generator-d4">Generator D4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="assigned-to">Assign To</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select technician" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Smith</SelectItem>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="mike">Mike Wilson</SelectItem>
                      <SelectItem value="david">David Brown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scheduled-date">Scheduled Date</Label>
                  <Input id="scheduled-date" type="datetime-local" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="estimated-hours">Estimated Hours</Label>
                  <Input id="estimated-hours" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimated-cost">Estimated Cost ($)</Label>
                  <Input id="estimated-cost" type="number" placeholder="0.00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Detailed description of work to be performed" rows={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instructions">Instructions</Label>
                <Textarea id="instructions" placeholder="Specific instructions for technician" rows={3} />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsNewWorkOrderOpen(false)}>
                Create Work Order
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Work Orders</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockWorkOrders.length}</div>
            <p className="text-xs text-muted-foreground">Active maintenance tasks</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Play className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {mockWorkOrders.filter(wo => wo.status === 'in-progress').length}
            </div>
            <p className="text-xs text-muted-foreground">Currently being worked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {mockWorkOrders.filter(wo => wo.priority === 'high' || wo.priority === 'critical').length}
            </div>
            <p className="text-xs text-muted-foreground">Urgent attention needed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockWorkOrders.filter(wo => wo.status === 'completed').length}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Work Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Work Orders</CardTitle>
          <CardDescription>Manage maintenance work orders and track progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search work orders..."
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
                <SelectItem value="created">Created</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Work Order</TableHead>
                <TableHead>Asset & Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWorkOrders.map((wo) => (
                <TableRow key={wo.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{wo.workOrderNumber}</div>
                      <div className="text-sm text-muted-foreground">{wo.title}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{wo.assetName}</div>
                      <div className="text-sm text-muted-foreground">{wo.location}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(wo.type)}>
                      {wo.type.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(wo.priority)}>
                      {wo.priority.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(wo.status)}
                      <Badge className={getStatusColor(wo.status)}>
                        {wo.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="mr-1 h-3 w-3" />
                      {wo.assignedTo}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-1 h-3 w-3" />
                        {wo.scheduledDate}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {wo.actualHours || wo.estimatedHours}h
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{wo.completionProgress}%</span>
                        <span className="text-muted-foreground">
                          ${wo.actualCost || wo.estimatedCost}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${wo.completionProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Package className="h-4 w-4" />
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
