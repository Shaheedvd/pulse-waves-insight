
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Save, PlusCircle, FileText, Settings, Table as TableIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

// Define form schema using zod
const reportFormSchema = z.object({
  name: z.string().min(3, { message: "Report name must be at least 3 characters" }),
  type: z.enum(["monthly", "quarterly", "annual", "performance", "custom"]),
  description: z.string().optional(),
  dateRange: z.enum(["current", "last30", "last90", "custom", "year"]),
  customStartDate: z.string().optional(),
  customEndDate: z.string().optional(),
  clients: z.array(z.string()).optional(),
  locations: z.array(z.string()).optional(),
  metrics: z.array(z.string()),
  format: z.enum(["table", "chart", "combined"]),
  includeActionItems: z.boolean().default(false),
  breakdownBy: z.enum(["none", "client", "location", "evaluator", "section"]),
});

type ReportFormValues = z.infer<typeof reportFormSchema>;

// Sample data
const clients = [
  { id: "1", name: "Retail Corp SA" },
  { id: "2", name: "QuickMart" },
  { id: "3", name: "EcoFuel" },
  { id: "4", name: "LuxCafé" },
  { id: "5", name: "FreshGrocer" },
  { id: "6", name: "HealthPharm" },
];

const locations = [
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

const metrics = [
  { id: "total_score", name: "Overall Score" },
  { id: "signage", name: "Signage, Lighting & Accessibility" },
  { id: "building", name: "Building Exterior" },
  { id: "shop", name: "Shop/Forecourt" },
  { id: "yard", name: "Yard Area" },
  { id: "staff_facilities", name: "Staff Facilities" },
  { id: "bakery", name: "Bakery, Food Preparation" },
  { id: "store", name: "Store, Fridges, Storage" },
  { id: "staff", name: "Staff" },
  { id: "hsse", name: "HSSE General" },
  { id: "admin", name: "Administration & Business performance" },
  { id: "action_items", name: "Action Items" },
];

const ReportDesigner = () => {
  const { toast } = useToast();
  const { hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState("data");
  const [selectedClientIds, setSelectedClientIds] = useState<string[]>([]);

  // Initialize form with default values
  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      name: "",
      type: "monthly",
      description: "",
      dateRange: "last30",
      metrics: ["total_score"],
      format: "combined",
      includeActionItems: false,
      breakdownBy: "none",
    },
  });

  const watchDateRange = form.watch("dateRange");
  const watchFormat = form.watch("format");

  // Filter locations based on selected clients
  const filteredLocations = selectedClientIds.length > 0
    ? locations.filter(loc => selectedClientIds.includes(loc.clientId))
    : locations;

  const onSubmit = (data: ReportFormValues) => {
    if (!hasPermission("canCreateReports")) {
      toast({
        title: "Permission Denied",
        description: "You don't have permission to create reports",
        variant: "destructive",
      });
      return;
    }

    console.log("Report data:", data);
    
    // In a real app, this would save to a database
    toast({
      title: "Report Template Created",
      description: `'${data.name}' has been created and is ready to use`,
    });
  };

  const handleClientSelection = (clientId: string) => {
    setSelectedClientIds(prev => {
      if (prev.includes(clientId)) {
        return prev.filter(id => id !== clientId);
      } else {
        return [...prev, clientId];
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Report Designer</h1>
        {hasPermission("canViewReports") && (
          <Button variant="outline" onClick={() => window.location.href = "/reports"}>
            <FileText className="mr-2 h-4 w-4" />
            View Reports
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Design Custom Report</CardTitle>
          <CardDescription>
            Create a new report template with your desired metrics and filters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="data">Data Selection</TabsTrigger>
              <TabsTrigger value="visualization">Visualization</TabsTrigger>
              <TabsTrigger value="preview">Preview & Save</TabsTrigger>
            </TabsList>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
                <TabsContent value="data" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Report Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter report name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Report Type</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select report type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="monthly">Monthly Report</SelectItem>
                              <SelectItem value="quarterly">Quarterly Report</SelectItem>
                              <SelectItem value="annual">Annual Report</SelectItem>
                              <SelectItem value="performance">Performance Report</SelectItem>
                              <SelectItem value="custom">Custom Report</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Report description (optional)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="dateRange"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date Range</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select date range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="current">Current Month</SelectItem>
                              <SelectItem value="last30">Last 30 Days</SelectItem>
                              <SelectItem value="last90">Last 90 Days</SelectItem>
                              <SelectItem value="year">Current Year</SelectItem>
                              <SelectItem value="custom">Custom Range</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {watchDateRange === "custom" && (
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="customStartDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Start Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="customEndDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>End Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Clients & Locations</h3>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <Label className="mb-2 block">Clients</Label>
                        <div className="border rounded-md p-4 h-60 overflow-auto space-y-2">
                          {clients.map(client => (
                            <div key={client.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`client-${client.id}`}
                                checked={selectedClientIds.includes(client.id)}
                                onCheckedChange={() => handleClientSelection(client.id)}
                              />
                              <label 
                                htmlFor={`client-${client.id}`}
                                className="text-sm cursor-pointer"
                              >
                                {client.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <Label className="mb-2 block">Locations</Label>
                        <div className="border rounded-md p-4 h-60 overflow-auto space-y-2">
                          {filteredLocations.map(location => (
                            <div key={location.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`location-${location.id}`}
                              />
                              <label 
                                htmlFor={`location-${location.id}`}
                                className="text-sm cursor-pointer"
                              >
                                {location.name}
                              </label>
                            </div>
                          ))}
                          {filteredLocations.length === 0 && (
                            <p className="text-sm text-muted-foreground">
                              {selectedClientIds.length === 0 
                                ? "Select clients to see their locations" 
                                : "No locations found for selected clients"}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Metrics</h3>
                    <div className="border rounded-md p-4 grid grid-cols-2 md:grid-cols-3 gap-4 max-h-60 overflow-auto">
                      {metrics.map(metric => (
                        <div key={metric.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`metric-${metric.id}`}
                          />
                          <label 
                            htmlFor={`metric-${metric.id}`}
                            className="text-sm cursor-pointer"
                          >
                            {metric.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="visualization" className="space-y-6">
                  <FormField
                    control={form.control}
                    name="format"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Visualization Format</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select format" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="table">
                              <div className="flex items-center">
                                <TableIcon className="h-4 w-4 mr-2" />
                                <span>Table</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="chart">
                              <div className="flex items-center">
                                <PlusCircle className="h-4 w-4 mr-2" />
                                <span>Chart</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="combined">
                              <div className="flex items-center">
                                <Settings className="h-4 w-4 mr-2" />
                                <span>Combined</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {(watchFormat === "chart" || watchFormat === "combined") && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Chart Settings</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="breakdownBy"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Break Down By</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select grouping" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="none">No Breakdown</SelectItem>
                                  <SelectItem value="client">By Client</SelectItem>
                                  <SelectItem value="location">By Location</SelectItem>
                                  <SelectItem value="evaluator">By Evaluator</SelectItem>
                                  <SelectItem value="section">By Section</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}
                  
                  <FormField
                    control={form.control}
                    name="includeActionItems"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Include Action Items</FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Add a section with all action items related to the evaluations
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                </TabsContent>
                
                <TabsContent value="preview" className="space-y-6">
                  <div className="rounded-md border p-6 bg-muted/30">
                    <div className="flex justify-center items-center h-[300px] flex-col gap-4">
                      <FileText className="h-16 w-16 text-muted-foreground/70" />
                      <p className="text-muted-foreground">
                        Preview will be generated after saving the report template
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("visualization")}>
                      Back
                    </Button>
                    <Button type="submit">
                      <Save className="mr-2 h-4 w-4" />
                      Save Report Template
                    </Button>
                  </div>
                </TabsContent>
              </form>
            </Form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportDesigner;
