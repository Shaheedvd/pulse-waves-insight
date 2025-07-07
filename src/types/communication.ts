
export interface CommunicationContact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  type: 'internal' | 'external';
}

export interface TeamsCall {
  id: string;
  contactId: string;
  contactName: string;
  meetingUrl: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  agenda: string;
  attendees: string[];
  scheduledTime?: string;
  duration?: number;
  notes?: string;
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
  status: 'sent' | 'delivered' | 'read' | 'failed';
  direction: 'inbound' | 'outbound';
  attachments?: string[];
  entityType: 'lead' | 'client' | 'employee' | 'technician' | 'campaign';
  entityId: string;
  createdBy: string;
  createdAt: string;
}

export interface CommunicationLog {
  id: string;
  type: 'teams_call' | 'whatsapp_message' | 'email' | 'phone_call';
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
  category: 'reminder' | 'notification' | 'update' | 'greeting';
  entityType: string;
}

export interface CommunicationSettings {
  teamsIntegrationEnabled: boolean;
  whatsappIntegrationEnabled: boolean;
  autoLogCalls: boolean;
  autoSendNotifications: boolean;
  allowedDomains: string[];
  messageTemplates: string[];
}
