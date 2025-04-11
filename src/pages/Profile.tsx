
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from "@/components/layout/AppLayout";
import UserAvatar from "@/components/shared/UserAvatar";
import PostCard from "@/components/home/PostCard";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Pencil, Users } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

// Updated user data
const mainUserData = {
  id: "user1",
  name: "Kashish Singh",
  branch: "Computer Science",
  year: "3rd",
  bio: "Student at Chandigarh University | Web Developer | Tech Enthusiast",
  followers: 245,
  following: 123,
  location: "Chandigarh, India",
  joinedDate: "September 2022",
  avatarUrl: "",
};

// Friends data
const friendsData = [
  {
    id: "friend1",
    name: "Deshna Jain",
    branch: "CSE",
    year: "3rd",
    avatarUrl: "",
  },
  {
    id: "friend2",
    name: "Yash Yadav",
    branch: "CSE",
    year: "3rd",
    avatarUrl: "",
  },
  {
    id: "friend3",
    name: "Goldy",
    branch: "CSE",
    year: "3rd",
    avatarUrl: "",
  }
];

// Mock posts data
const userPosts = [
  {
    id: "post1",
    user: mainUserData,
    content: "Just finished my mid-semester project! #CSE #WebDev",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 5,
    liked: true,
  },
  {
    id: "post2",
    user: mainUserData,
    content: "Looking forward to the tech fest next week. Anyone else participating in the hackathon?",
    timestamp: "2 days ago",
    likes: 32,
    comments: 8,
    liked: false,
  },
];

const Profile = () => {
  const { id } = useParams();
  const [userData] = useState(() => {
    // If there's a specific ID, find the friend with that ID, otherwise show the main user
    if (id) {
      const friend = friendsData.find(friend => friend.id === id);
      if (friend) {
        return {
          ...friend,
          bio: "Student at Chandigarh University",
          followers: Math.floor(Math.random() * 200) + 50,
          following: Math.floor(Math.random() * 100) + 20,
          location: "Chandigarh, India",
          joinedDate: "September 2022",
        };
      }
    }
    return mainUserData;
  });

  return (
    <AppLayout>
      <div className="container max-w-4xl py-6">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center">
                <UserAvatar user={userData} className="h-24 w-24 border-4 border-cuPurple-300" />
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Connected
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div>
                    <h1 className="text-2xl font-bold">{userData.name}</h1>
                    <p className="text-muted-foreground">{userData.branch}, {userData.year} Year</p>
                  </div>
                  
                  <div className="flex gap-4 mt-4 md:mt-0 text-center">
                    <div>
                      <p className="font-semibold">{userData.followers}</p>
                      <p className="text-xs text-muted-foreground">Connections</p>
                    </div>
                    <div>
                      <p className="font-semibold">{userData.following}</p>
                      <p className="text-xs text-muted-foreground">Following</p>
                    </div>
                  </div>
                </div>
                
                <p className="mt-4">{userData.bio}</p>
                
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {userData.location}
                  </div>
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    Joined {userData.joinedDate}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Profile Content */}
        <Tabs defaultValue="posts">
          <TabsList className="mb-4">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="connections">Connections</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="space-y-4">
            {id ? (
              <Card className="p-6 text-center">
                <p>No posts to display yet.</p>
              </Card>
            ) : (
              userPosts.map((post) => (
                <PostCard key={post.id} {...post} />
              ))
            )}
          </TabsContent>
          <TabsContent value="media">
            <Card>
              <CardHeader>Media Content</CardHeader>
              <CardContent>
                <p>No media to display yet.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="connections">
            <Card>
              <CardHeader>Connections</CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {friendsData.map((friend) => (
                    <div key={friend.id} className="flex items-center p-3 border rounded-lg">
                      <UserAvatar user={friend} className="h-12 w-12 mr-3" />
                      <div>
                        <p className="font-medium">{friend.name}</p>
                        <p className="text-sm text-muted-foreground">{friend.branch}, {friend.year} Year</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="about">
            <Card>
              <CardHeader>About</CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Education</h3>
                    <p className="text-sm text-muted-foreground">B.Tech in Computer Science Engineering, Chandigarh University</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Interests</h3>
                    <p className="text-sm text-muted-foreground">Web Development, UI/UX Design, Machine Learning</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Contact Information</h3>
                    <p className="text-sm text-muted-foreground">Email: kashish.singh@example.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Profile;
