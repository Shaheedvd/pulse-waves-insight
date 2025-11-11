
import React, { createContext, useContext, useState, useEffect } from "react";
import { AuditLog, NotificationItem, UserPermissions } from "@/types/global";
import { useAuth } from "./AuthContext";

interface GlobalContextType {
  notifications: NotificationItem[];
  auditLogs: AuditLog[];
  userPermissions: UserPermissions;
  addNotification: (notification: Omit<NotificationItem, "id" | "timestamp" | "read">) => void;
  markNotificationAsRead: (id: string) => void;
  logAction: (action: string, module: string, entityId?: string, entityType?: string, oldData?: any, newData?: any) => void;
  hasPermission: (module: string, action: string) => boolean;
  unreadNotificationCount: number;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [userPermissions, setUserPermissions] = useState<UserPermissions>({});
  const { currentUser } = useAuth();

  // Initialize permissions based on user role
  useEffect(() => {
    if (currentUser) {
      const permissions = generatePermissionsForRole(currentUser.role);
      setUserPermissions(permissions);
    }
  }, [currentUser]);

  const addNotification = (notification: Omit<NotificationItem, "id" | "timestamp" | "read">) => {
    if (!currentUser) return;
    
    const newNotification: NotificationItem = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
    };
    
    setNotifications(prev => [newNotification, ...prev].slice(0, 50)); // Keep last 50 notifications
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const logAction = (
    action: string, 
    module: string, 
    entityId?: string, 
    entityType?: string, 
    oldData?: any, 
    newData?: any
  ) => {
    if (!currentUser) return;
    
    const logEntry: AuditLog = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.name,
      action,
      module,
      entityId: entityId || undefined,
      entityType: entityType || undefined,
      oldData: oldData || undefined,
      newData: newData || undefined,
      timestamp: new Date().toISOString(),
    };
    
    setAuditLogs(prev => [logEntry, ...prev].slice(0, 1000)); // Keep last 1000 logs
    // Audit log created (removed console.log for security)
  };

  const hasPermission = (module: string, action: string): boolean => {
    const modulePermissions = userPermissions[module];
    if (!modulePermissions) return false;
    
    return modulePermissions[action as keyof typeof modulePermissions] || false;
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  const value = {
    notifications,
    auditLogs,
    userPermissions,
    addNotification,
    markNotificationAsRead,
    logAction,
    hasPermission,
    unreadNotificationCount,
  };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

export const useGlobal = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};

// Helper function to generate permissions based on role
const generatePermissionsForRole = (role: string): UserPermissions => {
  const basePermissions = {
    dashboard: { create: false, read: true, update: false, delete: false, admin: false },
    evaluations: { create: false, read: true, update: false, delete: false, admin: false },
    clients: { create: false, read: true, update: false, delete: false, admin: false },
    reports: { create: false, read: true, update: false, delete: false, admin: false },
    operations: { create: false, read: true, update: false, delete: false, admin: false },
    finance: { create: false, read: false, update: false, delete: false, admin: false },
    hr: { create: false, read: false, update: false, delete: false, admin: false },
    marketing: { create: false, read: false, update: false, delete: false, admin: false },
    sales: { create: false, read: false, update: false, delete: false, admin: false },
    compliance: { create: false, read: true, update: false, delete: false, admin: false },
    support: { create: true, read: true, update: false, delete: false, admin: false },
    system: { create: false, read: false, update: false, delete: false, admin: false },
  };

  switch (role) {
    case "super_user":
      return Object.keys(basePermissions).reduce((acc, module) => {
        acc[module] = { create: true, read: true, update: true, delete: true, admin: true };
        return acc;
      }, {} as UserPermissions);
    
    case "power_manager":
      return Object.keys(basePermissions).reduce((acc, module) => {
        acc[module] = { 
          create: true, 
          read: true, 
          update: true, 
          delete: module !== "system", 
          admin: module !== "system" 
        };
        return acc;
      }, {} as UserPermissions);
    
    case "manager":
      return {
        ...basePermissions,
        evaluations: { create: true, read: true, update: true, delete: false, admin: false },
        clients: { create: true, read: true, update: true, delete: false, admin: false },
        operations: { create: true, read: true, update: true, delete: false, admin: false },
        reports: { create: true, read: true, update: false, delete: false, admin: false },
      };
    
    default:
      return basePermissions;
  }
};
