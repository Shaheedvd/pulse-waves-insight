
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderOpen, Plus, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProjectTracker = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Project & Milestone Management</h2>
          <p className="text-muted-foreground">Coordinate high-level initiatives with dependencies and timelines</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                <h3 className="text-2xl font-bold">8</h3>
              </div>
              <FolderOpen className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">On Schedule</p>
                <h3 className="text-2xl font-bold">6</h3>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">At Risk</p>
                <h3 className="text-2xl font-bold">2</h3>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500 rotate-180" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Timeline View</CardTitle>
          <CardDescription>Visual timeline of all active projects and milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <FolderOpen className="mx-auto h-16 w-16 mb-4" />
            <p className="text-lg font-medium mb-2">Project Management Coming Soon</p>
            <p>Complete project tracking with Gantt charts, dependencies, and milestone management</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectTracker;
