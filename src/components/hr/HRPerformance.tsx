import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Label } from "@/components/ui/label";
import { Award, TrendingUp, Star, StarHalf, Users, FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

// Fix type issues for PerformanceGoal and PerformanceReview
type PerformanceGoal = {
  id: string;
  title: string;
  description: string;
  employeeId: string;
  employeeName: string;
  category: string;
  startDate: string;
  dueDate: string;
  status: string;
  priority: string;
  progress: number;
};

type PerformanceReview = {
  id: string;
  employeeId: string;
  employeeName: string;
  reviewType: string;
  reviewerName: string;
  startDate: string;
  endDate: string;
  dueDate: string;
  status: string;
  overallRating: number;
};

// Modify the handleAddGoal and handleAddReview functions to ensure they create objects
// with all required properties
export const HRPerformance = () => {
  const { users } = useAuth();
  const [activeTab, setActiveTab] = useState("goals");
  const [performanceGoals, setPerformanceGoals] = useState<PerformanceGoal[]>([
    {
      id: "goal-1",
      title: "Increase Sales",
      description: "Increase sales by 20% in Q3",
      employeeId: "emp-1",
      employeeName: "John Doe",
      category: "Sales",
      startDate: "2024-07-01",
      dueDate: "2024-09-30",
      status: "in_progress",
      priority: "high",
      progress: 60,
    },
    {
      id: "goal-2",
      title: "Improve Customer Satisfaction",
      description: "Achieve a customer satisfaction score of 4.5 or higher",
      employeeId: "emp-2",
      employeeName: "Jane Smith",
      category: "Customer Service",
      startDate: "2024-07-01",
      dueDate: "2024-09-30",
      status: "completed",
      priority: "medium",
      progress: 100,
    },
  ]);
  const [performanceReviews, setPerformanceReviews] = useState<PerformanceReview[]>([
    {
      id: "review-1",
      employeeId: "emp-1",
      employeeName: "John Doe",
      reviewType: "Quarterly",
      reviewerName: "Jane Smith",
      startDate: "2024-04-01",
      endDate: "2024-06-30",
      dueDate: "2024-07-15",
      status: "completed",
      overallRating: 4,
    },
    {
      id: "review-2",
      employeeId: "emp-2",
      employeeName: "Jane Smith",
      reviewType: "Annual",
      reviewerName: "Bob Johnson",
      startDate: "2023-07-01",
      endDate: "2024-06-30",
      dueDate: "2024-07-15",
      status: "pending",
      overallRating: 0,
    },
  ]);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredGoals = performanceGoals.filter((goal) => {
    const matchesSearch =
      goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      goal.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || goal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredReviews = performanceReviews.filter((review) => {
    const matchesSearch =
      review.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.reviewerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || review.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddGoal = () => {
    const newGoal: PerformanceGoal = {
      id: `goal-${Date.now()}`,
      title: "New Performance Goal",
      description: "Description for the new goal",
      employeeId: "emp-1",
      employeeName: "John Doe",
      category: "Professional Development",
      startDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
      status: "not_started",
      priority: "medium",
      progress: 0
    };
    
    setPerformanceGoals([...performanceGoals, newGoal]);
    setIsAddGoalOpen(false);
  };

  const handleAddReview = () => {
    const newReview: PerformanceReview = {
      id: `review-${Date.now()}`,
      employeeId: "emp-1",
      employeeName: "John Doe",
      reviewType: "Quarterly",
      reviewerName: "Jane Smith",
      startDate: new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0],
      status: "pending",
      overallRating: 0
    };
    
    setPerformanceReviews([...performanceReviews, newReview]);
    setIsAddReviewOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const goalCompletionData = performanceGoals.map((goal) => ({
    name: goal.title,
    Completion: goal.progress,
  }));

  const reviewRatingData = performanceReviews.map((review) => ({
    name: review.employeeName,
    Rating: review.overallRating,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold">HR Performance Management</h2>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 absolute left-2 top-3 text-muted-foreground"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Tabs defaultValue="goals" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="goals">Performance Goals</TabsTrigger>
          <TabsTrigger value="reviews">Performance Reviews</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="goals" className="space-y-4">
          <div className="flex justify-between items-center">
            <CardHeader>
              <CardTitle>Performance Goals</CardTitle>
              <CardDescription>
                Track and manage employee performance goals
              </CardDescription>
            </CardHeader>
            <Button onClick={() => setIsAddGoalOpen(true)}>Add Goal</Button>
          </div>
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Employee</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGoals.map((goal) => (
                    <TableRow key={goal.id}>
                      <TableCell className="font-medium">{goal.title}</TableCell>
                      <TableCell>{goal.employeeName}</TableCell>
                      <TableCell>{goal.category}</TableCell>
                      <TableCell>{goal.startDate}</TableCell>
                      <TableCell>{goal.dueDate}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            goal.status
                          )}`}
                        >
                          {goal.status.toUpperCase()}
                        </span>
                      </TableCell>
                      <TableCell>
                        {goal.progress}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews" className="space-y-4">
          <div className="flex justify-between items-center">
            <CardHeader>
              <CardTitle>Performance Reviews</CardTitle>
              <CardDescription>
                Manage and track employee performance reviews
              </CardDescription>
            </CardHeader>
            <Button onClick={() => setIsAddReviewOpen(true)}>Add Review</Button>
          </div>
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Reviewer</TableHead>
                    <TableHead>Review Type</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell className="font-medium">
                        {review.employeeName}
                      </TableCell>
                      <TableCell>{review.reviewerName}</TableCell>
                      <TableCell>{review.reviewType}</TableCell>
                      <TableCell>{review.startDate}</TableCell>
                      <TableCell>{review.endDate}</TableCell>
                      <TableCell>{review.dueDate}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            review.status
                          )}`}
                        >
                          {review.status.toUpperCase()}
                        </span>
                      </TableCell>
                      <TableCell>{review.overallRating}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>
                Visualize performance data and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Goal Completion</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={goalCompletionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Completion" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Review Ratings</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={reviewRatingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 5]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="Rating" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add New Goal</DialogTitle>
            <DialogDescription>Create a new performance goal.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input id="title" defaultValue="Increase Sales" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="employee" className="text-right">
                Employee
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select an employee" />
                </SelectTrigger>
                <SelectContent>
                  {users && users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input id="category" defaultValue="Sales" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                Start Date
              </Label>
              <Input id="startDate" type="date" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dueDate" className="text-right">
                Due Date
              </Label>
              <Input id="dueDate" type="date" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not_started">Not Started</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddGoal}>
              Add Goal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isAddReviewOpen} onOpenChange={setIsAddReviewOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add New Review</DialogTitle>
            <DialogDescription>Create a new performance review.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="employee" className="text-right">
                Employee
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select an employee" />
                </SelectTrigger>
                <SelectContent>
                  {users && users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reviewer" className="text-right">
                Reviewer
              </Label>
              <Input id="reviewer" defaultValue="Jane Smith" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reviewType" className="text-right">
                Review Type
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a review type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                  <SelectItem value="performance_improvement">Performance Improvement</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                Start Date
              </Label>
              <Input id="startDate" type="date" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-right">
                End Date
              </Label>
              <Input id="endDate" type="date" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dueDate" className="text-right">
                Due Date
              </Label>
              <Input id="dueDate" type="date" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddReview}>
              Add Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HRPerformance;
