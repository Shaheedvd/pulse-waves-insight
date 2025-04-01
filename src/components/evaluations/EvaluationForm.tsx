
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, X, Plus, FilePlus2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ActionItem, { ActionItemType } from "./ActionItem";

interface EvaluationSection {
  name: string;
  maxPoints: number;
  items: string[];
}

const evaluationSections: EvaluationSection[] = [
  {
    name: "Signage, Lighting & Accessibility",
    maxPoints: 11,
    items: [
      "Prime Sign (MID) - clearly visible, lights working full bright, clean",
      "Shop logo - Lights working full bright and in good, clean order",
      "Canopy Lights - clean, all lights working",
      "Pump Island Displays - correct, good order, clean",
      "Pump Lights - all working",
      "Entrance Lights - working, neat, clean",
      "Canopy Edge - working full bright, neat clean",
      "Perimeter Signs - current, correct messages, neat, clean",
      "Entrances and exit unobstructed",
      "No obstruction from parked vehicles",
      "Parking bays demarcated clean"
    ]
  },
  {
    name: "Building Exterior",
    maxPoints: 7,
    items: [
      "Building Exterior - bricks & plaster in good order, walls clean",
      "Windows - clean no broken or cracked panes",
      "Emergency assembly point - Clearly marked",
      "Pay point - clean and tidy",
      "Emergency contact details displayed (Manager & Assistant Details)",
      "Water & electrical reading done daily - record available",
      "CCTV camera - correctly installed/ no obtructive wires, working order"
    ]
  },
  {
    name: "Shop/Forecourt",
    maxPoints: 23,
    items: [
      "Forecourt - in good order, neat & tidy/ no oil stains",
      "Vent pipes in good condition, well ventilated, no form of ignition near",
      "Warning signs below vent pipes",
      "Canopy Uprights - clean, painted",
      "Warning decals correctly placed",
      "Canopy Undersides - clean",
      "Check wetstock variances, mechanical readings done daily",
      "Pump Islands neat & tidy (incl valet unit & Dustbins)",
      "Building Aprons - neat & tidy",
      "Warning signs if wet or slippery",
      "Pumps - clean inside/outside, neat decals. In good order",
      "Hose Nozzles - good working order, clean",
      "Water Cans - must be clean",
      "Window Squeegees - available, not damaged and clean",
      "Clipboard available - clean and in use",
      "Air Points - working and rolled away neatly",
      "Forcourt roles and microfibre cloths available",
      "Fire Extinguishers - correctly placed, clean, serviced",
      "Manholes - covers in good order, clean & dry",
      "Filler & dip caps locked & identified. Seals in good condition",
      "Dipsticks - only wooden, Good condition, packed away neatly",
      "Water finding records kept & available",
      "Landscaping - neat & tidy, no weeds, lawns trimmed"
    ]
  },
  {
    name: "Yard Area",
    maxPoints: 9,
    items: [
      "Yard gate in good order, and locked",
      "Clean and tidy/ No unnecessary scrap",
      "Building / Yard wall - clean and in good order",
      "Refuse area/ Refuse bins/ Separate oil bin - clean and tidy",
      "Generator - Oil and fueled - tested weekly - records available",
      "Compressor - water drained daily - records available",
      "Compressor - certification available",
      "Gas Storage - LPG cylinders stored correctly",
      "Yard Lights - working/ in good order"
    ]
  },
  {
    name: "Staff Facilities",
    maxPoints: 10,
    items: [
      "Clean/ Neat/ Tidy",
      "Housekeeping schedule - displayed and in use",
      "Service Station rules displayed",
      "Individual lockers available/in use",
      "Table and chairs available",
      "Toilet - clean, operational, toilet paper, toilet seat",
      "Shower - clean, working",
      "Hand basin - clean, soap & paper towel available",
      "Lights - clean/ working",
      "Mirror - clean"
    ]
  },
  {
    name: "Bakery, Food Preparation",
    maxPoints: 14,
    items: [
      "Kitchen - neat tidy & clean.",
      "Correct chemicals used to clean different parts of kitchen",
      "Cleaning materials/ equipment stored neatly",
      "Food packed in order of labelling/ pricing",
      "Production Sheets/ Temperature Sheets in file",
      "Food items efficiently stocked on shelves",
      "Food items fresh - priced and sell-by dates marked",
      "Washing hand procedure at the basin",
      "Is there a bilnd filter to clean / Is the porta filter clean",
      "Coffe cleaning checkist done",
      "Steam wands are clean",
      "Grinder is clean",
      "Production plan on display, wastage recorded",
      "Coffee stock-take done daily. Coffee fresh."
    ]
  },
  {
    name: "Store, Fridges, Storage",
    maxPoints: 23,
    items: [
      "Shop neat & tidy - newspapers neat, no dust, no dirt on floor",
      "Employee of the month displayed",
      "Cashier area neat & tidy. No unnecessary papers",
      "Windows clean, no smudges or finger prints",
      "Entrance floor mats clean and aligned",
      "Latest promotions on display using approved signs",
      "All staff knowledgeable regarding promotional items and upselling",
      "2 persons receive Stock as per Receiving Policy",
      "All Items priced - neatly, updated",
      "Shelves fully stocked - sufficient buffer stock available",
      "Packed according to franchise planogram and neat",
      "Gondola shelve, fridge shelves & doors clean and good condition",
      "No expired stock on shelves",
      "Cigarettes merchandised sufficiently (Entire range GLTC)",
      "Daily stock take of Cigarettes, Lubes & Airtime",
      "Stores - No unsafe stacking/ storage of stock or equipment",
      "Hazardous chemicals in store - properly labelled",
      "Expired, damaged stock packed separately & labelled (store room)",
      "Expiry Calendar",
      "Update safety file",
      "ATM - signage correct, neat & tidy, dustbin available",
      "Toilets clean, tidy & good smell",
      "Soap & Toilet paper available"
    ]
  },
  {
    name: "Staff",
    maxPoints: 7,
    items: [
      "Supervisor - in place, aware, in control",
      "Service prompt & efficient",
      "Good product knowledge",
      "Staff smiling/ happy/ friendly",
      "Correctly dressed - Clean uniform, hat, shoes, badge",
      "Sufficient staff per shift",
      "Record of staff/management meetings available"
    ]
  },
  {
    name: "HSSE General",
    maxPoints: 11,
    items: [
      "No damage on site that could present a health safety risk",
      "Temperature sheets filled out (fridges + delivery)",
      "HSSE file updated with all relevant information",
      "Material Safety Data Sheets - available for all chemicals",
      "No loose wiring - check everywhere/ anywhere",
      "Record of staff training - emergency drills (fire, robbery or accident)",
      "First Aid - kit available & stocked correctly",
      "COVID Regulations in place",
      "Contractors on site - following HSSE rules",
      "Weekly HSSE meeting are held & minuted",
      "Emergency exits - are they visible (signs) & not obstructed"
    ]
  },
  {
    name: "Administration & Business performance",
    maxPoints: 9,
    items: [
      "Office- clean, neat & tidy",
      "Filing up-to-date, and filed neatly. Information easily accessible",
      "Time-sheets available for viewing, up-to-date",
      "Managers checklist available, correctly filled, up-to-date",
      "Capturing up-to-date. Information correct",
      "Monthly/ Daily reports & documents completed & submitted on time",
      "Cash ups done efficient, and shorts reported to HR",
      "GRV's checked before being filed (confirm correct capture)",
      "Stock take complete"
    ]
  }
];

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

