
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { useGlobal } from './GlobalContext';
import { useCommunication } from './CommunicationContext';
import { 
  OpsTask, 
  OpsProject, 
  OpsRequest, 
  OperationalIncident, 
  ShiftSchedule, 
  SOPDocument,
  AttendanceRecord,
  TaskStatus,
  ProjectStatus,
  RequestStatus
} from '@/types/operations';

interface OperationsContextType {
  // Tasks
  opsTasks: OpsTask[];
  createOpsTask: (task: Omit<OpsTask, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateOpsTask: (taskId: string, updates: Partial<OpsTask>) => void;
  deleteOpsTask: (taskId: string) => void;

  // Projects
  projects: OpsProject[];
  createProject: (project: Omit<OpsProject, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProject: (projectId: string, updates: Partial<OpsProject>) => void;
  deleteProject: (projectId: string) => void;

  // Requests
  requests: OpsRequest[];
  createRequest: (request: Omit<OpsRequest, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateRequest: (requestId: string, updates: Partial<OpsRequest>) => void;
  approveRequest: (requestId: string, approverId: string) => void;
  rejectRequest: (requestId: string, approverId: string, reason: string) => void;

  // Incidents
  incidents: OperationalIncident[];
  createIncident: (incident: Omit<OperationalIncident, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateIncident: (incidentId: string, updates: Partial<OperationalIncident>) => void;
  escalateIncident: (incidentId: string, escalatedTo: string) => void;

  // Shifts & Attendance
  shifts: ShiftSchedule[];
  attendance: AttendanceRecord[];
  createShift: (shift: Omit<ShiftSchedule, 'id' | 'createdAt'>) => void;
  checkIn: (shiftId: string, location?: string) => void;
  checkOut: (shiftId: string, location?: string) => void;
  updateAttendance: (attendanceId: string, updates: Partial<AttendanceRecord>) => void;

  // SOPs
  sopDocuments: SOPDocument[];
  createSOP: (sop: Omit<SOPDocument, 'id' | 'createdAt'>) => void;
  updateSOP: (sopId: string, updates: Partial<SOPDocument>) => void;
  approveSOP: (sopId: string, approverId: string) => void;

  // Analytics
  getTaskCompletionRate: () => number;
  getSLACompliance: () => number;
  getDepartmentWorkload: (department: string) => number;
  getOverdueTasks: () => OpsTask[];
}

const OperationsContext = createContext<OperationsContextType | undefined>(undefined);

export const OperationsProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuth();
  const { addNotification, logAction } = useGlobal();
  const { triggerAutomatedMessage } = useCommunication();

  const [opsTasks, setOpsTasks] = useState<OpsTask[]>([]);
  const [projects, setProjects] = useState<OpsProject[]>([]);
  const [requests, setRequests] = useState<OpsRequest[]>([]);
  const [incidents, setIncidents] = useState<OperationalIncident[]>([]);
  const [shifts, setShifts] = useState<ShiftSchedule[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [sopDocuments, setSOPDocuments] = useState<SOPDocument[]>([]);

  // Task Management
  const createOpsTask = (task: Omit<OpsTask, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!currentUser) return;

    const newTask: OpsTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setOpsTasks(prev => [...prev, newTask]);
    logAction('Create Operations Task', 'operations', newTask.id, 'ops_task', null, newTask);

    // Trigger WhatsApp notification to assignee
    triggerAutomatedMessage('task_assigned', 'ops_task', newTask.id, {
      assigneeName: newTask.assignedToName,
      taskTitle: newTask.title,
      dueDate: newTask.dueDate
    });

    addNotification({
      userId: newTask.assignedTo,
      title: 'New Task Assigned',
      message: `You have been assigned: ${newTask.title}`,
      type: 'info',
      module: 'operations',
      entityId: newTask.id
    });
  };

  const updateOpsTask = (taskId: string, updates: Partial<OpsTask>) => {
    setOpsTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const updatedTask = { 
          ...task, 
          ...updates, 
          updatedAt: new Date().toISOString(),
          completedAt: updates.status === 'completed' ? new Date().toISOString() : task.completedAt
        };
        
        logAction('Update Operations Task', 'operations', taskId, 'ops_task', task, updatedTask);
        
        // Notify on status change
        if (updates.status && updates.status !== task.status) {
          triggerAutomatedMessage('task_status_changed', 'ops_task', taskId, {
            taskTitle: task.title,
            oldStatus: task.status,
            newStatus: updates.status
          });
        }
        
        return updatedTask;
      }
      return task;
    }));
  };

  const deleteOpsTask = (taskId: string) => {
    setOpsTasks(prev => prev.filter(task => task.id !== taskId));
    logAction('Delete Operations Task', 'operations', taskId, 'ops_task');
  };

  // Project Management
  const createProject = (project: Omit<OpsProject, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!currentUser) return;

    const newProject: OpsProject = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setProjects(prev => [...prev, newProject]);
    logAction('Create Project', 'operations', newProject.id, 'project', null, newProject);
  };

  const updateProject = (projectId: string, updates: Partial<OpsProject>) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, ...updates, updatedAt: new Date().toISOString() }
        : project
    ));
    logAction('Update Project', 'operations', projectId, 'project');
  };

  const deleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
    logAction('Delete Project', 'operations', projectId, 'project');
  };

  // Request Management
  const createRequest = (request: Omit<OpsRequest, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!currentUser) return;

    const newRequest: OpsRequest = {
      ...request,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setRequests(prev => [...prev, newRequest]);
    logAction('Create Operations Request', 'operations', newRequest.id, 'ops_request', null, newRequest);

    // Send WhatsApp confirmation
    triggerAutomatedMessage('request_submitted', 'ops_request', newRequest.id, {
      requesterName: newRequest.requestedByName,
      requestTitle: newRequest.title,
      requestType: newRequest.type
    });
  };

  const updateRequest = (requestId: string, updates: Partial<OpsRequest>) => {
    setRequests(prev => prev.map(request => 
      request.id === requestId 
        ? { ...request, ...updates, updatedAt: new Date().toISOString() }
        : request
    ));
  };

  const approveRequest = (requestId: string, approverId: string) => {
    updateRequest(requestId, { 
      status: 'in-progress', 
      approver: approverId 
    });
    logAction('Approve Request', 'operations', requestId, 'ops_request');
  };

  const rejectRequest = (requestId: string, approverId: string, reason: string) => {
    updateRequest(requestId, { 
      status: 'rejected', 
      approver: approverId 
    });
    logAction('Reject Request', 'operations', requestId, 'ops_request', null, { reason });
  };

  // Incident Management
  const createIncident = (incident: Omit<OperationalIncident, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!currentUser) return;

    const newIncident: OperationalIncident = {
      ...incident,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setIncidents(prev => [...prev, newIncident]);
    logAction('Create Incident', 'operations', newIncident.id, 'incident', null, newIncident);

    // Auto-escalate critical incidents
    if (newIncident.severity === 'critical') {
      triggerAutomatedMessage('critical_incident', 'incident', newIncident.id, {
        incidentTitle: newIncident.title,
        reportedBy: newIncident.reportedByName,
        severity: newIncident.severity
      });
    }
  };

  const updateIncident = (incidentId: string, updates: Partial<OperationalIncident>) => {
    setIncidents(prev => prev.map(incident => 
      incident.id === incidentId 
        ? { ...incident, ...updates, updatedAt: new Date().toISOString() }
        : incident
    ));
  };

  const escalateIncident = (incidentId: string, escalatedTo: string) => {
    updateIncident(incidentId, { 
      escalated: true, 
      escalatedTo 
    });
    logAction('Escalate Incident', 'operations', incidentId, 'incident');
  };

  // Shift & Attendance Management
  const createShift = (shift: Omit<ShiftSchedule, 'id' | 'createdAt'>) => {
    if (!currentUser) return;

    const newShift: ShiftSchedule = {
      ...shift,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    setShifts(prev => [...prev, newShift]);
  };

  const checkIn = (shiftId: string, location?: string) => {
    setShifts(prev => prev.map(shift => 
      shift.id === shiftId 
        ? { 
            ...shift, 
            status: 'checked-in' as const,
            checkInTime: new Date().toISOString(),
            checkInLocation: location
          }
        : shift
    ));
  };

  const checkOut = (shiftId: string, location?: string) => {
    setShifts(prev => prev.map(shift => 
      shift.id === shiftId 
        ? { 
            ...shift, 
            status: 'checked-out' as const,
            checkOutTime: new Date().toISOString(),
            checkOutLocation: location
          }
        : shift
    ));
  };

  const updateAttendance = (attendanceId: string, updates: Partial<AttendanceRecord>) => {
    setAttendance(prev => prev.map(record => 
      record.id === attendanceId ? { ...record, ...updates } : record
    ));
  };

  // SOP Management
  const createSOP = (sop: Omit<SOPDocument, 'id' | 'createdAt'>) => {
    if (!currentUser) return;

    const newSOP: SOPDocument = {
      ...sop,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    setSOPDocuments(prev => [...prev, newSOP]);
    logAction('Create SOP Document', 'operations', newSOP.id, 'sop_document', null, newSOP);
  };

  const updateSOP = (sopId: string, updates: Partial<SOPDocument>) => {
    setSOPDocuments(prev => prev.map(sop => 
      sop.id === sopId 
        ? { ...sop, ...updates, updatedAt: new Date().toISOString() }
        : sop
    ));
  };

  const approveSOP = (sopId: string, approverId: string) => {
    updateSOP(sopId, { 
      status: 'approved',
      approvedBy: approverId,
      approvedAt: new Date().toISOString()
    });
    logAction('Approve SOP Document', 'operations', sopId, 'sop_document');
  };

  // Analytics Functions
  const getTaskCompletionRate = (): number => {
    if (opsTasks.length === 0) return 0;
    const completed = opsTasks.filter(task => task.status === 'completed').length;
    return Math.round((completed / opsTasks.length) * 100);
  };

  const getSLACompliance = (): number => {
    if (opsTasks.length === 0) return 100;
    const onTime = opsTasks.filter(task => 
      task.status === 'completed' && 
      (!task.completedAt || new Date(task.completedAt) <= new Date(task.dueDate))
    ).length;
    return Math.round((onTime / opsTasks.length) * 100);
  };

  const getDepartmentWorkload = (department: string): number => {
    return opsTasks.filter(task => 
      task.department === department && 
      ['not-started', 'in-progress'].includes(task.status)
    ).length;
  };

  const getOverdueTasks = (): OpsTask[] => {
    return opsTasks.filter(task => 
      new Date(task.dueDate) < new Date() && 
      task.status !== 'completed'
    );
  };

  const value: OperationsContextType = {
    opsTasks,
    createOpsTask,
    updateOpsTask,
    deleteOpsTask,
    projects,
    createProject,
    updateProject,
    deleteProject,
    requests,
    createRequest,
    updateRequest,
    approveRequest,
    rejectRequest,
    incidents,
    createIncident,
    updateIncident,
    escalateIncident,
    shifts,
    attendance,
    createShift,
    checkIn,
    checkOut,
    updateAttendance,
    sopDocuments,
    createSOP,
    updateSOP,
    approveSOP,
    getTaskCompletionRate,
    getSLACompliance,
    getDepartmentWorkload,
    getOverdueTasks
  };

  return (
    <OperationsContext.Provider value={value}>
      {children}
    </OperationsContext.Provider>
  );
};

export const useOperations = () => {
  const context = useContext(OperationsContext);
  if (!context) {
    throw new Error('useOperations must be used within an OperationsProvider');
  }
  return context;
};
