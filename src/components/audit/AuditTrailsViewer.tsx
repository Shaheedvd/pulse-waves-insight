
import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Download, 
  Activity, 
  Clock, 
  User, 
  FileText,
  Settings,
  Eye,
  Edit,
  Trash2,
  Plus
} from "lucide-react";
import { useGlobal } from "@/contexts/GlobalContext";
import { useAuth } from "@/contexts/AuthContext";

const AuditTrailsViewer = () => {
  const { auditLogs } = useGlobal();
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedModule, setSelectedModule] = useState("all");
  const [selectedAction, setSelectedAction] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  // Sample audit data for demonstration
  const sampleAuditLogs = [
    {
      id: "1",
      userId: "user1",
      userName: "John Doe",
      action: "Created evaluation",
      module: "evaluations",
      entityId: "eval_123",
      entityType: "evaluation",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
      oldData: null,
      newData: { title: "Customer Service Audit", type: "cx_evaluation" }
    },
    {
      id: "2",
      userId: "user2", 
      userName: "Sarah Smith",
      action: "Updated client",
      module: "clients",
      entityId: "client_456",
      entityType: "client",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      oldData: { status: "pending" },
      newData: { status: "active" }
    },
    {
      id: "3",
      userId: "user3",
      userName: "Mike Johnson",
      action: "Deleted report",
      module: "reports",
      entityId: "report_789",
      entityType: "report",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      oldData: { title: "Monthly Sales Report", status: "draft" },
      newData: null
    },
    {
      id: "4",
      userId: "user1",
      userName: "John Doe",
      action: "Viewed dashboard",
      module: "dashboard",
      entityId: "dashboard_main",
      entityType: "dashboard",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
      oldData: null,
      newData: null
    }
  ];

  const allLogs = [...auditLogs, ...sampleAuditLogs];

  const filteredLogs = useMemo(() => {
    return allLogs.filter(log => {
      const matchesSearch = log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           log.module.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesModule = selectedModule === "all" || log.module === selectedModule;
      const matchesAction = selectedAction === "all" || log.action.toLowerCase().includes(selectedAction.toLowerCase());
      
      let matchesDate = true;
      if (dateRange !== "all") {
        const logDate = new Date(log.timestamp);
        const now = new Date();
        switch (dateRange) {
          case "today":
            matchesDate = logDate.toDateString() === now.toDateString();
            break;
          case "week":
            matchesDate = now.getTime() - logDate.getTime() <= 7 * 24 * 60 * 60 * 1000;
            break;
          case "month":
            matchesDate = now.getTime() - logDate.getTime() <= 30 * 24 * 60 * 60 * 1000;
            break;
        }
      }
      
      return matchesSearch && matchesModule && matchesAction && matchesDate;
    });
  }, [allLogs, searchTerm, selectedModule, selectedAction, dateRange]);

  const getActionIcon = (action: string) => {
    if (action.includes("Created") || action.includes("Added")) return <Plus className="h-4 w-4 text-green-500" />;
    if (action.includes("Updated") || action.includes("Modified")) return <Edit className="h-4 w-4 text-blue-500" />;
    if (action.includes("Deleted") || action.includes("Removed")) return <Trash2 className="h-4 w-4 text-red-500" />;
    if (action.includes("Viewed") || action.includes("Accessed")) return <Eye className="h-4 w-4 text-gray-500" />;
    return <Activity className="h-4 w-4 text-purple-500" />;
  };

  const getActionBadgeVariant = (action: string) => {
    if (action.includes("Created") || action.includes("Added")) return "default";
    if (action.includes("Updated") || action.includes("Modified")) return "secondary";
    if (action.includes("Deleted") || action.includes("Removed")) return "destructive";
    return "outline";
  };

  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
  };

  const exportAuditLog = () => {
    const csvContent = [
      ["Timestamp", "User", "Action", "Module", "Entity ID", "Entity Type"].join(","),
      ...filteredLogs.map(log => [
        log.timestamp,
        log.userName,
        log.action,
        log.module,
        log.entityId || "",
        log.entityType || ""
      ].join(","))
    ].join("\n");
    
    // Generate PDF instead of CSV
    const reportData = {
      title: "Audit Trail Report",
      period: new Date().toISOString().split('T')[0],
      results: filteredLogs.map(log => ({
        timestamp: log.timestamp,
        user: log.userName,
        action: log.action,
        module: log.module,
        details: log.entityId || '-'
      })),
      columns: ["Timestamp", "User", "Action", "Module", "Details"]
    };
    
    import('../../lib/pdf-utils').then(({ generateCustomReportPdf }) => {
      generateCustomReportPdf(reportData);
    });
  };

  const moduleStats = useMemo(() => {
    const stats: Record<string, number> = {};
    allLogs.forEach(log => {
      stats[log.module] = (stats[log.module] || 0) + 1;
    });
    return Object.entries(stats).sort((a, b) => b[1] - a[1]);
  }, [allLogs]);

  const actionStats = useMemo(() => {
    const stats: Record<string, number> = {};
    allLogs.forEach(log => {
      const actionType = log.action.split(" ")[0]; // Get first word (Created, Updated, etc.)
      stats[actionType] = (stats[actionType] || 0) + 1;
    });
    return Object.entries(stats).sort((a, b) => b[1] - a[1]);
  }, [allLogs]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Audit Trails</h2>
          <p className="text-muted-foreground">
            Complete activity log with detailed change tracking
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          <Badge variant="outline">{filteredLogs.length} entries</Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by user, action, or module..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <Select value={selectedModule} onValueChange={setSelectedModule}>
              <SelectTrigger>
                <SelectValue placeholder="Module" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modules</SelectItem>
                <SelectItem value="dashboard">Dashboard</SelectItem>
                <SelectItem value="evaluations">Evaluations</SelectItem>
                <SelectItem value="clients">Clients</SelectItem>
                <SelectItem value="reports">Reports</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedAction} onValueChange={setSelectedAction}>
              <SelectTrigger>
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="created">Created</SelectItem>
                <SelectItem value="updated">Updated</SelectItem>
                <SelectItem value="deleted">Deleted</SelectItem>
                <SelectItem value="viewed">Viewed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button variant="outline" onClick={exportAuditLog}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setSelectedModule("all");
              setSelectedAction("all");
              setDateRange("all");
            }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="logs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="logs">Activity Logs</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredLogs.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No audit logs found matching your criteria
                  </div>
                ) : (
                  filteredLogs.map((log) => (
                    <div key={log.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="mt-1">
                        {getActionIcon(log.action)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{log.userName}</span>
                          <Badge variant={getActionBadgeVariant(log.action)} className="text-xs">
                            {log.action}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {log.module}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatRelativeTime(log.timestamp)}
                        </div>
                        {log.entityId && (
                          <p className="text-sm text-muted-foreground">
                            Entity: {log.entityType} ({log.entityId})
                          </p>
                        )}
                        {(log.oldData || log.newData) && (
                          <details className="text-xs">
                            <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                              View Changes
                            </summary>
                            <div className="mt-2 p-2 bg-muted rounded text-xs font-mono">
                              {log.oldData && (
                                <div>
                                  <strong>Before:</strong> {JSON.stringify(log.oldData, null, 2)}
                                </div>
                              )}
                              {log.newData && (
                                <div>
                                  <strong>After:</strong> {JSON.stringify(log.newData, null, 2)}
                                </div>
                              )}
                            </div>
                          </details>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Activity by Module</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {moduleStats.slice(0, 8).map(([module, count]) => (
                    <div key={module} className="flex items-center justify-between">
                      <span className="capitalize">{module}</span>
                      <Badge variant="secondary">{count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Action Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {actionStats.map(([action, count]) => (
                    <div key={action} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getActionIcon(action)}
                        <span className="capitalize">{action}</span>
                      </div>
                      <Badge variant="secondary">{count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuditTrailsViewer;
