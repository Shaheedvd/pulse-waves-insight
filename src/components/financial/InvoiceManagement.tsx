import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Download, Eye, Plus, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { generateFinancialPdf } from "@/lib/pdf-utils";

const sampleInvoices = [
  {
    id: "INV-2301",
    client: "QuickMart Retail Group",
    date: "2023-06-15",
    amount: 22500,
    status: "paid",
    dueDate: "2023-07-15"
  },
  {
    id: "INV-2302",
    client: "EcoFuel Stations",
    date: "2023-06-10",
    amount: 18700,
    status: "pending",
    dueDate: "2023-07-10"
  },
  {
    id: "INV-2303",
    client: "Central High School",
    date: "2023-06-05",
    amount: 8500,
    status: "overdue",
    dueDate: "2023-06-20"
  },
  {
    id: "INV-2304",
    client: "LuxCafé Chain",
    date: "2023-06-02",
    amount: 15200,
    status: "paid",
    dueDate: "2023-07-02"
  },
  {
    id: "INV-2305",
    client: "HealthPlus Pharmacy",
    date: "2023-05-28",
    amount: 12600,
    status: "pending",
    dueDate: "2023-06-28"
  }
];

const InvoiceManagement = () => {
  const { toast } = useToast();
  const [isViewOpen, setIsViewOpen] = React.useState(false);
  const [selectedInvoice, setSelectedInvoice] = React.useState<any>(null);
  
  const handleViewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsViewOpen(true);
  };
  
  const handleDownloadInvoice = (invoice: any) => {
    // Create invoice data object
    const invoiceData = {
      ...invoice,
      company: "Pulse Point CX",
      companyAddress: "123 Business Avenue, Sandton, Johannesburg",
      companyContact: "+27 11 123 4567",
      companyEmail: "billing@pulsepointcx.co.za",
      items: [
        {
          description: "Customer Experience Audit Services",
          quantity: 5,
          unitPrice: invoice.amount / 5,
          total: invoice.amount
        }
      ],
      subtotal: invoice.amount,
      tax: invoice.amount * 0.15,
      total: invoice.amount * 1.15,
      notes: "Payment due within 30 days. Please include the invoice number as a reference."
    };
    
    // Generate the invoice PDF
    generateFinancialPdf(`Invoice ${invoice.id}`, invoiceData);
    
    toast({
      title: "Invoice Downloaded",
      description: `Invoice ${invoice.id} has been downloaded as PDF.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Invoice Management</h2>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Create Invoice
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>
            Manage and track client invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input type="search" placeholder="Search invoices..." />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>R {invoice.amount}</TableCell>
                  <TableCell>
                    {invoice.status === "paid" ? (
                      <Badge variant="outline">Paid</Badge>
                    ) : invoice.status === "pending" ? (
                      <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                    ) : (
                      <Badge variant="destructive">Overdue</Badge>
                    )}
                  </TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleViewInvoice(invoice)}>
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDownloadInvoice(invoice)}>
                      <Download className="h-4 w-4 mr-1" /> Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
            <DialogDescription>
              View invoice information and manage payment status
            </DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Invoice ID</h4>
                  <p className="mt-1">{selectedInvoice.id}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Client</h4>
                  <p className="mt-1">{selectedInvoice.client}</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Date</h4>
                <p className="mt-1">{selectedInvoice.date}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Amount</h4>
                <p className="mt-1">R {selectedInvoice.amount}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                <div className="mt-1">
                  {selectedInvoice.status === "paid" ? (
                    <Badge variant="outline">Paid</Badge>
                  ) : selectedInvoice.status === "pending" ? (
                    <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                  ) : (
                    <Badge variant="destructive">Overdue</Badge>
                  )}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Due Date</h4>
                <p className="mt-1">{selectedInvoice.dueDate}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Notes</h4>
                <Input type="text" placeholder="Add notes" />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsViewOpen(false)}>
              Close
            </Button>
            <Button type="submit">
              <Send className="h-4 w-4 mr-2" />
              Send Reminder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvoiceManagement;
