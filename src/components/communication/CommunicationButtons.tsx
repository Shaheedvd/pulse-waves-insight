
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCommunication } from '@/contexts/CommunicationContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { CommunicationContact } from '@/types/communication';
import { Video, MessageSquare, Phone, Calendar, FileText, Send } from 'lucide-react';

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

  const [showTeamsDialog, setShowTeamsDialog] = useState(false);
  const [showWhatsAppDialog, setShowWhatsAppDialog] = useState(false);
  const [teamsAgenda, setTeamsAgenda] = useState('');
  const [whatsappMessage, setWhatsappMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [templateData, setTemplateData] = useState<Record<string, string>>({});

  const handleTeamsCall = async () => {
    try {
      const agenda = teamsAgenda || `Discussion regarding ${entityName || entityType}`;
      const meetingUrl = await createTeamsCall(contact, entityType, entityId, agenda);
      
      // Open Teams meeting
      window.open(meetingUrl, '_blank');
      
      toast({
        title: 'Teams Call Created',
        description: `Meeting link created and opened for ${contact.name}`,
      });
      
      setShowTeamsDialog(false);
      setTeamsAgenda('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create Teams call',
        variant: 'destructive',
      });
    }
  };

  const handleWhatsAppMessage = async () => {
    try {
      if (selectedTemplate) {
        await sendWhatsAppTemplate(contact, selectedTemplate, templateData, entityType, entityId);
      } else {
        await sendWhatsAppMessage(contact, whatsappMessage, entityType, entityId);
      }
      
      toast({
        title: 'Message Sent',
        description: `WhatsApp message sent to ${contact.name}`,
      });
      
      setShowWhatsAppDialog(false);
      setWhatsappMessage('');
      setSelectedTemplate('');
      setTemplateData({});
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send WhatsApp message',
        variant: 'destructive',
      });
    }
  };

  const getContextualButtons = () => {
    const buttons = [];
    
    // Teams button for internal contacts or all if enabled
    if ((contact.type === 'internal' || settings.teamsIntegrationEnabled) && currentUser) {
      buttons.push(
        <Dialog key="teams" open={showTeamsDialog} onOpenChange={setShowTeamsDialog}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size={compact ? "sm" : "default"}
              className="flex items-center gap-2"
            >
              <Video className="h-4 w-4" />
              {!compact && "Teams Call"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Start Microsoft Teams Call</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Contact</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">{contact.name}</Badge>
                  <Badge variant="secondary">{contact.type}</Badge>
                </div>
              </div>
              <div>
                <Label htmlFor="agenda">Meeting Agenda</Label>
                <Textarea
                  id="agenda"
                  placeholder={`Discussion regarding ${entityName || entityType}...`}
                  value={teamsAgenda}
                  onChange={(e) => setTeamsAgenda(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowTeamsDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleTeamsCall}>
                  <Video className="h-4 w-4 mr-2" />
                  Start Call
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    }

    // WhatsApp button for external contacts or all if enabled
    if ((contact.type === 'external' || settings.whatsappIntegrationEnabled) && contact.phone) {
      buttons.push(
        <Dialog key="whatsapp" open={showWhatsAppDialog} onOpenChange={setShowWhatsAppDialog}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size={compact ? "sm" : "default"}
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              {!compact && "WhatsApp"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send WhatsApp Message</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Contact</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">{contact.name}</Badge>
                  <Badge variant="secondary">{contact.phone}</Badge>
                </div>
              </div>
              
              <div>
                <Label htmlFor="template">Message Template (Optional)</Label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template or write custom message" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Custom Message</SelectItem>
                    {messageTemplates
                      .filter(t => t.entityType === entityType || t.entityType === 'general')
                      .map(template => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedTemplate ? (
                <div className="space-y-2">
                  <Label>Template Variables</Label>
                  {messageTemplates
                    .find(t => t.id === selectedTemplate)
                    ?.variables.map(variable => (
                      <div key={variable}>
                        <Label htmlFor={variable}>{variable}</Label>
                        <Input
                          id={variable}
                          placeholder={`Enter ${variable}`}
                          value={templateData[variable] || ''}
                          onChange={(e) => setTemplateData(prev => ({
                            ...prev,
                            [variable]: e.target.value
                          }))}
                        />
                      </div>
                    ))}
                </div>
              ) : (
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message..."
                    value={whatsappMessage}
                    onChange={(e) => setWhatsappMessage(e.target.value)}
                  />
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowWhatsAppDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleWhatsAppMessage}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    }

    return buttons;
  };

  if (compact) {
    return (
      <div className="flex items-center gap-1">
        {getContextualButtons()}
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
          {getContextualButtons()}
          {getContextualButtons().length === 0 && (
            <p className="text-sm text-muted-foreground">
              No communication options available for this contact.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
