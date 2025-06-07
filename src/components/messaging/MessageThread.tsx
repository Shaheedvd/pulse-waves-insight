
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Reply, Trash2, Edit } from "lucide-react";
import { useMessaging } from "@/contexts/MessagingContext";
import { MessageComposer } from "./MessageComposer";

interface MessageThreadProps {
  messageId: string;
  onBack: () => void;
}

export const MessageThread: React.FC<MessageThreadProps> = ({ messageId, onBack }) => {
  const { messages, deleteMessage } = useMessaging();
  const [showReply, setShowReply] = useState(false);
  
  const message = messages.find(msg => msg.id === messageId);

  if (!message) {
    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Messages
        </Button>
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">Message not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "low": return "bg-gray-100 text-gray-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "urgent": return "bg-red-100 text-red-800";
      case "announcement": return "bg-purple-100 text-purple-800";
      case "project": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Messages
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowReply(true)}>
            <Reply className="h-4 w-4 mr-2" />
            Reply
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              deleteMessage(message.id);
              onBack();
            }}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {showReply && (
        <MessageComposer 
          onClose={() => setShowReply(false)} 
          replyTo={message.id}
        />
      )}

      <Card>
        <CardHeader>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{message.subject}</CardTitle>
              <div className="flex gap-2">
                <Badge className={`${getPriorityColor(message.priority)}`}>
                  {message.priority}
                </Badge>
                <Badge className={`${getCategoryColor(message.category)}`}>
                  {message.category}
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div>
                <span className="font-medium">From: </span>
                {message.senderName}
              </div>
              <div>
                <span className="font-medium">To: </span>
                {message.recipientName}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Sent: </span>
              {new Date(message.timestamp).toLocaleString()}
              {message.read && message.readAt && (
                <>
                  <span className="ml-4 font-medium">Read: </span>
                  {new Date(message.readAt).toLocaleString()}
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {message.content}
            </div>
          </div>
          
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-6 pt-4 border-t">
              <h4 className="font-medium text-sm mb-2">Attachments</h4>
              <div className="space-y-2">
                {message.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Button variant="outline" size="sm">
                      Download {attachment}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
