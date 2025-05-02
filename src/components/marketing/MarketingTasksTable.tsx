
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MarketingTask } from "@/types/marketing";
import MarketingTaskForm from "./MarketingTaskForm";
import { useToast } from "@/hooks/use-toast";

// Sample data
const sampleTasks: { [key: string]: MarketingTask[] } = {
  "Digital Marketing": [
    {
      id: "1",
      category: "Digital Marketing",
      subcategory: "SEO",
      title: "Keyword Research",
      description: "Conduct keyword research to identify relevant search terms for our services. Use tools like SEMrush or Ahrefs. Record the list of primary and secondary keywords.",
      trackingMethod: "Document with keyword list and search volume data",
      assignedTo: "Jane Smith",
      dueDate: "2025-05-15",
      status: "in-progress"
    },
    {
      id: "2",
      category: "Digital Marketing",
      subcategory: "SEO",
      title: "Content Optimization",
      description: "Optimize existing website pages for target keywords. Track changes made and before/after SEO metrics.",
      trackingMethod: "List of optimized pages, changes made, and any metric changes",
      assignedTo: "John Doe",
      dueDate: "2025-05-20",
      status: "pending"
    }
  ],
  "Content Marketing": [
    {
      id: "3",
      category: "Content Marketing",
      subcategory: "Blog Posts",
      title: "Blog Post Creation",
      description: "Write a blog post on customer experience improvements. Follow the content calendar and SEO guidelines.",
      trackingMethod: "Link to published blog post, date of publication",
      assignedTo: "Sarah Johnson",
      dueDate: "2025-05-10",
      status: "completed",
      completionDate: "2025-05-07"
    }
  ],
  "Social Media Marketing": [
    {
      id: "4",
      category: "Social Media Marketing",
      subcategory: "LinkedIn",
      title: "LinkedIn Engagement",
      description: "Share relevant industry articles on LinkedIn and engage in discussions. Track the number of interactions.",
      trackingMethod: "List of posts shared, engagement metrics",
      assignedTo: "Mike Brown",
      dueDate: "2025-05-08",
      status: "overdue"
    }
  ],
  "Direct Sales & Business Development": [
    {
      id: "5",
      category: "Direct Sales & Business Development",
      subcategory: "Targeted Outreach",
      title: "Prospect List Creation",
      description: "Research and compile a list of potential clients in the retail sector. Include contact information for key decision-makers.",
      trackingMethod: "Document with prospect list",
      assignedTo: "Alex Green",
      dueDate: "2025-05-25",
      status: "pending"
    }
  ],
  "Marketing Tools & Technology": [
    {
      id: "6",
      category: "Marketing Tools & Technology",
      subcategory: "CRM Management",
      title: "CRM Data Entry",
      description: "Update CRM with new leads and client interactions. Ensure data accuracy and completeness.",
      trackingMethod: "Number of records updated/added",
      assignedTo: "Lisa Park",
      dueDate: "2025-05-12",
      status: "in-progress"
    }
  ]
};

interface MarketingTasksTableProps {
  category: string;
  canEdit: boolean;
}

const MarketingTasksTable: React.FC<MarketingTasksTableProps> = ({ 
  category,
  canEdit
}) => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<MarketingTask[]>(sampleTasks[category] || []);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<MarketingTask | null>(null);

  const getStatusBadge = (status: MarketingTask["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "pending":
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>;
      case "overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleEdit = (task: MarketingTask) => {
    setCurrentTask(task);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast({
      title: "Task Deleted",
      description: "Marketing task has been deleted successfully"
    });
  };

  const handleTaskUpdate = (updatedTask: MarketingTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setIsEditModalOpen(false);
    toast({
      title: "Task Updated",
      description: "Marketing task has been updated successfully"
    });
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Subcategory</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead className="hidden md:table-cell">Due Date</TableHead>
            <TableHead>Status</TableHead>
            {canEdit && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.subcategory}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell className="hidden md:table-cell max-w-xs truncate">
                  {task.description}
                </TableCell>
                <TableCell>{task.assignedTo || "Unassigned"}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date"}
                </TableCell>
                <TableCell>{getStatusBadge(task.status)}</TableCell>
                {canEdit && (
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(task)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(task.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={canEdit ? 7 : 6} className="h-24 text-center">
                No tasks found for {category}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Edit Task Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Marketing Task</DialogTitle>
          </DialogHeader>
          {currentTask && (
            <MarketingTaskForm 
              task={currentTask}
              onClose={() => setIsEditModalOpen(false)}
              onSuccess={handleTaskUpdate}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MarketingTasksTable;
