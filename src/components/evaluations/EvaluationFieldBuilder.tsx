
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  CheckSquare,
  MessageSquare,
  ToggleLeft,
  Calendar,
  FileText,
  Plus,
  Trash2,
  GripVertical,
} from "lucide-react";

interface FieldOption {
  id: string;
  label: string;
  value: string;
  score?: number;
}

interface FormField {
  id: string;
  type: "rating" | "multiple_choice" | "yes_no" | "comment" | "number" | "date";
  label: string;
  description?: string;
  required: boolean;
  weight: number;
  placeholder?: string;
  maxRating?: number;
  options?: FieldOption[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
  conditional?: {
    dependsOn: string;
    condition: string;
    value: any;
  };
}

interface EvaluationFieldBuilderProps {
  field: FormField;
  onFieldChange: (field: FormField) => void;
  onRemove: () => void;
  availableFields: FormField[];
}

const EvaluationFieldBuilder: React.FC<EvaluationFieldBuilderProps> = ({
  field,
  onFieldChange,
  onRemove,
  availableFields
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const fieldTypeOptions = [
    { value: "rating", label: "Star Rating", icon: <Star className="h-4 w-4" /> },
    { value: "multiple_choice", label: "Multiple Choice", icon: <CheckSquare className="h-4 w-4" /> },
    { value: "yes_no", label: "Yes/No", icon: <ToggleLeft className="h-4 w-4" /> },
    { value: "comment", label: "Comment", icon: <MessageSquare className="h-4 w-4" /> },
    { value: "number", label: "Number", icon: <FileText className="h-4 w-4" /> },
    { value: "date", label: "Date", icon: <Calendar className="h-4 w-4" /> }
  ];

  const updateField = (updates: Partial<FormField>) => {
    onFieldChange({ ...field, ...updates });
  };

  const addOption = () => {
    const newOption: FieldOption = {
      id: `option-${Date.now()}`,
      label: "",
      value: "",
      score: 0
    };
    
    updateField({
      options: [...(field.options || []), newOption]
    });
  };

  const updateOption = (optionId: string, updates: Partial<FieldOption>) => {
    const updatedOptions = field.options?.map(option =>
      option.id === optionId ? { ...option, ...updates } : option
    );
    updateField({ options: updatedOptions });
  };

  const removeOption = (optionId: string) => {
    const filteredOptions = field.options?.filter(option => option.id !== optionId);
    updateField({ options: filteredOptions });
  };

  const getCurrentFieldIcon = () => {
    const fieldType = fieldTypeOptions.find(ft => ft.value === field.type);
    return fieldType?.icon || <Star className="h-4 w-4" />;
  };

  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
            {getCurrentFieldIcon()}
            <div>
              <CardTitle className="text-base">
                {field.label || "Untitled Field"}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={field.required ? "default" : "secondary"} className="text-xs">
                  {field.required ? "Required" : "Optional"}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Weight: {field.weight}%
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {fieldTypeOptions.find(ft => ft.value === field.type)?.label}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Collapse" : "Expand"}
            </Button>
            <Button variant="ghost" size="sm" onClick={onRemove}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4">
          {/* Basic Configuration */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Field Type</Label>
              <Select value={field.type} onValueChange={(value: any) => updateField({ type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fieldTypeOptions.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        {type.icon}
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Field Label</Label>
              <Input
                value={field.label}
                onChange={(e) => updateField({ label: e.target.value })}
                placeholder="Enter field label"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description (Optional)</Label>
            <Textarea
              value={field.description || ""}
              onChange={(e) => updateField({ description: e.target.value })}
              placeholder="Additional context or instructions for this field"
              rows={2}
            />
          </div>

          {/* Field Weight */}
          <div className="space-y-2">
            <Label>Field Weight: {field.weight}%</Label>
            <Slider
              value={[field.weight]}
              onValueChange={([value]) => updateField({ weight: value })}
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
          </div>

          {/* Required Toggle */}
          <div className="flex items-center justify-between">
            <Label>Required Field</Label>
            <Switch
              checked={field.required}
              onCheckedChange={(checked) => updateField({ required: checked })}
            />
          </div>

          {/* Type-specific Configuration */}
          {field.type === "rating" && (
            <div className="space-y-2">
              <Label>Maximum Rating</Label>
              <Select
                value={field.maxRating?.toString() || "5"}
                onValueChange={(value) => updateField({ maxRating: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="10">10 Point Scale</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {field.type === "multiple_choice" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Options</Label>
                <Button size="sm" onClick={addOption}>
                  <Plus className="h-4 w-4 mr-1" /> Add Option
                </Button>
              </div>
              {field.options?.map((option, index) => (
                <div key={option.id} className="flex items-center gap-2 p-2 border rounded">
                  <Input
                    value={option.label}
                    onChange={(e) => updateOption(option.id, { label: e.target.value, value: e.target.value.toLowerCase().replace(/\s+/g, '_') })}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={option.score || 0}
                    onChange={(e) => updateOption(option.id, { score: parseInt(e.target.value) || 0 })}
                    placeholder="Score"
                    className="w-20"
                  />
                  <Button variant="ghost" size="sm" onClick={() => removeOption(option.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {(field.type === "comment" || field.type === "number") && (
            <div className="space-y-2">
              <Label>Placeholder Text</Label>
              <Input
                value={field.placeholder || ""}
                onChange={(e) => updateField({ placeholder: e.target.value })}
                placeholder="Enter placeholder text"
              />
            </div>
          )}

          {field.type === "number" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Minimum Value</Label>
                <Input
                  type="number"
                  value={field.validation?.min || ""}
                  onChange={(e) => updateField({
                    validation: {
                      ...field.validation,
                      min: parseInt(e.target.value) || undefined
                    }
                  })}
                  placeholder="Min"
                />
              </div>
              <div className="space-y-2">
                <Label>Maximum Value</Label>
                <Input
                  type="number"
                  value={field.validation?.max || ""}
                  onChange={(e) => updateField({
                    validation: {
                      ...field.validation,
                      max: parseInt(e.target.value) || undefined
                    }
                  })}
                  placeholder="Max"
                />
              </div>
            </div>
          )}

          {/* Conditional Logic */}
          <div className="space-y-3 pt-4 border-t">
            <Label>Conditional Display (Optional)</Label>
            <div className="grid grid-cols-3 gap-2">
              <Select
                value={field.conditional?.dependsOn || ""}
                onValueChange={(value) => updateField({
                  conditional: value ? {
                    ...field.conditional,
                    dependsOn: value
                  } : undefined
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Depends on field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No dependency</SelectItem>
                  {availableFields.filter(f => f.id !== field.id).map((f) => (
                    <SelectItem key={f.id} value={f.id}>
                      {f.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {field.conditional?.dependsOn && (
                <>
                  <Select
                    value={field.conditional?.condition || ""}
                    onValueChange={(value) => updateField({
                      conditional: {
                        ...field.conditional!,
                        condition: value
                      }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equals">Equals</SelectItem>
                      <SelectItem value="not_equals">Not Equals</SelectItem>
                      <SelectItem value="greater_than">Greater Than</SelectItem>
                      <SelectItem value="less_than">Less Than</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Input
                    value={field.conditional?.value || ""}
                    onChange={(e) => updateField({
                      conditional: {
                        ...field.conditional!,
                        value: e.target.value
                      }
                    })}
                    placeholder="Value"
                  />
                </>
              )}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default EvaluationFieldBuilder;
