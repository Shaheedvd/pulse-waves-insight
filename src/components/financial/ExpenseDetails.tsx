
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Receipt, User, FileText, Building } from "lucide-react";

interface Expense {
  id: string;
  date: string;
  payee: string;
  category: string;
  amount: number;
  description: string;
  status: 'paid' | 'pending' | 'rejected';
  receiptUrl?: string;
  approvedBy?: string;
  approvalDate?: string;
  notes?: string;
  paymentMethod?: string;
  accountingCode?: string;
}

interface ExpenseDetailsProps {
  open: boolean;
  onClose: () => void;
  expense: Expense | null;
}

const ExpenseDetails: React.FC<ExpenseDetailsProps> = ({
  open,
  onClose,
  expense
}) => {
  if (!expense) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Expense Details</DialogTitle>
          <DialogDescription>
            {expense.id} - {expense.category}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Payee/Vendor</h3>
              <div className="flex items-center mt-1">
                <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                <p className="font-medium">{expense.payee}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              <div className="mt-1">
                {getStatusBadge(expense.status)}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
              <div className="flex items-center mt-1">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <p>{new Date(expense.date).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Amount</h3>
              <p className="font-bold mt-1">R {expense.amount.toFixed(2)}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
              <p className="mt-1">{expense.category}</p>
            </div>
            
            {expense.paymentMethod && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Payment Method</h3>
                <p className="mt-1">{expense.paymentMethod}</p>
              </div>
            )}

            {expense.accountingCode && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Accounting Code</h3>
                <p className="mt-1">{expense.accountingCode}</p>
              </div>
            )}

            {expense.approvedBy && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Approved By</h3>
                <div className="flex items-center mt-1">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p>{expense.approvedBy}</p>
                </div>
              </div>
            )}

            {expense.approvalDate && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Approval Date</h3>
                <div className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p>{new Date(expense.approvalDate).toLocaleDateString()}</p>
                </div>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
            <p className="mt-1 text-sm">{expense.description}</p>
          </div>

          {expense.notes && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Additional Notes</h3>
              <p className="mt-1 text-sm">{expense.notes}</p>
            </div>
          )}

          {expense.receiptUrl && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Receipt</h3>
              <div className="mt-2">
                <Button variant="outline" asChild>
                  <a href={expense.receiptUrl} target="_blank" rel="noopener noreferrer">
                    <Receipt className="h-4 w-4 mr-2" />
                    View Receipt
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseDetails;
