
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useCommunication } from '@/contexts/CommunicationContext';
import { useAuth } from '@/contexts/AuthContext';
import { CommunicationLog as CommunicationLogType } from '@/types/communication';
import { Video, MessageSquare, Plus, Calendar, Clock, User, Tag } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface CommunicationLogProps {
  entityType: string;
  entityId: string;
  entityName?: string;
}

export const CommunicationLog: React.FC<CommunicationLogProps> = ({
  entityType,
  entityId,
  entityName
}) => {
  const { currentUser } = useAuth();
  const { 
    communicationLogs, 
    addCommunicationLog, 
    updateCommunicationLog,
    teamsCalls,
    whatsappMessages 
  } = useCommunication();

  const [showAddLog, setShowAddLog] = useState(false);
  const [logType, setLogType] = useState<'teams_call' | 'whatsapp_message'>('teams_call');
  const [logSummary, setLogSummary] = useState('');
  const [logNotes, setLogNotes] = useState('');
  const [logTags, setLogTags] = useState('');
  const [followUpNeeded, setFollowUpNeeded] = useState(false);
  const [followUpDate, setFollowUpDate] = useState('');
  const [contactName, setContactName] = useState('');

  // Filter logs for this entity
  const entityLogs = communicationLogs.filter(log => 
    log.entityType === entityType && log.entityId === entityId
  );

  // Get related calls and messages
  const entityCalls = teamsCalls.filter(call => 
    call.entityType === entityType && call.entityId === entityId
  );

  const entityMessages = whatsappMessages.filter(msg => 
    msg.entityType === entityType && msg.entityId === entityId
  );

  const handleAddLog = () => {
    if (!currentUser || !logSummary.trim()) return;

    addCommunicationLog({
      type: logType,
      contactId: 'manual',
      contactName: contactName || 'Unknown Contact',
      summary: logSummary,
      notes: logNotes,
      tags: logTags.split(',').map(tag => tag.trim()).filter(Boolean),
      entityType,
      entityId,
      createdBy: currentUser.id,
      followUpNeeded,
      followUpDate: followUpNeeded ? followUpDate : undefined
    });

    // Reset form
    setLogSummary('');
    setLogNotes('');
    setLogTags('');
    setContactName('');
    setFollowUpNeeded(false);
    setFollowUpDate('');
    setShowAddLog(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'teams_call':
        return <Video className="h-4 w-4" />;
      case 'whatsapp_message':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'teams_call':
        return 'bg-blue-100 text-blue-800';
      case 'whatsapp_message':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Communication History</CardTitle>
          <Dialog open={showAddLog} onOpenChange={setShowAddLog}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Log
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Communication Log</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="type">Communication Type</Label>
                  <Select value={logType} onValueChange={(value: any) => setLogType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="teams_call">Teams Call</SelectItem>
                      <SelectItem value="whatsapp_message">WhatsApp Message</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="contact">Contact Name</Label>
                  <Input
                    id="contact"
                    placeholder="Enter contact name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="summary">Summary *</Label>
                  <Input
                    id="summary"
                    placeholder="Brief summary of the communication"
                    value={logSummary}
                    onChange={(e) => setLogSummary(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Detailed Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Detailed notes about the communication"
                    value={logNotes}
                    onChange={(e) => setLogNotes(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    placeholder="e.g., follow-up, urgent, client-concern"
                    value={logTags}
                    onChange={(e) => setLogTags(e.target.value)}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="followup"
                    checked={followUpNeeded}
                    onCheckedChange={setFollowUpNeeded}
                  />
                  <Label htmlFor="followup">Follow-up needed</Label>
                </div>

                {followUpNeeded && (
                  <div>
                    <Label htmlFor="followupDate">Follow-up Date</Label>
                    <Input
                      id="followupDate"
                      type="date"
                      value={followUpDate}
                      onChange={(e) => setFollowUpDate(e.target.value)}
                    />
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowAddLog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddLog} disabled={!logSummary.trim()}>
                    Add Log
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Recent Calls */}
          {entityCalls.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Video className="h-4 w-4" />
                Recent Teams Calls
              </h4>
              <div className="space-y-2">
                {entityCalls.slice(0, 3).map(call => (
                  <div key={call.id} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-100 text-blue-800">
                        {call.status}
                      </Badge>
                      <span className="text-sm">{call.contactName}</span>
                      <span className="text-xs text-muted-foreground">
                        {call.agenda}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(call.createdAt), { addSuffix: true })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Messages */}
          {entityMessages.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Recent WhatsApp Messages
              </h4>
              <div className="space-y-2">
                {entityMessages.slice(0, 3).map(message => (
                  <div key={message.id} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">
                        {message.direction}
                      </Badge>
                      <span className="text-sm">{message.contactName}</span>
                      <span className="text-xs text-muted-foreground">
                        {message.message.substring(0, 50)}...
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Communication Logs */}
          <div>
            <h4 className="text-sm font-medium mb-2">Communication Logs</h4>
            {entityLogs.length === 0 ? (
              <p className="text-sm text-muted-foreground">No communication logs yet.</p>
            ) : (
              <div className="space-y-3">
                {entityLogs.map(log => (
                  <div key={log.id} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(log.type)}
                        <Badge className={getTypeColor(log.type)}>
                          {log.type.replace('_', ' ')}
                        </Badge>
                        <span className="font-medium text-sm">{log.contactName}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <p className="text-sm font-medium">{log.summary}</p>
                      {log.notes && (
                        <p className="text-sm text-muted-foreground mt-1">{log.notes}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {log.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                      {log.followUpNeeded && (
                        <Badge variant="secondary" className="text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          Follow-up {log.followUpDate ? `by ${log.followUpDate}` : 'needed'}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
