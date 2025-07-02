
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Upload, Download, Eye, Search, Plus, Folder, File, Image } from "lucide-react";

export const SalesDocuments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  // Mock documents data
  const documents = [
    {
      id: "1",
      name: "CX Management Suite - Product Brochure",
      type: "brochure",
      category: "Marketing",
      size: "2.5 MB",
      uploadedBy: "Marketing Team",
      uploadedAt: "2024-01-15T10:00:00Z",
      downloads: 45,
      version: "v2.1",
      tags: ["product", "features", "benefits"]
    },
    {
      id: "2",
      name: "Sales Pitch Deck - Q1 2024",
      type: "presentation",
      category: "Sales Collateral",
      size: "15.3 MB",
      uploadedBy: "John Smith",
      uploadedAt: "2024-01-10T14:30:00Z",
      downloads: 28,
      version: "v1.5",
      tags: ["pitch", "presentation", "overview"]
    },
    {
      id: "3",
      name: "Standard Service Agreement Template",
      type: "contract",
      category: "Legal",
      size: "1.2 MB",
      uploadedBy: "Legal Team",
      uploadedAt: "2024-01-08T09:15:00Z",
      downloads: 67,
      version: "v3.0",
      tags: ["contract", "template", "legal"]
    },
    {
      id: "4",
      name: "Competitive Analysis - Market Position",
      type: "report",
      category: "Analysis",
      size: "8.7 MB",
      uploadedBy: "Sarah Johnson",
      uploadedAt: "2024-01-12T11:45:00Z",
      downloads: 22,
      version: "v1.0",
      tags: ["competitive", "analysis", "market"]
    },
    {
      id: "5",
      name: "Customer Success Stories",
      type: "case-study",
      category: "Marketing",
      size: "5.1 MB",
      uploadedBy: "Marketing Team",
      uploadedAt: "2024-01-18T16:20:00Z",
      downloads: 38,
      version: "v1.2",
      tags: ["success", "testimonials", "case-study"]
    },
    {
      id: "6",
      name: "ROI Calculator Spreadsheet",
      type: "tool",
      category: "Sales Tools",
      size: "890 KB",
      uploadedBy: "Mike Wilson",
      uploadedAt: "2024-01-14T13:10:00Z",
      downloads: 31,
      version: "v2.0",
      tags: ["calculator", "roi", "tool"]
    }
  ];

  const categories = ["all", ...Array.from(new Set(documents.map(d => d.category)))];

  const getFileIcon = (type: string) => {
    switch (type) {
      case "brochure": return <FileText className="h-5 w-5 text-blue-600" />;
      case "presentation": return <File className="h-5 w-5 text-orange-600" />;
      case "contract": return <FileText className="h-5 w-5 text-red-600" />;
      case "report": return <FileText className="h-5 w-5 text-green-600" />;
      case "case-study": return <FileText className="h-5 w-5 text-purple-600" />;
      case "tool": return <File className="h-5 w-5 text-teal-600" />;
      default: return <File className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "brochure": return "bg-blue-100 text-blue-800";
      case "presentation": return "bg-orange-100 text-orange-800";
      case "contract": return "bg-red-100 text-red-800";
      case "report": return "bg-green-100 text-green-800";
      case "case-study": return "bg-purple-100 text-purple-800";
      case "tool": return "bg-teal-100 text-teal-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = filterType === "all" || doc.category === filterType;
    
    return matchesSearch && matchesType;
  });

  const documentStats = {
    totalDocuments: documents.length,
    totalDownloads: documents.reduce((sum, doc) => sum + doc.downloads, 0),
    totalSize: documents.reduce((sum, doc) => sum + parseFloat(doc.size), 0),
    recentUploads: documents.filter(doc => 
      new Date(doc.uploadedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Sales Document Vault</h2>
          <p className="text-muted-foreground">Centralized repository for all sales assets</p>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload Sales Document</DialogTitle>
              <DialogDescription>
                Add a new document to your sales asset library
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file">Select File</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <Button variant="outline">
                      Choose File
                    </Button>
                    <p className="mt-2 text-sm text-gray-500">
                      Or drag and drop files here
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="docName">Document Name</Label>
                  <Input id="docName" placeholder="Enter document name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="docType">Document Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brochure">Brochure</SelectItem>
                      <SelectItem value="presentation">Presentation</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="report">Report</SelectItem>
                      <SelectItem value="case-study">Case Study</SelectItem>
                      <SelectItem value="tool">Tool</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales-collateral">Sales Collateral</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                      <SelectItem value="analysis">Analysis</SelectItem>
                      <SelectItem value="sales-tools">Sales Tools</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="version">Version</Label>
                  <Input id="version" placeholder="v1.0" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" placeholder="Enter tags separated by commas" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Brief description of the document..." />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsUploadDialogOpen(false)}>
                Upload Document
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="library" className="space-y-4">
        <TabsList>
          <TabsTrigger value="library">Document Library</TabsTrigger>
          <TabsTrigger value="stats">Usage Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="space-y-4">
          {/* Document Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{documentStats.totalDocuments}</div>
                <p className="text-xs text-muted-foreground">In library</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{documentStats.totalDownloads}</div>
                <p className="text-xs text-muted-foreground">All time</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{documentStats.totalSize.toFixed(1)} MB</div>
                <p className="text-xs text-muted-foreground">Total size</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Recent Uploads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{documentStats.recentUploads}</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getFileIcon(doc.type)}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm leading-tight">{doc.name}</h3>
                        <p className="text-xs text-muted-foreground">{doc.size}</p>
                      </div>
                    </div>
                    <Badge className={getTypeColor(doc.type)} size="sm">
                      {doc.type.replace('-', ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-medium">{doc.category}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Version</span>
                      <span className="font-medium">{doc.version}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Downloads</span>
                      <span className="font-medium">{doc.downloads}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Uploaded</span>
                      <span className="font-medium">
                        {new Date(doc.uploadedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {doc.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {doc.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{doc.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          {/* Usage Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Document Usage Statistics</CardTitle>
              <CardDescription>Track how your sales assets are being used</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h4 className="font-medium">Most Downloaded Documents</h4>
                {documents
                  .sort((a, b) => b.downloads - a.downloads)
                  .slice(0, 5)
                  .map((doc, index) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                          {index + 1}
                        </div>
                        {getFileIcon(doc.type)}
                        <div>
                          <p className="font-medium text-sm">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{doc.downloads}</p>
                        <p className="text-xs text-muted-foreference">downloads</p>
                      </div>
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
