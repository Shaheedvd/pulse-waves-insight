
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Briefcase, Users, Calendar, FileText, Plus, Search, Eye, Edit } from "lucide-react";
import { PermissionGate } from "@/components/shared/PermissionGate";
import { JobPosting, JobApplication } from "@/types/hr";

const RecruitmentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("jobs");

  // Mock data
  const mockJobs: JobPosting[] = [
    {
      id: "1",
      title: "Senior Software Engineer",
      department: "Engineering",
      description: "Lead software development projects",
      requirements: ["5+ years experience", "React, Node.js"],
      responsibilities: ["Lead development", "Mentor juniors"],
      salaryRange: { min: 80000, max: 120000, currency: "USD" },
      location: "Remote",
      jobType: "full-time",
      status: "active",
      postedBy: "HR Team",
      createdAt: "2024-01-15",
      closingDate: "2024-02-15",
      applicationsCount: 25
    },
    {
      id: "2",
      title: "Marketing Manager",
      department: "Marketing",
      description: "Drive marketing campaigns and strategy",
      requirements: ["3+ years marketing", "Digital marketing"],
      responsibilities: ["Campaign management", "Team leadership"],
      salaryRange: { min: 60000, max: 90000, currency: "USD" },
      location: "New York",
      jobType: "full-time",
      status: "active",
      postedBy: "HR Team",
      createdAt: "2024-01-10",
      closingDate: "2024-02-10",
      applicationsCount: 18
    }
  ];

  const mockApplications: JobApplication[] = [
    {
      id: "1",
      jobId: "1",
      applicantName: "John Smith",
      email: "john.smith@email.com",
      phone: "+1234567890",
      cvUrl: "/documents/john_smith_cv.pdf",
      coverLetter: "I am excited to apply...",
      stage: "shortlisted",
      appliedAt: "2024-01-20",
      notes: [
        {
          id: "1",
          note: "Strong technical background",
          addedBy: "HR Manager",
          addedAt: "2024-01-21"
        }
      ],
      interviews: [
        {
          id: "1",
          scheduledDate: "2024-01-25T10:00:00",
          interviewers: ["Tech Lead", "HR Manager"],
          type: "video",
          status: "scheduled"
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "closed": return "bg-gray-100 text-gray-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "applied": return "bg-blue-100 text-blue-800";
      case "shortlisted": return "bg-yellow-100 text-yellow-800";
      case "interviewed": return "bg-purple-100 text-purple-800";
      case "offered": return "bg-orange-100 text-orange-800";
      case "hired": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Recruitment Management</h2>
          <p className="text-muted-foreground">
            Manage job postings, applications, and hiring process
          </p>
        </div>
        <PermissionGate module="hr" action="create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Post New Job
          </Button>
        </PermissionGate>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Across departments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">43</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offers</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Pending acceptance</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList>
          <TabsTrigger value="jobs">Job Postings</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="offers">Offers</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Job Postings</CardTitle>
              <CardDescription>Manage all job listings and requirements</CardDescription>
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Closing Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.department}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>{job.applicationsCount}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(job.status)}>
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(job.closingDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <PermissionGate module="hr" action="update">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
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

        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Job Applications</CardTitle>
              <CardDescription>Track and manage candidate applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Next Interview</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{application.applicantName}</div>
                          <div className="text-sm text-gray-500">{application.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {mockJobs.find(job => job.id === application.jobId)?.title}
                      </TableCell>
                      <TableCell>
                        {new Date(application.appliedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStageColor(application.stage)}>
                          {application.stage}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {application.interviews.length > 0 && 
                          new Date(application.interviews[0].scheduledDate).toLocaleDateString()
                        }
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          <PermissionGate module="hr" action="update">
                            <Button variant="outline" size="sm">Update</Button>
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

        <TabsContent value="interviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Interview Schedule</CardTitle>
              <CardDescription>Manage interview appointments and feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="mx-auto h-12 w-12 mb-4" />
                <p>Interview scheduling interface</p>
                <p className="text-sm">Calendar integration and panel assignments</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Job Offers</CardTitle>
              <CardDescription>Generate and track offer letters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="mx-auto h-12 w-12 mb-4" />
                <p>Offer management interface</p>
                <p className="text-sm">Digital signing and status tracking</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecruitmentManagement;
