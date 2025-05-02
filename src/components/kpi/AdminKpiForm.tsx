
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
import { AdminKpi } from "@/types/marketing";
import { Slider } from "@/components/ui/slider";

interface AdminKpiFormProps {
  kpi?: AdminKpi;
  onClose: () => void;
  onSuccess: (kpi: AdminKpi) => void;
}

const AdminKpiForm: React.FC<AdminKpiFormProps> = ({
  kpi,
  onClose,
  onSuccess
}) => {
  const [formData, setFormData] = useState<Partial<AdminKpi>>(
    kpi || {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      category: "marketing",
      description: "",
      target: "",
      current: null,
      unit: "%",
      progress: 0,
      trend: "none",
      lastUpdated: new Date().toISOString().split('T')[0]
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

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === "" ? null : Number(value);
    setFormData({ ...formData, [name]: numValue });
    
    // If current value changes, update progress if possible
    if (name === "current") {
      calculateProgress(numValue);
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const calculateProgress = (currentValue: number | null) => {
    if (currentValue === null) {
      setFormData(prev => ({ ...prev, progress: 0 }));
      return;
    }
    
    // This is a simplified calculation - in a real app, you'd parse the target
    // string to extract a numerical value for comparison
    const targetValue = extractTargetValue(formData.target || "");
    if (targetValue !== null) {
      // If the target is a "greater than or equal to" target
      if (formData.target?.includes("≥")) {
        const progress = Math.round((currentValue / targetValue) * 100);
        setFormData(prev => ({ ...prev, progress }));
      }
      // If the target is a "less than or equal to" target
      else if (formData.target?.includes("≤")) {
        const progress = Math.round((targetValue / currentValue) * 100);
        setFormData(prev => ({ ...prev, progress }));
      }
    }
  };

  const extractTargetValue = (targetString: string): number | null => {
    // Extract numeric value from target string like "≥ 95%" or "≤ 7 days"
    const match = targetString.match(/[0-9]+(\.[0-9]+)?/);
    if (match) {
      return parseFloat(match[0]);
    }
    return null;
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
    
    if (!formData.name?.trim()) {
      newErrors.name = "KPI name is required";
    }
    
    if (!formData.description?.trim()) {
      newErrors.description = "Description is required";
    }
    
    if (!formData.target?.trim()) {
      newErrors.target = "Target is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Ensure lastUpdated is today's date
      formData.lastUpdated = new Date().toISOString().split('T')[0];
      onSuccess(formData as AdminKpi);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">KPI Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter KPI name"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>
      
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
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="operations">Operations</SelectItem>
            <SelectItem value="training">Training</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter KPI description"
          className={errors.description ? "border-red-500" : ""}
          rows={2}
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="target">Target/Threshold</Label>
        <Input
          id="target"
          name="target"
          value={formData.target}
          onChange={handleChange}
          placeholder="e.g. ≥ 95% or ≤ 7 days"
          className={errors.target ? "border-red-500" : ""}
        />
        {errors.target && <p className="text-sm text-red-500">{errors.target}</p>}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="current">Current Value</Label>
          <Input
            id="current"
            name="current"
            type="number"
            value={formData.current !== null ? formData.current : ""}
            onChange={handleNumberChange}
            placeholder="Enter current value"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="unit">Unit</Label>
          <Input
            id="unit"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            placeholder="%, days, count, etc."
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Progress ({formData.progress}%)</Label>
        <Slider
          defaultValue={[formData.progress || 0]}
          max={200}
          step={1}
          disabled
        />
        <p className="text-xs text-muted-foreground">
          Progress is calculated automatically based on current value and target.
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="trend">Trend</Label>
        <Select
          value={formData.trend}
          onValueChange={(value: any) => handleSelectChange("trend", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select trend" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="up">Improving (Up)</SelectItem>
            <SelectItem value="down">Declining (Down)</SelectItem>
            <SelectItem value="stable">Stable</SelectItem>
            <SelectItem value="none">None</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          {kpi ? "Update" : "Create"} KPI
        </Button>
      </div>
    </form>
  );
};

export default AdminKpiForm;
