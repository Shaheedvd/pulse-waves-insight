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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Briefcase, Users, Mail, Calendar, Check, FileText } from "lucide-react";

// Type definitions
type Department = string;

interface JobPosting {
  id: string;
  title: string;
  department: Department;
  location: string;
  type: string;
  description: string;
  requirements: string;
  salary: string;
  closingDate: string;
  status: string;
  applicants: number;
}

interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  appliedDate: string;
  source: string;
  status: string;
  notes: string;
}

// Initial data for job postings
const initialJobPostings: JobPosting[] = [
  {
    id: "job-1",
    title: "HR Manager",
    department: "Human Resources",
    location: "Johannesburg",
    type: "permanent",
    description: "Lead the HR department and implement HR strategies aligned with business goals.",
    requirements: "Bachelor's degree in HR, 5+ years experience, SABPP registration",
    salary: "R45,000 - R60,000 per month",
    closingDate: "2024-06-30",
    status: "open",
    applicants: 12
  },
  {
    id: "job-2",
    title: "Financial Accountant",
    department: "Finance",
    location: "Cape Town",
    type: "permanent",
    description: "Responsible for financial reporting, month-end processes, and audit preparation.",
    requirements: "CA(SA) qualification, 3+ years post-articles experience",
    salary: "R40,000 - R50,000 per month",
    closingDate: "2024-06-15",
    status: "open",
    applicants: 8
  }
];

// Initial data for applicants
const initialApplicants: Applicant[] = [
  {
    id: "app-1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "082 123 4567",
    position: "HR Manager",
    appliedDate: "2024-05-10",
    source: "LinkedIn",
    status: "screening",
    notes: "Strong candidate with 8 years of experience in similar roles."
  },
  {
    id: "app-2",
    name: "Michael Smith",
    email: "michael.s@example.com",
    phone: "083 456 7890",
    position: "Financial Accountant",
    appliedDate: "2024-05-12",
    source: "Indeed",
    status: "interview",
    notes: "CA(SA) with 5 years experience at Big 4 firm."
  }
];

// Component implementation
export const HRRecruitment = () => {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>(initialJobPostings);
  const [applicants, setApplicants] = useState<Applicant[]>(initialApplicants);
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const [isAddApplicantOpen, setIsAddApplicantOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleAddJob = () => {
    const newJob: JobPosting = {
      id: `job-${Date.now()}`,
      title: "New Position",
      department: "Department Name",
      location: "Location",
      type: "permanent",
      description: "Job description goes here",
      requirements: "Job requirements go here",
      salary: "Salary range",
      closingDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
      status: "open",
      applicants: 0
    };
    
    setJobPostings([...jobPostings, newJob]);
    setIsAddJobOpen(false);
  };

  const handleAddApplicant = () => {
    const newApplicant: Applicant = {
      id: `app-${Date.now()}`,
      name: "New Applicant",
      email: "applicant@example.com",
      phone: "Phone number",
      position: jobPostings[0]?.title || "Position",
      appliedDate: new Date().toISOString().split('T')[0],
      source: "Website",
      status: "new",
      notes: "Initial notes"
    };
    
    setApplicants([...applicants, newApplicant]);
    setIsAddApplicantOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      case "draft":
        return "bg-blue-100 text-blue-800";
      case "new":
        return "bg-blue-100 text-blue-800";
      case "screening":
        return "bg-purple-100 text-purple-800";
      case "interview":
        return "bg-amber-100 text-amber-800";
      case "assessment":
        return "bg-indigo-100 text-indigo-800";
      case "offer":
        return "bg-green-100 text-green-800";
      case "hired":
        return "bg-emerald-100 text-emerald-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Filtered job postings based on search and filter
  const filteredJobs = jobPostings.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = 
      statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered applicants based on search and filter
  const filteredApplicants = applicants.filter((applicant) => {
    const matchesSearch = 
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = 
      statusFilter === "all" || applicant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Recruitment</h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <Button onClick={() => setIsAddJobOpen(true)} className="flex gap-1">
            <Briefcase className="h-4 w-4" />
            Add Job Posting
          </Button>
          <Button onClick={() => setIsAddApplicantOpen(true)} variant="outline" className="flex gap-1">
            <Users className="h-4 w-4" />
            Add Applicant
          </Button>
        </div>
      </div>

      <Tabs defaultValue="jobs" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="jobs">Job Postings</TabsTrigger>
          <TabsTrigger value="applicants">Applicants</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-col md:flex-row space-y-2 md:space-y-0 items-start md:items-center md:justify-between">
              <div>
                <CardTitle>Job Postings</CardTitle>
                <CardDescription>
                  Manage and track job openings in the organization
                </CardDescription>
              </div>

              <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <Input
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                  <Briefcase className="h-4 w-4 absolute left-2 top-3 text-muted-foreground" />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                    <TableHead>Status</TableHead>
                    <TableHead>Applicants</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.department}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>{job.type}</TableCell>
                      <TableCell>{job.closingDate}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(job.status)}>
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{job.applicants}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applicants" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-col md:flex-row space-y-2 md:space-y-0 items-start md:items-center md:justify-between">
              <div>
                <CardTitle>Applicants</CardTitle>
                <CardDescription>
                  Manage and track job applicants
                </CardDescription>
              </div>

              <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <Input
                    placeholder="Search applicants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                  <Users className="h-4 w-4 absolute left-2 top-3 text-muted-foreground" />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="screening">Screening</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="assessment">Assessment</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                    <SelectItem value="hired">Hired</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplicants.map((applicant) => (
                    <TableRow key={applicant.id}>
                      <TableCell className="font-medium">{applicant.name}</TableCell>
                      <TableCell>{applicant.position}</TableCell>
                      <TableCell>{applicant.email}</TableCell>
                      <TableCell>{applicant.phone}</TableCell>
                      <TableCell>{applicant.appliedDate}</TableCell>
                      <TableCell>{applicant.source}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(applicant.status)}>
                          {applicant.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isAddJobOpen} onOpenChange={setIsAddJobOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Add New Job Posting
            </DialogTitle>
            <DialogDescription>
              Create a new job posting for an open position
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right">
                Title
              </label>
              <Input id="title" defaultValue="HR Manager" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="department" className="text-right">
                Department
              </label>
              <Input id="department" defaultValue="Human Resources" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="location" className="text-right">
                Location
              </label>
              <Input id="location" defaultValue="Johannesburg" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="type" className="text-right">
                Type
              </label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="permanent">Permanent</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="part-time">Part-Time</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="closingDate" className="text-right">
                Closing Date
              </label>
              <Input id="closingDate" type="date" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddJob}>
              Add Job
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddApplicantOpen} onOpenChange={setIsAddApplicantOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Add New Applicant
            </DialogTitle>
            <DialogDescription>
              Add a new applicant to the recruitment process
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <Input id="name" defaultValue="John Doe" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="position" className="text-right">
                Position
              </label>
              <Input id="position" defaultValue="Software Engineer" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right">
                Email
              </label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="phone" className="text-right">
                Phone
              </label>
              <Input id="phone" type="tel" defaultValue="082 123 4567" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="appliedDate" className="text-right">
                Applied Date
              </label>
              <Input id="appliedDate" type="date" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="source" className="text-right">
                Source
              </label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="indeed">Indeed</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddApplicant}>
              Add Applicant
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HRRecruitment;
