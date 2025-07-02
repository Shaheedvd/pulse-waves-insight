
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Plus, Search, DollarSign, Calendar, User, TrendingUp } from "lucide-react";

export const DealsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStage, setFilterStage] = useState("all");

  // Mock deals data
  const deals = [
    {
      id: "1",
      name: "Enterprise Software License",
      clientName: "TechCorp Inc",
      product: "CX Management Suite",
      value: 50000,
      stage: "negotiation",
      probability: 75,
      expectedCloseDate: "2024-02-15",
      assignedTo: "John Smith",
      createdAt: "2024-01-10T10:00:00Z"
    },
    {
      id: "2",
      name: "Consulting Services",
      clientName: "RetailChain Ltd",
      product: "CX Consulting",
      value: 25000,
      stage: "proposal",
      probability: 60,
      expectedCloseDate: "2024-02-28",
      assignedTo: "Sarah Johnson",
      createdAt: "2024-01-12T14:30:00Z"
    },
    {
      id: "3",
      name: "Marketing Automation Setup",
      clientName: "Startup.io",
      product: "Marketing Tools",
      value: 15000,
      stage: "qualified",
      probability: 40,
      expectedCloseDate: "2024-03-10",
      assignedTo: "Mike Wilson",
      createdAt: "2024-01-14T09:15:00Z"
    },
    {
      id: "4",
      name: "Training Program",
      clientName: "Manufacturing Solutions",
      product: "Training Services",
      value: 35000,
      stage: "closed-won",
      probability: 100,
      expectedCloseDate: "2024-01-20",
      assignedTo: "Lisa Chen",
      createdAt: "2024-01-05T11:00:00Z"
    }
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "prospecting": return "bg-gray-100 text-gray-800";
      case "qualified": return "bg-blue-100 text-blue-800";
      case "proposal": return "bg-yellow-100 text-yellow-800";
      case "negotiation": return "bg-orange-100 text-orange-800";
      case "closed-won": return "bg-green-100 text-green-800";
      case "closed-lost": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return "text-green-600";
    if (probability >= 60) return "text-yellow-600";
    if (probability >= 40) return "text-orange-600";
    return "text-red-600";
  };

  const stageOrder = ["prospecting", "qualified", "proposal", "negotiation", "closed-won", "closed-lost"];
  
  const filteredDeals = deals.filter(deal => {
    const matchesSearch = 
      deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.product.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStage = filterStage === "all" || deal.stage === filterStage;
    
    return matchesSearch && matchesStage;
  });

  // Pipeline summary
  const pipelineSummary = {
    totalValue: deals.reduce((sum, deal) => sum + deal.value, 0),
    totalDeals: deals.length,
    wonDeals: deals.filter(d => d.stage === "closed-won").length,
    lostDeals: deals.filter(d => d.stage === "closed-lost").length,
    activeDeals: deals.filter(d => !d.stage.includes("closed")).length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Deals Management</h2>
          <p className="text-muted-foreground">Track opportunities and manage your sales pipeline</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Deal
        </Button>
      </div>

      {/* Pipeline Summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pipelineSummary.totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{pipelineSummary.totalDeals} deals</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pipelineSummary.activeDeals}</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Won Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{pipelineSummary.wonDeals}</div>
            <p className="text-xs text-muted-foreground">Closed successfully</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Lost Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{pipelineSummary.lostDeals}</div>
            <p className="text-xs text-muted-foreground">Closed unsuccessfully</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pipelineSummary.wonDeals + pipelineSummary.lostDeals > 0 
                ? Math.round((pipelineSummary.wonDeals / (pipelineSummary.wonDeals + pipelineSummary.lostDeals)) * 100)
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Success rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search deals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {["all", ...stageOrder].map((stage) => (
            <Button
              key={stage}
              variant={filterStage === stage ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStage(stage)}
              className="capitalize"
            >
              {stage === "all" ? "All" : stage.replace('-', ' ')}
            </Button>
          ))}
        </div>
      </div>

      {/* Deals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Pipeline</CardTitle>
          <CardDescription>
            Track and manage your sales opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deal</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Probability</TableHead>
                <TableHead>Close Date</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDeals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{deal.name}</p>
                      <p className="text-sm text-muted-foreground">{deal.product}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {deal.clientName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="font-medium">${deal.value.toLocaleString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStageColor(deal.stage)}>
                      {deal.stage.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <TrendingUp className={`h-4 w-4 ${getProbabilityColor(deal.probability)}`} />
                        <span className={`font-medium ${getProbabilityColor(deal.probability)}`}>
                          {deal.probability}%
                        </span>
                      </div>
                      <Progress value={deal.probability} className="h-1" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(deal.expectedCloseDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>{deal.assignedTo}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
