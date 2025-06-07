
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Plus, Search, Mail, Trash2, Edit } from "lucide-react";
import { useMessaging } from "@/contexts/MessagingContext";
import { useAuth } from "@/contexts/AuthContext";
import { MessageComposer } from "@/components/messaging/MessageComposer";
import { MessageThread } from "@/components/messaging/MessageThread";
import { GmailIntegration } from "@/components/messaging/GmailIntegration";

const Messages = () => {
  const { messages, unreadCount, markAsRead, deleteMessage, searchMessages } = useMessaging();
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("inbox");
  const [showComposer, setShowComposer] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMessages = searchQuery ? searchMessages(searchQuery) : messages;
  
  const inboxMessages = filteredMessages.filter(msg => 
    msg.recipientId === currentUser?.id
  );
  
  const sentMessages = filteredMessages.filter(msg => 
    msg.senderId === currentUser?.id
  );

  const handleMessageClick = (messageId: string) => {
    setSelectedMessage(messageId);
    const message = messages.find(msg => msg.id === messageId);
    if (message && !message.read && message.recipientId === currentUser?.id) {
      markAsRead(messageId);
    }
  };

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

  if (selectedMessage) {
    return <MessageThread messageId={selectedMessage} onBack={() => setSelectedMessage(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <MessageSquare className="h-8 w-8" />
              Internal Messages
            </h1>
            <p className="text-muted-foreground">
              Secure internal communication for staff members
            </p>
          </div>
          <Button onClick={() => setShowComposer(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Message
          </Button>
        </div>
      </div>

      {showComposer && (
        <MessageComposer onClose={() => setShowComposer(false)} />
      )}

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="inbox" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Inbox
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-1">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="sent">
            Sent
          </TabsTrigger>
          <TabsTrigger value="gmail">
            Gmail Integration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inbox" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Inbox</CardTitle>
              <CardDescription>
                Messages received from other staff members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {inboxMessages.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No messages in your inbox
                  </p>
                ) : (
                  inboxMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                        !message.read ? "bg-blue-50 border-blue-200" : ""
                      }`}
                      onClick={() => handleMessageClick(message.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{message.senderName}</span>
                            {!message.read && (
                              <Badge variant="secondary" className="text-xs">
                                New
                              </Badge>
                            )}
                            <Badge className={`text-xs ${getPriorityColor(message.priority)}`}>
                              {message.priority}
                            </Badge>
                            <Badge className={`text-xs ${getCategoryColor(message.category)}`}>
                              {message.category}
                            </Badge>
                          </div>
                          <h4 className="font-medium text-sm">{message.subject}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {message.content}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{new Date(message.timestamp).toLocaleString()}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteMessage(message.id);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sent" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sent Messages</CardTitle>
              <CardDescription>
                Messages you have sent to other staff members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sentMessages.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No sent messages
                  </p>
                ) : (
                  sentMessages.map((message) => (
                    <div
                      key={message.id}
                      className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleMessageClick(message.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">To: {message.recipientName}</span>
                            <Badge className={`text-xs ${getPriorityColor(message.priority)}`}>
                              {message.priority}
                            </Badge>
                            <Badge className={`text-xs ${getCategoryColor(message.category)}`}>
                              {message.category}
                            </Badge>
                          </div>
                          <h4 className="font-medium text-sm">{message.subject}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {message.content}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{new Date(message.timestamp).toLocaleString()}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteMessage(message.id);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gmail" className="space-y-4 mt-4">
          <GmailIntegration />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Messages;
