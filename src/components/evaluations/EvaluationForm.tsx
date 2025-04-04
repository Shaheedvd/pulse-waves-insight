
import React, { useState } from "react";
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
import { Image, X, Plus, List, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import QuestionSelector from "./QuestionSelector";
import { EvaluationQuestion } from "@/data/evaluationQuestions";

interface EvaluationFormProps {
  open: boolean;
  onClose: () => void;
  evaluatorsList: string[];
  isAudit?: boolean;
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

const EvaluationForm: React.FC<EvaluationFormProps> = ({
  open,
  onClose,
  evaluatorsList,
  isAudit = false
}) => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [client, setClient] = useState("");
  const [location, setLocation] = useState("");
  const [evaluator, setEvaluator] = useState("");
  const [notes, setNotes] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<EvaluationQuestion[]>([]);
  const [isQuestionSelectorOpen, setIsQuestionSelectorOpen] = useState(false);
  const [evaluationType, setEvaluationType] = useState<'audit' | 'evaluation'>(isAudit ? 'audit' : 'evaluation');
  const [newClientName, setNewClientName] = useState("");
  const [newLocationName, setNewLocationName] = useState("");
  const [showAddClient, setShowAddClient] = useState(false);
  const [showAddLocation, setShowAddLocation] = useState(false);

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

    // In a real app, this would submit to a backend
    console.log("Submitting evaluation:", {
      client,
      location,
      evaluator,
      date,
      notes,
      photos: photos.map(p => p.name), // Just log names in console
      questions: selectedQuestions, // Include selected questions
      evaluationType
    });

    toast({
      title: isAudit ? "Audit Scheduled" : "Evaluation Scheduled",
      description: `The ${isAudit ? 'audit' : 'evaluation'} has been scheduled successfully`,
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
    setSelectedQuestions([]);
    setNewClientName("");
    setNewLocationName("");
    setShowAddClient(false);
    setShowAddLocation(false);
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

  const handleSelectQuestions = (questions: EvaluationQuestion[]) => {
    setSelectedQuestions(questions);
  };

  const openQuestionSelector = (type: 'audit' | 'evaluation') => {
    setEvaluationType(type);
    setIsQuestionSelectorOpen(true);
  };

  const handleAddClient = () => {
    if (!newClientName.trim()) {
      toast({
        title: "Invalid Client Name",
        description: "Please enter a valid client name",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would add to the database
    // For now, we'll just simulate adding to our local data
    const newClientId = (clientsData.length + 1).toString();
    clientsData.push({ id: newClientId, name: newClientName });
    
    // Select the new client
    setClient(newClientId);
    setShowAddClient(false);
    setNewClientName("");
    
    toast({
      title: "Client Added",
      description: `${newClientName} has been added successfully`,
    });
  };

  const handleAddLocation = () => {
    if (!newLocationName.trim() || !client) {
      toast({
        title: "Invalid Information",
        description: "Please enter a valid location name and select a client",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would add to the database
    // For now, we'll just simulate adding to our local data
    const newLocationId = (locationsData.length + 1).toString();
    locationsData.push({ id: newLocationId, name: newLocationName, clientId: client });
    
    // Select the new location
    setLocation(newLocationId);
    setShowAddLocation(false);
    setNewLocationName("");
    
    toast({
      title: "Location Added",
      description: `${newLocationName} has been added successfully`,
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule New {isAudit ? 'Audit' : 'Evaluation'}</DialogTitle>
            <DialogDescription>
              Create a new {isAudit ? 'audit' : 'evaluation'} for a client location
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="client">Client</Label>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowAddClient(!showAddClient)}
                >
                  {showAddClient ? "Cancel" : "+ Add New Client"}
                </Button>
              </div>
              
              {showAddClient ? (
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter new client name"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="button" onClick={handleAddClient}>Add</Button>
                </div>
              ) : (
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
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="location">Location</Label>
                {client && (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowAddLocation(!showAddLocation)}
                  >
                    {showAddLocation ? "Cancel" : "+ Add New Location"}
                  </Button>
                )}
              </div>
              
              {showAddLocation && client ? (
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter new location name"
                    value={newLocationName}
                    onChange={(e) => setNewLocationName(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="button" onClick={handleAddLocation}>Add</Button>
                </div>
              ) : (
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
              )}
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
              <div className="flex justify-between items-center">
                <Label>Questions</Label>
                <div className="space-x-2">
                  {isAudit ? (
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => openQuestionSelector('audit')}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Audit Questions
                    </Button>
                  ) : (
                    <>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => openQuestionSelector('evaluation')}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Evaluation Questions
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => openQuestionSelector('audit')}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Audit Questions
                      </Button>
                    </>
                  )}
                </div>
              </div>
              
              <div className="border rounded-md p-3">
                {selectedQuestions.length > 0 ? (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span>{selectedQuestions.length} questions selected</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsQuestionSelectorOpen(true)}
                      >
                        <List className="h-4 w-4 mr-1" /> View & Edit
                      </Button>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      {/* Show count by category */}
                      {Array.from(new Set(selectedQuestions.map(q => q.category))).map(category => {
                        const count = selectedQuestions.filter(q => q.category === category).length;
                        return (
                          <div key={category} className="flex justify-between">
                            <span>{category}:</span>
                            <span>{count} questions</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-3 text-sm text-muted-foreground">
                    No questions selected. Add {isAudit ? 'audit' : 'evaluation or audit'} questions.
                  </div>
                )}
              </div>
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
              <Button type="submit">Schedule {isAudit ? 'Audit' : 'Evaluation'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Question Selector Dialog */}
      <QuestionSelector 
        open={isQuestionSelectorOpen}
        onClose={() => setIsQuestionSelectorOpen(false)}
        onSelectQuestions={handleSelectQuestions}
        evaluationType={evaluationType}
      />
    </>
  );
};

export default EvaluationForm;
