import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, Download, FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Define the COLORS constant for the pie chart
const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#D6BCFA', '#8E9196'];

// Sample data for charts
const monthlyScoreData = [
  { month: "Jan", score: 87 },
  { month: "Feb", score: 82 },
  { month: "Mar", score: 85 },
  { month: "Apr", score: 91 },
  { month: "May", score: 88 },
  { month: "Jun", score: 93 },
];

const quarterlyScoreData = [
  { quarter: "Q1", score: 85 },
  { quarter: "Q2", score: 89 },
  { quarter: "Q3", score: 92 },
  { quarter: "Q4", score: 88 },
];

const categoryScoreData = [
  { name: "Customer Service", value: 92 },
  { name: "Staff Appearance", value: 88 },
  { name: "Store Cleanliness", value: 95 },
  { name: "Product Knowledge", value: 82 },
  { name: "Brand Compliance", value: 90 },
];

const upcomingEvaluations = [
  {
    id: "EV-2023-1011",
    client: "Retail Corp SA",
    location: "Cape Town North",
    date: "2023-07-15",
    description: "Quarterly store audit for compliance with brand standards and customer service quality assessment.",
    contact: "John Mabena",
    contactEmail: "j.mabena@retailcorpsa.co.za",
    contactPhone: "+27 82 555 1234"
  },
  {
    id: "EV-2023-1012",
    client: "EcoFuel",
    location: "Pretoria East",
    date: "2023-07-18",
    description: "Monthly forecourt and convenience store audit, focusing on service quality and regulatory compliance.",
    contact: "Sarah Johnson",
    contactEmail: "s.johnson@ecofuel.co.za",
    contactPhone: "+27 83 444 5678"
  },
  {
    id: "EV-2023-1013",
    client: "LuxCafé",
    location: "Johannesburg Central",
    date: "2023-07-22",
    description: "Food safety and customer experience audit for premium coffee shop chain.",
    contact: "Michael Ndlovu",
    contactEmail: "m.ndlovu@luxcafe.co.za",
    contactPhone: "+27 84 333 9876"
  },
];

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [selectedEvaluation, setSelectedEvaluation] = React.useState<typeof upcomingEvaluations[0] | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = React.useState(false);

  const generateDashboardReport = () => {
    return `
      <h1>Dashboard Report</h1>
      <h2>Pulse Point CX - ${new Date().toLocaleDateString()}</h2>
      <hr />
      <h3>Performance Metrics</h3>
      <p>Overall CX Score: 89%</p>
      <p>Locations Evaluated: 42/50 (84% coverage)</p>
      <p>Top Category: Store Cleanliness (95%)</p>
      <p>Improvement Area: Product Knowledge (82%)</p>
      
      <h3>Upcoming Evaluations</h3>
      <table>
        <tr>
          <th>ID</th>
          <th>Client</th>
          <th>Location</th>
          <th>Date</th>
        </tr>
        ${upcomingEvaluations.map(evaluation => `
          <tr>
            <td>${evaluation.id}</td>
            <td>${evaluation.client}</td>
            <td>${evaluation.location}</td>
            <td>${evaluation.date}</td>
          </tr>
        `).join('')}
      </table>
    `;
  };

  const generateEvaluationDetails = () => {
    if (!selectedEvaluation) return '';
    
    return `
      <h1>Evaluation Details</h1>
      <div style="margin-bottom: 20px;">
        <div><strong>ID:</strong> ${selectedEvaluation.id}</div>
        <div><strong>Client:</strong> ${selectedEvaluation.client}</div>
        <div><strong>Location:</strong> ${selectedEvaluation.location}</div>
        <div><strong>Date:</strong> ${selectedEvaluation.date}</div>
        <div><strong>Contact Person:</strong> ${selectedEvaluation.contact}</div>
        <div><strong>Email:</strong> ${selectedEvaluation.contactEmail}</div>
        <div><strong>Phone:</strong> ${selectedEvaluation.contactPhone}</div>
      </div>
      
      <div>
        <div><strong>Description:</strong></div>
        <p>${selectedEvaluation.description}</p>
      </div>
    `;
  };

  const handleViewDetails = (evaluation: typeof upcomingEvaluations[0]) => {
    setSelectedEvaluation(evaluation);
    setDetailsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            downloadPdf={true}
            documentTitle="Dashboard Report"
            documentContent={generateDashboardReport}
          >
            <Download className="mr-2 h-4 w-4" /> Download Report
          </Button>
          <Button 
            variant="outline" 
            printable={true}
            documentTitle="Dashboard Report"
            documentContent={generateDashboardReport}
          >
            <FileText className="mr-2 h-4 w-4" /> Print Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall CX Score
            </CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                +2.5% <ArrowUpRight className="h-3 w-3" />
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Locations Evaluated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42/50</div>
            <p className="text-xs text-muted-foreground">
              84% coverage this quarter
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Store Cleanliness</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">95%</span> average score
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Improvement Area
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Product Knowledge</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-yellow-500">82%</span> average score
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Trend Analysis</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Tabs defaultValue="monthly">
              <TabsList>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
              </TabsList>
              <TabsContent value="monthly" className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyScoreData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[50, 100]} />
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Score"]}
                      cursor={{ fillOpacity: 0.1 }}
                    />
                    <Bar
                      dataKey="score"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="quarterly" className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={quarterlyScoreData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis domain={[50, 100]} />
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Score"]}
                      cursor={{ fillOpacity: 0.1 }}
                    />
                    <Bar
                      dataKey="score"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>CX Categories</CardTitle>
            <CardDescription>Performance by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryScoreData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {categoryScoreData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Evaluations</CardTitle>
          <CardDescription>
            Scheduled evaluations for the next 30 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {upcomingEvaluations.map((evaluation) => (
              <div
                key={evaluation.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="space-y-1">
                  <p className="font-medium">{evaluation.client}</p>
                  <p className="text-sm text-muted-foreground">
                    {evaluation.location}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0 flex items-center space-x-2">
                  <div className="text-sm text-muted-foreground">
                    {evaluation.date}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(evaluation)}
                  >
                    <FileText className="h-4 w-4 mr-1" /> View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Evaluation Details</DialogTitle>
            <DialogDescription>
              Information about the upcoming evaluation
            </DialogDescription>
          </DialogHeader>
          
          {selectedEvaluation && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">ID:</div>
                <div>{selectedEvaluation.id}</div>
                
                <div className="font-semibold">Client:</div>
                <div>{selectedEvaluation.client}</div>
                
                <div className="font-semibold">Location:</div>
                <div>{selectedEvaluation.location}</div>
                
                <div className="font-semibold">Date:</div>
                <div>{selectedEvaluation.date}</div>
                
                <div className="font-semibold">Contact Person:</div>
                <div>{selectedEvaluation.contact}</div>
                
                <div className="font-semibold">Email:</div>
                <div>{selectedEvaluation.contactEmail}</div>
                
                <div className="font-semibold">Phone:</div>
                <div>{selectedEvaluation.contactPhone}</div>
              </div>
              
              <div>
                <div className="font-semibold mb-1">Description:</div>
                <p className="text-sm text-muted-foreground">
                  {selectedEvaluation.description}
                </p>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setDetailsDialogOpen(false)}>
                  Close
                </Button>
                <Button
                  downloadPdf={true}
                  documentTitle={`Evaluation Details - ${selectedEvaluation.id}`}
                  documentContent={generateEvaluationDetails}
                >
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
                <Button
                  printable={true}
                  documentTitle={`Evaluation Details - ${selectedEvaluation.id}`}
                  documentContent={generateEvaluationDetails}
                >
                  <FileText className="mr-2 h-4 w-4" /> Print
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
