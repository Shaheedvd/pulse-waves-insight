
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useOperations } from '@/contexts/OperationsContext';
import { useAuth, Department } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { TaskPriority, TaskStatus } from '@/types/operations';
import { X } from 'lucide-react';

interface OpsTaskFormProps {
  onClose: () => void;
  taskId?: string;
}

const OpsTaskForm: React.FC<OpsTaskFormProps> = ({ onClose, taskId }) => {
  const { createOpsTask, updateOpsTask, opsTasks } = useOperations();
  const { currentUser, users } = useAuth();
  const { toast } = useToast();

  const existingTask = taskId ? opsTasks.find(t => t.id === taskId) : null;
  const isEdit = Boolean(existingTask);

  const [formData, setFormData] = useState({
    title: existingTask?.title || '',
    description: existingTask?.description || '',
    assignedTo: existingTask?.assignedTo || '',
    department: existingTask?.department || ('operations' as Department),
    linkedModule: existingTask?.linkedModule || '',
    linkedEntityId: existingTask?.linkedEntityId || '',
    status: existingTask?.status || ('not-started' as TaskStatus),
    priority: existingTask?.priority || ('medium' as TaskPriority),
    dueDate: existingTask?.dueDate?.split('T')[0] || '',
    estimatedHours: existingTask?.estimatedHours || 0,
    tags: existingTask?.tags || []
  });

  const [newTag, setNewTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast({
        title: 'Error',
        description: 'You must be logged in to create tasks',
        variant: 'destructive'
      });
      return;
    }

    if (!formData.title || !formData.assignedTo || !formData.dueDate) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    const assignedUser = users.find(u => u.id === formData.assignedTo);
    if (!assignedUser) {
      toast({
        title: 'Error',
        description: 'Selected user not found',
        variant: 'destructive'
      });
      return;
    }

    const taskData = {
      ...formData,
      assignedToName: assignedUser.name,
      dueDate: new Date(formData.dueDate).toISOString(),
      createdBy: currentUser.id
    };

    if (isEdit && taskId) {
      updateOpsTask(taskId, taskData);
      toast({
        title: 'Success',
        description: 'Task updated successfully'
      });
    } else {
      createOpsTask(taskData);
      toast({
        title: 'Success',
        description: 'Task created successfully'
      });
    }

    onClose();
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const departments: Department[] = [
    'operations', 'hr', 'finance', 'sales', 'marketing', 'it', 'maintenance', 'legal', 'facilities'
  ];

  const linkedModules = [
    'HR', 'Finance', 'Sales', 'Marketing', 'IT', 'Maintenance', 'CRM', 'Legal', 'Facilities'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="title">Task Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter task title"
            required
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe the task requirements and objectives"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="assignedTo">Assigned To *</Label>
          <Select value={formData.assignedTo} onValueChange={(value) => setFormData(prev => ({ ...prev, assignedTo: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select assignee" />
            </SelectTrigger>
            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name} ({user.department})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="department">Department</Label>
          <Select value={formData.department} onValueChange={(value) => setFormData(prev => ({ ...prev, department: value as Department }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept.charAt(0).toUpperCase() + dept.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="linkedModule">Linked Module (Optional)</Label>
          <Select value={formData.linkedModule} onValueChange={(value) => setFormData(prev => ({ ...prev, linkedModule: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select linked module" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">None</SelectItem>
              {linkedModules.map((module) => (
                <SelectItem key={module} value={module}>
                  {module}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="linkedEntityId">Linked Entity ID</Label>
          <Input
            id="linkedEntityId"
            value={formData.linkedEntityId}
            onChange={(e) => setFormData(prev => ({ ...prev, linkedEntityId: e.target.value }))}
            placeholder="e.g., client ID, project ID"
          />
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as TaskStatus }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="not-started">Not Started</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
              <SelectItem value="review">Review</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="priority">Priority</Label>
          <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value as TaskPriority }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="dueDate">Due Date *</Label>
          <Input
            id="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
            required
          />
        </div>

        <div>
          <Label htmlFor="estimatedHours">Estimated Hours</Label>
          <Input
            id="estimatedHours"
            type="number"
            min="0"
            step="0.5"
            value={formData.estimatedHours}
            onChange={(e) => setFormData(prev => ({ ...prev, estimatedHours: parseFloat(e.target.value) || 0 }))}
            placeholder="0"
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="tags">Tags</Label>
          <div className="flex gap-2 mb-2">
            <Input
              id="tags"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a tag and press Enter"
            />
            <Button type="button" onClick={handleAddTag} variant="outline">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                {tag}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => handleRemoveTag(tag)}
                />
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          {isEdit ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
};

export default OpsTaskForm;
