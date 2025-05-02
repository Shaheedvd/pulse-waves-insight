
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Project } from "@/types/marketing";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectFormProps {
  project?: Project;
  onClose: () => void;
  onSuccess: (project: Project) => void;
}

// Sample users for assignment
const sampleUsers = [
  "Jane Smith",
  "John Doe",
  "Mike Brown",
  "Sarah Johnson",
  "Alex Green",
  "Lisa Park"
];

const ProjectForm: React.FC<ProjectFormProps> = ({
  project,
  onClose,
  onSuccess
}) => {
  const [formData, setFormData] = useState<Partial<Project>>(
    project || {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      description: "",
      status: "not-started",
      priority: "medium",
      dueDate: "",
      assignedTo: [],
      completionPercentage: 0,
      tasks: [],
      createdBy: "Current User", // In a real app, this would come from auth
      createdAt: new Date().toISOString()
    }
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [date, setDate] = useState<Date | undefined>(
    project?.dueDate ? new Date(project.dueDate) : undefined
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    // Clear error when user selects something
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      setFormData({ ...formData, dueDate: newDate.toISOString() });
    }
    // Clear error when user selects a date
    if (errors.dueDate) {
      setErrors({ ...errors, dueDate: "" });
    }
  };

  const handleUserSelection = (user: string) => {
    const currentAssignees = formData.assignedTo || [];
    if (currentAssignees.includes(user)) {
      setFormData({
        ...formData,
        assignedTo: currentAssignees.filter(u => u !== user)
      });
    } else {
      setFormData({
        ...formData,
        assignedTo: [...currentAssignees, user]
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = "Project name is required";
    }
    
    if (!formData.description?.trim()) {
      newErrors.description = "Description is required";
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSuccess(formData as Project);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Project Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter project name"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter project description"
          className={errors.description ? "border-red-500" : ""}
          rows={3}
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value: any) => handleSelectChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="not-started">Not Started</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select
            value={formData.priority}
            onValueChange={(value: any) => handleSelectChange("priority", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                  errors.dueDate ? "border-red-500" : ""
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
          {errors.dueDate && <p className="text-sm text-red-500">{errors.dueDate}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="completionPercentage">Completion Percentage</Label>
          <Input
            id="completionPercentage"
            name="completionPercentage"
            type="number"
            min="0"
            max="100"
            value={formData.completionPercentage}
            onChange={handleChange}
            placeholder="Enter completion percentage"
          />
        </div>
      </div>
      
      <div className="space-y-3">
        <Label>Assign Team Members</Label>
        <div className="grid grid-cols-2 gap-2">
          {sampleUsers.map((user) => (
            <div key={user} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`user-${user.replace(/\s+/g, '-').toLowerCase()}`}
                checked={(formData.assignedTo || []).includes(user)}
                onChange={() => handleUserSelection(user)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor={`user-${user.replace(/\s+/g, '-').toLowerCase()}`}>{user}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          {project ? "Update" : "Create"} Project
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
