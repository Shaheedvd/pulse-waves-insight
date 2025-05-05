
import React, { useState } from "react";
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
import { Book, BookOpen, Users, Calendar, Check, FileText, Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Define proper types for TrainingCourse
type TrainingCourse = {
  id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  duration: string;
  provider: string;
  cost: string;
  enrollments: number;
  rating: number;
};

// Define initial courses data
const initialCourses: TrainingCourse[] = [
  {
    id: "course-1",
    title: "Leadership Essentials",
    description: "Core leadership skills for new and aspiring managers",
    type: "internal",
    category: "Leadership",
    duration: "3 days",
    provider: "Internal L&D Team",
    cost: "R0",
    enrollments: 12,
    rating: 4.8
  },
  {
    id: "course-2",
    title: "Advanced Excel Skills",
    description: "Master Excel formulas, pivot tables, and data analysis",
    type: "online",
    category: "Technical Skills",
    duration: "8 hours",
    provider: "External Provider",
    cost: "R1,200",
    enrollments: 24,
    rating: 4.5
  },
  {
    id: "course-3",
    title: "Effective Communication",
    description: "Improve verbal and written communication in a professional setting",
    type: "workshop",
    category: "Soft Skills",
    duration: "2 days",
    provider: "External Consultant",
    cost: "R2,500",
    enrollments: 18,
    rating: 4.7
  }
];

// Define types for assignments
type CourseAssignment = {
  id: string;
  courseId: string;
  courseTitle: string;
  employees: { id: string; name: string }[];
  assignedDate: string;
  dueDate: string;
  mandatory: boolean;
  completionRate: number;
};

// Define initial assignments data
const initialAssignments: CourseAssignment[] = [
  {
    id: "1",
    courseId: "course-1",
    courseTitle: "Leadership Essentials",
    employees: [{ id: "3", name: "Sarah Manager" }, { id: "5", name: "John Director" }],
    assignedDate: "2025-04-15",
    dueDate: "2025-05-30",
    mandatory: true,
    completionRate: 50
  },
  {
    id: "2",
    courseId: "course-2",
    courseTitle: "Advanced Excel Skills",
    employees: [{ id: "7", name: "Fiona Finance" }, { id: "9", name: "Paula Payroll" }],
    assignedDate: "2025-04-10",
    dueDate: "2025-05-15",
    mandatory: false,
    completionRate: 75
  }
];

// Define skills data
const skillsData = [
  {
    category: "Technical Skills",
    skills: [
      { name: "Microsoft Excel", employees: 24 },
      { name: "Data Analysis", employees: 12 },
      { name: "SQL", employees: 8 },
      { name: "Python", employees: 5 },
      { name: "PowerBI", employees: 7 }
    ]
  },
  {
    category: "Soft Skills",
    skills: [
      { name: "Communication", employees: 30 },
      { name: "Leadership", employees: 15 },
      { name: "Presentation", employees: 22 },
      { name: "Conflict Resolution", employees: 18 },
      { name: "Teamwork", employees: 36 }
    ]
  }
];

// Simplified version of the component
export const HRLearningDevelopment = () => {
  const { users: allUsers } = useAuth();
  const [courses, setCourses] = useState(initialCourses);
  const [assignments, setAssignments] = useState(initialAssignments);
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [isAssignCourseOpen, setIsAssignCourseOpen] = useState(false);
  const [isViewCourseOpen, setIsViewCourseOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<TrainingCourse | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Simplified handlers
  const handleAddCourse = () => {
    const newCourse: TrainingCourse = {
      id: `course-${Date.now()}`,
      title: "New Training Course",
      description: "Description for the new course",
      type: "online",
      category: "Technical Skills",
      duration: "4 weeks",
      provider: "Internal",
      cost: "R0",
      enrollments: 0,
      rating: 0
    };
    
    setCourses([...courses, newCourse]);
    setIsAddCourseOpen(false);
  };

  const handleAssignCourse = () => {
    // Simplified version without form values
    const newAssignment: CourseAssignment = {
      id: (assignments.length + 1).toString(),
      courseId: courses[0]?.id || "",
      courseTitle: courses[0]?.title || "Unknown Course",
      employees: [{ id: allUsers[0]?.id || "1", name: allUsers[0]?.name || "Employee" }],
      assignedDate: new Date().toISOString().split('T')[0],
      dueDate: "2025-06-30",
      mandatory: false,
      completionRate: 0,
    };
    
    setAssignments([...assignments, newAssignment]);
    setIsAssignCourseOpen(false);
  };

  const handleViewCourse = (course: TrainingCourse) => {
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
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Course Title</label>
              <Input placeholder="e.g. Leadership Essentials" className="mt-1" />
            </div>
            
            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea 
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none mt-1"
                placeholder="Detailed description of the course content and learning objectives"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Course Type</label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select course type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="internal">Internal</SelectItem>
                    <SelectItem value="external">External</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Category</label>
                <Input 
                  placeholder="e.g. Leadership, Technical Skills, Finance" 
                  className="mt-1"
                  list="categories"
                />
                <datalist id="categories">
                  {uniqueCategories.map((category) => (
                    <option key={category} value={category} />
                  ))}
                </datalist>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={handleAddCourse}>Add Course</Button>
          </DialogFooter>
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
              
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setIsViewCourseOpen(false)}>Close</Button>
                <Button onClick={() => {
                  setIsViewCourseOpen(false);
                  setIsAssignCourseOpen(true);
                }}>Assign Course</Button>
              </DialogFooter>
            </div>
          )}
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
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Training Course</label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>{course.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Due Date</label>
              <Input type="date" className="mt-1" />
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={handleAssignCourse}>Assign Course</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HRLearningDevelopment;
