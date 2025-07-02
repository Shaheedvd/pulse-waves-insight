
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Upload, 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Users,
  Calendar,
  Tag,
  FileUp,
  Send
} from "lucide-react";
import { ComplianceDocument, DocumentStatus, DocumentType, ComplianceCategory, AccessLevel } from "@/types/compliance";

const DocumentManagement = () => {
  const [documents, setDocuments] = useState<ComplianceDocument[]>([
    {
      id: "DOC-001",
      title: "Data Protection Policy",
      description: "Comprehensive policy for data protection and GDPR compliance",
      type: "policy",
      category: "data_protection",
      version: "2.1",
      status: "published",
      author: "Legal Team",
      reviewer: "Compliance Officer",
      approver: "CEO",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
      publishedAt: "2024-01-22",
      expiryDate: "2025-01-22",
      fileName: "data-protection-policy-v2.1.pdf",
      fileSize: 245760,
      tags: ["GDPR", "Privacy", "Data"],
      accessLevel: "internal",
      reviewCycle: 12,
      nextReviewDate: "2025-01-15",
      relatedRegulations: ["GDPR", "CCPA"]
    },
    {
      id: "DOC-002",
      title: "Security Incident Response Procedure",
      description: "Step-by-step procedure for handling security incidents",
      type: "procedure",
      category: "security",
      version: "1.3",
      status: "under_review",
      author: "IT Security",
      reviewer: "CISO",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-18",
      fileName: "security-incident-response-v1.3.pdf",
      fileSize: 189440,
      tags: ["Security", "Incident", "Response"],
      accessLevel: "restricted",
      reviewCycle: 6,
      nextReviewDate: "2024-07-10",
      relatedRegulations: ["ISO 27001"]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<ComplianceDocument | null>(null);

  const [newDocument, setNewDocument] = useState({
    title: "",
    description: "",
    type: "policy" as DocumentType,
    category: "data_protection" as ComplianceCategory,
    accessLevel: "internal" as AccessLevel,
    tags: "",
    reviewCycle: 12,
    relatedRegulations: ""
  });

  const getStatusColor = (status: DocumentStatus) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800";
      case "approved": return "bg-blue-100 text-blue-800";
      case "under_review": return "bg-yellow-100 text-yellow-800";
      case "pending_approval": return "bg-orange-100 text-orange-800";
      case "draft": return "bg-gray-100 text-gray-800";
      case "archived": return "bg-purple-100 text-purple-800";
      case "expired": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: DocumentType) => {
    switch (type) {
      case "policy": return <FileText className="h-4 w-4" />;
      case "procedure": return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
    const matchesType = typeFilter === "all" || doc.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleCreateDocument = () => {
    const document: ComplianceDocument = {
      id: `DOC-${String(documents.length + 1).padStart(3, '0')}`,
      title: newDocument.title,
      description: newDocument.description,
      type: newDocument.type,
      category: newDocument.category,
      version: "1.0",
      status: "draft",
      author: "Current User",
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      tags: newDocument.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      accessLevel: newDocument.accessLevel,
      reviewCycle: newDocument.reviewCycle,
      nextReviewDate: new Date(Date.now() + newDocument.reviewCycle * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      relatedRegulations: newDocument.relatedRegulations.split(',').map(reg => reg.trim()).filter(reg => reg)
    };

    setDocuments([...documents, document]);
    setNewDocument({
      title: "",
      description: "",
      type: "policy",
      category: "data_protection",
      accessLevel: "internal",
      tags: "",
      reviewCycle: 12,
      relatedRegulations: ""
    });
    setIsCreateModalOpen(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("File selected:", file.name, file.size);
      // In a real implementation, this would upload to a file storage service
    }
  };

  const publishDocument = (docId: string) => {
    setDocuments(docs => docs.map(doc => 
      doc.id === docId 
        ? { ...doc, status: "published" as DocumentStatus, publishedAt: new Date().toISOString().split('T')[0] }
        : doc
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Document Management</h2>
          <p className="text-muted-foreground">Create, upload, and manage compliance documents</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
                <DialogDescription>
                  Upload an existing document to the compliance system
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <FileUp className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                  <div>
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <span className="text-primary hover:text-primary/80 font-medium">
                        Click to upload
                      </span>
                      <span className="text-muted-foreground"> or drag and drop</span>
                    </Label>
                    <Input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileUpload}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    PDF, DOC, DOCX, TXT up to 10MB
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="upload-type">Document Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="policy">Policy</SelectItem>
                        <SelectItem value="procedure">Procedure</SelectItem>
                        <SelectItem value="guideline">Guideline</SelectItem>
                        <SelectItem value="template">Template</SelectItem>
                        <SelectItem value="regulation">Regulation</SelectItem>
                        <SelectItem value="certification">Certification</SelectItem>
                        <SelectItem value="audit_report">Audit Report</SelectItem>
                        <SelectItem value="training_material">Training Material</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="upload-category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="data_protection">Data Protection</SelectItem>
                        <SelectItem value="financial">Financial</SelectItem>
                        <SelectItem value="health_safety">Health & Safety</SelectItem>
                        <SelectItem value="environmental">Environmental</SelectItem>
                        <SelectItem value="quality">Quality</SelectItem>
                        <SelectItem value="security">Security</SelectItem>
                        <SelectItem value="legal">Legal</SelectItem>
                        <SelectItem value="hr">HR</SelectItem>
                        <SelectItem value="operational">Operational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="upload-description">Description</Label>
                  <Textarea
                    id="upload-description"
                    placeholder="Brief description of the document..."
                    className="resize-none"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button>Upload Document</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Document
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Document</DialogTitle>
                <DialogDescription>
                  Create a new compliance document from scratch
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Document Title</Label>
                  <Input
                    id="title"
                    value={newDocument.title}
                    onChange={(e) => setNewDocument({...newDocument, title: e.target.value})}
                    placeholder="Enter document title..."
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newDocument.description}
                    onChange={(e) => setNewDocument({...newDocument, description: e.target.value})}
                    placeholder="Brief description of the document..."
                    className="resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Document Type</Label>
                    <Select value={newDocument.type} onValueChange={(value: DocumentType) => setNewDocument({...newDocument, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="policy">Policy</SelectItem>
                        <SelectItem value="procedure">Procedure</SelectItem>
                        <SelectItem value="guideline">Guideline</SelectItem>
                        <SelectItem value="template">Template</SelectItem>
                        <SelectItem value="regulation">Regulation</SelectItem>
                        <SelectItem value="certification">Certification</SelectItem>
                        <SelectItem value="audit_report">Audit Report</SelectItem>
                        <SelectItem value="training_material">Training Material</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={newDocument.category} onValueChange={(value: ComplianceCategory) => setNewDocument({...newDocument, category: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="data_protection">Data Protection</SelectItem>
                        <SelectItem value="financial">Financial</SelectItem>
                        <SelectItem value="health_safety">Health & Safety</SelectItem>
                        <SelectItem value="environmental">Environmental</SelectItem>
                        <SelectItem value="quality">Quality</SelectItem>
                        <SelectItem value="security">Security</SelectItem>
                        <SelectItem value="legal">Legal</SelectItem>
                        <SelectItem value="hr">HR</SelectItem>
                        <SelectItem value="operational">Operational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="access-level">Access Level</Label>
                    <Select value={newDocument.accessLevel} onValueChange={(value: AccessLevel) => setNewDocument({...newDocument, accessLevel: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="internal">Internal</SelectItem>
                        <SelectItem value="restricted">Restricted</SelectItem>
                        <SelectItem value="confidential">Confidential</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="review-cycle">Review Cycle (months)</Label>
                    <Input
                      id="review-cycle"
                      type="number"
                      value={newDocument.reviewCycle}
                      onChange={(e) => setNewDocument({...newDocument, reviewCycle: parseInt(e.target.value) || 12})}
                      min="1"
                      max="60"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={newDocument.tags}
                    onChange={(e) => setNewDocument({...newDocument, tags: e.target.value})}
                    placeholder="GDPR, Privacy, Data..."
                  />
                </div>
                <div>
                  <Label htmlFor="regulations">Related Regulations (comma-separated)</Label>
                  <Input
                    id="regulations"
                    value={newDocument.relatedRegulations}
                    onChange={(e) => setNewDocument({...newDocument, relatedRegulations: e.target.value})}
                    placeholder="GDPR, ISO 27001, SOX..."
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateDocument}>Create Document</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Document Library</CardTitle>
          <CardDescription>
            Manage all compliance documents, their versions, and approval workflows
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="pending_approval">Pending Approval</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="policy">Policy</SelectItem>
                <SelectItem value="procedure">Procedure</SelectItem>
                <SelectItem value="guideline">Guideline</SelectItem>
                <SelectItem value="template">Template</SelectItem>
                <SelectItem value="regulation">Regulation</SelectItem>
                <SelectItem value="certification">Certification</SelectItem>
                <SelectItem value="audit_report">Audit Report</SelectItem>
                <SelectItem value="training_material">Training Material</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead>Next Review</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(doc.type)}
                        <div>
                          <div className="font-medium">{doc.title}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {doc.description}
                          </div>
                        </div>
                      </div>
                      {doc.tags.length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {doc.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {doc.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{doc.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {doc.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  </TableCell>
                  <TableCell>{doc.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(doc.status)}>
                      {doc.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono">{doc.version}</TableCell>
                  <TableCell>{doc.author}</TableCell>
                  <TableCell>{new Date(doc.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(doc.nextReviewDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {doc.status === "approved" && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => publishDocument(doc.id)}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
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

export default DocumentManagement;
