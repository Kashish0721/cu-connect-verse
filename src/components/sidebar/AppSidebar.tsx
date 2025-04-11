
import { 
  Calendar, 
  Clock, 
  Home, 
  MessageSquare, 
  Search, 
  Settings, 
  Users 
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import UserAvatar from "../shared/UserAvatar";
import { Button } from "../ui/button";

// Menu items for the sidebar
const mainMenuItems = [
  {
    title: "Home",
    icon: Home,
    url: "/",
  },
  {
    title: "Connect",
    icon: Users,
    url: "/connect",
  },
  {
    title: "Messages",
    icon: MessageSquare,
    url: "/messages",
  },
  {
    title: "Timetable",
    icon: Clock,
    url: "/timetable",
  },
  {
    title: "Events",
    icon: Calendar,
    url: "/events",
  },
];

// Mock data for recently connected users
const recentlyConnected = [
  { id: "1", name: "Priya Sharma", branch: "CSE", year: "3rd", avatarUrl: "" },
  { id: "2", name: "Arjun Patel", branch: "ECE", year: "2nd", avatarUrl: "" },
  { id: "3", name: "Neha Gupta", branch: "MBA", year: "1st", avatarUrl: "" },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center px-4 py-2">
          <h2 className="text-xl font-bold bg-gradient-to-r from-cuPurple-700 to-cuPurple-500 bg-clip-text text-transparent">CU-Verse</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center">
                      <item.icon className="mr-3 h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Recently Connected</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-2 px-3 py-2">
              {recentlyConnected.map((user) => (
                <Link to={`/profile/${user.id}`} key={user.id} className="flex items-center p-2 rounded-md hover:bg-accent transition-colors group">
                  <UserAvatar user={user} className="h-8 w-8 mr-3" />
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.branch}, {user.year} Year</p>
                  </div>
                </Link>
              ))}
              <Button variant="outline" size="sm" className="w-full mt-2">
                <Users className="h-4 w-4 mr-2" />
                View All Connections
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-3 py-2">
          <Link to="/settings">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
          <div className="mt-2 px-2 py-2">
            <p className="text-xs text-muted-foreground">© 2025 CU-Verse</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
