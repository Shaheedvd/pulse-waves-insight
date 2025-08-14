
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth, Department } from "./AuthContext";

export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type TaskStatus = "pending" | "in-progress" | "review" | "completed" | "cancelled";

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  assignedTo: string;
  department: Department;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  tags: string[];
  activityLog?: TaskActivity[];
}

export interface TaskActivity {
  id: string;
  taskId: string;
  employeeId: string;
  employeeName: string;
  activity: string;
  notes: string;
  timestamp: string;
  type: "comment" | "status_change" | "assignment" | "priority_change";
}

interface TaskContextType {
  tasks: TaskItem[];
  userTasks: TaskItem[];
  departmentTasks: TaskItem[];
  addTask: (task: Omit<TaskItem, "id" | "createdAt" | "updatedAt">) => void;
  updateTask: (id: string, updates: Partial<Omit<TaskItem, "id" | "createdAt" | "updatedAt">>) => void;
  deleteTask: (id: string) => void;
  getTaskById: (id: string) => TaskItem | undefined;
  filterTasks: (filters: Partial<{
    status: TaskStatus[],
    priority: TaskPriority[],
    department: Department[],
    assignedTo: string[],
  }>) => TaskItem[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Sample initial tasks
const initialTasks: TaskItem[] = [
  {
    id: "1",
    title: "Review Q2 Financial Report",
    description: "Complete analysis of Q2 financial performance and prepare summary for board meeting",
    status: "in-progress",
    priority: "high",
    dueDate: "2025-06-10",
    assignedTo: "7", // Fiona Finance (ID from AuthContext)
    department: "finance",
    createdBy: "1", // Shaheed (ID from AuthContext)
    createdAt: "2025-05-01T10:00:00Z",
    updatedAt: "2025-05-01T10:00:00Z",
    tags: ["financial", "quarterly", "report"],
  },
  {
    id: "2",
    title: "Update Marketing Dashboard KPIs",
    description: "Add new campaign metrics to the marketing dashboard and reconfigure visualizations",
    status: "pending",
    priority: "medium",
    dueDate: "2025-05-15",
    assignedTo: "3", // Sarah Manager (ID from AuthContext)
    department: "marketing",
    createdBy: "1", // Shaheed (ID from AuthContext)
    createdAt: "2025-05-02T09:00:00Z",
    updatedAt: "2025-05-02T09:00:00Z",
    tags: ["marketing", "dashboard", "kpi"],
  },
  {
    id: "3",
    title: "Process Monthly Payroll",
    description: "Finalize and process payroll for all employees for the current month",
    status: "pending",
    priority: "urgent",
    dueDate: "2025-05-28",
    assignedTo: "9", // Paula Payroll (ID from AuthContext)
    department: "finance",
    createdBy: "7", // Fiona Finance (ID from AuthContext)
    createdAt: "2025-05-03T14:00:00Z",
    updatedAt: "2025-05-03T14:00:00Z",
    tags: ["payroll", "monthly", "finance"],
  },
  {
    id: "4",
    title: "Onboard New Client - XYZ Corp",
    description: "Complete onboarding process for new enterprise client including account setup and welcome meeting",
    status: "in-progress",
    priority: "high",
    dueDate: "2025-05-12",
    assignedTo: "11", // Rachel Recruiter (ID from AuthContext)
    department: "hr",
    createdBy: "10", // Helen HR (ID from AuthContext)
    createdAt: "2025-05-01T11:30:00Z",
    updatedAt: "2025-05-01T11:30:00Z",
    tags: ["onboarding", "client", "enterprise"],
  },
  {
    id: "5",
    title: "Resolve Server Downtime Issue",
    description: "Investigate and fix recurring server downtime affecting production environment",
    status: "in-progress",
    priority: "urgent",
    dueDate: "2025-05-05",
    assignedTo: "18", // Samantha SysAdmin (ID from AuthContext)
    department: "it",
    createdBy: "17", // Ian IT (ID from AuthContext)
    createdAt: "2025-05-04T08:15:00Z",
    updatedAt: "2025-05-04T08:15:00Z",
    tags: ["server", "downtime", "urgent", "it"],
  },
];

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const { currentUser } = useAuth();

  // Tasks assigned to current user
  const userTasks = tasks.filter(task => currentUser && task.assignedTo === currentUser.id);
  
  // Tasks for current user's department
  const departmentTasks = tasks.filter(task => 
    currentUser && currentUser.department && task.department === currentUser.department
  );

  const addTask = (task: Omit<TaskItem, "id" | "createdAt" | "updatedAt">) => {
    if (!currentUser) return;
    
    const now = new Date().toISOString();
    const newTask: TaskItem = {
      ...task,
      id: Date.now().toString(),
      createdBy: currentUser.id,
      createdAt: now,
      updatedAt: now,
    };
    
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Omit<TaskItem, "id" | "createdAt" | "updatedAt">>) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        // If status is being updated to completed, add completedAt timestamp
        const completedAt = updates.status === "completed" && task.status !== "completed" 
          ? new Date().toISOString() 
          : task.completedAt;
          
        return { 
          ...task, 
          ...updates, 
          updatedAt: new Date().toISOString(),
          completedAt
        };
      }
      return task;
    }));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const getTaskById = (id: string) => {
    return tasks.find(task => task.id === id);
  };

  const filterTasks = (filters: Partial<{
    status: TaskStatus[],
    priority: TaskPriority[],
    department: Department[],
    assignedTo: string[],
  }>) => {
    return tasks.filter(task => {
      // Check each filter criterion
      if (filters.status?.length && !filters.status.includes(task.status)) {
        return false;
      }
      if (filters.priority?.length && !filters.priority.includes(task.priority)) {
        return false;
      }
      if (filters.department?.length && !filters.department.includes(task.department)) {
        return false;
      }
      if (filters.assignedTo?.length && !filters.assignedTo.includes(task.assignedTo)) {
        return false;
      }
      
      return true;
    });
  };

  const value = {
    tasks,
    userTasks,
    departmentTasks,
    addTask,
    updateTask,
    deleteTask,
    getTaskById,
    filterTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};
