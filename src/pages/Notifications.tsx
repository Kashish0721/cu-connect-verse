
import AppLayout from "@/components/layout/AppLayout";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserAvatar from "@/components/shared/UserAvatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Notification = {
  id: string;
  type: "like" | "comment" | "follow" | "mention" | "event";
  text: string;
  user: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  timestamp: string;
  read: boolean;
};

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "like",
    text: "liked your post about the upcoming hackathon",
    user: {
      id: "5",
      name: "Yash Yadav",
      avatarUrl: "",
    },
    timestamp: "5m ago",
    read: false,
  },
  {
    id: "2",
    type: "comment",
    text: "commented on your project showcase",
    user: {
      id: "4",
      name: "Deshna Jain",
      avatarUrl: "",
    },
    timestamp: "1h ago",
    read: false,
  },
  {
    id: "3",
    type: "follow",
    text: "started following you",
    user: {
      id: "6",
      name: "Goldy",
      avatarUrl: "",
    },
    timestamp: "2h ago",
    read: true,
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  return (
    <AppLayout>
      <AppSidebar />
      <main className="flex flex-1 flex-col p-6 overflow-auto">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Notifications</h1>
            <Button 
              variant="outline"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          </div>

          <div className="space-y-4">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`transition-colors ${!notification.read ? 'bg-cuPurple-50' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4 flex items-start gap-3">
                    <UserAvatar
                      user={notification.user}
                      className="h-10 w-10"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{notification.user.name}</span>
                        <span>{notification.text}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.timestamp}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="h-2 w-2 rounded-full bg-cuPurple-500"></div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center">
                <CardContent>
                  <p className="text-muted-foreground">You have no notifications.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </AppLayout>
  );
};

export default Notifications;
