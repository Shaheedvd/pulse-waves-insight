
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { generateFinancialPdf } from "@/lib/utils";

// Sample financial data
const revenueData = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 67000 },
];

// Sample KPI data
const kpiData = {
  revenueYTD: 328000,
  expensesYTD: 245000,
  profitMargin: 25.3,
  outstandingInvoices: 52000,
  overdueInvoices: 18000,
};

// Recent transactions
const recentTransactions = [
  {
    id: "T12345",
    description: "Client payment - ABC Corp",
    amount: 12500,
    type: "income",
    date: "2025-05-03",
  },
  {
    id: "T12346",
    description: "Office rent payment",
    amount: 8500,
    type: "expense",
    date: "2025-05-02",
  },
  {
    id: "T12347",
    description: "New equipment purchase",
    amount: 4250,
    type: "expense",
    date: "2025-05-01",
  },
  {
    id: "T12348",
    description: "Client payment - XYZ Ltd",
    amount: 9800,
    type: "income",
    date: "2025-04-30",
  },
];

const FinancialDashboard = () => {
  // Function to handle downloading the financial summary report
  const handleDownloadReport = () => {
    generateFinancialPdf({
      period: "YTD Financial Summary",
      revenue: kpiData.revenueYTD,
      expenses: kpiData.expensesYTD,
      profit: kpiData.revenueYTD - kpiData.expensesYTD,
      outstandingInvoices: kpiData.outstandingInvoices,
    });
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue YTD</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R {kpiData.revenueYTD.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Expenses YTD</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R {kpiData.expensesYTD.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8% from last year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{kpiData.profitMargin}%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">R {kpiData.outstandingInvoices.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600 font-medium">R {kpiData.overdueInvoices.toLocaleString()}</span> overdue
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue</CardTitle>
          <CardDescription>Revenue trends for the current year</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`R ${value.toLocaleString()}`, 'Revenue']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Bar dataKey="revenue" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Transactions and Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest financial activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                  <div className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : '-'} R {transaction.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Summary</CardTitle>
            <CardDescription>YTD overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Revenue</span>
                <span className="font-bold">R {kpiData.revenueYTD.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Expenses</span>
                <span className="font-bold">R {kpiData.expensesYTD.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Net Profit</span>
                <span className="font-bold text-green-600">
                  R {(kpiData.revenueYTD - kpiData.expensesYTD).toLocaleString()}
                </span>
              </div>
            </div>
            <div>
              <button 
                onClick={handleDownloadReport}
                className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
              >
                Download Report
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialDashboard;
