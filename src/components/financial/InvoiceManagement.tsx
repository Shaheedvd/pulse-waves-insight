import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Download, FileText, Filter, Plus, Printer, Search, Trash } from "lucide-react";
import { downloadAsPdf } from "@/lib/pdf-utils";

const InvoiceManagement = () => {
  const { toast } = useToast();
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  
  const invoices = [
    {
      id: "INV-2023-001",
      client: "Retail Corp SA",
      amount: "R 12,500.00",
      date: "2023-05-15",
      dueDate: "2023-06-15",
      status: "paid"
    },
    {
      id: "INV-2023-002",
      client: "EcoFuel",
      amount: "R 8,750.00",
      date: "2023-05-20",
      dueDate: "2023-06-20",
      status: "pending"
    },
    {
      id: "INV-2023-003",
      client: "LuxCafé",
      amount: "R 5,200.00",
      date: "2023-05-25",
      dueDate: "2023-06-25",
      status: "overdue"
    },
    {
      id: "INV-2023-004",
      client: "QuickMart",
      amount: "R 9,800.00",
      date: "2023-06-01",
      dueDate: "2023-07-01",
      status: "pending"
    },
    {
      id: "INV-2023-005",
      client: "HealthPharm",
      amount: "R 6,300.00",
      date: "2023-06-05",
      dueDate: "2023-07-05",
      status: "paid"
    }
  ];

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || invoice.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreateInvoice = () => {
    toast({
      title: "Invoice Created",
      description: "New invoice has been created successfully",
    });
    setIsCreateInvoiceOpen(false);
  };

  const handleDownloadInvoice = (id: string) => {
    const invoice = invoices.find(inv => inv.id === id);
    if (invoice) {
      downloadAsPdf(`${invoice.id}_${invoice.client.replace(/\s+/g, '_')}.pdf`);
      toast({
        title: "Invoice Downloaded",
        description: `Invoice ${id} has been downloaded as PDF`,
      });
    }
  };

  const handlePrintInvoice = (id: string) => {
    toast({
      title: "Printing Invoice",
      description: `Preparing invoice ${id} for printing`,
    });
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleDeleteInvoice = (id: string) => {
    toast({
      title: "Invoice Deleted",
      description: `Invoice ${id} has been deleted`,
    });
    // In a real app, you would remove the invoice from the state/database
  };

  const handleBulkAction = (action: string) => {
    if (selectedInvoices.length === 0) {
      toast({
        title: "No Invoices Selected",
        description: "Please select at least one invoice",
        variant: "destructive",
      });
      return;
    }

    if (action === "download") {
      toast({
        title: "Bulk Download",
        description: `${selectedInvoices.length} invoices are being prepared for download`,
      });
      // In a real app, you would trigger downloads for all selected invoices
    } else if (action === "delete") {
      toast({
        title: "Bulk Delete",
        description: `${selectedInvoices.length} invoices have been deleted`,
      });
      setSelectedInvoices([]);
      // In a real app, you would remove the invoices from the state/database
    }
  };

  const toggleInvoiceSelection = (id: string) => {
    setSelectedInvoices(prev => 
      prev.includes(id) 
        ? prev.filter(invId => invId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedInvoices.length === filteredInvoices.length) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices(filteredInvoices.map(inv => inv.id));
    }
  };

  const statusColors = {
    paid: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    overdue: "bg-red-100 text-red-800"
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Invoice Management</h2>
        <Button onClick={() => setIsCreateInvoiceOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Invoice
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>
            Manage and track all client invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 md:space-x-4 mb-4">
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search invoices..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select
                value={filterStatus}
                onValueChange={setFilterStatus}
              >
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleBulkAction("download")}
                disabled={selectedInvoices.length === 0}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Selected
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleBulkAction("delete")}
                disabled={selectedInvoices.length === 0}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete Selected
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300"
                        checked={selectedInvoices.length === filteredInvoices.length && filteredInvoices.length > 0}
                        onChange={toggleSelectAll}
                      />
                    </div>
                  </TableHead>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No invoices found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300"
                          checked={selectedInvoices.includes(invoice.id)}
                          onChange={() => toggleInvoiceSelection(invoice.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.client}</TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell>
                        <span className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${statusColors[invoice.status as keyof typeof statusColors]}`}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadInvoice(invoice.id)}
                          >
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePrintInvoice(invoice.id)}
                          >
                            <Printer className="h-4 w-4" />
                            <span className="sr-only">Print</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteInvoice(invoice.id)}
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isCreateInvoiceOpen} onOpenChange={setIsCreateInvoiceOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
            <DialogDescription>
              Create a new invoice for a client
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="client">Client</Label>
              <Select>
                <SelectTrigger id="client">
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retail-corp">Retail Corp SA</SelectItem>
                  <SelectItem value="ecofuel">EcoFuel</SelectItem>
                  <SelectItem value="luxcafe">LuxCafé</SelectItem>
                  <SelectItem value="quickmart">QuickMart</SelectItem>
                  <SelectItem value="healthpharm">HealthPharm</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="invoice-date">Invoice Date</Label>
                <Input id="invoice-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="due-date">Due Date</Label>
                <Input id="due-date" type="date" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (ZAR)</Label>
              <Input id="amount" type="number" placeholder="0.00" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Invoice description" />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateInvoiceOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateInvoice}>
              Create Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvoiceManagement;
