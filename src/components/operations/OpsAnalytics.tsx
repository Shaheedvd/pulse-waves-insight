
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, PieChart } from 'lucide-react';

const OpsAnalytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Operations Analytics & Reporting</h2>
        <p className="text-muted-foreground">Actionable insights on workload, responsiveness, and productivity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                <h3 className="text-2xl font-bold">2.4h</h3>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">SLA Compliance</p>
                <h3 className="text-2xl font-bold">94%</h3>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Productivity Index</p>
                <h3 className="text-2xl font-bold">87%</h3>
              </div>
              <PieChart className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>Task completion rates by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <BarChart3 className="mx-auto h-12 w-12 mb-4" />
              <p className="text-lg font-medium mb-2">Performance Charts</p>
              <p>Detailed analytics and reporting dashboard</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Communication Analytics</CardTitle>
            <CardDescription>Teams calls and WhatsApp message metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <PieChart className="mx-auto h-12 w-12 mb-4" />
              <p className="text-lg font-medium mb-2">Communication Insights</p>
              <p>Response times and engagement metrics</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OpsAnalytics;
