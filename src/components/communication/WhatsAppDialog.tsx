
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Send } from 'lucide-react';
import { CommunicationContact, MessageTemplate } from '@/types/communication';

interface WhatsAppDialogProps {
  contact: CommunicationContact;
  messageTemplates: MessageTemplate[];
  entityType: string;
  onSendMessage: (message: string, templateId?: string, templateData?: Record<string, string>) => Promise<void>;
  compact?: boolean;
}

export const WhatsAppDialog: React.FC<WhatsAppDialogProps> = ({
  contact,
  messageTemplates,
  entityType,
  onSendMessage,
  compact = false
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [templateData, setTemplateData] = useState<Record<string, string>>({});

  const handleSendMessage = async () => {
    if (selectedTemplate) {
      await onSendMessage('', selectedTemplate, templateData);
    } else {
      await onSendMessage(message);
    }
    
    setShowDialog(false);
    setMessage('');
    setSelectedTemplate('');
    setTemplateData({});
  };

  const relevantTemplates = messageTemplates.filter(t => 
    t.entityType === entityType || t.entityType === 'general'
  );

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
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
                {relevantTemplates.map(template => (
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
