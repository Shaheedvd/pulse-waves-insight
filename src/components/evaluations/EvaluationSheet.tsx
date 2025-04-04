
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface EvaluationSheetProps {
  open: boolean;
  onClose: () => void;
  evaluation: any;
  evaluatorsList: string[];
}

// Sample evaluation details
const evaluationSections = [
  {
    name: "External Appearance & Branding",
    items: [
      { question: "Storefront Visibility", score: 4, maxScore: 5, notes: "Signage is visible from a distance, but could be better illuminated at night." },
      { question: "Branding Consistency", score: 5, maxScore: 5, notes: "Perfect alignment with brand identity." },
      { question: "Window Displays", score: 3, maxScore: 5, notes: "Current promotion displays need updating." },
      { question: "Accessibility", score: 4, maxScore: 5, notes: "Ramp available but slightly steep." },
      { question: "Overall Maintenance & Cleanliness", score: 5, maxScore: 5, notes: "Exterior is immaculate." },
    ]
  },
  {
    name: "Internal Layout & Flow",
    items: [
      { question: "Space Optimization", score: 4, maxScore: 5, notes: "Good use of available space." },
      { question: "Customer Flow", score: 5, maxScore: 5, notes: "No bottlenecks observed." },
      { question: "Zoning & Segmentation", score: 5, maxScore: 5, notes: "Clear product categorization." },
      { question: "Visibility of Merchandise", score: 4, maxScore: 5, notes: "Some items on lower shelves hard to see." },
      { question: "Checkout Area Design", score: 5, maxScore: 5, notes: "Efficient layout with good queue management." },
    ]
  },
  {
    name: "Atmosphere & Ambiance",
    items: [
      { question: "Lighting", score: 5, maxScore: 5, notes: "Excellent lighting throughout." },
      { question: "Music/Sound", score: 4, maxScore: 5, notes: "Volume appropriate, selection could be more brand-aligned." },
      { question: "Temperature & Air Quality", score: 5, maxScore: 5, notes: "Comfortable temperature and good air circulation." },
      { question: "Overall Aesthetic", score: 5, maxScore: 5, notes: "Design perfectly matches brand identity." },
    ]
  },
  {
    name: "Customer Experience",
    items: [
      { question: "Staff Interaction Quality", score: 5, maxScore: 5, notes: "Staff very knowledgeable and engaging." },
      { question: "Service Standards", score: 4, maxScore: 5, notes: "Service consistent but with slight variations between staff." },
      { question: "Complaint Handling", score: 5, maxScore: 5, notes: "Excellent process in place." },
      { question: "Information Accessibility", score: 4, maxScore: 5, notes: "Product information readily available." },
    ]
  }
];

