
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, X, CameraIcon, ImageIcon, PlusCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import ActionItem from "./ActionItem";

// Sample client data for the dropdown
const clientsData = [
  { id: "1", name: "Retail Corp SA" },
  { id: "2", name: "QuickMart" },
  { id: "3", name: "EcoFuel" },
  { id: "4", name: "LuxCafé" },
  { id: "5", name: "FreshGrocer" },
  { id: "6", name: "HealthPharm" },
];

// Sample locations data keyed by client ID
const locationsData: Record<string, { id: string; name: string }[]> = {
  "1": [
    { id: "101", name: "Cape Town CBD" },
    { id: "102", name: "Cape Town Waterfront" },
  ],
  "2": [
    { id: "201", name: "Johannesburg North" },
    { id: "202", name: "Sandton" },
    { id: "203", name: "Cape Town South" },
  ],
  "3": [
    { id: "301", name: "Durban Beachfront" },
    { id: "302", name: "Johannesburg East" },
  ],
  "4": [
    { id: "401", name: "Pretoria Central" },
  ],
  "5": [
    { id: "501", name: "Bloemfontein" },
  ],
  "6": [
    { id: "601", name: "Port Elizabeth" },
  ],
};

const EvaluationForm = ({ 
  open, 
  onClose, 
  evaluatorsList = [] 
}: { 
  open: boolean; 
  onClose: () => void; 
  evaluatorsList?: string[];
}) => {
  const [clientId, setClientId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [evaluationDate, setEvaluationDate] = useState<Date>();
  const [evaluator, setEvaluator] = useState("");
  const [actionItems, setActionItems] = useState<string[]>([]);
  const [newActionItem, setNewActionItem] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const { toast } = useToast();

  const resetForm = () => {
    setClientId("");
    setLocationId("");
    setEvaluationDate(undefined);
    setEvaluator("");
    setActionItems([]);
    setNewActionItem("");
    setPhotos([]);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!clientId || !locationId || !evaluationDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would submit to an API
    toast({
      title: "Evaluation scheduled",
      description: `New evaluation has been scheduled for ${clientsData.find(c => c.id === clientId)?.name}`,
    });
    
    handleClose();
  };

  const handleAddActionItem = () => {
    if (newActionItem.trim()) {
      setActionItems([...actionItems, newActionItem.trim()]);
      setNewActionItem("");
    }
  };

  const handleRemoveActionItem = (index: number) => {
    setActionItems(actionItems.filter((_, i) => i !== index));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Check if adding more photos would exceed the limit
    if (photos.length + files.length > 5) {
      toast({
        title: "Too many photos",
        description: "Maximum 5 photos are allowed",
        variant: "destructive",
      });
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setPhotos(prev => [...prev, event.target.result as string]);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const selectedClient = clientsData.find(client => client.id === clientId);
  const availableLocations = clientId ? locationsData[clientId] || [] : [];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule New Evaluation</DialogTitle>
          <DialogDescription>
            Create a new site evaluation to assess customer experience.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="client">Client</Label>
            <Select
              value={clientId}
              onValueChange={(value) => {
                setClientId(value);
                setLocationId("");
              }}
            >
              <SelectTrigger id="client">
                <SelectValue placeholder="Select a client" />
              </SelectTrigger>
              <SelectContent>
                {clientsData.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select
              value={locationId}
              onValueChange={setLocationId}
              disabled={!clientId}
            >
              <SelectTrigger id="location">
                <SelectValue placeholder={clientId ? "Select a location" : "Select a client first"} />
              </SelectTrigger>
              <SelectContent>
                {availableLocations.map((location) => (
                  <SelectItem key={location.id} value={location.id}>
                    {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="evaluator">Assigned Evaluator</Label>
            <Select
              value={evaluator}
              onValueChange={setEvaluator}
            >
              <SelectTrigger id="evaluator">
                <SelectValue placeholder="Select an evaluator" />
              </SelectTrigger>
              <SelectContent>
                {evaluatorsList.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Evaluation Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !evaluationDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {evaluationDate ? format(evaluationDate, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={evaluationDate}
                  onSelect={setEvaluationDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Site Photos (Maximum 5)</Label>
            <div className="grid grid-cols-3 gap-2">
              {photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={photo} 
                    alt={`Photo ${index + 1}`} 
                    className="rounded-md h-20 w-full object-cover" 
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removePhoto(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              
              {photos.length < 5 && (
                <div className="flex items-center justify-center border border-dashed rounded-md h-20">
                  <Label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                    <CameraIcon className="h-6 w-6 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground mt-1">Add photo</span>
                    <Input 
                      id="photo-upload" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleFileChange} 
                      multiple
                    />
                  </Label>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {photos.length}/5 photos added
            </p>
          </div>

          <div className="space-y-2">
            <Label>Action Items (Optional)</Label>
            <div className="flex space-x-2">
              <Input
                placeholder="Add an action item"
                value={newActionItem}
                onChange={(e) => setNewActionItem(e.target.value)}
              />
              <Button
                type="button"
                onClick={handleAddActionItem}
                variant="outline"
              >
                Add
              </Button>
            </div>
          </div>

          {actionItems.length > 0 && (
            <div className="border rounded-md p-3 space-y-2">
              <Label>Items to review:</Label>
              <div className="space-y-2">
                {actionItems.map((item, index) => (
                  <ActionItem
                    key={index}
                    text={item}
                    onRemove={() => handleRemoveActionItem(index)}
                  />
                ))}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button type="submit">Schedule Evaluation</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EvaluationForm;
