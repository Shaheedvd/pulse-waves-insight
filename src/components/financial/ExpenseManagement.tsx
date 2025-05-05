import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Download, Eye, Plus, Check, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { generateFinancialPdf } from "@/lib/pdf-utils";

const sampleExpenses = [
  {
    id: "EXP-001",
    date: "2023-06-15",
    category: "Evaluator Fees",
    description: "Payment to J. Smith - 5 evaluations",
    amount: 3500,
    status: "approved"
  },
  {
    id: "EXP-002",
    date: "2023-06-14",
    category: "Office Supplies",
    description: "Monthly stationery order",
    amount: 1200,
    status: "pending"
  },
  {
    id: "EXP-003",
    date: "2023-06-12",
    category: "Travel",
    description: "Field team travel expenses - Cape Town visits",
    amount: 2800,
    status: "approved"
  },
  {
    id: "EXP-004",
    date: "2023-06-10",
    category: "Software",
    description: "Annual CRM subscription",
    amount: 9500,
    status: "approved"
  },
  {
    id: "EXP-005",
    date: "2023-06-08",
    category: "Marketing",
    description: "Trade show booth materials",
    amount: 4200,
    status: "pending"
  }
];

const ExpenseManagement = () => {
  const { toast } = useToast();
  const [isViewOpen, setIsViewOpen] = React.useState(false);
  const [selectedExpense, setSelectedExpense] = React.useState<any>(null);

  const handleViewExpense = (expense: any) => {
    setSelectedExpense(expense);
    setIsViewOpen(true);
  };

  const handleApproveExpense = (id: string) => {
    toast({
      title: "Expense Approved",
      description: `Expense ${id} has been approved.`,
    });
  };

  const handleRejectExpense = (id: string) => {
    toast({
      title: "Expense Rejected",
      description: `Expense ${id} has been rejected.`,
    });
  };

  const handleDownloadExpense = (expense: any) => {
    // Create expense data for the PDF
    const expenseData = {
      id: expense.id,
      date: expense.date,
      category: expense.category,
      description: expense.description,
      amount: expense.amount,
      status: expense.status,
      approver: "Financial Manager",
      notes: "Expense documentation verified and approved.",
      paymentDetails: {
        method: "Bank Transfer",
        date: "Within 7 working days",
        reference: `REF-${expense.id}`
      }
    };

    // Generate the PDF
    generateFinancialPdf("Expense Details", expenseData);
    
    toast({
      title: "Expense Report Generated",
      description: "Expense details have been downloaded as a PDF",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Expense Management</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Expense
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.id}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>R {expense.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      expense.status === 'approved' 
                        ? 'bg-green-100 text-green-800' 
                        : expense.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewExpense(expense)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDownloadExpense(expense)}>
                        <Download className="h-4 w-4" />
                      </Button>
                      {expense.status === 'pending' && (
                        <>
                          <Button variant="ghost" size="sm" className="text-green-600" onClick={() => handleApproveExpense(expense.id)}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleRejectExpense(expense.id)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedExpense && (
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Expense Details</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">ID</h4>
                  <p>{selectedExpense.id}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Date</h4>
                  <p>{selectedExpense.date}</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Category</h4>
                <p>{selectedExpense.category}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                <p>{selectedExpense.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Amount</h4>
                  <p>R {selectedExpense.amount.toFixed(2)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    selectedExpense.status === 'approved' 
                      ? 'bg-green-100 text-green-800' 
                      : selectedExpense.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedExpense.status.charAt(0).toUpperCase() + selectedExpense.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewOpen(false)}>Close</Button>
              <Button onClick={() => handleDownloadExpense(selectedExpense)}>
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ExpenseManagement;
