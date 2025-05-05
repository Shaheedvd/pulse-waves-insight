import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { generateFinancialPdf } from "@/utils/pdf-generation";

// Define a schema for the expense form
const expenseSchema = z.object({
  description: z.string().min(2, { message: "Description must be at least 2 characters." }),
  amount: z.string().refine((value) => {
    const num = Number(value);
    return !isNaN(num) && num > 0;
  }, {
    message: "Amount must be a positive number."
  }),
  category: z.string().min(1, { message: "Category is required." }),
  date: z.string().min(1, { message: "Date is required." }),
});

type ExpenseFormValues = z.infer<typeof expenseSchema>;

// Define a type for the expense
type Expense = {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
};

// Define a type for the expense category
type ExpenseCategory = {
  id: string;
  name: string;
};

export const ExpenseManagement = () => {
  const { users } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>([
    { id: "1", name: "Salaries" },
    { id: "2", name: "Rent" },
    { id: "3", name: "Supplies" },
    { id: "4", name: "Marketing" },
  ]);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Initialize react-hook-form
  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      description: "",
      amount: "",
      category: expenseCategories[0]?.name || "",
      date: new Date().toISOString().split('T')[0],
    },
  });

  // Calculate total expenses
  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  // Calculate total invoiced amount (assuming this is a fixed value or comes from another source)
  const totalInvoiced = 500000;

  // Calculate pending amount (assuming this is a fixed value or comes from another source)
  const pendingAmount = 50000;

  // Filter expenses based on search term and category
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || expense.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Function to handle adding a new expense
  const handleAddExpense = (values: ExpenseFormValues) => {
    const newExpense: Expense = {
      id: String(expenses.length + 1),
      description: values.description,
      amount: Number(values.amount),
      category: values.category,
      date: values.date,
    };
    setExpenses([...expenses, newExpense]);
    setIsAddExpenseOpen(false);
    form.reset();
  };

  // Function to handle adding a new category
  const handleAddCategory = (categoryName: string) => {
    const newCategory: ExpenseCategory = {
      id: String(expenseCategories.length + 1),
      name: categoryName,
    };
    setExpenseCategories([...expenseCategories, newCategory]);
    setIsAddCategoryOpen(false);
  };

  // Function to handle downloading the report as PDF
  const handleDownloadReport = () => {
    generateFinancialPdf({
      period: "Current Period",
      revenue: totalInvoiced,
      expenses: totalExpenses,
      profit: totalInvoiced - totalExpenses,
      outstandingInvoices: pendingAmount,
      expenseBreakdown: expenseCategories.map(category => ({
        category: category.name,
        amount: expenses
          .filter(expense => expense.category === category.name)
          .reduce((sum, expense) => sum + expense.amount, 0),
        percentage: Math.round(
          (expenses
            .filter(expense => expense.category === category.name)
            .reduce((sum, expense) => sum + expense.amount, 0) / totalExpenses) * 100
        )
      }))
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold">Expense Management</h2>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <Button onClick={() => setIsAddExpenseOpen(true)}>Add Expense</Button>
          <Button onClick={() => setIsAddCategoryOpen(true)} variant="outline">Add Category</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col md:flex-row space-y-2 md:space-y-0 items-start md:items-center md:justify-between">
          <div>
            <CardTitle>Expenses</CardTitle>
            <CardDescription>Manage and track your expenses</CardDescription>
          </div>
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Input
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {expenseCategories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>R {expense.amount.toFixed(2)}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
            <CardDescription>Total amount of all expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R {totalExpenses.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Download Report</CardTitle>
            <CardDescription>Generate a report of all expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleDownloadReport}>Download</Button>
          </CardContent>
        </Card>
      </div>

      {/* Add Expense Dialog */}
      <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Expense</DialogTitle>
            <DialogDescription>Add a new expense to track</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddExpense)} className="space-y-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="Amount" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {expenseCategories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Add Expense</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Add Category Dialog */}
      <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>Add a new expense category</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue=""
                className="col-span-3"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddCategory((e.target as HTMLInputElement).value);
                    setIsAddCategoryOpen(false);
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => {
              const categoryName = document.getElementById("name") as HTMLInputElement;
              handleAddCategory(categoryName?.value);
              setIsAddCategoryOpen(false);
            }}>
              Add Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
