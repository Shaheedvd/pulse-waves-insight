
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AuditSheetPreview from "@/components/auditSheets/AuditSheetPreview";
// Fix the import to reference auditTemplates instead of marketing
import { ISO_AUDIT_TEMPLATE, auditTemplates, COMPREHENSIVE_BUSINESS_AUDIT } from "@/types/auditTemplates";
import { FileText, ShoppingCart, Store, ClipboardCheck, FileCode } from "lucide-react";

const AuditSheetDesigner = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState("business");
  const [previewData, setPreviewData] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  // Check if user has permission to access audit sheet designer
  const canAccessAuditDesigner = currentUser?.role === "admin" || 
    currentUser?.role === "manager" || 
    currentUser?.role === "superuser";
  
  useEffect(() => {
    if (!canAccessAuditDesigner) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the audit sheet designer",
        variant: "destructive",
      });
      navigate("/dashboard");
    }
  }, [canAccessAuditDesigner, navigate, toast]);

  const handlePreview = (templateType: string) => {
    let data;
    switch (templateType) {
      case "business":
        data = {
          name: "Business Audit",
          sections: [
            { title: "Section 1", items: [] },
            { title: "Section 2", items: [] }
          ]
        };
        break;
      case "forecourt_shop":
        data = {
          name: "Forecourt Shop Audit",
          sections: [
            { title: "Section 1", items: [] },
            { title: "Section 2", items: [] }
          ]
        };
        break;
      case "shop_only":
        data = {
          name: "Shop Only Audit",
          sections: [
            { title: "Section 1", items: [] },
            { title: "Section 2", items: [] }
          ]
        };
        break;
      case "iso":
        data = ISO_AUDIT_TEMPLATE;
        break;
      case "comprehensive":
        data = COMPREHENSIVE_BUSINESS_AUDIT;
        break;
      default:
        data = {
          name: "Unknown Audit Type",
          sections: []
        };
    }
    
    setPreviewData(data);
    setSelectedTemplate(templateType);
    setIsPreviewOpen(true);
  };

  if (!canAccessAuditDesigner) {
    return null; // Don't render if no permission
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit Sheet Designer</h1>
          <p className="text-muted-foreground">
            Create and modify audit templates for various business evaluations
          </p>
        </div>
      </div>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="custom">Custom Audits</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:border-primary transition-all" 
                  onClick={() => handlePreview("business")}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Business Audit</CardTitle>
                <Store className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Standard business evaluation template</p>
                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    // TODO: Edit template
                  }}>Edit</Button>
                  <Button variant="outline" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    handlePreview("business");
                  }}>Preview</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:border-primary transition-all"
                  onClick={() => handlePreview("forecourt_shop")}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Forecourt Shop Audit</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Template for forecourt and shop combined evaluations</p>
                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    // TODO: Edit template
                  }}>Edit</Button>
                  <Button variant="outline" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    handlePreview("forecourt_shop");
                  }}>Preview</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:border-primary transition-all"
                  onClick={() => handlePreview("shop_only")}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Shop Audit</CardTitle>
                <Store className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Shop-specific evaluation template</p>
                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    // TODO: Edit template
                  }}>Edit</Button>
                  <Button variant="outline" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    handlePreview("shop_only");
                  }}>Preview</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:border-primary transition-all"
                  onClick={() => handlePreview("iso")}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ISO Business Audit</CardTitle>
                <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Comprehensive ISO-aligned business assessment</p>
                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    // TODO: Edit template
                  }}>Edit</Button>
                  <Button variant="outline" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    handlePreview("iso");
                  }}>Preview</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:border-primary transition-all"
                  onClick={() => handlePreview("comprehensive")}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Comprehensive Business Assessment</CardTitle>
                <FileCode className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">300-question in-depth business evaluation</p>
                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    // TODO: Edit template
                  }}>Edit</Button>
                  <Button variant="outline" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    handlePreview("comprehensive");
                  }}>Preview</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-dashed cursor-pointer hover:border-primary transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Create New Template</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Design a custom audit template from scratch</p>
                <div className="mt-4">
                  <Button variant="outline" size="sm">Create Template</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Audit Sheets</CardTitle>
              <CardDescription>
                Create and manage your customized audit templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                No custom audit sheets have been created yet. Use the templates as a starting point or create one from scratch.
              </p>
              <Button className="mt-4">Create Custom Audit</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit Sheet Settings</CardTitle>
              <CardDescription>
                Configure default settings for audit sheets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Settings will be added here in a future update.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[90%] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedTemplate === "business" && "Business Audit Template Preview"}
              {selectedTemplate === "forecourt_shop" && "Forecourt Shop Audit Template Preview"}
              {selectedTemplate === "shop_only" && "Shop Audit Template Preview"}
              {selectedTemplate === "iso" && "ISO Business Audit Template Preview"}
              {selectedTemplate === "comprehensive" && "Comprehensive Business Assessment Preview"}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            <AuditSheetPreview type={selectedTemplate} data={previewData} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuditSheetDesigner;
