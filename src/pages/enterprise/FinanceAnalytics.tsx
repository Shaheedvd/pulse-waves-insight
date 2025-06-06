
import React, { useState } from "react";
import { useEnterprise } from "@/contexts/EnterpriseContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle } from "lucide-react";
import { PermissionGate } from "@/components/shared/PermissionGate";

const FinanceAnalytics = () => {
  const { budgets, addBudget, updateBudget, deleteBudget } = useEnterprise();
  const [activeTab, setActiveTab] = useState("budgets");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBudgets = budgets.filter(budget => 
    budget.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    budget.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "under-budget": return "bg-green-100 text-green-800";
      case "on-budget": return "bg-blue-100 text-blue-800";
      case "over-budget": return "bg-yellow-100 text-yellow-800";
      case "critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getVarianceIcon = (variance: number) => {
    if (variance > 0) return <TrendingUp className="h-4 w-4 text-red-500" />;
    if (variance < 0) return <TrendingDown className="h-4 w-4 text-green-500" />;
    return <DollarSign className="h-4 w-4 text-gray-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Finance Analytics</h1>
        <p className="text-muted-foreground">
          Visualize and analyze financial KPIs and budget performance
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="budgets">Budgets</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="budgets" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Search budgets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            <PermissionGate module="finance" action="create">
              <Button>
                <DollarSign className="h-4 w-4 mr-2" />
                New Budget
              </Button>
            </PermissionGate>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Budget</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${budgets.reduce((sum, b) => sum + b.budgetAmount, 0).toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Actual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${budgets.reduce((sum, b) => sum + b.actualAmount, 0).toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Over Budget</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {budgets.filter(b => b.status === "over-budget" || b.status === "critical").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Under Budget</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {budgets.filter(b => b.status === "under-budget").length}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Budget Performance</CardTitle>
              <CardDescription>
                Department budget vs actual spending
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Actual</TableHead>
                    <TableHead>Variance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBudgets.map((budget) => (
                    <TableRow key={budget.id}>
                      <TableCell className="font-medium">{budget.department}</TableCell>
                      <TableCell>{budget.category}</TableCell>
                      <TableCell>${budget.budgetAmount.toLocaleString()}</TableCell>
                      <TableCell>${budget.actualAmount.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getVarianceIcon(budget.variance)}
                          <span className={`ml-1 ${budget.variance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            ${Math.abs(budget.variance).toLocaleString()} ({budget.variancePercent}%)
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(budget.status)}>
                          {budget.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          <PermissionGate module="finance" action="update">
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

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Trends</CardTitle>
              <CardDescription>
                Year-over-year and month-over-month analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border rounded">
                <p className="text-gray-500">Financial trends chart would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Alerts</CardTitle>
              <CardDescription>
                Over-budget notifications and warnings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budgets.filter(b => b.status === "over-budget" || b.status === "critical").map((budget) => (
                  <div key={budget.id} className="flex items-center p-4 border rounded-lg bg-yellow-50">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3" />
                    <div className="flex-1">
                      <h4 className="font-medium">{budget.department} - {budget.category}</h4>
                      <p className="text-sm text-gray-600">
                        Over budget by ${Math.abs(budget.variance).toLocaleString()} ({budget.variancePercent}%)
                      </p>
                    </div>
                    <Badge className={getStatusColor(budget.status)}>
                      {budget.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinanceAnalytics;
