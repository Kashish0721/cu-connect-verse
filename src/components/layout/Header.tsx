
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, LogOut, MessageCircle, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import UserAvatar from "../shared/UserAvatar";
import { useState } from "react";
import { toast } from "sonner";

const Header = () => {
  const [notificationCount] = useState(3);
  const [messageCount] = useState(2);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="bg-background sticky top-0 z-30 w-full border-b shadow-sm">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <SidebarTrigger />
        <Link to="/" className="flex items-center ml-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cuPurple-700 to-cuPurple-500 bg-clip-text text-transparent">
            CU-Verse
          </h1>
        </Link>
        
        <div className="hidden md:flex items-center mx-6 flex-1">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="search" 
              placeholder="Search CU-Verse..." 
              className="rounded-full border border-input bg-transparent pl-8 pr-4 py-2 text-sm ring-offset-background w-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2 ml-auto">
          <Link to="/notifications">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-cuPurple-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </Button>
          </Link>
          <Link to="/messages">
            <Button variant="ghost" size="icon" className="relative">
              <MessageCircle className="h-5 w-5" />
              {messageCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-cuPurple-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {messageCount}
                </span>
              )}
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="p-0 h-auto">
              <UserAvatar user={{ name: "Kashish Singh", avatarUrl: "" }} className="h-9 w-9 border-2 border-cuPurple-300 hover:border-cuPurple-500 transition-colors" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
