
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import AppLayout from "@/components/layout/AppLayout";
import CreatePostBox from "@/components/home/CreatePostBox";
import PostCard from "@/components/home/PostCard";
import SuggestedUsers from "@/components/home/SuggestedUsers";
import UpcomingClasses from "@/components/home/UpcomingClasses";
import EventsHighlights from "@/components/home/EventsHighlights";

// Mock posts data
const posts = [
  {
    id: "1",
    user: {
      id: "101",
      name: "Priya Sharma",
      branch: "CSE",
      year: "3rd",
      avatarUrl: "",
    },
    content:
      "Just finished my project on AI-based facial recognition! 🚀 Looking for beta testers from the Computer Science department. Comment if you're interested!",
    imageUrl: "https://picsum.photos/id/8/800/500",
    timestamp: "30 minutes ago",
    likes: 24,
    comments: 7,
    liked: false,
  },
  {
    id: "2",
    user: {
      id: "102",
      name: "Arjun Patel",
      branch: "ECE",
      year: "2nd",
      avatarUrl: "",
    },
    content:
      "Our team just won the inter-university robotics competition! Proud to represent Chandigarh University! 🏆 \n\nThank you to all the professors who guided us throughout this journey.",
    imageUrl: "https://picsum.photos/id/60/800/600",
    timestamp: "2 hours ago",
    likes: 56,
    comments: 12,
    liked: true,
  },
  {
    id: "3",
    user: {
      id: "103",
      name: "Neha Gupta",
      branch: "MBA",
      year: "1st",
      avatarUrl: "",
    },
    content:
      "Is anyone free during lunch break today? I'd like to discuss some ideas for the upcoming business plan competition. We can meet at the central cafeteria around 1 PM.",
    timestamp: "5 hours ago",
    likes: 13,
    comments: 8,
    liked: false,
  },
];

const Index = () => {
  return (
    <AppLayout>
      <AppSidebar />
      <main className="flex flex-1 overflow-auto">
        <div className="container mx-auto py-6 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main feed - posts */}
          <div className="md:col-span-2">
            <CreatePostBox />
            
            {posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                user={post.user}
                content={post.content}
                imageUrl={post.imageUrl}
                timestamp={post.timestamp}
                likes={post.likes}
                comments={post.comments}
                liked={post.liked}
              />
            ))}
          </div>
          
          {/* Right sidebar with suggestions and events */}
          <div className="hidden md:block space-y-6">
            <SuggestedUsers />
            <UpcomingClasses />
            <EventsHighlights />
          </div>
        </div>
      </main>
    </AppLayout>
  );
};

export default Index;
