
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Plus, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const IncidentLog = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Operational Incident & Escalation Log</h2>
          <p className="text-muted-foreground">Record of breakdowns, service failures, and operational risks</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Report Incident
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Open Incidents</p>
                <h3 className="text-2xl font-bold">3</h3>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical</p>
                <h3 className="text-2xl font-bold">1</h3>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resolved Today</p>
                <h3 className="text-2xl font-bold">2</h3>
              </div>
              <Shield className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Incident Management System</CardTitle>
          <CardDescription>Track and resolve operational incidents with escalation workflows</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Shield className="mx-auto h-16 w-16 mb-4" />
            <p className="text-lg font-medium mb-2">Incident Tracking Coming Soon</p>
            <p>Complete incident management with automated escalation and trend analysis</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncidentLog;
