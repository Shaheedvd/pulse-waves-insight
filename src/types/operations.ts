
import { Department } from "@/contexts/AuthContext";

export type TaskPriority = "low" | "medium" | "high" | "critical";
export type TaskStatus = "not-started" | "in-progress" | "blocked" | "review" | "completed" | "cancelled";
export type ProjectStatus = "planning" | "active" | "on-hold" | "completed" | "cancelled";
export type RequestStatus = "submitted" | "assigned" | "in-progress" | "completed" | "rejected";
export type IncidentSeverity = "low" | "medium" | "high" | "critical";
export type RequestType = "hr-ops" | "finance-ops" | "maintenance-ops" | "general-ops";

export interface OpsTask {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedToName: string;
  department: Department;
  linkedModule?: string;
  linkedEntityId?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  timeTracked?: number; // minutes
  subtasks?: string[];
  attachments?: string[];
  tags: string[];
  projectId?: string;
  estimatedHours?: number;
  actualHours?: number;
}

export interface OpsProject {
  id: string;
  name: string;
  description: string;
  owner: string;
  ownerName: string;
  department: Department;
  status: ProjectStatus;
  priority: TaskPriority;
  startDate: string;
  endDate: string;
  progress: number; // 0-100
  budget?: number;
  actualCost?: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  milestones: ProjectMilestone[];
  tasks: string[]; // Task IDs
  risks: string[];
  communicationLog: CommunicationEntry[];
  tags: string[];
}

export interface ProjectMilestone {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  completed: boolean;
  completedAt?: string;
}

export interface CommunicationEntry {
  id: string;
  type: "teams-call" | "whatsapp" | "email" | "note";
  summary: string;
  details?: string;
  participants?: string[];
  createdBy: string;
  createdAt: string;
  attachments?: string[];
}

export interface OpsRequest {
  id: string;
  type: RequestType;
  title: string;
  description: string;
  requestedBy: string;
  requestedByName: string;
  department: Department;
  linkedModule?: string;
  linkedEntityId?: string;
  assignedTo?: string;
  assignedToName?: string;
  approver?: string;
  approverName?: string;
  status: RequestStatus;
  priority: TaskPriority;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  attachments?: string[];
  comments: RequestComment[];
  tags: string[];
}

export interface RequestComment {
  id: string;
  author: string;
  authorName: string;
  content: string;
  createdAt: string;
  attachments?: string[];
}

export interface OperationalIncident {
  id: string;
  title: string;
  description: string;
  type: "safety" | "customer-service" | "technical" | "process" | "security";
  severity: IncidentSeverity;
  reportedBy: string;
  reportedByName: string;
  department: Department;
  location?: string;
  witnessesContacts?: string[];
  actionsTaken: string;
  resolution?: string;
  status: "open" | "investigating" | "resolved" | "closed";
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  attachments?: string[];
  followUpRequired: boolean;
  followUpDate?: string;
  escalated: boolean;
  escalatedTo?: string;
  tags: string[];
}

export interface ShiftSchedule {
  id: string;
  employeeId: string;
  employeeName: string;
  department: Department;
  location: string;
  shiftType: "morning" | "afternoon" | "night" | "split";
  startTime: string;
  endTime: string;
  date: string;
  status: "scheduled" | "checked-in" | "checked-out" | "absent" | "late";
  checkInTime?: string;
  checkOutTime?: string;
  checkInLocation?: string;
  checkOutLocation?: string;
  notes?: string;
  linkedTaskId?: string;
  linkedProjectId?: string;
  createdBy: string;
  createdAt: string;
}

export interface SOPDocument {
  id: string;
  title: string;
  description: string;
  category: string;
  department: Department;
  version: string;
  status: "draft" | "review" | "approved" | "archived";
  content: string;
  fileUrl?: string;
  accessLevel: "public" | "department" | "restricted";
  authorizedRoles: string[];
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt?: string;
  approvedBy?: string;
  approvedAt?: string;
  tags: string[];
  relatedSOPs?: string[];
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  totalHours?: number;
  overtime?: number;
  status: "present" | "absent" | "late" | "half-day" | "leave";
  location?: string;
  notes?: string;
  approvedBy?: string;
}
