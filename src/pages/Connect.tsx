
import AppLayout from "@/components/layout/AppLayout";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, UserPlus, Users, ChevronRight } from "lucide-react";
import { useState } from "react";
import UserAvatar from "@/components/shared/UserAvatar";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type User = {
  id: string;
  name: string;
  branch: string;
  year: string;
  bio: string;
  mutualConnections: number;
  avatarUrl: string;
  isFollowing: boolean;
};

const initialUsers: User[] = [
  {
    id: "1",
    name: "Priya Sharma",
    branch: "Computer Science",
    year: "3rd Year",
    bio: "AI enthusiast and web developer",
    mutualConnections: 12,
    avatarUrl: "",
    isFollowing: false,
  },
  {
    id: "2",
    name: "Arjun Patel",
    branch: "Electronics",
    year: "2nd Year",
    bio: "Robotics team member, IoT project lead",
    mutualConnections: 8,
    avatarUrl: "",
    isFollowing: true,
  },
  {
    id: "3",
    name: "Neha Gupta",
    branch: "MBA",
    year: "1st Year",
    bio: "Business analytics, startup enthusiast",
    mutualConnections: 5,
    avatarUrl: "",
    isFollowing: false,
  },
  {
    id: "4",
    name: "Rahul Kumar",
    branch: "Mechanical",
    year: "4th Year",
    bio: "Design thinking, CAD expert",
    mutualConnections: 3,
    avatarUrl: "",
    isFollowing: false,
  },
  {
    id: "5",
    name: "Ananya Singh",
    branch: "Computer Science",
    year: "3rd Year",
    bio: "Full-stack developer, open source contributor",
    mutualConnections: 15,
    avatarUrl: "",
    isFollowing: true,
  },
  {
    id: "6",
    name: "Vikram Verma",
    branch: "Civil Engineering",
    year: "2nd Year",
    bio: "Sustainability advocate, loves structural design",
    mutualConnections: 7,
    avatarUrl: "",
    isFollowing: false,
  },
];

const initialFollowing = initialUsers.filter(user => user.isFollowing);

const Connect = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(initialUsers);
  const [following, setFollowing] = useState(initialFollowing);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.year.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFollow = (userId: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );

    const targetUser = users.find(user => user.id === userId);
    if (targetUser) {
      if (!targetUser.isFollowing) {
        toast.success(`You are now following ${targetUser.name}`);
        setFollowing([...following, {...targetUser, isFollowing: true}]);
      } else {
        toast.info(`You unfollowed ${targetUser.name}`);
        setFollowing(following.filter(user => user.id !== userId));
      }
    }
  };

  return (
    <AppLayout>
      <AppSidebar />
      <main className="flex flex-1 flex-col p-6 overflow-auto">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold mb-6">Connect with CU Students</h1>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, branch, or year..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="md:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          <Tabs defaultValue="discover">
            <TabsList className="mb-4">
              <TabsTrigger value="discover" className="flex-1">
                <Users className="mr-2 h-4 w-4" />
                Discover
              </TabsTrigger>
              <TabsTrigger value="following" className="flex-1">
                <UserPlus className="mr-2 h-4 w-4" />
                Following ({following.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="discover">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <Card key={user.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <UserAvatar
                            user={{ name: user.name, avatarUrl: user.avatarUrl }}
                            className="h-12 w-12"
                          />
                          <div className="flex-1 overflow-hidden">
                            <h3 className="font-semibold text-base">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {user.branch} • {user.year}
                            </p>
                            <p className="text-sm mt-1 line-clamp-2">{user.bio}</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs text-muted-foreground">
                                {user.mutualConnections} mutual connections
                              </span>
                              <div className="flex gap-2">
                                <Button
                                  variant={user.isFollowing ? "outline" : "default"}
                                  size="sm"
                                  onClick={() => handleFollow(user.id)}
                                  className={
                                    user.isFollowing
                                      ? ""
                                      : "bg-cuPurple-600 hover:bg-cuPurple-700"
                                  }
                                >
                                  {user.isFollowing ? "Unfollow" : "Follow"}
                                </Button>
                                <Button variant="ghost" size="sm">
                                  View
                                  <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-2 p-8 text-center">
                    <p className="text-muted-foreground">
                      No students found matching your search criteria.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="following">
              {following.length > 0 ? (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  {following.map((user) => (
                    <Card key={user.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <UserAvatar
                            user={{ name: user.name, avatarUrl: user.avatarUrl }}
                            className="h-12 w-12"
                          />
                          <div className="flex-1 overflow-hidden">
                            <h3 className="font-semibold text-base">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {user.branch} • {user.year}
                            </p>
                            <p className="text-sm mt-1 line-clamp-2">{user.bio}</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs text-muted-foreground">
                                {user.mutualConnections} mutual connections
                              </span>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleFollow(user.id)}
                                >
                                  Unfollow
                                </Button>
                                <Button variant="ghost" size="sm">
                                  Message
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      You're not following anyone yet.
                    </p>
                    <Button 
                      className="bg-cuPurple-600 hover:bg-cuPurple-700"
                      onClick={() => document.querySelector('[value="discover"]')?.dispatchEvent(new Event('click', { bubbles: true }))}
                    >
                      Discover People
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </AppLayout>
  );
};

export default Connect;
