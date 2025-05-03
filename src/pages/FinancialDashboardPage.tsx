
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
  BarChart,
  Download,
  ArrowRight,
  Calendar,
  Clock,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Import recharts components for the financial charts
import {
  Bar,
  BarChart,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const FinancialDashboardPage = () => {
  const { currentUser } = useAuth();
  const isPowerManager = currentUser?.role === "power_manager" || currentUser?.role === "superuser";

  // Mock revenue data for charts
  const revenueData = [
    { month: "Jan", revenue: 65000, expenses: 45000, profit: 20000 },
    { month: "Feb", revenue: 59000, expenses: 42000, profit: 17000 },
    { month: "Mar", revenue: 80000, expenses: 52000, profit: 28000 },
    { month: "Apr", revenue: 81000, expenses: 56000, profit: 25000 },
    { month: "May", revenue: 86000, expenses: 58000, profit: 28000 },
  ];

  // Mock expense breakdown data
  const expenseData = [
    { name: "Salaries", value: 45 },
    { name: "Operations", value: 20 },
    { name: "Marketing", value: 15 },
    { name: "IT", value: 10 },
    { name: "Other", value: 10 },
  ];

  // Mock upcoming payments data
  const upcomingPayments = [
    {
      id: "1",
      description: "Vendor Payment - Office Supplies",
      amount: 3500,
      due: "2025-05-10",
      status: "pending",
    },
    {
      id: "2",
      description: "Monthly Rent",
      amount: 8500,
      due: "2025-05-15",
      status: "scheduled",
    },
    {
      id: "3",
      description: "Equipment Lease",
      amount: 1200,
      due: "2025-05-20",
      status: "pending",
    },
    {
      id: "4",
      description: "Software Subscriptions",
      amount: 2300,
      due: "2025-05-25",
      status: "scheduled",
    },
  ];

  // Mock recent transactions
  const recentInvoices = [
    {
      id: "INV-2023-045",
      client: "Global Retail Solutions",
      amount: 14500,
      date: "2025-05-01",
      status: "paid",
    },
    {
      id: "INV-2023-044",
      client: "Acme Corporation",
      amount: 8750,
      date: "2025-04-28",
      status: "pending",
    },
    {
      id: "INV-2023-043",
      client: "Tech Innovators Inc.",
      amount: 12300,
      date: "2025-04-25",
      status: "overdue",
    },
    {
      id: "INV-2023-042",
      client: "City Services Ltd.",
      amount: 9500,
      date: "2025-04-22",
      status: "paid",
    },
  ];

  // Colors for the pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD"];

  // Current month's financial summary
  const currentMonthSummary = {
    revenue: 86000,
    expenses: 58000,
    profit: 28000,
    revenueChange: "+6.2%",
    expenseChange: "+3.5%",
    profitChange: "+12.0%",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Financial Dashboard</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-background">
            Department: Finance & Accounting
          </Badge>
          {isPowerManager && (
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Reports
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          {isPowerManager && (
            <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="flex items-center pt-6">
                <div className="bg-green-200 p-3 rounded-lg">
                  <DollarSign className="h-8 w-8 text-green-700" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                  <div className="flex items-center">
                    <h3 className="text-2xl font-bold">${(currentMonthSummary.revenue / 1000).toFixed(1)}k</h3>
                    <span className="ml-2 text-xs font-medium text-green-600 flex items-center">
                      {currentMonthSummary.revenueChange}
                      <TrendingUp className="h-3 w-3 ml-1" />
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
              <CardContent className="flex items-center pt-6">
                <div className="bg-orange-200 p-3 rounded-lg">
                  <Calculator className="h-8 w-8 text-orange-700" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Expenses</p>
                  <div className="flex items-center">
                    <h3 className="text-2xl font-bold">${(currentMonthSummary.expenses / 1000).toFixed(1)}k</h3>
                    <span className="ml-2 text-xs font-medium text-orange-600 flex items-center">
                      {currentMonthSummary.expenseChange}
                      <TrendingDown className="h-3 w-3 ml-1" />
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="flex items-center pt-6">
                <div className="bg-blue-200 p-3 rounded-lg">
                  <BarChart className="h-8 w-8 text-blue-700" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Net Profit</p>
                  <div className="flex items-center">
                    <h3 className="text-2xl font-bold">${(currentMonthSummary.profit / 1000).toFixed(1)}k</h3>
                    <span className="ml-2 text-xs font-medium text-green-600 flex items-center">
                      {currentMonthSummary.profitChange}
                      <TrendingUp className="h-3 w-3 ml-1" />
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Revenue vs. Expenses</CardTitle>
                <CardDescription>Financial performance for the last 5 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={revenueData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="revenue" name="Revenue" fill="#0088FE" />
                      <Bar dataKey="expenses" name="Expenses" fill="#FF8042" />
                      <Bar dataKey="profit" name="Profit" fill="#00C49F" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Current month distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex justify-center">
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
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Payments</CardTitle>
                <CardDescription>Scheduled payments in the next 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between border-b pb-3">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full ${payment.status === 'scheduled' ? 'bg-blue-100' : 'bg-amber-100'}`}>
                          {payment.status === 'scheduled' ? (
                            <Calendar className="h-4 w-4 text-blue-600" />
                          ) : (
                            <Clock className="h-4 w-4 text-amber-600" />
                          )}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">{payment.description}</p>
                          <p className="text-xs text-muted-foreground">
                            Due on {new Date(payment.due).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">${payment.amount.toLocaleString()}</p>
                        <Badge variant={payment.status === 'scheduled' ? 'outline' : 'secondary'} className="text-xs">
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              {isPowerManager && (
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Scheduled Payments
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              )}
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Invoices</CardTitle>
                <CardDescription>Latest client invoices and payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentInvoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between border-b pb-3">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full ${
                          invoice.status === 'paid' ? 'bg-green-100' : 
                          invoice.status === 'pending' ? 'bg-amber-100' : 'bg-red-100'
                        }`}>
                          <FileText className={`h-4 w-4 ${
                            invoice.status === 'paid' ? 'text-green-600' : 
                            invoice.status === 'pending' ? 'text-amber-600' : 'text-red-600'
                          }`} />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">{invoice.id}</p>
                          <p className="text-xs text-muted-foreground">{invoice.client}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">${invoice.amount.toLocaleString()}</p>
                        <Badge variant={
                          invoice.status === 'paid' ? 'default' : 
                          invoice.status === 'pending' ? 'secondary' : 'destructive'
                        } className="text-xs">
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              {isPowerManager && (
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Invoices
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>Monthly revenue analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={revenueData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#0088FE" strokeWidth={2} />
                    <Line type="monotone" dataKey="profit" name="Profit" stroke="#00C49F" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Analysis</CardTitle>
              <CardDescription>Detailed breakdown of company expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {isPowerManager && (
          <TabsContent value="forecasting" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Financial Forecasting</CardTitle>
                <CardDescription>Projected financial performance for the next quarter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        ...revenueData,
                        { month: "Jun", revenue: 92000, expenses: 60000, profit: 32000 },
                        { month: "Jul", revenue: 98000, expenses: 62000, profit: 36000 },
                        { month: "Aug", revenue: 104000, expenses: 65000, profit: 39000 }
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" name="Projected Revenue" stroke="#0088FE" strokeWidth={2} />
                      <Line type="monotone" dataKey="expenses" name="Projected Expenses" stroke="#FF8042" strokeWidth={2} />
                      <Line type="monotone" dataKey="profit" name="Projected Profit" stroke="#00C49F" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-800">Forecast Summary</h3>
                  <p className="text-sm text-blue-700 mt-1">Based on current trends, we project a 20% increase in revenue and 15% increase in profit by the end of Q3 2025.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default FinancialDashboardPage;
