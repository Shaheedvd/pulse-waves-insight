import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FileText, Plus, Search, Download } from "lucide-react";
import { generateFinancialPdf } from "@/lib/pdf-utils";
import ExpenseDetails from "./ExpenseDetails";

interface Expense {
  id: string;
  date: string;
  payee: string;
  category: string;
  amount: number;
  description: string;
  status: 'paid' | 'pending' | 'rejected';
}

const expenseCategories = [
  "Evaluator Payments",
  "Staff Salaries",
  "Office Rent",
  "Equipment",
  "Marketing",
  "Travel Expenses",
  "Software Subscriptions",
  "Utilities",
  "Training",
  "Other"
];

const sampleExpenses: Expense[] = [
  {
    id: "EXP-2023-001",
    date: "2023-06-10",
    payee: "E. Walker",
    category: "Evaluator Payments",
    amount: 2500,
    description: "Payment for 5 evaluations conducted at QuickMart locations",
    status: 'paid'
  },
  {
    id: "EXP-2023-002",
    date: "2023-06-15",
    payee: "Office Solutions Ltd",
    category: "Office Rent",
    amount: 12000,
    description: "Office rent for June 2023",
    status: 'paid'
  },
  {
    id: "EXP-2023-003",
    date: "2023-06-20",
    payee: "S. Johnson",
    category: "Evaluator Payments",
    amount: 2000,
    description: "Payment for 4 evaluations conducted at EcoFuel stations",
    status: 'paid'
  },
  {
    id: "EXP-2023-004",
    date: "2023-06-25",
    payee: "Digital Marketing Pros",
    category: "Marketing",
    amount: 5500,
    description: "Social media campaign for June",
    status: 'pending'
  },
  {
    id: "EXP-2023-005",
    date: "2023-06-28",
    payee: "Tech Supplies Inc",
    category: "Equipment",
    amount: 8000,
    description: "Purchase of 2 new laptops for field evaluators",
    status: 'pending'
  }
];

const ExpenseManagement: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(sampleExpenses);
  const [showNewExpenseForm, setShowNewExpenseForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();
  
  // New expense form state
  const [newExpense, setNewExpense] = useState<Omit<Expense, 'id'>>({
    date: new Date().toISOString().slice(0, 10),
    payee: "",
    category: "",
    amount: 0,
    description: "",
    status: 'pending'
  });
  
  const handleSubmitExpense = (e: React.FormEvent) => {
    e.preventDefault();
    
    const expenseId = `EXP-${new Date().getFullYear()}-${String(expenses.length + 1).padStart(3, '0')}`;
    
    const expense: Expense = {
      id: expenseId,
      ...newExpense
    };
    
    setExpenses([...expenses, expense]);
    
    toast({
      title: "Expense Added",
      description: `Expense ${expenseId} has been added successfully.`
    });
    
    // Reset form
    setNewExpense({
      date: new Date().toISOString().slice(0, 10),
      payee: "",
      category: "",
      amount: 0,
      description: "",
      status: 'pending'
    });
    
    setShowNewExpenseForm(false);
  };
  
  const filteredExpenses = expenses.filter(expense => {
    return (
      expense.payee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  const handleDownloadReport = () => {
    const expenseData = {
      expenses: expenses,
      totals: {
        paid: expenses.filter(exp => exp.status === 'paid').reduce((acc, exp) => acc + exp.amount, 0),
        pending: expenses.filter(exp => exp.status === 'pending').reduce((acc, exp) => acc + exp.amount, 0),
        total: expenses.reduce((acc, exp) => acc + exp.amount, 0)
      },
      byCategory: expenseCategories.map(category => ({
        category,
        amount: expenses
          .filter(exp => exp.category === category)
          .reduce((acc, exp) => acc + exp.amount, 0)
      }))
    };
    
    generateFinancialPdf("Expense Report", expenseData);
    
    toast({
      title: "Report Downloaded",
      description: "Expense report has been downloaded as a PDF."
    });
  };
  
  const handleViewDetails = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsDetailsOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search expenses..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleDownloadReport}>
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
          <Button onClick={() => setShowNewExpenseForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Expense
          </Button>
        </div>
      </div>

      {showNewExpenseForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Expense</CardTitle>
            <CardDescription>Enter the details for the new expense</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmitExpense}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    required
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payee">Payee/Vendor</Label>
                  <Input
                    id="payee"
                    placeholder="Enter payee or vendor name"
                    required
                    value={newExpense.payee}
                    onChange={(e) => setNewExpense({...newExpense, payee: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={newExpense.category}
                    onValueChange={(value) => setNewExpense({...newExpense, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {expenseCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (R)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    required
                    min="0"
                    step="0.01"
                    value={newExpense.amount || ''}
                    onChange={(e) => setNewExpense({...newExpense, amount: parseFloat(e.target.value)})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter a description of the expense"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={newExpense.status}
                  onValueChange={(value: 'paid' | 'pending' | 'rejected') => 
                    setNewExpense({...newExpense, status: value})
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => setShowNewExpenseForm(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Expense</Button>
            </CardFooter>
          </form>
        </Card>
      )}

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Expense List</CardTitle>
            <CardDescription>Manage and view all expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredExpenses.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No expenses found</p>
                </div>
              ) : (
                filteredExpenses.map((expense) => (
                  <div 
                    key={expense.id} 
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg"
                  >
                    <div className="space-y-1 mb-2 sm:mb-0">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <p className="font-medium">{expense.payee}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {expense.id} • {expense.category} • {expense.date}
                      </p>
                      <p className="text-sm">{expense.description}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 self-end sm:self-auto">
                      <div className="flex items-center mr-2">
                        <span className="font-bold text-right">R {expense.amount.toFixed(2)}</span>
                        <span className={`ml-2 text-xs rounded-full px-2 py-1 ${
                          expense.status === 'paid' ? 'bg-green-100 text-green-800' : 
                          expense.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewDetails(expense)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <ExpenseDetails
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        expense={selectedExpense}
      />
    </div>
  );
};

export default ExpenseManagement;
