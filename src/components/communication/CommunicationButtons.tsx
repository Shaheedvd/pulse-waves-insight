
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCommunication } from '@/contexts/CommunicationContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { CommunicationContact } from '@/types/communication';
import { TeamsCallDialog } from './TeamsCallDialog';
import { WhatsAppDialog } from './WhatsAppDialog';

interface CommunicationButtonsProps {
  contact: CommunicationContact;
  entityType: 'lead' | 'client' | 'employee' | 'technician' | 'campaign';
  entityId: string;
  entityName?: string;
  compact?: boolean;
}

export const CommunicationButtons: React.FC<CommunicationButtonsProps> = ({
  contact,
  entityType,
  entityId,
  entityName,
  compact = false
}) => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const { 
    createTeamsCall, 
    sendWhatsAppMessage, 
    sendWhatsAppTemplate, 
    messageTemplates,
    settings 
  } = useCommunication();

  const handleTeamsCall = async (agenda: string) => {
    try {
      const meetingUrl = await createTeamsCall(contact, entityType, entityId, agenda);
      window.open(meetingUrl, '_blank');
      
      toast({
        title: 'Teams Call Created',
        description: `Meeting link created and opened for ${contact.name}`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create Teams call',
        variant: 'destructive',
      });
    }
  };

  const handleWhatsAppMessage = async (message: string, templateId?: string, templateData?: Record<string, string>) => {
    try {
      if (templateId && templateData) {
        await sendWhatsAppTemplate(contact, templateId, templateData, entityType, entityId);
      } else {
        await sendWhatsAppMessage(contact, message, entityType, entityId, templateId);
      }
      
      toast({
        title: 'Message Sent',
        description: `WhatsApp message sent to ${contact.name}`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send WhatsApp message',
        variant: 'destructive',
      });
    }
  };

  const showTeamsButton = (contact.type === 'internal' || settings.teamsIntegrationEnabled) && currentUser;
  const showWhatsAppButton = (contact.type === 'external' || settings.whatsappIntegrationEnabled) && contact.phone;

  const buttons = [];
  
  if (showTeamsButton) {
    buttons.push(
      <TeamsCallDialog
        key="teams"
        contact={contact}
        entityName={entityName}
        entityType={entityType}
        onCreateCall={handleTeamsCall}
        compact={compact}
      />
    );
  }

  if (showWhatsAppButton) {
    buttons.push(
      <WhatsAppDialog
        key="whatsapp"
        contact={contact}
        messageTemplates={messageTemplates}
        entityType={entityType}
        onSendMessage={handleWhatsAppMessage}
        compact={compact}
      />
    );
  }

  if (compact) {
    return (
      <div className="flex items-center gap-1">
        {buttons}
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-sm">Communication Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {buttons.length > 0 ? buttons : (
            <p className="text-sm text-muted-foreground">
              No communication options available for this contact.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
