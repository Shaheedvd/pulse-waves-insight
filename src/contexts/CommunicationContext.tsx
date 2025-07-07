import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { useGlobal } from './GlobalContext';
import { 
  TeamsCall, 
  WhatsAppMessage, 
  CommunicationLog, 
  CommunicationContact,
  MessageTemplate,
  CommunicationSettings
} from '@/types/communication';

interface CommunicationContextType {
  // Teams Integration
  teamsCalls: TeamsCall[];
  createTeamsCall: (contact: CommunicationContact, entityType: string, entityId: string, agenda: string) => Promise<string>;
  scheduleTeamsCall: (callId: string, scheduledTime: string) => void;
  updateTeamsCall: (callId: string, updates: Partial<TeamsCall>) => void;
  completeTeamsCall: (callId: string, notes: string, duration: number) => void;

  // WhatsApp Integration
  whatsappMessages: WhatsAppMessage[];
  sendWhatsAppMessage: (contact: CommunicationContact, message: string, entityType: string, entityId: string, templateId?: string) => Promise<void>;
  sendWhatsAppTemplate: (contact: CommunicationContact, templateId: string, templateData: Record<string, string>, entityType: string, entityId: string) => Promise<void>;
  sendWhatsAppDocument: (contact: CommunicationContact, documentUrl: string, documentName: string, entityType: string, entityId: string) => Promise<void>;

  // Communication Logs
  communicationLogs: CommunicationLog[];
  addCommunicationLog: (log: Omit<CommunicationLog, 'id' | 'createdAt'>) => void;
  updateCommunicationLog: (logId: string, updates: Partial<CommunicationLog>) => void;

  // Templates
  messageTemplates: MessageTemplate[];
  addMessageTemplate: (template: Omit<MessageTemplate, 'id'>) => void;
  updateMessageTemplate: (templateId: string, updates: Partial<MessageTemplate>) => void;

  // Settings
  settings: CommunicationSettings;
  updateSettings: (updates: Partial<CommunicationSettings>) => void;

  // Automation
  triggerAutomatedMessage: (eventType: string, entityType: string, entityId: string, data: any) => void;
}

const CommunicationContext = createContext<CommunicationContextType | undefined>(undefined);