const EvaluationSheet: React.FC<EvaluationSheetProps> = ({
  open,
  onClose,
  evaluation,
  evaluatorsList
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [editMode, setEditMode] = useState(false);
  const [editedEvaluation, setEditedEvaluation] = useState<any>(null);

  // Set the edited evaluation when the evaluation prop changes
  React.useEffect(() => {
    if (evaluation) {
      setEditedEvaluation({
        ...evaluation,
        sections: evaluationSections
      });
    }
  }, [evaluation]);

  if (!evaluation || !editedEvaluation) return null;

  const totalScore = evaluationSections.reduce((acc, section) => {
    const sectionScore = section.items.reduce((sum, item) => sum + item.score, 0);
    const sectionMaxScore = section.items.reduce((sum, item) => sum + item.maxScore, 0);
    return acc + (sectionScore / sectionMaxScore) * 100;
  }, 0) / evaluationSections.length;

  const generateReportContent = () => {
    return `
      <h1>${evaluation.client} Evaluation Report</h1>
      <h2>${evaluation.location}</h2>
      <p><strong>Date:</strong> ${evaluation.date}</p>
      <p><strong>Evaluator:</strong> ${evaluation.evaluator}</p>
      <p><strong>Status:</strong> ${evaluation.status}</p>
      <p><strong>Overall Score:</strong> ${evaluation.score}%</p>

      <h3>Summary</h3>
      <p>Overall excellent experience with a few minor areas for improvement. The store has good brand alignment and customer flow.</p>

      <h3>Details</h3>
      ${evaluationSections.map(section => `
        <div style="margin-top: 20px;">
          <h4>${section.name}</h4>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Question</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Score</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Notes</th>
              </tr>
            </thead>
            <tbody>
              ${section.items.map(item => `
                <tr>
                  <td style="border: 1px solid #ddd; padding: 8px;">${item.question}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${item.score}/${item.maxScore}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${item.notes}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `).join('')}
    `;
  };

  const handleSave = () => {
    toast({
      title: "Changes Saved",
      description: "Evaluation changes have been saved successfully.",
    });
    setEditMode(false);
  };

  const handleEvaluatorChange = (value: string) => {
    setEditedEvaluation({
      ...editedEvaluation,
      evaluator: value
    });
  };

  const getScoreBadgeColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 85) return "bg-green-100 text-green-800";
    if (percentage >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Evaluation Details</DialogTitle>
          <DialogDescription>
            {evaluation.id} - {evaluation.client}, {evaluation.location}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Evaluation Details</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Client</Label>
                <div className="font-medium">{evaluation.client}</div>
              </div>
              <div>
                <Label>Location</Label>
                <div className="font-medium">{evaluation.location}</div>
              </div>
              <div>
                <Label>Date</Label>
                <div className="font-medium">{evaluation.date}</div>
              </div>
              <div>
                <Label>Evaluator</Label>
                {editMode ? (
                  <Select 
                    value={editedEvaluation.evaluator} 
                    onValueChange={handleEvaluatorChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select evaluator" />
                    </SelectTrigger>
                    <SelectContent>
                      {evaluatorsList.map((evaluator) => (
                        <SelectItem key={evaluator} value={evaluator}>
                          {evaluator}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="font-medium">{evaluation.evaluator}</div>
                )}
              </div>
              <div>
                <Label>Status</Label>
                <div>
                  <Badge className={
                    evaluation.status === "Completed" 
                      ? "bg-green-100 text-green-800" 
                      : evaluation.status === "Scheduled" 
                      ? "bg-blue-100 text-blue-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }>
                    {evaluation.status}
                  </Badge>
                </div>
              </div>
              <div>
                <Label>Score</Label>
                <div>
                  {evaluation.status === "Completed" ? (
                    <Badge className={evaluation.score >= 85 
                      ? "bg-green-100 text-green-800" 
                      : evaluation.score >= 70 
                      ? "bg-yellow-100 text-yellow-800" 
                      : "bg-red-100 text-red-800"}>
                      {evaluation.score}%
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">Not available</span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Label>Summary</Label>
              {editMode ? (
                <Textarea 
                  className="mt-2"
                  value={editedEvaluation.summary || "Overall excellent experience with a few minor areas for improvement. The store has good brand alignment and customer flow."}
                  onChange={(e) => setEditedEvaluation({...editedEvaluation, summary: e.target.value})}
                />
              ) : (
                <p className="mt-2">
                  Overall excellent experience with a few minor areas for improvement. The store has good brand alignment and customer flow.
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-6 mt-4">
            {evaluationSections.map((section, i) => (
              <div key={i} className="border rounded-lg p-4">
                <h3 className="font-medium text-lg mb-3">{section.name}</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/2">Item</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {section.items.map((item, j) => (
                      <TableRow key={j}>
                        <TableCell>{item.question}</TableCell>
                        <TableCell>
                          <Badge className={getScoreBadgeColor(item.score, item.maxScore)}>
                            {item.score}/{item.maxScore}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{item.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between items-center">
          <div>
            {editMode ? (
              <>
                <Button onClick={handleSave} className="mr-2">
                  <Save className="h-4 w-4 mr-2" /> Save Changes
                </Button>
                <Button variant="outline" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={() => setEditMode(true)}>
                Edit Evaluation
              </Button>
            )}
          </div>
          <div>
            <Button 
              variant="outline" 
              className="mr-2" 
              downloadPdf={true}
              documentTitle={`${evaluation.client} - ${evaluation.location} Evaluation Report`}
              documentContent={generateReportContent}
            >
              <Download className="h-4 w-4 mr-2" /> Download Report
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EvaluationSheet;
