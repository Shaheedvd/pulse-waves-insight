
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCommunication } from '@/contexts/CommunicationContext';
import { useToast } from '@/hooks/use-toast';
import { MessageTemplate } from '@/types/communication';
import { Settings, Plus, Edit, Trash2, MessageSquare, Video } from 'lucide-react';

export const CommunicationSettings = () => {
  const { toast } = useToast();
  const { 
    settings, 
    updateSettings, 
    messageTemplates, 
    addMessageTemplate, 
    updateMessageTemplate 
  } = useCommunication();

  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<MessageTemplate | null>(null);
  const [templateName, setTemplateName] = useState('');
  const [templateContent, setTemplateContent] = useState('');
  const [templateCategory, setTemplateCategory] = useState<'reminder' | 'notification' | 'follow_up' | 'alert'>('notification');
  const [templateEntityType, setTemplateEntityType] = useState('general');

  const handleSaveTemplate = () => {
    if (!templateName.trim() || !templateContent.trim()) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    // Extract variables from template content
    const variables = Array.from(templateContent.matchAll(/\{(\w+)\}/g), m => m[1]);

    const templateData = {
      name: templateName,
      content: templateContent,
      variables,
      category: templateCategory,
      entityType: templateEntityType
    };

    if (editingTemplate) {
      updateMessageTemplate(editingTemplate.id, templateData);
      toast({
        title: 'Template Updated',
        description: 'Message template has been updated successfully',
      });
    } else {
      addMessageTemplate(templateData);
      toast({
        title: 'Template Created',
        description: 'New message template has been created successfully',
      });
    }

    // Reset form
    setTemplateName('');
    setTemplateContent('');
    setTemplateCategory('notification');
    setTemplateEntityType('general');
    setEditingTemplate(null);
    setShowTemplateDialog(false);
  };

  const handleEditTemplate = (template: MessageTemplate) => {
    setEditingTemplate(template);
    setTemplateName(template.name);
    setTemplateContent(template.content);
    setTemplateCategory(template.category);
    setTemplateEntityType(template.entityType);
    setShowTemplateDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Settings className="h-6 w-6" />
        <h2 className="text-2xl font-bold">Communication Settings</h2>
      </div>

      {/* Integration Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  <Label>Microsoft Teams Integration</Label>
                </div>
                <Switch
                  checked={settings.teamsIntegrationEnabled}
                  onCheckedChange={(checked) => updateSettings({ teamsIntegrationEnabled: checked })}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Enable Microsoft Teams video calls and meeting scheduling
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <Label>WhatsApp Integration</Label>
                </div>
                <Switch
                  checked={settings.whatsappIntegrationEnabled}
                  onCheckedChange={(checked) => updateSettings({ whatsappIntegrationEnabled: checked })}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Enable WhatsApp messaging and document sharing
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between">
              <Label>Auto-log communications</Label>
              <Switch
                checked={settings.autoLogCalls}
                onCheckedChange={(checked) => updateSettings({ autoLogCalls: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Auto-send notifications</Label>
              <Switch
                checked={settings.autoSendNotifications}
                onCheckedChange={(checked) => updateSettings({ autoSendNotifications: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Microsoft Graph API Key</Label>
              <Input 
                type="password" 
                placeholder="Enter your Microsoft Graph API key"
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Required for Teams integration
              </p>
            </div>
            <div>
              <Label>WhatsApp Business API Key</Label>
              <Input 
                type="password" 
                placeholder="Enter your WhatsApp Business API key"
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Required for WhatsApp integration
              </p>
            </div>
          </div>
          <Button>Save API Configuration</Button>
        </CardContent>
      </Card>

      {/* Message Templates */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Message Templates</CardTitle>
            <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Template
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingTemplate ? 'Edit Template' : 'Create New Template'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Template Name *</Label>
                      <Input
                        id="name"
                        placeholder="e.g., Invoice Reminder"
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={templateCategory} onValueChange={(value: any) => setTemplateCategory(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="reminder">Reminder</SelectItem>
                          <SelectItem value="notification">Notification</SelectItem>
                          <SelectItem value="follow_up">Follow-up</SelectItem>
                          <SelectItem value="alert">Alert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="entityType">Entity Type</Label>
                    <Select value={templateEntityType} onValueChange={setTemplateEntityType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="lead">Lead</SelectItem>
                        <SelectItem value="client">Client</SelectItem>
                        <SelectItem value="employee">Employee</SelectItem>
                        <SelectItem value="invoice">Invoice</SelectItem>
                        <SelectItem value="work_order">Work Order</SelectItem>
                        <SelectItem value="campaign">Campaign</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="content">Template Content *</Label>
                    <Textarea
                      id="content"
                      placeholder="Use {variableName} for dynamic content. e.g., Hi {name}, your invoice {invoiceNumber} is due."
                      value={templateContent}
                      onChange={(e) => setTemplateContent(e.target.value)}
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Use curly braces for variables: {'{name}'}, {'{date}'}, {'{amount}'}, etc.
                    </p>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowTemplateDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveTemplate}>
                      {editingTemplate ? 'Update' : 'Create'} Template
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {messageTemplates.length === 0 ? (
              <p className="text-sm text-muted-foreground">No message templates configured.</p>
            ) : (
              messageTemplates.map(template => (
                <div key={template.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{template.name}</h4>
                      <Badge variant="outline">{template.category}</Badge>
                      <Badge variant="secondary">{template.entityType}</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditTemplate(template)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {template.content}
                  </p>
                  <div className="flex gap-1 flex-wrap">
                    {template.variables.map(variable => (
                      <Badge key={variable} variant="outline" className="text-xs">
                        {'{' + variable + '}'}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
