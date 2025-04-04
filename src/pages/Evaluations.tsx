
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Download,
  Filter,
  Plus,
  Search,
  FileText,
  FileCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import EvaluationForm from "@/components/evaluations/EvaluationForm";
import EvaluationSheet from "@/components/evaluations/EvaluationSheet";
import { useToast } from "@/components/ui/use-toast";

// Sample evaluation data
const evaluationsData = [
  {
    id: "EV-2023-1001",
    client: "Retail Corp SA",
    location: "Cape Town CBD",
    date: "2023-06-24",
    evaluator: "John Smith",
    score: 92,
    status: "Completed",
  },
  {
    id: "EV-2023-1002",
    client: "QuickMart",
    location: "Johannesburg North",
    date: "2023-06-23",
    evaluator: "Sarah Johnson",
    score: 78,
    status: "Completed",
  },
  {
    id: "EV-2023-1003",
    client: "EcoFuel",
    location: "Durban Beachfront",
    date: "2023-06-23",
    evaluator: "Michael Brown",
    score: 85,
    status: "Completed",
  },
  {
    id: "EV-2023-1004",
    client: "LuxCafé",
    location: "Pretoria Central",
    date: "2023-06-22",
    evaluator: "Emily Davis",
    score: 89,
    status: "Completed",
  },
  {
    id: "EV-2023-1005",
    client: "Retail Corp SA",
    location: "Cape Town Waterfront",
    date: "2023-06-22",
    evaluator: "John Smith",
    score: 91,
    status: "Completed",
  },
  {
    id: "EV-2023-1006",
    client: "QuickMart",
    location: "Sandton",
    date: "2023-06-21",
    evaluator: "Sarah Johnson",
    score: 75,
    status: "Completed",
  },
  {
    id: "EV-2023-1007",
    client: "FreshGrocer",
    location: "Bloemfontein",
    date: "2023-06-21",
    evaluator: "David Wilson",
    score: 82,
    status: "Completed",
  },
  {
    id: "EV-2023-1008",
    client: "HealthPharm",
    location: "Port Elizabeth",
    date: "2023-06-20",
    evaluator: "Lisa Taylor",
    score: 88,
    status: "Completed",
  },
  {
    id: "EV-2023-1009",
    client: "EcoFuel",
    location: "Johannesburg East",
    date: "2023-06-25",
    evaluator: "Michael Brown",
    score: 0,
    status: "Scheduled",
  },
  {
    id: "EV-2023-1010",
    client: "QuickMart",
    location: "Cape Town South",
    date: "2023-06-26",
    evaluator: "Unassigned",
    score: 0,
    status: "Pending",
  },
];

// List of available evaluators
const evaluatorsList = [
  "John Smith",
  "Sarah Johnson",
  "Michael Brown",
  "Emily Davis",
  "David Wilson",
  "Lisa Taylor",
  "James Anderson",
  "Patricia Thomas",
  "Robert Jackson",
  "Jennifer White"
];

const Evaluations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAuditFormOpen, setIsAuditFormOpen] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState<any>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { toast } = useToast();
  const itemsPerPage = 8;

  // Filter evaluations based on search term and status
  const filteredEvaluations = evaluationsData.filter((evaluation) => {
    const matchesSearch =
      evaluation.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.evaluator.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || evaluation.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Paginate evaluations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEvaluations = filteredEvaluations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredEvaluations.length / itemsPerPage);

  const getScoreBadgeColor = (score: number, status: string) => {
    if (status !== "Completed") return "bg-gray-100 text-gray-800";
    if (score >= 85) return "bg-green-100 text-green-800";
    if (score >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewEvaluation = (evaluation: any) => {
    setSelectedEvaluation(evaluation);
    setIsSheetOpen(true);
  };

  const handleDownload = () => {
    // Generate PDF content
    const content = `
      <h1>Evaluations Report</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Location</th>
            <th>Date</th>
            <th>Evaluator</th>
            <th>Score</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${filteredEvaluations.map(eval => `
            <tr>
              <td>${eval.id}</td>
              <td>${eval.client}</td>
              <td>${eval.location}</td>
              <td>${eval.date}</td>
              <td>${eval.evaluator}</td>
              <td>${eval.status === "Completed" ? eval.score + "%" : "-"}</td>
              <td>${eval.status}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    toast({
      title: "Downloading evaluations",
      description: "Your file has been downloaded successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Evaluations</h1>
        <div className="flex space-x-2">
          <Button onClick={() => setIsAuditFormOpen(true)}>
            <FileCheck className="mr-2 h-4 w-4" /> New Audit
          </Button>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> New Evaluation
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Evaluation Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 md:space-x-4">
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search evaluations..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value)}
              >
                <SelectTrigger className="w-[160px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleDownload}
              downloadPdf={true}
              documentTitle="Evaluations Report"
              documentContent={() => `
                <h1>Evaluations Report</h1>
                <p>Generated on: ${new Date().toLocaleDateString()}</p>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Client</th>
                      <th>Location</th>
                      <th>Date</th>
                      <th>Evaluator</th>
                      <th>Score</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${filteredEvaluations.map(eval => `
                      <tr>
                        <td>${eval.id}</td>
                        <td>${eval.client}</td>
                        <td>${eval.location}</td>
                        <td>${eval.date}</td>
                        <td>${eval.evaluator}</td>
                        <td>${eval.status === "Completed" ? eval.score + "%" : "-"}</td>
                        <td>${eval.status}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              `}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-4 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Evaluator</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentEvaluations.length > 0 ? (
                  currentEvaluations.map((evaluation) => (
                    <TableRow key={evaluation.id}>
                      <TableCell className="font-medium">
                        {evaluation.id}
                      </TableCell>
                      <TableCell>{evaluation.client}</TableCell>
                      <TableCell>{evaluation.location}</TableCell>
                      <TableCell>{evaluation.date}</TableCell>
                      <TableCell>{evaluation.evaluator}</TableCell>
                      <TableCell>
                        {evaluation.status === "Completed" ? (
                          <Badge
                            className={getScoreBadgeColor(
                              evaluation.score,
                              evaluation.status
                            )}
                          >
                            {evaluation.score}%
                          </Badge>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getStatusBadgeColor(evaluation.status)}
                        >
                          {evaluation.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleViewEvaluation(evaluation)}
                        >
                          <FileText className="h-4 w-4 mr-1" /> View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No evaluations found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="text-sm text-muted-foreground">
                Showing {indexOfFirstItem + 1}-
                {Math.min(indexOfLastItem, filteredEvaluations.length)} of{" "}
                {filteredEvaluations.length}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="icon"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  )
                )}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Evaluation Form Dialog */}
      <EvaluationForm 
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        evaluatorsList={evaluatorsList}
        isAudit={false}
      />

      {/* Audit Form Dialog */}
      <EvaluationForm 
        open={isAuditFormOpen}
        onClose={() => setIsAuditFormOpen(false)}
        evaluatorsList={evaluatorsList}
        isAudit={true}
      />

      {/* Evaluation Sheet Dialog */}
      <EvaluationSheet
        open={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        evaluation={selectedEvaluation}
        evaluatorsList={evaluatorsList}
      />
    </div>
  );
};

export default Evaluations;
