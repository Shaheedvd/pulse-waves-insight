
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
import { useAuth, Department } from "@/contexts/AuthContext";
import { briefcase, users, mail, calendar, check, fileText } from "lucide-react";

// Job vacancy schema
const jobVacancySchema = z.object({
  title: z.string().min(2, { message: "Job title is required" }),
  department: z.string(),
  location: z.string().min(1, { message: "Location is required" }),
  type: z.enum(["permanent", "contract", "part-time", "internship"]),
  description: z.string().min(10, { message: "Job description is required" }),
  requirements: z.string().min(10, { message: "Requirements are required" }),
  salary: z.string().optional(),
  closingDate: z.string(),
});

type JobVacancyFormValues = z.infer<typeof jobVacancySchema>;

// Candidate schema
const candidateSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  position: z.string().min(1, { message: "Position applied for is required" }),
  source: z.string().min(1, { message: "Source is required" }),
  status: z.enum(["new", "screening", "interview", "assessment", "offer", "hired", "rejected"]),
});

type CandidateFormValues = z.infer<typeof candidateSchema>;

// Sample job listings data
const initialJobListings = [
  {
    id: "1",
    title: "HR Manager",
    department: "hr" as Department,
    location: "Cape Town",
    type: "permanent",
    description: "Lead the HR department and implement HR strategies aligned with business objectives.",
    requirements: "Bachelor's degree in HR, 5+ years experience in HR management, knowledge of South African labour laws.",
    salary: "R45,000 - R60,000 per month",
    closingDate: "2025-06-15",
    status: "open",
    applicants: 12,
  },
  {
    id: "2",
    title: "Software Developer",
    department: "it" as Department,
    location: "Remote (South Africa)",
    type: "permanent",
    description: "Develop and maintain web applications using React and TypeScript.",
    requirements: "3+ years of experience with React, JavaScript/TypeScript, responsive design, and API integration.",
    salary: "R35,000 - R50,000 per month",
    closingDate: "2025-06-30",
    status: "open",
    applicants: 24,
  },
  {
    id: "3",
    title: "Finance Analyst",
    department: "finance" as Department,
    location: "Johannesburg",
    type: "permanent",
    description: "Prepare financial reports and analysis to support business decision-making.",
    requirements: "Bachelor's degree in Finance or Accounting, 2+ years experience in financial analysis.",
    salary: "R30,000 - R45,000 per month",
    closingDate: "2025-06-20",
    status: "open",
    applicants: 8,
  }
];

// Sample candidates data
const initialCandidates = [
  {
    id: "1",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+27 12 345 6789",
    position: "HR Manager",
    appliedDate: "2025-05-01",
    source: "LinkedIn",
    status: "interview",
    notes: "Great communication skills, extensive HR experience in similar industries."
  },
  {
    id: "2",
    name: "Mark Johnson",
    email: "mark.johnson@example.com",
    phone: "+27 98 765 4321",
    position: "Software Developer",
    appliedDate: "2025-05-02",
    source: "Indeed",
    status: "assessment",
    notes: "Strong technical skills, particularly in React and TypeScript."
  },
  {
    id: "3",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+27 11 222 3333",
    position: "Finance Analyst",
    appliedDate: "2025-05-03",
    source: "Company Website",
    status: "screening",
    notes: "Excellent analytical skills, previous experience in financial reporting."
  },
  {
    id: "4",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+27 44 555 6666",
    position: "HR Manager",
    appliedDate: "2025-05-01",
    source: "Referral",
    status: "new",
    notes: "Came highly recommended by current HR team member."
  },
  {
    id: "5",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+27 77 888 9999",
    position: "Software Developer",
    appliedDate: "2025-05-04",
    source: "LinkedIn",
    status: "interview",
    notes: "Impressive portfolio of previous projects."
  }
];