export const CommunicationProvider = ({ children }: { children: ReactNode }) => {
  console.log('CommunicationProvider rendering');
  
  const { currentUser } = useAuth();
  const { addNotification, logAction } = useGlobal();

  const [teamsCalls, setTeamsCalls] = useState<TeamsCall[]>([]);
  const [whatsappMessages, setWhatsappMessages] = useState<WhatsAppMessage[]>([]);
  const [communicationLogs, setCommunicationLogs] = useState<CommunicationLog[]>([]);
  const [messageTemplates, setMessageTemplates] = useState<MessageTemplate[]>([
    {
      id: '1',
      name: 'Invoice Reminder',
      content: 'Hi {name}, this is a friendly reminder that your invoice {invoiceNumber} is due on {dueDate}. Please let us know if you have any questions.',
      variables: ['name', 'invoiceNumber', 'dueDate'],
      category: 'reminder',
      entityType: 'invoice'
    },
    {
      id: '2',
      name: 'Work Order Assignment',
      content: 'Hi {technicianName}, you have been assigned work order {workOrderNumber} for {clientName}. Please review the details and confirm your availability.',
      variables: ['technicianName', 'workOrderNumber', 'clientName'],
      category: 'notification',
      entityType: 'work_order'
    },
    {
      id: '3',
      name: 'Leave Approval',
      content: 'Hi {employeeName}, your leave request from {startDate} to {endDate} has been {status}. {additionalNotes}',
      variables: ['employeeName', 'startDate', 'endDate', 'status', 'additionalNotes'],
      category: 'notification',
      entityType: 'leave_request'
    }
  ]);

  const [settings, setSettings] = useState<CommunicationSettings>({
    teamsIntegrationEnabled: false,
    whatsappIntegrationEnabled: false,
    autoLogCalls: true,
    autoSendNotifications: true,
    allowedDomains: [],
    messageTemplates: []
  });

  const createTeamsCall = async (
    contact: CommunicationContact, 
    entityType: string, 
    entityId: string, 
    agenda: string
  ): Promise<string> => {
    if (!currentUser) throw new Error('User not authenticated');

    const callId = Date.now().toString();
    const meetingUrl = `https://teams.microsoft.com/l/meetup-join/${callId}`;

    const newCall: TeamsCall = {
      id: callId,
      contactId: contact.id,
      contactName: contact.name,
      meetingUrl,
      status: 'scheduled',
      agenda,
      attendees: [currentUser.email, contact.email || ''],
      entityType: entityType as any,
      entityId,
      createdBy: currentUser.id,
      createdAt: new Date().toISOString()
    };

    setTeamsCalls(prev => [...prev, newCall]);
    logAction('Create Teams Call', 'communication', callId, 'teams_call', null, newCall);

    addNotification({
      userId: currentUser.id,
      title: 'Teams Call Created',
      message: `Teams call scheduled with ${contact.name}`,
      type: 'info',
      module: 'communication',
      entityId: callId
    });

    return meetingUrl;
  };

  const scheduleTeamsCall = (callId: string, scheduledTime: string) => {
    setTeamsCalls(prev => prev.map(call => 
      call.id === callId ? { ...call, scheduledTime } : call
    ));
    logAction('Schedule Teams Call', 'communication', callId, 'teams_call');
  };

  const updateTeamsCall = (callId: string, updates: Partial<TeamsCall>) => {
    setTeamsCalls(prev => prev.map(call => 
      call.id === callId ? { ...call, ...updates } : call
    ));
    logAction('Update Teams Call', 'communication', callId, 'teams_call');
  };

  const completeTeamsCall = (callId: string, notes: string, duration: number) => {
    setTeamsCalls(prev => prev.map(call => 
      call.id === callId ? { 
        ...call, 
        status: 'completed' as const,
        notes,
        duration,
        completedAt: new Date().toISOString()
      } : call
    ));

    const call = teamsCalls.find(c => c.id === callId);
    if (call) {
      addCommunicationLog({
        type: 'teams_call',
        contactId: call.contactId,
        contactName: call.contactName,
        summary: `Teams call completed - ${call.agenda}`,
        notes,
        tags: ['completed'],
        entityType: call.entityType,
        entityId: call.entityId,
        createdBy: currentUser?.id || '',
        followUpNeeded: false
      });
    }
  };

  const sendWhatsAppMessage = async (
    contact: CommunicationContact,
    message: string,
    entityType: string,
    entityId: string,
    templateId?: string
  ) => {
    if (!currentUser) throw new Error('User not authenticated');

    const messageId = Date.now().toString();
    const newMessage: WhatsAppMessage = {
      id: messageId,
      contactId: contact.id,
      contactName: contact.name,
      contactPhone: contact.phone || '',
      message,
      templateId,
      status: 'sent',
      direction: 'outbound',
      entityType: entityType as any,
      entityId,
      createdBy: currentUser.id,
      createdAt: new Date().toISOString()
    };

    setWhatsappMessages(prev => [...prev, newMessage]);
    logAction('Send WhatsApp Message', 'communication', messageId, 'whatsapp_message', null, newMessage);

    addCommunicationLog({
      type: 'whatsapp_message',
      contactId: contact.id,
      contactName: contact.name,
      summary: `WhatsApp message sent: ${message.substring(0, 50)}...`,
      notes: message,
      tags: ['sent'],
      entityType,
      entityId,
      createdBy: currentUser.id,
      followUpNeeded: false
    });
  };

  const sendWhatsAppTemplate = async (
    contact: CommunicationContact,
    templateId: string,
    templateData: Record<string, string>,
    entityType: string,
    entityId: string
  ) => {
    const template = messageTemplates.find(t => t.id === templateId);
    if (!template) throw new Error('Template not found');

    let message = template.content;
    Object.entries(templateData).forEach(([key, value]) => {
      message = message.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
    });

    await sendWhatsAppMessage(contact, message, entityType, entityId, templateId);
  };

  const sendWhatsAppDocument = async (
    contact: CommunicationContact,
    documentUrl: string,
    documentName: string,
    entityType: string,
    entityId: string
  ) => {
    const message = `Document shared: ${documentName}`;
    const messageId = Date.now().toString();
    
    const newMessage: WhatsAppMessage = {
      id: messageId,
      contactId: contact.id,
      contactName: contact.name,
      contactPhone: contact.phone || '',
      message,
      status: 'sent',
      direction: 'outbound',
      attachments: [documentUrl],
      entityType: entityType as any,
      entityId,
      createdBy: currentUser?.id || '',
      createdAt: new Date().toISOString()
    };

    setWhatsappMessages(prev => [...prev, newMessage]);
    logAction('Send WhatsApp Document', 'communication', messageId, 'whatsapp_document');
  };

  const addCommunicationLog = (log: Omit<CommunicationLog, 'id' | 'createdAt'>) => {
    const newLog: CommunicationLog = {
      ...log,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setCommunicationLogs(prev => [...prev, newLog]);
  };

  const updateCommunicationLog = (logId: string, updates: Partial<CommunicationLog>) => {
    setCommunicationLogs(prev => prev.map(log => 
      log.id === logId ? { ...log, ...updates } : log
    ));
  };

  const addMessageTemplate = (template: Omit<MessageTemplate, 'id'>) => {
    const newTemplate: MessageTemplate = {
      ...template,
      id: Date.now().toString()
    };
    setMessageTemplates(prev => [...prev, newTemplate]);
  };

  const updateMessageTemplate = (templateId: string, updates: Partial<MessageTemplate>) => {
    setMessageTemplates(prev => prev.map(template => 
      template.id === templateId ? { ...template, ...updates } : template
    ));
  };

  const updateSettings = (updates: Partial<CommunicationSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const triggerAutomatedMessage = (eventType: string, entityType: string, entityId: string, data: any) => {
    if (!settings.autoSendNotifications) return;
    console.log(`Triggering automated message for ${eventType} on ${entityType}:${entityId}`, data);
  };

  const value: CommunicationContextType = {
    teamsCalls,
    createTeamsCall,
    scheduleTeamsCall,
    updateTeamsCall,
    completeTeamsCall,
    whatsappMessages,
    sendWhatsAppMessage,
    sendWhatsAppTemplate,
    sendWhatsAppDocument,
    communicationLogs,
    addCommunicationLog,
    updateCommunicationLog,
    messageTemplates,
    addMessageTemplate,
    updateMessageTemplate,
    settings,
    updateSettings,
    triggerAutomatedMessage
  };

  return (
    <CommunicationContext.Provider value={value}>
      {children}
    </CommunicationContext.Provider>
  );
};

export const useCommunication = () => {
  const context = useContext(CommunicationContext);
  if (!context) {
    console.error('useCommunication must be used within a CommunicationProvider');
    throw new Error('useCommunication must be used within a CommunicationProvider');
  }
  return context;
};
