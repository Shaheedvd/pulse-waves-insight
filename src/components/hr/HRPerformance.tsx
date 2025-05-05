
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, useAuth } from "@/contexts/AuthContext";
import { award, trendingUp, star, starHalf, users, fileText } from "lucide-react";

// Goal form schema
const goalSchema = z.object({
  title: z.string().min(2, { message: "Goal title is required" }),
  description: z.string().min(10, { message: "Description is required" }),
  employeeId: z.string({ required_error: "Employee is required" }),
  category: z.enum(["performance", "development", "organizational", "personal"]),
  startDate: z.string({ required_error: "Start date is required" }),
  dueDate: z.string({ required_error: "Due date is required" }),
  status: z.enum(["not_started", "in_progress", "completed", "cancelled"]),
  priority: z.enum(["low", "medium", "high"]),
});

type GoalFormValues = z.infer<typeof goalSchema>;

// Review form schema
const reviewSchema = z.object({
  employeeId: z.string({ required_error: "Employee is required" }),
  reviewType: z.enum(["quarterly", "annual", "probation", "project"]),
  startDate: z.string({ required_error: "Review period start date is required" }),
  endDate: z.string({ required_error: "Review period end date is required" }),
  dueDate: z.string({ required_error: "Due date is required" }),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

// Sample goals data
const initialGoals = [
  {
    id: "1",
    title: "Improve Customer Satisfaction Score",
    description: "Work on improving our customer satisfaction score from 85% to 92% through enhanced customer service training and process improvements.",
    employeeId: "21", // Catherine CustomerService
    employeeName: "Catherine CustomerService",
    category: "performance",
    startDate: "2025-01-01",
    dueDate: "2025-06-30",
    status: "in_progress",
    priority: "high",
    progress: 60,
  },
  {
    id: "2",
    title: "Complete Advanced Leadership Course",
    description: "Enroll in and complete the Advanced Leadership Development program to enhance management skills.",
    employeeId: "6", // Oliver Operations
    employeeName: "Oliver Operations",
    category: "development",
    startDate: "2025-02-15",
    dueDate: "2025-05-15",
    status: "in_progress",
    priority: "medium",
    progress: 40,
  },
  {
    id: "3",
    title: "Implement New Financial Reporting System",
    description: "Lead the implementation of the new financial reporting system to improve accuracy and timeliness of financial reports.",
    employeeId: "7", // Fiona Finance
    employeeName: "Fiona Finance",
    category: "organizational",
    startDate: "2025-03-01",
    dueDate: "2025-07-31",
    status: "not_started",
    priority: "high",
    progress: 0,
  },
  {
    id: "4",
    title: "Reduce Department Expenses",
    description: "Identify and implement cost-saving measures to reduce departmental expenses by 10% without impacting performance.",
    employeeId: "10", // Helen HR
    employeeName: "Helen HR",
    category: "performance",
    startDate: "2025-01-01",
    dueDate: "2025-12-31",
    status: "in_progress",
    priority: "medium",
    progress: 30,
  },
  {
    id: "5",
    title: "Achieve Sales Target",
    description: "Meet or exceed the annual sales target of R5 million for the fiscal year.",
    employeeId: "12", // Samuel Sales
    employeeName: "Samuel Sales",
    category: "performance",
    startDate: "2025-01-01",
    dueDate: "2025-12-31",
    status: "in_progress",
    priority: "high",
    progress: 45,
  },
];

// Sample reviews data
const initialReviews = [
  {
    id: "1",
    employeeId: "21", // Catherine CustomerService
    employeeName: "Catherine CustomerService",
    reviewType: "quarterly",
    reviewerName: "Oliver Operations",
    startDate: "2025-01-01",
    endDate: "2025-03-31",
    dueDate: "2025-04-15",
    status: "in_progress",
    overallRating: null,
  },
  {
    id: "2",
    employeeId: "13", // Sally SalesRep
    employeeName: "Sally SalesRep",
    reviewType: "quarterly",
    reviewerName: "Samuel Sales",
    startDate: "2025-01-01",
    endDate: "2025-03-31",
    dueDate: "2025-04-15",
    status: "completed",
    overallRating: 4.2,
  },
  {
    id: "3",
    employeeId: "19", // David Developer
    employeeName: "David Developer",
    reviewType: "probation",
    reviewerName: "Ian IT",
    startDate: "2024-11-15",
    endDate: "2025-05-15",
    dueDate: "2025-05-30",
    status: "not_started",
    overallRating: null,
  },
  {
    id: "4",
    employeeId: "9", // Paula Payroll
    employeeName: "Paula Payroll",
    reviewType: "annual",
    reviewerName: "Fiona Finance",
    startDate: "2024-05-01",
    endDate: "2025-04-30",
    dueDate: "2025-05-15",
    status: "not_started",
    overallRating: null,
  },
];

export const HRPerformance = () => {
  const { users: allUsers } = useAuth();
  const [goals, setGoals] = useState(initialGoals);
  const [reviews, setReviews] = useState(initialReviews);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [isScheduleReviewOpen, setIsScheduleReviewOpen] = useState(false);
  const [isViewGoalOpen, setIsViewGoalOpen] = useState(false);
  const [isViewReviewOpen, setIsViewReviewOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<any>(null);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [employeeFilter, setEmployeeFilter] = useState("all");
  
  const goalForm = useForm<GoalFormValues>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      title: "",
      description: "",
      employeeId: "",
      category: "performance",
      startDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
      status: "not_started",
      priority: "medium",
    },
  });

  const reviewForm = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      employeeId: "",
      reviewType: "quarterly",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
      dueDate: new Date(new Date().setMonth(new Date().getMonth() + 3) + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
  });

  const handleAddGoal = (data: GoalFormValues) => {
    console.log("New goal added:", data);
    const employee = allUsers.find(user => user.id === data.employeeId);
    const newGoal = {
      id: (goals.length + 1).toString(),
      ...data,
      employeeName: employee?.name || "Unknown Employee",
      progress: 0,
    };
    setGoals([...goals, newGoal]);
    setIsAddGoalOpen(false);
    goalForm.reset();
  };

  const handleScheduleReview = (data: ReviewFormValues) => {
    console.log("New review scheduled:", data);
    const employee = allUsers.find(user => user.id === data.employeeId);
    const manager = allUsers.find(user => 
      user.department === employee?.department && 
      (user.role === "manager" || user.role === "power_manager")
    );

    const newReview = {
      id: (reviews.length + 1).toString(),
      ...data,
      employeeName: employee?.name || "Unknown Employee",
      reviewerName: manager?.name || "Not Assigned",
      status: "not_started",
      overallRating: null,
    };
    setReviews([...reviews, newReview]);
    setIsScheduleReviewOpen(false);
    reviewForm.reset();
  };

  const handleViewGoal = (goal: any) => {
    setSelectedGoal(goal);
    setIsViewGoalOpen(true);
  };

  const handleViewReview = (review: any) => {
    setSelectedReview(review);
    setIsViewReviewOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "not_started":
        return "bg-gray-100 text-gray-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "high":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getReviewStatus = (review: any) => {
    const dueDate = new Date(review.dueDate);
    const today = new Date();
    const timeDiff = dueDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (review.status === "completed") {
      return { label: "Completed", color: "bg-green-100 text-green-800" };
    } else if (review.status === "in_progress") {
      return { label: "In Progress", color: "bg-blue-100 text-blue-800" };
    } else if (daysDiff <= 0) {
      return { label: "Overdue", color: "bg-red-100 text-red-800" };
    } else if (daysDiff <= 7) {
      return { label: "Due Soon", color: "bg-amber-100 text-amber-800" };
    } else {
      return { label: "Scheduled", color: "bg-gray-100 text-gray-800" };
    }
  };

  // Filter goals based on employee selection
  const filteredGoals = employeeFilter === "all" 
    ? goals 
    : goals.filter(goal => goal.employeeId === employeeFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <award className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Performance Management</h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <Button onClick={() => setIsAddGoalOpen(true)} className="flex gap-1">
            <trendingUp className="h-4 w-4" />
            Set New Goal
          </Button>
          <Button onClick={() => setIsScheduleReviewOpen(true)} variant="outline" className="flex gap-1">
            <star className="h-4 w-4" />
            Schedule Review
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="goals" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="reviews">Performance Reviews</TabsTrigger>
          <TabsTrigger value="feedback">Continuous Feedback</TabsTrigger>
          <TabsTrigger value="pips">Improvement Plans</TabsTrigger>
        </TabsList>
        
        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-col md:flex-row space-y-2 md:space-y-0 items-start md:items-center md:justify-between">
              <div>
                <CardTitle>Employee Goals</CardTitle>
                <CardDescription>
                  Track and manage individual and team goals
                </CardDescription>
              </div>
              
              <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by employee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Employees</SelectItem>
                  {allUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Goal</TableHead>
                    <TableHead>Employee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGoals.map((goal) => (
                    <TableRow key={goal.id}>
                      <TableCell className="font-medium">{goal.title}</TableCell>
                      <TableCell>{goal.employeeName}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                          {goal.status.replace('_', ' ').charAt(0).toUpperCase() + goal.status.replace('_', ' ').slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                          {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>{goal.dueDate}</TableCell>
                      <TableCell>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div
                            className="bg-primary h-2.5 rounded-full"
                            style={{ width: `${goal.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-muted-foreground">{goal.progress}%</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleViewGoal(goal)}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Review Cycles</CardTitle>
              <CardDescription>
                Scheduled and completed performance evaluations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Review Type</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reviewer</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reviews.map((review) => {
                    const statusInfo = getReviewStatus(review);
                    return (
                      <TableRow key={review.id}>
                        <TableCell className="font-medium">{review.employeeName}</TableCell>
                        <TableCell className="capitalize">{review.reviewType}</TableCell>
                        <TableCell>{`${review.startDate} to ${review.endDate}`}</TableCell>
                        <TableCell>{review.dueDate}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                        </TableCell>
                        <TableCell>{review.reviewerName}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleViewReview(review)}>
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Continuous Feedback</CardTitle>
              <CardDescription>
                Provide and request continuous feedback between employees and managers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-semibold mb-4">Recent Feedback</h3>
                  
                  <div className="space-y-4">
                    <div className="border p-4 rounded-md">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex flex-col">
                          <span className="font-medium">David Developer</span>
                          <span className="text-sm text-muted-foreground">From: Ian IT</span>
                        </div>
                        <span className="text-xs text-muted-foreground">2025-05-01</span>
                      </div>
                      <p className="text-sm">Excellent work on the new authentication system. Your attention to security details and clean code implementation were outstanding.</p>
                    </div>
                    
                    <div className="border p-4 rounded-md">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex flex-col">
                          <span className="font-medium">Paula Payroll</span>
                          <span className="text-sm text-muted-foreground">From: Fiona Finance</span>
                        </div>
                        <span className="text-xs text-muted-foreground">2025-04-28</span>
                      </div>
                      <p className="text-sm">Thank you for processing the monthly payroll so efficiently and accurately. Your attention to detail has significantly reduced errors.</p>
                    </div>
                    
                    <div className="border p-4 rounded-md">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex flex-col">
                          <span className="font-medium">Rachel Recruiter</span>
                          <span className="text-sm text-muted-foreground">From: Helen HR</span>
                        </div>
                        <span className="text-xs text-muted-foreground">2025-04-25</span>
                      </div>
                      <p className="text-sm">Great job on the last round of interviews. Your structured approach and thoughtful questions helped identify the best candidates.</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline" className="gap-1">
                    <star className="h-4 w-4" />
                    Give Feedback
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pips" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Improvement Plans (PIPs)</CardTitle>
              <CardDescription>
                Track and manage performance improvement initiatives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-6 text-center">
                <starHalf className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Active Performance Improvement Plans</h3>
                <p className="text-muted-foreground mt-2 mb-6">
                  There are currently no active PIPs in the system.
                </p>
                <Button variant="outline">Create PIP</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add Goal Dialog */}
      <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <trendingUp className="h-5 w-5" />
              Set New Goal
            </DialogTitle>
            <DialogDescription>
              Create a new goal or objective for an employee
            </DialogDescription>
          </DialogHeader>
          
          <Form {...goalForm}>
            <form onSubmit={goalForm.handleSubmit(handleAddGoal)} className="space-y-4">
              <FormField
                control={goalForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goal Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Increase Sales by 15%" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={goalForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <textarea 
                        className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                        placeholder="Detailed description of the goal and expectations"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={goalForm.control}
                  name="employeeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employee</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an employee" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {allUsers.map((user) => (
                            <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={goalForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="performance">Performance</SelectItem>
                          <SelectItem value="development">Development</SelectItem>
                          <SelectItem value="organizational">Organizational</SelectItem>
                          <SelectItem value="personal">Personal</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={goalForm.control}
                  name="startDate"
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
                  control={goalForm.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={goalForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="not_started">Not Started</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={goalForm.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter>
                <Button type="submit">Create Goal</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Schedule Review Dialog */}
      <Dialog open={isScheduleReviewOpen} onOpenChange={setIsScheduleReviewOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <star className="h-5 w-5" />
              Schedule Performance Review
            </DialogTitle>
            <DialogDescription>
              Create a new performance review cycle
            </DialogDescription>
          </DialogHeader>
          
          <Form {...reviewForm}>
            <form onSubmit={reviewForm.handleSubmit(handleScheduleReview)} className="space-y-4">
              <FormField
                control={reviewForm.control}
                name="employeeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an employee" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {allUsers.map((user) => (
                          <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={reviewForm.control}
                name="reviewType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Review Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select review type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="quarterly">Quarterly Review</SelectItem>
                        <SelectItem value="annual">Annual Review</SelectItem>
                        <SelectItem value="probation">Probation Review</SelectItem>
                        <SelectItem value="project">Project Review</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={reviewForm.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Period Start</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={reviewForm.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Period End</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={reviewForm.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>
                      The date by which the review should be completed
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit">Schedule Review</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* View Goal Dialog */}
      <Dialog open={isViewGoalOpen} onOpenChange={setIsViewGoalOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Goal Details</DialogTitle>
            <DialogDescription>
              Comprehensive information about this goal
            </DialogDescription>
          </DialogHeader>
          
          {selectedGoal && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">{selectedGoal.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedGoal.status)}`}>
                    {selectedGoal.status.replace('_', ' ').charAt(0).toUpperCase() + selectedGoal.status.replace('_', ' ').slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedGoal.priority)}`}>
                    {selectedGoal.priority.charAt(0).toUpperCase() + selectedGoal.priority.slice(1)} Priority
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Progress</Label>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-primary h-3 rounded-full"
                    style={{ width: `${selectedGoal.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs">
                  <span>{selectedGoal.progress}% Complete</span>
                  <span>Target: 100%</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Assigned To</Label>
                  <p>{selectedGoal.employeeName}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Start Date</Label>
                  <p>{selectedGoal.startDate}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Due Date</Label>
                  <p>{selectedGoal.dueDate}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Category</Label>
                  <p className="capitalize">{selectedGoal.category}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm text-muted-foreground">Description</Label>
                <p className="mt-1">{selectedGoal.description}</p>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Updates</h3>
                <div className="text-sm text-muted-foreground">No updates have been posted yet.</div>
              </div>
              
              <DialogFooter className="gap-2">
                <Button variant="outline" className="gap-1">
                  <fileText className="h-4 w-4" />
                  Add Update
                </Button>
                <Button className="gap-1">Edit Goal</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* View Review Dialog */}
      <Dialog open={isViewReviewOpen} onOpenChange={setIsViewReviewOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Performance Review</DialogTitle>
            <DialogDescription>
              Details of the selected performance review
            </DialogDescription>
          </DialogHeader>
          
          {selectedReview && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold capitalize">{selectedReview.reviewType} Review</h2>
                  <p className="text-muted-foreground">For: {selectedReview.employeeName}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getReviewStatus(selectedReview).color}`}>
                  {getReviewStatus(selectedReview).label}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Review Period</Label>
                  <p>{selectedReview.startDate} to {selectedReview.endDate}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Due Date</Label>
                  <p>{selectedReview.dueDate}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Reviewer</Label>
                  <p>{selectedReview.reviewerName}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Overall Rating</Label>
                  <p>{selectedReview.overallRating ? `${selectedReview.overallRating}/5` : 'Not rated yet'}</p>
                </div>
              </div>
              
              <Tabs defaultValue="form" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="form">Review Form</TabsTrigger>
                  <TabsTrigger value="goals">Related Goals</TabsTrigger>
                  <TabsTrigger value="feedback">Feedback</TabsTrigger>
                </TabsList>
                
                <TabsContent value="form" className="space-y-4">
                  {selectedReview.status === 'completed' ? (
                    <div className="space-y-6">
                      <div className="border rounded-md p-4">
                        <h3 className="font-medium mb-2">Performance Areas</h3>
                        
                        <div className="space-y-4 mt-4">
                          <div className="border-b pb-3">
                            <div className="flex justify-between mb-1">
                              <span>Job Knowledge</span>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <star key={rating} 
                                    className={`h-4 w-4 ${rating <= 4 ? "text-amber-500 fill-amber-500" : "text-muted"}`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm">Consistently demonstrates deep understanding of role requirements and technical skills.</p>
                          </div>
                          
                          <div className="border-b pb-3">
                            <div className="flex justify-between mb-1">
                              <span>Quality of Work</span>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <star key={rating} 
                                    className={`h-4 w-4 ${rating <= 4 ? "text-amber-500 fill-amber-500" : "text-muted"}`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm">Produces high-quality outputs consistently with minimal errors.</p>
                          </div>
                          
                          <div className="border-b pb-3">
                            <div className="flex justify-between mb-1">
                              <span>Communication</span>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <star key={rating} 
                                    className={`h-4 w-4 ${rating <= 5 ? "text-amber-500 fill-amber-500" : "text-muted"}`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm">Excellent verbal and written communication skills. Keeps team informed and asks clarifying questions.</p>
                          </div>
                          
                          <div className="border-b pb-3">
                            <div className="flex justify-between mb-1">
                              <span>Teamwork</span>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <star key={rating} 
                                    className={`h-4 w-4 ${rating <= 4 ? "text-amber-500 fill-amber-500" : "text-muted"}`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm">Works well with others and contributes positively to team dynamics.</p>
                          </div>
                          
                          <div>
                            <h3 className="font-medium mb-2">Summary Comments</h3>
                            <p className="text-sm">Sally has demonstrated strong performance this quarter, especially in communication and teamwork. She consistently delivers quality work and has been a valuable team member. Areas for improvement include deeper technical knowledge in some areas.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="border rounded-md p-6 text-center">
                      <fileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">Review Form Not Completed Yet</h3>
                      <p className="text-muted-foreground mt-2 mb-6">
                        This review has not been completed or is still in progress.
                      </p>
                      {selectedReview.status !== 'completed' && (
                        <Button>Start Review Process</Button>
                      )}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="goals" className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-4">Goals Evaluated in This Review</h3>
                    
                    {selectedReview.employeeId === "13" ? (
                      <div className="space-y-4">
                        <div className="border p-3 rounded-md">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Achieve Sales Target</span>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Completed</span>
                          </div>
                          <p className="text-sm mb-2">Meet or exceed quarterly sales target of R1.2 million.</p>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full w-[110%]"></div>
                          </div>
                          <div className="flex justify-between text-xs mt-1">
                            <span>Achievement: 110%</span>
                            <span>Target: 100%</span>
                          </div>
                        </div>
                        
                        <div className="border p-3 rounded-md">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Customer Satisfaction</span>
                            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">Partial</span>
                          </div>
                          <p className="text-sm mb-2">Achieve average customer satisfaction rating of 4.5/5.</p>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-amber-500 h-2 rounded-full w-[85%]"></div>
                          </div>
                          <div className="flex justify-between text-xs mt-1">
                            <span>Achievement: 85%</span>
                            <span>Target: 100%</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No goals have been linked to this review cycle.</p>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="feedback" className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-4">Feedback from Others</h3>
                    
                    {selectedReview.employeeId === "13" ? (
                      <div className="space-y-4">
                        <div className="border p-3 rounded-md">
                          <div className="flex justify-between items-start">
                            <span className="font-medium">Samuel Sales (Manager)</span>
                            <span className="text-xs text-muted-foreground">2025-04-01</span>
                          </div>
                          <p className="text-sm mt-2">Sally has shown tremendous growth in her sales approach this quarter. Her ability to understand client needs and propose appropriate solutions has improved significantly. She consistently exceeds her targets and maintains positive client relationships.</p>
                        </div>
                        
                        <div className="border p-3 rounded-md">
                          <div className="flex justify-between items-start">
                            <span className="font-medium">Carlos CRM (Team Lead)</span>
                            <span className="text-xs text-muted-foreground">2025-03-28</span>
                          </div>
                          <p className="text-sm mt-2">Sally is a valuable team member who actively contributes during meetings and helps newer team members. Her CRM documentation is thorough and helpful. Could improve on follow-up timing with some clients.</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No feedback has been submitted for this review period.</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
              
              <DialogFooter>
                {selectedReview.status === 'completed' ? (
                  <Button variant="outline">Download Review</Button>
                ) : (
                  <Button variant="outline">Complete Review</Button>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