export const HRRecruitment = () => {
  const [jobListings, setJobListings] = useState(initialJobListings);
  const [candidates, setCandidates] = useState(initialCandidates);
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const [isAddCandidateOpen, setIsAddCandidateOpen] = useState(false);
  const [isViewJobOpen, setIsViewJobOpen] = useState(false);
  const [isViewCandidateOpen, setIsViewCandidateOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  
  const jobForm = useForm<JobVacancyFormValues>({
    resolver: zodResolver(jobVacancySchema),
    defaultValues: {
      title: "",
      department: "operations",
      location: "Cape Town",
      type: "permanent",
      description: "",
      requirements: "",
      salary: "",
      closingDate: new Date().toISOString().split('T')[0],
    },
  });

  const candidateForm = useForm<CandidateFormValues>({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position: "",
      source: "Company Website",
      status: "new",
    },
  });

  const handleAddJob = (data: JobVacancyFormValues) => {
    console.log("New job vacancy:", data);
    const newJob = {
      id: (jobListings.length + 1).toString(),
      ...data,
      status: "open",
      applicants: 0,
    };
    setJobListings([...jobListings, newJob]);
    setIsAddJobOpen(false);
    jobForm.reset();
  };

  const handleAddCandidate = (data: CandidateFormValues) => {
    console.log("New candidate:", data);
    const newCandidate = {
      id: (candidates.length + 1).toString(),
      ...data,
      appliedDate: new Date().toISOString().split('T')[0],
      notes: "",
    };
    setCandidates([...candidates, newCandidate]);
    setIsAddCandidateOpen(false);
    candidateForm.reset();
  };

  const handleViewJob = (job: any) => {
    setSelectedJob(job);
    setIsViewJobOpen(true);
  };

  const handleViewCandidate = (candidate: any) => {
    setSelectedCandidate(candidate);
    setIsViewCandidateOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "screening":
        return "bg-purple-100 text-purple-800";
      case "interview":
        return "bg-amber-100 text-amber-800";
      case "assessment":
        return "bg-indigo-100 text-indigo-800";
      case "offer":
        return "bg-pink-100 text-pink-800";
      case "hired":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <briefcase className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Recruitment & Onboarding</h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <Button onClick={() => setIsAddJobOpen(true)} className="flex gap-1">
            <briefcase className="h-4 w-4" />
            Post Job Vacancy
          </Button>
          <Button onClick={() => setIsAddCandidateOpen(true)} variant="outline" className="flex gap-1">
            <users className="h-4 w-4" />
            Add Candidate
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="vacancies" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="vacancies">Job Vacancies</TabsTrigger>
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          <TabsTrigger value="reports">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vacancies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Job Listings</CardTitle>
              <CardDescription>
                Currently open positions across all departments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Closing Date</TableHead>
                    <TableHead>Applicants</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobListings.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell className="capitalize">
                        {job.department.replace('_', ' ')}
                      </TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell className="capitalize">{job.type}</TableCell>
                      <TableCell>{job.closingDate}</TableCell>
                      <TableCell>{job.applicants}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleViewJob(job)}>
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
        
        <TabsContent value="candidates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Candidates Pipeline</CardTitle>
              <CardDescription>
                Track and manage candidate applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {candidates.map((candidate) => (
                    <TableRow key={candidate.id}>
                      <TableCell className="font-medium">{candidate.name}</TableCell>
                      <TableCell>{candidate.position}</TableCell>
                      <TableCell>{candidate.appliedDate}</TableCell>
                      <TableCell>{candidate.source}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                          {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleViewCandidate(candidate)}>
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
        
        <TabsContent value="onboarding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Onboarding Workflows</CardTitle>
              <CardDescription>
                New employee onboarding processes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-md">
                  <div className="bg-muted p-4 border-b">
                    <h3 className="text-lg font-semibold">Standard Employee Onboarding</h3>
                    <p className="text-sm text-muted-foreground">Default workflow for most positions</p>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between p-2 border rounded-md bg-green-50">
                      <div className="flex items-center gap-2">
                        <check className="h-4 w-4 text-green-500" />
                        <span>Welcome email with login credentials</span>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Automated</span>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md bg-green-50">
                      <div className="flex items-center gap-2">
                        <check className="h-4 w-4 text-green-500" />
                        <span>IT equipment setup</span>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">IT Department</span>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-2">
                        <calendar className="h-4 w-4" />
                        <span>Introduction to company policies</span>
                      </div>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">HR Department</span>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-2">
                        <calendar className="h-4 w-4" />
                        <span>Team introduction meeting</span>
                      </div>
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Manager</span>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-2">
                        <calendar className="h-4 w-4" />
                        <span>First-week check-in</span>
                      </div>
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Manager</span>
                    </div>
                  </div>
                  <div className="bg-muted p-4 border-t flex justify-end">
                    <Button variant="outline" size="sm">Edit Workflow</Button>
                  </div>
                </div>
                
                <div className="border rounded-md">
                  <div className="bg-muted p-4 border-b">
                    <h3 className="text-lg font-semibold">Executive Onboarding</h3>
                    <p className="text-sm text-muted-foreground">For senior management and executive positions</p>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between p-2 border rounded-md bg-green-50">
                      <div className="flex items-center gap-2">
                        <check className="h-4 w-4 text-green-500" />
                        <span>Welcome package delivery</span>
                      </div>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">HR Department</span>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-2">
                        <calendar className="h-4 w-4" />
                        <span>Strategic overview with CEO</span>
                      </div>
                      <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">Executive</span>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-2">
                        <calendar className="h-4 w-4" />
                        <span>Leadership team introductions</span>
                      </div>
                      <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">Executive</span>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-2">
                        <calendar className="h-4 w-4" />
                        <span>Dept. specific onboarding</span>
                      </div>
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Manager</span>
                    </div>
                  </div>
                  <div className="bg-muted p-4 border-t flex justify-end">
                    <Button variant="outline" size="sm">Edit Workflow</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Recruitment Metrics</CardTitle>
                <CardDescription>Key performance indicators for hiring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Time to Hire</p>
                    <p className="text-2xl font-bold">23 days</p>
                  </div>
                  <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    -4 days vs last quarter
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Cost per Hire</p>
                    <p className="text-2xl font-bold">R 8,500</p>
                  </div>
                  <div className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                    +R 500 vs last quarter
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Application Conversion</p>
                    <p className="text-2xl font-bold">4.2%</p>
                  </div>
                  <div className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                    Stable vs last quarter
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Active Requisitions</CardTitle>
                <CardDescription>Current open positions by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[220px] flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>IT Department</span>
                      <span className="font-medium">4 positions</span>
                    </div>
                    <div className="h-2 bg-muted overflow-hidden rounded-full">
                      <div className="h-full bg-primary rounded-full" style={{ width: '40%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Sales Department</span>
                      <span className="font-medium">3 positions</span>
                    </div>
                    <div className="h-2 bg-muted overflow-hidden rounded-full">
                      <div className="h-full bg-primary rounded-full" style={{ width: '30%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>HR Department</span>
                      <span className="font-medium">2 positions</span>
                    </div>
                    <div className="h-2 bg-muted overflow-hidden rounded-full">
                      <div className="h-full bg-primary rounded-full" style={{ width: '20%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Finance Department</span>
                      <span className="font-medium">1 position</span>
                    </div>
                    <div className="h-2 bg-muted overflow-hidden rounded-full">
                      <div className="h-full bg-primary rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Add Job Vacancy Dialog */}
      <Dialog open={isAddJobOpen} onOpenChange={setIsAddJobOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <briefcase className="h-5 w-5" />
              Post New Job Vacancy
            </DialogTitle>
            <DialogDescription>
              Complete the form to create a new job listing
            </DialogDescription>
          </DialogHeader>
          
          <Form {...jobForm}>
            <form onSubmit={jobForm.handleSubmit(handleAddJob)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={jobForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Software Engineer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={jobForm.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="operations">Operations</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="hr">HR</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="product">Product</SelectItem>
                          <SelectItem value="it">IT</SelectItem>
                          <SelectItem value="customer_support">Customer Support</SelectItem>
                          <SelectItem value="legal">Legal</SelectItem>
                          <SelectItem value="facilities">Facilities</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={jobForm.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Cape Town" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={jobForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employment Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="permanent">Permanent</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={jobForm.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary Range (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. R25,000 - R35,000 per month" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={jobForm.control}
                  name="closingDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Closing Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={jobForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <textarea 
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                        placeholder="Describe the role, responsibilities, and expectations..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={jobForm.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requirements</FormLabel>
                    <FormControl>
                      <textarea 
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                        placeholder="List qualifications, experience, skills required..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit">Post Job</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Add Candidate Dialog */}
      <Dialog open={isAddCandidateOpen} onOpenChange={setIsAddCandidateOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <users className="h-5 w-5" />
              Add New Candidate
            </DialogTitle>
            <DialogDescription>
              Enter candidate details to add to your recruitment pipeline
            </DialogDescription>
          </DialogHeader>
          
          <Form {...candidateForm}>
            <form onSubmit={candidateForm.handleSubmit(handleAddCandidate)} className="space-y-4">
              <FormField
                control={candidateForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={candidateForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="jane.smith@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={candidateForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+27 12 345 6789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={candidateForm.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position Applied For</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={candidateForm.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Source</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select source" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Company Website">Company Website</SelectItem>
                          <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                          <SelectItem value="Indeed">Indeed</SelectItem>
                          <SelectItem value="Referral">Referral</SelectItem>
                          <SelectItem value="Job Board">Job Board</SelectItem>
                          <SelectItem value="University">University</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={candidateForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="screening">Screening</SelectItem>
                          <SelectItem value="interview">Interview</SelectItem>
                          <SelectItem value="assessment">Assessment</SelectItem>
                          <SelectItem value="offer">Offer</SelectItem>
                          <SelectItem value="hired">Hired</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter>
                <Button type="submit">Add Candidate</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* View Job Dialog */}
      <Dialog open={isViewJobOpen} onOpenChange={setIsViewJobOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Job Details</DialogTitle>
            <DialogDescription>
              Complete information about the selected job posting
            </DialogDescription>
          </DialogHeader>
          
          {selectedJob && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
                  <p className="capitalize text-muted-foreground">
                    {selectedJob.department.replace('_', ' ')} Department
                  </p>
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {selectedJob.status.toUpperCase()}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="border rounded-md p-3">
                  <p className="text-muted-foreground">Location</p>
                  <p className="font-medium">{selectedJob.location}</p>
                </div>
                <div className="border rounded-md p-3">
                  <p className="text-muted-foreground">Type</p>
                  <p className="font-medium capitalize">{selectedJob.type}</p>
                </div>
                <div className="border rounded-md p-3">
                  <p className="text-muted-foreground">Closing Date</p>
                  <p className="font-medium">{selectedJob.closingDate}</p>
                </div>
                <div className="border rounded-md p-3">
                  <p className="text-muted-foreground">Salary Range</p>
                  <p className="font-medium">{selectedJob.salary || 'Not disclosed'}</p>
                </div>
                <div className="border rounded-md p-3">
                  <p className="text-muted-foreground">Total Applicants</p>
                  <p className="font-medium">{selectedJob.applicants}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold">Job Description</h3>
                  <p className="mt-1 whitespace-pre-line">{selectedJob.description}</p>
                </div>
                
                <div className="mt-4">
                  <h3 className="font-semibold">Requirements</h3>
                  <p className="mt-1 whitespace-pre-line">{selectedJob.requirements}</p>
                </div>
              </div>
              
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setIsViewJobOpen(false)}>Close</Button>
                <Button>View Applicants</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* View Candidate Dialog */}
      <Dialog open={isViewCandidateOpen} onOpenChange={setIsViewCandidateOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Candidate Profile</DialogTitle>
            <DialogDescription>
              Detailed candidate information and application status
            </DialogDescription>
          </DialogHeader>
          
          {selectedCandidate && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{selectedCandidate.name}</h2>
                  <p className="text-muted-foreground">{selectedCandidate.position}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedCandidate.status)}`}>
                  {selectedCandidate.status.toUpperCase()}
                </div>
              </div>
              
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="application">Application</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Full Name</Label>
                      <p>{selectedCandidate.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Email</Label>
                      <p className="flex items-center gap-1">
                        <mail className="h-4 w-4" />
                        {selectedCandidate.email}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Phone</Label>
                      <p>{selectedCandidate.phone}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Applied For</Label>
                      <p>{selectedCandidate.position}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Source</Label>
                      <p>{selectedCandidate.source}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Applied On</Label>
                      <p>{selectedCandidate.appliedDate}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="application" className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Notes</h3>
                    <p className="text-sm">{selectedCandidate.notes || 'No notes added yet.'}</p>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Resume</h3>
                    <div className="flex items-center justify-between p-2 border rounded-md bg-muted">
                      <div className="flex items-center gap-2">
                        <fileText className="h-4 w-4" />
                        <span>{selectedCandidate.name} - Resume.pdf</span>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="timeline" className="space-y-4">
                  <div className="space-y-4">
                    <div className="border-l-2 border-green-500 pl-4 pb-6 relative">
                      <div className="w-3 h-3 bg-green-500 rounded-full absolute -left-[7px]" />
                      <p className="text-sm text-muted-foreground">{selectedCandidate.appliedDate}</p>
                      <h4 className="font-medium">Application Received</h4>
                      <p className="text-sm">
                        Candidate application was received through {selectedCandidate.source}.
                      </p>
                    </div>
                    
                    <div className="border-l-2 border-purple-500 pl-4 pb-6 relative">
                      <div className="w-3 h-3 bg-purple-500 rounded-full absolute -left-[7px]" />
                      <p className="text-sm text-muted-foreground">{selectedCandidate.appliedDate.slice(0, -1) + '3'}</p>
                      <h4 className="font-medium">Screening Completed</h4>
                      <p className="text-sm">
                        Initial resume screening completed by HR team.
                      </p>
                    </div>
                    
                    <div className="border-l-2 border-amber-500 pl-4 relative">
                      <div className="w-3 h-3 bg-amber-500 rounded-full absolute -left-[7px]" />
                      <p className="text-sm text-muted-foreground">{selectedCandidate.appliedDate.slice(0, -1) + '8'}</p>
                      <h4 className="font-medium">Interview Scheduled</h4>
                      <p className="text-sm">
                        First interview scheduled with the hiring manager.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <DialogFooter className="gap-2">
                <Select defaultValue={selectedCandidate.status}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="screening">Screening</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="assessment">Assessment</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                    <SelectItem value="hired">Hired</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Button>Update Status</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
