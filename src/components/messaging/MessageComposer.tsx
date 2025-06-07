
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Send } from "lucide-react";
import { useMessaging } from "@/contexts/MessagingContext";
import { useToast } from "@/hooks/use-toast";

interface MessageComposerProps {
  onClose: () => void;
  replyTo?: string;
}

// Mock staff list - in a real app, this would come from your user management system
const STAFF_MEMBERS = [
  { id: "2", name: "John Manager", email: "john@company.com" },
  { id: "3", name: "Sarah Admin", email: "sarah@company.com" },
  { id: "4", name: "Mike Developer", email: "mike@company.com" },
  { id: "5", name: "Lisa Designer", email: "lisa@company.com" },
];

export const MessageComposer: React.FC<MessageComposerProps> = ({ onClose, replyTo }) => {
  const { sendMessage } = useMessaging();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    recipientId: "",
    recipientName: "",
    subject: "",
    content: "",
    priority: "normal" as "low" | "normal" | "high",
    category: "general" as "general" | "urgent" | "announcement" | "project"
  });

  const handleRecipientChange = (value: string) => {
    const recipient = STAFF_MEMBERS.find(member => member.id === value);
    if (recipient) {
      setFormData(prev => ({
        ...prev,
        recipientId: value,
        recipientName: recipient.name
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.recipientId || !formData.subject || !formData.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    sendMessage({
      recipientId: formData.recipientId,
      recipientName: formData.recipientName,
      subject: formData.subject,
      content: formData.content,
      priority: formData.priority,
      category: formData.category
    });

    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${formData.recipientName}`
    });

    onClose();
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>New Message</CardTitle>
            <CardDescription>Send a message to a staff member</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">To *</label>
            <Select value={formData.recipientId} onValueChange={handleRecipientChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select recipient" />
              </SelectTrigger>
              <SelectContent>
                {STAFF_MEMBERS.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name} ({member.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Priority</label>
              <Select 
                value={formData.priority} 
                onValueChange={(value: "low" | "normal" | "high") => 
                  setFormData(prev => ({ ...prev, priority: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Category</label>
              <Select 
                value={formData.category} 
                onValueChange={(value: "general" | "urgent" | "announcement" | "project") => 
                  setFormData(prev => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                  <SelectItem value="project">Project</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Subject *</label>
            <Input
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              placeholder="Enter message subject"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Message *</label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Type your message here..."
              rows={6}
              required
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
