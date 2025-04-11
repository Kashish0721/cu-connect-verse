
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import UserAvatar from "../shared/UserAvatar";
import { toast } from "sonner";
import { useState } from "react";

// Mock suggested users data
const suggestedUsers = [
  {
    id: "4",
    name: "Deshna Jain",
    branch: "CSE",
    year: "3rd",
    avatarUrl: "",
    mutualConnections: 5,
    isConnected: false,
  },
  {
    id: "5",
    name: "Yash Yadav",
    branch: "CSE",
    year: "3rd",
    avatarUrl: "",
    mutualConnections: 3,
    isConnected: false,
  },
  {
    id: "6",
    name: "Goldy",
    branch: "CSE",
    year: "3rd",
    avatarUrl: "",
    mutualConnections: 2,
    isConnected: false,
  },
];

const SuggestedUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(suggestedUsers);
  
  const handleConnect = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, isConnected: !user.isConnected } 
        : user
    ));
    
    const user = users.find(user => user.id === userId);
    if (user) {
      if (!user.isConnected) {
        toast.success(`Connected with ${user.name}`);
      } else {
        toast.info(`Removed connection with ${user.name}`);
      }
    }
  };
  
  const handleViewMore = () => {
    navigate("/connect");
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Suggested For You</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <Link to={`/profile/${user.id}`} className="flex items-center group">
              <UserAvatar user={user} className="h-10 w-10 mr-3" />
              <div>
                <p className="font-medium text-sm group-hover:text-cuPurple-600 transition-colors">
                  {user.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user.branch}, {user.year} Year
                </p>
                <p className="text-xs text-cuPurple-500">
                  {user.mutualConnections} mutual connections
                </p>
              </div>
            </Link>
            <Button 
              size="sm" 
              variant={user.isConnected ? "outline" : "default"}
              className={user.isConnected ? "" : "bg-cuPurple-600 hover:bg-cuPurple-700"}
              onClick={() => handleConnect(user.id)}
            >
              {user.isConnected ? "Connected" : "Connect"}
            </Button>
          </div>
        ))}
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full text-cuPurple-600 hover:text-cuPurple-700"
          onClick={handleViewMore}
        >
          View More
        </Button>
      </CardContent>
    </Card>
  );
};

export default SuggestedUsers;
