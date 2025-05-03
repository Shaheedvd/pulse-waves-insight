import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Edit, Eye, Trash } from "lucide-react";
import { Project } from "@/types/marketing";
import { Progress } from "@/components/ui/progress";
import ProjectDetails from "./ProjectDetails";

interface ProjectListProps {
  status: Project["status"][];
  searchQuery: string;
}

// Sample projects data
const sampleProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of company website with new branding and improved UX",
    status: "in-progress",
    priority: "high",
    dueDate: "2025-06-15",
    assignedTo: ["Jane Smith", "John Doe"],
    completionPercentage: 45,
    tasks: [],
    createdBy: "Admin User",
    createdAt: "2025-04-10",
  },
  {
    id: "2",
    name: "Q2 Marketing Campaign",
    description: "Plan and execute digital marketing campaign for Q2 2025",
    status: "not-started",
    priority: "medium",
    dueDate: "2025-07-01",
    assignedTo: ["Mike Brown", "Sarah Johnson"],
    completionPercentage: 0,
    tasks: [],
    createdBy: "Marketing Manager",
    createdAt: "2025-04-15",
  },
  {
    id: "3",
    name: "Client Satisfaction Survey",
    description: "Annual survey to gather feedback from existing clients",
    status: "completed",
    priority: "medium",
    dueDate: "2025-05-01",
    assignedTo: ["Lisa Park"],
    completionPercentage: 100,
    tasks: [],
    createdBy: "Customer Success Manager",
    createdAt: "2025-04-01",
  },
  {
    id: "4",
    name: "Staff Training Program",
    description: "Develop comprehensive training materials for new evaluators",
    status: "on-hold",
    priority: "low",
    dueDate: "2025-08-15",
    assignedTo: ["Alex Green", "Jane Smith"],
    completionPercentage: 25,
    tasks: [],
    createdBy: "HR Manager",
    createdAt: "2025-03-20",
  },
];

const ProjectList: React.FC<ProjectListProps> = ({ status, searchQuery }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Filter projects by status and search query
  const filteredProjects = sampleProjects.filter(project => 
    status.includes(project.status) && 
    (searchQuery === "" || 
     project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     project.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusBadge = (status: Project["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "not-started":
        return <Badge className="bg-gray-100 text-gray-800">Not Started</Badge>;
      case "on-hold":
        return <Badge className="bg-yellow-100 text-yellow-800">On Hold</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: Project["priority"]) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case "medium":
        return <Badge className="bg-orange-100 text-orange-800">Medium</Badge>;
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsDetailsOpen(true);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project Name</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="hidden md:table-cell">Due Date</TableHead>
            <TableHead className="hidden lg:table-cell">Progress</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell className="hidden md:table-cell max-w-xs truncate">
                  {project.description}
                </TableCell>
                <TableCell>{getStatusBadge(project.status)}</TableCell>
                <TableCell>{getPriorityBadge(project.priority)}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(project.dueDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="flex items-center gap-2">
                    <Progress value={project.completionPercentage} className="h-2 w-24" />
                    <span className="text-xs">{project.completionPercentage}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex -space-x-2">
                    {project.assignedTo.map((person, index) => (
                      <Avatar key={index} className="border-2 border-background h-7 w-7">
                        <AvatarFallback className="text-xs">
                          {person.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleViewDetails(project)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No projects match the selected filters
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ProjectDetails 
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        project={selectedProject}
      />
    </>
  );
};

export default ProjectList;
