
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useGlobal } from "./GlobalContext";

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  recipientName: string;
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
  readAt?: string;
  threadId?: string;
  attachments?: string[];
  priority: "low" | "normal" | "high";
  category: "general" | "urgent" | "announcement" | "project";
}

export interface Thread {
  id: string;
  subject: string;
  participants: string[];
  lastMessageAt: string;
  messageCount: number;
  unreadCount: number;
}

interface MessagingContextType {
  messages: Message[];
  threads: Thread[];
  unreadCount: number;
  sendMessage: (message: Omit<Message, "id" | "timestamp" | "read" | "senderId" | "senderName">) => void;
  markAsRead: (messageId: string) => void;
  deleteMessage: (messageId: string) => void;
  updateMessage: (messageId: string, updates: Partial<Message>) => void;
  getConversation: (userId: string) => Message[];
  searchMessages: (query: string) => Message[];
}

const MessagingContext = createContext<MessagingContextType | undefined>(undefined);

export const MessagingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [threads, setThreads] = useState<Thread[]>([]);
  const { currentUser } = useAuth();
  const { addNotification, logAction } = useGlobal();

  // Initialize with some sample messages for demonstration
  useEffect(() => {
    if (currentUser && messages.length === 0) {
      const sampleMessages: Message[] = [
        {
          id: "1",
          senderId: "2",
          senderName: "John Manager",
          recipientId: currentUser.id,
          recipientName: currentUser.name,
          subject: "Weekly Team Report",
          content: "Please review the attached weekly team performance report and provide feedback by Friday.",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          read: false,
          priority: "normal",
          category: "general"
        },
        {
          id: "2",
          senderId: "3",
          senderName: "Sarah Admin",
          recipientId: currentUser.id,
          recipientName: currentUser.name,
          subject: "System Maintenance Notice",
          content: "The system will undergo scheduled maintenance this weekend from 2 AM to 6 AM.",
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          read: true,
          readAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
          priority: "high",
          category: "announcement"
        }
      ];
      setMessages(sampleMessages);
    }
  }, [currentUser]);

  const sendMessage = (messageData: Omit<Message, "id" | "timestamp" | "read" | "senderId" | "senderName">) => {
    if (!currentUser) return;

    const newMessage: Message = {
      ...messageData,
      id: Date.now().toString(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      timestamp: new Date().toISOString(),
      read: false,
    };

    setMessages(prev => [newMessage, ...prev]);

    // Add notification for recipient
    addNotification({
      userId: messageData.recipientId,
      title: "New Message",
      message: `You have a new message from ${currentUser.name}: ${messageData.subject}`,
      type: "info",
      module: "messaging",
      entityId: newMessage.id
    });

    // Log the action
    logAction("Send Message", "messaging", newMessage.id, "message", null, newMessage);
  };

  const markAsRead = (messageId: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId && !msg.read
          ? { ...msg, read: true, readAt: new Date().toISOString() }
          : msg
      )
    );

    // Log the action
    logAction("Mark Message as Read", "messaging", messageId, "message");
  };

  const deleteMessage = (messageId: string) => {
    const messageToDelete = messages.find(msg => msg.id === messageId);
    setMessages(prev => prev.filter(msg => msg.id !== messageId));

    // Log the action
    logAction("Delete Message", "messaging", messageId, "message", messageToDelete, null);
  };

  const updateMessage = (messageId: string, updates: Partial<Message>) => {
    const oldMessage = messages.find(msg => msg.id === messageId);
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, ...updates } : msg
      )
    );

    // Log the action
    const updatedMessage = messages.find(msg => msg.id === messageId);
    logAction("Update Message", "messaging", messageId, "message", oldMessage, updatedMessage);
  };

  const getConversation = (userId: string): Message[] => {
    if (!currentUser) return [];
    
    return messages.filter(msg => 
      (msg.senderId === currentUser.id && msg.recipientId === userId) ||
      (msg.senderId === userId && msg.recipientId === currentUser.id)
    ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  const searchMessages = (query: string): Message[] => {
    const lowercaseQuery = query.toLowerCase();
    return messages.filter(msg =>
      msg.subject.toLowerCase().includes(lowercaseQuery) ||
      msg.content.toLowerCase().includes(lowercaseQuery) ||
      msg.senderName.toLowerCase().includes(lowercaseQuery)
    );
  };

  const unreadCount = messages.filter(msg => 
    msg.recipientId === currentUser?.id && !msg.read
  ).length;

  const value = {
    messages,
    threads,
    unreadCount,
    sendMessage,
    markAsRead,
    deleteMessage,
    updateMessage,
    getConversation,
    searchMessages,
  };

  return <MessagingContext.Provider value={value}>{children}</MessagingContext.Provider>;
};

export const useMessaging = (): MessagingContextType => {
  const context = useContext(MessagingContext);
  if (context === undefined) {
    throw new Error("useMessaging must be used within a MessagingProvider");
  }
  return context;
};
