
export interface CommunicationContact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  type: 'internal' | 'external';
  department?: string;
  role?: string;
}

export interface TeamsCall {
  id: string;
  contactId: string;
  contactName: string;
  meetingUrl: string;
  scheduledTime?: string;
  duration?: number;
  attendees: string[];
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  agenda: string;
  notes?: string;
  recordingUrl?: string;
  transcriptUrl?: string;
  entityType: 'lead' | 'client' | 'employee' | 'technician' | 'campaign';
  entityId: string;
  createdBy: string;
  createdAt: string;
  completedAt?: string;
}

export interface WhatsAppMessage {
  id: string;
  contactId: string;
  contactName: string;
  contactPhone: string;
  message: string;
  templateId?: string;
  templateData?: Record<string, string>;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  direction: 'outbound' | 'inbound';
  attachments?: string[];
  entityType: 'lead' | 'client' | 'employee' | 'technician' | 'campaign';
  entityId: string;
  createdBy: string;
  createdAt: string;
  deliveredAt?: string;
  readAt?: string;
}

export interface CommunicationLog {
  id: string;
  type: 'teams_call' | 'whatsapp_message';
  contactId: string;
  contactName: string;
  summary: string;
  notes?: string;
  tags: string[];
  entityType: string;
  entityId: string;
  createdBy: string;
  createdAt: string;
  followUpNeeded: boolean;
  followUpDate?: string;
}

export interface MessageTemplate {
  id: string;
  name: string;
  content: string;
  variables: string[];
  category: 'reminder' | 'notification' | 'follow_up' | 'alert';
  entityType: string;
}

export interface CommunicationSettings {
  teamsIntegrationEnabled: boolean;
  whatsappIntegrationEnabled: boolean;
  autoLogCalls: boolean;
  autoSendNotifications: boolean;
  allowedDomains: string[];
  messageTemplates: MessageTemplate[];
}
