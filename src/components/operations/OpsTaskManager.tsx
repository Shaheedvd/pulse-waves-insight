
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useOperations } from '@/contexts/OperationsContext';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, Search, Filter, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import OpsTaskForm from './OpsTaskForm';
import { OpsTask, TaskStatus, TaskPriority } from '@/types/operations';

const OpsTaskManager = () => {
  const { opsTasks, updateOpsTask, deleteOpsTask } = useOperations();
  const { currentUser } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all');

  const filteredTasks = opsTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status: TaskStatus) => {
    const variants: Record<TaskStatus, { variant: any; className: string }> = {
      'not-started': { variant: 'outline', className: 'bg-gray-100' },
      'in-progress': { variant: 'default', className: 'bg-blue-100 text-blue-800' },
      'blocked': { variant: 'destructive', className: 'bg-red-100 text-red-800' },
      'review': { variant: 'secondary', className: 'bg-yellow-100 text-yellow-800' },
      'completed': { variant: 'default', className: 'bg-green-100 text-green-800' },
      'cancelled': { variant: 'outline', className: 'bg-gray-100' }
    };
    
    return (
      <Badge className={variants[status].className}>
        {status.replace('-', ' ').toUpperCase()}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: TaskPriority) => {
    const variants: Record<TaskPriority, string> = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={variants[priority]}>
        {priority.toUpperCase()}
      </Badge>
    );
  };

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'blocked':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const isOverdue = (task: OpsTask) => {
    return new Date(task.dueDate) < new Date() && task.status !== 'completed';
  };

  const taskStats = {
    total: opsTasks.length,
    completed: opsTasks.filter(t => t.status === 'completed').length,
    inProgress: opsTasks.filter(t => t.status === 'in-progress').length,
    overdue: opsTasks.filter(t => isOverdue(t)).length
  };

  const completionRate = taskStats.total > 0 ? (taskStats.completed / taskStats.total) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Task & Workflow Management</h2>
          <p className="text-muted-foreground">Assign and track operational tasks across all departments</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Create New Operations Task</DialogTitle>
            </DialogHeader>
            <OpsTaskForm onClose={() => setIsCreateModalOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Task Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                <h3 className="text-2xl font-bold">{taskStats.total}</h3>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <h3 className="text-2xl font-bold">{taskStats.inProgress}</h3>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <h3 className="text-2xl font-bold">{taskStats.completed}</h3>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                <h3 className="text-2xl font-bold text-red-600">{taskStats.overdue}</h3>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Completion Rate */}
      <Card>
        <CardHeader>
          <CardTitle>Task Completion Rate</CardTitle>
          <CardDescription>Overall progress across all operational tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Completion Rate</span>
              <span>{Math.round(completionRate)}%</span>
            </div>
            <Progress value={completionRate} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Task Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as TaskStatus | 'all')}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="not-started">Not Started</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={(value) => setPriorityFilter(value as TaskPriority | 'all')}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Tasks ({filteredTasks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id} className={isOverdue(task) ? 'bg-red-50' : ''}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(task.status)}
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {task.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{task.assignedToName}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{task.department}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(task.status)}</TableCell>
                  <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                  <TableCell>
                    <div className={isOverdue(task) ? 'text-red-600 font-medium' : ''}>
                      {new Date(task.dueDate).toLocaleDateString()}
                      {isOverdue(task) && (
                        <p className="text-xs text-red-500">OVERDUE</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteOpsTask(task.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredTasks.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="mx-auto h-12 w-12 mb-4" />
              <p className="text-lg font-medium mb-2">No tasks found</p>
              <p>Try adjusting your filters or create a new task</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OpsTaskManager;
