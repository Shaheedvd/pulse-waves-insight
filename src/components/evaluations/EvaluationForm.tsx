
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Image, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface EvaluationFormProps {
  open: boolean;
  onClose: () => void;
  evaluatorsList: string[];
}

// Sample client and location data
const clientsData = [
  { id: "1", name: "Retail Corp SA" },
  { id: "2", name: "QuickMart" },
  { id: "3", name: "EcoFuel" },
  { id: "4", name: "LuxCafé" },
  { id: "5", name: "FreshGrocer" },
  { id: "6", name: "HealthPharm" },
];

const locationsData = [
  { id: "1", name: "Cape Town CBD", clientId: "1" },
  { id: "2", name: "Cape Town Waterfront", clientId: "1" },
  { id: "3", name: "Johannesburg North", clientId: "2" },
  { id: "4", name: "Sandton", clientId: "2" },
  { id: "5", name: "Durban Beachfront", clientId: "3" },
  { id: "6", name: "Johannesburg East", clientId: "3" },
  { id: "7", name: "Pretoria Central", clientId: "4" },
  { id: "8", name: "Bloemfontein", clientId: "5" },
  { id: "9", name: "Port Elizabeth", clientId: "6" },
  { id: "10", name: "Cape Town South", clientId: "2" },
];

// Create a variable to store evaluations globally
let globalEvaluations = [...Array(10)].map((_, idx) => ({
  id: `EV-2023-${1001 + idx}`,
  client: ["Retail Corp SA", "QuickMart", "EcoFuel", "LuxCafé", "FreshGrocer", "HealthPharm"][Math.floor(Math.random() * 6)],
  location: ["Cape Town CBD", "Johannesburg North", "Durban Beachfront", "Pretoria Central", "Bloemfontein"][Math.floor(Math.random() * 5)],
  date: new Date(2023, 5, 20 + Math.floor(Math.random() * 6)).toISOString().split('T')[0],
  evaluator: ["John Smith", "Sarah Johnson", "Michael Brown", "Emily Davis", "David Wilson", "Lisa Taylor", "Unassigned"][Math.floor(Math.random() * 7)],
  score: idx < 8 ? 75 + Math.floor(Math.random() * 20) : 0,
  status: idx < 8 ? "Completed" : idx === 8 ? "Scheduled" : "Pending"
}));

const EvaluationForm: React.FC<EvaluationFormProps> = ({
  open,
  onClose,
  evaluatorsList
}) => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [client, setClient] = useState("");
  const [location, setLocation] = useState("");
  const [evaluator, setEvaluator] = useState("");
  const [notes, setNotes] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([]);

  // Filter locations based on selected client
  const filteredLocations = client
    ? locationsData.filter(loc => loc.clientId === client)
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!client || !location || !evaluator || !date) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Create a new evaluation entry
    const newId = `EV-${new Date().getFullYear()}-${1001 + globalEvaluations.length}`;
    const selectedClientName = clientsData.find(c => c.id === client)?.name || "";
    const selectedLocationName = locationsData.find(l => l.id === location)?.name || "";
    
    const newEvaluation = {
      id: newId,
      client: selectedClientName,
      location: selectedLocationName,
      date: date.toISOString().split('T')[0],
      evaluator: evaluator,
      score: 0,
      status: "Scheduled"
    };
    
    // Add to global evaluations array
    globalEvaluations = [...globalEvaluations, newEvaluation];
    
    // In a real app, this would submit to a backend
    console.log("Submitting evaluation:", {
      client: selectedClientName,
      location: selectedLocationName,
      evaluator,
      date,
      notes,
      photos: photos.map(p => p.name) // Just log names in console
    });
    
    // Update window.evaluations if it exists (for the Evaluations page)
    if (typeof window !== 'undefined') {
      (window as any).evaluationsData = globalEvaluations;
    }

    toast({
      title: "Evaluation Scheduled",
      description: "The evaluation has been scheduled successfully",
    });

    // Reset form
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setClient("");
    setLocation("");
    setEvaluator("");
    setDate(new Date());
    setNotes("");
    setPhotos([]);
    setPhotoPreviewUrls([]);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      
      // Limit to 5 photos maximum
      const totalPhotos = [...photos, ...newFiles];
      if (totalPhotos.length > 5) {
        toast({
          title: "Maximum Photos Reached",
          description: "You can only upload a maximum of 5 photos",
          variant: "destructive",
        });
        return;
      }
      
      // Create preview URLs for the images
      const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
      
      setPhotos([...photos, ...newFiles]);
      setPhotoPreviewUrls([...photoPreviewUrls, ...newPreviewUrls]);
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = [...photos];
    const newPhotoPreviewUrls = [...photoPreviewUrls];
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newPhotoPreviewUrls[index]);
    
    newPhotos.splice(index, 1);
    newPhotoPreviewUrls.splice(index, 1);
    
    setPhotos(newPhotos);
    setPhotoPreviewUrls(newPhotoPreviewUrls);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Schedule New Evaluation</DialogTitle>
          <DialogDescription>
            Create a new evaluation for a client location
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="client">Client</Label>
            <Select value={client} onValueChange={setClient}>
              <SelectTrigger id="client">
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                {clientsData.map((clientItem) => (
                  <SelectItem key={clientItem.id} value={clientItem.id}>
                    {clientItem.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select 
              value={location} 
              onValueChange={setLocation}
              disabled={!client}
            >
              <SelectTrigger id="location">
                <SelectValue placeholder={client ? "Select location" : "Select a client first"} />
              </SelectTrigger>
              <SelectContent>
                {filteredLocations.map((locationItem) => (
                  <SelectItem key={locationItem.id} value={locationItem.id}>
                    {locationItem.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="evaluator">Evaluator</Label>
            <Select value={evaluator} onValueChange={setEvaluator}>
              <SelectTrigger id="evaluator">
                <SelectValue placeholder="Select evaluator" />
              </SelectTrigger>
              <SelectContent>
                {evaluatorsList.map((evaluatorName) => (
                  <SelectItem key={evaluatorName} value={evaluatorName}>
                    {evaluatorName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <DatePicker
              value={date}
              onChange={setDate}
              placeholder="Select date"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Input
              id="notes"
              placeholder="Add additional information"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Photos (Maximum 5)</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {photoPreviewUrls.map((url, index) => (
                <div key={index} className="relative w-20 h-20">
                  <img
                    src={url}
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                    onClick={() => removePhoto(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              
              {photos.length < 5 && (
                <label className="w-20 h-20 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer hover:bg-muted">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                    multiple={5 - photos.length > 1}
                  />
                  <Image className="h-6 w-6 text-muted-foreground" />
                </label>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {photos.length}/5 photos uploaded
            </p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
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
