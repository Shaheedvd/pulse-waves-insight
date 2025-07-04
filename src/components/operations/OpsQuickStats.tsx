
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTask } from '@/contexts/TaskContext';
import { useCommunication } from '@/contexts/CommunicationContext';

const OpsQuickStats = () => {
  const { tasks } = useTask();
  const { teamsCalls, whatsappMessages } = useCommunication();
  
  const completedTasks = tasks.filter(t => t.status === "completed").length;
  const todaysCalls = teamsCalls.filter(call => 
    new Date(call.createdAt).toDateString() === new Date().toDateString()
  ).length;
  const todaysMessages = whatsappMessages.filter(msg => 
    new Date(msg.createdAt).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Today's Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Tasks Completed</span>
              <Badge variant="secondary">{completedTasks}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Teams Meetings</span>
              <Badge variant="secondary">{todaysCalls}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">WhatsApp Messages</span>
              <Badge variant="secondary">{todaysMessages}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Department Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">HR Operations</span>
              <Badge className="bg-green-100 text-green-800">On Track</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Maintenance</span>
              <Badge className="bg-orange-100 text-orange-800">Attention</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Finance Ops</span>
              <Badge className="bg-green-100 text-green-800">On Track</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">System Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Teams Integration</span>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">WhatsApp API</span>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Data Sync</span>
              <Badge className="bg-green-100 text-green-800">Current</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OpsQuickStats;
