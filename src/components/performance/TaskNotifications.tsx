import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { useTask, TaskItem } from "@/contexts/TaskContext";
import { useAuth } from "@/contexts/AuthContext";
import { differenceInDays, isAfter, isBefore, addDays } from "date-fns";

interface TaskNotification {
  id: string;
  taskId: string;
  type: "overdue" | "due_soon" | "upcoming";
  priority: "high" | "medium" | "low";
  message: string;
  timestamp: string;
  read: boolean;
}

export const TaskNotifications: React.FC = () => {
  const { userTasks } = useTask();
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState<TaskNotification[]>([]);

  useEffect(() => {
    if (!currentUser) return;

    const generateNotifications = () => {
      const newNotifications: TaskNotification[] = [];
      const now = new Date();

      userTasks.forEach((task) => {
        if (task.status === "completed" || task.status === "cancelled") return;

        const dueDate = new Date(task.dueDate);
        const daysDiff = differenceInDays(dueDate, now);

        // Overdue tasks
        if (isBefore(dueDate, now)) {
          newNotifications.push({
            id: `overdue-${task.id}`,
            taskId: task.id,
            type: "overdue",
            priority: task.priority === "urgent" ? "high" : "medium",
            message: `Task "${task.title}" is overdue by ${Math.abs(daysDiff)} day(s)`,
            timestamp: new Date().toISOString(),
            read: false
          });
        }
        // Due soon (within 2 days)
        else if (daysDiff <= 2 && daysDiff > 0) {
          newNotifications.push({
            id: `due-soon-${task.id}`,
            taskId: task.id,
            type: "due_soon",
            priority: task.priority === "urgent" ? "high" : "medium",
            message: `Task "${task.title}" is due in ${daysDiff} day(s)`,
            timestamp: new Date().toISOString(),
            read: false
          });
        }
        // Upcoming (within 7 days)
        else if (daysDiff <= 7 && daysDiff > 2) {
          newNotifications.push({
            id: `upcoming-${task.id}`,
            taskId: task.id,
            type: "upcoming",
            priority: "low",
            message: `Task "${task.title}" is due in ${daysDiff} day(s)`,
            timestamp: new Date().toISOString(),
            read: false
          });
        }
      });

      setNotifications(newNotifications);
    };

    generateNotifications();
    
    // Refresh notifications every hour
    const interval = setInterval(generateNotifications, 3600000);
    return () => clearInterval(interval);
  }, [userTasks, currentUser]);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const getNotificationIcon = (type: TaskNotification['type']) => {
    switch (type) {
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "due_soon":
        return <Clock className="h-4 w-4 text-orange-500" />;
      case "upcoming":
        return <Bell className="h-4 w-4 text-blue-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getNotificationVariant = (type: TaskNotification['type']) => {
    switch (type) {
      case "overdue":
        return "destructive";
      case "due_soon":
        return "secondary";
      case "upcoming":
        return "outline";
      default:
        return "outline";
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Task Notifications
          </div>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="px-2 py-1">
              {unreadCount}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
            <p>All caught up! No pending task notifications.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-3 border rounded-lg ${!notification.read ? 'bg-accent/50' : ''}`}
              >
                <div className="flex items-start gap-3">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{notification.message}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={getNotificationVariant(notification.type)}>
                        {notification.type.replace('_', ' ').toUpperCase()}
                      </Badge>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="h-6 px-2 text-xs"
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};