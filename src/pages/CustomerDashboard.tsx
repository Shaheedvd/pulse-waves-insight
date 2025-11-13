import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, BarChart3, Calendar } from "lucide-react";

const CustomerDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users size={32} className="text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Customer Portal</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Dashboard</h2>
          <p className="text-gray-600">Access your evaluations, reports, and insights</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="text-blue-600" size={24} />
                </div>
                <div>
                  <CardTitle>My Evaluations</CardTitle>
                  <CardDescription>View evaluation results</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Access your completed evaluations and feedback</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="text-green-600" size={24} />
                </div>
                <div>
                  <CardTitle>Reports</CardTitle>
                  <CardDescription>Performance analytics</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">View detailed reports and analytics</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="text-purple-600" size={24} />
                </div>
                <div>
                  <CardTitle>Scheduled Reviews</CardTitle>
                  <CardDescription>Upcoming evaluations</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">See your scheduled evaluation dates</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