interface EvaluationFormProps {
  open: boolean;
  onClose: () => void;
}

const EvaluationForm: React.FC<EvaluationFormProps> = ({ open, onClose }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("evaluation");
  const [selectedMonth, setSelectedMonth] = useState("Jan");
  const [client, setClient] = useState("");
  const [location, setLocation] = useState("");
  const [evaluator, setEvaluator] = useState("");
  const [evaluationDate, setEvaluationDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [completedBy, setCompletedBy] = useState("");
  const [scores, setScores] = useState<Record<string, number[]>>({});
  const [actionItems, setActionItems] = useState<ActionItemType[]>([]);

  const handleScoreChange = (sectionName: string, itemIndex: number, value: string) => {
    const newValue = value === "" ? 0 : Math.min(1, Math.max(0, parseInt(value) || 0));
    
    setScores((prevScores) => {
      const sectionScores = [...(prevScores[sectionName] || [])];
      sectionScores[itemIndex] = newValue;
      return { ...prevScores, [sectionName]: sectionScores };
    });
  };

  const getTotalScore = (sectionName: string) => {
    if (!scores[sectionName]) return 0;
    return scores[sectionName].reduce((sum, score) => sum + score, 0);
  };

  const getOverallScore = () => {
    let totalScore = 0;
    let maxPoints = 0;
    
    evaluationSections.forEach(section => {
      totalScore += getTotalScore(section.name);
      maxPoints += section.maxPoints;
    });
    
    return { totalScore, maxPoints, percentage: maxPoints > 0 ? (totalScore / maxPoints * 100).toFixed(0) : "0" };
  };

  const initializeScores = () => {
    const initialScores: Record<string, number[]> = {};
    
    evaluationSections.forEach(section => {
      initialScores[section.name] = new Array(section.items.length).fill(0);
    });
    
    setScores(initialScores);
  };

  const addActionItem = () => {
    const newItem: ActionItemType = {
      id: `action-${Date.now()}`,
      description: "",
      responsible: "",
      startDate: new Date().toISOString().split("T")[0],
      resolvedDate: "",
      actionTaken: ""
    };
    
    setActionItems([...actionItems, newItem]);
  };

  const updateActionItem = (id: string, field: keyof ActionItemType, value: string) => {
    setActionItems(
      actionItems.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const deleteActionItem = (id: string) => {
    setActionItems(actionItems.filter(item => item.id !== id));
  };

  React.useEffect(() => {
    if (open) {
      initializeScores();
      setClient("");
      setLocation("");
      setEvaluator("");
      setCompletedBy("");
      setEvaluationDate(new Date().toISOString().split("T")[0]);
      setActionItems([]);
      setActiveTab("evaluation");
    }
  }, [open]);

  const handleSubmit = () => {
    const { totalScore, maxPoints, percentage } = getOverallScore();
    
    toast({
      title: "Evaluation Submitted",
      description: `Client: ${client}, Location: ${location}, Score: ${percentage}%, Month: ${selectedMonth}`,
    });
    
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Site Evaluation Sheet</DialogTitle>
          <DialogDescription>
            Complete the evaluation form for the selected client and location.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
            <TabsTrigger value="action">Action Items</TabsTrigger>
          </TabsList>
          
          <TabsContent value="evaluation" className="flex-1 flex flex-col space-y-4 mt-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Input 
                  id="client" 
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="Enter client name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="evaluator">Evaluator</Label>
                <Input 
                  id="evaluator" 
                  value={evaluator}
                  onChange={(e) => setEvaluator(e.target.value)}
                  placeholder="Enter evaluator name"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="completed-by">Completed By</Label>
                <Input 
                  id="completed-by" 
                  value={completedBy}
                  onChange={(e) => setCompletedBy(e.target.value)}
                  placeholder="Enter name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="evaluation-date">Date</Label>
                <Input 
                  id="evaluation-date" 
                  type="date"
                  value={evaluationDate}
                  onChange={(e) => setEvaluationDate(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <div className="font-semibold">Evaluation Month: {selectedMonth}</div>
              <div className="flex flex-wrap justify-end gap-1">
                {months.map((month) => (
                  <Button 
                    key={month}
                    size="sm"
                    variant={month === selectedMonth ? "default" : "outline"}
                    onClick={() => setSelectedMonth(month)}
                  >
                    {month}
                  </Button>
                ))}
              </div>
            </div>
            
            <ScrollArea className="flex-1 border rounded-md">
              <div className="p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[60%]">Scoring Areas</TableHead>
                      <TableHead className="text-center">Max Points</TableHead>
                      <TableHead className="text-center">Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {evaluationSections.map((section) => (
                      <React.Fragment key={section.name}>
                        <TableRow className="bg-muted">
                          <TableCell className="font-medium">{section.name}</TableCell>
                          <TableCell className="text-center">{section.maxPoints}</TableCell>
                          <TableCell className="text-center font-bold">
                            {getTotalScore(section.name)} / {section.maxPoints}
                          </TableCell>
                        </TableRow>
                        {section.items.map((item, index) => (
                          <TableRow key={`${section.name}-${index}`}>
                            <TableCell className="pl-8 text-sm">{item}</TableCell>
                            <TableCell className="text-center">1</TableCell>
                            <TableCell className="text-center">
                              <Input
                                type="number"
                                min="0"
                                max="1"
                                className="h-8 w-20 mx-auto text-center"
                                value={scores[section.name]?.[index] || 0}
                                onChange={(e) => handleScoreChange(section.name, index, e.target.value)}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </React.Fragment>
                    ))}
                    <TableRow className="bg-primary text-primary-foreground">
                      <TableCell className="font-bold">TOTAL</TableCell>
                      <TableCell className="text-center font-bold">{evaluationSections.reduce((sum, section) => sum + section.maxPoints, 0)}</TableCell>
                      <TableCell className="text-center font-bold">
                        {getOverallScore().totalScore} / {getOverallScore().maxPoints} ({getOverallScore().percentage}%)
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="action" className="flex-1 flex flex-col space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Action Items</h3>
              <Button onClick={addActionItem} size="sm">
                <Plus className="h-4 w-4 mr-2" /> Add Action Item
              </Button>
            </div>
            
            {actionItems.length > 0 ? (
              <div className="border rounded-md p-4">
                <div className="grid grid-cols-12 gap-2 mb-2 text-sm font-medium">
                  <div className="col-span-4">Action Item</div>
                  <div className="col-span-2">Person Responsible</div>
                  <div className="col-span-1">Start Date</div>
                  <div className="col-span-1">Resolved Date</div>
                  <div className="col-span-3">Action Taken</div>
                  <div className="col-span-1"></div>
                </div>
                {actionItems.map((item) => (
                  <ActionItem
                    key={item.id}
                    item={item}
                    onUpdate={updateActionItem}
                    onDelete={deleteActionItem}
                  />
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8 border rounded-md">
                <FilePlus2 className="h-12 w-12 mb-2" />
                <p>No action items added yet</p>
                <p className="text-sm">Click "Add Action Item" to create a new one</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            <X className="mr-2 h-4 w-4" /> Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <Save className="mr-2 h-4 w-4" /> Save Evaluation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EvaluationForm;
