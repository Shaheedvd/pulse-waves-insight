
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
import { TrainingResource } from "@/types/marketing";

interface TrainingResourceFormProps {
  resource?: TrainingResource;
  onClose: () => void;
  onSuccess: (resource: TrainingResource) => void;
}

const TrainingResourceForm: React.FC<TrainingResourceFormProps> = ({
  resource,
  onClose,
  onSuccess
}) => {
  const [formData, setFormData] = useState<Partial<TrainingResource>>(
    resource || {
      id: Math.random().toString(36).substr(2, 9),
      title: "",
      category: "SEO",
      description: "",
      contentType: "document",
      url: "",
      createdBy: "Current User", // In a real app, this would come from auth
      createdAt: new Date().toISOString()
    }
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSelectChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
    // Clear error when user selects something
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.title?.trim()) {
      newErrors.title = "Resource title is required";
    }
    
    if (!formData.description?.trim()) {
      newErrors.description = "Description is required";
    }
    
    if (!formData.url?.trim()) {
      newErrors.url = "URL is required";
    } else if (!isValidUrl(formData.url)) {
      newErrors.url = "Please enter a valid URL";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSuccess(formData as TrainingResource);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Resource Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter resource title"
          className={errors.title ? "border-red-500" : ""}
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
      </div>
      
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
              <SelectItem value="SEO">SEO</SelectItem>
              <SelectItem value="Social Media">Social Media</SelectItem>
              <SelectItem value="Email Marketing">Email Marketing</SelectItem>
              <SelectItem value="Collaboration">Collaboration</SelectItem>
              <SelectItem value="Gamification">Gamification</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contentType">Content Type</Label>
          <Select
            value={formData.contentType}
            onValueChange={(value: any) => handleSelectChange("contentType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select content type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="document">Document</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="quiz">Quiz</SelectItem>
              <SelectItem value="interactive">Interactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter resource description"
          className={errors.description ? "border-red-500" : ""}
          rows={3}
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="url">Resource URL</Label>
        <Input
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="https://example.com/resource"
          className={errors.url ? "border-red-500" : ""}
        />
        {errors.url && <p className="text-sm text-red-500">{errors.url}</p>}
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          {resource ? "Update" : "Add"} Resource
        </Button>
      </div>
    </form>
  );
};

export default TrainingResourceForm;
