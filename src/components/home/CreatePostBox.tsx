
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Camera, Image, Send, Smile } from "lucide-react";
import { useState } from "react";
import UserAvatar from "../shared/UserAvatar";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

const CreatePostBox = () => {
  const [postContent, setPostContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreatePost = () => {
    if (!postContent.trim()) {
      toast.error("Post content cannot be empty");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call - in a real app, we would send this to the backend
    setTimeout(() => {
      toast.success("Post created successfully!");
      setPostContent("");
      setIsSubmitting(false);
    }, 500);
  };

  const currentUser = {
    name: "John Doe",
    avatarUrl: "",
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <UserAvatar user={currentUser} className="h-10 w-10" />
          <div className="flex-1">
            <Textarea
              placeholder="Share something with the CU community..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="min-h-[80px] resize-none focus-visible:ring-cuPurple-500"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-3 pt-0">
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Image className="h-5 w-5 mr-1" />
            Photo
          </Button>
          <Button variant="ghost" size="sm">
            <Camera className="h-5 w-5 mr-1" />
            Video
          </Button>
          <Button variant="ghost" size="sm">
            <Smile className="h-5 w-5 mr-1" />
            Feeling
          </Button>
        </div>
        <Button 
          onClick={handleCreatePost} 
          disabled={!postContent.trim() || isSubmitting} 
          size="sm" 
          className="bg-cuPurple-600 hover:bg-cuPurple-700"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Posting...
            </span>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Post
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreatePostBox;
