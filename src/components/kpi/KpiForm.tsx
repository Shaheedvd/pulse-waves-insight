
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { KpiMetric } from "@/types/kpi";

interface KpiFormProps {
  onSubmit: (kpi: Omit<KpiMetric, "id">) => void;
  onCancel: () => void;
  initialData?: KpiMetric;
}

const KpiForm: React.FC<KpiFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    category: (initialData?.category || "financial") as KpiMetric["category"],
    name: initialData?.name || "",
    description: initialData?.description || "",
    target: initialData?.target || "",
    weighting: initialData?.weighting || 20,
    currentValue: initialData?.currentValue || null,
    status: (initialData?.status || "pending") as KpiMetric["status"],
    trend: (initialData?.trend || "none") as KpiMetric["trend"]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleWeightingChange = (value: number[]) => {
    setFormData({ ...formData, weighting: value[0] });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value: KpiMetric["category"]) => 
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="financial">Financial</SelectItem>
              <SelectItem value="operational">Operational</SelectItem>
              <SelectItem value="client">Client</SelectItem>
              <SelectItem value="internal">Internal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">KPI Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter KPI name"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe what this KPI measures"
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="target">Target</Label>
          <Input
            id="target"
            value={formData.target}
            onChange={(e) => setFormData({ ...formData, target: e.target.value })}
            placeholder="e.g., ≥ 95% or ≤ 4 hours"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentValue">Current Value</Label>
          <Input
            id="currentValue"
            type="number"
            step="0.1"
            value={formData.currentValue || ""}
            onChange={(e) => setFormData({ 
              ...formData, 
              currentValue: e.target.value ? parseFloat(e.target.value) : null 
            })}
            placeholder="Enter current value"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Weighting: {formData.weighting}%</Label>
        <Slider
          value={[formData.weighting]}
          onValueChange={handleWeightingChange}
          max={50}
          min={5}
          step={5}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground">
          How important is this KPI relative to others in its category?
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="status">Current Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value: KpiMetric["status"]) => 
              setFormData({ ...formData, status: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="exceeding">Exceeding</SelectItem>
              <SelectItem value="meeting">Meeting</SelectItem>
              <SelectItem value="below">Below Target</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="trend">Trend</Label>
          <Select
            value={formData.trend}
            onValueChange={(value: KpiMetric["trend"]) => 
              setFormData({ ...formData, trend: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select trend" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="up">Improving</SelectItem>
              <SelectItem value="down">Declining</SelectItem>
              <SelectItem value="stable">Stable</SelectItem>
              <SelectItem value="none">No Data</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? "Update" : "Create"} KPI
        </Button>
      </div>
    </form>
  );
};

export default KpiForm;
