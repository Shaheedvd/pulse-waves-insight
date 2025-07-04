
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Video } from 'lucide-react';
import { CommunicationContact } from '@/types/communication';

interface TeamsCallDialogProps {
  contact: CommunicationContact;
  entityName?: string;
  entityType: string;
  onCreateCall: (agenda: string) => Promise<void>;
  compact?: boolean;
}

export const TeamsCallDialog: React.FC<TeamsCallDialogProps> = ({
  contact,
  entityName,
  entityType,
  onCreateCall,
  compact = false
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [agenda, setAgenda] = useState('');

  const handleCreateCall = async () => {
    const callAgenda = agenda || `Discussion regarding ${entityName || entityType}`;
    await onCreateCall(callAgenda);
    setShowDialog(false);
    setAgenda('');
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
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
              value={agenda}
              onChange={(e) => setAgenda(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateCall}>
              <Video className="h-4 w-4 mr-2" />
              Start Call
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
