
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { FilePlus, Search, FileText, Printer, Download, Mail, Filter, Plus, FileCheck, ClockIcon } from "lucide-react";

// Sample invoice data
const invoices = [
  { 
    id: "5590", 
    client: "QuickMart Cape Town", 
    date: "2023-06-15", 
    amount: "R 5,500", 
    status: "paid", 
    type: "Restaurant Audit",
    contactPerson: "John Smith",
    paymentDetails: {
      method: "EFT",
      reference: "QM15062023",
      datePaid: "2023-06-20"
    }
  },
  { 
    id: "5589", 
    client: "EcoFuel Johannesburg", 
    date: "2023-06-12", 
    amount: "R 5,500", 
    status: "pending", 
    type: "Forecourt & Shop Audit",
    contactPerson: "Sarah Johnson",
    paymentDetails: null
  },
  { 
    id: "5588", 
    client: "Central High School", 
    date: "2023-06-10", 
    amount: "R 2,500", 
    status: "overdue", 
    type: "School Audit",
    contactPerson: "Michael Brown",
    paymentDetails: null
  },
  { 
    id: "5587", 
    client: "LuxCafé Sandton", 
    date: "2023-06-05", 
    amount: "R 5,500", 
    status: "paid", 
    type: "Restaurant Audit",
    contactPerson: "David Miller",
    paymentDetails: {
      method: "EFT",
      reference: "LC05062023",
      datePaid: "2023-06-08"
    }
  },
  { 
    id: "5586", 
    client: "HealthPharm Durban", 
    date: "2023-06-01", 
    amount: "R 5,500", 
    status: "paid", 
    type: "Retail Audit",
    contactPerson: "Emily Wilson",
    paymentDetails: {
      method: "EFT",
      reference: "HP03062023",
      datePaid: "2023-06-04"
    }
  },
];

const InvoiceManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isViewInvoiceOpen, setIsViewInvoiceOpen] = useState(false);
  const [isMarkAsPaidOpen, setIsMarkAsPaidOpen] = useState(false);
  const [paymentReference, setPaymentReference] = useState("");

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          invoice.id.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateInvoice = () => {
    toast({
      title: "Invoice Created",
      description: "Invoice #5591 has been created successfully",
    });
    setIsCreateInvoiceOpen(false);
  };

  const handleMarkAsPaid = () => {
    if (!paymentReference) {
      toast({
        title: "Payment Reference Required",
        description: "Please enter the EFT payment reference number",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Invoice Marked as Paid",
      description: `Invoice #${selectedInvoice?.id} has been marked as paid and archived`,
    });
    setIsMarkAsPaidOpen(false);
    setPaymentReference("");
  };

  const viewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setIsViewInvoiceOpen(true);
  };

  const openMarkAsPaid = (invoice) => {
    setSelectedInvoice(invoice);
    setIsMarkAsPaidOpen(true);
  };

  const handleDownloadInvoice = (id) => {
    toast({
      title: "Invoice Downloaded",
      description: `Invoice #${id} has been downloaded as PDF`,
    });
  };

  const handlePrintInvoice = (id) => {
    toast({
      title: "Printing Invoice",
      description: `Preparing Invoice #${id} for printing`,
    });
    // In a real app, this would trigger print functionality
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleEmailInvoice = (id) => {
    toast({
      title: "Invoice Emailed",
      description: `Invoice #${id} has been emailed to the client`,
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Invoice Management</h2>
        <Button onClick={() => setIsCreateInvoiceOpen(true)}>
          <FilePlus className="mr-2 h-4 w-4" />
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
                  placeholder="Search by client or invoice #..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
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
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No invoices found matching your search criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">#{invoice.id}</TableCell>
                      <TableCell>{invoice.client}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell>
                        <span className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${getStatusBadgeClass(invoice.status)}`}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewInvoice(invoice)}
                          >
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadInvoice(invoice.id)}
                          >
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                          {invoice.status !== "paid" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openMarkAsPaid(invoice)}
                            >
                              <FileCheck className="h-4 w-4" />
                              <span className="sr-only">Mark as Paid</span>
                            </Button>
                          )}
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

      {/* Create Invoice Dialog */}
      <Dialog open={isCreateInvoiceOpen} onOpenChange={setIsCreateInvoiceOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
            <DialogDescription>
              Generate a new invoice for a client
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="invoice-number">Invoice Number</Label>
                <Input id="invoice-number" defaultValue="5591" readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoice-date">Invoice Date</Label>
                <Input id="invoice-date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Select defaultValue="">
                  <SelectTrigger id="client">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="QuickMart">QuickMart Cape Town</SelectItem>
                    <SelectItem value="EcoFuel">EcoFuel Johannesburg</SelectItem>
                    <SelectItem value="LuxCafe">LuxCafé Sandton</SelectItem>
                    <SelectItem value="FreshGrocer">FreshGrocer Pretoria</SelectItem>
                    <SelectItem value="HealthPharm">HealthPharm Durban</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-person">Contact Person</Label>
                <Input id="contact-person" placeholder="Contact person name" />
              </div>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="service-type">Service Type</Label>
                <Select defaultValue="">
                  <SelectTrigger id="service-type">
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="restaurant">Restaurant Audit (R5,500)</SelectItem>
                    <SelectItem value="forecourt">Forecourt & Shop Audit (R5,500)</SelectItem>
                    <SelectItem value="hotel">Hotel Audit (R5,500)</SelectItem>
                    <SelectItem value="school">School Audit (R2,500)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (excl. VAT)</Label>
                <Input id="amount" defaultValue="R 5,500" readOnly className="bg-muted" />
              </div>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="vat-rate">VAT Rate</Label>
                <Input id="vat-rate" defaultValue="15.5%" readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="total-amount">Total Amount (incl. VAT)</Label>
                <Input id="total-amount" defaultValue="R 6,352.50" readOnly className="bg-muted" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Input id="notes" placeholder="Any additional information" />
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

      {/* View Invoice Dialog */}
      <Dialog open={isViewInvoiceOpen} onOpenChange={setIsViewInvoiceOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Invoice #{selectedInvoice?.id}</DialogTitle>
            <DialogDescription>
              {selectedInvoice?.client} - {selectedInvoice?.date}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="bg-muted p-6 rounded-md space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">Pulse Point CX</h3>
                  <p className="text-sm text-muted-foreground">123 Main Street</p>
                  <p className="text-sm text-muted-foreground">Cape Town, 8001</p>
                  <p className="text-sm text-muted-foreground">South Africa</p>
                  <p className="text-sm text-muted-foreground">info@pulsepointcx.com</p>
                </div>
                <div className="text-right">
                  <h3 className="text-lg font-bold">INVOICE</h3>
                  <p className="text-sm text-muted-foreground">Invoice #: {selectedInvoice?.id}</p>
                  <p className="text-sm text-muted-foreground">Date: {selectedInvoice?.date}</p>
                  <p className={`text-sm font-medium mt-2 rounded-full px-2 py-1 inline-block ${getStatusBadgeClass(selectedInvoice?.status)}`}>
                    {selectedInvoice?.status?.charAt(0).toUpperCase() + selectedInvoice?.status?.slice(1)}
                  </p>
                </div>
              </div>
              
              <div className="border-t border-b py-4">
                <h4 className="font-medium mb-2">Bill To:</h4>
                <p className="text-sm">{selectedInvoice?.client}</p>
                <p className="text-sm">Attn: {selectedInvoice?.contactPerson}</p>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>{selectedInvoice?.type}</TableCell>
                    <TableCell className="text-right">{selectedInvoice?.amount}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>VAT (15.5%)</TableCell>
                    <TableCell className="text-right">R 852.50</TableCell>
                  </TableRow>
                </TableBody>
                <TableBody className="border-t">
                  <TableRow>
                    <TableCell className="font-bold">Total</TableCell>
                    <TableCell className="text-right font-bold">R 6,352.50</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              
              <div className="space-y-2">
                <h4 className="font-medium">Payment Information:</h4>
                <p className="text-sm">Bank: South African Bank</p>
                <p className="text-sm">Account Name: Pulse Point CX</p>
                <p className="text-sm">Account Number: 123456789</p>
                <p className="text-sm">Reference: Invoice #{selectedInvoice?.id}</p>
              </div>
              
              {selectedInvoice?.paymentDetails && (
                <div className="bg-green-50 p-4 rounded-md border border-green-200">
                  <h4 className="font-medium text-green-800">Payment Received</h4>
                  <p className="text-sm text-green-700">Method: {selectedInvoice.paymentDetails.method}</p>
                  <p className="text-sm text-green-700">Reference: {selectedInvoice.paymentDetails.reference}</p>
                  <p className="text-sm text-green-700">Date: {selectedInvoice.paymentDetails.datePaid}</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setIsViewInvoiceOpen(false)}>
                Close
              </Button>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => handleEmailInvoice(selectedInvoice?.id)}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handlePrintInvoice(selectedInvoice?.id)}
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
                <Button 
                  onClick={() => handleDownloadInvoice(selectedInvoice?.id)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mark as Paid Dialog */}
      <Dialog open={isMarkAsPaidOpen} onOpenChange={setIsMarkAsPaidOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mark Invoice as Paid</DialogTitle>
            <DialogDescription>
              Record payment for Invoice #{selectedInvoice?.id} - {selectedInvoice?.client}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="payment-amount">Payment Amount</Label>
              <Input id="payment-amount" defaultValue="R 6,352.50" readOnly className="bg-muted" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select defaultValue="EFT">
                <SelectTrigger id="payment-method">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EFT">EFT (Electronic Funds Transfer)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="payment-reference">Payment Reference</Label>
              <Input 
                id="payment-reference" 
                placeholder="Enter EFT reference number" 
                value={paymentReference}
                onChange={(e) => setPaymentReference(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="payment-date">Payment Date</Label>
              <Input id="payment-date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMarkAsPaidOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleMarkAsPaid}>
              Confirm Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvoiceManagement;
