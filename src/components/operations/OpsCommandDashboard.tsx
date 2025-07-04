
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ClipboardCheck, 
  Users, 
  AlertTriangle, 
  MessageSquare, 
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTask } from '@/contexts/TaskContext';
import { useCommunication } from '@/contexts/CommunicationContext';

const OpsCommandDashboard = () => {
  const { currentUser } = useAuth();
  const { tasks } = useTask();
  const { teamsCalls, whatsappMessages } = useCommunication();

  // Calculate KPIs
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "completed").length;
  const overdueTasks = tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== "completed").length;

  const todaysCalls = teamsCalls.filter(call => 
    new Date(call.createdAt).toDateString() === new Date().toDateString()
  ).length;

  const todaysMessages = whatsappMessages.filter(msg => 
    new Date(msg.createdAt).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Operations Management System</h1>
          <p className="text-muted-foreground">Central command for operational visibility and coordination</p>
        </div>
        <Badge variant="outline" className="bg-background">
          {currentUser?.role === "superuser" ? "System Administrator" : "Operations Dashboard"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="flex items-center pt-6">
            <div className="bg-blue-200 p-3 rounded-lg">
              <ClipboardCheck className="h-8 w-8 text-blue-700" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Active Tasks</p>
              <h3 className="text-2xl font-bold">{totalTasks}</h3>
              <p className="text-xs text-muted-foreground">{overdueTasks} overdue</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="flex items-center pt-6">
            <div className="bg-green-200 p-3 rounded-lg">
              <Users className="h-8 w-8 text-green-700" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Teams Calls</p>
              <h3 className="text-2xl font-bold">{todaysCalls}</h3>
              <p className="text-xs text-muted-foreground">Today</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="flex items-center pt-6">
            <div className="bg-purple-200 p-3 rounded-lg">
              <MessageSquare className="h-8 w-8 text-purple-700" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">WhatsApp</p>
              <h3 className="text-2xl font-bold">{todaysMessages}</h3>
              <p className="text-xs text-muted-foreground">Messages sent</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100">
          <CardContent className="flex items-center pt-6">
            <div className="bg-amber-200 p-3 rounded-lg">
              {overdueTasks > 0 ? (
                <AlertTriangle className="h-8 w-8 text-amber-700" />
              ) : (
                <CheckCircle2 className="h-8 w-8 text-amber-700" />
              )}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Alerts</p>
              <h3 className="text-2xl font-bold">{overdueTasks}</h3>
              <p className="text-xs text-muted-foreground">Items need attention</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OpsCommandDashboard;
