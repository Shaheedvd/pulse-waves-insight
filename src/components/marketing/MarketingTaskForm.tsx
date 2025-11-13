
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
import { MarketingTask } from "@/types/marketing";
import { useInputValidation } from "@/hooks/useInputValidation";
import { useToast } from "@/hooks/use-toast";

interface MarketingTaskFormProps {
  task?: MarketingTask;
  onClose: () => void;
  onSuccess: (task: MarketingTask) => void;
}

const subcategories: { [key: string]: string[] } = {
  "Digital Marketing": ["SEO", "PPC", "Email Marketing", "Web Analytics", "Conversion Optimization"],
  "Content Marketing": ["Blog Posts", "Whitepapers", "Case Studies", "Infographics", "Videos"],
  "Social Media Marketing": ["LinkedIn", "Twitter", "Facebook", "Instagram", "Content Calendar"],
  "Direct Sales & Business Development": ["Targeted Outreach", "Partnerships", "Referral Program", "Lead Nurturing"],
  "Marketing Tools & Technology": ["CRM Management", "Automation", "Analytics Tools", "Email Platforms"]
};

const MarketingTaskForm: React.FC<MarketingTaskFormProps> = ({
  task,
  onClose,
  onSuccess
}) => {
  const { validateField, marketingTaskSchema } = useInputValidation();
  const { toast } = useToast();
  const [formData, setFormData] = useState<MarketingTask>({
    id: task?.id || Math.random().toString(36).substr(2, 9),
    title: task?.title || "",
    description: task?.description || "",
    type: task?.type || "copywriting",
    assignedTo: task?.assignedTo || "",
    dueDate: task?.dueDate || "",
    status: task?.status || "pending",
    priority: task?.priority || "medium",
    attachments: task?.attachments || [],
    comments: task?.comments || [],
    createdAt: task?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: task?.category || "Digital Marketing",
    subcategory: task?.subcategory || "SEO",
    trackingMethod: task?.trackingMethod || ""
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
    // Reset subcategory if category changes
    if (name === "category") {
      setFormData(prev => ({ 
        ...prev, 
        [name]: value,
        subcategory: subcategories[value]?.[0] || ""
      }));
    }
    
    // Clear error when user selects something
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate using Zod schema
    const validation = validateField(marketingTaskSchema, {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      subcategory: formData.subcategory,
      trackingMethod: formData.trackingMethod,
    });

    if (!validation.isValid) {
      toast({
        title: "Validation Error",
        description: validation.error,
        variant: "destructive",
      });
      return;
    }

    onSuccess(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => handleSelectChange("category", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(subcategories).map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subcategory">Subcategory</Label>
          <Select
            value={formData.subcategory}
            onValueChange={(value) => handleSelectChange("subcategory", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select subcategory" />
            </SelectTrigger>
            <SelectContent>
              {subcategories[formData.category || ""]?.map((subcat) => (
                <SelectItem key={subcat} value={subcat}>{subcat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="title">Task Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          className={errors.title ? "border-red-500" : ""}
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description"
          className={errors.description ? "border-red-500" : ""}
          rows={3}
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="trackingMethod">Tracking Method</Label>
        <Input
          id="trackingMethod"
          name="trackingMethod"
          value={formData.trackingMethod || ""}
          onChange={handleChange}
          placeholder="How will this task be tracked?"
          className={errors.trackingMethod ? "border-red-500" : ""}
        />
        {errors.trackingMethod && <p className="text-sm text-red-500">{errors.trackingMethod}</p>}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="assignedTo">Assigned To</Label>
          <Input
            id="assignedTo"
            name="assignedTo"
            value={formData.assignedTo || ""}
            onChange={handleChange}
            placeholder="Enter assignee name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            name="dueDate"
            type="date"
            value={formData.dueDate || ""}
            onChange={handleChange}
          />
        </div>
      </div>
      
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
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="todo">To Do</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="blocked">Blocked</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          {task ? "Update" : "Create"} Task
        </Button>
      </div>
    </form>
  );
};

export default MarketingTaskForm;
