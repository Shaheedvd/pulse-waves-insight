
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export interface ActionItemType {
  id: string;
  description: string;
  responsible: string;
  startDate: string;
  resolvedDate: string;
  actionTaken: string;
}

interface ActionItemProps {
  item: ActionItemType;
  onUpdate: (id: string, field: keyof ActionItemType, value: string) => void;
  onDelete: (id: string) => void;
  disabled?: boolean;
}

const ActionItem: React.FC<ActionItemProps> = ({ item, onUpdate, onDelete, disabled = false }) => {
  return (
    <div className="grid grid-cols-12 gap-2 items-center mb-2">
      <div className="col-span-4">
        <Input
          value={item.description}
          onChange={(e) => onUpdate(item.id, "description", e.target.value)}
          placeholder="Issue or action item"
          disabled={disabled}
        />
      </div>
      <div className="col-span-2">
        <Input
          value={item.responsible}
          onChange={(e) => onUpdate(item.id, "responsible", e.target.value)}
          placeholder="Responsible person"
          disabled={disabled}
        />
      </div>
      <div className="col-span-1">
        <Input
          type="date"
          value={item.startDate}
          onChange={(e) => onUpdate(item.id, "startDate", e.target.value)}
          disabled={disabled}
        />
      </div>
      <div className="col-span-1">
        <Input
          type="date"
          value={item.resolvedDate}
          onChange={(e) => onUpdate(item.id, "resolvedDate", e.target.value)}
          disabled={disabled}
        />
      </div>
      <div className="col-span-3">
        <Input
          value={item.actionTaken}
          onChange={(e) => onUpdate(item.id, "actionTaken", e.target.value)}
          placeholder="Action taken"
          disabled={disabled}
        />
      </div>
      <div className="col-span-1 text-right">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(item.id)}
          className="text-destructive hover:text-destructive"
          disabled={disabled}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ActionItem;
