import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth, Department } from "@/contexts/AuthContext";
import { Book, BookOpen, Users, Calendar, Check, FileText, Star } from "lucide-react";

// Course schema
const courseSchema = z.object({
  title: z.string().min(2, { message: "Course title is required" }),
  description: z.string().min(10, { message: "Description is required" }),
  type: z.enum(["internal", "external", "online", "workshop"]),
  category: z.string().min(1, { message: "Category is required" }),
  duration: z.string().min(1, { message: "Duration is required" }),
  provider: z.string().optional(),
  cost: z.string().optional(),
});

type CourseFormValues = z.infer<typeof courseSchema>;

// Assignment schema
const assignmentSchema = z.object({
  courseId: z.string({ required_error: "Course is required" }),
  employeeIds: z.array(z.string()).min(1, { message: "At least one employee must be selected" }),
  dueDate: z.string({ required_error: "Due date is required" }),
  mandatory: z.boolean().default(false),
});

type AssignmentFormValues = z.infer<typeof assignmentSchema>;

// Sample courses data
const initialCourses = [
  {
    id: "1",
    title: "Leadership Essentials",
    description: "A foundational course covering key leadership principles, communication skills, and team management techniques.",
    type: "internal",
    category: "Leadership",
    duration: "16 hours",
    provider: "Internal L&D Team",
    cost: "R0",
    enrollments: 8,
    rating: 4.7,
  },
  {
    id: "2",
    title: "Financial Management for Non-Financial Managers",
    description: "Learn to understand financial statements, budgeting, and financial decision-making without a finance background.",
    type: "workshop",
    category: "Finance",
    duration: "8 hours",
    provider: "SA Financial Training Institute",
    cost: "R3,500 per person",
    enrollments: 12,
    rating: 4.2,
  },
  {
    id: "3",
    title: "Advanced Excel Skills",
    description: "Master advanced Excel functions including VLOOKUP, pivot tables, macros, and data analysis tools.",
    type: "online",
    category: "Technical Skills",
    duration: "Self-paced (approx. 10 hours)",
    provider: "SkillSoft",
    cost: "R1,200 per license",
    enrollments: 24,
    rating: 4.5,
  },
  {
    id: "4",
    title: "Effective Communication Skills",
    description: "Develop key communication skills including active listening, conflict resolution, and persuasive speaking.",
    type: "workshop",
    category: "Soft Skills",
    duration: "12 hours",
    provider: "Communication Excellence Ltd",
    cost: "R2,800 per person",
    enrollments: 18,
    rating: 4.8,
  },
  {
    id: "5",
    title: "Project Management Fundamentals",
    description: "Learn the basics of project management including planning, execution, monitoring, and closing projects successfully.",
    type: "external",
    category: "Project Management",
    duration: "24 hours",
    provider: "PM Institute South Africa",
    cost: "R4,500 per person",
    enrollments: 10,
    rating: 4.3,
  },
];

// Sample assignments data
const initialAssignments = [
  {
    id: "1",
    courseId: "1",
    courseTitle: "Leadership Essentials",
    employees: [
      { id: "6", name: "Oliver Operations" },
      { id: "7", name: "Fiona Finance" },
      { id: "10", name: "Helen HR" },
    ],
    assignedDate: "2025-04-15",
    dueDate: "2025-06-15",
    mandatory: true,
    completionRate: 33,
  },
  {
    id: "2",
    courseId: "3",
    courseTitle: "Advanced Excel Skills",
    employees: [
      { id: "8", name: "Andrew Accountant" },
      { id: "9", name: "Paula Payroll" },
      { id: "14", name: "Carlos CRM" },
      { id: "25", name: "Frank Facilities" },
    ],
    assignedDate: "2025-04-01",
    dueDate: "2025-05-15",
    mandatory: true,
    completionRate: 50,
  },
  {
    id: "3",
    courseId: "4",
    courseTitle: "Effective Communication Skills",
    employees: [
      { id: "22", name: "Harry Helpdesk" },
      { id: "13", name: "Sally SalesRep" },
      { id: "11", name: "Rachel Recruiter" },
    ],
    assignedDate: "2025-03-10",
    dueDate: "2025-05-10",
    mandatory: false,
    completionRate: 67,
  },
];

