
import React, { useState } from "react";
import { useEnterprise } from "@/contexts/EnterpriseContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, Lightbulb, Bug, Users, Plus } from "lucide-react";

const ProductDashboardPage = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useEnterprise();
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("products");
  const [searchTerm, setSearchTerm] = useState("");

  const isSuperUser = currentUser?.role === "superuser";
  const canCreate = isSuperUser || currentUser?.role === "admin";
  const canUpdate = isSuperUser || currentUser?.role === "admin";

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "released": return "bg-green-100 text-green-800";
      case "testing": return "bg-blue-100 text-blue-800";
      case "development": return "bg-yellow-100 text-yellow-800";
      case "concept": return "bg-purple-100 text-purple-800";
      case "deprecated": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getFeedbackTypeColor = (type: string) => {
    switch (type) {
      case "feature-request": return "bg-blue-100 text-blue-800";
      case "bug": return "bg-red-100 text-red-800";
      case "improvement": return "bg-green-100 text-green-800";
      case "complaint": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const totalFeatures = products.reduce((sum, p) => sum + p.features.length, 0);
  const totalFeedback = products.reduce((sum, p) => sum + p.feedback.length, 0);
  const releasedProducts = products.filter(p => p.status === "released").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Product Dashboard</h1>
        <p className="text-muted-foreground">
          Manage products, features, and collect customer feedback
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Released</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{releasedProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Features</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFeatures}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Feedback Items</CardTitle>
            <Bug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFeedback}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          <div className="flex justify-between items-center">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
            {canCreate && (
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Product
              </Button>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Product Portfolio</CardTitle>
              <CardDescription>
                Manage your product lineup and features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Features</TableHead>
                    <TableHead>Release Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">v{product.version}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(product.status)}>
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{product.owner}</TableCell>
                      <TableCell>{product.features.length}</TableCell>
                      <TableCell>
                        {product.releaseDate ? new Date(product.releaseDate).toLocaleDateString() : "TBD"}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          {canUpdate && (
                            <Button variant="outline" size="sm">Edit</Button>
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

        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Feedback</CardTitle>
              <CardDescription>
                Review and prioritize customer feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Feedback</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.flatMap(product => 
                    product.feedback.map(feedback => (
                      <TableRow key={feedback.id}>
                        <TableCell>
                          <div className="font-medium">{feedback.description}</div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getFeedbackTypeColor(feedback.type)}>
                            {feedback.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{feedback.source}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{feedback.priority}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{feedback.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Review</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDashboardPage;
