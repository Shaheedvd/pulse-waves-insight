import React from "react";
import { DepartmentDashboard } from "@/components/dashboard/DepartmentDashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

// Define what your FinancialDashboard component should look like
const FinancialDashboard = () => {
  const [data, setData] = useState({
    overallScore: 85,
    locationsCovered: 12,
    topCategory: "Customer Service",
    improvementArea: "Product Quality",
    categoryScoreData: [
      { name: "Customer Service", value: 92 },
      { name: "Cleanliness", value: 88 },
      { name: "Product Quality", value: 78 },
      { name: "Pricing", value: 85 },
    ],
    upcomingEvaluations: [
      {
        id: "EVAL-2301",
        client: "QuickMart Retail Group",
        location: "Cape Town CBD Branch",
        date: "2025-05-15",
      },
      {
        id: "EVAL-2302",
        client: "EcoFuel Stations",
        location: "Pretoria East Branch",
        date: "2025-05-18",
      },
      {
        id: "EVAL-2303",
        client: "LuxCafé Chain",
        location: "Sandton City Mall",
        date: "2025-05-20",
      },
    ],
  });

  // Create custom metrics and content components that will be displayed outside of DepartmentDashboard
  const financialMetrics = (
    <div className="grid gap-4">
      {/* Custom financial metrics content */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Metrics</CardTitle>
          <CardDescription>Key financial performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Financial metrics content */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Revenue YTD</span>
              <span className="font-bold">R 1,245,000</span>
            </div>
            <div className="flex justify-between">
              <span>Expenses YTD</span>
              <span className="font-bold">R 876,500</span>
            </div>
            <div className="flex justify-between">
              <span>Profit Margin</span>
              <span className="font-bold text-green-600">29.6%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const customDashboardContent = (
    <div className="space-y-4 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Outstanding Invoices</CardTitle>
          <CardDescription>Invoices requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Custom financial content */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Outstanding</span>
              <span className="font-bold text-amber-600">R 124,500</span>
            </div>
            <div className="flex justify-between">
              <span>Overdue</span>
              <span className="font-bold text-red-600">R 45,300</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Use DepartmentDashboard component 
  return (
    <div className="space-y-6">
      <DepartmentDashboard 
        department="finance"
        title="Finance Department Dashboard"
        description="Key performance indicators and tasks for the finance department"
      />
      
      {/* Render custom financial metrics and content separately */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Financial Metrics</h2>
        {financialMetrics}
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-4">Financial Status</h2>
        {customDashboardContent}
      </div>
    </div>
  );
};

export default FinancialDashboard;
