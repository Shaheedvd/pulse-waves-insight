
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Plus, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RequestsManager = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Internal Requests & Work Orders</h2>
          <p className="text-muted-foreground">System for employees to request operational support</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Request
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Open Requests</p>
                <h3 className="text-2xl font-bold">15</h3>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">HR Ops</p>
                <h3 className="text-2xl font-bold">5</h3>
              </div>
              <FileText className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Finance Ops</p>
                <h3 className="text-2xl font-bold">4</h3>
              </div>
              <FileText className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Maintenance</p>
                <h3 className="text-2xl font-bold">6</h3>
              </div>
              <FileText className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Request Management System</CardTitle>
          <CardDescription>Streamlined workflow for internal operational requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Clock className="mx-auto h-16 w-16 mb-4" />
            <p className="text-lg font-medium mb-2">Request System Coming Soon</p>
            <p>Complete request management with approval workflows and automated notifications</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestsManager;
