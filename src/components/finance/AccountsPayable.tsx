
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFinance } from "@/contexts/FinanceContext";
import { Plus, Eye, Upload, AlertCircle, CreditCard } from "lucide-react";
import { Expense } from "@/types/finance";

const AccountsPayable = () => {
  const { expenses, addExpense, updateExpense } = useFinance();
  const [isCreateExpenseOpen, setIsCreateExpenseOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [newExpense, setNewExpense] = useState({
    vendorName: "",
    description: "",
    amount: 0,
    category: "",
    subcategory: "",
    date: new Date().toISOString().split('T')[0],
    dueDate: "",
    paymentTerms: "",
    departmentId: "",
    projectId: "",
    receiptUrl: ""
  });

  const expenseCategories = [
    "Operating Expenses",
    "Utilities",
    "Rent",
    "Salaries",
    "Marketing",
    "Office Supplies",
    "Travel",
    "Professional Services",
    "Insurance",
    "Maintenance",
    "Other"
  ];

  const departments = [
    { id: "ops", name: "Operations" },
    { id: "marketing", name: "Marketing" },
    { id: "hr", name: "Human Resources" },
    { id: "it", name: "Information Technology" },
    { id: "finance", name: "Finance" }
  ];

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || expense.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || expense.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "approved": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleCreateExpense = () => {
    const expense = {
      ...newExpense,
      status: "pending" as const,
      createdBy: "admin"
    };

    addExpense(expense);
    setIsCreateExpenseOpen(false);
    
    // Reset form
    setNewExpense({
      vendorName: "",
      description: "",
      amount: 0,
      category: "",
      subcategory: "",
      date: new Date().toISOString().split('T')[0],
      dueDate: "",
      paymentTerms: "",
      departmentId: "",
      projectId: "",
      receiptUrl: ""
    });
  };

  const handleApproveExpense = (expenseId: string) => {
    updateExpense(expenseId, { 
      status: "approved",
      approvedBy: "admin"
    });
  };

  const handlePayExpense = (expenseId: string) => {
    updateExpense(expenseId, { 
      status: "paid", 
      paidAt: new Date().toISOString() 
    });
  };

  const totalPayables = expenses
    .filter(e => e.status === 'pending' || e.status === 'approved')
    .reduce((sum, e) => sum + e.amount, 0);

  const overduePayables = expenses
    .filter(e => e.status === 'overdue')
    .reduce((sum, e) => sum + e.amount, 0);

  const monthlyExpenses = expenses
    .filter(e => {
      const expenseDate = new Date(e.date);
      const currentMonth = new Date();
      return expenseDate.getMonth() === currentMonth.getMonth() && 
             expenseDate.getFullYear() === currentMonth.getFullYear();
    })
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Accounts Payable</h2>
          <p className="text-muted-foreground">Manage vendor bills and business expenses</p>
        </div>
        <Button onClick={() => setIsCreateExpenseOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Record Expense
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Payables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R {totalPayables.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">R {overduePayables.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R {monthlyExpenses.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {expenses.filter(e => e.status === 'pending').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search expenses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-64"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="md:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="md:w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {expenseCategories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Expenses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Expenses</CardTitle>
          <CardDescription>All business expenses and vendor payments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.vendorName}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>R {expense.amount.toLocaleString()}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.dueDate || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(expense.status)}>
                      {expense.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedExpense(expense)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      {expense.status === 'pending' && (
                        <Button variant="outline" size="sm" onClick={() => handleApproveExpense(expense.id)}>
                          Approve
                        </Button>
                      )}
                      {expense.status === 'approved' && (
                        <Button variant="outline" size="sm" onClick={() => handlePayExpense(expense.id)}>
                          <CreditCard className="h-4 w-4 mr-1" />
                          Pay
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

      {/* Create Expense Dialog */}
      <Dialog open={isCreateExpenseOpen} onOpenChange={setIsCreateExpenseOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Record New Expense</DialogTitle>
            <DialogDescription>Add a new business expense or vendor bill</DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="vendorName">Vendor Name</Label>
                <Input
                  id="vendorName"
                  value={newExpense.vendorName}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, vendorName: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newExpense.description}
                onChange={(e) => setNewExpense(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the expense"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newExpense.category}
                  onValueChange={(value) => setNewExpense(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {expenseCategories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subcategory">Subcategory</Label>
                <Input
                  id="subcategory"
                  value={newExpense.subcategory}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, subcategory: e.target.value }))}
                  placeholder="Optional subcategory"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="date">Expense Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newExpense.dueDate}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, dueDate: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="paymentTerms">Payment Terms</Label>
                <Select
                  value={newExpense.paymentTerms}
                  onValueChange={(value) => setNewExpense(prev => ({ ...prev, paymentTerms: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select terms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Immediate">Immediate</SelectItem>
                    <SelectItem value="7 days">7 days</SelectItem>
                    <SelectItem value="14 days">14 days</SelectItem>
                    <SelectItem value="30 days">30 days</SelectItem>
                    <SelectItem value="60 days">60 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="department">Department</Label>
                <Select
                  value={newExpense.departmentId}
                  onValueChange={(value) => setNewExpense(prev => ({ ...prev, departmentId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="projectId">Project ID</Label>
                <Input
                  id="projectId"
                  value={newExpense.projectId}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, projectId: e.target.value }))}
                  placeholder="Optional project reference"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="receiptUrl">Receipt/Invoice</Label>
              <div className="flex gap-2">
                <Input
                  id="receiptUrl"
                  value={newExpense.receiptUrl}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, receiptUrl: e.target.value }))}
                  placeholder="File URL or reference"
                />
                <Button type="button" variant="outline">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsCreateExpenseOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleCreateExpense}>
              Record Expense
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Expense Dialog */}
      {selectedExpense && (
        <Dialog open={!!selectedExpense} onOpenChange={() => setSelectedExpense(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Expense Details</DialogTitle>
              <DialogDescription>Complete expense information</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <strong>Vendor:</strong> {selectedExpense.vendorName}
                </div>
                <div>
                  <strong>Amount:</strong> R {selectedExpense.amount.toLocaleString()}
                </div>
                <div>
                  <strong>Category:</strong> {selectedExpense.category}
                </div>
                <div>
                  <strong>Status:</strong> 
                  <Badge className={`ml-2 ${getStatusColor(selectedExpense.status)}`}>
                    {selectedExpense.status}
                  </Badge>
                </div>
                <div>
                  <strong>Date:</strong> {selectedExpense.date}
                </div>
                <div>
                  <strong>Due Date:</strong> {selectedExpense.dueDate || 'N/A'}
                </div>
              </div>

              <div>
                <strong>Description:</strong>
                <p className="mt-1 text-sm text-muted-foreground">{selectedExpense.description}</p>
              </div>

              {selectedExpense.subcategory && (
                <div>
                  <strong>Subcategory:</strong> {selectedExpense.subcategory}
                </div>
              )}

              {selectedExpense.paymentTerms && (
                <div>
                  <strong>Payment Terms:</strong> {selectedExpense.paymentTerms}
                </div>
              )}

              {selectedExpense.departmentId && (
                <div>
                  <strong>Department:</strong> {departments.find(d => d.id === selectedExpense.departmentId)?.name}
                </div>
              )}

              {selectedExpense.projectId && (
                <div>
                  <strong>Project ID:</strong> {selectedExpense.projectId}
                </div>
              )}

              {selectedExpense.receiptUrl && (
                <div>
                  <strong>Receipt/Invoice:</strong> 
                  <Button variant="link" className="ml-2 p-0 h-auto">
                    View Attachment
                  </Button>
                </div>
              )}

              <div className="text-sm text-muted-foreground">
                <strong>Created:</strong> {selectedExpense.createdAt ? new Date(selectedExpense.createdAt).toLocaleDateString() : 'N/A'}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedExpense(null)}>
                Close
              </Button>
              {selectedExpense.status === 'pending' && (
                <Button onClick={() => {
                  handleApproveExpense(selectedExpense.id);
                  setSelectedExpense(null);
                }}>
                  Approve Expense
                </Button>
              )}
              {selectedExpense.status === 'approved' && (
                <Button onClick={() => {
                  handlePayExpense(selectedExpense.id);
                  setSelectedExpense(null);
                }}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Mark as Paid
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AccountsPayable;
