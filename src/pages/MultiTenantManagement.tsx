
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Users, Settings, Shield, Database, Globe, Plus, Search } from "lucide-react";

const MultiTenantManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const tenants = [
    {
      id: "tenant-001",
      name: "Acme Corporation",
      domain: "acme.pulsepoint.com",
      status: "active",
      users: 245,
      storage: "15.2 GB",
      plan: "Enterprise",
      created: "2024-01-15",
      lastActive: "2025-06-08",
      features: ["SSO", "Custom Branding", "API Access", "Advanced Analytics"],
      usage: {
        evaluations: 1250,
        reports: 89,
        apiCalls: 15420
      }
    },
    {
      id: "tenant-002",
      name: "Global Retail Ltd",
      domain: "global-retail.pulsepoint.com",
      status: "active",
      users: 89,
      storage: "8.7 GB",
      plan: "Professional",
      created: "2024-03-22",
      lastActive: "2025-06-07",
      features: ["SSO", "Custom Branding"],
      usage: {
        evaluations: 670,
        reports: 45,
        apiCalls: 8920
      }
    },
    {
      id: "tenant-003",
      name: "Tech Innovations Inc",
      domain: "tech-innovations.pulsepoint.com",
      status: "trial",
      users: 12,
      storage: "1.2 GB",
      plan: "Trial",
      created: "2025-05-15",
      lastActive: "2025-06-08",
      features: ["Basic Features"],
      usage: {
        evaluations: 45,
        reports: 8,
        apiCalls: 320
      }
    },
    {
      id: "tenant-004",
      name: "Manufacturing Solutions",
      domain: "manuf-solutions.pulsepoint.com",
      status: "suspended",
      users: 156,
      storage: "12.8 GB",
      plan: "Enterprise",
      created: "2023-11-08",
      lastActive: "2025-05-20",
      features: ["SSO", "Custom Branding", "API Access"],
      usage: {
        evaluations: 980,
        reports: 67,
        apiCalls: 12450
      }
    }
  ];

  const systemMetrics = {
    totalTenants: 127,
    activeTenants: 98,
    trialTenants: 15,
    suspendedTenants: 14,
    totalUsers: 15420,
    totalStorage: "2.1 TB",
    monthlyRevenue: "$187,500"
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "trial": return "bg-blue-500";
      case "suspended": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || tenant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Multi-Tenant Management</h1>
          <p className="text-muted-foreground">
            Manage enterprise clients and tenant configurations
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Tenant
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tenants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.totalTenants}</div>
            <p className="text-xs text-muted-foreground">+12 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.activeTenants}</div>
            <p className="text-xs text-muted-foreground">77% retention rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all tenants</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.monthlyRevenue}</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tenants" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tenants">Tenant Directory</TabsTrigger>
          <TabsTrigger value="configurations">Global Configurations</TabsTrigger>
          <TabsTrigger value="billing">Billing Management</TabsTrigger>
          <TabsTrigger value="analytics">Usage Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="tenants" className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search tenants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="trial">Trial</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {filteredTenants.map((tenant) => (
              <Card key={tenant.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Building className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <CardTitle className="text-lg">{tenant.name}</CardTitle>
                        <CardDescription>{tenant.domain}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{tenant.plan}</Badge>
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(tenant.status)}`} />
                      <span className="text-sm capitalize">{tenant.status}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Usage Statistics</div>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Users:</span>
                          <span>{tenant.users}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Storage:</span>
                          <span>{tenant.storage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Evaluations:</span>
                          <span>{tenant.usage.evaluations}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Features</div>
                      <div className="flex flex-wrap gap-1">
                        {tenant.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Timeline</div>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div>Created: {tenant.created}</div>
                        <div>Last Active: {tenant.lastActive}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <Settings className="h-3 w-3 mr-1" />
                      Configure
                    </Button>
                    <Button variant="outline" size="sm">
                      <Users className="h-3 w-3 mr-1" />
                      Manage Users
                    </Button>
                    <Button variant="outline" size="sm">
                      <Shield className="h-3 w-3 mr-1" />
                      Security
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="configurations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Global Security Settings</CardTitle>
                <CardDescription>System-wide security configurations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Force 2FA for all tenants</span>
                  <Badge variant="outline">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Password complexity requirements</span>
                  <Badge variant="outline">High</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Session timeout</span>
                  <Badge variant="outline">8 hours</Badge>
                </div>
                <Button className="w-full">Update Security Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Limits</CardTitle>
                <CardDescription>Default limits for new tenants</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Storage per tenant</span>
                  <Badge variant="outline">50 GB</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">API calls per month</span>
                  <Badge variant="outline">100K</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Max users per tenant</span>
                  <Badge variant="outline">500</Badge>
                </div>
                <Button className="w-full">Update Limits</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing Overview</CardTitle>
              <CardDescription>Revenue and billing management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="text-4xl font-bold mb-2">{systemMetrics.monthlyRevenue}</div>
                <div className="text-muted-foreground mb-4">Monthly Recurring Revenue</div>
                <div className="grid gap-4 md:grid-cols-3 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">89</div>
                    <div className="text-sm text-muted-foreground">Paid Tenants</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">$1,478</div>
                    <div className="text-sm text-muted-foreground">Average Revenue Per Tenant</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">94%</div>
                    <div className="text-sm text-muted-foreground">Collection Rate</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage Analytics</CardTitle>
              <CardDescription>Cross-tenant usage patterns and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 border rounded">
                    <div className="text-2xl font-bold">2.1M</div>
                    <div className="text-sm text-muted-foreground">Total Evaluations</div>
                  </div>
                  <div className="text-center p-4 border rounded">
                    <div className="text-2xl font-bold">89K</div>
                    <div className="text-sm text-muted-foreground">Reports Generated</div>
                  </div>
                  <div className="text-center p-4 border rounded">
                    <div className="text-2xl font-bold">456K</div>
                    <div className="text-sm text-muted-foreground">API Calls</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MultiTenantManagement;
