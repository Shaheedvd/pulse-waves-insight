
import React, { useState } from "react";
import { useEnterprise } from "@/contexts/EnterpriseContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileDown, Plus, Edit, Copy, Trash2 } from "lucide-react";

const CXEvaluationBuilder = () => {
  const { templates, addTemplate, updateTemplate, deleteTemplate } = useEnterprise();
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("templates");
  const [searchTerm, setSearchTerm] = useState("");

  const isSuperUser = currentUser?.role === "superuser";
  const canCreate = isSuperUser || currentUser?.role === "admin";
  const canUpdate = isSuperUser || currentUser?.role === "admin";
  const canDelete = isSuperUser;

  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">CX Evaluation Builder</h1>
        <p className="text-muted-foreground">
          Create reusable, structured templates for evaluations
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="builder">Builder</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            {canCreate && (
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Template
              </Button>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Evaluation Templates</CardTitle>
              <CardDescription>
                Manage your evaluation templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template Name</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Categories</TableHead>
                    <TableHead>Max Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{template.name}</div>
                          <div className="text-sm text-gray-500">{template.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">v{template.version}</Badge>
                      </TableCell>
                      <TableCell>{template.categories.length}</TableCell>
                      <TableCell>{template.totalPossibleScore}</TableCell>
                      <TableCell>
                        <Badge className={template.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                          {template.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {canUpdate && (
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                          {canDelete && (
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="builder" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Template Builder</CardTitle>
              <CardDescription>
                Drag and drop template builder interface
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <FileDown className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Template Builder</h3>
                <p className="text-gray-500 mb-4">
                  Drag and drop interface for creating evaluation templates
                </p>
                <Button>Start Building</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{templates.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Active Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {templates.filter(t => t.isActive).length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Avg Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(templates.reduce((sum, t) => sum + t.categories.length, 0) / templates.length)}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CXEvaluationBuilder;
