
import React, { useState } from "react";
import { useEnterprise } from "@/contexts/EnterpriseContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, ClipboardList, User, MapPin, Star } from "lucide-react";
import { PermissionGate } from "@/components/shared/PermissionGate";

const EvaluationsSystem = () => {
  const { evaluations, addEvaluation, updateEvaluation, deleteEvaluation } = useEnterprise();
  const [activeTab, setActiveTab] = useState("view");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvaluations = evaluations.filter(eval => 
    eval.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eval.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eval.auditorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "scheduled": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Evaluations System</h1>
        <p className="text-muted-foreground">
          Schedule, record, and analyze client/location evaluations
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="view">View Evaluations</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="view" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Search evaluations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            <PermissionGate module="evaluations" action="create">
              <Button>
                <ClipboardList className="h-4 w-4 mr-2" />
                New Evaluation
              </Button>
            </PermissionGate>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Evaluations</CardTitle>
              <CardDescription>
                Latest client and location evaluations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Auditor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvaluations.map((evaluation) => (
                    <TableRow key={evaluation.id}>
                      <TableCell className="font-medium">{evaluation.clientName}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                          {evaluation.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1 text-gray-500" />
                          {evaluation.auditorName}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(evaluation.status)}>
                          {evaluation.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-500" />
                          {evaluation.overallScore}/100
                        </div>
                      </TableCell>
                      <TableCell>{new Date(evaluation.scheduledDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          <PermissionGate module="evaluations" action="update">
                            <Button variant="outline" size="sm">Edit</Button>
                          </PermissionGate>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evaluation Calendar</CardTitle>
              <CardDescription>
                Schedule and track evaluation appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {evaluations.filter(e => e.status === "scheduled").map((evaluation) => (
                  <Card key={evaluation.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{evaluation.clientName}</h4>
                        <p className="text-sm text-gray-600">{evaluation.location}</p>
                        <p className="text-sm text-gray-500">
                          <Calendar className="h-4 w-4 inline mr-1" />
                          {new Date(evaluation.scheduledDate).toLocaleString()}
                        </p>
                      </div>
                      <Badge className={getStatusColor(evaluation.status)}>
                        {evaluation.status}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Evaluations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{evaluations.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(evaluations.reduce((sum, e) => sum + e.overallScore, 0) / evaluations.length)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {evaluations.filter(e => e.status === "completed").length}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EvaluationsSystem;
