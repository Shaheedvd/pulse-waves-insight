import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/marketing";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Calendar } from "lucide-react";
import ProjectDetails from "./ProjectDetails";

interface ProjectGridProps {
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

const ProjectGrid: React.FC<ProjectGridProps> = ({ status, searchQuery }) => {
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Card key={project.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex space-x-2 mt-2">
                  {getStatusBadge(project.status)}
                  {getPriorityBadge(project.priority)}
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{project.description}</p>
                <div className="flex items-center text-sm mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>{project.completionPercentage}%</span>
                  </div>
                  <Progress value={project.completionPercentage} className="h-2" />
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between items-center w-full">
                  <div className="flex -space-x-2">
                    {project.assignedTo.map((person, index) => (
                      <Avatar key={index} className="border-2 border-background h-7 w-7">
                        <AvatarFallback className="text-xs">
                          {person.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleViewDetails(project)}>
                    View Details
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-3 flex justify-center items-center p-8 text-center text-muted-foreground">
            No projects match the selected filters
          </div>
        )}
      </div>
      
      <ProjectDetails 
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        project={selectedProject}
      />
    </>
  );
};

export default ProjectGrid;