// Sample skill data
const skillsData = [
  {
    category: "Technical Skills",
    skills: [
      { name: "Microsoft Excel", employees: 18 },
      { name: "Salesforce CRM", employees: 9 },
      { name: "Financial Analysis", employees: 6 },
      { name: "Project Management", employees: 8 },
      { name: "SQL", employees: 5 },
      { name: "JavaScript", employees: 4 },
      { name: "HR Systems", employees: 3 },
    ]
  },
  {
    category: "Soft Skills",
    skills: [
      { name: "Leadership", employees: 12 },
      { name: "Communication", employees: 21 },
      { name: "Team Management", employees: 10 },
      { name: "Conflict Resolution", employees: 15 },
      { name: "Presentation", employees: 14 },
      { name: "Negotiation", employees: 7 },
    ]
  },
  {
    category: "Certifications",
    skills: [
      { name: "PMP", employees: 3 },
      { name: "ACCA", employees: 2 },
      { name: "MCSA", employees: 2 },
      { name: "ITIL", employees: 4 },
      { name: "SHRM-CP", employees: 1 },
    ]
  }
];

export const HRLearningDevelopment = () => {
  const { users: allUsers } = useAuth();
  const [courses, setCourses] = useState(initialCourses);
  const [assignments, setAssignments] = useState(initialAssignments);
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [isAssignCourseOpen, setIsAssignCourseOpen] = useState(false);
  const [isViewCourseOpen, setIsViewCourseOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Form hooks
  const courseForm = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "internal",
      category: "",
      duration: "",
      provider: "",
      cost: "",
    },
  });

  const assignmentForm = useForm<AssignmentFormValues>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      courseId: "",
      employeeIds: [],
      dueDate: "",
      mandatory: false,
    },
  });
  
  // Handlers
  const handleAddCourse = (data: CourseFormValues) => {
    console.log("New course added:", data);
    const newCourse = {
      id: (courses.length + 1).toString(),
      title: data.title,
      description: data.description,
      type: data.type,
      category: data.category,
      duration: data.duration,
      provider: data.provider || "",
      cost: data.cost || "",
      enrollments: 0,
      rating: 0,
    };
    setCourses([...courses, newCourse]);
    setIsAddCourseOpen(false);
    courseForm.reset();
  };

  const handleAssignCourse = (data: AssignmentFormValues) => {
    console.log("New assignment created:", data);
    const course = courses.find(c => c.id === data.courseId);
    const assignedEmployees = allUsers.filter(user => 
      data.employeeIds.includes(user.id)
    ).map(e => ({ id: e.id, name: e.name }));

    const newAssignment = {
      id: (assignments.length + 1).toString(),
      courseId: data.courseId,
      courseTitle: course?.title || "Unknown Course",
      employees: assignedEmployees,
      assignedDate: new Date().toISOString().split('T')[0],
      dueDate: data.dueDate,
      mandatory: data.mandatory,
      completionRate: 0,
    };
    
    setAssignments([...assignments, newAssignment]);
    setIsAssignCourseOpen(false);
    assignmentForm.reset();
  };

  const handleViewCourse = (course: any) => {
    setSelectedCourse(course);
    setIsViewCourseOpen(true);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "internal":
        return "bg-blue-100 text-blue-800";
      case "external":
        return "bg-purple-100 text-purple-800";
      case "online":
        return "bg-green-100 text-green-800";
      case "workshop":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Filter courses based on search term and category
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Extract unique categories from courses
  const uniqueCategories = Array.from(new Set(courses.map(course => course.category)));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <Book className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Learning & Development</h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <Button onClick={() => setIsAddCourseOpen(true)} className="flex gap-1">
            <BookOpen className="h-4 w-4" />
            Add Training Course
          </Button>
          <Button onClick={() => setIsAssignCourseOpen(true)} variant="outline" className="flex gap-1">
            <Users className="h-4 w-4" />
            Assign Training
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="courses">Course Catalog</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="skills">Skills Inventory</TabsTrigger>
          <TabsTrigger value="paths">Learning Paths</TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-col md:flex-row space-y-2 md:space-y-0 items-start md:items-center md:justify-between">
              <div>
                <CardTitle>Training Courses</CardTitle>
                <CardDescription>
                  Browse available training courses for employees
                </CardDescription>
              </div>
              
              <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                  <BookOpen className="h-4 w-4 absolute left-2 top-3 text-muted-foreground" />
                </div>
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {uniqueCategories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Enrollments</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.title}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(course.type)}`}>
                          {course.type.charAt(0).toUpperCase() + course.type.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>{course.category}</TableCell>
                      <TableCell>{course.duration}</TableCell>
                      <TableCell>{course.provider || "-"}</TableCell>
                      <TableCell>{course.enrollments}</TableCell>
                      <TableCell>
                        {course.rating > 0 ? (
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium">{course.rating}</span>
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          </div>
                        ) : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleViewCourse(course)}>
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
        
        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Training Assignments</CardTitle>
              <CardDescription>
                Track assigned training courses for employees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Mandatory</TableHead>
                    <TableHead>Completion Rate</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell className="font-medium">{assignment.courseTitle}</TableCell>
                      <TableCell>{assignment.employees.length} employees</TableCell>
                      <TableCell>{assignment.dueDate}</TableCell>
                      <TableCell>
                        {assignment.mandatory ? (
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                            Required
                          </span>
                        ) : (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            Optional
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div
                            className="bg-primary h-2.5 rounded-full"
                            style={{ width: `${assignment.completionRate}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-muted-foreground">{assignment.completionRate}%</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Due Dates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {assignments
                    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                    .slice(0, 3)
                    .map((assignment) => (
                      <div key={assignment.id} className="flex items-center justify-between rounded-lg border p-3">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{assignment.courseTitle}</p>
                          <p className="text-xs text-muted-foreground">Due: {assignment.dueDate}</p>
                        </div>
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                          {assignment.completionRate < 100 ? `${assignment.completionRate}% Done` : 'Complete'}
                        </span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Most Assigned Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <p className="text-sm font-medium leading-none">Advanced Excel Skills</p>
                    <span className="text-xs font-medium">4 assignments</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <p className="text-sm font-medium leading-none">Leadership Essentials</p>
                    <span className="text-xs font-medium">3 assignments</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <p className="text-sm font-medium leading-none">Effective Communication</p>
                    <span className="text-xs font-medium">3 assignments</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Assignment Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <p className="text-sm font-medium leading-none">Total Assignments</p>
                    <span className="text-xs font-medium">{assignments.length}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <p className="text-sm font-medium leading-none">Mandatory Courses</p>
                    <span className="text-xs font-medium">{assignments.filter(a => a.mandatory).length}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <p className="text-sm font-medium leading-none">Avg. Completion Rate</p>
                    <span className="text-xs font-medium">
                      {Math.round(assignments.reduce((sum, a) => sum + a.completionRate, 0) / assignments.length)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Skills Inventory</CardTitle>
              <CardDescription>
                Track and manage employee skills across the organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {skillsData.map((category) => (
                  <div key={category.category}>
                    <h3 className="text-lg font-medium mb-4">{category.category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.skills.map((skill) => (
                        <div key={skill.name} className="border rounded-md p-4">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">{skill.name}</h4>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              {skill.employees} employees
                            </span>
                          </div>
                          <div className="mt-2 text-xs text-muted-foreground">
                            {skill.employees > 0 
                              ? `${Math.round((skill.employees / allUsers.length) * 100)}% of workforce`
                              : 'No employees with this skill'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" size="sm">Add Skill</Button>
                  <Button variant="outline" size="sm">Manage Categories</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="paths" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Learning Paths</CardTitle>
              <CardDescription>
                Structured learning journeys for career development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-md">
                  <div className="bg-muted p-4 border-b">
                    <h3 className="text-lg font-semibold">Management Development Path</h3>
                    <p className="text-sm text-muted-foreground">For employees transitioning to management roles</p>
                  </div>
                  
                  <div className="p-4 space-y-4">
                    <div className="relative pl-6 pb-6">
                      <div className="absolute left-0 top-0 h-full w-[1px] bg-border"></div>
                      <div className="absolute left-[-4px] top-1 h-2 w-2 rounded-full bg-primary"></div>
                      <div>
                        <h4 className="font-medium">Stage 1: Fundamentals</h4>
                        <p className="text-sm text-muted-foreground mt-1">Courses: Leadership Essentials, Effective Communication Skills</p>
                      </div>
                    </div>
                    
                    <div className="relative pl-6 pb-6">
                      <div className="absolute left-0 top-0 h-full w-[1px] bg-border"></div>
                      <div className="absolute left-[-4px] top-1 h-2 w-2 rounded-full bg-primary"></div>
                      <div>
                        <h4 className="font-medium">Stage 2: Team Leadership</h4>
                        <p className="text-sm text-muted-foreground mt-1">Courses: Team Management, Performance Management, Conflict Resolution</p>
                      </div>
                    </div>
                    
                    <div className="relative pl-6">
                      <div className="absolute left-[-4px] top-1 h-2 w-2 rounded-full bg-primary"></div>
                      <div>
                        <h4 className="font-medium">Stage 3: Advanced Management</h4>
                        <p className="text-sm text-muted-foreground mt-1">Courses: Strategic Planning, Financial Management for Non-Financial Managers</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-4 border-t flex justify-end">
                    <Button variant="outline" size="sm">View Enrollments</Button>
                  </div>
                </div>
                
                <div className="border rounded-md">
                  <div className="bg-muted p-4 border-b">
                    <h3 className="text-lg font-semibold">Technical Specialist Path</h3>
                    <p className="text-sm text-muted-foreground">For employees developing specialized technical skills</p>
                  </div>
                  
                  <div className="p-4 space-y-4">
                    <div className="relative pl-6 pb-6">
                      <div className="absolute left-0 top-0 h-full w-[1px] bg-border"></div>
                      <div className="absolute left-[-4px] top-1 h-2 w-2 rounded-full bg-primary"></div>
                      <div>
                        <h4 className="font-medium">Stage 1: Core Technical Skills</h4>
                        <p className="text-sm text-muted-foreground mt-1">Courses: Advanced Excel Skills, Basic Data Analysis</p>
                      </div>
                    </div>
                    
                    <div className="relative pl-6 pb-6">
                      <div className="absolute left-0 top-0 h-full w-[1px] bg-border"></div>
                      <div className="absolute left-[-4px] top-1 h-2 w-2 rounded-full bg-primary"></div>
                      <div>
                        <h4 className="font-medium">Stage 2: Specialized Knowledge</h4>
                        <p className="text-sm text-muted-foreground mt-1">Courses: SQL Fundamentals, Business Intelligence Tools</p>
                      </div>
                    </div>
                    
                    <div className="relative pl-6">
                      <div className="absolute left-[-4px] top-1 h-2 w-2 rounded-full bg-primary"></div>
                      <div>
                        <h4 className="font-medium">Stage 3: Advanced Technical Expertise</h4>
                        <p className="text-sm text-muted-foreground mt-1">Courses: Data Visualization, Advanced Analytics, Technical Certification</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-4 border-t flex justify-end">
                    <Button variant="outline" size="sm">View Enrollments</Button>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Create Learning Path</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add Course Dialog */}
      <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Add New Training Course
            </DialogTitle>
            <DialogDescription>
              Create a new training course to add to the catalog
            </DialogDescription>
          </DialogHeader>
          
          <Form {...courseForm}>
            <form onSubmit={courseForm.handleSubmit(handleAddCourse)} className="space-y-4">
              <FormField
                control={courseForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Leadership Essentials" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={courseForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <textarea 
                        className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                        placeholder="Detailed description of the course content and learning objectives"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={courseForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select course type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="internal">Internal</SelectItem>
                          <SelectItem value="external">External</SelectItem>
                          <SelectItem value="online">Online</SelectItem>
                          <SelectItem value="workshop">Workshop</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={courseForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g. Leadership, Technical Skills, Finance" 
                          {...field} 
                          list="categories"
                        />
                      </FormControl>
                      <datalist id="categories">
                        {uniqueCategories.map((category) => (
                          <option key={category} value={category} />
                        ))}
                      </datalist>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={courseForm.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 8 hours, 3 days, Self-paced" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={courseForm.control}
                  name="provider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provider (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Internal L&D Team, External Vendor" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={courseForm.control}
                  name="cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cost (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. R1,500 per person" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter>
                <Button type="submit">Add Course</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Assign Course Dialog */}
      <Dialog open={isAssignCourseOpen} onOpenChange={setIsAssignCourseOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Assign Training Course
            </DialogTitle>
            <DialogDescription>
              Assign a course to one or more employees
            </DialogDescription>
          </DialogHeader>
          
          <Form {...assignmentForm}>
            <form onSubmit={assignmentForm.handleSubmit(handleAssignCourse)} className="space-y-4">
              <FormField
                control={assignmentForm.control}
                name="courseId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Training Course</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>{course.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={assignmentForm.control}
                name="employeeIds"
                render={() => (
                  <FormItem>
                    <FormLabel>Employees</FormLabel>
                    <div className="space-y-2">
                      <FormDescription>
                        Select one or more employees to assign this course to:
                      </FormDescription>
                      
                      {/* Group employees by department */}
                      {Object.entries(
                        allUsers.reduce<Record<string, typeof allUsers>>((acc, user) => {
                          const dept = user.department || 'Other';
                          if (!acc[dept]) acc[dept] = [];
                          acc[dept].push(user);
                          return acc;
                        }, {})
                      ).map(([department, deptUsers]) => (
                        <div key={department} className="space-y-1">
                          <Label className="text-sm text-muted-foreground capitalize">
                            {department.replace('_', ' ')} Department
                          </Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {deptUsers.map((user) => (
                              <FormField
                                key={user.id}
                                control={assignmentForm.control}
                                name="employeeIds"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={user.id}
                                      className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3"
                                    >
                                      <FormControl>
                                        <input
                                          type="checkbox"
                                          checked={field.value?.includes(user.id)}
                                          onChange={(e) => {
                                            const checked = e.target.checked;
                                            const currentIds = field.value || [];
                                            if (checked) {
                                              field.onChange([...currentIds, user.id]);
                                            } else {
                                              field.onChange(
                                                currentIds.filter((id) => id !== user.id)
                                              );
                                            }
                                          }}
                                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                      </FormControl>
                                      <div className="space-y-1 leading-none">
                                        <FormLabel className="text-sm font-normal">
                                          {user.name}
                                        </FormLabel>
                                        <p className="text-xs text-muted-foreground">
                                          {user.position || "Position not specified"}
                                        </p>
                                      </div>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={assignmentForm.control}
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
                  control={assignmentForm.control}
                  name="mandatory"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 space-x-3 space-y-0">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Mandatory Training</FormLabel>
                        <FormDescription>
                          Mark this training as required
                        </FormDescription>
                      </div>
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter>
                <Button type="submit">Assign Course</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* View Course Dialog */}
      <Dialog open={isViewCourseOpen} onOpenChange={setIsViewCourseOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Course Details</DialogTitle>
            <DialogDescription>
              Detailed information about this training course
            </DialogDescription>
          </DialogHeader>
          
          {selectedCourse && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{selectedCourse.title}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedCourse.type)}`}>
                      {selectedCourse.type.charAt(0).toUpperCase() + selectedCourse.type.slice(1)}
                    </span>
                    <span className="text-sm text-muted-foreground">{selectedCourse.category}</span>
                  </div>
                </div>
                
                {selectedCourse.rating > 0 && (
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-md">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-medium text-amber-800">{selectedCourse.rating}</span>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="border rounded-md p-3">
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-medium">{selectedCourse.duration}</p>
                </div>
                
                <div className="border rounded-md p-3">
                  <p className="text-muted-foreground">Provider</p>
                  <p className="font-medium">{selectedCourse.provider || "Not specified"}</p>
                </div>
                
                <div className="border rounded-md p-3">
                  <p className="text-muted-foreground">Cost</p>
                  <p className="font-medium">{selectedCourse.cost || "Not specified"}</p>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-sm">{selectedCourse.description}</p>
              </div>
              
              {selectedCourse.enrollments > 0 && (
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Current Enrollments</h3>
                  <p className="text-sm">{selectedCourse.enrollments} employees currently enrolled</p>
                </div>
              )}
              
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setIsViewCourseOpen(false)}>Close</Button>
                <Button onClick={() => {
                  setIsViewCourseOpen(false);
                  setIsAssignCourseOpen(true);
                  assignmentForm.setValue("courseId", selectedCourse.id);
                }}>Assign Course</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
