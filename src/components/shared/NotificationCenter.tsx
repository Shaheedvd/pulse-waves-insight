
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle, AlertCircle, Info, XCircle, MessageSquare } from "lucide-react";
import { useGlobal } from "@/contexts/GlobalContext";
import { useMessaging } from "@/contexts/MessagingContext";
import { cn } from "@/lib/utils";

export const NotificationCenter = () => {
  const { notifications, markNotificationAsRead, unreadNotificationCount } = useGlobal();
  const { unreadCount: unreadMessageCount } = useMessaging();
  const [isOpen, setIsOpen] = useState(false);

  const totalUnreadCount = unreadNotificationCount + unreadMessageCount;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const handleNotificationClick = (notificationId: string) => {
    markNotificationAsRead(notificationId);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {totalUnreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {totalUnreadCount > 99 ? "99+" : totalUnreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="border-b p-4">
          <h3 className="font-semibold">Notifications</h3>
          <p className="text-sm text-muted-foreground">
            {unreadNotificationCount} system notifications, {unreadMessageCount} unread messages
          </p>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {unreadMessageCount > 0 && (
            <div className="border-b p-4 bg-blue-50/50">
              <div className="flex items-start gap-3">
                <MessageSquare className="h-4 w-4 text-blue-500" />
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-sm">New Messages</p>
                  <p className="text-xs text-muted-foreground">
                    You have {unreadMessageCount} unread message{unreadMessageCount > 1 ? 's' : ''}
                  </p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={() => {
                    setIsOpen(false);
                    window.location.href = '/messages';
                  }}>
                    View Messages
                  </Button>
                </div>
                <div className="h-2 w-2 rounded-full bg-blue-500" />
              </div>
            </div>
          )}
          
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No notifications yet
            </div>
          ) : (
            notifications.slice(0, 10).map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "border-b p-4 cursor-pointer hover:bg-muted/50 transition-colors",
                  !notification.read && "bg-blue-50/50"
                )}
                onClick={() => handleNotificationClick(notification.id)}
              >
                <div className="flex items-start gap-3">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1 space-y-1">
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        {notifications.length > 10 && (
          <div className="border-t p-2">
            <Button variant="ghost" className="w-full text-sm">
              View all notifications
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
