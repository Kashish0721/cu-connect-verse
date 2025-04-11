
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, MessageCircle, Share, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import UserAvatar from "../shared/UserAvatar";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface PostUser {
  id: string;
  name: string;
  branch: string;
  year: string;
  avatarUrl?: string;
}

interface PostProps {
  id: string;
  user: PostUser;
  content: string;
  imageUrl?: string;
  timestamp: string;
  likes: number;
  comments: number;
  liked?: boolean;
}

const PostCard = ({
  id,
  user,
  content,
  imageUrl,
  timestamp,
  likes,
  comments,
  liked = false,
}: PostProps) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <Link to={`/profile/${user.id}`} className="flex items-center group">
            <UserAvatar user={user} className="h-10 w-10 mr-3" />
            <div>
              <p className="font-semibold group-hover:text-cuPurple-600 transition-colors">
                {user.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {user.branch}, {user.year} Year • {timestamp}
              </p>
            </div>
          </Link>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="mb-4 whitespace-pre-line">{content}</p>
        {imageUrl && (
          <div className="rounded-md overflow-hidden bg-secondary">
            <img
              src={imageUrl}
              alt="Post"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="p-2 border-t bg-secondary/30">
        <div className="flex items-center justify-between w-full px-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleLike}
          >
            <Heart
              className={cn(
                "h-5 w-5",
                isLiked ? "fill-cuPurple-500 text-cuPurple-500" : ""
              )}
            />
            <span>{likeCount}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
          >
            <MessageCircle className="h-5 w-5" />
            <span>{comments}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
          >
            <Share className="h-5 w-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
