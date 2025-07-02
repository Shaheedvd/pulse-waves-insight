
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, FileText, DollarSign, Calendar, Send, Download, Eye } from "lucide-react";

export const QuotationsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Mock quotes data
  const quotes = [
    {
      id: "1",
      quoteNumber: "QUO-2024-001",
      clientName: "TechCorp Inc",
      total: 50000,
      validUntil: "2024-02-15",
      status: "sent",
      sentDate: "2024-01-20",
      items: [
        { productName: "CX Management Suite", quantity: 1, unitPrice: 45000, total: 45000 },
        { productName: "Implementation Services", quantity: 1, unitPrice: 5000, total: 5000 }
      ],
      createdAt: "2024-01-18T10:00:00Z"
    },
    {
      id: "2",
      quoteNumber: "QUO-2024-002",
      clientName: "RetailChain Ltd",
      total: 25000,
      validUntil: "2024-02-28",
      status: "accepted",
      sentDate: "2024-01-15",
      acceptedDate: "2024-01-22",
      items: [
        { productName: "CX Consulting", quantity: 1, unitPrice: 25000, total: 25000 }
      ],
      createdAt: "2024-01-14T14:30:00Z"
    },
    {
      id: "3",
      quoteNumber: "QUO-2024-003",
      clientName: "Startup.io",
      total: 15000,
      validUntil: "2024-01-25",
      status: "expired",
      sentDate: "2024-01-10",
      items: [
        { productName: "Marketing Tools", quantity: 1, unitPrice: 15000, total: 15000 }
      ],
      createdAt: "2024-01-08T09:15:00Z"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft": return "bg-gray-100 text-gray-800";
      case "sent": return "bg-blue-100 text-blue-800";
      case "accepted": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      case "expired": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredQuotes = quotes.filter(quote =>
    quote.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const quoteSummary = {
    totalValue: quotes.reduce((sum, quote) => sum + quote.total, 0),
    totalQuotes: quotes.length,
    acceptedQuotes: quotes.filter(q => q.status === "accepted").length,
    pendingQuotes: quotes.filter(q => q.status === "sent").length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Quotations Management</h2>
          <p className="text-muted-foreground">Create and track sales quotations</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Quote
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Create New Quotation</DialogTitle>
              <DialogDescription>
                Generate a professional quote for your client
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Client Name</Label>
                  <Input id="client" placeholder="Select or enter client name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="validUntil">Valid Until</Label>
                  <Input id="validUntil" type="date" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Quote Items</Label>
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="grid grid-cols-12 gap-2 text-sm font-medium">
                    <div className="col-span-5">Product/Service</div>
                    <div className="col-span-2">Quantity</div>
                    <div className="col-span-2">Unit Price</div>
                    <div className="col-span-2">Total</div>
                    <div className="col-span-1">Action</div>
                  </div>
                  <div className="grid grid-cols-12 gap-2">
                    <Input className="col-span-5" placeholder="Product name" />
                    <Input className="col-span-2" type="number" placeholder="1" />
                    <Input className="col-span-2" type="number" placeholder="0.00" />
                    <Input className="col-span-2" placeholder="0.00" disabled />
                    <Button variant="outline" size="sm" className="col-span-1">+</Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="terms">Terms & Conditions</Label>
                  <Textarea id="terms" placeholder="Enter terms and conditions..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Additional notes..." />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="outline">Save Draft</Button>
              <Button onClick={() => setIsCreateDialogOpen(false)}>
                Create & Send
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quote Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Quote Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${quoteSummary.totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{quoteSummary.totalQuotes} quotes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Accepted Quotes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{quoteSummary.acceptedQuotes}</div>
            <p className="text-xs text-muted-foreground">Successfully closed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Quotes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{quoteSummary.pendingQuotes}</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Acceptance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {quoteSummary.totalQuotes > 0 
                ? Math.round((quoteSummary.acceptedQuotes / quoteSummary.totalQuotes) * 100)
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Success rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search quotes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Quotes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Quotations</CardTitle>
          <CardDescription>
            Track and manage your sales quotations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quote #</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead>Sent Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuotes.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{quote.quoteNumber}</span>
                    </div>
                  </TableCell>
                  <TableCell>{quote.clientName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="font-medium">${quote.total.toLocaleString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(quote.status)}>
                      {quote.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(quote.validUntil).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    {quote.sentDate ? new Date(quote.sentDate).toLocaleDateString() : "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      {quote.status === "draft" && (
                        <Button variant="outline" size="sm">
                          <Send className="h-4 w-4" />
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
    </div>
  );
};
