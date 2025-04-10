
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { CalendarRange, Calculator, FileText, ListChecks, CreditCard, ArrowUpDown } from "lucide-react";

// Sample data for the charts
const revenueData = [
  { month: 'Jan', income: 15500, expenses: 12000 },
  { month: 'Feb', income: 18200, expenses: 13400 },
  { month: 'Mar', income: 16800, expenses: 11900 },
  { month: 'Apr', income: 19500, expenses: 14200 },
  { month: 'May', income: 21000, expenses: 15800 },
  { month: 'Jun', income: 22000, expenses: 16500 },
];

const incomeSourceData = [
  { name: 'Restaurant Audits', value: 55000, color: '#8884d8' },
  { name: 'Forecourt & Shop Audits', value: 45000, color: '#82ca9d' },
  { name: 'School Audits', value: 25000, color: '#ffc658' },
  { name: 'Hotel Audits', value: 22000, color: '#ff8042' },
];

const expenseData = [
  { name: 'Evaluator Payments', value: 30000, color: '#0088FE' },
  { name: 'Staff Salaries', value: 45000, color: '#00C49F' },
  { name: 'Operations', value: 15000, color: '#FFBB28' },
  { name: 'Marketing', value: 10000, color: '#FF8042' },
];

const FinancialDashboard = () => {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R 147,000</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R 100,000</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Total value: R 66,000
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32%</div>
            <p className="text-xs text-muted-foreground">
              +2.5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue vs Expenses</CardTitle>
              <CardDescription>
                Financial performance for the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `R ${value}`} />
                  <Legend />
                  <Bar dataKey="income" name="Income" fill="#8884d8" />
                  <Bar dataKey="expenses" name="Expenses" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="income" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Income by Source</CardTitle>
              <CardDescription>
                Breakdown of revenue streams
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={incomeSourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {incomeSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `R ${value}`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Categories</CardTitle>
              <CardDescription>
                Breakdown of operational costs
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `R ${value}`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Latest financial activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: '2023-06-15', description: 'Invoice #5591 - QuickMart Audit', amount: 'R 5,500', type: 'income' },
                { date: '2023-06-12', description: 'Evaluator Payment - E. Walker', amount: 'R 2,500', type: 'expense' },
                { date: '2023-06-10', description: 'Invoice #5590 - EcoFuel Forecourt', amount: 'R 5,500', type: 'income' },
                { date: '2023-06-05', description: 'Evaluator Payment - S. Johnson', amount: 'R 2,000', type: 'expense' },
                { date: '2023-06-01', description: 'Invoice #5589 - Central High School', amount: 'R 2,500', type: 'income' },
              ].map((transaction, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{transaction.description}</span>
                    <span className="text-xs text-muted-foreground">{transaction.date}</span>
                  </div>
                  <span className={`font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : '-'} {transaction.amount}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Payments</CardTitle>
            <CardDescription>
              Scheduled transactions for next 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: '2023-06-18', description: 'Evaluator Payment - T. Nkosi', amount: 'R 3,000', status: 'pending' },
                { date: '2023-06-20', description: 'Invoice #5592 - LuxCafé', amount: 'R 5,500', status: 'scheduled' },
                { date: '2023-06-22', description: 'Evaluator Payment - M. Patel', amount: 'R 2,500', status: 'pending' },
              ].map((payment, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{payment.description}</span>
                    <span className="text-xs text-muted-foreground">{payment.date}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{payment.amount}</span>
                    <span className={`text-xs rounded-full px-2 py-1 ${
                      payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialDashboard;
