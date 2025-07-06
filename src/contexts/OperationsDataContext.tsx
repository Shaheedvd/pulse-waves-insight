
import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/use-toast';

export interface OpsTask {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  assignee: string;
  department: string;
  dueDate: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
  progress: number;
  startDate: string;
  endDate: string;
  manager: string;
  team: string[];
  budget: number;
}

export interface Request {
  id: string;
  title: string;
  description: string;
  type: 'maintenance' | 'hr' | 'it' | 'finance' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'submitted' | 'reviewing' | 'approved' | 'rejected' | 'completed';
  requester: string;
  assignee?: string;
  createdAt: string;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  reporter: string;
  assignee?: string;
  category: 'technical' | 'security' | 'safety' | 'operational';
  createdAt: string;
  resolvedAt?: string;
}

interface OperationsDataContextType {
  // Tasks
  opsTasks: OpsTask[];
  addOpsTask: (task: Omit<OpsTask, 'id' | 'createdAt'>) => void;
  updateOpsTask: (id: string, updates: Partial<OpsTask>) => void;
  deleteOpsTask: (id: string) => void;
  
  // Projects
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  // Requests
  requests: Request[];
  addRequest: (request: Omit<Request, 'id' | 'createdAt'>) => void;
  updateRequest: (id: string, updates: Partial<Request>) => void;
  deleteRequest: (id: string) => void;
  
  // Incidents
  incidents: Incident[];
  addIncident: (incident: Omit<Incident, 'id' | 'createdAt'>) => void;
  updateIncident: (id: string, updates: Partial<Incident>) => void;
  deleteIncident: (id: string) => void;
}

const OperationsDataContext = createContext<OperationsDataContextType | undefined>(undefined);

export const OperationsDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [opsTasks, setOpsTasks] = useLocalStorage<OpsTask[]>('opsTasks', []);
  const [projects, setProjects] = useLocalStorage<Project[]>('projects', []);
  const [requests, setRequests] = useLocalStorage<Request[]>('requests', []);
  const [incidents, setIncidents] = useLocalStorage<Incident[]>('incidents', []);
  const { toast } = useToast();

  // Task operations
  const addOpsTask = (taskData: Omit<OpsTask, 'id' | 'createdAt'>) => {
    const newTask: OpsTask = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setOpsTasks(prev => [...prev, newTask]);
    toast({
      title: "Task Created",
      description: `${newTask.title} has been added to operations.`
    });
  };

  const updateOpsTask = (id: string, updates: Partial<OpsTask>) => {
    setOpsTasks(prev => prev.map(task => task.id === id ? { ...task, ...updates } : task));
    toast({
      title: "Task Updated",
      description: "Task has been updated successfully."
    });
  };

  const deleteOpsTask = (id: string) => {
    setOpsTasks(prev => prev.filter(task => task.id !== id));
    toast({
      title: "Task Deleted",
      description: "Task has been removed from operations."
    });
  };

  // Project operations
  const addProject = (projectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString()
    };
    setProjects(prev => [...prev, newProject]);
    toast({
      title: "Project Created",
      description: `${newProject.name} has been added to the project portfolio.`
    });
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project => project.id === id ? { ...project, ...updates } : project));
    toast({
      title: "Project Updated",
      description: "Project has been updated successfully."
    });
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
    toast({
      title: "Project Deleted",
      description: "Project has been removed from the portfolio."
    });
  };

  // Request operations
  const addRequest = (requestData: Omit<Request, 'id' | 'createdAt'>) => {
    const newRequest: Request = {
      ...requestData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setRequests(prev => [...prev, newRequest]);
    toast({
      title: "Request Submitted",
      description: `${newRequest.title} has been submitted for review.`
    });
  };

  const updateRequest = (id: string, updates: Partial<Request>) => {
    setRequests(prev => prev.map(request => request.id === id ? { ...request, ...updates } : request));
    toast({
      title: "Request Updated",
      description: "Request has been updated successfully."
    });
  };

  const deleteRequest = (id: string) => {
    setRequests(prev => prev.filter(request => request.id !== id));
    toast({
      title: "Request Deleted",
      description: "Request has been removed."
    });
  };

  // Incident operations
  const addIncident = (incidentData: Omit<Incident, 'id' | 'createdAt'>) => {
    const newIncident: Incident = {
      ...incidentData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setIncidents(prev => [...prev, newIncident]);
    toast({
      title: "Incident Reported",
      description: `${newIncident.title} has been logged and will be investigated.`
    });
  };

  const updateIncident = (id: string, updates: Partial<Incident>) => {
    setIncidents(prev => prev.map(incident => 
      incident.id === id 
        ? { 
            ...incident, 
            ...updates,
            resolvedAt: updates.status === 'resolved' ? new Date().toISOString() : incident.resolvedAt
          } 
        : incident
    ));
    toast({
      title: "Incident Updated",
      description: "Incident has been updated successfully."
    });
  };

  const deleteIncident = (id: string) => {
    setIncidents(prev => prev.filter(incident => incident.id !== id));
    toast({
      title: "Incident Deleted",
      description: "Incident has been removed from the log."
    });
  };

  return (
    <OperationsDataContext.Provider value={{
      opsTasks,
      addOpsTask,
      updateOpsTask,
      deleteOpsTask,
      projects,
      addProject,
      updateProject,
      deleteProject,
      requests,
      addRequest,
      updateRequest,
      deleteRequest,
      incidents,
      addIncident,
      updateIncident,
      deleteIncident
    }}>
      {children}
    </OperationsDataContext.Provider>
  );
};

export const useOperationsData = () => {
  const context = useContext(OperationsDataContext);
  if (!context) {
    throw new Error('useOperationsData must be used within an OperationsDataProvider');
  }
  return context;
};
